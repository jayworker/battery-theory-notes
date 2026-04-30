# LSV and Tafel Analysis (Linear Sweep Voltammetry & Tafel Analysis)

## 1. Overview

Linear sweep voltammetry (LSV) is the unidirectional version of CV—the potential is swept slowly in one direction while the current is recorded. It has two typical uses: (1) determining the **electrolyte stability window**—the point at which the current suddenly surges at the oxidation / reduction limit potential, and (2) **extracting the Tafel slope**—quantifying electrode kinetics from the slope of $\eta$ vs $\log j$ in a sufficiently large overpotential region.

Whereas CV is strong for diagnosing reversibility and redox couples, LSV is the standard for quantitative analysis of irreversible unidirectional reactions (electrolyte decomposition, OER/HER, corrosion).

## 2. Measuring the electrolyte stability window

The usable potential range in a battery is limited by the region where the electrolyte does not decompose. The oxidation limit is determined by an LSV swept in the anodic (oxidation) direction; the reduction limit by an LSV in the cathodic (reduction) direction.

Intuitively, in the stable region the current is nearly zero (only double-layer charging and self-discharge), and at the decomposition onset potential the current surges exponentially. The first potential exceeding an arbitrary threshold current (typically 10 μA/cm²) is taken as the decomposition limit.

**Measurement procedure**:
- WE: an inert electrode (Pt, Au, GC)—to separate the active-material redox from decomposition reactions.
- Surface-area normalization (current-density basis) is essential when measuring electrolyte stability windows.
- Scan rate: 0.1–10 mV/s (slower is more accurate but the measurement time grows).
- Anodic limit: sweep from OCV to +6.0 V (vs Li/Li⁺).
- Cathodic limit: sweep from OCV to 0 V (vs Li/Li⁺).

**Pitfall in defining the threshold current**: 10 μA/cm² is conventional, but 1 μA/cm² or 100 μA/cm² are also used depending on the surface area and electrolyte system. The threshold criterion must always be specified when reporting.

Representative values (vs Li/Li⁺):
- LP30 (1 M LiPF₆ in EC:DMC): oxidation ~4.5 V, reduction ~1.0 V
- Polymer electrolyte (PEO-based): oxidation ~4.0 V, reduction ~0 V
- Solid electrolyte (LLZO): oxidation ~5.0+ V, reduction ~0 V
- Aqueous: ~1.23 V (water-splitting limit)

These values are the starting point for the actual cell window; on the active-material surface, side reactions (catalysis) can narrow it further, requiring separate verification.

## 3. Extracting the Tafel slope

In the high-overpotential region one term of the Butler-Volmer equation becomes negligible, and the remaining single exponential leads to a linear relation between $\log|j|$ and $\eta$—Tafel behavior. Intuitively, the activation barrier is tilted strongly to one side, simplifying the picture so that the rate in that direction grows exponentially.

> **Related concept: Tafel limit of Butler-Volmer**
> When $|\eta| \gtrsim 100$ mV in the galvanostatic polarization equation $j = j_0[\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$, one exponential is negligible compared to the other, leaving a single exponential $j \approx j_0 \exp(\alpha F\eta/RT)$.
> Taking $\log_{10}$ on both sides: $\log j = \log j_0 + \alpha F\eta/(2.303 RT)$. Rearranging gives the Tafel equation $\eta = a + b \log j$, with slope $b = 2.303 RT/(\alpha F)$.
> Assumptions: single-step electron transfer, surface concentration = bulk concentration (concentration polarization neglected), large $\eta$. For multistep reactions, an apparent $\alpha_\text{app}$ is used as a correction.

Standard values at 25 °C:

$$b = \frac{2.303 RT}{\alpha F} \approx \frac{59 \text{ mV}}{\alpha}$$

| $\alpha$ | $b$ (mV/dec) | Meaning |
|----------|--------------|---------|
| 0.5 | 118 | Symmetric single-step electron transfer |
| 1.0 | 59 | Chemical step is RDS after first electron transfer |
| 2.0 | 30 | Very fast multielectron |
| 0.25 | 240 | First step is RDS, asymmetric |

**Measurement procedure**:
- Linear fit in a sufficient overpotential region (typically a region with a clear 75–150 mV/dec straight line).
- Extrapolate to $\eta = 0$ → the intercept is $\log j_0$.
- Plot form: x-axis = $\eta$ (V), y-axis = $\log_{10} |j|$ (A/cm²); or x-axis = $\log j$, y-axis = $\eta$.

The Tafel region typically begins around $|\eta| > 50$–$100$ mV and ends just before concentration polarization sets in (typically at $|\eta| < 250$ mV). Outside this window, a linear fit is meaningless.

**Extracting $j_0$**: extrapolate the Tafel line to $\eta = 0$ → $\log j_0$. Representative values:
- HER on Pt: $j_0 \sim 10^{-3}$ A/cm² → $\log j_0 \approx -3$
- HER on Hg: $j_0 \sim 10^{-12}$ A/cm² → $\log j_0 \approx -12$ (a 9-decade difference)
- Li-ion cathode surface: $j_0 \sim 10^{-5}$ – $10^{-3}$ A/cm²

## 4. How Tafel slopes change for multistep reactions

Single-step electrode reactions are rare in practice; the Tafel slope changes depending on which step is the RDS (rate-determining step). Reading the slope value to back-trace the RDS is the standard mechanism analysis.

Typical slopes for **ORR (4e⁻ oxygen reduction)**:
- 60 mV/dec: chemical step is RDS after the first electron transfer (Heyrovsky)
- 120 mV/dec: first electron transfer is RDS (Volmer)
- 30 mV/dec: fast first electron transfer + Tafel step (Tafel-Volmer)

For **HER (2e⁻ hydrogen evolution)**:
- 30 mV/dec: Tafel step is RDS (recombination)
- 40 mV/dec: Heyrovsky step is RDS
- 120 mV/dec: Volmer step is RDS

For **OER (4e⁻ oxygen evolution)**: 60–120 mV/dec, depending on catalyst.

If the Tafel slope of the same system shifts as cycling proceeds, the RDS has changed—a signal of surface reconstruction, SEI formation, etc. The trend is more reliable information than the absolute value of a single measurement.

## 5. Aqueous vs non-aqueous systems

The application of Tafel analysis differs subtly between aqueous and non-aqueous systems.

**Aqueous systems**: concentration polarization sets in early (many species have smaller diffusion coefficients than in non-aqueous), so the Tafel region is narrow. The standard tool is the RDE (rotating disk electrode)—forced convection removes concentration polarization, extending the Tafel region. Combined with Koutecky-Levich analysis to separate surface kinetics and mass transport.

**Non-aqueous (batteries)**: concentration polarization is relatively small but the ohmic drop is large (low electrolyte conductivity). iR correction is essential, and uncorrected Tafel slopes are always overestimated.

Tafel analysis of battery active materials is usually performed on thin-film electrodes or thin coatings—thick electrodes distort the Tafel slope through porous-electrode effects. To draw meaningful conclusions from measurements on thick electrodes, separation must be performed using Newman's porous-electrode model.

## 6. Caveats during measurement

Common errors in LSV / Tafel analysis:

- **Scan rate too fast**: the surface does not reach equilibrium before the sweep ends, producing spurious hysteresis. Typically 0.1–1 mV/s.
- **No iR correction**: decomposition limits or Tafel slopes are overestimated. Apply positive feedback or post-processing correction.
- **Concentration polarization intrusion**: the upper end of the Tafel region curves upward, departing from a straight line. Narrow the linear-fit region.
- **Threshold current criterion unclear**: when reporting a stability window, always specify the threshold current (e.g., 10 μA/cm²).
- **Inaccurate surface area**: $j$ is converted incorrectly, offsetting $\log j_0$ entirely. Specify whether geometric, BET, or ECSA is used.
- **Drawing conclusions from the first sweep alone**: surface-conditioning effects make the first sweep differ from the steady sweep. Typically use a stable curve after 3–5 sweeps.

In the reversible region of CV ([`./01_cv.md`](./01_cv.md)), Tafel analysis is meaningless (both terms of BV remain). Tafel is intrinsically a tool for the irreversible / quasi-reversible region; failing to recognize this distinction—and fitting in the wrong region to obtain a meaningless apparent $\alpha$—is the most common pitfall.

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Ch. 3: standard treatment of Butler-Volmer and the Tafel slope.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — Ch. 6: practical LSV and Tafel.
- Bockris, J. O'M., Reddy, A. K. N. *Modern Electrochemistry* Vol. 2A (Kluwer, 2000) — interpretation of Tafel slopes for multistep reactions.
- Shinagawa, T., Garcia-Esparza, A. T., Takanabe, K. *Sci. Rep.* 5 (2015) 13801 — common pitfalls of Tafel analysis (HER case study).
- Xu, K. *Chem. Rev.* 104 (2004) 4303 — standard measurement of non-aqueous electrolyte stability windows and the application of LSV.
