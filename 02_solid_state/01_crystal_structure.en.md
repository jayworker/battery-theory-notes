# Crystal Structure

## 1. Overview

Almost all primary properties of battery materials — theoretical capacity, average voltage, Li diffusivity, thermal stability — are determined almost directly by the crystal structure. Even with the same chemical formula, the V–Q plateau can become longer or shorter depending on which framework is used and on which site Li occupies, and $D_\text{Li}$ can differ by 4–5 orders of magnitude.

This section therefore treats the following chain in one go: (i) the definition of a lattice and a unit cell, (ii) symmetry notation via the space group, (iii) Miller indices and diffraction planes, (iv) the frameworks of the four major cathode structures (rock-salt / layered / spinel / olivine), and (v) the fact that the geometry of the framework determines the dimensionality of the Li channel.

This flow connects directly to the observation made in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) that the shape of the V–Q curve — the plateau-versus-slope split — reduces to the kinds of phases the crystal structure permits and the free-energy relationships among them.

## 2. Bravais lattices and the unit cell

A **crystal** is the product of a **lattice** and a **basis**. The lattice is a set of points that fill space without gaps, and the basis is the arrangement of atoms attached to each lattice point. Although there appear to be infinitely many lattices, in three dimensions the number of **essentially distinct lattices** is exactly 14, and these are called **Bravais lattices**.

Intuitively, combining the 7 crystal systems (cubic, tetragonal, orthorhombic, hexagonal, trigonal, monoclinic, triclinic) with extra centrings — primitive (P), body-centered (I), face-centered (F), base-centered (C) — produces the 14 Bravais lattices, after eliminating those that turn out to share the same symmetry as another within the same crystal system.

The unit cell is described by the lattice constants $a, b, c$ (edge lengths) and $\alpha, \beta, \gamma$ (angles between edges). The volume is in general

$$V = abc\sqrt{1 - \cos^2\alpha - \cos^2\beta - \cos^2\gamma + 2\cos\alpha\cos\beta\cos\gamma}$$

so that for a cubic lattice ($a=b=c$, $\alpha=\beta=\gamma=90^\circ$) one has $V = a^3$. How the lattice constants evolve during charge and discharge (e.g., the $c$-axis expansion/contraction of layered NMC) is directly linked to mechanochemistry.

## 3. Space groups and Wyckoff positions

The set of all symmetry operations of a crystal — translations together with rotations, reflections, inversions, screw axes, and glide planes — is called the **space group**. There are exactly **230** space groups in three dimensions.

Two conventions are commonly used in the notation. The **Hermann–Mauguin** symbol takes forms such as $R\bar{3}m$, $Fd\bar{3}m$, or $Pnma$: the first letter (P/I/F/A/B/C/R) indicates the lattice centring, and the following symbols give information about rotation axes and reflection planes. The **Schoenflies** symbol uses a point group with a superscript, such as $D_{3d}^5$. Battery literature almost always uses Hermann–Mauguin.

Within each space group, the **orbit** that an atom can occupy is called a **Wyckoff position**. The notation has the form "multiplicity + letter" (e.g., $3a$, $3b$, $6c$, $9e$). The multiplicity is the number of atoms that fit on that site per unit cell, and the letter is the site-symmetry label of that site.

Example: in layered LiCoO₂ ($R\bar{3}m$, no. 166), Li sits on the $3b$ site, Co on the $3a$ site, and O on the $6c$ site. In NMC, the cation mixing between Li and Ni is ultimately defined as an antisite defect in which Ni occupies the $3a$ site and Ni occupies the $3b$ site instead of Li (for the detailed defect chemistry see [`./03_defect_chemistry.md`](./03_defect_chemistry.md)).

## 4. Miller indices and diffraction planes

A plane in a crystal is specified by the reciprocal ratios of its intercepts on the crystal axes; these are the **Miller indices** $(hkl)$. The plane intersects the axes at $a/h$, $b/k$, and $c/l$. Negative indices are written with a bar above the number ($\bar{h}$).

Intuitively, $(100)$ is the plane perpendicular to the $a$ axis, and $(111)$ is the diagonal plane that intercepts the three axes at equal distances. Crystal diffraction directly probes the spacing $d_{hkl}$ between such planes.

For a cubic crystal the plane spacing is simply

$$\frac{1}{d_{hkl}^2} = \frac{h^2 + k^2 + l^2}{a^2}$$

For a general lattice one must use the reciprocal metric tensor in matrix form. Through the Bragg condition $n\lambda = 2 d_{hkl} \sin\theta$, the $2\theta$ position of an XRD peak is directly tied to the lattice constants.

Frequently used indices in battery analysis:
- The $(003)$ peak of layered NMC directly tracks the $c$-axis change — the slab spacing — as Li is removed.
- The intensity ratio $I_{003}/I_{104}$ between $(003)$ and $(104)$ is a qualitative indicator of the degree of Li/Ni cation mixing (the higher the ratio, the better the ordering).
- Diagnostic peaks for spinel are $(111)$, while for olivine $(020)$ and $(311)$ are useful.

## 5. Representative crystal structures of battery materials

Battery cathodes essentially rest on four structural motifs. In all of them oxygen forms a face-centered or hexagonal-close-packed (HCP)-like framework, and the TM and Li atoms fill the empty interstices (octahedral and tetrahedral sites).

> **Related concept: Octahedral and tetrahedral sites**
> In the empty space of a close-packed oxygen lattice (FCC or HCP) there are two types of interstice. The octahedral ($O_h$) site is surrounded by six oxygens; there is one such site per cation per lattice. The tetrahedral ($T_d$) site is surrounded by four oxygens; there are two per cation. That is, for each FCC oxygen there is 1 empty octahedral site and 2 empty tetrahedral sites. Which of these sites are filled determines the structure name: rock-salt = all octahedral sites filled; spinel = half of the octahedral sites + 1/8 of the tetrahedral sites filled; layered = octahedral sites filled layer by layer. Tetrahedral sites are small and large cations have difficulty entering them; this size mismatch is one source of spinel stability.

### 5.1 Rock-salt (NaCl-type, $Fm\bar{3}m$)

The simplest structure: oxygen on an FCC sublattice with cations filling all of the octahedral sites. Unit-cell parameter $a \approx 4.1$–$4.4$ Å. When layered → rock-salt-like surface reconstruction occurs in the late stages of NMC charging, the surface resistance increases sharply, so rock-salt frequently appears as the "inactive end point". The key is that as the distinction between Li and Ni cation sites is lost, the Li diffusion channels are blocked.

### 5.2 Layered ($R\bar{3}m$, $\alpha$-NaFeO₂ type)

The parent structure of LiCoO₂, LiNiO₂, NMC811, and NCA. It is an ordered-rock-salt variant in which the cation sites of rock-salt are split layer-by-layer into one Li layer and one TM layer, stacked in the order oxygen–TM–oxygen–Li–oxygen–TM–.... Li sits on the $3b$ octahedral site, TM on the $3a$ octahedral site, and O on the $6c$ site. In hexagonal notation the lattice constants are $a \approx 2.85$ Å and $c \approx 14.05$ Å (LiCoO₂).

Li diffusion takes place in the 2D plane between TM layers (octahedral → tetrahedral → octahedral divacancy hopping), with $D_\text{Li} \sim 10^{-9}$–$10^{-11}$ cm²/s. As the Ni content increases, cation mixing increases (the Ni²⁺ ionic radius, 0.69 Å, is almost identical to Li⁺, 0.76 Å), and this is the source of the synthesis and thermal-stability difficulties of Ni-rich NMC.

### 5.3 Spinel ($Fd\bar{3}m$, $AB_2O_4$ type)

The framework of LiMn₂O₄ (LMO) and LiNi₀.₅Mn₁.₅O₄ (high-voltage spinel). Oxygen is FCC, the A cation (Li) sits on the tetrahedral $8a$ site, and the B cation (Mn) sits on the octahedral $16d$ site. The unit-cell parameter is $a \approx 8.24$ Å for LMO.

The unfilled octahedral $16c$ sites are empty, and Li diffusion occurs through a three-dimensional pathway $8a \to 16c \to 8a$. Thanks to this 3D channel, spinel intrinsically allows faster diffusion than layered structures, but the Jahn–Teller distortion of Mn³⁺ (see [`./02_band_theory.md`](./02_band_theory.md) for details) causes Mn dissolution at room temperature and a cubic → tetragonal transformation during cycling.

### 5.4 Olivine ($Pnma$, $AB$XO₄ type)

The framework of LiFePO₄ (LFP). Oxygen forms a distorted HCP, Fe sits on the octahedral $4c$ site, Li on the octahedral $4a$ site, and P on the tetrahedral $4c$ site. Lattice constants are $a \approx 10.33$, $b \approx 6.01$, and $c \approx 4.69$ Å.

Li diffuses **only along 1D channels in the $b$-axis ([010]) direction**. Pathways along the other axes are absent or extremely narrow. This 1D character produces the two-faced behavior of LFP: (i) a stable plateau at ~3.43 V due to the inductive effect of the PO₄ tetrahedron, (ii) an intrinsically low $D_\text{Li}$, and (iii) blocking of an entire particle if even a single Fe$_\text{Li}$ antisite obstructs a [010] channel. For this reason LFP is almost always synthesized with carbon coating + nanosizing.

## 6. Linking structure to performance: channel dimensionality and $D_\text{Li}$

Comparing the three frameworks in terms of channel dimensionality reveals the structure–performance link at a glance.

| Structure | Li channel dimension | Typical $D_\text{Li}$ (cm²/s) | Susceptibility to blockage |
|------|-------------|---------------------------|-------------|
| Olivine (LFP) | 1D ([010]) | $10^{-13}$–$10^{-11}$ | Very high (a single antisite blocks the channel) |
| Layered (NMC) | 2D (between TM layers) | $10^{-11}$–$10^{-9}$ | Moderate (Ni$_\text{Li}$ mixing) |
| Spinel (LMO) | 3D ($8a$–$16c$ network) | $10^{-10}$–$10^{-9}$ | Low (can be bypassed) |

The lower the channel dimension, the more limited the maximum particle size (the diffusion length sets a time delay), and the larger the risk that dopants or defects will block the pathway. Conversely, 1D channels cannot statistically average out, so charge–discharge becomes highly inhomogeneous at the single-particle level; this is the structural origin of the LFP mosaic model — the partial-two-phase behavior at the particle level discussed in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md).

The crystal structure also determines the volume-change pattern during cycling. Layered structures show anisotropic $c$-axis expansion ($c$ increases as Li is removed because of stronger repulsion between oxygen layers, then decreases on heavy delithiation), spinel is relatively isotropic, and olivine is nearly zero-strain (LFP↔FP volume change ~6%). This difference is exploited directly in mechanochemistry analysis.

Finally, the relative magnitudes of strain energy and surface energy can determine which phase is stable inside the crystal structure. Example: in LFP the surface-energy contribution narrows the Li-poor / Li-rich miscibility gap in the nanoscale regime, and this becomes the prototype of the size-dependent phase diagrams discussed in [`./05_phase_diagrams.md`](./05_phase_diagrams.md).

## References

- West, A. R. *Solid State Chemistry and its Applications* (2nd ed., Wiley, 2014) — standard treatment of crystal structure and space-group notation.
- Hahn, T. (ed.) *International Tables for Crystallography, Vol. A* (Springer, 2006) — canonical reference for the 230 space groups and Wyckoff positions.
- Whittingham, M. S. *Chemical Reviews* 104 (2004) 4271–4301 — review of the crystal structures of lithium-battery cathode materials.
- Padhi, A. K., Nanjundaswamy, K. S., Goodenough, J. B. *Journal of the Electrochemical Society* 144 (1997) 1188–1194 — LiFePO₄ olivine structure and 1D Li channels.
- Reimers, J. N., Dahn, J. R. *Journal of the Electrochemical Society* 139 (1992) 2091–2097 — in situ XRD of structural changes in layered LiCoO₂.
