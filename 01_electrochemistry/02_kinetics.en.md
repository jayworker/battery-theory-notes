# Electrode Reaction Kinetics

## 1. Overview

The equilibrium potential set by thermodynamics tells us only "where" a reaction wants to go, not "how fast" it gets there. When current actually flows in a cell, the voltage deviates from equilibrium; that deviation is the overpotential ($\eta$), and a finite current flows only once this overpotential has been "paid."

This section is organized around the standard model of activation polarization — the **Butler–Volmer equation** — and its two limits, the linear region and the Tafel region. Concentration polarization and ohmic polarization are covered in a separate section ([`./03_mass_transport.md`](./03_mass_transport.md)).

Two quantities are at the heart of electrode-reaction kinetics: the exchange current density $j_0$, which sets the magnitude of the bidirectional flow at equilibrium, and the transfer coefficient $\alpha$, which determines how the applied overpotential is distributed across the activation barrier. Knowing these two essentially fixes the shape of the polarization curve.

## 2. Activation energy and a brief view of transition-state theory

An electrode reaction is fundamentally a process of crossing an activation barrier. The frequency of passing through the transition state at the top of the barrier is the reaction rate, and the rate constant generally follows the Arrhenius form.

$$k = A \exp\!\left(-\frac{E_a}{RT}\right)$$

Each term: $A$ = pre-exponential factor (related to collision/vibration frequencies), $E_a$ = activation energy, $R$ = gas constant, $T$ = absolute temperature. The decisive point in electrochemistry is that **the electrode potential modulates the barrier height**. Pushing the potential in the oxidation direction lowers the oxidation barrier and raises the reduction barrier; this breaks the balance between the two directions and a net current flows.

The simplest linear quantification of this potential–barrier coupling is the Butler–Volmer equation. The more general non-adiabatic electron-transfer theory is Marcus theory, in which the reorganization energy $\lambda$ is the central variable.

$$k = A \exp\!\left(-\frac{(\Delta G + \lambda)^2}{4 \lambda k_B T}\right)$$

Here $\Delta G$ = the reaction's free-energy change (modulated by potential), $\lambda$ = reorganization energy of the solvent and internal coordinates, $k_B$ = Boltzmann constant. The most famous Marcus prediction is the "inverted region": once $|\Delta G| > \lambda$, increasing the driving force further actually slows the reaction. This was confirmed experimentally in photoinduced electron transfer. At battery electrodes one is usually close to the adiabatic limit, so Marcus serves as conceptual background and Butler–Volmer is the standard for practical analysis.

## 3. The Butler–Volmer equation

The Butler–Volmer equation directly connects electrode potential to net current density for a single-step electron-transfer reaction. Intuitively, the two exponential terms are the rates in the oxidation and reduction directions, and their difference is the measured net current. At the equilibrium potential the two terms cancel exactly and the net current is zero, but the dynamic equilibrium maintains bidirectional flow whose magnitude is $j_0$.

$$j = j_0 \left[ \exp\!\left(\frac{\alpha F \eta}{RT}\right) - \exp\!\left(-\frac{(1-\alpha) F \eta}{RT}\right) \right]$$

Each term: $j$ = net current density (oxidation-positive convention), $j_0$ = exchange current density (the bidirectional flow at equilibrium), $\eta = E - E_\text{eq}$ = activation overpotential, $\alpha$ = anodic transfer coefficient (typically 0.3–0.7; 0.5 if symmetric), $F/RT \approx 38.92 \text{ V}^{-1}$ at 25 °C. The $\alpha$ in the anodic term and the $(1-\alpha)$ in the cathodic term express how the activation barrier splits between the two directions. In a generalized form, the two transfer coefficients $\alpha_a$ and $\alpha_c$ are independent variables.

The derivation goes: ① write the rate constants in both directions in Eyring/Arrhenius form, ② assume the electrode potential enters the activation free energies of the two directions as $\alpha F E$ and $-(1-\alpha)FE$, and ③ impose equality of the two rates at equilibrium, then collect into $j_0$, which gives the equation above. Here we use the result only and leave the detailed derivation to the standard textbook (Bard–Faulkner).

As discussed earlier, BV is the central equation for activation polarization, and the equilibrium potential $E_\text{eq}$ is set by the Nernst equation in [`./01_thermodynamics.md`](./01_thermodynamics.md). In other words, BV describes "how the kinetics unfold around the equilibrium location set by Nernst."

## 4. Two limits — linear and Tafel

The Butler–Volmer equation reduces to very simple forms in two limits. At small overpotential ($|\eta| \lesssim RT/F \approx 26 \text{ mV}$), a first-order Taylor expansion of the two exponentials leaves only the linear term; at large overpotential, one of the terms is negligible and a single exponential — Tafel behavior — emerges.

Linear region (small $\eta$):

$$j \approx j_0 \frac{F \eta}{RT}, \qquad R_\text{ct} = \frac{RT}{nF j_0}$$

Here the cell behaves like an ohmic resistor whose resistance is the charge-transfer resistance $R_\text{ct}$. The diameter of the high-frequency semicircle in EIS corresponds exactly to $R_\text{ct}$.

Tafel region (large $|\eta|$):

$$\eta = a + b \log_{10} j, \qquad b = \frac{2.303 RT}{\alpha F}$$

Here $b$ is the Tafel slope (V/decade). At 25 °C, $\alpha = 0.5$ gives $b \approx 118 \text{ mV/dec}$ and $\alpha = 1$ gives $b \approx 59 \text{ mV/dec}$. So the slope of a Tafel plot ($\log|j|$ vs $\eta$) gives the transfer coefficient, and extrapolating the intercept gives $\log j_0$. The standard format for activity comparison in electrocatalysis is exactly this Tafel plot.

The boundary between the linear and Tafel regions is roughly $|\eta| \sim 50{-}100 \text{ mV}$; in the intermediate (non-linear, non-Tafel) region the full BV equation must be used.

To see a clean Tafel region experimentally, one must measure (i) before concentration polarization sets in and (ii) at currents large enough that one term is negligible. These two requirements always conflict, which is why Tafel analysis is standardly done in environments such as the RDE that boost $i_L$ via forced convection.

## 5. Exchange current density $j_0$

$j_0$ is the magnitude of the bidirectional flow at equilibrium and compresses the intrinsic rate of the electrode reaction into a single number. Intuitively, the larger $j_0$, the smaller the overpotential needed to draw the same current.

Basic definition:

$$j_0 = n F k^\circ (c_O)^{1-\alpha}(c_R)^\alpha$$

Each term: $k^\circ$ = standard rate constant (m/s), $c_O$, $c_R$ = surface concentrations of the oxidized and reduced species, $\alpha$ = transfer coefficient. $k^\circ$ is the intrinsic kinetic constant, while $j_0$ is the measurable quantity that already includes concentration dependence.

Measurements typically use either ① $R_\text{ct}$ from EIS at small overpotential, converted via $j_0 = RT/(nF R_\text{ct} A)$, or ② Tafel-plot extrapolation to read $\log j_0$ at the $\eta = 0$ intercept. If the two methods disagree, this signals that the single-step BV assumption has broken down.

Order-of-magnitude feel: HER (hydrogen evolution) gives $j_0 \sim 10^{-3} \text{ A/cm}^2$ on Pt versus $\sim 10^{-12} \text{ A/cm}^2$ on Hg — a 9-order range. Surface $j_0$ values on Li-ion cathodes (NMC, LFP) are typically in the $10^{-5}{-}10^{-3} \text{ A/cm}^2$ range. Lithiation through the SEI on a graphite anode shows a $j_0$ that drops by an order of magnitude or more after SEI formation.

$j_0$ has a strong temperature dependence captured by the Arrhenius equation.

$$j_0(T) = A \exp\!\left(-\frac{E_a}{RT}\right)$$

Activation energies $E_a$ are typically 0.3–0.6 eV, and a 10 K temperature drop commonly halves $j_0$. This is why activation polarization is the dominant cause of cold-cranking (low-temperature output) performance loss.

The standard battery formats for measuring $j_0$ are Bruce–Vincent or EIS-based $R_\text{ct}$ measurements; tracking SOC and cycle dependence together makes them useful for aging diagnostics. At low temperatures, $R_\text{ct}$ grows to the same order as the SEI resistance, so the two semicircles often overlap, and DRT analysis is useful for separating them.

## 6. Multi-step reactions and the RDS

Real electrode reactions are rarely clean single steps. Multi-electron reactions — 4 e⁻ ORR, 2 e⁻ HER, multi-step cathode redox, and so on — proceed through several elementary steps, and the slowest of these is the rate-determining step (RDS).

Under an RDS assumption, an equation of BV form still holds, but the apparent transfer coefficient $\alpha_\text{app}$ and the apparent number of electrons $n_\text{app}$ differ from their single-step values. Reading single-step information directly off these apparent values always introduces errors.

A general expression for multi-step reactions:

$$\alpha_\text{app} = \frac{n_b}{\nu} + r \beta$$

Here $n_b$ = electrons transferred before the RDS, $\nu$ = stoichiometric coefficient of the RDS, $r$ = electrons transferred in the RDS (typically 1), $\beta$ = symmetry factor (typically 0.5). This is the IUPAC-recommended form; experimentally, the value of the Tafel slope $b$ (e.g., 30, 40, 60, 120 mV/dec) is used to back out which step is rate-determining. For example, in ORR, 60 mV/dec implies a chemical step after the first electron transfer is rate-determining, and 120 mV/dec implies the first electron transfer itself is rate-determining.

For battery lithiation, the serial steps surface desolvation → SEI traversal → surface charge transfer → bulk diffusion all proceed simultaneously, and which one is rate-determining changes with SOC, temperature, and C-rate. Hence, fitting all the way through with a single BV equation is limited; instead, one usually decomposes the multiple semicircles + Warburg of EIS directly to read the time constant of each step. The practical side of polarization decomposition is treated in [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md).

Practical summary: when a single BV does not fit, a multi-layer diagnosis — (i) which of 30/40/60/120 mV/dec the Tafel slope is closest to, (ii) whether that value drifts as cycling progresses, and (iii) how many EIS semicircles separate — diagnoses RDS switching. This kind of multi-pronged check always takes precedence over single-equation fitting.

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Chapter 3: electrode reaction kinetics and Butler–Volmer.
- Bockris, J. O'M., Reddy, A. K. N. *Modern Electrochemistry* Vol. 2A (Kluwer, 2000) — integrated treatment of Tafel/BV.
- Marcus, R. A. *J. Chem. Phys.* 24 (1956) 966 — original paper on Marcus electron-transfer theory.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — quantitative treatment of multi-step reactions and the RDS.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — practical Tafel analysis.
