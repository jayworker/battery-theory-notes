# Operando/In-situ 분석 기법 (Operando Characterization)

## 1. 개요

배터리 연구에서 가장 흔한 함정은 **분해 후 관찰**이다. 셀을 열어 전극을 꺼내는 순간 평형 상태가 깨지고, 공기에 노출되며, 진공/세척 과정에서 가공물이 만들어진다. 따라서 "지금 작동 중인 셀에서 어떤 일이 일어나고 있는가"를 직접 보려면 in-situ 또는 operando 기법이 필요하다.

용어 구분:
- **Ex-situ**: 셀을 분해하여 외부 장비에서 분석 (post-mortem과 거의 동의어).
- **In-situ**: 분석 장비 안에 셀을 넣은 상태에서 측정. 사이클링 중일 수도, 휴지 중일 수도 있음.
- **Operando**: in-situ의 부분집합으로, **실제 작동(충방전) 중에 동시 측정**. 시간 분해능이 핵심.

각 기법은 (i) 무엇을 보는가(구조/조성/형태/가스), (ii) 시간/공간 분해능, (iii) 셀 형상 제약이 다르다. 같은 현상을 여러 기법으로 교차 검증하는 것이 표준이다.

## 2. Operando XRD

X선 회절은 격자 상수와 결정 구조를 직접 본다. 충방전 중 d-spacing의 변화를 추적하면 [부피 변화](./04_mechanochemistry.md), 상전이(2상 공존 vs 고용체), 결정성 손실을 정량할 수 있다.

전형적 데이터 형식은 **waterfall plot**(SOC × 2θ × intensity 3차원)이며, 피크가 연속적으로 이동하면 고용체, 두 피크가 동시에 존재하다 한쪽이 사라지면 2상 반응의 직접 증거다.

| 광원 | 시간 분해능 | 장점 | 단점 |
|------|-----------|------|------|
| Lab Cu Kα | 분~시간 | 접근 용이 | C/20 이하만 가능 |
| 싱크로트론 | 초~분 | 빠른 사이클 추적 가능, 투과 모드로 셀 통째 측정 | 빔타임 확보 |

투과(transmission) vs 반사(reflection) 모드 선택은 셀 형상에 따른다. 코인셀에 Be window를 쓰면 lab source로도 가능하고, 파우치셀은 보통 싱크로트론 투과 모드다.

## 3. Operando Raman Spectroscopy

라만은 결합/포논의 정보를 주며, **국소 영역의 분자 수준 변화**에 민감하다. 흑연 음극의 G-band(~1580 cm⁻¹)는 stage 전이에 따라 두 개로 분리(splitting)되고, D-band(~1350 cm⁻¹)는 결함량을 반영한다. NMC 등 layered 양극의 M-O stretching mode(~480, 600 cm⁻¹) 강도와 위치는 격자 산소의 결합 상태를 알려준다.

장점:
- 높은 공간 분해능(~1 μm), confocal 설정으로 깊이 방향 분해도 가능.
- 비파괴, 비접촉.
- 단일 입자 수준 측정 가능.

한계:
- 형광 간섭(특히 분해 산물 존재 시).
- 레이저 손상 위험 → 출력을 낮춰야 함 → S/N 저하.
- 시간 분해능 보통(스펙트럼당 수 초~분).

## 4. In-situ TEM

투과전자현미경은 **나노스케일에서 lithiation front의 직접 시각화**가 가능한 거의 유일한 기법이다. lithiation 상이 진행하는 모습을 단일 입자 수준에서 실시간으로 본다. Si 입자의 코어-셸 lithiation, NMC 입자의 균열 진행, 덴드라이트 핵생성 같은 현상이 직접 관찰되었다.

TEM holder 형태:
- **Open cell**: ionic liquid 또는 W tip + Li 코팅으로 단순 셀 모사. 나노 영역만.
- **Liquid cell**: 두 SiN 멤브레인 사이에 진짜 전해질 봉입. 더 현실적이지만 이미지 해상도 저하.

한계가 본질적이다. 전자빔 자체가 시료를 손상(beam damage)시키고, 진공 환경에서 휘발성 전해질을 다루기 어려워 보통은 매우 작고 비현실적인 모델 셀로 한정된다. 그래도 다른 기법으로는 볼 수 없는 메커니즘 정보가 나오므로 사이클 전체보다는 **결정적 순간**(첫 lithiation, 균열 핵생성)을 노린다.

## 5. DEMS (Differential Electrochemical Mass Spectrometry)

DEMS는 셀에서 발생하는 가스를 실시간으로 질량분석기에 흘려보내 **가스 종류와 발생량을 SOC/전위 함수로 정량**한다. 셀 안에서 어느 전위에서 어떤 가스가 나오는지 직접 보여주는 거의 유일한 기법이다.

대표 응용:
- **Anionic redox**(Li-rich) 연구: 4.5 V 이상에서 O₂ 방출 검출 → 양극 격자 산소가 빠지는 직접 증거.
- **Formation cycle 가스 분석**: C₂H₄, CO₂, CO 등 SEI 형성 부산물 정량.
- **고전압 양극의 안정성**: 4.3 V vs 4.5 V cut-off에서 O₂/CO₂ 발생량 비교.

실험 설계 핵심: 셀 헤드스페이스를 carrier gas(보통 He, Ar)로 흘려야 가스가 MS로 전달됨. 그래서 셀 형태가 표준 코인셀과 다른 special cell이 필요하고, 보통 lab-built가 흔하다.

> O₂ 방출은 [열폭주](./05_thermal.md)와 [LAM_PE](./06_degradation.md)의 핵심 시그니처이므로, DEMS와 ARC, in-situ XRD 데이터를 함께 보는 것이 표준.

## 6. Solid-state NMR

핵자기공명은 핵종 선택성이 핵심 무기다. ⁷Li NMR은 Li 환경(사이트)을 chemical shift로 구분한다 — 흑연 층간 Li(~40~50 ppm), SEI의 LiF(-200 ppm), Li₂CO₃(0 ppm), **금속 Li(~250 ppm)** 가 명확히 분리된다. 이 chemical shift 차이가 "dead Li" 정량의 직접적 도구가 된다.

선택성 예시:
- ⁷Li, ⁶Li: Li 환경. 흑연/SEI/금속 Li/양극 격자 사이트 분리.
- ²³Na: Na 이온 배터리.
- ³¹P: LiPF₆ 분해 산물(LiPO_xF_y), 인산계 첨가제 거동.
- ¹⁹F: SEI의 LiF, PVDF 바인더.

장점은 정량성과 화학 환경 분해. 한계는 (i) 시간 분해능 낮음(스펙트럼당 분~시간), (ii) 자기장 안에서 셀을 작동시키는 special probe 필요, (iii) 장비 접근성. MAS(magic angle spinning) 사용 시 시료를 회전시켜야 해서 진짜 operando는 어렵고 in-situ가 일반적이다.

## 7. XAS (X-ray Absorption Spectroscopy)

XAS는 특정 원자(보통 TM)의 흡수 가장자리(edge)를 보면서 **산화 상태와 국소 구조**를 동시에 알려준다. 두 영역으로 나뉜다.

- **XANES** (X-ray Absorption Near Edge Structure): edge 위치 → 산화 상태($\text{Ni}^{2+/3+/4+}$, $\text{Co}^{2+/3+/4+}$ 등). NMC 충전 중 Ni가 어디까지 산화되는지 직접 볼 수 있다.
- **EXAFS** (Extended X-ray Absorption Fine Structure): edge 이후 oscillation → 배위수, 결합 거리, 이웃 원자 종류. TM-O 결합 길이의 사이클 의존성.

핵심 활용: **anionic redox 검증**(Ni가 더 이상 산화되지 않는데 용량이 더 나오면 산소가 산화되고 있다는 증거), **TM 용출 후 음극의 TM 화학상태** 분석, layered 산화물의 표면 reconstruction 깊이 측정(전반사 모드 TXRF-XAS).

한계는 명확하다. **싱크로트론 필수**, 빔타임 확보 어려움, 시간 분해능은 기법(ED-XAS, QEXAFS 등)에 따라 1 ms ~ 분 단위. 한 원소밖에 못 보므로 다중 TM(NMC) 셀에서는 edge별로 별도 측정.

## 8. 기법 선택 가이드

어떤 질문을 답할지에 따라 기법을 고른다. 다음 매트릭스가 빠른 가이드다.

| 질문 | 1순위 기법 | 보조 기법 |
|------|----------|----------|
| 격자 상수/상전이 | Operando XRD | TEM (나노스케일) |
| 산화 상태 변화 | XAS (XANES) | EELS in TEM |
| 국소 결합/포논 | Raman | IR |
| 입자 형태/균열 | In-situ TEM | post-mortem SEM |
| 가스 발생 | DEMS | OEMS, GC |
| Li 환경 정량 | ⁷Li NMR | XPS (표면만) |
| 표면 화학 | XPS (ex-situ) | Raman, FT-IR |

| 기법 | 시간 분해능 | 공간 분해능 | 비파괴? |
|------|----------|----------|--------|
| Operando XRD (synchrotron) | 1–60 s | bulk-averaged | Yes |
| Operando Raman | 1–60 s | ~1 μm | 거의 (laser 손상) |
| In-situ TEM | < 1 s | < 1 nm | 부분적 (beam damage) |
| DEMS | 1–10 s | bulk (가스만) | Yes |
| ⁷Li NMR | 분~시간 | bulk-averaged | Yes |
| XAS | 1 ms~분 | bulk 또는 ~μm | Yes |
| XPS (ex-situ) | N/A | bulk-averaged 표면 | No |

**결정적 원칙**: 한 기법으로 결론을 내지 마라. XRD 결과와 DEMS 결과, 또는 XAS와 NMR 결과가 같은 메커니즘을 지지할 때 비로소 단단한 주장이 된다. 이 다중 기법 검증이 [노화 메커니즘 진단](./06_degradation.md)의 표준이다.

## 참고 문헌

- Borkiewicz, O. J. et al. *Journal of Applied Crystallography* 45 (2012) 1261 — 싱크로트론 operando XRD 셀 디자인.
- Baddour-Hadjean, R., Pereira-Ramos, J. P. *Chemical Reviews* 110 (2010) 1278 — Raman in lithium batteries 종합 리뷰.
- Wang, F. et al. *Nano Letters* 12 (2012) 1624 — In-situ TEM lithiation 관찰.
- Berkes, B. B. et al. *Analytical Chemistry* 87 (2015) 5878 — DEMS 실험 설계.
- Pecher, O. et al. *Solid State Nuclear Magnetic Resonance* 84 (2017) 122 — operando NMR 리뷰.
- Yang, W. et al. *Nature Energy* 3 (2018) 690 — XAS로 본 anionic redox.
