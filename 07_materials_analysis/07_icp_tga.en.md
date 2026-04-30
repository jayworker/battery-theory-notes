# ICP and TGA-DSC (Elemental Quantification & Thermal Analysis)

## 1. Overview

ICP (inductively coupled plasma) and TGA-DSC (thermogravimetric analysis – differential scanning calorimetry) cover two kinds of quantification — elemental content and thermal stability. Both are decisive for questions other techniques (XRD, XPS, SEM) cannot answer.

ICP quantifies, at the ppb level, the amount of transition metals (TMs) leaching out of the cathode surface into the electrolyte; this serves as direct evidence for the mechanism by which they migrate to the anode and damage the SEI. TGA-DSC evaluates the thermal stability of the cathode and electrolyte from the decomposition onset temperature, separately quantifies residual moisture and crystal water, and is the starting point for [thermal-runaway](../06_battery_operation/05_thermal.md) risk assessment.

This section bundles the two techniques and covers the differences between ICP-MS and ICP-OES, TM-dissolution quantification procedures, ppb detection limits, TGA temperature programs, interpretation of decomposition onsets, and how to distinguish crystal water from side-reaction products.

## 2. ICP principle — plasma atomization

ICP brings the sample into liquid form, then nebulizes, vaporizes, atomizes, and ionizes it in an ICP torch (rf-induced 7000–10000 K argon plasma), and finally quantifies it by one of two detection schemes. **OES (optical emission spectroscopy)** measures the characteristic emission lines emitted as ions/atoms drop from excited to ground states. **MS (mass spectrometry)** separates ions by mass-to-charge ratio (m/z) for quantification.

Intuition: ICP is the most powerful quantification tool for asking "what elements are in this sample, and how much?" The high temperature of the plasma breaks nearly all chemical bonds, leaving atoms/ions and minimizing matrix effects.

> **Related concept: ICP-MS vs ICP-OES**
> ICP-OES: detection limit ppm–ppb; simultaneous multi-element analysis; possible spectral interferences among emission lines. Lower cost and operational burden.
> ICP-MS: detection limit **ppt–ppb (1000× more sensitive)**; isotope analysis possible; simultaneous multi-element. Drawbacks: strong matrix effects; polyatomic interferences at the same m/z (e.g., ⁴⁰Ar¹⁶O overlapping ⁵⁶Fe) → require a collision/reaction cell (He, H₂) or high-resolution MS.
> Assumptions: in both methods, the sample must be fully dissolved, and drift must be corrected via an appropriate internal standard.
> Intuition: OES if ppm-level quantification is enough; MS for sub-ppb work or isotope tracking.

Battery application priorities: QC of the Li/TM molar ratio in cathode synthesis batches → OES is sufficient; ppb-level quantification of Mn on the anode surface after cycling → MS is required.

## 3. TM dissolution quantification — acid digestion after anode harvest

The procedure for quantifying TM deposited on the anode surface after cycling is standardized. The key is to **transfer all TM into solution, then inject it into the ICP**.

Standard procedure:
1. Disassemble the cell in a glovebox and isolate the anode.
2. Lightly rinse residual LiPF₆/EC with DMC or EMC (3 times).
3. Cut the anode (typically 1 cm², or measure the area precisely) and grind it.
4. **Acid digestion**: microwave digestion in concentrated HNO₃ + HCl (aqua regia) or HNO₃ + H₂O₂ (typically 200 °C, 30 min). Use a PTFE vessel (to handle HF byproducts).
5. Confirm complete dissolution (residual graphitic carbon can be removed by filtration; TM is fully in solution).
6. Filter through a 0.45 µm membrane and dilute to a known volume.
7. ICP-MS quantification (Mn ⁵⁵, Co ⁵⁹, Ni ⁵⁸/⁶⁰).
8. Blank correction, standard calibration curve (0.1–100 ppb, 5–6 concentration points), recovery verification (spike test).

Reporting units: per anode area (µg/cm²), per active-material mass (µg/g_anode), or per cell capacity (ppm of total cathode TM). Plotted against cycle number, the dissolution acceleration point can be directly mapped onto aging data.

Typical values: after 100 cycles of an NMC811 cell, anode-side Mn deposition is ~10–100 µg/cm² and Ni is ~5–30 µg/cm². Although only 1–5% of the total cathode TM, this is enough to damage the SEI.

## 4. ppb limits and matrix effects

The limit of detection (LOD) of ICP-MS is typically ppt–ppb based on 3σ of the signal, but the actual limit of quantification (LOQ, 10σ) is roughly 10× higher. For Mn quantification of SEI decomposition products, an LOQ of 0.1 ppb is sufficient.

Avoiding matrix effects:
- **Internal standard**: spike elements close in m/z to the analyte (⁴⁵Sc, ¹⁰³Rh, ¹⁸⁵Re) → corrects for drift and plasma-efficiency variation.
- **Standard addition**: run a calibration curve made by spiking the standard into the sample → ensures matrix consistency.
- **Dilution**: dilute the matrix concentration itself (very high Li concentrations stress the plasma).
- **CRM (certified reference material)**: validate the method with certified samples like NIST SRM.

Standard polyatomic interferences: ⁴⁰Ar¹⁶O⁺ → ⁵⁶Fe interference; ⁴⁰Ar¹²C⁺ → ⁵²Cr interference; ⁴⁰Ar²³Na⁺ → ⁶³Cu interference. He collision cells or H₂ reaction cells are the most common solutions.

## 5. TGA — temperature program and mass change

TGA heats the sample under a defined program (e.g., 10 °C/min, RT–1000 °C, in N₂ or air) and records mass changes with µg precision. Each step in the curve corresponds to a specific decomposition/desorption event.

Intuition: as the sample heats up, every time something escapes the mass drops, and the onset temperature and mass-loss magnitude characterize that event (moisture, crystal water, decomposition, etc.).

Meaning of the choice of atmosphere:
- **N₂ (inert)**: only decomposition is measured, without oxidation. Polymer-binder decomposition, moisture / crystal-water desorption, and reductive-decomposition events are seen.
- **Air / O₂**: oxidation events become visible. Conductive carbon is stable in N₂ but oxidizes in air at ~500–700 °C. Oxygen release from active materials is also clearly seen.
- **5% H₂ / Ar**: reducing atmosphere. Reduction steps of oxides are visible.

Heating rate is a trade-off: faster saves time, slower gives better resolution. 5–10 °C/min is the standard. With coupled MS (EGA, evolved-gas analysis) or FTIR, the decomposition gases can be identified simultaneously.

## 6. Residual moisture vs crystal water vs side-reaction products — diagnosis by temperature

Typical events and temperatures seen in the TGA of battery active materials:

| Temperature range (°C) | Event | Comment |
|----------------|------|--------|
| **<100** | Surface-adsorbed moisture (physisorbed H₂O) | Drying step |
| **100–150** | Residual solvents (DMC, EC traces) | Cycled samples |
| **~200** | **Crystal water** | Surface –OH, LiOH·H₂O |
| 200–250 | Electrolyte decomposition (DEC, EMC) | Confirm with MS-coupled |
| 250–300 | LiPF₆ decomposition (→ LiF + PF₅) | Samples containing the electrolyte additive |
| 300–400 | **Onset of cathode oxygen release** | Strong in air (lower for Ni-rich) |
| 350–500 | Polymer binder decomposition (PVDF) | Anode/cathode sheets |
| 500–700 | Conductive carbon oxidation (in air) | Quantify carbon content by air–N₂ comparison |
| 700–900 | Decomposition of the active material itself | Cathode oxide → spinel/rock-salt |

The mass loss percentage at each step gives the content directly. Example: 5% loss in 500–600 °C air → 5 wt% conductive carbon. 1% loss around 200 °C → 1 wt% LiOH·H₂O (or surface hydroxide).

The mass ratio of an anode graphite + Si composite can also be separated and quantified by air-TGA — Si oxidizes to SiO₂ above 700 °C in air with a mass gain, while graphite oxidizes and loses mass at the same temperature. The net change of the two opposite-sign events separates the ratio.

## 7. DSC — exothermic/endothermic events and decomposition onset

DSC measures the heat-flow difference between sample and reference under the same temperature program, separating exothermic and endothermic events. Simultaneous TGA-DSC measurement (STA, simultaneous thermal analysis) is standard, viewing mass and heat changes at the same temperature.

Typical events:
- Loss of crystal water: endothermic (~200 °C)
- LiPF₆ decomposition: exothermic (~250 °C)
- Lattice oxygen release from the cathode: **strong exotherm** (300–400 °C; lower for Ni-rich → ~280 °C)
- Graphite anode + electrolyte (in lithiated state): exothermic (~80 °C SEI decomposition; ~250 °C lithiated graphite + electrolyte)
- Si oxidation: strong exotherm (>700 °C in air)

**Thermal-runaway assessment**: the cathode oxygen-release onset and exotherm magnitude are the primary indicators of thermal-runaway risk. Even within the NMC family, the risk ranks NMC111 ($T_\text{onset}$ ~310 °C) > NMC622 (~290 °C) > NMC811 (~270 °C). Cross-check against ARC (accelerated rate calorimetry) measurements of single-NMC-cathode + electrolyte mixtures.

DSC peak area ($\int dq/dt \cdot dt$) = heat release (J/g). Calibrated using standard sapphire or indium.

## 8. Sample preparation and common pitfalls

Both ICP and TGA hinge on sample prep.

**ICP prep pitfalls**:
- Incomplete digestion → low recovery. If residual black graphite is visible, additional digestion is required (HF + HNO₃ microwave).
- When using HF, a PTFE vessel is mandatory; safety glasses and gloves are required.
- Use polypropylene tubes (glass can introduce ⁵⁶Fe contamination).

**TGA prep pitfalls**:
- Sample mass: 5–20 mg standard. Too little gives noise; too much causes thermal lag and inaccurate onsets.
- Crucible choice: Pt (>1000 °C), Al₂O₃ (1500 °C, inert), Al (low temperature, polymers).
- Atmosphere gas flow: 50–100 mL/min. Too low leaves reaction gases inside, altering the decomposition environment; too high creates noise.
- Air-sensitive samples: seal the crucible inside the glovebox and unseal only just before measurement → still hard to standardize. If possible, prepare under N₂.

**Reporting checklist**: heating rate (°C/min), atmosphere gas + flow rate, sample mass, crucible type, baseline subtraction method (empty-crucible scan). Without this information, reported onset temperatures cannot be compared.

## 9. Coupled techniques — TGA-MS, ICP speciation

Standalone TGA tells you only what is leaving, not where it goes. Coupled techniques fill this gap:
- **TGA-MS**: identifies decomposition gases in real time with a quadrupole MS. Tracks m/z 18 (H₂O), 28 (CO/N₂), 44 (CO₂), 64 (SO₂), and 19 (F) to quantify which gas escapes at which temperature. Cathode oxygen release is followed directly via m/z 32 (O₂).
- **TGA-FTIR**: a gas line carries decomposition gases into an FTIR cell for IR absorption spectra. Strong for identifying carbonate-solvent decomposition products.
- **ICP-MS speciation (HPLC-ICP-MS)**: separates the oxidation states of TMs (Mn²⁺ vs Mn⁴⁺) — bare ICP gives only the total concentration. Used when distinguishing Mn oxidation states inside the SEI is required.

These coupled measurements all carry greater time and equipment burden than standalone runs but are decisive for mechanism elucidation. For cathode thermal-stability research, simultaneous TGA-DSC-MS has become the standard.

## References

- Skoog, D. A., Holler, F. J., Crouch, S. R. *Principles of Instrumental Analysis* (7th ed., Cengage, 2017) — standard ICP/TGA textbook.
- Thomas, R. *Practical Guide to ICP-MS* (3rd ed., CRC, 2013) — practical ICP-MS guide.
- Gachot, G. et al. *Analytical Chemistry* 83 (2011) 478–485 — GC-MS-based analysis of electrolyte decomposition products (complementary to TGA-MS).
- Bak, S.-M. et al. *ACS Applied Materials & Interfaces* 6 (2014) 22594–22601 — in-situ TGA-XRD study of oxygen release from Ni-rich NMC.
- Solchenbach, S. et al. *Journal of The Electrochemical Society* 165 (2018) A3304 — standard procedure for ICP-MS quantification of TM deposition on anodes.
- Wandt, J. et al. *Materials Today* 21 (2018) 825–833 — connecting cathode oxygen release and thermal stability in Ni-rich NMC.
