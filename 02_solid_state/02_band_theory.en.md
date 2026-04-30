# Band Theory

## 1. Overview

The energy levels of a single atom are discrete, but when $N$ atoms of the same kind assemble into a crystal these levels interact and broaden into nearly continuous **bands**. The band structure determines whether a material is an electronic conductor, a semiconductor, or an insulator, and consistently explains cathode redox activity, electronic conductivity, optical absorption, and lattice responses such as Jahn–Teller distortion.

In the battery context, four central questions arise: (i) from which orbital are electrons removed during charging (the redox center), (ii) with which redox potential is the Fermi level aligned, (iii) why is the electronic conductivity of the cathode very low for some materials (LFP) and adequate for others (LiCoO₂), (iv) why do d⁴/d⁷ ions such as Mn³⁺ and Ni³⁺ distort the lattice.

This section follows a single thread: starting from Bloch's theorem and proceeding to DOS and the Fermi level → the transition-metal d-band → crystal-field splitting → Jahn–Teller distortion.

## 2. Bloch's theorem and the dispersion relation

The most decisive fact about a crystal is its translational lattice symmetry: $V(r) = V(r + R)$, where $R$ is a lattice vector. In such a periodic potential, the single-electron Schrödinger equation has solutions of **Bloch-function** form rather than plain plane waves.

The intuition is simple. When an electron moves from one lattice point to the next, the absolute value (density) of the wavefunction must be unchanged; only the phase can differ. Choosing this phase to be linear in the lattice vector naturally produces the Bloch form.

$$\psi_{n,k}(r) = u_{n,k}(r)\, e^{i k \cdot r}, \qquad u_{n,k}(r + R) = u_{n,k}(r)$$

Here $n$ is the band index, $k$ is a wavevector inside the Brillouin zone, and $u_{n,k}$ is the cell-periodic part with the periodicity of the lattice. The key result is that the energy becomes a function of $k$:

$$E = E_n(k)$$

This function is the **dispersion relation**. For free electrons it is $E = \hbar^2 k^2 / 2m$, but in a crystal the periodic potential splits this curve up and down at specific $k$ positions (the Brillouin-zone boundary). The split region is the **band gap**.

## 3. Brillouin zone, band gap, and effective mass

The momentum-space lattice corresponding to the real-space lattice is the reciprocal lattice; its Wigner–Seitz cell is the first **Brillouin zone (BZ)**. All independent values of $k$ lie inside the first BZ. All electronic properties of a crystal are defined by $E_n(k)$ inside the BZ alone.

There are two intuitive conclusions.

First, at the BZ boundary the plane waves $e^{ikx}$ and $e^{-ikx}$ couple via Bragg reflection to produce two standing waves: one with nodes on the lattice ions and one with nodes between them. The two states have different energies, and a gap of that magnitude opens.

Second, the curvature of a band defines the dynamical mass — the **effective mass** — of the electron. The larger the curvature (the sharper the band), the smaller the electron mass and the better the conductivity.

$$\frac{1}{m^*} = \frac{1}{\hbar^2} \frac{\partial^2 E}{\partial k^2}$$

In LiFePO₄ the valence band is very flat owing to the narrow mixing of Fe-3d and O-2p, and this is the fundamental cause of LFP's intrinsically low electronic conductivity ($\sim 10^{-9}$ S/cm). Bypassing this with carbon coating is standard practice in LFP cathode synthesis.

## 4. DOS and Fermi level: distinguishing metals, semiconductors, and insulators

The density of states (**DOS**) is the number of allowed single-electron states per unit energy interval.

$$g(E) = \sum_n \int_{\text{BZ}} \frac{d^3 k}{(2\pi)^3} \delta(E - E_n(k))$$

Intuition: the gentler a band (the smaller its curvature), the more values of $k$ accumulate at a given energy and the larger the DOS. A flat band $\Rightarrow$ a large DOS.

At $T = 0$, electrons fill the lowest energy states first, two per state (spin ±), in accordance with the Pauli exclusion principle. The energy of the last filled state is the **Fermi level** $E_F$. Because this position corresponds to the chemical potential of the cell, it is directly aligned with the electrochemical redox potential.

Three situations can be distinguished:
- **Metal**: $E_F$ lies inside a band. Electronic excitation is possible at arbitrarily low energy, so current flows freely. Examples: graphite (a very narrow band overlap), Li metal.
- **Semiconductor**: $E_F$ lies inside a small gap (~0.5–3 eV). Thermal excitation is possible. Example: Si.
- **Insulator**: $E_F$ lies inside a large gap (>3 eV). No conduction. Example: oxide separators.

For battery cathode materials, charged LiCoO₂ has a small, slightly metallic gap (~1–2 eV), whereas LiFePO₄ — owing to strong electron correlation — is not the metal that simple DFT predicts but actually behaves as a Mott–Hubbard insulator with a gap of ~3.7 eV.

> **Related concept: Mott–Hubbard insulator and the DFT+U correction**
> Standard DFT (LDA/GGA) absorbs the on-site Coulomb repulsion $U$ of d orbitals into the mean field, and as a result it often incorrectly predicts transition-metal oxides — which are in fact insulators — to be metals. The Mott–Hubbard mechanism reflects the fact that the cost of putting two electrons into the d orbital of the same atom is very high, which blocks lattice motion. The correction adds a Hubbard-model-inspired term that acts only on the d shell — DFT+U. Empirically, $U \sim 4$–$5$ eV works well for the Fe-3d states of LFP and $U \sim 6$ eV for the Ni-3d states of NMC; if the value is chosen incorrectly, the predicted voltage can be off by more than 0.5 V. The quantitative handling of this correction is directly tied to first-principles voltage prediction.

## 5. Transition-metal d-band and crystal-field splitting

Cathode redox almost always takes place in the d orbitals of a transition metal (TM). In a free atom the d orbitals are five-fold degenerate; in a crystal field they split according to the symmetry of the environment.

In an octahedral ($O_h$) environment of six oxygens, the five d orbitals split into two groups. Intuitively, $d_{z^2}$ and $d_{x^2-y^2}$ point directly at the oxygen lobes along the octahedral vertex directions ($\pm x, \pm y, \pm z$) and have higher energy ($e_g$, doubly degenerate), while $d_{xy}, d_{yz}, d_{zx}$ point between the oxygen lobes and have lower energy ($t_{2g}$, triply degenerate).

$$\Delta_o = E(e_g) - E(t_{2g})$$

Here $\Delta_o$ is the octahedral crystal-field splitting, typically 1–3 eV. In first-row TM oxides, $\Delta_o$ is usually comparable to or smaller than the spin-pairing energy, leading to a high-spin/low-spin distinction. The Co³⁺ (d⁶) of LiCoO₂ is low-spin ($t_{2g}^6 e_g^0$) and non-magnetic; the Ni³⁺ (d⁷) of LiNiO₂ is low-spin ($t_{2g}^6 e_g^1$) with one residual $e_g$ electron.

The implication for battery redox is the following. When Li is removed from the cathode, electrons usually leave from the $e_g$ or $t_{2g}$ states near $E_F$. In the high-SOC regime of NMC the oxygen 2p band rises above $E_F$, triggering lattice oxygen redox (O²⁻ → O⁻); this is the electronic-structural origin of oxygen release and surface reconstruction in the high-V regime.

## 6. Jahn–Teller distortion

If the electronic configuration has partial occupancy of a degenerate level ($e_g$ or $t_{2g}$), the lattice spontaneously breaks symmetry to lower its energy. This is the **Jahn–Teller theorem**.

Intuition: if two $e_g$ orbitals ($d_{z^2}$ and $d_{x^2-y^2}$) are degenerate but only one electron occupies them, then forcing the splitting by elongating or compressing the octahedron along one axis lowers the occupied orbital and raises the unoccupied one, reducing the total energy. This elongation/compression manifests as lattice distortion.

$$E(\text{distorted}) = E(\text{symmetric}) - \frac{1}{2} K Q^2 \cdot (\text{electronic gain})$$

This can be written qualitatively as above, and when the linear term is negative for small $Q$ (the distortion coordinate), spontaneous distortion occurs.

Representative cases:
- **Mn³⁺ (d⁴, high-spin: $t_{2g}^3 e_g^1$)**: in spinel LiMn₂O₄, a cubic → tetragonal transformation occurs during deep discharge once the average Mn³⁺ fraction exceeds a critical value. This is one cause of LMO crystal damage during cycling.
- **Ni³⁺ (d⁷, low-spin: $t_{2g}^6 e_g^1$)**: always weakly J–T active in layered LiNiO₂. One mode of late-charge transformation in Ni-rich cathodes such as NMC811.
- **Fe³⁺ (d⁵, high-spin: $t_{2g}^3 e_g^2$)**: with uniform occupancy it is J–T inactive. This is one of the reasons LFP is intrinsically stable.

J–T distortion appears first as **local oxygen-coordination distortion** rather than as an average-particle effect, and it is detected as the deviation from the average crystal structure in EXAFS or pair-distribution-function (PDF) measurements.

## 7. Synthesis: from electronic structure to battery behavior

The flow of this section can be summarized as follows.

Atom → crystal-field splitting ($t_{2g}/e_g$) → d-band formation → location of the Fermi level → simultaneously sets the redox potential, the electronic conductivity, and J–T activity. As a result:
- LFP: Fe-3d narrow band, large $U$ → Mott–Hubbard insulator, $\sim 10^{-9}$ S/cm, carbon coating mandatory.
- LiCoO₂: Co-3d wider, with strong O-2p hybridization, narrow gap → adequate electronic conductivity ($\sim 10^{-3}$ S/cm when charged).
- NMC811: Ni-3d dominated; the J–T effect of Ni³⁺ is weak, but cation mixing combined with high-charge oxygen redox drives lattice reconstruction.
- Spinel LMO: Mn³⁺ J–T → cubic-to-tetragonal transformation during cycling, plus Mn dissolution.

This picture forms the electronic-structural background for the defect formation energies in [`./03_defect_chemistry.md`](./03_defect_chemistry.md), the hopping barriers in [`./04_ionic_conduction.md`](./04_ionic_conduction.md), and the free-energy curves in [`./05_phase_diagrams.md`](./05_phase_diagrams.md).

## References

- Kittel, C. *Introduction to Solid State Physics* (8th ed., Wiley, 2005) — standard treatment of Bloch's theorem and band theory.
- Ashcroft, N. W., Mermin, N. D. *Solid State Physics* (Saunders, 1976) — canonical treatment of DOS, effective mass, and the nearly-free-electron model.
- Burdett, J. K. *Chemical Bonding in Solids* (Oxford, 1995) — chemical intuition for the d-band and crystal-field chemistry of TM oxides.
- Goodenough, J. B. *Magnetism and the Chemical Bond* (Wiley, 1963) — classic treatment of crystal-field and J–T effects in TM oxides.
- Anisimov, V. I., Zaanen, J., Andersen, O. K. *Physical Review B* 44 (1991) 943 — definition of the LDA+U method.
- Zhou, F., Cococcioni, M., Marianetti, C. A., Morgan, D., Ceder, G. *Physical Review B* 70 (2004) 235121 — effect of DFT+U on voltage prediction for LFP and LCO cathodes.
