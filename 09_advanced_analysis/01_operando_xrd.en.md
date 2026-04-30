# Operando XRD Cell Design and Data Workflow

## 1. Overview

XRD is one of the most direct tools for tracking cathode and anode active-material behavior because it observes lattice parameters and crystal structure directly. However, measuring a cell while it is operating requires cell design, time resolution, and data treatment procedures that are very different from ordinary powder XRD. While section 06 [`07_operando.md`](../06_battery_operation/07_operando.md) explains what XRD observes, this note focuses on **how to build the cell, where to measure it, and how to process the data**.

Operando X-ray diffraction must satisfy three conditions at the same time: (i) an electrochemically normal cell, (ii) an optical path that lets the beam reach the active material and lets the diffracted beam exit toward the detector, and (iii) enough time resolution that the SOC does not change too much during one diffraction pattern.

## 2. Cell Design: Three Standard Formats

The three most common cell formats have different trade-offs.

**Be-window coin cell (modified CR2032):** A 5-8 mm hole is drilled in one cap of a standard CR2032 coin cell and sealed with beryllium foil. Be has very low X-ray absorption because its atomic number is 4, so even laboratory Cu K-alpha radiation can pass through. The advantage is that the electrochemical behavior is close to a real coin cell. The disadvantages are Be toxicity/cost and the fact that diffraction from the inner active material can be dominated by the surface-side electrode.

**Capillary cell:** A small cylindrical cell made by packing cathode, separator, and anode into a 0.5-1.5 mm boron-glass or quartz capillary. The whole capillary is exposed to the beam and can be rotated, so clean powder-averaged patterns are obtained. It is often mounted in a Swagelok-type module. The drawback is the very small active mass, usually below 1 mg, which makes practical current operation difficult.

**Kapton pouch cell:** A pouch cell with a Kapton (polyimide) X-ray window instead of an aluminum-laminated pouch. The larger pouch area makes it closer to practical cells, while only the beam path is exposed through Kapton. This format is standard in synchrotron transmission mode and can also support area-resolved measurements.

| Cell format | Source compatibility | Active material amount | Advantage | Limitation |
|---|---|---|---|---|
| Be-window coin | lab Cu K-alpha possible, synchrotron OK | 5-20 mg | Closest to a standard cell | Be toxicity, surface-dominant signal |
| Capillary | synchrotron strongly preferred | 0.5-2 mg | Clean powder average | Small area, low current |
| Kapton pouch | synchrotron transmission | 50-500 mg | Close to real cells, area-resolved possible | Kapton diffraction background |

## 3. Lab vs Synchrotron: Time Resolution vs Flux

The selection rule is clear. If time resolution is essential, use a synchrotron. If beamtime is unavailable or several hours per SOC point are acceptable, use a laboratory source.

> **Related concept: Trade-off between time resolution and diffraction intensity**
> The exposure time required for one diffraction pattern scales as $t \propto N_{\text{count}} / I_0$. Here $I_0$ is the incident photon flux. A laboratory Cu K-alpha tube gives roughly $\sim 10^8\ \text{ph/s/mm}^2$, whereas a third-generation synchrotron beamline reaches $10^{12-14}\ \text{ph/s/mm}^2$, a difference of four to six orders of magnitude.
> A measurement that takes 30 minutes per SOC point in the lab can finish in less than one second at a synchrotron. Resolving a C/2 cycle, which lasts two hours, into 100 points requires 72 seconds per point, which is effectively synchrotron territory.
> The caveat is that synchrotron flux is so strong that **beam damage** can occur.

A typical workflow is to first check slow cycling at C/20 or below with laboratory XRD, then apply for synchrotron beamtime once the mechanism is clear and the goal is to capture dynamics at 1C, 5C, or faster.

## 4. Detector: Mythen, Pilatus, Eiger

Detector choice controls the achievable time resolution.

- **Mythen** (Dectris): 1D strip detector with readout below 1 ms. It is the fastest choice when only a 1D diffraction pattern (2 theta vs intensity) is required.
- **Pilatus** (Dectris): 2D hybrid photon-counting pixel detector. It captures full Debye-Scherrer rings and therefore supports texture analysis. Typical exposure times are above 100 microseconds.
- **Eiger** (Dectris): Successor to Pilatus, with smaller pixels and faster readout. It is used for fast cycling above about 5C.

If a coin or capillary cell is not rotated, reflection statistics can be poor. In that case, a 2D detector plus azimuthal integration is the safer choice. A rotating capillary can often be measured well with a 1D Mythen detector.

## 5. Data Treatment Workflow

The workflow is raw 2D image -> 1D pattern -> stacking along time/SOC -> quantitative analysis.

1. **Azimuthal integration** (2D -> 1D): After detector calibration with a LaB$_6$ or CeO$_2$ standard, integrate the diffraction rings using tools such as pyFAI or DIOPTAS.
2. **Background/Kapton subtraction:** For Kapton pouch cells, fit and subtract the broad Kapton halo. For capillaries, subtract an empty-capillary measurement.
3. **Stacked visualization:**
   - **Waterfall plot:** Stack 2 theta-intensity curves along SOC or time. Peak movement becomes immediately visible.
   - **Contour map:** Map intensity as color on a 2 theta-SOC plane. This is better for quantitative comparison.
4. **Lattice-parameter fitting:** Extract lattice parameters $a, c$ or unit-cell volume $V$ at each SOC by Le Bail or Pawley refinement using FullProf or GSAS-II. Report the result as SOC vs $V$, SOC vs $c/a$, and related curves.

For layered NMC, the (003) peak directly reflects c-axis spacing, so tracking that single peak often captures the key behavior.

$$c \propto \frac{\lambda}{2 \sin\theta_{(003)}}$$

Here $\lambda$ is the X-ray wavelength and $\theta_{(003)}$ is half of the diffraction angle of the (003) peak. As SOC increases and Li$^+$ is extracted, the c-axis of layered cathodes first expands because of interlayer electrostatic repulsion during the O3 -> O3' region, then contracts sharply at high SOC during the O3 -> H3 transition when most Li has been removed.

## 6. Beam Damage

At synchrotron flux, the X-ray beam itself can modify the sample. Radical decomposition of carbonate electrolyte and local reduction of cathode active material have both been reported.

Mitigation strategies:

- **Beam attenuator:** Intentionally lower flux with Al foil or similar attenuators, often to 10-50%.
- **Beam shutter and pulsed exposure:** Open the beam only during measurement and close it during cycling.
- **Spot movement:** Slightly move the cell position for each measurement to avoid accumulating dose at one spot.
- **Dose sanity check:** Compare accelerated synchrotron results with slow laboratory cycling and verify that the same lattice behavior appears.

## 7. Practical Checklist

- Choose the cell type: Be, capillary, or Kapton.
- Choose the source: laboratory for slow cycling, synchrotron for fast dynamics.
- Bring reference standards such as LaB$_6$ or Si when applying for beamtime.
- Confirm sample mounting jigs and potentiostat wiring at the beamline.
- Back up raw data, calibration files, dark images, and flat-field images together.
- Mark and subtract Kapton or Be diffraction lines during analysis.
- Synchronize electrochemical SOC and lattice parameters on the same time axis.

## References

- Borkiewicz, O. J. et al. *Journal of Applied Crystallography* 45 (2012) 1261 — standard synchrotron operando XRD cell design.
- Liu, H. et al. *Journal of The Electrochemical Society* 162 (2015) A2718 — NMC c-axis dynamics observed by operando XRD.
- Märker, K., Reeves, P. J., Xu, C., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 31 (2019) 2545 — synchrotron XRD analysis of Li-rich layered materials.
- Yu, X., Manthiram, A. *Energy & Environmental Science* 11 (2018) 527 — report on beam damage in operando XRD.
