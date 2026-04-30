# Cycling Protocols (Formation, Calendar, Accelerated Aging)

## 1. Overview

Battery lifetime evaluation does not end with a single measurement. The result is determined by the current, voltage window, SOC, and temperature at which cycling is performed. A **cycling protocol** is a procedure that standardizes this matrix; it is the starting point for new-material evaluation, cell verification, and BMS (battery management system) algorithm development.

This section organizes three standard protocols: (1) **formation cycle**—SEI formation and stabilization in the first cycles, (2) **calendar aging**—aging from elapsed time alone, and (3) **accelerated aging**—cycling under accelerated conditions. Each targets a different aging mode and illuminates a different facet of cell lifetime.

Intuitively: formation is "the procedure that brings the cell to a stable state", calendar measures "how well it endures while not in use", and accelerated measures "how well it endures harsh use".

## 2. Formation cycle

The first 3–5 cycles of a new cell are anomalous owing to SEI formation, electrode wetting, and structural stabilization. The purpose of formation is to pass through this period under controlled conditions. Commercial cell manufacturing devotes several days to formation as standard, and the quality of this stage has the largest single impact on lifetime.

**Standard procedure**:
- Current: 0.05–0.1C (very low current to minimize side reactions)
- Number of cycles: 3–5
- Constant-voltage hold: at the upper cutoff, hold until the current falls below 0.01C (CV step)
- Rest: 30 min – 1 h between charge and discharge
- Temperature: 25 °C is standard (variants stabilize the SEI faster at 45 °C)

**Key effects**:
- Forms a stable SEI on the graphite surface (anode passivation)
- Wetting between active-material particles (electrolyte penetration)
- Passes through the first stage of structural change (irreversible structural rearrangement)
- Stabilizes electrode thickness

> **Related concept: SEI formation and first-cycle irreversible loss**
> During the first charge (lithiation) of graphite or Si anodes, in the 0.5–1.5 V vs Li/Li⁺ region the electrolyte decomposes and the SEI (solid-electrolyte interphase) forms. Some of the charge capacity (typically 5–30%) is irreversibly consumed in this process.
> Quantitative indicator: ICE = $Q_\text{discharge,1st}/Q_\text{charge,1st}$. Graphite 90–95%, Si 70–85%. Lower ICE = more Li loss = more cathode oversizing required in a full cell.
> Assumption: the SEI is stably formed and side reactions are negligible in subsequent cycles. In materials with large volume change such as Si, the SEI cracks and re-forms each cycle, breaking the assumption → cumulative ICE loss.

True evaluation data starts from the cycles after formation. If formation cycles are included in the analysis, ICE and voltage hysteresis appear anomalous, so almost every analysis separates and reports formation independently.

## 3. Calendar aging

Calendar aging measures the capacity loss and resistance increase that occur as time passes while the cell is **left at rest**. That is, aging that proceeds even without actual use (cycling). It mimics the situation in an EV where a cell sits in a parking lot for days.

**Standard procedure**:
- SOC fixed (typically chosen from 50%, 80%, 100%, or compared across multiple values)
- Temperature fixed (25, 45, 60 °C)
- Periodic checkup: weekly or monthly capacity / EIS measurements, then return to SOC
- Duration: 6 months – 2 years

**Capacity loss vs $\sqrt{t}$**: when SEI growth is diffusion-controlled (Tafel-like self-discharge + Fick-like SEI thickness growth), the capacity loss is proportional to the square root of time. This is the form most often used in computational models:

$$\Delta Q(t) \propto \sqrt{t}$$

If this behavior is observed, SEI growth dominates; other behaviors indicate other mechanisms (Li plating, particle cracking, transition-metal dissolution).

**Influence of SOC and temperature**:
- High SOC (100%): strong oxidative environment at the cathode → accelerates CEI formation, transition-metal dissolution
- Low SOC (0%): the anode is oxidized, decomposing the SEI
- Mid SOC (30–70%): minimal calendar aging
- High temperature: Arrhenius accelerates all side reactions (typically a 2× acceleration per 10 °C rise)

For these reasons the recommended SOC range for EV / ESS is typically 30–80%, and the standard BMS policies avoid using the cell immediately after a 100% charge or discharging it below 30%.

## 4. Accelerated aging

Measuring the actual lifetime (years) in a lab is impractical. Instead, **accelerated conditions** (high temperature, high SOC, high DOD, high C-rate) compress the lifetime measurement, then Arrhenius / Eyring extrapolation is used to estimate the lifetime under real use.

**Standard accelerated conditions**:
- Temperature: 45, 55, 60 °C (acceleration factor ~5–20× vs 25 °C)
- C-rate: 1C, 2C (vs slower cycling)
- DOD (Depth of Discharge): 100% (full cycle, 0–100% SOC)—more aggressive than partial cycling
- Voltage range: extend the upper / lower limits slightly beyond the rated window

**Arrhenius extrapolation**:

$$\frac{1}{\tau_\text{life}} = A \exp\!\left(-\frac{E_a}{RT}\right)$$

Measure lifetime $\tau$ at three or more temperatures, and extract $E_a$ from the slope of $\ln(1/\tau)$ vs $1/T$. Typically 0.4–0.8 eV. Use this $E_a$ to extrapolate the 25 °C lifetime.

**Limitation**: aging mechanisms activated at high temperature may differ from those at room temperature. Direct extrapolation of 60 °C results to 25 °C can be off by an order of magnitude or more, so a key validation is checking **whether the points across multiple temperatures lie on the same straight line**.

## 5. Voltage hold (constant-voltage hold)

A common variant of cycling protocols **maintains a constant voltage for a set time after the upper cutoff is reached**.

Purposes:
- True capacity measurement (removing polarization)
- High-voltage stress test (probing the cathode oxidation limit)
- Stability assessment (accelerating CEI formation)

**Specifying the hold condition is mandatory**: writing only "1C cycling, 2.7–4.2 V" leaves the hold ambiguous. One must specify, e.g., "1C charge to 4.2 V, hold at 4.2 V until I < 0.05C, 1C discharge to 2.7 V" for reproducibility.

The longer the hold, the larger the measured capacity (closer to full equilibrium), but oxidation stress at the cathode also accumulates and aging accelerates. This trade-off is at the core of BMS design.

## 6. BMS-relevant tests and SOC windows

The standard for commercial cell evaluation is cycling within the cell-chemistry-specific recommended window. These values are specified in the manufacturer's datasheet and serve as the baseline for every comparison.

**Standard windows by cell chemistry**:

| Chemistry | Voltage window | Notes |
|-----------|---------------|-------|
| NMC (LiNi$_x$Mn$_y$Co$_z$O₂) | 2.7 – 4.2 V (3.0–4.4 V high-V) | high-V used for NMC811 and above |
| NCA | 2.5 – 4.2 V | Similar to LCO |
| LCO (LiCoO₂) | 3.0 – 4.2 V | 4.35 V high-V also used |
| LFP (LiFePO₄) | 2.0 – 3.65 V | Plateau is flat, making SOC estimation difficult |
| LMO (LiMn₂O₄) | 3.0 – 4.3 V | Mn dissolution concerns |
| Graphite anode | 0.005 – 1.5 V | Below 0 V leads to Li plating |
| Si anode | 0.005 – 1.0 V | Large volume change |
| LTO anode | 1.0 – 2.5 V | 1.55 V plateau |

**Influence of DOD / SOC window**: 0–100% full cycling is the harshest (DOD 100%), and 30–80% partial cycling is the gentlest. EV BMSs typically use only 80% of the cell rating (DOD 80%) to balance calendar + cycle aging.

**Adding reference tests**: during accelerated cycling, periodically (typically every 50 or 100 cycles) interleave a standard reference test (0.1C cycle + EIS) to track capacity / resistance trends. This reference-test data is the backbone of post-mortem analysis.

## 7. Caveats during measurement

Common pitfalls in cycling protocols.

- **Insufficient temperature control**: cycling at room temperature without a chamber introduces seasonal / diurnal variations into the lifetime data. A 25 ± 1 °C chamber is essential.
- **Cell-to-cell variation**: even under identical conditions, cell-to-cell lifetime varies by ±20%. Run at least 3–5 cells in parallel for statistical conclusions.
- **Skipping reference tests**: if only accelerated cycling is run, capacity at any given time point cannot be tracked. Periodic reference tests are essential.
- **Data sampling rate**: GCD curve analysis requires sufficient sampling (e.g., a data point every 10 mV). Too sparse, and voltage hysteresis and plateau positions are inaccurate.
- **Changing conditions mid-cycling**: changing C-rate / temperature mid-cycle makes comparison with prior data difficult. Maintain a single protocol from start to finish.
- **SOH (State of Health) definition**: typically the EOL (end of life) is set at capacity falling to 80%. If this criterion differs, lifetime reports become incomparable.

The results of each measurement ([`./02_gcd_rate.md`](./02_gcd_rate.md), [`./03_eis_practical.md`](./03_eis_practical.md), [`./04_gitt_pitt.md`](./04_gitt_pitt.md)) are obtained at specific points in the cycling protocol; data without specifying which protocol and which point cannot be compared. The starting point of any data report is making the standard protocol explicit.

## References

- Plett, G. L. *Battery Management Systems* Vol. 1–2 (Artech House, 2015) — BMS standard treatment of cycling, SOC, and SOH.
- Broussely, M., Biensan, P., Bonhomme, F., Blanchard, P., Herreyre, S., Nechev, K., Staniewicz, R. J. *J. Power Sources* 146 (2005) 90 — Li-ion calendar life and extrapolation methods.
- Schmalstieg, J., Käbitz, S., Ecker, M., Sauer, D. U. *J. Power Sources* 257 (2014) 325 — separation model for calendar + cycle aging.
- USABC (US Advanced Battery Consortium) *Electric Vehicle Battery Test Procedures Manual* — standard procedures for accelerated aging.
- Dubarry, M., Devie, A., Liaw, B. Y. *J. Power Sources* 360 (2017) 59 — influence of formation protocol on lifetime.
