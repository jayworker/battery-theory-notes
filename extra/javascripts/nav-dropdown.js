/* ============================================================
   nav-dropdown.js — 클릭 기반 드롭다운 (호버보다 안정적)
   - 기초이론 / 실무이론 탭을 클릭하면 dropdown 토글
   - 다른 영역 클릭 시 자동 닫힘
   - 모바일/터치 환경 호환
   - Material instant navigation 호환
   ============================================================ */
(function () {
  "use strict";

  const NAV_GROUPS = {
    "기초이론": [
      ["01 전기화학", "01_electrochemistry/00_overview/"],
      ["02 고체",     "02_solid_state/00_overview/"],
      ["03 DFT",      "03_quantum_dft/00_overview/"],
      ["04 통계",     "04_statistical_mechanics/00_overview/"],
      ["05 수학",     "05_math_tools/00_overview/"]
    ],
    "실무이론": [
      ["06 작동이론",       "06_battery_operation/00_overview/"],
      ["07 소재분석",       "07_materials_analysis/00_overview/"],
      ["08 전기화학분석",   "08_echem_analysis/00_overview/"],
      ["09 고도분석",       "09_advanced_analysis/00_overview/"]
    ]
  };

  function getSiteRoot() {
    const logo = document.querySelector(".md-header__button.md-logo, a.md-header__button[href]");
    if (logo && logo.getAttribute("href")) {
      return logo.getAttribute("href").replace(/\/$/, "");
    }
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length > 0 ? "/" + parts[0] : "";
  }

  function findGroupForLink(linkEl) {
    // 정확 매칭 + 부분 매칭(아이콘/공백 등 대응)
    const txt = (linkEl.textContent || "").trim();
    if (NAV_GROUPS[txt]) return [txt, NAV_GROUPS[txt]];
    for (const k in NAV_GROUPS) {
      if (txt.includes(k)) return [k, NAV_GROUPS[k]];
    }
    // md-ellipsis 안의 텍스트도 시도
    const inner = linkEl.querySelector(".md-ellipsis");
    if (inner) {
      const t = (inner.textContent || "").trim();
      if (NAV_GROUPS[t]) return [t, NAV_GROUPS[t]];
    }
    return null;
  }

  function clearExisting() {
    document.querySelectorAll(".tab-dropdown").forEach(el => el.remove());
    document.querySelectorAll(".md-tabs__item.has-dropdown").forEach(el => {
      el.classList.remove("has-dropdown", "is-open");
    });
  }

  function closeAll() {
    document.querySelectorAll(".md-tabs__item.has-dropdown.is-open").forEach(el => {
      el.classList.remove("is-open");
    });
  }

  function attachDropdowns() {
    // Idempotent guard — 이미 모든 group에 dropdown이 부착되어 있으면 wipe 안 함.
    // setTimeout 재시도가 발화해도 사용자 .is-open 상태 보존.
    const expectedGroups = Object.keys(NAV_GROUPS).length;
    const alreadyAttached = document.querySelectorAll(
      ".md-tabs__item.has-dropdown .tab-dropdown"
    ).length;
    if (alreadyAttached >= expectedGroups) {
      return;
    }

    clearExisting();
    const root = getSiteRoot();
    const items = document.querySelectorAll(".md-tabs__item");
    let attached = 0;

    items.forEach(item => {
      const link = item.querySelector(".md-tabs__link, a");
      if (!link) return;
      const found = findGroupForLink(link);
      if (!found) return;
      const groupItems = found[1];

      item.classList.add("has-dropdown");

      const panel = document.createElement("div");
      panel.className = "tab-dropdown";
      panel.setAttribute("role", "menu");

      groupItems.forEach(function (entry) {
        const a = document.createElement("a");
        a.className = "tab-dropdown__item";
        a.setAttribute("role", "menuitem");
        a.href = root + "/" + entry[1];
        a.textContent = entry[0];
        panel.appendChild(a);
      });

      item.appendChild(panel);

      // 클릭 시 토글 — 탭 자체의 페이지 이동 막음
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const wasOpen = item.classList.contains("is-open");
        closeAll();
        if (!wasOpen) item.classList.add("is-open");
      });

      attached++;
    });

    if (window.console) {
      console.log("[nav-dropdown] attached:", attached, "/", items.length, "tabs");
    }
  }

  // 외부 클릭 시 닫기
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".md-tabs__item.has-dropdown")) closeAll();
  });

  // ESC로 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  function init() {
    if (typeof window.document$ !== "undefined" &&
        window.document$ &&
        typeof window.document$.subscribe === "function") {
      window.document$.subscribe(attachDropdowns);
    }
    attachDropdowns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Material main.js의 document$ 노출이 늦는 환경 대응
  setTimeout(attachDropdowns, 500);
  setTimeout(attachDropdowns, 1500);
  setTimeout(attachDropdowns, 3000);
})();
