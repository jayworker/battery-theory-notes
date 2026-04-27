# XRD (X-ray Diffraction)

## 1. 개요

XRD는 결정성 소재 분석의 표준 출발점이다. 결정 격자 면 사이의 거리(d-spacing)와 X-ray 파장이 만드는 회절(diffraction) 조건을 측정하면, 어떤 결정상(crystalline phase)이 얼마만큼 어떤 격자 상수(lattice parameter)로 존재하는지를 모두 정량할 수 있다. 양극 합성 직후의 상 동정, 사이클링 후 결정 구조 변화, 고용체-2상 경계 추적, in-situ로 충방전 중 격자 변화 추적까지 — 배터리 결정학 질문의 절반 이상이 XRD로 답해진다.

본 절은 Bragg 식부터 Rietveld refinement, NMC의 $I_{003}/I_{104}$ 정량, Scherrer 식, in-situ 셋업까지를 측정·fitting 관점에서 다룬다. 구조-성능 관계의 거시적 해석은 [작동이론](../06_battery_operation/06_degradation.md)에서, 본 절은 "어떻게 패턴을 얻고, 어떻게 fitting해서 숫자를 뽑는가"에 집중한다.

## 2. Bragg 식과 Peak Indexing

X-ray가 결정의 평행한 격자면(lattice plane)들로부터 산란될 때, 인접 면에서 산란된 두 파동의 경로 차이(path difference)가 파장의 정수배(integer multiple)가 되는 각도에서만 보강 간섭(constructive interference)이 일어난다. 이것이 회절 피크의 기원이며, 입사각 $\theta$ 와 면간 거리 $d$, 파장 $\lambda$ 사이의 관계가 Bragg 식이다.

직관적으로, 결정 안의 모든 원자가 거대한 회절 격자(diffraction grating) 역할을 하며, 특정 각도에서만 산란파(scattered wave)들이 위상이 맞아 강하게 보강되는 그림이다.

$$n\lambda = 2d\sin\theta$$

각 항: $n$ = 회절 차수(보통 1차만), $\lambda$ = X-ray 파장 (Cu K$\alpha$ = 1.5406 Å, Mo K$\alpha$ = 0.7107 Å), $d$ = 면간 거리(Å), $\theta$ = Bragg 각도. Peak indexing은 측정된 $2\theta$ 값들로부터 d-spacing을 역산한 뒤, 격자 상수와 결정계(crystal system, 예: hexagonal layered $R\bar{3}m$)에 맞춰 $(hkl)$ Miller 지수를 부여하는 절차다. Hexagonal 시스템에서는 $1/d^2 = (4/3)(h^2+hk+k^2)/a^2 + l^2/c^2$.

NMC, LCO 같은 layered 양극은 $R\bar{3}m$ 공간군을 갖고 (003), (101), (006), (012), (104), (105), (107), (108), (110), (113) 정도가 주요 피크다. (003)은 $c$ 축 적층 정보, (110)은 $ab$ 면내 정보를 담는다.

## 3. Rietveld Refinement

피크 위치만으로는 격자 상수까지만 얻는다. **Rietveld refinement**는 측정된 전체 회절 패턴을 한 번에 fitting해서 격자 상수, 원자 위치(atomic position), 점유율(occupancy), 등방성/비등방성 변위 인자(thermal displacement, $B_{iso}$ 또는 $U_{ij}$), 입자 크기, micro-strain까지 동시에 정량하는 표준 방법이다.

> **관련 개념: Rietveld 목적함수**
> Rietveld는 측정 강도 $y_i^\text{obs}$ 와 모델 강도 $y_i^\text{calc}$ 의 가중 차이 제곱합을 최소화한다: $\chi^2 = \sum_i w_i (y_i^\text{obs} - y_i^\text{calc})^2$, $w_i = 1/y_i^\text{obs}$.
> 모델 강도는 $y_i^\text{calc} = s\sum_K L_K |F_K|^2 \phi(2\theta_i - 2\theta_K) P_K + y_i^\text{bkg}$ 로, $s$ = scale, $L_K$ = Lorentz-편광 인자, $F_K$ = 구조 인자, $\phi$ = peak shape (Pseudo-Voigt 등), $P_K$ = preferred orientation 보정.
> 가정: peak shape이 적절히 모델링됐고, 배경(background)이 다항식이나 splines로 잘 잡혔으며, 시료의 미세구조가 $D$ 와 $\varepsilon$ 두 파라미터로 충분히 표현된다.
> 직관: 한 패턴 안에 수천 개 데이터 포인트가 있고, 모델 파라미터는 수십 개. 정보가 충분히 과잉이므로 비선형 최소제곱이 안정적으로 수렴한다.

품질 지표: $R_p$ (profile residual), $R_{wp}$ (weighted profile), $R_{exp}$ (expected), goodness-of-fit $\chi^2 = (R_{wp}/R_{exp})^2$. 일반적으로 $R_{wp} < 10\%$, $\chi^2 < 4$ 면 양호, $\chi^2 \approx 1$ 면 통계적으로 완벽한 fitting. 도구는 GSAS-II, FullProf, TOPAS가 표준.

## 4. Cation Mixing — $I_{003}/I_{104}$ Ratio

NMC, NCA 등 layered 산화물에서 Li⁺(이온 반경 0.76 Å)와 Ni²⁺(0.69 Å)는 크기가 매우 비슷해서 Li-사이트(3a)와 TM-사이트(3b)가 부분적으로 섞이는 cation mixing이 일어난다. 이 비율은 XRD에서 (003)과 (104) 피크 강도비로 빠르게 정량된다.

직관적으로, (003) 면은 layered 적층 방향을 보는 면이라 Li 층과 TM 층이 잘 분리되어 있을수록 강하게 회절한다. 반대로 cation mixing이 심해지면 두 층의 구분이 흐려져 (003) 강도가 줄고 상대적으로 (104)가 더 커진다.

$$\frac{I_{(003)}}{I_{(104)}} \gtrsim 1.2 \quad (\text{well-ordered layered})$$

신선한 NMC811은 보통 1.4–1.6, 사이클 후에는 1.0 부근까지 떨어진다. 1.2 이하는 cation mixing이 심하다는 1차 신호. 더 정량적으로는 Rietveld refinement에서 3a 사이트의 Ni 점유율(occupancy of Ni at Li site, $\text{Ni}_\text{Li}$)을 직접 refine해서 % 단위로 보고하는 것이 표준이다. 보통 fresh sample은 2–4%, 노화 후 8–15%까지 증가.

피크 강도 비교 시 Lorentz-편광 보정(Lorentz-polarization factor)과 multiplicity가 자동 반영된 정규화된 강도를 써야 한다. 단순 raw peak height로 비교하면 $K\alpha_1/K\alpha_2$ 분리, 비대칭(asymmetry), preferred orientation 효과로 수치가 왜곡된다.

## 5. Scherrer 식 — 결정자 크기

피크 폭(FWHM, full-width-at-half-maximum)은 결정자 크기(crystallite size, $D$)와 미세 변형(micro-strain, $\varepsilon$)에 의존한다. 결정자가 작을수록 회절 조건의 각도 허용 범위가 넓어져 피크가 넓어진다. 변형이 크면 d-spacing 분포가 생겨 같은 효과를 낸다.

가장 단순한 추정식이 Scherrer 식이며, 변형 기여를 무시하고 크기 효과만으로 폭을 해석한다.

$$D = \frac{K\lambda}{\beta\cos\theta}$$

각 항: $K \approx 0.9$ (구형 입자 형상 인자, shape factor), $\lambda$ = X-ray 파장(Å), $\beta$ = 기기 폭을 뺀 순수 시료 기여 FWHM (radians), $\theta$ = Bragg 각도. $\beta = \sqrt{\beta_\text{obs}^2 - \beta_\text{inst}^2}$ 로 instrument broadening을 빼는 것이 필수.

100 nm 이상이면 Scherrer 추정은 부정확해지므로 상한이 약 100–200 nm. 변형이 큰 시료는 Williamson-Hall plot ($\beta\cos\theta$ vs $\sin\theta$)로 크기와 변형을 분리한다. 더 정밀하게는 Rietveld의 anisotropic size/strain 모델이나 fundamental parameter approach를 쓴다.

## 6. In-situ / Operando XRD

In-situ XRD는 충방전 중 격자 상수, 상 분율(phase fraction), 새 상 출현을 실시간으로 추적한다. 셀 셋업이 핵심이다.

| 셋업 | 특징 | 적용 |
|------|------|------|
| **Be window 셀** | Be가 X-ray 투과성, 0.25 mm Be foil이 양극 집전체 역할 | Bragg-Brentano 반사 모드, 실험실 X-ray |
| **Capillary 셀** (Debye-Scherrer) | 직경 0.5–1 mm 유리/Kapton 모세관에 분말 셀 충전 | 투과 모드, synchrotron 권장, 양호한 통계 |
| **Pouch 셀 (in operando)** | 실제 셀 그대로 측정, Al laminate 통과 | synchrotron 고에너지 (>20 keV) 필수 |
| **AMPIX, Coffin-cell** | 표준화된 in-situ 셀 모듈 | 사용자 친화, 셀 압력 균일 |

주의: Be는 산화에 취약하고 독성이 있어 환기·취급 주의. Kapton은 Cu K$\alpha$에 약간의 background를 주지만 안전. 충방전 속도는 보통 C/20–C/10이며, 더 빠르면 격자 상수 변화가 측정 시간 안에 응답을 못 따라간다(measurement-induced smearing).

데이터 처리: 패턴 시계열로부터 격자 상수 $a$, $c$ 를 SOC 함수로 plot. NMC811의 H1→M→H2→H3 상 전이가 충전 후반(>4.2 V)에서 $c$ 축 급격한 수축으로 보이며, 이 변화량(보통 5% 이상)이 입자 균열의 직접 원인이 된다.

## 7. Preferred Orientation 보정

분말 시료가 완전 등방(random)이 아니면 특정 면이 우선적으로 정렬되어 그 면의 피크가 비정상적으로 크거나 작게 보인다(preferred orientation, texture). Layered 양극을 코팅 전극으로 측정하면 (003) 면이 집전체와 평행하게 우선 정렬돼 (003) 피크가 인위적으로 증폭된다.

표준 보정은 March-Dollase 모델: $P_K = (r^2\cos^2\alpha_K + \sin^2\alpha_K/r)^{-3/2}$, $r$ = preferred orientation parameter ($r=1$ → 등방), $\alpha_K$ = preferred direction과 $\vec{H}_K$ 사이 각도. Spherical harmonics expansion이 더 일반적·정밀.

실험적 회피: side-loading sample holder 사용, 시료를 절구에 짧게 갈아 입자 정렬을 깨트림(단 결정성 손상 주의), capillary 모세관 회전(spin) 사용. Coating 전극은 본질적으로 textured이므로 Rietveld에 반드시 preferred orientation 항을 포함한다.

## 참고 문헌

- Cullity, B. D., Stock, S. R. *Elements of X-ray Diffraction* (3rd ed., Pearson, 2001) — Bragg 식, indexing, Scherrer 표준 처리.
- Young, R. A. (ed.) *The Rietveld Method* (Oxford, 1995) — Rietveld refinement 원전 모음.
- Toby, B. H., Von Dreele, R. B. *Journal of Applied Crystallography* 46 (2013) 544–549 — GSAS-II 도구 논문.
- Yin, S.-C. et al. *Chemistry of Materials* 18 (2006) 1901–1910 — NMC의 $I_{003}/I_{104}$ 와 cation mixing 정량.
- Yang, X.-Q. et al. *Advanced Materials* 27 (2015) 4304–4310 — In-situ XRD로 NMC 충방전 격자 거동 추적.
