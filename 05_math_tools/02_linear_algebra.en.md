# Linear algebra

## 1. Overview

Linear algebra is the tool that handles multidimensional linear relations in the language of matrices and vectors, and it is the reason that quantum chemistry, solid-state physics, vibrational analysis, and statistical learning all reduce to one common operation — **matrix diagonalization**. Hückel molecular orbitals, the phonon dispersion of crystals, normal-mode analysis, principal component analysis (PCA), and circuit-network analysis look like completely different problems on the surface, but mathematically they are all summarized in one sentence: "find the eigenvalues and eigenvectors of a certain matrix."

Intuitively, the transformation given by a matrix $A$ is generally a complex map mixing rotation and stretching, but in the directions of the **eigenvectors** of that matrix, it reduces to a simple scalar multiplication — by the **eigenvalue**. Once these "simple axes" are found, an arbitrary linear dynamics decomposes into several independent one-dimensional problems, and the solution becomes obvious. The fact that measurable physical quantities in quantum mechanics appear as eigenvalues of Hermitian operators, and the fact that normal modes of a vibrating molecule oscillate independently, are both expressions of this general principle.

This section covers ① matrix algebra and special matrices, ② the eigenvalue problem and the characteristic polynomial, ③ diagonalization and similarity transformations, ④ the molecular-orbital (Hückel) application, and ⑤ the vibrational normal-mode application. Numerical aspects (condition number, SVD, LU decomposition) are reinforced in [`./04_numerical_methods.md`](./04_numerical_methods.md).

## 2. Matrix algebra and special matrices

A matrix is the coordinate representation of a linear map $\mathbb{R}^n \to \mathbb{R}^m$, and the product $AB$ corresponds to the composition of two maps. Non-commutativity ($AB \neq BA$ in general) is the natural expression of the fact that the order of two transformations changes the result. Key operators: transpose $A^T$, conjugate transpose $A^\dagger = (A^*)^T$, inverse $A^{-1}$, trace $\text{tr}(A) = \sum_i A_{ii}$, determinant $\det A$.

Four kinds of special matrices that recur in physics:

| Type | Definition | Key property | Where it appears |
|---|---|---|---|
| symmetric | $A^T = A$ (real) | real eigenvalues, orthogonal eigenvectors | vibration matrices $K$, $M$ |
| Hermitian | $A^\dagger = A$ (complex) | real eigenvalues, orthogonal eigenvectors | quantum-mechanical observables, Kohn–Sham $H$ |
| orthogonal | $Q^T Q = I$ | rotations/reflections, length-preserving | coordinate transformations, PCA basis |
| unitary | $U^\dagger U = I$ | quantum-state transitions, probability-preserving | time-evolution operator $e^{-iHt/\hbar}$ |

The reason these four classes are important is that all of them have nice properties guaranteed by the **spectral theorem** — namely, they admit a complete diagonalization by a unitary (or orthogonal) transformation, and their eigenvalues are real or complex numbers on the unit circle, giving quantities that have direct physical interpretation. The fact that the eigenvalues of a Hermitian operator are real is the precise mathematical origin of why measured values in quantum mechanics are real.

## 3. Eigenvalues and eigenvectors

The most central definition is one line:

$$A v = \lambda v$$

Each term: $A$ = $n\times n$ matrix, $v$ = a non-zero vector (eigenvector), $\lambda$ = scalar (eigenvalue). That is, the eigenvector is a special direction along which $A$ sends $v$ to a scalar multiple of itself, and the eigenvalue is that scalar factor. Practically, this equation is solved by

$$\det(A - \lambda I) = 0$$

This is the **characteristic polynomial**, an $n$-th-order polynomial whose roots are the eigenvalues. For each eigenvalue $\lambda_i$, the eigenvector is obtained by solving $(A - \lambda_i I)v = 0$. The trace and determinant naturally appear in this picture: $\text{tr}(A) = \sum_i \lambda_i$ and $\det A = \prod_i \lambda_i$ hold exactly — these two identities are very useful for quickly checking the qualitative properties of a matrix without computing eigenvalues directly.

The **generalized eigenvalue problem** is the form involving two matrices:

$$A v = \lambda B v$$

If $B$ is positive-definite symmetric, one can reduce this to the standard form via a $B^{1/2}$ transformation, while keeping the meaning of eigenvalue and eigenvector intact. This form appears as-is in vibrational normal modes (the mass matrix $M$ is non-identity) and in the molecular-orbital secular problem (the overlap matrix $S$ for a non-orthogonal basis). Thus the generalized eigenvalue problem is not merely a mathematical generalization but a direct reflection of physical situations involving non-uniform mass or non-orthogonal basis sets.

## 4. Diagonalization and similarity transformations

A square matrix $A$ that has $n$ linearly independent eigenvectors is **diagonalizable**.

$$A = P D P^{-1}, \qquad D = \text{diag}(\lambda_1, \ldots, \lambda_n)$$

Each term: $P$ = matrix whose columns are the eigenvectors, $D$ = diagonal matrix with the eigenvalues on the diagonal. The key meaning is the coordinate change $P^{-1} A P = D$: in the new coordinates the action of $A$ becomes simple multiplication along each axis, and every operation becomes obvious. Matrix powers $A^k = P D^k P^{-1}$ and the matrix exponential $e^{At} = P e^{Dt} P^{-1}$ are obtained in one line, leading to the strong result that the solution $x(t) = e^{At} x_0$ of the linear system of ODEs $\dot x = A x$ is given immediately in closed form.

Two special cases occur almost always in practice.

**(i) Orthogonal diagonalization of symmetric/Hermitian matrices.** If $A$ is symmetric (or Hermitian), the eigenvectors can be taken as an orthonormal basis, and setting $P$ as an orthogonal (unitary) matrix $Q$ gives $P^{-1} = Q^T$ (or $U^\dagger$). Then

$$A = Q\, \Lambda\, Q^T$$

This decomposition is numerically stable ($\kappa(Q) = 1$) and is the most common one in quantum mechanics, statistics, and signal processing.

**(ii) Normal matrices and the spectral theorem.** A matrix is called **normal** if $AA^\dagger = A^\dagger A$, and a normal matrix is unitarily diagonalizable. Symmetric/Hermitian/unitary matrices all belong to this class, and the spectral theorem makes "normal matrix = unitarily diagonalizable" an exact equivalence.

> **Related concept: Singular value decomposition (SVD)**
> For non-square or non-symmetric matrices, the general tool in place of diagonalization is the **singular value decomposition**: $A = U\Sigma V^T$, with $U, V$ orthogonal and $\Sigma$ a non-negative diagonal matrix of singular values $\sigma_i$. The relation $\sigma_i = \sqrt{\lambda_i(A^TA)}$ connects directly to eigenvalues, and low-rank approximation (data-matrix compression), denoising, the pseudo-inverse in regression, and principal component analysis (PCA, the eigenvalue decomposition of the data covariance matrix) are all aspects of SVD.
> The condition number $\kappa(A) = \sigma_\text{max}/\sigma_\text{min}$ is a single indicator that quantifies the numerical stability of a linear system, and is used directly to judge parameter identifiability in EIS equivalent-circuit fitting and the difficulty of solving the self-consistency matrix in DFT.

## 5. Application 1: Hückel molecular orbitals

Molecular-orbital theory is in essence a matrix eigenvalue problem. In the one-electron Schrödinger equation $H\psi = E\psi$, taking a trial wavefunction as a linear combination of atomic orbitals $\psi = \sum_i c_i \phi_i$ (LCAO), the variational principle yields the secular equation

$$H\, \mathbf{c} = E\, S\, \mathbf{c}$$

Each term: $H_{ij} = \langle \phi_i | \hat H | \phi_j \rangle$ = Hamiltonian matrix element, $S_{ij} = \langle \phi_i | \phi_j \rangle$ = overlap matrix element, $\mathbf{c}$ = coefficient vector, $E$ = orbital energy. This equation has exactly the form of a generalized eigenvalue problem, and the tools of Section 4 apply directly.

The **Hückel model** introduces two strong simplifications for $\pi$-electron systems. (i) On-site terms $H_{ii} = \alpha$ (the same Coulomb integral on every carbon atom), nearest-neighbor terms $H_{ij} = \beta$ (the resonance integral, only between adjacent bonds), all non-adjacent terms zero. (ii) Neglect of overlap, $S = I$. Then the generalized problem reduces to a standard eigenvalue problem, and the matrix is precisely $\alpha I + \beta A$, where $A$ is the adjacency matrix. Three steps — molecular graph → matrix → eigenvalues — give the molecular-orbital energies.

As a representative result, the secular matrix of butadiene (C₄H₆) is the 4×4 tridiagonal

$$\det\begin{pmatrix} \alpha-E & \beta & 0 & 0 \\ \beta & \alpha-E & \beta & 0 \\ 0 & \beta & \alpha-E & \beta \\ 0 & 0 & \beta & \alpha-E \end{pmatrix} = 0$$

Solving exactly, $E = \alpha + 2\beta\cos[k\pi/(n+1)]$, $k = 1, 2, 3, 4$, and the HOMO–LUMO gap and the bond stabilization energy follow immediately. This simple result already gives the first-order qualitative intuition for the color and reactivity of conjugated molecules. More generally, the same procedure applies to any π-bonded molecular graph, and this is the place where graph theory and quantum chemistry meet through the matrix eigenvalue problem.

## 6. Application 2: Vibrational normal modes

Small vibrations of a many-particle system reduce to exactly the same mathematics. Expanding the potential to second order around the equilibrium positions and writing the equation of motion for the small displacement $x$ gives

$$M\, \ddot x = -K\, x$$

Each term: $M$ = mass matrix (usually diagonal, with $M_{ii}$ = mass of the $i$-th coordinate), $K$ = matrix of spring constants (Hessian), symmetric and positive semi-definite. Substituting the trial form $x = v\, e^{i\omega t}$ gives

$$K\, v = \omega^2\, M\, v$$

— exactly a generalized eigenvalue problem. The eigenvalue $\lambda_i = \omega_i^2$ is the squared angular frequency of the normal mode, and the eigenvector $v_i$ is the displacement pattern of that mode. Consequently, an arbitrary small-displacement motion decomposes into a linear combination of independent normal modes, each oscillating independently like a simple harmonic oscillator.

This general result governs ① molecular vibrations — the peak positions of infrared/Raman spectra, ② phonons in crystals — the standard procedure of obtaining the phonon dispersion curves $\omega_n(\mathbf{k})$ by diagonalizing the dynamical matrix $D(\mathbf{k})$, ③ normal-mode analysis of proteins, and ④ LC resonance in circuits — all grow from the same mathematics. The fact that one matrix diagonalization, learned once, is used repeatedly across many domains is exactly why linear algebra is the most frequently used mathematical tool throughout the physical sciences.

> **Related concept: Matrix exponential and linear ODEs**
> The solution of the linear first-order system $\dot x = A x$ is $x(t) = e^{At} x_0$, and the matrix exponential is computed immediately from the diagonalization $A = PDP^{-1}$ as $e^{At} = P e^{Dt} P^{-1}$. In other words, every linear dynamics is fully solved by a single diagonalization.
> Applications: ① the time evolution of concentrations in a chemical-reaction network, ② the time response of a multi-state SOC model, ③ the time evolution in quantum mechanics $|\psi(t)\rangle = e^{-iHt/\hbar}|\psi(0)\rangle$, and ④ the steady-state distribution of a Markov chain (eigenvector with eigenvalue 1) — all are solved by the same one-line formula.

## 7. Practical summary

A summary of the matrix work most often encountered in batteries and materials science:

| Problem | Matrix form | Core operation |
|---|---|---|
| Molecular-orbital energies | Hermitian $H$, overlap $S$ | generalized eigenvalue $H\mathbf{c} = E\, S\mathbf{c}$ |
| Phonon dispersion | dynamical matrix $D(\mathbf{k})$ | diagonalize at each $\mathbf{k}$ |
| Vibrational IR/Raman | Hessian + mass | $K v = \omega^2 M v$ |
| EIS fitting | Jacobian, Hessian | LM algorithm, condition-number check |
| PCA / data compression | data covariance | SVD, principal components |
| Circuit-network analysis | nodal admittance | solve the linear system $Y v = i$ |

The core principle in one line: **"once you find good coordinates, everything becomes simple."** Linear algebra is the tool for systematically finding those good coordinates — the eigenvector basis — and the recurring fact is that this discovery coincides with the natural modes/states/principal components of the physical system.

## References

- Strang, G. *Introduction to Linear Algebra* (5th ed., Wellesley-Cambridge, 2016) — the standard intuition-first undergraduate textbook.
- Horn, R. A., Johnson, C. R. *Matrix Analysis* (2nd ed., Cambridge, 2013) — standard treatment of normal matrices, the spectral theorem, and matrix functions.
- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — physics-oriented summary of matrix tools.
- Atkins, P., Friedman, R. *Molecular Quantum Mechanics* (5th ed., Oxford, 2011) — standard treatment of the Hückel model and the LCAO secular equation.
- Ashcroft, N. W., Mermin, N. D. *Solid State Physics* (Saunders, 1976) — phonon dispersion and the dynamical matrix.
- Trefethen, L. N., Bau, D. *Numerical Linear Algebra* (SIAM, 1997) — numerical-side coverage of SVD, condition number, QR/Householder.
