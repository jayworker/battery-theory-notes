# Cryo-EM Workflow: Plunge Freezing, Low Dose, and MotionCor2

## 1. Overview

Cryo-EM (cryogenic electron microscopy) was originally developed for structural biology, but it became a standard battery characterization method after the 2017 *Science* paper from the Cui group. The key procedure is to **plunge-freeze sensitive samples such as metallic Li, SEI, and dendrites in liquid N$_2$ slush, preserve their original state, and image them at atomic resolution under low-dose conditions**.

In-situ TEM in section 06 [`07_operando.md`](../06_battery_operation/07_operando.md) observes a cell while it operates. Cryo-EM freezes the cell state immediately after operation and observes it accurately. It is not truly operando, but it preserves samples far better than conventional post-mortem TEM and made atomic-resolution imaging of dendrites and SEI possible.

## 2. Why Cryo-EM: Beam Damage and Volatility

Metallic Li and SEI are nearly impossible to image by ordinary TEM for two reasons.

First, they are **volatile**. ROCO$_2$Li, polymeric SEI components, and residual electrolyte evaporate quickly under TEM vacuum, typically around $10^{-7}$ torr. Once the sample is loaded into vacuum, its original state can disappear.

Second, they suffer severe **beam damage**. At ordinary TEM dose, roughly $\sim 10^4$ e$^-$/Å$^2$, Li metal immediately undergoes melting or migration and SEI decomposes. A high-resolution image often requires 100-1000 e$^-$/Å$^2$, which is already one to two orders of magnitude too high for these materials at room temperature.

Cryo-EM solves this by rapid plunge freezing at $-196$ °C in liquid N$_2$ slush. Volatile species are immobilized, and low temperature suppresses beam-induced atomic motion, allowing a larger usable dose budget.

## 3. Plunge-Freezing Sample Preparation

A standard plunge-freezing workflow is:

1. **Cell disassembly after cycling:** Disassemble the coin cell or Li metal cell in an Ar glove box with $<0.1$ ppm O$_2$ and H$_2$O.
2. **TEM grid contact:** Lightly press a holey-carbon or lacey-carbon TEM grid onto the anode surface, such as plated Li on Cu foil or Li metal foil, and lift it so that sample fragments sit across holes. Another option is to prepare a lamella directly from plated Li on Cu foil using FIB.
3. **Cryo-transfer holder or Vitrobot:** Place the grid into the plunge tube and drop it rapidly into liquid N$_2$ slush. A cooling rate above $10^4$ K/s is standard.
4. **Vacuum cryo-transfer:** Move the frozen grid into a cryo-holder while keeping air/H$_2$O exposure below one second. Gatan 626/698 cryo-holders are common.
5. **Maintain -180 °C in the TEM:** Connect the holder to an LN$_2$ dewar. Drift during measurement should be below about 1 nm/min for atomic resolution.

The main practical skill is maintaining an air-free, water-free chain from Ar glove box to cryo-holder. If the SEI decomposes during transfer, the value of cryo-EM is lost.

## 4. Low-Dose Imaging and Dose Budget

Low-dose imaging is about distributing a limited dose budget across the imaging steps.

> **Related concept: Electron dose and image information**
> If $N$ electrons arrive at a pixel, shot noise is $\sqrt{N}$ and SNR scales as $\sqrt{N}$. Higher SNR therefore requires higher dose. At the same time, dose damages the sample, and atomic features can degrade rapidly above about 50-100 e$^-$/Å$^2$.
> The dose budget is the upper dose that still gives adequate SNR for the target resolution. High-resolution single-particle cryo-EM often uses 20-40 e$^-$/Å$^2$.
> The useful strategy is to collect a **dose-fractionated movie**, for example 50 frames at 1 e$^-$/Å$^2$ each, and then remove drift with motion correction such as MotionCor2 before summing.

Standard low-dose protocol uses three areas:

1. **Search area:** low magnification around $\times 1000$, dose below 0.1 e$^-$/Å$^2$, used only to find regions.
2. **Focus area:** a nearby area used for focusing so that the target area is not exposed.
3. **Exposure area:** the target region, exposed once with a total dose of about 20-40 e$^-$/Å$^2$.

## 5. Cui Group 2017: 4 Å Dendrite Resolution

Yulin Li and the Yi Cui group first observed dendrites and SEI at atomic resolution, around 4 Å, in *Science* 358 (2017) 506-510. Two findings were central.

1. **Dendrites are single-crystal Li:** Li plated on Cu foil grows as single-crystal nanowires, contradicting earlier assumptions that it was mossy or amorphous.
2. **Mosaic SEI:** SEI is not a uniform solid. Nanocrystals such as LiF, Li$_2$O, and Li$_2$CO$_3$ are embedded mosaic-like in a matrix, and additives such as FEC or EC change the type and distribution of nanocrystals.

These observations reinterpreted Peled's multilayer SEI model, discussed in section 06 [`03_interface.md`](../06_battery_operation/03_interface.md), at atomic resolution.

## 6. Data Analysis: MotionCor2, FFT, and IFFT

A raw cryo-EM movie is a stack of 50-100 frames. The common workflow is:

1. **MotionCor2:** Developed by the Cheng group at Berkeley. It corrects stage drift and beam-induced motion by patch-wise alignment. The input is the movie stack, and the output is a motion-corrected, dose-weighted image.
2. **CTF estimation:** Use CTFFIND4 or GCTF to determine defocus and astigmatism in the contrast transfer function.
3. **FFT of the drift-corrected image:** Compute the FFT of regions with lattice fringes to identify reciprocal-space spots, such as the 2.48 Å (110) spacing of BCC Li metal.
4. **IFFT mask and filter:** Select a specific FFT spot with a mask and perform inverse FFT. The real-space lattice corresponding to that orientation becomes clearer. This is often used to highlight LiF nanocrystals embedded in SEI.

Typical fingerprints include the LiF (200) spacing near 2.0 Å and the Li$_2$CO$_3$ (002) spacing near 2.8 Å.

## 7. Cryo-FIB Lamella Preparation

Thick samples such as pristine 50 micrometer Li metal foil cannot transmit electrons directly. **Cryo-FIB** (focused ion beam) mills a 50-100 nm lamella under liquid-N$_2$ conditions. Ga$^+$ ions cut the surface, but cryogenic conditions minimize sample damage. Dual-beam systems such as Aquilos and Helios are standard.

Frequent battery applications include:

- Cross-section lamellae of cycled anodes to observe SEI depth structure.
- Cross-sections of solid-state cathodes, such as NMC plus solid electrolyte, to observe interfacial chemistry.

## 8. Practical Checklist

- Keep air exposure below one second along the glove box -> plunge -> cryo-holder chain.
- Confirm TEM drift below 1 nm/min before measurement.
- Calculate dose budget in advance; 4 Å resolution often uses about 30 e$^-$/Å$^2$.
- Always save a movie stack. A single image cannot be motion-corrected.
- Bundle MotionCor2, CTFFIND4, and IFFT analysis into one reproducible conda environment.
- Identify FFT spots by comparing multiple standards such as LiF, Li$_2$O, and Li metal.
- Report HRTEM image, FFT pattern, and IFFT-filtered map together.

## References

- Li, Y. et al. (Cui group) *Science* 358 (2017) 506-510 — standard citation for atomic-resolution dendrite/SEI cryo-EM.
- Wang, X. et al. (Meng group) *Nano Letters* 17 (2017) 7606 — follow-up cryo-EM study of Li dendrites.
- Cheng, Y. et al. *Cell* 161 (2015) 438 — overview of MotionCor2 and the cryo-EM resolution revolution.
- Lee, Y., Fitzpatrick, J. A. J. et al. *Nature Methods* 14 (2017) 331 — standard cryo-EM sample preparation.
- Zheng, S. Q. et al. *Nature Methods* 14 (2017) 331 — original MotionCor2 algorithm paper.
