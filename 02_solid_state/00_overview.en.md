# Solid State Physics and Chemistry

<span class="theory-group-label foundation">Foundational theory</span>

## Module map

```text
02 Solid State Physics and Chemistry
├── 01_crystal_structure   Bravais / space group / Miller / rock-salt·layered·spinel·olivine
├── 02_band_theory         Bloch / DOS / Fermi level / d-band / Jahn-Teller
├── 03_defect_chemistry    point defects / Kröger-Vink / Schottky·Frenkel / Brouwer
├── 04_ionic_conduction    Arrhenius / hopping / Nernst-Einstein / Haven ratio
└── 05_phase_diagrams      Gibbs phase rule / common tangent / intercalation phase diagrams
```

## Overview

Solid state physics and solid state chemistry form the foundation for understanding the structure–property relationships of battery materials. The cathode materials (NMC, LFP, etc.), anode materials (graphite, Si), and solid electrolytes used in lithium-ion batteries all possess specific crystal structures, and these structures determine the ionic conductivity, electronic conductivity, phase stability, and thermal stability.

Starting from crystal structure and symmetry and proceeding to electronic structure (band theory), one can answer the question "why is one material a metallic conductor while another is an insulator". Point defects and the Kröger-Vink notation describe the actual carriers of ionic motion and electronic conduction in a material, and they are directly tied to the activation energy of ionic conduction.

The theory of phase equilibria and phase transitions is essential for thermodynamically understanding the structural changes that occur during charge and discharge — for example layered → spinel → rock-salt conversions. The way the Gibbs phase rule together with free-energy curves dictates the shape of the voltage curve (plateau vs slope) connects directly to battery operation theory.

## Learning goals

- Describe the crystal structures of major battery materials (layered, spinel, olivine) using space groups and Wyckoff positions.
- Use band theory to distinguish electronic conductors, insulators, and semiconductors, and explain the $d$-band character of transition-metal oxides.
- Write point-defect reactions in Kröger-Vink notation and relate defect concentrations to ionic conductivity.
- Analyze the activation energy of ionic conduction with the Arrhenius equation and apply it to material-selection criteria.
- Use the Gibbs phase rule and free-energy versus composition curves to distinguish two-phase coexistence regions from single-phase solid-solution regions.

## Subtopics

| File | Key content (one line) |
|------|----------------|
| [`01_crystal_structure.md`](./01_crystal_structure.md) | Bravais lattices, space groups, crystal structures of battery materials |
| [`02_band_theory.md`](./02_band_theory.md) | Free-electron model, band gap, transition-metal $d$-band |
| [`03_defect_chemistry.md`](./03_defect_chemistry.md) | Point-defect types, Kröger-Vink notation, defect equilibria |
| [`04_ionic_conduction.md`](./04_ionic_conduction.md) | Arrhenius activation energy, ionic conduction pathways, solid electrolytes |
| [`05_phase_diagrams.md`](./05_phase_diagrams.md) | Gibbs phase rule, two-phase coexistence, free-energy curves linked to voltage |

## Recommended references

- West, *Solid State Chemistry and its Applications* (2nd ed.) — a standard solid-state-chemistry textbook that treats crystal structure, defect chemistry, and ionic conduction in a balanced way.
- Kittel, *Introduction to Solid State Physics* — physical foundations of band theory and crystal structure.
- Shriver & Atkins, *Inorganic Chemistry* — electronic structure and coordination chemistry of transition-metal oxides.

## Authoring status

- **Current state:** main text complete (all five subtopic files have their main text written).
- Each subtopic file follows a learning-goals → main-text → references structure.
- The aging, interface, and mechanochemistry sections of the operation theory chapter (06) cite the crystal-structure and defect-chemistry results of this area inline.
