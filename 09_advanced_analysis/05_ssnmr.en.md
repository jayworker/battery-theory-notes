# Solid-State NMR for Batteries: MAS, $^7$Li/$^{19}$F/$^{31}$P, and Dead-Li Quantification

## 1. Overview

Solid-state NMR (ssNMR) separates where the same element resides, meaning in which compound and site, through **chemical shifts that depend on the nuclear environment**. If section 06 [`07_operando.md`](../06_battery_operation/07_operando.md) states that "$^7$Li NMR observes dead Li", this note covers MAS (Magic Angle Spinning), in-situ NMR cells, dead-Li quantification, and multinuclear analysis using $^{19}$F, $^{31}$P, and $^{17}$O.

The key strengths of ssNMR are bulk-averaged quantification, compatibility with magnetic or electronically conductive samples, and the ability to combine with isotope labeling. Its main limitation is time resolution, which is usually on the minute scale and therefore not ideal for fast operando events.

## 2. Nucleus Selection: $^7$Li, $^{19}$F, $^{31}$P, $^{17}$O

Common nuclei in battery ssNMR are:

| Nucleus | Natural abundance | Sensitivity | Information |
|---|---|---|---|
| $^7$Li | 92.6% | high, I=3/2 | Li environments such as lattice sites, SEI, and dead Li |
| $^6$Li | 7.4% | low, I=1 | narrow lines, isotope tracing |
| $^{19}$F | 100% | very high, I=1/2 | LiF, LiPF$_6$ decomposition, PVDF |
| $^{31}$P | 100% | high, I=1/2 | LiPF$_6$ decomposition products such as LiPO$_x$F$_y$ |
| $^{17}$O | 0.04%, enrichment required | very low | cathode lattice oxygen and carbonate oxygen in SEI |
| $^{23}$Na | 100% | useful, I=3/2 | Na-ion batteries |

$^7$Li and $^{19}$F are especially important because their natural abundances and sensitivities are high, making them workhorse nuclei for SEI and anode analysis.

## 3. Chemical-Shift Map: Knight Shift and SEI

Each $^7$Li environment has a known chemical-shift fingerprint.

| Environment | $^7$Li shift (ppm) | Note |
|---|---|---|
| Diamagnetic Li compounds | 0 ± 10 | LiCl, Li$_2$CO$_3$, dissolved LiPF$_6$ |
| LiF | $\sim -1$ to $-5$ | sharp |
| Graphite intercalate Li (LiC$_6$) | 40-50 | can separate by stage |
| Layered cathode (Li[NMC]O$_2$) | -2 to +1500 | broad paramagnetic shift from TM ions |
| **Metallic Li (Knight shift)** | **~265** | contact term from conduction electrons |
| Dead Li | ~265, sometimes ~245 | similar to Li metal, slightly morphology-dependent |

> **Related concept: Knight shift**
> In a metal, conduction electrons create spin polarization at the nucleus, producing an additional shift proportional to the external magnetic field. This is the Knight shift $K$. For Li metal, $K \approx 0.026\%$, or about 265 ppm.
> Intuitively, different electron densities around a nucleus produce different chemical shifts. Metals have many free electrons and therefore a large shift, whereas insulators such as LiF or Li$_2$CO$_3$ lie near 0 ppm.
> Application: If an anode is disassembled and measured by NMR, LiC$_6$ in graphite and metallic/dead Li are separated by more than 200 ppm and can be quantified cleanly.

This shift separation is the direct tool for quantifying dead Li. Metallic Li that is electrically isolated by SEI no longer participates in cycling, but NMR still detects its metallic Knight shift. The Hu group standardized this approach in 2019.

## 4. MAS: Magic Angle Spinning at 54.7°

In solids, dipolar coupling, chemical-shift anisotropy, and quadrupolar interactions all contain the angular term $(3\cos^2\theta - 1)$. The angle that makes this term zero is the magic angle, $\cos^{-1}(1/\sqrt{3}) \approx 54.7^\circ$.

$$3 \cos^2(54.7°) - 1 = 0$$

When the sample is spun rapidly, typically 10-60 kHz, around an axis tilted by this angle, the angular broadening averages to zero. This is MAS.

For battery samples, MAS:

- Reduces the $^7$Li paramagnetic broadening in layered NMC caused by unpaired electrons on neighboring transition metals.
- Separates LiF, Li$_2$CO$_3$, and ROCO$_2$Li in SEI in a single 1D spectrum.

The spinning rate must exceed the width of the relevant interaction. For paramagnetic NMC, 60 kHz MAS using a 1.3 mm rotor is common.

## 5. In-situ NMR Setup: Modified Capillary Cells

True operando NMR is difficult because cycling a cell while spinning a MAS rotor is almost impossible. Two modes are used:

- **In-situ static NMR:** A small plastic-bag cell or PEEK capillary cell is placed inside the magnet and cycled. There is no MAS, so paramagnetic samples such as NMC are broad, but separation between $^7$Li metal and LiC$_6$ is still possible. This is a standard Grey-group style setup.
- **Ex-situ MAS NMR with interrupted cycling:** The cell is stopped at a selected SOC, disassembled in a glove box, and the electrode is packed into a rotor. Time resolution is lower, but spectral resolution is much better.

The central cell-design rule is to avoid magnetic materials such as stainless steel or Ni near the detection region. PEEK, Cu, and Al are preferred.

## 6. Dead-Li Quantification: Hu Group 2019

The Hu group established a standard protocol for quantifying dead Li by in-situ $^7$Li NMR in *Nature* 572 (2019).

Procedure:

1. **Reference measurement:** Measure the integrated $^7$Li signal $A_0$ from a fresh Li metal foil in the same setup.
2. **Cycling:** Cycle a Li metal vs Cu cell for a defined number of cycles.
3. **Measurement after stripping:** After full discharge, meaning all active Li has been stripped, measure the remaining NMR signal. The metallic Li signal $A$ corresponds to dead Li.
4. **Quantification:** $\text{Dead Li} = (A/A_0) \times m_0$, where $m_0$ is the initial Li mass.

The key point is that dead Li is chemically isolated by SEI and cannot be removed by stripping voltage, but its NMR Knight shift remains. This is one of the few methods that can directly separate Coulombic-efficiency loss into dead Li and SEI formation.

## 7. $^{19}$F and $^{31}$P: Tracking Electrolyte Decomposition

Common $^{19}$F NMR species:

- LiPF$_6$ starting salt: -72.5 ppm doublet from P-F bonding.
- LiF in SEI: -204 ppm.
- PVDF binder: broad signal near -90 ppm.
- LiPO$_x$F$_y$ intermediates: -80 to -150 ppm.

Common $^{31}$P NMR species:

- LiPF$_6$: -145 ppm septet from P bonded to six F atoms.
- LiPO$_2$F$_2$: around -19 ppm.
- POF$_3$: around -36 ppm.

Simultaneous $^{19}$F and $^{31}$P measurements allow the hydrolysis/decomposition pathway of LiPF$_6$, such as LiPF$_6$ + H$_2$O -> LiF + POF$_3$ + 2HF, to be followed quantitatively.

## 8. $^{17}$O Isotope-Labeled SEI

$^{17}$O has only 0.04% natural abundance, so enrichment, often 30-50%, is required.

Standard applications:

- Cycle cells with $^{17}$O-enriched carbonate solvent and quantify oxygen environments in SEI carbonate species such as Li$_2$CO$_3$ and ROCO$_2$Li.
- Label cathode lattice oxygen with $^{17}$O and track where lattice oxygen goes, often in combination with DEMS.

$^{17}$O is quadrupolar (I = 5/2), so its lines are broad and measurements are slow. Its value is that it directly distinguishes carbonate and SEI oxygen environments that are otherwise difficult to separate.

## 9. Practical Checklist

- Check magnetic-field homogeneity, usually 11.7-17.6 T or 500-750 MHz $^1$H Larmor frequency.
- Keep rotor packing and cap sealing air-tight from glove box to probe.
- Calibrate chemical shifts with reference compounds, such as 1 M LiCl(aq) for $^7$Li and CFCl$_3$ for $^{19}$F.
- Measure T$_1$ relaxation and choose an appropriate recycle delay for quantification.
- Use short pulses and spin echo for paramagnetic samples to reduce distortion.
- In dead-Li quantification, correct systematic error in $A/A_0$, such as rotor filling differences, with an internal standard.

## References

- Pecher, O., Carretero-Gonzalez, J., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 29 (2017) 213 — review of operando NMR for batteries.
- Hu, C. L. et al. *Nature* 572 (2019) 511 — direct dead-Li quantification by $^7$Li NMR.
- Bhattacharyya, R. et al. (Grey group) *Nature Materials* 9 (2010) 504 — Li dendrite formation observed by in-situ NMR.
- Leskes, M. et al. *Angewandte Chemie* 51 (2012) 8560 — $^{17}$O NMR analysis in Li-air systems.
- Goward, G. R. et al. *Solid State Nuclear Magnetic Resonance* 84 (2017) 122 — practical guide to solid-state NMR.
