# TEM (Transmission Electron Microscopy)

## 1. 개요

TEM은 SEM이 답하지 못하는 질문 — 격자면(lattice fringe)을 직접 볼 수 있는가, 단일 원자열(atomic column)이 어디 있는가, 산화상태가 nm 단위로 어떻게 분포하는가 — 에 답하는 기법이다. 시료를 100 nm 이하로 얇게 만들어 200–300 kV 전자가 투과하면서 산란된 빔을 결상(imaging)하거나 분광(spectroscopy)으로 분석한다.

배터리 연구에서 TEM이 결정적인 자리는 명확하다 — 양극 표면 reconstruction 층 두께(rock-salt shell), cathode-electrolyte interphase(CEI) 직접 관찰, 단일 입자 균열 전파, NMC 1차 입자 내부 cation mixing 분포, Si 음극 lithiation front 등. 본 절은 TEM/STEM의 차이, HRTEM 격자 fringe, STEM-HAADF, SAED, EELS, sample prep까지를 다룬다.

## 2. TEM vs STEM

**TEM (conventional)** 은 평행 빔(parallel illumination)이 시료 전체를 한 번에 비추고, 투과된 빔을 대물렌즈가 결상해 한 번에 이미지를 만든다. 빠르고 직관적이지만 chromatic/spherical aberration이 분해능을 제한한다. **STEM (scanning TEM)** 은 빔을 nm 이하 점으로 좁혀 시료를 한 점씩 스캔하며, 각 점에서 산란각별로 검출기를 다르게 배치해 신호를 받는다.

직관: TEM은 광학 현미경처럼 "한 장의 사진", STEM은 SEM처럼 "점 스캔으로 만든 사진". STEM은 EDS·EELS와의 결합이 자연스럽고(점마다 spectrum 측정 가능) 분해능 컨트롤이 쉽다.

검출기 종류로 STEM 모드가 갈린다.
- **BF (Bright Field)**: 직진 투과 빔만 검출, 일반 TEM과 비슷한 contrast.
- **ADF (Annular Dark Field)**: 산란각 ~10–50 mrad의 환형 검출기, 회절 contrast 강함.
- **HAADF (High-Angle ADF)**: ~50–200 mrad, Rutherford-like 산란만 골라 잡으므로 강한 Z-contrast → 무거운 원소가 더 밝다.

## 3. HRTEM 격자 Fringe

HRTEM(high-resolution TEM)은 시료의 격자면 자체를 직접 결상하는 모드다. 전자파(electron wave)가 시료를 투과하며 위상이 격자에 의해 변조되고, 그 위상 변조가 대물렌즈를 통과하며 진폭 contrast로 변환된다(phase contrast). 결과는 원자열 사이 거리에 해당하는 격자 fringe.

> **관련 개념: HRTEM의 위상 contrast와 defocus**
> 위상 contrast는 정확히 격자 위치를 보여주는 게 아니라 defocus 값과 spherical aberration $C_s$ 의 함수다 — Scherzer defocus($\Delta f \approx -1.2\sqrt{C_s\lambda}$)에서 contrast가 최대.
> 따라서 격자 fringe의 "밝은 점"이 원자 위치와 정확히 일치하는 것은 특정 defocus 조건에서만이며, 일반 HRTEM 이미지의 직접 해석은 단순 $d$-spacing 측정에 한정된다.
> 정확한 원자 배열은 HRTEM 시뮬레이션(multislice)으로 매칭하거나 STEM-HAADF로 본다.
> 가속 전압 200 kV에서 $\lambda = 2.51$ pm, $C_s$-corrected TEM은 < 1 Å 분해능 도달.

배터리 응용 예: NMC 표면 rock-salt 층 두께 측정 (보통 2–10 nm), LiCoO₂ surface densification, 격자 fringe 변화로 layered → spinel 전이 확인.

격자 fringe의 d-spacing은 FFT(Fast Fourier Transform)로 변환해 측정한다. 측정된 d 값을 (003) = 4.74 Å, (104) = 2.04 Å 같은 표준값과 비교해 면 지수를 부여.

## 4. STEM-HAADF — Z-Contrast

STEM-HAADF는 산란각이 큰 환형 검출기를 써서 거의 순수한 Z² 의존 산란만 잡는다. 결과 강도는 $I \propto Z^{1.7-2}$ 정도로 원자 번호의 강한 함수 → 무거운 원소가 압도적으로 밝게 보인다.

직관: HAADF 이미지의 밝기 자체가 "여기 무거운 원자가 있다"는 1차 정보. NMC layered 구조에서 Ni/Co/Mn 칼럼은 밝게, Li 칼럼은 거의 검게 보인다. Cation mixing이 일어나 Ni가 Li 사이트로 이동하면 검었던 자리에 약한 밝은 점이 나타나며, 이는 단일 원자 사이트 수준에서 cation mixing을 정량할 수 있는 가장 직접적 증거다.

aberration-corrected STEM-HAADF는 0.5–0.8 Å 분해능에 도달해 단일 원자열을 분리해 본다. NMC 표면 첫 1–2 atomic layer의 reconstruction을 직접 관찰한 연구(Lin, Yu 등)가 양극 표면 노화 메커니즘 규명의 결정적 증거가 되었다.

## 5. SAED (Selected Area Electron Diffraction)

선택영역 회절(selected area electron diffraction)은 TEM 모드에서 시료의 특정 영역에서 회절 패턴을 얻는 기법이다. 평행 빔을 시료에 비추고 회절면(focal plane)에서 패턴을 결상하면, XRD와 같은 Bragg 회절 점들이 보인다. 단 한 입자(또는 몇 µm 영역)에서 측정되므로 단결정성 입자에서는 sharp spot 패턴, 다결정에서는 ring 패턴.

직관적으로, XRD가 분말 평균 정보라면 SAED는 단일 입자 결정학(single-particle crystallography). 입자 사이의 비균질성(예: 표면-bulk 결정 구조 차이)을 다른 기법으로 잡기 힘들 때 결정적이다.

배터리 응용: NMC 표면의 spinel/rock-salt 층 식별 ((111) spinel reflection 추가), Si lithiation 시 amorphous Li_xSi 형성(diffuse halo), single-crystal NMC 결정 방향 확인. 줄무늬 패턴(streaking)은 stacking fault나 nanostructure를 시사.

## 6. EELS — 산화상태와 결합 환경

EELS(electron energy-loss spectroscopy)는 시료를 투과한 전자가 잃은 에너지 분포를 측정한다. 비탄성 산란 과정에서 전자가 시료 원자의 전자 여기(electron excitation)에 에너지를 줘서 잃는 것이며, 그 손실 스펙트럼이 시료의 전자 구조 정보를 그대로 담는다.

스펙트럼은 영역에 따라 의미가 다르다.
- **Zero-loss peak (ZLP)**: 0 eV, 탄성 산란만 거친 전자. 시료 두께 측정($t/\lambda = \ln(I_t/I_0)$).
- **Low-loss region (1–50 eV)**: 플라스몬 진동, valence electron 정보. 두께 측정·간단한 phase mapping.
- **Core-loss edges (>50 eV)**: 내각 전자 여기. 원소 동정과 산화상태 정량.

Core-loss의 fine structure(ELNES)는 산화상태를 정량한다. **Mn $L_{2,3}$ edge**: $L_3$ peak가 Mn²⁺ ~640 eV, Mn³⁺ ~641 eV, Mn⁴⁺ ~642 eV로 chemical shift. **O $K$-edge** pre-peak intensity는 TM 3d-O 2p hybridization, 즉 covalency 정보. NMC 사이클 후 표면에서 Ni³⁺ → Ni²⁺ 환원이 EELS line scan으로 직접 보인다(반경 nm 단위로).

분해능: 일반 STEM-EELS ~1 eV, monochromated TEM ~30 meV. mapping은 line scan(1D) 또는 2D spectrum image로 nm 단위 산화상태 분포까지 추출.

## 7. Nano-EDS와 시료 준비

STEM-EDS는 nm 빔으로 단일 입자 또는 sub-grain 영역의 원소 분포를 잡는다. SEM-EDS(상호작용 부피 ~1 µm)와 비교해 분해능이 1–2 nm로 압도적이다. 양극 표면의 Al, Zr 코팅 두께 정량, NMC 1차 입자 내부 Ni/Co/Mn 농도 분포(특히 concentration-gradient cathode), CEI 두께·조성 측정에 결정적이다.

> **관련 개념: TEM 시료 두께와 분광 정량**
> EDS, EELS 모두 시료가 thin enough할 때만 정량이 의미 있다 — 너무 두꺼우면 다중산란(plural scattering)이 스펙트럼을 왜곡한다.
> 경험식: $t < \lambda$ (mean free path, 100 kV에서 ~100 nm, 200 kV에서 ~150 nm)일 때 single scattering 가정 유효.
> ZLP 대비 plasmon peak 강도비 $I_p/I_0$ 가 0.3 이하면 thin, 1 이상이면 too thick.
> 따라서 TEM 시료 prep의 목표는 분석 위치 두께 < 100 nm 확보.

**FIB lamella prep**: Ga⁺ FIB로 site-specific 박편(보통 5×10 µm, 두께 100 nm 이하)을 잘라내 grid에 올리는 표준 방법. 사이클링 후 특정 입자만 골라낼 수 있어 site-specificity가 결정적. 단점: Ga 임플란테이션, beam-induced amorphization. 마지막 정련(final thinning)은 5 kV 이하 저전압으로.

**Ar 이온 mill (PIPS, Gatan)**: 표면을 Ar⁺로 천천히 깎아 박편화. broad beam이라 손상이 적지만 site-specific은 약함. cryo-PIPS는 air/temp-sensitive 시료에 필수.

**Cryo-TEM**: 액체 질소 cooling holder로 시료 온도 –170 °C 유지. SEI 같은 beam-sensitive·hydrocarbon 풍부 층의 직접 관찰에 결정적이며, 2017년 이후 Li 덴드라이트·SEI 연구에서 표준 기법이 되었다(Cui, Meng 등의 작업).

빔 손상은 늘 고민거리다. 양극 산화물은 비교적 견디지만, 카보네이트 SEI, 폴리머 바인더, 액체 전해질 잔존물은 e-beam에 빠르게 분해된다. dose < 100 e/Å²로 제한, low-dose imaging 모드 사용.

## 참고 문헌

- Williams, D. B., Carter, C. B. *Transmission Electron Microscopy* (2nd ed., Springer, 2009) — TEM/STEM/EELS 종합 표준 교재.
- Lin, F. et al. *Nature Communications* 5 (2014) 3529 — STEM-EELS로 NMC 표면 reconstruction 직접 관찰.
- Yu, X. et al. *Advanced Energy Materials* 4 (2014) 1300950 — STEM-HAADF로 cation mixing 단일 원자 사이트 정량.
- Li, Y. et al. *Science* 358 (2017) 506–510 — Cryo-TEM으로 SEI/Li 덴드라이트 나노구조 관찰.
- Egerton, R. F. *Electron Energy-Loss Spectroscopy in the Electron Microscope* (3rd ed., Springer, 2011) — EELS 표준 참고서.
