# EIS 기초 (Electrochemical Impedance Spectroscopy Fundamentals)

## 1. 개요

전기화학 시스템은 옴 저항·전하 이동·이중층 충전·확산 등 시간 스케일이 다른 여러 과정이 동시에 진행된다. 시간 영역(time domain)에서는 이들이 한 데 섞여 분리가 어렵지만, 주파수 영역(frequency domain)에서는 자연스럽게 펼쳐진다 — 빠른 과정은 고주파, 느린 과정은 저주파에서 응답하기 때문이다. 이것이 **전기화학 임피던스 분광법(EIS, electrochemical impedance spectroscopy)** 의 존재 이유다.

작은 정현파 섭동(perturbation)을 가하고 응답의 진폭과 위상을 주파수 함수로 측정하는 방식 덕분에, EIS는 본질적으로 **선형 응답(linear response)** 영역에서만 의미가 있다. 보통 ±5~10 mV AC 진폭이 표준이며, 이를 넘으면 비선형 항이 들어와 해석이 무너진다.

측정 모드는 두 종류다. **PEIS(potentiostatic EIS)** 는 DC 전위에 AC 전위를 더해 가하고 전류 응답을 측정하며, **GEIS(galvanostatic EIS)** 는 DC 전류에 AC 전류를 더해 가하고 전압 응답을 측정한다. 풀셀 배터리에서는 GEIS가, 정밀 동역학 측정에서는 PEIS가 선호된다.

본 절은 임피던스의 정의 → 회로 요소 → Randles 회로 → Warburg/CPE → 검증(KK) → DRT 분석으로 흐름을 잡는다.

## 2. 임피던스의 수학적 정의

임피던스는 직류 회로에서의 저항 개념을 교류로 일반화한 양이다. 정현파 전압과 전류의 비를 복소수로 표현하면 진폭 비와 위상 차를 동시에 담을 수 있다. 직관적으로 "전류를 얼마나 막는가(저항 성분)"와 "얼마나 늦게 흐르는가(반응성 성분)"를 한 수에 압축한 것이다.

$$Z(\omega) = \frac{V(\omega)}{I(\omega)} = Z'(\omega) + j Z''(\omega)$$

각 항: $\omega = 2\pi f$ = 각주파수(rad/s), $j = \sqrt{-1}$ (전기공학 관습), $Z'$ = 실수부(저항성), $Z''$ = 허수부(반응성, 캐패시터에서 음수). 두 가지 표시법이 표준이다. **Nyquist plot** 은 $Z'$ vs $-Z''$ 의 복소 평면 그림이고, **Bode plot** 은 $\log f$ vs $|Z|$ 와 $\log f$ vs 위상각 $\phi$ 의 두 도표다. Nyquist는 회로 요소를 직관적으로 보여주고, Bode는 주파수 의존성과 dB 단위 응답을 보기 좋다.

전기화학에서는 보통 두 도표를 함께 쓴다. Nyquist에서 반원/직선의 시각적 패턴을 잡고, Bode에서 각 특징이 어느 주파수에서 일어나는지를 읽는다.

## 3. 기본 회로 요소의 임피던스

회로 모형을 만들기 전에 세 가지 기본 요소의 임피던스부터 정리한다. 이 식들은 RLC 정의에서 직접 나오며, 모든 등가회로의 빌딩 블록이다.

$$Z_R = R, \qquad Z_C = \frac{1}{j\omega C}, \qquad Z_L = j\omega L$$

각 요소의 의미: $R$ = 옴 저항(주파수 무관, 위상 0°). $C$ = 캐패시턴스(주파수에 반비례, 위상 −90°). $L$ = 인덕턴스(주파수에 비례, 위상 +90°). 직렬 연결은 $Z$ 가 더해지고, 병렬 연결은 $1/Z$ 가 더해진다.

병렬 RC 조합은 EIS에서 가장 자주 등장하는 단위이며, Nyquist plot에서 정확한 반원을 그린다. 병렬 RC의 임피던스는 다음과 같이 적힌다.

$$Z_{RC}(\omega) = \frac{R}{1 + j\omega R C}$$

이 식의 실수부와 허수부를 풀면 $(Z' - R/2)^2 + Z''^2 = (R/2)^2$ 형태의 원 방정식이 나오며, 그래서 정확한 반원이 된다.

반원의 직경 = $R$, 정점의 주파수 $\omega_\text{peak} = 1/(RC)$, 즉 시간 상수 $\tau = RC$ 가 그 자리에서 직접 읽힌다. 시간 상수 $\tau$ 가 다른 두 RC 조합이 직렬로 연결되면 두 개의 반원이 분리되어 나타나며, 이것이 EIS가 시간 스케일을 분리한다는 말의 정량적 의미다.

두 반원이 분리되어 보이려면 두 시간 상수 비가 보통 $\tau_1/\tau_2 \gtrsim 100$ 이상이어야 한다. 그보다 가까우면 두 반원이 겹쳐 단일 비대칭 반원으로 보이며, 이 경우 fitting으로는 신뢰성 있게 분리하기 어렵다. DRT 분석이 필요한 전형적 상황이다.

## 4. Randles 등가회로

전형적인 전기화학 셀에 대한 표준 등가회로가 **Randles 회로**다. 직렬 옴 저항 $R_s$ (전해질 + 집전체) 와, 그 뒤 병렬 조합으로 전하 이동 저항 $R_\text{ct}$ + 이중층 캐패시턴스 $C_\text{dl}$, 그리고 확산을 나타내는 Warburg 임피던스 $Z_W$ 가 $R_\text{ct}$ 와 직렬로 들어간다.

이 단순한 회로가 거의 모든 1차 EIS 분석의 출발점이며, 양극·음극·전해질 시스템의 전기화학적 특성을 일차적으로 잡아낸다.

$$Z(\omega) = R_s + \frac{1}{\dfrac{1}{R_\text{ct} + Z_W} + j\omega C_\text{dl}}$$

Nyquist plot에서 보이는 패턴: 고주파 절편 = $R_s$, 첫 반원 직경 = $R_\text{ct}$, 반원 정점 주파수에서 $\tau = R_\text{ct} C_\text{dl}$, 저주파 영역의 45° 직선 = Warburg(확산). 이 네 가지 특징이 보이지 않는 EIS 데이터는 거의 없으며, 보일 때마다 회로가 어떻게 매핑되는지 즉시 떠올려야 한다.

극고주파 영역(>10 kHz)에서는 케이블·셀의 인덕턴스 $L$ 이 등장해 Nyquist의 실수축 아래로 꼬리가 나타난다. 이 영역은 보통 분석 대상이 아니며, fitting 시 잘라내거나 별도 $L$ 요소로 처리한다.

리튬 이온 배터리 셀에서는 보통 두 개의 반원이 분리되어 보인다. 고주파 반원은 SEI 저항/캐패시턴스, 저주파 반원은 전하 이동, 그 뒤가 Warburg 직선이다.

두 반원의 시간 상수가 가까우면 겹쳐 보이며, 이 경우 후술하는 DRT 분석이 유용하다. 노화가 진행되면 SEI 반원이 두꺼워지고 새 반원이 등장(예: CEI, Li 플레이팅에 의한 metal/electrolyte 인터페이스)하는 방식으로 노화 모드 진단이 가능하다.

> **관련 개념: 전하 전달 저항 $R_\text{ct}$**
> Butler-Volmer 식 $j = j_0[\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$ 의 작은 과전압 극한에서 선형 근사 $j \approx j_0 F\eta/RT$ 가 성립한다.
> 이 영역에서 셀은 옴 저항처럼 보이며 그 값이 $R_\text{ct} = RT/(nF j_0 A)$. 즉 EIS 반원 직경에서 $j_0$ 를 직접 추출 가능.
> 가정: 단일 단계 전자 이동, $|\eta| < 26 \text{ mV}$, 표면 농도 = 벌크. 다단계나 흡착 매개일 경우 외관 $\alpha$, $n$ 보정 필요.

## 5. Warburg 임피던스와 CPE

저주파에서 자주 보이는 45° 직선은 반무한 평면 확산(semi-infinite linear diffusion)에 대응한다. Fick 식을 정현파 경계 조건으로 풀면, 임피던스가 $\omega^{-1/2}$ 로 감쇠하면서 실수부와 허수부가 같은 크기로 나오는 형태가 된다. 이것이 **Warburg 임피던스** 다.

$$Z_W(\omega) = \sigma \omega^{-1/2} (1 - j), \qquad \sigma = \frac{RT}{n^2 F^2 A \sqrt{2}} \left( \frac{1}{c_O \sqrt{D_O}} + \frac{1}{c_R \sqrt{D_R}} \right)$$

각 항: $\sigma$ = Warburg 계수(확산이 느릴수록 큼), $A$ = 전극 면적, $c_O$/$c_R$ = 산화/환원종 농도, $D_O$/$D_R$ = 확산 계수. Nyquist에서 45° 직선의 $|Z|$ vs $\omega^{-1/2}$ 기울기에서 $\sigma$ 를 추출하고, 위 식을 역으로 풀어 $D$ 를 얻는다. 입자 차원이 유한하면 저주파 영역에서 finite-length Warburg 형태로 직선이 휘어 수직선으로 바뀌며(blocking) 또는 수평선으로 바뀐다(transmissive).

이중층 캐패시턴스가 이상적 $C$ 가 아니라 비균일하게 분포하면 반원이 찌그러진다. 이를 회로 요소로 표현한 것이 **CPE(constant phase element)** 다.

$$Z_\text{CPE}(\omega) = \frac{1}{Q (j\omega)^n}$$

각 항: $Q$ = CPE 크기(F·s^(n−1)), $n$ = phase exponent(0~1). $n = 1$ 이면 이상 캐패시터, $n = 0.5$ 이면 Warburg, $n = 0$ 이면 저항. 실제 배터리 데이터에서 $n$ 은 보통 0.7~0.95이며, 표면 거칠기·SEI 비균일성·이중층 분포가 1에서 벗어나는 정도를 정량한다.

CPE를 등가 캐패시턴스로 환산할 때는 Brug 식을 쓴다:

$$C_\text{eff} = Q^{1/n} R^{(1-n)/n}$$

여기서 $R$ 은 CPE와 병렬로 들어간 저항(보통 $R_\text{ct}$). 이 환산을 거치지 않은 raw $Q$ 값은 단위가 F가 아니므로 직접 비교가 무의미하다.

CPE는 편리한 fitting 도구이지만 물리적 해석에 주의해야 한다 — $n < 1$ 이면 단일 시간 상수가 아니라 시간 상수 분포가 있다는 신호다(이것이 DRT가 등장하는 동기).

## 6. Kramers-Kronig 검증

EIS 데이터가 의미 있는 해석 대상이 되려면 세 가지 가정이 만족되어야 한다: ① **인과성(causality)** — 응답이 섭동보다 늦지 않을 것, ② **선형성(linearity)** — 진폭이 섭동에 비례할 것, ③ **시간 불변성(time-invariance)** — 측정 동안 시스템이 변하지 않을 것. 이 세 가지는 임피던스의 실수부와 허수부가 서로를 결정한다는 **Kramers-Kronig(KK) 변환** 식을 만족한다는 사실과 등가다.

KK 식의 한 형태:

$$Z'(\omega) = Z'(\infty) + \frac{2}{\pi} \int_0^\infty \frac{x Z''(x) - \omega Z''(\omega)}{x^2 - \omega^2} dx$$

실용적으로는 측정한 $Z''$ 로부터 $Z'$ 를 KK 변환으로 재계산해 측정값과 비교한다. 잔차(residual)가 1~2% 이내면 데이터가 신뢰할 만하고, 그 이상이면 측정 중에 시스템이 drift했거나 비선형 영역에 들어갔음을 의심해야 한다.

배터리에서 KK 위반의 가장 흔한 원인은 **SOC drift** 다 — 측정 시간 동안 자가 방전이나 누설로 SOC가 바뀌면 시간 불변성 가정이 깨진다. 이 때문에 EIS 측정 전 충분한 OCV 안정화가 필수다. 일반적으로 OCV 변화율이 0.1 mV/h 이하가 될 때까지 기다린다.

KK 잔차의 또 다른 흔한 원인: AC 진폭이 너무 커서 비선형 영역에 들어간 경우. 진폭을 절반으로 줄여 다시 측정했을 때 잔차가 줄어들면 비선형 문제로 진단한다.

대부분의 상용 fitting 소프트웨어(EC-Lab, ZView, ZSimpWin 등)는 KK 검증을 내장 기능으로 제공하며, 측정 후 항상 1차로 돌리는 것이 좋다. Boukamp의 방법론(다수의 RC 요소로 fit해 KK를 자동 만족시키는 방식)이 표준이다.

## 7. DRT(Distribution of Relaxation Times) 분석

복잡한 시스템의 EIS 스펙트럼은 여러 시간 상수의 RC 조합이 겹쳐 보이는 경우가 많다. 등가회로 fitting은 미리 회로 토폴로지를 가정해야 한다는 단점이 있고, 회로가 비유일하다는 잘 알려진 문제도 있다(같은 데이터에 두 개 이상의 회로가 똑같이 fit되는 일이 흔함). 이를 우회하는 비모수적(non-parametric) 방법이 **DRT(Distribution of Relaxation Times) 분석**이다.

핵심 아이디어: 임피던스를 시간 상수 $\tau$ 의 분포 함수 $g(\tau)$ 로 변환한다. 즉 $\tau$ 축에서 봤을 때 어떤 $\tau$ 에 얼마나 많은 RC 요소가 있는지를 직접 그림으로 보는 것이다. 수식적으로:

$$Z(\omega) - R_\infty = \int_0^\infty \frac{g(\tau)}{1 + j\omega\tau} d\tau$$

이 적분 방정식의 역변환은 ill-posed 문제라 직접 풀면 노이즈가 폭발한다. 표준 해법은 **Tikhonov 정규화** 로, 잔차 + 매끄러움(smoothness) 항을 함께 최소화한다:

$$\min_{g(\tau) \geq 0} \, \|Z_\text{meas} - Z_\text{model}(g)\|^2 + \lambda \|L g\|^2$$

여기서 $\lambda$ = 정규화 강도, $L$ = 미분 연산자. $\lambda$ 가 너무 작으면 노이즈가 가짜 피크로 나타나고, 너무 크면 진짜 피크가 뭉개진다. L-curve 기법으로 $\lambda$ 를 선택하는 것이 표준이다.

DRT의 강점: ① 회로 가정 없이 시간 상수 개수를 직접 셀 수 있다, ② 겹친 반원을 분리해 각 과정에 1:1 대응시킬 수 있다, ③ 사이클 진행에 따른 새 피크 등장으로 노화 모드를 식별 가능.

한계: ① 인덕티브 거동이나 Warburg는 깔끔히 표현되지 않음(별도 처리 필요), ② 정규화 파라미터 의존성, ③ 데이터의 고/저주파 양 끝이 잘려 있으면 가짜 피크가 생길 수 있음.

그럼에도 다중 시간 스케일 시스템 — 특히 SEI/CEI/charge transfer/diffusion 이 모두 들어 있는 풀셀 EIS — 에서 등가회로 fitting의 가장 강력한 보완 도구다. 최근 연구에서는 DRT의 베이지안(Bayesian) 처리, Hilbert transform 기반 변형, 깊은 학습 기반 변형 등이 활발히 제안되고 있다.

오픈소스 도구: DRTtools(MATLAB), pyDRTtools(Python), impedance.py 등이 무료로 제공되며, 표준 Tikhonov 정규화 + L-curve 자동 선택을 갖추고 있다. 분극 분해와 GITT/EIS 상보적 사용에 대한 실전은 [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md) 에서 다룬다.

마지막으로 강조할 점: EIS는 물리적 해석을 동반하지 않으면 단순한 fitting 연습으로 끝난다. 회로 모형은 데이터를 정량 표현하는 언어일 뿐, 그 모형의 각 요소가 어떤 물리적 과정에 대응하는지를 독립적 측정(예: GITT의 $D$, dilatometry의 SEI 두께 변화)으로 교차 검증해야 신뢰 가능한 결론이 된다.

## 참고 문헌

- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — EIS 표준 교과서.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — KK 검증과 측정 실전.
- Macdonald, J. R., Barsoukov, E. (eds.) *Impedance Spectroscopy: Theory, Experiment, and Applications* (3rd ed., Wiley, 2018) — Randles 회로와 등가회로 카탈로그.
- Wan, T. H., Saccoccio, M., Chen, C., Ciucci, F. *Electrochimica Acta* 184 (2015) 483–499 — DRT Tikhonov 정규화 표준 처리.
- Boukamp, B. A. *Solid State Ionics* 169 (2004) 65 — KK 검증 실용 알고리즘.
