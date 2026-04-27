# 격자 모델과 클러스터 전개 (Lattice Models and Cluster Expansion)

## 1. 개요

격자 모델은 통계역학에서 가장 강력한 추상화 도구다. 복잡한 결정 고체의 무수히 많은 자유도(전자, 원자 위치, 진동, 자기 모멘트)를 **격자 위 사이트의 이산 변수**(스핀 ±1, 점유 0/1, 종 A/B 등)로 환원해 분배 함수를 다룰 수 있게 만든다. 이 환원은 단순화처럼 보이지만, 본질적인 물리 — 상호작용 vs 열 요동의 경쟁 — 는 그대로 보존되므로 강자성, 합금 정렬, Li/공공 배치 같은 폭넓은 현상을 통합적으로 다룰 수 있다.

직관적으로 격자 모델의 본질은 두 항의 줄다리기다. 사이트 간 상호작용 에너지 $J$가 정렬을 선호하면, 온도 $T$의 열 요동 $k_BT$가 무질서를 선호한다. 두 항의 비율 $J/k_BT$가 1 근처에서 상전이가 일어나며, 그 임계 거동이 차원과 대칭성에만 의존한다는 보편성([`./04_phase_transitions.md`](./04_phase_transitions.md))이 격자 모델 연구의 가장 깊은 결과다.

배터리 응용에서 격자 모델은 **활물질의 Li 정렬 패턴**과 **OCV 곡선**을 첫 원리에서 예측하는 핵심 도구다. DFT 단독으로는 0 K 정렬상만 다룰 수 있지만, DFT를 클러스터 전개에 피팅한 뒤 Monte Carlo로 유한 온도를 풀면 실제 셀이 작동하는 300 K에서의 평형 거동을 정량적으로 예측할 수 있다.

## 2. Ising 모델

가장 유명한 격자 모델이며, 모든 격자 연구의 출발점이다. 사이트 $i$마다 이진 변수 $s_i \in \{+1, -1\}$(스핀 업/다운)을 두고, 가장 가까운 이웃끼리만 짝짓는 단순 해밀토니안을 쓴다.

$$H = -J \sum_{\langle i,j\rangle} s_i s_j - h \sum_i s_i$$

각 항: $J$ = 이웃 결합 상수($J > 0$이면 강자성, $J < 0$이면 반강자성), $h$ = 외부 자기장, $\langle i,j\rangle$ = 이웃 쌍의 합. 합 안의 $s_i s_j$는 두 스핀이 평행이면 $+1$, 반평행이면 $-1$이므로, $J > 0$에서는 평행 정렬이 에너지 최저다.

격자 가스(lattice gas)와 Ising은 정확히 동치(equivalent)다. 점유 변수 $n_i \in \{0, 1\}$를 $s_i = 2n_i - 1$로 치환하면 한쪽 모델이 다른 쪽으로 정확히 매핑된다. 화학 포텐셜 $\mu$가 자기장 $h$ 역할, 이웃 쌍 상호작용이 $J$ 역할. 따라서 강자성 임계 거동에 대한 모든 결과가 활물질의 Li/공공 정렬 임계 거동에 그대로 적용된다.

| 차원 | 임계 온도 $T_c$ | 비고 |
|------|------|------|
| 1D | 0 (전이 없음) | 1차원에서는 어떤 유한 $T$에서도 long-range order 불가 |
| 2D 정사각 격자 | $T_c = 2J/[k_B \ln(1+\sqrt{2})] \approx 2.27\, J/k_B$ | Onsager (1944) 정확해 |
| 3D 단순입방 | $T_c \approx 4.51\, J/k_B$ | 수치적, 정확해 없음 |

2D Ising의 정확해는 통계역학사에서 손꼽히는 업적으로, 평균장 예측($T_c^\text{MF} = z J/k_B = 4 J/k_B$, $z$ = 배위수)과 비교하면 평균장이 임계 온도를 거의 두 배 과대 평가하고 있음을 보여준다. 이 차이의 원인은 다음 절의 평균장 한계에서 다룬다.

## 3. 평균장 풀이와 그 한계

평균장 근사(mean-field approximation)는 격자 모델을 푸는 가장 단순한 비섭동 기법이다. 핵심 가정은 **각 스핀이 이웃들의 정확한 배치 대신 그 평균값 $\langle s\rangle$만 느낀다**는 것. 즉 $s_i s_j \to s_i \langle s\rangle + \langle s\rangle s_j - \langle s\rangle^2$ (요동 무시).

$$H_\text{MF} = -(Jz\langle s\rangle + h)\sum_i s_i + \text{const}$$

각 사이트가 독립이 되었으므로 분배 함수는 곱으로 분해되고, $\langle s\rangle$의 자기무모순 방정식이 나온다.

$$\langle s\rangle = \tanh(\beta(Jz\langle s\rangle + h))$$

$h = 0$에서 자명한 해 $\langle s\rangle = 0$ 외에 비자명 해가 등장하는 임계 온도는 $\tanh$의 미분이 1이 되는 곳이다.

$$k_BT_c^\text{MF} = zJ$$

평균장의 본질적 한계는 두 가지다. 첫째, **요동을 완전히 무시**하므로 저차원에서 부정확하다(1D에서 평균장은 유한 $T_c$를 잘못 예측). 둘째, **임계점 근처에서 보편성이 깨진다** — 평균장은 항상 같은 임계 지수 ($\beta = 1/2, \gamma = 1, \delta = 3$, [`./04_phase_transitions.md`](./04_phase_transitions.md))를 주지만, 실제 임계 지수는 차원과 대칭성에 의존한다.

배터리 맥락에서 평균장이 잘 맞지 않는 대표적 사례가 **LiFePO₄의 miscibility gap 너비**다. 평균장은 두 상($x \approx 0$과 $x \approx 1$)의 공존 영역을 주지만 그 폭과 깊이를 정량적으로 잘못 잡는다. 입자 크기가 작아질수록 표면 에너지/응력 효과로 gap 폭이 줄어들거나 사라지는 size effect가 보고되어 있는데, 이는 평균장이 잡지 못하는 부분이며 cluster expansion + MC가 필요하다.

## 4. Cluster Expansion (CE)

DFT가 직접 줄 수 있는 것은 0 K 격자 에너지뿐이다. 실제 활물질에는 수많은 Li/공공 배치가 가능하고, 각 배치마다 DFT 계산을 따로 돌리는 것은 비현실적이다. **클러스터 전개(cluster expansion)**는 격자 위 모든 가능한 배치의 에너지를 소수의 유효 상호작용 파라미터(ECI, effective cluster interaction)로 압축하는 정밀한 수학적 framework다.

핵심 아이디어: 임의의 격자 배치 $\sigma = \{\sigma_1, \sigma_2, \cdots\}$($\sigma_i = \pm 1$ for binary)의 에너지를 클러스터 함수 $\bar\Pi_\alpha$(클러스터 $\alpha$에 속하는 사이트들의 spin 곱의 결정 대칭 평균)의 선형 결합으로 전개한다.

$$E(\sigma) = \sum_\alpha m_\alpha J_\alpha \bar\Pi_\alpha(\sigma)$$

각 항: $m_\alpha$ = 클러스터 $\alpha$의 다중도(crystal symmetry orbit 크기), $J_\alpha$ = ECI(클러스터 $\alpha$의 effective cluster interaction). 클러스터 $\alpha$는 단일점($\alpha$ = 1), 쌍($\alpha$ = $i$-$j$ pair), 삼중체($i$-$j$-$k$ triplet) 순으로 확장된다.

CE의 정당성: Sanchez-Ducastel-Gratias (1984) 정리에 의해 모든 배치 함수는 클러스터 함수의 완전 직교 기저로 정확히 전개되며, 따라서 충분히 많은 클러스터를 포함하면 임의의 정밀도로 에너지를 재현할 수 있다. 실용에서는 nearest-neighbor pair부터 시작해 더 먼 pair, 작은 triplet으로 확장하며, ECI가 충분히 작아지는 차수에서 자른다(보통 ~10-30개 ECI).

ECI 결정 워크플로:
1. DFT로 $N$개($\sim 50-200$) 서로 다른 배치의 정확한 에너지를 계산.
2. 클러스터 함수 행렬 $\bar\Pi_{\alpha,k}$ ($k$ = 배치 인덱스)를 만든다.
3. 최소제곱 또는 LASSO 정규화 회귀로 $J_\alpha$를 피팅: $\min_{J} \|E_\text{DFT} - \bar\Pi J\|^2 + \lambda\|J\|_1$.
4. Cross-validation으로 클러스터 truncation을 결정 (overfitting 방지).

피팅된 CE 해밀토니안은 임의의 배치(시뮬레이션 셀에 들어갈 수 있는 어떤 Li 패턴이든)에 대해 즉시 에너지를 준다. 이 점이 결정적이다 — DFT 계산 한 번에 분 단위에서 시간 단위가 걸리지만, CE 평가는 마이크로초 단위. 따라서 $10^6$ 스텝짜리 Monte Carlo가 가능해진다.

## 5. Monte Carlo 시뮬레이션

CE 해밀토니안이 손에 있으면 유한 온도 평형을 푸는 표준 도구는 **Metropolis Monte Carlo**다. 격자 위 배치 공간을 마르코프 사슬로 샘플링해 정준(또는 대정준) 분배 함수의 평균을 계산한다.

알고리즘 핵심:

1. 현재 배치 $\sigma$에서 단일 사이트(또는 두 사이트의 점유 swap)를 무작위로 선택하고 $\sigma'$로 시도한다.
2. 에너지 변화 $\Delta E = E(\sigma') - E(\sigma)$를 CE로 즉시 계산한다.
3. **Metropolis 받아들임 확률**:
   $$P_\text{accept} = \min(1, e^{-\beta \Delta E})$$
4. 받아들이면 $\sigma' \to \sigma$, 거부하면 그대로 유지.

이 단순한 규칙이 Boltzmann 분포 $P(\sigma) \propto e^{-\beta E(\sigma)}$로 수렴하는 마르코프 사슬을 만든다. 직관: 에너지를 낮추는 변화는 항상 받아들이고, 에너지를 올리는 변화는 $e^{-\beta \Delta E}$ 확률로 받아들인다 — 정확히 Boltzmann이 부여하는 가중치.

대정준 MC에서는 사이트 점유 swap 대신 **single-site occupation flip**(빈 → 채움 또는 그 반대)을 시도하며, 받아들임 확률에 화학 포텐셜 항이 추가된다.

$$P_\text{accept} = \min(1, e^{-\beta(\Delta E - \mu \Delta N)})$$

$\mu$를 외부 변수로 스캔하면서 평균 점유율 $\langle x\rangle$을 측정하면 OCV-SOC 곡선이 직접 나온다. 이것이 첫 원리 voltage prediction의 핵심 워크플로다.

실용 주의점:
- **평형화(equilibration)**: 초기 배치의 영향을 지우는 burn-in이 필요. 보통 첫 $10^4$-$10^5$ MC step은 버린다.
- **자기상관**: 연속 샘플 간 상관을 줄이기 위해 측정 간격을 자기상관 시간 이상으로 둔다.
- **임계점 근방의 critical slowing-down**: 단일 사이트 flip은 임계점에서 매우 느려진다. Wolff/Swendsen-Wang cluster algorithm으로 가속.

## 6. 배터리 응용: Li 정렬과 구성 엔트로피

CE + MC 조합이 배터리 소재 모델링에 어떻게 쓰이는지 정리한다.

**LixCoO₂의 Li 정렬상**: $x = 0.5$에서 Li 사이트가 행 단위로 정렬된 ordered phase가 관측된다. Van der Ven et al.이 CE + MC로 이 정렬을 0 K부터 정확히 재현하고 ~100 K 부근의 order-disorder 전이 온도를 예측한 것이 분야의 모범 사례.

**LixNi₁/₃Mn₁/₃Co₁/₃O₂ (NMC) voltage profile**: Wang, Ceder et al. (2006)이 CE를 NMC layered 산화물에 적용해 0 K DFT에서 시작해 300 K OCV 곡선을 정량적으로 재현했다. 이는 voltage profile이 단순 평균이 아니라 Li 배치 엔트로피와 상호작용을 모두 반영함을 보여준 결정적 결과다.

**LiFePO₄의 두 상 공존**: olivine 구조에서 LiFePO₄ ↔ FePO₄ 상전이는 1차 전이로, miscibility gap이 크다. CE + MC가 이 gap의 온도 의존성, 입자 크기 효과(나노 LFP에서 gap 축소), 격자 부정합 응력의 영향을 정량화한다.

**Configurational entropy의 직접 평가**: 화학 포텐셜의 적분으로 구성 엔트로피를 구할 수 있다.

$$S_\text{config}(x) = S_\text{config}(x_0) + \int_{x_0}^{x} \frac{\partial \mu_\text{Li}}{\partial T}\,\frac{dx'}{?}$$

또는 더 직접적으로 thermodynamic integration으로 자유 에너지 차를 추출한다. 이 양이 OCV 곡선의 slope 영역(단일 고용체)에서 곡률을 결정하는 핵심 항이다.

종합하면, 격자 모델은 단순한 이론적 장난감이 아니라 **DFT와 실험 OCV를 잇는 정량적 다리**이며, 첫 원리 voltage 예측·상도표 계산·정렬상 동정의 표준 도구로 자리 잡았다. 실제 임계 거동의 정량적 측면은 다음 본문 [`./04_phase_transitions.md`](./04_phase_transitions.md)에서 다룬다.

## 참고 문헌

- Onsager, L. *Physical Review* 65 (1944) 117–149 — 2D Ising 모델 정확해.
- Sanchez, J. M., Ducastelle, F., Gratias, D. *Physica A* 128 (1984) 334–350 — 클러스터 전개의 수학적 기초.
- Van der Ven, A., Aydinol, M. K., Ceder, G. *Physical Review B* 58 (1998) 2975–2987 — LixCoO₂의 CE + MC 첫 적용.
- Wang, L., Maxisch, T., Ceder, G. *Chemistry of Materials* 19 (2007) 543–552 — Layered NMC의 voltage profile CE 예측 (대표 사례).
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — Metropolis MC 알고리즘 표준 처리.
- Walle, A. van de, Ceder, G. *Journal of Phase Equilibria* 23 (2002) 348–359 — ATAT 코드와 CE 실용 가이드.
