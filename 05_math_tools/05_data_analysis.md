# 데이터 분석 (Data Analysis and Statistics)

## 1. 개요

측정에서 결론으로 가는 길은 항상 통계적이다. "이 셀의 용량 보유율이 80 %다" 라는 단언 뒤에는 측정 정밀도, 셀 간 산포, 측정 조건의 재현성, 데이터 처리(미분·평활화) 의 안정성 같은 여러 층의 불확실성이 숨어 있고, 이를 정량적으로 다루지 않으면 그 결론은 신뢰성을 잃는다. 데이터 분석(data analysis)은 이 불확실성을 명시적으로 숫자에 붙여 "얼마만큼 신뢰하느냐" 를 답하는 도구다.

배터리·전기화학 연구에서 데이터 분석이 결정적인 자리는 ① 측정 오차의 전파(예: 용량 → 에너지 밀도 → 효율), ② 회귀 fitting 결과의 파라미터 불확실성(EIS 등가회로, GITT $\sqrt{t}$ 직선, Tafel 기울기), ③ 모델 비교와 선택(어떤 등가회로가 데이터에 더 적합한가), ④ 반복 측정과 통계적 추론(셀 산포, 노화 통계), ⑤ Bayesian 추정(prior 정보를 결합한 SOC 추정, parameter identification)이다.

본 절은 ① 오차 전파, ② 선형 회귀, ③ 비선형 회귀와 모델 선택, ④ Bayesian 기초, ⑤ 불확실성 정량과 보고를 다룬다. 알고리즘보다 "결과 숫자에 어떻게 정직한 오차 막대를 붙이는가" 의 관점이다.

## 2. 오차의 종류와 전파

측정 오차는 크게 두 종류로 나뉜다. **랜덤(random) 오차** 는 반복 측정에서 통계적으로 흩어지는 성분이고, **계통(systematic) 오차** 는 모든 측정에 공통으로 영향을 주는 편향이다. 평균을 내면 랜덤 오차는 $1/\sqrt{N}$ 로 줄어들지만 계통 오차는 그대로 남는다 — 그래서 통계 처리만으론 계통 오차를 잡을 수 없고, calibration·재현성 점검·서로 다른 측정법의 교차 비교가 필요하다.

**오차 전파(error propagation).** 독립적인 측정값 $x_1, \ldots, x_n$ 의 함수 $y = f(x_1, \ldots, x_n)$ 의 분산은 1차 Taylor 전개에서

$$\sigma_y^2 = \sum_i \!\left(\frac{\partial f}{\partial x_i}\right)^{\!2}\!\sigma_{x_i}^2$$

각 항: $\sigma_{x_i}^2$ = $x_i$ 의 분산, 편미분은 측정값 평균 위치에서 계산. 이 한 줄이 거의 모든 실용적 오차 계산의 기초다. 자주 쓰는 결과들:

| 함수 | 전파된 상대 오차 |
|---|---|
| $y = a x_1 + b x_2$ | $\sigma_y^2 = a^2 \sigma_1^2 + b^2 \sigma_2^2$ (절대) |
| $y = x_1 \cdot x_2$ | $(\sigma_y/y)^2 = (\sigma_1/x_1)^2 + (\sigma_2/x_2)^2$ (상대) |
| $y = x_1 / x_2$ | $(\sigma_y/y)^2 = (\sigma_1/x_1)^2 + (\sigma_2/x_2)^2$ |
| $y = x^n$ | $\sigma_y/y = |n|\,\sigma_x/x$ |
| $y = \ln x$ | $\sigma_y = \sigma_x/x$ |

배터리 응용 예: 에너지 밀도 $W = V \cdot Q$ 의 상대 오차는 전압과 용량 상대 오차의 제곱합 제곱근. $V$ 를 1 mV (3.7 V 의 0.027 %)로, $Q$ 를 0.5 % 로 측정하면 $W$ 의 상대 오차 $\approx 0.5$ %. 즉 에너지 측정의 정밀도는 사실상 용량 측정에 의해 제한된다 — 이런 정량 비교가 측정 시스템 설계의 1차 출발점이다.

**상관 오차의 처리.** 측정값들이 독립이 아니면 (예: 같은 셀에서 측정한 $V$ 와 $I$) 공분산 항이 추가된다.

$$\sigma_y^2 = \sum_i \!\left(\frac{\partial f}{\partial x_i}\right)^{\!2}\!\sigma_i^2 + 2\!\sum_{i<j}\!\frac{\partial f}{\partial x_i}\frac{\partial f}{\partial x_j}\,\text{cov}(x_i, x_j)$$

EIS fitting 의 파라미터들은 거의 항상 강하게 상관되어 있으므로, fitting 결과의 공분산 행렬을 그대로 가져와 후속 도출량의 오차를 계산해야 한다 — 단순 분산만 쓰면 오차를 과소평가한다.

## 3. 선형 회귀 (OLS)

가장 단순하고 가장 자주 쓰이는 회귀 도구. 모델 $y = \beta_0 + \beta_1 x + \varepsilon$ 에서 잔차 제곱합 $S = \sum_k (y_k - \beta_0 - \beta_1 x_k)^2$ 를 최소화하는 **최소제곱법(ordinary least squares, OLS)** 의 해는 닫힌 형태로

$$\hat\beta_1 = \frac{\sum_k (x_k - \bar x)(y_k - \bar y)}{\sum_k (x_k - \bar x)^2}, \qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x$$

각 항: $\bar x, \bar y$ = 표본 평균. 다중 회귀(여러 설명변수)에서는 행렬 형태 $\hat{\boldsymbol\beta} = (X^T X)^{-1} X^T \mathbf{y}$ 로 일반화된다 — 정확히 [`./02_linear_algebra.md`](./02_linear_algebra.md)의 의사역행렬과 같은 식.

**적합도(goodness of fit).** 결정 계수 $R^2$ 는 모델이 설명한 분산의 비율:

$$R^2 = 1 - \frac{\sum (y_k - \hat y_k)^2}{\sum (y_k - \bar y)^2}$$

$R^2 = 1$ 이 완벽 적합, 0 이 평균 모델과 같은 수준. 다만 $R^2$ 가 높다고 모델이 옳다는 보장은 없다 — 매우 높은 $R^2$ 라도 잔차에 패턴이 보이면 모델이 부족하다는 신호다.

**OLS 의 가정.** 결과를 신뢰하려면 네 가지가 필요하다: ① 선형성 — 진짜 관계가 직선, ② 독립성 — 잔차들이 서로 독립, ③ 등분산성(homoscedasticity) — 잔차의 분산이 $x$ 와 무관, ④ 정규성 — 잔차가 정규 분포. 이 가정들의 점검이 **잔차 분석(residual analysis)** 이며, 가정이 깨지면 추정량은 여전히 적절하지만 표준 오차와 신뢰구간이 잘못된다.

| 잔차 plot 패턴 | 깨진 가정 | 처방 |
|---|---|---|
| $x$ 에 따라 곡선 | 선형성 | 비선형 모델, 변수 변환 |
| 시간/순서로 trend | 독립성 | 시계열 모델, autocorrelation |
| $x$ 가 클 때 잔차 큼 | 등분산성 | 가중 OLS, $\log$ 변환 |
| 정규 Q-Q plot 어긋남 | 정규성 | 변환, robust 회귀 |

배터리 응용 예: GITT 의 $E$ vs $\sqrt{t}$ 직선 fitting 에서 잔차가 $\sqrt{t}$ 에 따라 굽으면 단순 반무한 확산 가정이 깨진 신호 — 이때 더 짧은 시간 구간으로 한정하거나 전체 SPM 모델로 fitting 한다. Tafel plot $\eta$ vs $\log j$ 의 잔차에서 큰 $\eta$ 영역 곡선은 mass transport 한계 진입의 신호.

## 4. 비선형 회귀와 모델 선택

대부분의 물리 모델은 비선형이다. EIS 등가회로, Butler-Volmer, GITT의 풀 SPM 응답, 노화 모델 — 모두 비선형 fitting 이 필요하며, 알고리즘은 [`./04_numerical_methods.md`](./04_numerical_methods.md) 의 Levenberg-Marquardt(LM) 가 표준이다. 본 절에선 결과의 통계적 해석에 집중한다.

**파라미터 불확실성.** LM 수렴 후 파라미터 공분산 행렬은 Hessian 의 역행렬에서 추정:

$$\text{cov}(\hat{\boldsymbol\theta}) \approx \hat\sigma^2 (J^T J)^{-1}, \qquad \hat\sigma^2 = \frac{\sum_k r_k^2}{N - p}$$

각 항: $J$ = Jacobian, $N$ = 데이터 수, $p$ = 파라미터 수, $\hat\sigma^2$ = 잔차 분산 추정. 대각 원소의 제곱근이 각 파라미터의 표준 오차이며, 95 % 신뢰구간은 $\hat\theta_i \pm 1.96\,\sigma_{\theta_i}$ (대략).

이 표준 오차가 추정값과 비슷하거나 더 크면 그 파라미터는 데이터에서 잘 식별되지 않는다는 신호이며, 모델 단순화(파라미터 고정 또는 제거)나 측정 추가가 필요하다.

**모델 비교: AIC/BIC.** 두 모델 중 어느 쪽이 데이터에 더 적합한지 판단할 때 단순히 $\chi^2$ 비교로는 불충분하다 — 파라미터를 더 많이 쓰면 항상 $\chi^2$ 가 줄어든다. 그래서 **정보 기준(information criterion)** 이 표준이다.

$$\text{AIC} = 2p - 2\ln L, \qquad \text{BIC} = p\ln N - 2\ln L$$

각 항: $L$ = 최대 우도, $p$ = 파라미터 수, $N$ = 데이터 수. 작을수록 좋은 모델이며, BIC 가 더 강한 페널티(특히 $N$ 큼)로 단순 모델을 선호. 정규 분포 잔차 가정에서 $-2\ln L = N\ln(\hat\sigma^2) + \text{const}$ 로 환원되어, 실용에선 $\chi^2 + 2p$ (AIC) 또는 $\chi^2 + p\ln N$ (BIC) 비교가 표준 절차.

**Overfitting 과 Cross-validation.** 파라미터를 너무 많이 쓰면 모델이 잡음까지 fitting 해 새 데이터에 대한 예측력이 떨어진다(overfitting). 진단/방지의 표준 도구는 **k-fold cross-validation**: 데이터를 $k$ 부분으로 나눠 각 fold 를 차례로 검증 set 으로 두고 나머지로 training, $k$ 번의 검증 오차 평균을 보고. 모델 비교에서 검증 오차가 작은 쪽이 진짜 좋은 모델이며, AIC/BIC 와 보통 일치하지만 표본이 작거나 강한 잔차 상관이 있을 때 cross-validation 이 더 robust.

추가로 **정규화(regularization)** — Ridge, Lasso, elastic net — 가 overfitting 을 직접 억제하는 도구다. EIS 의 distribution of relaxation times (DRT) 분석에서 Tikhonov 정규화([`./04_numerical_methods.md`](./04_numerical_methods.md))가 표준이며, $\lambda$ 의 선택을 cross-validation 으로 한다.

## 5. Bayesian 기초

Frequentist 통계가 "데이터로부터 모수를 추정"한다면 Bayesian 통계는 "사전 정보 + 데이터 → 갱신된 신뢰"라는 명시적 갱신 framework 이다. 핵심 식은 한 줄.

$$P(\theta\,|\,D) = \frac{P(D\,|\,\theta)\, P(\theta)}{P(D)}$$

각 항: $P(\theta)$ = **사전(prior)**, 데이터 보기 전 모수에 대한 신뢰; $P(D|\theta)$ = **우도(likelihood)**, 모수 값이 $\theta$ 일 때 관측 데이터의 확률; $P(\theta|D)$ = **사후(posterior)**, 데이터 본 후 갱신된 신뢰; $P(D) = \int P(D|\theta)P(\theta)\,d\theta$ = 정규화 상수.

직관적으로, 사후는 우도와 사전의 곱에 비례하며 — 데이터가 강하면 우도가 사후를 지배(frequentist 결과로 수렴), 데이터가 약하면 사전이 큰 역할.

**MAP vs full posterior.** Bayesian 추정에서 두 가지 산출물이 있다. **MAP (maximum a posteriori)** 는 사후를 극대화하는 단일 점 추정, $\hat\theta_\text{MAP} = \arg\max P(\theta|D)$. 사전이 평탄(flat prior)이면 최대 우도(MLE)와 일치하며, 가우시안 사전은 정규화 항으로 환원된다 — 즉 Tikhonov 정규화가 Bayesian 가우시안 사전의 MAP 와 정확히 동치. **Full posterior** 는 분포 자체를 보고 — 평균, 분산, 신뢰 영역, 다른 파라미터와의 상관 — 모두 추출. 계산은 보통 MCMC (Markov Chain Monte Carlo) 로.

**배터리 응용:** ① SOC 추정 — 동작 중 모델 + 측정값으로 SOC 사후 분포 갱신(Kalman filter 가 정확히 가우시안 prior + 가우시안 likelihood 의 Bayesian 갱신), ② 등가회로 파라미터의 부분적 사전 정보 결합(예: $R_s$ 는 직류 측정으로 알려진 상태에서 EIS fitting), ③ 노화 예측의 prior knowledge 결합, ④ design of experiments — 사후의 불확실성이 가장 작아질 다음 측정 조건 선택.

> **관련 개념: Maximum likelihood 와 OLS 의 동치성**
> 측정 모델 $y_k = m(x_k; \boldsymbol\theta) + \varepsilon_k$, 잔차 $\varepsilon_k \sim \mathcal{N}(0, \sigma^2)$ 가정에서 우도는 $L(\boldsymbol\theta) = \prod_k \frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-r_k^2/2\sigma^2\right)$. 최대화하면 $\sum r_k^2$ 최소화와 정확히 동치 — 즉 OLS = 가우시안 잔차의 MLE.
> 가중치 OLS 는 잔차마다 다른 $\sigma_k$ 의 MLE 와 동치, Tikhonov 정규화는 가우시안 사전 + MAP 와 동치. 이 등치 관계가 Bayesian 관점이 회귀 분석을 통일적 framework 으로 묶는 이유이며, 정규화 강도($\lambda$)를 사전의 정보량으로 해석할 수 있게 한다.

## 6. 불확실성 정량과 보고

분석 결과를 어떻게 보고하는지가 신뢰성 평가의 마지막 단계다. 표준 관행:

**(i) 신뢰구간(confidence interval, CI).** 점추정에 ± 표준 오차를 붙이는 것은 최소이며, 95 % CI 는 $\hat\theta \pm 1.96\,\sigma_{\hat\theta}$ (정규 분포 가정). 비대칭 분포(예: 분산 추정의 $\chi^2$)에서는 비대칭 CI 를 직접 보고. 작은 표본에선 정규 대신 $t$-분포의 임계값 사용.

**(ii) 유효 자릿수(significant figures).** 추정값의 자릿수는 표준 오차에 맞춘다. 예: $\hat\theta = 0.0356$, $\sigma = 0.0021$ 이면 $0.036 \pm 0.002$ (또는 더 정확히 $0.0356 \pm 0.0021$) 로 보고하며, "$0.035623 \pm 0.0021$" 같은 표현은 거짓 정밀도(false precision)다.

**(iii) 측정 단위와 조건 명시.** 25 °C, C/20, 충분한 휴지 후 같은 측정 조건이 결과에 직접 영향을 주므로 항상 함께 보고. 셀 수($N$) 와 평균 ± 표준편차 vs 평균 ± 표준오차 ($\sigma/\sqrt{N}$) 의 구분도 명시.

**(iv) 셀 간 산포(cell-to-cell variability) 정량.** 같은 조건의 여러 셀 측정에서 편차가 측정 정밀도보다 크면, 셀 자체의 산포가 지배적인 불확실성. 이때 $N \ge 3$ 셀의 평균 ± 표준편차로 보고하며, 노화 곡선처럼 시간 의존이면 각 시점의 95 % CI band 를 그래프에 함께 표시.

**(v) 통계적 유의성과 효과 크기.** "통계적으로 유의함($p < 0.05$)" 만으로는 부족하다 — 효과 크기(Cohen's d, 또는 도메인 단위)와 신뢰구간을 함께 보고. 큰 표본에서는 사소한 차이도 유의해지며, 그 자체로는 실용 의미가 없을 수 있다.

> **관련 개념: 데이터 처리 파이프라인의 불확실성 누적**
> raw 측정 → 전처리(noise filtering, smoothing) → 모델 fitting → 도출량(예: $D$, $R_{ct}$, capacity fade rate) 의 각 단계마다 추가 불확실성이 누적된다. 표준 점검: ① 같은 raw 데이터에 두세 가지 전처리 적용해 결과 비교, ② 다른 fitting 알고리즘/초기값 비교, ③ ICA/dQ/dV 분석에서 smoothing window 크기에 결과가 민감한지 sensitivity analysis.
> 결과가 처리 방식에 강하게 의존하면 그 부분이 추가 불확실성 source 이며, 최종 보고 오차 막대에 반영해야 한다. "raw 데이터가 같은데 답이 다르다" 는 상황이 가장 흔한 오해의 원천이며, 이를 미리 점검하는 것이 분석 신뢰성의 핵심이다.

## 7. 실용 정리

| 작업 | 도구 | 핵심 점검 |
|---|---|---|
| 도출량 오차 추정 | 오차 전파 식 | 상관 항, 계통 오차 |
| 직선 fitting (Tafel, GITT) | OLS | $R^2$, 잔차 분석, 유효 구간 |
| 비선형 모델 (EIS, SPM) | LM + 공분산 | 파라미터 식별성, 가중치 |
| 모델 선택 | AIC/BIC, CV | overfitting 점검 |
| 사전 지식 결합 | Bayesian / MAP | prior 의 정보량 |
| 결과 보고 | 점추정 ± 95 % CI | 유효 자릿수, 셀 수 명시 |

핵심 원칙 두 줄: **(i) 모든 숫자는 오차 막대와 함께 보고한다.** 점추정 단독은 불완전한 정보이며, 신뢰구간이 결과 해석을 좌우한다. **(ii) 가정의 점검이 정량 작업의 절반이다.** OLS 의 네 가정, fitting 의 잔차 패턴, 모델의 식별성 — 이들 점검 없이 도출된 숫자는 신뢰할 수 없다.

## 참고 문헌

- Bevington, P. R., Robinson, D. K. *Data Reduction and Error Analysis for the Physical Sciences* (3rd ed., McGraw-Hill, 2003) — 오차 전파와 회귀의 표준 학부 교재.
- Taylor, J. R. *An Introduction to Error Analysis* (2nd ed., University Science Books, 1997) — 측정 오차의 직관적이고 엄밀한 입문서.
- Bishop, C. M. *Pattern Recognition and Machine Learning* (Springer, 2006) — Bayesian 추론과 회귀의 ML 관점 표준 교재.
- Gelman, A. et al. *Bayesian Data Analysis* (3rd ed., CRC, 2013) — Bayesian 분석의 포괄적 처리, MCMC 와 사후 진단.
- Hastie, T., Tibshirani, R., Friedman, J. *The Elements of Statistical Learning* (2nd ed., Springer, 2009) — 회귀, 정규화, 모델 선택, cross-validation 의 통일적 framework.
- JCGM 100:2008 *Evaluation of measurement data — Guide to the expression of uncertainty in measurement (GUM)* — 측정 불확실성 보고의 국제 표준.
