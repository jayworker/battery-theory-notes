# 이온 전도 (Ionic Conduction)

## 1. 개요

결정 또는 비정질 고체 안에서 이온이 어떻게 움직이는가는 두 요소의 곱이다: (i) **얼마나 많은 carrier(빈 자리 또는 사이 자리)가 있는가**, (ii) **각 carrier가 한 자리에서 다음 자리로 얼마나 자주 뛰는가**. 첫 항은 [`./03_defect_chemistry.md`](./03_defect_chemistry.md) 에서 다룬 결함 농도에서, 둘째 항은 결정 격자 안의 hopping 동역학에서 나온다.

배터리 응용에서 이 두 항이 합쳐져 나오는 macroscopic 양이 **이온 전도도** $\sigma$ 와 **확산 계수** $D$ 이다. 두 양은 Nernst-Einstein 관계로 연결되며, 이 비율의 미세한 보정인자(Haven ratio)가 hopping 메커니즘 — vacancy / interstitialcy / paddle-wheel — 을 진단하는 단서가 된다.

본 절은 (i) Arrhenius 식과 그 활성화 에너지, (ii) hopping 메커니즘 분류, (iii) Nernst-Einstein 관계와 Haven ratio, (iv) 격자 통로의 차원성 / percolation, (v) 대표 고체 전해질의 RT $\sigma_\text{Li}$ 비교로 이어진다.

## 2. Arrhenius 식과 활성화 에너지

이온 전도도 $\sigma$ 는 거의 모든 고체에서 $T^{-1}$ 에 대한 plot에서 직선으로 떨어진다. 직관적으로, hopping 한 번 한 번이 격자 진동에 의한 활성화 사건이며 그 빈도가 Boltzmann 인자로 지수 의존하기 때문이다.

가장 일반적인 형태는

$$\sigma T = A \exp\!\left(-\frac{E_a}{k_B T}\right)$$

이며 (또는 $T$를 빼고 단순 Arrhenius 형태로 쓰기도 함). 각 항: $\sigma$ = 이온 전도도(S/cm), $A$ = pre-exponential factor (carrier 농도, 이동 거리, 시도 빈도 곱), $E_a$ = 활성화 에너지(eV 또는 J/mol), $k_B$ = Boltzmann 상수. $\ln(\sigma T)$ vs $1/T$ plot의 기울기가 $-E_a/k_B$.

$E_a$ 는 두 부분으로 나뉜다. **이주 장벽(migration energy)** $E_m$ — 한 carrier 가 한 자리에서 다음 자리로 넘어가는 데 격자가 만드는 에너지 안장점 — 과, **결함 형성 에너지(formation energy)** $E_f$ 의 일부 — 만일 carrier 농도가 온도에 따라 함께 움직인다면. 즉:

$$E_a = E_m + \alpha E_f$$

각 항: $\alpha = 0$ (extrinsic regime, carrier 농도가 도핑으로 고정) ~ $\alpha = 1/2$ (intrinsic Schottky pair) ~ $\alpha = 1$ (자기 자신이 carrier 형성을 책임지는 경우). LLZO 같은 garnet 에서는 도핑(Al, Ta) 으로 carrier 가 고정되어 있으므로 $E_a \approx E_m$ ≈ 0.3 eV. 반면 단순 NaCl 같은 ionic crystal 에서는 고온에서 intrinsic regime, 저온에서 extrinsic regime 으로 활성화 에너지가 꺾이는 두 영역 plot이 나타난다.

배터리 cell 의 작동 온도 범위(−20 ~ +60 °C)에서 0.3 eV 와 0.5 eV 의 차이는 RT 전도도에서 약 1.5–2 자리수 차이를 만든다. 그래서 $E_a$ 는 단순한 fit parameter가 아니라 **소재의 본질적 전도성 한계의 지표**다.

## 3. Hopping 메커니즘

이온 hopping의 기본 메커니즘은 세 가지로 분류된다.

**(a) Vacancy mechanism.** 한 자리가 vacancy 이고, 옆 자리의 이온이 그 vacancy 로 점프한다. 이온 입장에서는 한 칸 옮긴 셈이지만 vacancy 는 반대 방향으로 한 칸 움직였다. 가장 흔한 메커니즘. 예: NaCl 의 Na, NMC layered 의 Li, LiCoO₂ 의 Li (단, Li 은 octahedral → tetrahedral → octahedral 의 divacancy hop 으로 더 정확히 기술됨).

**(b) Interstitialcy (또는 직접 interstitial) mechanism.** Interstitial 자리에 있는 이온이 옆 격자 이온을 같은 격자 자리에 밀어내고, 그 격자 이온이 다른 interstitial 자리로 뛰는 collective motion. 직접 interstitial 한 칸 뛰는 단순한 형태도 있지만 격자 자리가 너무 가까우면 collective 가 더 낮은 장벽을 가진다.

**(c) Concerted / paddle-wheel mechanism.** 여러 이온이 동시에 한 칸씩 협동적으로 움직이거나, anion sublattice (예: $\text{PS}_4^{3-}$, $\text{ClO}_4^{-}$, $\text{B}_{12}\text{H}_{12}^{2-}$) 가 회전하면서 cation 이 그 위를 타고 흐르는 형태. Paddle-wheel 은 anion 회전이 $T_c$ 위에서 자유로워지는 superionic transition 을 동반하며, 이 과정에서 $\sigma$ 가 갑자기 1–2 자리수 도약한다 (예: $\text{Li}_2\text{B}_{12}\text{H}_{12}$, sulfide 일부).

각 메커니즘은 활성화 에너지 / pre-exponential / isotopic 효과 가 모두 다르다. 정량 진단에는 보통 NMR(여기서 carrier 의 site-specific dynamics를 직접 봄), neutron quasi-elastic scattering, ab initio molecular dynamics(AIMD) 가 함께 쓰인다.

## 4. Nernst-Einstein 관계와 Haven ratio

$\sigma$ (전기적 측정) 와 $D$ (tracer 측정) 는 같은 carrier 의 동역학에서 나오므로 서로 연결되어야 한다. 이상적으로, carrier 가 독립적으로 random walk 한다면

$$D_\sigma = \frac{\sigma k_B T}{n q^2}$$

각 항: $D_\sigma$ = 전도도에서 환산한 charge diffusion coefficient, $n$ = carrier 농도(/cm³), $q$ = carrier 전하 ($e$ 또는 $z e$), $k_B T$ = 열에너지. 이것이 **Nernst-Einstein 관계**.

> **관련 개념: Haven ratio**
> 동위원소 추적자(tracer) 로 측정한 self-diffusion coefficient $D_\text{tracer}$ 와 전도도에서 환산한 $D_\sigma$ 의 비를 Haven ratio 라 한다. $H_R = D_\text{tracer} / D_\sigma$. 이상적 random walk 라면 $H_R = 1$. 실제로는 (i) 한 hop 후 같은 자리로 되돌아오는 correlated motion 때문에 tracer 가 본 평균 변위가 작아지고($H_R < 1$, 보통 0.3–0.7), (ii) 또는 collective motion (paddle-wheel, concerted) 에서는 carrier 들이 연쇄적으로 같은 방향으로 움직여서 $D_\sigma$ 가 본질적으로 더 커지므로 $H_R$ 이 더 작거나 흐릿한 의미를 갖는다. Vacancy mechanism 에서 $H_R = f$ (correlation factor, 결정 구조에 의존; FCC $\approx 0.78$, BCC $\approx 0.73$). $H_R$ 측정은 tracer NMR 또는 isotope-labeled diffusion 으로 직접 가능하며, hopping 메커니즘의 기하학적 정보를 준다.

배터리 분야에서 $H_R$ 이 자주 활용되는 자리는 새로운 superionic conductor 의 전도 mechanism 정량 — 예를 들어 LGPS / Li₆PS₅Cl 의 매우 낮은 $H_R \sim 0.3$ 이 강한 collective motion 의 흔적으로 해석된다.

## 5. 격자 통로의 차원성과 percolation

이온 hopping 의 활성화 에너지가 충분히 낮아도, **carrier 가 통과할 수 있는 channel network 가 끊겨 있으면** macroscopic 전도도는 0 이다. 이를 percolation 이라 부른다.

직관: 1D 채널(예: olivine LFP 의 [010])은 단일 antisite 만 박혀도 그 입자 전체가 차단된다. 2D layered (NMC) 는 우회 가능성이 있어 막힘에 강하다. 3D framework (spinel, garnet, NASICON) 가 가장 robust 하다.

수학적으로, random site occupation 으로 channel 이 형성될 확률은 차원 $d$ 에 강하게 의존한다. 1D 에서는 percolation threshold 가 사실상 1 (모든 자리가 채워져야), 3D 에서는 약 0.31 (site percolation, simple cubic)에 불과. 이 단순 기하학이 LFP 합성에서 antisite 농도를 1% 미만으로 억제해야 하는 이유의 근본 배경이다 ([`./01_crystal_structure.md`](./01_crystal_structure.md) 에서 다룬 채널 차원성과 직접 연결).

또 다른 상관 효과는 **bottleneck**. 한 hop 의 안장점에서 두 산소 사이의 좁은 구멍을 통과해야 한다면, 그 구멍의 크기가 전체 $E_m$ 을 좌우한다. Garnet LLZO 의 doping(Al³⁺, Ta⁵⁺) 이 cubic phase 안정화로 bottleneck 을 넓혀 $E_m$ 을 0.3 eV 수준으로 낮추는 것이 표준 전략이다.

## 6. 대표 고체 전해질의 RT $\sigma_\text{Li}$ 비교

배터리용 고체 전해질은 RT 에서 $\sim 10^{-3}$ S/cm 이상이 1차 목표(액체 전해질 1 M LiPF₆ in EC/DMC ≈ $10^{-2}$ S/cm 의 1/10 수준). 대표 그룹과 그 RT 전도도 / 활성화 에너지를 정리하면 다음과 같다.

| 군 | 대표 조성 | $\sigma_\text{Li}$ at 25 °C (S/cm) | $E_a$ (eV) | 메커니즘 |
|------|-----------|-------------------------------|-----------|----------|
| Garnet | Li₇La₃Zr₂O₁₂ (LLZO, Al/Ta-doped cubic) | $\sim 10^{-3}$ | 0.30–0.35 | vacancy / concerted on Li sublattice |
| Sulfide (argyrodite) | Li₆PS₅Cl | $\sim 10^{-3}$ | 0.20–0.30 | concerted, paddle-wheel-like (PS₄ rotation) |
| Sulfide (LGPS family) | Li₁₀GeP₂S₁₂ | $\sim 1.2 \times 10^{-2}$ | 0.22 | concerted along $c$-axis 1D channel |
| NASICON | Li₁.₃Al₀.₃Ti₁.₇(PO₄)₃ (LATP) | $\sim 10^{-3}$ | 0.30–0.40 | vacancy on 3D Li framework |
| Perovskite | Li₃ₓLa₂/₃₋ₓTiO₃ (LLTO) | $\sim 10^{-3}$ | 0.35–0.40 | vacancy in A-site |
| Polymer | PEO-LiTFSI (60 °C) | $\sim 10^{-4}$ at 60 °C | 0.5–1.0 | segmental motion-coupled |
| LiPON | Li₂.₉PO₃.₃N₀.₄₆ | $\sim 10^{-6}$ | 0.55 | thin-film, vacancy-like |

이 데이터에서 유추할 수 있는 일반 경향:
- **Sulfide > oxide** in RT $\sigma$, but sulfide 는 화학적/대기 안정성이 약함(H₂S 발생).
- LGPS 는 1D channel 임에도 매우 높은 $\sigma$ 를 보이는데, 이는 channel이 입자 단위에서 충분히 길고, antisite-like 막힘이 적기 때문.
- garnet LLZO 는 Li metal 음극과 호환성이 좋아 oxide 군에서 가장 주목.
- LiPON 은 $\sigma$ 는 낮지만 thin-film deposition 호환성과 안정성으로 microbattery 에 사용.

이 표는 [`./05_phase_diagrams.md`](./05_phase_diagrams.md) 에서 다룰 상도와 함께 보면, 어떤 조성 구간에서 cubic 또는 desired phase 가 안정한가가 직접 합성 전략에 들어간다.

## 7. 작동 의미와 한계

이온 전도도가 RT $\sim 10^{-3}$ S/cm 이상이라도, 실제 셀에서의 limiting 저항은 보통 입자 / grain boundary / interface 저항 이다. Bulk $\sigma$ 와 cell-level effective $\sigma$ 사이에 1–2 자리수 차이가 흔하다.

또한 활성화 에너지 plot 에서 직선이 아닌 **knee** (꺾임) 가 관찰되면, (i) carrier 메커니즘이 바뀌었거나, (ii) intrinsic ↔ extrinsic 영역의 전이, (iii) 상전이가 일어났음을 의미한다. 예: $\beta$-AgI 에서 $\alpha$-AgI 로의 superionic 전이 (~147 °C) 에서 $\sigma$ 가 4 자리수 도약.

배터리 작동 영역에서는 $-20$ to $+60$ °C 사이의 $\sigma$ 변화가 약 10× 정도이며, 저온 성능 한계의 1차 원인이 이 Arrhenius 의존성이다. 이것이 cell-level polarization 분석의 출발점으로, 자세한 분극 처리는 [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md) 에서 다룬다.

## 참고 문헌

- Maier, J. *Physical Chemistry of Ionic Materials* (Wiley, 2004) — 고체 이온학의 표준 교재.
- Funke, K. *Progress in Solid State Chemistry* 22 (1993) 111 — Hopping 메커니즘과 jump relaxation 모델.
- Bachman, J. C. et al. *Chemical Reviews* 116 (2016) 140 — 무기 고체 전해질의 이온 전도 메커니즘 종합 리뷰.
- Murugan, R., Thangadurai, V., Weppner, W. *Angewandte Chemie* 46 (2007) 7778 — Cubic LLZO 의 합성과 RT 전도도.
- Kamaya, N. et al. *Nature Materials* 10 (2011) 682 — LGPS 의 RT $\sigma \sim 10^{-2}$ S/cm 보고.
- Kuhn, A., Wilkening, M. et al. *Energy & Environmental Science* 6 (2013) 3548 — Argyrodite Li₆PS₅Cl 의 NMR 기반 hopping 동역학.
- Murch, G. E. *Solid State Ionics* 7 (1982) 177 — Haven ratio 와 correlation factor 의 정전 처리.
