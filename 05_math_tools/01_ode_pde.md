# 상미분/편미분 방정식 (ODEs and PDEs)

## 1. 개요

상미분 방정식(ODE, ordinary differential equation)과 편미분 방정식(PDE, partial differential equation)은 물리법칙의 표준 언어다. "어떤 양의 변화율이 그 양 자신과 외부 인자에 어떻게 의존하는가"를 식 한 줄로 적은 것이 곧 ODE/PDE이며, Newton의 운동 방정식부터 Schrödinger 방정식, Fick의 확산 법칙, Maxwell 방정식까지 거의 모든 정량 이론이 이 형식으로 표현된다.

전기화학 맥락에서 이 도구는 매우 자주 쓰인다. 배터리 활물질 입자 안의 Li 농도 분포는 확산 방정식(diffusion equation)으로, 전해질·이중층의 전위 분포는 Poisson 방정식(Poisson equation)으로, 활물질 단입자의 충방전 동역학은 1D 구형 PDE로 기술된다. 따라서 V-Q 곡선 해석부터 EIS, GITT 분석까지의 정량 작업은 결국 적절한 ODE/PDE를 풀거나 그 해의 모양을 직관적으로 읽는 능력 위에 서 있다.

본 절은 ODE/PDE의 분류와 풀이 도구 중 전기화학에 가장 자주 등장하는 것들 — 변수 분리, 특성방정식, Green 함수, 푸리에 급수, erf/erfc 해 — 을 정리한다. 풀이 알고리즘 자체보다 "왜 이 방법이 통하는가"와 "결과 식이 무엇을 말하는가"에 무게를 둔다.

## 2. 1차 ODE: 분리 변수와 적분 인자

가장 단순하고 가장 자주 등장하는 형태가 1차 ODE다. 직관적으로, 어떤 양의 시간 변화율이 그 양 자신에만 의존하면 지수 성장/감쇠가 나오고, 외부 항이 들어가면 평형으로 수렴하는 모습이 더해진다. 이 단순한 두 가지 패턴이 RC 회로의 시간 응답, 1차 화학 반응의 농도 감쇠, 자기-방전 모델 등 전기화학의 1차 모델 거의 전부를 설명한다.

**분리 변수(separation of variables)** 가 가능한 형태는 다음과 같다.

$$\frac{dy}{dx} = f(x)\, g(y)$$

각 항: $f(x)$ 는 $x$ 만의 함수, $g(y)$ 는 $y$ 만의 함수. 양변을 분리해 $\frac{dy}{g(y)} = f(x)\,dx$ 로 적은 뒤 양변을 적분하면 곧바로 해를 얻는다. 예: $dc/dt = -kc$ → $c(t) = c_0 e^{-kt}$ (1차 감쇠), $dN/dt = k(N_\text{eq} - N)$ → $N(t) = N_\text{eq} - (N_\text{eq} - N_0)e^{-kt}$ (평형으로의 지수 접근).

분리 변수가 안 되는 1차 선형 ODE는 **적분 인자(integrating factor)** 를 쓴다.

$$\frac{dy}{dx} + p(x)\, y = q(x), \qquad \mu(x) = \exp\!\left(\int p(x)\, dx\right)$$

각 항: $\mu(x)$ = 적분 인자. 양변에 $\mu(x)$ 를 곱하면 좌변이 $\frac{d}{dx}[\mu y]$ 로 묶이고, 그대로 적분하면 $y(x) = \mu^{-1}\!\left[\int \mu q\, dx + C\right]$. RC 회로의 시간 응답 $\dot V + V/RC = V_\text{src}/RC$ 가 정확히 이 형태이며, 임의의 입력 $V_\text{src}(t)$ 에 대한 응답이 한 줄로 적분 표현된다.

## 3. 2차 선형 ODE: 특성방정식과 변동 매개변수

2차 선형 ODE는 진동·감쇠·공진을 기술하는 표준 형식이며, 등가회로의 RLC 응답, 전기화학 임피던스의 Debye 응답, normal mode 해석에 직접 등장한다. 일반형은:

$$y'' + a\, y' + b\, y = f(x)$$

**동차(homogeneous)** 부분 ($f = 0$) 은 시도해 $y = e^{rx}$ 를 넣어 **특성방정식(characteristic equation)** $r^2 + ar + b = 0$ 을 얻는다. 두 근 $r_{1,2}$ 의 형태에 따라 해의 성격이 셋으로 갈린다.

| 판별식 | 근의 형태 | 동차해 | 물리적 의미 |
|---|---|---|---|
| $a^2 - 4b > 0$ | 서로 다른 실근 | $C_1 e^{r_1 x} + C_2 e^{r_2 x}$ | 과감쇠(overdamped) |
| $a^2 - 4b = 0$ | 중근 $r$ | $(C_1 + C_2 x)\, e^{rx}$ | 임계감쇠(critically damped) |
| $a^2 - 4b < 0$ | 복소근 $\alpha \pm i\omega$ | $e^{\alpha x}(C_1 \cos\omega x + C_2 \sin\omega x)$ | 진동 + 지수 감쇠 |

**비동차(inhomogeneous)** 부분 ($f \neq 0$) 은 특수해(particular solution) $y_p$ 를 더해야 하며, 두 표준 방법은 **미정 계수법(method of undetermined coefficients)** — $f$ 가 다항·지수·삼각함수일 때 같은 형태의 시도해를 넣는 방법 — 과 **변동 매개변수법(variation of parameters)** 이다. 후자는 일반형에 항상 통하며, 동차해 $y_1, y_2$ 가 알려져 있으면

$$y_p(x) = -y_1(x)\!\int\!\frac{y_2(x) f(x)}{W(x)}dx + y_2(x)\!\int\!\frac{y_1(x) f(x)}{W(x)}dx$$

각 항: $W = y_1 y_2' - y_1' y_2$ = Wronskian. 이 식은 **Green 함수(Green's function)** 의 ODE 버전으로, 임의의 source $f(x)$ 에 대한 응답을 적분으로 한 번에 표현한다. 회로 응답·시스템 식별에서 임펄스 응답 함수의 직접적 일반화다.

## 4. PDE 분류: 타원형 / 포물형 / 쌍곡형

PDE는 2계 선형의 경우 판별식 부호로 세 가지 표준형으로 분류된다. 직관적으로 타원형은 정상 상태(steady state), 포물형은 확산/이완, 쌍곡형은 파동에 해당한다. 일반형 $A u_{xx} + 2B u_{xy} + C u_{yy} + \cdots = 0$ 의 판별식 $B^2 - AC$ 의 부호로 갈린다.

| 유형 | 대표 식 | 판별식 부호 | 물리 |
|---|---|---|---|
| 타원형(elliptic) | $\nabla^2 \phi = 0$ (Laplace), $\nabla^2 \phi = -\rho/\varepsilon_0$ (Poisson) | $B^2 - AC < 0$ | 정상 상태 전위·온도 |
| 포물형(parabolic) | $\partial_t c = D\, \nabla^2 c$ (확산), $\partial_t T = \alpha\, \nabla^2 T$ (열전도) | $B^2 - AC = 0$ | 시간에 따른 평탄화 |
| 쌍곡형(hyperbolic) | $\partial_t^2 u = c^2\, \nabla^2 u$ (파동) | $B^2 - AC > 0$ | 유한 속도의 신호 전파 |

이 분류가 풀이 전략을 좌우한다. 타원형은 **경계값 문제(boundary value problem)** 로, 영역 전체의 경계 조건이 동시에 해를 결정한다. 포물형/쌍곡형은 **초기값 + 경계값 문제** 로, 시간 진행 방향이 명확해 시간 진행적(time-marching) 풀이가 가능하다. 수치 풀이에서도 타원형은 sparse linear system 한 번, 포물형은 시간 단계마다 implicit/explicit step, 쌍곡형은 CFL 조건의 안정성 제한이 핵심이라는 차이로 직접 이어진다.

배터리에서는 ① Poisson 방정식이 이중층·공간전하층의 전위 분포(타원형), ② Fick 확산이 활물질 안 Li 농도(포물형), ③ 1D Newman 모델의 전류·전압 분포가 모두 등장한다 — 모델 작성 시 어떤 유형인지 인식하면 경계 조건 설정과 풀이 도구 선택이 자명해진다.

> **관련 개념: 경계 조건의 종류**
> 같은 PDE라도 경계 조건이 다르면 전혀 다른 해를 준다. 표준 세 가지: ① **Dirichlet** — 경계에서 함숫값을 지정 ($u|_{\partial\Omega} = g$). 예: 표면 농도 일정($c|_{x=0}=c_0$). ② **Neumann** — 경계에서 도함수(=flux)를 지정 ($\partial_n u|_{\partial\Omega} = h$). 예: 무전류 경계($\partial_x c = 0$). ③ **Robin (혼합)** — 함숫값과 도함수의 선형 결합 ($\alpha u + \beta\, \partial_n u = g$). 예: 표면 반응이 $j = k(c_s - c_\text{eq})$ 인 BV 형태 경계.
> 배터리 단입자 모델(SPM)은 입자 중심 $r=0$ 에서 대칭 조건 $\partial_r c = 0$ (Neumann), 입자 표면 $r=R$ 에서 전류 밀도 = $-D\,\partial_r c$ (Neumann, 시간 의존) 의 조합으로 정의되며, 두 조건의 양립이 곧 정량 해석의 기초가 된다.

## 5. 확산 방정식: 변수 분리, 푸리에 급수, erfc 해

확산(diffusion) 방정식은 전기화학에서 가장 자주 푸는 PDE다. 1D 형태:

$$\frac{\partial c}{\partial t} = D\, \frac{\partial^2 c}{\partial x^2}$$

각 항: $c(x,t)$ = 농도, $D$ = 확산 계수 (m²/s). 풀이는 영역과 경계 조건에 따라 두 갈래로 나뉜다.

**유한 영역 — 변수 분리와 푸리에 급수.** 시도해 $c(x,t) = X(x)\, T(t)$ 를 넣으면 $T'/T = D\, X''/X = -\lambda$ 의 분리 상수 $\lambda$ 가 나오고, 시간 부분은 $T \propto e^{-\lambda t}$, 공간 부분은 경계 조건이 결정하는 고유함수(eigenfunction) 집합이 된다. 길이 $L$ 의 막대에서 양 끝 농도가 0이면 $X_n(x) = \sin(n\pi x/L)$, 고유값 $\lambda_n = D(n\pi/L)^2$ 이며, 일반해는

$$c(x,t) = \sum_{n=1}^\infty B_n \sin\!\left(\frac{n\pi x}{L}\right) e^{-D(n\pi/L)^2 t}$$

각 항: $B_n$ = 초기 조건 $c(x,0)$ 을 푸리에 급수로 전개해 얻는 계수. 시간이 지나면 고차 모드가 더 빨리 감쇠해(고유값 $\propto n^2$) 결국 가장 낮은 모드만 남는다 — 이것이 "확산은 평탄화한다"의 정량 표현이며, 셀 내부의 농도 비균질이 시간에 따라 어떻게 사라지는지를 정확히 준다.

**반무한 영역 — Boltzmann 변환과 erf 해.** 매우 두꺼운 활물질 입자나 초기 단계의 확산처럼 영역 끝이 무한히 멀게 보이는 경우, 변수 분리 대신 **자기 닮음 변수(similarity variable)** $\eta = x/(2\sqrt{Dt})$ 로 PDE를 ODE로 환원할 수 있다. 표면 농도가 $c_0$ 로 일정하고 초기에 $c=0$ 인 반무한 영역의 해는

$$c(x,t) = c_0\, \text{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right), \qquad \text{erfc}(\eta) = 1 - \frac{2}{\sqrt{\pi}}\int_0^\eta e^{-u^2}du$$

여기서 $\text{erfc}$ = 보오차함수(complementary error function). 이 한 줄에 확산의 핵심 물리가 담겨 있다. (i) 농도 프로파일은 $\sqrt{Dt}$ 라는 **확산 길이(diffusion length)** 로 스케일되며, (ii) 표면에서 $x/2\sqrt{Dt} \sim 1$ 인 깊이까지가 의미 있는 변화 영역, (iii) 이 길이가 입자 반지름과 비교될 때 SPM 가정(균일 농도)이 깨진다.

표면 flux 도 erf 해에서 직접 얻어지며, $j(t) = -D\,\partial_x c|_{x=0} = c_0 \sqrt{D/(\pi t)}$. 이 $t^{-1/2}$ 거동이 곧 Cottrell 식의 출처이며, 시간이 지날수록 농도 구배가 완만해져 flux가 줄어든다는 직관과 일치한다. GITT 펄스 해석의 $\sqrt{t}$ 영역도 같은 식의 다른 모습이다 — 일관된 물리 한 가닥에서 여러 측정 기법이 파생된다.

## 6. Poisson 방정식: 이중층과 공간전하층

전위 분포는 정전기학의 Poisson 방정식이 결정한다.

$$\nabla^2 \phi = -\frac{\rho}{\varepsilon_0 \varepsilon_r}$$

각 항: $\phi$ = 전위, $\rho$ = 자유 전하 밀도, $\varepsilon_0$ = 진공 유전율, $\varepsilon_r$ = 상대 유전율. 전하가 없으면 $\rho = 0$ → Laplace 방정식 $\nabla^2 \phi = 0$ 이 되며, 이는 정상 상태 전기 전도/전기 도금/EIS에서 전류 분포 계산의 기초식이다.

**1D 이중층(Gouy-Chapman).** 전극 표면 전위 $\phi_0$ 이 주어졌을 때, 전해질 안의 전위 감쇠는 Poisson을 Boltzmann 분포 $c_\pm = c_0 \exp(\mp z e \phi/k_B T)$ 와 결합한 **Poisson-Boltzmann 방정식** 으로 나오며, 작은 전위 극한($|ze\phi| \ll k_B T$)에서 선형화하면

$$\phi(x) = \phi_0\, e^{-x/\lambda_D}, \qquad \lambda_D = \sqrt{\frac{\varepsilon_0 \varepsilon_r k_B T}{2 c_0 z^2 e^2}}$$

각 항: $\lambda_D$ = Debye 길이(Debye length), $c_0$ = 벌크 이온 농도, $z$ = 이온 가수. 이 한 줄이 이중층의 두께와 그 농도/온도 의존성을 완결적으로 준다. 1 M 수용액에서 $\lambda_D \sim 0.3$ nm, 묽은 용액에서는 nm~수십 nm 까지 늘어나며, 이 스케일이 EIS 고주파 capacitive 응답의 시간 상수와 직접 연결된다.

**고체 안의 공간전하층(space charge layer).** 같은 Poisson 식이 SEI/CEI 계면, semiconductor-electrolyte 계면, 고체 전해질 내부에도 적용된다. 차이는 자유 전하 대신 점결함 농도가 $\rho$ 에 들어간다는 것이며, 결과 식의 형태(지수 감쇠, $\lambda_D$ 길이)는 그대로다. 이런 일관성 덕에 한 번 배운 Poisson 방정식이 매우 다양한 계면 문제에 반복 적용된다.

> **관련 개념: Green 함수와 임펄스 응답**
> 선형 PDE/ODE에서 임의의 source $f$ 에 대한 응답은, 점 source $\delta$ 함수에 대한 응답인 **Green 함수** $G(x, x')$ 으로 적분 표현된다: $u(x) = \int G(x, x') f(x') dx'$. 즉 Green 함수는 시스템의 "임펄스 응답"이며, 한 번 구해두면 임의 입력의 응답이 적분 한 줄이 된다.
> 1D 무한 영역의 확산 방정식 Green 함수는 $G(x,t; x', 0) = \frac{1}{\sqrt{4\pi D t}} \exp\!\left(-\frac{(x-x')^2}{4Dt}\right)$ 의 가우시안이며, 이 식이 곧 확산의 "근본 해"다. erfc 해도 Dirichlet 경계 조건에 맞춘 Green 함수의 적분 표현으로 도출되며, EIS의 Warburg 임피던스가 $1/\sqrt{j\omega}$ 모양인 것도 같은 Green 함수의 Laplace 변환에서 나온다.

## 7. 풀이 전략 요약

배터리 모델링에서 ODE/PDE 풀이의 실용 전략을 한 표로 정리한다.

| 상황 | 권장 도구 | 비고 |
|---|---|---|
| 단순 1차 ODE (RC, 1차 반응) | 분리 변수, 적분 인자 | 해석해 직접 |
| 2차 선형 ODE (RLC, 진동) | 특성방정식 | 진동/감쇠 형태 즉시 결정 |
| 유한 영역 확산 | 변수 분리 + 푸리에 급수 | 모드별 감쇠 시간 명확 |
| 반무한 확산 | erfc 해, $\sqrt{Dt}$ 스케일링 | Cottrell, GITT의 출처 |
| 정상 상태 전위 분포 | Laplace/Poisson + Green 함수 | 이중층, 공간전하층 |
| 임의 입력 응답 | Green 함수, Laplace 변환 | EIS·임펄스 응답 |
| 비선형/복잡 경계 | 수치 (FDM/FEM, [`./04_numerical_methods.md`](./04_numerical_methods.md)) | 해석해가 없을 때 |

방정식 자체를 푸는 능력보다, "이 문제는 어떤 유형이고 어떤 길이/시간 스케일이 지배적인가"를 빠르게 판단하는 능력이 훨씬 자주 쓸모 있다. $\sqrt{Dt}$ 와 Debye 길이 $\lambda_D$ 라는 두 길이 스케일은 거의 모든 전기화학 문제에서 1차 진단 도구로 작동한다.

## 참고 문헌

- Crank, J. *The Mathematics of Diffusion* (2nd ed., Oxford, 1975) — 확산 방정식의 표준 풀이 모음, erfc 해와 경계 조건 처리.
- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — 분리 변수, 푸리에 급수, Green 함수의 표준 학부 처리.
- Riley, K. F., Hobson, M. P., Bence, S. J. *Mathematical Methods for Physics and Engineering* (3rd ed., Cambridge, 2006) — PDE 분류와 풀이 도구의 포괄적 정리.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — 배터리 PDE 모델(확산-반응, 농축 전해질) 표준 처리.
- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Cottrell, Warburg, GITT의 PDE 기초 유도.
