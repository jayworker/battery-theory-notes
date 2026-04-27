# Solid-state NMR 운용 — MAS, $^7$Li/$^{19}$F/$^{31}$P, Dead Li 정량 (ssNMR for Batteries)

## 1. 개요

고체핵자기공명(solid-state NMR, ssNMR)은 **핵 환경에 따른 chemical shift**를 통해 같은 원소가 어디에 있는지(어떤 화합물에, 어떤 사이트에) 정량적으로 분리해낸다. 06 [`07_operando.md`](../06_battery_operation/07_operando.md)에서 "$^7$Li NMR로 dead Li를 본다"라는 카탈로그를 봤다면, 본문은 **MAS(Magic Angle Spinning) 셋업, in-situ NMR 셀, dead Li 정량 절차, $^{19}$F/$^{31}$P/$^{17}$O 다핵종 분석**의 운용을 다룬다.

ssNMR의 결정적 장점은 **(i) bulk-averaged 정량성, (ii) 자성/도전성 시료에서도 동작, (iii) 동위원소 라벨링과 결합 가능**의 세 가지다. 단점은 시간 분해능이 분 단위라 진정한 fast operando가 어렵다는 점.

## 2. 핵종 선택 — $^7$Li, $^{19}$F, $^{31}$P, $^{17}$O

배터리에서 자주 보는 핵종은 다음과 같다.

| 핵종 | natural abundance | 감도 | 정보 |
|---|---|---|---|
| $^7$Li | 92.6% | 높음 (I=3/2) | Li 환경 (격자 site, SEI, dead Li) |
| $^6$Li | 7.4% | 낮음 (I=1) | 좁은 line, isotope tracer로도 사용 |
| $^{19}$F | 100% | 매우 높음 (I=1/2) | LiF, LiPF$_6$ 분해, PVDF |
| $^{31}$P | 100% | 높음 (I=1/2) | LiPF$_6$ 분해 산물 (LiPO$_x$F$_y$), 인산 첨가제 |
| $^{17}$O | 0.04% (enrichment 필요) | 매우 낮음 | 양극 격자 산소, SEI carbonate O |
| $^{23}$Na | 100% | Na 이온 배터리 |

특히 $^7$Li과 $^{19}$F는 자연 풍부도가 높고 감도가 좋아 SEI/SEI/anode 분석의 주력 핵종.

## 3. Chemical Shift Map — Knight Shift와 SEI

각 환경의 $^7$Li chemical shift는 미리 알려진 fingerprint를 갖는다.

| 환경 | $^7$Li shift (ppm) | 비고 |
|---|---|---|
| Diamagnetic Li 화합물 | 0 ± 10 | LiCl, Li$_2$CO$_3$, LiPF$_6$ 용해 등 |
| LiF | $\sim -1$ ~ $-5$ | sharp |
| Graphite intercalate Li (LiC$_6$) | 40–50 | stage 별 미세 분리 |
| Layered cathode (Li[NMC]O$_2$) | -2 ~ +1500 | TM의 paramagnetic shift로 broad |
| **금속 Li (Knight shift)** | **~265** | conduction electron의 contact term |
| Dead Li (mossy/dendritic) | ~265 (또는 ~245) | Li metal과 같지만 morphology에 따라 약간 shift |

> **관련 개념: Knight shift**
> 금속에서 conduction electron이 핵 위치에서 spin polarization을 만들어, 외부 자기장에 비례하는 추가 시프트가 생긴다. 이를 Knight shift $K$라 한다. Li metal의 경우 $K \approx 0.026\%$, 약 265 ppm 시프트.
> 직관: 핵 주변 전자 밀도가 다르면 chemical shift가 다르다 — 금속에서는 free electron이 많아 큰 shift, 절연체(LiF, Li$_2$CO$_3$)에서는 0 ppm 근방.
> 적용: 음극을 분해해 NMR로 측정하면 (a) 흑연 안의 LiC$_6$ 신호 vs (b) 금속 Li/dead Li 신호가 chemical shift 200 ppm 이상 떨어져 깨끗하게 정량 분리된다.

이 shift 분리가 dead Li 정량의 직접 도구다. SEI 안에 둘러싸여 전기화학적으로 격리된 metallic Li은 충방전에 관여하지 않지만, NMR에서는 여전히 metallic shift로 잡힌다. Hu group (2019)이 이 방식을 표준화.

## 4. MAS — Magic Angle Spinning과 54.7°

고체에서는 dipolar coupling, chemical shift anisotropy(CSA), quadrupolar interaction이 모두 angular term $(3\cos^2\theta - 1)$을 포함한다. **이 항을 0으로 만드는 각도가 magic angle, $\cos^{-1}(1/\sqrt{3}) \approx 54.7^\circ$**.

$$3 \cos^2(54.7°) - 1 = 0$$

시료를 이 각도로 기울인 회전축을 따라 빠르게 회전($\sim 10$–60 kHz)시키면 시간 평균이 0이 되어 broadening이 사라진다. 이것이 MAS(magic angle spinning)이다.

배터리 시료에서 MAS의 의미:
- Layered NMC의 $^7$Li paramagnetic broadening (TM 이웃의 unpaired electron이 만드는 shift dispersion) 을 줄여 site별 분해를 가능하게.
- SEI의 LiF, Li$_2$CO$_3$, ROCO$_2$Li를 단일 1D spectrum으로 분리.

회전 속도가 핵 주변 interaction 폭보다 빨라야 효과가 있어, paramagnetic NMC는 60 kHz MAS가 표준 (1.3 mm rotor 사용).

## 5. In-situ NMR 셋업 — 가공된 Capillary 셀

진짜 operando NMR은 어렵다 — MAS rotor를 돌리면서 사이클링은 사실상 불가능. 그래서 두 가지 운용:

- **In-situ static NMR**: 자기장 안에 작은 plastic-bag 셀(또는 PEEK capillary 셀)을 넣고 사이클링. MAS 안 되므로 NMC같은 paramagnetic 시료는 broad지만, $^7$Li metal vs LiC$_6$ 분리 정도는 가능. Grey group의 표준 셋업.
- **Ex-situ MAS NMR (interrupted cycling)**: 사이클링 중 특정 SOC에서 셀을 정지, glove box 안에서 음극을 떼어 rotor에 packing, MAS 측정. 시간 분해능은 떨어지지만 spectral resolution이 압도적.

**Cell 디자인 핵심**: 자기장 균일도를 깨지 않기 위해 자성 재료(SS, Ni 등)를 가능한 멀리. 셀 케이스는 PEEK, Cu, Al 같은 비자성 재료로 한정.

## 6. Dead Li 정량 — Hu Group 2019

Hu group (Cary L. Hu, *Nature* 572, 2019)이 in-situ $^7$Li NMR로 dead Li 양을 정량하는 표준 protocol을 만들었다.

절차:
1. **Reference 측정**: 신선한 Li metal foil의 $^7$Li 신호 적분값 $A_0$를 같은 셋업에서 측정.
2. **사이클링**: Li metal vs Cu 셀을 일정 cycle 진행.
3. **Stripping 후 측정**: full discharge 후 (모든 active Li 제거) NMR 측정. 이때 남은 metallic Li signal $A$가 곧 dead Li.
4. **정량**: $\text{Dead Li} = (A/A_0) \times m_0$, $m_0$ = 초기 Li mass.

이 방식의 핵심은 dead Li 가 SEI에 둘러싸여 chemically isolated여서 stripping voltage로 빼낼 수 없지만, NMR Knight shift는 그대로 남는다는 점. Coulombic efficiency 손실의 어느 정도가 dead Li이고 어느 정도가 SEI 인지를 직접 분리해 정량할 수 있게 한 거의 유일한 기법.

## 7. $^{19}$F, $^{31}$P — 전해질 분해 산물 추적

$^{19}$F NMR이 흔히 보는 종:
- LiPF$_6$ (출발물): $-72.5$ ppm doublet (P–F 결합).
- LiF (분해 산물, SEI 내): $-204$ ppm.
- PVDF (binder): $-90$ ppm 부근 broad.
- LiPO$_x$F$_y$ (분해 중간체): $-80$ ~ $-150$ ppm 영역.

$^{31}$P NMR이 보는 종:
- LiPF$_6$: $-145$ ppm septet (P가 6 F에 결합).
- LiPO$_2$F$_2$ (분해 산물): 약 $-19$ ppm.
- POF$_3$ (gas phase 분해): $-36$ ppm.

이 두 핵종의 동시 측정으로 LiPF$_6$의 가수분해 경로 (LiPF$_6$ + H$_2$O → LiF + POF$_3$ + 2HF) 의 정량 추적이 가능.

## 8. $^{17}$O Isotope-labeled SEI

$^{17}$O는 자연 풍부도가 0.04%로 너무 낮아 enrichment(보통 30–50%) 한 후 분석. 표준 응용:

- $^{17}$O-enriched 카보네이트 용매로 셀 운용 → SEI 안의 carbonate species (Li$_2$CO$_3$, ROCO$_2$Li 등) 의 산소 환경 정량.
- 양극재 격자 $^{17}$O label → 격자 산소가 어디로 가는지 추적 (DEMS와 결합).

$^{17}$O는 quadrupolar (I = 5/2) 라 line이 매우 broad하고 측정 시간이 길지만, 다른 기법으로 안 보이는 carbonate vs SEI O를 직접 구분한다.

## 9. 실전 체크리스트

- 자기장(보통 11.7–17.6 T, 즉 500–750 MHz $^1$H Larmor) 균일도 점검 (shimming)
- MAS rotor packing 시 glove box → cap sealing 절차 air-tight
- Reference compound (LiCl 1 M aq for $^7$Li, CFCl$_3$ for $^{19}$F)로 chemical shift calibration
- T$_1$ relaxation 측정 후 적당한 recycle delay 결정 (정량의 핵심)
- Paramagnetic 시료는 short pulse + spin echo로 distortion 줄이기
- Dead Li 정량 시 $A/A_0$의 systematic 오차(rotor 충진율 차이)는 internal standard로 보정

## 참고 문헌

- Pecher, O., Carretero-Gonzáles, J., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 29 (2017) 213 — operando NMR for batteries 종합 리뷰.
- Hu, C. L. et al. *Nature* 572 (2019) 511 — $^7$Li NMR로 dead Li 직접 정량 (표준 인용).
- Bhattacharyya, R. et al. (Grey group) *Nature Materials* 9 (2010) 504 — in-situ NMR로 본 Li dendrite 형성.
- Leskes, M., Drewett, N. E., Hardwick, L. J., Bruce, P. G., Goward, G. R., Grey, C. P. *Angewandte Chemie* 51 (2012) 8560 — Li-air의 $^{17}$O NMR 분석.
- Goward, G. R. et al. *Solid State Nuclear Magnetic Resonance* 84 (2017) 122 — solid-state NMR 운용 가이드.
