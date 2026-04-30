# Battery Operation Theory

<span class="theory-group-label practical">Practical Theory</span>

## Area structure

```text
06 Battery Operation Theory
├── 01_voltage_curves      V-Q curve / dQ/dV (ICA) / dV/dQ (DVA) / hysteresis
├── 02_polarization        three overpotential components / GITT diffusivity / EIS equivalent circuits
├── 03_interface           SEI / CEI / Li plating / dendrite / cross-talk
├── 04_mechanochemistry    volume change / stress-diffusion coupling / particle fracture / Si anode
├── 05_thermal             reversible heat / entropy measurement / Bernardi / thermal runaway
├── 06_degradation         LLI / LAM / TM dissolution / cation mixing / gas
├── 07_operando            operando XRD/Raman/TEM/DEMS/NMR/XAS
└── 08_anomalies           voltage fade / memory effect / anionic redox / knee
```

## Overview

The battery operation theory area comprehensively treats the electrochemical and physicochemical phenomena that real lithium-ion cells undergo during charge-discharge. Rather than simply listing individual phenomena, the goal is to connect them into a coherent picture: why voltage curves take the shape they do (thermodynamics), how overpotentials decompose into components (kinetics), what happens at the interfaces (SEI/CEI), mechanical degradation and thermal behavior, long-term aging mechanisms, and the experimental techniques used to observe all of this.

This area is a "comprehensive application" area showing how the foundational theories of 01–05 — electrochemical thermodynamics/kinetics, solid-state chemistry, statistical mechanics — manifest in real batteries. The body text contains the key results of the foundational theories as self-contained inline reference boxes, so that the flow is not broken even if you read only the boxes. When you want to dig deeper, you can follow the foundational chapters (01–05) cited in the boxes.

The theoretical background needed to interpret the data most often encountered in research practice — charge-discharge curves, EIS spectra, GITT results, cycle life curves — can all be found in this area.

## Learning goals

- Explain the plateau/slope shapes of charge-discharge (V-Q) curves through the thermodynamics of two-phase reactions vs solid-solution reactions, and diagnose aging modes via ICA (dQ/dV) and DVA (dV/dQ) analysis.
- Decompose overpotential into ohmic, activation, and concentration polarization, and understand how to quantify each component using GITT and EIS.
- Explain the formation mechanism, structure, and growth kinetics of the SEI (Solid Electrolyte Interphase), and its relation to Coulombic efficiency.
- Distinguish LLI (Loss of Lithium Inventory) from LAM (Loss of Active Material) and interpret the electrochemical signature of each aging mode.
- Distinguish the principles and the questions answerable by operando XRD, Raman, DEMS, XAS, and other real-time techniques.

## Subtopic table of contents

| File | Core content (one line) |
|------|----------------|
| [`01_voltage_curves.md`](./01_voltage_curves.md) | V-Q curves, ICA/DVA analysis, hysteresis |
| [`02_polarization.md`](./02_polarization.md) | three overpotential components, GITT diffusivity, EIS equivalent circuits |
| [`03_interface.md`](./03_interface.md) | SEI/CEI structure and growth, Li plating, dendrites |
| [`04_mechanochemistry.md`](./04_mechanochemistry.md) | volume change, stress-diffusion coupling, particle fracture |
| [`05_thermal.md`](./05_thermal.md) | reversible/irreversible heat, entropy measurement, thermal runaway |
| [`06_degradation.md`](./06_degradation.md) | LLI/LAM, TM dissolution, cation mixing, gas evolution |
| [`07_operando.md`](./07_operando.md) | XRD/Raman/TEM/DEMS/NMR/XAS real-time techniques |
| [`08_anomalies.md`](./08_anomalies.md) | Voltage fade, memory effect, anionic redox, knee point |

## Recommended references

- Newman & Thomas-Alyea, *Electrochemical Systems* (3rd ed.) — porous electrode model, polarization decomposition theory.
- Vetter et al., *Electrochimica Acta* 50 (2005) 2735–2751 — comprehensive review of aging mechanisms.
- Birkl et al., *Journal of Power Sources* 341 (2017) 373–386 — the standard reference for LLI/LAM diagnostic methodology.
- Christensen & Newman, *Journal of The Electrochemical Society* 153 (2006) A1019 — stress-diffusion coupled model.

## Authoring status

- **Current status:** body complete (all 8 subtopic files written).
- Each body file is self-contained through cross-reference inline boxes — even without following the foundational theory files (01–05), the flow is preserved by reading the boxes alone.
- For deeper reading, jump to the foundational body cited in the box (e.g., `01_electrochemistry/02_kinetics.md`).
