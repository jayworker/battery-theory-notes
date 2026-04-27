/* ============================================================
   nav-dropdown.js
   상단 탭(기초이론 / 실무이론)에 호버 드롭다운 추가.
   - 기초이론 hover → 01~05 영역 링크
   - 실무이론 hover → 06~09 영역 링크
   - Material instant navigation 호환 (페이지 전환 시 재부착)
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
    // Material의 logo 링크가 사이트 루트를 가리킨다 (GitHub Pages project page 호환).
    const logo = document.querySelector(".md-header__button.md-logo");
    if (logo && logo.getAttribute("href")) {
      return logo.getAttribute("href").replace(/\/$/, "");
    }
    return "";
  }

  function clearExisting() {
    document.querySelectorAll(".tab-dropdown").forEach(el => el.remove());
    document.querySelectorAll(".md-tabs__item.has-dropdown").forEach(el => {
      el.classList.remove("has-dropdown");
    });
  }

  function attachDropdowns() {
    clearExisting();
    const root = getSiteRoot();
    const items = document.querySelectorAll(".md-tabs__item");

    items.forEach(item => {
      const link = item.querySelector(".md-tabs__link");
      if (!link) return;
      const text = link.textContent.trim();
      const groupItems = NAV_GROUPS[text];
      if (!groupItems) return;

      item.classList.add("has-dropdown");

      const panel = document.createElement("div");
      panel.className = "tab-dropdown";
      panel.setAttribute("role", "menu");

      groupItems.forEach(function (entry) {
        const label = entry[0];
        const path = entry[1];
        const a = document.createElement("a");
        a.className = "tab-dropdown__item";
        a.setAttribute("role", "menuitem");
        a.href = root + "/" + path;
        a.textContent = label;
        panel.appendChild(a);
      });

      item.appendChild(panel);
    });
  }

  // Material instant navigation: 페이지 전환마다 재부착.
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(attachDropdowns);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachDropdowns);
  } else {
    attachDropdowns();
  }
})();
