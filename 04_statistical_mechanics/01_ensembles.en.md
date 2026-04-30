# Statistical Ensembles

## 1. Overview

Statistical mechanics asks how a system with tens of orders of magnitude of microscopic degrees of freedom can be cleanly described by just a few macroscopic variables ($T, V, P, N, \mu, \cdots$). The answer can be summarized in one line — **a macrostate is not a single microstate but a statistical ensemble of all microstates compatible with the macroscopic conditions, and every thermodynamic quantity we measure is an average over that ensemble**.

Intuitively, since 1 mol contains $10^{23}$ particles and we have no way of knowing which microscopic configuration is the actual one, we look only at the appropriately weighted sum of all microscopic configurations consistent with the macroscopic conditions. The convention that fixes these weights is the ensemble, and depending on which variables are "fixed" and which are "allowed to fluctuate," we obtain four types: microcanonical (NVE), canonical (NVT), grand canonical ($\mu$VT), and isothermal-isobaric (NPT).

In the battery context, ensemble choice is hardly a trivial decision. When Li enters a host lattice, the chemical potential $\mu_\text{Li}$ of the active material directly determines the OCV (open-circuit voltage), so the lattice gas model that handles site occupancy is naturally written in the language of the grand canonical ensemble. NPT, on the other hand, is essential when treating volume effects such as thermal expansion or lattice-mismatch stress.

## 2. Microcanonical ensemble (NVE)

This is the simplest ensemble and the starting point of statistical mechanics. It treats an isolated system in which the particle number $N$, the volume $V$, and the total energy $E$ are all exactly fixed. Since neither energy nor particles are exchanged with the surroundings, all admissible microstates lie on the same energy shell ($E \le H \le E + dE$).

A single assumption underlies the entire edifice of statistical mechanics here.

> **Equal a priori probability**: when an isolated system is in equilibrium, all microstates of equal energy are realized with equal probability.

Once we accept this principle, the probability of a macrostate is simply proportional to the number of microstates corresponding to it, $\Omega(E, V, N)$. The equation engraved on Boltzmann's tombstone is precisely the definition of this microcanonical ensemble:

$$S(E, V, N) = k_B \ln \Omega(E, V, N)$$

Symbols: $k_B = 1.381 \times 10^{-23}$ J/K (Boltzmann constant), $\Omega$ = number of microstates with energy $E$ (density of states). The fact that entropy is simply "the logarithm of the number of states" is the single bridge that connects statistical mechanics to thermodynamics, and every other ensemble formula is derived from it.

The usual thermodynamic variables are extracted from the entropy by differentiation:

$$\frac{1}{T} = \left(\frac{\partial S}{\partial E}\right)_{V,N}, \quad \frac{P}{T} = \left(\frac{\partial S}{\partial V}\right)_{E,N}, \quad -\frac{\mu}{T} = \left(\frac{\partial S}{\partial N}\right)_{E,V}$$

Intuitively, "how much the number of states grows when a bit more energy is supplied" is the inverse of temperature. The equilibrium conditions follow naturally — when two systems exchange energy, the condition that maximizes the total entropy is $T_1 = T_2$, and for particle exchange it is $\mu_1 = \mu_2$.

The weakness of the NVE ensemble is its experimental implausibility. A truly isolated system is almost impossible to construct, and every physical system we deal with exchanges energy and particles with its environment (a thermostat). For this reason, NVT is overwhelmingly used in practical calculations, while NVE is usually restricted to special purposes such as energy-conservation checks in molecular dynamics (MD) or microcanonical MC.

## 3. Canonical ensemble (NVT)

Now bring the system into contact with a large heat bath, fixing the temperature $T$. The particle number $N$ and volume $V$ remain fixed, but the total energy is no longer constant; the system minutely exchanges energy with the bath at every instant. That is, the probability $P_i$ that microstate $i$ of the system is realized depends on its energy $E_i$.

The key result is the **Boltzmann distribution**. Expanding the bath entropy $S_\text{bath} = k_B \ln \Omega_\text{bath}$ to first order in the system's energy ($1/T$ being the first derivative) immediately yields:

$$P_i = \frac{e^{-\beta E_i}}{Z}, \qquad Z = \sum_i e^{-\beta E_i}$$

Symbols: $\beta = 1/k_BT$ (inverse temperature), $Z$ = canonical partition function. The sum $\sum_i$ runs over all microstates; if a given energy is $g_i$-fold degenerate, this is rewritten as $Z = \sum_E g(E) e^{-\beta E}$. At 25 °C, $k_BT \approx 25.7$ meV, and the intuition that states with energy gaps much greater than this value are virtually unoccupied follows directly.

> **Related concept: relation between free energy and partition function**
> In the canonical ensemble, the Helmholtz free energy $A$ is given directly as the logarithm of the partition function:
> $$A(T, V, N) = -k_BT \ln Z$$
> The meaning is as follows. If $S = k_B \ln \Omega$ was the starting point of everything in the microcanonical ensemble, then in the canonical ensemble its place is taken by $A = -k_BT \ln Z$. Both equations have the form "sum over states → free energy"; the latter simply attaches a Boltzmann weight $e^{-\beta E_i}$ to each microstate in advance.
> Once $A$ is known, all thermodynamic quantities follow as derivatives: entropy $S = -(\partial A/\partial T)_{V,N}$, pressure $P = -(\partial A/\partial V)_{T,N}$, chemical potential $\mu = (\partial A/\partial N)_{T,V}$. Therefore, computing one partition function accurately puts all the equilibrium thermodynamic information of the system in your hands.

The mean energy and the energy fluctuations follow immediately:

$$\langle E\rangle = -\frac{\partial \ln Z}{\partial \beta}, \qquad \langle (\Delta E)^2\rangle = \frac{\partial^2 \ln Z}{\partial \beta^2} = k_BT^2 C_V$$

The second equation is **the simplest form of the fluctuation-dissipation theorem**: at equilibrium the magnitude of energy fluctuations sets the heat capacity. This perspective is extended to the Green-Kubo formulas in [`./05_transport_theory.md`](./05_transport_theory.md).

The reason the NVT ensemble has become the standard is clear. Experiments are normally carried out in a thermostat, and MD/MC simulations also realize NVT as their standard via thermostats (Nosé-Hoover, Langevin, etc.). Finite-temperature corrections in DFT are likewise, in essence, multiplying the canonical partition function by the vibrational degrees of freedom — see [`./02_partition_function.md`](./02_partition_function.md) for details.

## 4. Grand canonical ensemble ($\mu$VT)

Now allow the particle number to fluctuate as well. The system is in contact with a particle reservoir, so $N$ is no longer fixed; instead, the chemical potential $\mu$ is fixed. The volume and temperature remain as before. If microstate $i$ has particle number $N_i$ and energy $E_i$, its probability is

$$P_i = \frac{e^{-\beta(E_i - \mu N_i)}}{\Xi}, \qquad \Xi = \sum_i e^{-\beta(E_i - \mu N_i)} = \sum_N e^{\beta\mu N} Z(T, V, N)$$

Symbols: $\Xi$ (Xi) = grand partition function, $z = e^{\beta\mu}$ = fugacity. As the last form shows, the grand partition function is a fugacity-weighted sum of canonical partition functions. The corresponding thermodynamic potential is the grand potential $\Omega_G = -k_BT \ln \Xi = -PV$, and $S, P, \langle N\rangle$ are all extracted from $\Omega_G(T, V, \mu)$ by differentiation.

The power of the grand canonical ensemble in battery applications applies directly to **Li occupation of a host lattice**. Consider a simple lattice gas model with $M$ equivalent sites, each either empty or filled by Li (occupation energy $\epsilon$, Li chemical potential $\mu_\text{Li}$). Ignoring intersite interactions, the partition function for one site is the sum of two terms ($1 + e^{-\beta(\epsilon-\mu)}$), and since the sites are independent, the total is the product:

$$\Xi = \left(1 + e^{-\beta(\epsilon-\mu_\text{Li})}\right)^M$$

The mean occupancy $x = \langle N\rangle / M$ reduces to the following Fermi-Dirac form:

$$x(\mu_\text{Li}, T) = \frac{1}{1 + e^{\beta(\epsilon - \mu_\text{Li})}}$$

The implication is decisive — **the shape of the OCV curve is precisely the $\mu_\text{Li}(x)$ curve of the active material** ($eV_\text{OCV} = -\mu_\text{Li}$ + constant), and once site interactions are turned on, a first-order phase transition (plateau, [`./04_phase_transitions.md`](./04_phase_transitions.md)) emerges naturally. The statistical-mechanics foundation of the plateau/slope analysis seen in [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) lies right here.

Other major applications of the grand canonical ensemble include adsorption (BET isotherms), ion exchange, and ion distributions in the electric double layer (Poisson-Boltzmann), all natural settings in which the chemical potential is imposed externally.

## 5. Isothermal-isobaric ensemble (NPT)

Finally, also allow the volume to fluctuate. The system is subjected to an external pressure $P$ while its volume is free to adjust — exactly the situation of everyday experimental conditions (atmospheric pressure, thermostat). An integral over volume is added to the partition function, and the weight gains a factor $e^{-\beta PV}$:

$$\Delta(T, P, N) = \int_0^\infty dV\, e^{-\beta PV} Z(T, V, N)$$

The corresponding thermodynamic potential is the Gibbs free energy:

$$G(T, P, N) = -k_BT \ln \Delta$$

Entropy, volume, and chemical potential follow as derivatives: $S = -(\partial G/\partial T)_{P,N}$, $V = (\partial G/\partial P)_{T,N}$, $\mu = (\partial G/\partial N)_{T,P}$.

The NPT ensemble becomes important in battery modeling whenever **volume effects are essential**. First, simulating thermal expansion of the active material by definition cannot fix the volume. Second, the way the c-axis lattice constant of layered cathodes oscillates with SOC, and the stress field that arises when the two phases of LFP coexist (with $a$-axis/$c$-axis lattice mismatch ~5%), can only be handled with NPT or a more general stress-controlled ensemble. Third, the ~300% volume expansion of the Si anode requires NPT MD.

In condensed phases where the PV term is small, NVT and NPT give nearly identical results; nonetheless, if you want a systematically correct answer the principle is to use the ensemble matched to the experimental conditions.

## 6. Ensemble equivalence and selection criteria

Although the four ensembles handle different sets of variables, **in the thermodynamic limit ($N, V \to \infty$ with $N/V$ held fixed) they all give the same averages**. This is ensemble equivalence, a thermodynamic universality guaranteed in theory. The intuition is simple — in a macroscopic system the energy/particle/volume fluctuations shrink as $1/\sqrt{N}$ relative to the mean, so which variables are "fixed" and which are "allowed to fluctuate" has no effect on the averages.

However, the fluctuations do depend on the ensemble. In NVE the energy fluctuation is zero; in NVT it is finite at $k_BT^2 C_V$; in NPT volume fluctuations are added; in $\mu$VT particle-number fluctuations are added as well. Therefore, when extracting response functions (susceptibility, heat capacity, compressibility) directly from fluctuations, the ensemble choice determines the meaning of the result.

Practical guidelines:

| Situation | Recommended ensemble | Reason |
|------|------|------|
| MD energy-conservation check | NVE | Energy constant by definition |
| Standard finite-temperature equilibrium | NVT | Matches experimental thermostat conditions; simple to implement |
| Site occupancy, adsorption, OCV(SOC) | $\mu$VT | $\mu$ is the natural variable imposed externally |
| Thermal expansion, stress, volume change | NPT | Volume free to adjust |

Overall, it suffices to remember that the canonical ensemble is the most common, and that the grand canonical stands out for battery lattice gas problems. The next chapter, [`./02_partition_function.md`](./02_partition_function.md), explains in detail how to actually compute the partition function $Z$ and extract every thermodynamic quantity from it.

## References

- McQuarrie, D. A. *Statistical Mechanics* (University Science Books, 2000) — standard textbook on statistical mechanics; definitions and equivalence proofs of the four ensembles.
- Pathria, R. K., Beale, P. D. *Statistical Mechanics* (3rd ed., Academic Press, 2011) — consistent treatment of microcanonical, canonical, and grand canonical ensembles.
- Chandler, D. *Introduction to Modern Statistical Mechanics* (Oxford, 1987) — intuition-oriented introduction; fluctuation-response relations.
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — practical implementation of NVT/NPT/$\mu$VT MC/MD.
- Van der Ven, A., Ceder, G. *Electrochemical and Solid-State Letters* 3 (2000) 301–304 — calculation of Li intercalation free energies in the grand canonical ensemble.
