# Thermal Phenomena in Batteries

## 1. Overview

A battery always generates heat during charge-discharge. The heat sources are not single but split into two categories: reversible (entropy change) and irreversible (resistive losses, overpotential). Being able to quantitatively separate the two components is necessary for consistently predicting cell-design efficiency, lifetime, and above all **safety (thermal runaway)**.

Because operating temperature governs almost every kinetic parameter of the cell ($D$, $j_0$, $\sigma_\text{ion}$, etc.) through Arrhenius behavior, thermal management affects performance and lifetime simultaneously.

## 2. Reversible heat

When the entropy varies with SOC, charge/discharge becomes endothermic or exothermic. This is not a loss but **thermodynamically reversible** heat absorption/release; the heat absorbed during charging is released exactly in the same amount during discharging (or vice versa). Intuitively, going in the direction of $\Delta S > 0$ is endothermic, and $\Delta S < 0$ is exothermic.

> **Related concept: Gibbs free energy and the temperature dependence of OCV**
> The free energy of a cell reaction and the equilibrium potential are directly tied via $\Delta G = -nFE$. The temperature derivative of the free energy is the entropy ($\Delta S = -\partial\Delta G/\partial T$), so combining the two gives the temperature derivative of the OCV directly as the reaction entropy: $\Delta S = nF(dE_{OCV}/dT)$.
> Measurement: equilibrate the cell at a fixed SOC, then step the temperature and record the OCV. The slope $dE_{OCV}/dT$ is typically 0.05–0.5 mV/K, with a sign that depends on SOC and material composition (charging can flip between endothermic and exothermic across SOC intervals).
> Meaning: inflection points in the entropy profile correspond one-to-one with phase / ordering transitions, so entropy profiling delivers not only thermal (reversible heat) information but also a non-destructive diagnostic of crystallographic events.

The reversible heat-generation rate is given by:

$$q_\text{rev} = T \, \Delta S \cdot \frac{I}{nF} = I \, T \, \frac{dE_\text{OCV}}{dT}$$

Here $I$ is the current, $T$ the absolute temperature, and $dE_\text{OCV}/dT$ the entropy coefficient (μV/K to mV/K). The standard measurement is a potentiometric method: equilibrate the cell sufficiently, then measure OCV at different temperatures and extract the slope.

## 3. Irreversible heat

Irreversible heat is purely loss. It combines Joule heating from the ohmic resistance, losses from charge-transfer / mass-transport overpotentials, and mixing heat released during concentration relaxation. Intuitively, the gap between the equilibrium OCV and the actual operating voltage is the measure of irreversible loss.

$$q_\text{irr} = I(E_\text{OCV} - V) = I \cdot \eta_\text{total}$$

Detailed decomposition:
- **Ohmic heat**: $q_\Omega = I^2 R_s$. Always exothermic, independent of the sign of $I$.
- **Activation polarization heat**: $q_\text{ct} = I \eta_\text{ct}$.
- **Concentration polarization heat**: $q_\text{conc} = I \eta_\text{conc}$.
- **Mixing heat**: additional heat released as concentration gradients flatten during rest.

The standard heat-generation equation combining the two is the **Bernardi equation**:

$$q = I(E_\text{OCV} - V) + I T \frac{dE_\text{OCV}}{dT}$$

The first term is irreversible, the second is the reversible component. During charging (with the sign convention $I < 0$), the sign of the second term flips, so depending on the SOC region the reaction is endothermic or exothermic.

## 4. Entropy profiling

The SOC profile of $dE_\text{OCV}/dT$ is a **signature of phase / ordering transitions**. In flat plateau regions the free-energy balance between two phases keeps $dE/dT$ nearly constant, but at ordering transition points or phase-coexistence boundaries sharp peaks/dips appear. Hence the entropy profile carries crystallographic information.

| Step | Procedure |
|---------|------|
| 1. Adjust the cell precisely to a target SOC (CC + CV after CC) | |
| 2. Reach equilibrium with sufficient rest (typically several hours) | |
| 3. Step the chamber temperature (e.g., 25 → 15 → 35 °C, 1–2 h each) | |
| 4. Record the stabilized OCV at each temperature | |
| 5. Extract $dE/dT$ by linear regression | |

Graphite stage transitions, the H1↔H2 transition in NMC, and the two-phase boundary in LFP all show clearly as entropy peaks. If these peaks vanish with aging, it is a signal of loss of active-material crystallinity.

## 5. Thermal runaway

When the internal temperature exceeds a certain threshold, **a self-accelerating chain of exothermic reactions ensues, leading to cell catastrophe**. Intuitively, an exothermic reaction generates heat, that heat accelerates the activation of the next exothermic reaction, and a positive feedback loop runs away. By the ARC criterion, runaway begins when the heat-generation rate exceeds the heat-dissipation rate.

Three-stage model (Feng et al.):
1. **Onset**: SEI decomposition (~80–120 °C). The anode is exposed and starts reacting directly with the electrolyte.
2. **Acceleration**: separator melting (~130–160 °C), cathode crystal-phase collapse begins, electrolyte oxidation.
3. **Runaway**: lattice oxygen release at the cathode (~200 °C and above for NMC), electrolyte combustion, cell venting/ignition.

Key exothermic reactions:
- Cathode oxygen release: e.g., $\text{NMC}_x \to \text{NMC}_y + \text{O}_2$ form (exact stoichiometry is composition-dependent).
- Electrolyte combustion: $\text{O}_2 + \text{solvent} \to \text{CO}_2 + \text{H}_2\text{O}$, etc.
- TM reduction: reduced at the anode with additional heat release.

ARC (Accelerating Rate Calorimetry) measures the self-heating rate $dT/dt$ as a function of temperature and quantifies the onset temperature, T₂ (start of self-acceleration), and T₃ (runaway threshold). It is the standard method for cell safety-grade evaluation.

## 6. Thermal modeling fundamentals

The simplest cell-level thermal model is the lumped thermal model that concentrates all heat generation at a single temperature node.

$$m C_p \frac{dT}{dt} = q_\text{gen} - q_\text{diss}$$

$q_\text{gen}$ is the Bernardi equation, and $q_\text{diss} = h A (T - T_\infty)$ is the external cooling (natural / forced convection). Intuitively, when the heat-generation rate exceeds the heat-dissipation capability the temperature diverges.

For real large-format cells the lumped model is insufficient and a **3D thermal-electrochemical coupled model** is required. Key considerations:
- **Anisotropic thermal conductivity**: through-plane (adhesive layer direction) ~1 W/(m·K) vs in-plane (electrode sheet direction) ~20–30 W/(m·K). Differs by more than an order of magnitude.
- **Temperature uniformity**: a temperature gradient of more than 5 °C between the cell center and surface creates SOC non-uniformity and accelerates local degradation.
- **Cooling strategies**: side cooling vs tab cooling vs immersion cooling. Each, combined with anisotropy, gives different outcomes.

## References

- Bernardi, D., Pawlikowski, E., Newman, J. *Journal of The Electrochemical Society* 132 (1985) 5 — Bernardi general heat-generation equation.
- Thomas, K. E., Newman, J. *Journal of Power Sources* 119–121 (2003) 844–849 — reversible heat / entropy measurement.
- Feng, X. et al. *Energy Storage Materials* 10 (2018) 246–267 — comprehensive review of thermal-runaway mechanisms.
- Bandhauer, T. M. et al. *Journal of The Electrochemical Society* 158 (2011) R1 — review of thermal-management strategies.
