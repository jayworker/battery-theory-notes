# Interface Phenomena

## 1. Overview

The single biggest factor that determines a battery's performance and lifetime is **not the active material itself but the electrode-electrolyte interface**. The operating potentials of the cathode and anode almost always fall outside the electrochemical stability window of the electrolyte, so some form of decomposition reaction always occurs at the interface.

The crucial distinction here is "**good SEI vs bad SEI**". If the SEI (solid electrolyte interphase) is thin, dense, and ionically conductive, it blocks further decomposition while allowing only Li⁺ to pass, and the cell operates stably. Conversely, if it is thick, brittle, and electronically conductive, decomposition continues and LLI / resistance increase / gas evolution accumulate.

## 2. SEI (Solid Electrolyte Interphase)

The operating potential of a graphite anode (0–0.3 V vs Li/Li⁺) lies far below the reductive stability of common carbonate electrolytes. So during the first charge (formation cycle), solvents such as EC, DEC, DMC and salts such as LiPF₆ undergo reductive decomposition, and a solid film grows spontaneously on the anode surface. This film is the SEI. Once formed, it blocks electron passage and stops further decomposition, while still permitting Li⁺ transport and thus normal operation.

The SEI is not a single layer but has a **bilayer structure** (Peled model). The inner side, closer to the active material, is dominated by inorganic species (LiF, Li₂CO₃, Li₂O), while the outer side is dominated by organics (ROCO₂Li, polymers). The inorganic layer carries ionic conduction and mechanical strength, the organic layer flexibility and adhesion.

The growth kinetics are well described by a **diffusion-limited model**. If electron / solvent transport through the SEI is rate-limiting, the SEI thickness $L$ scales with the square root of time:

$$L(t) \propto \sqrt{t}$$

This is the direct cause of the sqrt(t) shape of calendar-aging curves (capacity loss with elapsed time alone). Li⁺ consumed in forming the SEI during the first cycle is permanently irreversible loss, which is why the initial Coulombic efficiency (ICE) sits around 90–95%.

## 3. CEI (Cathode Electrolyte Interphase)

A similar decomposition film also forms on the cathode, called the CEI. Because the cathode operates in an oxidizing environment (3.5–4.5 V vs Li/Li⁺), the decomposition mechanism is the opposite of the SEI — oxidative decomposition of the electrolyte. Generally the CEI is thinner than the SEI, but **at high-voltage (>4.3 V) cathodes it thickens very rapidly**.

| Item | SEI (anode) | CEI (cathode) |
|------|-----------|-----------|
| Formation environment | Reduction | Oxidation |
| Potential reference | < 1 V vs Li/Li⁺ | > 4 V vs Li/Li⁺ |
| Main inorganic components | LiF, Li₂CO₃, Li₂O | LiF, Li_xPF_y, Li₂CO₃ |
| Thickness | ~10–50 nm | ~1–10 nm |
| Stability | Stable after formation | Continues to grow at high voltage |

The CEI is coupled with lattice oxygen release at the cathode surface and TM (transition metal) dissolution, so it should be regarded **not as a simple film issue but as a signature of cathode structural degradation**.

## 4. Lithium plating

The normal operating potential of a graphite anode is about 0.05–0.3 V vs Li/Li⁺. However, during fast charging, polarization can drive the anode potential below 0 V, and Li⁺ is then **reduced as metallic Li and deposited on the anode surface** instead of intercalating into the graphite layers. This is lithium plating, and the risk is high under any of the following conditions.

- Low temperature (< 10 °C): slowed diffusion kinetics increase polarization.
- High C-rate charging: increased activation/concentration polarization.
- Aged cells: anode active-material loss → local SOC exceeds 100%.
- Additional charging at high SOC: graphite is nearly saturated, leaving no site for new Li.

Standard detection methods are (i) a voltage bump during the rest after charging (deposited metallic Li re-intercalates into graphite), (ii) reduced Coulombic efficiency, and (iii) mossy/dendritic morphology observed on the anode surface after disassembly.

## 5. Dendrite

When lithium metal anode or plated Li grows non-uniformly into a **branch-like (dendritic) shape** it is called a dendrite. Tip-enhanced diffusion concentrates Li⁺ flux at protrusions, producing self-reinforcing growth. Once the critical current density is exceeded, the surface concentration reaches zero within the Sand time, and dendrite nucleation begins in earnest.

> **Related concept: Sand time**
> When a constant current $j$ flows, the cation concentration at the surface of a planar electrode decreases with time, and at some moment the surface concentration reaches zero. That moment is the Sand time $\tau_s = \pi D (nFc/2j)^2$ ($c$ = bulk concentration, $D$ = diffusivity).
> If the same current is forced beyond $\tau_s$, the concentration polarization diverges and the anode surface potential plummets below the reduction potential of metallic Li → lithium plating / dendrite nucleation. Thus $\tau_s$ is the upper bound on "safe galvanostatic time".
> Practical implication: doubling $j$ shrinks $\tau_s$ to one quarter — exactly why fast charging intrinsically increases dendrite risk. Strategies that raise the effective $c$, such as concentrated electrolytes or higher transference number, lengthen this time.

Suppression strategies:
- **Mechanical blocking**: solid electrolyte, ceramic separator, stiff SEI (high shear modulus, Newman criterion G > 6 GPa).
- **Electrolyte design**: high-concentration electrolytes, additives that induce LiF-rich SEI (FEC, VC), localized high-concentration electrolyte.
- **Uniform surface**: 3D-structured anode, lithiophilic surface treatment to homogenize nucleation sites.
- **Temperature/current management**: avoid low-temperature fast charging, use pulse charging.

If a dendrite punctures the separator and contacts the cathode it causes an internal short, directly tied to safety problems (thermal runaway trigger → [`./05_thermal.md`](./05_thermal.md)).

## 6. Cross-talk

Although the cathode and anode are isolated by a separator, the **migration of chemical species through the electrolyte that damages each other's interfaces** occurs broadly. This is called cross-talk. Representative examples:

- **TM dissolution → SEI destruction at the anode**: Mn²⁺/Ni²⁺ etc. dissolve from the cathode, cross the separator, and are reductively deposited into the anode SEI. They break SEI integrity and trigger re-formation, accelerating LLI.
- **Shuttle reaction**: in Li-S cells, polysulfide ($\text{Li}_2\text{S}_n$) shuttles between cathode and anode, causing self-discharge and reduced Coulombic efficiency.
- **Migration of gas / solvent decomposition products**: oxidized species from the cathode reach the anode and induce further reduction, or vice versa.
- **Organic redox shuttle**: some redox-active decomposition products act as solution-phase electron mediators, accelerating self-discharge.

Cross-talk is a cell-level aging origin that cannot simply be split into "cathode problem" or "anode problem", and because it is invisible in half-cell measurements, diagnosis is tricky. Standard diagnostic combinations are (i) post-mortem ICP-OES on the anode surface to quantify TM, (ii) EDS element mapping on the separator to trace the migration path, and (iii) impedance separation of cathode/anode in a 3-electrode full cell.

In addition, the most powerful tool for tuning interface performance is, ultimately, **electrolyte additives**.

Additives such as FEC, VC, LiBOB, LiDFOB, and LiPO₂F₂ at ppm to a few wt% levels can steer SEI/CEI composition toward LiF-rich, polymer-thin forms, meaningfully slowing cross-talk and calendar aging.

Additive design must consider reduction/oxidation potentials, ionic conductivity of decomposition products, and lattice stabilization effects in a unified way.

## References

- Peled, E., Menkin, S. *Journal of The Electrochemical Society* 164 (2017) A1703 — review of the Peled bilayer SEI model.
- Xu, K. *Chemical Reviews* 114 (2014) 11503–11618 — comprehensive review of carbonate electrolytes and SEI.
- Monroe, C., Newman, J. *Journal of The Electrochemical Society* 152 (2005) A396 — mechanical-stability criterion for dendrite suppression.
- Betz, J. et al. *Advanced Energy Materials* 9 (2019) 1900574 — TM cross-talk mechanism.
- Waldmann, T. et al. *Journal of Power Sources* 384 (2018) 107–124 — review of Li plating detection methodology.
