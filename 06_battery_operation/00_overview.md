# 배터리 작동이론 (Battery Operation Theory)

<span class="theory-group-label practical">실무이론</span>

## 영역 구성

```text
06 배터리 작동이론 (Battery Operation Theory)
├── 01_voltage_curves      V-Q 곡선 / dQ/dV (ICA) / dV/dQ (DVA) / 히스테리시스
├── 02_polarization        과전압 3성분 / GITT 확산계수 / EIS 등가회로
├── 03_interface           SEI / CEI / Li 플레이팅 / 덴드라이트 / cross-talk
├── 04_mechanochemistry    부피 변화 / 응력-확산 결합 / 입자 균열 / Si 음극
├── 05_thermal             가역열 / 엔트로피 측정 / Bernardi / 열폭주
├── 06_degradation         LLI / LAM / TM 용출 / cation mixing / 가스
├── 07_operando            operando XRD/Raman/TEM/DEMS/NMR/XAS
└── 08_anomalies           voltage fade / memory effect / anionic redox / knee
```

## 개요

배터리 작동이론 영역은 실제 리튬이온전지가 충방전 과정에서 어떤 전기화학적·물리화학적 현상을 겪는지를 종합적으로 다룬다. 단순히 개별 현상을 나열하는 것이 아니라, 전압 곡선의 모양이 왜 그런지(열역학), 과전압이 어떤 성분으로 분리되는지(동역학), 계면에서 무슨 일이 일어나는지(SEI/CEI), 기계적 열화와 열적 거동, 장기 노화 메커니즘, 그리고 이를 관찰하는 실험 기법까지 연결하여 이해하는 것이 목표다.

이 영역은 01~05의 기초이론 — 전기화학 열역학/동역학, 고체화학, 통계역학 — 이 실제 배터리에서 어떻게 발현되는지를 보여주는 "종합 응용" 영역이다. 본문 안에 기초이론의 핵심 결과가 인라인 참조 박스 형태로 자기충족적으로 포함되어 있어, 박스만 읽고도 흐름이 끊기지 않는다. 더 깊이 보고 싶을 때 박스에서 인용된 기초이론 본문(01~05)으로 이동하면 된다.

연구 현장에서 가장 자주 접하는 데이터 — 충방전 곡선, EIS 스펙트럼, GITT 결과, 사이클 수명 곡선 — 를 해석하는 데 필요한 이론적 배경을 모두 이 영역에서 찾을 수 있다.

## 학습 목표

- 충방전 곡선(V-Q curve)의 plateau/slope 형태를 2상 반응/고용체 반응의 열역학으로 설명하고, ICA(dQ/dV)와 DVA(dV/dQ) 분석을 통해 노화 모드를 진단할 수 있다
- 과전압(overpotential)을 옴 분극/활성화 분극/농도 분극으로 분리하고, GITT와 EIS로 각 성분을 정량하는 방법을 이해한다
- SEI(Solid Electrolyte Interphase)의 형성 메커니즘, 구조, 성장 동역학을 설명하고, 쿨롱 효율과의 관계를 이해한다
- LLI(Loss of Lithium Inventory)와 LAM(Loss of Active Material)을 구분하고, 각 노화 모드의 전기화학적 시그니처를 해석할 수 있다
- Operando XRD, Raman, DEMS, XAS 등 실시간 분석 기법의 원리와 각 기법이 답할 수 있는 질문을 구분할 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_voltage_curves.md`](./01_voltage_curves.md) | V-Q 곡선, ICA/DVA 분석, 히스테리시스 |
| [`02_polarization.md`](./02_polarization.md) | 과전압 3성분, GITT 확산계수, EIS 등가회로 |
| [`03_interface.md`](./03_interface.md) | SEI/CEI 구조와 성장, Li 플레이팅, 덴드라이트 |
| [`04_mechanochemistry.md`](./04_mechanochemistry.md) | 부피 변화, 응력-확산 결합, 입자 균열 |
| [`05_thermal.md`](./05_thermal.md) | 가역열/비가역열, 엔트로피 측정, 열폭주 |
| [`06_degradation.md`](./06_degradation.md) | LLI/LAM, TM 용출, cation mixing, 가스 발생 |
| [`07_operando.md`](./07_operando.md) | XRD/Raman/TEM/DEMS/NMR/XAS 실시간 기법 |
| [`08_anomalies.md`](./08_anomalies.md) | Voltage fade, memory effect, anionic redox, knee point |

## 추천 참고 도서 및 논문

- Newman & Thomas-Alyea, *Electrochemical Systems* (3rd ed.) — 다공성 전극 모델, 분극 분해 이론.
- Vetter et al., *Electrochimica Acta* 50 (2005) 2735–2751 — 노화 메커니즘 종합 리뷰.
- Birkl et al., *Journal of Power Sources* 341 (2017) 373–386 — LLI/LAM 진단 방법론 표준 참고 논문.
- Christensen & Newman, *Journal of The Electrochemical Society* 153 (2006) A1019 — 응력-확산 결합 모델.

## 작성 상태

- **현재 상태:** 본문 완성 (8개 소주제 파일 모두 본문 작성 완료)
- 각 본문 파일은 교차 참조 인라인 박스로 자기충족적 — 기초이론(01~05) 파일을 따라가지 않아도 박스만 읽으면 흐름 유지
- 더 깊이 보고 싶을 때 박스에서 인용된 기초이론 본문(예: `01_electrochemistry/02_kinetics.md`)으로 이동
