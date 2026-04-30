# XRD (X-ray Diffraction)

## 1. Overview

XRD is the standard starting point for analyzing crystalline materials. By measuring the spacing between crystal lattice planes (d-spacing) and the diffraction conditions set by the X-ray wavelength, one can quantify which crystalline phase exists, how much, and with what lattice parameter. From phase identification right after cathode synthesis, to crystal-structure changes after cycling, tracking solid-solution / two-phase boundaries, and following lattice changes during charge/discharge in operando — more than half of the crystallography questions in batteries are answered with XRD.

This section covers everything from the Bragg equation to Rietveld refinement, $I_{003}/I_{104}$ quantification of NMC, the Scherrer equation, and in-situ setups, all from a measurement-and-fitting perspective. The macroscopic interpretation of structure–performance relationships is treated in [operational theory](../06_battery_operation/06_degradation.md); this section concentrates on "how to obtain the pattern and how to fit it to extract numbers."

## 2. Bragg equation and peak indexing

When X-rays scatter from the parallel lattice planes of a crystal, constructive interference occurs only at angles where the path difference between waves scattered from adjacent planes equals an integer multiple of the wavelength. This is the origin of diffraction peaks, and the relation between the incident angle $\theta$, interplanar spacing $d$, and wavelength $\lambda$ is the Bragg equation.

Intuitively, every atom inside the crystal acts as part of a giant diffraction grating, and only at specific angles do scattered waves come into phase and reinforce each other strongly.

$$n\lambda = 2d\sin\theta$$

Each term: $n$ = diffraction order (usually first order only), $\lambda$ = X-ray wavelength (Cu K$\alpha$ = 1.5406 Å, Mo K$\alpha$ = 0.7107 Å), $d$ = interplanar spacing (Å), $\theta$ = Bragg angle. Peak indexing is the procedure of inverting d-spacings from measured $2\theta$ values, then assigning $(hkl)$ Miller indices according to the lattice parameters and the crystal system (e.g., hexagonal layered $R\bar{3}m$). For a hexagonal system, $1/d^2 = (4/3)(h^2+hk+k^2)/a^2 + l^2/c^2$.

Layered cathodes such as NMC and LCO have the $R\bar{3}m$ space group, with major peaks roughly at (003), (101), (006), (012), (104), (105), (107), (108), (110), and (113). (003) carries information about $c$-axis stacking, while (110) carries $ab$-plane information.

## 3. Rietveld refinement

Peak positions alone give only the lattice parameters. **Rietveld refinement** is the standard method that fits the entire measured diffraction pattern at once, simultaneously quantifying lattice parameters, atomic positions, occupancies, isotropic/anisotropic displacement parameters (thermal displacement, $B_{iso}$ or $U_{ij}$), particle size, and micro-strain.

> **Related concept: Rietveld objective function**
> Rietveld minimizes the weighted sum of squared differences between observed intensities $y_i^\text{obs}$ and calculated intensities $y_i^\text{calc}$: $\chi^2 = \sum_i w_i (y_i^\text{obs} - y_i^\text{calc})^2$, with $w_i = 1/y_i^\text{obs}$.
> The model intensity is $y_i^\text{calc} = s\sum_K L_K |F_K|^2 \phi(2\theta_i - 2\theta_K) P_K + y_i^\text{bkg}$, where $s$ = scale, $L_K$ = Lorentz–polarization factor, $F_K$ = structure factor, $\phi$ = peak shape (Pseudo-Voigt, etc.), $P_K$ = preferred-orientation correction.
> Assumptions: the peak shape is modeled appropriately, the background is well captured by polynomials or splines, and the sample microstructure is sufficiently described by the two parameters $D$ and $\varepsilon$.
> Intuition: a single pattern contains thousands of data points and only tens of model parameters. Information is sufficiently overdetermined, so nonlinear least squares converges stably.

Quality indicators: $R_p$ (profile residual), $R_{wp}$ (weighted profile), $R_{exp}$ (expected), goodness-of-fit $\chi^2 = (R_{wp}/R_{exp})^2$. Generally, $R_{wp} < 10\%$ and $\chi^2 < 4$ are good, while $\chi^2 \approx 1$ corresponds to a statistically perfect fit. Standard tools are GSAS-II, FullProf, and TOPAS.

## 4. Cation mixing — $I_{003}/I_{104}$ ratio

In layered oxides such as NMC and NCA, Li⁺ (ionic radius 0.76 Å) and Ni²⁺ (0.69 Å) are very similar in size, so the Li-site (3a) and TM-site (3b) become partially interchanged — cation mixing. The extent is rapidly quantified by the (003)/(104) peak intensity ratio in XRD.

Intuitively, the (003) plane probes the layered stacking direction, so it diffracts more strongly when Li and TM layers are well separated. Conversely, when cation mixing is severe the layer distinction blurs, the (003) intensity drops, and (104) becomes relatively larger.

$$\frac{I_{(003)}}{I_{(104)}} \gtrsim 1.2 \quad (\text{well-ordered layered})$$

Fresh NMC811 typically shows 1.4–1.6, dropping to around 1.0 after cycling. Below 1.2 is a first-line signal of severe cation mixing. More quantitatively, the standard is to refine the Ni occupancy at the 3a site ($\text{Ni}_\text{Li}$) directly in Rietveld refinement and report it in %. Fresh samples are typically 2–4%, increasing to 8–15% after aging.

When comparing peak intensities, one must use normalized intensities with Lorentz–polarization corrections and multiplicity already applied. Using raw peak heights distorts the numbers because of $K\alpha_1/K\alpha_2$ splitting, asymmetry, and preferred-orientation effects.

## 5. Scherrer equation — Crystallite size

Peak width (FWHM, full width at half maximum) depends on crystallite size ($D$) and micro-strain ($\varepsilon$). Smaller crystallites broaden the angular tolerance of the diffraction condition, broadening the peak. Large strain produces a distribution of d-spacings and yields the same effect.

The simplest estimator is the Scherrer equation, which neglects the strain contribution and ascribes all broadening to the size effect.

$$D = \frac{K\lambda}{\beta\cos\theta}$$

Each term: $K \approx 0.9$ (shape factor for spherical particles), $\lambda$ = X-ray wavelength (Å), $\beta$ = pure sample-contributed FWHM after subtracting the instrumental width (radians), $\theta$ = Bragg angle. Removing the instrument broadening with $\beta = \sqrt{\beta_\text{obs}^2 - \beta_\text{inst}^2}$ is essential.

Above 100 nm the Scherrer estimate becomes unreliable, so the upper limit is roughly 100–200 nm. For samples with significant strain, a Williamson–Hall plot ($\beta\cos\theta$ vs $\sin\theta$) separates size from strain. For higher precision, Rietveld's anisotropic size/strain model or the fundamental-parameter approach is used.

## 6. In-situ / operando XRD

In-situ XRD tracks lattice parameters, phase fractions, and the appearance of new phases in real time during charge/discharge. The cell setup is the key.

| Setup | Features | Use |
|------|------|------|
| **Be-window cell** | Be is X-ray transparent; 0.25 mm Be foil also serves as cathode current collector | Bragg–Brentano reflection mode, lab X-ray |
| **Capillary cell** (Debye–Scherrer) | Powder packed in a 0.5–1 mm diameter glass/Kapton capillary | Transmission mode, synchrotron recommended, good statistics |
| **Pouch cell (in operando)** | Real cell measured as is, X-rays through Al laminate | Synchrotron high energy (>20 keV) required |
| **AMPIX, coffin-cell** | Standardized in-situ cell modules | User-friendly, uniform cell pressure |

Caution: Be is prone to oxidation and is toxic; ventilation and careful handling are required. Kapton adds a slight background to Cu K$\alpha$ but is safe. The C-rate is usually C/20–C/10; faster than that, the lattice changes cannot keep up with the measurement time (measurement-induced smearing).

Data processing: from the time series of patterns, plot the lattice parameters $a$, $c$ as a function of SOC. The H1→M→H2→H3 phase transition of NMC811 appears as a steep contraction of the $c$-axis in the late charge regime (>4.2 V), and this magnitude (often >5%) is the direct cause of particle cracking.

## 7. Preferred-orientation correction

If the powder sample is not perfectly isotropic (random), certain crystal planes preferentially align and their peaks appear anomalously large or small (preferred orientation, texture). When measuring a layered cathode as a coated electrode, the (003) plane preferentially aligns parallel to the current collector, artificially amplifying the (003) peak.

The standard correction is the March–Dollase model: $P_K = (r^2\cos^2\alpha_K + \sin^2\alpha_K/r)^{-3/2}$, where $r$ is the preferred-orientation parameter ($r=1$ → isotropic), and $\alpha_K$ is the angle between the preferred direction and $\vec{H}_K$. Spherical-harmonics expansion is more general and precise.

Experimental mitigation: use a side-loading sample holder; briefly grind the sample in a mortar to break particle alignment (but watch out for damaging crystallinity); spin a capillary. Coated electrodes are inherently textured, so a preferred-orientation term must always be included in the Rietveld model.

## References

- Cullity, B. D., Stock, S. R. *Elements of X-ray Diffraction* (3rd ed., Pearson, 2001) — standard treatment of Bragg, indexing, and Scherrer.
- Young, R. A. (ed.) *The Rietveld Method* (Oxford, 1995) — collection of seminal Rietveld refinement papers.
- Toby, B. H., Von Dreele, R. B. *Journal of Applied Crystallography* 46 (2013) 544–549 — GSAS-II tool paper.
- Yin, S.-C. et al. *Chemistry of Materials* 18 (2006) 1901–1910 — quantification of $I_{003}/I_{104}$ and cation mixing in NMC.
- Yang, X.-Q. et al. *Advanced Materials* 27 (2015) 4304–4310 — in-situ XRD tracking of NMC charge–discharge lattice behavior.
