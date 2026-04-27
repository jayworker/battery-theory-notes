# 선형대수 (Linear Algebra)

## 1. 개요

선형대수(linear algebra)는 행렬과 벡터의 언어로 다차원 선형 관계를 다루는 도구이며, 양자화학·고체물리·진동 분석·통계 학습이 모두 한 가지 공통 연산 — **행렬 대각화(matrix diagonalization)** — 으로 환원되는 이유가 여기에 있다. Hückel 분자 궤도, 결정의 phonon 분산, normal mode 분석, 주성분 분석(PCA), 회로 망 해석은 표면적으론 전혀 다른 문제처럼 보이지만, 수학적으로는 모두 "어떤 행렬의 고유값과 고유벡터를 찾으라"는 한 문장으로 요약된다.

직관적으로, 행렬 $A$ 가 주는 변환은 일반적으로는 회전과 늘림이 섞인 복잡한 사상이지만, 그 행렬의 **고유벡터(eigenvector)** 방향에서는 단순히 스칼라 배 — **고유값(eigenvalue)** 만큼 — 의 늘림으로 환원된다. 이 "단순한 축"을 찾으면 임의의 선형 동역학이 독립된 1차원 문제 여러 개로 분해되어, 풀이가 자명해진다. 양자역학에서 측정 가능한 물리량이 Hermitian 연산자의 고유값으로 나오는 것, 진동 분자에서 normal mode 가 독립적으로 진동하는 것이 모두 이 일반 원리의 표현이다.

본 절은 ① 행렬 대수와 특수 행렬, ② 고유값 문제와 특성다항식, ③ 대각화와 닮음 변환, ④ 분자 궤도(Hückel)와 ⑤ 진동 normal mode 응용을 다룬다. 수치적 측면(condition number, SVD, LU 분해)은 [`./04_numerical_methods.md`](./04_numerical_methods.md)에서 보강된다.

## 2. 행렬 대수와 특수 행렬

행렬은 선형 사상(linear map) $\mathbb{R}^n \to \mathbb{R}^m$ 의 좌표 표현이며, 곱 $AB$ 는 두 사상의 합성에 해당한다. 비가환성($AB \neq BA$ 일반적으로)은 두 변환의 순서가 결과를 바꾼다는 사실의 자연스러운 표현이다. 핵심 연산자: 전치(transpose) $A^T$, 켤레 전치(conjugate transpose) $A^\dagger = (A^*)^T$, 역행렬 $A^{-1}$, 트레이스 $\text{tr}(A) = \sum_i A_{ii}$, 행렬식 $\det A$.

물리에서 반복 등장하는 특수 행렬 네 가지:

| 종류 | 정의 | 핵심 성질 | 등장처 |
|---|---|---|---|
| 대칭(symmetric) | $A^T = A$ (실수) | 실수 고유값, 직교 고유벡터 | 진동 행렬 $K$, $M$ |
| Hermitian | $A^\dagger = A$ (복소) | 실수 고유값, 직교 고유벡터 | 양자역학 관측가능량, Kohn-Sham $H$ |
| 직교(orthogonal) | $Q^T Q = I$ | 회전·반사, 길이 보존 | 좌표 변환, PCA의 기저 |
| Unitary | $U^\dagger U = I$ | 양자상태 전이, 확률 보존 | 시간 진화 연산자 $e^{-iHt/\hbar}$ |

이 네 종류가 중요한 이유는 모두 **스펙트럼 정리(spectral theorem)** 가 보장하는 좋은 성질을 갖기 때문이다 — 즉 unitary(또는 직교) 변환으로 완전한 대각화가 가능하며, 고유값이 실수이거나 단위원 위의 복소수여서 물리적으로 해석 가능한 양으로 곧장 연결된다. Hermitian 연산자의 고유값이 실수라는 사실이 양자역학에서 측정값이 실수인 이유의 정확한 수학적 원천이다.

## 3. 고유값과 고유벡터

가장 중심적인 정의는 한 줄이다.

$$A v = \lambda v$$

각 항: $A$ = $n\times n$ 행렬, $v$ = 0이 아닌 벡터(고유벡터), $\lambda$ = 스칼라(고유값). 즉 $A$ 가 $v$ 를 그 자신의 스칼라 배로 보내는 특별한 방향이 고유벡터이며, 그 배율이 고유값이다. 실용적으로 이 식을 푸는 방법은:

$$\det(A - \lambda I) = 0$$

이것이 **특성다항식(characteristic polynomial)**, $n$ 차 다항식이며 그 근이 곧 고유값이다. 각 고유값 $\lambda_i$ 에 대해 $(A - \lambda_i I)v = 0$ 를 풀어 고유벡터를 얻는다. 트레이스와 행렬식이 자연스럽게 등장하는데, $\text{tr}(A) = \sum_i \lambda_i$ 와 $\det A = \prod_i \lambda_i$ 가 정확히 성립한다 — 이 두 항등식은 고유값을 직접 계산하지 않고도 행렬의 정성을 빠르게 점검할 때 매우 유용하다.

**일반화 고유값 문제(generalized eigenvalue problem)** 는 두 행렬이 등장하는 형태:

$$A v = \lambda B v$$

$B$ 가 양의 정부호(positive definite) 대칭이면 $B^{1/2}$ 변환을 통해 표준 형태로 환원되며, 고유값과 고유벡터의 의미는 그대로다. 이 형태는 진동 normal mode (질량 행렬 $M$ 이 비단위) 와 분자 궤도 secular 문제(non-orthogonal basis의 overlap 행렬 $S$) 양쪽에서 그대로 등장한다. 즉 일반화 고유값 문제는 단지 수학적 일반화가 아니라, 비균질 질량/비직교 기저라는 물리 상황의 직접적 반영이다.

## 4. 대각화와 닮음 변환

정사각 행렬 $A$ 가 $n$ 개의 선형 독립인 고유벡터를 가지면 **대각화(diagonalizable)** 가능하다.

$$A = P D P^{-1}, \qquad D = \text{diag}(\lambda_1, \ldots, \lambda_n)$$

각 항: $P$ = 고유벡터를 열로 묶은 행렬, $D$ = 고유값을 대각에 둔 대각 행렬. $P^{-1} A P = D$ 라는 좌표 변환의 의미가 핵심으로, 새 좌표에서는 $A$ 의 작용이 각 축 방향의 단순 곱셈이 되어 모든 연산이 자명해진다. 행렬 거듭제곱 $A^k = P D^k P^{-1}$, 행렬 지수함수 $e^{At} = P e^{Dt} P^{-1}$ 가 한 줄에 풀리며, 이는 선형 연립 ODE $\dot x = A x$ 의 해 $x(t) = e^{At} x_0$ 가 곧바로 닫힌 형태로 표현된다는 강한 결과로 이어진다.

특별한 경우 두 가지가 실용에서 거의 항상 등장한다.

**(i) 대칭/Hermitian 행렬의 직교 대각화.** $A$ 가 대칭(또는 Hermitian)이면 고유벡터를 직교(orthonormal) 기저로 잡을 수 있고, $P$ 를 직교(unitary) 행렬 $Q$ 로 두면 $P^{-1} = Q^T$ ($U^\dagger$). 그러면

$$A = Q\, \Lambda\, Q^T$$

이 분해는 수치적으로 안정하고($\kappa(Q) = 1$), 양자역학·통계학·신호처리에서 가장 빈번하다.

**(ii) 정규 행렬과 스펙트럼 정리.** $AA^\dagger = A^\dagger A$ 인 행렬을 정규(normal) 행렬이라 하며, 정규 행렬은 unitary 대각화 가능. 대칭/Hermitian/unitary 모두 이 클래스에 속하며, 스펙트럼 정리는 "정규 행렬 = unitary 대각화 가능"을 정확히 동치로 만든다.

> **관련 개념: 특이값 분해 (SVD)**
> 정사각이 아니거나 비대칭 행렬에는 대각화 대신 **특이값 분해(singular value decomposition)** 가 일반적 도구다: $A = U\Sigma V^T$, $U, V$ 는 직교, $\Sigma$ 는 비음수 대각(특이값 $\sigma_i$). $\sigma_i = \sqrt{\lambda_i(A^TA)}$ 로 고유값과 직접 연결되며, 데이터 행렬 압축(low-rank approximation), 노이즈 제거, 회귀의 의사역행렬, 주성분 분석(PCA, 데이터 공분산 행렬의 고유값 분해) 모두 SVD의 한 측면이다.
> 조건수(condition number) $\kappa(A) = \sigma_\text{max}/\sigma_\text{min}$ 은 선형 시스템의 수치 안정성을 정량화하는 단일 지표로, EIS 등가회로 fitting의 파라미터 식별 가능성, DFT 자기일관성 행렬의 풀이 난이도 평가 등에 직접 쓰인다.

## 5. 응용 ① Hückel 분자 궤도

분자 궤도 이론은 본질적으로 행렬 고유값 문제다. 일전자 Schrödinger 방정식 $H\psi = E\psi$ 에서 시도해를 원자 궤도의 선형 결합 $\psi = \sum_i c_i \phi_i$ (LCAO) 로 두면, 변분 원리로 다음 secular 방정식이 나온다.

$$H\, \mathbf{c} = E\, S\, \mathbf{c}$$

각 항: $H_{ij} = \langle \phi_i | \hat H | \phi_j \rangle$ = 해밀토니안 행렬 원소, $S_{ij} = \langle \phi_i | \phi_j \rangle$ = overlap 행렬 원소, $\mathbf{c}$ = 계수 벡터, $E$ = 궤도 에너지. 이 식은 정확히 일반화 고유값 문제 형식이며, 풀이는 4절의 도구가 그대로다.

**Hückel 모델** 은 $\pi$ 전자 시스템에서 두 가지 강한 단순화를 도입한다. (i) 자기 항 $H_{ii} = \alpha$ (모든 탄소 원자에 같은 Coulomb integral), 인접 항 $H_{ij} = \beta$ (인접 결합에만, resonance integral), 비인접 항 0. (ii) overlap 무시 $S = I$. 그러면 일반화 문제가 표준 고유값 문제로 환원되며, 행렬은 인접성 행렬(adjacency matrix)에 $\alpha I + \beta A$ 형태로 정확히 대응된다. 분자 그래프 → 행렬 → 고유값이라는 단 세 단계가 분자 궤도 에너지를 준다.

대표 결과로 부타디엔(C₄H₆) 의 secular 행렬은 4×4 tridiagonal:

$$\det\begin{pmatrix} \alpha-E & \beta & 0 & 0 \\ \beta & \alpha-E & \beta & 0 \\ 0 & \beta & \alpha-E & \beta \\ 0 & 0 & \beta & \alpha-E \end{pmatrix} = 0$$

해는 $E = \alpha + 2\beta\cos[k\pi/(n+1)]$, $k = 1, 2, 3, 4$ 로 정확히 풀리며, HOMO-LUMO gap 과 결합 안정화 에너지가 즉시 나온다. 이 단순한 결과가 공액 분자의 색·반응성에 대한 1차 정성 직관을 그대로 준다. 더 일반적으로 임의의 $\pi$-결합 분자 그래프에 대해 같은 절차가 통하며, 그래프 이론과 양자화학이 행렬 고유값을 통해 만나는 자리이기도 하다.

## 6. 응용 ② 진동 normal mode

다입자 시스템의 작은 진동은 정확히 같은 수학으로 환원된다. 평형 위치 주변에서 포텐셜을 2차로 전개하고 작은 변위 $x$ 의 운동 방정식을 적으면

$$M\, \ddot x = -K\, x$$

각 항: $M$ = 질량 행렬(보통 대각, $M_{ii}$ = $i$-번째 좌표의 질량), $K$ = 스프링 상수(Hessian) 행렬, 대칭 양의 준정부호. 시도해 $x = v\, e^{i\omega t}$ 를 넣으면

$$K\, v = \omega^2\, M\, v$$

정확히 일반화 고유값 문제가 된다. 고유값 $\lambda_i = \omega_i^2$ 가 normal mode의 각진동수 제곱, 고유벡터 $v_i$ 가 그 모드의 변위 패턴. 결과적으로 임의의 작은 변위 운동은 독립적인 normal mode 들의 선형 결합으로 분해되며, 각 모드는 단순 조화 진동자처럼 독립적으로 진동한다.

이 일반론이 ① 분자 진동 — 적외선/Raman 스펙트럼의 피크 위치, ② 결정의 phonon — 동력학 행렬(dynamical matrix) $D(\mathbf{k})$ 의 대각화로 phonon 분산 곡선 $\omega_n(\mathbf{k})$ 가 나오는 표준 절차, ③ 단백질의 normal mode 분석, ④ 회로의 LC 공명까지 모두 같은 수학에서 자라난다. 한 번 배운 행렬 대각화가 여러 영역에서 반복적으로 쓰인다는 점이, 선형대수가 물리과학 전반에 가장 자주 쓰이는 수학 도구가 되는 이유다.

> **관련 개념: 행렬 지수함수와 선형 ODE**
> 선형 1계 연립 ODE $\dot x = A x$ 의 해는 $x(t) = e^{At} x_0$ 이며, 이 행렬 지수함수는 $A = PDP^{-1}$ 대각화로부터 $e^{At} = P e^{Dt} P^{-1}$ 로 즉시 계산된다. 즉 모든 선형 동역학은 한 번의 대각화로 풀이가 끝난다.
> 응용: ① 화학 반응 네트워크의 농도 시간 진화, ② 멀티-state SOC 모델의 시간 응답, ③ 양자역학 시간 진화 $|\psi(t)\rangle = e^{-iHt/\hbar}|\psi(0)\rangle$, ④ Markov chain의 정상 상태 분포(고유값 1의 고유벡터)가 모두 같은 한 줄로 풀린다.

## 7. 실용 정리

배터리·재료 영역에서 자주 마주치는 행렬 작업의 흐름을 정리하면:

| 문제 | 행렬 형태 | 핵심 작업 |
|---|---|---|
| 분자 궤도 에너지 | Hermitian $H$, overlap $S$ | $H\mathbf{c} = E\, S\mathbf{c}$ 일반화 고유값 |
| Phonon 분산 | 동력학 행렬 $D(\mathbf{k})$ | 각 $\mathbf{k}$ 에서 대각화 |
| 진동 IR/Raman | Hessian + 질량 | $K v = \omega^2 M v$ |
| EIS fitting | Jacobian, Hessian | LM 알고리즘, 조건수 점검 |
| PCA / 데이터 압축 | 데이터 공분산 | SVD, 주성분 |
| 회로 망 해석 | 노드 admittance | $Y v = i$ 연립 풀이 |

핵심 원리 한 줄: **"좋은 좌표를 찾으면 모든 것이 단순해진다."** 선형대수는 그 좋은 좌표 — 고유벡터 기저 — 를 체계적으로 찾는 도구이며, 이 발견이 곧 물리 계의 자연스러운 모드/상태/주성분과 일치한다는 것이 계속 반복되는 사실이다.

## 참고 문헌

- Strang, G. *Introduction to Linear Algebra* (5th ed., Wellesley-Cambridge, 2016) — 직관 우선의 표준 학부 교재.
- Horn, R. A., Johnson, C. R. *Matrix Analysis* (2nd ed., Cambridge, 2013) — 정규 행렬, 스펙트럼 정리, 행렬 함수 표준 처리.
- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — 물리 응용 중심의 행렬 도구 정리.
- Atkins, P., Friedman, R. *Molecular Quantum Mechanics* (5th ed., Oxford, 2011) — Hückel 모델과 LCAO secular 방정식 표준 처리.
- Ashcroft, N. W., Mermin, N. D. *Solid State Physics* (Saunders, 1976) — Phonon 분산과 동력학 행렬.
- Trefethen, L. N., Bau, D. *Numerical Linear Algebra* (SIAM, 1997) — 수치 측면의 SVD, 조건수, QR/Householder.
