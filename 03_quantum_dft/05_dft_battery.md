# 배터리 DFT 응용 (DFT Applications for Battery Research)

## 1. 개요

DFT가 배터리 연구의 표준 도구가 된 이유는, 실험으로는 답하기 매우 어렵거나 비싼 질문들을 원자 단위에서 정량적으로 답할 수 있기 때문이다. 그 질문은 보통 다음 다섯 가지로 압축된다.

1. **이 소재의 평균 작동 전압은 얼마인가** — 신소재 스크리닝의 1차 기준.
2. **Li⁺(또는 Na⁺/K⁺/Mg²⁺)이 격자 안을 얼마나 빨리 움직이는가** — 출력·rate 한계의 원자 단위 근원.
3. **이 조성이 합성 가능한가, 어떤 분해 경로가 있는가** — convex hull/상안정성 분석.
4. **충전 도중 어떤 원자가 산화되는가** — cation redox vs anion redox, 산화 상태 결정.
5. **계면(SEI/CEI)에서 어떤 분해 산물이 안정한가** — 전해질 첨가제·표면 코팅 설계.

본 절은 이 다섯 질문에 답하기 위한 DFT 표준 절차 — 평균 전압 계산, NEB 이주 장벽, 형성 에너지와 convex hull, Bader 전하/산화 상태, 음이온 산화환원 분석, 그리고 이를 신뢰할 수 있게 만드는 보정(vdW, magnetism, 온도) — 을 정리한다.

[`03_exchange_correlation.md`](./03_exchange_correlation.md)의 functional 선택, [`04_practical_dft.md`](./04_practical_dft.md)의 수치 수렴이 이미 정확히 통과되었다는 가정 위에서 시작한다. 이 두 가지가 부족 수렴이면 본 절의 모든 양이 부정확해진다.

직관적으로 보면, DFT는 "0 K, 진공, 무한 시간 평형"을 다루는 도구다. 실제 배터리는 "300 K, 전해질 안, 동역학적으로 격렬"하게 동작하므로, DFT가 주는 답은 항상 그 차이를 의식적으로 보정해야 한다는 점을 강조하며 시작한다.

## 2. 평균 전압 계산

### 2.1 기본식

[`../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md)에서 본 $\Delta G = -nFE$ 가 그대로 first-principles 계산의 출발점이다. 한 양극 host에 Li가 $x \to y$ ($y > x$, 방전 방향) 로 들어가는 반응을 생각하자.

$$\text{Li}_x\text{host} + (y-x)\text{Li (metal)} \to \text{Li}_y\text{host}$$

이 반응의 Gibbs 자유 에너지 변화는 0 K, 진공 가정에서 $\Delta G \approx \Delta E$ (전자 에너지 변화)로 근사된다. 그러면 **평균 전압**은:

$$V_{avg} = -\frac{E(\text{Li}_y\text{host}) - E(\text{Li}_x\text{host}) - (y-x) E(\text{Li bcc})}{(y-x) F}$$

각 항: $E(\text{Li}_x\text{host})$ = 조성 $x$ 의 host 총 에너지(per formula unit), $E(\text{Li bcc})$ = 금속 Li의 단위 원자당 에너지(reference), $F$ = Faraday 상수, $(y-x)$ = 옮겨진 Li 수. 부호 약속 — host에 Li가 들어갈 때 $\Delta E < 0$ 이면 $V > 0$.

전자 단위로 다시 쓰면 ($e \cdot V = $ eV/electron):

$$V_{avg} = -\frac{E(\text{Li}_y) - E(\text{Li}_x) - (y-x) E(\text{Li metal})}{(y-x) e}$$

### 2.2 직관과 의미

이 식의 직관: "Li 한 원자를 host에 집어 넣으면 얻는 에너지 이득"이 얼마나 큰가가 곧 전압이다. Host의 산화 환원 중심(예: Co³⁺ → Co⁴⁺)이 더 강한 산화제일수록, Li⁺를 더 강하게 끌어당기고, 에너지 이득이 커지고, 따라서 전압이 높아진다.

또한 두 조성 사이의 평균이므로, 실제 V-Q 곡선이 [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)에서 본 plateau/slope를 어떻게 그리든, 두 끝점 평균을 줄 뿐이다. 곡선의 모양 자체를 얻으려면 더 촘촘한 조성 grid에서 계산해 미분해야 한다.

### 2.3 표준 절차와 정확도

**표준 절차**:
1. Li_x host와 Li_y host를 같은 supercell에서 별도로 완화(cell+ion).
2. 같은 cutoff/k-point/functional/PAW로 정적 SCF로 에너지 추출.
3. 동일 조건에서 Li bcc 단위 셀을 풀어 $E(\text{Li metal})$ 계산.
4. 위 식에 대입.

**정확도와 대표값** (PBE+U 기준, vs experiment):
- LCO (LiCoO₂ ↔ Li₀.₅CoO₂): 계산 ~3.8 V, 실험 ~3.9 V → 오차 ~0.1 V.
- LFP (LiFePO₄ ↔ FePO₄): 계산 ~3.4 V (PBE+U with $U=4.0$), 실험 3.43 V → 거의 일치.
- LMO (LiMn₂O₄ ↔ Mn₂O₄): 계산 ~4.0 V, 실험 ~4.1 V.
- 흑연 (LiC₆ ↔ C): 계산 ~0.1 V vs Li/Li⁺, 실험 ~0.1 V.

전형적 오차 ~0.1~0.3 V. 더 큰 오차를 만드는 원인:
- functional 부적합(PBE+U $U$ 값 부정확, hybrid 미사용).
- 자기 ordering 오선택(NMC).
- vdW 보정 누락(층상 host에서 0.1~0.2 V).
- 영점 진동 에너지(zero-point energy, ZPE) 무시(보통 ~10 meV/atom).
- 전해질·SEI·계면 효과 모두 무시(0 K vacuum 가정).

### 2.4 voltage profile 계산

V-Q 곡선의 모양을 얻으려면 여러 중간 조성에서 계산하고 chemical potential을 미분해야 한다.

$$V(x) = -\frac{1}{F}\frac{\partial G}{\partial x}\bigg|_{x = N_{Li}/N_{site}}$$

실무에서는 (i) 가능한 Li 배치(orderings)을 enumerate, (ii) 각 배치를 DFT로 풀어 가장 안정한 ground-state 채택, (iii) 인접 조성 사이의 차이를 평균 전압 식으로 계산. 이렇게 얻은 stair-step 곡선이 실제 V-Q의 first-principles 예측이다.

이 절차를 자동화한 도구가 **Materials Project (Ceder group)**, **AFLOW**, **Open Quantum Materials Database (OQMD)** 같은 high-throughput DFT 데이터베이스다.

> **관련 개념: 화학 포텐셜과 전압의 미분 형태**
> 평균 전압 식은 두 조성 사이의 자유 에너지 차이/Li 수 로 얻은 평균이다. 한편 그 미분 형태가 곧 [`../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md)에서 본 Nernst 식과 같은 공식: $V(x) = -\mu_{Li}(x)/e$ 이며, $\mu_{Li}$ 가 바뀌지 않는 영역(두 상 공존)에서 plateau, 변하는 영역에서 slope. 즉 DFT의 평균 전압 = 그 영역의 평균 chemical potential.

## 3. 이주 장벽: NEB

### 3.1 왜 NEB인가

Li⁺이 host 안에서 한 자리(site A)에서 다른 자리(site B)로 이동할 때 거치는 안장점(saddle point)의 에너지가 곧 활성화 에너지 $E_a$ 이며, Arrhenius 식 $D = D_0 \exp(-E_a/k_B T)$ 으로 확산 계수를 결정한다. 즉 이주 장벽이 0.05 eV 차이 나면 실온 hopping 속도가 $\exp(0.05/0.025) \approx 7$ 배 차이.

직관적으로, A에서 B로 가는 무수히 많은 경로 중 가장 낮은 에너지 경로(minimum energy path, MEP)를 찾아야 한다. 단순 직선 보간이나 임의의 transition state guess는 신뢰할 수 없다.

**NEB (Nudged Elastic Band, Henkelman & Jónsson)** 는 이를 자동화한 표준 방법: 두 끝점(A, B) 사이에 여러 중간 image를 두고, 각 image가 (i) 경로에 수직인 PES 힘을 받지만, (ii) 경로에 평행한 방향에서는 인접 image와의 가상 spring force만 받도록 구속한다. 이렇게 SCF를 풀면 image들이 자동으로 MEP에 정렬된다.

### 3.2 NEB 표준 설정

**Image 수**: 통상 **5~7 image** (양 끝 포함하면 7~9). image가 너무 적으면 saddle을 놓치고, 너무 많으면 비용 폭발.

**Climbing Image NEB (CI-NEB, Henkelman et al. 2000)**: 가장 높은 에너지 image를 spring force에서 해방하고 그 image가 saddle point로 climb up하도록 만드는 변형. 일반 NEB보다 saddle 에너지를 0.01 eV 수준 정확하게 잡아낸다 — **사실상 표준**.

**힘 수렴 기준**: 잔여 힘 $|\mathbf{F}_\perp| < 0.03$ eV/Å. saddle 정확도가 중요하면 0.01 eV/Å까지 조여야 함.

**격자 고정**: NEB 도중 격자 변화는 금지. 양 끝점이 같은 supercell·같은 ion ordering이어야 한다.

**Spring constant**: 보통 5 eV/Å² 부근. 너무 작으면 image가 골짜기로 미끄러지고, 너무 크면 진동.

### 3.3 배터리 NEB 대표 결과

| 시스템 | 경로 | $E_a$ (eV) | 비고 |
|---|---|---|---|
| LFP (LiFePO₄) | 1D channel along $b$ | 0.30~0.55 | 차원성 강함, defect-mediated |
| LCO | 2D layer (oxygen octahedral) | ~0.4~0.6 | divacancy 경로가 더 낮음 |
| NMC811 | 2D layer | ~0.25~0.4 | 충전 상태에서 더 낮아짐 |
| Spinel LMO | 3D channel (8a-16c-8a) | 0.4~0.7 | Mn 산화 상태 의존 |
| LLZO (garnet) | 3D | ~0.3 | Li 농도 의존 |
| Graphite | 2D | ~0.4~0.5 | stage 의존 |

**Trick — divacancy 메커니즘**: layered 산화물에서 단순 single vacancy hopping은 $E_a \sim 0.6$ eV이지만, divacancy(인접 두 자리 비어 있음)의 동시 hopping은 $\sim 0.3$ eV로 훨씬 낮다. 따라서 충전 상태(Li 부족)에서 확산이 더 빠른 비직관적 결과가 나옴 — Van der Ven et al. 연구가 첫 보고.

**한계**:
- 0 K 정적 PES만. 온도 효과(phonon assisted hopping, anharmonicity)는 ab initio MD로 별도 처리.
- 양극 확산은 polaron-Li⁺ 결합 hopping이라 single-particle picture가 깨질 수 있음.
- $E_a$ 가 cell size에 의존(image-image 상호작용). 보통 $2\times 2 \times 2$ supercell 이상 권장.

### 3.4 prefactor와 확산계수

활성화 에너지만으로는 절대 hopping rate를 알 수 없으며, prefactor $\nu_0$ (attempt frequency)를 별도로 계산해야 한다. 표준 처방은 transition state theory (TST):

$$\nu_0 = \frac{\prod_i \nu_i^{IS}}{\prod_i \nu_i^{TS}}, \qquad k = \nu_0 \exp(-E_a/k_B T)$$

각 항: $\nu_i^{IS}, \nu_i^{TS}$ = 초기 상태와 saddle point에서의 정상 모드(normal mode) 진동수. $\nu_0$ 는 보통 $10^{12}$~$10^{13}$ s⁻¹.

확산 계수는 $D = a^2 \nu_0 \exp(-E_a/k_B T) / 2d$ (한 hop 거리 $a$, 차원 $d$). 1D LFP의 실온 $D \sim 10^{-9}$ cm²/s, 2D NMC $\sim 10^{-10}$ cm²/s 가 전형적.

## 4. 형성 에너지와 convex hull

### 4.1 형성 에너지의 정의

화합물 $A_xB_yC_z$ 의 형성 에너지는 그 elements의 표준 상태(reference state)로부터의 합성 에너지다.

$$E_f(A_xB_yC_z) = E(A_xB_yC_z) - x \mu_A^{ref} - y \mu_B^{ref} - z \mu_C^{ref}$$

여기서 $\mu_A^{ref}$ = element $A$ 의 가장 안정한 단체(예: Li bcc, O₂ gas, Fe bcc)에서의 단위 원자당 에너지. 단위는 보통 eV/atom으로 normalize.

배터리 응용에서 자주 보는 변형:
- **vs Li chemical potential**: 양극 충방전 도중 화학 포텐셜이 $\mu_{Li} = E(\text{Li bcc})$ 부근에서 변하므로, $\mu_{Li}$ 의 함수로 phase diagram을 그림(grand-canonical phase diagram).
- **vs O chemical potential**: 산화물의 산소 분압 조건에 따른 안정성. 합성 가능성 평가에 필수.

### 4.2 Convex hull과 ground-state line

여러 조성 $\text{Li}_x \text{host}$ 의 형성 에너지를 $x$ 의 함수로 plot하면, 그중 가장 낮은 점들의 아래 포락선이 **convex hull**이다. Hull 위의 점은 두 인접 hull 조성으로 분해되는 것이 에너지적으로 유리하므로 metastable이고, hull 위에 정확히 놓인 점만이 진정한 ground-state 조성이다.

직관적으로, "이 조성이 합성 가능한가"의 1차 시험은 convex hull과의 거리(energy above hull, $E_{above hull}$)다. $E_{above hull} = 0$ → 안정, ~25 meV/atom 이하 → 실온 합성 가능성, ~50 meV/atom 이상 → 합성 어려움. 25 meV는 $k_B T$ 실온이 아니라 경험적 cutoff로 Materials Project에서 통용.

V-Q 곡선과의 직접 연결: convex hull의 인접한 두 ground-state 사이의 기울기가 곧 두 조성 사이의 평균 전압이며, plateau가 두 ground state 사이에 존재한다. 즉:

$$V_{plateau}(x_1 \to x_2) = -\frac{E_f(x_2) - E_f(x_1)}{(x_2 - x_1) F}$$

LFP의 LiFePO₄ ↔ FePO₄ plateau가 3.43 V로 매우 평탄한 이유: 두 끝점은 모두 hull 위, 그 사이 모든 중간 조성은 hull 위에 더 높이 있어 분해(상분리)가 유리하기 때문 — [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)에서 본 그 plateau가 정확히 이 hull 모양에서 나온다.

### 4.3 phase diagram 자동화

Materials Project, OQMD, AFLOW 같은 데이터베이스는 elements 조합마다 수만 개의 DFT 계산을 누적해 자동으로 hull을 그린다. 새 조성을 추가하면 그 점이 hull 위인지 판정해 합성 가능성 1차 스크리닝이 된다.

배터리 신소재 발견의 실제 사례:
- Disordered rock-salt cathodes (Lyu et al.): convex hull 분석으로 cation disorder가 안정한 조성 영역 예측.
- High-throughput Na/K cathode discovery (Ceder group): Li 데이터베이스를 Na/K로 substitution해 1차 후보군 선정.

### 4.4 한계

- DFT 절대 에너지의 systematic bias(과결합, vdW 누락, 자기 ordering 오류)가 hull 거리에 누적.
- functional 의존성: GGA hull과 SCAN hull이 다를 수 있음.
- 온도/엔트로피 무시 — disordered phase는 finite-T에서 더 안정해질 수 있음.
- 동역학 무시 — metastable 상이 실제로는 무한히 안정한 경우 흔함(diamond, anatase TiO₂).

## 5. Bader 전하와 산화 상태

### 5.1 왜 산화 상태가 어려운가

"이 원자의 산화 상태는 +3인가 +4인가"는 배터리에서 핵심 질문이지만 — DFT 격자 안에서는 깨끗한 답이 없다. 전자는 격자 전체에 퍼져 있고, 한 원자에 정확히 몇 개의 전자가 "속하는가"는 정의에 따라 다르다.

직관적으로, Mulliken/Lowdin 분석은 atom-centered orbital 기저에서만 정의되어 plane-wave 결과에 직접 적용 어렵다. 그래서 plane-wave DFT의 표준은 **Bader 분석** (Bader 1990) — 전자 밀도의 zero-flux surface로 공간을 원자별 영역으로 나누고, 각 영역의 전자 적분을 그 원자의 charge로 정의.

$$Q^{Bader}_I = Z_I - \int_{\Omega_I} n(\mathbf{r}) d^3r$$

각 항: $Z_I$ = 핵 전하(원자 번호), $\Omega_I$ = 원자 $I$ 의 Bader basin, 적분은 그 영역의 전자 밀도. 이 정의는 매개변수가 없고 wave function representation에 무관하다는 장점.

### 5.2 배터리에서의 표준 사용

NMC 양극의 charge compensation 분석:
- Pristine LiNi₀.₈Mn₀.₁Co₀.₁O₂: Ni Bader ~+1.4, Mn ~+1.7, Co ~+1.4 (formal +3 / +4 / +3 와 다름 — 공유 결합성 때문).
- 충전 후 (Li 50% 제거): Ni Bader가 ~+1.6 (변화 0.2), Mn 거의 변화 없음, Co 약간 변화. 즉 **Ni이 주 산화 중심**.
- Li-rich NMC에서 4.5 V 이상: Ni Bader 변화 멈춤, **O Bader가 -1.4 → -1.2로 감소** = 음이온 산화 (oxygen redox).

핵심 통찰: Bader **절댓값**이 formal oxidation state와 다른 이유는 공유 결합성. 그러나 충방전 도중 Bader **변화량**은 어떤 원자가 산화/환원되는지 명확히 알려준다. 따라서 산화 상태 분석은 항상 "$\Delta Q_{Bader}$ vs SOC"로 본다.

### 5.3 도구와 사용법

VASP에서 Bader 분석의 표준 흐름:
1. SCF 후 `LCHARG=.TRUE., LAECHG=.TRUE.` 로 charge density (`AECCAR0`, `AECCAR2`, `CHGCAR`) 출력.
2. Henkelman group의 `bader` 명령어 실행.
3. `ACF.dat` 파일에 각 원자의 Bader charge.

**주의**: PAW core-valence partitioning이 Bader basin에 영향. `LAECHG=.TRUE.` 옵션으로 all-electron core charge를 더한 charge density를 사용해야 정확한 Bader 결과.

### 5.4 다른 charge 분석 방법

- **Mulliken**: atom-centered 기저(LCAO 코드, CRYSTAL/Gaussian/SIESTA)에서 표준. plane-wave에는 부정확.
- **DDEC6** (Manz): 더 화학적으로 의미 있는 charge, electrostatic moment 재현 좋음.
- **CHELPG, MK**: electrostatic potential fitting. 분자에는 좋지만 결정엔 적용 한계.
- **COHP/COBI** (Crystal Orbital Hamilton/Bond Index, Dronskowski): 결합 강도 정량 — 다음 절의 음이온 redox 분석에 핵심.

배터리 표준은 Bader가 절대다수, 결합/orbital 분석이 필요하면 LOBSTER로 COHP 보충.

## 6. 음이온 산화환원 (Anionic Redox)

### 6.1 현상과 중요성

전통적 양극의 산화 환원은 **cation-only**: 충전 시 Co³⁺ → Co⁴⁺, 방전 시 그 역. 그러나 Li-rich layered oxides (xLi₂MnO₃·(1-x)LiMO₂, $x > 0$)에서는 4.5 V 이상에서 Mn/Ni이 더 산화될 수 없는데도 추가 용량이 나타난다. 이 추가 용량의 정체가 **음이온 산화 (oxygen redox)**: O²⁻ → O⁻ → O₂²⁻ 또는 O 공유결합 짧아짐.

직관적으로, Li-rich에서는 LiO₆ "linear Li-O-Li" 배치가 등장해 한 O 2p orbital이 결합에 참여하지 않은 비결합(non-bonding) 상태로 남는다. 이 상태가 Fermi 준위 근처로 올라가 정공(hole)을 받아들이며 산화된다.

기술적 의의: 이론 용량 250+ mAh/g (LCO의 ~1.5배)에 도달 가능하나, 가스 발생(O₂ release)·voltage decay·structural disorder 등 산업화의 큰 도전이 함께 따른다.

### 6.2 DFT로 음이온 redox 정량

표준 분석 절차:

**1. Bader on O**: Pristine $Q_O \approx -1.4$, charged state에서 $Q_O$ 가 -1.2 또는 -1.0으로 감소하면 음이온 산화의 증거.

**2. PDOS (projected density of states)**: O 2p와 TM d의 Fermi 준위 근처 contribution을 분리. cationic redox는 d-band가 Fermi에 걸쳐 있고, anionic은 O 2p가 Fermi에 위치.

**3. Spin density isosurface**: 충전 후 spin density를 plot했을 때 O 위에 spin이 국재되면 oxygen polaron(O⁻).

**4. COHP/COBI** (LOBSTER 도구): O-O 결합의 antibonding 상태가 비점유로 변하는지 확인. peroxide-like ($\text{O}_2^{2-}$) 형성의 직접 증거. anionic redox 강한 시스템에서 O-O distance가 ~2.4 Å에서 ~1.5 Å로 단축되는 신호와 함께 등장.

**5. NEXAFS / RIXS 시뮬레이션**: O K-edge 흡수 스펙트럼을 BSE 또는 DFT-based로 시뮬레이션해 실험과 직접 비교.

### 6.3 functional 선택의 중요성

음이온 redox는 hole이 강하게 국재된 상태이므로 PBE/PBE+U는 종종 부정확하다. 표준 권장:
- **HSE06**: hole 국재 정확히 재현. 작은 셀에서 벤치마크 후 큰 셀은 PBE+U와 비교.
- **SCAN+rVV10** 또는 SCAN+U: 큰 셀에서 hybrid의 대안.
- **PBE+U with $U(O) \approx 4$ eV**: 실험적이지만 일부 paper에서 사용. controversial.

functional 선택이 voltage decay 메커니즘 결론까지 바꾼 사례가 있어, 항상 두 functional로 cross-check 권장.

### 6.4 실용적 함의

- 안정한 anionic redox 후보: Ru, Ir 기반 (4d/5d, 강한 covalency가 O-O dimer 안정화).
- 비안정한 (분해 위험) 후보: 3d only Li-rich NMC — O₂ gas evolution 신호.
- DFT 안정성 지표: $E_{form}$ of $\text{O}_2$ vacancy (높을수록 안정), O-O peroxide bond 파괴 장벽 (NEB).

## 7. 한계와 보정

### 7.1 분산력 (vdW, D3/D4)

표준 GGA는 점근적 $-C_6/r^6$ 인력을 전혀 재현하지 못한다. 흑연 층간 결합 에너지는 PBE에서 ~10 meV/atom (실험은 ~50 meV/atom — PBE가 80% 과소). 분자 결정, 다공성 host(MOF, COF), surface adsorption은 모두 vdW 보정 필수.

**Grimme D3 (2010)**: 경험적 pair-wise $-C_6/r^6$ 항을 추가, atom-pair $C_6$ 계수가 사전 계산된 표에서 가져옴. 비용 거의 0.

$$E^{D3} = -\sum_{I<J}\sum_{n=6,8} s_n \frac{C_n^{IJ}}{r_{IJ}^n} f_{damp}(r_{IJ})$$

각 항: $f_{damp}$ = short-range damping 함수, $s_n$ = functional 의존 보정 계수.

**D4 (2019)**: D3의 charge dependence를 추가. ionic 시스템에서 더 정확.

**vdW-DF / VV10**: 비국소 functional. 정확도 높지만 비용 증가 ~2배.

배터리 적용:
- 흑연 음극, hard carbon: D3 또는 D4 거의 필수.
- LCO/NMC layered: 층간 결합 0.05~0.1 eV/Li 영향 — voltage 계산에 0.1 V 이상 영향 가능.
- 분자 전해질, additive surface adsorption: vdW 무시 시 흡착 에너지 0.2~0.5 eV 오류.

### 7.2 자기 상호작용 오차와 polaron

[`03_exchange_correlation.md`](./03_exchange_correlation.md)의 SIE는 배터리에서 두 가지 구체적 오류로 나타난다.

**Polaron 비편재화**: LFP의 small polaron (Fe³⁺ 위 한 자리에 국재된 hole)이 PBE에서는 격자에 퍼져 버린다. PBE+U ($U(\text{Fe}) \approx 4$) 또는 HSE06으로 회복. polaron-Li⁺ 결합의 hopping 장벽이 정확한 conductivity 결정의 핵심.

**산화 상태 모호**: PBE에서 NMC의 Ni이 명확한 +3/+4가 아닌 분수 점유. PBE+U($U(\text{Ni}) = 6.2$)로 정수 점유 회복. magnetic moment가 Ni³⁺(low-spin S=1/2, ~0.7 $\mu_B$) vs Ni⁴⁺(S=0, ~0)의 명확한 신호.

**진단 신호**: 자기 모멘트가 격자 모든 동일 원자에서 같다 → 비편재 (PBE 부정확). 일부 원자에서만 큰 모멘트 → 국재 (정확).

### 7.3 온도 효과

DFT는 0 K 정적 계산이며, 실제 배터리는 300 K에서 작동한다. 무시되는 온도 기여:

**(i) 격자 진동 (phonon)**: 자유 에너지에 ZPE + thermal contribution 추가. $A_{vib}(T) = E_{ZPE} + k_B T \sum_q \ln(1 - e^{-\hbar\omega_q/k_B T})$. 보통 ~10 meV/atom. quasi-harmonic approximation으로 반영.

**(ii) 배치 엔트로피 (configurational entropy)**: Li/공공 배치, cation disorder. high-T에서 ~$k_B T \ln \Omega$ 만큼 자유 에너지 감소. cluster expansion + Monte Carlo로 정확 처리 가능.

**(iii) 동역학적 효과**: melting, defect mobility, 위 NEB의 phonon-assisted 항 — ab initio MD로 별도 처리.

**실용적 권장**: 평균 전압 0 K 계산은 실온 OCV를 ~50 meV (~50 mV) 오차 내 예측. 더 정확한 비교가 필요하면 quasi-harmonic + cluster expansion으로 보정.

### 7.4 전해질·계면 효과

DFT 평균 전압은 진공 vs Li metal 기준이며, 실제 셀의 전해질·SEI 영향을 완전히 무시한다. Li⁺의 desolvation 에너지 ~0.5~1 eV, SEI 통과 저항도 추가. 표준 보정:

- **Implicit solvent (VASPsol)**: 균질 유전 매질로 전해질 근사. 흡착 에너지 ~0.1~0.3 eV 보정.
- **Explicit solvation + AIMD**: Li⁺ + EC + DMC 분자를 명시적으로 포함, ab initio MD로 ensemble 평균. 정확하지만 매우 비싸다.
- **Grand canonical DFT (potential-fixed)**: 전극 전위를 명시적으로 control하면서 SCF. 표면 반응 정확한 Tafel 분석에 핵심 (Norskov-Rossmeisl).

### 7.5 기타 흔한 caveat

- **Spin-orbit coupling**: 5d 원소(Ir, Pt) 또는 무거운 lanthanide에서 중요. 배터리 3d transition metal에는 보통 무시 가능.
- **Magnetic ordering 가정**: FM/AFM/PM 중 가장 안정한 것을 골라야 — 자동이 아니다.
- **Hubbard $U$ 의 SOC**: $U$ 와 SOC가 함께 들어가면 $U$ 값을 다시 calibrate해야 함.
- **결함 형성 에너지의 charge correction**: 충전 결함은 long-range Coulomb를 잘 수렴시켜야 함 (Freysoldt 또는 Kumagai-Oba 보정).
- **Li bcc reference의 정확도**: PBE는 Li 응집 에너지를 ~10% 과대평가. 평균 전압 절댓값에 ~0.05 V 영향.

종합하면, DFT는 배터리 연구의 강력한 도구이지만, 그 결과는 항상 "어떤 functional, 어떤 수렴, 어떤 보정 위에서의 0 K 진공 답인가"라는 맥락을 의식하며 해석해야 한다. 실험과 1대1 비교 대신, 추세(trend) 와 메커니즘(mechanism) 을 정량화하는 도구로 가장 강력하다.

## 참고 문헌

- Aydinol, M. K., Kohan, A. F., Ceder, G. *Physical Review B* 56 (1997) 1354 — 양극 평균 전압 DFT 계산의 정초.
- Wang, L., Maxisch, T., Ceder, G. *Physical Review B* 73 (2006) 195107 — PBE+U $U$ 값과 형성 에너지 보정.
- Henkelman, G., Uberuaga, B. P., Jónsson, H. *Journal of Chemical Physics* 113 (2000) 9901 — Climbing image NEB.
- Van der Ven, A., Ceder, G. *Electrochemical and Solid-State Letters* 3 (2000) 301 — LCO divacancy hopping.
- Bader, R. F. W. *Atoms in Molecules: A Quantum Theory* (Oxford, 1990) — Bader 분석 원전.
- Henkelman, G., Arnaldsson, A., Jónsson, H. *Computational Materials Science* 36 (2006) 354 — Bader 알고리즘 효율적 구현.
- Grimme, S. et al. *Journal of Chemical Physics* 132 (2010) 154104 — D3 dispersion correction.
- Seo, D.-H. et al. *Nature Chemistry* 8 (2016) 692 — Anionic redox의 DFT 메커니즘.
- Saubanère, M. et al. *Energy & Environmental Science* 9 (2016) 984 — Li-rich oxide anionic redox 종합.
- Jain, A. et al. *APL Materials* 1 (2013) 011002 — Materials Project 데이터베이스.
- Sun, J. et al. *Nature Chemistry* 8 (2016) 831 — SCAN의 산화물 정확도.
- Norskov, J. K., Rossmeisl, J. et al. *Journal of Physical Chemistry B* 108 (2004) 17886 — Computational hydrogen electrode와 grand canonical DFT.
