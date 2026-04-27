# 소재분석 (Materials Characterization)

<span class="theory-group-label practical">실무이론</span>

## 영역 구성

```text
07 소재분석 (Materials Characterization)
├── 01_xrd                  Bragg / Rietveld / I003/I104 / Scherrer
├── 02_sem_eds              SE/BSE / 단면 / EDS mapping / FIB tomography
├── 03_tem                  HRTEM 격자 fringe / STEM-HAADF / SAED / EELS
├── 04_xps                  binding energy / charge correction / depth profile
├── 05_raman_ftir           D/G band / ROCO₂Li / Li₂CO₃ / ATR vs Transmission
├── 06_bet_psa              N₂ 등온선 / BET 식 / laser scattering / D50
└── 07_icp_tga              ICP-MS/OES / TM 용출 정량 / TGA-DSC
```

## 개요

배터리 연구에서 "어떤 소재인지"를 정량적으로 말하려면 결국 분석 데이터를 들고 와야 한다. XRD 패턴 한 장으로 결정상이 결정되고, XPS 한 번으로 SEI 조성이 정량되며, ICP-MS 결과로 사이클 후 양극에서 빠져나간 전이금속(transition metal) 양이 ppb 단위까지 잡힌다. 본 영역은 실험실에서 일상적으로 쓰는 소재분석 기법을 — 원리, 셋업, 정량 절차, 한계 — 까지 묶어 다룬다.

본 영역(07)이 [작동이론(06)](../06_battery_operation/00_overview.md)과 차별화되는 지점은 분명하다. 06이 "이 셀에서 무슨 현상이 일어나는가"를 다룬다면, 07은 "그 현상을 어떻게 측정하고 어떻게 fitting하나"를 다룬다. 예를 들어 06.06의 cation mixing은 현상과 진단 시그니처 중심으로 서술되지만, 07.01의 XRD는 Rietveld refinement 셋업, peak deconvolution, structural parameter 추출 절차에 집중한다.

기초이론(01~05)이 미시적 이해를, 작동이론(06)이 거시적 거동을 다룬다면, 07 소재분석은 그 사이를 잇는 "측정 가능한 양"의 영역이다.

## 학습 목표

- XRD 패턴에서 결정상 동정, Rietveld refinement, Scherrer 식을 통한 결정자 크기(crystallite size) 추출까지 일관되게 수행할 수 있다
- SEM/EDS, TEM/STEM, EELS의 분해능과 분석 깊이를 구분하고, 어떤 질문에 어떤 기법이 적합한지 결정할 수 있다
- XPS의 binding energy 보정 절차와 SEI 표준 피크(LiF, Li₂CO₃ 등) 위치를 외워서 SEI 조성을 정량 해석할 수 있다
- Raman/FTIR로 흑연 무질서도($I_D/I_G$), 전해질 분해산물, 양극 M-O 진동 모드를 진단할 수 있다
- BET, PSA, ICP-MS, TGA-DSC의 정량 한계와 시료 준비 시 주의점을 이해하고 보고서 수치를 비판적으로 읽을 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_xrd.md`](./01_xrd.md) | Bragg, Rietveld refinement, $I_{003}/I_{104}$ ratio, Scherrer, in-situ XRD |
| [`02_sem_eds.md`](./02_sem_eds.md) | SE/BSE, 입자 형태, 단면, EDS mapping(ZAF), FIB-SEM tomography |
| [`03_tem.md`](./03_tem.md) | HRTEM, STEM-HAADF, SAED, EELS, FIB lamella prep |
| [`04_xps.md`](./04_xps.md) | Binding energy, charge correction, depth profile, SEI 표준 피크 |
| [`05_raman_ftir.md`](./05_raman_ftir.md) | Raman D/G band, $I_D/I_G$, FTIR ATR, 전해질 분해산물 |
| [`06_bet_psa.md`](./06_bet_psa.md) | $N_2$ 흡탈착, BET 식, BJH, laser scattering, $D_{50}$ |
| [`07_icp_tga.md`](./07_icp_tga.md) | ICP-MS/OES, TM 용출 정량, TGA-DSC, 분해 onset |

## 의사결정 트리 — 어떤 의문이 생기면 어떤 분석?

| 연구 질문 | 1차 분석 기법 | 보조 |
|---|---|---|
| 양극 결정상이 변했나? (layered → spinel 등) | **XRD** (Rietveld) | in-situ XRD, SAED |
| 표면 SEI 조성은? (LiF/Li₂CO₃ 비율) | **XPS** (depth profile) | FTIR, ToF-SIMS |
| 입자 형태/균열 변화? | **SEM** (단면, BSE) | FIB-SEM |
| 격자 fringe를 직접 보고 싶다 | **HRTEM** | STEM-HAADF |
| 산화상태 변화 (Mn²⁺/³⁺/⁴⁺)? | **EELS / XPS** | XANES, XAS |
| TM이 얼마나 녹았나? | **ICP-MS** | ICP-OES |
| 비표면적/포어 분포? | **BET / BJH** | PSA |
| 입자 크기 분포 ($D_{50}$)? | **PSA (laser)** | SEM 통계, BET |
| 흑연 무질서도(disorder)? | **Raman ($I_D/I_G$)** | XRD (002) FWHM |
| 전해질 분해산물 종류? | **FTIR ATR** | Raman, NMR |
| 분해 온도, 잔류 수분? | **TGA-DSC** | MS coupled |
| 결정자 크기 (nm)? | **XRD Scherrer** | TEM 직접 측정 |

이 표는 1차 진단 진입점이며, 실제 메커니즘 규명에는 늘 둘 이상의 기법을 cross-check 해야 한다.

## 추천 참고 도서

- Cullity, B. D., Stock, S. R. *Elements of X-ray Diffraction* (3rd ed., Pearson, 2001) — XRD 표준 교재.
- Williams, D. B., Carter, C. B. *Transmission Electron Microscopy* (2nd ed., Springer, 2009) — TEM 종합 표준.
- Briggs, D., Grant, J. T. *Practical Surface Analysis: Auger and X-ray Photoelectron Spectroscopy* (Wiley, 2003) — XPS 실무.
- Skoog, D. A., Holler, F. J., Crouch, S. R. *Principles of Instrumental Analysis* (7th ed., Cengage, 2017) — 분석화학 종합 교재.
- Smith, B. C. *Fundamentals of Fourier Transform Infrared Spectroscopy* (2nd ed., CRC, 2011) — FTIR 실무 입문.

## 작성 상태

- **현재 상태:** 본문 완성 (7개 소주제 파일 모두 본문 작성 완료)
- 각 본문은 자기충족 관련개념 박스로 외부 링크 없이 핵심 식·가정·직관까지 포함
- 06 작동이론과의 차별: 06은 "현상 + 시그니처", 07은 "측정 셋업 + fitting + 정량 한계"
