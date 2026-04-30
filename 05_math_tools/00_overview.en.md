# Mathematical Tools (Mathematical Tools for Physical Sciences)

<span class="theory-group-label foundation">Foundational theory</span>

## Module map

```text
05 Mathematical Tools
├── 01_ode_pde              ODE / PDE / Green's function / diffusion equation / Poisson
├── 02_linear_algebra       eigenvalues / diagonalization / Hückel / normal mode / SVD
├── 03_complex_analysis     Cauchy / residue / Laplace / Fourier / KK relations
├── 04_numerical_methods    FDM / FEM / Newton-Raphson / LM fitting
└── 05_data_analysis        error propagation / regression / AIC/BIC / Bayesian / confidence intervals
```

## Overview

The Mathematical Tools area collects the mathematical language needed to handle the theory of electrochemistry, solid-state physics, DFT, and statistical mechanics. The goal is not to replace an independent mathematics course, but to re-organize, in the context of "why is this method used," the mathematical tools that one actually encounters in each theoretical area.

Partial differential equations (PDEs) are the core tool for describing concentration and potential distributions inside a battery. Fick's diffusion equation, the Poisson equation for the electrochemical potential, and the heat-conduction equation are representative examples. Linear algebra appears frequently in matrix diagonalization for solid-state physics (energy-band calculations) and in equivalent-circuit fitting of impedance spectra.

Complex analysis and the Laplace/Fourier transforms are the mathematical background of EIS impedance interpretation, and they are central to frequency-domain analysis. Numerical methods are used directly in PDE simulations (FEM, FDM) and in fitting experimental data (non-linear regression). Error propagation and regression analysis are the basic tools for quantifying experimental uncertainty.

## Learning goals

- Recognize the ODEs/PDEs that recur in battery modeling (diffusion equation, Poisson equation) and understand the meaning of the boundary-condition choice.
- Explain how the eigenvalue decomposition and the matrix exponential connect to solving systems of linear ODEs.
- Understand the relation between the Laplace and Fourier transforms, and explain why EIS impedance takes specific shapes in the complex plane.
- Explain the basic ideas of the finite-element method (FEM) and the finite-difference method (FDM), and understand the context of their application in battery simulation.
- Apply error-propagation formulas to measurement uncertainties, and understand the convergence conditions of non-linear least-squares fitting.

## Subtopic table of contents

| File | Core content (one line) |
|------|----------------|
| [`01_ode_pde.md`](./01_ode_pde.md) | ODE/PDE classification, boundary-value problems, analysis of the diffusion equation |
| [`02_linear_algebra.md`](./02_linear_algebra.md) | Eigenvalue problems, matrix decompositions, solving linear systems |
| [`03_complex_analysis.md`](./03_complex_analysis.md) | Complex functions, Laplace/Fourier transforms, frequency response |
| [`04_numerical_methods.md`](./04_numerical_methods.md) | FEM/FDM basics, numerical integration, nonlinear equations |
| [`05_data_analysis.md`](./05_data_analysis.md) | Error propagation, least-squares fitting, statistical uncertainty |

## Recommended references

- Boas, *Mathematical Methods in the Physical Sciences* (3rd ed.) — the standard textbook covering, with an applied focus, the mathematical tools used across the physical sciences.
- Riley, Hobson & Bence, *Mathematical Methods for Physics and Engineering* — a more comprehensive and rigorous mathematical-methods treatment; useful as a reference.
- Press et al., *Numerical Recipes* — an implementation reference for numerical algorithms; useful when connecting the theory to actual coding.

## Authoring status

- **Current status:** main text complete (all five subtopic files written).
- Each subtopic file follows the structure: learning goals → main text → references.
- This area serves as a reference repository where the notation and definitions of the mathematical tools used in the other areas (01–04, 06) are gathered in one place.
