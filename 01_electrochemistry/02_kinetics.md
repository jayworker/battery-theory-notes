# 전극 반응 속도론 (Electrode Reaction Kinetics)

## 1. 개요

열역학이 결정한 평형 전위는 반응이 "어디로 갈지"만 알려줄 뿐, "얼마나 빨리 가는지"는 말해주지 않는다. 실제 셀에 전류를 흘리면 전압이 평형에서 벗어나는데, 그 차이가 곧 과전압(overpotential, $\eta$)이며, 이 과전압을 "지불"해야 비로소 유한 전류가 흐른다.

본 절은 활성화 분극(activation polarization)의 표준 모형인 **Butler-Volmer 식**과 그 두 극한 — 선형 영역, Tafel 영역 — 을 중심으로 정리한다. 농도 분극과 옴 분극은 별도 절([`./03_mass_transport.md`](./03_mass_transport.md))에서 다룬다.

전극 반응 속도론의 핵심 양은 두 가지다. 평형에서 양방향 흐름의 크기를 나타내는 교환 전류 밀도(exchange current density) $j_0$, 그리고 인가된 과전압이 활성화 장벽 양쪽에 어떻게 배분되는지를 정하는 전달 계수(transfer coefficient) $\alpha$. 이 두 양만 알면 분극 곡선의 형태가 사실상 결정된다.

## 2. 활성화 에너지와 전이 상태 이론 개요

전극 반응은 본질적으로 활성화 장벽을 넘는 과정이다. 장벽 꼭대기의 전이 상태(transition state)를 통과하는 빈도가 곧 반응 속도이며, 그 속도 상수는 일반적으로 Arrhenius 형태를 따른다.

$$k = A \exp\!\left(-\frac{E_a}{RT}\right)$$

각 항: $A$ = pre-exponential factor (충돌/진동 빈도와 관련), $E_a$ = 활성화 에너지(activation energy), $R$ = 기체 상수, $T$ = 절대 온도. 전기화학에서 결정적인 점은 **전극 전위가 장벽 높이를 변조한다**는 것이다. 산화 방향으로 전위를 올리면 산화 장벽이 낮아지고 환원 장벽이 높아져서, 두 방향의 속도 균형이 깨지고 net 전류가 흐른다.

이 전위-장벽 결합을 가장 단순한 선형 가정으로 정량화한 모형이 Butler-Volmer 식이며, 보다 일반적인 비단열(nonadiabatic) 전자 이동 이론은 Marcus 이론으로, 재구성 에너지(reorganization energy) $\lambda$ 가 핵심 변수다.

$$k = A \exp\!\left(-\frac{(\Delta G + \lambda)^2}{4 \lambda k_B T}\right)$$

여기서 $\Delta G$ = 반응의 자유 에너지 변화(전위에 의해 조절됨), $\lambda$ = 용매·내부 좌표 재구성 에너지, $k_B$ = Boltzmann 상수. Marcus 식이 예측하는 가장 유명한 결과는 "역영역(inverted region)" — $|\Delta G| > \lambda$ 가 되면 추진력을 더 키워도 속도가 오히려 떨어진다는 결과로, 광유도 전자 이동에서 실험적으로 확인되었다. 배터리 전극에서는 보통 단열 한계에 가깝게 다뤄지므로 Marcus는 개념적 배경으로만 활용되고, 실용 분석은 Butler-Volmer가 표준이다.

## 3. Butler-Volmer 식

Butler-Volmer 식은 단일 단계 전자 이동 반응에서 전극 전위와 net 전류 밀도를 직접 연결한다. 직관적으로, 두 지수 항은 각각 산화 방향과 환원 방향의 속도이며, 그 차이가 측정되는 net 전류다. 전위가 평형에 있으면 두 항이 정확히 같아 net 흐름이 0이 되지만, 양방향으로 흐르는 동적 평형이 유지되고 그 흐름의 크기가 $j_0$ 다.

$$j = j_0 \left[ \exp\!\left(\frac{\alpha F \eta}{RT}\right) - \exp\!\left(-\frac{(1-\alpha) F \eta}{RT}\right) \right]$$

각 항: $j$ = net 전류 밀도(산화 양수 부호 관습), $j_0$ = 교환 전류 밀도(평형에서의 양방향 흐름), $\eta = E - E_\text{eq}$ = 활성화 과전압, $\alpha$ = 양극 방향 전달 계수(보통 0.3~0.7, 대칭이면 0.5), $F/RT \approx 38.92 \text{ V}^{-1}$ at 25 °C. 양극 항의 $\alpha$ 와 음극 항의 $(1-\alpha)$ 는 활성화 장벽이 양쪽으로 어떻게 쪼개지는지를 표현한다. 일반화 형태에서는 두 전달 계수 $\alpha_a$, $\alpha_c$ 를 독립 변수로 두기도 한다.

식의 유도 흐름은 다음과 같다. ① Eyring/Arrhenius 형태로 양방향 속도 상수를 적고, ② 전극 전위가 두 방향의 활성화 자유 에너지에 $\alpha F E$, $-(1-\alpha)FE$ 로 들어간다고 가정하고, ③ 평형에서 두 속도가 같다는 조건을 대입해 $j_0$ 로 묶으면 위 식이 된다. 본 절에서는 결과 식만 사용하고 자세한 유도는 표준 교과서(Bard-Faulkner)에 위임한다.

앞 절에서 봤듯 활성화 분극의 핵심 식이 BV이며, 평형 전위 $E_\text{eq}$ 는 [`./01_thermodynamics.md`](./01_thermodynamics.md)의 Nernst 식으로 결정된다. 즉 BV는 "Nernst가 정한 평형 위치 주변에서 동역학이 어떻게 펼쳐지는가"를 기술한다.

## 4. 두 극한 — 선형과 Tafel

Butler-Volmer 식은 두 극한에서 매우 단순한 형태로 축약된다. 작은 과전압($|\eta| \lesssim RT/F \approx 26 \text{ mV}$)에서는 두 지수를 1차 Taylor 전개하면 선형 항만 남고, 큰 과전압에서는 한쪽 항이 무시되어 단일 지수 — 즉 Tafel 거동이 드러난다.

선형 영역(small $\eta$):

$$j \approx j_0 \frac{F \eta}{RT}, \qquad R_\text{ct} = \frac{RT}{nF j_0}$$

이때 셀은 마치 옴 저항처럼 보이며, 그 저항이 곧 전하 전달 저항(charge-transfer resistance) $R_\text{ct}$ 다. EIS의 고주파 반원 직경이 정확히 이 $R_\text{ct}$ 에 대응한다.

Tafel 영역(large $|\eta|$):

$$\eta = a + b \log_{10} j, \qquad b = \frac{2.303 RT}{\alpha F}$$

여기서 $b$ = Tafel 기울기(slope, V/decade). 25 °C, $\alpha = 0.5$ 에서 $b \approx 118 \text{ mV/dec}$, $\alpha = 1$ 이면 $b \approx 59 \text{ mV/dec}$. 즉 Tafel plot($\log|j|$ vs $\eta$)의 기울기에서 전달 계수를 읽고, 절편을 외삽하면 $\log j_0$ 를 얻는다. 전기촉매 연구에서 활성 비교의 표준 양식이 바로 이 Tafel plot이다.

선형 영역과 Tafel 영역의 경계는 대략 $|\eta| \sim 50{-}100 \text{ mV}$ 이며, 그 중간(non-linear, non-Tafel) 영역에서는 완전한 BV 식을 그대로 써야 한다.

실험에서 Tafel 영역을 깔끔히 보려면 (i) 농도 분극이 들어오기 전에, (ii) 전류가 충분히 커서 한쪽 항이 무시 가능한 영역에서 측정해야 한다. 두 조건의 충돌이 늘 있으며, 그래서 RDE처럼 강제 대류로 $i_L$ 을 키운 환경에서 Tafel 분석을 하는 것이 표준이 된다.

## 5. 교환 전류 밀도 $j_0$

$j_0$ 는 평형에서 양방향으로 흐르는 흐름의 크기이며, 전극 반응의 본질적 속도를 한 숫자로 압축한 양이다. 직관적으로 $j_0$ 가 클수록 같은 전류를 뽑는 데 필요한 과전압이 작다.

기본 정의 형태:

$$j_0 = n F k^\circ (c_O)^{1-\alpha}(c_R)^\alpha$$

각 항: $k^\circ$ = 표준 속도 상수(standard rate constant, m/s), $c_O$, $c_R$ 은 산화/환원종 표면 농도, $\alpha$ = 전달 계수. $k^\circ$ 가 본질적 동역학 상수이며, $j_0$ 는 농도 의존성을 함께 담은 측정 가능한 양이다.

측정은 보통 ① 작은 과전압에서 $R_\text{ct}$ 를 EIS로 잰 뒤 $j_0 = RT/(nF R_\text{ct} A)$ 로 환산하거나, ② Tafel plot을 외삽해 $\eta = 0$ 절편의 $\log j_0$ 를 읽는 방식이다. 두 방법의 결과가 달라지면 단일 단계 BV 가정이 깨졌다는 신호로 본다.

대표값 감각: HER(수소 발생) 반응의 $j_0$ 는 Pt에서 $\sim 10^{-3} \text{ A/cm}^2$, Hg에서 $\sim 10^{-12} \text{ A/cm}^2$ 로 9 orders 차이가 난다. 리튬 이온 배터리 양극(NMC, LFP)의 표면 $j_0$ 는 보통 $10^{-5}{-}10^{-3} \text{ A/cm}^2$ 범위. 흑연 음극의 SEI를 통과하는 lithiation은 SEI 형성 후 $j_0$ 가 한 자릿수 이상 떨어진다.

$j_0$ 는 강한 온도 의존성을 가지며 Arrhenius 식으로 정리된다.

$$j_0(T) = A \exp\!\left(-\frac{E_a}{RT}\right)$$

활성화 에너지 $E_a$ 는 보통 0.3~0.6 eV 수준이며, 온도가 10 K 떨어지면 $j_0$ 가 절반 가까이 줄어드는 일이 흔하다. 이 때문에 저온 출력(cold cranking) 성능 저하의 가장 큰 요인이 활성화 분극이다.

배터리에서 $j_0$ 측정에 자주 쓰이는 형식은 Bruce-Vincent 또는 EIS 기반 $R_\text{ct}$ 측정이며, SOC 의존성과 사이클 의존성을 함께 추적하면 노화 진단에 활용 가능하다. 저온에서는 $R_\text{ct}$ 가 SEI 저항과 같은 자릿수로 커져 두 반원이 겹치는 일이 흔하며, 분리에는 DRT 분석이 유용하다.

## 6. 다단계 반응과 RDS

실제 전극 반응이 깔끔한 단일 단계인 경우는 드물다. 다전자 반응(multi-electron reaction)인 4e⁻ ORR, 2e⁻ HER, 다단계 양극 redox 등은 여러 elementary step을 거치며, 그중 가장 느린 단계가 율속 단계(RDS, rate-determining step)다.

RDS 가정 아래서는 BV와 같은 형태의 식이 여전히 성립하지만, 외관 전달 계수 $\alpha_\text{app}$ 와 외관 전자 수 $n_\text{app}$ 가 단일 단계 값과 달라진다. 이 외관 값에서 단일 단계 정보를 그대로 읽으려 하면 늘 오류를 만든다.

다단계 반응의 일반화 형태:

$$\alpha_\text{app} = \frac{n_b}{\nu} + r \beta$$

여기서 $n_b$ = RDS 이전에 이동한 전자 수, $\nu$ = RDS의 화학량적 계수, $r$ = RDS에서 이동하는 전자 수(보통 1), $\beta$ = 대칭 인자(보통 0.5). 이 표현은 IUPAC 권고에 따른 정의이며, 실험적으로는 Tafel 기울기 $b$ 의 값(예: 30, 40, 60, 120 mV/dec)을 통해 어떤 단계가 RDS인지 역추적한다. 예: ORR에서 60 mV/dec는 첫 번째 전자 이동 후 화학 단계가 RDS, 120 mV/dec는 첫 번째 전자 이동 자체가 RDS.

배터리 lithiation의 경우, 표면 desolvation → SEI 통과 → 표면 charge transfer → bulk diffusion 이라는 직렬 과정이 동시에 진행되며, 어느 단계가 RDS인지가 SOC·온도·C-rate에 따라 바뀐다. 이 때문에 단일 BV 식으로 끝까지 fit하는 시도는 한계가 있고, 보통 EIS의 다중 반원 + Warburg를 직접 분해해서 각 단계의 시간 상수를 본다. 분극 분해의 실전 부분은 [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md) 에서 다룬다.

실용 정리: 단일 BV로 fit이 잘 되지 않는 시스템에서 (i) Tafel 기울기가 30/40/60/120 mV/dec 중 어디에 가까운지, (ii) 사이클 진행에 따라 그 값이 변하는지, (iii) EIS 반원 개수가 몇 개로 분리되는지를 함께 보면 RDS 전환을 진단할 수 있다. 이 다층 진단이 단일 식 fitting보다 항상 우선이다.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Chapter 3: 전극 반응 속도론과 Butler-Volmer.
- Bockris, J. O'M., Reddy, A. K. N. *Modern Electrochemistry* Vol. 2A (Kluwer, 2000) — Tafel/BV의 통합적 처리.
- Marcus, R. A. *J. Chem. Phys.* 24 (1956) 966 — Marcus 전자 이동 이론 원전.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — 다단계 반응과 RDS 정량.
- Compton, R. G., Banks, C. E. *Understanding Voltammetry* (3rd ed., World Scientific, 2018) — Tafel 분석 실전.
