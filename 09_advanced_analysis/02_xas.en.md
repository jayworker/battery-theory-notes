# XAS Workflow: XANES, EXAFS, and ATHENA/ARTEMIS

## 1. Overview

XAS (X-ray absorption spectroscopy) measures **oxidation state and local structure** through the absorption edge of a selected atom, usually a transition metal in a cathode. If section 06 [`07_operando.md`](../06_battery_operation/07_operando.md) gives the catalog-level rule "XANES = oxidation state, EXAFS = bond distance", this note covers the actual workflow: beamtime proposal, in-situ cell, raw $\mu(E)$, ATHENA/ARTEMIS analysis, and reporting fitted results.

The strength of XAS is that it is element-selective, local-structure sensitive, and compatible with operando measurements. The weakness is that a synchrotron is practically mandatory, and one good dataset typically requires two to four days of beamtime.

## 2. XANES: Edge Position and Pre-edge Features

XANES (X-ray Absorption Near Edge Structure) examines the region around the absorption edge, roughly edge $\pm 30$ eV. The core intuition is that the **absolute edge position tracks average oxidation state**. The edge is the photon energy that excites a 1s core electron into unoccupied states. As effective nuclear charge increases, meaning the oxidation state becomes higher, the binding energy increases and the edge shifts to higher energy.

Typical K-edge regions for battery cathode transition metals:

- **Mn K-edge:** 6539-6560 eV. Mn$^{2+}$/Mn$^{3+}$/Mn$^{4+}$ are separated by about 1-2 eV.
- **Co K-edge:** near 7720 eV. The Co$^{3+}$/Co$^{4+}$ change in LCO or NMC appears as a smaller shift.
- **Ni K-edge:** near 8333 eV. Ni$^{2+}$/Ni$^{3+}$/Ni$^{4+}$ shifts in NMC are large and clear.
- **Fe K-edge:** near 7112 eV. Used for Fe$^{2+}$/Fe$^{3+}$ in LFP.

Edge position is usually quantified by the half-edge criterion or by the inflection point, the maximum in the first derivative. The standard practice is to measure reference compounds such as Ni foil, NiO, and LiNiO$_2$ and build an oxidation-state calibration line.

> **Related concept: Pre-edge feature and four- vs six-coordination**
> A small feature often appears just before the edge, typically 8-15 eV below it. It is interpreted as a formally forbidden 1s -> 3d quadrupole transition or as 4p-3d hybridization. **Tetrahedral coordination** breaks inversion symmetry, strengthens 3d-4p mixing, and produces a larger pre-edge. **Octahedral coordination** preserves inversion symmetry, so the pre-edge is weaker.
> Application: During NMC surface reconstruction from layered to spinel to rock-salt structures, cation migration into tetrahedral sites can be detected as increased pre-edge intensity.

## 3. K-edge vs L-edge

| Edge | Energy | Measurement mode | Main information |
|---|---|---|---|
| TM K-edge | 5-10 keV hard X-ray | transmission/fluorescence | bulk oxidation state, EXAFS possible |
| TM L$_{2,3}$-edge | 600-1000 eV soft X-ray | TEY/TFY/RIXS | surface electronic structure below about 10 nm |
| O K-edge | 530 eV | TEY/TFY | O 2p holes and direct evidence of anionic redox |

The K-edge is strong because it is a dipole-allowed 1s -> np transition, and its post-edge oscillations are long enough for EXAFS fitting. The L-edge is very sensitive to oxidation state because it is a 2p -> 3d transition, but it requires a soft X-ray environment, usually high vacuum, which makes in-situ operation difficult. In practice, K-edge is used for bulk operando analysis, while L-edge is often used for ex-situ surface spectroscopy.

## 4. EXAFS: From $\chi(k)$ to $\chi(R)$

EXAFS (Extended X-ray Absorption Fine Structure) is the oscillatory signal 100-1000 eV above the edge. The oscillation comes from quantum interference between the outgoing photoelectron and waves scattered back from neighboring atoms. Fourier transformation converts it into a distance-space signal resembling a radial distribution function, allowing coordination number and bond distance in the first coordination shell to be extracted.

The core EXAFS equation is:

$$\chi(k) = \sum_j \frac{N_j S_0^2}{k R_j^2} f_j(k) e^{-2k^2 \sigma_j^2} e^{-2R_j/\lambda(k)} \sin[2k R_j + \phi_j(k)]$$

Here $k$ is the photoelectron wavevector, $N_j$ is the coordination number of shell $j$, $R_j$ is the average bond distance, $\sigma_j^2$ is the Debye-Waller factor, $f_j(k)$ is the scattering amplitude, $\phi_j(k)$ is the phase shift, and $S_0^2$ is the passive-electron amplitude reduction factor, commonly 0.7-0.95.

The intuition is simple: the period of $\sin(2kR + \phi)$ encodes bond distance, the amplitude encodes coordination number, and the exponential damping encodes thermal or structural disorder. After Fourier transformation from $\chi(k)$ to $\chi(R)$, each shell appears as a separated peak: the first peak is often TM-O, the second TM-TM, and so on.

## 5. ATHENA / ARTEMIS Workflow

ATHENA and ARTEMIS from the Demeter project by Bruce Ravel are de facto standard tools for EXAFS analysis.

**ATHENA steps:**

1. Import raw $\mu(E)$ data. For transmission, $\mu = \ln(I_0/I_t)$; for fluorescence, $\mu = I_f/I_0$.
2. **Energy calibration:** Align the inflection point of a reference foil of the same element to the standard value.
3. **Pre-edge subtraction:** Remove background by fitting the pre-edge region, often -150 to -30 eV, with a line or Victoreen function.
4. **Edge-step normalization:** Fit the post-edge with a polynomial and normalize the edge jump to 1.
5. **Background spline removal:** Use AUTOBK to remove $\mu_0$. The $R_{\text{bkg}}$ parameter, often around 1.0 Å, should be smaller than the first shell.
6. Extract $\chi(k)$, apply $k$-weighting ($k^1, k^2, k^3$), and Fourier transform to $\chi(R)$.

**ARTEMIS steps:**

1. Use FEFF to generate scattering paths from a structural model, such as an NMC R$\bar{3}$m structure.
2. Fit $N, R, \sigma^2, \Delta E_0$ for each path using nonlinear least squares.
3. Check goodness of fit using the $R$-factor, ideally below 0.02, and reduced $\chi^2_\nu$.
4. In many battery datasets, fitting only the first shell (TM-O) is robust. Longer-distance fitting requires multiple scattering and more constraints.

Typical NMC fitting results:

| Site | Fresh | After charge |
|---|---|---|
| TM-O ($N$) | 6.0 | 5.8-6.0 |
| TM-O ($R$, Å) | 1.94 | 1.88 |
| Debye-Waller $\sigma^2$ (Å$^2$) | 0.004 | 0.006 |

TM-O bond shortening is direct evidence of increased oxidation state because Ni$^{4+}$ is smaller than Ni$^{2+}$.

## 6. Beamtime Applications: Korea, Japan, Europe

| Facility | Example beamline | Strength |
|---|---|---|
| **PAL-XFEL/PAL-XFS** (Pohang) | 8C, 10C | hard X-ray XAS, rich in-situ cell experience |
| **SPring-8** (Japan) | BL01B1, BL14B2 | high-flux QEXAFS and time-resolved EXAFS |
| **ESRF** (France) | BM23, ID26 | high-resolution RIXS and dispersive XAS |
| **Diamond** (UK) | B18, I20 | integrated core-level and EXAFS measurements |
| **ALS** (USA) | 10.3.2, 4.0.2 | soft X-ray L/O edge, TEY/RIXS |

Application cycles are usually about six months. A proposal should include the sample system, measurement plan, time and energy ranges, SOC range, safety information for electrolyte/Li metal, and novelty.

## 7. In-situ XAS Cell

The geometry is similar to XRD, but window thickness matters more because X-ray absorption is stronger. Two standard formats are common:

- **Coin/pouch with Kapton window:** Cathode loading around 1-5 mg/cm$^2$ is often adjusted so that transmission gives $\mu d \sim 1$. If the edge step is too small, noise dominates; if too large, thickness effects distort the spectrum.
- **Fluorescence mode:** Used when the sample is too thick or the target concentration is low, such as Mn-doped NMC. Signal-to-background ratio is lower, so integration time increases.

Electrochemical operation is usually done by connecting a potentiostat at the beamline and cycling the cell while XAS spectra are acquired.

## 8. Practical Checklist

- Measure two references in advance: metal foil and oxide.
- Tune sample thickness to $\mu d \sim 1$; too-thick samples distort data.
- Confirm harmonic rejection mirror or monochromator detuning.
- Normalize the edge step in ATHENA to 1.0 ± 5%.
- Determine $S_0^2$ from a reference before fitting unknown samples.
- For multi-edge systems such as Ni/Co/Mn in NMC, reserve separate slots for each edge.
- Report oxidation state vs SOC and TM-O distance vs SOC together.

## References

- Yang, F., Wang, J. *Chemical Reviews* 117 (2017) 13123 — comprehensive review of synchrotron XAS for batteries.
- Ravel, B., Newville, M. *Journal of Synchrotron Radiation* 12 (2005) 537 — standard citation for ATHENA/ARTEMIS and the Demeter project.
- Newville, M. *Reviews in Mineralogy and Geochemistry* 78 (2014) 33 — lecture-note style EXAFS fundamentals.
- Yoon, W.-S. et al. *Journal of the American Chemical Society* 127 (2005) 17479 — layered cathode oxidation-state separation by operando XAS.
- Yang, W. et al. *Nature Energy* 3 (2018) 690 — direct XAS evidence for anionic redox.
