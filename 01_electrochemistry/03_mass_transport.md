# 물질 전달 (Mass Transport)

## 1. 개요

전극 반응이 아무리 빠르더라도, 반응에 필요한 화학종이 계면에 충분히 공급되지 않으면 전류는 거기서 막힌다. 이것이 농도 분극(concentration polarization)의 원인이며, 모든 전기화학 시스템의 고전류·장시간 거동을 지배한다. 본 절은 물질을 계면으로 운반하는 세 기구 — 확산(diffusion), 이동(migration), 대류(convection) — 를 정리하고, 배터리·전기촉매에서 자주 쓰는 결과 식들을 모은다.

세 기구 중 어느 것이 우세한지는 시스템에 따라 다르다. 정지 전해질 + 작은 셀 ⇒ 확산 우세. 지지 전해질이 부족한 묽은 시스템 ⇒ 이동도 함께 작용. 회전 전극·강제 유체 시스템 ⇒ 대류 지배. 배터리는 보통 첫 두 경우의 혼합이며, 여기에 활물질 입자 내부의 고체상 확산이 추가된다.

## 2. Fick 1차/2차 법칙

확산은 농도 구배가 흐름을 만드는 가장 기본 기구이며, 직관적으로 "농도가 높은 쪽에서 낮은 쪽으로 분자가 이동한다"는 것이다. 이 흐름의 비례 상수가 확산 계수(diffusion coefficient) $D$ 이며, 단위는 m²/s 또는 cm²/s.

Fick 1법칙은 정상 상태에서의 flux를 농도 구배로 직접 연결한다.

$$J = -D \nabla c$$

각 항: $J$ = mol flux density (mol/m²·s), $D$ = 확산 계수, $c$ = 농도, $\nabla c$ = 농도 구배. 음의 부호는 흐름이 농도 높은 쪽에서 낮은 쪽을 향함을 의미한다. 이 식은 시스템이 정상 상태에 도달했거나 정상 상태로 근사할 수 있을 때 직접 사용된다.

시간에 따라 농도가 어떻게 변하는지를 묘사하려면 질량 보존(연속 방정식)을 1법칙과 결합해야 한다. 그 결과가 Fick 2법칙이다.

$$\frac{\partial c}{\partial t} = D \nabla^2 c$$

이 PDE는 초기·경계 조건만 주어지면 거의 모든 확산 문제(반무한, 유한, 구형, 평면)의 해석 해로 이어진다. 1차원 평면 반무한 영역의 step 응답이 Cottrell 해, 유한 길이 영역이 finite Warburg, 구형 입자가 Newman의 활물질 모델 등 모두 같은 PDE의 변형이다.

$D$ 가 농도에 의존하면 비선형 확산 식이 되며, 배터리 활물질에서 자주 그렇다(예: 흑연의 stage 전이 영역에서 $D(x)$ 가 한 자릿수 이상 변동). 이 경우 해석 해가 없으므로 수치 해법(FEM, FDM)에 의존한다.

엄밀히는 화학 포텐셜(chemical potential) 구배가 본질적인 추진력이며, $J = -L \nabla\mu$ 가 더 일반적인 형태다 ($L$ = Onsager 계수). 이상 용액에서 $\mu = \mu^\circ + RT\ln c$ 이면 $\nabla\mu = (RT/c)\nabla c$ 가 되어 Fick 1법칙이 회복된다. 비이상 시스템에서는 활동도 보정이 들어가야 하며, 이 점은 농축 전해질 처리에서 결정적으로 중요하다.

## 3. Nernst-Planck 식

이온은 농도 구배뿐 아니라 전기장에도 반응한다. 농도 구배에 의한 확산 항과 전위 구배에 의한 이동(migration) 항을 더한 것이 Nernst-Planck 플럭스다. 직관적으로 "농도 차로 밀고, 전기장으로 끈다"는 그림이며, Einstein 관계 $u_i = D_i / RT$ (mobility-diffusivity)로 두 항이 자연스럽게 묶인다.

$$J_i = -D_i \nabla c_i - \frac{z_i F}{RT} D_i c_i \nabla \phi + c_i \mathbf{v}$$

각 항: 첫째 = 확산, 둘째 = 이동(migration, $z_i$ = 이온 전하수, $\phi$ = 전위), 셋째 = 대류($\mathbf{v}$ = 유체 속도). 지지 전해질(supporting electrolyte)이 충분히 많으면 작용 이온의 이동 항이 작아져 확산만 남게 된다 — 그래서 측정용 셀에는 일부러 농축 KCl이나 LiClO₄ 같은 지지 전해질을 넣는다.

배터리 전해질은 작용 이온 그 자체가 농축되어 있어 이동을 무시할 수 없다. 이때 등장하는 핵심 양이 transference number $t_+$ 로, 전체 전류 중 양이온이 운반하는 분율이다.

$$t_+ = \frac{|z_+| u_+ c_+}{|z_+| u_+ c_+ + |z_-| u_- c_-}$$

각 항: $u_i$ = 이동도(mobility), $c_i$ = 농도, $z_i$ = 전하수. 일반적인 LiPF₆/EC-DMC 전해질의 $t_+$ 는 0.2~0.4 정도로, 전류의 60~80%를 음이온(PF₆⁻)이 운반한다는 뜻이다. 그래서 동일한 전류에서 Li⁺의 농도 분극이 빠르게 발달한다.

$t_+$ 가 1에서 멀수록 농도 분극이 빠르게 발달하며, single-ion conductor 폴리머·고체 전해질의 매력은 $t_+ \to 1$ 에 있다. 측정은 Bruce-Vincent 방법이 표준이며, 정전류 후의 정상 상태 전류와 초기 전류의 비로부터 $t_+$ 를 추출한다.

## 4. 시간 의존 확산 — Cottrell

평면 전극에 갑자기 전위 step을 가해 표면 농도를 0으로 만들면, 확산 경계층이 시간에 따라 $\sqrt{Dt}$ 로 두꺼워지면서 전류가 감쇠한다.

이 상황을 정확하게 풀면 Cottrell 식이 나오며, 반무한(semi-infinite) 평면 확산 — 즉 경계층이 전극 차원이나 입자 크기에 비해 훨씬 얇은 영역 — 에서 성립한다.

$$i(t) = nFAc \sqrt{\frac{D}{\pi t}}$$

각 항: $n$ = 전자 수, $F$ = Faraday 상수, $A$ = 전극 면적, $c$ = 벌크 농도, $D$ = 확산 계수, $t$ = step 인가 후 시간. 따라서 $i \cdot \sqrt{t}$ 가 시간 무관 상수가 되어 plot $i$ vs $1/\sqrt{t}$ 의 기울기에서 $D$ 를 추출하는 것이 표준 절차다.

적용 조건이 자주 무시되니 강조해 둔다. ① 반무한 가정 — 확산층 두께 $\delta \sim \sqrt{Dt}$ 가 입자 크기 $L$ 보다 훨씬 작아야 함($t \ll L^2/D$). ② 표면 농도가 즉시 0이 되는 큰 step — 작은 step에서는 BV 동역학이 함께 들어와 식이 깨짐. ③ 단일상 영역 — plateau 위에서는 확산이 아닌 상전이가 율속이라 Cottrell이 적용 불가. GITT 분석의 신뢰도가 늘 입자 크기 분포에 좌우되는 이유가 바로 이 ①번 조건이다.

## 5. 회전 디스크 전극(RDE)과 Levich 식

확산이 시간에 의존하지 않는 정상 상태를 만들고 싶을 때 강제 대류를 도입한다. 회전 디스크 전극(RDE)이 표준 도구로, 일정한 각속도 $\omega$ 로 디스크를 돌리면 디스크 표면에 균일한 두께의 확산층이 형성되고 정상 상태 한계 전류가 측정된다. 직관적으로, 회전이 빠를수록 확산층이 얇아져 더 큰 전류가 흐를 수 있다.

$$i_L = 0.62 \, n F A c D^{2/3} \nu^{-1/6} \omega^{1/2}$$

각 항: $i_L$ = 한계 전류, $n$ = 전자 수, $A$ = 디스크 면적, $c$ = 벌크 농도, $D$ = 확산 계수, $\nu$ = 동점도(kinematic viscosity, m²/s), $\omega$ = 각속도(rad/s).

$i_L$ 이 $\sqrt{\omega}$ 에 비례하는 것이 Levich plot의 핵심 특징이며, plot이 직선이 아니거나 절편이 0이 아니면 동역학 또는 흡착 효과가 함께 작용한다는 신호다. 직선의 기울기에서 $D$ 를 추출할 수 있으며, 농도가 정확히 알려진 산화환원 매개체(예: ferrocyanide)에서 $D$ 측정의 표준 방법이다.

Koutecký-Levich 분석은 Levich 식을 동역학과 결합해 분해한다.

$$\frac{1}{i} = \frac{1}{i_K} + \frac{1}{i_L}$$

각 항: $i_K$ = 동역학 한계 전류(kinetic-limited), $i_L$ = 물질 전달 한계 전류. $1/\sqrt{\omega}$ 외삽($\omega \to \infty$)으로 $i_K$ 와 그로부터 $j_0$ 를 추출한다.

ORR 전기촉매 평가의 표준 절차다. 회전 링-디스크(RRDE) 구성에서는 디스크에서 만든 중간체를 링이 검출하므로, 4e⁻ vs 2e⁻ ORR 경로의 분율 분리가 가능하다. RDE는 배터리 실셀과 직접 관련이 없지만, 전해질 첨가제·SEI 형성 반응의 동역학 분석에서 활발히 쓰인다.

Cottrell 식의 적용에서 흔한 함정 하나: 측정 초기에 이중층 충전 전류가 Faradaic 전류와 섞여 보이는 짧은 시간 영역(보통 $t < 10$ ms)이다. 이 영역의 데이터를 무비판적으로 fitting에 포함하면 $D$ 가 과대평가된다.

## 6. 농도 분극과 한계 전류

전극 반응이 빠를 때 — 즉 동역학이 충분히 빨라 표면 농도가 곧바로 변할 때 — 시스템 거동은 전적으로 물질 전달이 결정한다. 정지 전해질에서 일정한 두께 $\delta$ 의 Nernst 확산층(diffusion layer)을 가정하면, 표면 농도 $c_s$ 와 벌크 농도 $c$ 의 차가 그대로 흐름을 만든다. 표면 농도가 0이 되는 순간 더 이상 흐를 수 없는 한계 전류 $i_\text{lim}$ 에 도달한다.

$$i_\text{lim} = \frac{n F D A c}{\delta}$$

각 항: $\delta$ = Nernst 확산층 두께. $\delta$ 는 정지 전해질에서 시간에 따라 $\sqrt{Dt}$ 로 자라며, 강제 대류에서는 유체 속도와 형상이 정한다(RDE에서는 $\delta \propto \omega^{-1/2}$). 농도 분극에 의한 과전압은 Nernst 식의 활동도 비를 표면/벌크 농도 비로 바꾼 형태로 정리된다:

$$\eta_\text{conc} = \frac{RT}{nF} \ln\!\left(1 - \frac{i}{i_\text{lim}}\right)$$

$i \to i_\text{lim}$ 이면 로그 인자가 발산해 전압이 무너진다. 정전류 펄스 인가에서 표면 농도가 0이 되는 시점은 Sand 시간으로 주어진다.

$$\tau_s = \pi D \left(\frac{nFc}{2j}\right)^2$$

각 항: $\tau_s$ = Sand 시간(s), $j$ = 인가 전류 밀도. 이 시점 이후 인가 전류를 유지하면 전압이 급격히 떨어진다. 배터리 충방전에서 cut-off 전압이 갑자기 닿는 high-rate 시나리오의 정량적 배경이 바로 이 식이며, Li 금속 음극의 덴드라이트 발생 임계 전류 추정에도 동일한 식이 등장한다.

분극의 시간 스케일별 분해 실전은 [`./../06_battery_operation/02_polarization.md`](../06_battery_operation/02_polarization.md) 참조.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Chapter 1, 9: 물질 전달과 RDE.
- Newman, J., Thomas-Alyea, K. E. *Electrochemical Systems* (3rd ed., Wiley, 2004) — Nernst-Planck 농축 전해질 처리, transference number.
- Levich, V. G. *Physicochemical Hydrodynamics* (Prentice-Hall, 1962) — RDE/Levich 식 원전.
- Crank, J. *The Mathematics of Diffusion* (2nd ed., Oxford, 1975) — Fick 식의 해석 해 모음.
- Cottrell, F. G. *Z. Phys. Chem.* 42 (1903) 385 — Cottrell 식 원전.
