# 앙상블 이론 (Statistical Ensembles)

## 1. 개요

통계역학은 수십 자리 자릿수의 미시 자유도를 가진 계가 단지 몇 개의 거시변수($T, V, P, N, \mu, \cdots$)로 어떻게 깔끔히 기술될 수 있는지를 묻는다. 그 답은 한 줄로 요약된다 — **거시상태(macrostate)는 하나의 미시상태가 아니라 그 거시 조건을 만족하는 미시상태들의 통계 집합(ensemble)이고, 우리가 측정하는 모든 열역학량은 이 집합 위에서의 평균이다**.

직관적으로, 1 mol의 입자가 $10^{23}$ 개나 되는데 그중 어느 미시 배치가 진짜인지 알 길이 없으므로, 우리는 거시 조건과 양립하는 모든 미시 배치를 적절한 가중치로 합산한 평균만을 본다. 이 가중치를 정하는 규약이 곧 앙상블이며, 어떤 변수를 "고정"하고 어떤 변수를 "변동 허용"하는가에 따라 미시정준(NVE), 정준(NVT), 대정준($\mu$VT), 등온등압(NPT) 네 가지가 나뉜다.

배터리 맥락에서 앙상블 선택은 결코 사소한 결정이 아니다. Li가 호스트 격자에 들어갈 때 활물질의 화학 포텐셜 $\mu_\text{Li}$가 곧 OCV(개회로 전압)를 결정하므로, 사이트 점유율을 다루는 격자 가스 모델은 자연스럽게 대정준 앙상블의 언어로 쓰인다. 반면 NPT는 열팽창·격자 부정합 응력 같은 부피 효과를 다룰 때 필수다.

## 2. 미시정준 앙상블 (Microcanonical, NVE)

가장 단순하면서도 통계역학의 출발점이 되는 앙상블이다. 입자 수 $N$, 부피 $V$, 총 에너지 $E$가 모두 정확히 고정된 고립계를 다룬다. 외부와 에너지·입자를 전혀 교환하지 않으므로 가능한 미시상태들은 모두 같은 에너지 껍질($E \le H \le E + dE$) 위에 놓여 있다.

여기서 통계역학 전체를 떠받치는 단 하나의 가정이 들어간다.

> **등확률 원리(Equal a Priori Probability)**: 고립계가 평형에 있을 때, 같은 에너지를 갖는 모든 미시상태는 동일한 확률로 실현된다.

이 원리를 받아들이면 거시상태의 확률은 단순히 그 거시상태에 대응되는 미시상태의 개수 $\Omega(E, V, N)$에 비례한다. Boltzmann의 묘비명에 새겨진 식이 바로 이 미시정준 앙상블의 정의다.

$$S(E, V, N) = k_B \ln \Omega(E, V, N)$$

각 항: $k_B = 1.381 \times 10^{-23}$ J/K (Boltzmann 상수), $\Omega$ = 에너지 $E$를 갖는 미시상태 수(상태 밀도). 엔트로피가 단순히 "상태 수의 로그"라는 이 식은 통계역학을 열역학에 연결하는 단 하나의 다리이며, 나머지 모든 앙상블 식이 여기서 파생된다.

엔트로피로부터 통상의 열역학 변수가 미분으로 추출된다.

$$\frac{1}{T} = \left(\frac{\partial S}{\partial E}\right)_{V,N}, \quad \frac{P}{T} = \left(\frac{\partial S}{\partial V}\right)_{E,N}, \quad -\frac{\mu}{T} = \left(\frac{\partial S}{\partial N}\right)_{E,V}$$

직관적으로 "에너지를 조금 더 받았을 때 상태 수가 얼마나 늘어나는가"가 곧 온도의 역수다. 평형 조건도 자연스럽게 나온다 — 두 계가 에너지를 교환할 때 총 엔트로피를 최대화하는 조건이 $T_1 = T_2$, 입자 교환에서는 $\mu_1 = \mu_2$.

NVE 앙상블의 약점은 실험적 비현실성이다. 진짜 고립계를 만드는 것은 거의 불가능하며, 우리가 다루는 모든 물리계는 환경(thermostat)과 에너지·입자를 교환한다. 그래서 실용 계산에서는 NVE보다 NVT가 압도적으로 많이 쓰이고, NVE는 보통 분자동역학(MD)의 에너지 보존 검증이나 마이크로카노니컬 MC 같은 특수 목적에 한정된다.

## 3. 정준 앙상블 (Canonical, NVT)

이번에는 계를 거대한 열저장조(heat bath)와 접촉시켜 온도 $T$를 고정한다. 입자 수 $N$과 부피 $V$는 그대로 고정되지만 총 에너지는 더 이상 일정하지 않고, 매 순간 저장조와 미세하게 에너지를 교환한다. 즉 계의 미시상태 $i$가 실현될 확률 $P_i$는 그 상태의 에너지 $E_i$에 의존한다.

핵심 결과는 **Boltzmann 분포**다. 열저장조의 엔트로피 $S_\text{bath} = k_B \ln \Omega_\text{bath}$를 계의 에너지에 대해 1차 전개($1/T$가 첫 미분)하면 다음이 즉시 따라온다.

$$P_i = \frac{e^{-\beta E_i}}{Z}, \qquad Z = \sum_i e^{-\beta E_i}$$

각 항: $\beta = 1/k_BT$ (역온도), $Z$ = 정준 분배 함수(canonical partition function). 합 $\sum_i$는 모든 미시상태에 대해 취하며, 동일 에너지가 $g_i$겹 축퇴되어 있으면 $Z = \sum_E g(E) e^{-\beta E}$로 다시 쓴다. 25 °C에서 $k_BT \approx 25.7$ meV이며, 이 값보다 훨씬 큰 에너지 갭을 가진 상태는 사실상 점유되지 않는다는 직관이 여기서 나온다.

> **관련 개념: 자유 에너지와 분배 함수의 관계**
> 정준 앙상블에서 Helmholtz 자유 에너지 $A$는 분배 함수의 로그로 직접 주어진다.
> $$A(T, V, N) = -k_BT \ln Z$$
> 이 식의 의미는 다음과 같다. 미시정준에서 $S = k_B\ln\Omega$가 모든 것의 출발점이었다면, 정준에서는 그 자리를 $A = -k_BT\ln Z$가 차지한다. 두 식 모두 "상태 수 합 → 자유 에너지" 형식이며, 후자는 단순히 각 미시상태에 Boltzmann 가중치 $e^{-\beta E_i}$를 미리 부여한 것이다.
> 일단 $A$를 알면 모든 열역학량이 미분으로 따라 나온다: 엔트로피 $S = -(\partial A/\partial T)_{V,N}$, 압력 $P = -(\partial A/\partial V)_{T,N}$, 화학 포텐셜 $\mu = (\partial A/\partial N)_{T,V}$. 따라서 분배 함수 하나를 정확히 계산하면 그 계의 모든 평형 열역학 정보를 손에 쥐는 셈이다.

평균 에너지와 에너지 요동도 곧장 나온다.

$$\langle E\rangle = -\frac{\partial \ln Z}{\partial \beta}, \qquad \langle (\Delta E)^2\rangle = \frac{\partial^2 \ln Z}{\partial \beta^2} = k_BT^2 C_V$$

두 번째 식이 **요동-소산 정리(fluctuation-dissipation theorem)의 가장 단순한 형태**로, 평형에서 에너지가 얼마나 요동치는지가 곧 열용량을 정한다. 이 관점은 [`./05_transport_theory.md`](./05_transport_theory.md)의 Green-Kubo 식으로 확장된다.

NVT 앙상블이 표준이 된 이유는 명확하다. 실험은 보통 항온조에서 이루어지고, MD/MC 시뮬레이션도 thermostat(Nosé-Hoover, Langevin 등)을 통해 NVT를 표준으로 구현한다. DFT의 유한 온도 보정도 본질적으로 정준 분배 함수에 진동 자유도를 곱하는 일이다 — 자세한 내용은 [`./02_partition_function.md`](./02_partition_function.md).

## 4. 대정준 앙상블 (Grand Canonical, $\mu$VT)

이제 입자 수까지 변동을 허용하자. 계가 입자 저장조와도 접촉해 있어 $N$이 고정되지 않고, 대신 화학 포텐셜 $\mu$가 고정된다. 부피와 온도는 그대로다. 미시상태 $i$가 입자 수 $N_i$, 에너지 $E_i$를 가질 때 그 확률은:

$$P_i = \frac{e^{-\beta(E_i - \mu N_i)}}{\Xi}, \qquad \Xi = \sum_i e^{-\beta(E_i - \mu N_i)} = \sum_N e^{\beta\mu N} Z(T, V, N)$$

각 항: $\Xi$ (Xi) = 대분배 함수(grand partition function), $z = e^{\beta\mu}$ = fugacity. 마지막 형태가 보여주듯, 대분배 함수는 정준 분배 함수의 fugacity 가중 합이다. 대응되는 열역학 퍼텐셜은 grand potential $\Omega_G = -k_BT \ln \Xi = -PV$이며, $\Omega_G(T, V, \mu)$로부터 $S, P, \langle N\rangle$이 모두 미분으로 추출된다.

배터리 응용에서 대정준 앙상블의 위력은 **호스트 격자의 Li 점유**에 그대로 적용된다. $M$개의 동등한 사이트가 있고 각 사이트가 비어 있거나 Li로 채워지는(점유 에너지 $\epsilon$, Li 화학 포텐셜 $\mu_\text{Li}$) 단순한 격자 가스 모델을 보자. 사이트 간 상호작용을 무시하면 한 사이트의 분배 함수는 두 항의 합이고 ($1$ + $e^{-\beta(\epsilon-\mu)}$), 사이트가 독립이므로 전체는 곱이 된다.

$$\Xi = \left(1 + e^{-\beta(\epsilon-\mu_\text{Li})}\right)^M$$

평균 점유율 $x = \langle N\rangle / M$은 다음의 페르미-디랙형 식으로 떨어진다.

$$x(\mu_\text{Li}, T) = \frac{1}{1 + e^{\beta(\epsilon - \mu_\text{Li})}}$$

이 식이 의미하는 바는 결정적이다 — **OCV 곡선의 모양은 곧 활물질의 $\mu_\text{Li}(x)$ 곡선**이며 ($eV_\text{OCV} = -\mu_\text{Li}$ + 상수), 사이트 상호작용을 켜면 1차 상전이(plateau, [`./04_phase_transitions.md`](./04_phase_transitions.md))가 자연스럽게 등장한다. [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)에서 본 plateau/slope 분석의 통계역학적 기초가 바로 여기다.

대정준 앙상블의 또 다른 큰 활용은 흡착(BET 등온식), 이온 교환, 전기이중층의 이온 분포(Poisson-Boltzmann)이며, 모두 화학 포텐셜이 외부 조건으로 주어지는 자연스러운 상황이다.

## 5. 등온-등압 앙상블 (NPT)

마지막으로 부피까지 변동을 허용하자. 계가 외부 압력 $P$를 받으며 부피가 자유롭게 조정되는 상황으로, 일상의 실험 조건(대기압, 항온조)이 정확히 이에 해당한다. 분배 함수에는 부피에 대한 적분이 추가되고, 가중치에는 $e^{-\beta PV}$ 항이 들어간다.

$$\Delta(T, P, N) = \int_0^\infty dV\, e^{-\beta PV} Z(T, V, N)$$

대응되는 열역학 퍼텐셜은 Gibbs 자유 에너지다.

$$G(T, P, N) = -k_BT \ln \Delta$$

엔트로피, 부피, 화학 포텐셜이 미분으로 따라 나온다: $S = -(\partial G/\partial T)_{P,N}$, $V = (\partial G/\partial P)_{T,N}$, $\mu = (\partial G/\partial N)_{T,P}$.

NPT 앙상블이 배터리 모델링에서 중요해지는 자리는 **부피 효과가 본질적인 문제**다. 첫째, 활물질의 열팽창 시뮬레이션은 정의상 부피를 고정해서는 안 된다. 둘째, 양극 layered 구조의 c-축 격자 상수가 SOC에 따라 출렁이는 현상이나, LFP의 두 상($a$-axis/$c$-axis 격자 부정합 ~5%)이 공존할 때 발생하는 응력 장은 NPT 또는 더 일반적인 응력-제어 앙상블로만 다룰 수 있다. 셋째, Si 음극의 ~300% 부피 팽창은 NPT MD가 필수다.

PV 항이 작은 응축상(condensed phase)에서는 NVT와 NPT의 결과가 거의 같지만, 체계적으로 옳은 답을 원하면 실험 조건에 맞는 앙상블을 쓰는 것이 원칙이다.

## 6. 앙상블 등가성과 선택 기준

네 앙상블이 다른 변수 집합을 다루지만, **열역학 극한($N, V \to \infty$, $N/V$ 유지)에서 모두 같은 평균값을 준다**. 이것이 앙상블 등가성(ensemble equivalence)이며, 이론적으로 보장된 열역학적 보편성이다. 직관은 단순하다 — 거시계에서 에너지/입자/부피 요동은 평균값 대비 $1/\sqrt{N}$로 줄어들기 때문에, 어떤 변수를 "고정"하고 어떤 변수를 "변동 허용"하는지가 평균값에는 영향을 주지 않는다.

다만 요동(fluctuation)은 앙상블마다 다르다. NVE에서는 에너지 요동이 0, NVT에서는 $k_BT^2 C_V$로 유한, NPT에서는 부피 요동까지 추가, $\mu$VT에서는 입자 수 요동까지 합쳐진다. 따라서 응답 함수(susceptibility, 열용량, 압축률)를 요동으로부터 직접 추출할 때는 앙상블 선택이 결과의 의미를 결정한다.

실용 가이드라인:

| 상황 | 권장 앙상블 | 이유 |
|------|------|------|
| MD 에너지 보존 검증 | NVE | 정의상 에너지 일정 |
| 표준 유한 온도 평형 | NVT | 실험 항온 조건과 일치, 구현 간단 |
| 사이트 점유, 흡착, OCV(SOC) | $\mu$VT | $\mu$가 외부에서 부여되는 자연스러운 변수 |
| 열팽창, 응력, 부피 변화 | NPT | 부피 자유 조정 |

전체적으로, 정준 앙상블이 가장 흔하고 대정준이 배터리 격자 가스 문제에서 두드러진다는 점만 기억하면 충분하다. 다음 본문 [`./02_partition_function.md`](./02_partition_function.md)에서는 분배 함수 $Z$를 어떻게 실제로 계산하고 그로부터 모든 열역학량을 추출하는지 자세히 다룬다.

## 참고 문헌

- McQuarrie, D. A. *Statistical Mechanics* (University Science Books, 2000) — 통계역학 표준 교재, 네 앙상블 정의와 등가성 증명.
- Pathria, R. K., Beale, P. D. *Statistical Mechanics* (3rd ed., Academic Press, 2011) — 미시정준-정준-대정준 일관된 처리.
- Chandler, D. *Introduction to Modern Statistical Mechanics* (Oxford, 1987) — 직관 중심 입문, 요동-반응 관계.
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — NVT/NPT/$\mu$VT MC/MD 실제 구현.
- Van der Ven, A., Ceder, G. *Electrochemical and Solid-State Letters* 3 (2000) 301–304 — 대정준 앙상블에서 Li 인터칼레이션 자유 에너지 계산.
