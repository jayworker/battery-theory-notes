# SEM과 EDS (Scanning Electron Microscopy & Energy-Dispersive Spectroscopy)

## 1. 개요

SEM은 배터리 분석에서 가장 자주 쓰이는 형태(morphology) 진단 도구다. 입자 크기·형상·분포, 코팅 두께, 균열, 단면(cross-section) 미세구조까지 nm–µm 스케일에서 직관적으로 보여준다. 거기에 EDS(energy-dispersive X-ray spectroscopy)를 결합하면 동일 시야에서 원소 분포(elemental mapping)까지 얻으므로, "이 입자에서 Mn이 어디로 갔나" 같은 질문에 시각적으로 답할 수 있다.

본 절은 SEM의 신호 종류(SE/BSE), 단면 시료 준비, EDS의 정량 한계와 ZAF 보정, FIB-SEM tomography까지를 다룬다. 결정 구조와 산화상태는 [XRD](./01_xrd.md), [TEM/EELS](./03_tem.md)의 영역.

## 2. SEM 원리 — SE vs BSE

전자총(electron gun)에서 가속된 1차 전자(primary electron, 보통 5–30 kV)가 시료 표면에 입사하면 두 가지 주된 신호가 나온다. **2차 전자(SE, secondary electron)** 는 시료 원자의 약하게 결합된 외각 전자가 비탄성 산란(inelastic scattering)으로 떨어져 나온 저에너지(<50 eV) 전자다. 표면 수 nm에서만 빠져나오므로 형상(topography) 정보가 압도적으로 강하다. **후방산란전자(BSE, backscattered electron)** 는 1차 전자가 핵의 쿨롱 산란(elastic scattering)으로 거의 입사 에너지를 유지한 채 되튕긴 것이며, 무거운 원소일수록 산란 단면적이 크다 → 강한 Z-contrast(원자 번호 대비).

직관: SE는 "표면 모양", BSE는 "구성 원소의 무게 차이"를 보는 신호. 같은 시야에서 두 검출기를 동시에 켜면 형태와 조성 분포를 한 번에 본다.

NMC 양극 분말은 SE로 입자 모양(전형적인 secondary particle, 5–15 µm 구형 응집체와 200–500 nm primary particle)을 보고, BSE로 표면 코팅(Al₂O₃, ZrO₂)이나 conductive carbon 분포를 본다. Si 음극의 균열은 SE 단면이 가장 명확.

## 3. 입자 형태와 크기 통계

SEM 이미지에서 입자 크기 분포(particle size distribution)를 정량할 때 주의할 점은 **1차 입자(primary particle)와 2차 입자(secondary particle)** 의 구분이다. NMC, NCA, LCO는 보통 nano 수준 1차 입자가 응집된 µm 수준 2차 입자 형태로 합성된다. 사이클링 후 **inter-granular crack**(2차 입자 내부 1차 입자 사이 균열)이 생기며, 이는 BSE 단면 이미지에서 가장 직관적으로 보인다.

통계적으로 의미 있는 입자 크기는 보통 ImageJ나 자동 입자 인식 소프트웨어로 100–500개 입자를 분석해서 $D_{10}$, $D_{50}$, $D_{90}$ 를 보고. 단 SEM은 2D 투영이라 작은 입자가 큰 입자 뒤에 가려지는 bias가 있으니, [PSA(laser scattering)](./06_bet_psa.md) 결과와 cross-check 하는 것이 표준이다.

## 4. 단면 (Cross-section) 분석

배터리 전극의 단면은 표면 SEM만으로 얻기 어려운 정보(전극 두께, 활물질-바인더-도전재 분포, 집전체 계면, 입자 내부 균열)를 모두 보여주는 핵심 분석이다. 준비 방법이 결과를 좌우한다.

| 방법 | 장점 | 단점 |
|------|------|------|
| **Mechanical polishing** | 빠름, 큰 면적 | 부드러운 활물질이 뜯겨 인공 균열 생성 |
| **Ion milling (Ar broad beam)** | 무손상, 대면적(~mm) | 시간 소요(수 시간), 평탄도 한계 |
| **FIB (Focused Ion Beam, Ga⁺)** | 정밀(±100 nm), site-specific | Ga 오염, beam damage, 작은 면적 |
| **Cryo-FIB** | 전해질·SEI 보존 | 장비 비싸고 셋업 까다로움 |

Inter-granular crack 정량은 단면 BSE 이미지에서 균열 면적 분율(crack area fraction)을 측정하는 방식이 표준. NMC811은 200 사이클 후 5–15% 정도까지 균열 면적이 증가하는 것이 보고된다.

## 5. EDS — 원소 mapping과 정량 한계

EDS는 1차 전자가 시료 원자의 내각 전자(inner-shell electron)를 떨어뜨릴 때, 외각 전자가 채워지면서 방출하는 특성 X-ray를 검출해 원소 종류와 양을 분석한다. SEM 이미지와 같은 시야에서 mapping이 가능해 "어떤 입자에 Co가 풍부하고 Mn이 부족한가" 같은 분포 질문에 즉답한다.

> **관련 개념: ZAF 보정 (정량 EDS)**
> 측정된 X-ray 강도는 원소 농도와 단순 비례하지 않는다. 세 가지 보정이 필요: $C_i = k_i \cdot \text{ZAF}_i$, ZAF = $Z \times A \times F$.
> $Z$ = atomic number 효과 (산란/제동 복사, 무거운 원소일수록 강함), $A$ = absorption (방출된 X-ray가 시료 내부에서 자기흡수, 가벼운 원소 X-ray가 가장 영향 받음), $F$ = fluorescence (다른 원소의 X-ray가 시료 내 다른 원소를 추가 여기).
> 실용 정량은 $\phi(\rho z)$ 모델(예: PAP, XPP)을 통해 자동 보정. 표준시료(standard) 사용 시 정확도 ±2 wt%, standardless면 ±5–10 wt%.
> 주의: O, N, F 같은 가벼운 원소는 검출기 윈도우 흡수와 자기흡수가 커서 정량 신뢰도가 낮다. Li는 X-ray 에너지가 너무 낮아(54 eV) EDS로 검출 불가.

검출 한계는 보통 0.1–1 wt%. 도핑 농도가 낮은 원소(예: 1% Al doping)는 EDS로는 정량이 어렵고 ICP-MS가 필요하다. Mapping 분해능은 입사 전자가 시료에서 만드는 상호작용 부피(interaction volume, ~1 µm at 15 kV)에 의해 제한 → 가속 전압을 낮추면(예: 5 kV) 분해능이 좋아지지만 신호도 약해진다.

## 6. FIB-SEM Tomography

FIB-SEM 토모그래피(serial sectioning)는 FIB로 시료를 얇게(예: 50 nm) 잘라내고 SEM으로 단면을 찍는 작업을 수십~수백 번 반복해 3D 미세구조를 재구성하는 기법이다. 입자 연결성(connectivity), 도전재 네트워크, tortuosity, 다공도(porosity), inter-granular crack의 3D 분포까지 정량 가능.

직관적으로, "전극 내부의 미시 구조를 한 voxel씩 들춰내며 쌓아 올리는" 그림이다. 결과는 부피 ~50 × 50 × 50 µm³, voxel 크기 ~50 nm 수준의 3D 데이터셋. 이 데이터로 effective transport 시뮬레이션(Bruggeman exponent 직접 계산), 균열 네트워크 percolation 분석 등이 가능하다.

한계: 측정 시간(수 시간~하루), Ga 오염, 시료 부피 제한, 대규모 통계는 어려움. 더 큰 부피가 필요하면 X-ray nano-CT(synchrotron, 분해능 50–100 nm)를 쓴다.

## 7. 도전성 코팅과 시료 준비

활물질·전극은 대부분 절연성 또는 약 전도성이라 1차 전자가 표면에 누적되어 charging artifact(이미지 줄, 밝기 흔들림, drift)를 일으킨다. 표준 대응:

- **Pt sputter coating**: 가장 흔함, 두께 2–10 nm, 고분해능 SEM에 적합. 큰 입자(grain) 결정 형태도 잘 보존.
- **Au sputter coating**: 더 두꺼움(10–20 nm), 일반 SEM·낮은 가속전압에서 양호. 단 grain이 커서 nano 시료의 미세구조를 가릴 수 있음.
- **C coating (evaporation)**: EDS 정량에 유리(C가 backscatter 적게 만들어 신호 깨끗), 단 형태 contrast는 약간 손실.
- **Low-vacuum / VP-SEM (variable pressure)**: 코팅 없이 측정. 분해능 약간 손해, 그러나 hydrated/insulating 시료에 유용.

Air-sensitive 시료(Li 금속, lithiated graphite, sulfide solid electrolyte)는 글러브박스에서 transfer holder(예: Leica VCT, Quorum airlock)로 옮겨야 한다. 일반 mounting 후 대기 노출은 즉시 산화/수화로 표면이 변한다.

가속 전압 선택: 1차 입자 표면(코팅, SEI 흔적) → 1–5 kV, 단면 형태 → 10–15 kV, 두꺼운 시료의 깊은 BSE → 20–30 kV. 가속 전압이 클수록 신호는 강해지지만 분해능과 표면 민감도는 떨어진다.

## 참고 문헌

- Goldstein, J. I. et al. *Scanning Electron Microscopy and X-ray Microanalysis* (4th ed., Springer, 2018) — SEM/EDS 표준 교재.
- Mücke, R. et al. *Journal of Power Sources* 396 (2018) 661–675 — FIB-SEM tomography로 NMC 균열 정량.
- Liu, H. et al. *Science* 344 (2014) 1252817 — 양극 단면 SEM/TEM 결합 노화 분석.
- Newbury, D. E., Ritchie, N. W. M. *Scanning* 35 (2013) 141–168 — Standardless EDS 정량의 한계와 가이드라인.
