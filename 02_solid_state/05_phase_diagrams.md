# 상평형과 상전이 (Phase Diagrams and Phase Transitions)

## 1. 개요

상도(phase diagram)는 "어떤 조성·온도·압력에서 어떤 상이 가장 안정한가" 를 평면 또는 3차원 지도로 그린 것이다. 배터리 양극의 V-Q 곡선의 모양 — plateau의 길이, slope의 기울기, 끝 부근의 곡률 — 은 사실상 그 활물질의 Li 조성-온도 상도를 SOC 함수로 직접 측정한 것에 해당한다.

따라서 상도와 V-Q 곡선의 연결은 단순한 비유가 아니라 정확한 등식이다. 직관적으로, 두 상이 공존하는 영역은 자유 에너지 곡선의 공통 접선(common tangent) 으로 정의되며, 그 접선의 기울기가 곧 전압 plateau를 준다. Solid solution 영역은 단일 자유 에너지 곡선의 곡률이 그대로 전압 곡선의 slope로 환산된다.

본 절은 (i) Gibbs 상규칙, (ii) 자유 에너지 곡선과 common tangent, (iii) solid solution vs two-phase 영역과 V-Q 곡선의 직접 대응, (iv) intercalation 상도(graphite stages, LFP), (v) CALPHAD / ab initio 상도의 순서로 다룬다. 이 흐름은 [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) 의 V-Q 곡선 분석과 [`./../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md) 의 Nernst 식의 미시적 보완이다.

## 2. Gibbs 상규칙

평형 상태에서 한 계의 자유도(degrees of freedom) 는 성분 수와 상 수에서 다음과 같이 결정된다.

$$F = C - P + 2$$

각 항: $F$ = 자유도(독립적으로 바꿀 수 있는 intensive 변수의 수), $C$ = 성분 수(component, 화학적으로 독립인 종의 수), $P$ = 상의 수(phase), $+2$ = $T$ 와 $P$(압력) 의 두 intensive 변수. 압력이 일정하다고 가정한 응축계 분석에서는 종종 $F = C - P + 1$ 로 단순화한다.

직관: 자유도는 "동시에 자유롭게 움직일 수 있는 변수의 수" 이다. 더 많은 상이 공존할수록 그 평형을 유지하기 위한 제약이 늘어나 자유도가 줄어든다.

배터리 양극의 단순 사례. Li-FePO₄ 2성분계(C=2)에서 정온정압 가정하에 $F = 2 - P + 1 = 3 - P$ ($T$ 만 추가 변수). 두 상이 공존(LFP + FP)하면 $F = 1$ — 즉 온도만 자유롭게 정해지고 두 상의 조성과 화학 포텐셜은 자동으로 결정된다. 따라서 OCV (= 화학 포텐셜의 차이) 도 정해지며, 이것이 LFP의 $\sim 3.43$ V plateau 의 열역학적 근거다.

같은 조건에서 단상 영역에 있다면 $F = 2$ — 온도와 조성이 자유. 따라서 Li 조성을 바꾸면 화학 포텐셜이 함께 변하고 OCV 도 곡선(slope) 을 그린다. 이것이 layered LiCoO₂ / NMC 의 slope 영역의 thermodynamic 정체.

## 3. 자유 에너지 곡선과 Common Tangent

이성분계 $A_{1-x}B_x$ 에서 각 상의 Gibbs 자유 에너지를 조성 $x$ 의 함수로 그려보면, 보통 아래로 볼록한 곡선이 상마다 하나씩 그려진다($G_\alpha(x), G_\beta(x), \dots$).

평형 상태에서 두 상이 공존하려면, **두 곡선의 공통 접선**이 그어져야 한다. 직관: 공통 접선의 접점 $(x_\alpha, x_\beta)$ 에서 각 상의 화학 포텐셜이 양 성분 모두 같아진다(접선의 기울기 = 한 성분의 $\partial G/\partial x$ = 화학 포텐셜).

수식으로는:

$$\left.\frac{\partial G_\alpha}{\partial x}\right|_{x=x_\alpha} = \left.\frac{\partial G_\beta}{\partial x}\right|_{x=x_\beta}, \qquad \mu_A^\alpha = \mu_A^\beta, \quad \mu_B^\alpha = \mu_B^\beta$$

조성 $x_\alpha < x < x_\beta$ 영역에서는 두 상이 공존하며, 평균 자유 에너지는 두 점을 잇는 직선(공통 접선) 을 따라 lever rule 비율로 분배된다. 이 직선이 단일 곡선보다 항상 낮으므로 상분리(phase separation) 가 자발적으로 일어난다.

배터리에 대한 환산은 직접적이다. 양극 $A_{1-x}\text{Li}_x$Host 에서 Li 화학 포텐셜과 OCV 의 관계가

$$E(x) = -\frac{1}{F} \frac{\partial G}{\partial x_\text{Li}}$$

이므로(electrochemical 하게는 $-\Delta G/nF$), 공통 접선 영역에서 $\partial G/\partial x$ 는 일정 → $E(x)$ 도 일정 → **plateau**. Single-phase 영역에서 $G(x)$ 가 곡선 → $\partial G/\partial x$ 가 $x$ 에 따라 변화 → $E(x)$ 가 곡선(**slope**).

## 4. Solid Solution vs Two-Phase: V-Q 곡선과의 직접 대응

이 등식이 V-Q 곡선 분석의 모든 기반이다. 정리하면:

| 자유 에너지 형태 | 영역 명칭 | V-Q 곡선 모양 | 대표 사례 |
|------------------|-----------|----------------|------------|
| 곡선이 아래로 볼록(convex) | solid solution | slope (전압이 SOC와 함께 변화) | LiCoO₂ 대부분, NMC layered, $\text{Li}_x$TiS₂ |
| 두 곡선의 common tangent | two-phase coexistence | plateau (전압 일정) | LiFePO₄ ↔ FePO₄ (~3.43 V), graphite stage 1↔2 |
| 위로 볼록(concave) 영역 | spinodal (불안정) | 측정 불가, kinetic 분해 | Li-rich layered 일부, 분해 반응 |

핵심 통찰: V-Q 곡선의 **plateau 의 정확한 전압 = 공통 접선의 기울기**. 두 상의 자유 에너지가 만들어내는 기하학적 구조가 그대로 측정에 노출된다. 따라서 plateau의 전압을 정확히 측정하면 두 상 사이의 $\Delta G$ 를 직접 얻으며, 이것이 first-principles voltage 계산을 측정과 비교할 때의 1차 검증 방법이다.

그리고 plateau 의 **길이** 는 두 접점의 조성 차이 $x_\beta - x_\alpha$ 와 같으며, 즉 miscibility gap 의 폭에 비례한다. LFP 가 거의 0 에서 1 까지 거의 전 영역에 걸쳐 plateau 를 보이는 것은 LFP 와 FP 사이의 miscibility gap 이 매우 넓다는 의미이다.

추가 통찰: 입자 크기가 매우 작아지면 surface energy 기여가 두 상 의 자유 에너지에 다르게 들어가, miscibility gap 이 좁아지거나 사라질 수 있다. Nano LFP (~30 nm) 에서 실제로 이 size effect 로 plateau 가 살짝 기울고 단축되는 것이 관찰되며, 이는 같은 화학 조성이라도 입자 크기에 따라 effective 상도가 다르다는 Cahn–Larche 형 이론으로 모델링된다.

## 5. Intercalation 상도

배터리에서 자주 보는 상도는 **intercalation host + guest(Li)** 형태이다. 두 대표 사례를 본다.

### 5.1 Graphite stages

흑연에 Li 이 들어가면 graphene 층 사이에 ordered manner 로 적층되어 stage 1 (모든 갤러리에 Li), stage 2 (한 칸 건너 한 갤러리), stage 2L (low-density stage 2), stage 3, stage 4 등의 이산적 상으로 정렬된다. Li 함량이 늘면서 차례로 stage 4 → 3 → 2L → 2 → 1 로 전이하며, 각 전이 사이에 **짧은 plateau** 가 V-Q 곡선에 계단식으로 나타난다.

정량적으로 stage $n$ 은 평균적으로 $\text{LiC}_{6n}$ 조성이며, stage 1 ($\text{LiC}_6$, 372 mAh/g) 이 완충 상태. 각 stage 전이의 평형 전위는 흑연 / Li half-cell 에서 약 0.20 V, 0.13 V, 0.09 V 부근에 매우 가까운 plateau 들의 시퀀스로 관찰된다. 이 stage 거동의 정밀 진단이 ICA / DVA([`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md))에서 음극 진단의 fingerprint 로 활용된다.

stage 거동의 미시적 기원은 Li 사이의 충돌 / 정렬 에너지(Daumas-Hérold model 의 domain wall 형성) 인데, 이것이 본질적으로 **이산적 자유 에너지 표면**을 만들어 이산적 상들을 탄생시킨다.

### 5.2 LiFePO₄ Li-poor / Li-rich

bulk LiFePO₄ 의 상도는 매우 단순하다. 거의 전 SOC 에 걸쳐 **Li-poor (FP, 거의 $\text{Li}_0\text{FePO}_4$)** 와 **Li-rich (LFP, 거의 $\text{Li}_1\text{FePO}_4$)** 의 2상 공존이며, 그 사이의 miscibility gap 이 plateau 를 만든다. 두 상 사이의 격자 부피 차이 약 6.5%.

상도의 비대칭은 단순한 mean-field model 의 regular solution 로 잘 근사된다.

$$G(x) = (1-x) G_\text{FP} + x G_\text{LFP} + R T [x \ln x + (1-x) \ln(1-x)] + \Omega x(1-x)$$

각 항: $\Omega$ = regular solution interaction parameter. $\Omega > 2 R T$ 이면 miscibility gap 이 열린다. LFP 의 경우 $\Omega \sim 4$–$5 R T_\text{room}$ 으로 추정되며, 이 결과 RT 에서 강한 2상 거동을 보인다.

흥미로운 점은 **size-dependent disappearance of miscibility gap**. ~30 nm 이하 nano-LFP 에서는 surface tension 기여로 $\Omega_\text{eff}$ 가 작아지고 miscibility gap 이 줄어 single-phase solid solution 에 가까운 거동을 보일 수 있다(Wagemaker et al.). 이것이 nano-LFP 의 빠른 rate capability 의 한 부분이다.

또한 LFP 의 단일 입자 단위에서는 부분-2상 / mosaic 형태의 분포가 일어나며, 그 결과 macroscopic plateau 가 thermodynamic equilibrium 보다 약간 ill-defined 하게 보이는 효과가 생긴다 (Dreyer mosaic model).

## 6. Spinodal 분해와 Nucleation-Growth 동역학

자유 에너지 곡선이 위로 볼록(concave, $\partial^2 G/\partial x^2 < 0$) 인 영역은 **spinodal** 영역이며, 모든 작은 조성 변동이 자발적으로 증폭된다 — 즉 핵생성 장벽 없이 즉시 분해된다. 그 바깥의 metastable 영역(곡선 자체는 볼록이지만 common tangent 보다 위)에서는 nucleation barrier 가 있어 새 상이 임계 크기 이상의 핵으로 형성되어야만 성장한다.

직관: spinodal 안 = 모든 곳에서 자발적, 매우 빠름; metastable 영역 = 핵이 생기기 전까지 정체 → nucleation rate 가 dominant. 두 영역의 경계가 spinodal 곡선이며, common tangent 와 함께 그려져 phase 안정성 다이어그램의 두 곡선을 만든다.

배터리 cycling 에서 이 차이가 직접 보인다. LFP 에서 cycling 도중 새로운 상의 핵생성 장벽이 hysteresis 의 한 원인이며, mosaic 모델은 입자 단위의 불연속적 nucleation 으로 hysteresis 를 설명한다. 이 메커니즘이 [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) 의 thermodynamic hysteresis 의 기원이다.

또 한 가지 중요 포인트: spinodal 분해는 매우 빠르므로 충방전 도중 격자 응력의 급격한 비균질을 만들 수 있다. 이것이 전극 입자의 microcrack / fragmentation 의 한 모드이며, mechanochemistry 분석과 연결된다.

## 7. CALPHAD와 Ab initio 상도

실험적으로 상도를 그리는 것은 시간/비용이 크므로, 두 가지 계산적 접근이 표준화되었다.

**(a) CALPHAD (CALculation of PHAse Diagrams).** 각 상의 Gibbs 에너지를 조성·온도의 polynomial 로 parametrize 하고, 측정 데이터(plateau 전압, calorimetry, solubility 등) 에 fitting 하여 전 조성-온도 영역의 자유 에너지를 reconstruct. 다성분 / 다상 계의 추정에 강하다. 전 산업계의 합금 / 세라믹 상도 표준 도구.

**(b) Ab initio (DFT) + cluster expansion.** 가능한 모든 Li 정렬 / 결함 배치를 DFT 로 0 K total energy 계산, 그 결과를 cluster expansion 으로 효율적으로 보간한 뒤 Monte Carlo 로 finite-T 자유 에너지를 추출. LFP / NMC / spinel / olivine 의 Li ordering / phase stability / OCV 를 직접 예측 가능. 단, 강한 전자 상관(Mott-Hubbard) 이 있는 시스템은 DFT+U 또는 DFT+DMFT 로 보정해야 정확. 배터리 분야에서 Ceder 그룹 등이 표준화한 접근법.

두 방법은 상보적이며, 보통 ab initio 로 미세 자유 에너지를 얻고 CALPHAD 로 다성분계 / 실용 영역으로 확장하는 협력 워크플로우를 쓴다. 결과는 곧바로 [`./04_ionic_conduction.md`](./04_ionic_conduction.md) 에서 다룬 carrier 농도 및 [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) 의 V-Q 곡선 모델링에 들어간다.

마지막으로, 상도가 알려주는 가장 실용적인 정보는 **합성 윈도우 (synthesis window)** — 어떤 $T$ / 조성 / 분위기에서 desired phase 가 단상으로 안정한가. Garnet LLZO 의 cubic vs tetragonal 안정성, layered ↔ rock-salt 변환 onset 온도, spinel ↔ rock-salt 분해 등 모두가 상도 위의 명시적 영역으로 표현된다. 이 정보가 합성 / 노화 / 안전성 분석의 출발점이다.

## 참고 문헌

- Porter, D. A., Easterling, K. E. *Phase Transformations in Metals and Alloys* (3rd ed., CRC, 2009) — 상도 / 자유 에너지 / common tangent 의 표준 처리.
- Saunders, N., Miodownik, A. P. *CALPHAD: Calculation of Phase Diagrams* (Pergamon, 1998) — CALPHAD 방법론.
- Van der Ven, A. et al. *Chemical Reviews* 120 (2020) 6977 — 배터리 양극의 상도와 ab initio 계산 종합 리뷰.
- Dahn, J. R. *Physical Review B* 44 (1991) 9170 — Graphite Li intercalation stages 의 상도.
- Wagemaker, M. et al. *Journal of the American Chemical Society* 129 (2007) 4323 — Nano-LiFePO₄ 의 size-dependent miscibility gap.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448 — LFP mosaic 모델 / hysteresis 의 열역학적 기원.
- Aydinol, M. K. et al. *Physical Review B* 56 (1997) 1354 — DFT 로 layered 양극의 voltage 예측.
