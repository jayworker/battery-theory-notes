# AFM / EC-AFM / KPFM 운용 (Atomic Force Microscopy in Electrochemical Environment)

## 1. 개요

원자힘 현미경(atomic force microscopy, AFM)은 cantilever-tip로 시료 표면을 훑으며 force를 측정해 nm-scale 형태와 기계적 물성을 동시에 얻는다. 배터리에서는 **EC-AFM**(electrochemical AFM)으로 SEI 형성 실시간 추적, **force spectroscopy**로 SEI 두께/탄성률 측정, **KPFM**(Kelvin probe force microscopy)으로 work function/charge mapping 까지 응용된다.

06 작동이론에서 SEI/CEI는 [`03_interface.md`](../06_battery_operation/03_interface.md)에 다뤘지만 "어떻게 측정하는가"는 운용 영역. 본 문서는 **AFM 모드 선택, 셀 sealing, force-distance curve 해석, modulus mapping, KPFM 셋업**을 다룬다.

## 2. AFM 기본 모드 — Contact / Tapping / Peak Force

AFM은 cantilever-시료 사이의 force 측정 방식에 따라 여러 모드가 있다.

- **Contact mode**: tip이 시료에 항상 닿아 deflection feedback. 가장 단순하지만 부드러운 시료(SEI, polymer)는 tip drag로 손상.
- **Tapping mode (intermittent contact)**: cantilever를 공진 주파수로 진동시키며 amplitude feedback. tip이 표면에 잠깐만 닿아 손상이 적음. 액체 환경에서는 Q factor 감소로 다소 까다로움.
- **Peak force tapping (Bruker)**: 매 oscillation cycle마다 force-distance curve를 일부분 측정하여 모듈러스/접착력 mapping을 동시에. SEI mechanical mapping의 표준.

배터리 시료(soft SEI, Li metal)에서는 **tapping 또는 peak force**가 거의 항상 우선.

## 3. EC-AFM — Liquid Cell Sealing

EC-AFM(electrochemical AFM)은 전해질 환경에서 동작 중인 전극을 실시간으로 imaging한다. 핵심 챌린지는 **liquid cell sealing**이다.

표준 셋업:
- **3-전극 셀**: working electrode (= AFM 시료, 보통 Cu/HOPG/Si wafer 위에 박막), counter electrode (Pt wire), reference electrode (Li wire 또는 Ag/AgCl).
- **O-ring sealing**: 시료 위에 Viton/Teflon O-ring을 압착하고 그 위에 cantilever holder를 봉합. 전해질이 전선/cantilever holder 쪽으로 새지 않도록.
- **Cantilever 코팅**: Au-coated tip이 일반적이나, 강한 환원 전위에서는 Pt-Ir 또는 conductive diamond.
- **Glove box → AFM transfer**: Ar-purged 셀 옮기기 chain 필요. 일부 group은 glove-box-integrated AFM 사용.

전형적 protocol: Cu 표면 위에 카보네이트 전해질을 채우고, 0.05 V vs Li/Li⁺로 cathodic sweep을 시작하면서 1 frame/min으로 image 수집. SEI 핵생성 (작은 nodule), coalescence, full coverage가 시간순으로 보임.

## 4. Force-distance Curve로 두께 측정

> **관련 개념: Force-distance curve와 SEI 두께**
> Tip을 시료 표면에 천천히 접근시키면 cantilever deflection $d$ 가 거리 $z$에 대해 어떤 곡선을 그린다. 일반적으로 (i) far away: $d = 0$, (ii) attractive 영역에서 snap-in, (iii) contact 후 cantilever bend가 시료 변형에 비례.
> 반응성 표면(soft SEI)에서는 contact 영역에서 두 단계가 보임 — 처음에는 SEI를 누르며 deflection이 천천히 증가, SEI가 완전히 압축되면 hard substrate에 닿아 deflection이 가파르게 증가. 두 영역 사이의 z-거리가 곧 SEI 두께.
> 정량: Hertz 또는 DMT 모델로 contact 영역 fitting → modulus + thickness 동시 추출.

힘-거리 곡선(force-distance curve) 측정은 격자처럼 array (예: 32×32 위치)로 수집하여 **2D thickness/modulus map**으로 시각화한다. SEI는 위치마다 두께가 다르므로 single-point는 의미가 약하고 mapping이 표준.

## 5. Young's Modulus Mapping — Si, Li metal

Peak force tapping mode가 발달한 이후, modulus mapping이 표준이 되었다.

| 시료 | Young's modulus 범위 |
|---|---|
| Polymer SEI 외층 | 0.1–1 GPa (soft, gel-like) |
| LiF/Li$_2$CO$_3$ inner SEI | 50–100 GPa |
| Si 입자 (lithiated) | 1–10 GPa (Li 함량에 따라) |
| Si 입자 (delithiated) | 80–100 GPa |
| Li metal | $\sim 5$ GPa |

특히 Si AFM modulus mapping에서 1–100 GPa 범위가 측정되어, Li 농도에 따른 mechanical softening이 직접 확인된다 (Hertzberg et al., Sethuraman et al.).

Calibration의 핵심:
- Cantilever spring constant $k$: thermal noise method 또는 Sader method.
- Tip radius $R$: 표준 시료(폴리스티렌 spheres) 또는 SEM image로.
- Reference modulus 시료: HOPG, mica, 또는 polymer 표준.

## 6. KPFM — Work Function과 Charge Mapping

KPFM(Kelvin probe force microscopy)은 tip-시료 사이의 work function 차이($\Delta\Phi$)에 의한 contact potential difference(CPD)를 nm 분해능으로 mapping. 전기적으로 도통한 시료여야 의미가 있다.

원리: tip에 AC + DC bias를 동시 인가하면 capacitive force가 $V_{\text{tip}} - V_{\text{sample}} - V_{\text{CPD}}$ 에 비례. DC를 feedback으로 조정해 force = 0으로 만들면 그 DC 값이 곧 $V_{\text{CPD}}$.

배터리 응용:
- SEI 위 work function mapping → 어느 nanocrystal이 LiF, Li$_2$CO$_3$인지 fingerprinting.
- Li dendrite 위 charge accumulation 직접 시각화.
- Solid electrolyte (LLZO, sulfide) 표면의 grain boundary potential 측정.

KPFM은 보통 lift mode (먼저 topography 한 줄, 그 위로 cantilever를 살짝 올려 KPFM 두 번째 줄)로 운용. Frequency-modulated KPFM이 amplitude-modulated보다 분해능 좋음.

## 7. Liquid Cell의 한계와 챌린지

EC-AFM의 본질적 어려움:

- **Cantilever drag**: 전해질의 viscous drag로 cantilever Q factor 저하 → SNR 감소.
- **Bubble formation**: 가스 발생 (특히 음극 환원) 시 cantilever 주변 bubble이 image에 artifact.
- **Scan rate 한계**: 1 frame/min 이상은 불가능 (~수 sec/line). Fast SEI 동역학 (초 단위)은 못 봄.
- **Tip 노화**: 카보네이트 환경에서 Au tip이 분해 산물에 코팅되며 점점 무뎌짐.

대응: high-Q cantilever 사용, scan area 축소(1 μm × 1 μm 같은), 시료 fresh 영역으로 자주 이동.

## 8. 실전 체크리스트

- Cantilever spring constant calibration (thermal noise) 매번 갱신
- O-ring 종류와 두께 (Viton 0.5–1 mm) leak test 후 사용
- Reference electrode 안정성 (Li wire potential drift) 모니터
- Modulus map은 항상 같은 setpoint force, 같은 z-range로 비교
- KPFM은 항상 calibration 시료 (HOPG = 4.6 eV) 같은 세션에서 측정
- Result 보고: topography + modulus map + thickness profile 셋트
- Tip 교체 빈도 (2–4 시간 EC 환경 후 교체 권장)

## 참고 문헌

- Aurbach, D. et al. *Journal of Power Sources* 89 (2000) 206 — EC-AFM으로 본 SEI 형성 직접 관찰.
- Wang, Z. et al. *Journal of The Electrochemical Society* 161 (2014) A1162 — Si 입자 AFM modulus mapping.
- Otto, S.-K., Riewald, F., Henss, A., Kasper, J., Lobaz, V., Voigt, K., Adelhelm, P., Janek, J. *ACS Energy Letters* 5 (2020) 269 — KPFM으로 본 Li dendrite charge mapping.
- Sethuraman, V. A. et al. *Journal of Power Sources* 195 (2010) 5062 — Si lithiation modulus 측정.
