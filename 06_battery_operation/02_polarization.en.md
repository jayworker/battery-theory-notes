# Polarization Decomposition and Time-Scale Analysis

## 1. Overview

The moment current flows through a battery, the cell voltage departs from the equilibrium potential (OCV, open-circuit voltage). This difference is called the overpotential ($\eta$) and is also broadly referred to as polarization. Treating polarization as a single number has little meaning, but **decomposing it into three physical components (ohmic / activation / concentration)** lets you diagnose which step is rate-limiting.

The key to polarization decomposition is that each component **responds on a different time scale**. The ohmic term is instantaneous (< μs), charge transfer is ms–s, and diffusion is s–tens of minutes. This time-scale separation is the very reason GITT and EIS exist as two complementary techniques.

## 2. The three components of polarization

Immediately after current is applied, the voltage drop is the ohmic polarization (IR drop), which comes from the simple resistance of electronic/ionic conduction. On a ms–s scale, charge-transfer reactions then build up the activation polarization, and finally over longer times, a Li concentration gradient develops inside the active material producing the concentration polarization.

$$\eta_\text{total} = \eta_\Omega + \eta_\text{ct} + \eta_\text{conc}$$

Physical meaning of each term:
- $\eta_\Omega = IR_s$: the sum of electrolyte, current-collector, and contact resistances. No time dependence.
- $\eta_\text{ct}$: governed by the Butler-Volmer equation. The larger the exchange-current density $j_0$, the smaller it is.
- $\eta_\text{conc}$: arises because diffusion is not fast enough, generating a surface-to-bulk concentration difference. Diverges past the Sand time.

> **Related concept: Butler-Volmer equation**
> The core equation describing the steady-state polarization of an interfacial electron-transfer (charge-transfer) reaction: $j = j_0 \left[\exp\left(\frac{\alpha F \eta}{RT}\right) - \exp\left(-\frac{(1-\alpha)F\eta}{RT}\right)\right]$.
> Each term: $j$ = current density, $j_0$ = exchange current density (the bidirectional flow at equilibrium), $\eta$ = activation overpotential, $\alpha$ = charge-transfer symmetry factor (typically near 0.5), $F/RT \approx 38.9 \text{ V}^{-1}$ at 25 °C.
> Two limits: for small $\eta$ (∣$\eta$∣ ≲ 25 mV) the linear approximation $j \approx j_0 F\eta/RT$ holds → "charge-transfer resistance" $R_\text{ct} = RT/(j_0 F)$ which appears directly as the diameter of the EIS semicircle. For large $\eta$, one term is negligible and the equation reduces to the Tafel approximation $\eta = a + b\log j$.
> Assumptions: single-step electron transfer, near equilibrium, surface concentration = bulk concentration (i.e., concentration polarization neglected). Multi-step reactions or adsorption-mediated reactions require corrections.

The critical time at which concentration polarization diverges is the **Sand time** $\tau_s = \pi D (nFc/2j)^2$; if a galvanostatic current is held past this time, the surface concentration reaches zero and the voltage collapses sharply.

## 3. GITT (Galvanostatic Intermittent Titration Technique)

GITT applies short galvanostatic pulses to perturb the cell slightly, then lets the voltage relax toward equilibrium during long rest intervals. Intuitively, the ratio of the voltage drop $\Delta E_\tau$ during the pulse to the equilibrium recovery voltage $\Delta E_s$ after the pulse provides the diffusivity inside the active material.

> **Related concept: semi-infinite diffusion (Cottrell)**
> When a sudden potential step is applied at a planar electrode, the surface concentration drops to zero immediately, and the diffusion boundary layer thickens with time as $\sqrt{Dt}$. The current during this period follows the Cottrell equation $i(t) = nFAc\sqrt{D/(\pi t)}$, decaying as $1/\sqrt{t}$.
> Each term: $A$ = electrode area, $c$ = bulk concentration, $D$ = diffusivity, $n$ = number of electrons. As long as $\sqrt{Dt}$ is much smaller than the particle size $L$, the "semi-infinite diffusion" assumption holds.
> This is exactly the core premise of GITT: only in the regime where the pulse time $\tau$ satisfies $\tau \ll L^2/D$ does the Cottrell behavior remain valid, and there one can extract $D$ from the ratio of $\Delta E_s$ and $dE/d\sqrt{t}$. If the particle size is unknown or $\tau$ is too long, finite-length diffusion corrections are needed.

Weppner-Huggins equation:
$$D = \frac{4}{\pi} \left(\frac{m_B V_M}{M_B S}\right)^2 \left(\frac{\Delta E_s}{\tau \, (dE/d\sqrt{t})}\right)^2$$

Here $m_B$/$M_B$ is the active-material mass/molar mass, $V_M$ is the molar volume, $S$ is the active surface area, and $\tau$ is the pulse duration. Key assumptions: ① semi-infinite diffusion (pulse time $\ll L^2/D$), ② single-phase region (measure on a slope, not on a plateau), ③ accurately known surface area $S$. In practice, the uncertainty on $S$ is the dominant source of error.

## 4. EIS (Electrochemical Impedance Spectroscopy)

EIS applies a small sinusoidal current/voltage perturbation and measures the response amplitude and phase as a function of frequency. The key idea is that processes with different time scales separate into different frequency regions. On a Nyquist plot, the high-frequency intercept corresponds to $R_s$, the first semicircle to SEI resistance, the second semicircle to charge-transfer resistance $R_\text{ct}$, and the low-frequency 45° line to the diffusion (Warburg) region.

A typical equivalent circuit (Randles form): $R_s$ — [($R_\text{ct}$ ∥ CPE) — $W$]. The CPE (constant phase element) represents the non-ideal double-layer capacitance. The Warburg impedance $Z_W = \sigma\omega^{-1/2}(1-j)$ assumes semi-infinite diffusion.

DRT (Distribution of Relaxation Times) analysis transforms the impedance into a distribution function $g(\tau)$ over time constants $\tau$, and is a non-parametric method for separating time scales without assuming an equivalent circuit a priori. Inverse transformation with Tikhonov regularization is the standard, and in multi-time-scale systems where equivalent-circuit fitting is hard, it directly tells you how many RC elements are needed.

## 5. GITT vs EIS: complementary use

| Aspect | GITT | EIS |
|------|------|-----|
| Domain | Time domain | Frequency domain |
| Primary observable | Diffusivity $D$ | Resistance/capacitance decomposition |
| SOC resolution | Excellent (measured at each SOC) | Moderate |
| Measurement time | Long (hours/SOC) | Short (minutes/SOC) |
| Assumption | Semi-infinite diffusion, single-phase | Linear response, time invariance |

Use GITT to characterize the SOC dependence of the diffusivity, and EIS to decompose resistance components. The standard practice is to use the two together on the same cell for cross-validation.

## 6. Practical tips

The biggest pitfall in polarization measurement is that in **full-cell measurements where the counter electrode also polarizes**, you cannot tell which electrode each contribution comes from. To resolve this, use a 3-electrode cell with a reference electrode, or measure each electrode separately in half-cells.

- **SOC dependence**: $R_\text{ct}$ and $D$ both depend strongly on SOC. Measure at a minimum of 5–10 SOCs.
- **Temperature correction**: $D$, $j_0$, and $R_\text{ct}$ all show Arrhenius behavior, sensitive even to 1 K differences. Use a chamber.
- **Pulse / frequency range**: choose GITT pulse times based on particle size ($\tau < L^2/D$). EIS typically spans 100 kHz – 10 mHz.

## References

- Weppner, W., Huggins, R. A. *Journal of The Electrochemical Society* 124 (1977) 1569 — GITT principle.
- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — standard EIS textbook.
- Wan, T. H. et al. *Electrochimica Acta* 184 (2015) 483–499 — DRT analysis methodology.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — foundations of polarization decomposition theory.
