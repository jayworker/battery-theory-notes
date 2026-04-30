# Electrical Double Layer

## 1. Overview

The instant an electrode and an electrolyte make contact, positive and negative charges separate and accumulate in a very narrow region at the interface. This charge-separation structure is the **electrical double layer (EDL)**, and it is the stage on which essentially every fast electrochemical response (high-frequency impedance, capacitor charging, surface adsorption) plays out.

Because reacting species must traverse the double layer before charge transfer can occur, the structure of the double layer also directly influences the kinetics (the Frumkin correction). In other words, the BV equation's "surface concentration = bulk concentration" assumption is broken inside the double layer, and the actual concentration and potential at the OHP determine the kinetics.

Understanding of the double layer was refined progressively over more than a century. The flow runs from Helmholtz's parallel-plate model → the Gouy–Chapman diffuse-layer model → the Stern integrated model → the Bockris–Devanathan–Müller (BDM) adsorbed-water-molecule model.

Each step was introduced to fix a decisive limitation of the previous one. This section summarizes that flow and the key quantitative relations.

## 2. The Helmholtz model

The simplest model assumes that ions of opposite charge line up one molecule thick on the electrode surface. The picture is identical to a parallel-plate capacitor.

It is intuitively clean, but the decisive limitation is that, with thicknesses on the ångström scale, the predicted capacitance is a constant independent of potential. In real experiments, $C_\text{dl}$ commonly traces a V-shaped curve as a function of potential, and the Helmholtz picture cannot account for this dependence at all.

$$C_H = \frac{\varepsilon_0 \varepsilon_r}{d}$$

Each term: $C_H$ = Helmholtz capacitance per unit area (F/m²), $\varepsilon_0 = 8.854 \times 10^{-12} \text{ F/m}$, $\varepsilon_r$ = relative permittivity of the interfacial region (typically 6–30, lower than bulk water), $d$ = distance to the ion center ($\sim$0.3–0.5 nm). This expression gives an estimate of about 10–40 μF/cm², which matches the order of measured values but explains nothing of the potential or concentration dependence.

The Helmholtz model is absorbed into later models as a foundation (the ordered surface layer); standalone, it is essentially obsolete. Still, in the concentrated-electrolyte limit the Stern model effectively converges to the Helmholtz expression, so it is often cited as a qualitative picture.

## 3. The Gouy–Chapman model

Once one accepts that ions must follow a thermally fluctuating distribution, the double layer is no longer a single plane but a **diffuse layer** whose concentration decays exponentially with distance from the surface.

Combining the Boltzmann distribution ($n_i = n_i^\infty \exp(-z_i e\phi/k_B T)$) with the Poisson equation ($\nabla^2 \phi = -\rho/\varepsilon$) gives the nonlinear Poisson–Boltzmann equation; in the small-potential limit, linearization yields a solution where the potential decays from the surface as $\exp(-\kappa x)$. The decay length is the Debye length $\kappa^{-1}$.

$$\kappa^{-1} = \sqrt{\frac{\varepsilon_0 \varepsilon_r RT}{2 F^2 I}}$$

Each term: $I = \frac{1}{2}\sum c_i z_i^2$ = ionic strength (mol/m³), $\varepsilon_r$ = bulk relative permittivity, $T$ = absolute temperature. In aqueous solution at 25 °C, 1 mM ⇒ $\kappa^{-1} \approx 9.6 \text{ nm}$, 100 mM ⇒ $\sim$1 nm, 1 M ⇒ $\sim$0.3 nm. So the more concentrated the electrolyte, the thinner the double layer.

In the small-potential approximation, the diffuse-layer capacitance is

$$C_d = \varepsilon_0 \varepsilon_r \kappa = \frac{\varepsilon_0 \varepsilon_r}{\kappa^{-1}}$$

and depends on concentration and potential. The exact solution for large potentials has the form $C_d = \varepsilon_0\varepsilon_r\kappa\cosh(zF\phi_0/2RT)$, so the capacitance diverges as the surface potential grows. The Gouy–Chapman model alone predicts unrealistically large capacitances at high concentration or large potential, because it treats ions as point charges.

The Stern model in the next section corrects this defect.

## 4. The Stern model

Stern combined Helmholtz and Gouy–Chapman in series. The single layer closest to the electrode surface — where ions of finite size cannot approach more closely — is the Helmholtz region (or compact layer); outside it sits the Gouy–Chapman diffuse layer.

Because the two regional capacitances are in series, the smaller one dominates the total. The series-capacitor combination is:

$$\frac{1}{C_\text{dl}} = \frac{1}{C_H} + \frac{1}{C_d}$$

Each term: $C_\text{dl}$ = total double-layer capacitance measured, $C_H$ = compact-layer capacitance (almost potential-independent), $C_d$ = diffuse-layer capacitance (concentration- and potential-dependent).

In concentrated electrolytes or at large potentials, $C_d \gg C_H$, so $C_\text{dl} \approx C_H$ — i.e., the Helmholtz limit is recovered. In dilute electrolytes at small potentials, $C_d \ll C_H$, so $C_\text{dl} \approx C_d$ — the Gouy–Chapman limit appears. The Stern model thus contains both limits naturally.

Thanks to this series compensation, the Stern model was the first to reproduce qualitative features such as the V-shaped $C_\text{dl}$ curve as a function of concentration and potential (with a minimum near the PZC). Quantitatively, accuracy is still limited, so it acts as a stepping stone to the next level.

The decisive limitations of the Stern model are that (i) the dielectric constant inside the compact layer must be left as a free fitting parameter, and (ii) it cannot specify the role of the solvation shell beyond the size of the ion itself. These two limitations led to the BDM model.

## 5. BDM (Bockris–Devanathan–Müller)

The key insight of the 1960s BDM model is that, in aqueous solution, water molecules themselves are strong dipoles that adsorb in an oriented fashion on the electrode surface. So inside the compact layer there are again two planes.

The plane formed by the adsorbed water molecules and the plane of closest approach of partially desolvated ions are called, respectively, the **inner Helmholtz plane (IHP)** and the **outer Helmholtz plane (OHP)**.

Structurally: (1) IHP = adsorbed water dipoles + specifically adsorbed ions, (2) OHP = ions retaining their solvation shells, (3) outside that = the Gouy–Chapman diffuse layer. Ions that enter the IHP are influenced not only by electrostatic attraction but also by chemical bonding, hence the name "specifically adsorbed"; OHP ions are held by purely electrostatic attraction.

The quantitative BDM expression is just an extension of the Stern series form into two stages (IHP, OHP), but in this note the picture matters more than the equation: **the double layer is not a simple parallel plate, but a four-layer structure of oriented water + two ion planes + diffuse layer.** This picture is the starting point for qualitative understanding of the formation of the first molecular layer of the SEI (Solid Electrolyte Interphase).

When specific adsorption occurs, the PZC shifts and the position of the minimum on the double-layer capacitance curve moves. This is the well-known Esin–Markov effect, which is observed most clearly with halide ions (specific adsorption strength Cl⁻ < Br⁻ < I⁻).

Modern simulations (MD, AIMD) largely support the BDM picture and add the further fact that interfacial water molecules are highly dynamic and flip orientation as the potential changes. In non-aqueous battery electrolytes, strong dipolar molecules such as ethylene carbonate (EC) play the same role, and the reductive decomposition of this oriented EC layer is the first step of SEI formation.

## 6. PZC, ζ-potential, and surface-charge determinants

The most frequently invoked reference point in double-layer analysis is the **potential of zero charge (PZC)**. It is the electrode potential at which the surface charge is exactly zero; the double layer does not collapse but instead becomes a neutral state in which positive and negative ions are evenly distributed.

Intuitively, the PZC is the "electrostatic neutral point" of the electrode–electrolyte system, and adsorption, electrocatalytic activity, and wettability often display minima (or extrema) near the PZC.

Measurements typically use one of two methods. ① Measure $C_\text{dl}(E)$ in dilute electrolyte and identify the bottom of the V-shaped curve as the PZC (Gouy–Chapman minimum). ② Measure changes in surface tension or immersion potential.

The accepted standard PZC values are about 0.27 V vs SHE for Pt(111) and around −0.19 V vs SHE for Hg. Because the PZC depends on the crystal facet (Pt(100) and Pt(110) take different values), the distinction between single-crystal and polycrystalline surfaces matters; this dependence is the starting point that determines surface chemistry and electrocatalytic activity.

The **ζ-potential**, frequently used in colloid / particle science, is the potential at the slipping plane — the plane at which a particle begins to move under an external electric field. Although the ζ-potential and the PZC refer to different planes, both convey the sign and magnitude of the surface charge and serve as primary indicators of colloidal / active-material-slurry stability.

External factors that determine the surface charge: ① pH (the proton balance on oxide surfaces in aqueous solution), ② concentration and identity of the supporting electrolyte (specifically adsorbing ions — Cl⁻, I⁻, organic molecules — shift the PZC substantially), ③ applied potential.

In the battery context, ④ the chemical composition of the SEI/CEI thin film additionally governs the surface-charge distribution, and double-layer capacitance measurements are used as an indirect tool for diagnosing SEI thickness and density. After SEI formation, the measured $C_\text{dl}$ commonly drops by an order of magnitude because the SEI enters as an additional series capacitor.

The CPE (constant-phase element) that goes into the high-frequency semicircle of EIS is essentially a representation of a non-ideal $C_\text{dl}$ and quantifies the heterogeneity of the double layer — see [`./05_eis_fundamentals.md`](./05_eis_fundamentals.md) for detailed usage.

Another important application area is the supercapacitor. An EDLC (electric double-layer capacitor) stores energy purely through double-layer charging, so the product $C_\text{dl}$ × specific surface area sets the specific capacity. In activated carbons, a 1500–2500 m²/g surface area combined with a $C_\text{dl}$ of $\sim$10 μF/cm² gives a specific capacity of 100–300 F/g.

A practical note on extracting double-layer capacitance from EIS data: simply computing $1/(\omega Z'')$ easily yields incorrect values because of CPE behavior and series SEI capacitance. A reliable extraction of $C_\text{dl}$ follows the standard procedure of fitting an $R_s$ + ($R_\text{ct}$ ∥ CPE) model and then converting via the Brug equation; without this procedure, direct conversion of raw impedance is suitable only for first-order estimation.

## References

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Chapter 13: double-layer theory.
- Bockris, J. O'M., Devanathan, M. A. V., Müller, K. *Proc. R. Soc. London A* 274 (1963) 55 — original paper for BDM.
- Schmickler, W., Santos, E. *Interfacial Electrochemistry* (2nd ed., Springer, 2010) — modern double-layer theory.
- Trasatti, S., Lust, E. *Modern Aspects of Electrochemistry* 33 (1999) 1 — PZC measurements and tabulated values.
- Israelachvili, J. *Intermolecular and Surface Forces* (3rd ed., Academic, 2011) — Debye length and ζ-potential in colloidal context.
