# Ordinary / partial differential equations (ODEs and PDEs)

## 1. Overview

Ordinary differential equations (ODEs) and partial differential equations (PDEs) are the standard language of physical laws. An ODE/PDE is the one-line statement of "how does the rate of change of a quantity depend on that quantity itself and on external factors," and almost all quantitative theories — from Newton's equations of motion to the Schrödinger equation, Fick's laws of diffusion, and Maxwell's equations — are expressed in this form.

In an electrochemical context this tool is used very often. The Li concentration profile inside an active-material particle is described by the diffusion equation, the potential profile in the electrolyte and double layer by the Poisson equation, and the charge/discharge dynamics of a single active-material particle by a 1D spherical PDE. Quantitative work, from V–Q curve interpretation to EIS and GITT analysis, therefore rests on the ability to solve the appropriate ODE/PDE or to read the qualitative shape of its solution intuitively.

This section organizes those ODE/PDE solution tools that appear most often in electrochemistry — separation of variables, the characteristic equation, Green's functions, Fourier series, and the erf/erfc solution. Emphasis is placed not on the algorithms themselves but on "why this method works" and "what the resulting expression tells us."

## 2. First-order ODEs: separation of variables and integrating factor

The simplest and most frequent form is a first-order ODE. Intuitively, if the rate of change of a quantity depends only on the quantity itself one obtains exponential growth/decay, and if an external term enters one adds a relaxation toward equilibrium. These two simple patterns explain almost all first-order electrochemical models — the time response of an RC circuit, the concentration decay of a first-order chemical reaction, self-discharge models, and so on.

The form that admits **separation of variables** is

$$\frac{dy}{dx} = f(x)\, g(y)$$

Each term: $f(x)$ is a function of $x$ only, $g(y)$ is a function of $y$ only. After separating both sides as $\frac{dy}{g(y)} = f(x)\,dx$ and integrating, one obtains the solution immediately. Examples: $dc/dt = -kc$ → $c(t) = c_0 e^{-kt}$ (first-order decay); $dN/dt = k(N_\text{eq} - N)$ → $N(t) = N_\text{eq} - (N_\text{eq} - N_0)e^{-kt}$ (exponential approach to equilibrium).

For first-order linear ODEs that do not separate, one uses an **integrating factor**.

$$\frac{dy}{dx} + p(x)\, y = q(x), \qquad \mu(x) = \exp\!\left(\int p(x)\, dx\right)$$

Each term: $\mu(x)$ = integrating factor. Multiplying both sides by $\mu(x)$ collapses the left-hand side into $\frac{d}{dx}[\mu y]$, and direct integration gives $y(x) = \mu^{-1}\!\left[\int \mu q\, dx + C\right]$. The time response of an RC circuit, $\dot V + V/RC = V_\text{src}/RC$, is exactly of this form, and the response to an arbitrary input $V_\text{src}(t)$ is given as a one-line integral.

## 3. Second-order linear ODEs: characteristic equation and variation of parameters

Second-order linear ODEs are the standard form describing oscillation, damping, and resonance, and they appear directly in the RLC response of equivalent circuits, the Debye response of electrochemical impedance, and normal-mode analysis. The general form is

$$y'' + a\, y' + b\, y = f(x)$$

The **homogeneous** part ($f = 0$) is solved by trying $y = e^{rx}$, which yields the **characteristic equation** $r^2 + ar + b = 0$. Depending on the form of the two roots $r_{1,2}$, the character of the solution splits into three cases.

| Discriminant | Form of the roots | Homogeneous solution | Physical meaning |
|---|---|---|---|
| $a^2 - 4b > 0$ | distinct real roots | $C_1 e^{r_1 x} + C_2 e^{r_2 x}$ | overdamped |
| $a^2 - 4b = 0$ | repeated root $r$ | $(C_1 + C_2 x)\, e^{rx}$ | critically damped |
| $a^2 - 4b < 0$ | complex roots $\alpha \pm i\omega$ | $e^{\alpha x}(C_1 \cos\omega x + C_2 \sin\omega x)$ | oscillation + exponential decay |

The **inhomogeneous** part ($f \neq 0$) requires adding a particular solution $y_p$. The two standard methods are the **method of undetermined coefficients** — applicable when $f$ is a polynomial, exponential, or trigonometric function, by trying a function of the same form — and the **method of variation of parameters**. The latter always works for the general form: if the homogeneous solutions $y_1, y_2$ are known, then

$$y_p(x) = -y_1(x)\!\int\!\frac{y_2(x) f(x)}{W(x)}dx + y_2(x)\!\int\!\frac{y_1(x) f(x)}{W(x)}dx$$

Each term: $W = y_1 y_2' - y_1' y_2$ = Wronskian. This expression is the ODE version of the **Green's function**: it expresses the response to an arbitrary source $f(x)$ as a single integral. It is the direct generalization of the impulse-response function in circuit response and system identification.

## 4. PDE classification: elliptic / parabolic / hyperbolic

For second-order linear PDEs, the discriminant sign sorts them into three standard types. Intuitively, elliptic corresponds to a steady state, parabolic to diffusion/relaxation, and hyperbolic to wave propagation. From the general form $A u_{xx} + 2B u_{xy} + C u_{yy} + \cdots = 0$, the type is decided by the sign of the discriminant $B^2 - AC$.

| Type | Representative equation | Sign of discriminant | Physics |
|---|---|---|---|
| elliptic | $\nabla^2 \phi = 0$ (Laplace), $\nabla^2 \phi = -\rho/\varepsilon_0$ (Poisson) | $B^2 - AC < 0$ | steady-state potential / temperature |
| parabolic | $\partial_t c = D\, \nabla^2 c$ (diffusion), $\partial_t T = \alpha\, \nabla^2 T$ (heat conduction) | $B^2 - AC = 0$ | smoothing in time |
| hyperbolic | $\partial_t^2 u = c^2\, \nabla^2 u$ (wave) | $B^2 - AC > 0$ | finite-speed signal propagation |

This classification dictates the solution strategy. Elliptic problems are **boundary-value problems** in which the boundary conditions over the entire domain simultaneously determine the solution. Parabolic/hyperbolic problems are **initial-value + boundary-value problems** with a clear time-direction, which makes time-marching solutions possible. The same distinction also carries directly to numerical solvers: an elliptic problem is solved by a single sparse linear system, a parabolic problem by an implicit/explicit step at every time step, and a hyperbolic problem is governed by the stability limit of the CFL condition.

In batteries we encounter (i) the Poisson equation for the potential profile of the double layer/space-charge layer (elliptic), (ii) Fick diffusion for the Li concentration inside an active material (parabolic), and (iii) the current/voltage profile of the 1D Newman model. Recognizing the type of equation when building a model immediately makes the choice of boundary conditions and solution tools obvious.

> **Related concept: Types of boundary conditions**
> The same PDE can give entirely different solutions under different boundary conditions. The three standard types: (i) **Dirichlet** — specifying the function value on the boundary ($u|_{\partial\Omega} = g$). Example: constant surface concentration ($c|_{x=0}=c_0$). (ii) **Neumann** — specifying the derivative (= flux) on the boundary ($\partial_n u|_{\partial\Omega} = h$). Example: no-flux boundary ($\partial_x c = 0$). (iii) **Robin (mixed)** — a linear combination of the function value and its derivative ($\alpha u + \beta\, \partial_n u = g$). Example: a Butler-Volmer-type boundary where the surface reaction is $j = k(c_s - c_\text{eq})$.
> The single-particle battery model (SPM) is defined by the combination of a symmetry condition $\partial_r c = 0$ (Neumann) at the particle center $r=0$ and the current-density condition $-D\,\partial_r c$ (Neumann, time-dependent) at the particle surface $r=R$; the consistency of the two conditions forms the basis of the quantitative analysis.

## 5. Diffusion equation: separation of variables, Fourier series, erfc solution

The diffusion equation is the PDE most often solved in electrochemistry. In its 1D form,

$$\frac{\partial c}{\partial t} = D\, \frac{\partial^2 c}{\partial x^2}$$

Each term: $c(x,t)$ = concentration, $D$ = diffusion coefficient (m²/s). The solution method splits into two branches depending on the domain and boundary conditions.

**Finite domain — separation of variables and Fourier series.** Substituting the trial solution $c(x,t) = X(x)\, T(t)$ yields the separation $T'/T = D\, X''/X = -\lambda$ with separation constant $\lambda$. The time part is $T \propto e^{-\lambda t}$, while the spatial part is the eigenfunction set determined by the boundary conditions. For a rod of length $L$ with zero concentration at both ends, $X_n(x) = \sin(n\pi x/L)$ with eigenvalues $\lambda_n = D(n\pi/L)^2$, and the general solution is

$$c(x,t) = \sum_{n=1}^\infty B_n \sin\!\left(\frac{n\pi x}{L}\right) e^{-D(n\pi/L)^2 t}$$

Each term: $B_n$ = coefficients obtained from a Fourier-series expansion of the initial condition $c(x,0)$. As time advances, higher modes decay faster (eigenvalue $\propto n^2$) and only the lowest mode remains — this is the quantitative statement of "diffusion smooths out," and gives precisely how concentration inhomogeneities inside a cell vanish over time.

**Semi-infinite domain — Boltzmann transformation and the erf solution.** When the domain looks infinitely far at the boundary — as for a very thick active-material particle or for the early stage of diffusion — instead of separation of variables one can reduce the PDE to an ODE using the **similarity variable** $\eta = x/(2\sqrt{Dt})$. For a semi-infinite domain with constant surface concentration $c_0$ and zero initial concentration, the solution is

$$c(x,t) = c_0\, \text{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right), \qquad \text{erfc}(\eta) = 1 - \frac{2}{\sqrt{\pi}}\int_0^\eta e^{-u^2}du$$

where $\text{erfc}$ = complementary error function. This single line contains the core physics of diffusion: (i) the concentration profile scales by the **diffusion length** $\sqrt{Dt}$; (ii) the meaningful change region extends from the surface to a depth where $x/2\sqrt{Dt} \sim 1$; (iii) when this length becomes comparable to the particle radius, the SPM assumption (uniform concentration) breaks down.

The surface flux is also obtained directly from the erf solution: $j(t) = -D\,\partial_x c|_{x=0} = c_0 \sqrt{D/(\pi t)}$. This $t^{-1/2}$ behavior is the origin of the Cottrell equation, and it is consistent with the intuition that the concentration gradient becomes shallower with time and the flux therefore decreases. The $\sqrt{t}$ region of GITT pulse analysis is another face of the same equation — multiple measurement techniques branch out from a single, consistent strand of physics.

## 6. Poisson equation: double layer and space-charge layer

The potential profile is determined by the Poisson equation of electrostatics.

$$\nabla^2 \phi = -\frac{\rho}{\varepsilon_0 \varepsilon_r}$$

Each term: $\phi$ = potential, $\rho$ = free charge density, $\varepsilon_0$ = vacuum permittivity, $\varepsilon_r$ = relative permittivity. With no charge ($\rho = 0$) it becomes the Laplace equation $\nabla^2 \phi = 0$, the basic equation for current-distribution calculations in steady-state electric conduction, electroplating, and EIS.

**1D double layer (Gouy–Chapman).** Given a surface potential $\phi_0$, the decay of the potential inside the electrolyte follows the **Poisson–Boltzmann equation**, which combines Poisson's equation with the Boltzmann distribution $c_\pm = c_0 \exp(\mp z e \phi/k_B T)$. Linearizing in the small-potential limit ($|ze\phi| \ll k_B T$) gives

$$\phi(x) = \phi_0\, e^{-x/\lambda_D}, \qquad \lambda_D = \sqrt{\frac{\varepsilon_0 \varepsilon_r k_B T}{2 c_0 z^2 e^2}}$$

Each term: $\lambda_D$ = Debye length, $c_0$ = bulk ion concentration, $z$ = ion valence. This single line gives the thickness of the double layer and its concentration/temperature dependence completely. In a 1 M aqueous solution, $\lambda_D \sim 0.3$ nm; in a dilute solution it can stretch to several nm or tens of nm. This length scale connects directly to the time constant of the high-frequency capacitive response in EIS.

**Space-charge layer in solids.** The same Poisson equation applies to SEI/CEI interfaces, semiconductor–electrolyte interfaces, and the interior of solid electrolytes. The difference is that point-defect concentrations enter $\rho$ instead of free charges; the form of the resulting expression (exponential decay, $\lambda_D$ length) stays the same. Thanks to this consistency, the Poisson equation learned once is reapplied to a wide variety of interface problems.

> **Related concept: Green's function and impulse response**
> For a linear PDE/ODE, the response to an arbitrary source $f$ is expressed as an integral against the **Green's function** $G(x, x')$, which is the response to a point source $\delta$: $u(x) = \int G(x, x') f(x') dx'$. In other words, the Green's function is the "impulse response" of the system, and once it is computed, the response to any input is a single integral.
> The Green's function of the diffusion equation in 1D infinite space is the Gaussian $G(x,t; x', 0) = \frac{1}{\sqrt{4\pi D t}} \exp\!\left(-\frac{(x-x')^2}{4Dt}\right)$, which is the "fundamental solution" of diffusion. The erfc solution is also derived as the integral representation of the Green's function under a Dirichlet boundary condition, and the $1/\sqrt{j\omega}$ shape of the Warburg impedance in EIS comes from the Laplace transform of the same Green's function.

## 7. Summary of solution strategies

A practical strategy table for solving ODEs/PDEs in battery modeling.

| Situation | Recommended tool | Notes |
|---|---|---|
| Simple first-order ODE (RC, first-order reaction) | separation of variables, integrating factor | direct analytical solution |
| Second-order linear ODE (RLC, oscillation) | characteristic equation | oscillation/damping form determined immediately |
| Finite-domain diffusion | separation of variables + Fourier series | mode-by-mode decay times are clear |
| Semi-infinite diffusion | erfc solution, $\sqrt{Dt}$ scaling | source of Cottrell, GITT |
| Steady-state potential profile | Laplace/Poisson + Green's function | double layer, space-charge layer |
| Response to arbitrary input | Green's function, Laplace transform | EIS, impulse response |
| Nonlinear / complex boundary | numerical (FDM/FEM, [`./04_numerical_methods.md`](./04_numerical_methods.md)) | when no analytical solution exists |

Far more useful than the ability to solve the equations themselves is the ability to quickly judge "what type of problem is this, and which length/time scale dominates." The two length scales $\sqrt{Dt}$ and the Debye length $\lambda_D$ work as a first-order diagnostic tool in nearly every electrochemical problem.

## References

- Crank, J. *The Mathematics of Diffusion* (2nd ed., Oxford, 1975) — standard collection of solution techniques for the diffusion equation, including erfc solutions and boundary-condition handling.
- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — standard undergraduate treatment of separation of variables, Fourier series, and Green's functions.
- Riley, K. F., Hobson, M. P., Bence, S. J. *Mathematical Methods for Physics and Engineering* (3rd ed., Cambridge, 2006) — comprehensive summary of PDE classification and solution techniques.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — standard treatment of battery PDE models (diffusion–reaction, concentrated electrolyte).
- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — PDE-based derivations of Cottrell, Warburg, and GITT.
