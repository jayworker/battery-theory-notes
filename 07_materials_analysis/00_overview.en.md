# Materials Characterization

<span class="theory-group-label practical">Practical theory</span>

## Module map

```text
07 Materials Characterization
├── 01_xrd                  Bragg / Rietveld / I003/I104 / Scherrer
├── 02_sem_eds              SE/BSE / cross-section / EDS mapping / FIB tomography
├── 03_tem                  HRTEM lattice fringes / STEM-HAADF / SAED / EELS
├── 04_xps                  binding energy / charge correction / depth profile
├── 05_raman_ftir           D/G band / ROCO₂Li / Li₂CO₃ / ATR vs Transmission
├── 06_bet_psa              N₂ isotherm / BET equation / laser scattering / D50
└── 07_icp_tga              ICP-MS/OES / TM dissolution quantification / TGA-DSC
```

## Overview

In battery research, quantitatively answering "what material is this?" ultimately requires bringing analytical data to the table. A single XRD pattern fixes the crystalline phase, one XPS measurement quantifies SEI composition, and ICP-MS catches the transition metals leached from the cathode after cycling down to the ppb level. This area covers the materials-characterization techniques used routinely in the lab — principles, setup, quantification procedures, and limitations — together in one place.

Where this area (07) clearly differs from [operational theory (06)](../06_battery_operation/00_overview.md) is this: 06 addresses "what phenomenon occurs in this cell," whereas 07 addresses "how do we measure that phenomenon and how do we fit it." For example, 06.06 describes cation mixing centered on the phenomenon and its diagnostic signatures, while 07.01 on XRD focuses on Rietveld refinement setup, peak deconvolution, and the procedure for extracting structural parameters.

If foundational theory (01–05) handles microscopic understanding and operational theory (06) handles macroscopic behavior, then 07 materials characterization is the realm of "measurable quantities" that bridges the two.

## Learning goals

- Perform a coherent workflow from crystalline-phase identification in XRD patterns through Rietveld refinement to crystallite-size extraction via the Scherrer equation
- Distinguish the resolution and probing depth of SEM/EDS, TEM/STEM, and EELS, and decide which technique is appropriate for which question
- Memorize XPS binding-energy correction procedures and the standard SEI peak positions (LiF, Li₂CO₃, etc.) so as to quantitatively interpret SEI composition
- Diagnose graphite disorder ($I_D/I_G$), electrolyte decomposition products, and cathode M–O vibrational modes with Raman/FTIR
- Understand the quantitative limits and sample-preparation pitfalls of BET, PSA, ICP-MS, and TGA-DSC, and read reported numbers critically

## Subtopic table of contents

| File | Core content (one line) |
|------|-------------------------|
| [`01_xrd.md`](./01_xrd.md) | Bragg, Rietveld refinement, $I_{003}/I_{104}$ ratio, Scherrer, in-situ XRD |
| [`02_sem_eds.md`](./02_sem_eds.md) | SE/BSE, particle morphology, cross-section, EDS mapping (ZAF), FIB-SEM tomography |
| [`03_tem.md`](./03_tem.md) | HRTEM, STEM-HAADF, SAED, EELS, FIB lamella prep |
| [`04_xps.md`](./04_xps.md) | Binding energy, charge correction, depth profile, standard SEI peaks |
| [`05_raman_ftir.md`](./05_raman_ftir.md) | Raman D/G band, $I_D/I_G$, FTIR ATR, electrolyte decomposition products |
| [`06_bet_psa.md`](./06_bet_psa.md) | $N_2$ adsorption/desorption, BET equation, BJH, laser scattering, $D_{50}$ |
| [`07_icp_tga.md`](./07_icp_tga.md) | ICP-MS/OES, TM dissolution quantification, TGA-DSC, decomposition onset |

## Decision tree — which question calls for which analysis?

| Research question | Primary technique | Secondary |
|---|---|---|
| Has the cathode crystalline phase changed? (layered → spinel, etc.) | **XRD** (Rietveld) | in-situ XRD, SAED |
| What is the surface SEI composition? (LiF/Li₂CO₃ ratio) | **XPS** (depth profile) | FTIR, ToF-SIMS |
| Particle morphology / crack changes? | **SEM** (cross-section, BSE) | FIB-SEM |
| Want to see lattice fringes directly | **HRTEM** | STEM-HAADF |
| Oxidation-state changes (Mn²⁺/³⁺/⁴⁺)? | **EELS / XPS** | XANES, XAS |
| How much TM has dissolved? | **ICP-MS** | ICP-OES |
| Specific surface area / pore distribution? | **BET / BJH** | PSA |
| Particle size distribution ($D_{50}$)? | **PSA (laser)** | SEM statistics, BET |
| Graphite disorder? | **Raman ($I_D/I_G$)** | XRD (002) FWHM |
| Type of electrolyte decomposition product? | **FTIR ATR** | Raman, NMR |
| Decomposition temperature, residual moisture? | **TGA-DSC** | MS coupled |
| Crystallite size (nm)? | **XRD Scherrer** | Direct TEM measurement |

This table gives the primary diagnostic entry point; for actual mechanistic determination, two or more techniques should always be cross-checked.

## Recommended references

- Cullity, B. D., Stock, S. R. *Elements of X-ray Diffraction* (3rd ed., Pearson, 2001) — standard XRD textbook.
- Williams, D. B., Carter, C. B. *Transmission Electron Microscopy* (2nd ed., Springer, 2009) — comprehensive TEM standard.
- Briggs, D., Grant, J. T. *Practical Surface Analysis: Auger and X-ray Photoelectron Spectroscopy* (Wiley, 2003) — XPS practical handbook.
- Skoog, D. A., Holler, F. J., Crouch, S. R. *Principles of Instrumental Analysis* (7th ed., Cengage, 2017) — comprehensive analytical-chemistry textbook.
- Smith, B. C. *Fundamentals of Fourier Transform Infrared Spectroscopy* (2nd ed., CRC, 2011) — practical FTIR introduction.

## Authoring status

- **Current state:** main text complete (all 7 subtopic files written)
- Each text body is self-contained, with related-concept boxes that include the key equations, assumptions, and intuition without external links
- Differentiation from 06 operational theory: 06 is "phenomenon + signature," 07 is "measurement setup + fitting + quantitative limits"
