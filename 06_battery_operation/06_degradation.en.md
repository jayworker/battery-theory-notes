# Degradation Mechanisms

## 1. Overview

Battery aging is not a single mechanism but the result of **several physicochemical processes proceeding simultaneously and coupled to one another**. From the user's / researcher's viewpoint, only two phenomena are visible — capacity fade (capacity decreases) and power fade (resistance increases). Behind these two phenomena, however, several mechanisms — LLI, LAM, TM dissolution, cation mixing, gas evolution, fracture, SEI growth — contribute compositely.

Aging is broadly classified into two types. **Calendar aging** proceeds with elapsed time even when no current flows; sqrt(t) SEI growth is the dominant mechanism. **Cycle aging** is induced by charge-discharge itself, with volume change/fracture, lithium plating, and crystal-structure collapse adding on top. Real cell lifetime is the sum of the two, and which one dominates depends on the usage pattern.

The core diagnostic toolkit is the combination of **ICA/DVA** (electrochemical, non-destructive), 3-electrode cells (electrode separation), and post-mortem analysis (direct observation). No single technique can pin down a mechanism on its own.

## 2. LLI (Loss of Lithium Inventory)

LLI is the permanent loss of cyclable active Li⁺. The Li⁺ has not physically vanished but is **sequestered as inactive compounds** that can no longer participate in charge/discharge. Intuitively, part of the cell's Li pool has leaked, so the cathode and anode no longer operate from the same reference point.

Main LLI pathways:
- **SEI growth**: the largest contribution in both calendar and cycle aging. Reductively decomposed Li⁺ is sequestered as SEI components (LiF, Li₂CO₃, ROCO₂Li, etc.).
- **Lithium plating**: at low temperature / fast charging, deposited as metallic Li on the anode surface. Some re-intercalates (reactivates), but "dead Li" wrapped in SEI is irreversible.
- **CEI-related sequestration**: some Li trapped in cathode-surface decomposition products.

The signature of LLI in [DVA curves](./01_voltage_curves.md) is the **relative slippage** between the cathode and anode potential curves. The cathode and anode curves slip on the SOC axis, and as a consequence the usable SOC window of the full cell narrows.

## 3. LAM (Loss of Active Material)

LAM is inactivation of the active material itself. If LLI is "Li disappearing", LAM is "the sites where Li can go disappearing". It is defined separately for the cathode and the anode.

**LAM_PE (positive-electrode side, cathode)**:
- Crystal-structure collapse: layered → spinel → rock-salt phase transitions (especially at high voltage / delithiated state).
- Electrical disconnection due to particle fracture: when fractures detach particles from the matrix, electronic pathways are lost.
- Surface reconstruction: NMC surface is converted to a rock-salt layer to several nm depth.

**LAM_NE (negative-electrode side, anode)**:
- Graphite exfoliation: incompatible solvents co-intercalate between graphite layers and exfoliate them.
- Binder degradation / loss of contact: cumulative volume change separates binders such as PVDF from active-material particles.
- Si particle pulverization: hundreds-of-percent volume change shatters particles into small fragments, some of which become electrically disconnected.

The LAM signature in ICA/DVA appears as a reduction in the peak area for the affected electrode. If LAM is non-uniform and localized at the electrode level (see [core-shell stress distribution](./04_mechanochemistry.md)), even within the same cell SOC non-uniformity accumulates and becomes a cause of further accelerated aging.

## 4. Transition-metal dissolution (TM dissolution)

The dissolution of transition metals (especially Mn, Ni, Co) from cathode active materials such as NMC, LMO, LCO into the electrolyte. The mechanism is multilayered.

- **HF attack**: LiPF₆ reacts with trace H₂O to form HF → HF attacks the lattice oxygen of the cathode and weakens TM-O bonds → TM²⁺/³⁺ leaches into solution.
- **Mn³⁺ disproportionation**: $2\text{Mn}^{3+} \to \text{Mn}^{2+} + \text{Mn}^{4+}$. Mn²⁺ has a higher solubility and dissolves out. Pronounced in LMO.
- **Lattice oxygen release at high voltage**: surface lattice oxygen is depleted, and the coordination environment of the adjacent TM collapses → dissolution.

When the dissolved TM crosses the separator and reaches the anode, it inflicts two further damages — (i) it is reductively deposited into the anode SEI and breaks SEI integrity → SEI re-formation → accelerated LLI; (ii) it occupies sites that obstruct Li⁺ diffusion in the graphite anode.

Counter-strategies:
- **Surface coatings**: ALD/wet coatings of Al₂O₃, ZrO₂, LiNbO₃ block HF access.
- **Lattice doping**: partial substitution with Al, Mg, Ti to stabilize the lattice.
- **Electrolyte additives**: VC, FEC, LiBOB to induce stable SEI/CEI. Add HF scavengers (e.g., trimethyl phosphate derivatives).

## 5. Cation mixing

In layered oxides such as NMC, the **ionic radii of Li⁺ and Ni²⁺ are very similar** (Li⁺ 0.76 Å, Ni²⁺ 0.69 Å, 6-coordinate). Hence Ni²⁺ migrating to the Li sites (3a) and Li⁺ migrating to the TM sites (3b) — cation mixing — occurs both during synthesis and during cycling. Intuitively, the distinction between "layers" of the layered structure becomes blurred and the structure approaches the rock-salt structure.

Quantification by XRD uses the (003) and (104) peak intensity ratio. In a well-ordered layered structure (003) diffracts strongly, but as cation mixing proceeds the (003) intensity drops and (104) becomes relatively larger. The ratio of these two peaks therefore serves as a simple quantitative indicator of the degree of cation mixing.

$$\frac{I_{(003)}}{I_{(104)}} \gtrsim 1.2 \quad (\text{well-ordered layered})$$

The higher this ratio, the better the layered ordering is preserved; if it drops below 1.2 it signals significant cation mixing. Pristine NMC811 is typically at 1.4 or above and falls toward 1.0 after aging.

Electrochemical impact: Ni²⁺ at the 3a site obstructs Li⁺ 2D diffusion pathways, reducing $D_\text{Li}$ and degrading rate behavior. It also reduces the active Li sites and contributes directly to LAM_PE.

## 6. Gas evolution

Side reactions between the electrolyte and active materials often produce gases, leading to internal-pressure rise / swelling / safety problems. The gases produced depend on the mechanism.

| Gas | Main origin |
|------|----------|
| CO₂ | Oxidative decomposition of carbonate solvents (EC, DEC, etc.) (cathode origin) |
| CO | Reductive decomposition of carbonates (anode origin) |
| H₂ | Electrochemical reduction of trace moisture |
| C₂H₄ | EC reduction (especially during the SEI-formation stage) |
| O₂ | Lattice oxygen release from the cathode (Li-rich, high-voltage NMC) |
| CH₄ | Further reduction of alkyl carbonates |

Among these, O₂ release is critical: it is a direct signal of cathode lattice stability and is tightly tied to [thermal runaway risk](./05_thermal.md). **DEMS** (Differential Electrochemical Mass Spectrometry) can quantify gases in real time as a function of SOC/potential, making it a key tool for [operando analysis](./07_operando.md).

Gas evolution causes immediate safety problems via cell swelling (pouch bulging, internal pressure rise in hard cases), and at the same time, by causing loss of electrode-electrolyte contact, induces additional LAM.

## 7. Aging diagnostic tools

To separate and quantify multiple mechanisms, the following tools are combined.

- **ICA/DVA**: electrochemical, non-destructive. Separates LLI vs LAM and cathode vs anode contributions. Detailed patterns are described in [`./01_voltage_curves.md`](./01_voltage_curves.md).
- **GITT/EIS**: separates components of resistance increase (SEI, charge transfer, diffusion). [`./02_polarization.md`](./02_polarization.md).
- **3-electrode cell**: measures cathode and anode potentials independently. The OCV-SOC curve of each electrode can be extracted directly → most accurate when combined with DVA.
- **Post-mortem**: SEM/TEM (fractures, morphology), XRD (crystallinity, cation mixing), XPS (SEI composition), ICP-OES (TM dissolution amount), and other direct observation after disassembly.
- **In-situ DEMS**: quantifies the SOC/potential dependence of gas evolution rates and species.
- **Reference electrode + EIS**: separates SEI/CEI resistance per electrode (anode/cathode) during operation.

It is standard to organize diagnostic results in an **aging-mode matrix** (LLI, LAM_PE, LAM_NE, resistance increase) (Birkl et al. model). This matrix is the foundation of cell-life models and the SOH-estimation algorithms in BMS. Each column of the matrix is best resolved by a specific diagnostic technique (e.g., LLI by DVA slippage, LAM_PE by ICA cathode peak area, resistance increase by EIS $R_s + R_\text{ct}$), and cross-checking that two or more techniques agree on the same value is what determines diagnostic reliability.

Finally, it must be emphasized that **aging is non-linear and coupled**.

Initially, SEI growth (LLI) dominates, but as LLI accumulates and compresses the anode SOC window, beyond the [knee point](./08_anomalies.md) LAM_NE (driven by lithium plating) explodes.

A single-mechanism model cannot reliably predict combined calendar+cycle aging and can miss the actual EOL (end of life) by a wide margin.

## References

- Vetter, J. et al. *Electrochimica Acta* 50 (2005) 2735–2751 — comprehensive review of aging mechanisms (classic).
- Birkl, C. R. et al. *Journal of Power Sources* 341 (2017) 373–386 — standard methodology for LLI/LAM diagnostics.
- Manthiram, A. *Nature Communications* 11 (2020) 1550 — review of layered cathode aging mechanisms.
- Pinson, M. B., Bazant, M. Z. *Journal of The Electrochemical Society* 160 (2012) A243 — SEI growth and calendar aging model.
- Lin, F. et al. *Nature Communications* 5 (2014) 3529 — NMC surface reconstruction.
