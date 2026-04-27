# 분극 (Polarization) 분해와 시간 스케일 분석

## 1. 개요

배터리에 전류가 흐르는 순간, 셀 전압은 평형 전위(OCV, open-circuit voltage)에서 벗어난다. 이 차이를 과전압(overpotential, $\eta$)이라 부르며, 분극(polarization)이라는 더 넓은 용어로도 통용된다. 분극을 단일 숫자로 보면 의미가 빈약하지만, **세 가지 물리적 성분(옴/활성화/농도)으로 분해**하면 어떤 단계가 율속(rate-limiting)인지 진단할 수 있다.

분극 분해의 핵심은 각 성분이 **다른 시간 스케일**에서 응답한다는 점이다. 옴 성분은 즉시(< μs), 전하 이동은 ms~s, 확산은 s~수십 분. 이 시간 스케일 차이가 GITT와 EIS 두 기법의 존재 이유다.

## 2. 분극의 세 가지 성분

전류 인가 직후의 전압 강하는 옴 분극(IR drop)이며, 전자/이온 전도의 단순 저항에서 온다. 이어 ms~s 스케일에서 전하 이동(charge-transfer) 반응이 활성화 분극을 만들고, 마지막으로 더 긴 시간에 걸쳐 활물질 내부의 Li 농도 구배가 형성되어 농도 분극(concentration polarization)이 발달한다.

$$\eta_\text{total} = \eta_\Omega + \eta_\text{ct} + \eta_\text{conc}$$

각 항의 물리적 의미:
- $\eta_\Omega = IR_s$: 전해질·집전체·접촉 저항 합. 시간 의존성 없음.
- $\eta_\text{ct}$: Butler-Volmer 식이 지배. 교환전류밀도 $j_0$ 가 클수록 작음.
- $\eta_\text{conc}$: 확산이 충분히 빠르지 못해 표면-bulk 농도차 생성. Sand 시간 이후 발산.

> **관련 개념: Butler-Volmer 식**
> 계면 전자전달 반응(charge-transfer)의 정전류 분극을 기술하는 핵심 식: $j = j_0 \left[\exp\left(\frac{\alpha F \eta}{RT}\right) - \exp\left(-\frac{(1-\alpha)F\eta}{RT}\right)\right]$.
> 각 항: $j$ = 전류 밀도, $j_0$ = 교환 전류 밀도(평형에서의 양방향 흐름), $\eta$ = 활성화 과전압, $\alpha$ = 전하 이동 대칭 인자(보통 0.5 부근), $F/RT \approx 38.9 \text{ V}^{-1}$ at 25 °C.
> 두 가지 한계: 작은 $\eta$ (∣$\eta$∣ ≲ 25 mV)에서는 선형 근사 $j \approx j_0 F\eta/RT$ → "전하 전달 저항" $R_\text{ct} = RT/(j_0 F)$ 로 EIS의 반원 직경에 그대로 나타남. 큰 $\eta$ 에서는 한쪽 항이 무시되어 Tafel 근사 $\eta = a + b\log j$ 로 단순화.
> 가정: 단일 단계 전자 이동, 평형 근방, 표면 농도 = 벌크 농도(즉 농도 분극 무시). 다단계 반응이나 흡착 매개 반응에서는 보정이 필요.

농도 분극이 발산하는 임계 시간이 **Sand 시간** $\tau_s = \pi D (nFc/2j)^2$ 이며, 이를 넘어서 정전류를 인가하면 표면 농도가 0에 도달해 전압이 급격히 무너진다.

## 3. GITT (Galvanostatic Intermittent Titration Technique)

GITT는 짧은 정전류 펄스로 셀을 약간 흔든 뒤, 긴 휴지 구간 동안 전압이 평형에 가까워지도록 두는 방식이다. 직관적으로, 펄스 동안의 전압 강하 $\Delta E_\tau$ 와 펄스 후 평형 회복 전압 $\Delta E_s$ 의 비율이 활물질 내부의 확산 계수를 알려준다.

> **관련 개념: 반무한 확산 (Cottrell)**
> 평면 전극에 갑자기 전위 step을 가하면 표면 농도가 즉시 0이 되고, 확산 경계층이 시간에 따라 $\sqrt{Dt}$ 로 두꺼워진다. 이때 흐르는 전류는 Cottrell 식 $i(t) = nFAc\sqrt{D/(\pi t)}$ 를 따라 $1/\sqrt{t}$ 로 감쇠한다.
> 각 항: $A$ = 전극 면적, $c$ = 벌크 농도, $D$ = 확산 계수, $n$ = 전자 수. $\sqrt{Dt}$ 가 입자 크기 $L$ 보다 훨씬 작은 한 "반무한 확산(semi-infinite)" 가정이 유효하다.
> GITT의 핵심 전제가 바로 이것: 펄스 시간 $\tau$ 가 $\tau \ll L^2/D$ 인 영역에서만 Cottrell 거동이 깨지지 않고, 거기서 $\Delta E_s$ 와 $dE/d\sqrt{t}$ 의 비를 통해 $D$ 를 추출할 수 있다. 입자 크기를 모르거나 $\tau$ 가 너무 길면 finite-length 확산 보정이 필요.

Weppner-Huggins 식:
$$D = \frac{4}{\pi} \left(\frac{m_B V_M}{M_B S}\right)^2 \left(\frac{\Delta E_s}{\tau \, (dE/d\sqrt{t})}\right)^2$$

여기서 $m_B$/$M_B$는 활물질 질량/몰질량, $V_M$은 몰부피, $S$는 활성 표면적, $\tau$는 펄스 지속 시간. 핵심 가정: ① 반무한 확산(펄스 시간 $\ll L^2/D$), ② 단일상 영역(plateau가 아니라 slope 위에서 측정), ③ 표면적 $S$ 정확히 알려짐. 실제로는 $S$ 추정 오차가 가장 큰 불확실성 원인이다.

## 4. EIS (Electrochemical Impedance Spectroscopy)

EIS는 작은 정현파 전류/전압 섭동을 가하고, 응답의 진폭과 위상을 주파수에 따라 측정한다. 시간 스케일이 다른 과정들이 다른 주파수 영역에서 분리되는 것이 핵심이다. Nyquist plot의 고주파 절편은 $R_s$, 첫 반원은 SEI 저항, 두 번째 반원은 전하 이동 저항 $R_\text{ct}$, 저주파 45° 직선은 확산(Warburg) 영역에 대응한다.

전형적인 등가회로 (Randles 형태): $R_s$ — [($R_\text{ct}$ ∥ CPE) — $W$]. CPE(constant phase element)는 비이상적 이중층 캐패시턴스를 표현. Warburg 임피던스 $Z_W = \sigma\omega^{-1/2}(1-j)$는 반무한 확산을 가정.

DRT(Distribution of Relaxation Times) 분석은 임피던스를 시간 상수 $\tau$ 의 분포 함수 $g(\tau)$ 로 변환하여 등가회로를 미리 가정하지 않고 시간 스케일을 분리하는 비모수적 방법이다. Tikhonov 정규화를 사용한 역변환이 표준이며, 등가회로 fitting이 어려운 다중 시간 스케일 시스템에서 어떤 RC 요소가 몇 개 필요한지를 직접 보여준다.

## 5. GITT vs EIS: 상보적 사용

| 측면 | GITT | EIS |
|------|------|-----|
| 도메인 | 시간 영역 | 주파수 영역 |
| 주 측정량 | 확산 계수 $D$ | 저항/캐패시턴스 분해 |
| SOC 분해능 | 우수 (각 SOC에서 측정) | 보통 |
| 측정 시간 | 길다 (수 시간/SOC) | 짧다 (수 분/SOC) |
| 가정 | 반무한 확산, 단일상 | 선형 응답, 시간 불변 |

확산 계수의 SOC 의존성을 알고 싶으면 GITT, 저항 성분 분해가 목적이면 EIS. 두 기법은 동일한 셀에서 교차 검증 용도로 함께 쓰는 것이 표준이다.

## 6. 실전 팁

분극 측정의 가장 큰 함정은 **카운터 전극이 함께 분극되는 full-cell 측정**에서 어느 전극의 기여인지 알 수 없다는 점이다. 이를 해결하려면 reference electrode를 추가한 3전극 셀을 쓰거나, half-cell로 별도 측정해야 한다.

- **SOC 의존성**: $R_\text{ct}$, $D$ 모두 SOC에 강하게 의존. 최소 5~10개 SOC에서 측정.
- **온도 보정**: $D$, $j_0$, $R_\text{ct}$ 모두 Arrhenius 거동이라 온도 1 K 차이에도 민감. 챔버 사용.
- **펄스/주파수 범위**: GITT 펄스는 입자 크기 기반으로 결정 ($\tau < L^2/D$). EIS는 보통 100 kHz ~ 10 mHz.

## 참고 문헌

- Weppner, W., Huggins, R. A. *Journal of The Electrochemical Society* 124 (1977) 1569 — GITT 원리.
- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — EIS 표준 교과서.
- Wan, T. H. et al. *Electrochimica Acta* 184 (2015) 483–499 — DRT 분석 방법론.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — 분극 분해 이론 기초.
