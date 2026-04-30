# Anomalous Phenomena

## 1. Overview

If the chapters so far have covered "textbook behavior", this chapter collects phenomena that partially deviate from that textbook. **Anomalous phenomena are interesting because they are windows for understanding new physics/chemistry**. There are repeated cases in which behavior that initially looked like noise turned out, on closer examination, to point to a new mechanism (e.g., anionic redox).

The voltage fade, memory effect, anionic redox, and knee point treated here are all phenomena that (i) only occur in particular materials/conditions, (ii) whose mechanism is not immediately obvious upon observation, and (iii) which have large practical impact — making them phenomena with **simultaneously large research value and application value**.

## 2. Voltage Fade

Li-rich layered oxides (e.g., $\text{Li}_{1.2}\text{Mn}_{0.54}\text{Ni}_{0.13}\text{Co}_{0.13}\text{O}_2$) deliver very high capacity exceeding 250 mAh/g in the first cycle. However, with repeated cycling, **the capacity is essentially preserved while the average voltage drops gradually** — this is voltage fade. As a result, the energy density (= capacity × voltage) decreases each cycle, becoming a major barrier to commercialization.

The mechanism is **migration of cations within the lattice**. When lattice oxygen is partially released in the activation region above 4.5 V during the first cycle, TM cations (especially Mn, Ni) migrate to Li sites to fill the vacancies. As a result, a layered → spinel-like environment develops gradually, and because the redox potential of this environment is lower than in the layered structure, the average voltage is dragged down.

Suppression strategies are (i) surface coatings (Al₂O₃, ZrO₂) to block oxygen release, (ii) lattice doping (Mg, Ti) to raise the cation migration barrier, and (iii) cut-off voltage limits to avoid the oxygen-activation region. All have only partial effects, and a fundamental solution is still lacking.

## 3. Memory Effect

A well-known phenomenon in NiMH batteries: "partial charge-discharge history deforms the voltage curve of the next cycle." It was long thought to be absent in Li-ion, but **it has been clearly observed in LFP** (Sasaki, Ukyo, Novák, *Nature Materials* 2013).

The mechanism is related to LFP's **non-equilibrium phase separation in two-phase reactions**. There is history in the nucleation/growth of LFP ↔ FePO₄. A cell that stopped at 50% SOC and one that stopped at 70% SOC, when re-cycled to the same SOC, exhibit subtly different voltages. Intuitively, the previous history leaves the active-material particle distribution in metastable states, and in the next cycle that state appears as a tiny bump on the curve.

| Item | NiMH | LFP |
|------|------|-----|
| Voltage difference | tens of mV | a few mV |
| Mechanism | $\beta$/$\gamma$ phase change | two-phase nucleation history |
| Practical impact | large SOC-estimation error | minor SOC-estimation error |

One reason LFP SOC estimation is hard is the combination of (i) the intrinsically flat plateau, (ii) [hysteresis](./01_voltage_curves.md), and (iii) the memory effect. BMS algorithms must correct for all three.

## 4. Anionic Redox

In the conventional view, the redox of layered cathodes is carried out by **cations (TMs)**. Co³⁺/Co⁴⁺, Ni²⁺/³⁺/⁴⁺, Mn³⁺/Mn⁴⁺. However, in Li-rich layered systems and some sulfides/oxides, additional capacity continues to be delivered after cation oxidation has reached its limit, and it has been confirmed that **oxidation of lattice oxygen** ($\text{O}^{2-} \to \text{O}^{(2-n)-}$, or peroxo-like $\text{O}_2^{2-}$ species) provides the extra electrons.

The theoretical basis is the **unhybridized O 2p lone pair** model from the Ceder/Tarascon groups. In Li-rich, some oxygens have lone pairs not bonded to TMs, and these non-bonding electrons act as oxidizable redox centers. In normal layered structures all O 2p hybridize with TM 3d and are stable, but the more Li-O-Li configurations exist, the more lone pairs there are.

| Aspect | Cationic redox | Anionic redox |
|------|-------------|-------------|
| Potential | 3.5–4.4 V | 4.4–4.8 V |
| Capacity | clear ceiling | additional ~50–100 mAh/g |
| Reversibility | excellent | partially reversible (O₂ loss) |
| Side effects | few | voltage fade, O₂ release, [thermal runaway](./05_thermal.md) risk |

Experimental evidence combines O₂ detection by [DEMS](./07_operando.md), oxygen K-edge changes seen by [XAS](./07_operando.md), and direct observation of molecular O₂ by RIXS (resonant inelastic X-ray scattering).

## 5. Knee Point

In long-term cycle life curves (capacity vs cycle number), the curve initially decreases nearly linearly and slowly, then **at some point the slope steepens abruptly into accelerated decrease**; this transition is called the knee point. After this transition, the cell has effectively entered an irrecoverable aging stage.

Mechanism (Attia et al., *Nature* 2020):
- **Onset of lithium plating**: when the anode active material is reduced to LAM_NE, the same charging current corresponds to a higher effective C-rate on the remaining active material → anode polarization increases → anode potential drops below 0 V → Li plating begins.
- **Self-reinforcing feedback**: plated Li trapped in SEI accelerates LLI → cathode SOC window expands → cathode stress increases → LAM_PE accelerates → larger anode load → more plating.

Early-warning indicators:
- Change in the magnitude of $|dQ/dN|$ (acceleration of capacity loss per cycle).
- Sudden shifts in ICA peak positions.
- Non-linear increase in EIS resistance.
- Abnormal shape of voltage relaxation during rest after charging (signal of plated-Li re-intercalation).

Knee-point prediction is very important for BMS and 2nd-life applications (reuse of EV batteries in ESS). This is why machine-learning prediction models that forecast cycle life from early-cycle data alone are being actively researched.

## 6. Other interesting phenomena (brief)

In addition to the four above, several other anomalous phenomena are worth keeping in mind.

- **Electrochemical shock**: very rapid volume changes during fast phase transitions (e.g., crossing the LFP two-phase boundary) act on particles like a shock wave and induce [fracture](./04_mechanochemistry.md). Pronounced at high rates.

- **Asymmetric rate capability**: even in the same cell at the same C-rate, charging and discharging exhibit asymmetric rate behavior. Charging is usually more rate-sensitive than discharging (especially at low temperatures). It originates in the asymmetry of [lithium plating](./03_interface.md) and anode polarization.

- **Self-discharge anomaly**: instead of a simple sqrt(t) or linear decay over time, the self-discharge of calendar aging shows an abnormally rapid non-linear region at certain SOCs. Linked to cathode lattice stability limits or cross-talk mechanisms.

- **Path-dependent OCV**: the OCV at the same SOC differs by a few mV depending on the immediately preceding history. Similar to the memory effect but more general; subtly observed even in layered cathodes including NMC.

These phenomena are each deep research topics on their own, and when raised in conferences they trigger lively mechanism debates.

Because models of normal behavior alone cannot explain them, they motivate new models / experimental designs.

A mindset that does not dismiss anomalies as mere "exceptions" but instead reverse-engineers which assumption breaks down to produce such behavior has historically led to both academic and practical discoveries.

## References

- Croy, J. R. et al. *Journal of Physical Chemistry C* 117 (2013) 6525 — Li-rich voltage fade mechanism.
- Sasaki, T., Ukyo, Y., Novák, P. *Nature Materials* 12 (2013) 569 — discovery of LFP memory effect.
- Sathiya, M. et al. *Nature Materials* 12 (2013) 827 — direct evidence of anionic redox.
- Seo, D.-H. et al. *Nature Chemistry* 8 (2016) 692 — anionic-redox lone-pair theory.
- Attia, P. M. et al. *Nature* 578 (2020) 397 — knee-point prediction and mechanism.
- Woodford, W. H., Chiang, Y. M., Carter, W. C. *Journal of The Electrochemical Society* 157 (2010) A1052 — electrochemical-shock model.
