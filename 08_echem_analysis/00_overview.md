# 전기화학분석 (Electrochemical Analysis) — 개요

## 1. 영역의 위치

06번 작동이론(`battery operation`)이 "왜 이런 현상이 보이나"를 다룬다면, 08번 전기화학분석(electrochemical analysis)은 그 현상을 **어떻게 측정하고 어떻게 해석할 것인가**를 다룬다. 즉 06이 분극(polarization)·노화(aging)·계면(interface)의 메커니즘을 설명한다면, 08은 CV·GCD·EIS·GITT/PITT·LSV 같은 측정 기법(technique)이 **무엇을 가정하고**, **어떤 조건에서 신뢰할 만하며**, **추출된 값이 실제로 무엇을 의미하는가**를 정리한다.

01번 전기화학 기초가 Butler-Volmer·Nernst·Warburg의 **식 자체**를 다뤘다면, 08은 그 식들을 **데이터에 맞추는 절차**와 **흔히 발생하는 함정(common pitfalls)** 을 정리하는 응용 영역이다.

대학원 실험실에서 매일 만나는 상용 포텐시오스탯(BioLogic, Gamry, Autolab) 데이터를 어떻게 수집·점검·해석할지 — 그 실전 매뉴얼.

## 2. 학습 목표

이 영역을 끝내면 다음을 할 수 있어야 한다.

1. CV(cyclic voltammetry) 데이터에서 **가역성(reversibility)** 을 정량 판정하고, surface 반응과 diffusion-controlled 반응을 scan rate 의존성으로 구분할 수 있다.
2. GCD(galvanostatic charge-discharge) rate test와 cycling 프로토콜을 **표준 절차대로** 설계하고 ICE·rate capability·retention을 정량화할 수 있다.
3. EIS 측정에서 **AC 진폭·주파수 범위·DC bias·KK 검증**을 점검하고, fitting workflow를 잔차 분석까지 마칠 수 있다.
4. GITT/PITT로 **고체 내 확산 계수** $D_\text{Li}$ 를 추출할 때 가정 위반(plateau에서 측정, 펄스 시간 부적절)을 식별할 수 있다.
5. 3-electrode 셀 설계(reference 선택·placement·Luggin)를 통해 **양극·음극의 분극을 분리**해 측정할 수 있다.

## 3. 소주제 목차

| 파일 | 1줄 요약 |
|------|----------|
| `01_cv.md` | CV로 가역성 판정과 Randles-Sevcik 분석 — surface vs diffusion-controlled 구분 |
| `02_gcd_rate.md` | C-rate 정의, rate capability 측정 절차, ICE와 formation cycle |
| `03_eis_practical.md` | EIS 측정 셋업·fitting workflow·KK 검증·common pitfalls |
| `04_gitt_pitt.md` | GITT vs PITT — 펄스 시간/이완 시간 선택과 Weppner-Huggins 적용 조건 |
| `05_three_electrode.md` | 3-electrode 셀 설계, reference electrode 선택과 placement |
| `06_lsv_tafel.md` | LSV로 안정성 윈도우 측정과 Tafel slope·$j_0$ 추출 |
| `07_cycling_protocols.md` | Formation·calendar·accelerated aging 프로토콜과 BMS-relevant 윈도우 |

## 4. 의사결정 트리: "어떤 측정을 쓸까"

연구 질문이 정해지면 도구가 결정된다. 다음은 흔히 부딪히는 질문 → 적절한 측정 기법 매핑이다.

- **산화환원 가역성 판정?** → CV ($\Delta E_p$, $i_{pa}/i_{pc}$ 비)
- **C-rate별 용량 평가?** → GCD rate test (0.1C → 10C → 0.1C 회복)
- **어디서 발생한 저항인가?** → EIS + DRT(Distribution of Relaxation Times)
- **고체 내 확산 계수 $D_\text{Li}$?** → GITT 또는 PITT (SOC별)
- **양극/음극 분극을 따로?** → 3-electrode 셀
- **전해질 안정성 윈도우?** → LSV (산화/환원 한계 전위)
- **수명·노화 평가?** → cycling protocols (formation + calendar + accelerated)

여러 측정을 **교차 검증** 하는 것이 표준이다. 예: $j_0$ 는 CV의 Tafel 영역과 EIS의 $R_\text{ct}$ 양쪽에서 추출 가능하며, 두 값이 한 자릿수 이상 차이나면 가정 위반(다단계 반응, 농도 분극 침입)을 의심해야 한다.

## 5. 추천 도서

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Ch. 6–10이 CV·step·hydrodynamic methods의 표준 레퍼런스. 실험 챕터(Ch. 11–15)는 cell design·reference electrode·instrumentation까지 포괄.
- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — EIS 측정·fitting·KK·DRT의 표준 교과서. 실전 회로 카탈로그가 풍부.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — CV·LSV·Tafel 분석을 학생 친화적 톤으로. 시뮬레이션 예제 다수.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — KK 검증과 측정 실전 챕터가 강력.
- Plett, G. L. *Battery Management Systems* Vol. 1–2 (Artech House, 2015) — cycling 프로토콜·SOC·SOH 추정의 BMS 관점.

## 6. 작성 상태

**본문 완성** (2026-04-27). 7개 본문 파일 모두 Tier 통과, 박스 외부 링크 0건, KR/EN 병기·LaTeX·참고 문헌 모두 준수.
