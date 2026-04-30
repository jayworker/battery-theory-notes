# GITT and PITT (Galvanostatic / Potentiostatic Intermittent Titration)

## 1. Overview

GITT (galvanostatic intermittent titration technique) and PITT (potentiostatic intermittent titration technique) are both time-domain techniques for measuring the **solid-state Li diffusion coefficient** $D_\text{Li}$ as a function of SOC. By applying a short perturbation followed by a long rest period during which the equilibrium recovery is observed, they isolate the diffusion kinetics inside the active-material particles.

Intuitively, the response during the pulse mixes surface and bulk kinetics, while the recovery during the rest period shows the return toward the equilibrium potential—the difference between the two quantifies the time scale of diffusion.

## 2. GITT vs PITT differences

The essential difference between the two techniques is **what is held constant**.

| | GITT | PITT |
|---|------|------|
| Pulse mode | Galvanostatic ($I = $ const) | Potentiostatic ($V = $ const) |
| Quantity measured | $V(t)$ during pulse, $V_\infty$ after pulse | $I(t)$ during pulse |
| Analysis equation | Weppner-Huggins ($\Delta E_s$, $\Delta E_\tau$) | Cottrell ($I \propto t^{-1/2}$) |
| SOC resolution | Excellent (precise SOC increment after pulse) | Moderate |
| Frequency of use | Standard for battery active materials | Thin films / idealized systems |

The reason GITT is overwhelmingly more used in batteries: a galvanostatic pulse increments SOC precisely (e.g., a 0.1C pulse for 1 hour → ΔSOC = 10%), so $D(\text{SOC})$ can be plotted cleanly on the SOC axis. In PITT, the SOC increment is set by integrating a time-varying current, so SOC resolution is worse than in GITT.

> **Related concept: Cottrell equation (semi-infinite diffusion)**
> When a potential step is suddenly applied to a planar electrode, the surface concentration drops to zero immediately, and the diffusion boundary layer thickens as $\sqrt{Dt}$. The current flowing then follows the Cottrell equation $i(t) = nFAc \sqrt{D/(\pi t)}$, decaying as $1/\sqrt{t}$.
> Each term: $A$ = electrode area, $c$ = bulk concentration, $D$ = diffusion coefficient, $n$ = number of electrons. PITT extracts $D$ from the intercept of an $i \cdot \sqrt{t}$ vs $\sqrt{t}$ plot in this Cottrell regime.
> Assumption: semi-infinite diffusion ($\sqrt{Dt} \ll L$, where $L$ is the particle size). The pulse duration must satisfy $\tau \ll L^2/D$ to be valid; if $\tau$ is too long, finite-length corrections are needed.

## 3. Weppner-Huggins equation (GITT standard)

Assuming a simplified Cottrell behavior during the pulse, $D$ is extracted from the equilibrium-potential difference $\Delta E_s$ between just before and just after the pulse and the ratio of $dE/d\sqrt{t}$ during the pulse. The form established by Weppner and Huggins (1977):

$$D = \frac{4}{\pi} \left(\frac{m_B V_M}{M_B S}\right)^2 \left(\frac{\Delta E_s}{\tau \, (dE/d\sqrt{t})}\right)^2$$

Each term: $m_B$ = active-material mass, $V_M$ = active-material molar volume, $M_B$ = active-material molar mass, $S$ = active surface area, $\tau$ = pulse duration, $\Delta E_s$ = equilibrium-potential difference before and after the pulse, $dE/d\sqrt{t}$ = slope of the time-dependent response during the pulse.

Intuition behind the equation: the change in equilibrium potential $\Delta E_s$ immediately after the pulse corresponds to the SOC change (thermodynamics), while $dE/d\sqrt{t}$ during the pulse reflects the rate of surface ion-concentration change (kinetics). Their ratio sets the diffusion time scale.

Approximate simplified form (in a uniform single-phase region):

$$D \approx \frac{4 L^2}{\pi \tau} \left(\frac{\Delta E_s}{\Delta E_\tau}\right)^2$$

Here $L$ = average particle radius and $\Delta E_\tau$ = voltage change during the pulse. This form is the most commonly used in practice.

## 4. Choosing pulse and relaxation times

The reliability of GITT depends on how the pulse time $\tau$ and the relaxation time are chosen.

**Pulse time $\tau$**: for the semi-infinite diffusion assumption to hold, $\sqrt{D\tau} \ll L$, i.e., $\tau \ll L^2/D$. For a particle size $L = 1$ μm and $D = 10^{-10}$ cm²/s, $L^2/D = 10^4$ s ≈ 2.8 h. The pulse time is therefore typically set to 5–30 min (adjusted for particle size).

If the pulse time is too long, the concentration gradient reaches the particle center, finite-length effects appear, and the Weppner-Huggins equation breaks down. If too short, the SOC increment is small and $\Delta E_s$ falls to noise level, making extraction impossible.

**Relaxation time**: until the OCV after the pulse approaches equilibrium. Typically 1–4 h, longer for aged or low-temperature cells. The criterion for reaching equilibrium is OCV rate of change < 0.1–1 mV/h. Without this criterion, an arbitrary 30-min rest leads to inaccurate $\Delta E_s$.

## 5. Application conditions and limitations

The conditions under which the Weppner-Huggins equation can be applied directly are surprisingly narrow.

**(1) Valid only in single-phase (slope) regions**: in a plateau region where a first-order phase transition occurs, $dE/dx = 0$ and the equation diverges. Regions like the LFP 3.43 V plateau are inaccessible to GITT analysis. Slope regions of NMC and NCA are fine.

**(2) Difficulty estimating surface area $S$**: BET surface area, geometric area, and active-material exposed area are all different, and which one to use is ambiguous. BET surface area is most often used in practice, but it includes active material + carbon black + binder and overestimates the truly active area. **A 1-decade error in $S$ is amplified into a 2-decade error in $D$** (it enters the equation as $S^2$).

**(3) Single-particle vs porous-electrode**: Weppner-Huggins assumes single-particle diffusion. A real electrode is a porous structure, and electrolyte diffusion is also involved. Correction with a porous-electrode model such as Doyle-Fuller-Newman is required to isolate the active-material $D$ accurately.

**(4) SOC dependence of $V_M$ / $M_B$**: the molar volume of the active material changes with lithiation, and so does the chemical formula. The prefactor must be updated per SOC for accurate comparison.

Because of these limitations, GITT absolute values are reasonably regarded as uncertain at the order-of-magnitude level, and **relative trends** in the same cell—SOC dependence, temperature dependence, cycle dependence—are more reliable conclusions.

## 6. Typical range of $D_\text{Li}$

Representative measured values of $D_\text{Li}$ (cm²/s) across various active materials:

| Active material | $D_\text{Li}$ range | Notes |
|-----------------|---------------------|-------|
| Graphite | $10^{-10}$ – $10^{-7}$ | Strong stage dependence |
| LiCoO₂ | $10^{-10}$ – $10^{-9}$ | Fast in-plane in layered |
| NMC811 | $10^{-11}$ – $10^{-9}$ | Strong SOC dependence |
| LiFePO₄ | $10^{-14}$ – $10^{-12}$ | 1D channels; difficult to measure in plateau |
| Si | $10^{-12}$ – $10^{-10}$ | Large change with lithiation |
| Li₄Ti₅O₁₂ | $10^{-12}$ – $10^{-10}$ | Spinel, stable |

Overall the range $10^{-9}$ – $10^{-12}$ cm²/s is typical; even in the same material, variation by 1–2 decades with SOC and particle size is common.

## 7. PITT analysis and comparison with GITT

In PITT, at every step the system jumps to a new potential and the current response is recorded. In the region showing Cottrell behavior ($i \propto t^{-1/2}$), $i\sqrt{t}$ becomes constant, and $D$ is extracted from this plateau value.

$$D = \pi \left(\frac{i \sqrt{t}}{nFAc}\right)^2 / c^2$$

Advantages of PITT: because the SOC change during a pulse is small, the SOC resolution of $D(\text{SOC})$ can be finer than in GITT. Disadvantage: the assumption that the surface concentration reaches equilibrium immediately at a potential step is easily broken by SEI / surface resistance, making the separation of surface kinetics and bulk diffusion harder than in GITT.

In practice GITT is the standard, and PITT serves as an auxiliary precision measurement on thin-film electrodes / model systems. Cross-validating $D$ from GITT against $D$ extracted from the EIS Warburg region is the most reliable procedure; if the two disagree, corrections for surface resistance and porous-electrode effects are required.

## References

- Weppner, W., Huggins, R. A. *J. Electrochem. Soc.* 124 (1977) 1569 — original paper on GITT principle and the Weppner-Huggins equation.
- Wen, C. J., Boukamp, B. A., Huggins, R. A., Weppner, W. *J. Electrochem. Soc.* 126 (1979) 2258 — establishment of GITT applications.
- Levi, M. D., Aurbach, D. *J. Phys. Chem. B* 101 (1997) 4630 — standard treatment of PITT analysis.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — porous-electrode correction and single-particle limitations.
- Nickol, A. et al. *J. Electrochem. Soc.* 167 (2020) 090546 — recent summary of GITT limitations and corrections.
