# Mass Transport

## 1. Overview

No matter how fast the electrode reaction is, current is throttled at the interface if the reactant species is not delivered there in sufficient quantity. This is the origin of concentration polarization, and it governs the high-current and long-time behavior of every electrochemical system. This section organizes the three mechanisms that transport species to the interface — diffusion, migration, and convection — and collects the key result equations frequently used in batteries and electrocatalysis.

Which mechanism dominates depends on the system. Stagnant electrolyte + a small cell ⇒ diffusion-dominated. A dilute system lacking supporting electrolyte ⇒ migration also matters. Rotating-electrode or forced-flow systems ⇒ convection-dominated. Batteries are usually a mixture of the first two cases, plus solid-state diffusion inside the active-material particles.

## 2. Fick's first and second laws

Diffusion is the most basic mechanism by which a concentration gradient produces a flux; intuitively, "molecules move from regions of high concentration to regions of low concentration." The proportionality constant of this flow is the diffusion coefficient $D$, with units of m²/s or cm²/s.

Fick's first law connects the steady-state flux directly to the concentration gradient.

$$J = -D \nabla c$$

Each term: $J$ = molar flux density (mol/m²·s), $D$ = diffusion coefficient, $c$ = concentration, $\nabla c$ = concentration gradient. The minus sign means the flow goes from high to low concentration. This expression is used directly when the system has reached, or can be approximated by, a steady state.

To describe how concentration evolves in time, mass conservation (continuity) must be combined with the first law. The result is Fick's second law.

$$\frac{\partial c}{\partial t} = D \nabla^2 c$$

Given initial and boundary conditions, this PDE leads to analytical solutions for almost every diffusion problem (semi-infinite, finite, spherical, planar). The step response in a 1D semi-infinite planar region is the Cottrell solution; a finite-length region gives finite Warburg; a spherical particle gives Newman's active-material model — all variations of the same PDE.

When $D$ depends on concentration, the diffusion equation becomes nonlinear, which is common in battery active materials (e.g., $D(x)$ varies by more than an order of magnitude across graphite's stage transitions). In that case there is no analytical solution and one resorts to numerical methods (FEM, FDM).

Strictly speaking, the chemical-potential gradient is the fundamental driving force, so $J = -L \nabla\mu$ ($L$ = Onsager coefficient) is the more general form. For an ideal solution where $\mu = \mu^\circ + RT\ln c$, $\nabla\mu = (RT/c)\nabla c$, and Fick's first law is recovered. For non-ideal systems an activity correction is needed — this is decisively important in concentrated-electrolyte treatments.

## 3. The Nernst–Planck equation

Ions respond not only to concentration gradients but also to electric fields. The Nernst–Planck flux adds a migration term driven by the potential gradient to the diffusion term driven by the concentration gradient. Intuitively, "concentration pushes, the field pulls"; the Einstein relation $u_i = D_i / RT$ (mobility–diffusivity) ties the two terms together naturally.

$$J_i = -D_i \nabla c_i - \frac{z_i F}{RT} D_i c_i \nabla \phi + c_i \mathbf{v}$$

Each term: first = diffusion, second = migration ($z_i$ = ion charge number, $\phi$ = potential), third = convection ($\mathbf{v}$ = fluid velocity). When supporting electrolyte is plentiful, the migration term for the working ion becomes small and only diffusion remains — that is why measurement cells are deliberately filled with concentrated KCl or LiClO₄ as supporting electrolyte.

In battery electrolytes the working ion itself is at high concentration, so migration cannot be ignored. The key quantity here is the transference number $t_+$, the fraction of the total current carried by the cation.

$$t_+ = \frac{|z_+| u_+ c_+}{|z_+| u_+ c_+ + |z_-| u_- c_-}$$

Each term: $u_i$ = mobility, $c_i$ = concentration, $z_i$ = charge number. For a typical LiPF₆/EC-DMC electrolyte, $t_+$ is around 0.2–0.4, meaning that 60–80% of the current is carried by the anion (PF₆⁻). For a given current, then, Li⁺ concentration polarization develops rapidly.

The further $t_+$ is from 1, the faster concentration polarization develops; the appeal of single-ion-conducting polymers and solid electrolytes is in $t_+ \to 1$. The standard measurement is the Bruce–Vincent method, which extracts $t_+$ from the ratio of the steady-state current to the initial current following a constant-potential step.

## 4. Time-dependent diffusion — Cottrell

When a potential step is suddenly applied to a planar electrode so that the surface concentration drops to zero, the diffusion boundary layer thickens with time as $\sqrt{Dt}$ and the current decays accordingly.

Solving this problem exactly gives the Cottrell equation, which holds in the semi-infinite linear-diffusion regime — that is, where the boundary layer is much thinner than the electrode dimensions or particle size.

$$i(t) = nFAc \sqrt{\frac{D}{\pi t}}$$

Each term: $n$ = number of electrons, $F$ = Faraday constant, $A$ = electrode area, $c$ = bulk concentration, $D$ = diffusion coefficient, $t$ = time after the step. So $i \cdot \sqrt{t}$ is a time-independent constant, and the standard procedure is to extract $D$ from the slope of $i$ vs $1/\sqrt{t}$.

The applicability conditions are routinely overlooked, so they bear emphasizing: ① semi-infinite assumption — the diffusion-layer thickness $\delta \sim \sqrt{Dt}$ must be much smaller than the particle size $L$ ($t \ll L^2/D$); ② a step large enough that the surface concentration drops to zero immediately — for small steps BV kinetics enter and the equation breaks down; ③ a single-phase region — Cottrell does not apply on plateaus, where phase transition rather than diffusion is rate-limiting. The reliability of GITT analysis is always conditioned on the particle-size distribution, precisely because of condition ①.

## 5. The rotating disk electrode (RDE) and the Levich equation

When a steady state in which diffusion is time-independent is desired, forced convection is introduced. The standard tool is the rotating disk electrode (RDE): rotating the disk at constant angular velocity $\omega$ produces a uniform-thickness diffusion layer at the disk surface and a steady-state limiting current. Intuitively, faster rotation means a thinner diffusion layer, so a larger current can flow.

$$i_L = 0.62 \, n F A c D^{2/3} \nu^{-1/6} \omega^{1/2}$$

Each term: $i_L$ = limiting current, $n$ = number of electrons, $A$ = disk area, $c$ = bulk concentration, $D$ = diffusion coefficient, $\nu$ = kinematic viscosity (m²/s), $\omega$ = angular velocity (rad/s).

The hallmark feature of the Levich plot is that $i_L \propto \sqrt{\omega}$; if the plot is non-linear or the intercept is non-zero, this signals that kinetics or adsorption effects are simultaneously at play. The slope of the line gives $D$, and this is the standard method for measuring $D$ from a redox mediator (such as ferrocyanide) whose concentration is precisely known.

The Koutecký–Levich analysis decomposes the Levich expression by combining it with kinetics.

$$\frac{1}{i} = \frac{1}{i_K} + \frac{1}{i_L}$$

Each term: $i_K$ = kinetically limited current, $i_L$ = mass-transport-limited current. Extrapolating $1/\sqrt{\omega}$ to zero ($\omega \to \infty$) yields $i_K$, and from there $j_0$.

This is the standard procedure for ORR electrocatalyst evaluation. In the rotating ring–disk (RRDE) configuration the ring detects intermediates produced at the disk, which makes it possible to separate the 4 e⁻ vs 2 e⁻ ORR pathways. The RDE has no direct connection to real battery cells but is widely used to study the kinetics of electrolyte additives and SEI-formation reactions.

A common pitfall in applying the Cottrell equation: at the very beginning of the measurement (typically $t < 10$ ms), double-layer charging current mixes with the Faradaic current. Including such early data in a fit uncritically overestimates $D$.

## 6. Concentration polarization and the limiting current

When the electrode reaction is fast — that is, when the kinetics are fast enough that the surface concentration responds essentially immediately — the system's behavior is governed entirely by mass transport. Assuming a Nernst diffusion layer of fixed thickness $\delta$ in a stagnant electrolyte, the difference between the surface concentration $c_s$ and the bulk concentration $c$ produces the flux directly. The moment $c_s$ reaches zero, no further increase in current is possible and the limiting current $i_\text{lim}$ is reached.

$$i_\text{lim} = \frac{n F D A c}{\delta}$$

Here $\delta$ = Nernst diffusion-layer thickness. In a stagnant electrolyte $\delta$ grows in time as $\sqrt{Dt}$; in forced convection it is set by the fluid velocity and geometry (in the RDE, $\delta \propto \omega^{-1/2}$). The overpotential due to concentration polarization is obtained by replacing the activity ratio in the Nernst equation with the surface/bulk concentration ratio:

$$\eta_\text{conc} = \frac{RT}{nF} \ln\!\left(1 - \frac{i}{i_\text{lim}}\right)$$

As $i \to i_\text{lim}$, the logarithm diverges and the voltage collapses. Under a constant-current pulse, the moment when the surface concentration reaches zero is given by the Sand time.

$$\tau_s = \pi D \left(\frac{nFc}{2j}\right)^2$$

Each term: $\tau_s$ = Sand time (s), $j$ = applied current density. Holding the applied current beyond this point causes the voltage to drop sharply. This equation is the quantitative background for the high-rate scenarios in battery charge–discharge where cut-off voltage is suddenly reached, and the same equation appears in estimating the threshold current for dendrite formation on a Li-metal anode.

For the practical, time-scale-resolved decomposition of polarization, see [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md).

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Chapters 1, 9: mass transport and the RDE.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — Nernst–Planck and concentrated-electrolyte treatment, transference number.
- Levich, V. G. *Physicochemical Hydrodynamics* (Prentice-Hall, 1962) — original paper for the RDE / Levich equation.
- Crank, J. *The Mathematics of Diffusion* (2nd ed., Oxford, 1975) — collection of analytical solutions to the Fick equation.
- Cottrell, F. G. *Z. Phys. Chem.* 42 (1903) 385 — original paper for the Cottrell equation.
