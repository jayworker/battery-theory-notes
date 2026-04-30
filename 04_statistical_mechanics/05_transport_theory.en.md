# Transport Theory

## 1. Overview

If equilibrium statistical mechanics deals with static quantities such as free energy, OCV, and phase transitions, **transport theory** deals with how ions, electrons, heat, and momentum flow under non-equilibrium conditions. Batteries are inherently non-equilibrium devices — during charge and discharge Li migrates from cathode to anode, ions flow through the electrolyte, and Joule heating releases heat. The transport coefficients (diffusion coefficient $D$, ionic conductivity $\sigma$, thermal conductivity $\kappa$) are therefore the key properties that determine battery performance.

Intuitively, the starting point of transport theory is simple — **the response to a small non-equilibrium perturbation (e.g., a small concentration gradient) is determined by the equilibrium fluctuations themselves**. This is the heart of the fluctuation-dissipation theorem (FDT), and every transport relation, including Green-Kubo formulas and the Einstein relation, is a direct consequence of it. The conclusion that transport coefficients can be extracted simply from a well-sampled equilibrium trajectory is what makes all transport calculations in molecular dynamics (MD) simulations possible.

In batteries the key transport coefficients are: (i) the Li diffusion coefficient $D_\text{Li}^\text{solid}$ inside the active material (which determines rate capability), (ii) the ionic conductivity $\sigma$ of the electrolyte (ohmic loss), and (iii) the transference number $t_+$ of the electrolyte (concentration polarization). This chapter explains how to extract these from statistical mechanics.

## 2. Onsager reciprocal relations

The general framework of non-equilibrium thermodynamics is **linear response**. Under a small generalized force $X_j$ (concentration gradient, temperature gradient, potential gradient, etc.), the generalized flux $J_i$ (particle flow, heat flow, current) is to first order proportional to it:

$$J_i = \sum_j L_{ij} X_j$$

Symbols: $L_{ij}$ = Onsager transport coefficient matrix. In a battery electrolyte, if $X_1$ is the concentration gradient and $X_2$ the potential gradient, then $J_1$ is the particle flow (Fick), $J_2$ is the current (Ohm), and the cross terms $L_{12}, L_{21}$ express concentration-potential coupling (electroosmosis, concentration polarization).

**Onsager's decisive result** (1931 Nobel Prize) is a symmetry that follows directly from microscopic reversibility (time-reversal symmetry):

$$\boxed{L_{ij} = L_{ji}}$$

The meaning of this symmetry is non-obvious — the coupling coefficient by which a concentration gradient drives a current equals the coupling coefficient by which a potential gradient drives a particle flow. Without invoking any microscopic model, such a non-trivial equation is guaranteed by time-reversal symmetry alone. In the presence of an external magnetic field it is modified to $L_{ij}(\mathbf{B}) = L_{ji}(-\mathbf{B})$.

In battery applications, the Onsager relations ensure the consistency of the transference-number definition for concentrated electrolytes and of every coupled transport equation. Newman's concentrated-electrolyte model (used in the [`../06_battery_operation/00_overview.md`](../06_battery_operation/00_overview.md) series) is built on this framework.

## 3. Fluctuation-Dissipation theorem (FDT)

The deepest result of transport theory is that equilibrium fluctuations and non-equilibrium responses arise from the same microscopic dynamics. The simple form of the **Fluctuation-Dissipation theorem**:

$$\text{(transport coefficient)} \propto \int_0^\infty \langle A(0) A(t)\rangle_\text{eq}\, dt$$

In equilibrium, the time integral of the autocorrelation function of some dynamical variable $A$ (e.g., particle velocity, current density) equals the transport coefficient corresponding to that variable. The statement is "the rate at which equilibrium fluctuations relax back toward equilibrium equals the rate of response to an external perturbation."

The intuition behind it goes as follows. The response to a small external force is solved by first-order perturbation theory, and the result reduces to an appropriate correlation function in the equilibrium distribution. A microscopic system cannot tell whether the force pulling it comes from an equilibrium fluctuation or from outside, so the two responses share the same form.

$C_V = \langle (\Delta E)^2\rangle/k_BT^2$ ([`./02_partition_function.md`](./02_partition_function.md)) is the static analogue within this framework — if a transport coefficient is a dynamical FDT, a response function is a static FDT.

## 4. Green-Kubo formulas

Applying FDT to the diffusion coefficient of a free particle (or a single tracer particle) yields the **Green-Kubo formula**. One time-integrates the velocity autocorrelation function (VACF) of the particle velocity $\mathbf{v}(t)$:

$$\boxed{D = \frac{1}{3}\int_0^\infty \langle \mathbf{v}(0)\cdot\mathbf{v}(t)\rangle\, dt}$$

Assuming 3D isotropy. Intuition: at $t = 0$ the VACF takes its maximum value $\langle |\mathbf{v}|^2\rangle = 3k_BT/m$ (equipartition); as time goes on, collisions and interactions destroy the velocity correlation and it converges to 0. The decay rate and the area together determine the diffusion coefficient.

Other transport coefficients have the same form. Ionic conductivity (current-current correlation):

$$\sigma = \frac{1}{V k_BT}\int_0^\infty \langle \mathbf{J}(0)\cdot\mathbf{J}(t)\rangle\, dt, \quad \mathbf{J}(t) = \sum_i q_i \mathbf{v}_i(t)$$

The same pattern applies to thermal conductivity (heat-flow-heat-flow correlation) and viscosity (stress-stress correlation).

**MD simulation workflow**:
1. Generate a sufficiently long ($\sim$ ns) equilibrium MD trajectory in NVT or NVE.
2. Record velocities (or currents, stresses) at every time step.
3. Compute the autocorrelation function $\langle A(0) A(t)\rangle$ (FFT-accelerated).
4. Time-integrate to obtain the transport coefficient.

Practical caveats: the VACF typically decays rapidly on the $\sim$ ps time scale, but it has a long-time tail ($\sim t^{-3/2}$ from hydrodynamic memory) that makes the convergence of the integral subtle. The choice of integration cutoff and the handling of statistical noise are critical for reliability.

## 5. Einstein relation and MSD

The equivalent form of Green-Kubo is the **Einstein relation**. Instead of the time integral of the VACF, one looks at the long-time slope of the **mean-square displacement (MSD)**:

$$\boxed{\langle |\mathbf{r}(t) - \mathbf{r}(0)|^2\rangle = 6Dt \quad (3D, \text{long-time limit})}$$

In 1D the prefactor is $2Dt$, and in 2D it is $4Dt$. The expression carries two implications — (i) diffusion is a random-walk behavior in which distance grows as the 1/2 power of time, and (ii) one sixth of the proportionality constant is the diffusion coefficient.

The Einstein equation is exactly equivalent to Green-Kubo — differentiating $\langle r^2(t)\rangle$ twice yields the VACF. In practice the MSD is more robust to noise than Green-Kubo and is therefore used more often in MD analysis.

The **Nernst-Einstein relation** is another Einstein equation. Since in a viscous medium the mobility $\mu_\text{mob}$ ($v = \mu_\text{mob} F$) and the diffusion coefficient share the same friction coefficient,

$$D = \mu_\text{mob} k_BT$$

For ions, the relation between conductivity and diffusion coefficient is established through this:

$$\sigma_\text{NE} = \frac{n q^2}{k_BT} D$$

Symbols: $n$ = ion number density, $q$ = ion charge. This relation is exact only when the ions are independent of one another (ideal solution). In concentrated electrolytes there are cation-anion correlations (each species drags the other's flow), so the actual $\sigma$ is smaller than $\sigma_\text{NE}$. The ratio is the **Haven ratio** $H_R = \sigma/\sigma_\text{NE} = D_\sigma/D_t$ ($D_\sigma$ is the conductivity diffusivity, $D_t$ is the tracer diffusivity), and $H_R < 1$ is a direct measure of correlations. In solid-electrolyte research, $H_R$ falling to around 0.5 provides a clue for distinguishing vehicular from Grotthuss mechanisms.

## 6. Battery applications: extracting $D_\text{Li}$ from AIMD/MD

Now that first-principles molecular dynamics (AIMD, ab initio MD) and force-field MD can directly simulate ion diffusion in battery materials, direct application of statistical-mechanical transport theory has become a routine tool.

**Standard workflow**:
1. Build a supercell of the active material or solid electrolyte and run NVT (Nosé-Hoover) MD for at least $\sim 100$ ps. For statistical accuracy, 1–10 ns is typical.
2. Record all trajectories $\mathbf{r}_i(t)$ of the Li atoms (or other carrier ions).
3. Compute the MSD: $\langle |\mathbf{r}(t) - \mathbf{r}(0)|^2\rangle = (1/N)\sum_i |\mathbf{r}_i(t) - \mathbf{r}_i(0)|^2$. (Average over time origins as well to improve statistics.)
4. Extract $D = \text{slope}/6$ from the slope of the long-time linear regime. Exclude the ballistic ($t^2$) and cage-rattle regimes.
5. Repeat at several temperatures and extract the activation energy $E_a$ from the slope of the Arrhenius plot $\ln D$ vs $1/T$.

**Critical caveats**:
- AIMD is expensive, so accelerated sampling is usually performed at 700–1500 K and then extrapolated to 300 K via Arrhenius. This procedure relies on the assumption of a single active mechanism, and a mechanism crossover makes the extrapolation inaccurate.
- Statistical convergence: the trajectory must be long enough to satisfy $D \cdot t \sim L^2$. If too short, the MSD can effectively look sub-diffusive.
- At 25 °C, $k_BT \approx 25.7$ meV, so an activation barrier of $E_a \sim$ 0.3–0.5 eV is typical for a solid electrolyte; bear in mind that the Arrhenius factor $e^{-E_a/k_BT}$ is then as small as $\sim 10^{-5}$–$10^{-8}$.

**Conversion to conductivity**: substitute the Li concentration and charge into the Nernst-Einstein relation $\sigma = nq^2 D/k_BT$ to estimate $\sigma$ from $D_\text{Li}^\text{tracer}$. A Haven-ratio correction is needed for quantitative predictions. Argyrodites, garnets, and sulfide solid electrolytes are all first screened by this workflow and then experimentally validated, in a now-standardized pattern.

## References

- Onsager, L. *Physical Review* 37 (1931) 405–426; 38 (1931) 2265–2279 — original papers on the Onsager reciprocal relations.
- Kubo, R. *Journal of the Physical Society of Japan* 12 (1957) 570–586 — general framework of the Green-Kubo formulas.
- Hansen, J.-P., McDonald, I. R. *Theory of Simple Liquids* (4th ed., Academic Press, 2013) — standard treatment of transport theory in liquids.
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — practical guide to MSD/VACF computations in MD.
- He, X., Zhu, Y., Mo, Y. *Nature Communications* 8 (2017) 15893 — extracting $D_\text{Li}$ for solid electrolytes from AIMD; Haven ratio and mechanism analysis.
- Mehrer, H. *Diffusion in Solids* (Springer, 2007) — tracer diffusion vs. conductivity diffusion; meaning of the Haven ratio.
