# TEM (Transmission Electron Microscopy)

## 1. Overview

TEM answers questions that SEM cannot — can the lattice fringes themselves be seen, where do single atomic columns sit, and how is the oxidation state distributed at the nm scale? The sample is thinned below 100 nm, and 200–300 kV electrons pass through it; the scattered beam is then either imaged or analyzed by spectroscopy.

The decisive places for TEM in battery research are clear: thickness of the surface reconstruction layer of cathodes (rock-salt shell), direct observation of the cathode-electrolyte interphase (CEI), single-particle crack propagation, the cation-mixing distribution inside NMC primary particles, and lithiation fronts in Si anodes. This section covers TEM vs STEM, HRTEM lattice fringes, STEM-HAADF, SAED, EELS, and sample preparation.

## 2. TEM vs STEM

**TEM (conventional)** uses parallel-beam illumination of the entire sample at once; the objective lens images the transmitted beam to form a single picture. It is fast and intuitive, but chromatic/spherical aberration limits resolution. **STEM (scanning TEM)** narrows the beam to a sub-nm probe and scans the sample point by point, with detectors arranged at different scattering angles to receive the various signals at each point.

Intuition: TEM is "a single picture" like an optical microscope, while STEM is "a picture made by point-by-point scanning" like SEM. STEM combines naturally with EDS and EELS (a spectrum can be measured at every point) and resolution control is easier.

STEM modes are distinguished by detector type.
- **BF (bright field)**: only the directly transmitted beam is detected; contrast is similar to conventional TEM.
- **ADF (annular dark field)**: annular detector at scattering angles ~10–50 mrad; strong diffraction contrast.
- **HAADF (high-angle ADF)**: ~50–200 mrad; only Rutherford-like scattering is selected, giving strong Z-contrast — heavier elements appear brighter.

## 3. HRTEM Lattice Fringe

HRTEM (high-resolution TEM) is the mode that directly images the lattice planes of the sample. The electron wave propagates through the sample, its phase being modulated by the lattice; that phase modulation passes through the objective lens and is converted into amplitude contrast (phase contrast). The result is lattice fringes corresponding to the spacing of atomic rows.

> **Related concept: phase contrast and defocus in HRTEM**
> Phase contrast does not show atomic positions exactly; it depends on the defocus value and the spherical aberration $C_s$ — contrast is maximized at the Scherzer defocus ($\Delta f \approx -1.2\sqrt{C_s\lambda}$).
> Therefore, the bright spots in lattice fringes coincide exactly with atomic positions only at specific defocus conditions; direct interpretation of a generic HRTEM image is restricted to simple $d$-spacing measurement.
> The exact atomic arrangement is matched by HRTEM simulation (multislice) or imaged with STEM-HAADF.
> At an accelerating voltage of 200 kV, $\lambda = 2.51$ pm, and $C_s$-corrected TEM reaches < 1 Å resolution.

Battery applications: measuring the surface rock-salt-layer thickness of NMC (typically 2–10 nm), LiCoO₂ surface densification, and confirming layered → spinel transitions from changes in lattice fringes.

The d-spacing of lattice fringes is measured by FFT (fast Fourier transform). The measured d value is compared with standard values such as (003) = 4.74 Å, (104) = 2.04 Å to assign Miller indices.

## 4. STEM-HAADF — Z-contrast

STEM-HAADF uses a high-angle annular detector to capture nearly pure Z²-dependent scattering. The resulting intensity scales as $I \propto Z^{1.7-2}$, a strong function of atomic number → heavy elements appear overwhelmingly brighter.

Intuition: the HAADF image brightness itself is first-order information that "there is a heavy atom here." In the NMC layered structure, Ni/Co/Mn columns appear bright while Li columns are nearly black. When cation mixing occurs and Ni moves into Li sites, faint bright spots appear at previously dark sites — the most direct evidence for quantifying cation mixing at the single-atom-site level.

Aberration-corrected STEM-HAADF reaches 0.5–0.8 Å resolution and resolves single atomic columns. Studies that directly observed reconstruction of the first 1–2 atomic layers of the NMC surface (Lin, Yu, et al.) provided decisive evidence for the surface-aging mechanism of cathodes.

## 5. SAED (selected-area electron diffraction)

Selected-area electron diffraction is a technique for obtaining diffraction patterns from a specific region of the sample in TEM mode. A parallel beam illuminates the sample, and the pattern is imaged at the focal plane (diffraction plane), giving Bragg-diffraction spots like those of XRD. Because the measurement comes from a single particle (or a few-µm region), single-crystal particles give sharp spot patterns and polycrystalline regions give ring patterns.

Intuitively, while XRD gives powder-averaged information, SAED is single-particle crystallography. It is decisive when inter-particle inhomogeneity (e.g., surface vs bulk crystal-structure differences) is hard to capture by other techniques.

Battery applications: identifying the spinel/rock-salt layer on the NMC surface (additional (111) spinel reflections), formation of amorphous Li_xSi during Si lithiation (diffuse halo), and confirming crystal orientation in single-crystal NMC. Streaking patterns suggest stacking faults or nanostructure.

## 6. EELS — oxidation state and bonding environment

EELS (electron energy-loss spectroscopy) measures the energy-loss distribution of electrons that have passed through the sample. In inelastic scattering, electrons lose energy by exciting electrons of the sample atoms, and the loss spectrum encodes the electronic structure of the sample.

The spectrum has different meaning by region.
- **Zero-loss peak (ZLP)**: 0 eV, electrons that experienced only elastic scattering. Used for sample-thickness measurement ($t/\lambda = \ln(I_t/I_0)$).
- **Low-loss region (1–50 eV)**: plasmon oscillations and valence-electron information. Thickness measurement and simple phase mapping.
- **Core-loss edges (>50 eV)**: inner-shell electron excitations. Element identification and oxidation-state quantification.

The fine structure of core-loss (ELNES) quantifies the oxidation state. **Mn $L_{2,3}$ edge**: the $L_3$ peak chemically shifts at about 640 eV for Mn²⁺, 641 eV for Mn³⁺, and 642 eV for Mn⁴⁺. The **O $K$-edge** pre-peak intensity reflects TM 3d–O 2p hybridization, i.e., covalency information. After cycling, Ni³⁺ → Ni²⁺ reduction at the NMC surface is directly visible by EELS line scans (with nm-scale radial resolution).

Resolution: typical STEM-EELS is ~1 eV; monochromated TEM reaches ~30 meV. Mapping uses line scans (1D) or 2D spectrum imaging to extract oxidation-state distributions at nm resolution.

## 7. Nano-EDS and sample preparation

STEM-EDS captures elemental distributions at the level of single particles or sub-grain regions with an nm-sized beam. Compared to SEM-EDS (interaction volume ~1 µm), the resolution of 1–2 nm is overwhelmingly better. It is decisive for quantifying Al, Zr coating thicknesses on cathode surfaces, the Ni/Co/Mn concentration distribution inside NMC primary particles (especially concentration-gradient cathodes), and CEI thickness/composition.

> **Related concept: TEM sample thickness and spectroscopic quantification**
> Both EDS and EELS give meaningful quantification only when the sample is thin enough — too thick a sample distorts the spectrum through plural scattering.
> Empirical rule: when $t < \lambda$ (mean free path, ~100 nm at 100 kV, ~150 nm at 200 kV), the single-scattering assumption is valid.
> If the plasmon-to-ZLP intensity ratio $I_p/I_0$ is below 0.3 the sample is thin; above 1, too thick.
> Therefore the goal of TEM sample prep is to keep the analysis-region thickness < 100 nm.

**FIB lamella prep**: the standard method of cutting a site-specific lamella (typically 5×10 µm, < 100 nm thick) with Ga⁺ FIB and lifting it onto a TEM grid. Site-specificity is decisive because individual particles after cycling can be selected. Drawbacks: Ga implantation, beam-induced amorphization. Final thinning is performed at low voltage (≤ 5 kV).

**Ar ion mill (PIPS, Gatan)**: a broad Ar⁺ beam slowly thins the surface. Damage is low, but it lacks site specificity. Cryo-PIPS is essential for air- or temperature-sensitive samples.

**Cryo-TEM**: a liquid-nitrogen cooling holder maintains the sample at –170 °C. It is decisive for direct observation of beam-sensitive, hydrocarbon-rich layers like SEI, and has become the standard technique for Li dendrite/SEI studies since 2017 (work by Cui, Meng, et al.).

Beam damage is always a concern. Cathode oxides are relatively robust, but carbonate SEI, polymer binders, and residual liquid-electrolyte traces decompose quickly under the e-beam. Limit dose to < 100 e/Å² and use low-dose imaging modes.

## References

- Williams, D. B., Carter, C. B. *Transmission Electron Microscopy* (2nd ed., Springer, 2009) — comprehensive standard textbook for TEM/STEM/EELS.
- Lin, F. et al. *Nature Communications* 5 (2014) 3529 — direct observation of NMC surface reconstruction by STEM-EELS.
- Yu, X. et al. *Advanced Energy Materials* 4 (2014) 1300950 — quantification of cation mixing at single atom sites by STEM-HAADF.
- Li, Y. et al. *Science* 358 (2017) 506–510 — observation of SEI/Li dendrite nanostructure by cryo-TEM.
- Egerton, R. F. *Electron Energy-Loss Spectroscopy in the Electron Microscope* (3rd ed., Springer, 2011) — standard EELS reference.
