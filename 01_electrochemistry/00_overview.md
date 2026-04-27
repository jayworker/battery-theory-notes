# 전기화학 기초 (Electrochemistry)

<span class="theory-group-label foundation">기초이론</span>

## 영역 구성

```text
01 전기화학 기초 (Electrochemistry)
├── 01_thermodynamics      Gibbs / Nernst / 전극전위 / Pourbaix / 활동도
├── 02_kinetics            Butler-Volmer / Tafel / Marcus / 교환전류
├── 03_mass_transport      Fick / Nernst-Planck / Cottrell / Levich
├── 04_double_layer        Helmholtz / GCS / Stern / Debye / PZC
└── 05_eis_fundamentals    복소 임피던스 / Randles / Warburg / KK / DRT
```

## 개요

전기화학(electrochemistry)은 전기 에너지와 화학 에너지의 상호 변환을 다루는 학문이다. 이차전지는 본질적으로 전기화학 반응기이므로, 전극전위(electrode potential), 과전압(overpotential), 물질 전달(mass transport) 등의 개념을 정확히 이해하는 것이 배터리 연구의 출발점이 된다.

이 영역은 열역학적 평형 조건에서 출발하여 — 어떤 전위에서 반응이 자발적인가 — 동역학적 영역으로 확장된다. 전류가 흐를 때 실제 전위가 평형에서 얼마나 벗어나는가(과전압), 그 과전압이 어떤 단계에서 기원하는가(반응 속도론, 물질 전달, 전기 이중층)를 구분하는 것이 핵심이다.

배터리 연구자에게 전기화학 기초가 중요한 이유는 충방전 곡선, 임피던스 스펙트럼, GITT 결과 등 모든 실험 데이터를 해석하는 언어가 바로 이 영역에서 나오기 때문이다. EIS의 각 반원이 무엇을 뜻하는지, Tafel 기울기에서 무엇을 읽을 수 있는지를 이해하려면 이 기초가 필수적이다.

## 학습 목표

- Gibbs 자유 에너지와 전극전위의 관계, Nernst 식을 농도/활동도 측면에서 설명할 수 있다
- Butler-Volmer 식에서 교환 전류밀도($i_0$)와 전달 계수($\alpha$)의 의미를 파악하고, Tafel 영역에서의 근사 조건을 설명할 수 있다
- 확산(diffusion), 대류(convection), 이동(migration)의 세 물질 전달 기구를 구분하고 Fick 법칙을 배터리 상황에 적용할 수 있다
- 전기 이중층(electrical double layer) 모델 (Helmholtz, Gouy-Chapman, Stern)의 구조와 커패시턴스를 이해한다
- EIS Nyquist 플롯의 각 요소(반원, Warburg tail)를 물리적 과정에 대응시킬 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_thermodynamics.md`](./01_thermodynamics.md) | Gibbs 에너지, Nernst 식, 전극전위, Pourbaix 다이어그램 |
| [`02_kinetics.md`](./02_kinetics.md) | Butler-Volmer 식, Tafel 기울기, 교환 전류밀도 |
| [`03_mass_transport.md`](./03_mass_transport.md) | Fick 법칙, 확산층, Sand 식, 농도 분극 |
| [`04_double_layer.md`](./04_double_layer.md) | Helmholtz/GCS/Stern 모델, 이중층 커패시턴스 |
| [`05_eis_fundamentals.md`](./05_eis_fundamentals.md) | 임피던스 정의, Nyquist/Bode 플롯, 등가회로 요소 |

## 추천 참고 도서

- Bard & Faulkner, *Electrochemical Methods: Fundamentals and Applications* (2nd ed.) — 전기화학 표준 교재. 열역학부터 동역학, 기법까지 체계적으로 다룸.
- Newman & Thomas-Alyea, *Electrochemical Systems* (3rd ed.) — 배터리/연료전지 적용에 특화. 물질 전달과 다공성 전극 이론이 강함.
- Lasia, *Electrochemical Impedance Spectroscopy and its Applications* — EIS 이론과 등가회로 모델링의 표준 참고서.

## 작성 상태

- **현재 상태:** 본문 완성 (5개 소주제 파일 모두 본문 작성 완료)
- 각 소주제 파일은 학습 목표 → 본문 → 참고 문헌 구성을 따른다
- 작동이론(06)의 인라인 참조 박스에서 이 영역의 본문을 자주 인용함
