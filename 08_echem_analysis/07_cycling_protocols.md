# Cycling Protocols (Formation·Calendar·Accelerated Aging)

## 1. 개요

배터리 수명 평가는 단일 측정으로 끝나지 않는다. 어떤 전류로·어떤 전압 윈도우에서·어떤 SOC에서·어떤 온도에서 cycling하느냐가 결과를 결정한다. **Cycling protocol** 은 이 매트릭스를 표준화한 절차이며, 새 소재 평가·셀 검증·BMS(battery management system) 알고리즘 개발 모두의 출발점이다.

본 절은 세 가지 표준 프로토콜을 정리한다: (1) **Formation cycle** — 첫 사이클의 SEI 형성과 안정화, (2) **Calendar aging** — 시간 경과만의 노화, (3) **Accelerated aging** — 가속 조건의 cycling. 각각이 다른 노화 모드를 표적으로 하며, 셀 lifetime의 다른 측면을 조명한다.

직관적으로: formation은 "셀을 안정 상태로 만드는 절차", calendar는 "쓰지 않을 때 얼마나 견디나", accelerated는 "험한 사용에 얼마나 견디나"를 측정한다.

## 2. Formation Cycle

새 셀의 첫 3~5 사이클은 SEI 형성·전극 wetting·구조 안정화로 비정상이다. 이 시기를 통제된 조건 아래 통과시키는 것이 formation의 목적. 상용 셀 제조에서는 formation에 며칠을 투자하는 것이 표준이며, 이 단계에서의 품질이 lifetime을 가장 크게 좌우한다.

**표준 절차**:
- 전류: 0.05~0.1C (매우 낮은 전류로 부반응 최소화)
- 사이클 수: 3~5회
- 정전압 hold: 상한 cutoff 도달 후 전류가 0.01C 이하로 떨어질 때까지 유지 (CV step)
- 휴지: 충/방전 사이 30 min~1 h
- 온도: 25 °C 표준 (45 °C에서 SEI를 더 빠르게 안정화하는 변형도 있음)

**핵심 효과**:
- 흑연 표면에 안정한 SEI 형성 (음극 passivation)
- 활물질 입자 간 wetting (전해질 침투)
- 구조 변화의 첫 단계 통과 (irreversible structural rearrangement)
- 전극 두께 안정화

> **관련 개념: SEI 형성과 첫 사이클 비가역 손실**
> 흑연·Si 음극의 첫 충전(lithiation) 동안 0.5~1.5 V vs Li/Li⁺ 영역에서 전해질이 분해되며 SEI(solid electrolyte interphase)가 형성. 이 과정에 충전 용량 일부 (보통 5~30%)가 비가역으로 소모.
> 정량 지표: ICE = $Q_\text{discharge,1st}/Q_\text{charge,1st}$. 흑연 90~95%, Si 70~85%. 낮은 ICE = 더 많은 Li 손실 = full-cell에서 양극 잉여 필요.
> 가정: SEI가 안정 형성되어 후속 사이클에서 부반응 무시 가능. Si 같은 부피 변화 큰 소재에서는 SEI가 매 사이클 부서지고 재형성되어 가정 깨짐 → 누적 ICE 손실.

Formation 후의 사이클부터가 진짜 평가 데이터다. Formation 사이클을 분석에 포함시키면 ICE·voltage hysteresis가 비정상으로 보이며, 거의 모든 분석에서 formation은 분리해 따로 보고한다.

## 3. Calendar Aging

Calendar aging은 셀을 **가만히 놓아둔 채** 시간이 지남에 따른 capacity loss·resistance 증가를 측정한다. 즉 실제 사용(cycling)이 없어도 진행되는 노화. EV에서 셀이 주차장에 며칠씩 그대로 있는 상황을 모사한다.

**표준 절차**:
- SOC 고정 (보통 50%, 80%, 100% 중 선택. 또는 다중 비교)
- 온도 고정 (25, 45, 60 °C)
- 정기 체크: 매주 또는 매월 capacity·EIS 측정 후 다시 SOC 복귀
- 기간: 6 개월 ~ 2 년

**Capacity loss vs $\sqrt{t}$**: SEI 성장이 확산 지배일 때 (Tafel-like 자가 방전 + Fick-like SEI 두께 증가), capacity loss는 시간의 제곱근에 비례한다. 이 거동이 계산 모형으로 가장 자주 쓰이는 형태:

$$\Delta Q(t) \propto \sqrt{t}$$

이 거동이 보이면 SEI growth가 지배적, 다른 거동이면 다른 메커니즘 (Li plating, particle cracking, transition metal dissolution).

**SOC와 온도의 영향**:
- 고 SOC (100%): 양극의 강한 산화 환경 → CEI 형성 가속, transition metal dissolution
- 저 SOC (0%): 음극이 산화되어 SEI 분해
- 중간 SOC (30~70%): calendar aging 최소
- 고온: Arrhenius로 모든 부반응 가속 (10 °C 상승에 보통 2배 가속)

이 때문에 EV·ESS 권장 SOC가 보통 30~80% 영역이며, 100% 충전 후 즉시 사용·30% 이하 방전 회피가 BMS의 표준 정책.

## 4. Accelerated Aging

실제 lifetime (수년) 을 실험실에서 측정하는 것은 비현실적. **가속 조건** (고온·고 SOC·고 DOD·고 C-rate) 으로 lifetime을 압축해 측정한 뒤 Arrhenius·Eyring 외삽으로 실제 사용 조건의 lifetime을 추정.

**표준 가속 조건**:
- 온도: 45, 55, 60 °C (상온 25 °C 대비 가속 인자 ~5~20배)
- C-rate: 1C, 2C (느린 cycling 대비)
- DOD (Depth of Discharge): 100% (full cycle, 0~100% SOC) — 부분 cycling보다 가속
- Voltage range: 정격 윈도우의 상한·하한을 조금씩 확장

**Arrhenius 외삽**:

$$\frac{1}{\tau_\text{life}} = A \exp\!\left(-\frac{E_a}{RT}\right)$$

3개 이상의 온도에서 lifetime $\tau$ 를 측정하고 $\ln(1/\tau)$ vs $1/T$ 직선의 기울기에서 $E_a$ 추출. 보통 0.4~0.8 eV. 이 $E_a$ 로 25 °C lifetime을 외삽.

**한계**: 고온에서 활성화되는 노화 메커니즘과 상온의 노화 메커니즘이 다를 수 있다. 60 °C의 결과를 25 °C로 바로 외삽하면 한 자릿수 이상 어긋날 수 있으므로, **여러 온도의 점이 같은 직선에 있는지** 가 중요한 검증.

## 5. Voltage Hold (정전압 유지)

Cycling 프로토콜의 변형으로, **상한 cutoff 도달 후 정전압을 일정 시간 유지** 하는 voltage hold가 추가되는 경우가 많다.

목적:
- 진짜 capacity 측정 (분극 제거)
- High-voltage stress test (양극 산화 한계 점검)
- 안정성 평가 (CEI 형성 가속화)

**Hold 조건 명시 필수**: "1C cycling, 2.7-4.2 V" 만 적으면 hold 여부가 불명. "1C charge to 4.2 V, hold at 4.2 V until I < 0.05C, 1C discharge to 2.7 V" 같이 명시해야 재현 가능.

Hold 시간이 길수록 capacity 측정값은 커지지만(완전 평형에 가까워짐), 동시에 양극의 산화 stress가 누적되어 노화가 빨라진다. 이 trade-off가 BMS 설계의 핵심.

## 6. BMS-Relevant Test와 SOC 윈도우

상용 셀 평가의 표준은 셀 화학별 권장 윈도우로 cycling. 이 값들은 제조사 datasheet에 명시되며, 모든 비교 측정의 baseline.

**셀 화학별 표준 윈도우**:

| 화학 | Voltage 윈도우 | 비고 |
|------|---------------|------|
| NMC (LiNi$_x$Mn$_y$Co$_z$O₂) | 2.7 - 4.2 V (3.0-4.4 V high-V) | high-V는 NMC811 이상 |
| NCA | 2.5 - 4.2 V | LCO와 유사 |
| LCO (LiCoO₂) | 3.0 - 4.2 V | 4.35 V high-V도 사용 |
| LFP (LiFePO₄) | 2.0 - 3.65 V | plateau가 평탄해 SOC 추정 어려움 |
| LMO (LiMn₂O₄) | 3.0 - 4.3 V | Mn dissolution 우려 |
| 흑연 anode | 0.005 - 1.5 V | 0 V 미만은 Li plating |
| Si anode | 0.005 - 1.0 V | 부피 변화 큼 |
| LTO anode | 1.0 - 2.5 V | 1.55 V plateau |

**DOD/SOC 윈도우 영향**: 0~100% full cycling이 가장 가혹하며 (DOD 100%), 30~80% partial cycling이 가장 부드럽다. EV의 BMS는 보통 셀 정격의 80%만 사용 (DOD 80%) 해 calendar+cycle aging의 균형을 맞춘다.

**Reference test 추가**: 가속 cycling 중 정기적으로 (보통 50 또는 100 사이클마다) 표준 reference test (0.1C cycle + EIS) 를 끼워 넣어 capacity·resistance trend를 추적. 이 reference test의 데이터가 사후 분석의 backbone.

## 7. 측정 시 주의사항

Cycling 프로토콜의 흔한 함정.

- **온도 제어 부족**: 챔버 없이 실험실 온도로만 cycling하면 계절·시간 변동이 lifetime 데이터에 들어옴. 25 ± 1 °C 챔버 필수.
- **Cell-to-cell 분산**: 동일 조건 측정도 셀 간 lifetime이 ±20% 변동. 통계적 결론을 위해 최소 3~5개 셀 병렬 측정.
- **Reference test 누락**: 가속 cycling만 진행하면 어느 시점의 capacity인지 추적 불가. 정기 reference test 필수.
- **Data sampling rate**: GCD 곡선 분석에 충분한 sampling (예: 10 mV마다 데이터점) 이 필요. 너무 듬성하면 voltage hysteresis·plateau 위치 부정확.
- **Cycling 중 측정 변경**: 사이클 도중 C-rate·temperature 변경하면 이전 데이터와 비교 어려움. 한 프로토콜은 끝까지 유지.
- **SOH (State of Health) 정의**: 보통 capacity가 80%로 떨어지는 시점을 EOL (end of life). 이 기준이 다르면 lifetime 보고가 비교 불가.

각 측정 ([`./02_gcd_rate.md`](./02_gcd_rate.md), [`./03_eis_practical.md`](./03_eis_practical.md), [`./04_gitt_pitt.md`](./04_gitt_pitt.md)) 의 결과는 cycling 프로토콜의 특정 시점에서 측정되며, 어떤 프로토콜의 어느 시점인지를 명시하지 않은 데이터는 비교 불가하다. 표준 프로토콜의 명시가 모든 데이터 보고의 출발점.

## 참고 문헌

- Plett, G. L. *Battery Management Systems* Vol. 1–2 (Artech House, 2015) — cycling·SOC·SOH의 BMS 표준 처리.
- Broussely, M., Biensan, P., Bonhomme, F., Blanchard, P., Herreyre, S., Nechev, K., Staniewicz, R. J. *J. Power Sources* 146 (2005) 90 — Li-ion calendar life와 외삽 방법.
- Schmalstieg, J., Käbitz, S., Ecker, M., Sauer, D. U. *J. Power Sources* 257 (2014) 325 — calendar + cycle aging의 분리 모형.
- USABC (US Advanced Battery Consortium) *Electric Vehicle Battery Test Procedures Manual* — accelerated aging 표준 절차.
- Dubarry, M., Devie, A., Liaw, B. Y. *J. Power Sources* 360 (2017) 59 — formation 프로토콜이 lifetime에 미치는 영향.
