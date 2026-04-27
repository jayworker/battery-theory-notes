# 고체물리/화학 (Solid State Physics and Chemistry)

<span class="theory-group-label foundation">기초이론</span>

## 영역 구성

```text
02 고체물리/화학 (Solid State Physics and Chemistry)
├── 01_crystal_structure   Bravais / 공간군 / Miller / rock-salt·layered·spinel·olivine
├── 02_band_theory         Bloch / DOS / Fermi level / d-band / Jahn-Teller
├── 03_defect_chemistry    점결함 / Kröger-Vink / Schottky·Frenkel / Brouwer
├── 04_ionic_conduction    Arrhenius / hopping / Nernst-Einstein / Haven ratio
└── 05_phase_diagrams      Gibbs 상규칙 / common tangent / 인터칼레이션 상도
```

## 개요

고체물리와 고체화학은 배터리 소재의 구조-물성 관계를 이해하는 근간이다. 리튬이온전지의 양극재(NMC, LFP 등), 음극재(흑연, Si), 고체전해질 모두 특정 결정 구조를 가지며, 이 구조가 이온 전도도, 전자 전도도, 상 안정성, 열적 안정성을 결정한다.

결정 구조(crystal structure)와 대칭성(symmetry)에서 출발하여, 전자 구조(band theory)로 이어지는 흐름은 "왜 이 소재는 금속 도체이고 저 소재는 절연체인가"에 답한다. 점결함(point defect)과 Kroger-Vink 표기법은 소재 내 이온 이동과 전자 전도의 실제 담당자를 기술하며, 이온 전도(ionic conduction)의 활성화 에너지와 직결된다.

상평형(phase equilibrium) 및 상전이(phase transition) 이론은 충방전 중 발생하는 구조 변화 — layered → spinel → rock-salt 전환 등 — 를 열역학적으로 이해하는 데 필수다. Gibbs 상률(phase rule)과 자유 에너지 곡선이 전압 곡선의 형태(plateau vs slope)를 결정하는 원리는 배터리 작동이론과 직접 연결된다.

## 학습 목표

- 배터리 주요 소재(층상 구조, 스피넬, 감람석)의 결정 구조를 공간군과 와이코프 위치로 기술할 수 있다
- 밴드 이론을 이용하여 전자 도체, 절연체, 반도체를 구분하고 전이금속 산화물의 $d$-band 특성을 설명할 수 있다
- Kroger-Vink 표기법으로 점결함 반응식을 작성하고, 결함 농도와 이온 전도도의 관계를 설명할 수 있다
- 이온 전도의 활성화 에너지를 Arrhenius 식으로 분석하고, 소재 선택 기준에 적용할 수 있다
- Gibbs 상률과 자유 에너지 조성 곡선을 이용하여 2상 공존 구간과 단상 고용체 구간을 구분할 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_crystal_structure.md`](./01_crystal_structure.md) | 브라베 격자, 공간군, 배터리 소재 결정 구조 |
| [`02_band_theory.md`](./02_band_theory.md) | 자유전자 모델, 밴드갭, 전이금속 $d$-band |
| [`03_defect_chemistry.md`](./03_defect_chemistry.md) | 점결함 종류, Kroger-Vink 표기, 결함 평형 |
| [`04_ionic_conduction.md`](./04_ionic_conduction.md) | Arrhenius 활성화 에너지, 이온 전도 경로, 고체전해질 |
| [`05_phase_diagrams.md`](./05_phase_diagrams.md) | Gibbs 상률, 2상 공존, 자유 에너지 곡선과 전압 연결 |

## 추천 참고 도서

- West, *Solid State Chemistry and its Applications* (2nd ed.) — 결정 구조, 결함 화학, 이온 전도를 균형 있게 다루는 고체화학 표준 교재.
- Kittel, *Introduction to Solid State Physics* — 밴드 이론과 결정 구조의 물리적 기초.
- Shriver & Atkins, *Inorganic Chemistry* — 전이금속 산화물의 전자 구조와 배위 화학.

## 작성 상태

- **현재 상태:** 본문 완성 (5개 소주제 파일 모두 본문 작성 완료)
- 각 소주제 파일은 학습 목표 → 본문 → 참고 문헌 구성을 따른다
- 작동이론(06)의 노화·계면·기계화학 본문에서 이 영역의 결정 구조·결함 화학 결과를 인라인으로 인용함
