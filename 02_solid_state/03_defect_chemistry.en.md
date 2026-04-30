# Defect Chemistry

## 1. Overview

A perfect crystal exists only at 0 K; every crystal at finite temperature contains a finite concentration of point defects. The key insight of defect chemistry is that these defects are not mere "impurities" but are **the actual carriers of ionic conduction, electronic conduction, and redox non-stoichiometry**.

Intuitively, in the absence of defects every site in the lattice is occupied and no ion can move to a neighboring site. Ionic conduction is possible only when **vacancies or interstitials** are present. The defect concentration is therefore directly tied to the carrier concentration discussed in [`./04_ionic_conduction.md`](./04_ionic_conduction.md), and this is the theoretical basis for the entire doping strategy of cathodes and solid electrolytes.

In addition, many modes of battery aging — Li/Ni cation mixing in NMC cathodes, oxygen vacancies in oxide cathodes ($V_O^{\bullet\bullet}$), cation interdiffusion in conversion cathodes — are most naturally described in the language of defect chemistry.

## 2. Classification of point defects

A defect that occurs on the scale of a single lattice site is a **point defect**. There are four basic types:

- **Vacancy ($V_X$)**: the site that should have contained X is empty.
- **Interstitial ($X_i$)**: X sits in an empty space (e.g., octahedral or tetrahedral interstitial site) that is not a normal lattice site.
- **Antisite**: B occupies an A site, and A occupies a B site (e.g., Ni$_\text{Li}$ in NMC).
- **Substitutional**: an external dopant D replaces a host atom on an A site (e.g., Mn$_\text{Fe}$ doping in LFP).

When point defects aggregate they extend into line defects (dislocations), planar defects (grain boundaries), and volume defects (precipitates), but this section is restricted to point defects. The **formation enthalpy** $\Delta H_f$ and **formation entropy** $\Delta S_f$ of a defect determine its equilibrium concentration.

Intuitively, defect formation costs energy to break or make bonds ($\Delta H_f > 0$), but the many possible arrangements (configurational entropy) of where defects sit lower the free energy. The balance of the two effects sets the equilibrium concentration.

$$[\text{defect}] = N_\text{site} \exp\!\left(\frac{\Delta S_f}{k_B}\right) \exp\!\left(-\frac{\Delta H_f}{k_B T}\right)$$

Here $N_\text{site}$ is the density of available sites, $\Delta H_f$ and $\Delta S_f$ are the formation enthalpy and entropy per defect, $k_B$ is Boltzmann's constant, and $T$ is the absolute temperature. The key dependence is Arrhenius-type: when the formation energy is much larger than $k_B T$ (~25 meV at 300 K), the defect concentration is very small.

## 3. Kröger–Vink notation

To handle defect reactions quantitatively, a notation is needed. **Kröger–Vink notation** records three pieces of information at once: (i) the species involved, (ii) the site it occupies, and (iii) the **effective charge** on that site.

The form is $X_S^c$, where:
- $X$: the species (or vacancy, $V$).
- $S$ (subscript): the site (named after the species that should normally occupy it).
- $c$ (superscript): the effective charge. A dot ($\bullet$) = +1 unit charge, a prime ($'$) = −1 unit charge, a cross ($\times$) = neutral.

The key point is **effective charge = actual charge − the normal charge of the site**, i.e., it is a relative charge with respect to the host lattice rather than an absolute charge.

Representative examples:
- $V_O^{\bullet\bullet}$: a vacancy on the O site (normally −2) → 0 − (−2) = +2 effective charge → two dots.
- $V_\text{Li}'$: a vacancy on the Li site (normally +1) → 0 − (+1) = −1 → one prime.
- $\text{Li}_i^\bullet$: a Li⁺ on an interstitial site (normally 0) → +1 − 0 = +1 → one dot.
- $\text{Ni}_\text{Li}^\bullet$: a Ni²⁺ on a Li site (normally +1) → 2 − 1 = +1 → one dot. The cation-mixing defect of NMC.
- $\text{Mn}_\text{Fe}^\times$: a Mn(2+) on the Fe(2+) site of LFP → 2 − 2 = 0 → neutral.

Defect reaction equations are always written so that all three quantities — (i) mass, (ii) sites, and (iii) charge — are conserved. Example: Schottky defect formation in NaCl:

$$\text{nil} \rightleftharpoons V_\text{Na}' + V_\text{Cl}^{\bullet}$$

For site conservation one must remember that the same number of new sites (additional unit cells) appears on both sides of the equation. The detailed site bookkeeping is treated in the Schottky-defect section.

## 4. Schottky and Frenkel defects

Two intrinsic defect types are common in ideal ionic crystals.

**Schottky defects** form when a cation vacancy and an anion vacancy migrate to the surface as a pair (the ions are not destroyed inside the lattice but flow out to the surface). The crystal volume increases slightly. This type dominates in NaCl-type ionic crystals; the formation energy is typically 1–2 eV.

$$\text{nil} \rightleftharpoons V_\text{Na}' + V_\text{Cl}^{\bullet}, \qquad K_S = [V_\text{Na}'][V_\text{Cl}^{\bullet}]$$

Charge neutrality forces the two vacancy concentrations to be equal, so this simplifies to $[V_\text{Na}'] = [V_\text{Cl}^{\bullet}] = \exp(-\Delta H_S / 2 k_B T)$ (omitting the entropy prefactor).

**Frenkel defects** form when a species leaves its lattice site and becomes interstitial, creating a vacancy + interstitial pair. The crystal volume scarcely changes. This type dominates in structures with sparse lattices (e.g., AgBr, $\beta$-AgI, the anion sublattice of fluorite CaF₂).

$$\text{Ag}_\text{Ag}^\times \rightleftharpoons V_\text{Ag}' + \text{Ag}_i^\bullet, \qquad K_F = [V_\text{Ag}'][\text{Ag}_i^\bullet]$$

In the battery context, Frenkel pairs are decisive in the Li / Li-vacancy + interstitial dynamics of Li-rich layered ($\text{Li}_2\text{MnO}_3$-type) materials and in fluorite-based oxide-ion conductors (YSZ).

The general form including the entropy prefactor is

$$[V][i] = N_\text{site} N_\text{int} \exp(-\Delta H_F / k_B T)$$

This differs from the Schottky case (cation/anion vacancy pair) in that the concentration is proportional to the product of the two site densities.

## 5. Charge neutrality and the Brouwer diagram

The equilibrium defect concentrations are determined not by a single defect species but by **simultaneous equilibrium of all defect species combined with the charge-neutrality condition**.

Intuitively, the crystal must be neutral overall, so the sum of positively charged effective defects equals the sum of negatively charged ones. As external factors (e.g., oxygen partial pressure or doping concentration) change, the dominant carrier defect changes. The visualization of this dependence in a single plot is the **Brouwer diagram**.

In a typical oxide the following defects are simultaneously in equilibrium:
- $V_O^{\bullet\bullet}$ + 2 e' (formation of oxygen vacancies).
- $h^\bullet$ / $e'$ (electrons / holes).
- Dopants (acceptor or donor).

The general charge-neutrality condition is

$$2[V_O^{\bullet\bullet}] + p + [\text{donor}] = 2[V_M''] + n + [\text{acceptor}]$$

with $p = [h^\bullet]$ the hole concentration, $n = [e']$ the electron concentration, and $V_M$ a metal vacancy. The Brouwer approximation assumes that only one pair of terms in this equation dominates within a given regime, and gives a simple power-law dependence in each regime (e.g., at high oxygen partial pressure $[V_O^{\bullet\bullet}] \propto P_{O_2}^{-1/6}$, $p \propto P_{O_2}^{+1/4}$).

In oxide cathodes for batteries, the most decisive carriers are typically vacancies ($V_\text{Li}'$, $V_O^{\bullet\bullet}$) and polarons (small-polaron-type holes). A polaron is a bound state in which an electronic carrier deforms the surrounding lattice and moves together with the deformation; it is the actual carrier of the hopping electronic conduction in LFP and NMC.

## 6. Battery applications

Direct applications of defect chemistry include the following.

**(a) Cation mixing in NMC.** Because the Ni²⁺ ionic radius (0.69 Å) is almost identical to that of Li⁺ (0.76 Å), $\text{Ni}_\text{Li}^\bullet$ + $\text{Li}_\text{Ni}'$ antisite pairs form during synthesis and cycling. These antisites are the starting point of the layered → rock-salt-like surface reconstruction discussed in [`./01_crystal_structure.md`](./01_crystal_structure.md), and the cation-mixing concentration is higher the more Ni-rich the composition (NMC811, NMC91). Diagnosis is by the XRD ratio $I_{003}/I_{104}$; quantification is by Rietveld refinement or neutron diffraction.

**(b) Oxygen vacancies and the high-V regime.** In the late stages of charging (above ~4.5 V vs Li/Li⁺), lattice oxygen redox proceeds in NMC and Li-rich cathodes, and a fraction of the oxygen escapes through surface $V_O^{\bullet\bullet}$ formation accompanied by O₂ release. In Kröger–Vink form:

$$\text{O}_O^\times \rightarrow V_O^{\bullet\bullet} + 2 e' + \tfrac{1}{2} \text{O}_2(g)$$

Accumulation of $V_O^{\bullet\bullet}$ at the surface accelerates lattice collapse, TM reduction, and electrolyte decomposition. This is the intrinsic limit above ~4.5 V.

**(c) Fe$_\text{Li}$ antisites in LFP.** In the 1D-channel olivine, even one $\text{Fe}_\text{Li}^\times$ (or $\text{Fe}_\text{Li}^\bullet$ depending on the Fe oxidation state) lodged in the [010] channel blocks Li diffusion through the entire particle. The synthesis conditions for LFP (calcination temperature and atmosphere) determine the antisite concentration; the goal is normally to keep it below 1%.

**(d) Doping effects.** When an acceptor dopant such as Mn or Mg enters LFP, the hole-polaron and Li-vacancy concentrations rise to maintain charge neutrality, contributing to improved electronic and Li conductivity. Quantitatively, a Brouwer diagram can predict which carrier dominates in which regime.

In this way, defect chemistry is not just a notation but a quantitative descriptive language for how doping, synthesis atmosphere, and cycling conditions move carrier concentrations. The follow-up [`./04_ionic_conduction.md`](./04_ionic_conduction.md) treats how this defect concentration translates into ionic conductivity.

## References

- Kröger, F. A., Vink, H. J. *Solid State Physics*, Vol. 3 (Academic, 1956) 307–435 — original paper on Kröger–Vink notation.
- Kröger, F. A. *The Chemistry of Imperfect Crystals* (2nd ed., North-Holland, 1974) — standard textbook on defect chemistry.
- Chiang, Y.-M., Birnie, D. P., Kingery, W. D. *Physical Ceramics* (Wiley, 1997) — defect equilibria, Brouwer diagrams, and doping.
- Maier, J. *Physical Chemistry of Ionic Materials* (Wiley, 2004) — integrated treatment of ionic and electronic defects.
- Chen, H., Islam, M. S. *Chemistry of Materials* 28 (2016) 6656 — review of atomistic simulations of defect chemistry in LFP and NMC cathodes.
- Manthiram, A. *Nature Communications* 11 (2020) 1550 — cation mixing and surface reconstruction in Ni-rich layered cathodes.
