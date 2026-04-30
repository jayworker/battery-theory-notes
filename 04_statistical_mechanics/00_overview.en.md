# Statistical Mechanics

<span class="theory-group-label foundation">Foundational theory</span>

## Module map

```text
04 Statistical Mechanics
├── 01_ensembles            NVE / NVT / μVT / NPT / Boltzmann distribution
├── 02_partition_function   Z / free energy / extracting thermodynamic quantities / lattice gas
├── 03_lattice_models       Ising / mean field / Cluster Expansion / MC
├── 04_phase_transitions    order parameter / critical exponents / universality / Landau
└── 05_transport_theory     Onsager / FDT / Green-Kubo / Einstein relation
```

## Overview

Statistical mechanics is the theoretical framework that derives macroscopic thermodynamic functions (free energy, entropy, pressure) from microscopic degrees of freedom (atomic and molecular positions and momenta). In battery materials research, statistical mechanics is needed at several levels: predicting finite-temperature phase behavior from DFT results, understanding the temperature dependence of ion diffusion, and explaining the SOC dependence of intercalation voltage in electrode materials.

Ensemble theory is the core framework of statistical mechanics. The canonical ensemble (NVT), the isothermal-isobaric ensemble (NPT), and the grand canonical ensemble each correspond to different external conditions; in battery intercalation reactions, where the lithium chemical potential plays the central role, the grand canonical viewpoint is the natural one.

Lattice models and cluster expansions serve as the bridge connecting DFT calculations and statistical mechanics. Computing atomic-scale interaction energies with DFT and feeding them into Monte Carlo simulations to predict finite-temperature phase diagrams is the core workflow of contemporary battery-materials theoretical research.

## Learning goals

- Explain the logic by which the Helmholtz free energy is derived from the partition function of the canonical ensemble.
- Understand the role of the chemical potential ($\mu$) in the grand canonical ensemble and its correspondence with battery intercalation reactions.
- Explain the basic ideas of the Ising model and cluster expansion, and understand their application to fitting DFT data.
- Distinguish first-order from second-order phase transitions in terms of the order parameter and connect them to plateaus/slopes in voltage curves.
- Explain the relation between the diffusion coefficient and the mobility in Onsager transport theory.

## Subtopics

| File | Core content (one line) |
|------|----------------|
| [`01_ensembles.md`](./01_ensembles.md) | Microstate counting; NVT/NPT/grand canonical ensembles |
| [`02_partition_function.md`](./02_partition_function.md) | Definition of the partition function and its link to Helmholtz/Gibbs free energy |
| [`03_lattice_models.md`](./03_lattice_models.md) | Ising model, cluster expansion, and the link to Monte Carlo |
| [`04_phase_transitions.md`](./04_phase_transitions.md) | First-/second-order phase transitions, order parameter, overview of Landau theory |
| [`05_transport_theory.md`](./05_transport_theory.md) | Onsager reciprocal relations, diffusion coefficient, ionic mobility |

## Recommended references

- McQuarrie, *Statistical Mechanics* — the standard physical-chemistry textbook on statistical mechanics. Systematic coverage from partition functions to transport theory.
- Hill, *An Introduction to Statistical Thermodynamics* — strong on the thermodynamics-statistical mechanics connection. Also covers small-system statistical mechanics.
- Chandler, *Introduction to Modern Statistical Mechanics* — includes modern topics such as phase transitions and correlation functions.

## Authoring status

- **Current state:** main text complete (all five subtopic files written).
- Each subtopic file follows the structure: learning goals → main text → references.
- The voltage-curve and thermal-phenomena sections of the operation theory chapter (06) cite results from the partition function, lattice models, and phase transitions chapters.
