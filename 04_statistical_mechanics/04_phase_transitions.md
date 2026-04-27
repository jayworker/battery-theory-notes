# 상전이와 임계 현상 (Phase Transitions and Critical Phenomena)

## 1. 개요

상전이는 통계역학에서 가장 극적인 현상이다. 온도, 압력, 농도 같은 외부 변수를 매끄럽게 바꾸어도 어느 임계점에서 계의 거시적 성질이 **정성적으로** 변한다 — 액체가 기체가 되고, 강자성이 상자성이 되고, 단일 고용체가 두 상으로 분리된다. 이런 정성적 변화의 본질은 단순하다 — **새로운 대칭성 또는 그 깨짐을 표시하는 변수(order parameter)가 임계점에서 0에서 유한값으로 (또는 그 반대로) 출현한다**.

직관적으로 상전이는 두 항의 경쟁 결과다. 정렬을 선호하는 상호작용 에너지 $J$와 무질서를 선호하는 열 요동 $k_BT$가 균형을 이루는 곳에서 정성적 변화가 일어난다. 그 균형점을 임계 온도 $T_c$라 부르며, 그 근방에서 상관 길이가 발산하고 모든 거시 응답 함수가 power-law로 발산하는 임계 현상(critical phenomena)이 펼쳐진다.

배터리 맥락에서 상전이는 V-Q 곡선의 plateau 그 자체다. LFP의 LiFePO₄ ↔ FePO₄ 1차 상전이가 가장 대표적이며, plateau 폭, 입자 크기 의존성, 격자 부정합 응력은 모두 상전이 현상학의 핵심 사례를 제공한다. 같은 맥락에서 layered 산화물의 stage 전이, 흑연의 staging 또한 상전이로 이해된다.

## 2. Order Parameter

상전이를 기술하는 핵심 변수가 **order parameter** $\phi$다. 정의는 단순하다 — 무질서상에서 0이고, 질서상에서 유한값을 갖는 양. 어떤 양을 order parameter로 잡을지는 어떤 대칭성이 깨지는지에 따라 결정된다.

대표적 사례:

| 시스템 | Order parameter | 대칭성 |
|------|-----------------|---------|
| 강자성-상자성 | 자화 $M = \langle s\rangle$ | $\mathbb{Z}_2$ (스핀 뒤집기) |
| 액체-기체 | 밀도 차 $\rho_l - \rho_g$ | 없음 (1차 전이) |
| 합금 정렬 | 사이트 종 점유 차 | 격자 병진 대칭 일부 |
| LiFePO₄/FePO₄ | Li 농도 차 $x_{LFP} - x_{FP}$ | 격자 병진 (Li 정렬) |
| 초전도 | $\langle\psi^\dagger\psi\rangle$ (Cooper pair density) | $U(1)$ |

Order parameter의 거동이 상전이의 기본 분류를 정한다 — $\phi$가 임계점에서 **불연속적으로** 점프하면 1차, 연속적으로 발달하면 2차(연속).

배터리에서 LiFePO₄의 Li 농도 $x$를 order parameter로 보면, 두 상($x \approx 0.05$의 FePO₄, $x \approx 0.95$의 LiFePO₄)이 공존하는 구간이 곧 1차 상전이 영역이다. 이 두 값의 차가 miscibility gap의 폭을 결정한다.

## 3. 1차 vs 2차 상전이

두 부류는 자유 에너지의 미분 가능성으로 깔끔히 구분된다.

**1차 상전이**: 자유 에너지 $G$의 1계 미분이 임계점에서 불연속.
- 부피 $V = (\partial G/\partial P)_T$ 점프 → 잠열 발생.
- 엔트로피 $S = -(\partial G/\partial T)_P$ 점프 → 잠열 = $T \Delta S$.
- 두 상이 임계점에서 공존(coexistence).
- 핵생성-성장(nucleation-growth) 동역학, 메타스테이블 상태 가능, 히스테리시스 발생.

**2차(연속) 상전이**: 자유 에너지의 1계 미분은 연속, 2계 미분이 발산하거나 불연속.
- 엔트로피·부피 연속, 잠열 없음.
- 열용량 $C_P = -T(\partial^2 G/\partial T^2)_P$가 임계점에서 발산.
- 상관 길이 $\xi$ 발산, scale invariance 등장.
- 임계 지수, 보편성 등장.

배터리 사례:
- **LiFePO₄ ↔ FePO₄**: 명백한 1차 상전이. plateau가 매우 평탄하고 길며, 두 상이 공존하는 구간에서 OCV는 일정. 잠열은 작지만 측정 가능하다. 입자 크기가 충분히 작아지면(< 30 nm) plateau가 기울어지고 사실상 단일 고용체화 — 입자 표면 에너지 기여가 두 상 자유 에너지 차와 비슷한 크기가 되기 때문.
- **LixCoO₂의 stage 1/2 전이**: 1차 상전이지만 폭이 좁다.
- **NMC layered 산화물**: 대부분 단일 고용체 영역(slope), 일부 좁은 plateau만 존재.
- **흑연의 staging**: stage 1, 2, 2L, 3, 4 사이의 1차 전이가 계단식으로 일어난다.

## 4. Mean-Field 임계 지수와 Landau 이론

임계점 근처에서 거시 응답 함수는 power-law로 발산한다. 표준 정의:

$$\phi \sim |T - T_c|^\beta \text{ (order parameter)}, \quad \chi \sim |T - T_c|^{-\gamma} \text{ (susceptibility)}$$
$$C \sim |T - T_c|^{-\alpha} \text{ (heat capacity)}, \quad \xi \sim |T - T_c|^{-\nu} \text{ (correlation length)}, \quad \phi \sim h^{1/\delta}$$

(임계장 $h \to 0$, $T = T_c$ 때 order parameter)

**Landau 이론**(평균장의 일반 framework)은 자유 에너지를 order parameter의 멱급수로 전개한다.

$$f(\phi, T) = f_0 + a(T - T_c)\phi^2 + b\phi^4 - h\phi$$

$\phi^2$ 항의 부호가 $T = T_c$에서 바뀌고, 안정성을 위해 $b > 0$. 최소화 $\partial f/\partial \phi = 0$:
- $T > T_c$, $h = 0$: $\phi = 0$ (대칭상).
- $T < T_c$, $h = 0$: $\phi = \pm\sqrt{a(T_c - T)/2b}$ → $\phi \sim (T_c - T)^{1/2}$.

따라서 평균장 임계 지수는:

$$\boxed{\beta = 1/2, \quad \gamma = 1, \quad \delta = 3, \quad \alpha = 0(\text{불연속}), \quad \nu = 1/2}$$

**평균장의 결정적 한계**: 이 지수들은 차원 $d$나 order parameter의 종류에 무관하게 항상 같다. 하지만 실제 시스템에서 임계 지수는 차원과 대칭성에 강하게 의존한다 — 이것이 평균장이 "맞을 수 없다"는 직접적 증거다.

평균장이 정확해지는 조건은 **상부 임계 차원** $d_u = 4$ 위에서다. 즉 $d \ge 4$이면 평균장 지수가 옳고, $d < 4$에서는 요동이 본질적으로 임계 거동을 바꾼다.

## 5. Ising 보편성과 임계 지수의 진실

격자 모델의 가장 깊은 결과는 **보편성(universality)**이다. 임계 지수는 마이크로 세부(결합 상수의 정확한 값, 격자 종류 등)에 무관하고, 오직 (1) 차원과 (2) order parameter의 대칭성에만 의존한다. 같은 (차원, 대칭) 조합을 공유하는 모든 모델은 같은 임계 지수를 갖는다 — 이것이 universality class.

3D Ising 보편성 클래스의 정확한 임계 지수(수치 정밀화 + bootstrap conformal):

| 지수 | Mean-field | 2D Ising (정확) | 3D Ising (수치) |
|------|---|---|---|
| $\beta$ | 1/2 | 1/8 | $\approx 0.326$ |
| $\gamma$ | 1 | 7/4 | $\approx 1.237$ |
| $\delta$ | 3 | 15 | $\approx 4.79$ |
| $\nu$ | 1/2 | 1 | $\approx 0.630$ |
| $\alpha$ | 0 | 0 (log) | $\approx 0.110$ |

평균장과 실제 값의 차이가 결코 작지 않으며, 특히 2D에서 극단적이다. 보편성의 실용적 의미는 결정적이다 — 액체-기체 임계점, 강자성-상자성 임계점, 합금의 order-disorder 임계점이 모두 같은 3D Ising 보편성을 공유하고, 따라서 같은 임계 지수를 가진다.

배터리에서 보편성의 의의: LFP의 두 상 공존이 1차 상전이지만 임계점(critical point)에서는 2차로 변하며, 그 임계점은 실험적으로 ~470 K에서 관측된다(Delacourt et al., 2005). 임계점 근방에서 LFP의 거동은 3D Ising 보편성에 속한다.

## 6. 배터리의 1차 상전이: LFP를 중심으로

LFP는 1차 상전이의 모범 사례지만, 단순한 평균장 그림이 정량적으로 잘 맞지 않는 곳이기도 하다. 평균장이 예측하는 miscibility gap의 폭과 그 온도 의존성은 실험과 어긋나며, 그 원인은 다음 세 가지다.

**격자 부정합 응력(coherency strain)**. 두 상의 격자 상수가 ~5% 다르므로 두 상이 공존할 때 입자 내부에 elastic strain energy가 쌓인다. 이 에너지는 두 상의 자유 에너지 차에 추가되어 effective miscibility gap을 좁히며, 입자가 작을수록 표면 에너지와 함께 정량적 효과가 커진다.

**입자 크기 효과**. ~30 nm 이하 LFP에서는 plateau가 사실상 사라지고 단일 고용체처럼 보이는 거동이 보고된다(Meethong et al., 2007). 이는 표면 에너지 + strain 효과가 두 상 자유 에너지 차와 같은 자릿수가 되어 thermodynamic stability가 단일상 쪽으로 기우는 결과다.

**Mosaic 입자 모델**. Dreyer et al. (2010)이 제안한 mosaic picture에서는 LFP 셀 내 무수히 많은 입자가 한 번에 두 상으로 갈리지 않고, 각 입자가 따로 1상씩만 존재한 채 SOC에 따라 1상 또는 2상 입자의 비율이 변한다. 이 그림이 LFP의 path-dependent OCV(히스테리시스, [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md))를 정확히 설명한다.

종합하면 LFP의 plateau는 단순한 1차 상전이지만, 실제 입자 수준에서는 표면, 응력, 입자 간 통계가 모두 결합된 멀티스케일 현상이다. 그래서 OCV plateau의 정확한 모양과 SOC 의존성을 첫 원리에서 예측하려면 [`./03_lattice_models.md`](./03_lattice_models.md)의 CE + MC에 응력 효과까지 포함한 phase-field 모델로 확장해야 한다.

## 참고 문헌

- Goldenfeld, N. *Lectures on Phase Transitions and the Renormalization Group* (Addison-Wesley, 1992) — 임계 현상, 보편성, RG 표준 입문.
- Stanley, H. E. *Introduction to Phase Transitions and Critical Phenomena* (Oxford, 1971) — 고전 교과서, 보편성과 임계 지수.
- Delacourt, C. et al. *Nature Materials* 4 (2005) 254–260 — LiFePO₄의 임계점 관측.
- Meethong, N. et al. *Electrochemical and Solid-State Letters* 10 (2007) A134–A138 — LFP 입자 크기에 따른 miscibility gap 축소.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448–453 — LFP mosaic 입자 모델, 히스테리시스의 열역학적 기원.
- El-Showk, S. et al. *Journal of Statistical Physics* 157 (2014) 869–914 — 3D Ising 임계 지수의 conformal bootstrap 정밀 결정.
