# 열 현상 (Thermal Phenomena in Batteries)

## 1. 개요

배터리는 충방전 중 항상 열을 발생시킨다. 발열원은 단일하지 않고, 가역적(엔트로피 변화)·비가역적(저항 손실, 과전압) 두 부류로 나뉜다. 두 성분을 정량 분리할 수 있어야 셀 설계의 효율, 수명, 그리고 무엇보다 **안전(열폭주, thermal runaway)** 까지 일관되게 예측할 수 있다.

작동 온도가 셀의 거의 모든 동역학 파라미터($D$, $j_0$, $\sigma_\text{ion}$ 등)를 Arrhenius 거동으로 지배하므로, 열 관리는 성능과 수명에 동시에 영향을 미친다.

## 2. 가역열 (Reversible Heat)

엔트로피가 SOC에 따라 변하면, 충전/방전이 흡열 또는 발열 반응이 된다. 이는 손실이 아니라 **열역학적으로 가역적**인 발열/흡열이며, 충전 시 흡열했던 열은 방전 시 정확히 같은 양만큼 발열된다(또는 반대). 직관적으로, $\Delta S > 0$ 인 방향으로 진행하면 흡열이고, $\Delta S < 0$ 인 방향이면 발열이다.

> **관련 개념: Gibbs 자유 에너지와 OCV의 온도 의존성**
> 셀 반응의 자유 에너지와 평형 전위는 $\Delta G = -nFE$ 로 직접 연결된다. 자유 에너지의 온도 미분이 엔트로피이므로 ($\Delta S = -\partial\Delta G/\partial T$), 두 식을 결합하면 OCV의 온도 미분이 그대로 반응 엔트로피를 준다: $\Delta S = nF(dE_{OCV}/dT)$.
> 측정 방법: 셀을 일정 SOC에서 평형화한 뒤 온도를 단계적으로 변화시키며 OCV를 기록한다. 기울기 $dE_{OCV}/dT$ 는 보통 0.05 ~ 0.5 mV/K 수준이며, 부호는 SOC와 소재 조성에 따라 달라진다 (충전 시 흡열인지 발열인지가 SOC 구간마다 뒤집힘).
> 의미: 엔트로피 프로파일의 변곡점은 상전이/ordering 전이와 일대일 대응되며, 따라서 entropy profiling은 열량(가역열) 정보뿐 아니라 결정학적 사건의 비파괴 진단 도구이기도 하다.

가역 발열률은 다음 식으로 표현된다.

$$q_\text{rev} = T \, \Delta S \cdot \frac{I}{nF} = I \, T \, \frac{dE_\text{OCV}}{dT}$$

여기서 $I$는 전류, $T$는 절대 온도, $dE_\text{OCV}/dT$는 entropy coefficient(엔트로피 계수, μV/K~mV/K). 측정법은 셀을 충분히 이완시킨 뒤 다양한 온도에서 OCV를 잰 다음 온도에 대한 기울기를 추출하는 potentiometric 방법이 표준이다.

## 3. 비가역열 (Irreversible Heat)

비가역 발열은 모두 손실이다. 옴 저항에서 발생하는 줄열, 전하 이동/물질 전달 과전압이 만드는 손실, 그리고 농도 이완 과정에서 나오는 mixing heat가 합쳐진다. 직관적으로, 평형 OCV와 실제 작동 전압의 차이만큼이 비가역 손실의 척도다.

$$q_\text{irr} = I(E_\text{OCV} - V) = I \cdot \eta_\text{total}$$

세부 분해:
- **옴열**: $q_\Omega = I^2 R_s$. 항상 발열, $I$의 부호와 무관.
- **활성화 분극열**: $q_\text{ct} = I \eta_\text{ct}$.
- **농도 분극열**: $q_\text{conc} = I \eta_\text{conc}$.
- **Mixing heat**: 휴지 중 농도 구배가 평탄화되며 발생하는 추가 발열.

이 둘을 합친 표준 발열 식이 **Bernardi 식**이다.

$$q = I(E_\text{OCV} - V) + I T \frac{dE_\text{OCV}}{dT}$$

첫 항은 비가역, 둘째 항은 가역 성분. 충전 시 ($I < 0$ 부호 약속에 따라) 둘째 항의 부호가 바뀌므로 SOC 영역에 따라 흡열 또는 발열이 된다.

## 4. 엔트로피 측정 (Entropy Profiling)

$dE_\text{OCV}/dT$ 의 SOC 프로파일은 **상전이/ordering 전이의 시그니처**다. 평탄한 plateau 영역에서는 두 상의 자유 에너지 균형으로 $dE/dT$ 가 거의 일정하지만, ordering 전이점이나 상전이 경계에서는 급격한 피크/딥이 나타난다. 그래서 엔트로피 프로파일은 결정학적 정보를 담는다.

| 측정 단계 | 절차 |
|---------|------|
| 1. 셀을 특정 SOC로 정확히 조정 (CC + CV after CC) | |
| 2. 충분한 휴지로 평형 도달 (보통 수 시간) | |
| 3. 챔버 온도를 단계적으로 변화 (예: 25 → 15 → 35 °C, 각 1~2 h) | |
| 4. 각 온도에서 안정된 OCV 기록 | |
| 5. $dE/dT$ 선형 회귀로 추출 | |

흑연의 stage 전이점, NMC의 H1↔H2 전이, LFP의 2상 경계 등이 엔트로피 피크로 명확히 보인다. 노화에 따라 이 피크가 사라지면 활물질 결정성 손실의 신호다.

## 5. 열폭주 (Thermal Runaway)

내부 온도가 일정 임계값을 넘으면 **자가 가속 발열 반응이 연쇄적으로 일어나며 셀 파국**으로 이어진다. 직관적으로, 발열 반응이 발열을 일으키고 그 발열이 다음 발열 반응의 활성화를 가속하는 양의 피드백 루프다. 발열률이 방열률을 초과하면 ARC 모델 기준으로 열폭주가 시작된다.

3단계 모델 (Feng et al.):
1. **Onset**: SEI 분해(~80–120 °C). 음극이 노출되며 전해질과 직접 반응 시작.
2. **Acceleration**: 분리막 용융(~130–160 °C), 양극 결정상 붕괴 시작, 전해질 산화.
3. **Runaway**: 양극에서 격자 산소 방출(~200 °C 이상, NMC), 전해질 연소, 셀 venting/발화.

핵심 발열 반응:
- 양극 산소 방출: 예: $\text{NMC}_x \to \text{NMC}_y + \text{O}_2$ 형식 (정확한 stoichiometry는 조성 의존).
- 전해질 연소: $\text{O}_2 + \text{용매} \to \text{CO}_2 + \text{H}_2\text{O}$ 등.
- TM 환원: 음극에서 환원되며 추가 발열.

ARC(Accelerating Rate Calorimetry)는 self-heating rate $dT/dt$ 를 온도의 함수로 측정해 onset 온도, T₂(자가 가속 시작점), T₃(폭주 임계)를 정량한다. 셀 안전 등급 평가의 표준 방법이다.

## 6. 열 모델링 기초

셀 수준 열 거동의 가장 단순한 모델은 발열량을 단일 온도 노드에 모두 집중시키는 lumped thermal model이다.

$$m C_p \frac{dT}{dt} = q_\text{gen} - q_\text{diss}$$

$q_\text{gen}$ 은 Bernardi 식, $q_\text{diss} = h A (T - T_\infty)$ 는 외부 냉각(자연/강제 대류). 직관적으로, 발열률이 방열 능력을 초과하면 온도가 발산한다.

실제 large-format 셀에서는 lumped 모델이 부족해 **3D 열-전기화학 결합 모델**이 필요하다. 핵심 고려 사항:
- **이방성 열전도율**: through-plane(adhesive layer 방향) ~1 W/(m·K) vs in-plane(전극 시트 방향) ~20–30 W/(m·K). 한 자릿수 이상 차이.
- **온도 균일성**: 셀 중심과 표면 온도차가 5 °C를 넘으면 SOC 불균일과 국소 노화 가속.
- **냉각 전략**: 측면 냉각 vs 탭 냉각 vs 침지 냉각. 각각 이방성과 결합되어 다른 결과를 낸다.

## 참고 문헌

- Bernardi, D., Pawlikowski, E., Newman, J. *Journal of The Electrochemical Society* 132 (1985) 5 — Bernardi 일반 발열 식.
- Thomas, K. E., Newman, J. *Journal of Power Sources* 119–121 (2003) 844–849 — 가역열/엔트로피 측정.
- Feng, X. et al. *Energy Storage Materials* 10 (2018) 246–267 — 열폭주 메커니즘 종합 리뷰.
- Bandhauer, T. M. et al. *Journal of The Electrochemical Society* 158 (2011) R1 — 열 관리 전략 리뷰.
