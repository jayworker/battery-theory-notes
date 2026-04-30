# Electrochemical Thermodynamics

## 1. Overview

Electrochemical thermodynamics answers the question, "What voltage can this cell produce in principle, and how does that voltage shift with concentration, composition, and pH?" Whereas kinetics deals with "how fast," thermodynamics sets "where the system has to go." That is, both the open-circuit voltage (OCV) and the equilibrium potential are determined by thermodynamics, and polarization and overpotential are defined as deviations from them.

Thermodynamics shows up in four standard places in battery research: ① estimating the theoretical voltage of a new material, ② interpreting the OCV change with SOC, ③ judging corrosion / passivation regions (Pourbaix), and ④ correcting for activity when concentrations are non-ideal. This section organizes the resulting equations and assumptions for these four areas.

## 2. Gibbs free energy and cell voltage

The electrical work of an electrochemical cell equals the negative of the change in Gibbs free energy. This is because the work done when a charge $nF$ (per mole) is reversibly moved against a potential difference $E$ is exactly equal to $\Delta G$.

This is not a mere definition; it is a direct consequence of the general thermodynamic principle that the maximum non-PV work in a constant-pressure, constant-temperature reversible process equals $\Delta G$. In other words, the equation "cell voltage × charge moved = reversible work = $-\Delta G$" is the heart of the matter, and every electrochemical equilibrium relation is derived from it.

$$\Delta G = -nFE$$

Here $n$ is the number of electrons moved per reaction, $F = 96{,}485 \text{ C/mol}$ (Faraday constant), and $E$ is the cell voltage (EMF, electromotive force). The sign convention is fixed so that "spontaneous cell reaction → $\Delta G < 0$ → $E > 0$."

In the standard state, $\Delta G^\circ = -nFE^\circ$ and $E^\circ$ is the cell's standard voltage. The standard state is defined by activity 1 for every species, 1 atm for gases, 1 M for solutes, and pure solid/liquid.

If the reaction is split into oxidation and reduction half-reactions, the overall cell voltage is assembled from the difference of the two standard reduction potentials. The convention is to write the two half-cells in IUPAC notation and then subtract the left (oxidation, anode) from the right (reduction, cathode).

$$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$$

Because $\Delta G$ is a state function, you can simply add the $\Delta G^\circ$ values of the two half-reactions and divide by $-nF$. However, if the two half-reactions have different $n$, you cannot add the potentials directly; you must convert to free-energy units first and then sum. Ignoring this immediately produces sign and magnitude errors in multi-electron reactions (e.g., combining the 4-electron and 2-electron reduction of O₂).

The entropy term should be examined as well: since $\Delta G = \Delta H - T\Delta S$, measuring $\partial E/\partial T$ amounts to measuring $\Delta S$, which is the principle behind battery reversible-heat measurement — see [`./../06_battery_operation/05_thermal.md`](../06_battery_operation/05_thermal.md) for the detailed application.

## 3. The Nernst equation

When the system is not in the standard state (i.e., concentrations / activities differ from 1), the equilibrium potential deviates from the standard potential. The Nernst equation quantifies this deviation, and it follows from applying the activity dependence of the chemical potential to the cell reaction.

Intuitively, with more oxidized species and fewer reduced species the reduction driving force grows and the potential rises. Starting from the definition of chemical potential:

$$\mu_i = \mu_i^\circ + RT \ln a_i$$

Each term: $\mu_i^\circ$ = standard chemical potential, $a_i$ = activity. Expanding the cell reaction's $\Delta G = \sum \nu_i \mu_i$ in terms of activities and equating with $-nFE$ yields the Nernst equation.

$$E = E^\circ - \frac{RT}{nF} \ln Q$$

Each term: $E^\circ$ = standard reduction potential, $R = 8.314 \text{ J/mol·K}$, $T$ = absolute temperature, $n$ = number of electrons, $Q = \prod a_i^{\nu_i}$ = reaction quotient (activity ratio of oxidized over reduced species). At 25 °C, $RT/F = 25.69 \text{ mV}$, $RT \ln 10 / F = 59.16 \text{ mV/decade}$, and $F/RT \approx 38.92 \text{ V}^{-1}$.

These numbers reappear in nearly every electrochemical equation, including EIS and Butler–Volmer. For a multi-electron reaction the slope shrinks by $n$ — for example, a 2-electron reaction gives 29.6 mV/decade.

In a battery context, the Li occupancy $x$ of the active material enters the activity directly, so the OCV(SOC) curve is literally a graph of the Nernst equation. In a single solid-solution region $a_\text{Li}(x)$ is continuous and the OCV traces a slope; in a two-phase coexistence region the chemical potential is constant and a plateau appears.

The shape of the charge–discharge curve therefore shares precisely the same origin discussed in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md). Put differently, the V–Q curve is a direct measurement of the Nernst equilibrium of the active material as a function of SOC.

## 4. Standard electrode potentials and the SHE reference

A potential is not an absolute value but a difference relative to some reference electrode. An absolute potential could in principle be defined relative to the vacuum level or a free electron, but that is not a measurable quantity, so in practice we always use relative values.

The IUPAC standard is the **standard hydrogen electrode (SHE)** — the 1 atm H₂ / 1 M H⁺ / Pt system, defined as $E^\circ_\text{SHE} \equiv 0 \text{ V}$. Every standard reduction-potential $E^\circ$ table uses this reference.

In batteries, **Li/Li⁺** is the de facto working reference, with $E^\circ(\text{Li}^+/\text{Li}) = -3.04 \text{ V vs SHE}$. So the "vs Li/Li⁺" axis and the "vs SHE" axis are simply shifted by +3.04 V relative to each other.

Other commonly used references: Ag/AgCl (+0.197 V vs SHE), saturated calomel electrode (SCE, +0.241 V vs SHE), Hg/HgO (alkaline). For non-aqueous measurements the IUPAC-recommended internal reference is the ferrocene (Fc/Fc⁺) couple, which allows comparison across solvents after correction.

Standard-potential tables let you immediately estimate a cell's theoretical voltage. Example: the equilibrium for Li deintercalation from LiCoO₂ (Li₀.₅CoO₂ + 0.5 Li⁺ + 0.5 e⁻ → LiCoO₂) sits around +3.9 V vs Li/Li⁺, while graphite lithiation is ~0.1 V vs Li/Li⁺, so the full-cell OCV is quickly estimated as ≈ 3.8 V.

Note, however, that table values use a 1 M aqueous standard, so for non-aqueous batteries they are not exact and serve only as a qualitative comparison. Accurate non-aqueous values are obtained from first-principles DFT (insertion-energy-based voltage prediction) or by direct measurement.

## 5. Activity and activity coefficients

In an ideal solution, the activity $a_i$ equals the concentration (or mole fraction), but ions are almost always non-ideal because of long-range Coulomb interactions. So the Nernst equation only holds accurately when concentration is replaced by activity, which is concentration multiplied by a correction factor $\gamma$. Intuitively, the higher the ionic concentration, the more the surrounding counter-ion cloud (the ionic atmosphere) lowers free energy, so the "effective concentration" is lower than the nominal concentration.

$$a_i = \gamma_i \frac{m_i}{m^\circ}, \qquad \mu_i = \mu_i^\circ + RT \ln a_i$$

Here $\gamma_i$ = activity coefficient (dimensionless), $m_i$ = molality, $m^\circ = 1 \text{ mol/kg}$ reference. Since cation and anion activities cannot be measured separately, one uses the mean ionic activity $a_\pm$ and the mean activity coefficient $\gamma_\pm$. For a 1–1 electrolyte, $a_\pm = \gamma_\pm m / m^\circ$.

In the dilute regime, the Debye–Hückel equation gives $\gamma_\pm$ as a function of ionic strength.

$$\log \gamma_\pm = -A |z_+ z_-| \sqrt{I}, \qquad I = \frac{1}{2}\sum c_i z_i^2$$

Each term: $A \approx 0.509$ kg^(1/2)/mol^(1/2) (25 °C aqueous), $I$ = ionic strength (mol/kg). This expression is valid below 0.01 M ($I < 10^{-2}$ mol/kg); for higher concentrations one uses the Davies or extended Debye–Hückel equation.

In concentrated electrolytes (e.g., 1 M LiPF₆ in EC/DMC or LiTFSI solutions) Debye–Hückel breaks down, so activity correction based on the Pitzer model or molecular dynamics (MD) is required. The fact that battery electrolytes are nearly always concentrated above 1 M is the perennial caveat attached to a naive Nernst application.

In addition, in ultra-concentrated electrolytes such as the localized high-concentration electrolyte (LHCE) or water-in-salt electrolyte (WiSE), the activities deviate substantially, and this very non-ideality is what enhances anode stability (it pushes SEI chemistry toward anion decomposition).

## 6. Pourbaix diagrams

A Pourbaix diagram is a map with pH on the horizontal axis and electrode potential (usually vs SHE) on the vertical axis, with regions indicating which species (ion / oxide / hydroxide / metal) of a given element is most stable.

Intuitively, "raising the voltage shifts the stable region toward oxidation; raising the pH shifts it toward hydrolysis / hydroxides." Although Pourbaix diagrams originated in corrosion research, they are also used as a first-pass screening tool in aqueous-battery and electrocatalyst research.

Each boundary line in the diagram is the Nernst equation for the equilibrium between two species rewritten as a straight line. In a generalized form:

$$E = E^\circ - \frac{2.303 \, RT}{nF} \log\!\left(\frac{[\text{Red}]}{[\text{Ox}]}\right) - \frac{2.303 \, m \, RT}{nF} \, \text{pH}$$

Each term: $n$ = number of electrons, $m$ = number of H⁺ ions; the last term sets the slope of the diagonal line. Equilibria involving electrons only are horizontal (depend on $E$ only), equilibria involving H⁺ only are vertical (depend on pH only), and equilibria involving both give a negative-sloped diagonal (typically −59 mV/pH × $m/n$ at 25 °C).

The water-stability limits are also drawn ($O_2/H_2O$ on top, $H_2O/H_2$ on the bottom), and the strip between them is the water-stability window. Its width is only 1.23 V, which strongly limits the operating voltage of aqueous batteries.

Three regions are read off. The **corrosion** region is where the metal dissolves as ions; the **passivation** region is where an oxide / hydroxide film covers the surface and prevents further corrosion; the **immunity** region is where the metal itself is most stable. Example: the Mn Pourbaix diagram immediately reveals the risk of Mn²⁺ dissolution from LiMn-based cathodes in acidic environments, and the locally acidic environment created by HF byproducts is the thermodynamic origin of accelerated Mn dissolution.

The downside is equally clear: Pourbaix only deals with pure thermodynamic stability and ignores kinetics (passive-film formation rate, nucleation barriers). In practice, real passive films are usually far more protective than Pourbaix predicts — Al and Ti are classic examples, and the reason an Al current collector survives above 4 V in non-aqueous electrolytes is precisely this kinetic passivation (an LiF-based surface layer).

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Chapter 2: thermodynamics and the Nernst equation.
- Atkins, P., de Paula, J. *Physical Chemistry* (11th ed., Oxford, 2018) — standard treatment of chemical potential and activity.
- Pourbaix, M. *Atlas of Electrochemical Equilibria in Aqueous Solutions* (NACE, 1974) — original paper for Pourbaix diagrams.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — activity treatment for concentrated electrolytes.
- Robinson, R. A., Stokes, R. H. *Electrolyte Solutions* (Dover, 2002) — activity-coefficient measurement and the Debye–Hückel limiting law.
