# LSV와 Tafel 분석 (Linear Sweep Voltammetry & Tafel Analysis)

## 1. 개요

선형 sweep voltammetry(linear sweep voltammetry, LSV)는 전위를 한 방향으로만 천천히 휩쓸며 전류를 측정하는, CV의 단방향 버전이다. 두 가지 전형적 용도가 있다: (1) **전해질 안정성 윈도우**(stability window) 결정 — 산화/환원 한계 전위에서 전류가 갑자기 폭증하는 지점, (2) **Tafel slope 추출** — 충분히 큰 과전압 영역에서 $\eta$ vs $\log j$ 의 기울기로 전극 동역학 정량화.

CV가 가역성·redox couple 진단에 강하다면, LSV는 비가역 단방향 반응(전해질 분해, OER/HER, 부식)의 정량 분석에 표준이다.

## 2. 전해질 안정성 윈도우 측정

배터리에서 사용 가능한 전위 범위는 전해질이 분해되지 않는 영역에 의해 제한된다. 산화 한계는 양극(anodic) 방향 LSV에서, 환원 한계는 음극(cathodic) 방향 LSV에서 결정한다.

직관적으로, 안정 영역에서는 전류가 거의 0(이중층 충전과 자가 방전만)이고, 분해 시작 전위에서 전류가 지수적으로 폭증한다. 임의의 임계 전류 (보통 10 μA/cm²) 를 넘는 첫 전위를 분해 한계로 삼는다.

**측정 절차**:
- WE: 비활성 전극 (Pt, Au, GC) — 활물질의 redox와 분해 반응을 분리.
- 전해질 안정 윈도우 측정 시 전극 표면적 normalization 필수 (current density 기준).
- Scan rate: 0.1~10 mV/s (느릴수록 정확하나 측정 시간 ↑)
- 양극 한계: OCV → +6.0 V (Li/Li⁺ 기준) 까지 sweep
- 음극 한계: OCV → 0 V (Li/Li⁺ 기준) 까지 sweep

**임계 전류 정의의 함정**: 10 μA/cm² 는 관행이지만 표면적·전해질 시스템에 따라 1 μA/cm² 또는 100 μA/cm² 로 잡기도 한다. 보고할 때 임계 기준을 반드시 명시.

대표값 (Li/Li⁺ 기준):
- LP30 (1M LiPF₆ in EC:DMC): 산화 ~4.5 V, 환원 ~1.0 V
- 폴리머 전해질 (PEO 기반): 산화 ~4.0 V, 환원 ~0 V
- 고체 전해질 (LLZO): 산화 ~5.0+ V, 환원 ~0 V
- 수계: ~1.23 V (water splitting 한계)

이 값들이 실제 셀 윈도우의 출발점이며, 활물질 표면에서는 부반응(catalysis)으로 더 좁아질 수 있어 별도 점검이 필요하다.

## 3. Tafel Slope의 추출

큰 과전압 영역에서 Butler-Volmer의 한쪽 항이 무시되어 단일 지수가 되며, 이 영역에서 $\log|j|$ vs $\eta$ 가 직선이 되는 것이 Tafel 거동이다. 직관적으로, 활성화 장벽이 한쪽으로만 강하게 기울어 그 방향의 속도가 지수적으로 증가하는 단순화된 영역.

> **관련 개념: Butler-Volmer의 Tafel 한계**
> 정전류 분극 식 $j = j_0[\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$ 에서 $|\eta| \gtrsim 100$ mV 일 때 한쪽 지수가 다른 쪽보다 크기가 무시 가능 → 단일 지수 형태 $j \approx j_0 \exp(\alpha F\eta/RT)$.
> 양변에 $\log_{10}$ 적용: $\log j = \log j_0 + \alpha F\eta/(2.303 RT)$. 정리하면 Tafel 식 $\eta = a + b \log j$, 기울기 $b = 2.303 RT/(\alpha F)$.
> 가정: 단일 단계 전자 이동, 표면 농도 = 벌크 농도(농도 분극 무시), 큰 $\eta$. 다단계 반응에서는 외관 $\alpha_\text{app}$ 로 보정.

25 °C 표준값:

$$b = \frac{2.303 RT}{\alpha F} \approx \frac{59 \text{ mV}}{\alpha}$$

| $\alpha$ | $b$ (mV/dec) | 의미 |
|----------|--------------|------|
| 0.5 | 118 | 대칭 단일 단계 전자 이동 |
| 1.0 | 59 | 첫 전자 이동 후 화학 단계 RDS |
| 2.0 | 30 | 매우 빠른 다전자 |
| 0.25 | 240 | 첫 단계 RDS, 비대칭 |

**측정 절차**:
- 충분한 과전압 영역 (보통 75~150 mV/dec 직선이 명확한 영역) 에서 직선 fit.
- $\eta = 0$ 으로 외삽 → 절편이 $\log j_0$.
- Plot 형태: x축 = $\eta$ (V), y축 = $\log_{10} |j|$ (A/cm²). 또는 x축 = $\log j$, y축 = $\eta$.

Tafel 영역의 시작은 보통 $|\eta| > 50{-}100$ mV, 끝은 농도 분극이 들어오기 직전 (보통 $|\eta| < 250$ mV). 이 윈도우 밖에서는 선형 fit이 의미 없다.

**$j_0$ 추출**: Tafel 라인의 $\eta = 0$ 외삽 → $\log j_0$. 대표값:
- HER on Pt: $j_0 \sim 10^{-3}$ A/cm² → $\log j_0 \approx -3$
- HER on Hg: $j_0 \sim 10^{-12}$ A/cm² → $\log j_0 \approx -12$ (9 자릿수 차이)
- Li-ion 양극 표면: $j_0 \sim 10^{-5}$ ~ $10^{-3}$ A/cm²

## 4. 다단계 반응의 Tafel slope 변화

실제 전극 반응이 단일 단계인 경우는 드물며, RDS(rate-determining step)가 어디인지에 따라 Tafel slope가 달라진다. 슬로프의 값을 보고 RDS를 역추적하는 것이 표준 메커니즘 분석.

**ORR (4e⁻ 산소 환원)** 의 전형적 슬로프:
- 60 mV/dec: 첫 전자 이동 후 화학 단계 RDS (Heyrovsky)
- 120 mV/dec: 첫 전자 이동이 RDS (Volmer)
- 30 mV/dec: 빠른 첫 전자 + Tafel 단계 (Tafel-Volmer)

**HER (2e⁻ 수소 발생)**:
- 30 mV/dec: Tafel 단계 RDS (재결합)
- 40 mV/dec: Heyrovsky 단계 RDS
- 120 mV/dec: Volmer 단계 RDS

**OER (4e⁻ 산소 발생)**: 60~120 mV/dec, 촉매에 따라.

같은 시스템에서 Tafel slope가 사이클 진행에 따라 변하면 RDS가 바뀐 것이고, 이는 표면 재구성·SEI 형성 등의 신호다. 단일 측정의 절대값보다 trend가 더 신뢰성 있는 정보.

## 5. 수계 vs 비수계 시스템

Tafel 분석의 적용은 수계와 비수계에서 미묘하게 다르다.

**수계 시스템**: 농도 분극이 일찍 들어오므로 (확산 계수가 비수계보다 작은 종이 많음), Tafel 영역이 좁다. 표준 도구는 RDE(rotating disk electrode) — 강제 대류로 농도 분극을 제거해 Tafel 영역을 확장한다. Koutecky-Levich 분석과 결합해 표면 동역학과 mass transport를 분리.

**비수계 (배터리)**: 농도 분극이 작은 편이지만 옴 강하가 크다 (전해질 conductivity 낮음). iR 보정이 필수이며, 보정하지 않은 Tafel slope는 항상 과대평가됨.

배터리 활물질의 Tafel 분석은 대개 박막 전극 또는 thin coating에서 수행 — 두꺼운 전극은 porous-electrode 효과로 Tafel slope가 왜곡된다. 두꺼운 전극에서 측정해도 의미 있는 결론을 얻으려면 Newman의 porous-electrode 모형으로 분리 분석해야 한다.

## 6. 측정 시 주의사항

LSV·Tafel 분석의 흔한 오류:

- **Scan rate 너무 빠름**: 표면이 평형 도달하기 전에 sweep이 끝나 가짜 hysteresis 보임. 보통 0.1~1 mV/s.
- **iR 보정 없음**: 분해 한계 또는 Tafel slope가 과대평가. 포지티브 피드백 또는 후처리 보정.
- **농도 분극 침입**: Tafel 영역 끝부분이 위로 휘어 직선이 아님. 직선 fit 영역을 좁힘.
- **임계 전류 기준 불명확**: 안정성 윈도우 보고 시 항상 임계 전류 (예: 10 μA/cm²) 명시.
- **표면적 부정확**: $j$ 가 잘못 환산되어 $\log j_0$ 가 통째로 어긋남. Geometric vs BET vs ECSA 어느 면적인지 명시.
- **첫 sweep만 보고 결론**: 표면 conditioning 효과로 1차 sweep과 안정 sweep이 다름. 보통 3~5회 sweep 후 안정 곡선 사용.

CV([`./01_cv.md`](./01_cv.md))의 가역 영역에서는 Tafel 분석이 의미가 없다 (BV 식의 양쪽 항이 모두 살아 있음). Tafel은 본질적으로 비가역/준가역 영역의 도구이며, 이 분리를 인식하지 못하면 잘못된 영역에서 fit해서 무의미한 $\alpha$ 가 나오는 것이 가장 흔한 함정.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Ch. 3: Butler-Volmer와 Tafel slope의 표준 처리.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — Ch. 6: LSV와 Tafel 실전.
- Bockris, J. O'M., Reddy, A. K. N. *Modern Electrochemistry* Vol. 2A (Kluwer, 2000) — 다단계 반응의 Tafel slope 해석.
- Shinagawa, T., Garcia-Esparza, A. T., Takanabe, K. *Sci. Rep.* 5 (2015) 13801 — Tafel 분석의 흔한 함정 정리(HER 사례).
- Xu, K. *Chem. Rev.* 104 (2004) 4303 — 비수계 전해질 안정성 윈도우 표준 측정과 LSV 적용.
