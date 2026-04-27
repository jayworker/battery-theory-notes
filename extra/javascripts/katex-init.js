/* ============================================================
   KaTeX auto-render 초기화
   pymdownx.arithmatex (generic: true) 호환.
   Material for MkDocs의 instant navigation도 지원.
   ============================================================ */

(function () {
  function renderMath() {
    if (typeof renderMathInElement !== "function") {
      // KaTeX auto-render가 아직 로드되지 않았으면 잠시 후 재시도
      setTimeout(renderMath, 100);
      return;
    }
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      ignoredClasses: ["no-katex"]
    });
  }

  // Material for MkDocs instant navigation 호환
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(function () {
      renderMath();
    });
  } else {
    // fallback: 기본 DOMContentLoaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", renderMath);
    } else {
      renderMath();
    }
  }
})();
