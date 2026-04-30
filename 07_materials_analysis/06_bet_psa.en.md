# BET and PSA (Surface Area & Particle Size Analysis)

## 1. Overview

Specific surface area ($\text{m}^2/\text{g}$) and particle-size distribution (PSD) are the most basic quantitative metrics for battery active materials, and they jointly determine charge/discharge kinetics, electrolyte side reactions, coating thickness, and slurry-dispersion behavior. The two measurements are almost always reported together at the powder stage.

This section covers the procedure for extracting specific surface area from the N₂ adsorption isotherm via the BET equation, the BJH (Barrett–Joyner–Halenda) method for quantifying mesopore distribution, and the principles and interpretation of laser-scattering PSA (Mie theory). It also addresses how the results differ from SEM statistics and how to read reported numbers critically.

## 2. N₂ adsorption isotherm

The basic principle of specific-surface-area measurement is to adsorb N₂ gas onto the sample surface at a fixed temperature (77 K, liquid N₂) and to measure the amount adsorbed as a function of relative pressure $P/P_0$ ($P_0$ = N₂ saturated vapor pressure). The larger the surface area, the more gas adsorbs at the same pressure.

Intuition: count the number of molecules needed to cover the sample surface with a monolayer of gas, multiply by the area each molecule occupies ($\sigma_{\text{N}_2} = 0.162 \text{ nm}^2$), and you have the surface area.

IUPAC classifies isotherms into six types (I–VI) by shape:
- **Type I**: rich in micropores (<2 nm); steep adsorption at low $P/P_0$ followed by a plateau. Activated carbon, MOFs.
- **Type II**: non-porous / macroporous (>50 nm), S-shape. Generic powders.
- **Type III**: weak adsorbate–adsorbent interaction; rare cases like some drugs.
- **Type IV**: mesopores (2–50 nm); Type-II shape plus a hysteresis loop at intermediate pressures. **Most battery active materials.**
- **Type V**: weak interaction + mesopores; rare.
- **Type VI**: layered uniform surface; stepped isotherm.

Agglomerated secondary particles such as NMC are typically Type IV, and the shape of the hysteresis loop (H1–H4) tells you the pore geometry (cylindrical / ink-bottle / slit).

## 3. BET equation — extracting specific surface area

The Brunauer–Emmett–Teller (BET) equation solves a multilayer adsorption model to extract the monolayer adsorbed amount $V_m$ from the isotherm. It is the multilayer extension of Langmuir (monolayer only); the key assumptions are (i) the first layer adsorbs onto the surface with energy $E_1$, (ii) above the first layer the heat is constant at the heat of condensation $E_L$, and (iii) all sites are equivalent.

Intuition: the first molecule sticks strongly to the surface, and additional molecules pile on weakly. Picking out only the first layer gives molecular area × molecular number = surface area.

$$\frac{1}{V[(P_0/P) - 1]} = \frac{1}{V_m c} + \frac{c-1}{V_m c}\frac{P}{P_0}$$

Each term: $V$ = adsorbed amount at pressure $P$ (STP cm³/g), $V_m$ = monolayer adsorbed amount (STP cm³/g), $c \approx \exp[(E_1 - E_L)/RT]$ = BET constant (a measure of the difference in adsorption energies). Plotting the left-hand side vs $P/P_0$ gives a straight line, and $V_m$ and $c$ are extracted simultaneously from the slope $(c-1)/V_m c$ and intercept $1/V_m c$.

The specific surface area $S_{\text{BET}}$ follows directly from $V_m$:

$$S_{\text{BET}} = \frac{V_m \cdot N_A \cdot \sigma_{\text{N}_2}}{V_{\text{molar STP}}}$$

Each term: $N_A = 6.022 \times 10^{23}$ mol⁻¹, $\sigma_{\text{N}_2} = 0.162 \text{ nm}^2$, $V_{\text{molar STP}} = 22{,}414$ cm³/mol.

The valid range for the BET plot is typically $P/P_0 = 0.05–0.30$. Outside this range the equation breaks down (low pressure: micropore filling; high pressure: multilayer growth), so those points are excluded from the fit. Poor linearity signals abundant micropores → augment with t-plot or DFT analysis.

## 4. BET values of battery active materials — what is normal?

Typical specific surface areas for active materials in powder form:
- NMC, NCA secondary particles: 0.2–0.8 m²/g
- LCO, large particles ($D_{50}$ ~10 µm): 0.1–0.3 m²/g
- LFP nano (carbon-coated): 8–20 m²/g
- Graphite anode: 1–4 m²/g
- Si nanoparticles: 20–80 m²/g
- Conductive carbon (Super-P): ~60 m²/g; KB ~1500 m²/g

Trends matter more than the absolute value. If BET in the same cathode synthesis batch increases from 0.4 → 0.8 m²/g, primary particles got smaller or surface roughness/cracking increased. A BET increase after cycling is direct evidence of particle cracking (cross-checked against SEM cross-section).

Relation to side reactions: as BET increases, the irreversible 1st-cycle capacity from SEI/CEI formation increases proportionally. That is why nano active materials inherently suffer from low 1st-cycle CE.

## 5. BJH — mesopore distribution

The BJH method extracts the mesopore (2–50 nm) distribution from the desorption branch of the adsorption isotherm. The core principle is the **Kelvin equation** — condensation in a curved meniscus occurs at lower pressure than on a flat surface.

Intuition: inside a narrow capillary, N₂ liquefies at lower pressure and fills the pore; from a filled capillary, N₂ also escapes at lower pressure. Measuring the amount escaping at each pressure inverts the pore-diameter distribution.

$$\ln\frac{P}{P_0} = -\frac{2\gamma V_L \cos\theta}{r_K RT}$$

Each term: $\gamma$ = surface tension, $V_L$ = liquid molecular volume, $\theta$ = contact angle (usually 0), $r_K$ = Kelvin radius. The actual pore radius $r_p = r_K + t$, where $t$ is the thickness of the adsorbed molecular layer (Halsey equation, etc.).

Results are reported as a dV/dlog(D) vs D plot. Samples with well-developed mesopores show clear peaks (e.g., NMC has two peaks at 4 nm and 20 nm → particle-surface nanostructure plus inter-aggregate spaces).

Limitations: not applicable to micropores (<2 nm) — use NLDFT instead; the Kelvin equation is inaccurate below 5 nm → DFT-based methods (NLDFT, QSDFT) are more accurate.

## 6. PSA — laser scattering and Mie theory

PSA (particle-size analyzer) is the standard tool for measuring particle-size distribution; the most common implementation is **laser diffraction**. The sample is dispersed in a medium (usually isopropanol or water + surfactant) and flowed through the dispersion chamber; a 633 nm He–Ne or other laser scatters off it, and the scattered intensity is measured at multiple angles by a detector array.

Intuition: large particles scatter strongly at small angles (<5°), while small particles (sub-µm) scatter to larger angles. The angular distribution is inverted to obtain the particle-size distribution.

> **Related concept: Mie vs Fraunhofer theory**
> The Fraunhofer diffraction approximation models scattering by simple diffraction when the particle is much larger than the wavelength of light ($D \gg \lambda$). It is simple but has large errors below 10 µm.
> Mie theory directly solves Maxwell's equations for spherical particles and is accurate over all size regimes. It does require the optical constants of the sample (refractive index real $n$ and absorption $k$), however.
> Assumptions: particles are spherical, the dispersing medium is homogeneous, optical properties are uniform.
> Limitation: non-spherical particles (NMC primary particles are polyhedral) are converted to volume-equivalent diameters, so elongated particles can yield values different from the actual size.

The standard outputs are dV/dlogD (volume distribution) and the cumulative percentiles $D_{10}$, $D_{50}$, $D_{90}$. The diameter at 50% cumulative volume, $D_{50}$, is the most commonly reported value.

Inadequate dispersion (measuring still-agglomerated samples) creates spurious large-particle peaks → 1–5 minutes of ultrasonic dispersion is recommended. Too much, however, breaks the particles themselves — there is a trade-off.

## 7. $D_{10}/D_{50}/D_{90}$ — link to charge/discharge kinetics

Each of the three percentiles of the particle-size distribution carries a different meaning.
- **$D_{10}$**: diameter at 10% cumulative volume. Reflects the share of fine particles; more fines → higher BET, increased SEI burden.
- **$D_{50}$**: median. The "representative size" of the active material.
- **$D_{90}$**: share of large particles. Large particles have long Li-diffusion paths during charge/discharge, which limits rate capability.

Span = $(D_{90}-D_{10})/D_{50}$: narrow span = uniform distribution; wide span = multimodal. For cathode active materials, span 0.5–1.5 is generally recommended.

Link to the diffusion timescale: Li diffusion length $L \sim \sqrt{D_\text{Li}\cdot t}$ → doubling the particle radius $r$ quadruples the time required to reach the same SOC ($t \propto r^2$). Charging a $D_{50} = 5$ µm NMC at 1 C requires roughly 1 hour for Li to diffuse to the particle center (assuming $D_\text{Li} \sim 10^{-14}$ m²/s). For fast-charging applications, smaller particles are inherently advantageous.

That said, smaller particles mean more surface area ↑ → more CEI side reactions ↑, lower packing density ↓, and lower energy density ↓. Cathode design therefore typically falls in the $D_{50}$ = 5–15 µm range as a compromise between kinetics and side reactions.

## 8. SEM statistics vs PSA — do they agree?

It is common for particle counts from SEM images and PSA laser-scattering results to disagree. Reasons:
- **SEM is number-weighted, PSA is volume-weighted**: even if just 1 of 100 particles seen in SEM is a large agglomerate, by volume it accounts for 99% → PSA $D_{50}$ is then much larger than the SEM mean.
- **PSA assumes spheres**: polyhedral NMC is converted to a volume-equivalent sphere diameter → slightly larger value.
- **SEM is a 2D projection**: small particles can be hidden behind large ones.
- **Agglomeration state**: PSA is in a dispersing medium, SEM is dry — the dispersant has an effect, leading to differences in agglomeration.

Correct reporting: SEM should explicitly refer to primary particles and PSA to secondary particles / agglomerates; do not compare the two values directly. Number-to-volume conversion is possible but stacks assumption upon assumption and is not recommended.

## References

- Sing, K. S. W. et al. *Pure and Applied Chemistry* 87 (2015) 1051–1069 — IUPAC standard for isotherm/pore classification.
- Brunauer, S., Emmett, P. H., Teller, E. *Journal of the American Chemical Society* 60 (1938) 309–319 — original paper on the BET equation.
- Barrett, E. P., Joyner, L. G., Halenda, P. P. *Journal of the American Chemical Society* 73 (1951) 373–380 — original paper on BJH mesopore analysis.
- Rouquerol, F., Rouquerol, J., Sing, K. *Adsorption by Powders and Porous Solids* (2nd ed., Academic, 2014) — comprehensive standard on adsorption / BET / BJH.
- ISO 13320:2020 — international standard for laser-diffraction particle-size analysis.
