# Advanced and Operando Analysis Workflow

<span class="theory-group-label practical">Practical Theory</span>

## Area Map

```text
09 Advanced and Operando Analysis
├── 01_operando_xrd         cell design / synchrotron / waterfall plot
├── 02_xas                  XANES oxidation state / EXAFS coordination
├── 03_cryo_em              plunge freezing / dose budget / dead Li
├── 04_dems_oems            isotope labeling / m/z mapping / O2 vs CO2
├── 05_ssnmr                MAS / Knight shift / dead Li quantification
├── 06_afm_ecafm            EC-AFM / modulus / KPFM
└── 07_tof_sims             Bi3+ vs Cs+ / depth profile / 6Li tracer
```

## Overview

This section pairs with [`06_battery_operation/07_operando.md`](../06_battery_operation/07_operando.md), but the perspective is different. Section 06 asks **which technique observes which phenomenon**. Section 09 asks **how the technique is operated and how the data are interpreted**.

The real barrier for graduate students is often procedural knowledge. Synchrotron beamtime, cryo-EM sample transfer, ToF-SIMS user-lab workflow, raw data processing, and fitting are not just button-clicking tasks. They require decisions about cell design, sample preparation, calibration, and artifact control.

In short, section 06 is the phenomenon-to-tool catalog. Section 09 is the operation manual.

## Learning Goals

- Choose between laboratory and synchrotron operando XRD, select an appropriate cell geometry, and fit lattice parameters versus state of charge from waterfall or contour plots.
- Follow the XAS workflow from normalization and background subtraction to Fourier transformation of $\chi(k)$ into $\chi(R)$, then separate XANES oxidation-state information from EXAFS coordination information.
- Understand cryo-EM sample preparation, plunge freezing, low-dose imaging, dose budget, drift correction, and FFT/IFFT-based image interpretation.
- Quantify DEMS/OEMS signals such as m/z 32 for O2, 44 for CO2, 28 for CO, and 2 for H2, and use isotope labeling to separate lattice oxygen from electrolyte oxidation.
- Interpret ssNMR through MAS at 54.7 degrees, $^7$Li Knight shift around 265 ppm, and $^{19}$F/$^{31}$P signals from SEI and electrolyte decomposition.
- Use EC-AFM for real-time SEI formation, force-distance measurements, Young's modulus mapping, and KPFM work-function or charge mapping.
- Understand ToF-SIMS primary ions, sputter-rate calibration, molecular fragments, depth profiling, and $^6$Li tracer experiments.

## Subtopics

| File | Core idea | Tier |
|------|-----------|:----:|
| [`01_operando_xrd.md`](./01_operando_xrd.md) | Cell design, synchrotron detectors, waterfall plots, and beam damage | 2 |
| [`02_xas.md`](./02_xas.md) | XANES edge analysis, EXAFS Fourier transform, ATHENA/ARTEMIS, and beamtime | 1 |
| [`03_cryo_em.md`](./03_cryo_em.md) | Plunge freezing, low-dose imaging, dendrites, SEI, and MotionCor2 | 1 |
| [`04_dems_oems.md`](./04_dems_oems.md) | DEMS/OEMS cells, isotope labeling, m/z assignment, and sensitivity factors | 2 |
| [`05_ssnmr.md`](./05_ssnmr.md) | $^7$Li/$^{19}$F/$^{31}$P NMR, MAS, dead Li, and Knight shift | 1 |
| [`06_afm_ecafm.md`](./06_afm_ecafm.md) | EC-AFM, force-distance curves, modulus mapping, and KPFM | 2 |
| [`07_tof_sims.md`](./07_tof_sims.md) | Primary ions, depth profiles, fragments, and $^6$Li tracer analysis | 2 |

## Decision Guide

| Question | First-choice technique | Page |
|---|---|---|
| Lattice change or phase transition during operation | Operando XRD | [`01`](./01_operando_xrd.md) |
| Transition-metal oxidation state | XAS (XANES) | [`02`](./02_xas.md) |
| TM-O bond distance or coordination number | XAS (EXAFS) | [`02`](./02_xas.md) |
| Direct observation of dead Li or dendrites | Cryo-EM | [`03`](./03_cryo_em.md) |
| Gas identity and quantity | DEMS / OEMS | [`04`](./04_dems_oems.md) |
| Quantitative Li environments or SEI components | ssNMR | [`05`](./05_ssnmr.md) |
| Real-time SEI formation and mechanical properties | EC-AFM / KPFM | [`06`](./06_afm_ecafm.md) |
| Molecular-level SEI composition with depth | ToF-SIMS | [`07`](./07_tof_sims.md) |

## Recommended References

- Yang, F., Wang, J. *Chemical Reviews* (2017) — synchrotron-based X-ray absorption spectroscopy for energy materials.
- Li, Y. et al. *Science* 358 (2017) 506-510 — cryo-EM observation of dendrites and SEI at atomic resolution.
- Tsiouvaras, N., Meini, S., Buchberger, I., Gasteiger, H. A. *Journal of The Electrochemical Society* 160 (2013) A471 — DEMS/OEMS cell design and isotope labeling.
- Pecher, O., Carretero-Gonzalez, J., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 29 (2017) 213 — operando NMR review.
- Lin, F. et al. *Chemical Reviews* 117 (2017) 13123 — review of synchrotron methods for cathode materials.
