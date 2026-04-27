# 결함 화학 (Defect Chemistry)

## 1. 개요

완벽한 결정은 0 K에서만 가능하며, 유한 온도의 모든 결정은 점결함(point defect)을 일정 농도 갖는다. 이 결함이 단순한 "불순물"이 아니라 **이온 전도 / 전자 전도 / redox 비화학량론(non-stoichiometry) 의 실제 담당자**라는 것이 결함 화학의 핵심 통찰이다.

직관적으로, 결함이 없으면 격자 안의 모든 자리가 점유되어 있으므로 어떤 이온도 옆 자리로 옮겨갈 수 없다. 이온 전도는 **빈 자리(vacancy) 또는 사이 자리(interstitial)** 가 있어야 비로소 가능하다. 따라서 결함 농도가 곧 [`./04_ionic_conduction.md`](./04_ionic_conduction.md) 의 carrier 농도와 직접 연결되며, 이는 양극 / 고체전해질의 도핑 전략 전체의 이론적 기반이다.

또한 NMC 양극의 Li/Ni cation mixing, oxide 양극의 산소 결함($V_O^{\bullet\bullet}$), conversion 양극의 cation interdiffusion 등 배터리 노화의 많은 모드가 결함 화학의 언어로 가장 자연스럽게 기술된다.

## 2. 점결함 분류

결정 안에서 한 lattice site 단위로 일어나는 결함이 **점결함(point defect)** 이다. 4가지 기본 종류가 있다.

- **공공(vacancy, $V_X$)**: 원래 X가 있어야 할 자리가 비어 있음.
- **침입형(interstitial, $X_i$)**: 원래 격자 자리가 아닌 빈 공간(예: octahedral / tetrahedral interstitial site)에 X가 놓임.
- **반자리(antisite)**: A 자리에 B가, B 자리에 A가 들어감 (예: NMC의 Ni$_\text{Li}$).
- **치환형(substitutional)**: 외부 도펀트 D가 A 자리를 대신 차지함 (예: LFP의 Mn$_\text{Fe}$ 도핑).

점결함이 모이면 선결함(dislocation) / 면결함(grain boundary) / 부피결함(precipitate) 으로 확장되지만, 본 절은 점결함에 한정한다. 결함의 **형성 엔탈피** $\Delta H_f$ 와 **형성 엔트로피** $\Delta S_f$ 가 평형 농도를 결정한다.

직관적으로, 결함 형성에는 결합을 끊거나 만드는 에너지 비용이 들지만($\Delta H_f > 0$), 결함이 어디에 들어가느냐에 대한 다양한 배치(configurational entropy)가 자유 에너지를 낮춘다. 두 효과의 균형이 평형 농도를 정한다.

$$[\text{defect}] = N_\text{site} \exp\!\left(\frac{\Delta S_f}{k_B}\right) \exp\!\left(-\frac{\Delta H_f}{k_B T}\right)$$

각 항: $N_\text{site}$ = 가능한 자리 밀도, $\Delta H_f, \Delta S_f$ = 결함 1개당 형성 엔탈피·엔트로피, $k_B$ = Boltzmann 상수, $T$ = 절대 온도. 핵심 의존성은 Arrhenius 형태이며, 형성 에너지가 $k_B T$ (300 K에서 ~25 meV) 보다 한참 크면 결함 농도는 매우 작다.

## 3. Kröger-Vink 표기법

결함 반응을 정량적으로 다루려면 표기법이 필요하다. **Kröger-Vink 표기** 는 다음 세 정보를 한 번에 적는다: (i) 들어간 종, (ii) 점유한 자리, (iii) 자리에 대한 **유효 전하(effective charge)**.

표기는 $X_S^c$ 형태이며:
- $X$: 종 또는 vacancy ($V$)
- $S$ (아래첨자): 들어간 자리 (이름은 그 자리에 본래 있어야 했던 종)
- $c$ (위첨자): 유효 전하. dot ($\bullet$) = 양의 단위 전하, prime ($'$) = 음의 단위 전하, cross ($\times$) = 중성

핵심은 **유효 전하 = 실제 전하 − 그 자리의 정상 전하**이다. 즉 절대 전하가 아니라 자리에 대한 상대 전하이다.

대표 예:
- $V_O^{\bullet\bullet}$ : O 자리(원래 −2 전하)에 vacancy → 0 − (−2) = +2 의 유효 전하 → dot 두 개.
- $V_\text{Li}'$ : Li 자리(원래 +1 전하)에 vacancy → 0 − (+1) = −1 → prime 한 개.
- $\text{Li}_i^\bullet$ : interstitial 자리(원래 0)에 Li⁺ → +1 − 0 = +1 → dot 한 개.
- $\text{Ni}_\text{Li}^\bullet$ : Li 자리(원래 +1)에 Ni²⁺ → 2 − 1 = +1 → dot 한 개. NMC의 cation mixing 결함.
- $\text{Mn}_\text{Fe}^\times$ : LFP 의 Fe(2+) 자리에 Mn(2+) → 2 − 2 = 0 → 중성.

결함 반응식은 항상 (i) 질량(mass), (ii) 자리(site), (iii) 전하(charge) 세 가지가 모두 보존되도록 적는다. 예: NaCl 안의 Schottky 결함 형성:

$$\text{nil} \rightleftharpoons V_\text{Na}' + V_\text{Cl}^{\bullet}$$

자리 보존을 위해서는 양 변에 새로운 자리(unit cell 추가)가 같은 만큼 생긴다는 점을 잊으면 안 된다. 자세한 자리 회계는 Schottky 결함 부분에서 다룬다.

## 4. Schottky 결함과 Frenkel 결함

이상적인 결정에서 빈번한 두 가지 본질적 결함이 있다.

**Schottky 결함**은 양이온 vacancy + 음이온 vacancy 가 짝으로 표면으로 이동해 만들어진다 (격자 내부에서 이온이 사라지는 게 아니라 표면으로 흘러나가는 것). 결정 부피는 약간 늘어난다. NaCl 형태의 ionic crystal 에 우세하며, 형성 에너지는 보통 1–2 eV 수준.

$$\text{nil} \rightleftharpoons V_\text{Na}' + V_\text{Cl}^{\bullet}, \qquad K_S = [V_\text{Na}'][V_\text{Cl}^{\bullet}]$$

전하 중성에 의해 두 vacancy 농도가 같으므로 $[V_\text{Na}'] = [V_\text{Cl}^{\bullet}] = \exp(-\Delta H_S / 2 k_B T)$ 형태로 단순화된다(엔트로피 prefactor 제외).

**Frenkel 결함**은 한 종이 격자 자리를 떠나 interstitial 로 이동해, vacancy + interstitial 짝을 만든다. 결정 부피 변화는 거의 없다. 격자가 듬성한 구조(예: AgBr, $\beta$-AgI, fluorite CaF₂의 음이온)에 우세.

$$\text{Ag}_\text{Ag}^\times \rightleftharpoons V_\text{Ag}' + \text{Ag}_i^\bullet, \qquad K_F = [V_\text{Ag}'][\text{Ag}_i^\bullet]$$

배터리 맥락에서는 Li-rich layered ($\text{Li}_2\text{MnO}_3$ 형태) 의 Li / Li-vacancy + interstitial 동역학, fluorite 기반 oxide ion conductor (YSZ) 등에서 Frenkel pair 가 결정적이다.

엔트로피 prefactor 까지 포함한 일반 형태는

$$[V][i] = N_\text{site} N_\text{int} \exp(-\Delta H_F / k_B T)$$

이며, 농도가 site 밀도의 곱에 비례하는 점이 양이온/음이온 vacancy 짝의 Schottky와 다르다.

## 5. 전하 중성과 Brouwer 다이어그램

평형 결함 농도는 단일 결함 종이 아닌 **모든 결함 종의 동시 평형 + 전하 중성 조건** 으로 결정된다. 

직관적으로, 결정은 전체적으로 중성이어야 하므로 양의 유효 전하 결함 합 = 음의 유효 전하 결함 합 이다. 외부 인자(예: 산소 분압, 도핑 농도) 가 바뀌면 어떤 결함이 carrier로 우세한지가 바뀐다. 이 의존성을 한 그림에 시각화한 것이 **Brouwer 다이어그램**이다.

전형적인 산화물에서 다음 결함들이 동시 평형이다:
- $V_O^{\bullet\bullet}$ + 2 e' (산소 vacancy 형성)
- $h^\bullet$ / $e'$ (전자 / 정공)
- 도펀트 (acceptor 또는 donor)

전하 중성 조건은 일반적으로

$$2[V_O^{\bullet\bullet}] + p + [\text{donor}] = 2[V_M''] + n + [\text{acceptor}]$$

각 항: $p = [h^\bullet]$ = 정공 농도, $n = [e']$ = 전자 농도, $V_M$ = 금속 vacancy. Brouwer 근사는 이 식의 어느 한 쌍 항만 우세하다고 보고 영역별로 단순한 거듭제곱 의존성을 추정한다 (예: 산소 분압이 높으면 $[V_O^{\bullet\bullet}] \propto P_{O_2}^{-1/6}$, $p \propto P_{O_2}^{+1/4}$ 등).

배터리 산화물 양극에서 가장 결정적인 carrier 는 보통 vacancy ($V_\text{Li}'$, $V_O^{\bullet\bullet}$) 와 polaron (small polaron 형태의 정공). Polaron 은 자기 자신이 주위 격자를 변형시키며 함께 움직이는 결합 상태로, LFP / NMC 의 hopping 전자 전도의 실제 담당자다.

## 6. 배터리 응용

결함 화학의 직접 응용 사례는 다음과 같다.

**(a) NMC 의 cation mixing.** Ni²⁺ 이온 반경(0.69 Å) 이 Li⁺ (0.76 Å) 와 거의 같아서, 합성 / cycling 도중 $\text{Ni}_\text{Li}^\bullet$ + $\text{Li}_\text{Ni}'$ antisite pair 가 형성된다. 이 antisite 가 [`./01_crystal_structure.md`](./01_crystal_structure.md) 에서 다룬 layered → rock-salt-like 표면 재구성의 출발점이며, Ni-rich (NMC811, NMC91) 일수록 cation mixing 농도가 높아진다. 진단은 XRD $I_{003}/I_{104}$ 비, 정량은 Rietveld refinement 또는 neutron diffraction.

**(b) 산소 vacancy 와 high-V 영역.** 충전 후기 (4.5 V vs Li/Li⁺ 이상) 에서 NMC / Li-rich 양극은 격자 산소 redox 가 진행되며, 일부가 표면 $V_O^{\bullet\bullet}$ + O₂ 방출로 빠져나간다. Kröger-Vink 형식으로:

$$\text{O}_O^\times \rightarrow V_O^{\bullet\bullet} + 2 e' + \tfrac{1}{2} \text{O}_2(g)$$

$V_O^{\bullet\bullet}$ 가 표면에 쌓이면 격자 붕괴 / TM 환원 / electrolyte 분해를 가속한다. 이것이 4.5 V 이상 영역의 본질적 한계.

**(c) LFP 의 Fe$_\text{Li}$ antisite.** 1D 채널 olivine 에서 $\text{Fe}_\text{Li}^\times$ (또는 $\text{Fe}_\text{Li}^\bullet$ depending on Fe 산화 상태) 가 [010] 채널 안에 한 개라도 박히면 그 입자 전체에서 Li 확산이 차단된다. LFP 의 합성 조건 (calcination 온도 / 분위기) 이 antisite 농도를 좌우하며, 보통 1% 미만으로 억제하는 것이 목표.

**(d) 도핑 효과.** Mn 또는 Mg 같은 acceptor 도펀트가 LFP 에 들어가면 전하 중성을 위해 hole polaron / Li vacancy 농도가 증가하며, 이것이 전자 전도도 / Li 전도도 향상에 기여한다. 정량적으로는 Brouwer 다이어그램으로 어떤 영역에서 어떤 carrier 가 dominant 인지 예측 가능.

이렇게 결함 화학은 단순한 표기법이 아니라, 도핑 / 합성 분위기 / cycling 조건이 carrier 농도를 어떻게 움직이는가에 대한 정량 기술 언어다. 후속 [`./04_ionic_conduction.md`](./04_ionic_conduction.md) 에서는 이 결함 농도가 어떻게 이온 전도도로 환산되는지를 다룬다.

## 참고 문헌

- Kröger, F. A., Vink, H. J. *Solid State Physics*, Vol. 3 (Academic, 1956) 307–435 — Kröger-Vink 표기법 원전.
- Kröger, F. A. *The Chemistry of Imperfect Crystals* (2nd ed., North-Holland, 1974) — 결함 화학 표준 교재.
- Chiang, Y.-M., Birnie, D. P., Kingery, W. D. *Physical Ceramics* (Wiley, 1997) — 결함 평형, Brouwer 다이어그램, 도핑 처리.
- Maier, J. *Physical Chemistry of Ionic Materials* (Wiley, 2004) — 이온 / 전자 결함의 통합적 처리.
- Chen, H., Islam, M. S. *Chemistry of Materials* 28 (2016) 6656 — LFP / NMC 양극 결함 화학 원자 단위 시뮬레이션 리뷰.
- Manthiram, A. *Nature Communications* 11 (2020) 1550 — Ni-rich layered 양극의 cation mixing 과 표면 재구성.
