# Practical DFT: Pseudopotentials and Numerics

## 1. Overview

DFT as a theory wraps up in [`02_dft_foundations.md`](./02_dft_foundations.md), but in real codes (VASP, Quantum ESPRESSO, GPAW, ABINIT, etc.) a chain of numerical choices stands between you and a result. Those choices — pseudopotential, plane-wave cutoff, k-point mesh, smearing, convergence criteria — together determine both the accuracy and the cost of the calculation.

Intuitively, when a DFT result "feels wrong," the first place to suspect is often these numerical parameters rather than the functional. The cutoff was set 200 eV too low, the k-point mesh was halved, the magnetic moments were not initialized, the vacuum was too thin — these are all common pitfalls.

This section assumes the most common solid-state DFT setup, plane-wave + pseudopotential codes, and organizes the convergence tests and frequent pitfalls that practitioners must work through. It closes with the standard workflow for lattice/ion relaxation and for handling magnetic systems and vacuum.

Key message: "the accuracy of a DFT result depends as much on numerical convergence as on functional choice." Under-convergence in any one parameter renders the careful choice of the others meaningless.

## 2. Pseudopotential vs all-electron

Atomic electrons separate into two classes. **Core electrons** are tightly bound near the nucleus and barely participate in chemical bonding (e.g., the 1s of Li, the [Ar] core of Co). **Valence electrons** are the outer electrons that participate directly in bonding and redox (the 2s of Li, 3d/4s of Co).

Intuitively, only the valence electrons control bonding and electrochemistry, so treating the core averaged-over and explicitly solving only for the valence electrons cuts the cost dramatically. At the same time, the wavefunctions in the core region oscillate violently (with nodal structure required for orthogonality), making them very inefficient to represent in a plane-wave basis; smoothing that region is therefore essentially mandatory in plane-wave codes.

Two standard ways of handling this:

**Norm-conserving (NC) pseudopotentials**: re-shape the pseudo-wavefunction inside a cutoff radius $r_c$ so that it is smooth, while enforcing that the integrated charge inside $r_c$ matches the all-electron value (norm conservation). Standard forms include those of Hamann and Troullier-Martins. Accurate, but the required cutoff is high.

**Ultrasoft pseudopotentials (USPP)** / **PAW (Projector Augmented Wave)**: relax the norm-conservation constraint and compensate with an additional augmentation charge. PAW (Blöchl 1994) recovers all-electron accuracy while retaining the smooth pseudo-wavefunction. **VASP's default is PAW**, and PAW is the de facto standard of modern plane-wave codes.

The key PAW transformation:

$$|\psi_n\rangle = |\tilde{\psi}_n\rangle + \sum_i \left(|\phi_i\rangle - |\tilde{\phi}_i\rangle\right)\langle \tilde{p}_i | \tilde{\psi}_n\rangle$$

with $|\tilde{\psi}_n\rangle$ = smooth pseudo-wavefunction, $|\phi_i\rangle, |\tilde{\phi}_i\rangle$ = all-electron and pseudo partial waves, and $|\tilde{p}_i\rangle$ = projectors. Corrections are confined to the core region; outside it, pseudo and all-electron wavefunctions coincide.

### Valence selection (semicore states)

For transition metals where $+U$ is large or the oxidation state varies, "p semicore" usually has to be promoted to the explicit valence. Example: the standard PAW for Ni is [Ar]3d⁸4s² (10 valence electrons), while the p-semicore version is 3p⁶3d⁸4s² (16 valence) and is heavier. For NMC and LFP cathode calculations the standard PAW is usually sufficient, but pressure dependence and core-level shifts require the p-semicore PAW.

PAW choices common in battery calculations:
- Li: `Li_sv` (1s2s, 3 valence) recommended. The standard `Li` (1s²) is inaccurate.
- O: `O` (2s²2p⁴, 6 valence)
- Co/Ni/Mn/Fe: standard PAW (3d/4s only) usually suffices.
- F: `F` (2s²2p⁵)
- P: `P` (3s²3p³)
- Si: `Si`, or `Si_GW` for pressure calculations.

## 3. Plane-wave basis and cutoff

In a periodic crystal, KS orbitals take the Bloch form:

$$\phi_{n\mathbf{k}}(\mathbf{r}) = \frac{1}{\sqrt{V}}\sum_{\mathbf{G}} c_{n\mathbf{k}}(\mathbf{G}) \, e^{i(\mathbf{k}+\mathbf{G})\cdot\mathbf{r}}$$

where $\mathbf{G}$ = reciprocal-lattice vector and $\mathbf{k}$ = a k-point in the Brillouin zone. A plane-wave basis is orthonormal, gives uniform accuracy across all points, and is simple to implement (in contrast to the standard atom-centered Gaussian basis in molecules).

The infinite sum is truncated to plane waves with kinetic energy below $E_{cut}$:

$$\frac{\hbar^2}{2m_e}|\mathbf{k}+\mathbf{G}|^2 \leq E_{cut}$$

Larger $E_{cut}$ is more accurate, but the number of plane waves grows as $E_{cut}^{3/2}$, so the cost climbs quickly.

### Recommended cutoffs and convergence tests

General recommendations for battery oxides:
- General oxides (LiCoO₂, NMC, LFP): **400–500 eV**
- Magnetic systems or precise stress calculations: **500–600 eV**
- F-containing systems (LiF, PVDF): **at least 520 eV** (hard PAW for F)
- Active O 2p semicore: **600 eV**
- vdW correction with lattice optimization: **520–600 eV** (stress is very sensitive to the cutoff)

Standard convergence-test procedure:
1. Use a small unit cell (the primitive cell).
2. Vary the cutoff over 300, 400, 500, 600, 700 eV and measure the total energy/lattice constant/atomic forces.
3. Convergence is achieved when the energy change between adjacent cutoffs is below 1 meV/atom or the lattice constant changes by less than 0.001 Å.
4. Use the converged cutoff consistently in all subsequent calculations.

VASP rule of thumb: **`ENCUT = 1.3 × max(ENMAX of all PAW)`** is a common guideline. When precision in lattice constants/stresses matters, set `PREC = Accurate` for additional safety margin.

## 4. k-point sampling

Brillouin-zone integrals (for the density, energy, etc.) are approximated by a finite k-point grid. The most standard scheme is the **Monkhorst-Pack mesh** (1976), which divides the BZ uniformly and explicitly evaluates only the irreducible part by symmetry.

$$\mathbf{k}_{n_1 n_2 n_3} = \sum_i \frac{2n_i - N_i - 1}{2N_i}\mathbf{b}_i$$

with $\mathbf{b}_i$ = reciprocal-lattice basis vectors and $N_i$ = number of subdivisions in direction $i$.

Intuitively, the smaller the lattice (i.e., the larger the reciprocal lattice), the denser the k-point mesh required. That is, the product $|\mathbf{a}_i| \times N_i$ must exceed a certain length for convergence.

### k-point recommendations by lattice

Recommended grids for standard battery systems:
- Small primitive cells (Li bcc, MgO etc., $a \approx 4$ Å): **$8 \times 8 \times 8$ to $12 \times 12 \times 12$**
- LCO/NMC primitive (a≈2.8 Å, c≈14 Å, hexagonal): **$8 \times 8 \times 4$**
- LFP orthorhombic ($a \approx 10$ Å): **$3 \times 6 \times 6$**
- $2 \times 2 \times 1$ supercell (~100 atoms): **$2 \times 2 \times 2$ to $4 \times 4 \times 2$**
- Slabs (NEB, surfaces): **$k_\perp = 1$, in-plane $k$ inversely proportional to lattice length**
- Phonon supercells (~200 atoms): **$\Gamma$ or $2 \times 2 \times 2$**

The convergence criterion is the same as for the cutoff: 1 meV/atom. **Metals/half-metals** require a much denser mesh than insulators (integrating around the Fermi surface), and Mn/Ni-active NMC may also exhibit partial metallicity in the charged state.

### Smearing

In metals the Fermi surface does not fall exactly on grid points, so occupations become discontinuous and SCF oscillates. **Smearing** is required to soften this.

- **Gaussian smearing** ($\sigma \approx 0.05$ eV): simple; **not** used for insulators.
- **Methfessel-Paxton (MP)** order 1, $\sigma = 0.1$ to $0.2$ eV: the standard for metals; an energy correction is required.
- **Tetrahedron with Blöchl correction**: recommended for DOS, band structures, and precise static calculations. Use only at the final step after SCF.
- **Fermi-Dirac** ($T \approx 300$ to $1000$ K): effective for stabilizing SCF in magnetic systems.

Battery cathodes can show partial metallicity in the charged state, so start with Methfessel-Paxton at $\sigma = 0.1$ eV; for precise energies, extrapolate to $\sigma \to 0$ or switch to tetrahedron.

## 5. Convergence verification and lattice/ion relaxation

The standard verification matrix for a DFT calculation — items that, if skipped in practice, lead to large errors:

1. **$E_{cut}$ convergence**: as above; criterion 1 meV/atom.
2. **k-point convergence**: same criterion. Stricter for metals.
3. **Supercell size**: localized phenomena such as defects, adsorption, and polarons require a supercell large enough to make defect-image interactions negligible. Defect-defect distance typically $\geq 10$ Å.
4. **Vacuum thickness**: in slab/surface calculations to suppress surface-image interactions. Usually **at least 15 Å**, or 20 Å plus a dipole correction when the dipole moment is large.
5. **Smearing extrapolation**: in metals, extrapolate to $E(\sigma=0)$ for a ~0.01 eV correction.
6. **Spin polarization**: always activate for magnetic systems (`ISPIN=2` in VASP).

### Lattice/ion relaxation procedure

Stabilizing a new structure is normally done in **two stages**:

1. **Cell + ion relaxation (relax cell)**: with a cutoff 30–50% higher than usual (`PREC=Accurate`, Pulay-stress correction), simultaneously optimize lattice vectors and ionic positions. Drive the stress tensor $\sigma_{\alpha\beta} \to 0$.
2. **Ion-only relaxation (fix cell, relax ions)**: starting from the result of step 1, fix the lattice and move only the ions until the residual force $|\mathbf{F}_I| \to 0$. Typically $|\mathbf{F}| < 0.01$ to $0.02$ eV/Å.
3. **Static (single-point) calculation**: at the relaxed structure, run a single SCF with the standard $E_{cut}$ and a dense k-point mesh. This is the energy/DOS/charge density that you actually use.

Cases where the lattice constants must be fixed: NEB (changing the lattice along the migration path is forbidden), comparing the same supercell (formation energy), or when forcing the experimental lattice. Mixing fixed-lattice and relaxed results yields inconsistent stresses and renders comparison invalid.

> **Related concept: Pulay stress and lattice optimization**
> A plane-wave basis discretely changes the number of plane waves below $E_{cut}$ as the lattice changes. The resulting spurious stress is the Pulay stress, and it becomes negligible only when the cutoff is sufficiently high. Standard workaround: (i) raise the cutoff by 1.3× during the lattice-optimization step only, (ii) use the standard cutoff in static calculations, (iii) once the lattice is nearly converged, drop the cutoff back to its standard value and repeat the cell relaxation once more. This procedure reliably yields ~0.01 Å accuracy.

## 6. Common mistakes and diagnostics

Pitfalls frequently encountered in battery DFT calculations and the signals they produce:

**1. Insufficient magnetic-moment initialization**: starting a magnetic system with zero spins commonly traps it in a non-magnetic (paramagnetic) minimum. Signal: the experiment is magnetic but the calculated magnetic moments come out ~0 and the energy is unphysically low. Remedy: explicit initialization such as `MAGMOM = Ni:2 Mn:3 Co:0 ...` for NMC. Also consider possible antiferromagnetic ordering.

**2. Competition among ferromagnetic, antiferromagnetic, and ferrimagnetic states**: LiNiO₂, NiO, etc. have an AFM ground state, but FM may appear more stable in SCF. Remedy: try several initial magnetic configurations and keep the lowest-energy one.

**3. Under-converged cutoff/k-points**: signals — running the same system twice gives an energy difference >5 meV/atom, with lattice constants fluctuating by 0.01 Å. Remedy: always start with convergence tests.

**4. Insufficient vacuum**: for slabs, vacuum below 10 Å lets surface-image dipole interactions contaminate the surface energy. Remedy: at least 15 Å plus a dipole correction (`LDIPOL=T, IDIPOL=3` in VASP).

**5. NEB endpoint mismatch**: if the two endpoints of an NEB do not share the same supercell and the same ionic-coordinate ordering, the path is corrupted. Remedy: relax the endpoints separately with explicitly identical INCAR/POSCAR formatting.

**6. Confusion between cell and ion relaxation**: do not compare results from cell-relax against ion-relax. Quantities such as formation energies must always be compared at the same level of relaxation.

**7. Pseudopotential consistency**: never mix PBE PAWs with LDA PAWs. Whenever the functional is changed, change the PAW set as well.

**8. Symmetry oversimplification**: VASP's `ISYM=2` automatically symmetrizes, but if magnetic ordering breaks the symmetry the result is wrong. Remedy: use `ISYM=0` or `ISYM=-1` for magnetic systems.

**9. Insufficient grid for Bader/charge analysis**: charge density analysis requires a fine FFT grid (`PREC=Accurate` + `LREAL=.FALSE.`, or a dense `NGXF`). On a coarse grid, oxidation states come out inaccurate.

**10. Careless use of the DFT+U value**: the table values in Wang et al. were fit to ground-state ordering and oxide formation energies; they are not universally accurate for every quantity. For new systems, validate by linear-response $U$ or by sweeping over a small $U$ range.

**Diagnostic checklist** (before trusting a result):
- [ ] Cutoff/k-point convergence tested, energy convergence < 1 meV/atom
- [ ] Magnetic moments initialized, ISPIN=2, several magnetic orderings tried
- [ ] Two-step procedure: lattice + ion relaxation → static calc
- [ ] Residual forces < 0.02 eV/Å
- [ ] Vacuum (slab) > 15 Å, dipole correction enabled
- [ ] Recommended ENMAX of the PAW pseudopotentials confirmed; Li_sv used
- [ ] When using DFT+U, reference for the $U$ table cited and a sensitivity test performed if possible

Only after this checklist passes can the discussion shift to functional effects (section 03) and physical interpretation.

## References

- Blöchl, P. E. *Physical Review B* 50 (1994) 17953 — original paper on the PAW method.
- Kresse, G., Joubert, D. *Physical Review B* 59 (1999) 1758 — VASP implementation of PAW.
- Monkhorst, H. J., Pack, J. D. *Physical Review B* 13 (1976) 5188 — standard k-point mesh.
- Methfessel, M., Paxton, A. T. *Physical Review B* 40 (1989) 3616 — MP smearing.
- Kresse, G., Furthmüller, J. *Computational Materials Science* 6 (1996) 15 — VASP code.
- Giannozzi, P. et al. *Journal of Physics: Condensed Matter* 21 (2009) 395502 — Quantum ESPRESSO.
- Lejaeghere, K. et al. *Science* 351 (2016) aad3000 — benchmark of lattice constants/total energies across DFT codes.
