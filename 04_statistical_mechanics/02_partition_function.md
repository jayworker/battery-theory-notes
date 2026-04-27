# 분배 함수와 자유 에너지 (Partition Function and Free Energy)

## 1. 개요

[`./01_ensembles.md`](./01_ensembles.md)에서 정준 앙상블의 분배 함수 $Z = \sum_i e^{-\beta E_i}$를 정의했다. 분배 함수가 단지 정규화 상수로 보일 수 있지만, 실제로는 **그 계의 모든 평형 열역학 정보를 담고 있는 모함수(generating function)**다. 자유 에너지는 $Z$의 로그 한 번이고, 내부 에너지·엔트로피·열용량·화학 포텐셜은 모두 $\ln Z$의 적절한 미분으로 떨어진다.

직관적으로 $Z$는 "온도 $T$에서 계가 접근 가능한 미시상태의 유효 개수"다. 모든 상태가 동일하게 점유되면 $Z$는 단순한 상태 수, 에너지 차이가 $k_BT$보다 훨씬 크면 그 상태는 가중치가 0에 가까워져 사실상 빠진다. 그래서 $\ln Z$는 "유효 자유도의 로그"이며, 자유 에너지가 그것의 $-k_BT$배라는 점이 자연스럽다.

배터리 모델링에서 분배 함수는 두 가지 자리에서 핵심적이다. 첫째, DFT가 주는 0 K 전자 에너지에 진동·구성(configurational) 자유도의 분배 함수를 곱해 유한 온도 자유 에너지를 얻는 일($G(T) = E_\text{DFT} + F_\text{vib}(T) + F_\text{config}(T)$). 둘째, 활물질의 화학 포텐셜 $\mu_\text{Li}(x, T)$를 격자 모델 분배 함수의 미분으로 직접 계산해 OCV 곡선을 예측하는 일.

## 2. 분배 함수와 Helmholtz 자유 에너지

정준 앙상블의 출발점을 다시 적자. 미시상태 $i$의 에너지 $E_i$, 역온도 $\beta = 1/k_BT$일 때:

$$Z(T, V, N) = \sum_i e^{-\beta E_i}$$

이 합은 양자 미시상태의 합이거나, 고전 한계에서는 위상공간 적분 $Z = h^{-3N}\int d^{3N}q\, d^{3N}p\, e^{-\beta H(q,p)}/N!$로 옮겨진다. 어느 쪽이든 단조 감소하는 가중치 $e^{-\beta E}$가 핵심이며, $E_i \gg k_BT$인 상태는 합에 거의 기여하지 않는다.

Helmholtz 자유 에너지 $A$는 분배 함수의 로그로 정의된다. 이것이 본문의 가장 중요한 등식이다.

$$\boxed{A(T, V, N) = -k_BT \ln Z(T, V, N)}$$

이 식의 정당성은 $A = U - TS$의 양변을 통계역학적으로 표현해 보면 즉시 드러난다. 평균 에너지 $\langle E\rangle$와 Gibbs 엔트로피 $S = -k_B\sum P_i \ln P_i$를 Boltzmann 분포 $P_i = e^{-\beta E_i}/Z$로 대입하면 $A = -k_BT\ln Z$가 정확히 나온다. 따라서 자유 에너지는 결코 임의의 정의가 아니라 통계역학과 열역학의 일관성에서 떨어지는 식이다.

자유 에너지를 알면 나머지는 모두 미분이다.

$$S = -\left(\frac{\partial A}{\partial T}\right)_{V,N}, \quad P = -\left(\frac{\partial A}{\partial V}\right)_{T,N}, \quad \mu = \left(\frac{\partial A}{\partial N}\right)_{T,V}$$

이 세 식은 $dA = -S\,dT - P\,dV + \mu\,dN$이라는 1열역학 항등식의 직접적 결과다.

## 3. 열역학량의 추출

자유 에너지 대신 $\ln Z$를 직접 미분해 얻는 표현이 더 자주 쓰인다. 평균 내부 에너지부터 시작하자.

$$\langle E\rangle = \sum_i E_i P_i = -\frac{\partial \ln Z}{\partial \beta} = k_BT^2 \frac{\partial \ln Z}{\partial T}$$

직관: $-\partial/\partial\beta$가 $E_i$를 가중치 안에서 끌어내리고, 그 결과는 자연스럽게 평균 에너지다. 이어서 엔트로피는 $A = U - TS$를 풀어 다음과 같이 쓰여진다.

$$S = k_B(\ln Z + \beta \langle E\rangle) = -\frac{\partial A}{\partial T}$$

정적 열용량 $C_V$는 한 번 더 미분이다.

$$C_V = \left(\frac{\partial \langle E\rangle}{\partial T}\right)_{V,N} = \frac{1}{k_BT^2}\langle (\Delta E)^2\rangle$$

마지막 등식이 보여주는 것은 충격적이다 — **열용량이 평형에서의 에너지 요동에 비례**한다. 이것이 요동-소산 정리(fluctuation-dissipation)의 가장 단순한 사례이며, MD 시뮬레이션에서 평형 trajectory의 에너지 분산만 측정해도 $C_V$를 추출할 수 있다는 실용적 결론으로 이어진다 ([`./05_transport_theory.md`](./05_transport_theory.md)에서 같은 논리가 수송 계수로 확장된다).

자기 감수율, 압축률 등 다른 응답 함수도 모두 같은 형태를 가진다 — "응답 함수 = 공액 변수의 평형 요동". $\ln Z$가 모함수라는 표현이 이 의미다.

## 4. 분리 가능한 시스템: 자유도의 곱

서로 약하게 결합된 자유도들이 있을 때(병진, 회전, 진동, 전자, 핵 스핀, 배치 등), 해밀토니안이 합으로 분리되면 분배 함수는 자동으로 곱으로 분해된다.

$$H = H_\text{trans} + H_\text{rot} + H_\text{vib} + H_\text{el} \implies Z = Z_\text{trans} \cdot Z_\text{rot} \cdot Z_\text{vib} \cdot Z_\text{el}$$

자유 에너지로 옮기면 합으로 변환된다.

$$A = -k_BT \sum_\alpha \ln Z_\alpha = A_\text{trans} + A_\text{rot} + A_\text{vib} + A_\text{el}$$

이 분리 가능성이 통계역학 계산을 실행 가능하게 만든다. 예: 결정 고체의 진동 분배 함수는 $3N$개 정상 모드(각각 진동수 $\omega_k$)의 곱이며, 각 조화 진동자 분배 함수는 $Z_\text{vib}^{(k)} = 1/[2\sinh(\beta\hbar\omega_k/2)]$. 따라서 진동 자유 에너지는:

$$F_\text{vib}(T) = \sum_k \left[\frac{\hbar\omega_k}{2} + k_BT \ln(1 - e^{-\beta\hbar\omega_k})\right]$$

첫째 항이 영점 에너지(ZPE), 둘째 항이 유한 온도 보정. DFT가 주는 정적 격자 에너지 $E_\text{DFT}$에 이 $F_\text{vib}$를 더하면 비로소 유한 온도 Helmholtz 자유 에너지가 된다.

배터리 응용에서 이 분리 가능성은 다음과 같이 쓰인다.

$$G(T, P, x) \approx E_\text{DFT}(x) + F_\text{vib}(T, x) + F_\text{config}(T, x) + PV(x)$$

각 항이 서로 다른 자유도를 책임진다 — 전자 구조($E_\text{DFT}$, DFT 영역), 격자 진동($F_\text{vib}$), Li/공공 배치($F_\text{config}$, [`./03_lattice_models.md`](./03_lattice_models.md)). 이 합이 SOC 함수로 OCV($\partial G/\partial x$ ∝ $-\mu_\text{Li}$)를 결정한다.

## 5. 화학 포텐셜과 입자 추가

화학 포텐셜은 "입자를 하나 더 넣을 때 자유 에너지가 얼마나 늘어나는가"의 통계역학 정의다.

$$\mu = \left(\frac{\partial A}{\partial N}\right)_{T,V} = -k_BT\left(\frac{\partial \ln Z}{\partial N}\right)_{T,V}$$

큰 $N$ 극한에서는 차분으로 근사하기도 한다 — $\mu \approx A(N+1) - A(N)$. 이 표현은 widom insertion 같은 MC 기법의 직접적 기반이다.

배터리에서 가장 중요한 화학 포텐셜은 활물질 내 Li의 $\mu_\text{Li}(x)$다. OCV가 화학 포텐셜과 직결되므로:

$$eV_\text{OCV}(x) = -[\mu_\text{Li}^\text{cathode}(x) - \mu_\text{Li}^\text{anode}]$$

따라서 $\mu_\text{Li}^\text{cathode}(x)$ 곡선의 모양이 곧 V-Q 곡선의 모양이며, 곡선이 평평한 plateau는 두 상의 $\mu_\text{Li}$가 같아지는 1차 상전이 영역에 해당한다 ([`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)).

자세한 해석: 단일 고용체 영역에서는 $\mu_\text{Li}(x)$가 매끄러운 함수이므로 OCV가 slope를 그리고, 두 상(혹은 두 사이트 종류)이 공존하면 공통 접선 구성으로 $\mu_\text{Li}$가 두 상에 걸쳐 일정해져 plateau가 등장한다. 이 모든 것이 $G(x)$ 곡선의 볼록·오목 구조에 대한 1열역학 결과이며, 통계역학은 $G(x)$를 첫 원리에서 계산할 수 있게 해준다.

## 6. 격자 기체와 사이트 점유: 직접 응용

배터리 활물질의 가장 단순한 모델은 **격자 기체(lattice gas)**다. $M$개 사이트, 각각 비어 있거나 ($n_i = 0$, 에너지 0) Li로 채워짐 ($n_i = 1$, 에너지 $\epsilon$). 사이트 간 상호작용을 무시하면 정준 분배 함수는 다항 계수로 떨어진다.

$$Z(T, M, N) = \binom{M}{N} e^{-\beta N\epsilon}$$

여기서 $\binom{M}{N}$이 배치 가짓수(configurational degeneracy), $e^{-\beta N\epsilon}$이 에너지 가중치. Stirling 근사로 자유 에너지를 풀면 친숙한 entropy of mixing 형태가 나온다.

$$A = N\epsilon + k_BT M \left[x \ln x + (1-x)\ln(1-x)\right], \qquad x = N/M$$

화학 포텐셜은 $x$로 미분이다.

$$\mu_\text{Li}(x) = \epsilon + k_BT \ln\frac{x}{1-x}$$

이 식은 **이상 격자 기체(ideal lattice gas)의 OCV 식**이며, $x = 0.5$에서 발산 없이 매끄러운 S-자 곡선을 그린다. 실제 활물질에서는 사이트 간 상호작용($J\sum n_i n_j$)이 들어가 비이상성이 추가되며, 그 결과로 plateau가 등장하거나 사라진다 — 다음 본문 [`./03_lattice_models.md`](./03_lattice_models.md)에서 cluster expansion으로 정량화한다.

대정준 표현으로 옮기면 더욱 깔끔하다. [`./01_ensembles.md`](./01_ensembles.md)에서 본 것처럼 사이트가 독립일 때:

$$\Xi = \prod_{i=1}^M \left(1 + e^{-\beta(\epsilon - \mu_\text{Li})}\right) = \left(1 + e^{-\beta(\epsilon - \mu_\text{Li})}\right)^M$$

평균 점유율 $x = -\partial(\Omega_G/M)/\partial\mu_\text{Li}$가 페르미-디랙 형태 $x = 1/(1 + e^{\beta(\epsilon-\mu_\text{Li})})$로 떨어지며, 이를 $\mu_\text{Li}$에 대해 풀어도 위와 똑같은 식이 나온다(앙상블 등가성).

이 단순 모델이 주는 교훈은 두 가지다. 첫째, $\ln Z$ 한 번이면 OCV 모델 전체가 손에 들어온다. 둘째, 사이트 상호작용을 켜면 비로소 plateau, 두 상 공존, 임계점 같은 풍부한 상거동이 등장하며, 이를 정량화하려면 격자 모델과 MC 시뮬레이션이 필요하다.

## 참고 문헌

- McQuarrie, D. A. *Statistical Mechanics* (University Science Books, 2000) — 분배 함수, 자유 에너지, 자유도 분리 표준 처리.
- Pathria, R. K., Beale, P. D. *Statistical Mechanics* (3rd ed., Academic Press, 2011) — 격자 기체, 화학 포텐셜의 통계역학적 정의.
- Hill, T. L. *An Introduction to Statistical Thermodynamics* (Dover, 1986) — 격자 기체와 흡착 등온식의 기초.
- Van de Walle, A., Asta, M. *Modelling Simul. Mater. Sci. Eng.* 10 (2002) 521–538 — DFT + 진동 분배 함수로 유한 온도 자유 에너지 계산.
- Wolverton, C., Zunger, A. *Physical Review B* 57 (1998) 2242–2252 — 활물질의 cluster expansion과 OCV 곡선 첫 원리 계산.
