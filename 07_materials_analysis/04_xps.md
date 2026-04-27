# XPS (X-ray Photoelectron Spectroscopy)

## 1. 개요

XPS는 표면 ~10 nm 이내의 화학 조성과 화학 상태(chemical state)를 정량하는 가장 표준적인 기법이다. 배터리 연구에서 거의 독점적인 자리는 **SEI/CEI 분석**이다 — 어떤 분해산물이 표면에 얼마만큼 있는지, depth profile로 어떤 깊이까지 분포하는지를 ppm-quasi 단위로 정량할 수 있다.

본 절은 광전자 방출 원리, binding energy, charge correction, peak deconvolution, depth profile, SEI 표준 피크 위치(LiF, Li₂CO₃, ROCO₂Li 등)까지 — 즉 raw XPS 스펙트럼에서 화학 정보를 끌어내는 전 과정을 다룬다. 거시적 SEI 메커니즘은 [작동이론의 SEI](../06_battery_operation/03_interface.md)에서 별도 다룬다.

## 2. 광전자 방출 원리와 Binding Energy

XPS는 시료에 단일 에너지 X-ray(보통 Al K$\alpha$ 1486.6 eV, Mg K$\alpha$ 1253.6 eV)를 조사해 광전 효과(photoelectric effect)로 방출되는 광전자(photoelectron)의 운동 에너지를 측정한다. 핵 가까이 결합된 내각 전자는 큰 결합 에너지(binding energy, BE)를 가지므로, 방출 후 운동 에너지가 작다.

직관: X-ray 에너지를 잘 알고, 방출된 전자의 운동 에너지를 측정하면, 그 차이가 정확히 그 전자가 원자에 결합돼 있던 에너지(binding energy)다. 같은 원소라도 결합 환경에 따라 BE가 수 eV 어긋나며(chemical shift), 이것이 산화상태와 결합 종류를 구분하는 열쇠다.

$$\text{KE} = h\nu - \text{BE} - \phi$$

각 항: KE = 검출된 운동 에너지, $h\nu$ = X-ray 광자 에너지, BE = 광전자의 binding energy(Fermi 준위 기준), $\phi$ = 분광기 일함수(work function, 보정용 상수). 측정은 KE로 하지만 보고는 BE 축으로 한다.

표면 민감도의 기원은 광전자의 비탄성 평균 자유 거리(inelastic mean free path, IMFP, $\lambda$)다. 100–1000 eV KE에서 $\lambda \approx 1–3$ nm이며, 90% 신호가 $3\lambda \approx 5–10$ nm에서 온다. 그래서 XPS는 본질적으로 표면 분석 기법.

## 3. Charge Correction (대전 보정)

절연성 시료는 광전자가 빠져나가면서 양전하가 누적돼 spectrum 전체가 BE 축에서 양의 방향으로 shift된다(charging). 이를 보정하지 않으면 모든 BE 값이 부정확하다. 표준은 **adventitious carbon C 1s = 284.8 eV** 에 정렬하는 방식이다(보통 시료 표면에 자연 흡착된 hydrocarbon).

> **관련 개념: Charge correction의 한계와 대안**
> C 1s 284.8 eV 정렬은 가장 널리 쓰이지만 carbonaceous 시료(흑연, conductive carbon, carbon coating)에서는 sp²/sp³ C가 섞여 reference가 모호해진다.
> 대안: (i) Au 4f₇/₂ = 84.0 eV 표준(시료에 미량 Au sputter), (ii) 시료 도전성 양호 시 Fermi level 정렬, (iii) 전자 중성화 총(electron flood gun) 사용해 charging 자체를 줄임.
> SEI 분석에서는 충방전 후 표면이 매우 절연성이므로 flood gun + C 1s 보정 병행이 표준.
> 보정 후 BE 정확도는 ±0.1–0.2 eV 수준; 더 정확한 화학 상태 동정은 fingerprint(여러 피크 패턴)와 cross-check가 필수.

C 1s 284.8 eV가 실제 시료의 conductive carbon 자체일 때(흑연 음극)는 graphite C 1s = 284.5 eV(sp²)로 보정하는 것이 더 정확하다.

## 4. Peak Deconvolution (피크 분해)

XPS 피크는 보통 단일 화학 상태가 아니라 여러 환경의 동일 원소가 겹쳐 보인다. SEI의 C 1s는 흑연, C-C/C-H, C-O, C=O, O-C=O, CO₃²⁻ 등 5–7개 성분이 겹친다. 이를 분리하는 것이 peak deconvolution.

표준 절차:
1. **Background 빼기**: Shirley 또는 Tougaard 백그라운드. linear는 부정확.
2. **Peak shape**: Gaussian-Lorentzian product (GL-30~70%) 또는 Voigt. Metal core level은 asymmetric이라 Doniach-Sunjic.
3. **Constraint**: 알려진 spin-orbit splitting 비율 고정 (예: $2p_{3/2}:2p_{1/2}$ = 2:1, BE 차이 고정), FWHM 동일 화학 상태에서 동일.
4. **Reference BE**: 데이터베이스(NIST, La Surface) 값을 초기 추정으로.
5. **Fit 평가**: $\chi^2$, residual의 randomness, 물리적 타당성(상대 강도, FWHM 합리성) 모두 확인.

반드시 피해야 할 함정: 데이터에 맞추려고 비물리적으로 많은 피크를 추가, FWHM을 자유 변수로 두기, 알려진 spin-orbit ratio 무시. 좋은 deconvolution은 가능한 가장 적은 피크로 fit이 closing된다.

## 5. Depth Profile (Ar Sputter)

XPS는 본질적으로 표면(~10 nm) 기법이지만, Ar⁺ 또는 Ar 클러스터(Ar_n⁺) 이온 sputter로 표면을 점차 깎으면서 측정하면 depth profile이 가능하다. SEI 두께·조성 변화 측정의 표준 방식.

| 빔 종류 | 손상 정도 | 적용 |
|---------|-----------|------|
| **Ar⁺ monoatomic (1–5 keV)** | 큼 (chemical reduction, CO₃²⁻ → C-C 등) | 무기 산화물·금속 |
| **Ar 클러스터 (Ar₁₀₀₀–₅₀₀₀)** | 작음 (분자 결합 보존) | 폴리머·SEI·organic 표층 |
| **GCIB (gas cluster ion beam)** | 매우 작음 | SEI/CEI 표준 |

Sputter rate 보정은 표준 SiO₂/Si 다층 시료로 calibration 후 시료에 적용. 단 SEI는 매트릭스 효과로 rate가 다를 수 있어 절대 깊이는 ±30% 오차 인정.

배터리 적용: SEI 두께 보통 10–50 nm, depth profile로 outer layer(organic, 분자 단편)와 inner layer(inorganic, LiF/Li₂O/Li₂CO₃ 풍부)의 mosaic 구조를 직접 본다. CEI는 보통 더 얇아 5–20 nm.

## 6. SEI 표준 피크 — 화학 종 동정

SEI/CEI 분석에서 외울 가치 있는 핵심 BE 값들. 데이터베이스 의존이 아니라 머릿속에 표준값이 있으면 deconvolution이 훨씬 빠르다.

| 화학 종 | Core level | BE (eV) | 코멘트 |
|---------|-----------|---------|--------|
| C-C / C-H | C 1s | 284.5 / 284.8 | sp² / adventitious |
| C-O (alkoxide, ether) | C 1s | 286.5 | ROLi, ether |
| C=O (carbonyl) | C 1s | 288.0 | 알데히드, 케톤 |
| O-C=O (ester) | C 1s | 289.0 | RCOOR' |
| **Li₂CO₃** | C 1s | **290.0** | SEI 무기 carbonate |
| **LiF** | F 1s | **685.0** | SEI 핵심 무기 |
| Li-PF$_x$O$_y$ (decomposed LiPF₆) | F 1s | 687 | LiPF₆ 분해 |
| LiPF₆ (intact) | F 1s | 687.5 | 잔존 염 |
| **Li₂CO₃** | O 1s | **532.0** | C=O (carbonate) |
| Li₂O | O 1s | 528 | Li metal 산화 |
| ROCO₂Li (semi-carbonate) | O 1s | 533, C 1s 289 | EC 환원 분해 |
| Li 1s | — | 55–56 | 모든 Li 종 (구분 어려움) |
| P 2p (LiPF₆) | — | 137 | 6+ 산화상태 |
| P 2p (Li_xPF_yO_z) | — | 134 | 분해 산물 |
| TM 2p (Mn, Co, Ni) | 2p₃/₂ | 640–860 | 산화상태별 multiplet |

이 표가 의미하는 진단 사례: F 1s 685 eV peak 강도 증가 = LiF 형성 증가 = HF 공격 또는 FEC 첨가제 환원 산물. C 1s 290 eV peak가 강하면 Li₂CO₃ 풍부, EC 환원 분해 활발 또는 CO₂ 흡착. O 1s 528 eV peak는 Li 금속의 표면 산화.

정량 보고는 보통 atomic % (전체 검출 원소 합 = 100%) 또는 특정 종의 surface mol/m² 형식으로. RSF(relative sensitivity factor)를 자동 적용.

## 7. 시료 준비와 Air-sensitive Transfer

배터리 시료(특히 사이클링 후 음극, Li 금속, 사이클드 양극)는 대기 노출 시 즉시 표면 변화. 표준 절차:
- 셀을 글러브박스(< 1 ppm O₂/H₂O)에서 분해
- DMC 등 carbonate-free solvent로 잔존 LiPF₆/EC 세척(SEI를 녹이지 않으려면 짧게)
- Ar 분위기 진공 transfer vessel로 XPS 챔버 직접 연결
- 노출 시간 < 30 s 권장; 1 분 이상이면 LiF가 표면에 인공 형성됨

X-ray 손상도 조심해야 한다. SEI 카보네이트는 X-ray로 분해되며, 같은 spot에서 1 시간 측정하면 C-O 함량이 인공적으로 줄어든다. 짧은 측정·spot 이동·monochromator 사용으로 dose 감소.

## 참고 문헌

- Briggs, D., Grant, J. T. *Practical Surface Analysis: Auger and X-ray Photoelectron Spectroscopy* (Wiley, 2003) — XPS 표준 실무서.
- Moulder, J. F. et al. *Handbook of X-ray Photoelectron Spectroscopy* (Physical Electronics, 1995) — 표준 BE 데이터베이스.
- Andersson, A. M., Edström, K. *Journal of The Electrochemical Society* 148 (2001) A1100 — 흑연 SEI XPS 표준 분석.
- Edström, K., Herstedt, M., Abraham, D. P. *Journal of Power Sources* 153 (2006) 380–384 — 양극 CEI XPS 분석.
- Eshetu, G. G. et al. *Nature Communications* 12 (2021) 5459 — XPS 기반 SEI 분해산물 정량 리뷰.
