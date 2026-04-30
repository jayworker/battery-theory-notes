# Operando / In-situ Characterization

## 1. Overview

The most common pitfall in battery research is **observation after disassembly**. The moment the cell is opened and the electrode is removed, the equilibrium is broken, the sample is exposed to air, and artifacts from vacuum/washing steps are introduced. To directly see "what is happening in the operating cell right now", in-situ or operando techniques are required.

Terminology:
- **Ex-situ**: disassemble the cell and analyze in an external instrument (essentially synonymous with post-mortem).
- **In-situ**: measure with the cell placed inside the analytical instrument. May be cycling or at rest.
- **Operando**: a subset of in-situ in which **measurement is performed simultaneously during actual operation (charge-discharge)**. Time resolution is the key.

Each technique differs in (i) what it sees (structure / composition / morphology / gas), (ii) time and spatial resolution, and (iii) cell-geometry constraints. Cross-validation of the same phenomenon by several techniques is the standard.

## 2. Operando XRD

X-ray diffraction directly probes lattice constants and crystal structure. Tracking the change of d-spacings during charge-discharge allows quantification of [volume change](./04_mechanochemistry.md), phase transitions (two-phase coexistence vs solid solution), and loss of crystallinity.

The typical data format is a **waterfall plot** (3D scan of SOC × 2θ × intensity); peaks shifting continuously indicate solid-solution behavior, while two peaks coexisting and one disappearing is direct evidence of a two-phase reaction.

| Source | Time resolution | Strengths | Limitations |
|------|-----------|------|------|
| Lab Cu Kα | minutes to hours | accessible | only C/20 or below feasible |
| Synchrotron | seconds to minutes | tracks fast cycles, transmission mode for whole-cell measurement | requires beamtime |

The choice between transmission and reflection mode depends on cell geometry. Coin cells with a Be window can be done with a lab source; pouch cells are usually synchrotron transmission mode.

## 3. Operando Raman Spectroscopy

Raman provides bond / phonon information and is sensitive to **molecular-level changes in localized regions**. The graphite anode G-band (~1580 cm⁻¹) splits into two with stage transitions, and the D-band (~1350 cm⁻¹) reflects defect content. The intensity and position of M-O stretching modes (~480, 600 cm⁻¹) of layered cathodes such as NMC indicate the bonding state of lattice oxygen.

Strengths:
- High spatial resolution (~1 μm), with confocal setups offering depth resolution.
- Non-destructive, non-contact.
- Capable of single-particle measurements.

Limitations:
- Fluorescence interference (especially in the presence of decomposition products).
- Risk of laser damage → must reduce power → reduces S/N.
- Modest time resolution (seconds to minutes per spectrum).

## 4. In-situ TEM

Transmission electron microscopy is essentially the only technique that allows **direct visualization of lithiation fronts at the nanoscale**. The advancing lithiation phase can be seen in real time at the single-particle level. Phenomena such as core-shell lithiation in Si particles, fracture propagation in NMC particles, and dendrite nucleation have been observed directly.

TEM holder types:
- **Open cell**: simple cell mimicry using ionic liquid or W tip + Li coating. Nano-region only.
- **Liquid cell**: real electrolyte sealed between two SiN membranes. More realistic, but image resolution is reduced.

The limitations are inherent. The electron beam itself causes beam damage to the specimen, and handling volatile electrolytes in vacuum is hard, so it is usually limited to very small and unrealistic model cells. Even so, mechanism information unavailable to other techniques is obtained, so rather than full cycling the technique targets **decisive moments** (first lithiation, fracture nucleation).

## 5. DEMS (Differential Electrochemical Mass Spectrometry)

DEMS streams the gases evolved from the cell into a mass spectrometer in real time and **quantifies gas species and amounts as a function of SOC/potential**. It is essentially the only technique that directly shows which gas evolves at which potential inside the cell.

Representative applications:
- **Anionic redox** (Li-rich) studies: detect O₂ release above 4.5 V → direct evidence that lattice oxygen is leaving the cathode.
- **Formation-cycle gas analysis**: quantify SEI-formation byproducts such as C₂H₄, CO₂, CO.
- **High-voltage cathode stability**: compare O₂/CO₂ evolution at 4.3 V vs 4.5 V cut-offs.

Key experimental design: the cell headspace must be flowed with a carrier gas (typically He, Ar) for the gases to reach the MS. Hence the cell geometry differs from a standard coin cell, and lab-built special cells are common.

> O₂ release is a key signature of [thermal runaway](./05_thermal.md) and [LAM_PE](./06_degradation.md), so it is standard to view DEMS together with ARC and in-situ XRD data.

## 6. Solid-state NMR

Nuclear magnetic resonance has nuclear-isotope selectivity as its key strength. ⁷Li NMR distinguishes Li environments (sites) by chemical shift — intercalated Li in graphite (~40–50 ppm), LiF in SEI (-200 ppm), Li₂CO₃ (0 ppm), and **metallic Li (~250 ppm)** are clearly resolved. This chemical-shift difference is a direct tool for quantifying "dead Li".

Selectivity examples:
- ⁷Li, ⁶Li: Li environments. Resolves graphite/SEI/metallic Li/cathode lattice sites.
- ²³Na: Na-ion batteries.
- ³¹P: LiPF₆ decomposition products (LiPO_xF_y), behavior of phosphate-based additives.
- ¹⁹F: LiF in SEI, PVDF binder.

Strengths are quantitativeness and chemical-environment resolution. Limitations: (i) low time resolution (minutes to hours per spectrum), (ii) requires a special probe to cycle the cell inside the magnet, (iii) instrument accessibility. With MAS (magic angle spinning), the sample must be rotated, so true operando is hard and in-situ is more common.

## 7. XAS (X-ray Absorption Spectroscopy)

XAS examines the absorption edge of a specific element (typically a TM) and simultaneously reveals **oxidation state and local structure**. It is split into two regions.

- **XANES** (X-ray Absorption Near Edge Structure): edge position → oxidation state ($\text{Ni}^{2+/3+/4+}$, $\text{Co}^{2+/3+/4+}$, etc.). One can see directly how far Ni oxidizes during NMC charging.
- **EXAFS** (Extended X-ray Absorption Fine Structure): post-edge oscillations → coordination number, bond distance, neighboring atomic species. Cycle dependence of TM-O bond length.

Key uses: **anionic-redox verification** (when Ni is no longer being oxidized but additional capacity is delivered, this is evidence that oxygen is being oxidized), **TM chemical-state analysis on the anode after TM dissolution**, depth measurements of surface reconstruction in layered oxides (total-reflection mode TXRF-XAS).

The limitations are clear. **A synchrotron is required**, beamtime is hard to secure, and time resolution is on the scale of 1 ms to minutes depending on the technique (ED-XAS, QEXAFS, etc.). Only one element is measured at a time, so multi-TM (NMC) cells require separate measurements for each edge.

## 8. Technique-selection guide

The choice of technique depends on the question to be answered. The matrices below give a quick guide.

| Question | First choice | Auxiliary |
|------|----------|----------|
| Lattice constants / phase transitions | Operando XRD | TEM (nanoscale) |
| Oxidation-state changes | XAS (XANES) | EELS in TEM |
| Local bonds / phonons | Raman | IR |
| Particle morphology / fractures | In-situ TEM | post-mortem SEM |
| Gas evolution | DEMS | OEMS, GC |
| Quantification of Li environments | ⁷Li NMR | XPS (surface only) |
| Surface chemistry | XPS (ex-situ) | Raman, FT-IR |

| Technique | Time resolution | Spatial resolution | Non-destructive? |
|------|----------|----------|--------|
| Operando XRD (synchrotron) | 1–60 s | bulk-averaged | Yes |
| Operando Raman | 1–60 s | ~1 μm | nearly (laser damage) |
| In-situ TEM | < 1 s | < 1 nm | partial (beam damage) |
| DEMS | 1–10 s | bulk (gases only) | Yes |
| ⁷Li NMR | minutes to hours | bulk-averaged | Yes |
| XAS | 1 ms to minutes | bulk or ~μm | Yes |
| XPS (ex-situ) | N/A | bulk-averaged surface | No |

**Decisive principle**: do not draw conclusions from a single technique. A claim becomes solid only when XRD and DEMS results, or XAS and NMR results, support the same mechanism. This multi-technique cross-validation is the standard for [aging-mechanism diagnosis](./06_degradation.md).

## References

- Borkiewicz, O. J. et al. *Journal of Applied Crystallography* 45 (2012) 1261 — synchrotron operando XRD cell design.
- Baddour-Hadjean, R., Pereira-Ramos, J. P. *Chemical Reviews* 110 (2010) 1278 — comprehensive review of Raman in lithium batteries.
- Wang, F. et al. *Nano Letters* 12 (2012) 1624 — in-situ TEM lithiation observation.
- Berkes, B. B. et al. *Analytical Chemistry* 87 (2015) 5878 — DEMS experimental design.
- Pecher, O. et al. *Solid State Nuclear Magnetic Resonance* 84 (2017) 122 — operando NMR review.
- Yang, W. et al. *Nature Energy* 3 (2018) 690 — anionic redox seen by XAS.
