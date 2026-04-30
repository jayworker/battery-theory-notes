# Phase Diagrams and Phase Transitions

## 1. Overview

A phase diagram is a 2D or 3D map showing "which phase is most stable at a given composition, temperature, and pressure". The shape of the V–Q curve of a battery cathode — the length of the plateau, the steepness of the slope, the curvature near the endpoints — is in effect a direct measurement of the Li-composition–temperature phase diagram of the active material as a function of SOC.

The connection between the phase diagram and the V–Q curve is therefore not a mere analogy but an exact equivalence. Intuitively, the region in which two phases coexist is defined by the common tangent of the free-energy curves, and the slope of that tangent gives the voltage plateau. In a solid-solution region, the curvature of a single free-energy curve translates directly into the slope of the voltage curve.

This section covers (i) the Gibbs phase rule, (ii) free-energy curves and the common tangent, (iii) the direct correspondence between solid-solution vs two-phase regions and the V–Q curve, (iv) intercalation phase diagrams (graphite stages, LFP), and (v) CALPHAD and ab initio phase diagrams. This thread is the microscopic complement to the V–Q analysis in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) and the Nernst-equation discussion in [`./../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md).

## 2. Gibbs phase rule

In equilibrium the degrees of freedom of a system are determined by the number of components and the number of phases as

$$F = C - P + 2$$

with $F$ the degrees of freedom (the number of intensive variables that can be varied independently), $C$ the number of components (the number of chemically independent species), $P$ the number of phases, and the $+2$ accounting for the two intensive variables $T$ and $P$ (pressure). For analyses of condensed systems at constant pressure, this is often simplified to $F = C - P + 1$.

Intuition: the degrees of freedom are "the number of variables that can be moved independently at the same time". As more phases coexist, more constraints are needed to maintain equilibrium, and the degrees of freedom decrease.

A simple example for a battery cathode: in the binary Li–FePO₄ system ($C=2$) at fixed pressure, $F = 2 - P + 1 = 3 - P$ (with only $T$ as an additional variable). When two phases coexist (LFP + FP), $F = 1$ — only the temperature can be chosen freely; the compositions and chemical potentials of the two phases are then automatically fixed. Therefore the OCV (= the difference of chemical potentials) is also fixed, and this is the thermodynamic basis of the LFP plateau at $\sim 3.43$ V.

In a single-phase region under the same conditions, $F = 2$ — both temperature and composition are free. Changing the Li composition therefore changes the chemical potential, and the OCV traces a curve (slope). This is the thermodynamic identity of the slope region in layered LiCoO₂ and NMC.

## 3. Free-energy curves and the common tangent

In a binary system $A_{1-x}B_x$, when the Gibbs free energy of each phase is plotted as a function of the composition $x$, one usually draws one downward-convex curve per phase ($G_\alpha(x), G_\beta(x), \dots$).

For two phases to coexist in equilibrium, **a common tangent must be drawn between the two curves**. Intuitively, at the tangent points $(x_\alpha, x_\beta)$ the chemical potentials of each component are equal in both phases (the slope of the tangent = $\partial G/\partial x$ for a component = the chemical potential).

Mathematically:

$$\left.\frac{\partial G_\alpha}{\partial x}\right|_{x=x_\alpha} = \left.\frac{\partial G_\beta}{\partial x}\right|_{x=x_\beta}, \qquad \mu_A^\alpha = \mu_A^\beta, \quad \mu_B^\alpha = \mu_B^\beta$$

In the composition range $x_\alpha < x < x_\beta$, the two phases coexist and the average free energy follows the straight line (the common tangent) connecting the two tangent points, with the lever rule fixing the relative phase fractions. Because this straight line always lies below the single curve, phase separation is spontaneous.

The translation to batteries is direct. For a cathode of formula $A_{1-x}\text{Li}_x$Host, the OCV is related to the Li chemical potential by

$$E(x) = -\frac{1}{F} \frac{\partial G}{\partial x_\text{Li}}$$

(electrochemically, $-\Delta G/nF$). In the common-tangent region $\partial G/\partial x$ is constant → $E(x)$ is constant → **plateau**. In a single-phase region, $G(x)$ is curved → $\partial G/\partial x$ varies with $x$ → $E(x)$ traces a **slope**.

## 4. Solid solution vs two-phase: direct correspondence with the V–Q curve

This equivalence is the foundation of all V–Q curve analysis. To summarize:

| Free-energy form | Region name | V–Q curve shape | Representative example |
|------------------|-----------|----------------|------------|
| Curve convex downward | solid solution | slope (voltage varies with SOC) | most of LiCoO₂, layered NMC, $\text{Li}_x$TiS₂ |
| Common tangent of two curves | two-phase coexistence | plateau (voltage constant) | LiFePO₄ ↔ FePO₄ (~3.43 V), graphite stage 1↔2 |
| Convex upward region | spinodal (unstable) | not directly measurable, kinetic decomposition | parts of Li-rich layered, decomposition reactions |

The key insight is: **the exact voltage of a plateau in the V–Q curve = the slope of the common tangent**. The geometric structure created by the free energies of the two phases is exposed directly to measurement. Measuring the plateau voltage accurately therefore yields $\Delta G$ between the two phases, and this is the primary verification step when comparing first-principles voltage calculations with experiment.

The **length** of the plateau equals the difference $x_\beta - x_\alpha$ between the two tangent points and is therefore proportional to the width of the miscibility gap. The fact that LFP shows a plateau over almost the full range from 0 to 1 means that the miscibility gap between LFP and FP is very wide.

A further insight: when the particle size becomes very small, the surface-energy contribution enters the free energy of the two phases unequally and the miscibility gap can narrow or vanish. In nano-LFP (~30 nm) one indeed observes that the plateau tilts slightly and shortens because of this size effect, and this is modeled by Cahn–Larché-type theory in which the effective phase diagram depends on particle size even at the same chemical composition.

## 5. Intercalation phase diagrams

The phase diagrams most often encountered in batteries are of the **intercalation host + guest (Li)** type. Two representative examples are given below.

### 5.1 Graphite stages

When Li enters graphite, it is stacked between graphene layers in an ordered manner and aligns into discrete phases such as stage 1 (Li in every gallery), stage 2 (Li in every other gallery), stage 2L (low-density stage 2), stage 3, and stage 4. As the Li content increases, the system progresses through stage 4 → 3 → 2L → 2 → 1, and between transitions the V–Q curve shows a sequence of **short plateaus** in a step-like pattern.

Quantitatively, stage $n$ has the average composition $\text{LiC}_{6n}$, with stage 1 ($\text{LiC}_6$, 372 mAh/g) being the fully charged state. The equilibrium potentials of the stage transitions in a graphite/Li half-cell appear as plateaus very close to ~0.20 V, ~0.13 V, and ~0.09 V. Precise diagnosis of this staging behavior is used as the fingerprint for anode diagnostics in ICA/DVA ([`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)).

The microscopic origin of staging is the Li–Li interaction / ordering energy (the formation of domain walls in the Daumas–Hérold model), which generates an essentially **discrete free-energy surface** and gives birth to discrete phases.

### 5.2 LiFePO₄ Li-poor / Li-rich

The phase diagram of bulk LiFePO₄ is very simple. Across nearly the entire SOC, **Li-poor (FP, ≈ $\text{Li}_0\text{FePO}_4$)** and **Li-rich (LFP, ≈ $\text{Li}_1\text{FePO}_4$)** coexist, and the miscibility gap between them produces the plateau. The lattice volume difference between the two phases is ~6.5%.

The asymmetry of the phase diagram is well approximated by a regular-solution mean-field model:

$$G(x) = (1-x) G_\text{FP} + x G_\text{LFP} + R T [x \ln x + (1-x) \ln(1-x)] + \Omega x(1-x)$$

with $\Omega$ the regular-solution interaction parameter. When $\Omega > 2 R T$ the miscibility gap opens. For LFP $\Omega \sim 4$–$5 R T_\text{room}$, which is why a strong two-phase behavior is observed at room temperature.

A particularly interesting effect is the **size-dependent disappearance of the miscibility gap**. In nano-LFP below ~30 nm, the surface-tension contribution makes $\Omega_\text{eff}$ smaller and the miscibility gap shrinks, producing behavior closer to a single-phase solid solution (Wagemaker et al.). This is part of the reason for the high rate capability of nano-LFP.

In addition, at the single-particle level LFP exhibits a partial-two-phase / mosaic-like distribution, so that the macroscopic plateau appears slightly less well-defined than the thermodynamic-equilibrium plateau (Dreyer mosaic model).

## 6. Spinodal decomposition and nucleation–growth dynamics

The region where the free-energy curve is convex upward ($\partial^2 G/\partial x^2 < 0$) is the **spinodal** region, where every small composition fluctuation is spontaneously amplified — i.e., decomposition occurs immediately, with no nucleation barrier. Outside this region but still inside the metastable zone (the curve itself is convex but lies above the common tangent), there is a nucleation barrier and a new phase grows only after a critical-size nucleus forms.

Intuition: inside the spinodal everything is spontaneous and very fast; in the metastable zone the system is stalled until a nucleus forms, so the nucleation rate is dominant. The boundary between the two regions is the spinodal curve, which together with the common tangent defines the two curves of the phase-stability diagram.

This distinction is directly visible in battery cycling. In LFP, the nucleation barrier of a new phase during cycling is one cause of hysteresis, and the mosaic model explains hysteresis by particle-level discontinuous nucleation. This mechanism is the origin of the thermodynamic hysteresis discussed in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md).

Another important point: spinodal decomposition is very fast and can produce sharp lattice-stress inhomogeneities during cycling. This is one mode of microcracking and fragmentation of electrode particles and connects to mechanochemistry analysis.

## 7. CALPHAD and ab initio phase diagrams

Because mapping phase diagrams experimentally is time- and cost-intensive, two computational approaches have become standard.

**(a) CALPHAD (CALculation of PHAse Diagrams).** Each phase's Gibbs energy is parametrized as a polynomial in composition and temperature, and the parameters are fit to measured data (plateau voltages, calorimetry, solubilities, etc.) to reconstruct the free energy across the entire composition–temperature region. CALPHAD is strong for multicomponent and multiphase systems and is the industry-standard tool for alloy and ceramic phase diagrams.

**(b) Ab initio (DFT) + cluster expansion.** All possible Li orderings and defect configurations are evaluated via DFT 0 K total-energy calculations, the results are interpolated efficiently with a cluster expansion, and finite-$T$ free energies are then extracted by Monte Carlo. This route can directly predict Li ordering, phase stability, and OCV for LFP, NMC, spinels, and olivines. Systems with strong electronic correlation (Mott–Hubbard) require correction by DFT+U or DFT+DMFT. In the battery field this approach was standardized by the Ceder group and others.

The two methods are complementary, and a typical workflow obtains fine-grained free energies from ab initio calculations and extends them to multicomponent / practical regions via CALPHAD. The results feed directly into the carrier-concentration modeling discussed in [`./04_ionic_conduction.md`](./04_ionic_conduction.md) and the V–Q curve modeling in [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md).

Finally, the most practically useful information that a phase diagram provides is the **synthesis window** — under what $T$, composition, and atmosphere the desired phase is stable as a single phase. The cubic-vs-tetragonal stability of garnet LLZO, the onset temperature of layered ↔ rock-salt transformation, and the spinel ↔ rock-salt decomposition are all expressed as explicit regions on the phase diagram. This information is the starting point for synthesis, aging, and safety analysis.

## References

- Porter, D. A., Easterling, K. E. *Phase Transformations in Metals and Alloys* (3rd ed., CRC, 2009) — standard treatment of phase diagrams, free energy, and the common tangent.
- Saunders, N., Miodownik, A. P. *CALPHAD: Calculation of Phase Diagrams* (Pergamon, 1998) — CALPHAD methodology.
- Van der Ven, A. et al. *Chemical Reviews* 120 (2020) 6977 — comprehensive review of phase diagrams of battery cathodes and ab initio calculations.
- Dahn, J. R. *Physical Review B* 44 (1991) 9170 — phase diagram of graphite Li-intercalation stages.
- Wagemaker, M. et al. *Journal of the American Chemical Society* 129 (2007) 4323 — size-dependent miscibility gap in nano-LiFePO₄.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448 — LFP mosaic model and the thermodynamic origin of hysteresis.
- Aydinol, M. K. et al. *Physical Review B* 56 (1997) 1354 — DFT prediction of voltage in layered cathodes.
