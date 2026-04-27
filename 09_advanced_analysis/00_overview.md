# 고도분석 / Operando 운용 (Advanced & Operando Analysis Workflow)

## 개요

이 영역(09)은 06 작동이론의 [`07_operando.md`](../06_battery_operation/07_operando.md)와 짝을 이루지만 시각이 다르다. 06이 **"어떤 기법이 어떤 현상을 보는가"**(현상 → 도구 매핑 카탈로그)라면, 09는 **"그 도구를 어떻게 운용하고 데이터를 해석하는가"**다 — 셀 디자인, 빔타임 신청, 시료 준비, raw 데이터 처리 워크플로우, fitting 절차까지가 본 영역의 범위다.

대학원생이 실제로 마주치는 진입 장벽은 보통 두 종류다. 첫째는 **외부 시설(synchrotron, cryo-EM facility, ToF-SIMS user lab) 협업**이다. PAL-XFS, SPring-8, ESRF, ALS, Diamond 같은 광원에 빔타임 proposal을 쓰고, 실험 직전 24시간에 셀을 만들어 가져가야 한다. 둘째는 **raw 데이터에서 의미 있는 숫자까지의 경로**다. ATHENA/ARTEMIS로 EXAFS를 fit하거나, MotionCor2로 cryo-EM drift를 보정하는 식의 작업은 단순 click이 아니라 절차적 지식의 누적이다.

이 영역은 그 운용 지식을 정리한다. 즉 06이 **현상 카탈로그**, 09가 **운용 매뉴얼**이다.

## 학습 목표

- Operando XRD에서 lab vs synchrotron 선택 기준, 셀 형상별 셋업(코인 with Be, capillary, Kapton pouch)을 구분하고 waterfall plot/contour map에서 격자 상수 vs SOC를 fitting할 수 있다
- XAS 데이터의 normalization → background subtraction → $\chi(k) \to \chi(R)$ Fourier transform 까지 ATHENA/ARTEMIS workflow를 따라갈 수 있고, XANES edge로 산화 상태, EXAFS로 배위수/결합 거리를 구분해 읽을 수 있다
- Cryo-EM의 plunge-freezing 시료 준비, low-dose imaging의 dose budget, MotionCor2 이후 FFT/IFFT로 dendrite/SEI를 atomic resolution까지 해석하는 흐름을 이해한다
- DEMS/OEMS로 m/z 32(O₂), 44(CO₂), 28(CO), 2(H₂)를 분리 정량하고, $^{18}$O isotope labeling으로 격자 산소 vs 전해질 산화 기원을 구분할 수 있다
- ssNMR에서 MAS의 magic angle 54.7° 의미, $^7$Li Knight shift(~265 ppm)로 dead Li 정량, $^{19}$F/$^{31}$P로 SEI/전해질 분해 산물을 추적할 수 있다
- EC-AFM으로 SEI 형성 실시간, force-distance/Young's modulus mapping, KPFM의 work function/charge mapping을 운용할 수 있다
- ToF-SIMS의 primary ion(Bi$_3^+$, Cs$^+$), depth profile sputter rate calibration, 분자 fragment(LiF, ROCO$_2$Li) 검출과 $^6$Li tracer의 의미를 이해한다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) | Tier |
|------|----------------|:----:|
| [`01_operando_xrd.md`](./01_operando_xrd.md) | 셀 디자인(Be/capillary/Kapton), Mythen/Pilatus, waterfall plot, beam damage | 2 |
| [`02_xas.md`](./02_xas.md) | XANES edge / EXAFS Fourier transform, ATHENA/ARTEMIS workflow, beamtime | 1 |
| [`03_cryo_em.md`](./03_cryo_em.md) | Plunge-freeze, low-dose, dendrite atomic resolution, MotionCor2 | 1 |
| [`04_dems_oems.md`](./04_dems_oems.md) | DEMS 셀, $^{18}$O isotope, m/z 해석, sensitivity factor, OEMS pressure | 2 |
| [`05_ssnmr.md`](./05_ssnmr.md) | $^7$Li/$^{19}$F/$^{31}$P, MAS 54.7°, dead Li 정량, Knight shift 265 ppm | 1 |
| [`06_afm_ecafm.md`](./06_afm_ecafm.md) | EC-AFM, force-distance, Young's modulus mapping, KPFM | 2 |
| [`07_tof_sims.md`](./07_tof_sims.md) | Primary ion, depth profile, 분자 fragment, $^6$Li tracer | 2 |

## 의사결정 트리 (어떤 기법으로 갈 것인가)

| 질문 | 1순위 기법 | 본문 |
|---|---|---|
| 작동 중 격자 변화 / 상전이 | Operando XRD | [`01`](./01_operando_xrd.md) |
| TM 산화 상태 변화 | XAS (XANES) | [`02`](./02_xas.md) |
| TM-O 결합 거리 / 배위수 | XAS (EXAFS) | [`02`](./02_xas.md) |
| Dead Li / dendrite 직접 관찰 | Cryo-EM | [`03`](./03_cryo_em.md) |
| 가스 발생 종류·양 | DEMS / OEMS | [`04`](./04_dems_oems.md) |
| Li 환경 정량 (dead Li, SEI 성분) | ssNMR | [`05`](./05_ssnmr.md) |
| SEI 형성 실시간 / 기계적 물성 | EC-AFM, KPFM | [`06`](./06_afm_ecafm.md) |
| 분자 수준 SEI 조성 + depth | ToF-SIMS | [`07`](./07_tof_sims.md) |

## 추천 참고 도서 및 논문

- Yang, F., Wang, J. *Synchrotron-based X-ray Absorption Spectroscopy for Energy Materials* (review, *Chemical Reviews* 2017) — synchrotron beamline 운용과 배터리 응용.
- Li, Y. et al. (Cui group) *Science* 358 (2017) 506–510 — cryo-EM atomic-resolution dendrite/SEI 관찰의 표준 인용.
- Tsiouvaras, N., Meini, S., Buchberger, I., Gasteiger, H. A. *Journal of The Electrochemical Society* 160 (2013) A471 — DEMS/OEMS 셀 디자인과 isotope labeling 표준.
- Pecher, O., Carretero-Gonzáles, J., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 29 (2017) 213 — operando NMR 운용 리뷰.
- Lin, F. et al. *Chemical Reviews* 117 (2017) 13123 — synchrotron 기법으로 본 양극재 종합 리뷰.

## 작성 상태

- **현재 상태:** 본문 완성 (7개 소주제 파일 모두 본문 작성 완료)
- 06 [`07_operando.md`](../06_battery_operation/07_operando.md)와 차별화: 06은 현상→도구 카탈로그, 09는 도구 운용 워크플로우 — 셀 디자인, 시료 준비, 데이터 처리 절차 중심
- 자기충족 관련개념 박스 패턴 유지: 박스 안에 외부 .md 링크 없음
