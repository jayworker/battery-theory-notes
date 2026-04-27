# ICP와 TGA-DSC (Elemental Quantification & Thermal Analysis)

## 1. 개요

ICP(inductively coupled plasma)와 TGA-DSC(thermogravimetric analysis - differential scanning calorimetry)는 두 종류의 정량 — 원소 함량과 열적 안정성 — 을 다룬다. 둘 모두 다른 분석 기법(XRD, XPS, SEM)이 답하지 못하는 질문에 결정적이다.

ICP는 양극 표면에서 전해질로 빠져나간 전이금속(transition metal, TM) 양을 ppb 단위로 정량하며, 이것이 음극으로 이동해 SEI를 손상시키는 메커니즘을 추적하는 직접 증거가 된다. TGA-DSC는 분해 onset 온도로 양극·전해질의 열 안정성을 평가하고, 잔류 수분과 결정수를 구분 정량하며, [열폭주(thermal runaway)](../06_battery_operation/05_thermal.md) 위험 평가의 출발점이다.

본 절은 두 기법을 묶어 — ICP-MS vs ICP-OES의 차이, TM dissolution 정량 절차, ppb 검출 한계, TGA 온도 프로그램, 분해 onset 해석, 결정수와 부반응 산물 구분 — 까지 다룬다.

## 2. ICP 원리 — Plasma Atomization

ICP는 시료를 액상으로 만들어 ICP torch(rf-induced 7000–10000 K argon plasma)로 분무·기화·원자화·이온화한 뒤, 두 가지 검출 방식 중 하나로 정량한다. **OES (optical emission spectroscopy)** 는 이온/원자가 들뜬 상태에서 바닥 상태로 떨어질 때 방출하는 특성 광(emission line)을 분광 측정. **MS (mass spectrometry)** 는 이온을 질량/전하 비(m/z)로 분리해 양 측정.

직관: ICP는 "이 시료에 어떤 원소가 얼마나 있는가"를 묻는 가장 유력한 정량 도구. plasma의 고온이 거의 모든 화학 결합을 깨고 원자/이온으로 만들어 매트릭스 효과를 최소화한다.

> **관련 개념: ICP-MS vs ICP-OES**
> ICP-OES: 검출 한계 ppm–ppb, multi-element 동시 측정, 방출 line의 spectral interference 가능. 비용·운영 부담 적음.
> ICP-MS: 검출 한계 **ppt–ppb (1000× 더 민감)**, isotope 분석 가능, multi-element 동시. 단점: 매트릭스 효과 강함, 같은 m/z의 polyatomic interference (예: ⁴⁰Ar¹⁶O가 ⁵⁶Fe와 겹침) → collision/reaction cell(He, H₂) 또는 high-resolution MS 필요.
> 가정: 두 방법 모두 시료가 완전 용해되어 있어야 하고, 적절한 internal standard로 drift 보정.
> 직관: ppm 정량이 충분하면 OES, ppb 이하 또는 isotope 추적이면 MS.

배터리 응용 우선순위: 양극 합성 batch의 Li/TM molar ratio QC → OES로 충분, 사이클링 후 음극 표면의 Mn ppb 정량 → MS 필수.

## 3. TM Dissolution 정량 — 음극 탈착 후 Acid Digestion

사이클링 후 음극 표면에 침착된 TM을 정량하는 절차는 표준화되어 있다. 핵심은 **모든 TM을 용액에 옮긴 후 ICP에 주입**하는 것.

표준 절차:
1. 셀을 글러브박스에서 분해, 음극 분리
2. DMC 또는 EMC로 잔존 LiPF₆/EC 가볍게 세척 (3회)
3. 음극을 잘라(보통 1 cm² 또는 면적 정확히 측정) 분쇄
4. **Acid digestion**: 진한 HNO₃ + HCl (왕수, aqua regia) 또는 HNO₃ + H₂O₂ 에 microwave digestion (보통 200 °C, 30 분). PTFE vessel 사용 (HF 부산물 대비)
5. 완전 용해 확인(잔류 흑연 탄소는 필터로 제거 가능; TM은 모두 용액)
6. 0.45 µm membrane filter, 알려진 부피로 dilute
7. ICP-MS 정량 (Mn ⁵⁵, Co ⁵⁹, Ni ⁵⁸/⁶⁰)
8. blank correction, 표준 검량선(0.1–100 ppb, 5–6 농도점), recovery 검증(spike test)

보고 단위: 음극 면적당(µg/cm²), 활물질 질량당(µg/g_anode), 또는 셀 용량당(ppm of total cathode TM). 사이클 횟수와 plot하면 dissolution 가속 시점이 노화 데이터와 직접 매핑된다.

전형적 값: 100 사이클 후 NMC811 셀의 음극 Mn 침착 ~10–100 µg/cm², Ni ~5–30 µg/cm². 양극 총 TM 대비 1–5% 수준이지만 SEI 손상에는 충분.

## 4. ppb 한계와 매트릭스 효과

ICP-MS의 검출 한계(LOD, limit of detection)는 보통 신호의 3σ 기준 ppt–ppb 수준이지만, 실제 정량 한계(LOQ, limit of quantification, 10σ)는 10× 위. SEI 분해산물의 Mn 정량에서는 LOQ 0.1 ppb면 충분하다.

매트릭스 효과 회피:
- **Internal standard**: ⁴⁵Sc, ¹⁰³Rh, ¹⁸⁵Re 등 분석 대상 m/z와 가까운 원소 spike → drift·플라즈마 효율 변동 보정
- **Standard addition**: 시료에 표준을 추가 spike한 검량선으로 매트릭스 일관성 확보
- **Dilution**: 매트릭스 농도 자체를 희석(Li 농도가 너무 높으면 plasma load 부담)
- **CRM (certified reference material)**: NIST SRM 등 인증 시료로 method validation

Polyatomic interference 표준 사례: ⁴⁰Ar¹⁶O⁺ → ⁵⁶Fe interference, ⁴⁰Ar¹²C⁺ → ⁵²Cr interference, ⁴⁰Ar²³Na⁺ → ⁶³Cu interference. He collision cell 또는 H₂ reaction cell이 가장 흔한 해결책.

## 5. TGA — 온도 프로그램과 질량 변화

TGA는 시료를 정해진 가열 프로그램(예: 10 °C/min, RT–1000 °C, N₂ 또는 air 분위기)으로 가열하면서 질량 변화를 µg 정밀도로 기록한다. 곡선의 각 step은 특정 분해/탈착 사건에 대응한다.

직관: 시료가 가열되면서 무엇인가 빠져나갈 때마다 무게가 줄고, 그 onset 온도와 질량 손실량이 그 사건의 성격(수분, 결정수, 분해 등)을 알려준다.

분위기 선택의 의미:
- **N₂ (inert)**: 산화 없이 분해만 측정. 폴리머 바인더 분해, 수분/결정수 탈착, 환원성 분해 사건만 보임.
- **Air / O₂**: 추가로 산화 사건이 보임. 도전재 carbon은 N₂에서 안정하지만 air에서 ~500–700 °C 산화. 활물질 산소 방출도 분명히 보임.
- **5% H₂ / Ar**: 환원 분위기. 산화물의 환원 step.

가열 속도는 trade-off: 빠르면 시간 절약, 느리면 분해능 좋음. 5–10 °C/min이 표준. coupled MS(EGA, evolved gas analysis) 또는 FTIR 사용 시 분해 가스 종까지 동시 동정.

## 6. 잔류 수분 vs 결정수 vs 부반응 산물 — 온도별 진단

배터리 활물질의 TGA에서 보는 전형적 사건들과 온도:

| 온도 영역 (°C) | 사건 | 코멘트 |
|----------------|------|--------|
| **<100** | 표면 흡착 수분 (physisorbed H₂O) | drying 단계 |
| **100–150** | 잔류 용매 (DMC, EC 흔적) | 사이클링 후 시료 |
| **~200** | **결정수 (crystal water)** | 표면 -OH, LiOH·H₂O |
| 200–250 | 전해질 분해 (DEC, EMC) | EMS-coupled로 확인 |
| 250–300 | LiPF₆ 분해 (→ LiF + PF₅) | 전해질 첨가물 시료 |
| 300–400 | **양극 산소 방출 onset** | air에서 강함 (Ni-rich 더 낮음) |
| 350–500 | 폴리머 바인더 분해 (PVDF) | 음극·양극 시트 |
| 500–700 | conductive carbon 산화 (air) | air-N₂ 비교로 카본 함량 정량 |
| 700–900 | 활물질 자체 분해 | 양극 산화물 → spinel/rock-salt |

각 step의 질량 손실 %로부터 함량을 직접 계산. 예: 500–600 °C air에서 5% 손실 → 도전재 5 wt%. 200 °C 부근 1% 손실 → LiOH·H₂O 1 wt% (또는 표면 hydroxide).

음극 음극 graphite + Si 복합재의 질량 비율도 air-TGA로 분리 정량 가능 — Si는 air에서 700 °C 이상에서 SiO₂로 산화되며 질량이 증가, graphite는 같은 온도에서 산화 손실. 두 반대 부호 사건의 net 변화로 비율 분리.

## 7. DSC — 발열/흡열 사건과 분해 onset

DSC는 같은 온도 프로그램에서 시료와 reference 사이의 열량 차이를 측정해 발열(exothermic)/흡열(endothermic) 사건을 분리한다. TGA와 simultaneous 측정(STA, simultaneous thermal analysis)이 표준이며, 같은 온도에서 무게 변화와 열 변화를 함께 본다.

전형적 사건:
- 결정수 손실: 흡열 (~200 °C)
- LiPF₆ 분해: 발열 (~250 °C)
- 양극 격자 산소 방출: **강한 발열** (300–400 °C, Ni-rich 더 낮음 → ~280 °C)
- 흑연 음극 + 전해질 반응 (lithiated 상태): 발열 (~80 °C SEI 분해, ~250 °C lithiated graphite + 전해질)
- Si 산화: 강한 발열 (>700 °C in air)

**열폭주 평가**: 양극의 산소 방출 onset 온도와 발열량이 thermal runaway 위험의 1차 지표. 같은 NMC 계열에서도 NMC111 (T_onset ~310 °C) > NMC622 (~290 °C) > NMC811 (~270 °C) 순으로 위험. 단일 NMC 양극 + 전해질 혼합 시료 ARC(accelerated rate calorimetry) 측정과 cross-check.

DSC peak area ($\int dq/dt \cdot dt$) = 발열량(J/g). 표준 사파이어 또는 indium으로 calibration.

## 8. 시료 준비와 흔한 함정

ICP·TGA 모두 sample prep이 결과를 좌우한다.

**ICP 준비 함정**:
- 불완전 digestion → low recovery. 잔류 검은 흑연이 보이면 추가 digestion 필요(HF + HNO₃ 마이크로파).
- HF 사용 시 PTFE vessel 필수, 보안경/장갑.
- Polypropylene tube 사용 (glass는 ⁵⁶Fe contamination 가능).

**TGA 준비 함정**:
- 시료 양: 5–20 mg 표준. 너무 적으면 noise, 너무 많으면 thermal lag으로 onset 부정확.
- crucible 선택: Pt (>1000 °C), Al₂O₃ (1500 °C, 비활성), Al (저온 폴리머).
- 분위기 가스 흐름: 50–100 mL/min. 너무 약하면 반응 가스 잔류로 분해 환경 변화, 너무 강하면 noise.
- 시료가 air-sensitive면 글러브박스에서 crucible 봉인 후 측정 직전 unsealing → 아직 표준화 어려움. 가능하면 N₂ 분위기 prep.

**보고 항목 체크리스트**: 가열 속도(°C/min), 분위기 가스 + 유량, 시료 양, crucible 종류, baseline subtraction 방법(empty crucible scan). 이 정보 없이 보고된 onset 온도는 비교 불가.

## 9. Coupled Techniques — TGA-MS, ICP Speciation

기본 TGA는 무엇이 사라지는지만 알려주고 어디로 갔는지는 모른다. 이를 보완하는 coupled techniques:
- **TGA-MS**: 분해 가스를 quadrupole MS로 실시간 동정. m/z 18(H₂O), 28(CO/N₂), 44(CO₂), 64(SO₂), 19(F)로 어떤 가스가 어느 온도에서 빠져나가는지 정량. 양극 산소 방출은 m/z 32(O₂)로 직접 추적.
- **TGA-FTIR**: gas line으로 분해 가스를 FTIR cell로 보내 IR 흡수 spectrum. carbonate solvent 분해 산물 동정에 강함.
- **ICP-MS speciation (HPLC-ICP-MS)**: TM의 산화상태 분리 (Mn²⁺ vs Mn⁴⁺) — 단순 ICP는 총 농도만 줌. SEI 내 Mn의 산화상태 구분이 필요할 때.

이 모든 coupled 측정은 standalone보다 시간/장비 부담이 크지만, 메커니즘 규명에는 결정적. 양극 thermal stability 연구는 보통 TGA-DSC-MS 한 번에 측정하는 것이 표준이 됐다.

## 참고 문헌

- Skoog, D. A., Holler, F. J., Crouch, S. R. *Principles of Instrumental Analysis* (7th ed., Cengage, 2017) — ICP/TGA 표준 교재.
- Thomas, R. *Practical Guide to ICP-MS* (3rd ed., CRC, 2013) — ICP-MS 실무 가이드.
- Gachot, G. et al. *Analytical Chemistry* 83 (2011) 478–485 — GC-MS 기반 전해질 분해산물 분석 (TGA-MS와 보완).
- Bak, S.-M. et al. *ACS Applied Materials & Interfaces* 6 (2014) 22594–22601 — Ni-rich NMC의 in-situ TGA-XRD로 산소 방출 연구.
- Solchenbach, S. et al. *Journal of The Electrochemical Society* 165 (2018) A3304 — 음극 TM 침착의 ICP-MS 정량 표준 절차.
- Wandt, J. et al. *Materials Today* 21 (2018) 825–833 — Ni-rich NMC 양극 산소 방출과 thermal stability 연결.
