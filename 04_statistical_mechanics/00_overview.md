# 통계역학 (Statistical Mechanics)

<span class="theory-group-label foundation">기초이론</span>

## 영역 구성

```text
04 통계역학 (Statistical Mechanics)
├── 01_ensembles            NVE / NVT / μVT / NPT / Boltzmann 분포
├── 02_partition_function   Z / 자유에너지 / 열역학량 추출 / 격자 기체
├── 03_lattice_models       Ising / mean field / Cluster Expansion / MC
├── 04_phase_transitions    order parameter / 임계지수 / 보편성 / Landau
└── 05_transport_theory     Onsager / FDT / Green-Kubo / Einstein 관계
```

## 개요

통계역학(statistical mechanics)은 미시적 자유도(원자, 분자의 위치와 운동량)로부터 거시적 열역학 함수(자유 에너지, 엔트로피, 압력)를 유도하는 이론 체계다. 배터리 소재 연구에서 통계역학은 여러 층위에서 필요하다: DFT 계산 결과로부터 유한 온도 상거동(phase behavior)을 예측하거나, 이온 확산의 온도 의존성을 이해하거나, 전극 재료의 삽입 전압의 SOC 의존성을 설명할 때 사용된다.

앙상블 이론(ensemble theory)은 통계역학의 핵심 프레임워크다. 정준 앙상블(canonical ensemble, NVT), 등온-등압 앙상블(NPT), 대정준 앙상블(grand canonical ensemble)은 각각 다른 외부 조건에 대응하며, 배터리 삽입 반응에서 리튬 화학 퍼텐셜을 다룰 때 grand canonical 관점이 자연스럽다.

격자 모델(lattice model)과 클러스터 전개(cluster expansion)는 DFT 계산과 통계역학을 연결하는 다리 역할을 한다. 원자 수준 상호작용 에너지를 DFT로 계산하고, 이를 Monte Carlo 시뮬레이션에 투입하여 유한 온도 상도표(phase diagram)를 예측하는 것이 현재 배터리 소재 이론 연구의 핵심 워크플로다.

## 학습 목표

- 정준 앙상블의 분배 함수(partition function)로부터 Helmholtz 자유 에너지를 유도하는 논리를 설명할 수 있다
- 대정준 앙상블(grand canonical)에서 화학 퍼텐셜($\mu$)의 역할과 배터리 삽입 반응과의 대응을 이해한다
- Ising 모델과 클러스터 전개(cluster expansion)의 기본 아이디어를 설명하고, DFT 데이터 피팅에의 적용을 이해한다
- 1차 상전이와 2차 상전이를 order parameter 관점에서 구분하고, 전압 곡선의 plateau/slope와 연결할 수 있다
- Onsager 수송 이론에서 확산 계수와 이동도(mobility)의 관계를 설명할 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_ensembles.md`](./01_ensembles.md) | 미시상태 계산, NVT/NPT/grand canonical 앙상블 |
| [`02_partition_function.md`](./02_partition_function.md) | 분배 함수 정의, Helmholtz/Gibbs 자유 에너지 연결 |
| [`03_lattice_models.md`](./03_lattice_models.md) | Ising 모델, 클러스터 전개, Monte Carlo 연결 |
| [`04_phase_transitions.md`](./04_phase_transitions.md) | 1차/2차 상전이, order parameter, Landau 이론 개요 |
| [`05_transport_theory.md`](./05_transport_theory.md) | Onsager 상반 관계, 확산 계수, 이온 이동도 |

## 추천 참고 도서

- McQuarrie, *Statistical Mechanics* — 물리화학 관점의 통계역학 표준 교재. 분배 함수부터 수송 이론까지 체계적.
- Hill, *An Introduction to Statistical Thermodynamics* — 열역학-통계역학 연결에 강점. 소규모 계 통계역학도 다룸.
- Chandler, *Introduction to Modern Statistical Mechanics* — 상전이와 상관 함수 등 현대적 주제 포함.

## 작성 상태

- **현재 상태:** 본문 완성 (5개 소주제 파일 모두 본문 작성 완료)
- 각 소주제 파일은 학습 목표 → 본문 → 참고 문헌 구성을 따른다
- 작동이론(06)의 전압 곡선·열 현상 본문에서 분배 함수, 격자 모델, 상전이 결과를 인용함
