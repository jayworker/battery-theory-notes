# 교환-상관 범함수 (Exchange-Correlation Functionals)

## 1. 개요

[`02_dft_foundations.md`](./02_dft_foundations.md)에서 보았듯, Kohn-Sham DFT의 모든 어려움은 단 하나의 양 — 교환-상관 에너지 범함수 $E_{xc}[n]$ — 에 응축되어 있다. 운동 에너지와 Hartree 항은 정확히 계산되므로, 결과의 정확도를 결정하는 것은 사실상 functional 선택이다.

직관적으로, $E_{xc}$ 는 두 가지 양자역학적 효과를 함께 묶어 놓은 양이다. (i) 교환(exchange): 같은 스핀의 두 페르미온이 같은 자리에 못 들어가는 Pauli 효과로, 각 전자 주변에 "Fermi hole"이 생긴다. (ii) 상관(correlation): 반대 스핀이라도 Coulomb 반발로 서로 회피하는 동적 효과로, "Coulomb hole"이 추가된다. 정확한 $E_{xc}$ 는 이 두 hole이 만드는 모든 비용을 정확히 표현해야 한다.

본 절은 functional의 사다리 — Jacob's ladder of DFT (Perdew) — 를 따라 LDA, GGA, meta-GGA, hybrid, 그리고 강상관계를 위한 DFT+U까지 차례로 정리한다. 마지막으로 배터리 소재별로 어떤 functional을 골라야 하는지에 대한 실무 가이드를 다룬다.

핵심 메시지: "더 비싼 functional이 항상 더 좋은 것은 아니다." 시스템과 질문에 따라 최적 functional이 다르며, 잘못 고르면 큰 시스템에 비싼 비용을 들이고도 결과가 더 나빠질 수 있다.

## 2. LDA: 균일 전자 기체 근사

가장 단순하고 오래된 (1965년) 근사가 LDA(local density approximation)이다. 직관적으로 "각 점에서의 $E_{xc}$ 는 그 점의 밀도 $n(\mathbf{r})$ 만 보고 결정한다 — 마치 그 점이 같은 밀도의 균일 전자 기체(homogeneous electron gas, HEG) 안에 있는 것처럼"이라는 가정이다.

HEG는 $E_{xc}$ 가 quantum Monte Carlo로 사실상 정확히 알려진 모형 시스템이며(Ceperley-Alder 1980), LDA는 그 결과를 국소적으로 적용한다.

$$E_{xc}^{LDA}[n] = \int n(\mathbf{r}) \, \epsilon_{xc}(n(\mathbf{r})) \, d^3r$$

여기서 $\epsilon_{xc}(n)$ = HEG의 단위 입자당 교환-상관 에너지(밀도 $n$ 의 함수, 매개변수화됨). 교환 부분은 해석적으로 $\epsilon_x(n) = -\frac{3}{4}(\frac{3n}{\pi})^{1/3}$ 이며, 상관 부분은 PW92 (Perdew-Wang 1992) 또는 VWN (Vosko-Wilk-Nusair) 매개변수화를 쓴다.

LDA의 장점: 매우 간단하고 빠르며, 단순 금속(Na, Al)이나 결합 길이 같은 구조 양에서 의외로 잘 맞는다. 이유는 sum rule(전자 밀도 적분이 정수)과 hole 정규화 조건을 LDA가 정확히 만족하는 등의 우연한 cancellation 때문이다.

LDA의 단점:
- **결합 에너지 과대평가(overbinding)**: 전형적으로 ~30% 강한 결합. 격자 상수가 약 1~3% 작게 나옴.
- **자기 상호작용 오차(SIE)**: 강상관계에서 d/f 전자의 비편재화 심함.
- **밴드갭 과소평가**: GGA보다 더 작게 나옴(50% 수준).
- **분자 atomization energy 오차 큼**: 화학 정확도($\sim 1$ kcal/mol) 한참 못 미침.

배터리 맥락에서 LDA 단독 사용은 거의 없으나, LDA+U 형태로 강상관계 보정과 결합되어 일부 산화물에 쓰이기도 한다. 표준은 GGA로 옮겨갔다.

## 3. GGA: 밀도 구배 보정

LDA의 다음 단계는 밀도 자체뿐 아니라 그 공간 변화율 $\nabla n(\mathbf{r})$ 까지 함께 보는 GGA(generalized gradient approximation)이다. 직관적으로, 실제 분자/결정의 밀도는 결코 균일하지 않으며 핵 근처에서 가파르게 변하고 결합 영역에서 부드럽게 변하므로, 구배 정보를 추가하면 정확도가 향상된다.

$$E_{xc}^{GGA}[n] = \int n(\mathbf{r}) \, \epsilon_{xc}(n, \nabla n) \, d^3r$$

GGA에는 수십 가지 매개변수화가 있으나, 고체 물리/배터리 연구의 사실상 표준은 **PBE** (Perdew-Burke-Ernzerhof, 1996)다. PBE는 매개변수가 없는(parameter-free) 비경험적 functional로, 정확한 LDA 한계, 균일 전자 가스 응답 등의 이론적 제약만으로 구성되었다.

PBE의 장점:
- 결합 길이/격자 상수 정확도 ~1% 이내.
- 응집 에너지 LDA보다 나음(여전히 ~10~20% 과소).
- 비경험적이며 광범위한 시스템에 일관된 정확도.
- VASP, Quantum ESPRESSO, GPAW 등 모든 주요 코드에서 standard.

PBE의 단점:
- 여전히 SIE 존재(NMC의 Ni d, LCO의 Co d에서 비편재화).
- 밴드갭 과소평가 여전(~50~70% of 실험치).
- vdW 분산력 무시(흑연 층간, 분자 결정 실패).
- 표면 흡착 에너지 정확도 ~0.2 eV 수준.

PBE 외 자주 등장하는 GGA:
- **PBEsol**: 고체 격자 상수에 더 정확하도록 PBE의 매개변수 일부 재조정. 분자 에너지는 PBE가 나음.
- **revPBE/RPBE**: 표면 흡착에 강함(촉매 연구).
- **BLYP**: Becke88 exchange + Lee-Yang-Parr 상관, 분자 양자화학에서 자주 사용.

배터리 양극 표준 계산은 거의 PBE+U(다음 절) 또는 SCAN(meta-GGA)이며, PBE 단독은 강상관성이 약한 시스템(흑연, Si, polymer 전해질)에 사용된다.

## 4. Meta-GGA와 Hybrid

GGA 위 단계는 운동 에너지 밀도 $\tau(\mathbf{r}) = \frac{1}{2}\sum_i |\nabla\phi_i|^2$ 를 추가로 사용하는 meta-GGA, 그리고 정확한 HF exchange의 일부를 섞는 hybrid functional이다.

### Meta-GGA: SCAN

**SCAN** (strongly constrained and appropriately normed, Sun-Ruzsinszky-Perdew 2015)은 17개의 정확한 제약을 모두 만족하면서 비경험적으로 구성된 meta-GGA로, 배터리 산화물 계산에서 점점 표준에 가까워지고 있다.

$$E_{xc}^{SCAN}[n, \nabla n, \tau] = \int n(\mathbf{r}) \, \epsilon_{xc}(n, \nabla n, \tau) \, d^3r$$

SCAN의 장점: PBE+U 없이도 NMC, LFP의 산화 상태와 자기 모멘트를 합리적으로 재현하며, 결합 에너지·밴드갭이 모두 PBE보다 개선된다. 단점: PBE보다 ~3배 비싸고 SCF 수렴이 까다로워 mixing 매개변수 조정이 필요하다(특히 자기 시스템).

### Hybrid: HSE06

Hybrid functional은 정확한 HF exchange의 일부를 GGA에 섞는다. 가장 단순한 예: B3LYP는 분자 양자화학의 표준으로 HF 20% + Becke88 + LYP. 고체에는 long-range HF가 발산 문제를 일으키므로 range-separated hybrid가 선호된다.

**HSE06** (Heyd-Scuseria-Ernzerhof, 2006)은 short-range HF만 25% 섞고 long-range는 PBE로 차단한 형태다.

$$E_{xc}^{HSE} = \alpha E_x^{HF,SR}(\omega) + (1-\alpha) E_x^{PBE,SR}(\omega) + E_x^{PBE,LR}(\omega) + E_c^{PBE}$$

각 항: $\alpha = 0.25$ (HF mixing 비율), $\omega = 0.2$ Å$^{-1}$ (range separation 매개변수, screening length 약 5 Å), SR/LR = short/long range. 25%라는 mixing 비율은 adiabatic connection 이론에서 제안된 비경험적 값.

HSE06의 장점:
- 밴드갭 정확도 대폭 향상(Si: 1.15 eV로 실험과 거의 일치).
- 강상관계 SIE 부분 보정.
- 절연체/반도체의 결함 준위 정확도 우수.

HSE06의 단점:
- PBE 대비 ~10~50배 비싸다(plane-wave 코드에서 HF exchange는 비국소적 적분).
- k-point 수에 민감하며 큰 시스템(>100 atom)에서는 실용적 한계.
- 금속에는 부적합(screening 가정이 깨짐).

배터리 hybrid 사용 사례: LFP의 polaron 국재화, NMC의 oxygen redox, 전해질 분해 산화물 결함 — 모두 정량적 산화 상태/결함 형성 에너지가 중요한 자리.

## 5. DFT+U: 강상관 보정

전이 금속 산화물에서 d 전자, 란타나이드의 f 전자처럼 강하게 국재된 상태에서는 LDA/PBE의 SIE가 심각해 비현실적 금속성·과도한 비편재화가 발생한다. **DFT+U** (Anisimov-Zaanen-Andersen 1991, Dudarev 1998)는 Hubbard 모형에서 영감을 얻어 국재 d/f 궤도에 추가 페널티를 부과해 점유를 정수에 가깝게 강제한다.

직관적으로, 정확한 functional이라면 점유수의 정수값에서 $E$ 가 piecewise linear여야 하지만(Janak 정리), 근사 functional은 분수 점유에서도 부드러운 곡선이 되어 비편재화를 유리하게 만든다. $+U$ 는 곡선을 정수 근처에서 위로 들어 올려 정수 점유를 회복시킨다.

Dudarev 단순화 형태:

$$E^{DFT+U} = E^{DFT} + \frac{U_{eff}}{2}\sum_{I,\sigma}\left[\text{Tr}(\rho^{I,\sigma}) - \text{Tr}(\rho^{I,\sigma}\rho^{I,\sigma})\right]$$

각 항: $\rho^{I,\sigma}$ = 원자 $I$ 의 spin $\sigma$ 채널 점유 행렬, $U_{eff} = U - J$ (Hubbard 반발 $U$ 에서 Hund 교환 $J$ 를 뺀 유효값). 점유가 0 또는 1에 가까울수록 페널티가 0이고, 0.5 부근에서 최대.

배터리 양극의 표준 $U$ 값(Wang, Maxisch, Ceder 2006의 PBE+U 산화물 보정):
- Ni 3d: $U \approx 6.2$ eV
- Co 3d: $U \approx 3.3$ eV
- Mn 3d: $U \approx 3.9$ eV
- Fe 3d: $U \approx 4.0$ eV
- V 3d: $U \approx 3.1$ eV

이 값은 산화물 형성 에너지의 실험값으로 피팅된 경험값이며, 같은 원소라도 산화 상태가 다르면 ($U$ 가 다소 다를 수 있다). 더 엄밀하게는 linear response method (Cococcioni-de Gironcoli 2005)로 self-consistent하게 결정한다.

DFT+U의 한계: $U$ 가 매개변수이므로 결과의 시스템 의존성, 이주 장벽이나 전압 절댓값이 $U$ 값에 민감하게 반응(보통 ~0.1 V/$U$ 수준), 금속 상에는 부적합. 그럼에도 NMC, LFP 계산의 사실상 표준은 PBE+U(또는 SCAN+U)다.

> **관련 개념: 자기 상호작용 오차(SIE)와 비편재화**
> 정확한 exchange는 한 전자가 자기 자신을 통해 만드는 Hartree 기여를 정확히 상쇄해야 한다. LDA/GGA의 근사 exchange는 그렇지 못해 잔여 자기 반발이 남고, 그 결과 전자가 더 넓게 퍼지면 에너지가 낮아진다 — 비편재화 편향(delocalization error). polaron, charge transfer 상태, 산화 상태 결정 등이 모두 이 오차에 민감하다. Hybrid의 HF exchange와 +U penalty는 모두 이 오차를 다른 방식으로 보정하는 시도다.

## 6. 어떤 functional을 쓸 것인가

배터리 시스템별 권장 매핑(2026 시점 현장 실무 기준):

| 시스템/질문 | 권장 functional | 비고 |
|---|---|---|
| 흑연/실리콘 음극 격자, 부피 변화 | PBE + D3 (vdW) | 흑연 층간 결합 vdW 필수 |
| 고체 전해질(Li7La3Zr2O12 등) 이온 전도 | PBE 또는 SCAN | 강상관 약함, GGA로 충분 |
| LFP, LCO, NMC 양극 전압 | PBE+U 또는 SCAN | $U$ 표준값 또는 Hubbard linear response |
| Spinel LiMn₂O₄ Jahn-Teller | PBE+U + spin polarization | $U(\text{Mn}) \approx 3.9$ eV |
| 절연체 결함 형성 에너지 | HSE06 | PBE는 결함 깊이 과소평가 |
| 분자 전해질 산화 환원 전위 | B3LYP 또는 ωB97X-D | 분자 양자화학 hybrid |
| 표면 흡착(SEI 분자 etc) | revPBE+D3 또는 vdW-DF2 | vdW 보정 필수 |
| 전기촉매 활성 자리 | RPBE+D3 | 흡착 에너지 trend 정확 |
| Anionic redox (Li-rich NMC) | HSE06 또는 SCAN+U | O 2p hole 정량 |

추가 고려:
- **속도/정확도 trade-off**: 100 atom 일반 셀까지는 PBE+U가 표준. 50 atom 이하면 HSE06 가능. 1000 atom 이상은 PBE 단독이 현실적.
- **벤치마크 의무**: 새 시스템에는 항상 작은 셀에서 두 functional(PBE+U, HSE06 또는 SCAN)로 비교 후 main calculation 결정.
- **van der Waals**: 층상 구조, 다공성 host, 분자 흡착이라면 D3 또는 D4 보정을 무조건 추가(추가 비용 거의 0).

functional 선택은 결국 "어느 물리적 효과가 결정적인가"의 판단이며, 03 절의 결론은 단 하나 — 한 가지 functional이 만능이 아니라는 점이다.

## 참고 문헌

- Perdew, J. P., Burke, K., Ernzerhof, M. *Physical Review Letters* 77 (1996) 3865–3868 — PBE GGA 원전.
- Heyd, J., Scuseria, G. E., Ernzerhof, M. *Journal of Chemical Physics* 118 (2003) 8207; 124 (2006) 219906 — HSE03/HSE06 range-separated hybrid.
- Sun, J., Ruzsinszky, A., Perdew, J. P. *Physical Review Letters* 115 (2015) 036402 — SCAN meta-GGA.
- Anisimov, V. I., Zaanen, J., Andersen, O. K. *Physical Review B* 44 (1991) 943 — DFT+U 원전.
- Dudarev, S. L. et al. *Physical Review B* 57 (1998) 1505 — 단순화된 +U 형태(현재 표준).
- Wang, L., Maxisch, T., Ceder, G. *Physical Review B* 73 (2006) 195107 — 산화물 형성 에너지로 피팅한 PBE+U $U$ 값 표.
- Cococcioni, M., de Gironcoli, S. *Physical Review B* 71 (2005) 035105 — Linear response로 $U$ 결정.
- Grimme, S. et al. *Journal of Chemical Physics* 132 (2010) 154104 — D3 vdW 분산 보정.
