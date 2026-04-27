# 노화 메커니즘 (Degradation Mechanisms)

## 1. 개요

배터리 노화는 단일 메커니즘이 아니라 **여러 물리화학적 과정이 동시에 진행되며 서로 결합**된 결과다. 사용자/연구자 입장에서 보이는 현상은 두 가지 — 용량이 감소하는 capacity fade와 저항이 증가하는 power fade. 그러나 이 두 현상의 배후에는 LLI, LAM, TM 용출, cation mixing, 가스 발생, 균열, SEI 성장 등 여러 메커니즘이 복합적으로 기여한다.

노화는 크게 두 형식으로 구분된다. **캘린더 노화(calendar aging)** 는 전류가 흐르지 않아도 시간만 지나면 진행되는 노화로, SEI sqrt(t) 성장이 주된 메커니즘이다. **사이클 노화(cycle aging)** 는 충방전 자체로 인한 노화로, 부피 변화/균열, 리튬 플레이팅, 결정구조 붕괴가 추가된다. 실제 셀 수명은 두 노화의 합산이며, 사용 패턴에 따라 어느 쪽이 지배적인지 다르다.

진단의 핵심 도구는 **ICA/DVA**(전기화학 비파괴), 3전극 셀(전극 분리), post-mortem 분석(직접 관찰)의 조합이다. 단일 기법으로는 메커니즘을 특정할 수 없다.

## 2. LLI (Loss of Lithium Inventory)

LLI는 사이클링에 참여 가능한 활성 Li⁺의 영구적 손실이다. Li⁺가 물리적으로 사라진 게 아니라 **비활성 화합물 형태로 격리**되어 더 이상 충방전에 참여하지 못하는 상태다. 직관적으로, 셀의 Li 풀(pool)에서 일부가 빠져나가 양극과 음극이 같은 기준점에서 동작하지 못하게 된 상황이다.

주된 LLI 경로:
- **SEI 성장**: 캘린더/사이클 모두에서 가장 큰 기여. 환원 분해된 Li⁺가 SEI 성분(LiF, Li₂CO₃, ROCO₂Li 등)에 격리됨.
- **리튬 플레이팅**: 저온/급속충전에서 음극 표면에 금속 Li로 석출. 일부는 재삽입(재활성화)되지만, "dead Li"는 SEI에 둘러싸여 비가역.
- **CEI 관련 격리**: 양극 표면 분해 산물에 Li 일부 포획.

LLI의 시그니처는 [DVA 곡선](./01_voltage_curves.md)에서 양극과 음극 전위 곡선의 **상대적 슬립(slippage)** 으로 보인다. 양극 곡선과 음극 곡선이 SOC 축에서 어긋나며, 결과적으로 full-cell의 사용 가능 SOC 윈도우가 좁아진다.

## 3. LAM (Loss of Active Material)

LAM은 활물질 자체의 비활성화다. LLI가 "Li가 사라지는" 것이라면 LAM은 "Li가 들어갈 자리가 사라지는" 것이다. 양극과 음극 각각에서 별도로 정의된다.

**LAM_PE (양극)**:
- 결정구조 붕괴: layered → spinel → rock-salt 상전이 (특히 고전압/탈리 상태).
- 입자 균열로 전기적 단절(disconnection): 균열로 입자가 매트릭스에서 떨어져 나오면 전자 통로 손실.
- 표면 reconstruction: NMC 표면이 수 nm 깊이까지 rock-salt 층으로 변환.

**LAM_NE (음극)**:
- 흑연 exfoliation: 부적합 용매가 흑연층 사이로 co-intercalation 후 박리.
- Binder 열화/접촉 손실: 부피 변화 누적으로 PVDF 등 바인더가 활물질 입자와 분리.
- Si 입자 분쇄(pulverization): 수백 % 부피 변화로 입자가 잘게 부서지며 일부가 전기적으로 단절.

LAM의 시그니처는 ICA/DVA에서 해당 전극의 피크 면적 감소로 나타난다. 전극 수준에서 LAM이 균일하지 않고 국소화되면 ([core-shell 응력 분포](./04_mechanochemistry.md) 참조), 같은 셀 내에서도 SOC 불균일이 누적되어 추가 노화 가속의 원인이 된다.

## 4. 전이금속 용출 (TM Dissolution)

NMC, LMO, LCO 등 양극 활물질의 전이금속(특히 Mn, Ni, Co)이 전해질로 용출되는 현상이다. 메커니즘은 다층적이다.

- **HF 공격**: LiPF₆ 가 미량의 H₂O와 반응해 HF 생성 → HF가 양극 격자 산소를 공격해 TM-O 결합 약화 → TM²⁺/³⁺이 용액으로 빠져나옴.
- **Mn³⁺ 불균화(disproportionation)**: $2\text{Mn}^{3+} \to \text{Mn}^{2+} + \text{Mn}^{4+}$. Mn²⁺가 용해도가 높아 용출. LMO에서 두드러짐.
- **고전압에서의 격자 산소 방출**: 표면 격자 산소가 빠지며 인접 TM의 배위 환경 붕괴 → 용출.

용출된 TM이 분리막을 건너 음극으로 가면 두 가지 추가 손상을 일으킨다 — (i) 음극 SEI에 환원 석출되며 SEI 무결성 파괴 → SEI 재형성 → LLI 가속. (ii) 흑연 음극의 Li⁺ 확산을 방해하는 사이트 점거.

대응 전략:
- **표면 코팅**: Al₂O₃, ZrO₂, LiNbO₃ ALD/wet 코팅으로 HF 접근 차단.
- **격자 도핑**: Al, Mg, Ti 부분 치환으로 격자 안정화.
- **전해질 첨가제**: VC, FEC, LiBOB로 안정한 SEI/CEI 유도. HF 스캐빈저(예: trimethyl phosphate 유도체) 첨가.

## 5. Cation Mixing

NMC 등 layered 산화물에서 Li⁺와 Ni²⁺의 **이온 반경이 매우 비슷**하다(Li⁺ 0.76 Å, Ni²⁺ 0.69 Å, 6-배위 기준). 그래서 Ni²⁺가 Li-사이트(3a)로, Li⁺가 TM-사이트(3b)로 이동하는 양이온 혼합이 합성 단계와 사이클링 모두에서 발생한다. 직관적으로, layered 구조의 "층" 구분이 흐려져 결국 rock-salt 구조에 가까워지는 과정이다.

XRD에서의 정량은 (003)과 (104) 피크 강도비로 한다. 잘 정렬된 layered 구조에서는 (003) 면이 강하게 회절하지만, cation mixing이 일어나면 (003) 강도가 줄어들고 (104)가 상대적으로 커진다. 따라서 두 피크의 비율이 cation mixing 정도의 단순한 정량 지표가 된다.

$$\frac{I_{(003)}}{I_{(104)}} \gtrsim 1.2 \quad (\text{well-ordered layered})$$

이 비율이 높을수록 layered 정렬이 잘 유지되고, 1.2 이하로 떨어지면 cation mixing이 심하다는 신호. 신선한 NMC811은 보통 1.4 이상, 노화 후 1.0 부근까지 떨어진다.

전기화학적 영향: 3a 사이트의 Ni²⁺는 Li⁺의 2D 확산 통로를 가로막아 $D_\text{Li}$ 가 떨어지고 율속 거동이 악화된다. 또한 활성 Li 사이트가 줄어 직접적인 LAM_PE에 기여한다.

## 6. 가스 발생 (Gas Evolution)

전해질과 활물질의 부반응은 종종 가스를 발생시키고, 이는 셀 내압 증가/swelling/안전 문제로 이어진다. 발생 가스는 메커니즘에 따라 다르다.

| 가스 | 주된 기원 |
|------|----------|
| CO₂ | 카보네이트 용매(EC, DEC 등) 산화 분해 (양극 기원) |
| CO | 카보네이트 환원 분해 (음극 기원) |
| H₂ | 미량 수분의 전기화학 환원 |
| C₂H₄ | EC 환원 (특히 SEI 형성 단계) |
| O₂ | 양극 격자 산소 방출 (Li-rich, 고전압 NMC) |
| CH₄ | 알킬 카보네이트의 추가 환원 |

이 중 O₂ 방출은 매우 중요한데, 양극 격자 안정성을 직접 보여주는 신호이며 [열폭주 위험](./05_thermal.md)과 직결된다. **DEMS**(Differential Electrochemical Mass Spectrometry)는 가스를 SOC/전위 함수로 실시간 정량할 수 있어 [operando 분석](./07_operando.md)의 핵심 도구다.

가스 발생은 셀 swelling으로 직접적 안전 문제(파우치 부풀음, 단단한 케이스 내압 상승)를 일으키며, 동시에 전극-전해질 접촉을 잃게 만들어 추가 LAM을 유발한다.

## 7. 노화 진단 도구

여러 메커니즘을 분리해 정량하려면 다음 도구를 조합한다.

- **ICA/DVA**: 전기화학 비파괴. LLI vs LAM 분리, 양극 vs 음극 기여 분리. 자세한 패턴은 [`./01_voltage_curves.md`](./01_voltage_curves.md) 참조.
- **GITT/EIS**: 저항 증가의 성분(SEI, 전하 이동, 확산) 분리. [`./02_polarization.md`](./02_polarization.md).
- **3-electrode cell**: 양극과 음극 전위를 독립적으로 측정. 각 전극의 OCV-SOC 곡선 직접 추출 가능 → DVA와 결합하면 가장 정확.
- **Post-mortem**: 셀 분해 후 SEM/TEM(균열, 형태), XRD(결정성, cation mixing), XPS(SEI 조성), ICP-OES(TM 용출량) 등 직접 관찰.
- **In-situ DEMS**: 가스 발생량과 종류의 SOC/전위 의존성 정량.
- **Reference electrode + EIS**: 작동 중 SEI/CEI 저항을 음극/양극 별로 분리.

진단 결과는 **노화 모드 매트릭스**(LLI, LAM_PE, LAM_NE, 저항 증가)로 정리하는 것이 표준이다(Birkl et al. 모델). 이 매트릭스가 수명 모델과 BMS의 SOH 추정 알고리즘의 토대가 된다. 매트릭스의 각 칼럼은 특정 진단 기법으로 가장 잘 분리되며(예: LLI는 DVA의 slippage, LAM_PE는 ICA 양극 피크 면적, 저항 증가는 EIS의 $R_s + R_\text{ct}$), 두 가지 이상의 기법이 같은 수치를 내는지 cross-check하는 것이 진단 신뢰도를 좌우한다.

마지막으로 강조할 점은 **노화는 비선형/결합적**이라는 사실이다.

초기에는 SEI 성장(LLI)이 지배적이지만, LLI가 누적되어 음극 SOC 윈도우가 압축되면 [knee point](./08_anomalies.md) 이후 LAM_NE(리튬 플레이팅 기반)가 폭발적으로 증가한다.

단일 메커니즘 모델로 캘린더+사이클 결합 노화를 예측하면 실제 EOL(end of life)을 크게 빗나갈 수 있다.

## 참고 문헌

- Vetter, J. et al. *Electrochimica Acta* 50 (2005) 2735–2751 — 노화 메커니즘 종합 리뷰 (고전).
- Birkl, C. R. et al. *Journal of Power Sources* 341 (2017) 373–386 — LLI/LAM 진단 방법론 표준.
- Manthiram, A. *Nature Communications* 11 (2020) 1550 — layered 양극 노화 메커니즘 리뷰.
- Pinson, M. B., Bazant, M. Z. *Journal of The Electrochemical Society* 160 (2012) A243 — SEI 성장과 캘린더 노화 모델.
- Lin, F. et al. *Nature Communications* 5 (2014) 3529 — NMC 표면 reconstruction.
