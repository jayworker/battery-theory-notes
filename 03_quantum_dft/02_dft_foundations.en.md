# DFT Foundations

## 1. Overview

The many-electron Schrödinger equation requires solving a $3N$-dimensional wavefunction, so increasing the electron count immediately runs into the curse of dimensionality. Density functional theory (DFT) starts from an elegant idea that bypasses this problem — all ground-state properties can be determined from the three-dimensional electron density $n(\mathbf{r})$ alone, without recourse to the many-body wavefunction.

Intuitively, once the positions and species of the nuclei are fixed, the external potential $v_{ext}(\mathbf{r})$ is fixed; this in turn fixes how the electrons distribute themselves (the density $n(\mathbf{r})$); and from the density alone, all observables — total energy, forces, magnetic moments — can in principle be calculated. The dimensionality is compressed from $3N$ down to $3$, so systems with hundreds or even thousands of atoms become tractable.

This section organizes the two foundational theorems of DFT (the Hohenberg-Kohn theorems), the Kohn-Sham (KS) prescription that makes practical calculations possible, and the structure of the SCF cycle. It closes with the structural limitations of DFT — the unknown form of the exact $E_{xc}[n]$ and the fact that KS eigenvalues are not quasiparticle energies. Sections 03 (exchange-correlation) and 04 (practical DFT) build directly on this foundation.

The reason DFT is central in battery research becomes clear by comparison with Hartree-Fock from [`01_quantum_basics.md`](./01_quantum_basics.md) — DFT treats both exchange and correlation while scaling as $O(N^3)$, an excellent compromise that allows it to be applied to large systems.

## 2. Hohenberg-Kohn theorems

The legitimacy of DFT rests on two theorems proved by Hohenberg and Kohn in 1964. They formally answer the question "why is the density alone enough?"

Intuitively, if the external potential $v_{ext}(\mathbf{r})$ differs, the electron density must distribute differently. Conversely, if the density $n(\mathbf{r})$ is the same, the external potential must also be the same (up to a constant). The two are in one-to-one correspondence, and the density therefore uniquely determines the external potential, the Hamiltonian, and the ground-state wavefunction.

**Theorem 1 (existence theorem)**: For a non-degenerate ground state, the external potential $v_{ext}(\mathbf{r})$ is uniquely determined (up to a constant) by the electron density $n(\mathbf{r})$.

$$v_{ext}(\mathbf{r}) \xleftrightarrow{1:1} n_0(\mathbf{r})$$

The proof is by reductio ad absurdum: assume two distinct external potentials $v_{ext}, v'_{ext}$ give the same $n_0$, and the variational principle leads to the contradiction $E_0 < E_0$. Therefore every ground-state observable can be expressed as a functional of $n(\mathbf{r})$.

**Theorem 2 (variational principle)**: There exists a definable energy functional $E[n]$, and it attains its minimum at the exact ground-state density $n_0$.

$$E[n] \geq E[n_0] = E_0, \qquad \text{for all valid } n(\mathbf{r}) \text{ with } \int n \, d^3r = N$$

Combining the two theorems reduces the Schrödinger equation to "a variational problem of finding the ground-state density." However, these theorems guarantee only existence, not the explicit form of $E[n]$ (this is the source of the essential difficulty of DFT).

The total energy can be decomposed as:

$$E[n] = T[n] + \int v_{ext}(\mathbf{r}) n(\mathbf{r}) d^3r + \frac{1}{2}\int\!\!\int \frac{n(\mathbf{r})n(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|} d^3r \, d^3r' + E_{xc}[n]$$

with the kinetic energy $T[n]$, the external potential term (nucleus-electron attraction etc.), the Hartree energy (classical Coulomb repulsion), and the exchange-correlation energy $E_{xc}[n]$. Only the last two terms are explicit; $T[n]$ and $E_{xc}[n]$ have unknown exact forms. Early attempts such as Thomas-Fermi treated even $T[n]$ with a crude approximation (uniform gas), and the resulting accuracy was disastrous.

## 3. Kohn-Sham equations

The decisive idea of Kohn and Sham (1965): in order to be able to calculate $T[n]$ accurately, introduce a fictitious non-interacting electron system that produces the same density $n(\mathbf{r})$. Call its kinetic energy $T_s[n]$. This is expressed exactly as a sum over single-particle orbitals $\phi_i$.

Intuitively, all the difficulties of the real system (correlation, the exact kinetic energy) are pushed into $E_{xc}[n]$, while the rest is solved as a single-particle Schrödinger equation, making it numerically tractable. KS-DFT is therefore essentially a "mapping of the many-body problem onto a single-particle problem."

$$\left[-\frac{\hbar^2}{2m_e}\nabla^2 + v_{eff}(\mathbf{r})\right]\phi_i(\mathbf{r}) = \epsilon_i \phi_i(\mathbf{r})$$

Here $\phi_i$ = Kohn-Sham orbitals (single-particle wavefunctions of the fictitious system), $\epsilon_i$ = KS eigenvalues, and $v_{eff}$ = effective potential. The density is reconstructed from the occupied KS orbitals:

$$n(\mathbf{r}) = \sum_{i=1}^{N} f_i |\phi_i(\mathbf{r})|^2$$

where $f_i$ = occupation numbers (0–2 with spin) and $N$ = number of electrons.

The kinetic energy $T_s[n]$ is computed exactly from the KS orbitals:

$$T_s[n] = -\frac{\hbar^2}{2m_e}\sum_i f_i \int \phi_i^*(\mathbf{r}) \nabla^2 \phi_i(\mathbf{r}) d^3r$$

Through this construction, the only unknown term is compressed into the single quantity $E_{xc}[n] = (T - T_s) + (V_{ee} - E_H)$ — that is, the "kinetic energy correction" plus "everything in the electron-electron interaction beyond Hartree." This is the very quantity that LDA/GGA/hybrid functionals (section 03) approximate.

## 4. Effective potential and self-consistency

The $v_{eff}$ in the KS equations consists of three terms:

$$v_{eff}(\mathbf{r}) = v_{ext}(\mathbf{r}) + v_H(\mathbf{r}) + v_{xc}(\mathbf{r})$$

with:
- $v_{ext}(\mathbf{r}) = -\sum_I \frac{Z_I e^2}{4\pi\epsilon_0|\mathbf{r} - \mathbf{R}_I|}$: nucleus-electron attraction
- $v_H(\mathbf{r}) = \int \frac{n(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|} d^3r'$: Hartree potential (classical Coulomb)
- $v_{xc}(\mathbf{r}) = \delta E_{xc}[n]/\delta n(\mathbf{r})$: exchange-correlation potential (functional derivative of $E_{xc}$)

The crucial observation: $v_{eff}$ depends on the density $n(\mathbf{r})$, the density is built from the $\phi_i$, and the $\phi_i$ come from solving the KS equation that includes $v_{eff}$. There is a circular dependency through itself, so it cannot be solved in one shot. A self-consistent iteration is therefore required.

> **Related concept: self-consistent field (SCF)**
> "Self-consistent" means iterating until the input density and the output density agree. The same structure appears in Hartree-Fock, but in KS-DFT the additional $v_{xc}$ makes it a more complicated nonlinear fixed-point problem. Naive direct substitution diverges easily, so acceleration techniques such as Pulay mixing (DIIS), Broyden mixing, and linear mixing are almost always used. Two convergence criteria are common: an energy change $|\Delta E| < 10^{-5}$ to $10^{-7}$ eV and a density change $\int|\Delta n| d^3r < 10^{-4}$ to $10^{-6}$. Magnetic systems and strongly correlated systems converge with difficulty and can require hundreds of SCF steps.

## 5. SCF algorithm

The standard cycle for a real KS-DFT calculation is as follows.

1. **Initial density estimate $n^{(0)}(\mathbf{r})$**: usually the superposition of atomic densities (SAD) for each atom. Magnetic systems must also have their magnetic moments initialized explicitly (see section 04).
2. **Construct the effective potential**: $v_{eff}^{(k)} = v_{ext} + v_H[n^{(k)}] + v_{xc}[n^{(k)}]$.
3. **Solve the KS equation**: at fixed $v_{eff}^{(k)}$, solve the single-particle eigenvalue problem to obtain $\{\phi_i^{(k+1)}, \epsilon_i^{(k+1)}\}$.
4. **Compute the new density**: $n^{(k+1)} = \sum_i f_i |\phi_i^{(k+1)}|^2$.
5. **Convergence check**: terminate if $|n^{(k+1)} - n^{(k)}|$ or $|E^{(k+1)} - E^{(k)}|$ falls below threshold. Otherwise, mix $n^{(k+1)} \leftarrow \alpha n^{(k+1)} + (1-\alpha)n^{(k)}$ (linear) or apply DIIS, then return to step 2.

From the converged SCF result, the total energy, forces, stresses, magnetic moments, band structure, and partial density of states (PDOS) can all be extracted. Geometry optimization wraps the SCF cycle inside an outer loop over ionic positions — the outer loop moves the ions until the forces $\mathbf{F}_I = -\partial E/\partial \mathbf{R}_I$ vanish.

Typical SCF cost for a battery calculation: a 100-atom NMC cell at 400 eV cutoff with a $4\times 4\times 2$ k-point mesh takes ~30–60 SCF steps per single-point calculation, with wall time of a few hours on tens of cores. Migration barriers (NEB, section 05) and phonon calculations multiply this cost by the number of images or displacements.

## 6. Variational principle and limitations

KS-DFT is "exact in principle but approximate in practice," and the entire reason lies in $E_{xc}[n]$. The Hohenberg-Kohn theorems guarantee its existence but not its form, and every functional we use (LDA, PBE, HSE, etc.) is an approximation to it.

**Limitation 1: the exact form of $E_{xc}$ is unknown**
This problem is taken up in detail in section 03. The choice of functional directly determines accuracy, and there is system dependence — GGA+U or SCAN is recommended for oxides, vdW-DF for surface adsorption, and a hybrid for insulator band gaps.

**Limitation 2: KS eigenvalues $\epsilon_i$ are not quasiparticle energies**
KS orbitals are, after all, orbitals of a fictitious non-interacting system, and there is no guarantee that $\epsilon_i$ matches the actual photoionization energy or band energy. The only exception is Janak's theorem, which states that the highest occupied KS eigenvalue (HOMO) is approximately the negative of the exact ionization energy (for the exact functional).

A representative consequence is **band-gap underestimation**: GGAs such as PBE reproduce only 50–70% of the experimental band gap. The experimental gap of Si (1.17 eV) comes out at ~0.6 eV in PBE. The cause is the absence of the derivative discontinuity — the exact $v_{xc}$ jumps discontinuously at integer electron numbers, while smooth LDA/GGA functionals cannot represent this. Remedies: hybrid (HSE06), $G_0W_0$ (post-DFT correction), and DFT+U (for strongly correlated systems) — all covered in section 03.

**Limitation 3: strongly correlated systems and self-interaction error (SIE)**
The Hartree term $v_H$ contains the unphysical contribution of an electron interacting with the average density that includes itself. With exact exchange this is canceled exactly, but the approximate exchange of LDA/GGA cannot fully erase it. The result is unphysical delocalization (over-delocalization) of strongly localized states such as d/f electrons. Representative cases include Ni 3d in NMC, Mn 3d in perovskites, and lanthanide 4f, and the standard remedy is DFT+U or a hybrid.

**Limitation 4: dispersion forces (van der Waals) and dynamics**
Standard LDA/GGA cannot reproduce the asymptotic $-C_6/r^6$ attraction — they miss the correlation energy between two isolated closed-shell molecules. Representative failure cases are interlayer bonding in graphite, MOFs, and molecular crystals. Corrections: Grimme's empirical D2/D3/D4 corrections, the non-local vdW-DF functional, and many-body dispersion (MBD). DFT is also intrinsically a static calculation, so temperature/entropy must be handled separately by post-processing (quasi-harmonic, MD).

In sum, KS-DFT is a delicate trade-off between "rigor in principle" and "approximation in practice," and the next sections address each face of that trade-off in turn — functional choice, numerical parameters, and battery applications.

## References

- Hohenberg, P., Kohn, W. *Physical Review* 136 (1964) B864–B871 — original paper on the foundational theorems of DFT.
- Kohn, W., Sham, L. J. *Physical Review* 140 (1965) A1133–A1138 — original paper on the Kohn-Sham equations.
- Parr, R. G., Yang, W. *Density-Functional Theory of Atoms and Molecules* (Oxford, 1989) — the standard chemistry textbook on DFT.
- Martin, R. M. *Electronic Structure: Basic Theory and Practical Methods* (2nd ed., Cambridge, 2020) — the classic on solid-state DFT.
- Burke, K. *The ABC of DFT* (lecture notes, 2007) — Kieron Burke's free DFT primer.
- Perdew, J. P., Levy, M. *Physical Review Letters* 51 (1983) 1884–1887 — origin of the derivative discontinuity and band-gap underestimation.
