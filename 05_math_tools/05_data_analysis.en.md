# Data analysis and statistics

## 1. Overview

The path from measurement to conclusion is always statistical. Behind the assertion "the capacity retention of this cell is 80 %" lurk several layers of uncertainty — measurement precision, cell-to-cell variability, reproducibility of measurement conditions, and the stability of data processing (differentiation, smoothing) — and unless they are handled quantitatively, the conclusion loses its credibility. Data analysis is the tool that explicitly attaches this uncertainty as a number to each result and answers the question "by how much can this be trusted."

The places where data analysis is decisive in battery/electrochemistry research are ① propagation of measurement errors (e.g., capacity → energy density → efficiency); ② parameter uncertainty in regression fits (EIS equivalent circuit, GITT $\sqrt{t}$ line, Tafel slope); ③ model comparison and selection (which equivalent circuit fits the data better); ④ repeated measurements and statistical inference (cell variability, degradation statistics); ⑤ Bayesian estimation (SOC estimation combining a prior, parameter identification).

This section covers ① error propagation, ② linear regression, ③ nonlinear regression and model selection, ④ Bayesian basics, and ⑤ uncertainty quantification and reporting. The point of view is "how do we attach honest error bars to result numbers" rather than the algorithms themselves.

## 2. Types of error and propagation

Measurement errors are broadly divided into two kinds. **Random errors** are components that scatter statistically over repeated measurements, while **systematic errors** are biases that affect every measurement in common. Averaging reduces the random error by $1/\sqrt{N}$, but the systematic error remains — so statistical processing alone cannot capture systematic errors, and calibration, reproducibility checks, and cross-comparison among different measurement methods are required.

**Error propagation.** For a function $y = f(x_1, \ldots, x_n)$ of independent measurements $x_1, \ldots, x_n$, the variance to first order in Taylor expansion is

$$\sigma_y^2 = \sum_i \!\left(\frac{\partial f}{\partial x_i}\right)^{\!2}\!\sigma_{x_i}^2$$

Each term: $\sigma_{x_i}^2$ = variance of $x_i$, with the partial derivatives evaluated at the mean of the measurements. This single line is the basis of nearly all practical error calculations. Frequently used results:

| Function | Propagated error |
|---|---|
| $y = a x_1 + b x_2$ | $\sigma_y^2 = a^2 \sigma_1^2 + b^2 \sigma_2^2$ (absolute) |
| $y = x_1 \cdot x_2$ | $(\sigma_y/y)^2 = (\sigma_1/x_1)^2 + (\sigma_2/x_2)^2$ (relative) |
| $y = x_1 / x_2$ | $(\sigma_y/y)^2 = (\sigma_1/x_1)^2 + (\sigma_2/x_2)^2$ |
| $y = x^n$ | $\sigma_y/y = |n|\,\sigma_x/x$ |
| $y = \ln x$ | $\sigma_y = \sigma_x/x$ |

Battery example: the relative error of the energy density $W = V \cdot Q$ is the root sum of squares of the relative errors of voltage and capacity. Measuring $V$ to 1 mV (0.027 % of 3.7 V) and $Q$ to 0.5 % gives a relative error of $W$ $\approx 0.5$ %. That is, the precision of the energy measurement is essentially limited by the capacity measurement — such quantitative comparisons are the first-order starting point for measurement-system design.

**Treatment of correlated errors.** If the measurements are not independent (e.g., $V$ and $I$ measured on the same cell), covariance terms must be added.

$$\sigma_y^2 = \sum_i \!\left(\frac{\partial f}{\partial x_i}\right)^{\!2}\!\sigma_i^2 + 2\!\sum_{i<j}\!\frac{\partial f}{\partial x_i}\frac{\partial f}{\partial x_j}\,\text{cov}(x_i, x_j)$$

The parameters of an EIS fit are almost always strongly correlated, so the covariance matrix from the fit must be carried over directly to compute the error of any derived quantity — using only the diagonal variances underestimates the error.

## 3. Linear regression (OLS)

The simplest and most frequently used regression tool. For the model $y = \beta_0 + \beta_1 x + \varepsilon$, the **ordinary least squares (OLS)** solution that minimizes the sum of squared residuals $S = \sum_k (y_k - \beta_0 - \beta_1 x_k)^2$ has the closed form

$$\hat\beta_1 = \frac{\sum_k (x_k - \bar x)(y_k - \bar y)}{\sum_k (x_k - \bar x)^2}, \qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x$$

Each term: $\bar x, \bar y$ = sample means. For multiple regression (several explanatory variables), the matrix form $\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y}$ generalizes — exactly the same expression as the pseudo-inverse in [`./02_linear_algebra.md`](./02_linear_algebra.md).

**Goodness of fit.** The coefficient of determination $R^2$ is the fraction of variance explained by the model:

$$R^2 = 1 - \frac{\sum (y_k - \hat y_k)^2}{\sum (y_k - \bar y)^2}$$

$R^2 = 1$ is a perfect fit, while $R^2 = 0$ is the same as the mean model. However, a high $R^2$ does not guarantee that the model is correct — even with very high $R^2$, a pattern in the residuals signals model insufficiency.

**OLS assumptions.** For the result to be trustworthy, four conditions are needed: ① linearity — the true relation is linear; ② independence — residuals are mutually independent; ③ homoscedasticity — residual variance is independent of $x$; ④ normality — residuals are normally distributed. The check of these assumptions is **residual analysis**, and when assumptions break, the estimator is still appropriate but the standard errors and confidence intervals become wrong.

| Residual-plot pattern | Broken assumption | Remedy |
|---|---|---|
| curved with $x$ | linearity | nonlinear model, variable transformation |
| trend with time/order | independence | time-series model, autocorrelation |
| residuals large for large $x$ | homoscedasticity | weighted OLS, $\log$ transformation |
| Q–Q plot deviates from normal | normality | transformation, robust regression |

Battery examples: in fitting the GITT $E$ vs. $\sqrt{t}$ line, residuals that bend with $\sqrt{t}$ signal that the simple semi-infinite-diffusion assumption has broken — one then restricts to a shorter time window or fits the full SPM model. In a Tafel plot $\eta$ vs. $\log j$, a curving residual at large $\eta$ signals entry into mass-transport limitation.

## 4. Nonlinear regression and model selection

Most physical models are nonlinear. EIS equivalent circuits, Butler–Volmer, the full SPM response in GITT, degradation models — all require nonlinear fitting, and the Levenberg–Marquardt (LM) algorithm of [`./04_numerical_methods.md`](./04_numerical_methods.md) is the standard. This section focuses on the statistical interpretation of the result.

**Parameter uncertainty.** After LM convergence, the parameter covariance matrix is estimated from the inverse of the Hessian:

$$\text{cov}(\hat{\boldsymbol\theta}) \approx \hat\sigma^2 (J^T J)^{-1}, \qquad \hat\sigma^2 = \frac{\sum_k r_k^2}{N - p}$$

Each term: $J$ = Jacobian, $N$ = number of data points, $p$ = number of parameters, $\hat\sigma^2$ = residual-variance estimate. The square root of each diagonal element is the standard error of the corresponding parameter, and the 95 % confidence interval is approximately $\hat\theta_i \pm 1.96\,\sigma_{\theta_i}$.

If this standard error is comparable to or larger than the estimate, that parameter is poorly identified by the data, and model simplification (parameter fixing or removal) or additional measurements are required.

**Model comparison: AIC/BIC.** When deciding which of two models fits the data better, simply comparing $\chi^2$ is insufficient — using more parameters always reduces $\chi^2$. Hence **information criteria** are standard.

$$\text{AIC} = 2p - 2\ln L, \qquad \text{BIC} = p\ln N - 2\ln L$$

Each term: $L$ = maximum likelihood, $p$ = number of parameters, $N$ = number of data points. Smaller is better, and BIC penalizes simpler models more strongly (especially for large $N$). Under the Gaussian-residual assumption, $-2\ln L = N\ln(\hat\sigma^2) + \text{const}$, so in practice the comparison reduces to $\chi^2 + 2p$ (AIC) or $\chi^2 + p\ln N$ (BIC).

**Overfitting and cross-validation.** Using too many parameters causes the model to fit even the noise, reducing predictive power on new data (overfitting). The standard tool for diagnosis/prevention is **k-fold cross-validation**: split the data into $k$ parts, use each fold in turn as the validation set with the rest for training, and report the mean of $k$ validation errors. In model comparison, the model with smaller validation error is the truly better model — usually consistent with AIC/BIC, but cross-validation is more robust when the sample is small or there is strong residual correlation.

In addition, **regularization** — Ridge, Lasso, elastic net — directly suppresses overfitting. In the distribution of relaxation times (DRT) analysis of EIS, Tikhonov regularization ([`./04_numerical_methods.md`](./04_numerical_methods.md)) is standard, with $\lambda$ chosen by cross-validation.

## 5. Bayesian basics

If frequentist statistics is "estimating parameters from data," Bayesian statistics is the explicit updating framework "prior information + data → updated belief." The core equation fits in one line.

$$P(\theta\,|\,D) = \frac{P(D\,|\,\theta)\, P(\theta)}{P(D)}$$

Each term: $P(\theta)$ = **prior**, the belief about the parameters before seeing data; $P(D|\theta)$ = **likelihood**, the probability of the observed data under parameter value $\theta$; $P(\theta|D)$ = **posterior**, the updated belief after seeing data; $P(D) = \int P(D|\theta)P(\theta)\,d\theta$ = normalization constant.

Intuitively, the posterior is proportional to the product of likelihood and prior — when the data are strong, the likelihood dominates the posterior (converging to the frequentist result); when the data are weak, the prior plays a large role.

**MAP vs. full posterior.** Bayesian estimation gives two outputs. **MAP (maximum a posteriori)** is a single-point estimate that maximizes the posterior, $\hat\theta_\text{MAP} = \arg\max P(\theta|D)$. With a flat prior it coincides with the maximum likelihood (MLE), and a Gaussian prior reduces to a regularization term — i.e., Tikhonov regularization is exactly equivalent to the MAP under a Bayesian Gaussian prior. **Full posterior** retains the entire distribution — mean, variance, credible region, correlations with other parameters — and extracts all of them. Computation is usually done via MCMC (Markov Chain Monte Carlo).

**Battery applications:** ① SOC estimation — during operation, model + measurement updates the SOC posterior (the Kalman filter is precisely a Bayesian update with a Gaussian prior + Gaussian likelihood); ② combining partial prior information for equivalent-circuit parameters (e.g., fitting EIS while $R_s$ is known from a DC measurement); ③ combining prior knowledge for degradation prediction; ④ design of experiments — selecting the next measurement condition that minimizes the posterior uncertainty.

> **Related concept: Equivalence of maximum likelihood and OLS**
> For the measurement model $y_k = m(x_k; \boldsymbol\theta) + \varepsilon_k$ with $\varepsilon_k \sim \mathcal{N}(0, \sigma^2)$, the likelihood is $L(\boldsymbol\theta) = \prod_k \frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-r_k^2/2\sigma^2\right)$. Maximizing it is exactly equivalent to minimizing $\sum r_k^2$ — i.e., OLS = MLE under Gaussian residuals.
> Weighted OLS is equivalent to MLE with different $\sigma_k$ at each residual, and Tikhonov regularization is equivalent to MAP under a Gaussian prior. These equivalences are why the Bayesian viewpoint unifies regression analysis under a common framework, and why the regularization strength ($\lambda$) can be interpreted as the information content of the prior.

## 6. Uncertainty quantification and reporting

How analysis results are reported is the final stage of credibility evaluation. Standard practices:

**(i) Confidence interval (CI).** Attaching ± standard error to a point estimate is the minimum, with the 95 % CI being $\hat\theta \pm 1.96\,\sigma_{\hat\theta}$ (under the normal assumption). For an asymmetric distribution (e.g., the $\chi^2$ for variance estimation), report the asymmetric CI directly. For small samples, use the critical value of the $t$-distribution instead of the normal.

**(ii) Significant figures.** Match the digits of an estimate to the standard error. For example, if $\hat\theta = 0.0356$ and $\sigma = 0.0021$, report it as $0.036 \pm 0.002$ (or more accurately $0.0356 \pm 0.0021$); expressions such as "$0.035623 \pm 0.0021$" are false precision.

**(iii) State measurement units and conditions.** 25 °C, C/20, sufficient rest, and similar measurement conditions directly affect the result, so they should always be reported. The number of cells ($N$) and the distinction between mean ± standard deviation and mean ± standard error ($\sigma/\sqrt{N}$) should also be made explicit.

**(iv) Quantify cell-to-cell variability.** When the deviation among multiple cells of the same condition exceeds the measurement precision, the variability of the cells themselves is the dominant uncertainty. In that case, report mean ± standard deviation over $N \ge 3$ cells, and for time-dependent quantities such as degradation curves, also display the 95 % CI band at each time point on the graph.

**(v) Statistical significance and effect size.** "Statistically significant ($p < 0.05$)" alone is not enough — also report the effect size (Cohen's d, or in domain units) and the confidence interval. With large samples, even trivial differences become significant, and that alone may have no practical meaning.

> **Related concept: Accumulation of uncertainty along the data-processing pipeline**
> Additional uncertainty accumulates at every step from raw measurement → preprocessing (noise filtering, smoothing) → model fitting → derived quantities (e.g., $D$, $R_{ct}$, capacity-fade rate). Standard checks: ① apply two or three preprocessing options to the same raw data and compare results; ② compare different fitting algorithms / initial values; ③ in ICA or dQ/dV analysis, perform a sensitivity analysis on whether the result depends strongly on the smoothing window size.
> If the result is strongly dependent on the processing choice, that step is an additional uncertainty source and must be reflected in the final reported error bars. "Different answers from the same raw data" is the most common source of misunderstanding, and checking for it in advance is the heart of analysis credibility.

## 7. Practical summary

| Task | Tool | Key check |
|---|---|---|
| Derived-quantity error estimation | error-propagation formula | correlation terms, systematic error |
| Line fitting (Tafel, GITT) | OLS | $R^2$, residual analysis, valid range |
| Nonlinear models (EIS, SPM) | LM + covariance | parameter identifiability, weighting |
| Model selection | AIC/BIC, CV | overfitting check |
| Combining prior knowledge | Bayesian / MAP | information content of the prior |
| Reporting results | point estimate ± 95 % CI | significant figures, state cell count |

Two-line core principles: **(i) every number is reported with an error bar.** A point estimate alone is incomplete information, and the confidence interval governs the interpretation. **(ii) Checking assumptions is half of quantitative work.** Without checking the four OLS assumptions, the residual patterns of a fit, and the identifiability of a model, the resulting numbers cannot be trusted.

## References

- Bevington, P. R., Robinson, D. K. *Data Reduction and Error Analysis for the Physical Sciences* (3rd ed., McGraw-Hill, 2003) — standard undergraduate textbook on error propagation and regression.
- Taylor, J. R. *An Introduction to Error Analysis* (2nd ed., University Science Books, 1997) — intuitive yet rigorous introduction to measurement error.
- Bishop, C. M. *Pattern Recognition and Machine Learning* (Springer, 2006) — standard ML-perspective textbook on Bayesian inference and regression.
- Gelman, A. et al. *Bayesian Data Analysis* (3rd ed., CRC, 2013) — comprehensive treatment of Bayesian analysis, with MCMC and posterior diagnostics.
- Hastie, T., Tibshirani, R., Friedman, J. *The Elements of Statistical Learning* (2nd ed., Springer, 2009) — a unified framework for regression, regularization, model selection, and cross-validation.
- JCGM 100:2008 *Evaluation of measurement data — Guide to the expression of uncertainty in measurement (GUM)* — international standard for reporting measurement uncertainty.
