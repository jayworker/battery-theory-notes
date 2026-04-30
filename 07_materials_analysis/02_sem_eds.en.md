# SEM and EDS (Scanning Electron Microscopy & Energy-Dispersive Spectroscopy)

## 1. Overview

SEM is the most frequently used morphology-diagnostic tool in battery analysis. Particle size, shape, and distribution; coating thickness; cracks; and even cross-section microstructure are shown intuitively at the nm–µm scale. When combined with EDS (energy-dispersive X-ray spectroscopy), elemental mapping is obtained over the same field of view, so questions like "where did the Mn from this particle go?" can be answered visually.

This section covers SEM signal types (SE/BSE), cross-section sample preparation, the quantitative limits of EDS and ZAF correction, and FIB-SEM tomography. Crystal structure and oxidation state belong to the realm of [XRD](./01_xrd.md) and [TEM/EELS](./03_tem.md).

## 2. SEM principle — SE vs BSE

When primary electrons (typically 5–30 kV) accelerated by an electron gun strike the sample surface, two main signals are generated. **Secondary electrons (SE)** are low-energy (<50 eV) electrons knocked out of weakly bound outer shells of sample atoms by inelastic scattering. They escape only from the top few nm of the surface, so topography information dominates. **Backscattered electrons (BSE)** are primary electrons that bounce back through Coulomb (elastic) scattering off nuclei while retaining most of their incident energy; the heavier the element, the larger the scattering cross-section → strong Z-contrast (atomic-number contrast).

Intuition: SE shows "surface morphology," while BSE shows "weight differences among constituent elements." Turning on both detectors simultaneously over the same field of view yields shape and compositional distribution at once.

For NMC cathode powder, SE is used to view particle morphology (typical secondary particles, 5–15 µm spherical agglomerates of 200–500 nm primary particles), while BSE is used to view surface coatings (Al₂O₃, ZrO₂) or conductive-carbon distribution. Cracks in Si anodes are most clearly seen in SE cross-sections.

## 3. Particle morphology and size statistics

When quantifying the particle-size distribution from SEM images, the key distinction is between **primary particles and secondary particles**. NMC, NCA, and LCO are usually synthesized as µm-scale secondary particles formed by agglomeration of nm-scale primary particles. After cycling, **inter-granular cracks** (cracks between primary particles inside a secondary particle) appear, which are most intuitively visualized in BSE cross-section images.

Statistically meaningful particle sizes are usually obtained by analyzing 100–500 particles with ImageJ or automated particle-recognition software, reporting $D_{10}$, $D_{50}$, and $D_{90}$. SEM is a 2D projection, however, with a bias that small particles can be hidden behind large ones, so cross-checking with [PSA (laser scattering)](./06_bet_psa.md) results is standard.

## 4. Cross-section analysis

The cross-section of a battery electrode is a key analysis revealing all the information that surface SEM cannot — electrode thickness, distribution of active material/binder/conductive additive, current collector interface, and intra-particle cracks. Sample preparation determines the result.

| Method | Pros | Cons |
|------|------|------|
| **Mechanical polishing** | Fast, large area | Soft active material can tear off, generating artifact cracks |
| **Ion milling (Ar broad beam)** | Low damage, large area (~mm) | Time-consuming (hours), flatness limited |
| **FIB (focused ion beam, Ga⁺)** | Precise (±100 nm), site-specific | Ga contamination, beam damage, small area |
| **Cryo-FIB** | Preserves electrolyte and SEI | Expensive equipment, demanding setup |

The standard for quantifying inter-granular cracks is to measure the crack area fraction in BSE cross-section images. Reports for NMC811 show that the crack area increases to about 5–15% after 200 cycles.

## 5. EDS — elemental mapping and quantitative limits

EDS analyzes elemental identity and amount by detecting the characteristic X-rays emitted when an outer-shell electron fills a vacancy created by a primary electron knocking out an inner-shell electron of a sample atom. Mapping over the same field of view as the SEM image enables instant answers to distribution questions such as "which particles are Co-rich and Mn-poor?"

> **Related concept: ZAF correction (quantitative EDS)**
> The measured X-ray intensity is not simply proportional to elemental concentration. Three corrections are required: $C_i = k_i \cdot \text{ZAF}_i$, where ZAF = $Z \times A \times F$.
> $Z$ = atomic-number effect (scattering / bremsstrahlung; stronger for heavier elements), $A$ = absorption (self-absorption of emitted X-rays inside the sample; X-rays from light elements are most affected), $F$ = fluorescence (X-rays from one element re-exciting another).
> Practical quantification is corrected automatically by $\phi(\rho z)$ models (e.g., PAP, XPP). With standards, accuracy is ±2 wt%; standardless quantification gives ±5–10 wt%.
> Caution: light elements such as O, N, and F suffer strongly from detector-window absorption and self-absorption, so quantitative reliability is low. Li has X-ray energy too low (54 eV) to be detected by EDS.

The detection limit is typically 0.1–1 wt%. Low-concentration dopants (e.g., 1% Al doping) are difficult to quantify by EDS and require ICP-MS. The mapping resolution is limited by the interaction volume produced inside the sample by the incident electrons (~1 µm at 15 kV) → lowering the accelerating voltage (e.g., 5 kV) improves resolution but weakens the signal.

## 6. FIB-SEM tomography

FIB-SEM tomography (serial sectioning) reconstructs 3D microstructure by repeating thin slicing of a sample with FIB (e.g., 50 nm slices) and SEM cross-section imaging tens to hundreds of times. It can quantify particle connectivity, conductive-additive networks, tortuosity, porosity, and the 3D distribution of inter-granular cracks.

Intuitively, it is the picture of "stacking up the internal microstructure of the electrode one voxel at a time by peeling layer by layer." The result is a 3D dataset with a volume on the order of 50 × 50 × 50 µm³ and voxel size ~50 nm. With this data, effective transport simulations (direct calculation of the Bruggeman exponent), crack-network percolation analysis, and similar studies become possible.

Limitations: measurement time (hours to a day), Ga contamination, limited sample volume, and difficulty obtaining large-scale statistics. For larger volumes, X-ray nano-CT (synchrotron, resolution 50–100 nm) is used.

## 7. Conductive coating and sample preparation

Most active materials and electrodes are insulating or weakly conductive, so primary electrons accumulate on the surface, causing charging artifacts (image streaks, brightness fluctuations, drift). Standard countermeasures:

- **Pt sputter coating**: most common, 2–10 nm thick, suitable for high-resolution SEM. Preserves the morphology of large grains well.
- **Au sputter coating**: thicker (10–20 nm), good for general SEM and low-voltage operation. The grain is large, however, and may hide nano-scale microstructure.
- **C coating (evaporation)**: favorable for EDS quantification (C contributes little backscatter, giving a clean signal), but morphological contrast is slightly lost.
- **Low-vacuum / VP-SEM (variable pressure)**: measurements without coating. Slight resolution loss, but useful for hydrated/insulating samples.

Air-sensitive samples (Li metal, lithiated graphite, sulfide solid electrolyte) must be moved from the glovebox using a transfer holder (e.g., Leica VCT, Quorum airlock). After ordinary mounting, exposure to air immediately changes the surface via oxidation/hydration.

Choosing the accelerating voltage: surface of primary particles (coatings, SEI traces) → 1–5 kV; cross-section morphology → 10–15 kV; deep BSE in thick samples → 20–30 kV. Higher voltage gives a stronger signal but reduces resolution and surface sensitivity.

## References

- Goldstein, J. I. et al. *Scanning Electron Microscopy and X-ray Microanalysis* (4th ed., Springer, 2018) — standard SEM/EDS textbook.
- Mücke, R. et al. *Journal of Power Sources* 396 (2018) 661–675 — quantification of NMC cracks by FIB-SEM tomography.
- Liu, H. et al. *Science* 344 (2014) 1252817 — combined SEM/TEM aging analysis of cathode cross-sections.
- Newbury, D. E., Ritchie, N. W. M. *Scanning* 35 (2013) 141–168 — limits and guidelines of standardless EDS quantification.
