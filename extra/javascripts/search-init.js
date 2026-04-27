/* ============================================================
   Pagefind UI 초기화 (옵션)
   - 빌드 후 `npx pagefind --site site` 으로 인덱스 생성된 경우 동작
   - 인덱스 없으면 silent fail (Material 기본 검색이 fallback)
   - Pagefind UI를 띄우려면 페이지에 <div id="pagefind-search"></div> 삽입
   ============================================================ */

(function () {
  function initPagefind() {
    const container = document.getElementById('pagefind-search');
    if (!container) return;
    if (typeof PagefindUI !== 'function') return;

    // 이미 초기화됐으면 skip
    if (container.dataset.pagefindInitialized === 'true') return;
    container.dataset.pagefindInitialized = 'true';

    try {
      new PagefindUI({
        element: '#pagefind-search',
        showSubResults: true,
        showImages: false,
        excerptLength: 30,
        resetStyles: false,
        translations: {
          placeholder: '검색어를 입력하세요...',
          clear_search: '지우기',
          load_more: '더 보기',
          search_label: '사이트 검색',
          filters_label: '필터',
          zero_results: '"[SEARCH_TERM]"에 대한 결과가 없습니다.',
          many_results: '[COUNT]개의 결과가 "[SEARCH_TERM]"에서 발견되었습니다.',
          one_result: '1개의 결과가 "[SEARCH_TERM]"에서 발견되었습니다.',
          alt_search: '"[SEARCH_TERM]"에 대한 결과가 없습니다. 대신 "[DIFFERENT_TERM]"의 결과를 표시합니다.',
          search_suggestion: '"[SEARCH_TERM]"에 대한 결과가 없습니다. 다음 검색어를 시도해보세요:',
          searching: '"[SEARCH_TERM]" 검색 중...'
        }
      });
    } catch (e) {
      // Pagefind 인덱스가 없으면 조용히 실패
      console.info('[search] Pagefind UI 초기화 실패 (정적 인덱스 미생성):', e && e.message);
    }
  }

  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(initPagefind);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagefind);
  } else {
    initPagefind();
  }
})();
