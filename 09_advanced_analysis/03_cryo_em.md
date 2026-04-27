# Cryo-EM 운용 — Plunge-freeze, Low-dose, MotionCor2 (Cryogenic Electron Microscopy Workflow)

## 1. 개요

Cryo-EM(cryogenic electron microscopy)은 본래 단백질 구조 결정학에서 발전한 기술이지만, 2017년 Cui group의 *Science* 논문 이후 배터리 분야의 표준이 되었다. 핵심은 **민감한 시료(금속 Li, SEI, dendrite)를 액체 질소(liquid N$_2$) slush로 plunge-freeze하여 원래 상태를 동결시키고, low-dose imaging으로 atomic-resolution 이미지를 얻는다**는 절차에 있다.

06 [`07_operando.md`](../06_battery_operation/07_operando.md)의 in-situ TEM이 "작동 중에 본다"는 시점이라면, cryo-EM은 "작동 직후 동결시켜 정확하게 본다"는 시점이다 — 진정한 operando는 아니지만, **post-mortem보다 압도적으로 시료 보존**이 좋아 dendrite/SEI atomic resolution이 처음으로 가능해졌다.

## 2. 왜 Cryo-EM인가 — Beam Damage와 시료 휘발성 문제

금속 Li와 SEI는 두 가지 이유로 일반 TEM 이미징이 거의 불가능하다.

첫째, **휘발성**. SEI의 ROCO$_2$Li나 polymer 성분, 묻어 있는 전해질은 TEM 진공($10^{-7}$ torr)에서 빠르게 휘발한다. 시료를 grid에 올려 진공에 넣는 순간 본래 모습은 사라진다.

둘째, **빔 손상(beam damage)**. 일반 dose ($\sim 10^4$ e$^-$/Å$^2$)에서 Li metal은 즉시 melting/migration을 일으키고 SEI는 분해된다. 한 장의 high-resolution 이미지를 위해 보통 100–1000 e$^-$/Å$^2$ 가 필요하다는 점에서 일반 dose는 1–2 자릿수 과한 셈.

Cryo-EM의 해법: $-196$ °C 액체 N$_2$ slush로 빠르게 동결(plunge-freeze)시키면 (i) 휘발성 종이 그대로 동결되고, (ii) 저온이라 빔 손상에 의한 atomic motion이 억제되어 더 큰 dose budget을 쓸 수 있다.

## 3. Plunge-freezing 시료 준비

플런지-프리징(plunge-freezing) 절차의 표준은 다음과 같다.

1. **사이클링 후 셀 분해**: Ar glove box ($<0.1$ ppm O$_2$, H$_2$O) 안에서 코인셀 또는 Li metal 셀을 분해.
2. **TEM grid 코팅**: 음극(Cu 호일에 plated Li, 또는 Li metal foil) 표면에 holey carbon 또는 lacey carbon TEM grid를 가볍게 누른 뒤 살짝 떼어내 시료가 grid의 hole 영역에 잘 걸리도록 함. 또 다른 방식은 plated Li가 묻은 Cu 박을 직접 이온빔(FIB)으로 lamella 가공.
3. **Cryo-transfer holder 또는 Vitrobot**: Vitrobot의 plunge tube 안에 grid를 꽂은 뒤 액체 N$_2$ slush로 빠르게 떨굼. 냉각 속도 $> 10^4$ K/s 가 표준.
4. **진공 cryo-transfer**: 동결된 grid를 cryo-holder에 옮길 때 공기/H$_2$O 노출 < 1초로 유지. Gatan 626/698 같은 cryo-holder가 표준.
5. **TEM 안에서도 -180 °C 유지**: holder에 LN$_2$ dewar 연결, 측정 중 drift는 < 1 nm/min 수준이 되어야 atomic resolution 가능.

가장 큰 노하우는 **Ar glove box → cryo-holder까지의 무공기/무수분 chain**이다. 이 단계에서 SEI가 분해되면 cryo-EM의 의미가 사라진다.

## 4. Low-dose Imaging — Dose Budget의 분배

저용량 이미징(low-dose imaging)의 핵심은 한정된 dose budget을 step별로 잘 분배하는 것이다.

> **관련 개념: 전자 dose와 이미지 정보**
> Cryo-EM에서 한 픽셀에 도달한 전자 수가 $N$이면 shot noise는 $\sqrt{N}$이고, SNR은 $\sqrt{N}$에 비례. 그래서 high SNR을 원하면 dose가 커야 한다. 그러나 동시에 dose가 시료 손상을 일으켜 $\sim 50$–100 e$^-$/Å$^2$ 이상에서 atomic feature가 빠르게 부서진다.
> Dose budget = "분해능 충분한 SNR을 주는 dose 상한". 보통 high-resolution single-particle은 20–40 e$^-$/Å$^2$가 권장.
> 직관: 한 장의 이미지가 아니라 **dose-fractionated movie**(50 frame, 각 1 e$^-$/Å$^2$)로 찍으면 motion correction(MotionCor2)으로 drift를 빼주고도 high SNR 이미지 합성 가능.

표준 low-dose protocol (3-area protocol):

1. **Search area** (low mag, $\times 1000$, dose $<0.1$ e$^-$/Å$^2$): 시료 상태 확인.
2. **Focus area** (옆에 옆 area, dose 시료에 영향 없음): focus 잡기.
3. **Exposure area** (목표 영역, dose 20–40 e$^-$/Å$^2$): 실제 측정. 한 번만 노출.

## 5. Cui Group 2017 — 4 Å Resolution Dendrite

Yulin Li, Yi Cui 그룹이 *Science* 358 (2017) 506–510에서 dendrite와 SEI를 atomic resolution(4 Å)으로 처음 관찰했다. 핵심 발견은 두 가지였다.

1. **Dendrite는 single-crystal Li**: Cu 호일 위에 plate된 Li가 nanowire처럼 단결정으로 자란다. 이전에 mossy/amorphous로 추정되던 것과 모순.
2. **Mosaic SEI**: SEI는 균일한 고체가 아니라 LiF, Li$_2$O, Li$_2$CO$_3$ 등의 nanocrystal이 매트릭스 안에 모자이크처럼 박혀 있는 구조. 첨가제(FEC, EC)에 따라 nanocrystal의 종류와 분포가 바뀜.

이 두 발견은 06 [`03_interface.md`](../06_battery_operation/03_interface.md)에서 정리한 Peled의 이중층 SEI 모델을 atomic resolution에서 재해석하게 만들었다.

## 6. Data Analysis — MotionCor2, FFT/IFFT

Raw cryo-EM movie는 50–100 frame의 stack이다. 다음 워크플로우를 거친다.

1. **MotionCor2** (Cheng group, Berkeley): frame 사이의 stage drift와 beam-induced motion을 patch-wise alignment로 보정. 입력은 movie stack, 출력은 motion-corrected, dose-weighted 단일 이미지.
2. **CTF estimation**: CTFFIND4 또는 GCTF로 contrast transfer function의 defocus, astigmatism 결정.
3. **Drift-corrected image의 FFT**: lattice fringe가 있는 영역의 FFT를 계산해 reciprocal space spot으로 결정구조 동정 (e.g. Li metal BCC의 (110) spacing 2.48 Å).
4. **IFFT mask + filter**: FFT에서 특정 spot만 mask로 골라 IFFT → real-space에서 그 결정 방향에 해당하는 lattice만 선명하게 보임. SEI 안에 박힌 LiF nanocrystal을 시각적으로 강조하는 데 자주 쓰임.

LiF의 (200) spacing $\sim 2.0$ Å, Li$_2$CO$_3$의 (002) spacing $\sim 2.8$ Å 같은 값이 SEI nanocrystal 동정의 표준 fingerprint.

## 7. Cryo-FIB로 Lamella 만들기

두꺼운 시료(예: pristine Li metal foil 50 μm)는 그대로는 전자 투과가 안 된다. **Cryo-FIB**(focused ion beam)로 액체 N$_2$ 분위기에서 50–100 nm 두께의 lamella를 깎아낸다. Ga$^+$ 이온이 표면을 가공하지만 cryo 조건이라 시료 손상 최소화. Aquilos, Helios 같은 dual-beam 장비가 표준.

배터리에서 가장 빈번한 응용:
- 사이클 후 음극 단면 lamella → SEI 깊이 방향 구조
- Solid-state cathode (NMC + 고체 전해질) 단면 → 계면 화학

## 8. 실전 체크리스트

- Glove box → plunge → cryo-holder chain의 air-exposure < 1초
- TEM drift < 1 nm/min 확보 후 측정
- Dose budget 미리 계산: 분해능 4 Å이면 $\sim 30$ e$^-$/Å$^2$
- Movie stack으로 항상 저장 (single image 저장은 motion correction 불가)
- MotionCor2 → CTFFIND4 → IFFT 워크플로우를 conda 환경 하나에 묶어 재현성 확보
- FFT spot 동정은 다중 결정 표준 (LiF, Li$_2$O, Li metal) 동시 비교
- 결과 보고: HRTEM image + FFT pattern + IFFT-filtered map 3종 셋트

## 참고 문헌

- Li, Y. et al. (Cui group) *Science* 358 (2017) 506–510 — atomic-resolution dendrite/SEI cryo-EM의 표준 인용.
- Wang, X. et al. (Meng group) *Nano Letters* 17 (2017) 7606 — cryo-EM Li dendrite 후속 연구.
- Cheng, Y. et al. *Cell* 161 (2015) 438 — MotionCor2/cryo-EM resolution revolution overview.
- Lee, Y., Fitzpatrick, J. A. J. et al. *Nature Methods* 14 (2017) 331 — cryo-EM 시료 준비 표준.
- Zheng, S. Q. et al. *Nature Methods* 14 (2017) 331 — MotionCor2 알고리즘 원본.
