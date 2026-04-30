# DEMS / OEMS Workflow

## 1. Overview

DEMS (Differential Electrochemical Mass Spectrometry) and OEMS (Online Electrochemical Mass Spectrometry) quantify the type and amount of gas generated from an operating cell by transferring it to a mass spectrometer in real time. If section 06 [`07_operando.md`](../06_battery_operation/07_operando.md) gives the catalog-level statement "DEMS observes gas", this note covers cell design, carrier-gas settings, m/z interpretation, sensitivity-factor calibration, and isotope labeling.

Gas analysis by mass spectrometry is not new. In batteries, the difficult parts are transferring tiny gas amounts from coin or pouch cells to the MS detector, separating electrolyte vapor from reaction products, and resolving overlapping m/z signals.

## 2. DEMS Cell: Carrier-Gas Sweep

DEMS cells are usually lab-built. A standard format is:

- Cathode, separator, and anode are packed into a PEEK or stainless-steel module.
- The cell headspace has inlet and outlet ports. A **carrier gas**, usually He or Ar, is flowed through the inlet at about 1-5 sccm. The outlet samples gas into the MS through a capillary or pinhole.
- The capillary is a very narrow glass or stainless tube, often around 50 micrometers in diameter. It handles the pressure drop between the 1 atm cell and the MS vacuum near $10^{-6}$ torr.

This open-flow format is **DEMS**, meaning that gas is removed differentially from the cell. Once gas leaves, it does not return, so the generation rate in mol per time can be measured directly.

> **Related concept: Carrier gas and sensitivity factor**
> The MS signal $S_i$ for species $i$ at a given m/z is proportional to the gas concentration $c_i$, but the proportionality constant differs by gas because of ionization cross section and detector efficiency. A calibration gas such as 1% O$_2$ in He is therefore used to determine the sensitivity factor $k_i = S_i / c_i$.
> The generation rate is $\dot n_i = k_i^{-1} \cdot S_i \cdot \dot V_{\text{carrier}}$, where $\dot V$ is carrier-gas flow rate.
> The carrier gas should be chosen so that its m/z does not overlap the target products. He at m/z 4 is the common standard because it overlaps almost none of the battery reaction products.

## 3. OEMS: Adding Pressure Tracking

OEMS is similar to DEMS but adds pressure tracking in a closed cell without continuous carrier gas. The gas generation rate can be estimated from $\Delta P V / (RT \Delta t)$. MS gives gas identity, while pressure gives total amount.

| Item | DEMS | OEMS |
|---|---|---|
| Cell format | open flow | closed cell |
| Carrier | continuous He/Ar flow | none, or occasional sampling |
| Measurement | flow-through MS | headspace MS plus pressure |
| Time resolution | 1-10 s | minutes, because pressure is averaged |
| Quantification | requires sensitivity factors | total mol directly accessible |

The OEMS cell from the Gasteiger group, especially Tsiouvaras et al. 2013, is a standard reference design.

## 4. m/z Interpretation and Overlap

Mass spectra are not one-to-one maps. One molecule creates multiple fragments during ionization, and fragments from different molecules can overlap at the same m/z.

| m/z | Main species | Overlap / caution |
|---|---|---|
| 2 | H$_2$ | usually clean, little electrolyte fragmentation |
| 16 | CH$_4$, O fragment | also from CO$_2$/O$_2$ fragments; separate by fragment ratios |
| 18 | H$_2$O | always a background signal |
| 28 | CO, N$_2$, C$_2$H$_4$ | air leak N$_2$ overlaps CO; check glove-box/vacuum sealing |
| 32 | O$_2$, sometimes S | signal of lattice oxygen release from cathodes |
| 44 | CO$_2$, N$_2$O, propane | main product of carbonate oxidation |
| 64 | SO$_2$ | from decomposition of some sulfone additives |

In NMC811 or Li-rich cells, simultaneous increase of m/z 32 (O$_2$) and m/z 44 (CO$_2$) during 4.3-4.7 V charge is a marker of lattice oxygen release. CO$_2$ alone usually indicates carbonate solvent oxidation. O$_2$ alone points more directly to anionic-redox oxygen release.

## 5. Isotope Labeling with $^{18}$O

If m/z 32 and m/z 44 rise together, two hypotheses are possible: lattice oxygen is released and partly becomes O$_2$ while also oxidizing carbonate to CO$_2$, or the electrolyte is oxidized without lattice oxygen release. **Isotope labeling** is required to separate these cases.

The standard experiment uses an $^{18}$O-enriched cathode, for example synthesized through a Li$_2$$^{18}$O$_2$ route, and a normal $^{16}$O carbonate electrolyte. The tracked m/z values are:

- m/z 36 = $^{18}$O$_2$: direct lattice oxygen release from the cathode.
- m/z 34 = $^{16}$O$^{18}$O: hybrid contribution from lattice and electrolyte oxygen.
- m/z 32 = $^{16}$O$_2$: electrolyte-derived oxygen or non-lattice contribution.
- m/z 48 = $^{12}$C$^{18}$O$_2$ or m/z 46 = $^{12}$C$^{16}$O$^{18}$O: identifies where the oxygen in CO$_2$ originated.

This isotope experiment clearly demonstrated that first-cycle O$_2$ release in Li-rich cathodes can originate from lattice oxygen.

## 6. Quantitative Calibration

The standard procedure before each measurement is:

1. **Empty-cell baseline:** Flow only carrier gas through the cell and measure background spectra. Determine baseline m/z 28 (N$_2$ leak), 32 (O$_2$ leak), and 44 (atmospheric CO$_2$).
2. **Calibration gas injection:** Pass standard gases such as 1% O$_2$/Ar, 1% CO$_2$/Ar, and 1% H$_2$/Ar at the same flow rate to determine sensitivity factors.
3. **Cell measurement:** Start cycling and continuous MS scanning.
4. **Background subtraction -> sensitivity correction -> molar generation rate.**

Report $\dot n_i$ versus time, SOC, or cell voltage. Integrated gas amount is converted to gas yield, usually mol/g$_\text{cathode}$.

## 7. Practical Checklist

- Confirm leak rate; m/z 28 N$_2$ should remain below about 0.1% baseline.
- Update sensitivity factors with calibration gas for each experiment.
- Track electrolyte vapor, such as EC m/z 88 or DEC m/z 118, to monitor leakage or evaporation.
- For $^{18}$O isotope experiments, start from cathode synthesis and target at least 95% enrichment.
- Cross-check DEMS/MS data with pressure data when OEMS is available.
- Use CV above 4 V to determine carbonate breakdown thresholds when evaluating additives.

## References

- Tsiouvaras, N., Meini, S., Buchberger, I., Gasteiger, H. A. *Journal of The Electrochemical Society* 160 (2013) A471 — standard DEMS/OEMS cell design.
- Berkes, B. B. et al. *Analytical Chemistry* 87 (2015) 5878 — quantitative calibration method for DEMS.
- Strehle, B. et al. *Journal of The Electrochemical Society* 164 (2017) A400 — Li-rich lattice oxygen release measured by $^{18}$O isotope DEMS.
- Wandt, J. et al. *Journal of Materials Chemistry A* 4 (2016) 18300 — combined operando DEMS and XAS analysis.
