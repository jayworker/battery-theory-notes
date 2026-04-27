# 양자역학 기초 (Quantum Mechanics Basics)

## 1. 개요

배터리 소재의 전압, 이주 장벽, 산화 환원 중심을 "원자 단위에서" 정량적으로 다루려면 결국 전자 구조 계산으로 내려가야 한다. 그 출발점이 양자역학(quantum mechanics, QM)이며, 그중에서도 시간 독립 슈뢰딩거 방정식(time-independent Schrödinger equation, TISE)이 모든 first-principles 계산의 뼈대다.

직관적으로 보면, 고전 역학은 입자의 위치와 운동량을 동시에 알 수 있다고 가정한다. 그러나 전자처럼 가벼운 입자에서는 위치-운동량을 동시에 정확히 결정할 수 없으며(불확정성), 전자는 입자라기보다 공간에 분포한 "확률 진폭(probability amplitude)" 형태로 다뤄야 한다. 이 진폭이 곧 파동함수 $\psi(\mathbf{r})$ 이다.

본 절은 DFT를 이해하기 위해 필요한 최소한의 양자역학 — TISE의 구조, 파동함수 해석, 연산자와 측정, 다전자 시스템의 반대칭(antisymmetry), Hartree-Fock(HF) 평균장 — 을 정리한다. 이후 02 절(DFT foundations)에서 "다전자 파동함수 대신 전자 밀도 $n(\mathbf{r})$ 하나로 모든 것을 표현하자"는 DFT의 출발점을 정당화하기 위한 사전 단계다.

한 가지 시선: HF가 정확한 교환(exchange)은 다루지만 상관(correlation)을 놓치는 반면, DFT는 둘 다 근사로 묶어 처리한다는 대조를 미리 새겨 두면 03 절(exchange-correlation)을 읽을 때 훨씬 쉽다.

## 2. 시간 독립 슈뢰딩거 방정식

원자/분자/결정의 정상 상태(stationary state) 에너지를 결정하는 식은 TISE다. 시간 의존 SE에서 해를 $\Psi(\mathbf{r}, t) = \psi(\mathbf{r}) e^{-iEt/\hbar}$ 로 분리하면 시간 부분이 떨어져 나가고, 공간 부분에 대한 고유값 문제(eigenvalue problem)만 남는다.

직관적으로, $\hat{H}$ 는 시스템의 총 에너지를 주는 연산자이고 $\psi$ 는 그 에너지에 해당하는 정상 상태의 분포다. "정상 상태"란 시간이 흘러도 확률 밀도 $|\psi|^2$ 가 변하지 않는 상태이며, 바닥 상태(ground state)는 그중 에너지가 가장 낮은 해다.

$$\hat{H}\psi(\mathbf{r}) = E\psi(\mathbf{r})$$

여기서 $\hat{H}$ = 해밀토니안(Hamiltonian) 연산자, $\psi$ = 파동함수, $E$ = 에너지 고유값. 단일 입자(전자) 한 개가 외부 퍼텐셜 $V(\mathbf{r})$ 안에 있을 때:

$$\hat{H} = -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r})$$

각 항: 첫 항 = 운동 에너지 $\hat{T}$ (라플라시안 $\nabla^2$), 둘째 항 = 퍼텐셜 에너지 $\hat{V}$, $\hbar = h/2\pi \approx 1.055 \times 10^{-34}$ J·s, $m$ = 입자 질량(전자: $m_e \approx 9.11 \times 10^{-31}$ kg). TISE는 선형 미분 방정식이며, 동일한 $\hat{H}$ 에 대해 무한히 많은 고유값-고유함수 쌍 $\{(E_n, \psi_n)\}$ 이 존재한다(이산 스펙트럼이면 결합 상태, 연속이면 산란 상태).

분자/결정으로 확장하면 핵-전자 인력, 전자-전자 반발이 추가되며 전체 해밀토니안은:

$$\hat{H} = -\sum_i \frac{\hbar^2}{2m_e}\nabla_i^2 - \sum_I \frac{\hbar^2}{2M_I}\nabla_I^2 - \sum_{i,I}\frac{Z_I e^2}{4\pi\epsilon_0|\mathbf{r}_i - \mathbf{R}_I|} + \frac{1}{2}\sum_{i\neq j}\frac{e^2}{4\pi\epsilon_0|\mathbf{r}_i - \mathbf{r}_j|} + \frac{1}{2}\sum_{I\neq J}\frac{Z_I Z_J e^2}{4\pi\epsilon_0|\mathbf{R}_I - \mathbf{R}_J|}$$

각 항: 전자 운동 에너지, 핵 운동 에너지, 핵-전자 인력, 전자-전자 반발, 핵-핵 반발. 이 식이 다체 문제(many-body problem)의 출발점이며, 전자 수가 늘어나면 차원이 폭발한다(전자 $N$ 개의 파동함수 $\psi(\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_N)$ 는 $3N$ 차원 함수).

> **관련 개념: Born-Oppenheimer 근사**
> 핵의 질량은 전자보다 약 $1836$ 배 이상 무거우므로($M_I/m_e \gg 1$), 전자가 핵의 움직임에 거의 즉각 반응한다. 따라서 핵 좌표 $\{\mathbf{R}_I\}$ 를 매개변수(parameter)로 고정하고 전자 부분만 푸는 근사가 정당화된다. 이것이 Born-Oppenheimer 근사(BO)이며, 전자 해밀토니안 $\hat{H}_{el}(\{\mathbf{R}_I\})$ 의 바닥 상태 에너지 $E_{el}(\{\mathbf{R}_I\})$ 가 곧 핵의 운동을 지배하는 퍼텐셜 에너지면(potential energy surface, PES)을 정의한다. DFT는 이 PES의 한 점을 계산하는 도구다.
> BO가 깨지는 대표 사례: 광유발 전이(non-adiabatic dynamics), 전자-포논 결합이 강한 초전도, 양성자 이동(proton transfer). 일반 배터리 정적 계산에서는 BO가 거의 항상 유효하다.

## 3. 파동함수와 확률 해석

파동함수 $\psi(\mathbf{r})$ 그 자체는 직접 측정할 수 없는 양이며, 직접 의미를 갖는 것은 그 절댓값 제곱 $|\psi(\mathbf{r})|^2$ 이다. 이를 Born 해석이라 부르며, $|\psi(\mathbf{r})|^2 \, d^3r$ 가 입자를 미소 부피 $d^3r$ 안에서 발견할 확률이다.

직관적으로, $\psi$ 는 복소수 진폭(amplitude)이고, 양자역학은 본질적으로 진폭의 중첩 이론이다. 실험에서 보는 확률은 진폭의 절댓값 제곱이며, 두 경로의 진폭이 더해질 때 간섭(interference)이 나타난다.

확률 해석이 의미를 가지려면 전체 공간에서 적분이 1이어야 한다(정규화 조건):

$$\int |\psi(\mathbf{r})|^2 \, d^3r = 1$$

이 조건은 추가로 파동함수에 경계 조건을 부과한다. 무한 영역에서는 $\psi \to 0$ for $|\mathbf{r}| \to \infty$, 결정 같은 주기계에서는 Bloch 정리에 따른 $\psi(\mathbf{r} + \mathbf{R}) = e^{i\mathbf{k}\cdot\mathbf{R}}\psi(\mathbf{r})$ (이 식은 04 절 plane-wave/k-point에서 다시 등장).

추가로 파동함수에는 다음 요건이 붙는다.
- 단일값(single-valued): 같은 점에서 두 값을 가지면 안 됨
- 연속(continuous): $\psi$ 와 $\nabla\psi$ 가 부드러워야 함(델타 퍼텐셜 같은 특이점 제외)
- 제곱 적분 가능(square integrable): $\int|\psi|^2 < \infty$

배터리 맥락에서 이 점이 중요해지는 자리는 PAW(projector augmented wave) 방법이다. 코어 영역의 파동함수는 격렬히 진동해 plane-wave 표현이 비효율적이므로, PAW는 그 영역을 부드러운 슈도 파동함수로 변환한다 — 04 절에서 다시 다룸.

## 4. 연산자와 관측

양자역학에서 측정 가능한 모든 물리량(observable)은 에르미트 연산자(Hermitian operator)로 표현된다. 측정 결과는 그 연산자의 고유값 중 하나이며, 측정 후 시스템은 해당 고유 상태로 "붕괴"한다.

핵심 연산자 세 개: 위치 $\hat{x} = x$, 운동량 $\hat{p}_x = -i\hbar \partial/\partial x$, 에너지 $\hat{H}$. 이들의 기대값(expectation value)은:

$$\langle \hat{A} \rangle = \int \psi^*(\mathbf{r}) \, \hat{A} \, \psi(\mathbf{r}) \, d^3r$$

각 항: $\psi^*$ = 복소 켤레, $\hat{A}$ = 임의 연산자. $\langle \hat{H} \rangle$ 는 평균 에너지이고, 정상 상태에서는 $\langle\hat{H}\rangle = E$ 로 고정값이 된다.

두 연산자의 비가환성(non-commutativity)이 불확정성의 근원이다. 교환자(commutator) $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$ 가 0이 아니면 두 양을 동시에 정확히 측정할 수 없다.

$$[\hat{x}, \hat{p}_x] = i\hbar, \qquad \Delta x \cdot \Delta p_x \geq \frac{\hbar}{2}$$

이것이 Heisenberg 불확정성 원리. 직관적으로 전자가 핵 근처의 매우 좁은 영역에 갇힐수록 $\Delta x$ 가 작아지고 $\Delta p$ 가 커져 운동 에너지가 폭발한다 — 그래서 전자가 핵으로 무한히 빨려 들어가지 않고 안정한 원자가 존재한다(물질의 안정성, Lieb-Thirring 정리).

DFT 계산에서 자주 보는 양:
- 총 에너지 $E = \langle\hat{H}\rangle$
- 전자 밀도 $n(\mathbf{r}) = N \int |\Psi(\mathbf{r}, \mathbf{r}_2, \ldots, \mathbf{r}_N)|^2 d\mathbf{r}_2 \cdots d\mathbf{r}_N$
- 힘(Hellmann-Feynman) $\mathbf{F}_I = -\partial E/\partial \mathbf{R}_I$
- 응력 텐서 $\sigma_{\alpha\beta} = -(1/V)\partial E/\partial \epsilon_{\alpha\beta}$

힘과 응력을 0으로 만들면 구조 완화(structural relaxation)가 끝난다 — 04 절에서 다시 언급.

## 5. 다전자 시스템과 반대칭

전자는 페르미온(fermion, spin-1/2)이며, 그 결과 다전자 파동함수는 어떤 두 전자의 좌표(공간 + 스핀)를 교환했을 때 부호가 뒤집혀야 한다. 이를 반대칭(antisymmetry) 요건이라 부르며, 동일한 공간-스핀 상태에 두 전자가 들어갈 수 없다는 Pauli 배타 원리(Pauli exclusion principle)가 그 직접적 결과다.

직관적으로, 두 전자가 같은 자리에 있으면 파동함수가 자기 자신의 부호 반전과 같아져야 하므로 $\psi = -\psi$, 즉 $\psi = 0$. 그래서 같은 양자수의 두 전자가 한 자리에 공존할 수 없다.

수학적으로 이 요건을 자동 충족시키는 가장 간단한 형태가 Slater determinant다.

$$\Psi(\mathbf{x}_1, \ldots, \mathbf{x}_N) = \frac{1}{\sqrt{N!}}
\begin{vmatrix}
\phi_1(\mathbf{x}_1) & \phi_2(\mathbf{x}_1) & \cdots & \phi_N(\mathbf{x}_1) \\
\phi_1(\mathbf{x}_2) & \phi_2(\mathbf{x}_2) & \cdots & \phi_N(\mathbf{x}_2) \\
\vdots & \vdots & \ddots & \vdots \\
\phi_1(\mathbf{x}_N) & \phi_2(\mathbf{x}_N) & \cdots & \phi_N(\mathbf{x}_N)
\end{vmatrix}$$

여기서 $\mathbf{x}_i = (\mathbf{r}_i, s_i)$ 는 공간-스핀 좌표, $\{\phi_i\}$ 는 직교 정규 단일 입자 궤도(orbital), $1/\sqrt{N!}$ 는 정규화 인자. 두 행을 바꾸면 행렬식이 부호가 뒤집히므로 반대칭이 자동 보장된다.

이 형태가 의미를 가지려면 전자들이 사실상 독립적이어야 하고, 그래서 단일 Slater determinant는 평균장 근사(mean-field approximation)와 자연스럽게 짝을 이룬다. 정확한 다체 파동함수는 일반적으로 무수히 많은 Slater determinant의 선형 결합(configuration interaction, CI)이며, 이 차이가 전자 상관 에너지(electron correlation energy)다.

다전자 문제의 진짜 어려움: 단일 전자 파동함수 차원은 $\sim 10^3$ 그리드 점이지만, $N$ 전자의 곱이 들어간 다체 파동함수 차원은 $10^{3N}$ 으로 폭발한다. CI를 풀면 정확하지만 분자에서도 ~10 전자 이상이면 사실상 불가능하다. DFT가 출발한 이유: $3N$ 차원 $\Psi$ 대신 3차원 함수 $n(\mathbf{r})$ 만으로 표현하자.

## 6. Hartree-Fock 근사

다전자 슈뢰딩거 방정식을 단일 Slater determinant 가정 아래 변분 원리로 풀면 Hartree-Fock(HF) 방정식이 나온다. 각 전자가 다른 모든 전자가 만드는 평균 퍼텐셜 안에서 운동한다는 평균장 그림이며, 단일 입자 궤도 $\phi_i$ 에 대한 자기 일관(self-consistent) 방정식 형태다.

직관적으로, 전자-전자 반발이 두 항으로 분리된다. (i) 고전적 Coulomb(Hartree) 항: 다른 전자가 만드는 평균 전자 밀도와의 정전기적 반발. (ii) 교환(exchange) 항: 반대칭 요건에서 오는 양자역학적 보정으로, 같은 스핀의 두 전자가 서로 피하는 효과(Fermi hole). 두 항을 모두 합쳐 Fock 연산자를 정의한다.

$$\hat{F}\phi_i(\mathbf{x}) = \epsilon_i \phi_i(\mathbf{x})$$

$$\hat{F} = -\frac{\hbar^2}{2m_e}\nabla^2 + v_{ext}(\mathbf{r}) + \hat{J} - \hat{K}$$

각 항: $\hat{J}\phi_i(\mathbf{x}) = \sum_j \int \frac{|\phi_j(\mathbf{x}')|^2}{|\mathbf{r} - \mathbf{r}'|} d\mathbf{x}' \, \phi_i(\mathbf{x})$ (Coulomb), $\hat{K}\phi_i(\mathbf{x}) = \sum_j \int \frac{\phi_j^*(\mathbf{x}')\phi_i(\mathbf{x}')}{|\mathbf{r} - \mathbf{r}'|} d\mathbf{x}' \, \phi_j(\mathbf{x})$ (exchange, 비국소적 적분 연산자), $\epsilon_i$ = 궤도 에너지(Koopmans 정리에서 이온화 에너지의 근사).

HF의 두 가지 본질적 한계:
1. **상관 에너지(correlation) 부재**: HF는 정확한 exchange를 다루지만, 전자들이 동시에 서로 피하는 동적 상관(dynamic correlation)과 다중 행렬식이 필요한 정적 상관(static correlation)을 놓친다. HF 에너지와 정확한 비상대론적 에너지의 차이가 정의상 상관 에너지($E_{corr} = E_{exact} - E_{HF}$)이며, 분자 결합 에너지의 ~1% 수준이라도 화학 정확도($\sim 1$ kcal/mol)를 망친다.
2. **계산 비용**: exchange 항이 $O(N^4)$ 스케일링(plane-wave 기저에선 더 나빠짐)이라 큰 시스템에 어렵다.

> **관련 개념: 변분 원리(variational principle)**
> 임의의 시도 파동함수 $\psi_{trial}$ 의 에너지 기대값은 항상 정확한 바닥 상태 에너지 $E_0$ 이상이다: $\langle\psi_{trial}|\hat{H}|\psi_{trial}\rangle / \langle\psi_{trial}|\psi_{trial}\rangle \geq E_0$. 따라서 시도 함수 안의 매개변수를 조절해 에너지를 최소화하면 바닥 상태에 가까워진다. HF는 단일 Slater determinant 안에서 변분으로 푸는 것이고, DFT(02 절)는 밀도에 대한 변분으로 푸는 것이다 — 두 방법 모두 변분 원리가 정당화 근거.

DFT가 HF의 비효율을 극복하는 방식: exchange를 정확히 다루는 대신, exchange와 correlation을 한꺼번에 $E_{xc}[n]$ 이라는 미지의 범함수에 집어 넣어 근사한다. 이 trade-off가 모든 함수 선택(LDA/GGA/hybrid)의 출발점이며, 03 절에서 본격적으로 다룬다.

배터리 맥락에서: 양극의 NMC, LFP, conversion 음극 등 거의 모든 실용 계산은 DFT(KS-DFT)로 수행한다. HF는 작은 분자 벤치마크나 hybrid functional의 일부 성분(예: HSE06의 25% HF exchange)으로 등장하며, 단독으로는 거의 쓰지 않는다.

## 참고 문헌

- Griffiths, D. J. *Introduction to Quantum Mechanics* (3rd ed., Cambridge, 2018) — TISE, 파동함수, 연산자 표준 입문.
- Szabo, A., Ostlund, N. S. *Modern Quantum Chemistry: Introduction to Advanced Electronic Structure Theory* (Dover, 1996) — Slater determinant와 Hartree-Fock의 정석.
- Levine, I. N. *Quantum Chemistry* (7th ed., Pearson, 2014) — Born-Oppenheimer, 변분 원리, HF SCF.
- Born, M., Oppenheimer, R. *Annalen der Physik* 389 (1927) 457–484 — 핵-전자 분리 근사 원전.
- Slater, J. C. *Physical Review* 34 (1929) 1293–1322 — 반대칭 다전자 파동함수의 행렬식 표현.
