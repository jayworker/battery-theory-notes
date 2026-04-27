# 밴드 이론 (Band Theory)

## 1. 개요

단일 원자(atom)의 에너지 준위는 이산적이지만, 같은 종류의 원자가 $N$개 모여 결정을 이루면 그 준위들이 서로 상호작용하여 연속에 가까운 띠(band)를 형성한다. 이 띠 구조가 곧 전자 도체/반도체/절연체의 구분을 결정하며, 양극의 redox 활성, 전자 전도도, 광학적 흡수, 그리고 Jahn-Teller 왜곡 같은 격자 응답을 일관되게 설명한다.

배터리 맥락에서는 다음 네 질문이 중심이다. ① 충전 도중 어떤 오비탈에서 전자가 빠져나가는가(redox center), ② Fermi level의 위치가 어떤 산화환원 전위와 정렬되는가, ③ 양극의 electronic conductivity가 왜 어떤 소재(LFP)에서는 매우 낮고 어떤 소재(LiCoO₂)에서는 충분한가, ④ Mn³⁺·Ni³⁺ 같은 d⁴/d⁷ 이온이 왜 격자를 왜곡시키는가.

본 절은 Bloch 정리에서 출발해 DOS·Fermi level → 전이금속 d-band → 결정장 분리(crystal field splitting) → Jahn-Teller 왜곡으로 이어지는 한 줄기 흐름을 다룬다.

## 2. Bloch 정리와 분산 관계

결정의 가장 결정적인 사실은 격자 병진 대칭성이다. 즉 퍼텐셜 $V(r) = V(r + R)$ ($R$ = 격자 벡터). 이런 주기 퍼텐셜에서 단일 전자의 슈뢰딩거 방정식은 평면파 형태가 아닌 **Bloch 함수(Bloch function)** 를 해로 갖는다.

직관은 단순하다. 전자가 한 격자점에서 다음 격자점으로 옮겨갔을 때 wavefunction의 절댓값(밀도)은 똑같아야 하며, 차이는 단지 위상(phase)뿐이다. 이 위상을 격자 벡터에 대해 선형으로 잡으면 자연스럽게 Bloch 형태가 나온다.

$$\psi_{n,k}(r) = u_{n,k}(r)\, e^{i k \cdot r}, \qquad u_{n,k}(r + R) = u_{n,k}(r)$$

각 항: $n$ = 밴드 인덱스, $k$ = Brillouin zone 안의 wavevector, $u_{n,k}$ = 격자 주기성을 갖는 cell-periodic 부분. 핵심 결과는 에너지가 $k$의 함수가 된다는 점이다.

$$E = E_n(k)$$

이 함수가 **분산 관계(dispersion relation)** 이며, 자유 전자에서는 $E = \hbar^2 k^2 / 2m$ 이지만 결정에서는 주기 퍼텐셜이 특정 $k$ 위치(Brillouin zone 경계)에서 이 곡선을 위/아래로 갈라놓는다. 이 분리 영역이 곧 **band gap** 이다.

## 3. Brillouin zone, band gap, 그리고 effective mass

실공간 격자에 대응하는 운동량 공간 격자가 reciprocal lattice이며, 그 Wigner-Seitz cell이 1차 **Brillouin zone(BZ)** 이다. 모든 독립적인 $k$는 1차 BZ 안에 있다. 결정의 모든 전자 물성은 BZ 내부의 $E_n(k)$ 만으로 정의된다.

직관적 결론은 두 가지다.

첫째, BZ 경계에서 평면파 $e^{ikx}$와 $e^{-ikx}$가 Bragg 반사로 결합하면 정상파 두 개가 만들어지고, 두 정상파는 격자 이온 위에 마디가 있는 것과 마디가 빈 것으로 나뉜다. 두 상태의 에너지가 다르므로 그 차이만큼 gap이 열린다.

둘째, 밴드의 곡률은 전자의 동적 질량 — **effective mass** — 을 정의한다. 곡률이 클수록(밴드가 sharp) 전자 질량이 작고 전도성이 좋다. 

$$\frac{1}{m^*} = \frac{1}{\hbar^2} \frac{\partial^2 E}{\partial k^2}$$

LiFePO₄에서 valence band가 Fe-3d 와 O-2p 의 좁은 혼합으로 매우 flat한 것이 LFP의 본질적으로 낮은 electronic conductivity ($\sim 10^{-9}$ S/cm)의 근본 원인이다. 이것을 carbon coating 으로 우회하는 것이 LFP 양극 합성의 표준이다.

## 4. DOS와 Fermi level: 금속/반도체/절연체 구분

상태 밀도(density of states, **DOS**)는 단위 에너지 구간당 가능한 단일 전자 상태의 수다.

$$g(E) = \sum_n \int_{\text{BZ}} \frac{d^3 k}{(2\pi)^3} \delta(E - E_n(k))$$

직관: 밴드가 완만한 곳(작은 곡률)일수록 한 에너지에 많은 $k$가 누적되므로 DOS가 크다. Flat band $\Rightarrow$ 큰 DOS. 

T = 0 에서 전자는 가장 낮은 에너지 상태부터 두 명씩(스핀 ±) Pauli 배타 원리에 따라 채워나간다. 마지막으로 채워진 에너지가 **Fermi level** $E_F$ 이다. 이 위치가 곧 셀의 화학 포텐셜에 해당하므로, 전기화학적 redox potential과 직접 정렬된다.

세 가지 상황으로 구분된다:
- **금속(metal)**: $E_F$가 어떤 밴드 안쪽에 있다. 임의로 낮은 에너지에서 전자 여기가 가능하므로 자유롭게 전류를 흘린다. 예: 흑연(아주 좁은 band overlap), Li 금속.
- **반도체(semiconductor)**: $E_F$가 작은 gap (~0.5–3 eV) 안에 있다. 열적 들뜸이 가능. 예: Si.
- **절연체(insulator)**: $E_F$가 큰 gap (>3 eV) 안에 있다. 절연. 예: 산화물 분리막.

배터리 양극 소재에서 LiCoO₂는 충전 시 약간 금속성에 가까운 작은 gap (~1–2 eV)을 갖고, LiFePO₄는 강한 전자 상관(electron correlation) 때문에 단순 DFT가 예측하는 metal 이 아니라 실제로는 ~3.7 eV gap의 Mott-Hubbard 절연체로 작용한다.

> **관련 개념: Mott-Hubbard 절연체와 DFT+U 보정**
> 표준 DFT(LDA/GGA)는 d-orbital의 on-site Coulomb 반발 $U$를 평균장으로 흡수해버려, 사실은 절연체인 transition metal 산화물을 잘못 metal로 예측하는 경우가 많다. Mott-Hubbard 메커니즘은 같은 원자의 d-orbital에 두 전자가 들어가는 비용이 매우 커서, 격자 이동이 차단되는 효과다. 보정은 Hubbard 모델 영감의 추가 항을 d-shell에만 거는 것 — DFT+U. $U$ 값은 보통 LFP의 Fe-3d에 4–5 eV, NMC의 Ni-3d에 6 eV 정도가 경험적으로 잘 맞으며, 잘못 잡으면 voltage 가 0.5 V 이상 어긋날 수 있다. 이 보정의 정량 처리는 first-principles voltage prediction과 직결되어 있다.

## 5. 전이금속 d-band와 결정장 분리

배터리 양극의 redox는 거의 항상 transition metal(TM)의 d-orbital에서 일어난다. 자유 원자에서 5중 축퇴인 d-orbital은 결정장(crystal field) 안에서 대칭성에 따라 갈라진다.

산소가 8면체(octahedral, $O_h$)로 둘러싼 환경에서는 5개 d-orbital이 두 묶음으로 나뉜다. 직관적으로, 8면체 vertex 방향(±x, ±y, ±z 축)에 있는 산소 lobe와 정면으로 충돌하는 $d_{z^2}, d_{x^2-y^2}$ 는 에너지가 올라가고($e_g$, 2중 축퇴), 산소 lobe 사이를 비껴가는 $d_{xy}, d_{yz}, d_{zx}$ 는 에너지가 내려간다($t_{2g}$, 3중 축퇴).

$$\Delta_o = E(e_g) - E(t_{2g})$$

각 항: $\Delta_o$ = octahedral crystal field splitting, 전형적으로 1–3 eV. 첫 row TM 산화물에서 $\Delta_o$ 는 보통 spin pairing energy 보다 작거나 비슷해 high-spin / low-spin 갈림이 발생한다. LiCoO₂ 의 Co³⁺(d⁶) 는 low-spin($t_{2g}^6 e_g^0$) 으로 비자성, LiNiO₂ 의 Ni³⁺(d⁷) 는 low-spin($t_{2g}^6 e_g^1$) 으로 한 개의 $e_g$ 전자가 남는다.

배터리 redox 의 의미는 다음과 같다. Li 탈리 시 양극에서 빠져나가는 전자는 보통 Fermi 근처의 $e_g$ 또는 $t_{2g}$ 에서 나간다. NMC 의 high SOC 영역에서 산소 2p band가 Fermi 위로 올라오면 격자 산소 redox(O₂⁻ → O⁻)가 시작되는데, 이것이 high-V 영역의 산소 방출 / 표면 재구성의 전자 구조적 기원이다.

## 6. Jahn-Teller 왜곡

전자 배치가 holohedric($e_g$ 또는 $t_{2g}$) 자리에서 부분 충전(non-uniform occupancy)을 가지면, 격자가 자발적으로 대칭성을 깨면서 에너지를 낮춘다. 이것이 **Jahn-Teller 정리(Jahn-Teller theorem)** 이다.

직관: 두 개의 $e_g$ orbital ($d_{z^2}$, $d_{x^2-y^2}$)이 동등한 에너지로 축퇴되어 있는데 그 안에 1개 전자만 있다면, 8면체를 한 축으로 늘리거나 줄여 두 orbital의 에너지를 강제로 분리하면 점유된 쪽이 내려가고 비점유 쪽이 올라가서 총 에너지가 감소한다. 이 elongation/compression이 격자 변형으로 이어진다.

$$E(\text{distorted}) = E(\text{symmetric}) - \frac{1}{2} K Q^2 \cdot (\text{electronic gain})$$

로 정성적으로 쓸 수 있으며, 작은 $Q$ (왜곡 좌표) 에서 1차 항이 음수면 자발적 왜곡이 일어난다.

대표 사례:
- **Mn³⁺ (d⁴, high-spin: $t_{2g}^3 e_g^1$)**: spinel LiMn₂O₄ 에서 깊은 방전 도중 cubic → tetragonal 변형 (Li/Mn 전체 평균에서 Mn³⁺가 임계값을 넘으면). 이것이 cycling 도중 LMO 의 결정 손상의 한 원인.
- **Ni³⁺ (d⁷, low-spin: $t_{2g}^6 e_g^1$)**: layered LiNiO₂에서 항상 약한 J-T 활성. NMC811 같은 Ni-rich 양극에서 충전 후기 변형의 한 모드.
- **Fe³⁺ (d⁵, high-spin: $t_{2g}^3 e_g^2$)**: 균등 점유라 J-T 비활성. LFP가 본질적으로 안정한 이유 중 하나.

J-T 왜곡은 단일 입자 평균보다 **국소적 산소 배위 왜곡** 으로 먼저 나타나며, EXAFS / pair distribution function (PDF) 측정에서 평균 결정 구조와의 차이로 검출된다.

## 7. 결합 그림: 전자 구조에서 배터리 거동까지

마지막으로, 본 절의 흐름을 다음과 같이 요약할 수 있다.

원자 → 결정장 분리($t_{2g}/e_g$) → d-band 형성 → Fermi level 위치 결정 → redox 전위 / 전자 전도도 / J-T 활성 모두 결정. 그 결과:
- LFP: Fe-3d 가 narrow band, 큰 $U$ → Mott-Hubbard 절연체, $\sim 10^{-9}$ S/cm, carbon coating 필수.
- LiCoO₂: Co-3d 가 더 넓고 O-2p 와 강한 hybridization, 좁은 gap → 충분한 전자 전도도(~$10^{-3}$ S/cm@charged).
- NMC811: Ni-3d 주도, Ni³⁺ 의 J-T 약하지만 cation mixing 과 함께 충전 후기 산소 redox로 격자 재구성.
- spinel LMO: Mn³⁺ J-T → cycling 도중 cubic-tetragonal 변형 + Mn 용출.

이 그림이 [`./03_defect_chemistry.md`](./03_defect_chemistry.md) 의 결함 형성 에너지, [`./04_ionic_conduction.md`](./04_ionic_conduction.md) 의 호핑 장벽, [`./05_phase_diagrams.md`](./05_phase_diagrams.md) 의 자유 에너지 곡선의 전자적 배경이 된다.

## 참고 문헌

- Kittel, C. *Introduction to Solid State Physics* (8th ed., Wiley, 2005) — Bloch 정리와 band theory의 표준 처리.
- Ashcroft, N. W., Mermin, N. D. *Solid State Physics* (Saunders, 1976) — DOS / effective mass / nearly-free-electron 모델 정전.
- Burdett, J. K. *Chemical Bonding in Solids* (Oxford, 1995) — TM 산화물의 d-band 와 결정장 화학적 직관.
- Goodenough, J. B. *Magnetism and the Chemical Bond* (Wiley, 1963) — TM 산화물의 결정장 / J-T 효과의 고전.
- Anisimov, V. I., Zaanen, J., Andersen, O. K. *Physical Review B* 44 (1991) 943 — LDA+U 방법의 정의.
- Zhou, F., Cococcioni, M., Marianetti, C. A., Morgan, D., Ceder, G. *Physical Review B* 70 (2004) 235121 — DFT+U 가 LFP / LCO 양극 voltage 예측에 미치는 영향.
