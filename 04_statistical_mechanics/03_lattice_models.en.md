# Lattice Models and Cluster Expansion

## 1. Overview

Lattice models are the most powerful abstraction tool in statistical mechanics. They reduce the countless degrees of freedom of complex crystalline solids (electrons, atomic positions, vibrations, magnetic moments) to **discrete variables on the sites of a lattice** (spin ±1, occupation 0/1, species A/B, etc.), making the partition function tractable. Although this reduction looks like an oversimplification, the essential physics — the competition between interactions and thermal fluctuations — is preserved, allowing a unified treatment of a wide range of phenomena such as ferromagnetism, alloy ordering, and Li/vacancy configurations.

Intuitively, the essence of a lattice model is a tug-of-war between two terms. If the intersite interaction energy $J$ favors ordering, the thermal fluctuations $k_BT$ at temperature $T$ favor disorder. A phase transition occurs when the ratio $J/k_BT$ is near unity, and the universality that the critical behavior depends only on dimensionality and symmetry ([`./04_phase_transitions.md`](./04_phase_transitions.md)) is the deepest result of lattice-model studies.

In battery applications, lattice models are the key tool for predicting the **Li ordering pattern** and the **OCV curve** of active materials from first principles. DFT alone can only treat 0 K ordered phases, but fitting DFT to a cluster expansion and then solving finite-temperature equilibria via Monte Carlo allows quantitative prediction of the equilibrium behavior at the 300 K at which a real cell operates.

## 2. The Ising model

The most famous lattice model and the starting point of all lattice studies. At each site $i$ there is a binary variable $s_i \in \{+1, -1\}$ (spin up/down), and a simple Hamiltonian is used that couples only nearest neighbors:

$$H = -J \sum_{\langle i,j\rangle} s_i s_j - h \sum_i s_i$$

Symbols: $J$ = nearest-neighbor coupling constant ($J > 0$: ferromagnetic; $J < 0$: antiferromagnetic), $h$ = external magnetic field, $\langle i,j\rangle$ = sum over neighbor pairs. Inside the sum, $s_i s_j = +1$ when the two spins are parallel and $-1$ when antiparallel, so for $J > 0$ parallel alignment minimizes the energy.

The lattice gas and the Ising model are exactly equivalent. Substituting $s_i = 2n_i - 1$ for the occupation variable $n_i \in \{0, 1\}$ maps one model exactly onto the other. The chemical potential $\mu$ plays the role of the magnetic field $h$, and the neighbor-pair interaction plays the role of $J$. Therefore every result on ferromagnetic critical behavior carries over directly to the critical behavior of Li/vacancy ordering in active materials.

| Dimension | Critical temperature $T_c$ | Note |
|------|------|------|
| 1D | 0 (no transition) | In 1D, no long-range order is possible at any finite $T$ |
| 2D square lattice | $T_c = 2J/[k_B \ln(1+\sqrt{2})] \approx 2.27\, J/k_B$ | Onsager (1944) exact solution |
| 3D simple cubic | $T_c \approx 4.51\, J/k_B$ | Numerical; no exact solution |

The exact solution of the 2D Ising model is one of the towering achievements in the history of statistical mechanics. Comparison with the mean-field prediction ($T_c^\text{MF} = z J/k_B = 4 J/k_B$, with $z$ = coordination number) shows that mean field overestimates the critical temperature by almost a factor of two. The reason for this discrepancy is treated in the next section on the limitations of mean field.

## 3. Mean-field solution and its limitations

The mean-field approximation is the simplest non-perturbative technique for solving lattice models. The key assumption is that **each spin feels only the average $\langle s\rangle$ of its neighbors rather than their precise configuration**. That is, $s_i s_j \to s_i \langle s\rangle + \langle s\rangle s_j - \langle s\rangle^2$ (fluctuations ignored).

$$H_\text{MF} = -(Jz\langle s\rangle + h)\sum_i s_i + \text{const}$$

Each site is now independent, so the partition function factorizes, and a self-consistent equation for $\langle s\rangle$ emerges:

$$\langle s\rangle = \tanh(\beta(Jz\langle s\rangle + h))$$

At $h = 0$, in addition to the trivial solution $\langle s\rangle = 0$ a non-trivial solution appears at the critical temperature where the derivative of $\tanh$ becomes 1:

$$k_BT_c^\text{MF} = zJ$$

Mean field has two essential limitations. First, it **completely ignores fluctuations** and is therefore inaccurate in low dimensions (in 1D, mean field incorrectly predicts a finite $T_c$). Second, **universality breaks down near the critical point** — mean field always gives the same critical exponents ($\beta = 1/2$, $\gamma = 1$, $\delta = 3$, [`./04_phase_transitions.md`](./04_phase_transitions.md)), but the actual critical exponents depend on dimensionality and symmetry.

A representative case in the battery context where mean field does not fit well is **the width of the LiFePO₄ miscibility gap**. Mean field predicts a coexistence region between the two phases ($x \approx 0$ and $x \approx 1$), but it gets the width and depth quantitatively wrong. A size effect has been reported in which, as the particle size decreases, surface-energy and stress effects shrink or eliminate the gap; this is precisely the part that mean field cannot capture and where cluster expansion + MC are required.

## 4. Cluster Expansion (CE)

DFT can directly provide only the 0 K lattice energy. Real active materials admit a vast number of Li/vacancy configurations, and running a separate DFT calculation for each one is impractical. The **cluster expansion** is a precise mathematical framework that compresses the energies of all possible lattice configurations into a small number of effective interaction parameters (ECI: effective cluster interactions).

Key idea: the energy of an arbitrary lattice configuration $\sigma = \{\sigma_1, \sigma_2, \cdots\}$ ($\sigma_i = \pm 1$ for binary) is expanded as a linear combination of cluster functions $\bar\Pi_\alpha$ (the crystal-symmetry-averaged products of spins on the sites belonging to cluster $\alpha$):

$$E(\sigma) = \sum_\alpha m_\alpha J_\alpha \bar\Pi_\alpha(\sigma)$$

Symbols: $m_\alpha$ = multiplicity of cluster $\alpha$ (size of the crystal-symmetry orbit), $J_\alpha$ = ECI (effective cluster interaction of cluster $\alpha$). Clusters $\alpha$ are expanded in order: single point ($\alpha$ = 1), pair ($\alpha$ = $i$-$j$ pair), triplet ($i$-$j$-$k$ triplet), and so on.

Justification of CE: by the Sanchez-Ducastelle-Gratias (1984) theorem, every configuration function expands exactly in a complete orthogonal basis of cluster functions, so including enough clusters reproduces the energy to arbitrary accuracy. In practice one starts with nearest-neighbor pairs, extends to more distant pairs and small triplets, and truncates at the order where the ECIs become sufficiently small (typically ~10–30 ECIs).

ECI determination workflow:
1. Compute exact energies of $N$ ($\sim 50$–200) different configurations with DFT.
2. Build the cluster-function matrix $\bar\Pi_{\alpha,k}$ ($k$ = configuration index).
3. Fit $J_\alpha$ by least squares or LASSO-regularized regression: $\min_{J} \|E_\text{DFT} - \bar\Pi J\|^2 + \lambda\|J\|_1$.
4. Use cross-validation to decide the cluster truncation (avoid overfitting).

The fitted CE Hamiltonian gives the energy instantly for any configuration (any Li pattern that fits in the simulation cell). This is decisive — DFT calculations take minutes to hours apiece, while a CE evaluation takes microseconds. As a result, $10^6$-step Monte Carlo runs become feasible.

## 5. Monte Carlo simulation

With a CE Hamiltonian in hand, the standard tool for solving finite-temperature equilibria is **Metropolis Monte Carlo**. The configuration space on the lattice is sampled by a Markov chain to compute averages of the canonical (or grand canonical) partition function.

Algorithm at a glance:

1. From the current configuration $\sigma$, randomly select a single site (or swap occupancy between two sites) and propose $\sigma'$.
2. Compute the energy change $\Delta E = E(\sigma') - E(\sigma)$ instantly with the CE.
3. **Metropolis acceptance probability**:
   $$P_\text{accept} = \min(1, e^{-\beta \Delta E})$$
4. If accepted, update $\sigma' \to \sigma$; otherwise keep the old configuration.

This simple rule produces a Markov chain that converges to the Boltzmann distribution $P(\sigma) \propto e^{-\beta E(\sigma)}$. Intuition: changes that lower the energy are always accepted; changes that raise the energy are accepted with probability $e^{-\beta \Delta E}$ — exactly the Boltzmann weighting.

In grand canonical MC, instead of a site-occupancy swap one attempts a **single-site occupation flip** (empty → filled or vice versa), and the acceptance probability includes a chemical-potential term:

$$P_\text{accept} = \min(1, e^{-\beta(\Delta E - \mu \Delta N)})$$

Scanning $\mu$ as an external variable and measuring the mean occupancy $\langle x\rangle$ directly yields the OCV-SOC curve. This is the core workflow of first-principles voltage prediction.

Practical caveats:
- **Equilibration**: a burn-in is needed to wash out the influence of the initial configuration. The first $10^4$–$10^5$ MC steps are typically discarded.
- **Autocorrelation**: to reduce correlations between successive samples, the measurement interval should exceed the autocorrelation time.
- **Critical slowing-down near the critical point**: single-site flips become very slow at the critical point. Wolff/Swendsen-Wang cluster algorithms accelerate it.

## 6. Battery applications: Li ordering and configurational entropy

We summarize how the CE + MC combination is used in battery-materials modeling.

**Li-ordered phases of LixCoO₂**: at $x = 0.5$, an ordered phase with row-by-row Li ordering on the sites is observed. Van der Ven et al. used CE + MC to reproduce this ordering accurately starting from 0 K and predicted an order-disorder transition temperature near ~100 K — a benchmark example for the field.

**LixNi₁/₃Mn₁/₃Co₁/₃O₂ (NMC) voltage profile**: Wang, Ceder et al. (2006) applied CE to NMC layered oxides and quantitatively reproduced the 300 K OCV curve starting from 0 K DFT. This is a decisive result showing that the voltage profile reflects not just simple averages but the full Li configurational entropy and interactions.

**Two-phase coexistence in LiFePO₄**: in the olivine structure, the LiFePO₄ ↔ FePO₄ phase transition is first-order, with a large miscibility gap. CE + MC quantifies the temperature dependence of this gap, the particle-size effect (gap shrinkage in nanoscale LFP), and the influence of lattice-mismatch stress.

**Direct evaluation of configurational entropy**: the configurational entropy can be obtained by integrating the chemical potential,

$$S_\text{config}(x) = S_\text{config}(x_0) + \int_{x_0}^{x} \frac{\partial \mu_\text{Li}}{\partial T}\,\frac{dx'}{?}$$

or, more directly, by thermodynamic integration to extract free-energy differences. This quantity is the key term that determines the curvature in the slope (single-solid-solution) regions of the OCV curve.

In summary, lattice models are not mere theoretical toys but a **quantitative bridge between DFT and experimental OCVs**, and they have become the standard tool for first-principles voltage prediction, phase-diagram calculation, and identification of ordered phases. The quantitative aspects of actual critical behavior are covered in the next chapter, [`./04_phase_transitions.md`](./04_phase_transitions.md).

## References

- Onsager, L. *Physical Review* 65 (1944) 117–149 — exact solution of the 2D Ising model.
- Sanchez, J. M., Ducastelle, F., Gratias, D. *Physica A* 128 (1984) 334–350 — mathematical foundations of the cluster expansion.
- Van der Ven, A., Aydinol, M. K., Ceder, G. *Physical Review B* 58 (1998) 2975–2987 — first application of CE + MC to LixCoO₂.
- Wang, L., Maxisch, T., Ceder, G. *Chemistry of Materials* 19 (2007) 543–552 — CE prediction of the voltage profile of layered NMC (representative example).
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — standard treatment of the Metropolis MC algorithm.
- Walle, A. van de, Ceder, G. *Journal of Phase Equilibria* 23 (2002) 348–359 — practical guide to CE and the ATAT code.
