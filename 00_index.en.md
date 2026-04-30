# Secondary-Battery Theory Study Notes

> Theory study notes for secondary-battery materials research

---

## How to use

- **Purpose:** Re-learning (review) notes for a graduate student in secondary-battery materials research. Not a textbook for first-time learners — a reference book for quickly reviving content that "was heard in class but never properly organized."
- **Language:** The Korean source body annotates English technical terms in parentheses on first occurrence (e.g., "polarization" alongside the Korean term). The English `*.en.md` mirror provides the same content in standard academic English.
- **Math:** LaTeX notation (`$...$` inline, `$$...$$` block). Targets GitHub Markdown / VSCode Preview rendering.
- **Structure:** Folder per area → `.md` files per subtopic. Read each area's `00_overview.md` first to grasp the overall flow, then enter the subtopic files.
- **Cross-references:** The body of the operation theory (06) self-containedly includes the key results of the foundational theory (01–05) as inline reference boxes. The flow stays intact even if you only read the boxes; jump to the cited foundational-theory file when you want to dig deeper.

---

## Module map

The top tabs expose nine areas (01–09) side by side. Conceptually they fall into two groups.

### <span class="theory-group-label foundation">Foundational theory</span> 01 – 05

The physics, chemistry, and mathematics foundations. The basis for the key results that the operation-theory body cites in boxes.

| No. | Area | Overview link |
|------|--------|--------------|
| 01 | Electrochemistry | [01_electrochemistry/00_overview.md](./01_electrochemistry/00_overview.md) |
| 02 | Solid-state physics & chemistry | [02_solid_state/00_overview.md](./02_solid_state/00_overview.md) |
| 03 | DFT & quantum chemistry | [03_quantum_dft/00_overview.md](./03_quantum_dft/00_overview.md) |
| 04 | Statistical mechanics | [04_statistical_mechanics/00_overview.md](./04_statistical_mechanics/00_overview.md) |
| 05 | Mathematical tools | [05_math_tools/00_overview.md](./05_math_tools/00_overview.md) |

### <span class="theory-group-label practical">Practical theory</span> 06 – 09

Areas dealing with actual cells and analytical instrumentation. Tools used daily in synthesis, measurement, and interpretation.

| No. | Area | Overview link |
|------|--------|--------------|
| 06 | Battery operation theory | [06_battery_operation/00_overview.md](./06_battery_operation/00_overview.md) |
| 07 | Materials characterization | [07_materials_analysis/00_overview.md](./07_materials_analysis/00_overview.md) |
| 08 | Electrochemical analysis | [08_echem_analysis/00_overview.md](./08_echem_analysis/00_overview.md) |
| 09 | Advanced / operando analysis | [09_advanced_analysis/00_overview.md](./09_advanced_analysis/00_overview.md) |

---

## One-line description per area

- **01 Electrochemistry fundamentals:** Electrode potential, Nernst equation, Butler–Volmer kinetics, mass transport, electrical double layer, EIS principles — the language of battery electrochemistry.
- **02 Solid-state physics/chemistry:** Crystal structure, band theory, defect chemistry, ionic conduction, phase equilibria — the microscopic basis of materials properties.
- **03 DFT/quantum chemistry:** Schrödinger equation, Hohenberg–Kohn theorems, Kohn–Sham equations, exchange–correlation functionals — the theoretical foundation of first-principles calculations.
- **04 Statistical mechanics:** Ensemble theory, partition functions, lattice models, theory of phase transitions, Onsager transport — the link between thermodynamic functions and microstates.
- **05 Mathematical tools:** ODE/PDE, linear algebra, complex analysis and transforms, numerical methods, data analysis — the mathematical language bridging theory and experiment.
- **06 Battery operation theory:** Charge–discharge curves, polarization decomposition, interfacial phenomena, mechanochemistry, thermal phenomena, degradation mechanisms, operando techniques, anomalous phenomena — a synthesis of how real batteries operate.
- **07 Materials characterization:** XRD, SEM, TEM, XPS, Raman, BET, ICP, TGA — the basic toolkit for materials synthesis and verification.
- **08 Electrochemical analysis:** CV, GCD, EIS, GITT, three-electrode, LSV, cycling — measurement setup and data-interpretation workflows.
- **09 Advanced analysis:** Operando XRD, XAS, cryo-EM, DEMS, ssNMR, EC-AFM, ToF-SIMS — tools that exploit synchrotron/collaborative facilities.

---

## Learning entry points

**Current state:** All nine areas (01–09) have completed bodies. A total of 57 markdown files (9 per-area `00_overview.md` + 48 subtopic body files + 1 index + others), about 7,400+ lines.

## Entry path by research stage (NEW)

| Research stage | Recommended areas |
|---|---|
| Theory study | 01–05 (foundations) → 06 (operation) |
| Verification right after synthesis | 07 materials characterization (XRD, SEM, ICP) |
| Cell measurement / interpretation | 08 electrochemical analysis (CV, GCD, EIS) |
| Mechanism elucidation (paper) | 09 advanced analysis (operando, cryo-EM, XAS) |
| Degradation / failure analysis | 06 degradation + 07 post-mortem + 08 EIS + 09 ssNMR |

There are two recommended learning flows.

1. **Operation-theory-first flow (practical / interpretation oriented)**
   - Entry: [`06_battery_operation/00_overview.md`](./06_battery_operation/00_overview.md) → enter from a subtopic of interest (e.g., `02_polarization.md`).
   - The operation-theory body self-containedly includes the foundational theory as inline boxes, so the flow does not break even if you read only the boxes.
   - When you want to look more deeply at a foundational topic cited in a box (e.g., Butler–Volmer in 01, crystal structure in 02), jump to the corresponding file.
   - Suited for quickly recovering interpretation skills for charge–discharge curves, EIS, GITT, and similar experimental data.

2. **Foundations → applications flow (theory-system oriented)**
   - Entry: [`01_electrochemistry/00_overview.md`](./01_electrochemistry/00_overview.md) → 02 → 03 → 04 → 05 → 06 in order.
   - The standard learning order: electrochemistry → solid-state chemistry → DFT → statistical mechanics → mathematical tools → operation-theory synthesis.
   - Suited for re-reviewing the entire theoretical system or reading through from the beginning.

**Research-topic matching guide (recommended re-learning entry points):**
- Cathode synthesis / structure / degradation → 02 → 06.06 → 06.04
- DFT calculations (voltage, migration barriers) → 03 → 06.01 → 02.03
- EIS / GITT interpretation → 01.05 → 01.02 → 06.02 → 06.07
- Solid electrolyte / ionic conduction → 02.04 → 04.05 → 06.03
- Cell life / accelerated aging → 06.06 → 06.03 → 06.08

---

*Created: 2026-04-27 | Plan ID: battery-theory-textbook*
