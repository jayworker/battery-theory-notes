# Numerical methods

## 1. Overview

Differential or nonlinear equations that admit a closed-form (analytical) solution are in fact rare exceptions. Almost every equation we encounter in battery modeling — concentrated-electrolyte PDEs coupled with the nonlinear Butler–Volmer equation, the coupled diffusion–reaction in multilayer electrodes, nonlinear fitting of equivalent circuits, multiscale degradation models — either has no analytical solution or is so complex that the closed form is of no practical value. Numerical methods are therefore not "an aid to theory" but **the core infrastructure that actually makes theory work**, and the ability to check the accuracy/stability of a numerical solution effectively defines the limit of one's quantitative-modeling capability.

This section covers five frequently used tools. ① Finite-difference method (FDM) — the simplest and most intuitive PDE discretization. ② Finite-element method (FEM) — a more powerful framework for complex geometries/boundaries. ③ Newton–Raphson — the standard solver for nonlinear equations. ④ Nonlinear fitting (Levenberg–Marquardt) — fitting models to experimental data. ⑤ Numerical stability in general — stiffness, ill-conditioning, regularization. Emphasis is placed not on the algorithms themselves but on "why does this method work" and "when does it break."

The single most important principle for handling numerical solutions qualitatively: **every numerical result is an approximation to the true answer**, and the magnitude and stability of that error must be predictable in advance for the result to be trustworthy.

## 2. Finite-difference method (FDM)

The most intuitive PDE-discretization tool. The function $u(x)$ is represented by its values $u_i = u(x_i)$ at grid points $x_i = i\,h$, and derivatives are approximated by differences. These come naturally from Taylor expansion.

$$\frac{du}{dx}\bigg|_i \approx \frac{u_{i+1} - u_{i-1}}{2h} \quad (\text{central difference, } O(h^2))$$

$$\frac{d^2 u}{dx^2}\bigg|_i \approx \frac{u_{i+1} - 2u_i + u_{i-1}}{h^2} \quad (O(h^2))$$

The meaning of the error order is important. $O(h^2)$ is a precise quantitative guarantee that halving the grid spacing reduces the error to one quarter, and one uses this fact to check grid convergence — solving the same problem on two different grids and trusting the result if it converges as predicted; if not, the solution has broken down.

**Time integration and stability.** The simplest discretization of the 1D diffusion equation $\partial_t c = D\,\partial_{xx} c$ is the explicit Euler method:

$$c_i^{n+1} = c_i^n + \frac{D\,\Delta t}{h^2}(c_{i+1}^n - 2c_i^n + c_{i-1}^n)$$

The stability of this method is determined by von Neumann analysis, and the condition is $D\,\Delta t / h^2 \le 1/2$. That is, when the grid spacing is reduced, the time step must be reduced by its square — halving the grid → quartering $\Delta t$ — and this quickly becomes inefficient. The standard practical choice is therefore an **implicit method**.

| Method | Equation (diffusion) | Accuracy | Stability |
|---|---|---|---|
| Explicit Euler | $c^{n+1} = c^n + \Delta t\, L c^n$ | $O(\Delta t)$ | conditional ($D\Delta t/h^2 \le 1/2$) |
| Implicit Euler | $c^{n+1} = c^n + \Delta t\, L c^{n+1}$ | $O(\Delta t)$ | unconditionally stable |
| Crank–Nicolson | $c^{n+1} - c^n = \tfrac{\Delta t}{2}L(c^n + c^{n+1})$ | $O(\Delta t^2)$ | unconditionally stable |
| BDF2 (2nd-order backward) | $\tfrac{3c^{n+1} - 4c^n + c^{n-1}}{2\Delta t} = L c^{n+1}$ | $O(\Delta t^2)$ | unconditionally stable, A-stable |

Here $L$ is the discretization of the spatial differential operator. Implicit methods solve a linear system at every time step but allow large $\Delta t$, making them much more efficient overall. Crank–Nicolson is the most popular choice as a balance between accuracy and stability, and the BDF family is particularly strong for stiff problems.

## 3. Overview of the finite-element method (FEM)

Where FDM is intuitive, FEM is much more powerful for complex geometries, local mesh refinement, and strong boundary handling. The key idea is to first convert the PDE into its **weak form** instead of discretizing it directly, then average it through integration against a test function.

Example: for the Poisson equation $-\nabla^2 \phi = f$, multiply by a test function $v$ and integrate; integration by parts lowers the differentiation order by one, giving

$$\int_\Omega \nabla \phi \cdot \nabla v\, d\Omega = \int_\Omega f v\, d\Omega + \text{(boundary terms)}$$

This weak form is equivalent to the original PDE provided it holds for arbitrary test functions $v$ (and corresponding trial $\phi$); the lower differentiation order has the advantage that solutions need not be as smooth.

Now, restricting the trial/test functions to a finite-dimensional subspace — typically piecewise-polynomial **basis functions** $\phi_i$ — the unknown is expressed as $\phi(x) = \sum_i c_i \phi_i(x)$ and the weak form becomes the **linear system**

$$K\, \mathbf{c} = \mathbf{f}, \qquad K_{ij} = \int_\Omega \nabla \phi_i \cdot \nabla \phi_j\, d\Omega$$

Each term: $K$ = stiffness matrix (assembled element-by-element as a sum of integrals, sparse), $\mathbf{f}$ = load vector. Standard algorithms exist for matrix assembly and sparse solving, so PDEs on complex 2D/3D domains are solved by the standard pipeline of mesh generation + weak form + solve. Tools such as COMSOL, FEniCS, and deal.II are all implementations of this framework.

Battery applications: ① the coupled multilayer electrode + separator + electrolyte PDEs of the P2D Newman model, ② effective-transport simulations of 3D electrode microstructures, ③ stress–diffusion coupling, ④ local current distribution in porous electrodes — all are handled by FEM as standard.

## 4. Newton–Raphson method

The most frequently used method for solving nonlinear equations $f(x) = 0$. From the current estimate $x_n$, expanding $f$ to first order around $x_n$,

$$0 = f(x_{n+1}) \approx f(x_n) + f'(x_n)(x_{n+1} - x_n)$$

and solving gives the update formula in one line.

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

Geometric interpretation: $x_{n+1}$ is the intersection of the tangent line to the curve $y = f(x)$ at $x_n$ with the $x$-axis. Intuitively clean, and very fast when convergence is fast — **quadratic convergence**, in which the number of accurate digits roughly doubles per iteration. The exact bound $|x_{n+1} - x^*| \le C\,|x_n - x^*|^2$ holds.

Two drawbacks always come along, however. (i) **Initial-guess sensitivity** — starting far away can cause divergence or jumping to a different root, and the diagnosis is delicate. (ii) Near $f'(x_n) \approx 0$, the update magnitude can blow up, leading to instability. In practice, the method is combined with stabilization techniques such as **line search** or **trust region** — taking the Newton direction but limiting the step size safely.

**Multidimensional generalization.** For $\mathbf{f}(\mathbf{x}) = 0$ ($\mathbf{f} : \mathbb{R}^n \to \mathbb{R}^n$), the **Jacobian** $J_{ij} = \partial f_i/\partial x_j$ takes the place of the derivative.

$$\mathbf{x}_{n+1} = \mathbf{x}_n - J(\mathbf{x}_n)^{-1}\, \mathbf{f}(\mathbf{x}_n)$$

A linear system is solved at each step. Self-consistent solutions of nonlinear PDEs (e.g., drift-diffusion + Poisson, concentrated electrolyte + Butler–Volmer) take exactly this form, and combined with FEM sparse solvers, this becomes a standard task.

> **Related concept: Nonlinear least squares and Levenberg–Marquardt (LM)**
> Given measurements $\{x_k, y_k\}$ and a nonlinear model $y = m(x; \boldsymbol{\theta})$, one minimizes the sum of squared residuals $S(\boldsymbol{\theta}) = \sum_k r_k^2$ with $r_k(\boldsymbol{\theta}) = y_k - m(x_k; \boldsymbol{\theta})$, to find $\boldsymbol{\theta}$. **Gauss–Newton** is a Newton variant: $\boldsymbol{\theta}_{n+1} = \boldsymbol{\theta}_n + (J^T J)^{-1} J^T \mathbf{r}$ ($J_{ki} = \partial r_k/\partial \theta_i$). Fast but unstable when far from the optimum.
> **Levenberg–Marquardt** adds a regularization term: $(J^T J + \lambda I)\,\Delta\boldsymbol{\theta} = J^T \mathbf{r}$. Large $\lambda$ → small step (similar to gradient descent, safe); small $\lambda$ → Gauss–Newton (fast quadratic convergence). Adaptively adjusting $\lambda$ combines the strengths of both modes.
> LM is the de facto standard for EIS equivalent-circuit fitting, and the uncertainty of each circuit parameter is also estimated directly from the inverse of $J^T J$ (the Hessian approximation) — directly connected to error propagation in [`./05_data_analysis.md`](./05_data_analysis.md).

## 5. Practical aspects of nonlinear fitting

Common issues in fitting models to experimental data — EIS, GITT, ICA fitting, etc.:

**(i) Choice of initial values.** LM can fall into a local minimum. Especially for an EIS equivalent circuit where the number of parameters is large ($R_s, R_{ct}, C_{dl}, \sigma_W$, etc.) and some are nearly free, the result depends strongly on initial values. Strategies: ① start from physical rough estimates (e.g., the high-frequency intercept $\approx R_s$, the diameter of the semicircle $\approx R_{ct}$); ② begin fitting a subset and gradually add parameters; ③ run a global search (basin hopping, etc.) and then refine with LM.

**(ii) Parameter identifiability.** If two parameters produce nearly the same effect on the data, the fit determines only their sum/difference and cannot fix the individual values. This is the situation when the condition number of the Hessian $J^T J$ (see [`./02_linear_algebra.md`](./02_linear_algebra.md)) is very large, and regularization or model simplification is required. If the standard error of the result is larger than the estimated value, that parameter is meaningless.

**(iii) Weighting.** If the measurement error varies between data points (e.g., when the noise is large at low frequency in EIS), one should use weighted residuals $r_k = (y_k - m_k)/\sigma_k$. Using uniform weights lets large-error regions dominate the fit.

**(iv) Goodness of fit.** If $\chi^2 = \sum r_k^2/\sigma_k^2$ is comparable to the number of degrees of freedom (data count − parameter count), the fit is acceptable; much larger means model insufficiency, and much smaller suggests overfitting. A KK check should also be run in parallel to verify the data's own self-consistency — see [`./05_data_analysis.md`](./05_data_analysis.md) for details.

## 6. Numerical stability in general

Three threats consistently appearing in numerical solutions.

**(i) Stiffness.** When an ODE/PDE system contains terms with vastly different time constants (e.g., fast SEI formation vs. slow active-material volume change), explicit methods must use $\Delta t$ matched to the fastest time constant, which is inefficient. The answer is **A-stable** or **L-stable** implicit methods (BDF, Radau, parts of Crank–Nicolson). The Newton self-consistent solution of battery P2D models is a standard case in this class.

**(ii) Ill-conditioning.** When the condition number $\kappa(A) = \sigma_\text{max}/\sigma_\text{min}$ of a linear system $A\mathbf{x} = \mathbf{b}$ is very large, small errors in the input $\mathbf{b}$ are amplified into large errors in the output $\mathbf{x}$. Quantitatively, $\|\delta \mathbf{x}\|/\|\mathbf{x}\| \le \kappa(A)\,\|\delta \mathbf{b}\|/\|\mathbf{b}\|$. SVD-based diagnosis (see Section 02), regularization (see below), or a better re-formulation is required.

**(iii) Regularization.** A standard prescription for inverse problems where the solution is too sensitive to data or non-unique. **Tikhonov regularization** adds a $\lambda \|\mathbf{x}\|^2$ term to the original loss function, preferring solutions of small norm. It appears almost always in ill-posed problems — distribution of relaxation times (DRT) analysis in EIS, inverse estimation of inhomogeneous concentration distributions, and so on. The choice of $\lambda$ is decided by the L-curve method or cross-validation.

> **Related concept: Numerical differentiation and the $dE/d\sqrt{t}$ extraction in GITT**
> Diffusion-coefficient extraction from the short-time response of a GITT pulse uses the standard expression $D = \frac{4}{\pi\tau}\!\left(\frac{n_M V_M}{S}\right)^{\!2}\!\left(\frac{\Delta E_s}{\Delta E_\tau}\right)^{\!2}$, but more accurately the slope of $E$ vs. $\sqrt{t}$, $dE/d\sqrt{t}$, is the key. Differentiating a noisy curve, however, amplifies noise.
> Practical prescriptions: ① **Savitzky–Golay** — local polynomial fit and then differentiate, smoothing noise and computing the derivative simultaneously. ② **smoothing spline** — fit a smooth function with appropriate regularization and differentiate analytically. ③ raw differencing followed by a moving average over a large window. In any case, the window size/regularization strength controls the resolution-vs.-noise trade-off, and the standard practice is to apply two or three of these techniques to the same data and check the robustness of the result.

## 7. Practical summary

| Problem | Standard tool | Key cautions |
|---|---|---|
| 1D diffusion–reaction PDE | FDM + Crank–Nicolson | grid convergence, $D\Delta t/h^2$ check |
| Complex-geometry PDE | FEM + weak form | mesh quality, boundary conditions |
| Nonlinear self-consistent solve | Newton–Raphson | initial guess, line search |
| EIS/GITT fitting | Levenberg–Marquardt | initial guess, weighting, identifiability |
| Stiff system | implicit BDF/Radau | matrix-solve cost |
| Ill-posed inverse problem | Tikhonov regularization | choice of $\lambda$ |

Two-line core principles: **(i) every numerical result must be verified.** Grid convergence, time-step convergence, and comparison against an analytical solution (where available) or a more accurate method are required. **(ii) Stability analysis first, accuracy second.** A divergent solution is worthless however accurate it is, and a prior check of the stability conditions is always the first step.

## References

- Press, W. H. et al. *Numerical Recipes: The Art of Scientific Computing* (3rd ed., Cambridge, 2007) — standard reference for numerical algorithms covering FDM, LM, and Newton.
- LeVeque, R. J. *Finite Difference Methods for Ordinary and Partial Differential Equations* (SIAM, 2007) — standard treatment of FDM stability and convergence.
- Hughes, T. J. R. *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis* (Dover, 2000) — standard undergraduate/graduate FEM textbook.
- Nocedal, J., Wright, S. J. *Numerical Optimization* (2nd ed., Springer, 2006) — comprehensive mathematical treatment of Newton, LM, and trust-region methods.
- Hairer, E., Wanner, G. *Solving Ordinary Differential Equations II: Stiff and DAE Problems* (2nd ed., Springer, 1996) — standard for stiff ODEs and BDF/Radau.
- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — electrochemistry standard for numerical analysis of GITT/EIS.
