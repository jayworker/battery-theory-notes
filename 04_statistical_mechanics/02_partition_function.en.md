# Partition Function and Free Energy

## 1. Overview

In [`./01_ensembles.md`](./01_ensembles.md) we defined the canonical partition function $Z = \sum_i e^{-\beta E_i}$. Although the partition function may look like a mere normalization constant, it is in fact the **generating function that contains all of the equilibrium thermodynamic information of the system**. The free energy is one logarithm of $Z$, and the internal energy, entropy, heat capacity, and chemical potential all follow as appropriate derivatives of $\ln Z$.

Intuitively, $Z$ is the "effective number of microstates accessible to the system at temperature $T$." If every state were occupied with the same weight, $Z$ would simply count the states; states whose energy difference is much greater than $k_BT$ have weights close to zero and effectively drop out. Hence $\ln Z$ is "the logarithm of the effective degrees of freedom," and it is natural that the free energy is $-k_BT$ times this.

In battery modeling, the partition function is central in two places. First, multiplying the 0 K electronic energy delivered by DFT by the partition functions of the vibrational and configurational degrees of freedom yields the finite-temperature free energy ($G(T) = E_\text{DFT} + F_\text{vib}(T) + F_\text{config}(T)$). Second, the chemical potential of the active material $\mu_\text{Li}(x, T)$ is computed directly as a derivative of the lattice-model partition function in order to predict the OCV curve.

## 2. Partition function and Helmholtz free energy

Let us rewrite the starting point of the canonical ensemble. With microstate $i$ of energy $E_i$ and inverse temperature $\beta = 1/k_BT$:

$$Z(T, V, N) = \sum_i e^{-\beta E_i}$$

This sum is over quantum microstates, or in the classical limit it becomes a phase-space integral $Z = h^{-3N}\int d^{3N}q\, d^{3N}p\, e^{-\beta H(q,p)}/N!$. In either form, the monotonically decreasing weight $e^{-\beta E}$ is the key, and states with $E_i \gg k_BT$ contribute almost nothing to the sum.

The Helmholtz free energy $A$ is defined as the logarithm of the partition function. This is the most important equation in this chapter:

$$\boxed{A(T, V, N) = -k_BT \ln Z(T, V, N)}$$

The legitimacy of this expression becomes immediately clear when both sides of $A = U - TS$ are expressed statistical-mechanically. Substituting the mean energy $\langle E\rangle$ and the Gibbs entropy $S = -k_B\sum P_i \ln P_i$ together with the Boltzmann distribution $P_i = e^{-\beta E_i}/Z$, one recovers exactly $A = -k_BT\ln Z$. Therefore the free energy is by no means an arbitrary definition; it falls directly out of the consistency of statistical mechanics with thermodynamics.

Once the free energy is known, everything else follows by differentiation:

$$S = -\left(\frac{\partial A}{\partial T}\right)_{V,N}, \quad P = -\left(\frac{\partial A}{\partial V}\right)_{T,N}, \quad \mu = \left(\frac{\partial A}{\partial N}\right)_{T,V}$$

These three equations follow directly from the fundamental thermodynamic identity $dA = -S\,dT - P\,dV + \mu\,dN$.

## 3. Extraction of thermodynamic quantities

Rather than the free energy, it is more common to use expressions obtained by differentiating $\ln Z$ directly. Start with the mean internal energy:

$$\langle E\rangle = \sum_i E_i P_i = -\frac{\partial \ln Z}{\partial \beta} = k_BT^2 \frac{\partial \ln Z}{\partial T}$$

Intuition: $-\partial/\partial\beta$ pulls $E_i$ down out of the weight, and the result is naturally the mean energy. The entropy, obtained by solving $A = U - TS$, is:

$$S = k_B(\ln Z + \beta \langle E\rangle) = -\frac{\partial A}{\partial T}$$

The constant-volume heat capacity $C_V$ is one more derivative:

$$C_V = \left(\frac{\partial \langle E\rangle}{\partial T}\right)_{V,N} = \frac{1}{k_BT^2}\langle (\Delta E)^2\rangle$$

The last equality is striking — **the heat capacity is proportional to the equilibrium energy fluctuations**. This is the simplest instance of the fluctuation-dissipation theorem and leads to the practical conclusion that $C_V$ can be extracted from MD simulations simply by measuring the energy variance along an equilibrium trajectory (the same logic is extended to transport coefficients in [`./05_transport_theory.md`](./05_transport_theory.md)).

Other response functions, such as the magnetic susceptibility and the compressibility, all take the same form — "response function = equilibrium fluctuation of the conjugate variable." This is what is meant by saying that $\ln Z$ is a generating function.

## 4. Separable systems: products of degrees of freedom

When weakly coupled degrees of freedom (translation, rotation, vibration, electronic, nuclear spin, configuration, etc.) are present and the Hamiltonian splits into a sum, the partition function automatically factorizes into a product:

$$H = H_\text{trans} + H_\text{rot} + H_\text{vib} + H_\text{el} \implies Z = Z_\text{trans} \cdot Z_\text{rot} \cdot Z_\text{vib} \cdot Z_\text{el}$$

Translated into the free energy, this becomes a sum:

$$A = -k_BT \sum_\alpha \ln Z_\alpha = A_\text{trans} + A_\text{rot} + A_\text{vib} + A_\text{el}$$

This separability is what makes statistical-mechanics calculations tractable. Example: the vibrational partition function of a crystalline solid is the product over $3N$ normal modes (each with frequency $\omega_k$), and the partition function of each harmonic oscillator is $Z_\text{vib}^{(k)} = 1/[2\sinh(\beta\hbar\omega_k/2)]$. The vibrational free energy is therefore:

$$F_\text{vib}(T) = \sum_k \left[\frac{\hbar\omega_k}{2} + k_BT \ln(1 - e^{-\beta\hbar\omega_k})\right]$$

The first term is the zero-point energy (ZPE), the second the finite-temperature correction. Adding this $F_\text{vib}$ to the static lattice energy $E_\text{DFT}$ given by DFT finally yields the finite-temperature Helmholtz free energy.

In battery applications, this separability is used as follows:

$$G(T, P, x) \approx E_\text{DFT}(x) + F_\text{vib}(T, x) + F_\text{config}(T, x) + PV(x)$$

Each term accounts for a different degree of freedom — the electronic structure ($E_\text{DFT}$, the DFT domain), the lattice vibrations ($F_\text{vib}$), and the Li/vacancy configuration ($F_\text{config}$, [`./03_lattice_models.md`](./03_lattice_models.md)). This sum, as a function of SOC, determines the OCV ($\partial G/\partial x \propto -\mu_\text{Li}$).

## 5. Chemical potential and particle insertion

The chemical potential is the statistical-mechanical definition of "how much the free energy increases when one more particle is added":

$$\mu = \left(\frac{\partial A}{\partial N}\right)_{T,V} = -k_BT\left(\frac{\partial \ln Z}{\partial N}\right)_{T,V}$$

In the large-$N$ limit it is sometimes approximated by a finite difference — $\mu \approx A(N+1) - A(N)$. This expression is the direct foundation of MC techniques such as Widom insertion.

In batteries the most important chemical potential is $\mu_\text{Li}(x)$ of Li in the active material. Since the OCV is directly tied to the chemical potential,

$$eV_\text{OCV}(x) = -[\mu_\text{Li}^\text{cathode}(x) - \mu_\text{Li}^\text{anode}]$$

the shape of the $\mu_\text{Li}^\text{cathode}(x)$ curve is the shape of the V-Q curve, and a flat plateau of the curve corresponds to a first-order phase-transition region in which $\mu_\text{Li}$ becomes equal in the two phases ([`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)).

In more detail: in a single-solid-solution region $\mu_\text{Li}(x)$ is a smooth function, so the OCV traces a slope, and when two phases (or two site types) coexist, the common-tangent construction makes $\mu_\text{Li}$ constant across the two phases, producing a plateau. All of this is a fundamental thermodynamic consequence of the convex/concave structure of the $G(x)$ curve, and statistical mechanics enables $G(x)$ to be computed from first principles.

## 6. Lattice gas and site occupancy: a direct application

The simplest model of a battery active material is the **lattice gas**. There are $M$ sites, each either empty ($n_i = 0$, energy 0) or filled with Li ($n_i = 1$, energy $\epsilon$). Ignoring intersite interactions, the canonical partition function reduces to a binomial coefficient:

$$Z(T, M, N) = \binom{M}{N} e^{-\beta N\epsilon}$$

Here $\binom{M}{N}$ is the configurational degeneracy and $e^{-\beta N\epsilon}$ is the energy weight. Solving for the free energy with the Stirling approximation gives the familiar entropy-of-mixing form:

$$A = N\epsilon + k_BT M \left[x \ln x + (1-x)\ln(1-x)\right], \qquad x = N/M$$

The chemical potential is the derivative with respect to $x$:

$$\mu_\text{Li}(x) = \epsilon + k_BT \ln\frac{x}{1-x}$$

This is the **OCV equation of an ideal lattice gas**, tracing a smooth S-shaped curve without divergence around $x = 0.5$. In real active materials, intersite interactions ($J\sum n_i n_j$) introduce non-ideality, and as a consequence plateaus emerge or disappear — quantified using cluster expansion in the next chapter [`./03_lattice_models.md`](./03_lattice_models.md).

The grand canonical formulation is even cleaner. For independent sites, as seen in [`./01_ensembles.md`](./01_ensembles.md):

$$\Xi = \prod_{i=1}^M \left(1 + e^{-\beta(\epsilon - \mu_\text{Li})}\right) = \left(1 + e^{-\beta(\epsilon - \mu_\text{Li})}\right)^M$$

The mean occupancy $x = -\partial(\Omega_G/M)/\partial\mu_\text{Li}$ takes the Fermi-Dirac form $x = 1/(1 + e^{\beta(\epsilon-\mu_\text{Li})})$, and inverting it for $\mu_\text{Li}$ recovers exactly the same equation as above (ensemble equivalence).

This simple model offers two lessons. First, a single $\ln Z$ delivers the entire OCV model. Second, only when site interactions are turned on does the rich phase behavior of plateaus, two-phase coexistence, and critical points appear, and quantifying it requires lattice models and MC simulations.

## References

- McQuarrie, D. A. *Statistical Mechanics* (University Science Books, 2000) — standard treatment of partition functions, free energies, and the separation of degrees of freedom.
- Pathria, R. K., Beale, P. D. *Statistical Mechanics* (3rd ed., Academic Press, 2011) — lattice gas and the statistical-mechanical definition of the chemical potential.
- Hill, T. L. *An Introduction to Statistical Thermodynamics* (Dover, 1986) — fundamentals of lattice gases and adsorption isotherms.
- Van de Walle, A., Asta, M. *Modelling Simul. Mater. Sci. Eng.* 10 (2002) 521–538 — finite-temperature free energies from DFT plus the vibrational partition function.
- Wolverton, C., Zunger, A. *Physical Review B* 57 (1998) 2242–2252 — first-principles calculation of cluster expansions and OCV curves of active materials.
