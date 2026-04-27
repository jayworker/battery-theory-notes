# 수치 해석 (Numerical Methods)

## 1. 개요

해석해(closed-form solution)가 존재하는 미분 방정식이나 비선형 식은 사실 매우 드문 예외에 가깝다. 배터리 모델링에서 만나는 거의 모든 식 — 비선형 Butler-Volmer 와 결합된 농축 전해질 PDE, 다층 전극의 결합 확산-반응, 등가회로의 비선형 fitting, 다중 스케일 노화 모델 — 은 해석해가 없거나 너무 복잡해서 실용 가치가 없다. 그래서 수치 해석(numerical methods) 은 "이론의 보조"가 아니라 **이론을 실제로 작동시키는 핵심 인프라** 이며, 수치 풀이의 정확도/안정성 점검 능력이 곧 정량 모델링 능력의 한계가 된다.

본 절은 자주 쓰이는 다섯 가지 도구를 다룬다. ① 유한차분법(FDM) — PDE 의 가장 단순하고 직관적인 이산화, ② 유한요소법(FEM) — 복잡한 기하/경계에서 더 강력한 framework, ③ Newton-Raphson — 비선형 방정식의 표준 풀이, ④ 비선형 fitting (Levenberg-Marquardt) — 실험 데이터에 모델 맞추기, ⑤ 수치 안정성 일반 — stiffness, ill-conditioning, 정규화. 각 도구의 알고리즘 그 자체보다 "왜 그 방법이 작동하는가" 와 "언제 깨지는가" 에 무게를 둔다.

수치 풀이를 정성적으로 다루는 가장 중요한 단일 원리: **모든 수치 결과는 진짜 답에 대한 근사** 이며, 그 오차의 크기와 안정성을 미리 예측할 수 있어야 결과를 신뢰할 수 있다.

## 2. 유한 차분법 (FDM)

가장 직관적인 PDE 이산화 도구. 함수 $u(x)$ 를 격자점 $x_i = i\,h$ 에서의 값 $u_i = u(x_i)$ 로 대표하고, 미분을 차분으로 근사한다. Taylor 전개에서 자연스럽게 도출된다.

$$\frac{du}{dx}\bigg|_i \approx \frac{u_{i+1} - u_{i-1}}{2h} \quad (\text{중심 차분, } O(h^2))$$

$$\frac{d^2 u}{dx^2}\bigg|_i \approx \frac{u_{i+1} - 2u_i + u_{i-1}}{h^2} \quad (O(h^2))$$

오차 차수의 의미가 중요하다. $O(h^2)$ 는 격자 간격을 절반으로 줄이면 오차가 1/4 이 된다는 정확한 정량 보장이며, 이 사실을 이용해 격자 수렴성(grid convergence)을 점검한다 — 같은 문제를 두 다른 격자로 풀어 결과가 예측대로 수렴하면 신뢰, 그렇지 않으면 풀이가 깨진 것.

**시간 적분과 안정성.** 1D 확산 방정식 $\partial_t c = D\,\partial_{xx} c$ 의 가장 단순한 이산화는 명시적 Euler:

$$c_i^{n+1} = c_i^n + \frac{D\,\Delta t}{h^2}(c_{i+1}^n - 2c_i^n + c_{i-1}^n)$$

이 방법의 안정성은 von Neumann 분석으로 결정되며, 조건은 $D\,\Delta t / h^2 \le 1/2$. 즉 격자 간격을 줄이면 시간 단계를 그 제곱으로 줄여야 하며 — 격자 1/2 → $\Delta t$ 1/4 — 매우 빨리 비효율적이 된다. 그래서 실용에선 **암시적(implicit) 방법** 이 표준이다.

| 방법 | 식 (확산) | 정확도 | 안정성 |
|---|---|---|---|
| 명시적 Euler | $c^{n+1} = c^n + \Delta t\, L c^n$ | $O(\Delta t)$ | 조건부 ($D\Delta t/h^2 \le 1/2$) |
| 암시적 Euler | $c^{n+1} = c^n + \Delta t\, L c^{n+1}$ | $O(\Delta t)$ | 무조건 안정 |
| Crank-Nicolson | $c^{n+1} - c^n = \tfrac{\Delta t}{2}L(c^n + c^{n+1})$ | $O(\Delta t^2)$ | 무조건 안정 |
| BDF2 (2차 후방) | $\tfrac{3c^{n+1} - 4c^n + c^{n-1}}{2\Delta t} = L c^{n+1}$ | $O(\Delta t^2)$ | 무조건 안정, A-안정 |

여기서 $L$ 은 공간 미분 연산자의 이산화. 암시적 방법은 매 시간 단계마다 선형 시스템을 풀어야 하지만, 큰 $\Delta t$ 가 가능해 결국 훨씬 효율적이다. Crank-Nicolson 이 정확도와 안정성의 균형으로 가장 자주 쓰이며, BDF 계열은 stiff 문제에서 특히 강하다.

## 3. 유한 요소법 (FEM) 개요

FDM 이 직관적이라면 FEM 은 복잡한 기하·국소 격자 세분화·강한 경계 처리에서 훨씬 강력하다. 핵심 아이디어는 PDE 를 그대로 이산화하지 않고, 먼저 **약형식(weak form)** 으로 변환한 뒤 시험 함수(test function) 와의 적분으로 평균화하는 것.

예: Poisson 방정식 $-\nabla^2 \phi = f$ 에 시험 함수 $v$ 를 곱하고 적분, 부분 적분으로 미분 부담을 한 차수 낮추면

$$\int_\Omega \nabla \phi \cdot \nabla v\, d\Omega = \int_\Omega f v\, d\Omega + \text{(경계항)}$$

이 약형식이 $\phi$ 와 $v$ 모두에 대해 임의의 시험 함수에 대해 성립한다는 조건이 원 PDE 와 동치이며, 미분 차수가 한 단계 낮아 더 매끄럽지 않은 해도 다룰 수 있다는 장점이 있다.

이제 시험·시도 함수를 유한차원 부분 공간 — 보통 piecewise polynomial **basis function** $\phi_i$ — 으로 한정하면, 미지 함수가 $\phi(x) = \sum_i c_i \phi_i(x)$ 로 표현되고 약형식은 $c_i$ 에 대한 **선형 시스템**

$$K\, \mathbf{c} = \mathbf{f}, \qquad K_{ij} = \int_\Omega \nabla \phi_i \cdot \nabla \phi_j\, d\Omega$$

각 항: $K$ = stiffness matrix(요소별 적분의 합으로 조립, sparse), $\mathbf{f}$ = load vector. 행렬 조립(assembly)과 sparse 풀이의 표준 알고리즘이 갖춰져 있어, 복잡한 2D/3D 영역의 PDE 도 격자 생성 + 약형식 + 풀이의 표준 절차로 풀린다. COMSOL·FEniCS·deal.II 같은 도구들이 모두 이 framework 를 구현한 것.

배터리 응용: ① P2D Newman 모델의 다층 전극 + 분리막 + 전해질 결합 PDE, ② 3D 전극 미세구조의 effective transport 시뮬레이션, ③ stress-diffusion coupling, ④ 다공성 전극의 국소 전류 분포 — 모두 FEM 으로 표준 처리된다.

## 4. Newton-Raphson 법

비선형 방정식 $f(x) = 0$ 의 풀이에서 가장 자주 쓰이는 방법. 현재 추정값 $x_n$ 에서 $f$ 를 1차 Taylor 전개

$$0 = f(x_{n+1}) \approx f(x_n) + f'(x_n)(x_{n+1} - x_n)$$

으로 두고 풀면 갱신 공식이 한 줄로 나온다.

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

기하학적 해석: 곡선 $y = f(x)$ 의 $x_n$ 에서의 접선이 $x$ 축과 만나는 점이 $x_{n+1}$. 직관적으로 깔끔하며, 수렴이 빠를 때 매우 빠르다 — **2차 수렴(quadratic convergence)**, 즉 한 단계마다 정확한 자릿수가 대략 두 배로 늘어난다. $|x_{n+1} - x^*| \le C\,|x_n - x^*|^2$ 이라는 정확한 부등식이 성립.

다만 두 가지 단점이 항상 따라온다. (i) **초기값 의존성** — 멀리서 시작하면 발산하거나 다른 근으로 튀어가며, 진단이 까다롭다. (ii) $f'(x_n) \approx 0$ 부근에서 갱신량이 폭발적으로 커져 불안정. 실용에선 **line search** 나 **trust region** 같은 안정화 장치를 결합한다 — 갱신 방향은 Newton 으로 잡되 step 크기를 안전하게 제한하는 것.

**다차원 일반화.** $\mathbf{f}(\mathbf{x}) = 0$ ($\mathbf{f} : \mathbb{R}^n \to \mathbb{R}^n$) 의 경우 도함수 자리에 **Jacobian** $J_{ij} = \partial f_i/\partial x_j$ 가 들어간다.

$$\mathbf{x}_{n+1} = \mathbf{x}_n - J(\mathbf{x}_n)^{-1}\, \mathbf{f}(\mathbf{x}_n)$$

매 단계마다 선형 시스템 한 번 풀이. 비선형 PDE (예: drift-diffusion + Poisson, 농축 전해질 + Butler-Volmer) 의 자기일관(self-consistent) 풀이가 정확히 이 형태이며, FEM 의 sparse 선형 솔버와 결합돼 표준 작업이 된다.

> **관련 개념: 비선형 최소제곱과 Levenberg-Marquardt (LM)**
> 측정 데이터 $\{x_k, y_k\}$ 와 비선형 모델 $y = m(x; \boldsymbol{\theta})$ 에 대해 잔차 $r_k(\boldsymbol{\theta}) = y_k - m(x_k; \boldsymbol{\theta})$ 의 제곱합 $S(\boldsymbol{\theta}) = \sum_k r_k^2$ 를 최소화하는 $\boldsymbol{\theta}$ 찾기. **Gauss-Newton** 은 Newton 의 변형으로 $\boldsymbol{\theta}_{n+1} = \boldsymbol{\theta}_n + (J^T J)^{-1} J^T \mathbf{r}$ ($J_{ki} = \partial r_k/\partial \theta_i$). 빠르지만 멀리서 불안정.
> **Levenberg-Marquardt** 는 정규화 항을 추가: $(J^T J + \lambda I)\,\Delta\boldsymbol{\theta} = J^T \mathbf{r}$. $\lambda$ 큼 → 작은 step (gradient descent 같음, 안전), $\lambda$ 작음 → Gauss-Newton (빠른 2차 수렴). $\lambda$ 를 적응적으로 조절해 두 모드의 장점을 결합.
> EIS 등가회로 fitting 의 사실상 표준이며, 각 회로 파라미터의 불확실성도 $J^T J$ (Hessian 근사) 의 역행렬에서 직접 추정된다 — [`./05_data_analysis.md`](./05_data_analysis.md) 의 오차 전파와 직접 연결.

## 5. 비선형 fitting의 실용적 측면

EIS, GITT, ICA fitting 등 실험 데이터에 모델을 맞추는 작업에서 자주 만나는 문제들:

**(i) 초기값 선택.** LM 은 지역 최소(local minimum)에 빠질 수 있다. 특히 EIS 등가회로처럼 파라미터 수가 많고($R_s, R_{ct}, C_{dl}, \sigma_W$ 등) 일부가 거의 자유로운 경우, 초기값에 따라 결과가 크게 달라진다. 전략: ① 물리적 대략 추정값(예: 고주파 절편 $\approx R_s$, 반원 지름 $\approx R_{ct}$) 으로 시작, ② 서브셋부터 fitting 후 점차 추가, ③ 전역 탐색(global search, basin hopping) 후 LM 으로 미세조정.

**(ii) 파라미터 식별가능성(identifiability).** 두 파라미터가 데이터에서 거의 같은 효과를 가지면 fitting 이 그 합/차만 결정하고 개별 값을 못 정한다. Hessian $J^T J$ 의 조건수(condition number, [`./02_linear_algebra.md`](./02_linear_algebra.md))가 매우 크면 이 상태이며, 정규화나 모델 단순화가 필요. 결과의 표준 오차가 추정값보다 크면 그 파라미터는 의미 없다.

**(iii) 가중치(weighting).** 측정 오차가 데이터 점마다 다르면 (예: EIS 의 저주파에서 잡음 큰 경우) 가중 잔차 $r_k = (y_k - m_k)/\sigma_k$ 를 써야 한다. 동일 가중을 쓰면 큰 오차 영역이 fitting 을 지배하게 됨.

**(iv) 모델 적합도(goodness of fit).** $\chi^2 = \sum r_k^2/\sigma_k^2$ 가 자유도(데이터 수 − 파라미터 수) 와 비슷하면 적합, 훨씬 크면 모델 부족, 훨씬 작으면 over-fitting 의심. KK 점검을 동시 수행해 데이터 자체의 일관성도 점검 — 자세히는 [`./05_data_analysis.md`](./05_data_analysis.md).

## 6. 수치 안정성 일반

수치 풀이에서 일관되게 등장하는 세 가지 위협.

**(i) Stiffness.** ODE/PDE 시스템에 시간 상수가 매우 다른 항들이 섞여 있을 때 (예: 빠른 SEI 형성 vs 느린 활물질 부피 변화), 명시적 방법은 가장 빠른 시간 상수에 맞춰 $\Delta t$ 를 잡아야 해 비효율. **A-stable** 또는 **L-stable** 암시적 방법(BDF, Radau, Crank-Nicolson 일부)이 답이다. 배터리 P2D 모델의 Newton 자기일관 풀이가 이 클래스의 표준 사례.

**(ii) Ill-conditioning.** 선형 시스템 $A\mathbf{x} = \mathbf{b}$ 의 조건수 $\kappa(A) = \sigma_\text{max}/\sigma_\text{min}$ 이 매우 크면, 입력 $\mathbf{b}$ 의 작은 오차가 출력 $\mathbf{x}$ 의 큰 오차로 증폭된다. 정량적으로 $\|\delta \mathbf{x}\|/\|\mathbf{x}\| \le \kappa(A)\,\|\delta \mathbf{b}\|/\|\mathbf{b}\|$. SVD 점검(02 절 참조), 정규화(아래), 또는 더 좋은 형식화(re-formulation)가 필요.

**(iii) 정규화(regularization).** 풀이가 데이터에 너무 민감하거나 비유일적인 역문제(inverse problem) 에 표준적 처방. **Tikhonov 정규화**: 원래 손실 함수에 $\lambda \|\mathbf{x}\|^2$ 항 추가, 작은 norm 의 해 선호. EIS 의 distribution of relaxation times (DRT) 분석, 비균질 농도 분포의 역추정, 등 ill-posed 문제에 거의 항상 등장. $\lambda$ 의 선택은 L-curve 또는 cross-validation 으로 결정.

> **관련 개념: 수치 미분과 GITT의 $dE/d\sqrt{t}$ 추출**
> GITT 펄스의 단기 응답에서 확산 계수 추출은 $D = \frac{4}{\pi\tau}\!\left(\frac{n_M V_M}{S}\right)^{\!2}\!\left(\frac{\Delta E_s}{\Delta E_\tau}\right)^{\!2}$ 같은 식이 표준이지만, 더 정확히는 $E$ 대 $\sqrt{t}$ 의 직선 기울기 $dE/d\sqrt{t}$ 가 핵심. 그런데 측정 잡음이 있는 곡선의 미분은 잡음을 증폭한다.
> 실용 처방: ① **Savitzky-Golay** — 국소 다항식 fitting 후 그 미분, 잡음 평활화 + 미분 동시. ② **smoothing spline** — 적당한 정규화로 매끄러운 함수 fitting 후 해석 미분. ③ raw 차분 후 큰 window 의 이동 평균. 어느 경우든 window 크기/정규화 강도가 분해능 vs 잡음 trade-off 를 결정하며, 동일 데이터에 두세 가지 기법을 적용해 결과의 강건성을 점검하는 것이 표준.

## 7. 실용 정리

| 문제 | 표준 도구 | 핵심 주의점 |
|---|---|---|
| 1D 확산-반응 PDE | FDM + Crank-Nicolson | 격자 수렴, $D\Delta t/h^2$ 점검 |
| 복잡 기하 PDE | FEM + 약형식 | 격자 품질, 경계 조건 |
| 비선형 자기일관 풀이 | Newton-Raphson | 초기값, line search |
| EIS/GITT fitting | Levenberg-Marquardt | 초기값, 가중치, 식별성 |
| Stiff 시스템 | 암시적 BDF/Radau | 행렬 풀이 비용 |
| Ill-posed 역문제 | Tikhonov 정규화 | $\lambda$ 선택 |

핵심 원칙 두 줄: **(i) 모든 수치 결과는 검증해야 한다.** 격자 수렴, 시간 단계 수렴, 분석해(있는 경우) 또는 더 정밀한 방법과의 비교가 필수. **(ii) 안정성 분석을 먼저, 정확도는 그 다음.** 발산하는 풀이는 아무리 정밀해도 무가치하며, 안정성 조건의 사전 점검이 항상 첫 단계다.

## 참고 문헌

- Press, W. H. et al. *Numerical Recipes: The Art of Scientific Computing* (3rd ed., Cambridge, 2007) — 수치 알고리즘 표준 참고서, FDM/LM/Newton 모두 다룸.
- LeVeque, R. J. *Finite Difference Methods for Ordinary and Partial Differential Equations* (SIAM, 2007) — FDM 안정성/수렴성 표준 처리.
- Hughes, T. J. R. *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis* (Dover, 2000) — FEM 표준 학부/대학원 교재.
- Nocedal, J., Wright, S. J. *Numerical Optimization* (2nd ed., Springer, 2006) — Newton, LM, trust region 의 포괄적 수학 처리.
- Hairer, E., Wanner, G. *Solving Ordinary Differential Equations II: Stiff and DAE Problems* (2nd ed., Springer, 1996) — Stiff ODE 와 BDF/Radau 표준.
- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — GITT/EIS 수치 분석의 전기화학 표준.
