# Mechanochemistry in Batteries

## 1. Overview

Lithium intercalation/deintercalation is essentially **inserting or extracting a guest ion in a host lattice**. Lattice constants change and as a result active-material particles swell or shrink. This single fact explains more than half of battery degradation — the feedback loop of volume change → stress → fracture → fresh surface → SEI re-formation → LLI / resistance increase.

Mechanical and electrochemical degradation cannot be treated separately. A fracture is not merely a particle breaking; it immediately exposes a fresh electrode surface and induces [SEI re-formation](./03_interface.md).

## 2. Volume change

The volume change of an active material varies dramatically with material type and chemistry. Layered-oxide cathodes are relatively small, alloy-type anodes are very large. Representative values are below.

| Material | Reaction type | Volume change |
|------|----------|-------------|
| Graphite | Intercalation | ~10% |
| LiNi$_x$Mn$_y$Co$_z$O₂ (NMC) | Intercalation | 2–5% (composition-dependent) |
| LiFePO₄ | Two-phase reaction | ~6.5% |
| Si (lithiation) | Alloy reaction | ~280–300% |
| LiCoO₂ | Intercalation | ~2% |

In the dilute solid-solution limit, the composition dependence of the lattice constant is approximated by Vegard's law:

$$a(x) = a_0 + \beta x$$

Here $x$ is Li content, $a_0$ the reference constant, and $\beta$ the lattice expansion rate. Real NMC and LCO show anisotropy in which the c-axis and a-axis change with opposite signs, so for single-crystal particles the stress distribution depends strongly on crystal orientation. In polycrystalline particles, stress concentrates at the grain boundaries, which become the initiation sites of intergranular fracture.

## 3. Stress-coupled diffusion

Volume change is not merely a result; it directly affects diffusion itself. When Li enters the surface of a particle first, the surface tries to expand but the interior holds it back, putting **the surface in compression and the interior in tension** (or vice versa). Compressive stress suppresses additional Li insertion, and tensile stress promotes it. In other words, stress couples directly into the chemical potential.

> **Related concept: Larché-Cahn chemical potential**
> Ordinary diffusion in the absence of external stress is driven solely by concentration gradients ($\mu = \mu_0 + RT\ln a$). However, if a stress field $\sigma$ exists in the crystal, an ion entering a site must do additional work against the volume change $\Omega$ (partial molar volume), so a $\sigma\Omega$ term is added to the chemical potential: $\mu = \mu_0 + RT\ln a + \sigma\Omega$.
> Sign convention: tensile stress $\sigma > 0$ stretches the lattice, making it easier for ions to enter → ions flow into tensile regions. The opposite holds in compressive regions.
> Fick's law extends to the generalized form driven by chemical-potential gradients: $\mathbf{J} = -\frac{Dc}{RT}\nabla\mu$. In the limit of pure concentration gradient this reduces to the usual $\mathbf{J} = -D\nabla c$.
> Implications: in highly stressed systems like Si anodes, even at the same concentration gradient the diffusion direction and rate change significantly with stress distribution, and the stress profile of a core-shell structure conversely deforms the concentration profile.

The Christensen-Newman model solves this coupling for spherical particles and shows that the larger the **galvanostatic number** ($\text{Ga} = IR/(DFc)$), the larger both the concentration gradient and the stress become. Large particles, high C-rates, and low $D$ are a shortcut to fracture.

## 4. Particle fracture

When stress exceeds a critical value, fractures nucleate and propagate. The Griffith criterion gives the relation between surface energy $\gamma$ and the critical defect size $a_c$:

$$\sigma_c = \sqrt{\frac{2 E \gamma}{\pi a_c}}$$

Here $E$ is Young's modulus. The intuition is simple: the larger the defect, the smaller the stress needed to initiate fracture. This is why grain boundaries act as the weakest defect in polycrystalline NMC particles.

Fracture types:
- **Intragranular**: cracks inside a single crystal or large grain. Observed by SEM in single-crystal NMC.
- **Intergranular**: cracks between grains in polycrystalline particles. The dominant degradation mode in polycrystalline NMC.
- **Fatigue**: cumulative crack growth even below the critical stress under repeated cycling.

The real problem with fractures is that **the moment a fresh surface is exposed, the SEI re-forms and produces additional LLI**. This feedback loop is one of the main mechanisms that produces the accelerated region (knee point) of cycle aging curves.

## 5. Measurement / observation techniques

Mechanical behavior is not directly visible in electrochemical data alone. The following techniques must be combined.

- **In-situ XRD**: tracks the SOC dependence of lattice constants in real time. Anisotropic strain can be quantified. With a synchrotron, time resolution down to ~1 s.
- **Dilatometry**: externally measures cell thickness/diameter changes. Captures both macroscopic swelling and gas evolution but they are difficult to separate.
- **Cross-section SEM/FIB**: post-mortem direct observation of fracture morphology in particle cross-sections. Comparison of single-crystal vs polycrystalline, distinction of intergranular vs intragranular cracks.
- **Nanoindentation**: directly measures the Young's modulus and hardness of the active material. The SOC dependence can also be measured.
- **Acoustic emission**: detects elastic waves emitted during fracture propagation. A non-destructive method that pinpoints when fractures occur during cycling.

These techniques only become meaningful when combined with electrochemical data (especially [V-Q curve hysteresis](./01_voltage_curves.md), [GITT $D$](./02_polarization.md)).

## References

- Christensen, J., Newman, J. *Journal of The Electrochemical Society* 153 (2006) A1019 — stress-diffusion coupled model.
- Mukhopadhyay, A., Sheldon, B. W. *Progress in Materials Science* 63 (2014) 58–116 — comprehensive review of battery mechanochemistry.
- Xu, R. et al. *Journal of The Electrochemical Society* 166 (2019) A3456 — NMC intergranular fracture mechanism.
- Beaulieu, L. Y. et al. *Journal of The Electrochemical Society* 150 (2003) A1457 — in-situ observation of Si volume change.
