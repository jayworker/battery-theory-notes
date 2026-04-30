# Electrochemistry Fundamentals

<span class="theory-group-label foundation">Foundational theory</span>

## Area structure

```text
01 Electrochemistry fundamentals
├── 01_thermodynamics      Gibbs / Nernst / electrode potential / Pourbaix / activity
├── 02_kinetics            Butler-Volmer / Tafel / Marcus / exchange current
├── 03_mass_transport      Fick / Nernst-Planck / Cottrell / Levich
├── 04_double_layer        Helmholtz / GCS / Stern / Debye / PZC
└── 05_eis_fundamentals    complex impedance / Randles / Warburg / KK / DRT
```

## Overview

Electrochemistry is the discipline that deals with the mutual conversion between electrical and chemical energy. A secondary battery is essentially an electrochemical reactor, so accurately understanding concepts such as electrode potential, overpotential, and mass transport is the starting point of battery research.

This area starts from thermodynamic equilibrium conditions — at what potential is a reaction spontaneous? — and extends into the kinetic regime. The core task is to distinguish how far the actual potential deviates from equilibrium when current flows (overpotential) and from which step that overpotential originates (reaction kinetics, mass transport, electrical double layer).

These fundamentals matter for battery researchers because the language used to interpret all experimental data — charge–discharge curves, impedance spectra, GITT results — comes from this area. To understand what each semicircle in EIS means, or what one can read from the Tafel slope, this foundation is indispensable.

## Learning objectives

- Explain the relationship between Gibbs free energy and electrode potential, and the Nernst equation in terms of concentration/activity.
- Identify the meaning of the exchange current density ($i_0$) and the transfer coefficient ($\alpha$) in the Butler–Volmer equation, and explain the conditions for the Tafel-region approximation.
- Distinguish the three mass-transport mechanisms — diffusion, convection, migration — and apply Fick's laws to battery situations.
- Understand the structure and capacitance of the electrical double-layer models (Helmholtz, Gouy–Chapman, Stern).
- Map each feature of an EIS Nyquist plot (semicircle, Warburg tail) to a physical process.

## Subtopics

| File | Core content (one line) |
|------|----------------|
| [`01_thermodynamics.md`](./01_thermodynamics.md) | Gibbs energy, Nernst equation, electrode potential, Pourbaix diagram |
| [`02_kinetics.md`](./02_kinetics.md) | Butler–Volmer equation, Tafel slope, exchange current density |
| [`03_mass_transport.md`](./03_mass_transport.md) | Fick's laws, diffusion layer, Sand equation, concentration polarization |
| [`04_double_layer.md`](./04_double_layer.md) | Helmholtz/GCS/Stern models, double-layer capacitance |
| [`05_eis_fundamentals.md`](./05_eis_fundamentals.md) | Definition of impedance, Nyquist/Bode plots, equivalent-circuit elements |

## Recommended references

- Bard & Faulkner, *Electrochemical Methods: Fundamentals and Applications* (2nd ed.) — the standard electrochemistry textbook. Systematically covers thermodynamics, kinetics, and techniques.
- Newman & Thomas-Alyea, *Electrochemical Systems* (3rd ed.) — specialized for battery / fuel-cell applications. Strong on mass transport and porous-electrode theory.
- Lasia, *Electrochemical Impedance Spectroscopy and its Applications* — the standard reference for EIS theory and equivalent-circuit modeling.

## Authoring status

- **Current state:** body complete (all five subtopic files have written bodies)
- Each subtopic file follows the structure: learning objectives → body → references.
- The inline reference boxes in the operation theory (06) frequently cite the body of this area.
