/* ============================================================
   학습 흐름 추적 (Lab User Tracker)
   1. 첫 방문 시 modal로 이름 입력 → localStorage["lab_user"] 저장
   2. 페이지 로드 시 Apps Script Web App으로 pageview POST
   3. 페이지 떠날 때 (beforeunload) duration 측정 후 sendBeacon
   4. Material for MkDocs instant navigation 호환

   설정: 아래 APPS_SCRIPT_URL을 Apps Script Web App 배포 URL로 교체
   교체 전에는 모든 로깅 함수가 no-op (사이트는 정상 작동)
   ============================================================ */

(function () {
  "use strict";

  // === 사용자 설정 ===
  const APPS_SCRIPT_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL';

  // === 상태 ===
  let pageStartTime = Date.now();
  let currentPage = location.pathname;
  let isModalOpen = false;
  let modalPromiseResolve = null;

  // ============================================================
  // localStorage 사용자
  // ============================================================
  function getLabUserSync() {
    try {
      return localStorage.getItem('lab_user') || null;
    } catch (e) {
      return null;
    }
  }

  function setLabUser(name) {
    try {
      localStorage.setItem('lab_user', name);
    } catch (e) {
      // localStorage 비활성화 시 무시
    }
  }

  // ============================================================
  // 로그인 Modal
  // ============================================================
  function showLoginModal() {
    if (isModalOpen) return Promise.resolve(getLabUserSync() || 'anonymous');
    isModalOpen = true;

    return new Promise(function (resolve) {
      modalPromiseResolve = resolve;

      const backdrop = document.createElement('div');
      backdrop.className = 'lab-user-modal-backdrop';
      backdrop.setAttribute('role', 'dialog');
      backdrop.setAttribute('aria-modal', 'true');

      const modal = document.createElement('div');
      modal.className = 'lab-user-modal';
      modal.innerHTML = ''
        + '<h2>학습 기록을 위한 이름</h2>'
        + '<p>이 사이트는 학습 흐름 분석을 위해 페이지 방문 기록을 익명으로 수집합니다. '
        + '이름은 한 번만 입력하면 되며, 브라우저에 저장됩니다 (서버에 비밀번호는 저장하지 않습니다).</p>'
        + '<input type="text" id="lab-user-name-input" placeholder="이름 또는 닉네임" autocomplete="off" maxlength="40" />'
        + '<div class="lab-user-modal-actions">'
        + '  <button type="button" class="lab-user-btn-secondary" id="lab-user-skip-btn">건너뛰기</button>'
        + '  <button type="button" class="lab-user-btn-primary" id="lab-user-submit-btn">시작하기</button>'
        + '</div>';

      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const input = modal.querySelector('#lab-user-name-input');
      const submitBtn = modal.querySelector('#lab-user-submit-btn');
      const skipBtn = modal.querySelector('#lab-user-skip-btn');

      function close(name) {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        isModalOpen = false;
        const finalName = (name && name.trim()) ? name.trim() : 'anonymous';
        setLabUser(finalName);
        if (modalPromiseResolve) {
          modalPromiseResolve(finalName);
          modalPromiseResolve = null;
        }
      }

      submitBtn.addEventListener('click', function () { close(input.value); });
      skipBtn.addEventListener('click', function () { close('anonymous'); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); close(input.value); }
        if (e.key === 'Escape') { e.preventDefault(); close('anonymous'); }
      });

      // 자동 포커스
      setTimeout(function () { input.focus(); }, 50);
    });
  }

  // ============================================================
  // 로깅
  // ============================================================
  function isConfigured() {
    return APPS_SCRIPT_URL && APPS_SCRIPT_URL.indexOf('REPLACE_WITH') === -1;
  }

  function logVisit(eventType, durationMs) {
    if (!isConfigured()) return; // setup 미완료 시 no-op

    const user = getLabUserSync() || 'anonymous';
    const payload = JSON.stringify({
      user: user,
      event: eventType,
      page: location.pathname,
      title: document.title,
      referrer: document.referrer || '',
      duration: durationMs || 0,
      timestamp: new Date().toISOString()
    });

    try {
      if (eventType === 'unload' && navigator.sendBeacon) {
        // beforeunload 시 sendBeacon이 가장 신뢰성 있음
        const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
        navigator.sendBeacon(APPS_SCRIPT_URL, blob);
      } else {
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: payload,
          keepalive: true
        }).catch(function () { /* 네트워크 실패 무시 */ });
      }
    } catch (e) {
      // 어떤 실패도 사이트 동작을 막지 않음
    }
  }

  // ============================================================
  // 페이지 라이프사이클
  // ============================================================
  async function onPageEnter() {
    // 사용자 확인 (없으면 modal)
    if (!getLabUserSync()) {
      await showLoginModal();
    }
    pageStartTime = Date.now();
    currentPage = location.pathname;
    logVisit('pageview', 0);
  }

  function onPageLeave() {
    const now = Date.now();
    const duration = now - pageStartTime;
    logVisit('unload', duration);
  }

  // Material for MkDocs instant navigation 호환
  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(function () {
      const now = Date.now();
      if (currentPage && currentPage !== location.pathname) {
        // 이전 페이지의 unload (instant nav 시 beforeunload는 발생하지 않음)
        logVisit('unload', now - pageStartTime);
      }
      onPageEnter();
    });
  } else {
    // fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onPageEnter);
    } else {
      onPageEnter();
    }
  }

  // 진짜 페이지 unload (브라우저 닫기, 외부 이동)
  window.addEventListener('beforeunload', onPageLeave);

  // 페이지 가시성 변경 (탭 백그라운드) — 모바일에서 beforeunload 신뢰도 낮음
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      const now = Date.now();
      logVisit('hidden', now - pageStartTime);
    } else if (document.visibilityState === 'visible') {
      pageStartTime = Date.now();
    }
  });

  // 디버그용 — 콘솔에서 호출 가능
  window.LabTracker = {
    getUser: getLabUserSync,
    setUser: setLabUser,
    clearUser: function () { try { localStorage.removeItem('lab_user'); } catch (e) {} },
    showLoginModal: showLoginModal,
    isConfigured: isConfigured,
    logVisit: logVisit
  };
})();
