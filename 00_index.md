# 이차전지 이론 학습 노트

> 이차전지 소재 연구를 위한 이론 학습 노트

---

## 사용 안내

- **용도:** 이차전지 소재 연구 대학원생의 재학습(review) 노트. 처음 배우는 교재가 아니라, "수업에서 들었지만 정리가 안 된" 내용을 빠르게 되살리는 참고서.
- **언어:** 한국어 본문 + 영문 학술 용어 괄호 병기 (예: 분극(polarization)). 최초 등장 시 반드시 병기.
- **수식:** LaTeX 표기 (`$...$` 인라인, `$$...$$` 블록). GitHub 마크다운 / VSCode Preview 렌더링 기준.
- **구조:** 영역별 폴더 → 소주제별 `.md` 파일. 각 영역의 `00_overview.md`에서 전체 흐름을 파악한 뒤 소주제 파일로 진입할 것.
- **교차 참조:** 작동이론(06) 본문은 기초이론(01~05)의 핵심 결과를 인라인 참조 박스로 자기충족적으로 포함. 박스만 읽어도 논리 흐름이 유지되며, 더 깊이 파고들고 싶을 때 인용된 기초 이론 파일로 이동.

---

## 영역 구성

상단 탭은 9개 영역(01~09)을 나란히 노출한다. 개념적으로는 두 그룹으로 나뉜다.

### <span class="theory-group-label foundation">기초이론</span> 01 – 05

물리·화학·수학의 토대. 작동이론 본문이 박스로 인용하는 핵심 결과들의 근거.

| 번호 | 영역명 | Overview 링크 |
|------|--------|--------------|
| 01 | 전기화학 (Electrochemistry) | [01_electrochemistry/00_overview.md](./01_electrochemistry/00_overview.md) |
| 02 | 고체물리·화학 (Solid State) | [02_solid_state/00_overview.md](./02_solid_state/00_overview.md) |
| 03 | DFT·양자화학 (Quantum & DFT) | [03_quantum_dft/00_overview.md](./03_quantum_dft/00_overview.md) |
| 04 | 통계역학 (Statistical Mechanics) | [04_statistical_mechanics/00_overview.md](./04_statistical_mechanics/00_overview.md) |
| 05 | 수학 도구 (Mathematical Tools) | [05_math_tools/00_overview.md](./05_math_tools/00_overview.md) |

### <span class="theory-group-label practical">실무이론</span> 06 – 09

실제 셀과 분석 장비를 다루는 영역. 합성·측정·해석에서 매일 쓰는 도구.

| 번호 | 영역명 | Overview 링크 |
|------|--------|--------------|
| 06 | 배터리 작동이론 (Battery Operation) | [06_battery_operation/00_overview.md](./06_battery_operation/00_overview.md) |
| 07 | 소재분석 (Materials Characterization) | [07_materials_analysis/00_overview.md](./07_materials_analysis/00_overview.md) |
| 08 | 전기화학분석 (Electrochemical Analysis) | [08_echem_analysis/00_overview.md](./08_echem_analysis/00_overview.md) |
| 09 | 고도분석 (Advanced / Operando) | [09_advanced_analysis/00_overview.md](./09_advanced_analysis/00_overview.md) |

---

## 영역별 한 줄 설명

- **01 전기화학 기초:** 전극전위, Nernst 식, Butler-Volmer 속도론, 물질 전달, 전기 이중층, EIS 원리 — 배터리 전기화학의 언어.
- **02 고체물리/화학:** 결정 구조, 밴드 이론, 결함 화학, 이온 전도, 상평형 — 소재 물성의 미시적 근거.
- **03 DFT/양자화학:** 슈뢰딩거 방정식, Hohenberg-Kohn 정리, Kohn-Sham 방정식, 교환-상관 범함수 — 제1원리 계산의 이론적 토대.
- **04 통계역학:** 앙상블 이론, 분배 함수, 격자 모델, 상전이 이론, Onsager 수송 — 열역학 함수와 마이크로 상태의 연결.
- **05 수학 도구:** ODE/PDE, 선형대수, 복소해석 및 변환, 수치 해석, 데이터 분석 — 이론과 실험을 잇는 수학적 언어.
- **06 배터리 작동이론:** 충방전 곡선, 분극 분해, 계면 현상, 기계화학, 열 현상, 노화 메커니즘, operando 기법, 이상 현상 — 실제 배터리의 작동 원리 종합.
- **07 소재분석:** XRD·SEM·TEM·XPS·Raman·BET·ICP·TGA — 소재 합성·검증의 기본 도구.
- **08 전기화학분석:** CV·GCD·EIS·GITT·3-electrode·LSV·cycling — 측정 셋업과 데이터 해석 워크플로우.
- **09 고도분석:** operando XRD·XAS·cryo-EM·DEMS·ssNMR·EC-AFM·ToF-SIMS — synchrotron/협업 facility 활용 도구.

---

## 학습 진입점 안내

**현재 구성:** 9개 영역(01~09) 모두 본문 완성. 총 57개 마크다운 파일(영역별 `00_overview.md` 9개 + 소주제 본문 48개 + 색인 1개 + 기타), 약 7,400+줄.

## 연구 단계별 진입 경로 (NEW)

| 연구 단계 | 권장 영역 |
|---|---|
| 이론 학습 | 01-05 (기초) → 06 (작동) |
| 합성 직후 검증 | 07 소재분석 (XRD, SEM, ICP) |
| 셀 측정/해석 | 08 전기화학분석 (CV, GCD, EIS) |
| 메커니즘 규명 (논문) | 09 고도분석 (operando, cryo-EM, XAS) |
| 노화/실패 분석 | 06 노화 + 07 post-mortem + 08 EIS + 09 ssNMR |

권장 학습 흐름은 두 가지다.

1. **작동이론 우선 흐름 (실무·해석 중심)**
   - 진입점: [`06_battery_operation/00_overview.md`](./06_battery_operation/00_overview.md) → 관심 있는 소주제(예: `02_polarization.md`)부터 진입.
   - 작동이론 본문은 기초 이론을 인라인 박스로 자기충족적으로 포함하므로, 박스만 읽고도 흐름이 끊기지 않는다.
   - 박스에서 인용된 기초 이론(예: 01의 Butler-Volmer, 02의 결정 구조)을 더 깊이 보고 싶을 때 해당 파일로 이동.
   - 충방전 곡선·EIS·GITT 같은 실험 데이터 해석을 빨리 되찾고 싶을 때 적합.

2. **기초 → 응용 흐름 (이론 체계 중심)**
   - 진입점: [`01_electrochemistry/00_overview.md`](./01_electrochemistry/00_overview.md) → 02 → 03 → 04 → 05 → 06 순.
   - 전기화학 → 고체화학 → DFT → 통계역학 → 수학 도구 → 작동이론 종합으로 이어지는 표준 학습 순서.
   - 전체 이론 체계를 다시 복습하거나 처음부터 정독하고 싶을 때 적합.

**연구 주제 매칭 가이드 (재학습 시작점 추천):**
- 양극재 합성/구조/노화 → 02 → 06.06 → 06.04
- DFT 계산 (전압, 이동 장벽) → 03 → 06.01 → 02.03
- EIS / GITT 해석 → 01.05 → 01.02 → 06.02 → 06.07
- 고체전해질 / 이온 전도 → 02.04 → 04.05 → 06.03
- 셀 수명 / 가속 노화 → 06.06 → 06.03 → 06.08

---

*생성일: 2026-04-27 | Plan ID: battery-theory-textbook*
