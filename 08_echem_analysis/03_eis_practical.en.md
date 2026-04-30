# EIS in Practice (Electrochemical Impedance Spectroscopy — Practical)

## 1. Overview

If module 01 (`05_eis_fundamentals`) covered the **theoretical foundation** of impedance—definition, the Randles circuit, Warburg, KK, and DRT—this section organizes the **setup decisions, workflow, and common pitfalls** encountered when an actual potentiostat is turned on for measurement and fitting. In other words, if module 06's polarization decomposition (`02_polarization`) is "how polarization arises", this section is the manual for "how to measure, fit, and validate EIS".

More than 90% of EIS data errors enter not at the fitting stage but at the **measurement-setup stage**. If the AC amplitude is too large, if the DC bias has drifted from OCV, or if the system is drifting while data are being collected, no amount of good fitting can give meaningful results.

## 2. Measurement setup decisions

Before an EIS measurement, five key parameters must be decided. Each governs the data quality.

**(a) Cell configuration**: in a full cell (2-electrode), polarizations of cathode and anode come together and are difficult to separate. For quantitative kinetic measurements a **3-electrode** cell is always recommended (see [`./05_three_electrode.md`](./05_three_electrode.md)).

**(b) DC bias**: set to the potential corresponding to the SOC of interest. The starting point is usually OCV (open-circuit voltage) or 50% SOC. To measure across SOCs, shift SOC by charge/discharge and then apply a **sufficiently long OCV stabilization** (typically 1–4 h, OCV change < 0.1 mV/h) to avoid KK violations.

**(c) AC amplitude**: the standard is 5–10 mV (rms or peak-to-peak—definitions differ between instruments). Smaller amplitudes worsen SNR; larger ones enter the nonlinear regime and increase KK residuals. If halving the amplitude yields the same data, you are in the linear regime; if the data change, the amplitude was too large.

**(d) Frequency range**: typically 10 mHz – 1 MHz. The high-frequency end captures cable inductance and cell inductance; the low-frequency end captures Warburg and the diffusion regime. The number of measurement cycles per frequency must also be set—typically 1–5 cycles at low frequencies and 5–10 cycles averaged at high frequencies.

**(e) Settling time**: measuring immediately after changing the DC bias mixes in a transient. After moving to a new SOC, hold at OCV for 1–4 h before starting the measurement. The longer the cell has aged, the longer the hold should be.

> **Related concept: Kramers-Kronig (KK) validation**
> The real and imaginary parts of impedance determine each other if causality, linearity, and time invariance hold: $Z'(\omega) = Z'(\infty) + (2/\pi) \int_0^\infty [x Z''(x) - \omega Z''(\omega)]/(x^2 - \omega^2) \, dx$.
> In practice, $Z'$ is recomputed from measured $Z''$ via KK, and the residual is checked: within 1–2% is reliable, beyond which one should suspect SOC drift, nonlinear amplitude, or system change.
> Assumption: all three conditions (causality / linearity / time invariance). To diagnose which assumption is violated, halve the amplitude or extend the OCV stabilization—if either change reduces the residual, the cause is confirmed as nonlinearity / drift.

## 3. Fitting workflow

The standard flow of good fitting comprises the following five steps. Skipping a step undermines the conclusion of the next.

**Step 1 — Visual inspection**: view Nyquist + Bode together. How many semicircles are there? Is a 45° line visible? Is there an inductive tail at high frequency? Build the visual impression of the data first. Look at the data's features before fitting a circuit to them.

**Step 2 — KK validation**: a primary data-quality check. If the residual is above 1–2%, do not even start fitting—go back to measurement. Any value obtained by fitting data with large KK residual is meaningless.

**Step 3 — Equivalent-circuit selection**: start with a simple Randles ($R_s$ + $R_\text{ct}$ ∥ $C_\text{dl}$ + $W$). If two semicircles are visible, add a series RC ($R_s$ + ($R_\text{SEI}$ ∥ $C_\text{SEI}$) + ($R_\text{ct}$ ∥ $C_\text{dl}$) + $W$). For a high-frequency inductive tail, add a series $L$ element. **Keep the circuit minimal—add elements only as the data features demand**; the more elements added, the better the fit looks but the meaning is lost.

**Step 4 — Residual analysis after fitting**: a residual that is random in frequency means a good fit; a systematic pattern (large residual at low frequency, or sigmoidal shape) means the circuit is inadequate. The distribution of the residual itself is the verification tool for circuit selection.

**Step 5 — Physical-consistency check**: are the extracted values reasonable? Is $C_\text{dl}$ around 30 μF/cm² (typical of the double layer)? Does $R_\text{ct}$ behave appropriately with SOC and temperature? Does $\sigma_W$ agree with $D$ from GITT? Even if the numbers fit, fitting has failed if the physics doesn't.

## 4. Non-uniqueness of fitting and circuit selection

The biggest pitfall of EIS fitting is **non-uniqueness**. A well-known problem is that two or more circuits fit the same data equally well. Example: a series ($R_1$ ∥ $C_1$) + ($R_2$ ∥ $C_2$) and an unusual branched circuit may fit equally well to within numerical < 1% difference.

Three remedies:
- **Fix the circuit topology with physical prior information**: SEI on the anode surface, charge transfer at the active-material surface, Warburg in the bulk. This mapping fixes the circuit structure.
- **Confirm the number of time constants by DRT analysis**: number of DRT peaks = number of RC elements needed. An objective guide for circuit-topology selection.
- **Measure across SOC and temperature to confirm trends**: a circuit that is ambiguous from a single measurement is often determined once the SOC dependence is examined.

## 5. Common pitfalls

The most frequent mistakes in the lab. Knowing each is what guarantees data reliability.

**(1) AC amplitude too large**: 50 mV gives nice SNR but is in the nonlinear regime. Always check by halving the amplitude.

**(2) Scan too fast**: the low-frequency end (10 mHz) takes 100 s per cycle. Five-cycle averaging is 500 s. 5 SOCs × 5 cycles × 100 s = 12,500 s ≈ 3.5 h. Reducing the number of measurement cycles to shorten this collapses the SNR.

**(3) Fitting two semicircles with a single CPE**: when two RCs with nearby time constants appear as one asymmetric semicircle, fitting them with a single CPE produces a good fit but merges the two processes and loses information. Always check via DRT whether two peaks appear.

**(4) Ignoring the high-frequency inductive tail**: cutting off or excluding the region below the real axis in Nyquist makes $R_s$ extraction inaccurate. Treat it explicitly with a series $L$ element.

**(5) Reference-electrode placement**: in a 3-electrode cell, if the reference is far from the working electrode or sits in a region of non-uniform current distribution, an additional ohmic drop enters the measured impedance ([`./05_three_electrode.md`](./05_three_electrode.md)).

**(6) SOC drift**: insufficient OCV stabilization before measurement. Measuring while the cell self-discharges and SOC changes violates KK.

**(7) Cable / grounding noise**: 50/60 Hz line noise corrupts data near that frequency. Use a Faraday cage, twisted pair, and shielded cables.

**(8) Forcing data into a standard circuit catalog**: when the data features differ from the standard circuits, build a new circuit. Fit the circuit to the data, not the data to the circuit.

## 6. SOC and temperature dependence measurements

The real power of EIS comes not from a single measurement but from an **SOC × temperature matrix**. Measuring at 5–10 SOCs × 3–5 temperatures and viewing the trend of each circuit element directly reveals which process is sensitive to SOC and which exhibits Arrhenius behavior.

Standard matrix example:
- SOC: 10, 30, 50, 70, 90% (5 points)
- Temperature: 5, 25, 45 °C (3 points)

After fitting at each (SOC, T), if the extracted $R_\text{ct}$ gives a straight line on a $\ln R_\text{ct}$ vs $1/T$ plot, the activation energy $E_a$ can be extracted. SEI resistance and charge transfer show different $E_a$ values, providing verification of the separation of the two processes.

## 7. Cross-checking measurement results

EIS alone always leaves fitting uniqueness in question, and cross-validation with other techniques is standard.

- $R_\text{ct}$ → check consistency with $j_0$ from the CV Tafel slope ([`./01_cv.md`](./01_cv.md)).
- Warburg $\sigma$ → check consistency with $D$ from GITT ([`./04_gitt_pitt.md`](./04_gitt_pitt.md)).
- $R_s$ → 4-probe measurement or a separate conductivity measurement.
- SEI resistance → thickness measurement by dilatometry / XPS.

If this cross-check breaks, the circuit selection is wrong, and drawing a conclusion from a single EIS result alone is risky.

## References

- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — standard treatment of measurement setup and fitting workflow.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — chapters on KK validation and residual analysis.
- Boukamp, B. A. *Solid State Ionics* 169 (2004) 65 — practical algorithm for KK validation.
- Macdonald, J. R., Barsoukov, E. (eds.) *Impedance Spectroscopy* (3rd ed., Wiley, 2018) — circuit catalog and discussion of non-uniqueness.
- Wan, T. H. et al. *Electrochim. Acta* 184 (2015) 483 — circuit-topology determination using DRT.
- Vivier, V., Orazem, M. E. *Chem. Rev.* 122 (2022) 11131 — recent practical EIS review.
