# Raman과 FTIR (Vibrational Spectroscopy)

## 1. 개요

Raman과 FTIR(Fourier-transform infrared)은 진동(vibrational) 분광 기법으로, 결합(bond)의 진동 에너지를 측정해 화학 종을 동정한다. 두 기법은 선택 규칙(selection rule)이 상보적이라 실험실에서 거의 늘 함께 쓴다 — Raman은 polarizability 변화가 큰 진동(대칭 진동, M-O bond 등), IR은 dipole moment 변화가 큰 진동(비대칭 진동, C=O, C-O 등)에 민감.

배터리에서 가장 자주 쓰는 자리는 명확하다. **흑연 음극**의 disorder 정량(Raman D/G band), **양극** 결정상 식별(M-O stretching), **전해질** 분해산물 동정(ROCO₂Li, Li₂CO₃ 등). 본 절은 두 기법의 원리, 핵심 진동 모드, 실험적 주의점, 배터리 응용까지를 다룬다.

## 2. Raman 산란 원리

Raman은 단일 파장 레이저(보통 532, 633, 785 nm)를 시료에 조사해 비탄성 산란된 빛의 파장 변화를 측정한다. 입사 광자가 시료의 진동 모드와 에너지를 주고받아 Stokes(에너지 손실, 진동 여기) 또는 anti-Stokes(에너지 획득, 진동 탈여기) shift가 생기며, 그 shift($\Delta\tilde{\nu}$, cm⁻¹)가 진동 주파수 그 자체.

직관: "빛이 분자에 부딪혀 진동에 약간 에너지를 빼앗기거나 얻고 다시 튕겨나오는" 그림. 산란 단면적이 매우 작아(10⁻³⁰ cm² 수준) 흡수 분광보다 신호가 약하지만, water/air에 비교적 강하고 시료 그대로 측정 가능.

선택 규칙: polarizability tensor $\alpha$ 가 진동 좌표 $Q$ 에 대해 변해야 Raman active ($\partial\alpha/\partial Q \neq 0$). 대칭 분자/대칭 진동에 강하게 활성. 결정에서는 Brillouin zone center($\Gamma$ point) 진동만 1차 Raman으로 보임(큰 결정 한정).

분해능: 일반 Raman 1–4 cm⁻¹, 공간 분해능은 회절 한계로 보통 1 µm. confocal 모드로 깊이 분해까지.

## 3. 흑연 D/G Band — 무질서 정량

흑연/그래핀 음극의 Raman 스펙트럼은 두 가지 핵심 피크로 정의된다. **G band ~1580 cm⁻¹** 는 sp² 탄소의 in-plane $E_{2g}$ 진동(C=C bond stretching)이며, 결정성 흑연이 가지는 본질적 모드다. **D band ~1350 cm⁻¹** 는 결함(defect)과 모서리(edge)에서만 활성화되는 disorder-induced mode로, perfectly crystalline 흑연에서는 거의 보이지 않는다.

직관: D band는 "결함이 없으면 사라지는 띠". 그래서 두 강도 비 $I_D/I_G$ 가 흑연의 무질서도(disorder degree)를 정량하는 가장 보편적 지표가 된다.

$$\frac{I_D}{I_G} \uparrow \;\Leftrightarrow\; \text{disorder} \uparrow$$

Tuinstra-Koenig 관계: 결정자 크기 $L_a$ (in-plane crystallite size, nm)와 $I_D/I_G \propto 1/L_a$. 보통 fresh 흑연 음극은 $I_D/I_G \approx 0.1–0.3$, 사이클링 후 SEI 형성·exfoliation·표면 손상으로 0.5–1.0 이상까지 증가. 추가로 **2D band ~2700 cm⁻¹**(D의 second-order) 모양이 흑연 적층 수(layer count)를 알려준다.

레이저 wavelength 의존성: 532 nm vs 785 nm에서 $I_D/I_G$ 절대값이 다르므로, 비교는 같은 wavelength에서만. 일반적으로 532 nm가 표준.

## 4. 양극 M-O Stretching Mode

층상 산화물(layered oxide) 양극의 Raman은 두 그룹의 모드를 보인다. $R\bar{3}m$ 구조의 LiCoO₂, NMC는 이론상 두 Raman-active 모드 — $A_{1g}$ (M-O 대칭 stretching, ~600 cm⁻¹), $E_g$ (M-O bending, ~480 cm⁻¹). 두 피크 위치와 폭은 결정성, cation mixing, 산화상태 변화에 민감.

대표 값:
- **LiCoO₂**: $A_{1g}$ ~595 cm⁻¹, $E_g$ ~485 cm⁻¹
- **NMC811**: $A_{1g}$ ~555 cm⁻¹, $E_g$ ~480 cm⁻¹ (Ni 풍부일수록 lower frequency)
- **LiMn₂O₄ (spinel)**: $A_{1g}$ ~625 cm⁻¹ (Mn-O₆ octahedron 대칭 stretching)
- **LiFePO₄**: ~950 cm⁻¹ (PO₄³⁻ 대칭 stretching, 매우 sharp)

배터리 진단 활용: 사이클 후 NMC가 layered → spinel 전이를 겪으면 625 cm⁻¹ 부근 spinel 모드가 새로 출현. cation mixing 증가는 $A_{1g}$ 폭 증가로 보임. operando Raman으로 충방전 중 격자 산화 환원 추적 가능.

## 5. 레이저 손상 회피

Raman은 무손상으로 알려져 있지만, 배터리 시료는 의외로 손상에 취약하다. 양극 산화물은 흡수가 강해 국소 가열로 Mn³⁺ 불균화나 oxygen release를 유도할 수 있다. SEI/카보네이트는 광분해.

표준 회피 원칙:
- **레이저 power 제한**: 양극 < 1 mW, SEI/유기물 < 0.1 mW (focal spot에서)
- **노출 시간 단축**: 5–30 s × 여러 번 누적이 한 번에 5 min보다 안전
- **레이저 wavelength 선택**: 532 nm는 가시광 흡수 강함 → 가열. 785 nm는 흡수 약해 손상 적으나 신호도 약함.
- **샘플 회전(rotating stage)**: 광학 펄스를 같은 spot에 누적시키지 않음
- **이미 손상된 spot 식별**: 측정 후 처음과 마지막 스펙트럼 비교 — D/G 비율 또는 piek shift가 변하면 손상

검증: dummy 양극을 수 초씩 측정해 power 의존 spot 만들어 임계값 파악. 좋은 power 설정은 noise 수준이 양호하면서 측정 후 시료의 광학 변색이 없는 조건.

## 6. FTIR — Transmission vs ATR

FTIR은 광원에서 IR 빔을 시료에 통과시키고, 통과한 빛의 흡수 패턴을 Michelson 간섭계로 측정해 푸리에 변환으로 스펙트럼을 얻는다. 진동 모드에서 dipole moment가 변하면 흡수, polarizability 변화는 비활성 — Raman과 정확히 상보적.

> **관련 개념: ATR vs Transmission FTIR**
> Transmission FTIR은 시료를 KBr pellet으로 만들거나 박막 상태로 IR을 통과시킨다. 정량성 양호하지만 시료 prep 노동집약, 두께 균일성 요구.
> ATR(Attenuated Total Reflectance)은 시료를 다이아몬드 또는 ZnSe 결정 위에 그냥 놓고 결정 내 evanescent wave가 시료 표면 ~1 µm를 탐침. 분말 그대로, 액체 그대로 측정 가능.
> 침투 깊이 $d_p = \lambda/[2\pi n_1\sqrt{\sin^2\theta - (n_2/n_1)^2}]$ 로 wavelength·각도 의존, 보통 0.5–2 µm.
> 가정/한계: ATR는 시료가 결정과 밀착해야 하며, 강하게 흡수하는 영역에서 baseline distortion(ATR correction 필요).

배터리에서 ATR가 표준이 된 이유: 사이클링 후 전극 그대로(분말 형태로 떼어내) 빠르게 측정. SEI 분석은 다시 [XPS](./04_xps.md)와 cross-check.

## 7. 전해질 분해산물 — IR 표준 피크

EC, DEC, EMC 같은 카보네이트 용매가 환원/산화 분해되면 특징적인 산물이 생기고, 그 IR 흡수 피크들이 SEI 진단의 fingerprint다.

| 분해산물 | 주요 IR 피크 (cm⁻¹) | 코멘트 |
|----------|---------------------|--------|
| **ROCO₂Li (alkyl semi-carbonate)** | ~1650 (C=O), **~1300 (C-O)** | EC 환원 분해 1차 산물 |
| **Li₂CO₃** | **~1430**, ~870 | EC/CO₂ 추가 환원, atmosphere 흡착 |
| **LiOH** | ~3650 (sharp O-H) | Li 표면 수산화 |
| Li_xPF_yO_z (LiPF₆ 분해) | ~840 (P-F), ~1050 (P=O) | HF 부생산 동반 |
| LiF | IR 비활성 | XPS로만 (685 eV) |
| EC (intact) | 1800 (C=O), 1770 | Reference |
| ROLi (alkoxide) | 1080 (C-O-Li) | 환원 깊은 단계 |
| C-H stretching (지방족) | 2800–3000 | 일반 hydrocarbon |

위 표의 ROCO₂Li 1300 cm⁻¹와 Li₂CO₃ 1430 cm⁻¹는 SEI 분석에서 가장 중요한 두 reference 피크. ROCO₂Li가 강하면 SEI가 organic-rich (덜 안정), Li₂CO₃가 강하면 inorganic transition 진행 (보통 더 안정).

ATR 측정 후 baseline subtraction → peak deconvolution 절차는 XPS와 유사. 단 IR 피크는 보통 더 넓고 겹쳐서 정량은 상대적, 절대 정량은 어렵다(ε, 즉 흡광계수가 시료마다 다름).

## 8. Operando 응용

In-situ Raman은 양극 산화환원 추적에 결정적이다. 충방전 중 cell 셋업(Be 또는 sapphire 윈도우)으로 specific spot의 spectrum 시계열을 얻으면, $A_{1g}$/$E_g$ 위치/강도가 SOC 함수로 변하는 것이 직접 보인다. NMC의 layered → H1-H2-H3 상 전이 추적, LFP의 LiFePO₄ ↔ FePO₄ 두 상 공존 정량 등이 표준 응용.

In-situ FTIR-ATR은 SEI 형성 first cycle 추적에 쓰인다 — 충전 시작 직후 ROCO₂Li 1650/1300 cm⁻¹ 피크 출현, 이후 Li₂CO₃ 1430 cm⁻¹로 점진적 전이가 분 단위로 보인다.

## 참고 문헌

- Smith, B. C. *Fundamentals of Fourier Transform Infrared Spectroscopy* (2nd ed., CRC, 2011) — FTIR 표준 입문서.
- Ferrari, A. C., Robertson, J. *Physical Review B* 61 (2000) 14095–14107 — 흑연 D/G band Tuinstra-Koenig 관계 정량.
- Julien, C. M. et al. *Materials* 11 (2018) 1761 — 양극 산화물의 Raman fingerprint 종합.
- Aurbach, D. *Journal of Power Sources* 89 (2000) 206–218 — IR/Raman 기반 SEI 분해산물 동정.
- Tuinstra, F., Koenig, J. L. *Journal of Chemical Physics* 53 (1970) 1126–1130 — D/G band 원전 논문.
