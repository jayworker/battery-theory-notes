# 복소해석과 변환 (Complex Analysis and Transforms)

## 1. 개요

복소수 $z = x + jy$ 와 그 위에서 정의되는 함수론은, 표면적으론 "실수에 허수 단위 $j$ 를 더한 산술 트릭" 처럼 보이지만 실제로는 신호 처리·임피던스·제어 이론의 자연스러운 언어다. 이유는 단순하다. **회전과 진동을 한 줄로 표현**하기 위해 복소 지수 $e^{j\omega t} = \cos\omega t + j\sin\omega t$ 가 도입되며, 이 한 식이 RLC 회로의 정현파 응답·EIS 임피던스·푸리에 변환·양자역학 시간 진화 모두를 통일적으로 다루게 만들기 때문이다.

전기화학에서 복소해석이 결정적으로 등장하는 자리는 ① 임피던스 분광법(EIS) — 임피던스 $Z(\omega) = Z' + jZ''$ 가 본질적으로 복소수, ② Laplace 변환을 통한 ODE의 대수 변환과 회로 해석, ③ Fourier 변환을 통한 시간-주파수 도메인 변환, ④ Kramers-Kronig 관계의 인과성 점검이다. 본 절은 ① 해석 함수의 의미, ② Cauchy 정리·잔차 정리, ③ Laplace 변환, ④ Fourier 변환과 KK 관계를 다룬다 — 추상적 정리보다 "이 도구가 어떤 식의 모양을 한 줄로 적게 해주는가"에 무게를 둔다.

전기공학 관습을 따라 허수 단위는 $j$ 를 사용한다 (수학에서의 $i$ 와 동일).

## 2. 복소 함수와 해석성

복소 함수 $f(z) = u(x,y) + j v(x,y)$ 에 대해, 그 미분 가능성은 단순한 실수 미분 가능성보다 훨씬 강한 조건을 요구한다. 바로 **Cauchy-Riemann 방정식** 이다.

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

이 두 식이 한 점 $z_0$ 의 근방에서 만족되면 $f$ 는 그 점에서 **해석적(analytic)** 또는 **정칙(holomorphic)** 이라 불린다. 해석성의 강력함은 그 결과로 자동으로 따라붙는 성질들에 있다 — ① 해석 함수는 자동으로 무한 번 미분 가능, ② 그 미분 또한 해석적, ③ Taylor 전개가 수렴 반경 안에서 항상 성립, ④ 한 영역의 함숫값이 그 영역 경계의 함숫값에 의해 일의적으로 결정 (해석 연속성, analytic continuation). 실해석에서는 결코 자동으로 따라붙지 않는 이 성질들이 복소 함수에서는 거의 공짜로 따라온다는 점이, 복소해석을 강력한 도구로 만든다.

물리적 맥락: $u(x,y)$ 와 $v(x,y)$ 는 자동으로 Laplace 방정식 $\nabla^2 u = \nabla^2 v = 0$ 을 만족한다 (CR 식의 직접 결과). 즉 해석 함수는 2D 정전기/유체역학 문제의 풀이를 자연스럽게 인코딩하며, 등각 사상(conformal mapping) 을 통한 경계 값 문제 풀이의 기초가 된다. 회로 해석에선 임피던스의 해석성이 곧 인과성을 의미하며, 이것이 5절의 KK 관계의 출발점이다.

## 3. Cauchy 정리와 적분 공식

복소해석의 두 중심 정리. 첫째, **Cauchy 정리(Cauchy's theorem)**: 영역 $D$ 에서 해석적인 함수 $f(z)$ 와 $D$ 안에 닫힌 곡선 $\gamma$ 에 대해

$$\oint_\gamma f(z)\, dz = 0$$

직관적으로, "해석적 영역 안의 닫힌 적분은 항상 0"이라는 강력한 진술이다. 결과로 두 점 사이의 적분이 경로에 의존하지 않고 (path independence), 적분이 위상학적 양으로 환원된다.

둘째, **Cauchy 적분 공식**: $f$ 가 $\gamma$ 안과 위에서 해석적이고 $z_0$ 가 $\gamma$ 안의 점이라면

$$f(z_0) = \frac{1}{2\pi j}\oint_\gamma \frac{f(z)}{z - z_0}\, dz$$

이 식의 핵심은 "함수의 한 점 값이 그 주변 경계 적분으로 표현된다"는 점이며, 이로부터 Taylor 급수와 Laurent 급수, 잔차 정리가 자연스럽게 도출된다. 한 번 더 미분하면 모든 차수의 미분도 적분 표현을 얻으며, 이것이 해석 함수의 무한 미분 가능성의 출처다.

## 4. 잔차(Residue) 정리

함수에 **고립 특이점(isolated singularity)** $z_0$ 가 있을 때, 그 주변 Laurent 급수 $f(z) = \sum_{n=-\infty}^\infty a_n (z-z_0)^n$ 의 $-1$ 차 계수 $a_{-1}$ 을 **잔차(residue)** 라 부른다: $\text{Res}(f, z_0) = a_{-1}$. **잔차 정리** 는 닫힌 곡선 $\gamma$ 안의 모든 특이점의 잔차 합을 적분과 직접 연결한다.

$$\oint_\gamma f(z)\, dz = 2\pi j \sum_k \text{Res}(f, z_k)$$

이 한 식의 위력은 실수 적분 계산에서 즉시 드러난다. 예: 무한 구간 적분 $\int_{-\infty}^\infty \frac{dx}{1+x^2}$ 는 상반평면 반원 경로로 닫고 $z = j$ 의 잔차를 계산하면 단 두 줄에 $\pi$ 라는 답이 나온다. 푸리에 적분, 진동 응답 함수의 응답 시간 추출, 산란 진폭의 적분 표현 등 물리에서 만나는 거의 모든 비자명 적분이 잔차 정리로 풀린다.

**단순극(simple pole)** $z_0$ 의 잔차는 매우 간단:

$$\text{Res}(f, z_0) = \lim_{z\to z_0}(z - z_0)\, f(z)$$

EIS 응용에서, 임피던스 $Z(s)$ 가 분수형(rational) 함수일 때 그 극(pole)의 잔차가 곧 등가회로의 시간 상수와 진폭을 직접 준다 — 4절의 Laplace 역변환과 곧 연결된다.

## 5. Laplace 변환

회로 해석과 시스템 응답 분석에서 가장 자주 쓰이는 변환. 시간 함수 $f(t)$ 를 복소 주파수 함수 $F(s)$ 로 보낸다.

$$\mathcal{L}\{f(t)\}(s) = F(s) = \int_0^\infty f(t)\, e^{-st}\, dt$$

각 항: $s = \sigma + j\omega$ = 복소 주파수, 적분이 수렴하는 영역(region of convergence, ROC)에서 정의된다. 핵심 가치는 **미분이 곱셈으로 변한다**는 점:

$$\mathcal{L}\{f'(t)\} = s F(s) - f(0), \qquad \mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0)$$

이 한 줄이 ODE를 대수 방정식으로 환원하는 마법의 핵심이다. RLC 회로의 미분 방정식이 $s$ 에 대한 다항/분수 식이 되고, 풀이가 단순 대수가 된다. 더 나아가 임피던스의 정의가 자연스럽게 $Z(s) = V(s)/I(s)$ 의 분수형 함수가 되며, 표준 회로 요소의 임피던스가:

| 소자 | 시간 도메인 | $s$ 도메인 임피던스 | $j\omega$ 형태 |
|---|---|---|---|
| Resistor | $v = Ri$ | $Z = R$ | $R$ |
| Inductor | $v = L\,di/dt$ | $Z = sL$ | $j\omega L$ |
| Capacitor | $i = C\,dv/dt$ | $Z = 1/(sC)$ | $1/(j\omega C)$ |

$s = j\omega$ 로 치환하면 정현파 정상 응답의 임피던스 $Z(j\omega)$ 가 곧바로 나온다. EIS 의 모든 등가회로 표현 — Randles, RC ladder, Warburg — 이 정확히 이 한 가지 변환에서 자라난 것이며, EIS 분석은 본질적으로 측정된 $Z(j\omega)$ 데이터에 적절한 $Z(s)$ 형태를 fitting 하는 작업이다.

**역변환** 은 원리적으로 Bromwich 적분 $f(t) = \frac{1}{2\pi j}\int_{c-j\infty}^{c+j\infty} F(s)\, e^{st}\, ds$ 이지만, 실용에선 부분 분수 분해 후 표(table) 활용이 표준이다. 분수형 $F(s) = N(s)/D(s)$ 의 각 단순극 $s = -\alpha_k$ 에 대응하는 시간 영역 항이 $A_k\, e^{-\alpha_k t}$ 이며, 이 $\alpha_k$ 가 곧 시간 상수의 역수다 — 잔차 정리(4절)가 정확히 이 부분 분수 계수를 주는 도구다.

> **관련 개념: 1차 RC 회로의 Laplace 풀이 한 줄 데모**
> $RC\, \dot v + v = V_\text{src}$, $v(0) = 0$, 입력 $V_\text{src}(t) = V_0 \cdot 1(t)$ (step). Laplace 변환: $RC\,(sV - 0) + V = V_0/s$ → $V(s) = \frac{V_0}{s(1 + sRC)} = \frac{V_0}{s} - \frac{V_0}{s + 1/RC}$ (부분 분수). 표에서 역변환: $v(t) = V_0[1 - e^{-t/RC}]$.
> ODE를 한 번도 직접 풀지 않고 대수만으로 답이 나오며, 두 극 $s = 0$ (정상 상태)과 $s = -1/RC$ (시간 상수 RC) 가 각각 평형값과 이완 시간을 직접 보여준다. 이 패턴이 임의의 LTI 회로에 그대로 일반화된다.

## 6. Fourier 변환과 EIS

Laplace 변환에서 $\sigma = 0$ ($s = j\omega$) 으로 한정한 것이 **Fourier 변환** 이다. 시간 영역 신호 $f(t)$ 를 주파수 영역의 $\hat f(\omega)$ 로 보낸다.

$$\hat f(\omega) = \int_{-\infty}^\infty f(t)\, e^{-j\omega t}\, dt, \qquad f(t) = \frac{1}{2\pi}\int_{-\infty}^\infty \hat f(\omega)\, e^{j\omega t}\, d\omega$$

직관적으로, 임의의 신호를 정현파의 합으로 분해하고 각 주파수 성분의 진폭/위상을 $\hat f(\omega)$ 가 담는다. 미분의 곱셈화 $\widehat{f'} = j\omega \hat f$ 도 그대로 성립한다.

EIS 와의 연결: 선형 시불변(LTI) 시스템에서 입력 $i(t)$ 와 출력 $v(t)$ 의 관계는 **임펄스 응답** $h(t)$ 의 컨볼루션이며, 푸리에 변환하면 단순 곱이 된다.

$$v(t) = (h * i)(t) \quad \xrightarrow{\mathcal{F}} \quad \hat v(\omega) = Z(\omega)\, \hat i(\omega)$$

여기서 $Z(\omega) = \hat h(\omega)$ 가 곧 주파수 응답 함수, 즉 임피던스다. EIS 측정은 본질적으로 작은 진폭의 정현파 입력 $i(t) = I_0\sin\omega t$ 를 주고 출력 $v(t)$ 의 진폭/위상을 측정해 $Z(\omega)$ 를 직접 구하는 것이며, 푸리에 변환의 정의 그 자체를 실험으로 구현한 것이다.

샘플링/노이즈 제거 응용: 시간 도메인의 잡음이 많은 신호도 푸리에 변환에서 좁은 대역으로 보이면 그 부분을 통과시키는 필터(저역/고역/대역)로 정량 분리 가능. dQ/dV 분석에서 측정 노이즈를 평활화하기 위해 Savitzky-Golay 같은 필터가 쓰이지만, 그 본질은 주파수 도메인에서 고주파 성분 차단이다.

## 7. Kramers-Kronig 관계

LTI 시스템의 응답 함수가 가져야 할 강력한 제약이 있다. 시스템이 **인과적(causal)** 이라면 — 입력보다 먼저 출력이 나타날 수 없다면 — 임펄스 응답이 $h(t) = 0$ for $t < 0$. 이 하나의 실시간 조건이, 주파수 도메인에선 **실수부와 허수부가 서로 Hilbert 변환으로 연결**된다는 결과로 환원된다 — 이것이 **Kramers-Kronig(KK) 관계** 다.

$$Z'(\omega) - Z'_\infty = \frac{2}{\pi}\, \text{P}\!\!\int_0^\infty \frac{\omega'\, Z''(\omega')}{\omega'^2 - \omega^2}\, d\omega'$$

$$Z''(\omega) = -\frac{2\omega}{\pi}\, \text{P}\!\!\int_0^\infty \frac{Z'(\omega') - Z'_\infty}{\omega'^2 - \omega^2}\, d\omega'$$

각 항: $\text{P}\!\!\int$ = Cauchy 주값(principal value), $Z'_\infty$ = $\omega \to \infty$ 극한 실수부. 이 식의 수학적 출처는 단순하다 — 인과성 → $h(t) = h(t)\,\Theta(t)$ → 푸리에 변환에서 $\hat h$ 가 상반평면에서 해석적 → Cauchy 적분 공식 적용 → KK 식.

**EIS에서의 활용:** 측정된 $Z(\omega)$ 데이터에 KK 변환을 적용해 실수부에서 허수부를 예측하고, 측정값과 비교한다. 두 값이 잘 일치하면 데이터가 LTI 가정(선형성, 시불변성, 인과성)을 만족하므로 등가회로 fitting이 의미 있고, 큰 편차가 보이면 실험 중 셀 상태가 변했거나 비선형성이 개입한 것이며 데이터 구간을 잘라내거나 측정 조건을 수정해야 한다. 즉 KK 점검은 **fitting 이전에 데이터의 자기 일관성을 보는 1차 진단** 이며, 이 단계를 건너뛰면 그 뒤의 모든 해석이 무의미해질 수 있다.

추가로 KK 관계는 EIS 외에서도 광학 상수(굴절률 ↔ 흡수 계수), 유전 함수의 실수부 ↔ 허수부, NMR 스펙트럼의 흡수 ↔ 분산 등에서 동일한 형태로 나타난다 — 동일한 인과성 + 해석성 구조가 일관되게 자라난 결과이며, 한 번 배운 도구가 여러 분광법에 그대로 통하는 사례다.

> **관련 개념: $s$-평면의 극과 시스템 안정성**
> Laplace $s$-평면에서 시스템 전달 함수 $H(s)$ 의 **극(pole)** 위치는 시스템 안정성을 직접 결정한다. 좌반평면(LHP, $\text{Re}\,s < 0$) 의 극은 지수 감쇠 → 안정, 우반평면(RHP, $\text{Re}\,s > 0$) 의 극은 지수 발산 → 불안정, 허수축 위 극은 경계 안정(진동 유지). 인과적 LTI 시스템의 모든 극이 LHP 에 있어야 한다는 것은 KK 관계와 같은 인과성 조건의 또 다른 모습이다.
> 배터리 등가회로(Randles 등) 의 모든 RC/Warburg 항이 LHP 에 단순극을 주므로 자동으로 안정하며, 이 안정성이 KK 점검의 통과를 보장한다 — 두 사실이 정확히 같은 인과성-해석성 한 가닥에서 자라난다.

## 8. 실용 정리

| 도구 | 입력/출력 | 핵심 용도 |
|---|---|---|
| 해석성 (CR 식) | $f(z)$ → 미분 가능성 | 조화 함수, 등각 사상 |
| Cauchy 적분 공식 | 경계 값 → 내부 값 | 무한 미분 가능성, 급수 |
| 잔차 정리 | 닫힌 적분 → $\sum$ 잔차 | 실 적분 계산, 부분 분수 |
| Laplace 변환 | 시간 → $s$-도메인 | ODE → 대수, 회로 임피던스 |
| Fourier 변환 | 시간 → $\omega$-도메인 | 주파수 분석, 필터링, EIS |
| Kramers-Kronig | $Z'$ ↔ $Z''$ | 인과성 점검, EIS 검증 |

핵심 통찰 두 줄: **(i) 정현파 응답은 복소수 한 줄로 표현된다.** $e^{j\omega t}$ 의 도입이 회로·진동·파동·양자역학을 모두 같은 언어로 묶는다. **(ii) 인과성은 자동으로 해석성을 함의한다.** 이 한 사실이 KK 관계, $s$-평면 안정성, 분산 관계 등 다양한 정량 도구의 공통 기반이 된다.

## 참고 문헌

- Boas, M. L. *Mathematical Methods in the Physical Sciences* (3rd ed., Wiley, 2006) — 학부 수준의 복소해석·Laplace·Fourier 표준 처리.
- Arfken, G. B., Weber, H. J., Harris, F. E. *Mathematical Methods for Physicists* (7th ed., Academic, 2012) — 잔차, Laplace, KK 관계의 포괄적 정리.
- Oppenheim, A. V., Willsky, A. S., Nawab, S. H. *Signals and Systems* (2nd ed., Pearson, 1997) — Laplace/Fourier의 신호 처리 표준 교재.
- Macdonald, J. R., Barsoukov, E. *Impedance Spectroscopy* (3rd ed., Wiley, 2018) — EIS 이론과 KK 검증의 표준.
- Lasia, A. *Electrochemical Impedance Spectroscopy and Its Applications* (Springer, 2014) — 전기화학 EIS의 KK 관계와 해석.
- Brown, J. W., Churchill, R. V. *Complex Variables and Applications* (9th ed., McGraw-Hill, 2013) — 복소해석 표준 학부 교재.
