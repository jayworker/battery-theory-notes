# 계면 현상 (Interface Phenomena)

## 1. 개요

배터리의 성능과 수명을 결정하는 가장 큰 단일 요인은 **활물질 자체가 아니라 전극-전해질 계면**이다. 양극과 음극의 작동 전위가 전해질의 전기화학 안정창(electrochemical stability window)을 거의 항상 벗어나기 때문에, 계면에서는 항상 어떤 형태든 분해 반응이 일어난다.

여기서 핵심 구분은 "**good SEI vs bad SEI**"다. SEI(solid electrolyte interphase)가 얇고 치밀하고 이온 전도성이 있으면 추가 분해를 차단하면서 Li⁺만 통과시켜 셀이 안정적으로 동작한다. 반대로 두껍고 부서지기 쉬우며 전자 전도성이 있으면 분해가 계속되어 LLI/저항 증가/가스 발생이 누적된다.

## 2. SEI (Solid Electrolyte Interphase)

흑연 음극의 작동 전위(0~0.3 V vs Li/Li⁺)는 일반 카보네이트 전해질의 환원 안정성보다 훨씬 낮다. 따라서 첫 충전(formation cycle)에서 EC, DEC, DMC 등 용매와 LiPF₆ 같은 염이 환원 분해되며 음극 표면에 고체 피막이 자생한다. 이 막이 SEI다. 일단 형성되면 전자 통과를 차단해 추가 분해를 멈추되, Li⁺는 통과시키므로 정상 동작이 가능해진다.

SEI는 단일층이 아니라 **이중층 구조**를 갖는다(Peled 모델). 활물질에 가까운 안쪽은 무기물(LiF, Li₂CO₃, Li₂O) 위주, 바깥쪽은 유기물(ROCO₂Li, polymer) 위주. 무기층은 이온 전도와 기계적 강도를, 유기층은 유연성과 접착성을 담당한다.

성장 동역학은 **확산 제한 모델**로 잘 설명된다. SEI를 통한 전자/용매 수송이 율속이라면, SEI 두께 $L$ 은 시간의 제곱근에 비례한다:

$$L(t) \propto \sqrt{t}$$

이는 캘린더 노화 곡선(시간만 흘러도 용량이 감소하는 현상)이 sqrt(t) 형태를 보이는 직접적 원인이다. 첫 사이클에서 SEI 형성에 소비된 Li⁺는 영구히 비가역 손실이며, 이것이 첫 사이클 쿨롱 효율(initial Coulombic efficiency, ICE)이 90~95%에 머무는 이유다.

## 3. CEI (Cathode Electrolyte Interphase)

양극에서도 비슷한 분해 피막이 형성되는데, 이를 CEI라 한다. 양극은 산화 환경(3.5~4.5 V vs Li/Li⁺)이라 SEI와 분해 메커니즘이 정반대 — 전해질의 산화 분해가 일어난다. 일반적으로 CEI는 SEI보다 얇지만, **고전압(>4.3 V) 양극에서는 매우 빠르게 두꺼워진다**.

| 항목 | SEI (음극) | CEI (양극) |
|------|-----------|-----------|
| 형성 환경 | 환원 | 산화 |
| 전위 기준 | < 1 V vs Li/Li⁺ | > 4 V vs Li/Li⁺ |
| 주요 무기 성분 | LiF, Li₂CO₃, Li₂O | LiF, Li_xPF_y, Li_2CO_3 |
| 두께 | ~10–50 nm | ~1–10 nm |
| 안정성 | formation 후 안정 | 고전압에서 지속 성장 |

CEI는 양극 표면의 격자 산소 방출, TM(전이금속) 용출과 결합되어 있어 **단순한 피막 문제가 아니라 양극 구조 열화의 신호**로 봐야 한다.

## 4. 리튬 플레이팅 (Li Plating)

흑연 음극의 정상 작동 전위는 약 0.05~0.3 V vs Li/Li⁺. 그러나 급속 충전 시 분극으로 음극 전위가 0 V 아래로 내려가면, Li⁺가 흑연 층간으로 삽입되는 대신 **금속 Li로 환원되어 음극 표면에 석출**된다. 이것이 리튬 플레이팅이며, 다음 조건에서 발생 위험이 크다.

- 저온(< 10 °C): 확산 동역학 둔화로 분극 증가
- 고 C-rate 충전: 활성화/농도 분극 증가
- 노화된 셀: 음극 활물질 손실 → 국소 SOC가 100%를 초과
- 고 SOC에서 추가 충전: 흑연이 거의 포화 → 새 Li가 들어갈 자리 없음

검출 방법은 (i) 충전 후 휴지에서 전압 bump (석출된 금속 Li가 다시 흑연으로 재삽입되며 발생), (ii) 쿨롱 효율 저하, (iii) 분해 후 음극 표면에 보이는 mossy/dendrite 형태가 표준이다.

## 5. 덴드라이트 (Dendrite)

리튬 금속 음극 또는 플레이팅된 Li가 평탄하지 않고 **나뭇가지 모양으로 성장**하면 덴드라이트라 부른다. 끝점 효과(tip-enhanced diffusion)로 돌출부에 Li⁺ 플럭스가 집중되어 자기 강화적 성장이 일어난다. 임계 전류밀도를 넘으면 Sand 시간 안에 표면 농도가 0이 되며, 이때부터 덴드라이트 핵생성이 본격화된다.

> **관련 개념: Sand 시간**
> 일정 전류 $j$ 가 흐를 때 평면 전극 표면의 양이온 농도는 시간이 갈수록 감소하고, 어느 순간 표면 농도가 0이 된다. 이 시점이 Sand 시간 $\tau_s = \pi D (nFc/2j)^2$ ($c$ = 벌크 농도, $D$ = 확산 계수).
> $\tau_s$ 이후에도 같은 전류를 강제하면 농도 분극이 발산하고, 음극 표면 전위가 급락하면서 금속 Li 환원 전위 아래로 떨어진다 → 리튬 플레이팅/덴드라이트 핵생성. 즉 $\tau_s$ 는 "안전한 정전류 시간"의 상한이다.
> 실용적 함의: $j$ 를 두 배로 키우면 $\tau_s$ 는 1/4로 줄어듦 → 급속충전이 본질적으로 덴드라이트 위험을 키우는 이유. 농도 폴리머 첨가, transference number 향상으로 유효 $c$를 높이는 전략이 이 시간을 늘린다.

억제 전략:
- **기계적 차단**: 고체 전해질, 세라믹 분리막, 단단한 SEI (high shear modulus, Newman 기준 G > 6 GPa).
- **전해질 설계**: 고농도 전해질, LiF-rich SEI 유도 첨가제(FEC, VC), localized high-concentration electrolyte.
- **균일 표면**: 3D 구조 음극, Li 친화성 표면 처리로 핵생성 사이트 균일화.
- **온도/전류 관리**: 저온 급속충전 회피, pulse charging.

덴드라이트는 분리막을 뚫고 양극에 닿으면 내부 단락을 일으키므로 안전 문제와 직결된다 (열폭주 트리거 → [`./05_thermal.md`](./05_thermal.md)).

## 6. Cross-talk

양극과 음극은 분리막으로 격리되지만, **전해질을 통해 화학종이 이동하면서 서로의 계면을 망치는 현상**이 광범위하게 일어난다. 이를 cross-talk이라 한다. 대표 예시:

- **TM 용출 → 음극 SEI 파괴**: Mn²⁺/Ni²⁺ 등이 양극에서 용출되어 분리막을 건너 음극 SEI에 환원 석출. SEI 무결성을 깨고 재형성을 유도해 LLI 가속.
- **Shuttle 반응**: Li-S 셀의 polysulfide ($\text{Li}_2\text{S}_n$) 가 양극↔음극 사이를 왕복하며 자기 방전과 쿨롱 효율 저하 유발.
- **가스/용매 분해 산물 이동**: 양극에서 산화된 종이 음극에 도달해 추가 환원을 유도, 또는 그 반대.
- **유기 redox shuttle**: 일부 redox-active 분해 산물이 용액상 전자 매개자처럼 동작해 자기 방전을 가속.

Cross-talk은 단순히 "양극 문제" 또는 "음극 문제"로 분리할 수 없는 셀 수준 노화의 근원이며, half-cell 측정에서는 보이지 않는다는 점에서 진단이 까다롭다. 진단 도구로는 (i) post-mortem 음극 표면의 ICP-OES로 TM 정량, (ii) 분리막의 element mapping(EDS)으로 이동 경로 추적, (iii) 3-electrode full-cell에서 양/음극 임피던스 분리가 표준 조합으로 쓰인다.

추가로, 계면 성능을 조절하는 가장 강력한 도구는 결국 **전해질 첨가제**다.

FEC, VC, LiBOB, LiDFOB, LiPO₂F₂ 같은 첨가제는 ppm~몇 wt% 수준의 소량으로도 SEI/CEI의 조성을 LiF-rich, polymer-thin 형태로 유도해 cross-talk과 캘린더 노화를 의미 있게 늦춘다.

첨가제 설계는 환원/산화 전위, 분해 산물의 ionic conductivity, 격자 안정화 효과를 종합적으로 고려해야 한다.

## 참고 문헌

- Peled, E., Menkin, S. *Journal of The Electrochemical Society* 164 (2017) A1703 — Peled 이중층 SEI 모델 리뷰.
- Xu, K. *Chemical Reviews* 114 (2014) 11503–11618 — 카보네이트 전해질과 SEI 종합 리뷰.
- Monroe, C., Newman, J. *Journal of The Electrochemical Society* 152 (2005) A396 — 덴드라이트 억제 기계적 안정성 기준.
- Betz, J. et al. *Advanced Energy Materials* 9 (2019) 1900574 — TM cross-talk 메커니즘.
- Waldmann, T. et al. *Journal of Power Sources* 384 (2018) 107–124 — Li plating 검출 방법론 리뷰.
