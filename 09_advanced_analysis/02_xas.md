# XAS 운용 — XANES, EXAFS와 ATHENA/ARTEMIS 워크플로우 (X-ray Absorption Spectroscopy Workflow)

## 1. 개요

XAS(X-ray absorption spectroscopy)는 특정 원자(보통 양극재의 전이금속, transition metal, TM)의 absorption edge를 통해 **산화 상태와 국소 구조**를 동시에 측정한다. 06 [`07_operando.md`](../06_battery_operation/07_operando.md)에서 "XANES = 산화 상태, EXAFS = 결합 거리"라는 카탈로그를 봤다면, 이 본문은 **빔타임 신청 → in-situ 셀 → raw $\mu(E)$ → ATHENA/ARTEMIS workflow → fit 결과 보고**까지의 절차를 정리한다.

XAS의 매력은 "원소 선택적 + 국소 구조 + 작동 중 측정 가능"의 세 가지가 동시에 가능하다는 점이다. 단점은 **싱크로트론이 사실상 필수**라는 점 — 한 번의 좋은 데이터셋을 위해 보통 2–4 일의 빔타임이 필요하다.

## 2. XANES — Edge Position과 Pre-edge Feature

XANES(X-ray Absorption Near Edge Structure)는 absorption edge 부근(edge $\pm 30$ eV)을 본다. 핵심은 **edge의 절대 위치가 곧 평균 산화 상태**라는 직관이다. Edge는 1s 코어 전자가 빈 상태로 여기되는 광자 에너지이며, 핵 양전하가 강해질수록(즉 산화 상태가 높을수록) 결합이 강해져 edge가 더 높은 에너지로 shift한다.

전형적 K-edge 위치(배터리 양극 TM):

- **Mn K-edge**: 6539–6560 eV 영역. Mn$^{2+}$/Mn$^{3+}$/Mn$^{4+}$이 약 1–2 eV 간격으로 분리.
- **Co K-edge**: ~7720 eV 부근. LCO의 Co$^{3+}$/Co$^{4+}$ 변환이 NMC 사이클에서 작은 shift로 잡힘.
- **Ni K-edge**: ~8333 eV. NMC의 Ni$^{2+}$/Ni$^{3+}$/Ni$^{4+}$ 시프트가 가장 크고 명확.
- **Fe K-edge**: ~7112 eV. LFP의 Fe$^{2+}$/Fe$^{3+}$.

Edge 위치 정량은 보통 **half-edge** 또는 **inflection point** (1차 미분의 최댓값) 기준으로 한다. Reference 화합물(Ni metal foil, NiO, LiNiO$_2$ 등)을 같이 측정해 산화 상태 calibration line을 그리는 것이 표준.

> **관련 개념: Pre-edge feature와 4-vs-6 배위**
> Edge 직전(보통 8–15 eV 아래)에 작은 feature가 종종 보인다. 이는 1s → 3d 형식적으로 금지된 quadrupole 전이 또는 4p–3d hybridization으로 해석된다. **사면체 배위(4-coordinated)**는 inversion symmetry가 깨지므로 3d–4p 혼합이 강하고 pre-edge가 크다. 반면 **팔면체(6-coordinated)**는 inversion symmetry가 지켜져 pre-edge가 작고 약한 quadrupole만 남는다.
> 적용: NMC 표면 reconstruction(layered → spinel → rock-salt)에서 사면체 사이트로 cation이 이동하면 pre-edge intensity 증가가 직접 신호로 잡힌다.

## 3. K-edge vs L-edge

| Edge | 에너지 | 측정 모드 | 정보 |
|---|---|---|---|
| TM K-edge | 5–10 keV (hard X-ray) | 투과/형광 | Bulk 산화 상태, EXAFS 가능 |
| TM L$_{2,3}$-edge | 600–1000 eV (soft X-ray) | TEY/TFY/RIXS | 표면 ($<10$ nm), 전자구조 직접 |
| O K-edge | 530 eV | TEY/TFY | O 2p hole, anionic redox 직접 검출 |

K-edge는 1s → np transition(쌍극자 허용)이라 강하고 EXAFS까지 길게 oscillation이 잡혀 fitting이 가능하다. L-edge는 2p → 3d로 산화 상태에 매우 민감하지만 soft X-ray라 측정 환경이 까다롭다(고진공 필요, in-situ가 어려움). 그래서 보통 K-edge = bulk operando, L-edge = ex-situ surface spectroscopy로 역할을 나눈다.

## 4. EXAFS — $\chi(k)$에서 $\chi(R)$까지

EXAFS(Extended X-ray Absorption Fine Structure)는 edge 이후 100–1000 eV 영역의 진동 신호다. 그 진동은 광전자가 이웃 원자에서 산란해 돌아오는 양자 간섭의 결과다. 이를 Fourier transform하면 **거리 공간의 RDF**와 비슷한 형태로 변환되어, 1st coordination shell의 배위수와 결합 거리를 직접 추출할 수 있다.

핵심 식(EXAFS equation):

$$\chi(k) = \sum_j \frac{N_j S_0^2}{k R_j^2} f_j(k) e^{-2k^2 \sigma_j^2} e^{-2R_j/\lambda(k)} \sin[2k R_j + \phi_j(k)]$$

각 항: $k$ = 광전자 wavevector, $N_j$ = $j$번째 셸의 배위수, $R_j$ = 평균 결합 거리, $\sigma_j^2$ = Debye-Waller factor (열적/구조적 disorder), $f_j(k)$ = 산란 진폭, $\phi_j(k)$ = 위상, $S_0^2$ = passive electron amplitude reduction (보통 0.7–0.95).

이 식의 직관: $\sin(2kR + \phi)$ 의 주기가 결합 거리, 진폭이 배위수, exponential decay가 thermal/구조 disorder. Fourier transform $\chi(k) \to \chi(R)$ 을 하면 각 셸이 분리된 peak으로 보이고, 첫 peak이 1st shell (TM-O), 두 번째가 TM-TM 등으로 해석된다.

## 5. ATHENA / ARTEMIS Workflow

Demeter project (Bruce Ravel)의 ATHENA, ARTEMIS는 사실상 EXAFS 분석의 표준 도구다.

**ATHENA 단계:**

1. raw $\mu(E)$ import (transmission: $\mu = \ln(I_0/I_t)$, fluorescence: $\mu = I_f/I_0$).
2. **Energy calibration**: reference foil(같은 원소)의 inflection을 표준값에 맞춤.
3. **Pre-edge subtraction**: edge 이전 -150 ~ -30 eV 영역에 직선/Victoreen fitting으로 background 제거.
4. **Edge step normalization**: post-edge에 polynomial fit하여 edge jump = 1로 정규화.
5. **Background spline ($\mu_0$) 제거**: AUTOBK 알고리즘. $R_{\text{bkg}}$ 파라미터(보통 1.0 Å)는 1st shell보다 작게 둠.
6. $\chi(k)$ 추출, $k$-weight ($k^1, k^2, k^3$) 적용, Fourier transform → $\chi(R)$.

**ARTEMIS 단계:**

1. FEFF 계산으로 결정 모델(예: NMC R$\bar{3}$m)에서 scattering paths 생성.
2. 각 path에 대해 $N, R, \sigma^2, \Delta E_0$ 를 fitting parameter로 두고 nonlinear least squares.
3. Goodness: $R$-factor (보통 < 0.02 이상적), 그리고 $\chi^2_\nu$.
4. 보통 1st shell만 fit (TM–O), 더 멀리 가려면 multiple scattering까지 포함.

전형적 NMC fitting 결과:

| 사이트 | 신선 | 충전 후 |
|---|---|---|
| TM–O ($N$) | 6.0 | 5.8–6.0 |
| TM–O ($R$, Å) | 1.94 | 1.88 |
| Debye-Waller $\sigma^2$ (Å$^2$) | 0.004 | 0.006 |

TM–O 결합이 짧아지는 것이 산화 상태 증가의 직접 증거 (Ni$^{4+}$이 Ni$^{2+}$보다 작은 ion).

## 6. 빔타임 신청 — 한국/일본/유럽

| 시설 | beamline 예 | 특화 |
|---|---|---|
| **PAL-XFS** (포항) | 8C, 10C | hard X-ray XAS, in-situ cell 운용 풍부 |
| **SPring-8** (일본) | BL01B1, BL14B2 | high-flux QEXAFS (시간 분해 EXAFS) |
| **ESRF** (프랑스) | BM23, ID26 | high-resolution RIXS, dispersive XAS |
| **Diamond** (영국) | B18, I20 | core-level + EXAFS 통합 |
| **ALS** (미국) | 10.3.2, 4.0.2 | soft X-ray L/O edge, TEY-RIXS |

신청 사이클은 보통 6개월. Proposal에는 (i) 시료 system, (ii) measurement plan(시간/에너지 범위/SOC 범위), (iii) safety(전해질/Li metal), (iv) novelty가 들어간다.

## 7. In-situ XAS 셀

XRD와 비슷하지만 X-ray 흡수가 훨씬 강하므로 윈도우 두께가 더 중요하다. 두 가지 표준:

- **Coin/pouch with Kapton window**: 양극 활물질 ~1–5 mg/cm$^2$ 정도면 transmission $\mu d \sim 1$ 가까이 맞춤. Edge step이 너무 작으면 노이즈, 너무 크면 thickness effect로 왜곡.
- **Fluorescence 모드**: 시료가 두껍거나 농도가 낮을 때 (Mn 도핑 NMC 등). 신호 대 배경비가 낮아 적분 시간이 길어짐.

전기화학 운용은 보통 PAL-XFS 같은 곳에 user-built potentiostat 자리가 있어 그 자리에서 사이클링 + 측정을 동시 진행.

## 8. 실전 체크리스트

- 두 가지 reference (metal foil + 산화물) 미리 측정
- $\mu d \sim 1$ 두께 맞추기 (samples too thick → distortion)
- harmonic rejection mirror/detuning 제대로 동작 확인
- ATHENA에서 edge step 1.0 ± 5%로 정규화
- ARTEMIS에서 $S_0^2$는 reference foil로 미리 결정
- Multi-edge 셀(NMC의 Ni/Co/Mn)은 edge별 별도 빔타임 슬롯
- 결과 보고는 항상 (산화 상태 vs SOC) + (TM–O 거리 vs SOC) 두 그래프

## 참고 문헌

- Yang, F., Wang, J. *Chemical Reviews* 117 (2017) 13123 — synchrotron XAS for batteries 종합 리뷰.
- Ravel, B., Newville, M. *Journal of Synchrotron Radiation* 12 (2005) 537 — ATHENA/ARTEMIS 표준 인용 (Demeter project).
- Newville, M. *Reviews in Mineralogy and Geochemistry* 78 (2014) 33 — EXAFS fundamentals 강의 노트.
- Yoon, W.-S. et al. *Journal of the American Chemical Society* 127 (2005) 17479 — operando XAS로 본 layered 양극재 산화 상태 분해.
- Yang, W. et al. *Nature Energy* 3 (2018) 690 — XAS로 본 anionic redox 직접 증거.
