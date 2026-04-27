# 전기화학 열역학 (Electrochemical Thermodynamics)

## 1. 개요

전기화학 열역학은 "이 셀이 원리적으로 낼 수 있는 전압은 얼마이며, 그 전압이 농도/조성/pH에 따라 어떻게 움직이는가"라는 질문에 답한다. 동역학(kinetics)이 "얼마나 빨리"를 다루는 반면, 열역학은 "어디로 가야 하는지"를 정한다. 즉 OCV(open-circuit voltage)와 평형 전위는 모두 열역학이 결정하며, 분극(polarization)·과전압(overpotential)은 그로부터의 이탈로 정의된다.

배터리 연구에서 열역학이 자주 등장하는 자리는 네 군데다. ① 신소재의 이론 전압 추정, ② SOC에 따른 OCV 변화 해석, ③ 부식·부동태 영역 판단(Pourbaix), ④ 농도가 비이상적일 때의 활동도(activity) 보정. 본 절은 이 네 영역의 결과 식과 가정을 정리한다.

## 2. Gibbs 자유 에너지와 셀 전압

전기화학 셀의 전기적 일은 곧 Gibbs 자유 에너지 변화의 음수다. 가역적으로 전하 $nF$ (mol당)를 전위차 $E$ 에 거슬러 옮길 때 한 일이 정확히 $\Delta G$ 와 같아지기 때문이다.

이것은 단순한 정의가 아니라, 정압·정온의 가역 과정에서 비-PV 일의 최댓값이 $\Delta G$ 라는 열역학 일반론의 직접적 결과다. 다시 말해 "셀 전압 × 옮긴 전하량 = 가역 일 = $-\Delta G$" 라는 등식이 핵심이며, 모든 전기화학 평형 식이 여기서 파생된다.

$$\Delta G = -nFE$$

여기서 $n$ 은 반응당 이동하는 전자 수, $F = 96{,}485 \text{ C/mol}$ (Faraday 상수), $E$ 는 셀 전압(EMF, electromotive force). 이 식의 부호 규약은 "자발적 셀 반응 → $\Delta G < 0$ → $E > 0$"가 되도록 잡혀 있다.

표준 상태에서는 $\Delta G^\circ = -nFE^\circ$ 이며, $E^\circ$ 는 셀의 표준 전압이다. 표준 상태란 모든 화학종의 활동도가 1, 기체는 1 atm, 용질은 1 M, 순수 고체/액체로 정의된다.

반쪽반응(half-reaction)을 산화·환원으로 분리하면, 전체 셀 전압은 두 표준 환원 전위의 차로 조립된다. 두 반쪽전지를 IUPAC 표기법으로 적은 뒤 오른쪽(환원, 캐소드)에서 왼쪽(산화, 애노드)을 빼는 관습이다.

$$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$$

이때 $\Delta G$ 는 상태 함수이므로 두 반쪽반응의 $\Delta G^\circ$ 를 단순히 더한 뒤 $-nF$ 로 나누면 된다. 다만 두 반쪽반응의 $n$ 이 다르면 전위는 직접 더할 수 없고, 반드시 자유 에너지 단위로 환산한 뒤 합산해야 한다. 이 점을 무시하면 다전자 반응(예: O₂의 4전자 환원과 2전자 환원의 결합)에서 즉시 부호·크기 오차가 발생한다.

엔트로피 항도 함께 본다: $\Delta G = \Delta H - T\Delta S$ 이므로 $\partial E/\partial T$ 측정은 곧 $\Delta S$ 측정이며, 이것이 배터리의 가역열(reversible heat) 측정 원리다 — 자세한 적용은 [`./../06_battery_operation/05_thermal.md`](../06_battery_operation/05_thermal.md) 참조.

## 3. Nernst 식

표준 상태가 아닐 때(즉 농도/활동도가 1이 아닐 때) 평형 전위는 표준 전위에서 어긋난다. 이 어긋남을 정량화하는 것이 Nernst 식이며, 화학 포텐셜(chemical potential)의 활동도 의존성을 셀 반응에 적용한 결과다.

직관적으로, 산화종이 많고 환원종이 적으면 환원 추진력이 커져 전위가 높아진다. 화학 포텐셜의 정의에서 시작하면:

$$\mu_i = \mu_i^\circ + RT \ln a_i$$

각 항: $\mu_i^\circ$ = 표준 화학 포텐셜, $a_i$ = 활동도. 셀 반응의 $\Delta G = \sum \nu_i \mu_i$ 를 활동도로 풀어 $-nFE$ 와 같다 두면 Nernst 식이 나온다.

$$E = E^\circ - \frac{RT}{nF} \ln Q$$

각 항: $E^\circ$ = 표준 환원 전위, $R = 8.314 \text{ J/mol·K}$, $T$ = 절대 온도, $n$ = 전자 수, $Q = \prod a_i^{\nu_i}$ = 반응 지수(reaction quotient, 산화종/환원종 활동도 비). 25 °C에서 $RT/F = 25.69 \text{ mV}$, $RT \ln 10 / F = 59.16 \text{ mV/decade}$ 이며, $F/RT \approx 38.92 \text{ V}^{-1}$.

이 수치는 EIS·Butler-Volmer 식 등 거의 모든 전기화학 식에서 반복적으로 등장한다. 다전자 반응이라면 $n$ 으로 나뉘어 기울기가 작아진다 — 예: 2전자 반응이면 29.6 mV/decade.

배터리 맥락에서는 활물질의 Li 점유율 $x$ 가 활동도에 직접 들어가므로, OCV(SOC) 곡선이 곧 Nernst 식의 그래프가 된다. 단일 고용체(solid solution) 영역에서는 $a_\text{Li}(x)$ 가 연속이라 OCV가 slope를 그리고, 두 상이 공존하는 영역에서는 화학 포텐셜이 일정해져 plateau가 나타난다.

충방전 곡선의 모양은 이렇게 [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md) 본문에서 다룬 바와 정확히 같은 origin을 공유한다. 즉 V-Q 곡선은 활물질의 Nernst 평형을 SOC 함수로 직접 측정한 것이다.

## 4. 표준전극전위와 SHE 기준

전위는 절대값이 아니라 어떤 기준 전극에 대한 차이다. 절대 전위는 진공 준위 또는 자유 전자 기준으로 정의되지만, 측정 가능한 양이 아니므로 실용적으로는 늘 상대값을 쓴다.

IUPAC 표준은 **표준수소전극(SHE, standard hydrogen electrode)** 으로, 1 atm H₂ / 1 M H⁺ / Pt 계에서 $E^\circ_\text{SHE} \equiv 0 \text{ V}$ 로 정의한다. 모든 표준 환원 전위 $E^\circ$ 표는 이 기준에 대한 값이다.

배터리에서는 **Li/Li⁺** 가 사실상의 작업 기준이며, $E^\circ(\text{Li}^+/\text{Li}) = -3.04 \text{ V vs SHE}$. 따라서 "vs Li/Li⁺" 축의 값과 "vs SHE" 축의 값은 +3.04 V 만큼 평행 이동하면 된다.

흔히 쓰는 다른 기준: Ag/AgCl(+0.197 V vs SHE), 포화 칼로멜(saturated calomel electrode, SCE, +0.241 V vs SHE), Hg/HgO(알칼리계). 비수계 측정에서는 페로센(Fc/Fc⁺) 내부 기준이 IUPAC 권고 표준이며, 용매 간 비교가 가능하도록 보정한다.

표준 전위 표를 사용해 셀의 이론 전압을 즉시 추정할 수 있다. 예: LiCoO₂의 Li 탈리(Li₀.₅CoO₂ + 0.5 Li⁺ + 0.5 e⁻ → LiCoO₂) 평형이 약 +3.9 V vs Li/Li⁺ 부근, 흑연 lithiation은 ~0.1 V vs Li/Li⁺. 따라서 full-cell OCV ≈ 3.8 V로 빠르게 추정된다.

다만 표 값은 수용액 1 M 표준이므로, 비수용액 배터리에서는 정확한 값이 아니라 정성 비교용임에 주의해야 한다. 정확한 비수계 값은 first-principles DFT 계산(insertion energy 기반 voltage prediction)이나 직접 측정으로 확보한다.

## 5. 활동도와 활동도 계수

이상 용액(ideal solution)에서는 활동도 $a_i$ 가 농도(또는 몰분율)와 같지만, 이온은 장거리 쿨롱 상호작용 때문에 거의 항상 비이상적이다. 그래서 농도 자리에 보정 인자 $\gamma$ 를 곱한 활동도를 써야 Nernst 식이 정확해진다. 직관적으로, 이온 농도가 높을수록 자기 자신을 둘러싼 반대 전하 구름(이온 분위기)이 자유 에너지를 낮추므로 "유효 농도"가 명목 농도보다 작아진다.

$$a_i = \gamma_i \frac{m_i}{m^\circ}, \qquad \mu_i = \mu_i^\circ + RT \ln a_i$$

여기서 $\gamma_i$ = 활동도 계수(activity coefficient, 무차원), $m_i$ = 몰랄 농도, $m^\circ = 1 \text{ mol/kg}$ 기준 농도. 양/음이온은 따로 측정할 수 없으므로 평균 이온 활동도(mean ionic activity) $a_\pm$ 와 평균 활동도 계수 $\gamma_\pm$ 를 쓴다. 1-1 전해질의 경우 $a_\pm = \gamma_\pm m / m^\circ$.

희석 영역에서는 Debye–Hückel 식이 $\gamma_\pm$ 를 이온 강도(ionic strength)의 함수로 준다.

$$\log \gamma_\pm = -A |z_+ z_-| \sqrt{I}, \qquad I = \frac{1}{2}\sum c_i z_i^2$$

각 항: $A \approx 0.509$ kg^(1/2)/mol^(1/2) (25 °C 수용액), $I$ = 이온 강도 (mol/kg). 이 식은 0.01 M 미만에서 유효하며 ($I < 10^{-2}$ mol/kg), 그보다 농축이면 Davies 또는 확장 Debye–Hückel 식으로 보정한다.

농축 전해질(예: 1 M LiPF₆ in EC/DMC 또는 LiTFSI 용액)에서는 Debye–Hückel이 깨지므로 Pitzer 모델 또는 분자동역학(molecular dynamics, MD)에 기반한 활동도 보정이 필요하다. 배터리 전해질이 거의 항상 1 M 이상 농축이라는 점이, 단순 Nernst 적용에 늘 따라붙는 caveat이다.

추가로 LHCE(localized high-concentration electrolyte)나 WiSE(water-in-salt electrolyte) 같은 초농축 전해질에서는 활동도가 크게 어긋나며, 이 비이상성이 오히려 음극 안정성 향상의 원천이 된다(SEI 화학을 음이온 분해 쪽으로 유도).

## 6. Pourbaix 다이어그램

Pourbaix 다이어그램은 가로축에 pH, 세로축에 전극 전위(보통 vs SHE)를 두고, 어떤 원소의 어떤 화학종(이온/산화물/수산화물/금속)이 가장 안정한지를 영역으로 표시한 지도다.

직관적으로, "전압을 올리면 산화 쪽으로, pH를 올리면 가수분해/수산화물 쪽으로 안정 영역이 이동한다"는 그림이다. 부식 연구에서 출발했지만 수계 배터리·전기촉매 연구에서도 1차 스크리닝 도구로 쓴다.

다이어그램의 각 경계선은 두 화학종 간 평형의 Nernst 식이 그대로 직선으로 나타난 것이다. 일반화 형태로 보면:

$$E = E^\circ - \frac{2.303 \, RT}{nF} \log\!\left(\frac{[\text{Red}]}{[\text{Ox}]}\right) - \frac{2.303 \, m \, RT}{nF} \, \text{pH}$$

각 항: $n$ = 전자 수, $m$ = H⁺ 수, 마지막 항이 곧 사선 기울기를 결정한다. 전자만 관여하는 평형은 수평선($E$ 만 의존), H⁺만 관여하면 수직선(pH만 의존), 전자와 H⁺가 함께 들어가면 음의 기울기 사선(보통 −59 mV/pH × $m/n$ at 25 °C)을 그린다.

물의 안정성 한계도 함께 표시되며 ($O_2/H_2O$ 윗선, $H_2O/H_2$ 아랫선), 그 사이가 물이 안정한 창이다. 이 창의 폭은 1.23 V로 좁아서, 수계(aqueous) 배터리의 작동 전압이 강하게 제한된다.

세 가지 영역으로 해석한다. **부식(corrosion)** 영역은 금속이 이온 형태로 용해되는 자리, **부동태(passivation)** 영역은 산화물/수산화물 박막이 표면을 덮어 추가 부식을 막는 자리, **면역(immunity)** 영역은 금속 자체가 가장 안정한 자리. 예: Mn-Pourbaix는 LiMn계 양극에서 산성 환경의 Mn²⁺ 용출 위험을 즉각 보여주며, HF 부산물이 만들어내는 국소 산성 환경이 Mn dissolution 가속의 열역학적 배경이다.

단점도 분명한데, Pourbaix는 순수 열역학 안정성만 다루고 동역학(부동태막의 형성 속도, 핵생성 장벽)은 무시한다는 점을 항상 기억해야 한다. 실제 부동태막의 효과는 보통 Pourbaix 예측보다 훨씬 보호적이다 — Al, Ti 등이 대표적 사례이며, 비수계 전해질에서 Al 집전체가 4 V 이상까지 견디는 이유도 이 동역학적 부동태(LiF 기반 표면층) 덕분이다.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods: Fundamentals and Applications* (2nd ed., Wiley, 2001) — Chapter 2: 열역학과 Nernst 식.
- Atkins, P., de Paula, J. *Physical Chemistry* (11th ed., Oxford, 2018) — 화학 포텐셜과 활동도 표준 처리.
- Pourbaix, M. *Atlas of Electrochemical Equilibria in Aqueous Solutions* (NACE, 1974) — Pourbaix 다이어그램 원전.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — 농축 전해질의 활동도 처리.
- Robinson, R. A., Stokes, R. H. *Electrolyte Solutions* (Dover, 2002) — 활동도 계수 측정과 Debye–Hückel 한계.
