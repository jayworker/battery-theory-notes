# Raman and FTIR (Vibrational Spectroscopy)

## 1. Overview

Raman and FTIR (Fourier-transform infrared) are vibrational spectroscopy techniques that identify chemical species by measuring the vibrational energies of bonds. Their selection rules are complementary, so in the lab they are almost always used together — Raman is sensitive to vibrations with large polarizability changes (symmetric vibrations, M–O bonds, etc.), while IR is sensitive to vibrations with large dipole-moment changes (asymmetric vibrations, C=O, C–O, etc.).

Their most frequent uses in batteries are clear: disorder quantification of the **graphite anode** (Raman D/G band), crystalline-phase identification of the **cathode** (M–O stretching), and identification of **electrolyte** decomposition products (ROCO₂Li, Li₂CO₃, etc.). This section covers the principles of both techniques, key vibrational modes, experimental cautions, and battery applications.

## 2. Raman scattering principle

Raman irradiates the sample with a single-wavelength laser (typically 532, 633, or 785 nm) and measures the wavelength shift of the inelastically scattered light. The incident photon exchanges energy with a vibrational mode of the sample, producing a Stokes (energy loss, vibrational excitation) or anti-Stokes (energy gain, vibrational de-excitation) shift, and that shift ($\Delta\tilde{\nu}$, cm⁻¹) is the vibrational frequency itself.

Intuition: a picture of "light striking a molecule, gaining or losing a small amount of energy through vibration, then scattering away." The scattering cross-section is very small (~10⁻³⁰ cm²), so the signal is weaker than absorption spectroscopy, but it is relatively tolerant of water/air and the sample can be measured as is.

Selection rule: the polarizability tensor $\alpha$ must change with the vibrational coordinate $Q$ for a mode to be Raman active ($\partial\alpha/\partial Q \neq 0$). Strongly active for symmetric molecules / symmetric vibrations. In crystals, only zone-center vibrations at the Brillouin zone center ($\Gamma$ point) appear in first-order Raman (limited to large crystals).

Resolution: typical Raman is 1–4 cm⁻¹; spatial resolution is diffraction-limited at ~1 µm. Confocal mode adds depth resolution.

## 3. Graphite D/G band — disorder quantification

The Raman spectrum of graphite/graphene anodes is defined by two key peaks. The **G band ~1580 cm⁻¹** is the in-plane $E_{2g}$ vibration of sp² carbon (C=C bond stretching), an intrinsic mode of crystalline graphite. The **D band ~1350 cm⁻¹** is a disorder-induced mode that is activated only at defects and edges and is barely visible in perfectly crystalline graphite.

Intuition: the D band is "the band that vanishes when there are no defects." Their intensity ratio $I_D/I_G$ is therefore the most universal index for quantifying graphite disorder.

$$\frac{I_D}{I_G} \uparrow \;\Leftrightarrow\; \text{disorder} \uparrow$$

Tuinstra–Koenig relation: in-plane crystallite size $L_a$ (nm) and $I_D/I_G \propto 1/L_a$. Typical fresh graphite anodes have $I_D/I_G \approx 0.1–0.3$, increasing to 0.5–1.0 or higher after cycling due to SEI formation, exfoliation, and surface damage. In addition, the shape of the **2D band ~2700 cm⁻¹** (second-order of D) indicates the number of graphite layers.

Laser-wavelength dependence: the absolute value of $I_D/I_G$ differs between 532 and 785 nm, so comparisons must be made at the same wavelength. Generally, 532 nm is the standard.

## 4. Cathode M–O stretching modes

The Raman of layered-oxide cathodes shows two groups of modes. For the $R\bar{3}m$ structure of LiCoO₂ and NMC, theory predicts two Raman-active modes — $A_{1g}$ (M–O symmetric stretching, ~600 cm⁻¹) and $E_g$ (M–O bending, ~480 cm⁻¹). The two peak positions and widths are sensitive to changes in crystallinity, cation mixing, and oxidation state.

Representative values:
- **LiCoO₂**: $A_{1g}$ ~595 cm⁻¹, $E_g$ ~485 cm⁻¹
- **NMC811**: $A_{1g}$ ~555 cm⁻¹, $E_g$ ~480 cm⁻¹ (richer in Ni → lower frequency)
- **LiMn₂O₄ (spinel)**: $A_{1g}$ ~625 cm⁻¹ (Mn–O₆ octahedron symmetric stretching)
- **LiFePO₄**: ~950 cm⁻¹ (PO₄³⁻ symmetric stretching, very sharp)

Battery diagnostic uses: when NMC undergoes a layered → spinel transition after cycling, a new spinel mode appears around 625 cm⁻¹. An increase in cation mixing manifests as broadening of $A_{1g}$. Operando Raman can track lattice redox during charge/discharge.

## 5. Avoiding laser damage

Although Raman is nominally non-destructive, battery samples are surprisingly susceptible to damage. Cathode oxides absorb strongly, so local heating may induce Mn³⁺ disproportionation or oxygen release. SEI/carbonates are photodegraded.

Standard avoidance principles:
- **Limit laser power**: cathode < 1 mW, SEI/organics < 0.1 mW (at the focal spot).
- **Shorten exposure**: 5–30 s repeated multiple times is safer than a single 5-min exposure.
- **Choose laser wavelength**: 532 nm absorbs strongly in the visible → heating. 785 nm absorbs less, causing less damage but giving a weaker signal.
- **Sample rotation (rotating stage)**: prevents pulses from accumulating on the same spot.
- **Identify already damaged spots**: compare the first and last spectra after measurement — a change in D/G ratio or peak shift indicates damage.

Verification: measure a dummy cathode for a few seconds at varying powers to find the damage threshold. A good power setting is one with acceptable noise that leaves no optical discoloration of the sample after measurement.

## 6. FTIR — Transmission vs ATR

FTIR passes an IR beam from the source through the sample and measures its absorption pattern with a Michelson interferometer; the spectrum is obtained by Fourier transform. Vibrational modes whose dipole moment changes are absorbing; polarizability changes are inactive — the exact complement to Raman.

> **Related concept: ATR vs Transmission FTIR**
> Transmission FTIR puts the sample into a KBr pellet or a thin film and passes IR through it. Quantification is good but sample preparation is labor-intensive and uniform thickness is required.
> ATR (attenuated total reflectance) places the sample directly on a diamond or ZnSe crystal; the evanescent wave inside the crystal probes ~1 µm of the sample surface. Powders and liquids can be measured as is.
> Penetration depth $d_p = \lambda/[2\pi n_1\sqrt{\sin^2\theta - (n_2/n_1)^2}]$ depends on wavelength and angle, typically 0.5–2 µm.
> Assumptions/limitations: the sample must be in close contact with the ATR crystal, and strongly absorbing regions cause baseline distortion (ATR correction required).

Why ATR has become the battery standard: cycled electrodes can be measured rapidly as is (peeled off as powder). SEI analysis is then cross-checked with [XPS](./04_xps.md).

## 7. Electrolyte decomposition products — IR standard peaks

Reductive/oxidative decomposition of carbonate solvents such as EC, DEC, EMC produces characteristic species, and their IR absorption peaks form the SEI fingerprint.

| Decomposition product | Main IR peak (cm⁻¹) | Comment |
|----------|---------------------|--------|
| **ROCO₂Li (alkyl semi-carbonate)** | ~1650 (C=O), **~1300 (C–O)** | Primary product of EC reductive decomposition |
| **Li₂CO₃** | **~1430**, ~870 | Further reduction with EC/CO₂, atmospheric adsorption |
| **LiOH** | ~3650 (sharp O–H) | Surface hydroxide on Li |
| Li_xPF_yO_z (LiPF₆ decomposition) | ~840 (P–F), ~1050 (P=O) | Accompanied by HF byproduct |
| LiF | IR inactive | XPS only (685 eV) |
| EC (intact) | 1800 (C=O), 1770 | Reference |
| ROLi (alkoxide) | 1080 (C–O–Li) | Deeper reduction stage |
| C–H stretching (aliphatic) | 2800–3000 | Generic hydrocarbon |

The two reference peaks ROCO₂Li 1300 cm⁻¹ and Li₂CO₃ 1430 cm⁻¹ in the table above are the most important in SEI analysis. Strong ROCO₂Li indicates an organic-rich SEI (less stable), while strong Li₂CO₃ indicates progress toward an inorganic-transitioned SEI (usually more stable).

After ATR measurement, the baseline-subtraction → peak-deconvolution procedure resembles XPS. IR peaks tend to be broader and to overlap, however, so quantification is relative; absolute quantification is hard (the absorption coefficient ε differs from sample to sample).

## 8. Operando applications

In-situ Raman is decisive for tracking cathode redox. With a cell setup using a Be or sapphire window during charge/discharge, a time series of spectra at a specific spot shows directly how the $A_{1g}$/$E_g$ positions and intensities evolve as a function of SOC. Standard applications include tracking the layered → H1-H2-H3 phase transitions of NMC and quantifying the LiFePO₄ ↔ FePO₄ two-phase coexistence in LFP.

In-situ FTIR-ATR is used to track first-cycle SEI formation — peaks of ROCO₂Li at 1650/1300 cm⁻¹ appear immediately after the start of charge, then a gradual transition to Li₂CO₃ at 1430 cm⁻¹ is observed over minutes.

## References

- Smith, B. C. *Fundamentals of Fourier Transform Infrared Spectroscopy* (2nd ed., CRC, 2011) — standard practical introduction to FTIR.
- Ferrari, A. C., Robertson, J. *Physical Review B* 61 (2000) 14095–14107 — Tuinstra–Koenig relation for the graphite D/G band.
- Julien, C. M. et al. *Materials* 11 (2018) 1761 — comprehensive Raman fingerprints of cathode oxides.
- Aurbach, D. *Journal of Power Sources* 89 (2000) 206–218 — IR/Raman-based identification of SEI decomposition products.
- Tuinstra, F., Koenig, J. L. *Journal of Chemical Physics* 53 (1970) 1126–1130 — original paper on the D/G band.
