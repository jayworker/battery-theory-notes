# 3-Electrode Cell (Three-Electrode Cell Setup)

## 1. Overview

Full-cell (2-electrode) measurements have an intrinsic limitation: the polarizations of cathode and anode arrive together, and the contribution of each electrode cannot be separated. A **3-electrode cell** separates the working electrode (WE), counter electrode (CE), and reference electrode (RE), allowing precise measurement of only the WE polarization with respect to the RE.

Intuitively, the RE acts as a "potential ruler" that maintains a stable potential without passing any current and measures the WE potential. Because the CE accepts the current, the RE can hold its equilibrium potential without current load.

The reason 3-electrode is the standard for precise kinetic measurements such as GITT, EIS, and CV: in a full cell only a single combined impedance is visible, mixing the cathode and anode $R_\text{ct}$, the two SEIs, and the two Warburg contributions; in a 3-electrode setup the impedance of one electrode is cleanly isolated.

## 2. 2-electrode vs 3-electrode

| | 2-electrode (full cell) | 3-electrode |
|---|------------------------|-------------|
| Number of electrodes | WE + CE | WE + CE + RE |
| Measured potential | WE − CE difference | WE − RE (CE polarization ignored) |
| Polarization separation | Not possible | Possible |
| Cell assembly | Simple | Adding RE complicates it |
| Use | Cell-performance assessment | Electrode-kinetics separation |

The flow of battery R&D: new active-material evaluation → half-cell (Li metal vs new material; nominally 2-electrode but Li acts as RE) → cell-kinetics analysis → add 3-electrode → full-cell verification.

The reason a half-cell, although effectively 2-electrode, can use Li as RE: Li metal has a very stable equilibrium potential and a large surface area, so its polarization is negligible at small currents. Note, however, that at high rates the Li counter also polarizes, so adding a separate RE is recommended for precision measurements.

## 3. Reference electrode selection

RE selection depends on the system (aqueous vs non-aqueous), potential window, stability, and reproducibility.

**(a) Li metal (non-aqueous standard)**: the Li/Li⁺ equilibrium is very stable (−3.04 V vs SHE). The most common RE across the entire range of lithium-ion batteries. Advantages: well-defined equilibrium potential; the measured potential directly references Li/Li⁺. Disadvantages: the Li surface becomes covered with SEI over time, and the potential can drift slightly.

**(b) Ag/AgCl (aqueous standard)**: equilibrium potential of +0.197 V vs SHE in saturated KCl. Standard RE for aqueous systems and biological samples. Advantages: very stable, excellent reproducibility. Disadvantages: Cl⁻ leakage into the system can cause side reactions.

**(c) SCE (Saturated Calomel)**: saturated KCl + Hg/Hg₂Cl₂. +0.241 V vs SHE. Once the standard, but increasingly replaced by Ag/AgCl due to Hg environmental concerns.

**(d) LRO (Lithium Reference Oxide)**: a stable lithium-bearing oxide such as Li₄Ti₅O₁₂. Equilibrium potential nearly independent of SOC (the LTO 1.55 V plateau) and more stable than Li metal. Increasingly the standard for precision non-aqueous measurements.

**(e) Pseudo-reference**: a simple Pt or Ag wire. The equilibrium potential is ill-defined, but it is sufficiently stable in time to serve as a relative potential reference for a single measurement. **Caveat**: the absolute potential is meaningless and must be calibrated before and after measurement against a known redox couple (e.g., ferrocene). Drift is the major pitfall.

> **Related concept: Nernst equation and RE stability**
> The equilibrium potential of an RE is set by the Nernst equation $E = E^\circ - (RT/nF) \ln Q$. Ag/AgCl: $E = E^\circ_\text{Ag/AgCl} - (RT/F) \ln a_{Cl^-}$; if the Cl⁻ activity is constant (saturated KCl), the potential is constant.
> Stability of a Li-metal RE: the Li/Li⁺ equilibrium is fast and the surface area is large, so polarization at small measurement currents (μA) is negligible. As SEI formation proceeds, however, the surface potential drifts at the microvolt–mV level.
> Assumption: current through the RE ≈ 0 (high-impedance input of the potentiostat). If unintended current flows through the RE, its own polarization enters the measurement and every conclusion is offset.

## 4. RE placement and the Luggin capillary

The physical position of the RE determines measurement accuracy. Core principle: **the RE tip must be sufficiently close to the WE surface but must not block the WE-CE current path**.

**Uniformity of current distribution**: the field lines between WE and CE should be uniform. If the RE sits in a non-uniform region, an additional ohmic drop $iR_\Omega$ enters the measured potential. In sandwich structures such as coin cells, it is easy to place the RE at the edge, where the current distribution is non-uniform and the measurement is therefore inaccurate.

**Luggin capillary**: the standard tool for bringing the RE very close to the WE surface. A thin glass capillary (tip diameter of a few mm) is filled with RE solution, and one end is placed near the WE surface (typically at 2–3 tip diameters). This eliminates almost all of the ohmic drop $iR_s$ in the measured potential.

If the Luggin tip is too close (< 1 tip diameter) it shadows the current distribution at the WE surface, introducing a different non-uniformity; too far (> 5 tip diameters) and the ohmic drop returns. The standard is 2–3 tip diameters.

**Micro-reference electrode**: a very small RE (diameter < 100 μm) inserted directly inside the cell. The standard way to put an RE in coin cells and pouch cells. Usually made by plating Li metal onto Cu wire and inserting it between the active layers. Placed in the center of a planar current distribution, it requires almost no ohmic-drop correction.

## 5. Risks of pseudo-references

In non-aqueous systems where building a stable RE is difficult, **pseudo-references** (Ag wire, Pt wire, Cu wire, etc.) are often used temporarily. The pitfalls in this case:

**(1) Time drift**: as surface oxidation and adsorption proceed, the equilibrium potential drifts by mV to tens of mV with time. For long measurements (more than a few hours), the absolute potential of the result is meaningless.

**(2) System dependence**: even the same Ag wire shows a different equilibrium potential depending on the electrolyte type and ionic strength. Comparison across cells is difficult.

**(3) Calibration is mandatory**: a known redox couple such as ferrocene/ferrocenium (Fc/Fc⁺) must be measured before and after to calibrate the pseudo-RE potential. The Fc/Fc⁺ equilibrium potential (vs SHE) depends on solvent but has IUPAC-standardized values.

**(4) Precision kinetics impossible**: GITT (which measures $\Delta E_s$ at the mV level) is buried in noise when the RE drifts at mV/h. For this reason precision measurements always use stable REs (Li metal, Ag/AgCl, LRO).

## 6. Caveats during measurement and troubleshooting

Signs that a 3-electrode cell is malfunctioning, and diagnostics.

- **CV asymmetrically distorted**: RE in a non-uniform current-distribution region. Check the Luggin tip position.
- **Anomalously large inductive tail in EIS**: inductance / cable issues between RE and WE. Use cable shielding and twisted pair.
- **OCV drifts steadily with time**: a pseudo-RE in use. Apply Fc calibration or replace with a stable RE.
- **WE polarization in 3-electrode does not sum to full-cell polarization**: only part of the ohmic drop is separated due to wrong RE placement. Re-tune the Luggin distance or the micro-RE position.
- **Low-frequency EIS noise blow-up**: RE impedance too high (clogged capillary or thin wire). Replace the RE.

Adding a micro-RE to a coin cell (e.g., Andre-style 3-electrode coin cell, EL-Cell PAT-Cell) is the most common option in graduate-school labs; it allows measurements in nearly the same form as a full cell while still separating cathode and anode, and has become a standard tool.

The results of a 3-electrode cell should always be cross-checked against the full cell. WE polarization + CE polarization ≈ full-cell polarization; if it does not match, there is a problem with the RE placement or cell configuration.

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Ch. 1, 11: standard treatment of cell configurations and REs.
- Sahapatsombut, U. et al. *J. Power Sources* 243 (2013) 758 — 3-electrode coin-cell design and the impact of RE placement.
- Costard, J., Ender, M., Weiss, M., Ivers-Tiffée, E. *J. Electrochem. Soc.* 164 (2017) A80 — precision EIS using a micro-RE.
- Solchenbach, S., Pritzl, D., Kong, E. J. Y., Landesfeind, J., Gasteiger, H. A. *J. Electrochem. Soc.* 163 (2016) A2265 — design of a stable RE (LTO-based) for Li-ion cells.
- Pavlov, D. *Lead-Acid Batteries: Science and Technology* (2nd ed., Elsevier, 2017) — Ch. 5: use and limitations of pseudo-REs.
