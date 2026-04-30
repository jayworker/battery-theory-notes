# Electrochemical Analysis — Overview

<span class="theory-group-label practical">Practical theory</span>

## Module map

```text
08 Electrochemical Analysis
├── 01_cv                   Randles-Sevcik / reversibility diagnosis / scan rate
├── 02_gcd_rate             C-rate / rate capability / formation cycle / ICE
├── 03_eis_practical        measurement setup / fitting workflow / KK validation / pitfalls
├── 04_gitt_pitt            Weppner-Huggins / pulse / relaxation / D_Li extraction
├── 05_three_electrode      RE selection / Luggin / pseudo-RE risks
├── 06_lsv_tafel            stability window / Tafel slope / j₀ estimation
└── 07_cycling_protocols    formation / calendar / accelerated / BMS window
```

## 1. Position of this module

If module 06, battery operation (`battery operation`), addresses "why does this phenomenon appear?", module 08, electrochemical analysis, addresses **how do we measure and interpret that phenomenon?**. That is, while 06 explains the mechanisms of polarization, aging, and the interface, module 08 organizes what techniques such as CV, GCD, EIS, GITT/PITT, and LSV **assume**, **under which conditions they are reliable**, and **what the extracted values actually mean**.

If module 01 (electrochemistry fundamentals) covered the **equations themselves**—Butler-Volmer, Nernst, Warburg—module 08 is the applied counterpart that organizes the **procedure for fitting those equations to data** and the **common pitfalls** encountered in practice.

It is the practical manual for the commercial potentiostat data (BioLogic, Gamry, Autolab) that graduate-school labs see every day—how to acquire, inspect, and interpret it.

## 2. Learning goals

After working through this module, you should be able to:

1. Quantitatively diagnose **reversibility** from CV (cyclic voltammetry) data and distinguish surface reactions from diffusion-controlled reactions via their scan-rate dependence.
2. Design GCD (galvanostatic charge-discharge) rate tests and cycling protocols **following the standard procedure**, and quantify ICE, rate capability, and retention.
3. Check **AC amplitude, frequency range, DC bias, and KK validation** for an EIS measurement, and complete the fitting workflow including residual analysis.
4. Identify violated assumptions (measuring on a plateau, inappropriate pulse duration) when extracting the **solid-state diffusion coefficient** $D_\text{Li}$ via GITT/PITT.
5. Use a 3-electrode cell design (reference selection, placement, Luggin) to **separately measure cathode and anode polarization**.

## 3. Subtopic table of contents

| File | One-line summary |
|------|------------------|
| `01_cv.md` | Reversibility diagnosis and Randles-Sevcik analysis with CV — distinguishing surface vs diffusion-controlled |
| `02_gcd_rate.md` | C-rate definition, rate-capability measurement procedure, ICE, and formation cycle |
| `03_eis_practical.md` | EIS measurement setup, fitting workflow, KK validation, and common pitfalls |
| `04_gitt_pitt.md` | GITT vs PITT — pulse and relaxation time selection and conditions for applying Weppner-Huggins |
| `05_three_electrode.md` | 3-electrode cell design, reference electrode selection and placement |
| `06_lsv_tafel.md` | Stability-window measurement and Tafel-slope / $j_0$ extraction by LSV |
| `07_cycling_protocols.md` | Formation, calendar, and accelerated-aging protocols and BMS-relevant windows |

## 4. Decision tree: "which measurement should I use?"

Once the research question is fixed, the tool follows. The mapping below covers the questions most often encountered to the appropriate measurement technique.

- **Diagnose redox reversibility?** → CV ($\Delta E_p$, $i_{pa}/i_{pc}$ ratio)
- **Capacity vs C-rate?** → GCD rate test (0.1C → 10C → 0.1C recovery)
- **Where does the resistance come from?** → EIS + DRT (Distribution of Relaxation Times)
- **Solid-state diffusion coefficient $D_\text{Li}$?** → GITT or PITT (vs SOC)
- **Separate cathode / anode polarization?** → 3-electrode cell
- **Electrolyte stability window?** → LSV (oxidation / reduction limit potentials)
- **Lifetime / aging assessment?** → cycling protocols (formation + calendar + accelerated)

It is standard to **cross-validate** with multiple measurements. Example: $j_0$ can be extracted from both the CV Tafel region and the EIS $R_\text{ct}$, and if the two values differ by more than an order of magnitude one should suspect violated assumptions (multistep reaction, intrusion of concentration polarization).

## 5. Recommended references

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Ch. 6–10 are the standard reference for CV, step, and hydrodynamic methods. The experimental chapters (Ch. 11–15) cover cell design, reference electrodes, and instrumentation.
- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — the standard text for EIS measurement, fitting, KK, and DRT. Rich in practical circuit catalogs.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — CV, LSV, and Tafel analysis in a student-friendly tone, with many simulation examples.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — strong chapters on KK validation and practical measurement.
- Plett, G. L. *Battery Management Systems* Vol. 1–2 (Artech House, 2015) — cycling protocols, SOC, and SOH estimation from a BMS perspective.

## 6. Authoring status

**Body complete** (2026-04-27). All 7 body files passed Tier review, zero out-of-box links, KR/EN labels, LaTeX, and references all conform to convention.
