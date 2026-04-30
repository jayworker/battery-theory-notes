# AFM / EC-AFM / KPFM Workflow

## 1. Overview

Atomic force microscopy (AFM) scans a sample surface with a cantilever tip and measures force to obtain nanoscale morphology and mechanical properties. In batteries, **EC-AFM** (electrochemical AFM) is used to observe SEI formation in real time, **force spectroscopy** measures SEI thickness and modulus, and **KPFM** (Kelvin probe force microscopy) maps work function and charge distribution.

Section 06 discusses SEI/CEI in [`03_interface.md`](../06_battery_operation/03_interface.md), but how to measure those interfaces belongs here. This note covers AFM mode selection, cell sealing, force-distance curve interpretation, modulus mapping, and KPFM setup.

## 2. AFM Modes: Contact, Tapping, Peak Force

AFM has several modes depending on how force between cantilever and sample is measured.

- **Contact mode:** The tip stays in contact and feedback uses cantilever deflection. It is simple, but soft samples such as SEI and polymers are easily damaged by tip drag.
- **Tapping mode:** The cantilever oscillates near its resonance frequency and uses amplitude feedback. The tip contacts the surface only intermittently, reducing damage. In liquid, lower Q factor makes operation harder.
- **Peak force tapping:** A Bruker mode that partially measures a force-distance curve in every oscillation cycle and maps modulus and adhesion at the same time. It is standard for SEI mechanical mapping.

For soft SEI and Li metal, tapping or peak-force mode is almost always preferred.

## 3. EC-AFM: Liquid-Cell Sealing

EC-AFM images an electrode in electrolyte while it is electrochemically operated. The central challenge is **liquid-cell sealing**.

Standard setup:

- **Three-electrode cell:** Working electrode is the AFM sample, often a thin film on Cu, HOPG, or Si wafer. Counter electrode is Pt wire. Reference electrode is Li wire or Ag/AgCl.
- **O-ring sealing:** A Viton or Teflon O-ring is compressed over the sample, and the cantilever holder seals above it. The goal is to prevent electrolyte leakage toward wires or the holder.
- **Cantilever coating:** Au-coated tips are common, but Pt-Ir or conductive diamond is preferred at strongly reducing potentials.
- **Glove-box to AFM transfer:** An Ar-purged transfer chain is needed. Some groups use glove-box-integrated AFM.

A typical protocol fills carbonate electrolyte over a Cu surface, starts a cathodic sweep to 0.05 V vs Li/Li$^+$, and collects images at about 1 frame/min. SEI nucleation, nodule coalescence, and full coverage can then be observed sequentially.

## 4. Thickness from Force-Distance Curves

> **Related concept: Force-distance curve and SEI thickness**
> As the tip approaches the sample, cantilever deflection $d$ changes with distance $z$. Far from the surface, $d = 0$; near the surface, attractive forces can cause snap-in; after contact, cantilever bending reflects sample deformation.
> On a reactive soft SEI, the contact region can show two slopes. First the tip compresses SEI and deflection increases slowly. Once the SEI is fully compressed and the hard substrate is reached, the slope becomes steep. The z-distance between these regions estimates SEI thickness.
> Quantification fits the contact region with Hertz or DMT models to extract modulus and thickness.

Force-distance curves are collected as arrays, for example 32 by 32 positions, and visualized as 2D thickness or modulus maps. Because SEI thickness varies spatially, single-point values are weak evidence; mapping is the standard.

## 5. Young's Modulus Mapping: Si and Li Metal

Modulus mapping became routine with peak-force tapping.

| Sample | Young's modulus range |
|---|---|
| Polymer-rich outer SEI | 0.1-1 GPa |
| LiF/Li$_2$CO$_3$ inner SEI | 50-100 GPa |
| Lithiated Si particle | 1-10 GPa, depending on Li content |
| Delithiated Si particle | 80-100 GPa |
| Li metal | about 5 GPa |

In Si electrodes, AFM modulus mapping directly revealed mechanical softening with lithiation over a 1-100 GPa range.

Calibration essentials:

- Cantilever spring constant $k$: thermal-noise method or Sader method.
- Tip radius $R$: standard samples such as polystyrene spheres or SEM imaging.
- Reference modulus samples: HOPG, mica, or polymer standards.

## 6. KPFM: Work Function and Charge Mapping

KPFM maps contact potential difference (CPD), which comes from work-function difference $\Delta\Phi$ between tip and sample, at nanoscale resolution. It is meaningful only when the sample is electrically connected.

The principle is that an AC plus DC bias on the tip creates a capacitive force proportional to $V_{\text{tip}} - V_{\text{sample}} - V_{\text{CPD}}$. Feedback adjusts the DC bias until the force is zero; that DC value is $V_{\text{CPD}}$.

Battery applications:

- Work-function mapping over SEI to fingerprint LiF, Li$_2$CO$_3$, and other nanocrystals.
- Direct visualization of charge accumulation around Li dendrites.
- Grain-boundary potential mapping on solid electrolytes such as LLZO or sulfides.

KPFM usually operates in lift mode: first scan topography, then lift the cantilever and scan the same line for KPFM. Frequency-modulated KPFM has better resolution than amplitude-modulated KPFM.

## 7. Limits and Challenges of Liquid Cells

Intrinsic challenges in EC-AFM include:

- **Cantilever drag:** Electrolyte viscosity lowers the cantilever Q factor and reduces SNR.
- **Bubble formation:** Gas evolution, especially at reducing anodes, creates imaging artifacts around the cantilever.
- **Scan-rate limit:** Faster than about 1 frame/min is difficult, so second-scale SEI dynamics are missed.
- **Tip aging:** Carbonate electrolytes coat Au tips with decomposition products and gradually blunt them.

Mitigation includes high-Q cantilevers, smaller scan areas such as 1 micrometer by 1 micrometer, and frequent movement to fresh sample regions.

## 8. Practical Checklist

- Calibrate cantilever spring constant by thermal noise before each session.
- Leak-test O-ring material and thickness, such as 0.5-1 mm Viton.
- Monitor reference-electrode stability and Li-wire potential drift.
- Compare modulus maps only at the same setpoint force and z-range.
- Measure a KPFM calibration sample such as HOPG at 4.6 eV in the same session.
- Report topography, modulus map, and thickness profile together.
- Replace tips after roughly 2-4 hours in electrochemical environments.

## References

- Aurbach, D. et al. *Journal of Power Sources* 89 (2000) 206 — direct EC-AFM observation of SEI formation.
- Wang, Z. et al. *Journal of The Electrochemical Society* 161 (2014) A1162 — AFM modulus mapping of Si particles.
- Otto, S.-K. et al. *ACS Energy Letters* 5 (2020) 269 — Li dendrite charge mapping by KPFM.
- Sethuraman, V. A. et al. *Journal of Power Sources* 195 (2010) 5062 — modulus measurements during Si lithiation.
