# Exchange-Correlation Functionals

## 1. Overview

As we saw in [`02_dft_foundations.md`](./02_dft_foundations.md), all the difficulty of Kohn-Sham DFT is condensed into a single quantity — the exchange-correlation energy functional $E_{xc}[n]$. The kinetic energy and Hartree term are computed exactly, so what really determines the accuracy of the result is the choice of functional.

Intuitively, $E_{xc}$ bundles two quantum-mechanical effects together. (i) Exchange: the Pauli effect that prevents two same-spin fermions from occupying the same place, producing a "Fermi hole" around each electron. (ii) Correlation: a dynamical effect by which even opposite-spin electrons avoid each other due to Coulomb repulsion, producing an additional "Coulomb hole." An exact $E_{xc}$ would exactly capture the cost of both holes.

This section follows the ladder of functionals — Perdew's "Jacob's ladder of DFT" — through LDA, GGA, meta-GGA, hybrid, and on to DFT+U for strongly correlated systems. It closes with practical guidance on which functional to choose for which class of battery materials.

Key message: "more expensive functionals are not always better." The optimal functional depends on the system and the question, and a wrong choice can leave you spending big computational resources on a large system to obtain *worse* results.

## 2. LDA: uniform-electron-gas approximation

The simplest and oldest (1965) approximation is LDA (local density approximation). The intuition: "at each point, $E_{xc}$ is determined by looking only at the local density $n(\mathbf{r})$ — as if that point were embedded in a homogeneous electron gas (HEG) of the same density."

The HEG is a model system for which $E_{xc}$ is known essentially exactly from quantum Monte Carlo (Ceperley-Alder 1980), and LDA applies that result locally.

$$E_{xc}^{LDA}[n] = \int n(\mathbf{r}) \, \epsilon_{xc}(n(\mathbf{r})) \, d^3r$$

Here $\epsilon_{xc}(n)$ is the per-particle exchange-correlation energy of the HEG (a function of $n$, parameterized). The exchange part is analytic, $\epsilon_x(n) = -\frac{3}{4}(\frac{3n}{\pi})^{1/3}$, while the correlation part uses parameterizations such as PW92 (Perdew-Wang 1992) or VWN (Vosko-Wilk-Nusair).

LDA's strengths: simplicity and speed. It is surprisingly accurate for simple metals (Na, Al) and for structural quantities such as bond lengths. The reason is fortuitous error cancellation — LDA exactly satisfies the sum rule (the integral of the electron density gives an integer) and hole normalization.

LDA's weaknesses:
- **Bond-energy overestimation (overbinding)**: typically ~30% too strong, with lattice constants ~1–3% too small.
- **Self-interaction error (SIE)**: severe over-delocalization of d/f electrons in strongly correlated systems.
- **Band-gap underestimation**: even worse than GGA (gaps ~50% of experiment).
- **Large errors in molecular atomization energies**: well short of chemical accuracy ($\sim 1$ kcal/mol).

In the battery context, LDA is rarely used on its own, though it is sometimes combined as LDA+U for correlated oxides. The standard has shifted to GGA.

## 3. GGA: density-gradient corrections

The next rung above LDA looks not only at the density itself but also at its spatial gradient $\nabla n(\mathbf{r})$ — this is GGA (generalized gradient approximation). Real molecular and crystalline densities are never uniform; they fall off steeply near nuclei and vary smoothly in bonding regions, and incorporating gradient information improves accuracy.

$$E_{xc}^{GGA}[n] = \int n(\mathbf{r}) \, \epsilon_{xc}(n, \nabla n) \, d^3r$$

There are dozens of GGA parameterizations, but the de facto standard in solid-state physics and battery research is **PBE** (Perdew-Burke-Ernzerhof, 1996). PBE is a parameter-free, non-empirical functional built solely from theoretical constraints (the correct LDA limit, the response of the homogeneous electron gas, etc.).

Strengths of PBE:
- Bond lengths and lattice constants accurate to within ~1%.
- Cohesive energies improved over LDA (still ~10–20% underestimated).
- Non-empirical and consistently accurate across a wide range of systems.
- Standard in all major codes — VASP, Quantum ESPRESSO, GPAW, etc.

Weaknesses of PBE:
- SIE still present (over-delocalization for Ni d in NMC, Co d in LCO).
- Band-gap underestimation persists (~50–70% of experiment).
- Neglects vdW dispersion (fails for graphite interlayers and molecular crystals).
- Surface adsorption energies accurate only to ~0.2 eV.

Other GGAs that come up frequently:
- **PBEsol**: a re-tuning of some PBE parameters to give better solid-state lattice constants. PBE remains better for molecular energies.
- **revPBE/RPBE**: strong for surface adsorption (catalysis research).
- **BLYP**: Becke88 exchange + Lee-Yang-Parr correlation, often used in molecular quantum chemistry.

The standard for cathode calculations is almost always PBE+U (next section) or SCAN (meta-GGA); PBE alone is used for systems with weak strong-correlation effects (graphite, Si, polymer electrolytes).

## 4. Meta-GGA and hybrids

Above GGA come meta-GGAs, which additionally use the kinetic energy density $\tau(\mathbf{r}) = \frac{1}{2}\sum_i |\nabla\phi_i|^2$, and hybrid functionals, which mix in a fraction of exact HF exchange.

### Meta-GGA: SCAN

**SCAN** (strongly constrained and appropriately normed; Sun-Ruzsinszky-Perdew 2015) is a non-empirical meta-GGA that satisfies all 17 known exact constraints. It is becoming increasingly close to standard for battery oxide calculations.

$$E_{xc}^{SCAN}[n, \nabla n, \tau] = \int n(\mathbf{r}) \, \epsilon_{xc}(n, \nabla n, \tau) \, d^3r$$

Strengths of SCAN: it reproduces oxidation states and magnetic moments in NMC and LFP reasonably even without PBE+U, and it improves bond energies and band gaps over PBE. Weaknesses: ~3× more expensive than PBE and SCF convergence is delicate, often requiring tuned mixing parameters (especially for magnetic systems).

### Hybrid: HSE06

A hybrid functional mixes a fraction of exact HF exchange into a GGA. The simplest example is B3LYP, the standard in molecular quantum chemistry: 20% HF + Becke88 + LYP. For solids, long-range HF leads to divergence problems, so range-separated hybrids are preferred.

**HSE06** (Heyd-Scuseria-Ernzerhof, 2006) mixes 25% HF only in the short range and uses pure PBE in the long range.

$$E_{xc}^{HSE} = \alpha E_x^{HF,SR}(\omega) + (1-\alpha) E_x^{PBE,SR}(\omega) + E_x^{PBE,LR}(\omega) + E_c^{PBE}$$

Term by term: $\alpha = 0.25$ (HF mixing fraction), $\omega = 0.2$ Å$^{-1}$ (range-separation parameter, screening length about 5 Å), SR/LR = short/long range. The 25% mixing fraction is a non-empirical value motivated by adiabatic connection theory.

Strengths of HSE06:
- Substantial improvement in band gaps (Si: 1.15 eV, essentially matching experiment).
- Partial correction of SIE in strongly correlated systems.
- Excellent accuracy for defect levels in insulators/semiconductors.

Weaknesses of HSE06:
- ~10–50× more expensive than PBE (HF exchange in plane-wave codes is a non-local integral).
- Sensitive to the number of k-points; impractical for large systems (>100 atoms).
- Inappropriate for metals (the screening assumption breaks down).

Battery applications of hybrids: polaron localization in LFP, oxygen redox in NMC, defect oxides in electrolyte decomposition — all situations where quantitative oxidation states and defect formation energies matter.

## 5. DFT+U: correction for strong correlation

For strongly localized states such as the d electrons of transition-metal oxides or the f electrons of lanthanides, the SIE of LDA/PBE is severe and produces unphysical metallicity and excessive over-delocalization. **DFT+U** (Anisimov-Zaanen-Andersen 1991, Dudarev 1998), inspired by the Hubbard model, imposes an additional penalty on localized d/f orbitals to drive the occupation toward integer values.

Intuitively, with the exact functional, $E$ should be piecewise-linear in occupation between integers (Janak's theorem). Approximate functionals instead give a smooth curve at fractional occupations, favoring delocalization. The $+U$ term lifts the curve near integer occupation, restoring integer filling.

The simplified Dudarev form:

$$E^{DFT+U} = E^{DFT} + \frac{U_{eff}}{2}\sum_{I,\sigma}\left[\text{Tr}(\rho^{I,\sigma}) - \text{Tr}(\rho^{I,\sigma}\rho^{I,\sigma})\right]$$

with $\rho^{I,\sigma}$ = occupation matrix of atom $I$ in spin channel $\sigma$, and $U_{eff} = U - J$ (effective value, Hubbard repulsion $U$ minus Hund's exchange $J$). The penalty vanishes when the occupation is 0 or 1 and is largest near 0.5.

Standard $U$ values for cathode materials (PBE+U corrections to oxides from Wang, Maxisch, Ceder 2006):
- Ni 3d: $U \approx 6.2$ eV
- Co 3d: $U \approx 3.3$ eV
- Mn 3d: $U \approx 3.9$ eV
- Fe 3d: $U \approx 4.0$ eV
- V 3d: $U \approx 3.1$ eV

These values are empirical, fitted to experimental oxide formation energies, and the same element with a different oxidation state may need a slightly different $U$. More rigorously, $U$ can be determined self-consistently via the linear-response method (Cococcioni-de Gironcoli 2005).

Limitations of DFT+U: $U$ is a parameter, so the results carry system dependence; migration barriers and absolute voltages are sensitive to the $U$ value (typically ~0.1 V per unit of $U$); and DFT+U is inappropriate for metallic phases. Even so, the de facto standard for NMC and LFP calculations is PBE+U (or SCAN+U).

> **Related concept: self-interaction error (SIE) and delocalization**
> Exact exchange must exactly cancel the Hartree contribution that an electron makes through itself. The approximate exchange of LDA/GGA does not, leaving residual self-repulsion; the consequence is that the energy is lowered by spreading the electron out — the delocalization error. Polarons, charge-transfer states, and the assignment of oxidation states are all sensitive to this error. The HF exchange in hybrids and the $+U$ penalty are both attempts, by different routes, to fix it.

## 6. Which functional should you use?

Recommended mapping for battery systems (current practical-use reference, as of 2026):

| System / question | Recommended functional | Notes |
|---|---|---|
| Graphite/Si anode lattice and volume change | PBE + D3 (vdW) | vdW essential for graphite interlayer bonding |
| Solid electrolyte (e.g., Li7La3Zr2O12) ionic conductivity | PBE or SCAN | Weakly correlated, GGA suffices |
| LFP, LCO, NMC cathode voltages | PBE+U or SCAN | Standard $U$ table or Hubbard linear response |
| Spinel LiMn₂O₄ Jahn-Teller | PBE+U + spin polarization | $U(\text{Mn}) \approx 3.9$ eV |
| Defect formation energies in insulators | HSE06 | PBE underestimates defect depths |
| Molecular electrolyte redox potentials | B3LYP or ωB97X-D | Molecular-quantum-chemistry hybrids |
| Surface adsorption (SEI molecules etc.) | revPBE+D3 or vdW-DF2 | vdW correction essential |
| Electrocatalyst active sites | RPBE+D3 | Accurate trends in adsorption energies |
| Anionic redox (Li-rich NMC) | HSE06 or SCAN+U | Quantitative O 2p hole |

Additional considerations:
- **Speed/accuracy trade-off**: PBE+U is the standard up to ~100-atom cells. HSE06 is feasible for ≤50 atoms. PBE alone is realistic for ≥1000 atoms.
- **Benchmarking is mandatory**: for a new system, always compare two functionals (PBE+U with HSE06 or SCAN) on a small cell before deciding on the production functional for the main calculation.
- **van der Waals**: for layered structures, porous hosts, or molecular adsorption, always add a D3 or D4 correction (the additional cost is essentially zero).

Functional choice ultimately comes down to "which physical effect is decisive." The take-away of section 03 is a single point — there is no one-size-fits-all functional.

## References

- Perdew, J. P., Burke, K., Ernzerhof, M. *Physical Review Letters* 77 (1996) 3865–3868 — original paper on the PBE GGA.
- Heyd, J., Scuseria, G. E., Ernzerhof, M. *Journal of Chemical Physics* 118 (2003) 8207; 124 (2006) 219906 — HSE03/HSE06 range-separated hybrid.
- Sun, J., Ruzsinszky, A., Perdew, J. P. *Physical Review Letters* 115 (2015) 036402 — SCAN meta-GGA.
- Anisimov, V. I., Zaanen, J., Andersen, O. K. *Physical Review B* 44 (1991) 943 — original paper on DFT+U.
- Dudarev, S. L. et al. *Physical Review B* 57 (1998) 1505 — simplified $+U$ form (current standard).
- Wang, L., Maxisch, T., Ceder, G. *Physical Review B* 73 (2006) 195107 — table of PBE+U $U$ values fitted to oxide formation energies.
- Cococcioni, M., de Gironcoli, S. *Physical Review B* 71 (2005) 035105 — determination of $U$ via linear response.
- Grimme, S. et al. *Journal of Chemical Physics* 132 (2010) 154104 — D3 vdW dispersion correction.
