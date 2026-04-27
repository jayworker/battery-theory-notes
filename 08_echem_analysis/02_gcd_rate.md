# GCD와 Rate Capability (Galvanostatic Charge-Discharge)

## 1. 개요

정전류 충방전(galvanostatic charge-discharge, GCD)은 배터리 평가에서 가장 자주 보는 1차 데이터다. 일정 전류 $I$ 를 가하고 시간에 따른 전압을 기록하면, 그 곡선의 기울기·plateau·hysteresis가 곧 전극의 열역학·동역학 fingerprint를 동시에 담는다. Rate capability test는 그 GCD 측정을 여러 C-rate에서 반복해 **출력 vs 용량 trade-off** 를 정량화하는 표준 절차다.

핵심 변수는 셋이다: **C-rate** (충방전 속도), **specific capacity** (mAh/g, 활물질 기준), **capacity retention** (rate 회복률·cycle 후 잔존). 이 세 양만 정확히 측정해도 새 소재의 1차 평가가 끝난다.

## 2. C-rate 정의와 단위 감각

C-rate는 셀의 이론 용량 $C$ 를 1시간에 모두 흘려보내는 전류로 정의한다. 즉 1C는 "1시간에 완방", 0.5C는 "2시간에 완방", 10C는 "6분에 완방"이다. 직관적으로, C-rate는 시간의 역수와 직접 매핑되어 있어 어느 부하(load)인지를 단번에 감지하게 해준다.

$$I_\text{nC} = n \cdot C_\text{theoretical} \quad \text{(A 단위, } C_\text{theoretical} \text{는 Ah 단위)}$$

흔히 쓰이는 환산:
- C/20 ≈ 50 시간 충방전 (formation·평형 측정)
- C/10 ≈ 10 시간 (ICA/DVA 분석용)
- C/2 ≈ 2 시간 (수명 평가 표준)
- 1C ≈ 1 시간 (기준)
- 5C ≈ 12 분 (high-power 응용)
- 10C ≈ 6 분 (extreme rate)

활물질 단위로 환산하면 $I = m \cdot C_\text{specific} \cdot n / 1000$ (A) 형태가 된다. 여기서 $m$ = 활물질 질량 (g), $C_\text{specific}$ = 비용량 (mAh/g). 예: NMC811 5 mg, 200 mAh/g, 0.1C → $I = 5 \times 200 \times 0.1 / 1000 = 0.1$ mA.

C-rate의 흔한 함정: 활물질 질량 기준이 아니라 **셀 nominal 용량 기준** 으로 환산하면 새 소재의 진짜 rate 성능을 가린다. 새 소재 첫 평가는 항상 **활물질 mass-specific** 으로 보고해야 한다.

## 3. Rate Capability 측정 절차

표준 rate test 시퀀스는 **저속 → 고속 → 저속 회복** 의 3단계 구조다. 직관적으로, 처음 저속에서 셀의 이론 한계 용량을 확인하고, 단계적으로 부하를 올려가며 어느 rate에서 무너지는지 보고, 마지막에 다시 저속으로 돌아와 **비가역 손실(irreversible damage)** 이 있었는지 확인한다.

표준 시퀀스 (각 rate에서 5사이클씩):

| 단계 | C-rate | 목적 |
|------|--------|------|
| 1 | 0.1C × 5 cycles | 안정화 + 기준 용량 확인 |
| 2 | 0.5C × 5 | 저속 영역 |
| 3 | 1C × 5 | 표준 |
| 4 | 2C × 5 | 중속 |
| 5 | 5C × 5 | 고속 |
| 6 | 10C × 5 | extreme |
| 7 | 0.1C × 5 | 회복 (비가역 손실 점검) |

회복 단계의 마지막 사이클 용량 ÷ 1단계 마지막 사이클 용량 = **recovery ratio**. 95% 이상이면 high-rate 손상 없음, 90% 미만이면 비가역적 구조 변화·SEI 손상·Li 플레이팅 등이 의심된다.

각 rate에서 5사이클을 도는 이유: 1사이클은 SOC 평형이 안 잡혀 있고, 2~3사이클에서 안정화되며, 4~5사이클의 평균값이 진짜 capacity 값이다. 이를 무시하고 rate별로 1사이클씩만 보면 데이터의 분산이 매우 크다.

## 4. Capacity Retention과 Voltage Hysteresis

같은 rate에서 사이클이 진행될수록 용량이 감소한다 — 이 곡선을 **capacity retention curve** 라 한다. 보통 사이클 수 vs (capacity / 초기 capacity × 100) % 로 plot한다.

$$\text{Retention}(N) = \frac{Q_N}{Q_1} \times 100\%$$

업계 합격선은 보통 80% retention까지의 사이클 수 — NMC 셀의 경우 1C에서 1000 사이클, LFP는 2000~5000 사이클이 표준이다. 이 값이 lifetime의 1차 지표.

Voltage hysteresis는 같은 SOC에서 충전과 방전의 전압 차다. GCD 곡선에서 50% SOC 지점의 충전·방전 전압 차이로 정량화하며, 분극(polarization)이 누적되어 나타나는 동역학적 손실의 직접 지표다. Si 음극처럼 path dependence가 큰 소재는 **본질적 hysteresis** 가 크고, NMC·LFP는 동역학적 hysteresis가 주된 기여다.

> **관련 개념: 분극의 시간 의존성**
> 전류 인가 직후의 전압 강하는 옴 분극 $\eta_\Omega = IR_s$ (즉시), 이어 ms~s에서 활성화 분극 $\eta_\text{ct}$ (Butler-Volmer 지배), 마지막으로 s~분 스케일에서 농도 분극 $\eta_\text{conc}$ 가 발달.
> Voltage hysteresis = $\eta_\text{ct} + \eta_\text{conc}$ 의 합. 옴 성분은 충/방전 부호가 같은 크기로 들어가 hysteresis의 절반에 기여 ($2 \cdot IR_s$).
> 가정: 측정 시간 동안 활물질 구조 변화 없음(단순 동역학적 hysteresis만). LiFePO₄·Si 같은 1차 상전이 소재는 본질적 path dependence가 추가로 들어와 동역학으로만 해석 불가.

## 5. Initial Coulombic Efficiency (ICE)

첫 사이클의 방전 용량 ÷ 첫 사이클 충전 용량이 ICE다. 첫 사이클에서 SEI 형성·전극 활성화·전해질 분해 등 비가역 반응에 충전 용량 일부가 소모되므로, ICE < 100% 가 일반적이다.

$$\text{ICE} = \frac{Q_\text{discharge,1st}}{Q_\text{charge,1st}} \times 100\%$$

(음극 lithiation = 방전이지만 흑연 half-cell에서는 lithiation = 충전인 점에 주의 — 셀 구성에 따라 numerator/denominator 이름이 바뀐다.)

대표값:
- 흑연 음극: 90~95% (SEI 형성)
- Si 음극: 70~85% (큰 부피 변화 + SEI)
- 하드 카본: 70~85%
- NMC 양극: 85~92%
- LFP 양극: 90~95%

ICE가 낮으면 full-cell 조립 시 양극에서 음극으로 가는 Li가 손실되어 전체 용량이 줄어든다. 그래서 새 소재 평가의 첫 핵심 지표 중 하나이며, **prelithiation(사전 리튬화)** 등 ICE를 끌어올리는 공정이 활발히 연구된다.

## 6. Formation Cycle

새 셀의 처음 3~5 사이클은 SEI 형성·전극 wetting·구조 안정화로 비정상이다. 이 시기를 **formation cycle** 이라 부르며, 보통 0.05~0.1C의 매우 낮은 전류로 진행해 부반응을 최소화하고 안정한 SEI를 형성한다. 상용 셀 제조에서는 formation에 며칠을 투자하는 것이 표준이다.

Formation의 핵심 효과:
- 안정한 SEI 형성 (음극 표면 passivation)
- 활물질 입자 wetting 개선
- 구조 변화의 첫 단계 통과 (irreversible structural rearrangement)
- 전극 두께 안정화

Formation 후의 사이클부터가 진짜 평가 데이터다. Formation 사이클을 분석에 포함시키면 ICE·voltage hysteresis가 비정상으로 보이며, 거의 모든 분석에서 formation은 분리해서 따로 보고한다.

## 7. 측정 시 주의사항

GCD의 정량 해석은 측정 setup에 매우 민감하다.

- **온도 제어**: 25 ± 1 °C 챔버. 10 K 차이가 rate capability를 한 자릿수 바꾸기 충분.
- **Voltage cutoff**: 상한·하한 전위를 너무 좁히면 plateau를 다 못 보며, 너무 넓히면 부반응 영역. 셀 화학에 따라 표준 윈도우 사용 (NMC 2.7-4.2 V, LFP 2.0-3.65 V, 흑연 0.005-1.5 V).
- **Active mass loading**: 매우 얇은 코팅(< 1 mg/cm²)은 비현실적으로 좋은 rate를 보인다. 상용 의미가 있으려면 3~10 mg/cm² 권장.
- **Rest time**: 충/방전 사이의 휴지 구간을 충분히 (보통 30 min~1 h) 두지 않으면 분극이 누적되어 측정값이 왜곡됨.
- **CV(constant voltage) hold**: 상한 전위 도달 후 전류가 임계값 이하로 떨어질 때까지 정전압 유지하면 진짜 capacity 측정에 가깝다. C-rate 비교 시 hold 조건을 명시할 것.

[`./03_eis_practical.md`](./03_eis_practical.md) 와 [`./04_gitt_pitt.md`](./04_gitt_pitt.md) 의 측정 결과는 GCD의 SOC 분해와 결합해 해석되며, GCD 곡선의 plateau 위치가 변할 때 EIS의 어느 반원이 같이 변하는지를 추적하는 것이 표준 진단 절차다.

## 참고 문헌

- Plett, G. L. *Battery Management Systems* Vol. 1 (Artech House, 2015) — C-rate·SOC·SOH 정의의 BMS 관점.
- Dahn, J. R., Sacken, U., Juzkow, M. W., Al-Janaby, H. *J. Electrochem. Soc.* 138 (1991) 2207 — Li-ion GCD 측정 표준 절차의 초기 정착.
- Aurbach, D. et al. *Electrochim. Acta* 47 (2002) 1899 — formation cycle과 SEI 형성의 연결.
- Zhang, S. S. *Energies* 13 (2020) 1300 — ICE 향상 전략 리뷰(prelithiation 포함).
