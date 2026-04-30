# Voltage Curve Analysis

## 1. Overview

The voltage-capacity curve (V-Q curve) is the most frequently encountered first-order data in batteries, but the amount of information embedded in it is by no means trivial. Even for the same cathode material, the plateau length, slope steepness, and dQ/dV peak positions of the curve already tell you almost non-destructively which phase-transition region the cell is in and which aging mode is operative.

The "shape" of the curve essentially reflects **how the Gibbs free energy of the material varies with composition**.

This is why V-Q curve analysis is the starting point of battery diagnostics and the interpretive baseline for every subsequent technique (ICA/DVA, GITT, EIS).

One additional perspective: the V-Q curve is effectively a measurement of the chemical potential of the active material as a function of SOC, and the curve shape carries crystal-structure and phase-equilibrium information as a non-destructive thermodynamic fingerprint.

## 2. Plateau vs Slope: thermodynamic meaning

Intuitively, a plateau where the voltage stays nearly constant during charge/discharge is a region where **two phases coexist**.

The chemical potentials of the two phases are equal at equilibrium, so as Li simply transfers from one phase to the other the slope of the free energy stays unchanged.

Conversely, slope regions are intervals where the composition varies continuously inside a **single solid solution**.

When the composition changes the chemical potential changes, and the voltage moves with it.

> **Related concept: Gibbs free energy and electrode potential**
> The cell's equilibrium potential $E$ is directly tied to the reaction's Gibbs free energy change $\Delta G$ via $\Delta G = -nFE$. The chemical potential change when Li enters the active material is precisely the voltage; viewed as a function of composition $x$ (Li/host), the equilibrium potential is determined by the slope of the free energy: $E(x) = -\frac{1}{nF}\frac{\partial G}{\partial x}$.
> In a region where two phases coexist, the chemical potentials of the two phases are equal so $\partial G/\partial x$ is constant, hence the voltage is flat (plateau). In a single solid-solution region the chemical potential varies continuously with composition → curved (slope).
> When concentration is expressed via activity $a$, the equilibrium potential takes the Nernst form $E = E^\circ - (RT/nF)\ln Q$, with $Q$ the activity ratio of oxidized/reduced species. In other words, the V-Q curve is essentially a direct measurement of the activity-composition relationship of the active material.

Representative cases:
- LiFePO₄: first-order phase transition between LiFePO₄ ↔ FePO₄ → very flat plateau near 3.43 V.
- LiCoO₂, NMC family: the layered structure has a wide solid-solution region, so it is overall slope-shaped (a narrow plateau exists in part).
- Graphite: between stages 1, 2, 2L, 3, 4, short plateaus appear in a stepwise fashion at each stage transition.
- Theoretically, the exact plateau voltage is computed from the slope of the common tangent of the free energies of the two phases, and this value coincides with the equilibrium potential given by the Nernst equation.
- Even for the same material, smaller particles can show a slightly tilted and shorter plateau due to surface-energy contributions (size effect; e.g., nano-LFP).

## 3. dQ/dV analysis (Incremental Capacity Analysis, ICA)

The fine plateau/slope variations on a V-Q curve are not easy to see by eye. By plotting voltage on the horizontal axis and capacity per unit voltage (dQ/dV) on the vertical axis, plateaus become **sharp peaks** and slope regions become a low background. ICA is thus a tool for visualizing the "curvature" of the curve.

$$\text{IC}(V) = \frac{dQ}{dV}$$

Here $Q$ is cumulative capacity (C or mAh) and $V$ is cell voltage. Peak positions correspond to the equilibrium potentials of phase transitions, and peak areas give the capacity contribution of each phase-transition interval. As aging progresses, typically (i) the peak height decreases (LAM, loss of active material), (ii) the peak position shifts (resistance increase / SOC shift), and (iii) new peaks may appear (side-reaction products).

In practice, ICA is very sensitive to noise, so it is performed with a **sufficiently low C-rate (typically C/20 to C/10)** combined with smoothing filters such as Savitzky-Golay. Differentiation amplifies noise, so directly differentiating raw data produces meaningless spikes; the smoothing window size is in trade-off with SOC resolution.

In quantitative ICA-peak interpretation the standard metrics are (i) peak area (capacity contribution), (ii) peak position (equilibrium potential), and (iii) FWHM (kinetics indicator), and the trajectories of these three values across cycles serve as the fingerprint for aging-mode diagnosis.

## 4. dV/dQ analysis (Differential Voltage Analysis, DVA)

If ICA is "capacity per voltage", DVA is its inverse: "voltage per capacity". Since the **full-cell curve is the difference of the cathode and anode curves**, dV/dQ retains the characteristic peaks of cathode and anode almost intact when added together, which gives DVA strong diagnostic power. Because graphite stage-transition peaks and cathode phase-transition peaks appear at separate positions, you can distinguish which electrode is aging.

$$\frac{dV}{dQ} = \frac{dV_+}{dQ} - \frac{dV_-}{dQ}$$

LLI (Loss of Lithium Inventory) shows up as the cathode and anode curves slipping past each other (slippage), while LAM shows up as compression of the capacity axis of the affected electrode. The two modes have clearly distinct DVA patterns and can therefore be quantitatively separated (see the models of Bloom, Dubarry, Birkl, etc.). The standard quantitative procedure is (i) acquire reference half-cell curves of the cathode/anode of a fresh cell, (ii) slide and stretch the two curves on the SOC axis to fit the measured full-cell DVA, and (iii) read off LLI from the sliding amount and LAM_PE/LAM_NE from the stretching amounts.

> Aging-mode definitions (LLI/LAM) and mechanisms are treated in detail in [`./06_degradation.md`](./06_degradation.md).

## 5. Hysteresis

Hysteresis is the phenomenon where, at the same SOC, the OCV measured immediately after charging differs from that measured immediately after discharging. There are two origins. **Thermodynamic hysteresis** arises in first-order phase transitions because nucleation barriers cause the equilibrium path to deviate (LiFePO₄ and conversion reactions are typical), while **kinetic hysteresis** is simply due to measurement not having reached equilibrium, leaving residual polarization.

| Type | Cause | Mitigation |
|------|------|----------|
| Thermodynamic | Nucleation/metastable phases | Intrinsically unavoidable (a material-specific property) |
| Kinetic | Polarization, insufficient measurement time | Longer relaxation (GITT), lower C-rate |

Representative cases: the Si anode shows very large path-dependence because its lithiation/delithiation paths go through different crystalline phases, which is a major source of error in SOC estimation. LiFePO₄ is described by a particle-level mosaic model exhibiting partial-two-phase behavior.

## 6. Measurement caveats

Quantitative interpretation of V-Q curves is highly sensitive to measurement conditions. At high C-rates, ohmic drop (IR drop) and concentration polarization both distort the curve, making plateaus appear tilted or shortened. At low temperatures, slowed kinetics produce the same effect.

The following corrections/conditions are essential:
- **C-rate**: for ICA/DVA, C/20 or below is recommended. For diagnostic purposes, C/30 to C/50.
- **IR drop correction**: use the voltage relaxation during the rest interval right after measurement, or correct using $R_s$ obtained by EIS.
- **Formation cycle**: the first 1–3 cycles are abnormal due to SEI formation/structural stabilization and should be excluded from analysis.
- **Temperature control**: 25 ± 1 °C chamber. Entropy effects shift OCV by approximately 0.1–0.5 mV/K.
- **Data sampling rate**: differential analysis requires sufficiently dense sampling (many data points per voltage step). If too sparse, ICA peak positions/widths become inaccurate.
- **Cell rest**: without sufficient OCV stabilization between charge/discharge, residual polarization accumulates on the curve. Typically ≥ 1 h is recommended.

In summary, the V-Q curve is the starting point of every measurement, and small inaccuracies in interpreting it cascade into the reliability of subsequent analyses (ICA/DVA, GITT).

## References

- Dubarry, M., Truchot, C., Liaw, B. Y. *Journal of Power Sources* 219 (2012) 204–216 — standard methodology for ICA/DVA aging diagnostics.
- Bloom, I. et al. *Journal of Power Sources* 139 (2005) 295–303 — separating cathode/anode contributions using DVA.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448–453 — LiFePO₄ mosaic-particle model, thermodynamic origin of hysteresis.
- Birkl, C. R. et al. *Journal of Power Sources* 341 (2017) 373–386 — non-destructive diagnosis of LLI/LAM.
