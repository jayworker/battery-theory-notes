# 흥미로운 이상 현상 (Anomalous Phenomena)

## 1. 개요

지금까지의 본문이 "교과서적 거동"을 다뤘다면, 이 장은 그 교과서를 부분적으로 비껴가는 현상들을 모은다. **이상 현상이 흥미로운 이유는 새로운 물리/화학을 이해하는 창**이 되기 때문이다. 처음에는 노이즈처럼 보였던 거동이, 자세히 들여다보면 새로운 메커니즘(예: anionic redox)을 가리키는 사례가 반복적으로 있어왔다.

여기서 다루는 voltage fade, memory effect, anionic redox, knee point는 모두 (i) 특정 소재/조건에서만 발생하고, (ii) 관찰 즉시 메커니즘이 자명하지 않으며, (iii) 실용적 영향이 큰 — 그래서 **연구 가치와 응용 가치가 동시에 큰** 현상들이다.

## 2. Voltage Fade

Li-rich layered oxide (예: $\text{Li}_{1.2}\text{Mn}_{0.54}\text{Ni}_{0.13}\text{Co}_{0.13}\text{O}_2$)는 첫 사이클에서 250 mAh/g 이상의 매우 높은 용량을 보인다. 그러나 사이클을 거듭할수록 **용량은 거의 그대로인데 평균 전압이 점진적으로 떨어지는** 현상이 나타난다. 이것이 voltage fade다. 결과적으로 에너지 밀도(= 용량 × 전압)가 사이클마다 줄어들어 실용화의 큰 장벽이 되었다.

메커니즘은 **양이온의 격자 내 이동**이다. 첫 사이클의 4.5 V 이상 활성화 영역에서 격자 산소가 부분적으로 빠져나가면, 빈자리를 채우려고 TM 양이온(특히 Mn, Ni)이 Li-사이트로 이동한다. 결과적으로 layered → spinel-like 환경이 점진적으로 형성되며, 이 환경의 redox 전위가 layered보다 낮아 평균 전압이 끌려 내려간다.

억제 전략은 (i) 표면 코팅(Al₂O₃, ZrO₂)으로 산소 방출 차단, (ii) 격자 도핑(Mg, Ti)으로 양이온 이동 장벽 증가, (iii) cut-off 전압 제한으로 산소 활성화 영역 회피. 모두 부분적 효과만 있고 근본 해결은 아직 미해결.

## 3. Memory Effect

NiMH 배터리에서 잘 알려진 "부분 충방전 이력이 다음 사이클의 전압 곡선을 변형시키는" 현상. 오랫동안 Li-ion에는 없다고 여겨졌으나, **LFP에서 명확히 관찰됨**(Sasaki, Ukyo, Novák, *Nature Materials* 2013).

메커니즘은 LFP의 **2상 반응의 비평형 상분리**와 관련된다. LFP ↔ FePO₄ 의 핵생성/성장에 이력(history)이 남는 것이다. 50% SOC에서 멈췄던 셀과 70% SOC에서 멈췄던 셀이 다시 같은 SOC로 충방전될 때 미묘하게 다른 전압을 보인다. 직관적으로, 이전 이력이 활물질 입자 분포에 메타스테이블 상태를 남기고, 다음 사이클에서 그 상태가 곡선의 모양에 미세한 bump로 나타난다.

| 항목 | NiMH | LFP |
|------|------|-----|
| 전압 차이 크기 | 수십 mV | 수 mV |
| 메커니즘 | $\beta$/$\gamma$ 상 변화 | 2상 핵생성 이력 |
| 실용 영향 | SOC 추정 큰 오차 | SOC 추정 미세 오차 |

LFP의 SOC 추정이 어려운 이유 중 하나가 (i) 본질적으로 평탄한 plateau, (ii) [히스테리시스](./01_voltage_curves.md), 그리고 (iii) memory effect의 결합이다. BMS 알고리즘은 이 셋을 모두 보정해야 한다.

## 4. Anionic Redox

전통적 관점에서 layered 양극의 redox는 **양이온(TM)** 이 담당한다. Co³⁺/Co⁴⁺, Ni²⁺/³⁺/⁴⁺, Mn³⁺/Mn⁴⁺. 그러나 Li-rich layered와 일부 sulfide/oxide에서는 양이온 산화가 한계에 도달한 뒤에도 추가 용량이 나오며, **격자 산소의 산화** ($\text{O}^{2-} \to \text{O}^{(2-n)-}$, 또는 peroxo-like $\text{O}_2^{2-}$ 종)가 추가 전자를 제공한다는 사실이 확인되었다.

이론적 배경은 Ceder/Tarascon 그룹의 **unhybridized O 2p lone pair** 모델이다. Li-rich에서 일부 산소는 TM과 결합하지 않은 lone pair를 가지며, 이 비결합 전자가 산화 가능한 redox center로 작용한다. 일반 layered에서는 모든 O 2p가 TM 3d와 hybridize되어 있어 안정하지만, Li-O-Li 형태가 많아지면 lone pair가 증가한다.

| 측면 | 양이온 redox | 음이온 redox |
|------|-------------|-------------|
| 전위 | 3.5–4.4 V | 4.4–4.8 V |
| 용량 | 한계 명확 | 추가 ~50–100 mAh/g |
| 가역성 | 우수 | 부분 가역 (O₂ 손실) |
| 부작용 | 적음 | voltage fade, O₂ 방출, [열폭주](./05_thermal.md) 위험 |

실험적 증거는 [DEMS](./07_operando.md)의 O₂ 검출, [XAS](./07_operando.md)에서 산소 K-edge 변화, RIXS(공명 X-ray 비탄성 산란)에서 분자성 O₂의 직접 관찰 등이 결합된다.

## 5. Knee Point

장기 사이클 수명 곡선(용량 vs 사이클 수)이 처음에는 거의 선형으로 천천히 감소하다가, **어느 시점에서 갑자기 기울기가 가팔라지며 가속 감소**로 전환되는 지점을 knee point라 부른다. 이 전환점 이후에는 셀이 사실상 회복 불가능한 노화 단계에 들어간다.

메커니즘 (Attia et al., *Nature* 2020):
- **리튬 플레이팅 onset**: 음극 활물질이 LAM_NE로 줄어들면 같은 충전 전류가 남은 활물질에 대해 더 높은 실효 C-rate가 됨 → 음극 분극 증가 → 음극 전위가 0 V 아래로 → Li 플레이팅 시작.
- **자기 강화 피드백**: 플레이팅된 Li가 SEI에 갇혀 LLI 가속 → 양극의 사용 SOC 윈도우 확장 → 양극 스트레스 증가 → LAM_PE 가속 → 더 큰 음극 부하 → 더 많은 플레이팅.

조기 경고 지표:
- $dQ/dN$ 의 절댓값 변화 (사이클당 용량 손실의 가속).
- ICA 피크의 갑작스러운 위치 이동.
- EIS 저항의 비선형 증가.
- 충전 후 휴지 voltage relaxation의 비정상적 형태(플레이팅된 Li의 재삽입 신호).

knee point 예측은 BMS와 2nd-life 응용(EV 배터리의 ESS 재사용)에서 매우 중요하다. 머신러닝 기반 예측 모델(early-cycle data만으로 cycle life 예측)이 활발히 연구되는 이유다.

## 6. 기타 흥미 현상 (간략 소개)

위 4가지 외에도 기억해둘 만한 이상 현상이 몇 가지 더 있다.

- **Electrochemical shock**: 급속 상전이(예: LFP의 2상 경계 통과) 시 발생하는 매우 빠른 부피 변화가 입자에 충격파처럼 작용해 [균열](./04_mechanochemistry.md)을 유도하는 현상. high-rate에서 두드러짐.

- **Asymmetric rate capability**: 같은 셀이 같은 C-rate에서도 충전과 방전이 비대칭적인 율속 거동을 보임. 보통 충전이 방전보다 율속에 더 민감(특히 저온). [리튬 플레이팅](./03_interface.md)과 음극 분극의 비대칭에서 비롯됨.

- **Self-discharge anomaly**: 캘린더 노화의 자기 방전이 시간에 대해 단순한 sqrt(t) 또는 선형 감소가 아니라, 어느 SOC에서 비정상적으로 빠른 비선형 영역을 보이는 현상. 양극의 격자 안정성 한계 또는 cross-talk 메커니즘과 연결.

- **Path-dependent OCV**: 충전 직전 이력에 따라 같은 SOC의 OCV가 수 mV 다르게 보이는 현상. memory effect와 비슷하지만 더 일반적이며, NMC를 포함한 layered 양극에서도 미세하게 관찰됨.

이런 현상들은 각각 별도의 깊은 연구 주제로, 학회 발표에서 등장하면 메커니즘 토론의 장이 된다.

정상 거동의 모델만으로는 설명이 안 되기에, 새로운 모델/실험 설계의 동기가 된다.

이상 현상을 단순히 "예외"로 치부하지 않고, 어떤 가정이 깨지면 이런 거동이 나오는지를 역추적하는 사고가 학술적·실용적 발견을 만들어왔다.

## 참고 문헌

- Croy, J. R. et al. *Journal of Physical Chemistry C* 117 (2013) 6525 — Li-rich voltage fade 메커니즘.
- Sasaki, T., Ukyo, Y., Novák, P. *Nature Materials* 12 (2013) 569 — LFP memory effect 발견.
- Sathiya, M. et al. *Nature Materials* 12 (2013) 827 — anionic redox 직접 증거.
- Seo, D.-H. et al. *Nature Chemistry* 8 (2016) 692 — anionic redox lone pair 이론.
- Attia, P. M. et al. *Nature* 578 (2020) 397 — knee point 예측과 메커니즘.
- Woodford, W. H., Chiang, Y. M., Carter, W. C. *Journal of The Electrochemical Society* 157 (2010) A1052 — electrochemical shock 모델.
