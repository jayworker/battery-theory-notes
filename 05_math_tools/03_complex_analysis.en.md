# Complex analysis and transforms

## 1. Overview

Complex numbers $z = x + jy$ and the function theory built on them appear, on the surface, to be "an arithmetic trick of adding the imaginary unit $j$ to a real number," but in reality they are the natural language of signal processing, impedance, and control theory. The reason is simple: in order to **express rotation and oscillation in a single line**, the complex exponential $e^{j\omega t} = \cos\omega t + j\sin\omega t$ is introduced, and this single expression unifies the sinusoidal response of RLC circuits, EIS impedance, the Fourier transform, and quantum-mechanical time evolution under one language.

The places where complex analysis appears decisively in electrochemistry are ① impedance spectroscopy (EIS) — the impedance $Z(\omega) = Z' + jZ''$ is essentially a complex number, ② the algebraic transformation of ODEs and circuit analysis via the Laplace transform, ③ the time–frequency-domain transformation via the Fourier transform, and ④ the causality check via the Kramers–Kronig relations. This section covers ① the meaning of analyticity, ② Cauchy's theorem and the residue theorem, ③ the Laplace transform, and ④ the Fourier transform and the KK relations — emphasizing not abstract theorems but "what shape does this tool let us write a particular expression in, in a single line."

Following the engineering convention, we use $j$ for the imaginary unit (identical to $i$ in mathematics).

## 2. Complex functions and analyticity

For a complex function $f(z) = u(x,y) + j v(x,y)$, differentiability requires a much stronger condition than mere real differentiability — namely, the **Cauchy–Riemann equations**.

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

If these two equations are satisfied in a neighborhood of a point $z_0$, then $f$ is called **analytic** (or **holomorphic**) at that point. The power of analyticity lies in the properties that follow automatically: ① an analytic function is automatically infinitely differentiable, ② its derivative is also analytic, ③ the Taylor expansion always converges within its radius of convergence, and ④ the values of a function in a region are uniquely determined by the values on the boundary of that region (analytic continuation). These properties, which never follow automatically in real analysis, come almost for free in the complex case — and that is what makes complex analysis a powerful tool.

Physical context: $u(x,y)$ and $v(x,y)$ automatically satisfy Laplace's equation $\nabla^2 u = \nabla^2 v = 0$ (a direct consequence of the CR equations). In other words, analytic functions naturally encode solutions of 2D electrostatics/fluid-dynamics problems and form the basis for solving boundary-value problems via conformal mapping. In circuit analysis, the analyticity of the impedance is equivalent to causality, and this becomes the starting point for the KK relations of Section 5.

## 3. Cauchy's theorem and the integral formula

Two central theorems of complex analysis. First, **Cauchy's theorem**: for a function $f(z)$ analytic in a domain $D$ and a closed curve $\gamma$ in $D$,

$$\oint_\gamma f(z)\, dz = 0$$

Intuitively, this is the strong statement that "any closed contour integral inside an analytic region is always zero." As a consequence, an integral between two points becomes path-independent and reduces to a topological quantity.

Second, the **Cauchy integral formula**: if $f$ is analytic on and inside $\gamma$ and $z_0$ is a point inside $\gamma$, then

$$f(z_0) = \frac{1}{2\pi j}\oint_\gamma \frac{f(z)}{z - z_0}\, dz$$

The key point of this formula is that "the value of the function at one point is expressed by a boundary integral around it," and from this Taylor and Laurent series and the residue theorem follow naturally. Differentiating once more, one obtains integral expressions for derivatives of all orders — this is the source of the infinite differentiability of analytic functions.

## 4. Residue theorem

When a function has an **isolated singularity** $z_0$, the coefficient $a_{-1}$ of the $-1$th term in the Laurent expansion $f(z) = \sum_{n=-\infty}^\infty a_n (z-z_0)^n$ around $z_0$ is called the **residue**: $\text{Res}(f, z_0) = a_{-1}$. The **residue theorem** connects the sum of residues at all singularities inside a closed curve $\gamma$ directly to the integral.

$$\oint_\gamma f(z)\, dz = 2\pi j \sum_k \text{Res}(f, z_k)$$

The power of this single equation is immediately apparent in real-integral evaluation. Example: $\int_{-\infty}^\infty \frac{dx}{1+x^2}$ is evaluated by closing the contour with a semicircle in the upper half-plane and computing the residue at $z = j$, giving the answer $\pi$ in just two lines. Almost every non-trivial integral encountered in physics — Fourier integrals, extraction of response times from oscillator response functions, integral representations of scattering amplitudes — is solved by the residue theorem.

The residue at a **simple pole** $z_0$ has a very simple form:

$$\text{Res}(f, z_0) = \lim_{z\to z_0}(z - z_0)\, f(z)$$

In EIS applications, when the impedance $Z(s)$ is a rational function, the residue at each of its poles directly gives the time constant and amplitude of the corresponding equivalent-circuit element — this connects immediately to the Laplace inverse transform of Section 5.

## 5. Laplace transform

The most frequently used transform in circuit analysis and system-response analysis. It maps a time function $f(t)$ to a complex-frequency function $F(s)$.

$$\mathcal{L}\{f(t)\}(s) = F(s) = \int_0^\infty f(t)\, e^{-st}\, dt$$

Each term: $s = \sigma + j\omega$ = complex frequency, defined in the region of convergence (ROC) where the integral converges. The key value is that **differentiation becomes multiplication**:

$$\mathcal{L}\{f'(t)\} = s F(s) - f(0), \qquad \mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0)$$

This single line is the magic that reduces ODEs to algebraic equations. The differential equation of an RLC circuit becomes a polynomial/rational expression in $s$, and its solution becomes simple algebra. Furthermore, the definition of impedance becomes the rational function $Z(s) = V(s)/I(s)$ naturally, with the impedances of standard circuit elements being:

| Element | Time domain | $s$-domain impedance | $j\omega$ form |
|---|---|---|---|
| Resistor | $v = Ri$ | $Z = R$ | $R$ |
| Inductor | $v = L\,di/dt$ | $Z = sL$ | $j\omega L$ |
| Capacitor | $i = C\,dv/dt$ | $Z = 1/(sC)$ | $1/(j\omega C)$ |

Substituting $s = j\omega$ immediately yields the impedance of the sinusoidal steady-state response, $Z(j\omega)$. Every equivalent-circuit representation in EIS — Randles, RC ladder, Warburg — grows out of exactly this single transform, and EIS analysis is essentially the task of fitting an appropriate $Z(s)$ form to the measured $Z(j\omega)$ data.

The **inverse transform** is in principle the Bromwich integral $f(t) = \frac{1}{2\pi j}\int_{c-j\infty}^{c+j\infty} F(s)\, e^{st}\, ds$, but in practice the standard procedure is to perform a partial-fraction decomposition and then use a table. For each simple pole $s = -\alpha_k$ of a rational $F(s) = N(s)/D(s)$, the corresponding time-domain term is $A_k\, e^{-\alpha_k t}$, where $\alpha_k$ is the inverse of the time constant — and the residue theorem (Section 4) is precisely the tool that gives those partial-fraction coefficients.

> **Related concept: One-line Laplace solution of a first-order RC circuit**
> $RC\, \dot v + v = V_\text{src}$, $v(0) = 0$, input $V_\text{src}(t) = V_0 \cdot 1(t)$ (step). Laplace transform: $RC\,(sV - 0) + V = V_0/s$ → $V(s) = \frac{V_0}{s(1 + sRC)} = \frac{V_0}{s} - \frac{V_0}{s + 1/RC}$ (partial fractions). Inverse from a table: $v(t) = V_0[1 - e^{-t/RC}]$.
> The answer comes out by pure algebra without solving the ODE directly even once, and the two poles $s = 0$ (steady state) and $s = -1/RC$ (time constant RC) directly show the equilibrium value and the relaxation time. This pattern generalizes verbatim to any LTI circuit.

## 6. Fourier transform and EIS

The **Fourier transform** is the Laplace transform restricted to $\sigma = 0$ ($s = j\omega$). It maps a time-domain signal $f(t)$ to its frequency-domain counterpart $\hat f(\omega)$.

$$\hat f(\omega) = \int_{-\infty}^\infty f(t)\, e^{-j\omega t}\, dt, \qquad f(t) = \frac{1}{2\pi}\int_{-\infty}^\infty \hat f(\omega)\, e^{j\omega t}\, d\omega$$

Intuitively, an arbitrary signal is decomposed into a sum of sinusoids, and $\hat f(\omega)$ holds the amplitude/phase of each frequency component. The differentiation–multiplication rule $\widehat{f'} = j\omega \hat f$ also holds.

Connection to EIS: in a linear time-invariant (LTI) system, the relation between the input $i(t)$ and output $v(t)$ is the convolution with the **impulse response** $h(t)$, and Fourier-transforming converts it into a simple product.

$$v(t) = (h * i)(t) \quad \xrightarrow{\mathcal{F}} \quad \hat v(\omega) = Z(\omega)\, \hat i(\omega)$$

Here $Z(\omega) = \hat h(\omega)$ is precisely the frequency-response function — the impedance. EIS measurement is essentially the experimental implementation of the very definition of the Fourier transform: applying a small-amplitude sinusoidal input $i(t) = I_0\sin\omega t$ and measuring the amplitude/phase of the output $v(t)$ to obtain $Z(\omega)$ directly.

Sampling/denoising application: even a noisy signal in the time domain, if it appears in a narrow band in the Fourier domain, can be quantitatively isolated by a filter (low/high/band-pass) that lets only that band through. In dQ/dV analysis, filters such as Savitzky–Golay are used to smooth measurement noise, and their essence is high-frequency cutoff in the frequency domain.

## 7. Kramers–Kronig relations

There is a powerful constraint that the response function of an LTI system must satisfy. If the system is **causal** — output cannot precede input — then the impulse response satisfies $h(t) = 0$ for $t < 0$. This single time-domain condition reduces, in the frequency domain, to the result that **the real and imaginary parts are related to each other by a Hilbert transform** — these are the **Kramers–Kronig (KK) relations**.

$$Z'(\omega) - Z'_\infty = \frac{2}{\pi}\, \text{P}\!\!\int_0^\infty \frac{\omega'\, Z''(\omega')}{\omega'^2 - \omega^2}\, d\omega'$$

$$Z''(\omega) = -\frac{2\omega}{\pi}\, \text{P}\!\!\int_0^\infty \frac{Z'(\omega') - Z'_\infty}{\omega'^2 - \omega^2}\, d\omega'$$

Each term: $\text{P}\!\!\int$ = Cauchy principal value, $Z'_\infty$ = real part in the $\omega \to \infty$ limit. The mathematical origin of this expression is simple — causality → $h(t) = h(t)\,\Theta(t)$ → in the Fourier transform, $\hat h$ is analytic in the upper half-plane → applying the Cauchy integral formula → KK relations.

**Use in EIS:** apply the KK transform to measured $Z(\omega)$ data and predict the imaginary part from the real part, then compare with the measured value. If the two agree well, the data satisfy the LTI assumptions (linearity, time-invariance, causality), so equivalent-circuit fitting is meaningful; if a large deviation is seen, it means the cell state changed during the measurement or nonlinearity intervened, and the data range must be cropped or the measurement conditions revised. In other words, the KK check is **a first-line diagnostic of the data's self-consistency before any fitting**, and skipping this step can render all subsequent analysis meaningless.

In addition, the KK relations appear in the same form outside EIS — for the optical constants (refractive index ↔ absorption coefficient), real vs. imaginary parts of the dielectric function, absorption vs. dispersion in NMR spectra, and so on — as a consistent expression of the same causality + analyticity structure, an example of how a single learned tool applies directly to many spectroscopies.

> **Related concept: Poles in the $s$-plane and system stability**
> In the Laplace $s$-plane, the locations of the **poles** of the system transfer function $H(s)$ directly determine system stability. A pole in the left half-plane (LHP, $\text{Re}\,s < 0$) gives exponential decay → stable; a pole in the right half-plane (RHP, $\text{Re}\,s > 0$) gives exponential blow-up → unstable; a pole on the imaginary axis is marginally stable (sustained oscillation). The requirement that all poles of a causal LTI system lie in the LHP is another face of the same causality condition expressed by the KK relations.
> Every RC/Warburg term in a battery equivalent circuit (Randles, etc.) gives a simple pole in the LHP, hence is automatically stable, and this stability guarantees passing the KK check — the two facts grow from exactly the same causality–analyticity strand.

## 8. Practical summary

| Tool | Input/output | Core use |
|---|---|---|
| analyticity (CR equations) | $f(z)$ → differentiability | harmonic functions, conformal mapping |
| Cauchy integral formula | boundary value → interior value | infinite differentiability, series |
| residue theorem | closed integral → $\sum$ residues | real-integral evaluation, partial fractions |
| Laplace transform | time → $s$-domain | ODE → algebra, circuit impedance |
| Fourier transform | time → $\omega$-domain | frequency analysis, filtering, EIS |
| Kramers–Kronig | $Z'$ ↔ $Z''$ | causality check, EIS validation |

Two-line core insight: **(i) The sinusoidal response is expressed by a single complex number.** Introducing $e^{j\omega t}$ unifies circuits, vibrations, waves, and quantum mechanics under one language. **(ii) Causality automatically implies analyticity.** This single fact is the common ground for various quantitative tools — KK relations, $s$-plane stability, dispersion relations.

## References

- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — undergraduate-level standard treatment of complex analysis, Laplace, and Fourier.
- Arfken, G. B., Weber, H. J., Harris, F. E. *Mathematical Methods for Physicists* (7th ed., Academic, 2012) — comprehensive summary of residues, Laplace, and KK relations.
- Oppenheim, A. V., Willsky, A. S., Nawab, S. H. *Signals and Systems* (2nd ed., Pearson, 1997) — standard signal-processing textbook for Laplace/Fourier.
- Macdonald, J. R., Barsoukov, E. *Impedance Spectroscopy* (3rd ed., Wiley, 2018) — standard reference for EIS theory and KK validation.
- Lasia, A. *Electrochemical Impedance Spectroscopy and Its Applications* (Springer, 2014) — KK relations and analysis in electrochemical EIS.
- Brown, J. W., Churchill, R. V. *Complex Variables and Applications* (9th ed., McGraw-Hill, 2013) — standard undergraduate textbook on complex analysis.
