# GITT와 PITT (Galvanostatic / Potentiostatic Intermittent Titration)

## 1. 개요

GITT(galvanostatic intermittent titration technique)와 PITT(potentiostatic intermittent titration technique)는 모두 **고체 내 Li 확산 계수** $D_\text{Li}$ 를 SOC 함수로 측정하는 시간 영역(time domain) 기법이다. 짧은 섭동(perturbation)을 가한 뒤 긴 휴지(rest) 구간 동안 평형 회복을 관찰해, 활물질 입자 내부의 확산 동역학을 분리한다.

직관적으로, 펄스 동안의 응답이 표면 + bulk 동역학을 합쳐 보이고, 휴지 동안의 회복이 거의 평형 전위로 가는 과정을 보여준다 — 이 둘의 차이가 확산의 시간 스케일을 정량화한다.

## 2. GITT vs PITT 차이

두 기법의 본질적 차이는 **무엇을 일정하게 유지하는가** 다.

| | GITT | PITT |
|---|------|------|
| 펄스 모드 | 정전류 (galvanostatic, $I = $ const) | 정전압 (potentiostatic, $V = $ const) |
| 측정량 | 펄스 동안 $V(t)$, 펄스 후 $V_\infty$ | 펄스 동안 $I(t)$ |
| 분석 식 | Weppner-Huggins ($\Delta E_s$, $\Delta E_\tau$) | Cottrell ($I \propto t^{-1/2}$) |
| SOC 분해능 | 우수 (펄스 후 SOC 증분 정확) | 보통 |
| 사용 빈도 | 배터리 활물질 표준 | 박막·이상화 시스템 |

GITT가 배터리에서 압도적으로 많이 쓰이는 이유: 정전류 펄스가 SOC를 정확히 증분(예: 1 시간에 0.1C 펄스 → ΔSOC = 10%)하므로 SOC 축에서 $D(\text{SOC})$ 를 깔끔히 그릴 수 있다. PITT는 SOC 증분이 시간 따라 변하는 전류 적분으로 결정되어 SOC 분해능이 GITT보다 떨어진다.

> **관련 개념: Cottrell 식 (반무한 확산)**
> 평면 전극에 갑자기 전위 step을 가하면 표면 농도가 즉시 0이 되고, 확산 경계층이 $\sqrt{Dt}$ 로 두꺼워진다. 이때 흐르는 전류는 Cottrell 식 $i(t) = nFAc \sqrt{D/(\pi t)}$ 를 따라 $1/\sqrt{t}$ 로 감쇠.
> 각 항: $A$ = 전극 면적, $c$ = 벌크 농도, $D$ = 확산 계수, $n$ = 전자 수. PITT는 이 Cottrell 거동에서 $i \cdot \sqrt{t}$ vs $\sqrt{t}$ plot의 절편으로 $D$ 추출.
> 가정: 반무한 확산($\sqrt{Dt} \ll L$, 입자 크기 $L$). 펄스 시간이 $\tau \ll L^2/D$ 이어야 유효. $\tau$ 가 너무 길면 finite-length 확산 보정 필요.

## 3. Weppner-Huggins 식 (GITT 표준)

펄스 동안 단순화된 Cottrell 거동을 가정하면, 펄스 직전·직후의 평형 전위 차 $\Delta E_s$ 와 펄스 동안의 $dE/d\sqrt{t}$ 비를 통해 $D$ 가 추출된다. Weppner와 Huggins(1977)가 정립한 형태:

$$D = \frac{4}{\pi} \left(\frac{m_B V_M}{M_B S}\right)^2 \left(\frac{\Delta E_s}{\tau \, (dE/d\sqrt{t})}\right)^2$$

각 항: $m_B$ = 활물질 질량, $V_M$ = 활물질 몰부피, $M_B$ = 활물질 몰질량, $S$ = 활성 표면적, $\tau$ = 펄스 지속 시간, $\Delta E_s$ = 펄스 전후 평형 전위 차, $dE/d\sqrt{t}$ = 펄스 동안의 시간 의존 응답 기울기.

식의 직관: 펄스 직후 평형 전위가 $\Delta E_s$ 만큼 변한 것은 SOC 변화에 대응 (열역학), 펄스 동안의 $dE/d\sqrt{t}$ 는 표면 이온 농도 변화 속도 (동역학). 둘의 비가 확산의 시간 스케일을 결정.

근사적 단순화 (균일 단일상 영역에서):

$$D \approx \frac{4 L^2}{\pi \tau} \left(\frac{\Delta E_s}{\Delta E_\tau}\right)^2$$

여기서 $L$ = 평균 입자 반지름, $\Delta E_\tau$ = 펄스 동안 전압 변화. 이 형태가 실용적으로 가장 많이 쓰인다.

## 4. 펄스 시간과 이완 시간 결정

GITT의 신뢰성은 펄스 시간 $\tau$ 와 이완 시간을 어떻게 정하느냐에 달려 있다.

**펄스 시간 $\tau$**: 반무한 확산 가정이 유효하려면 $\sqrt{D\tau} \ll L$, 즉 $\tau \ll L^2/D$ 이어야 한다. 입자 크기 $L = 1$ μm, $D = 10^{-10}$ cm²/s 라면 $L^2/D = 10^4$ s ≈ 2.8 h. 그래서 펄스 시간을 보통 5~30 분으로 잡는다 (입자에 따라 조정).

펄스 시간을 너무 길게 잡으면: 농도 구배가 입자 중심까지 도달해 finite-length 효과 → Weppner-Huggins 식 파탄. 너무 짧게 잡으면: SOC 증분이 작아 $\Delta E_s$ 가 noise 수준 → 추출 불가.

**이완 시간**: 펄스 후 OCV가 평형에 충분히 가까워질 때까지. 보통 1~4 h, 노화·저온 셀은 더 길게. 평형 도달 판정 기준은 OCV 변화율 < 0.1~1 mV/h. 이 기준을 적용하지 않고 임의로 30 분 휴지를 주면 $\Delta E_s$ 가 부정확.

## 5. 적용 조건과 한계

Weppner-Huggins 식을 그대로 적용할 수 있는 조건은 의외로 좁다.

**(1) 단일상 영역(slope)에서만 유효**: 1차 상전이가 일어나는 plateau 영역에서는 $dE/dx = 0$ 이라 식이 발산한다. LFP의 3.43 V plateau 같은 영역은 GITT 분석 불가. NMC·NCA의 slope 영역은 OK.

**(2) 표면적 $S$ 추정의 어려움**: BET 표면적, geometric 면적, 활물질 노출 면적이 모두 다르며, 어느 것을 써야 하는가가 모호하다. 전형적으로 BET 표면적이 가장 자주 쓰이지만, 이 값은 활물질 + carbon black + binder 모두를 포함해 진짜 활성 면적을 과대평가한다. **$S$ 의 1자리 오차가 $D$ 의 2자리 오차로 증폭** (식에 $S^2$ 로 들어감).

**(3) Single-particle vs porous-electrode**: Weppner-Huggins는 단일 입자 확산을 가정. 실제 전극은 porous structure이며 전해질 확산도 함께 들어온다. Doyle-Fuller-Newman 같은 porous-electrode 모형으로 보정해야 정확한 활물질 $D$ 가 분리된다.

**(4) $V_M$/$M_B$ 의 SOC 의존성**: 활물질의 몰부피는 lithiation으로 변하고, 화학식도 변한다. 식의 prefactor를 SOC별로 갱신해야 정확한 비교가 가능.

이 한계들 때문에 GITT의 절대값은 한 자릿수 정도 불확실하다고 보는 것이 합리적이며, 같은 셀의 SOC 의존성·온도 의존성·사이클 의존성 같은 **상대적 trend** 가 더 신뢰할 만한 결론이다.

## 6. $D_\text{Li}$ 의 일반적 범위

다양한 활물질에서 측정된 $D_\text{Li}$ 의 대표값 (cm²/s):

| 활물질 | $D_\text{Li}$ 범위 | 비고 |
|--------|-------------------|------|
| 흑연 | $10^{-10}$ ~ $10^{-7}$ | stage 의존성 강함 |
| LiCoO₂ | $10^{-10}$ ~ $10^{-9}$ | layered 평면 내 빠름 |
| NMC811 | $10^{-11}$ ~ $10^{-9}$ | SOC 의존 큼 |
| LiFePO₄ | $10^{-14}$ ~ $10^{-12}$ | 1D 채널, plateau 영역 측정 곤란 |
| Si | $10^{-12}$ ~ $10^{-10}$ | lithiation 따라 큰 변화 |
| Li₄Ti₅O₁₂ | $10^{-12}$ ~ $10^{-10}$ | spinel, 안정 |

전체적으로 $10^{-9}$ ~ $10^{-12}$ cm²/s 범위가 일반적이며, 같은 소재 내에서도 SOC와 입자 크기에 따라 1~2 자릿수 변화하는 것이 보통이다.

## 7. PITT 분석과 GITT와의 비교

PITT에서는 매 step마다 새 전위로 jump한 후 전류 응답을 기록. Cottrell 거동 ($i \propto t^{-1/2}$) 을 보이는 영역에서 $i\sqrt{t}$ 가 일정해지며, 이 plateau 값에서 $D$ 추출.

$$D = \pi \left(\frac{i \sqrt{t}}{nFAc}\right)^2 / c^2$$

PITT의 장점: 펄스 동안 SOC 변화가 작아 $D(\text{SOC})$ 의 SOC 분해능이 GITT보다 미세할 수 있다. 단점: 정전압 step에서 표면 농도가 즉시 평형에 도달한다는 가정이 SEI·표면 저항 때문에 깨지기 쉬워, 표면 동역학과 bulk 확산의 분리가 GITT보다 어렵다.

실무적으로는 GITT가 표준이며, PITT는 박막 전극·model system의 정밀 측정에 보조적으로 쓴다. EIS의 Warburg 영역에서 추출한 $D$ 와 GITT의 $D$ 를 교차 검증하는 것이 가장 신뢰성 있는 절차이며, 일치하지 않을 경우 표면 저항·porous-electrode 효과 등의 보정이 필요하다.

## 참고 문헌

- Weppner, W., Huggins, R. A. *J. Electrochem. Soc.* 124 (1977) 1569 — GITT 원리와 Weppner-Huggins 식 원전.
- Wen, C. J., Boukamp, B. A., Huggins, R. A., Weppner, W. *J. Electrochem. Soc.* 126 (1979) 2258 — GITT 적용 사례 정립.
- Levi, M. D., Aurbach, D. *J. Phys. Chem. B* 101 (1997) 4630 — PITT 분석 표준 처리.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — porous-electrode 보정과 single-particle 한계.
- Nickol, A. et al. *J. Electrochem. Soc.* 167 (2020) 090546 — GITT의 한계와 보정의 최근 정리.
