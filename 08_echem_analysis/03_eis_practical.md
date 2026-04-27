# EIS 실전 (Electrochemical Impedance Spectroscopy — Practical)

## 1. 개요

01번 영역(`05_eis_fundamentals`)이 임피던스의 정의·Randles 회로·Warburg·KK·DRT의 **이론적 토대**를 다뤘다면, 본 절은 실제 포텐시오스탯을 켜고 측정·fitting을 진행할 때 부딪히는 **셋업 결정·workflow·common pitfalls** 를 정리한다. 즉 06번 분극 분해(`02_polarization`)가 "분극이 어떻게 발생하나"라면, 본 절은 "EIS를 어떻게 측정·fit·검증하나"의 매뉴얼이다.

EIS 데이터의 90% 이상의 오류는 fitting 단계가 아니라 **측정 셋업 단계** 에서 들어온다. AC 진폭이 너무 크거나, DC bias가 OCV에서 벗어나 있거나, 시스템이 drift하고 있는 채로 데이터를 모으면 fitting이 아무리 좋아도 결과는 무의미하다.

## 2. 측정 셋업 결정

EIS 측정 전에 결정해야 할 핵심 파라미터는 다섯 가지다. 각각이 데이터 품질을 좌우한다.

**(a) 셀 구성**: 풀셀(2-electrode)은 양극·음극의 분극이 함께 들어와 분리가 어렵다. 정량 동역학 측정은 항상 **3-electrode** 셀을 권장한다 ([`./05_three_electrode.md`](./05_three_electrode.md) 참조).

**(b) DC bias**: 측정하고 싶은 SOC에 해당하는 전위로 설정. 보통 OCV(개회로 전압) 또는 SOC 50%가 출발점. SOC를 바꿔가며 측정하려면 충/방전으로 SOC를 옮긴 뒤 **충분히 긴 OCV 안정화** (보통 1~4 h, OCV 변화 < 0.1 mV/h) 를 거쳐야 KK 위반을 피한다.

**(c) AC 진폭**: 표준 5~10 mV (rms or peak-to-peak — 장비별로 정의 다름). 더 작으면 SNR이 나쁘고, 더 크면 비선형 영역으로 들어가 KK 잔차가 커진다. 진폭을 절반으로 줄여 같은 데이터가 나오면 선형 영역, 달라지면 진폭이 너무 큰 것이다.

**(d) 주파수 범위**: 전형적으로 10 mHz ~ 1 MHz. 고주파는 cable inductance·셀 inductance를 잡고, 저주파는 Warburg·diffusion 영역. 주파수당 측정 사이클 수도 결정 — 보통 저주파에서 1~5 사이클, 고주파에서 5~10 사이클 평균.

**(e) Settling time**: DC bias를 바꾸자마자 측정하면 transient가 섞인다. 새 SOC에서 1~4 h OCV hold 후 측정 시작. 노화된 셀일수록 더 길게.

> **관련 개념: Kramers-Kronig (KK) 검증**
> 임피던스의 실수부와 허수부는 인과성·선형성·시간 불변성이 만족되면 서로를 결정한다: $Z'(\omega) = Z'(\infty) + (2/\pi) \int_0^\infty [x Z''(x) - \omega Z''(\omega)]/(x^2 - \omega^2) \, dx$.
> 실용적으로는 측정한 $Z''$ 로부터 $Z'$ 를 KK로 재계산해 잔차(residual)를 보고, 1~2% 이내면 신뢰할 만, 그 이상이면 SOC drift·비선형 진폭·시스템 변화 의심.
> 가정: 세 조건(인과/선형/시간 불변) 모두. 위반 시 어느 가정이 깨졌는지 진단하려면 진폭을 절반으로 줄이거나 OCV 안정화를 더 길게 — 이 두 변경이 잔차를 개선하면 비선형/drift 원인 확정.

## 3. Fitting Workflow

좋은 fitting의 표준 흐름은 다음 다섯 단계다. 각 단계를 건너뛰면 다음 단계의 결론이 흔들린다.

**Step 1 — Visual inspection**: Nyquist + Bode를 함께 본다. 반원이 몇 개인가? 45° 직선이 보이나? 고주파에 인덕티브 꼬리가 있나? 데이터가 그림으로 어떻게 생겼는지를 먼저 머릿속에 담는다. 회로를 데이터에 맞추기 전에 데이터의 특징을 먼저 본다.

**Step 2 — KK 검증**: 1차 데이터 품질 점검. 잔차가 1~2% 이상이면 fitting 시작도 하지 말고 측정으로 돌아간다. KK 잔차가 큰 데이터를 fit해서 얻은 모든 값은 무의미하다.

**Step 3 — 등가회로 선택**: 단순 Randles ($R_s$ + $R_\text{ct}$ ∥ $C_\text{dl}$ + $W$) 부터 시작. 반원이 두 개 보이면 직렬 RC 추가 ($R_s$ + ($R_\text{SEI}$ ∥ $C_\text{SEI}$) + ($R_\text{ct}$ ∥ $C_\text{dl}$) + $W$). 고주파 인덕티브 꼬리는 직렬 $L$ 요소. **회로는 데이터의 특징 수만큼 최소한으로** — 요소를 늘릴수록 fit은 좋아지지만 의미는 사라진다.

**Step 4 — Fit 후 잔차 분석**: 잔차가 주파수에 따라 무작위(random)면 fit 양호, 체계적 패턴(저주파에 큰 잔차, 또는 sigmoid 모양)이면 회로가 부적절. 잔차의 분포 자체가 회로 선택의 검증 도구.

**Step 5 — 물리적 일관성 점검**: 추출된 값이 합리적인가? $C_\text{dl}$ 이 30 μF/cm² 정도(이중층의 typical)? $R_\text{ct}$ 이 SOC·온도에 맞는 거동? $\sigma_W$ 가 GITT의 $D$ 와 일치? 숫자가 맞아도 물리가 안 맞으면 fitting은 실패한 것이다.

## 4. Fitting의 비유일성과 회로 선택

EIS fitting의 가장 큰 함정은 **비유일성(non-uniqueness)** 이다. 같은 데이터에 두 개 이상의 회로가 똑같이 잘 fit된다는 잘 알려진 문제. 예: 직렬 ($R_1$ ∥ $C_1$) + ($R_2$ ∥ $C_2$) 와 (이상한 분지 회로)가 numerical 차이 < 1% 로 동일하게 fit될 수 있다.

해결책 셋:
- **물리적 사전 정보로 회로 토폴로지를 고정**: SEI는 음극 표면, charge transfer는 활물질 표면, Warburg는 bulk. 이 매핑이 회로 구조를 결정.
- **DRT 분석으로 시간 상수 개수 확인**: DRT 피크 수 = 필요한 RC 요소 수. 회로 토폴로지 결정의 객관적 가이드.
- **여러 SOC·온도에서 측정해 트렌드 확인**: 단일 측정에서 모호하던 회로가 SOC 의존성을 보면 결정되는 경우가 많음.

## 5. Common Pitfalls

실험실에서 가장 자주 만나는 실수들. 각각을 알고 있어야 데이터의 신뢰성이 보장된다.

**(1) AC 진폭이 너무 큼**: 50 mV로 측정하면 SNR이 좋아 보이지만 비선형 영역. 첫 점검 항상 진폭을 절반으로 줄여 비교.

**(2) Scan이 너무 빠름**: 저주파(10 mHz)는 한 사이클이 100 s. 5 사이클 평균이면 500 s. 5 SOC × 5 사이클 × 100 s = 12500 s ≈ 3.5 h. 이를 단축하려고 측정 사이클을 줄이면 SNR 무너짐.

**(3) 반원 두 개를 단일 CPE로 fit**: 시간 상수가 가까운 두 RC가 한 비대칭 반원으로 보일 때, 단일 CPE로 fit하면 fit는 잘 되지만 두 과정이 합쳐져 정보가 사라진다. DRT로 두 피크가 보이는지 점검 필수.

**(4) 고주파 인덕티브 꼬리를 무시**: Nyquist에서 실수축 아래로 내려가는 영역을 잘라버리거나 fit에 포함시키지 않으면 $R_s$ 추출이 부정확. 직렬 $L$ 요소로 명시적 처리.

**(5) Reference electrode 위치**: 3-electrode에서 reference가 작업 전극에서 멀거나 비균일 전류 분포 영역에 있으면 측정된 임피던스에 추가 옴 강하가 들어옴 ([`./05_three_electrode.md`](./05_three_electrode.md)).

**(6) SOC drift**: 측정 전 OCV 안정화 부족. 셀이 자가 방전하면서 SOC가 바뀌는 동안 측정하면 KK 위반.

**(7) Cable·접지 noise**: 50/60 Hz 라인 노이즈가 그 주파수 부근의 데이터를 망친다. Faraday cage·twisted pair·차폐 케이블 사용.

**(8) 표준 회로 카탈로그에 무리하게 끼워 맞추기**: 데이터의 특징이 표준 회로와 다르면, 새 회로를 만들어야 한다. 데이터를 회로에 맞추는 것이 아니라 회로를 데이터에 맞춘다.

## 6. SOC·온도 의존성 측정

EIS의 진짜 힘은 단일 측정이 아니라 **SOC × 온도 매트릭스** 에서 나온다. 5~10개 SOC × 3~5개 온도에서 측정하고 각 회로 요소의 trend를 보면, 어느 과정이 SOC에 민감한지·어느 것이 Arrhenius 거동을 보이는지가 직접 드러난다.

표준 매트릭스 예시:
- SOC: 10, 30, 50, 70, 90% (5점)
- 온도: 5, 25, 45 °C (3점)

각 (SOC, T) 점에서 측정 후 fit, 추출된 $R_\text{ct}$ 가 $\ln R_\text{ct}$ vs $1/T$ 에서 직선이면 활성화 에너지 $E_a$ 추출 가능. SEI 저항·charge transfer가 다른 $E_a$ 를 보여 두 과정의 분리 검증이 된다.

## 7. 측정 결과의 cross-check

EIS만으로는 fitting의 유일성이 항상 의심되며, 다른 기법과의 교차 검증이 표준이다.

- $R_\text{ct}$ → CV의 Tafel slope에서 $j_0$ 와 일치 점검 ([`./01_cv.md`](./01_cv.md)).
- Warburg $\sigma$ → GITT의 $D$ 와 일치 점검 ([`./04_gitt_pitt.md`](./04_gitt_pitt.md)).
- $R_s$ → 4-probe 측정 또는 별도 conductivity 측정.
- SEI 저항 → dilatometry·XPS 두께 측정.

이 교차 검증이 깨지면 회로 선택이 잘못된 것이며, 단일 EIS 결과만으로 결론을 내리는 것은 위험하다.

## 참고 문헌

- Lasia, A. *Electrochemical Impedance Spectroscopy and its Applications* (Springer, 2014) — 측정 셋업과 fitting workflow의 표준 처리.
- Orazem, M. E., Tribollet, B. *Electrochemical Impedance Spectroscopy* (2nd ed., Wiley, 2017) — KK 검증·잔차 분석 챕터.
- Boukamp, B. A. *Solid State Ionics* 169 (2004) 65 — KK 검증 실용 알고리즘.
- Macdonald, J. R., Barsoukov, E. (eds.) *Impedance Spectroscopy* (3rd ed., Wiley, 2018) — 회로 카탈로그와 비유일성 논의.
- Wan, T. H. et al. *Electrochim. Acta* 184 (2015) 483 — DRT를 이용한 회로 토폴로지 결정.
- Vivier, V., Orazem, M. E. *Chem. Rev.* 122 (2022) 11131 — EIS 실전 리뷰(최근).
