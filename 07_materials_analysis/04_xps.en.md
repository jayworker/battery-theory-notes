# XPS (X-ray Photoelectron Spectroscopy)

## 1. Overview

XPS is the most standard technique for quantifying chemical composition and chemical state within the top ~10 nm of a surface. In battery research its almost exclusive niche is **SEI/CEI analysis** — it can quantify, near-ppm precision, which decomposition products are present at the surface and how they are distributed with depth.

This section covers the entire process — from photoelectron emission, binding energy, charge correction, peak deconvolution, and depth profiling, to standard SEI peak positions (LiF, Li₂CO₃, ROCO₂Li, etc.) — i.e., extracting chemical information from raw XPS spectra. The macroscopic SEI mechanism is treated separately in [SEI in operational theory](../06_battery_operation/03_interface.md).

## 2. Photoelectron emission and binding energy

XPS irradiates the sample with monochromatic X-rays (typically Al K$\alpha$ at 1486.6 eV or Mg K$\alpha$ at 1253.6 eV) and measures the kinetic energy of photoelectrons emitted via the photoelectric effect. Inner-shell electrons bound close to the nucleus have large binding energies (BE), so their emitted kinetic energy is small.

Intuition: if the X-ray energy is precisely known and the kinetic energy of the emitted electron is measured, the difference is exactly the energy with which that electron was bound to the atom (binding energy). For the same element, the BE shifts by several eV depending on the bonding environment (chemical shift), and that is the key to distinguishing oxidation states and bond types.

$$\text{KE} = h\nu - \text{BE} - \phi$$

Each term: KE = detected kinetic energy, $h\nu$ = X-ray photon energy, BE = photoelectron binding energy (referenced to the Fermi level), $\phi$ = work function of the spectrometer (constant correction). Measurements are made on the KE scale, but reporting is done on the BE scale.

The origin of surface sensitivity is the inelastic mean free path (IMFP, $\lambda$) of photoelectrons. At 100–1000 eV KE, $\lambda \approx 1–3$ nm, with 90% of the signal originating within $3\lambda \approx 5–10$ nm. So XPS is fundamentally a surface-analysis technique.

## 3. Charge correction

In an insulating sample, photoelectron emission leaves a positive charge that accumulates on the surface, causing the entire spectrum to shift in the positive BE direction (charging). Without correction, all BE values are inaccurate. The standard is to align to **adventitious carbon C 1s = 284.8 eV** (the hydrocarbon naturally adsorbed on the sample surface).

> **Related concept: limitations and alternatives of charge correction**
> The C 1s 284.8 eV reference is the most widely used, but for carbonaceous samples (graphite, conductive carbon, carbon coating), sp² and sp³ C are mixed and the reference becomes ambiguous.
> Alternatives: (i) Au 4f₇/₂ = 84.0 eV reference (sputter a trace of Au onto the sample), (ii) Fermi-level alignment when the sample is sufficiently conductive, (iii) use of an electron flood gun to suppress charging itself.
> In SEI analysis, the surface after cycling is highly insulating, so combined flood-gun and C 1s correction is the standard.
> After correction, BE accuracy is ±0.1–0.2 eV; for more accurate chemical-state assignment, fingerprint matching (multiple peak patterns) and cross-checking are required.

When C 1s 284.8 eV is itself the conductive carbon of the sample (graphite anode), it is more accurate to align to graphite C 1s = 284.5 eV (sp²).

## 4. Peak deconvolution

XPS peaks usually represent more than a single chemical state — multiple environments of the same element overlap. The C 1s of SEI overlaps 5–7 components from graphite, C–C/C–H, C–O, C=O, O–C=O, CO₃²⁻, etc. Separating these is peak deconvolution.

Standard procedure:
1. **Background subtraction**: Shirley or Tougaard background. Linear is inaccurate.
2. **Peak shape**: Gaussian-Lorentzian product (GL-30~70%) or Voigt. Metallic core levels are asymmetric, calling for Doniach–Sunjic.
3. **Constraints**: fix known spin–orbit splitting ratios (e.g., $2p_{3/2}:2p_{1/2}$ = 2:1, fixed BE difference), keep FWHM identical for the same chemical state.
4. **Reference BE**: use database values (NIST, La Surface) as initial guesses.
5. **Fit evaluation**: confirm $\chi^2$, randomness of residuals, and physical plausibility (relative intensities, FWHM reasonableness) all together.

Pitfalls to avoid: adding unphysically many peaks just to fit the data, leaving FWHM as a free parameter, ignoring known spin–orbit ratios. A good deconvolution closes the fit with as few peaks as possible.

## 5. Depth profile (Ar sputter)

XPS is fundamentally a surface (~10 nm) technique, but a depth profile becomes possible by gradually milling the surface with Ar⁺ or Ar cluster (Ar_n⁺) ion sputtering while measuring. This is the standard method for measuring SEI thickness and composition variations.

| Beam type | Damage level | Application |
|---------|-----------|------|
| **Ar⁺ monoatomic (1–5 keV)** | Severe (chemical reduction, CO₃²⁻ → C–C, etc.) | Inorganic oxides, metals |
| **Ar cluster (Ar₁₀₀₀–₅₀₀₀)** | Mild (preserves molecular bonds) | Polymers, SEI, organic surface layers |
| **GCIB (gas cluster ion beam)** | Very mild | Standard for SEI/CEI |

Sputter rate calibration is performed with a standard SiO₂/Si multilayer and applied to the sample. SEI rates can differ due to matrix effects, however, so absolute depth carries a ±30% error.

Battery application: SEI is typically 10–50 nm thick; depth profiling directly visualizes the mosaic structure of an outer layer (organic, molecular fragments) and an inner layer (inorganic, rich in LiF/Li₂O/Li₂CO₃). The CEI is usually thinner, 5–20 nm.

## 6. SEI standard peaks — chemical-species identification

Key BE values worth memorizing in SEI/CEI analysis. Having standard values in your head makes deconvolution far faster than relying on a database.

| Chemical species | Core level | BE (eV) | Comment |
|---------|-----------|---------|--------|
| C–C / C–H | C 1s | 284.5 / 284.8 | sp² / adventitious |
| C–O (alkoxide, ether) | C 1s | 286.5 | ROLi, ether |
| C=O (carbonyl) | C 1s | 288.0 | Aldehyde, ketone |
| O–C=O (ester) | C 1s | 289.0 | RCOOR' |
| **Li₂CO₃** | C 1s | **290.0** | SEI inorganic carbonate |
| **LiF** | F 1s | **685.0** | Key inorganic species in SEI |
| Li-PF$_x$O$_y$ (decomposed LiPF₆) | F 1s | 687 | LiPF₆ decomposition |
| LiPF₆ (intact) | F 1s | 687.5 | Residual salt |
| **Li₂CO₃** | O 1s | **532.0** | C=O (carbonate) |
| Li₂O | O 1s | 528 | Li-metal oxidation |
| ROCO₂Li (semi-carbonate) | O 1s | 533, C 1s 289 | EC reductive decomposition |
| Li 1s | — | 55–56 | All Li species (hard to distinguish) |
| P 2p (LiPF₆) | — | 137 | 6+ oxidation state |
| P 2p (Li_xPF_yO_z) | — | 134 | Decomposition products |
| TM 2p (Mn, Co, Ni) | 2p₃/₂ | 640–860 | Multiplets per oxidation state |

What this table implies, diagnostically: a stronger F 1s 685 eV peak = more LiF formation = HF attack or FEC additive reduction product. A strong C 1s 290 eV peak indicates abundant Li₂CO₃, active EC reductive decomposition, or CO₂ adsorption. The O 1s 528 eV peak indicates surface oxidation of Li metal.

Quantitative reporting is usually in atomic % (sum of all detected elements = 100%) or as surface mol/m² for a specific species. RSF (relative sensitivity factor) is applied automatically.

## 7. Sample preparation and air-sensitive transfer

Battery samples (especially cycled anodes, Li metal, and cycled cathodes) undergo immediate surface changes upon air exposure. Standard procedure:
- Disassemble the cell in a glovebox (< 1 ppm O₂/H₂O).
- Wash residual LiPF₆/EC with a carbonate-free solvent like DMC (briefly, so as not to dissolve SEI).
- Connect directly to the XPS chamber via an Ar-atmosphere vacuum transfer vessel.
- Recommended exposure < 30 s; over 1 minute, LiF will form artificially on the surface.

X-ray damage must also be watched. SEI carbonates are decomposed by X-rays; measuring the same spot for an hour artificially reduces the C–O content. Reduce dose by short measurements, moving spots, and using a monochromator.

## References

- Briggs, D., Grant, J. T. *Practical Surface Analysis: Auger and X-ray Photoelectron Spectroscopy* (Wiley, 2003) — standard XPS practical handbook.
- Moulder, J. F. et al. *Handbook of X-ray Photoelectron Spectroscopy* (Physical Electronics, 1995) — standard BE database.
- Andersson, A. M., Edström, K. *Journal of The Electrochemical Society* 148 (2001) A1100 — standard XPS analysis of graphite SEI.
- Edström, K., Herstedt, M., Abraham, D. P. *Journal of Power Sources* 153 (2006) 380–384 — XPS analysis of cathode CEI.
- Eshetu, G. G. et al. *Nature Communications* 12 (2021) 5459 — review of XPS-based quantification of SEI decomposition products.
