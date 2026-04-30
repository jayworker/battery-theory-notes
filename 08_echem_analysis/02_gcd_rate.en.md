# GCD and Rate Capability (Galvanostatic Charge-Discharge)

## 1. Overview

Galvanostatic charge-discharge (GCD) is the most frequently encountered primary data in battery evaluation. When a constant current $I$ is applied and the voltage is recorded over time, the slope, plateau, and hysteresis of the curve simultaneously contain the thermodynamic and kinetic fingerprint of the electrode. The rate capability test is the standard procedure that quantifies the **power vs capacity trade-off** by repeating that GCD measurement at multiple C-rates.

There are three key variables: **C-rate** (charge/discharge speed), **specific capacity** (mAh/g, on the active-material basis), and **capacity retention** (rate-recovery ratio and remaining capacity after cycling). Just measuring these three accurately already completes the first-pass evaluation of a new material.

## 2. C-rate definition and unit intuition

C-rate is defined as the current that fully discharges the cell's theoretical capacity $C$ in 1 hour. That is, 1C is "fully discharge in 1 h", 0.5C is "fully discharge in 2 h", and 10C is "fully discharge in 6 min". Intuitively, C-rate is mapped directly to the inverse of time, so it makes the load level immediately recognizable.

$$I_\text{nC} = n \cdot C_\text{theoretical} \quad \text{(in A, where } C_\text{theoretical} \text{ is in Ah)}$$

Common conversions:
- C/20 ≈ 50 h charge/discharge (formation, equilibrium measurements)
- C/10 ≈ 10 h (for ICA / DVA analysis)
- C/2 ≈ 2 h (lifetime evaluation standard)
- 1C ≈ 1 h (reference)
- 5C ≈ 12 min (high-power applications)
- 10C ≈ 6 min (extreme rate)

On an active-material basis, the conversion takes the form $I = m \cdot C_\text{specific} \cdot n / 1000$ (A). Here $m$ = active-material mass (g), $C_\text{specific}$ = specific capacity (mAh/g). Example: NMC811 5 mg, 200 mAh/g, 0.1C → $I = 5 \times 200 \times 0.1 / 1000 = 0.1$ mA.

A common C-rate pitfall: converting on the basis of the **cell's nominal capacity** rather than the active-material mass hides the new material's true rate performance. First evaluation of a new material should always be reported on the **mass-specific** basis of active material.

## 3. Rate-capability measurement procedure

The standard rate-test sequence is a three-stage structure of **slow → fast → slow recovery**. Intuitively, you first confirm the cell's theoretical capacity limit at slow rate, gradually raise the load to see at which rate it collapses, and finally return to slow rate to check whether **irreversible damage** occurred.

Standard sequence (5 cycles at each rate):

| Stage | C-rate | Purpose |
|-------|--------|---------|
| 1 | 0.1C × 5 cycles | stabilization + baseline capacity |
| 2 | 0.5C × 5 | low-rate region |
| 3 | 1C × 5 | standard |
| 4 | 2C × 5 | medium rate |
| 5 | 5C × 5 | high rate |
| 6 | 10C × 5 | extreme |
| 7 | 0.1C × 5 | recovery (check irreversible loss) |

The capacity in the last cycle of the recovery stage divided by the capacity in the last cycle of stage 1 gives the **recovery ratio**. Above 95% indicates no high-rate damage; below 90% suggests irreversible structural change, SEI damage, or Li plating.

The reason for running 5 cycles at each rate: cycle 1 has not yet reached SOC equilibrium, cycles 2–3 stabilize, and the average of cycles 4–5 is the true capacity value. Ignoring this and looking at only one cycle per rate yields data with very high scatter.

## 4. Capacity retention and voltage hysteresis

At the same rate, capacity decreases with cycle number—this curve is called the **capacity retention curve**. It is typically plotted as cycle number vs (capacity / initial capacity × 100) %.

$$\text{Retention}(N) = \frac{Q_N}{Q_1} \times 100\%$$

The industry pass/fail threshold is usually the cycle number at 80% retention—1000 cycles at 1C for an NMC cell, 2000–5000 cycles for LFP are standard. This number is the primary lifetime indicator.

Voltage hysteresis is the voltage difference at the same SOC between charge and discharge. It is quantified from the GCD curve as the voltage difference between charge and discharge at 50% SOC, and is a direct indicator of kinetic loss arising from accumulated polarization. Materials with strong path dependence such as Si anode have large **intrinsic hysteresis**, whereas in NMC and LFP the kinetic hysteresis dominates.

> **Related concept: time dependence of polarization**
> Immediately after current is applied, the voltage drop is the ohmic polarization $\eta_\Omega = IR_s$ (instantaneous); on the ms–s timescale activation polarization $\eta_\text{ct}$ develops (governed by Butler-Volmer); finally on the s–min timescale concentration polarization $\eta_\text{conc}$ develops.
> Voltage hysteresis = $\eta_\text{ct} + \eta_\text{conc}$ summed. The ohmic component contributes equally with the same magnitude on charge and discharge, contributing half ($2 \cdot IR_s$) to hysteresis.
> Assumption: no active-material structural change during the measurement (only simple kinetic hysteresis). Materials with first-order phase transitions such as LiFePO₄ and Si have additional intrinsic path dependence and cannot be interpreted purely as kinetic hysteresis.

## 5. Initial Coulombic Efficiency (ICE)

ICE is the first-cycle discharge capacity divided by the first-cycle charge capacity. Because some of the charge capacity in the first cycle is consumed in irreversible reactions—SEI formation, electrode activation, electrolyte decomposition—ICE < 100% is the norm.

$$\text{ICE} = \frac{Q_\text{discharge,1st}}{Q_\text{charge,1st}} \times 100\%$$

(Note that anode lithiation = discharge, but in a graphite half-cell lithiation = charge; the names of numerator/denominator change with cell configuration.)

Representative values:
- Graphite anode: 90–95% (SEI formation)
- Si anode: 70–85% (large volume change + SEI)
- Hard carbon: 70–85%
- NMC cathode: 85–92%
- LFP cathode: 90–95%

When ICE is low, Li migrating from cathode to anode is lost during full-cell assembly, reducing total capacity. ICE is therefore one of the first key indicators in new-material evaluation, and processes that raise ICE—such as **prelithiation**—are actively researched.

## 6. Formation cycle

The first 3–5 cycles of a new cell are anomalous owing to SEI formation, electrode wetting, and structural stabilization. This stage is called the **formation cycle**, and is usually carried out at a very low current of 0.05–0.1C to minimize side reactions and form a stable SEI. Commercial cell manufacturing devotes several days to formation as standard practice.

Key effects of formation:
- Forming a stable SEI (passivation of the anode surface)
- Improved wetting of active-material particles
- Passing through the first stage of structural change (irreversible structural rearrangement)
- Electrode-thickness stabilization

True evaluation data starts from the cycles after formation. If formation cycles are included in the analysis, ICE and voltage hysteresis appear anomalous, so almost every analysis separates and reports formation independently.

## 7. Caveats during measurement

Quantitative interpretation of GCD is highly sensitive to the measurement setup.

- **Temperature control**: a 25 ± 1 °C chamber. A 10 K difference is enough to change rate capability by an order of magnitude.
- **Voltage cutoff**: a too-narrow upper/lower potential window misses the plateau, while a too-wide one enters side-reaction territory. Use the standard window for the cell chemistry (NMC 2.7–4.2 V, LFP 2.0–3.65 V, graphite 0.005–1.5 V).
- **Active-mass loading**: very thin coatings (< 1 mg/cm²) show unrealistically good rate. For commercial relevance 3–10 mg/cm² is recommended.
- **Rest time**: without sufficient rest (typically 30 min–1 h) between charge and discharge, polarization accumulates and the measured value is distorted.
- **CV (constant voltage) hold**: holding at the upper potential after reaching it until the current falls below a threshold gives a measurement closer to the true capacity. Specify the hold condition when comparing C-rates.

The results of [`./03_eis_practical.md`](./03_eis_practical.md) and [`./04_gitt_pitt.md`](./04_gitt_pitt.md) are interpreted in combination with the SOC decomposition of GCD; tracking which semicircle in EIS shifts together when the position of the GCD plateau changes is the standard diagnostic procedure.

## References

- Plett, G. L. *Battery Management Systems* Vol. 1 (Artech House, 2015) — BMS perspective on the definitions of C-rate, SOC, and SOH.
- Dahn, J. R., Sacken, U., Juzkow, M. W., Al-Janaby, H. *J. Electrochem. Soc.* 138 (1991) 2207 — early establishment of standard procedures for Li-ion GCD measurement.
- Aurbach, D. et al. *Electrochim. Acta* 47 (2002) 1899 — connection between formation cycle and SEI formation.
- Zhang, S. S. *Energies* 13 (2020) 1300 — review of strategies for improving ICE (including prelithiation).
