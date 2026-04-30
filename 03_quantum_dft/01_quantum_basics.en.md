# Quantum Mechanics Basics

## 1. Overview

To treat the voltage, migration barriers, and redox centers of battery materials quantitatively "at the atomic level," we ultimately have to descend to electronic structure calculations. The starting point is quantum mechanics (QM), and within QM the time-independent Schrödinger equation (TISE) is the backbone of all first-principles calculations.

Intuitively, classical mechanics assumes that the position and momentum of a particle can be known simultaneously. For light particles such as electrons, however, position and momentum cannot both be determined exactly at the same time (uncertainty), and an electron must be treated less as a particle and more as a "probability amplitude" distributed in space. That amplitude is the wavefunction $\psi(\mathbf{r})$.

This section organizes the minimum quantum mechanics needed to understand DFT — the structure of the TISE, the interpretation of the wavefunction, operators and measurement, antisymmetry of many-electron systems, and the Hartree-Fock (HF) mean-field approximation. It is the prelude that justifies the starting point of section 02 (DFT foundations): "represent everything by the single quantity $n(\mathbf{r})$, the electron density, instead of the many-electron wavefunction."

One framing to carry along: HF treats exchange exactly but misses correlation, whereas DFT lumps both into approximate functionals. Keeping this contrast in mind makes section 03 (exchange-correlation) much easier to read.

## 2. Time-independent Schrödinger equation

The equation that determines the stationary-state energy of an atom/molecule/crystal is the TISE. Separating the time-dependent SE solution as $\Psi(\mathbf{r}, t) = \psi(\mathbf{r}) e^{-iEt/\hbar}$ peels off the time piece, leaving an eigenvalue problem for the spatial part.

Intuitively, $\hat{H}$ is the operator that gives the total energy of the system, and $\psi$ is the stationary-state distribution corresponding to that energy. A "stationary state" is a state in which the probability density $|\psi|^2$ does not change with time, and the ground state is the lowest-energy solution among them.

$$\hat{H}\psi(\mathbf{r}) = E\psi(\mathbf{r})$$

Here $\hat{H}$ = Hamiltonian operator, $\psi$ = wavefunction, $E$ = energy eigenvalue. For a single particle (electron) in an external potential $V(\mathbf{r})$:

$$\hat{H} = -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r})$$

Term by term: first term = kinetic energy $\hat{T}$ (Laplacian $\nabla^2$); second term = potential energy $\hat{V}$; $\hbar = h/2\pi \approx 1.055 \times 10^{-34}$ J·s; $m$ = particle mass (for the electron, $m_e \approx 9.11 \times 10^{-31}$ kg). The TISE is a linear differential equation, and for the same $\hat{H}$ there are infinitely many eigenvalue–eigenfunction pairs $\{(E_n, \psi_n)\}$ (bound states for a discrete spectrum, scattering states for a continuous one).

Extending to molecules/crystals adds nucleus–electron attraction and electron–electron repulsion. The full Hamiltonian is:

$$\hat{H} = -\sum_i \frac{\hbar^2}{2m_e}\nabla_i^2 - \sum_I \frac{\hbar^2}{2M_I}\nabla_I^2 - \sum_{i,I}\frac{Z_I e^2}{4\pi\epsilon_0|\mathbf{r}_i - \mathbf{R}_I|} + \frac{1}{2}\sum_{i\neq j}\frac{e^2}{4\pi\epsilon_0|\mathbf{r}_i - \mathbf{r}_j|} + \frac{1}{2}\sum_{I\neq J}\frac{Z_I Z_J e^2}{4\pi\epsilon_0|\mathbf{R}_I - \mathbf{R}_J|}$$

The terms are: electron kinetic energy, nuclear kinetic energy, nucleus–electron attraction, electron–electron repulsion, and nucleus–nucleus repulsion. This is the starting point of the many-body problem, and the dimensionality explodes as the number of electrons grows (the wavefunction $\psi(\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_N)$ for $N$ electrons is a $3N$-dimensional function).

> **Related concept: Born-Oppenheimer approximation**
> Nuclei are roughly $1836$ times more massive than electrons ($M_I/m_e \gg 1$), so electrons respond essentially instantaneously to nuclear motion. This justifies fixing the nuclear coordinates $\{\mathbf{R}_I\}$ as parameters and solving only the electronic part. This is the Born-Oppenheimer (BO) approximation. The ground-state energy $E_{el}(\{\mathbf{R}_I\})$ of the electronic Hamiltonian $\hat{H}_{el}(\{\mathbf{R}_I\})$ then defines the potential energy surface (PES) governing the nuclear motion. DFT is a tool for computing one point on this PES.
> Representative cases where BO breaks down: photo-induced transitions (non-adiabatic dynamics), strongly electron–phonon-coupled superconductivity, and proton transfer. For ordinary static battery calculations, BO is almost always valid.

## 3. Wavefunction and probabilistic interpretation

The wavefunction $\psi(\mathbf{r})$ itself is not a directly measurable quantity; what carries direct meaning is its squared modulus $|\psi(\mathbf{r})|^2$. This is called the Born interpretation: $|\psi(\mathbf{r})|^2 \, d^3r$ is the probability of finding the particle in the infinitesimal volume $d^3r$.

Intuitively, $\psi$ is a complex amplitude, and quantum mechanics is fundamentally a theory of superposition of amplitudes. The probabilities seen in experiment are squared moduli of those amplitudes; when amplitudes from two paths are added, interference appears.

For the probabilistic interpretation to make sense, the integral over all space must equal 1 (normalization):

$$\int |\psi(\mathbf{r})|^2 \, d^3r = 1$$

This condition imposes additional boundary conditions on the wavefunction. For an unbounded region, $\psi \to 0$ as $|\mathbf{r}| \to \infty$. For periodic systems such as crystals, Bloch's theorem requires $\psi(\mathbf{r} + \mathbf{R}) = e^{i\mathbf{k}\cdot\mathbf{R}}\psi(\mathbf{r})$ (this expression reappears in section 04 on plane waves and k-points).

Additional requirements on the wavefunction:
- Single-valued: it cannot take two values at the same point.
- Continuous: $\psi$ and $\nabla\psi$ should be smooth (with the exception of singular potentials such as a delta function).
- Square-integrable: $\int|\psi|^2 < \infty$.

In the battery context, the place where this matters most is the PAW (projector augmented wave) method. In the core region, the wavefunction oscillates violently and a plane-wave representation is inefficient; PAW transforms that region into a smooth pseudo-wavefunction — revisited in section 04.

## 4. Operators and measurement

In quantum mechanics every measurable physical quantity (observable) is represented by a Hermitian operator. The result of a measurement is one of the operator's eigenvalues, and after the measurement the system "collapses" into the corresponding eigenstate.

Three core operators: position $\hat{x} = x$, momentum $\hat{p}_x = -i\hbar \partial/\partial x$, and energy $\hat{H}$. Their expectation values are:

$$\langle \hat{A} \rangle = \int \psi^*(\mathbf{r}) \, \hat{A} \, \psi(\mathbf{r}) \, d^3r$$

with $\psi^*$ = complex conjugate and $\hat{A}$ = an arbitrary operator. $\langle \hat{H} \rangle$ is the average energy, and in a stationary state it is fixed at $\langle\hat{H}\rangle = E$.

The non-commutativity of two operators is the origin of uncertainty. When the commutator $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$ is non-zero, the two quantities cannot be measured simultaneously with arbitrary precision.

$$[\hat{x}, \hat{p}_x] = i\hbar, \qquad \Delta x \cdot \Delta p_x \geq \frac{\hbar}{2}$$

This is the Heisenberg uncertainty principle. Intuitively, the more an electron is confined to a narrow region near the nucleus, the smaller $\Delta x$ becomes and the larger $\Delta p$ becomes, so the kinetic energy explodes — this is why electrons do not collapse infinitely into the nucleus and why stable atoms exist (the stability of matter, Lieb-Thirring theorem).

Quantities frequently encountered in DFT calculations:
- Total energy $E = \langle\hat{H}\rangle$
- Electron density $n(\mathbf{r}) = N \int |\Psi(\mathbf{r}, \mathbf{r}_2, \ldots, \mathbf{r}_N)|^2 d\mathbf{r}_2 \cdots d\mathbf{r}_N$
- Force (Hellmann-Feynman) $\mathbf{F}_I = -\partial E/\partial \mathbf{R}_I$
- Stress tensor $\sigma_{\alpha\beta} = -(1/V)\partial E/\partial \epsilon_{\alpha\beta}$

Driving the forces and stress to zero terminates structural relaxation — discussed again in section 04.

## 5. Many-electron systems and antisymmetry

Electrons are fermions (spin-1/2), so the many-electron wavefunction must change sign upon exchange of the (spatial + spin) coordinates of any two electrons. This is the antisymmetry requirement, and the Pauli exclusion principle — that two electrons cannot occupy the same spatial-spin state — is its direct consequence.

Intuitively, if two electrons sit at the same place, the wavefunction has to equal the negative of itself, $\psi = -\psi$, which forces $\psi = 0$. Hence two electrons with identical quantum numbers cannot coexist at the same site.

The simplest mathematical form that automatically enforces this requirement is the Slater determinant.

$$\Psi(\mathbf{x}_1, \ldots, \mathbf{x}_N) = \frac{1}{\sqrt{N!}}
\begin{vmatrix}
\phi_1(\mathbf{x}_1) & \phi_2(\mathbf{x}_1) & \cdots & \phi_N(\mathbf{x}_1) \\
\phi_1(\mathbf{x}_2) & \phi_2(\mathbf{x}_2) & \cdots & \phi_N(\mathbf{x}_2) \\
\vdots & \vdots & \ddots & \vdots \\
\phi_1(\mathbf{x}_N) & \phi_2(\mathbf{x}_N) & \cdots & \phi_N(\mathbf{x}_N)
\end{vmatrix}$$

Here $\mathbf{x}_i = (\mathbf{r}_i, s_i)$ denotes spatial-spin coordinates, $\{\phi_i\}$ are orthonormal single-particle orbitals, and $1/\sqrt{N!}$ is the normalization factor. Swapping two rows flips the sign of the determinant, so antisymmetry is automatic.

For this form to be meaningful, the electrons must be effectively independent, and so a single Slater determinant pairs naturally with a mean-field approximation. In general, the exact many-body wavefunction is a linear combination of indefinitely many Slater determinants (configuration interaction, CI), and this difference is the electron correlation energy.

The real difficulty of the many-electron problem: a single-electron wavefunction has dimension $\sim 10^3$ grid points, but the many-body wavefunction obtained as a product over $N$ electrons has dimension $10^{3N}$. CI gives an exact answer in principle but is in practice infeasible beyond ~10 electrons even in molecules. This is the very reason DFT was introduced: replace the $3N$-dimensional $\Psi$ by the three-dimensional function $n(\mathbf{r})$.

## 6. Hartree-Fock approximation

Solving the many-electron Schrödinger equation under the assumption of a single Slater determinant via the variational principle yields the Hartree-Fock (HF) equations. They are a mean-field picture in which each electron moves in the average potential generated by all the others, and they take the form of self-consistent equations for the single-particle orbitals $\phi_i$.

Intuitively, the electron–electron repulsion splits into two pieces. (i) The classical Coulomb (Hartree) term: the electrostatic repulsion against the average electron density made by all the other electrons. (ii) The exchange term: a quantum-mechanical correction stemming from the antisymmetry requirement, which causes same-spin electrons to avoid each other (the Fermi hole). Combining the two defines the Fock operator.

$$\hat{F}\phi_i(\mathbf{x}) = \epsilon_i \phi_i(\mathbf{x})$$

$$\hat{F} = -\frac{\hbar^2}{2m_e}\nabla^2 + v_{ext}(\mathbf{r}) + \hat{J} - \hat{K}$$

Term by term: $\hat{J}\phi_i(\mathbf{x}) = \sum_j \int \frac{|\phi_j(\mathbf{x}')|^2}{|\mathbf{r} - \mathbf{r}'|} d\mathbf{x}' \, \phi_i(\mathbf{x})$ (Coulomb), $\hat{K}\phi_i(\mathbf{x}) = \sum_j \int \frac{\phi_j^*(\mathbf{x}')\phi_i(\mathbf{x}')}{|\mathbf{r} - \mathbf{r}'|} d\mathbf{x}' \, \phi_j(\mathbf{x})$ (exchange, a non-local integral operator), and $\epsilon_i$ = orbital energy (an approximation to the ionization energy via Koopmans' theorem).

Two essential limitations of HF:
1. **Absence of correlation**: HF treats exchange exactly but misses both the dynamic correlation (electrons mutually avoiding each other in real time) and the static correlation that requires multiple determinants. By definition, the difference between the HF energy and the exact non-relativistic energy is the correlation energy ($E_{corr} = E_{exact} - E_{HF}$); even at the ~1% level of molecular bond energies, this destroys chemical accuracy ($\sim 1$ kcal/mol).
2. **Computational cost**: the exchange term scales as $O(N^4)$ (worse with plane-wave bases), making it difficult to apply to large systems.

> **Related concept: variational principle**
> The energy expectation value of any trial wavefunction $\psi_{trial}$ is always greater than or equal to the exact ground-state energy $E_0$: $\langle\psi_{trial}|\hat{H}|\psi_{trial}\rangle / \langle\psi_{trial}|\psi_{trial}\rangle \geq E_0$. So if we tune the parameters of the trial function to minimize this energy, we approach the ground state. HF performs the variation within a single Slater determinant, and DFT (section 02) performs the variation with respect to the density — the variational principle is the justification for both methods.

How DFT overcomes HF's inefficiency: instead of treating exchange exactly, both exchange and correlation are folded together into a single unknown functional $E_{xc}[n]$ and approximated. This trade-off is the starting point of every functional choice (LDA/GGA/hybrid), and section 03 takes it up in detail.

In the battery context: nearly all practical calculations — NMC, LFP cathodes, conversion anodes, etc. — are carried out with DFT (KS-DFT). HF appears only in small-molecule benchmarks or as a component of hybrid functionals (e.g., the 25% HF exchange in HSE06); it is rarely used on its own.

## References

- Griffiths, D. J. *Introduction to Quantum Mechanics* (3rd ed., Cambridge, 2018) — standard introduction to TISE, wavefunctions, and operators.
- Szabo, A., Ostlund, N. S. *Modern Quantum Chemistry: Introduction to Advanced Electronic Structure Theory* (Dover, 1996) — the classic on the Slater determinant and Hartree-Fock.
- Levine, I. N. *Quantum Chemistry* (7th ed., Pearson, 2014) — Born-Oppenheimer, variational principle, HF SCF.
- Born, M., Oppenheimer, R. *Annalen der Physik* 389 (1927) 457–484 — original paper on the nucleus–electron separation approximation.
- Slater, J. C. *Physical Review* 34 (1929) 1293–1322 — determinant representation of the antisymmetric many-electron wavefunction.
