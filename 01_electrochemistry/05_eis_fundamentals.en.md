# EIS Fundamentals (Electrochemical Impedance Spectroscopy)

## 1. Overview

In an electrochemical system, several processes with different time scales — ohmic resistance, charge transfer, double-layer charging, diffusion — proceed simultaneously. In the time domain they are superposed and difficult to separate, but in the frequency domain they unfold naturally: fast processes respond at high frequency, slow processes at low frequency. This is why **electrochemical impedance spectroscopy (EIS)** exists.

By applying a small sinusoidal perturbation and measuring the amplitude and phase of the response as a function of frequency, EIS is intrinsically meaningful only in the **linear-response** regime. A standard AC amplitude is ±5–10 mV; beyond that, nonlinear terms enter and interpretation breaks down.

There are two measurement modes. **PEIS (potentiostatic EIS)** superimposes an AC potential on a DC potential and measures the current response, while **GEIS (galvanostatic EIS)** superimposes an AC current on a DC current and measures the voltage response. Full-cell batteries usually favor GEIS; precision kinetic measurements favor PEIS.

This section follows the flow: definition of impedance → circuit elements → Randles circuit → Warburg / CPE → validation (KK) → DRT analysis.

## 2. Mathematical definition of impedance

Impedance generalizes the DC notion of resistance to alternating current. Expressing the ratio of sinusoidal voltage to current as a complex number simultaneously captures the amplitude ratio and the phase difference. Intuitively, "how much it resists current (resistive component)" and "how much it lags (reactive component)" are compressed into one number.

$$Z(\omega) = \frac{V(\omega)}{I(\omega)} = Z'(\omega) + j Z''(\omega)$$

Each term: $\omega = 2\pi f$ = angular frequency (rad/s), $j = \sqrt{-1}$ (electrical-engineering convention), $Z'$ = real part (resistive), $Z''$ = imaginary part (reactive; negative for capacitors). Two display conventions are standard. The **Nyquist plot** is a complex-plane plot of $Z'$ vs $-Z''$, while the **Bode plot** consists of $\log f$ vs $|Z|$ and $\log f$ vs phase angle $\phi$. Nyquist is intuitive for circuit elements; Bode shows frequency dependence and dB-scale response clearly.

In electrochemistry the two are usually used together. Nyquist is used to read the visual pattern of semicircles and lines, and Bode to identify the frequency at which each feature occurs.

## 3. Impedance of basic circuit elements

Before building a circuit model, one organizes the impedance of the three basic elements. The expressions follow directly from the RLC definitions and are the building blocks of every equivalent circuit.

$$Z_R = R, \qquad Z_C = \frac{1}{j\omega C}, \qquad Z_L = j\omega L$$

What each element means: $R$ = ohmic resistance (frequency-independent, phase 0°). $C$ = capacitance (inversely proportional to frequency, phase −90°). $L$ = inductance (proportional to frequency, phase +90°). For series connections $Z$ adds, for parallel connections $1/Z$ adds.

The parallel RC combination is the most common unit in EIS and traces an exact semicircle in a Nyquist plot. The impedance of a parallel RC is

$$Z_{RC}(\omega) = \frac{R}{1 + j\omega R C}$$

Solving for the real and imaginary parts gives a circle equation of the form $(Z' - R/2)^2 + Z''^2 = (R/2)^2$, hence an exact semicircle.

The semicircle's diameter equals $R$, the apex frequency satisfies $\omega_\text{peak} = 1/(RC)$, so the time constant $\tau = RC$ can be read directly off the plot. When two RC blocks with different $\tau$ are connected in series, two semicircles appear separately — this is the quantitative meaning of the statement that EIS separates time scales.

For two semicircles to look separated, the time-constant ratio usually has to satisfy $\tau_1/\tau_2 \gtrsim 100$. Closer than that, the two overlap into a single asymmetric semicircle, in which case fitting cannot reliably separate them. This is the canonical situation in which DRT analysis is needed.

## 4. The Randles equivalent circuit

The standard equivalent circuit for a typical electrochemical cell is the **Randles circuit**: a series ohmic resistance $R_s$ (electrolyte + current collector), then a parallel block of charge-transfer resistance $R_\text{ct}$ + double-layer capacitance $C_\text{dl}$, with a Warburg impedance $Z_W$ representing diffusion in series with $R_\text{ct}$.

This simple circuit is the starting point for nearly all first-pass EIS analysis and captures, to first order, the electrochemical behavior of cathode / anode / electrolyte systems.

$$Z(\omega) = R_s + \frac{1}{\dfrac{1}{R_\text{ct} + Z_W} + j\omega C_\text{dl}}$$

Patterns visible in the Nyquist plot: high-frequency intercept = $R_s$, first semicircle diameter = $R_\text{ct}$, $\tau = R_\text{ct} C_\text{dl}$ at the apex frequency, 45° low-frequency line = Warburg (diffusion). EIS data without these four features are rare; whenever they appear, you should immediately recall how the circuit maps onto them.

In the very-high-frequency region (>10 kHz), cable / cell inductance $L$ enters and produces a tail below the real axis on Nyquist. This region is usually outside the analysis range and is either trimmed before fitting or handled with a separate $L$ element.

In Li-ion cells, two semicircles are usually seen separately. The high-frequency semicircle is SEI resistance/capacitance, the low-frequency semicircle is charge transfer, and behind them is the Warburg line.

When the two semicircles' time constants are close, they overlap; in that case the DRT analysis discussed later is useful. As cycling progresses, aging modes can be diagnosed in this view: the SEI semicircle thickens, and new semicircles appear (e.g., CEI, or a metal/electrolyte interface from Li plating).

> **Related concept: Charge-transfer resistance $R_\text{ct}$**
> In the small-overpotential limit of the Butler–Volmer equation $j = j_0[\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$, the linear approximation $j \approx j_0 F\eta/RT$ holds.
> In this region the cell behaves like an ohmic resistor with value $R_\text{ct} = RT/(nF j_0 A)$. So $j_0$ can be extracted directly from the diameter of the EIS semicircle.
> Assumptions: single-step electron transfer, $|\eta| < 26 \text{ mV}$, surface concentration = bulk. For multi-step or adsorption-mediated reactions, apparent $\alpha$ and $n$ corrections are required.

## 5. Warburg impedance and CPE

The 45° low-frequency line corresponds to semi-infinite linear diffusion. Solving Fick's equation under sinusoidal boundary conditions yields an impedance that decays as $\omega^{-1/2}$ with equal-magnitude real and imaginary parts. This is the **Warburg impedance**.

$$Z_W(\omega) = \sigma \omega^{-1/2} (1 - j), \qquad \sigma = \frac{RT}{n^2 F^2 A \sqrt{2}} \left( \frac{1}{c_O \sqrt{D_O}} + \frac{1}{c_R \sqrt{D_R}} \right)$$

Each term: $\sigma$ = Warburg coefficient (larger when diffusion is slower), $A$ = electrode area, $c_O$/$c_R$ = oxidized/reduced species concentrations, $D_O$/$D_R$ = diffusion coefficients. From the slope of $|Z|$ vs $\omega^{-1/2}$ along the 45° line in Nyquist one extracts $\sigma$, and inverting the expression above gives $D$. When the particle dimensions are finite, the line bends in the low-frequency region into a finite-length Warburg shape and either turns vertical (blocking) or horizontal (transmissive).

When the double-layer capacitance is not an ideal $C$ but a non-uniform distribution, the semicircle is depressed. This is represented by a circuit element called the **CPE (constant-phase element)**.

$$Z_\text{CPE}(\omega) = \frac{1}{Q (j\omega)^n}$$

Each term: $Q$ = CPE magnitude (F·s^(n−1)), $n$ = phase exponent (0–1). $n = 1$ gives an ideal capacitor, $n = 0.5$ gives Warburg, $n = 0$ gives a resistor. In real battery data $n$ is typically 0.7–0.95, quantifying how much surface roughness, SEI heterogeneity, and double-layer distribution drive $n$ away from 1.

When converting a CPE into an equivalent capacitance, the Brug equation is used:

$$C_\text{eff} = Q^{1/n} R^{(1-n)/n}$$

Here $R$ is the resistor in parallel with the CPE (usually $R_\text{ct}$). A raw $Q$ value not converted in this way does not have units of F, and direct comparison is meaningless.

The CPE is a convenient fitting tool, but physical interpretation requires care — $n < 1$ is a signal that there is no single time constant but rather a distribution of time constants (this is the motivation for DRT).

## 6. Kramers–Kronig validation

For EIS data to support meaningful interpretation, three assumptions must hold: ① **causality** — the response cannot precede the perturbation, ② **linearity** — the amplitude must scale linearly with the perturbation, ③ **time-invariance** — the system must not change during the measurement. These three are equivalent to satisfying the **Kramers–Kronig (KK) transform**, which states that the real and imaginary parts of impedance determine each other.

One form of the KK relation:

$$Z'(\omega) = Z'(\infty) + \frac{2}{\pi} \int_0^\infty \frac{x Z''(x) - \omega Z''(\omega)}{x^2 - \omega^2} dx$$

In practice, $Z'$ is recomputed from the measured $Z''$ via the KK transform and compared with the measured $Z'$. A residual within 1–2% indicates the data are reliable; larger residuals suggest the system drifted or entered the nonlinear regime during the measurement.

The most common cause of KK violation in batteries is **SOC drift** — if self-discharge or leakage shifts the SOC during the measurement, time-invariance is broken. For this reason, sufficient OCV stabilization is essential before EIS measurement. As a rule of thumb, wait until the OCV drift rate is below 0.1 mV/h.

Another common cause of KK residuals is an AC amplitude that is too large and pushes the system into the nonlinear regime. If halving the amplitude and re-measuring reduces the residual, the issue is diagnosed as nonlinearity.

Most commercial fitting software (EC-Lab, ZView, ZSimpWin, etc.) provides KK validation as a built-in feature, and it is good practice always to run it as a first step after measurement. Boukamp's methodology (fitting many RC elements to enforce KK automatically) is the standard.

## 7. Distribution of Relaxation Times (DRT) analysis

EIS spectra of complex systems often consist of overlapping RC blocks with several time constants. Equivalent-circuit fitting has the disadvantage that the circuit topology must be assumed in advance, and there is the well-known problem that the circuit is not unique (multiple circuits frequently fit the same data equally well). A non-parametric method that bypasses this is **DRT (Distribution of Relaxation Times) analysis**.

The key idea is to transform the impedance into a distribution function $g(\tau)$ over time constant $\tau$. That is, one can directly visualize how many RC elements sit at each $\tau$ along the $\tau$ axis. Mathematically:

$$Z(\omega) - R_\infty = \int_0^\infty \frac{g(\tau)}{1 + j\omega\tau} d\tau$$

The inverse of this integral equation is ill-posed, so a direct solution amplifies noise dramatically. The standard remedy is **Tikhonov regularization**, which jointly minimizes the residual + a smoothness term:

$$\min_{g(\tau) \geq 0} \, \|Z_\text{meas} - Z_\text{model}(g)\|^2 + \lambda \|L g\|^2$$

Here $\lambda$ = regularization strength, $L$ = derivative operator. Too small $\lambda$ lets noise appear as spurious peaks; too large $\lambda$ smears real peaks. The standard choice is to select $\lambda$ via the L-curve method.

Strengths of DRT: ① the number of time constants can be counted directly without assuming a circuit, ② overlapping semicircles can be separated and mapped 1:1 onto processes, ③ the appearance of new peaks during cycling identifies aging modes.

Limitations: ① inductive behavior or Warburg behavior is not represented cleanly (separate handling needed), ② sensitivity to the regularization parameter, ③ if the high- or low-frequency end of the data is truncated, spurious peaks may appear.

Even so, DRT is the most powerful complement to equivalent-circuit fitting in multi-time-scale systems — particularly full-cell EIS that contains SEI / CEI / charge transfer / diffusion all together. Recent work has actively proposed Bayesian DRT, Hilbert-transform-based variants, and deep-learning-based variants.

Open-source tools: DRTtools (MATLAB), pyDRTtools (Python), impedance.py and others are freely available, with standard Tikhonov regularization + automatic L-curve selection. The practical use of polarization decomposition and the complementary use of GITT/EIS are covered in [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md).

A final point to emphasize: without physical interpretation, EIS is just a fitting exercise. A circuit model is only a quantitative language for the data — to obtain reliable conclusions, one must cross-validate which physical process each element corresponds to with independent measurements (e.g., $D$ from GITT, SEI thickness changes from dilatometry).

## References

- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — standard EIS textbook.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — KK validation and measurement practice.
- Macdonald, J. R., Barsoukov, E. (eds.) *Impedance Spectroscopy: Theory, Experiment, and Applications* (3rd ed., Wiley, 2018) — Randles circuit and equivalent-circuit catalog.
- Wan, T. H., Saccoccio, M., Chen, C., Ciucci, F. *Electrochimica Acta* 184 (2015) 483–499 — standard treatment of DRT Tikhonov regularization.
- Boukamp, B. A. *Solid State Ionics* 169 (2004) 65 — practical algorithm for KK validation.
