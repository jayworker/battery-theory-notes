# ToF-SIMS Workflow: Depth Profiles, Fragments, and $^6$Li Tracers

## 1. Overview

ToF-SIMS (time-of-flight secondary ion mass spectrometry) sputters a sample surface with accelerated primary ions and detects emitted secondary ions using a time-of-flight mass spectrometer. In batteries, it is one of the few techniques that can provide **molecular-fragment-level composition, nanometer-scale depth resolution, and lateral imaging** of SEI/CEI at the same time.

SIMS is not separately covered in section 06 [`07_operando.md`](../06_battery_operation/07_operando.md), because XPS is surface-limited and NMR is bulk-averaged. ToF-SIMS occupies a central role in SEI/CEI analysis because it quantifies depth-dependent chemistry at nanometer resolution.

## 2. Primary-Ion Selection: Bi$_3^+$ vs Cs$^+$

The primary ion has two roles: sputtering the sample and inducing ionization. The trade-off between these roles determines ion choice.

| Primary ion | Characteristics | Suitable application |
|---|---|---|
| **Bi$_3^+$, Bi$_5^+$** | cluster ion, preserves molecular fragments well | SEI molecular species imaging and surface analysis |
| **Cs$^+$** | atomic ion, high sputter rate, enhances negative ions | elemental depth profiles, especially F and O |
| **Ar cluster (Ar$_{2000}^+$)** | soft sputtering, minimizes polymer/SEI decomposition | depth profiling while preserving molecular information |
| **O$_2^+$** | enhances positive ions | positive-ion depth profiles of metals |

A typical dual-beam setup uses a **Bi$_3^+$ analysis beam** and a **Cs$^+$ or Ar-cluster sputter beam**. The analysis beam records spectra or images, while the sputter beam removes material layer by layer.

## 3. Depth Profile and Sputter-Rate Calibration

Depth resolution depends on sputter-rate calibration. Because SEI is an unknown matrix, sputter rate is often measured on standards such as thermal SiO$_2$ or anodic Ta$_2$O$_5$ and then applied approximately to SEI.

> **Related concept: Sputter-rate matrix effect**
> Sputter rate $\dot z$ [nm/s] depends on ion yield $Y$, the number of atoms ejected per impact, and atomic density: $\dot z = \frac{Y j}{n e}$, where $j$ is ion-current density and $n$ is atomic density.
> Even with the same 1 keV Cs$^+$ beam, sputter rates can differ by 5-10 times between SiO$_2$ and a polymer. This is called the **matrix effect**.
> Calibration uses standard films whose thickness is known from XRR or ellipsometry. For SEI, organic/inorganic standards that resemble the sample are applied. Absolute depth error of ±20-50% is common.

A depth profile is reported as species intensity vs depth after converting sputter time to depth. A typical SEI profile is:

- Surface, about 5 nm: organic ROCO$_2$Li and polymer fragments dominate.
- Middle, about 5-30 nm: inorganic species such as LiF and Li$_2$CO$_3$ dominate.
- Bottom, about 30-50 nm: C$^-$ or Li$^+$ changes sharply as graphite or Li metal is reached.

## 4. Molecular Fragments: SEI Fingerprints

The strength of ToF-SIMS is direct identification of molecular fragments by mass. Common SEI fingerprints include:

| Species | Characteristic fragment, m/z in negative-ion mode |
|---|---|
| LiF | LiF$_2^-$ (45), Li$_2$F$_3^-$ (71) |
| Li$_2$CO$_3$ | CO$_3^-$ (60), Li$_2$CO$_3^-$ (74) |
| Li$_2$O | LiO$^-$ (23), Li$_2$O$^-$ (30) |
| ROCO$_2$Li alkyl carbonate | OC$_2$H$_3^-$ (43), OC$_3$H$_5$O$_2^-$ (73) |
| Polycarbonate / polymer | C$_n$H$_x$O$_y^-$ patterns |
| LiPF$_6$ decomposition products | PO$_2^-$ (63), PO$_2$F$_2^-$ (101) |
| Intact LiPF$_6$ | PF$_6^-$ (145) |

Positive-ion mode is complementary, with Li$^+$ (7), C$_3$H$_5^+$ (41), and substrate metal cations. Relative quantification is done by normalizing to a reference fragment such as C$^-$ or total ion current within the same spectrum. Absolute quantification is difficult because matrix effects are large.

## 5. 3D Imaging: Depth plus Lateral Position

Dual-beam ToF-SIMS can produce **3D renderings**. A lateral image is recorded at each sputter step and stacked into voxel data.

Typical specifications are 100-300 nm lateral resolution with Bi$_3^+$ and 1-5 nm depth resolution. Because SEI thickness is often around 30 nm, a 5-10 step 3D dataset can be meaningful.

Common analyses include:

- **CEI uniformity** on cathode surfaces: whether CEI thickness differs on particle surfaces and grooves.
- **3D LiF distribution around dendrite hot spots:** whether LiF is concentrated near dendrite tips.
- **SEI penetration into cracks:** chemical mapping inside post-cycling anode microcracks.

## 6. Isotope Tracer: $^6$Li Exchange and Li Transport

ToF-SIMS resolves isotopes accurately because $^6$Li and $^7$Li differ by one mass unit.

A standard experiment cycles a cell with a **$^7$Li metal anode** so that the existing SEI contains $^7$Li, then replaces the electrolyte with **$^6$Li-enriched electrolyte** such as $^6$LiPF$_6$ in carbonates and cycles further. The depth dependence of the $^6$Li/$^7$Li ratio in ToF-SIMS directly reports the Li transport pathway.

Interpretation examples:

- $^6$Li remains only near the SEI surface: the inner SEI is not penetrated, and newly formed surface SEI dominates the ion path.
- $^6$Li is uniform across the SEI: fast transport occurs through grain boundaries or nanochannels.
- $^6$Li enters the Li metal body: it fully crosses SEI and participates in plating.

This isotope-tracer method can test SEI ionic-conductor models such as vehicle transport, Grotthuss-like transport, or grain-boundary transport.

## 7. Cell Disassembly and Sample Transfer

ToF-SIMS operates under vacuum, around $10^{-9}$ torr, so air-sensitive transfer is essential.

Standard chain:

1. Disassemble the cell in a glove box with $<0.1$ ppm O$_2$ and H$_2$O.
2. Lightly rinse the electrode with DMC to remove residual LiPF$_6$. This can also remove part of the SEI, so the rinsing protocol must be reported.
3. Move the sample to the ToF-SIMS chamber using an air-tight transfer arm or vacuum suitcase.
4. Keep load-lock entry time below about 30 seconds.

DMC rinsing is often the largest systematic variable. Without rinsing, LiPF$_6$ can dominate and hide SEI signals. With rinsing, part of the organic outer SEI can be lost.

## 8. Practical Checklist

- Select ions based on the goal: molecular information uses Bi$_3^+$ plus Ar cluster; elemental depth profiling uses Cs$^+$ or O$_2^+$.
- Calibrate sputter rate using standards such as SiO$_2$ and Ta$_2$O$_5$.
- Measure both negative and positive ion modes.
- Keep DMC rinsing identical for all samples.
- For $^6$Li tracer experiments, use at least 95% enrichment and confirm mass resolution above 5000.
- Keep voxel size fixed across 3D images for reproducibility.
- Report depth profile, lateral image, and 3D rendering together.

## References

- Wood, K. N., Teeter, G. *ACS Applied Energy Materials* 1 (2018) 4493 — comparison of XPS and ToF-SIMS for SEI analysis.
- Lu, P., Harris, S. J. *Electrochemistry Communications* 13 (2011) 1035 — molecular species in SEI distinguished by ToF-SIMS.
- Mogensen, R., Brandell, D., Younesi, R. *ACS Energy Letters* 1 (2016) 1173 — $^6$Li isotope ToF-SIMS tracer study.
- Sahore, R. et al. *Journal of The Electrochemical Society* 167 (2020) 020513 — guide to depth-profile correction and matrix effects.
