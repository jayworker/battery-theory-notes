# Phase Transitions and Critical Phenomena

## 1. Overview

Phase transitions are the most dramatic phenomena in statistical mechanics. Even when external variables — temperature, pressure, concentration — are varied smoothly, at some critical point the macroscopic properties of the system change **qualitatively** — a liquid becomes a gas, a ferromagnet becomes a paramagnet, a single solid solution separates into two phases. The essence of these qualitative changes is simple — **a variable that marks a new symmetry or its breaking (the order parameter) appears at the critical point, going from zero to a finite value (or vice versa)**.

Intuitively, a phase transition is the result of a competition between two terms. The qualitative change occurs where the interaction energy $J$, which favors order, balances the thermal fluctuations $k_BT$, which favor disorder. That balance point is called the critical temperature $T_c$, and in its neighborhood the correlation length diverges and every macroscopic response function diverges as a power law — the realm of critical phenomena.

In the battery context, phase transitions are precisely the plateaus of the V-Q curve. The first-order LiFePO₄ ↔ FePO₄ transition in LFP is the canonical example, and the plateau width, particle-size dependence, and lattice-mismatch stress all furnish key cases of phase-transition phenomenology. In the same vein, stage transitions in layered oxides and staging in graphite are also understood as phase transitions.

## 2. Order parameter

The central variable that describes a phase transition is the **order parameter** $\phi$. Its definition is simple — a quantity that vanishes in the disordered phase and takes a finite value in the ordered phase. Which quantity to take as the order parameter is determined by which symmetry is broken.

Representative examples:

| System | Order parameter | Symmetry |
|------|-----------------|---------|
| Ferromagnet-paramagnet | Magnetization $M = \langle s\rangle$ | $\mathbb{Z}_2$ (spin flip) |
| Liquid-gas | Density difference $\rho_l - \rho_g$ | None (first-order transition) |
| Alloy ordering | Site-species occupancy difference | Part of lattice translation symmetry |
| LiFePO₄/FePO₄ | Li concentration difference $x_{LFP} - x_{FP}$ | Lattice translation (Li ordering) |
| Superconductivity | $\langle\psi^\dagger\psi\rangle$ (Cooper pair density) | $U(1)$ |

The behavior of the order parameter sets the basic classification of the phase transition — if $\phi$ jumps **discontinuously** at the critical point, it is first-order; if it develops continuously, it is second-order (continuous).

If we view the Li concentration $x$ in LiFePO₄ as the order parameter, the interval over which the two phases coexist (FePO₄ at $x \approx 0.05$ and LiFePO₄ at $x \approx 0.95$) is precisely the first-order phase-transition region. The difference between these two values sets the width of the miscibility gap.

## 3. First-order vs. second-order phase transitions

The two classes are cleanly distinguished by the differentiability of the free energy.

**First-order phase transition**: the first derivative of the free energy $G$ is discontinuous at the critical point.
- Volume $V = (\partial G/\partial P)_T$ jumps → latent heat appears.
- Entropy $S = -(\partial G/\partial T)_P$ jumps → latent heat = $T \Delta S$.
- The two phases coexist at the critical point.
- Nucleation-growth dynamics; metastable states are possible; hysteresis occurs.

**Second-order (continuous) phase transition**: the first derivative of the free energy is continuous, while the second derivative diverges or is discontinuous.
- Entropy and volume are continuous; no latent heat.
- The heat capacity $C_P = -T(\partial^2 G/\partial T^2)_P$ diverges at the critical point.
- The correlation length $\xi$ diverges; scale invariance emerges.
- Critical exponents and universality emerge.

Battery cases:
- **LiFePO₄ ↔ FePO₄**: a clear first-order phase transition. The plateau is very flat and long, and along the two-phase coexistence interval the OCV is constant. The latent heat is small but measurable. Once the particle size becomes small enough (< 30 nm), the plateau tilts and the system effectively becomes a single solid solution — because the particle surface-energy contribution becomes comparable to the free-energy difference between the two phases.
- **Stage 1/2 transition in LixCoO₂**: first-order, but the width is narrow.
- **NMC layered oxides**: mostly single-solid-solution regions (slope), with only a few narrow plateaus.
- **Staging of graphite**: first-order transitions between stages 1, 2, 2L, 3, 4 occur in a stepwise fashion.

## 4. Mean-field critical exponents and Landau theory

Near the critical point the macroscopic response functions diverge as power laws. Standard definitions:

$$\phi \sim |T - T_c|^\beta \text{ (order parameter)}, \quad \chi \sim |T - T_c|^{-\gamma} \text{ (susceptibility)}$$
$$C \sim |T - T_c|^{-\alpha} \text{ (heat capacity)}, \quad \xi \sim |T - T_c|^{-\nu} \text{ (correlation length)}, \quad \phi \sim h^{1/\delta}$$

(the order parameter as the critical field $h \to 0$ at $T = T_c$)

**Landau theory** (the general framework of mean field) expands the free energy in a power series in the order parameter:

$$f(\phi, T) = f_0 + a(T - T_c)\phi^2 + b\phi^4 - h\phi$$

The sign of the $\phi^2$ term flips at $T = T_c$, and stability requires $b > 0$. Minimizing $\partial f/\partial \phi = 0$:
- $T > T_c$, $h = 0$: $\phi = 0$ (symmetric phase).
- $T < T_c$, $h = 0$: $\phi = \pm\sqrt{a(T_c - T)/2b}$ → $\phi \sim (T_c - T)^{1/2}$.

The mean-field critical exponents are therefore:

$$\boxed{\beta = 1/2, \quad \gamma = 1, \quad \delta = 3, \quad \alpha = 0(\text{discontinuity}), \quad \nu = 1/2}$$

**The decisive limitation of mean field**: these exponents are always the same regardless of dimension $d$ or order-parameter type. In real systems, however, the critical exponents depend strongly on dimensionality and symmetry — direct evidence that mean field "cannot be right."

The condition under which mean field becomes accurate is above the **upper critical dimension** $d_u = 4$. That is, for $d \ge 4$ the mean-field exponents are correct; for $d < 4$ fluctuations essentially modify the critical behavior.

## 5. Ising universality and the truth about critical exponents

The deepest result of lattice models is **universality**. The critical exponents are independent of microscopic details (the precise values of coupling constants, the lattice type, etc.) and depend only on (1) the dimensionality and (2) the symmetry of the order parameter. All models that share the same (dimension, symmetry) combination have the same critical exponents — this is a universality class.

Accurate critical exponents of the 3D Ising universality class (refined numerics + conformal bootstrap):

| Exponent | Mean-field | 2D Ising (exact) | 3D Ising (numerical) |
|------|---|---|---|
| $\beta$ | 1/2 | 1/8 | $\approx 0.326$ |
| $\gamma$ | 1 | 7/4 | $\approx 1.237$ |
| $\delta$ | 3 | 15 | $\approx 4.79$ |
| $\nu$ | 1/2 | 1 | $\approx 0.630$ |
| $\alpha$ | 0 | 0 (log) | $\approx 0.110$ |

The gap between mean field and the actual values is by no means small; it is especially extreme in 2D. The practical significance of universality is decisive — the liquid-gas critical point, the ferromagnet-paramagnet critical point, and the order-disorder critical point of alloys all share the same 3D Ising universality and therefore have the same critical exponents.

Significance of universality for batteries: the two-phase coexistence in LFP is a first-order transition, but at the critical point it becomes second-order, and that critical point has been observed experimentally near ~470 K (Delacourt et al., 2005). Near the critical point, LFP belongs to the 3D Ising universality class.

## 6. First-order phase transitions in batteries: the case of LFP

LFP is the textbook example of a first-order phase transition, but it is also where a simple mean-field picture fails to fit quantitatively. The miscibility-gap width and its temperature dependence predicted by mean field disagree with experiment, for three reasons.

**Lattice-mismatch stress (coherency strain)**. The lattice constants of the two phases differ by ~5%, so when the two phases coexist, elastic strain energy accumulates inside the particle. This energy adds to the free-energy difference between the two phases and narrows the effective miscibility gap; the smaller the particle, the larger the quantitative effect together with the surface energy.

**Particle-size effect**. In LFP particles below ~30 nm, the plateau effectively disappears and behavior characteristic of a single solid solution has been reported (Meethong et al., 2007). This results from surface-energy plus strain effects becoming the same order of magnitude as the free-energy difference between the two phases, tilting thermodynamic stability toward a single phase.

**Mosaic particle model**. In the mosaic picture proposed by Dreyer et al. (2010), the countless particles in an LFP cell do not all split into two phases at once; rather, each particle is in only one phase at a time, and the fraction of single-phase versus two-phase particles changes with SOC. This picture accurately explains the path-dependent OCV (hysteresis, [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)) of LFP.

In summary, the LFP plateau is a simple first-order phase transition, but at the actual particle level it is a multiscale phenomenon coupling surfaces, stress, and inter-particle statistics. To predict the precise shape and SOC dependence of the OCV plateau from first principles, one therefore has to extend the CE + MC of [`./03_lattice_models.md`](./03_lattice_models.md) to a phase-field model that also includes stress effects.

## References

- Goldenfeld, N. *Lectures on Phase Transitions and the Renormalization Group* (Addison-Wesley, 1992) — standard introduction to critical phenomena, universality, and RG.
- Stanley, H. E. *Introduction to Phase Transitions and Critical Phenomena* (Oxford, 1971) — classic textbook; universality and critical exponents.
- Delacourt, C. et al. *Nature Materials* 4 (2005) 254–260 — observation of the LiFePO₄ critical point.
- Meethong, N. et al. *Electrochemical and Solid-State Letters* 10 (2007) A134–A138 — shrinkage of the miscibility gap with LFP particle size.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448–453 — LFP mosaic particle model and the thermodynamic origin of hysteresis.
- El-Showk, S. et al. *Journal of Statistical Physics* 157 (2014) 869–914 — precise determination of 3D Ising critical exponents by conformal bootstrap.
