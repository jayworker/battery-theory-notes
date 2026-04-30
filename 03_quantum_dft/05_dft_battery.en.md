# DFT Applications for Battery Research

## 1. Overview

DFT has become a standard tool in battery research because it can quantitatively answer, at the atomic level, questions that are very difficult or expensive to address by experiment. These questions usually distill into the following five:

1. **What is the average operating voltage of this material?** — The first criterion for screening new materials.
2. **How fast does Li⁺ (or Na⁺/K⁺/Mg²⁺) move through the lattice?** — The atomic-level origin of power and rate limits.
3. **Is this composition synthesizable, and what decomposition routes does it have?** — Convex hull / phase stability analysis.
4. **Which atoms are oxidized during charging?** — Cation redox vs. anion redox; oxidation state determination.
5. **Which decomposition products are stable at the interface (SEI/CEI)?** — Electrolyte additive and surface coating design.

This section organizes the standard DFT procedures for answering these five questions — average voltage calculation, NEB migration barriers, formation energy and convex hull, Bader charge / oxidation state, anionic redox analysis — together with the corrections (vdW, magnetism, temperature) that make these results trustworthy.

We start from the assumption that the functional choice of [`03_exchange_correlation.md`](./03_exchange_correlation.md) and the numerical convergence of [`04_practical_dft.md`](./04_practical_dft.md) have already been passed correctly. If either is under-converged, every quantity in this section becomes inaccurate.

Intuitively, DFT is a tool for "0 K, vacuum, infinite-time equilibrium." Real batteries operate at "300 K, inside an electrolyte, kinetically agitated," so the answer DFT gives must always be interpreted with an explicit awareness of that gap, which is the framing we adopt from the outset.

## 2. Average Voltage Calculation

### 2.1 Basic equation

$\Delta G = -nFE$ from [`../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md) is the starting point for first-principles calculation. Consider a reaction in which Li enters a single cathode host going from $x \to y$ ($y > x$, discharge direction):

$$\text{Li}_x\text{host} + (y-x)\text{Li (metal)} \to \text{Li}_y\text{host}$$

At 0 K and in vacuum, the Gibbs free energy change of this reaction is approximated by $\Delta G \approx \Delta E$ (the electronic energy change). Then the **average voltage** is:

$$V_{avg} = -\frac{E(\text{Li}_y\text{host}) - E(\text{Li}_x\text{host}) - (y-x) E(\text{Li bcc})}{(y-x) F}$$

Each term: $E(\text{Li}_x\text{host})$ = total host energy at composition $x$ (per formula unit), $E(\text{Li bcc})$ = energy per atom of Li metal (reference), $F$ = Faraday constant, $(y-x)$ = number of Li transferred. Sign convention — when Li enters the host with $\Delta E < 0$, then $V > 0$.

Rewritten in electron units ($e \cdot V = $ eV/electron):

$$V_{avg} = -\frac{E(\text{Li}_y) - E(\text{Li}_x) - (y-x) E(\text{Li metal})}{(y-x) e}$$

### 2.2 Intuition and meaning

The intuition behind this equation: the voltage is the energy gain obtained by inserting one Li atom into the host. The stronger the oxidant at the host's redox center (e.g., Co³⁺ → Co⁴⁺), the more strongly it pulls in Li⁺, the larger the energy gain, and the higher the voltage.

Also, because this is an average between two compositions, no matter what plateau/slope the actual V-Q curve traces — as seen in [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) — the formula only returns the average between the two endpoints. To obtain the shape of the curve itself, one must compute on a finer composition mesh and differentiate.

### 2.3 Standard procedure and accuracy

**Standard procedure**:
1. Relax Li_x host and Li_y host separately in the same supercell (cell+ion).
2. Extract energies via static SCF using the same cutoff/k-point/functional/PAW.
3. Under the same conditions, relax the Li bcc unit cell to obtain $E(\text{Li metal})$.
4. Substitute into the formula above.

**Accuracy and representative values** (PBE+U, vs. experiment):
- LCO (LiCoO₂ ↔ Li₀.₅CoO₂): calculated ~3.8 V, experiment ~3.9 V → error ~0.1 V.
- LFP (LiFePO₄ ↔ FePO₄): calculated ~3.4 V (PBE+U with $U=4.0$), experiment 3.43 V → near-perfect agreement.
- LMO (LiMn₂O₄ ↔ Mn₂O₄): calculated ~4.0 V, experiment ~4.1 V.
- Graphite (LiC₆ ↔ C): calculated ~0.1 V vs. Li/Li⁺, experiment ~0.1 V.

Typical error ~0.1–0.3 V. Sources of larger error:
- Inappropriate functional (incorrect PBE+U $U$ value, no hybrid).
- Wrong magnetic ordering (NMC).
- Missing vdW correction (0.1–0.2 V in layered hosts).
- Neglecting zero-point energy (ZPE) (typically ~10 meV/atom).
- Ignoring electrolyte / SEI / interface effects (the 0 K vacuum assumption).

### 2.4 Voltage profile calculation

To obtain the shape of the V-Q curve, one must compute several intermediate compositions and differentiate the chemical potential.

$$V(x) = -\frac{1}{F}\frac{\partial G}{\partial x}\bigg|_{x = N_{Li}/N_{site}}$$

In practice: (i) enumerate possible Li orderings, (ii) solve each configuration with DFT and adopt the most stable ground state, (iii) compute the difference between adjacent compositions using the average voltage formula. The stair-step curve obtained this way is the first-principles prediction of the actual V-Q.

The tools that automate this procedure are high-throughput DFT databases such as **Materials Project (Ceder group)**, **AFLOW**, and the **Open Quantum Materials Database (OQMD)**.

> **Related concept: Differential form of chemical potential and voltage**
> The average voltage formula gives a mean obtained from the free energy difference divided by the number of Li between two compositions. Its differential form is precisely the same expression as the Nernst equation seen in [`../01_electrochemistry/01_thermodynamics.md`](../01_electrochemistry/01_thermodynamics.md): $V(x) = -\mu_{Li}(x)/e$. In a region where $\mu_{Li}$ is constant (two-phase coexistence) one observes a plateau, and where it varies one observes a slope. In other words, the DFT average voltage equals the average chemical potential over that region.

## 3. Migration Barriers: NEB

### 3.1 Why NEB

When Li⁺ moves from one site (site A) to another (site B) inside the host, the energy of the saddle point along its path is the activation energy $E_a$, which determines the diffusion coefficient through the Arrhenius expression $D = D_0 \exp(-E_a/k_B T)$. A 0.05 eV difference in migration barrier corresponds to about a $\exp(0.05/0.025) \approx 7$-fold difference in room-temperature hopping rate.

Intuitively, among the countless paths from A to B, one must find the minimum energy path (MEP). A simple linear interpolation or an arbitrary transition-state guess is unreliable.

**NEB (Nudged Elastic Band, Henkelman & Jónsson)** is the standard automated method: several intermediate images are placed between the two endpoints (A, B), and each image is constrained so that (i) it feels the PES force perpendicular to the path, but (ii) only feels a virtual spring force from neighboring images along the direction parallel to the path. When the SCF is solved this way, the images automatically align onto the MEP.

### 3.2 NEB standard settings

**Number of images**: typically **5–7 images** (7–9 including both endpoints). Too few and the saddle is missed; too many and cost explodes.

**Climbing Image NEB (CI-NEB, Henkelman et al. 2000)**: a variant that releases the highest-energy image from the spring force and forces it to climb up to the saddle point. It pins the saddle energy more accurately than plain NEB by ~0.01 eV — **effectively the standard**.

**Force convergence criterion**: residual force $|\mathbf{F}_\perp| < 0.03$ eV/Å. If saddle accuracy matters, tighten to 0.01 eV/Å.

**Lattice fixed**: lattice changes during NEB are forbidden. The two endpoints must use the same supercell and the same ion ordering.

**Spring constant**: typically around 5 eV/Å². Too small and images slide into the valleys; too large and they oscillate.

### 3.3 Representative battery NEB results

| System | Path | $E_a$ (eV) | Notes |
|---|---|---|---|
| LFP (LiFePO₄) | 1D channel along $b$ | 0.30–0.55 | Strong dimensionality, defect-mediated |
| LCO | 2D layer (oxygen octahedral) | ~0.4–0.6 | Divacancy path is lower |
| NMC811 | 2D layer | ~0.25–0.4 | Lower in the charged state |
| Spinel LMO | 3D channel (8a-16c-8a) | 0.4–0.7 | Mn oxidation-state dependent |
| LLZO (garnet) | 3D | ~0.3 | Li-concentration dependent |
| Graphite | 2D | ~0.4–0.5 | Stage dependent |

**Trick — divacancy mechanism**: in layered oxides the simple single-vacancy hopping has $E_a \sim 0.6$ eV, but the concerted hopping of a divacancy (two adjacent empty sites) is much lower, at $\sim 0.3$ eV. This produces the counterintuitive result that diffusion is faster in the charged state (Li-poor) — first reported by Van der Ven et al.

**Limitations**:
- Only the 0 K static PES. Temperature effects (phonon-assisted hopping, anharmonicity) must be handled separately by ab initio MD.
- Cathode diffusion can be polaron-Li⁺ coupled hopping, and the single-particle picture may break down.
- $E_a$ depends on cell size (image-image interaction). A $2\times 2 \times 2$ supercell or larger is generally recommended.

### 3.4 Prefactor and diffusion coefficient

The activation energy alone does not determine the absolute hopping rate; the prefactor $\nu_0$ (attempt frequency) must be computed separately. The standard prescription is transition state theory (TST):

$$\nu_0 = \frac{\prod_i \nu_i^{IS}}{\prod_i \nu_i^{TS}}, \qquad k = \nu_0 \exp(-E_a/k_B T)$$

Each term: $\nu_i^{IS}, \nu_i^{TS}$ = normal-mode frequencies at the initial state and at the saddle point. $\nu_0$ is typically $10^{12}$–$10^{13}$ s⁻¹.

The diffusion coefficient is $D = a^2 \nu_0 \exp(-E_a/k_B T) / 2d$ (single hop distance $a$, dimensionality $d$). Typical room-temperature values: $D \sim 10^{-9}$ cm²/s for 1D LFP, $\sim 10^{-10}$ cm²/s for 2D NMC.

## 4. Formation Energy and Convex Hull

### 4.1 Definition of formation energy

The formation energy of a compound $A_xB_yC_z$ is its synthesis energy referenced to the standard (reference) states of its elements:

$$E_f(A_xB_yC_z) = E(A_xB_yC_z) - x \mu_A^{ref} - y \mu_B^{ref} - z \mu_C^{ref}$$

Here $\mu_A^{ref}$ = energy per atom of element $A$ in its most stable elemental form (e.g., Li bcc, O₂ gas, Fe bcc). Units are usually normalized to eV/atom.

Common variants in battery applications:
- **vs. Li chemical potential**: during cathode charge/discharge the chemical potential varies around $\mu_{Li} = E(\text{Li bcc})$, so a phase diagram is drawn as a function of $\mu_{Li}$ (a grand-canonical phase diagram).
- **vs. O chemical potential**: stability under various oxygen partial pressures of an oxide. Essential for assessing synthesizability.

### 4.2 Convex hull and ground-state line

When the formation energies of various compositions $\text{Li}_x \text{host}$ are plotted as a function of $x$, the lower envelope of the lowest points is the **convex hull**. A point above the hull is metastable, since it is energetically favorable to decompose into the two adjacent hull compositions; only points lying exactly on the hull are true ground-state compositions.

Intuitively, the first test for "is this composition synthesizable?" is the distance from the convex hull (energy above hull, $E_{above hull}$). $E_{above hull} = 0$ → stable; below ~25 meV/atom → room-temperature synthesis possible; above ~50 meV/atom → difficult to synthesize. The 25 meV figure is not $k_B T$ at room temperature but an empirical cutoff used by the Materials Project.

Direct connection to the V-Q curve: the slope between two adjacent ground states on the convex hull is the average voltage between those two compositions, and a plateau exists between them. That is:

$$V_{plateau}(x_1 \to x_2) = -\frac{E_f(x_2) - E_f(x_1)}{(x_2 - x_1) F}$$

Why the LiFePO₄ ↔ FePO₄ plateau of LFP is so flat at 3.43 V: both endpoints lie on the hull, and every intermediate composition lies higher, so decomposition (phase separation) is favored — the plateau seen in [`../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) emerges precisely from this hull shape.

### 4.3 Phase diagram automation

Databases such as Materials Project, OQMD, and AFLOW accumulate tens of thousands of DFT calculations for every combination of elements and automatically construct the hull. Adding a new composition immediately tells you whether it sits on the hull, providing a first-pass screen for synthesizability.

Real-world examples in battery materials discovery:
- Disordered rock-salt cathodes (Lyu et al.): convex hull analysis predicting compositional regions where cation disorder is stable.
- High-throughput Na/K cathode discovery (Ceder group): selecting first-pass candidates by substituting Na/K into the Li database.

### 4.4 Limitations

- Systematic biases of DFT absolute energies (overbinding, missing vdW, wrong magnetic ordering) accumulate in the distance from the hull.
- Functional dependence: GGA hulls and SCAN hulls can differ.
- Temperature/entropy ignored — disordered phases may become more stable at finite T.
- Kinetics ignored — metastable phases that are effectively stable in practice are common (diamond, anatase TiO₂).

## 5. Bader Charge and Oxidation State

### 5.1 Why oxidation states are difficult

"Is this atom in the +3 or +4 oxidation state?" is a key question in batteries — but inside a DFT lattice there is no clean answer. Electrons are spread over the entire lattice, and exactly how many electrons "belong to" a single atom depends on the definition.

Intuitively, Mulliken/Lowdin analysis is defined only on an atom-centered orbital basis and is not directly applicable to plane-wave results. The standard for plane-wave DFT is therefore **Bader analysis** (Bader 1990) — partition space into atomic regions using the zero-flux surfaces of the electron density, and define the integral of the electron density over each region as that atom's charge.

$$Q^{Bader}_I = Z_I - \int_{\Omega_I} n(\mathbf{r}) d^3r$$

Each term: $Z_I$ = nuclear charge (atomic number), $\Omega_I$ = Bader basin of atom $I$, integral is the electron density over that basin. The advantage of this definition is that it is parameter-free and independent of the wave-function representation.

### 5.2 Standard usage in batteries

Charge compensation analysis of an NMC cathode:
- Pristine LiNi₀.₈Mn₀.₁Co₀.₁O₂: Ni Bader ~+1.4, Mn ~+1.7, Co ~+1.4 (different from formal +3/+4/+3 — due to covalency).
- After charging (50% Li removed): Ni Bader rises to ~+1.6 (change of 0.2), Mn barely changes, Co changes slightly. That is, **Ni is the principal redox center**.
- Above 4.5 V in Li-rich NMC: Ni Bader stops changing; **O Bader decreases from -1.4 → -1.2** = anionic oxidation (oxygen redox).

Key insight: the **absolute** Bader value differs from the formal oxidation state because of covalency. However, the **change** in Bader charge during charge/discharge clearly identifies which atoms are oxidized/reduced. For this reason, oxidation-state analysis is always interpreted as "$\Delta Q_{Bader}$ vs. SOC."

### 5.3 Tools and usage

The standard Bader workflow in VASP:
1. After SCF, set `LCHARG=.TRUE., LAECHG=.TRUE.` to output the charge densities (`AECCAR0`, `AECCAR2`, `CHGCAR`).
2. Run the Henkelman group's `bader` executable.
3. The Bader charge of each atom appears in the `ACF.dat` file.

**Note**: PAW core-valence partitioning affects the Bader basins. For accurate Bader results, the `LAECHG=.TRUE.` option must be used so that the all-electron core charge is added to the charge density.

### 5.4 Other charge-analysis methods

- **Mulliken**: standard for atom-centered bases (LCAO codes such as CRYSTAL/Gaussian/SIESTA). Inaccurate for plane-wave codes.
- **DDEC6** (Manz): more chemically meaningful charges, with good reproduction of electrostatic moments.
- **CHELPG, MK**: electrostatic-potential fitting. Good for molecules, with limited applicability to crystals.
- **COHP/COBI** (Crystal Orbital Hamilton / Bond Index, Dronskowski): quantification of bond strength — central to the anionic redox analysis in the next section.

The de facto battery standard is Bader, supplemented with COHP via LOBSTER when bond/orbital analysis is required.

## 6. Anionic Redox

### 6.1 Phenomenon and importance

Redox in conventional cathodes is **cation-only**: Co³⁺ → Co⁴⁺ on charging, the reverse on discharging. In Li-rich layered oxides (xLi₂MnO₃·(1-x)LiMO₂, $x > 0$), however, additional capacity appears above 4.5 V even when Mn/Ni cannot be oxidized any further. The origin of this extra capacity is **anionic oxidation (oxygen redox)**: O²⁻ → O⁻ → O₂²⁻, or shortening of O covalent bonds.

Intuitively, in Li-rich compositions a "linear Li-O-Li" arrangement appears in the LiO₆ environment, leaving one O 2p orbital in a non-bonding state that does not participate in bonding. This state rises near the Fermi level, accepts holes, and is oxidized.

Technological significance: theoretical capacities of 250+ mAh/g (~1.5× LCO) are reachable, but industrialization faces severe challenges — gas evolution (O₂ release), voltage decay, and structural disorder.

### 6.2 Quantifying anionic redox with DFT

Standard analysis procedure:

**1. Bader on O**: pristine $Q_O \approx -1.4$; if $Q_O$ decreases to -1.2 or -1.0 in the charged state, this is evidence of anionic oxidation.

**2. PDOS (projected density of states)**: separate the contributions of O 2p and TM d near the Fermi level. In cationic redox, the d-band straddles $E_F$; in anionic redox, O 2p sits at $E_F$.

**3. Spin density isosurface**: when the spin density is plotted after charging, spin localized on O indicates an oxygen polaron (O⁻).

**4. COHP/COBI** (LOBSTER tool): check whether the antibonding states of the O-O bond become unoccupied. This is direct evidence of peroxide-like ($\text{O}_2^{2-}$) formation. In systems with strong anionic redox, this is accompanied by an O-O distance shortening from ~2.4 Å to ~1.5 Å.

**5. NEXAFS / RIXS simulation**: the O K-edge absorption spectrum is simulated with BSE or DFT-based methods and compared directly to experiment.

### 6.3 The importance of functional choice

Anionic redox involves strongly localized holes, so PBE/PBE+U is often inaccurate. Standard recommendations:
- **HSE06**: accurately reproduces hole localization. Benchmark on small cells, then compare with PBE+U on larger cells.
- **SCAN+rVV10** or SCAN+U: alternatives to hybrids for large cells.
- **PBE+U with $U(O) \approx 4$ eV**: experimental, used in some papers. Controversial.

There are cases in which the choice of functional changed the conclusion about the voltage-decay mechanism, so cross-checking with two functionals is always recommended.

### 6.4 Practical implications

- Stable anionic-redox candidates: Ru- and Ir-based (4d/5d, where strong covalency stabilizes the O-O dimer).
- Unstable (decomposition-prone) candidates: 3d-only Li-rich NMC — exhibits O₂ gas-evolution signals.
- DFT stability indicators: $E_{form}$ of the $\text{O}_2$ vacancy (the higher, the more stable), and the O-O peroxide bond-breaking barrier (NEB).

## 7. Limitations and Corrections

### 7.1 Dispersion forces (vdW, D3/D4)

Standard GGA reproduces none of the asymptotic $-C_6/r^6$ attraction. The interlayer binding energy of graphite in PBE is ~10 meV/atom (experiment is ~50 meV/atom — PBE underestimates by 80%). Molecular crystals, porous hosts (MOFs, COFs), and surface adsorption all require vdW corrections.

**Grimme D3 (2010)**: adds an empirical pair-wise $-C_6/r^6$ term, with atom-pair $C_6$ coefficients drawn from a precomputed table. Cost ~0.

$$E^{D3} = -\sum_{I<J}\sum_{n=6,8} s_n \frac{C_n^{IJ}}{r_{IJ}^n} f_{damp}(r_{IJ})$$

Each term: $f_{damp}$ = short-range damping function, $s_n$ = functional-dependent scaling coefficient.

**D4 (2019)**: adds charge dependence on top of D3. More accurate for ionic systems.

**vdW-DF / VV10**: nonlocal functional. Higher accuracy, but cost ~2× higher.

Battery applications:
- Graphite anodes, hard carbon: D3 or D4 is essentially mandatory.
- LCO/NMC layered cathodes: interlayer binding contributes 0.05–0.1 eV/Li — can shift the calculated voltage by more than 0.1 V.
- Molecular electrolytes, additive surface adsorption: ignoring vdW introduces 0.2–0.5 eV errors in adsorption energies.

### 7.2 Self-interaction error and polarons

The SIE introduced in [`03_exchange_correlation.md`](./03_exchange_correlation.md) manifests in batteries as two specific errors.

**Polaron delocalization**: the LFP small polaron (a hole localized on a single Fe³⁺ site) spreads throughout the lattice in PBE. It is recovered with PBE+U ($U(\text{Fe}) \approx 4$) or HSE06. The hopping barrier of the polaron-Li⁺ complex is the key to determining accurate conductivity.

**Ambiguous oxidation states**: in PBE, Ni in NMC sits at fractional occupations rather than a clean +3/+4 distinction. Integer occupations are recovered with PBE+U ($U(\text{Ni}) = 6.2$). The magnetic moment provides a clear signal: Ni³⁺ (low-spin S=1/2, ~0.7 $\mu_B$) vs. Ni⁴⁺ (S=0, ~0).

**Diagnostic signal**: equal magnetic moments on every equivalent atom in the lattice → delocalized (PBE inaccurate); large moments on only some atoms → localized (correct).

### 7.3 Temperature effects

DFT is a 0 K static calculation, while real batteries operate at 300 K. The neglected temperature contributions are:

**(i) Lattice vibrations (phonons)**: add ZPE + thermal contributions to the free energy. $A_{vib}(T) = E_{ZPE} + k_B T \sum_q \ln(1 - e^{-\hbar\omega_q/k_B T})$. Typically ~10 meV/atom. Captured via the quasi-harmonic approximation.

**(ii) Configurational entropy**: Li/vacancy configurations, cation disorder. At high T, the free energy decreases by ~$k_B T \ln \Omega$. Accurately handled via cluster expansion + Monte Carlo.

**(iii) Kinetic effects**: melting, defect mobility, the phonon-assisted contribution to the NEB above — handled separately by ab initio MD.

**Practical recommendation**: a 0 K average-voltage calculation predicts the room-temperature OCV to within ~50 meV (~50 mV). For more accurate comparisons, correct using quasi-harmonic + cluster expansion.

### 7.4 Electrolyte / interface effects

The DFT average voltage is referenced to vacuum vs. Li metal and ignores entirely the electrolyte and SEI of a real cell. Li⁺ desolvation energy is ~0.5–1 eV, and SEI transport adds further resistance. Standard corrections:

- **Implicit solvent (VASPsol)**: approximates the electrolyte as a homogeneous dielectric medium. Adsorption-energy correction ~0.1–0.3 eV.
- **Explicit solvation + AIMD**: include Li⁺ + EC + DMC molecules explicitly and ensemble-average via ab initio MD. Accurate but very expensive.
- **Grand canonical DFT (potential-fixed)**: SCF performed while explicitly controlling the electrode potential. Essential for accurate Tafel analysis of surface reactions (Norskov-Rossmeisl).

### 7.5 Other common caveats

- **Spin-orbit coupling**: important for 5d elements (Ir, Pt) and heavy lanthanides. Generally negligible for battery 3d transition metals.
- **Magnetic ordering assumption**: one must select the most stable among FM/AFM/PM — it is not automatic.
- **Hubbard $U$ with SOC**: when $U$ and SOC are used together, the $U$ value must be re-calibrated.
- **Charge correction for defect formation energies**: charged defects require careful convergence of long-range Coulomb interactions (Freysoldt or Kumagai-Oba corrections).
- **Accuracy of the Li bcc reference**: PBE overestimates the cohesive energy of Li by ~10%, contributing ~0.05 V to the absolute average voltage.

In summary, DFT is a powerful tool for battery research, but its results must always be interpreted in the context of "what functional, what convergence, what corrections — at the 0 K vacuum level — produced this answer." Rather than enabling one-to-one comparisons with experiment, DFT is most powerful as a tool for quantifying trends and mechanisms.

## References

- Aydinol, M. K., Kohan, A. F., Ceder, G. *Physical Review B* 56 (1997) 1354 — foundation of cathode average-voltage DFT calculations.
- Wang, L., Maxisch, T., Ceder, G. *Physical Review B* 73 (2006) 195107 — PBE+U $U$ values and formation-energy corrections.
- Henkelman, G., Uberuaga, B. P., Jónsson, H. *Journal of Chemical Physics* 113 (2000) 9901 — Climbing image NEB.
- Van der Ven, A., Ceder, G. *Electrochemical and Solid-State Letters* 3 (2000) 301 — LCO divacancy hopping.
- Bader, R. F. W. *Atoms in Molecules: A Quantum Theory* (Oxford, 1990) — original paper on Bader analysis.
- Henkelman, G., Arnaldsson, A., Jónsson, H. *Computational Materials Science* 36 (2006) 354 — efficient implementation of the Bader algorithm.
- Grimme, S. et al. *Journal of Chemical Physics* 132 (2010) 154104 — D3 dispersion correction.
- Seo, D.-H. et al. *Nature Chemistry* 8 (2016) 692 — DFT mechanism of anionic redox.
- Saubanère, M. et al. *Energy & Environmental Science* 9 (2016) 984 — comprehensive review of anionic redox in Li-rich oxides.
- Jain, A. et al. *APL Materials* 1 (2013) 011002 — Materials Project database.
- Sun, J. et al. *Nature Chemistry* 8 (2016) 831 — accuracy of SCAN for oxides.
- Norskov, J. K., Rossmeisl, J. et al. *Journal of Physical Chemistry B* 108 (2004) 17886 — computational hydrogen electrode and grand canonical DFT.
