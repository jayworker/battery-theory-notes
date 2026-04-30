# DFT and Quantum Chemistry

<span class="theory-group-label foundation">Foundational Theory</span>

## Module map

```text
03 DFT/Quantum Chemistry (Quantum Chemistry and DFT)
├── 01_quantum_basics       Schrödinger / wavefunction / Slater / Hartree-Fock
├── 02_dft_foundations      Hohenberg-Kohn / Kohn-Sham / SCF / variational principle
├── 03_exchange_correlation LDA / GGA(PBE) / hybrid(HSE) / DFT+U
├── 04_practical_dft        pseudopotential / k-point / cutoff / convergence diagnostics
└── 05_dft_battery          voltage calculation / NEB migration barrier / formation energy / Bader
```

## Overview

Density Functional Theory (DFT) is the most widely used first-principles method in modern battery materials research. Because it works from electronic structure, it can predict crystal-structure stability, reaction voltages, and ion migration barriers, making it complementary to experiment in materials design.

This module starts from the basics of quantum mechanics — the Schrödinger equation and the interpretation of the wavefunction — and proceeds to the Hohenberg-Kohn theorems and the Kohn-Sham equations that frame the many-electron problem. Practical DFT depends crucially on the choice of exchange-correlation functional (LDA, GGA, hybrid), and the numerical setup — pseudopotentials, $k$-point sampling, and energy cutoff — directly determines the calculation quality.

In battery DFT, the calculation of Li insertion/extraction voltages ($\Delta G = -nFE$) and ion migration barriers via the Nudged Elastic Band (NEB) method are particularly important. DFT+U corrections and van der Waals treatment have a direct impact on the accuracy of layered transition-metal oxide calculations.

## Learning objectives

- Explain the Schrödinger equation and the meaning of the Born-Oppenheimer approximation
- Understand the core content of the Hohenberg-Kohn theorems (one-to-one correspondence between external potential and electron density) and conceptually explain the transition to the Kohn-Sham equations
- Compare LDA, GGA, and hybrid functionals and their suitability for battery materials calculations
- Explain the principles of voltage calculation and ion migration barrier (NEB) calculation in battery DFT
- Qualitatively judge the influence of computational parameters (cutoff energy, $k$-point mesh, $U$ value) on the results

## Subtopics

| File | Core content (one line) |
|------|------------------------|
| [`01_quantum_basics.md`](./01_quantum_basics.md) | Schrödinger equation, wavefunctions, Born-Oppenheimer approximation |
| [`02_dft_foundations.md`](./02_dft_foundations.md) | Hohenberg-Kohn theorems, Kohn-Sham equations, self-consistent solution |
| [`03_exchange_correlation.md`](./03_exchange_correlation.md) | LDA, GGA (PBE), hybrid functionals, DFT+U |
| [`04_practical_dft.md`](./04_practical_dft.md) | Pseudopotentials, plane-wave basis, $k$-points, cutoff energy |
| [`05_dft_battery.md`](./05_dft_battery.md) | Insertion-voltage calculation, NEB migration barriers, surface/interface modeling |

## Recommended references

- Sholl & Steckel, *Density Functional Theory: A Practical Introduction* — practical-calculation perspective; the most accessible entry point for battery researchers.
- Koch & Holthausen, *A Chemist's Guide to Density Functional Theory* — chemical perspective on functional theory.
- Martin, *Electronic Structure: Basic Theory and Practical Methods* — reference when deeper theoretical treatment is needed.

## Authoring status

- **Current state:** All five subtopic files are complete (main text written for all of them).
- Each subtopic file follows the structure: learning objectives → main text → references.
- The voltage-curve and migration-barrier boxes in the Operation chapter (06) cite results from this module (voltage formula, NEB).
