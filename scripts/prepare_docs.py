#!/usr/bin/env python3
"""
prepare_docs.py — MkDocs 빌드 전 docs/ 디렉토리를 콘텐츠로 채운다.

MkDocs 1.6+는 `docs_dir`이 config 파일과 같거나 부모 디렉토리이면 거부한다.
이 프로젝트는 콘텐츠 마크다운 파일을 레포 루트에 두는 컨벤션이므로,
빌드 직전에 `docs/` 하위로 콘텐츠 디렉토리를 복사한다.

사용:
    python scripts/prepare_docs.py
    mkdocs serve  # 또는 mkdocs build

CI에서도 동일하게 동작 (.github/workflows/deploy.yml 참조).
"""
from __future__ import annotations
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs"

# 콘텐츠로 포함할 디렉토리
CONTENT_DIRS = [
    "01_electrochemistry",
    "02_solid_state",
    "03_quantum_dft",
    "04_statistical_mechanics",
    "05_math_tools",
    "06_battery_operation",
    "07_materials_analysis",
    "08_echem_analysis",
    "09_advanced_analysis",
]

# 루트의 추가 콘텐츠 파일. (홈은 별도로 HOME_SOURCE를 index.md로 복사)
CONTENT_FILES: list[str] = []

# 사이트 루트(`/`)로 매핑할 홈 페이지 소스
HOME_SOURCE = "00_index.md"
HOME_TRANSLATION_SOURCES = {
    "en": "00_index.en.md",
}

# extra/ 자산 (CSS / JS) — mkdocs.yml의 `extra_css` / `extra_javascript` 와 일치
EXTRA_DIRS = [
    "extra",
]


def clean_docs() -> None:
    if DOCS_DIR.exists():
        shutil.rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)


def copy_content() -> None:
    for d in CONTENT_DIRS:
        src = ROOT / d
        if not src.is_dir():
            print(f"WARNING: 콘텐츠 디렉토리 누락: {src}", file=sys.stderr)
            continue
        dst = DOCS_DIR / d
        shutil.copytree(src, dst)
        print(f"  copied {d}/")

    for f in CONTENT_FILES:
        src = ROOT / f
        if not src.is_file():
            print(f"WARNING: 콘텐츠 파일 누락: {src}", file=sys.stderr)
            continue
        dst = DOCS_DIR / f
        shutil.copy2(src, dst)
        print(f"  copied {f}")

    # 사이트 루트 / 에 매핑할 index.md (HOME_SOURCE의 사본)
    home_src = ROOT / HOME_SOURCE
    if home_src.is_file():
        shutil.copy2(home_src, DOCS_DIR / "index.md")
        print(f"  copied {HOME_SOURCE} -> index.md (site home)")

    for locale, source in HOME_TRANSLATION_SOURCES.items():
        translated_home = ROOT / source
        if translated_home.is_file():
            shutil.copy2(translated_home, DOCS_DIR / f"index.{locale}.md")
            print(f"  copied {source} -> index.{locale}.md (site home, {locale})")

    for d in EXTRA_DIRS:
        src = ROOT / d
        if not src.is_dir():
            continue
        dst = DOCS_DIR / d
        shutil.copytree(src, dst)
        print(f"  copied {d}/ (assets)")


def main() -> int:
    print(f"[prepare_docs] root = {ROOT}")
    print(f"[prepare_docs] docs = {DOCS_DIR}")
    clean_docs()
    copy_content()
    print("[prepare_docs] DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
