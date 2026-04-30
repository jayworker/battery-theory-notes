# Ionic Conduction

## 1. Overview

How ions move inside a crystalline or amorphous solid is the product of two factors: (i) **how many carriers (vacancies or interstitials) exist**, and (ii) **how often each carrier hops from one site to the next**. The first factor follows from the defect concentrations discussed in [`./03_defect_chemistry.md`](./03_defect_chemistry.md); the second follows from the hopping dynamics inside the crystal lattice.

In battery applications the macroscopic quantities that emerge from combining these two factors are the **ionic conductivity** $\sigma$ and the **diffusion coefficient** $D$. The two are linked by the Nernst–Einstein relation, and the small correction factor in this ratio (the Haven ratio) provides a clue to the hopping mechanism — vacancy / interstitialcy / paddle-wheel.

This section follows the sequence (i) the Arrhenius equation and its activation energy, (ii) classification of hopping mechanisms, (iii) the Nernst–Einstein relation and the Haven ratio, (iv) channel dimensionality and percolation in the lattice, and (v) a comparison of the room-temperature $\sigma_\text{Li}$ of representative solid electrolytes.

## 2. Arrhenius equation and activation energy

The ionic conductivity $\sigma$ falls on a straight line versus $T^{-1}$ in nearly every solid. Intuitively, each individual hop is an activation event driven by lattice vibration, and its frequency depends exponentially on a Boltzmann factor.

The most common form is

$$\sigma T = A \exp\!\left(-\frac{E_a}{k_B T}\right)$$

(or, dropping the prefactor $T$, the simple Arrhenius form). Each term: $\sigma$ is the ionic conductivity (S/cm), $A$ is the pre-exponential factor (a product of the carrier concentration, hop distance, and attempt frequency), $E_a$ is the activation energy (eV or J/mol), and $k_B$ is Boltzmann's constant. The slope of $\ln(\sigma T)$ versus $1/T$ is $-E_a/k_B$.

$E_a$ has two parts: the **migration energy** $E_m$ — the saddle-point energy created by the lattice as one carrier crosses from one site to the next — and a fraction of the **defect formation energy** $E_f$ — present when the carrier concentration also varies with temperature. That is:

$$E_a = E_m + \alpha E_f$$

with $\alpha = 0$ in the extrinsic regime (carrier concentration fixed by doping), $\alpha = 1/2$ for an intrinsic Schottky pair, and $\alpha = 1$ when the carrier itself is responsible for its own formation. In garnets such as LLZO, the carriers are fixed by doping (Al, Ta), so $E_a \approx E_m \approx 0.3$ eV. In simple ionic crystals such as NaCl, the activation energy plot bends between an intrinsic high-temperature regime and an extrinsic low-temperature regime.

Over a battery cell's operating temperature range (−20 to +60 °C), the difference between 0.3 eV and 0.5 eV produces a 1.5–2 order-of-magnitude change in room-temperature conductivity. $E_a$ is therefore not just a fit parameter but **an indicator of the intrinsic conductivity limit of the material**.

## 3. Hopping mechanisms

The basic mechanisms of ionic hopping fall into three categories.

**(a) Vacancy mechanism.** One site is a vacancy and an ion on the neighboring site jumps into it. From the ion's point of view it has moved one step; equivalently, the vacancy has moved one step in the opposite direction. This is the most common mechanism. Examples: Na in NaCl, Li in layered NMC, Li in LiCoO₂ (although Li is more accurately described as a divacancy hop octahedral → tetrahedral → octahedral).

**(b) Interstitialcy (or direct interstitial) mechanism.** An ion on an interstitial site pushes a neighboring lattice ion into the same lattice site, and that lattice ion in turn jumps to another interstitial site — a collective motion. A simpler form is direct one-step interstitial hopping, but when the interstitial sites are too close together the collective motion has a lower barrier.

**(c) Concerted / paddle-wheel mechanism.** Either several ions move cooperatively one site at a time, or the anion sublattice (e.g., $\text{PS}_4^{3-}$, $\text{ClO}_4^{-}$, $\text{B}_{12}\text{H}_{12}^{2-}$) rotates and the cations ride over it as it does so. The paddle-wheel mode accompanies a superionic transition above which the anion rotation becomes free at $T_c$, and during this transition $\sigma$ jumps suddenly by 1–2 orders of magnitude (e.g., $\text{Li}_2\text{B}_{12}\text{H}_{12}$, some sulfides).

Each mechanism has a different activation energy, pre-exponential factor, and isotope effect. Quantitative diagnosis usually combines NMR (which directly probes the site-specific dynamics of the carrier), neutron quasi-elastic scattering, and ab initio molecular dynamics (AIMD).

## 4. Nernst–Einstein relation and the Haven ratio

$\sigma$ (an electrical measurement) and $D$ (a tracer measurement) come from the dynamics of the same carrier and must be related to each other. Ideally, if the carriers undergo independent random walks,

$$D_\sigma = \frac{\sigma k_B T}{n q^2}$$

where $D_\sigma$ is the charge diffusion coefficient inferred from the conductivity, $n$ is the carrier concentration (cm⁻³), $q$ is the carrier charge ($e$ or $z e$), and $k_B T$ is the thermal energy. This is the **Nernst–Einstein relation**.

> **Related concept: Haven ratio**
> The Haven ratio is the ratio of the self-diffusion coefficient $D_\text{tracer}$ measured with an isotopic tracer to the conductivity-derived $D_\sigma$: $H_R = D_\text{tracer} / D_\sigma$. For an ideal random walk, $H_R = 1$. In practice, (i) correlated motion — a hop that returns to the same site — reduces the average displacement seen by the tracer ($H_R < 1$, typically 0.3–0.7), and (ii) for collective motion (paddle-wheel, concerted) the carriers move sequentially in the same direction, so $D_\sigma$ is intrinsically larger and $H_R$ becomes smaller or loses a clean meaning. For the vacancy mechanism, $H_R = f$ (the correlation factor, which depends on the crystal structure: FCC $\approx 0.78$, BCC $\approx 0.73$). $H_R$ can be measured directly by tracer NMR or by isotope-labeled diffusion, and it provides geometric information about the hopping mechanism.

In batteries, $H_R$ is most often used to quantify the conduction mechanism in new superionic conductors — for example, the very small $H_R \sim 0.3$ of LGPS / Li₆PS₅Cl is interpreted as a signature of strong collective motion.

## 5. Channel dimensionality and percolation in the lattice

Even when the activation energy of ionic hopping is sufficiently low, **if the channel network through which the carrier can travel is broken**, the macroscopic conductivity is zero. This is called percolation.

Intuition: a 1D channel (e.g., the [010] channel of olivine LFP) is blocked across the entire particle by even a single antisite. A 2D layered structure (NMC) has bypass possibilities and is robust to blockage. A 3D framework (spinel, garnet, NASICON) is the most robust of all.

Mathematically, the probability of forming a continuous channel from random site occupation depends strongly on the dimensionality $d$. In 1D the percolation threshold is effectively 1 (every site must be filled), whereas in 3D it is only about 0.31 (site percolation, simple cubic). This simple geometry is the fundamental reason why the antisite concentration in LFP synthesis must be kept below 1% (directly connected to the channel-dimensionality discussion in [`./01_crystal_structure.md`](./01_crystal_structure.md)).

A related effect is the **bottleneck**. If a hop must pass through a narrow opening between two oxygens at the saddle point, the size of that opening dominates the migration energy $E_m$. The standard strategy in garnet LLZO is to dope (Al³⁺, Ta⁵⁺) to stabilize the cubic phase, widening the bottleneck and bringing $E_m$ down to ~0.3 eV.

## 6. Comparison of room-temperature $\sigma_\text{Li}$ in representative solid electrolytes

For battery use, the primary target of solid electrolytes is RT $\sigma \gtrsim 10^{-3}$ S/cm (about 1/10 of liquid electrolyte 1 M LiPF₆ in EC/DMC, $\sim 10^{-2}$ S/cm). Representative groups, their RT conductivities, and their activation energies are summarized below.

| Group | Representative composition | $\sigma_\text{Li}$ at 25 °C (S/cm) | $E_a$ (eV) | Mechanism |
|------|-----------|-------------------------------|-----------|----------|
| Garnet | Li₇La₃Zr₂O₁₂ (LLZO, Al/Ta-doped cubic) | $\sim 10^{-3}$ | 0.30–0.35 | vacancy / concerted on Li sublattice |
| Sulfide (argyrodite) | Li₆PS₅Cl | $\sim 10^{-3}$ | 0.20–0.30 | concerted, paddle-wheel-like (PS₄ rotation) |
| Sulfide (LGPS family) | Li₁₀GeP₂S₁₂ | $\sim 1.2 \times 10^{-2}$ | 0.22 | concerted along $c$-axis 1D channel |
| NASICON | Li₁.₃Al₀.₃Ti₁.₇(PO₄)₃ (LATP) | $\sim 10^{-3}$ | 0.30–0.40 | vacancy on 3D Li framework |
| Perovskite | Li₃ₓLa₂/₃₋ₓTiO₃ (LLTO) | $\sim 10^{-3}$ | 0.35–0.40 | vacancy in A-site |
| Polymer | PEO-LiTFSI (60 °C) | $\sim 10^{-4}$ at 60 °C | 0.5–1.0 | segmental motion-coupled |
| LiPON | Li₂.₉PO₃.₃N₀.₄₆ | $\sim 10^{-6}$ | 0.55 | thin-film, vacancy-like |

General trends inferable from these data:
- **Sulfides > oxides** in RT $\sigma$, but sulfides have weaker chemical/atmospheric stability (H₂S evolution).
- LGPS, despite having a 1D channel, shows very high $\sigma$ because the channel is sufficiently long at the particle level and antisite-like blockages are rare.
- Garnet LLZO is the most studied of the oxide group thanks to its compatibility with Li-metal anodes.
- LiPON has low $\sigma$ but is used in microbatteries because of its compatibility with thin-film deposition and its stability.

When read together with the phase diagrams in [`./05_phase_diagrams.md`](./05_phase_diagrams.md), this table directly informs the synthesis strategy by showing in which composition window a cubic or otherwise desired phase is stable.

## 7. Operational implications and limitations

Even when the bulk ionic conductivity exceeds $\sim 10^{-3}$ S/cm at room temperature, the limiting resistance in an actual cell is usually grain, grain-boundary, or interfacial resistance. Differences of 1–2 orders of magnitude between bulk $\sigma$ and cell-level effective $\sigma$ are common.

Furthermore, when the activation-energy plot shows a **knee** rather than a straight line, it indicates (i) a change in the carrier mechanism, (ii) a transition between intrinsic and extrinsic regimes, or (iii) a phase transition. Example: the superionic transition from $\beta$-AgI to $\alpha$-AgI (~147 °C) produces a 4-order-of-magnitude jump in $\sigma$.

Within a battery's operating range, $\sigma$ varies by about a factor of 10 between $-20$ and $+60$ °C, and this Arrhenius dependence is the primary cause of low-temperature performance limits. This is the starting point for cell-level polarization analysis; the detailed treatment of polarization is given in [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md).

## References

- Maier, J. *Physical Chemistry of Ionic Materials* (Wiley, 2004) — standard textbook on solid-state ionics.
- Funke, K. *Progress in Solid State Chemistry* 22 (1993) 111 — hopping mechanisms and the jump-relaxation model.
- Bachman, J. C. et al. *Chemical Reviews* 116 (2016) 140 — comprehensive review of ionic conduction mechanisms in inorganic solid electrolytes.
- Murugan, R., Thangadurai, V., Weppner, W. *Angewandte Chemie* 46 (2007) 7778 — synthesis and RT conductivity of cubic LLZO.
- Kamaya, N. et al. *Nature Materials* 10 (2011) 682 — report of LGPS with RT $\sigma \sim 10^{-2}$ S/cm.
- Kuhn, A., Wilkening, M. et al. *Energy & Environmental Science* 6 (2013) 3548 — NMR-based hopping dynamics of argyrodite Li₆PS₅Cl.
- Murch, G. E. *Solid State Ionics* 7 (1982) 177 — canonical treatment of the Haven ratio and correlation factors.
