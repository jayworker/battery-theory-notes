# ToF-SIMS 운용 — Depth Profile, Fragment 검출, $^6$Li Tracer (Time-of-Flight Secondary Ion Mass Spectrometry)

## 1. 개요

ToF-SIMS(time-of-flight secondary ion mass spectrometry)는 가속된 primary ion으로 시료 표면을 sputter하여 튀어나오는 secondary ion을 시간측정 mass spectrometer로 검출한다. 배터리에서는 SEI/CEI의 **분자 fragment 수준 조성 + nm 깊이 분해능 + lateral imaging**을 동시에 줄 수 있는 거의 유일한 기법.

06 [`07_operando.md`](../06_battery_operation/07_operando.md)에는 SIMS가 따로 등장하지 않는다 (XPS는 표면만, NMR은 bulk). ToF-SIMS는 SEI 깊이 방향 화학을 nm 분해능으로 정량하는 도구로, SEI/CEI 운용 분석의 핵심 자리에 들어있다.

## 2. Primary Ion 선택 — Bi$_3^+$ vs Cs$^+$

Primary ion은 두 가지 역할을 한다 — (i) 시료 sputter, (ii) ionization 유도. 두 역할의 trade-off로 ion 선택이 결정된다.

| Primary ion | 특성 | 적합 응용 |
|---|---|---|
| **Bi$_3^+$, Bi$_5^+$** | cluster ion, 분자 fragment 보존 양호 | SEI 분자 종(LiF, ROCO$_2$Li 등) imaging, surface analysis |
| **Cs$^+$** | atomic ion, sputter rate 높음, 음이온 enhanced | 원소 depth profile (특히 음이온, F, O) |
| **Ar cluster (Ar$_{2000}^+$)** | "soft" sputter, polymer/SEI 분해 최소화 | 분자 정보 보존하며 depth profile (dual-beam) |
| **O$_2^+$** | 양이온 enhanced | 양이온 depth profile (금속) |

전형적 dual-beam 셋업: **Bi$_3^+$ analysis beam** + **Cs$^+$ 또는 Ar cluster sputter beam**. Analysis beam이 spectrum/image를 찍는 동안 sputter beam이 시료를 깊이 방향으로 깎음.

## 3. Depth Profile — Sputter Rate Calibration

깊이 분해능은 sputter rate calibration에 의존한다. SEI는 unknown matrix이므로 일반적으로 **standards**(SiO$_2$ thermal oxide, Ta$_2$O$_5$ anodic film 등)에서 sputter rate를 측정해 SEI에 가까운 값으로 가정한다.

> **관련 개념: Sputter rate matrix effect**
> Sputter rate $\dot z$ [nm/s]는 primary ion의 ion yield ($Y$, 충돌당 튀어나오는 atom 수)와 시료 atomic density에 의존: $\dot z = \frac{Y j}{n e}$, $j$ = ion current density, $n$ = atomic density.
> 같은 Cs$^+$ 1 keV에서도 SiO$_2$ vs polymer에서 sputter rate가 5–10배 차이날 수 있다. 이를 **matrix effect**라 부른다.
> 보정: standards depth (XRR 또는 ellipsometry로 미리 측정)로 sputter rate를 결정하고, 시료 SEI에는 비슷한 organic/inorganic 표준을 적용. 절대 깊이 오차는 ±20–50% 정도가 일반적.

Depth profile 결과는 (sputter time → depth) 변환 후 **species intensity vs depth** 곡선으로 보고된다. SEI typical depth profile에서는:

- Surface (~5 nm): 유기 ROCO$_2$Li, polymer fragment 우세.
- Mid (5–30 nm): LiF, Li$_2$CO$_3$ 등 무기 우세.
- Bottom (~30–50 nm): graphite/Li metal 본체와 만나면 C$^-$ 또는 Li$^+$ 신호 급변.

## 4. 분자 Fragment 검출 — SEI Fingerprint

ToF-SIMS의 강점은 **분자 fragment를 mass로 직접 동정**한다는 것이다. SEI 안의 종은 다음 fragment fingerprint로 식별된다.

| 종 | 특징적 fragment (m/z, 음이온) |
|---|---|
| LiF | LiF$_2^-$ (45), Li$_2$F$_3^-$ (71) |
| Li$_2$CO$_3$ | CO$_3^-$ (60), Li$_2$CO$_3^-$ (74) |
| Li$_2$O | LiO$^-$ (23), Li$_2$O$^-$ (30) |
| ROCO$_2$Li (alkyl carbonate) | OC$_2$H$_3^-$ (43), OC$_3$H$_5$O$_2^-$ (73) |
| Polycarbonate / polymer | C$_n$H$_x$O$_y^-$ pattern |
| LiPF$_6$ 분해 (LiPO$_x$F$_y$) | PO$_2^-$ (63), PO$_2$F$_2^-$ (101) |
| LiPF$_6$ (intact) | PF$_6^-$ (145) |

양이온 (positive ion) mode도 보완적: Li$^+$ (7), C$_3$H$_5^+$ (41), 그리고 substrate 의 metal 양이온.

상대적 정량은 같은 spectrum 안의 reference fragment (예: C$^-$, total ion current)로 normalization한 후 비교. 절대 정량은 거의 불가능 (matrix effect 큼).

## 5. 3D Imaging — Depth + Lateral

ToF-SIMS의 dual-beam 운용은 **3D rendering**까지 가능. 각 sputter step마다 lateral image를 찍어 stack하면 3D voxel 데이터가 된다.

전형적 spec: lateral resolution 100–300 nm (Bi$_3^+$ 기준), depth resolution 1–5 nm. SEI 두께가 30 nm 안팎이므로 5–10 step의 3D dataset을 만들 수 있다. 흔한 분석:

- 양극 표면의 **CEI 분포 균일성**: 입자 사이 그루브와 표면에 CEI 두께가 다른가?
- **국소 dendrite hot spot의 3D LiF 분포**: dendrite tip 주변에 LiF가 농축?
- **Crack 안쪽까지의 SEI 침투**: post-cycling 음극의 micro-crack 안쪽 화학.

## 6. Isotope Tracer — $^6$Li Exchange로 Li Transport

ToF-SIMS는 isotope-resolved measurement가 매우 정확하다 ($^6$Li vs $^7$Li mass 차이 1 unit, ToF가 쉽게 분해).

표준 실험: **$^7$Li metal anode**로 사이클을 어느 정도 진행한 후 (모든 SEI는 $^7$Li), **$^6$Li-enriched 전해질** ($^6$LiPF$_6$ + carbonates)로 교체하고 추가 사이클 진행. ToF-SIMS depth profile에서 $^6$Li / $^7$Li 비율의 깊이 의존성이 곧 **Li transport pathway**.

해석 예시:
- $^6$Li이 SEI 표면에만 머물고 깊이에 못 들어가면 → SEI inner layer는 통과 못함, 새로 형성된 표면이 dominant ion path.
- $^6$Li이 SEI 전체에 균일 → grain boundary 또는 nano channel을 통한 fast transport.
- $^6$Li이 Li metal 본체에 들어감 → SEI를 완전히 통과해 plating에 참여.

이 isotope tracer 기법으로 SEI의 ionic conductor 모델 (vehicle vs Grotthuss vs grain boundary)을 직접 검증할 수 있다.

## 7. 셀 분해와 시료 Transfer

ToF-SIMS는 진공 ($\sim 10^{-9}$ torr) 장비라 시료를 air-sensitive하게 다뤄야 한다.

표준 chain:
1. Glove box ($<0.1$ ppm O$_2$, H$_2$O) 에서 셀 분해.
2. 음극/양극을 DMC로 가볍게 헹궈 잔류 LiPF$_6$ 제거 (이때 SEI 일부 손실 가능 — 헹굼 protocol 명시 필요).
3. **Air-tight transfer arm** 또는 vacuum suitcase로 ToF-SIMS chamber까지 이동.
4. ToF-SIMS load lock 진입 시간 < 30 sec.

DMC rinse 단계가 결과의 가장 큰 systematic 변수. 안 헹구면 LiPF$_6$가 dominate해서 SEI 신호가 묻히고, 헹구면 SEI 외층 organic이 일부 빠져나간다.

## 8. 실전 체크리스트

- Primary/sputter ion 선택: 분자 정보 → Bi$_3^+$ + Ar cluster, 원소 정량 → Cs$^+$/O$_2^+$
- 표준 시료(SiO$_2$, Ta$_2$O$_5$)로 sputter rate calibration
- Negative + positive mode 둘 다 측정 (음이온 = F/O 종, 양이온 = Li/H 종)
- DMC rinse protocol을 모든 시료에 동일하게
- $^6$Li tracer 실험 시 enrichment 95%+ 사용, mass resolution > 5000 확인
- 3D image는 항상 같은 voxel 크기로 재현성 보장
- 결과 보고: depth profile + lateral image + 3D rendering 셋트

## 참고 문헌

- Wood, K. N., Teeter, G. *ACS Applied Energy Materials* 1 (2018) 4493 — XPS/ToF-SIMS comparison for SEI 분석.
- Lu, P., Harris, S. J. *Electrochemistry Communications* 13 (2011) 1035 — ToF-SIMS로 본 SEI의 분자 종 구분.
- Mogensen, R., Brandell, D., Younesi, R. *ACS Energy Letters* 1 (2016) 1173 — $^6$Li isotope ToF-SIMS tracer.
- Sahore, R. et al. *Journal of The Electrochemical Society* 167 (2020) 020513 — depth profile 보정과 matrix effect 가이드.
