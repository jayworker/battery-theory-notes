# 전기 이중층 (Electrical Double Layer)

## 1. 개요

전극과 전해질이 만나는 순간, 계면에는 양·음 전하가 매우 좁은 영역에 분리되어 쌓인다. 이 전하 분리 구조가 **전기 이중층(electrical double layer, EDL)** 이며, 전기화학에서 일어나는 거의 모든 빠른 응답(고주파 임피던스, 캐패시터 충전, 표면 흡착)의 무대다.

전자 이동 반응(charge transfer)이 일어나기 전에 반응 종은 반드시 이중층을 가로질러야 하므로, 이중층의 구조는 동역학에도 직접 영향을 준다 (Frumkin 보정). 즉 BV 식이 상정하는 "표면 농도 = 벌크 농도"는 이중층 내부에서는 깨지며, 표면 OHP에서의 실제 농도와 전위가 동역학을 결정한다.

이중층 이해는 100여 년에 걸쳐 점진적으로 정교화되었다. Helmholtz의 평행판 모형 → Gouy·Chapman의 확산층 모형 → Stern의 통합 모형 → Bockris-Devanathan-Müller(BDM)의 흡착 물 분자 모형으로 이어지는 흐름이다.

각 단계는 직전 모형의 결정적 한계를 해결하면서 도입되었으며, 본 절은 그 흐름과 핵심 정량 관계를 정리한다.

## 2. Helmholtz 모델

가장 단순한 모형은 전극 표면에 반대 전하를 가진 이온이 한 분자 두께로 정렬된다고 가정한다. 즉 평행판 캐패시터(parallel-plate capacitor)와 동일한 그림이다.

직관적으로는 깔끔하지만, 두께가 ångström 스케일이라 측정 가능한 캐패시턴스가 전위에 무관한 상수로 예측된다는 점이 결정적 한계다. 실제 실험에서는 $C_\text{dl}$ 이 전위에 따라 V자형 곡선을 그리는 일이 보편적이며, 이 의존성을 Helmholtz는 전혀 설명하지 못한다.

$$C_H = \frac{\varepsilon_0 \varepsilon_r}{d}$$

각 항: $C_H$ = 단위 면적당 Helmholtz 캐패시턴스(F/m²), $\varepsilon_0 = 8.854 \times 10^{-12} \text{ F/m}$, $\varepsilon_r$ = 계면 영역의 상대 유전 상수(보통 6~30, 벌크 물보다 작음), $d$ = 이온 중심까지의 거리($\sim$0.3~0.5 nm). 이 식이 주는 추정값은 약 10~40 μF/cm² 수준이며, 실제 측정값과 차수는 맞지만 전위·농도 의존성을 전혀 설명하지 못한다.

Helmholtz 모형은 후속 모형의 기반(=정렬된 표면 층)으로 흡수되며, 단독으로는 폐기되었다고 보면 된다. 다만 농축 전해질 한계에서 Stern 모형이 사실상 Helmholtz 식으로 수렴하므로, 정성적 그림으로는 여전히 자주 인용된다.

## 3. Gouy-Chapman 모델

이온이 열적으로 흔들리는 분포를 가져야 한다는 점을 포함하면, 이중층은 단일 평면이 아니라 표면에서 멀어지면서 농도가 지수적으로 감쇠하는 **확산층(diffuse layer)** 이 된다.

Boltzmann 분포($n_i = n_i^\infty \exp(-z_i e\phi/k_B T)$)와 Poisson 식($\nabla^2 \phi = -\rho/\varepsilon$)을 결합하면 비선형 Poisson-Boltzmann 식이 되며, 작은 전위 한계에서 선형화하면 전위가 표면에서 $\exp(-\kappa x)$ 로 떨어지는 해가 나온다. 그 감쇠 길이가 Debye 길이(Debye length) $\kappa^{-1}$ 다.

$$\kappa^{-1} = \sqrt{\frac{\varepsilon_0 \varepsilon_r RT}{2 F^2 I}}$$

각 항: $I = \frac{1}{2}\sum c_i z_i^2$ = 이온 강도(ionic strength, mol/m³), $\varepsilon_r$ = 벌크 유전 상수, $T$ = 절대 온도. 25 °C 수용액에서 1 mM ⇒ $\kappa^{-1} \approx 9.6 \text{ nm}$, 100 mM ⇒ $\sim$1 nm, 1 M ⇒ $\sim$0.3 nm. 즉 농축 전해질일수록 이중층이 얇아진다.

작은 전위 근사에서 확산층 캐패시턴스는

$$C_d = \varepsilon_0 \varepsilon_r \kappa = \frac{\varepsilon_0 \varepsilon_r}{\kappa^{-1}}$$

이며, 농도와 전위에 의존한다. 큰 전위로 확장한 정확한 해는 $C_d = \varepsilon_0\varepsilon_r\kappa\cosh(zF\phi_0/2RT)$ 형태이며, 표면 전위가 클수록 캐패시턴스가 발산한다. Gouy-Chapman 단독 모형은 농축 전해질이나 큰 전위에서 캐패시턴스를 비현실적으로 크게 예측하는데, 이는 이온이 점전하라는 가정 때문이다.

다음 절의 Stern 모형이 이 결함을 보정한다.

## 4. Stern 모델

Stern은 Helmholtz와 Gouy-Chapman을 직렬로 묶었다. 전극 표면에 가장 가까운 한 층은 이온이 유한한 크기를 가져 더 가까이 못 오는 Helmholtz 영역(또는 compact layer), 그 바깥은 Gouy-Chapman의 확산층이다.

두 영역의 캐패시턴스가 직렬이므로 작은 쪽이 전체를 지배한다. 직렬 캐패시터의 합성 식은:

$$\frac{1}{C_\text{dl}} = \frac{1}{C_H} + \frac{1}{C_d}$$

각 항: $C_\text{dl}$ = 측정되는 전체 이중층 캐패시턴스, $C_H$ = compact 층 캐패시턴스(전위에 거의 무관), $C_d$ = 확산층 캐패시턴스(농도/전위 의존).

농축 전해질이나 큰 전위에서는 $C_d \gg C_H$ 가 되어 $C_\text{dl} \approx C_H$ — 즉 Helmholtz 한계로 수렴한다. 묽은 전해질·작은 전위에서는 $C_d \ll C_H$ 가 되어 $C_\text{dl} \approx C_d$, 즉 Gouy-Chapman 한계가 보인다. 즉 Stern 모형은 두 극한을 자연스럽게 포함한다.

이 직렬 보상 효과 덕분에 Stern 모형은 농도와 전위에 따른 $C_\text{dl}$ 의 V자형 곡선(=PZC 부근에서 최소) 같은 정성적 특징을 처음으로 재현했다. 정량적으로는 여전히 정확도가 떨어져, 다음 단계로 넘어가는 디딤돌 역할을 한다.

Stern 모형의 결정적 한계는 (i) compact layer 내부의 유전 상수를 자유 변수로 두어야 fit이 되고, (ii) 이온 자체의 크기 외에 용매화 껍질의 역할을 명시하지 못한다는 점이다. 이 두 한계가 BDM 모형으로 이어진다.

## 5. BDM (Bockris-Devanathan-Müller)

수용액에서는 물 분자 자체가 강한 쌍극자라 전극 표면에 정렬 흡착된다는 사실이 1960년대 BDM 모형의 핵심 통찰이다. 즉 compact layer 안에 다시 두 평면이 있다.

흡착 물 분자가 이루는 층과 부분 탈수화된 이온이 가장 가까이 다가갈 수 있는 평면, 이 두 평면을 각각 **내부 Helmholtz 면(IHP, inner Helmholtz plane)** 과 **외부 Helmholtz 면(OHP, outer Helmholtz plane)** 이라 부른다.

구조적으로는 (1) 흡착 물 쌍극자 + 특이 흡착 이온이 IHP, (2) 용매화 껍질을 유지한 이온이 OHP, (3) 그 바깥이 Gouy-Chapman 확산층이다. IHP에 들어오는 이온은 전기적 인력만이 아니라 화학적 결합에도 영향을 받으므로 "특이 흡착(specifically adsorbed)" 이라 부르며, OHP 이온은 순수 정전기적 인력만으로 머무른다.

BDM의 정량 식은 Stern 식의 직렬 구성을 두 단계(IHP, OHP)로 확장한 형태지만, 본 노트에서는 결과 식보다 그림이 더 중요하다: **이중층은 단순 평행판이 아니라, 정렬된 물 + 두 종류의 이온 평면 + 확산층의 4중 구조**다. 이 그림이 SEI(Solid Electrolyte Interphase)의 첫 분자층 형성을 정성적으로 이해할 때 출발점이 된다.

특이 흡착이 일어나면 PZC가 이동하고, 이중층 캐패시턴스 곡선의 최소값 위치가 바뀐다. Esin-Markov 효과로 잘 알려진 이 현상은 할라이드 이온(Cl⁻ < Br⁻ < I⁻ 순으로 강한 특이 흡착)에서 가장 명확히 관찰된다.

현대 시뮬레이션(MD, AIMD)은 이 BDM 그림을 대체로 지지하면서, 계면 물 분자가 사실은 매우 동적이며 전위에 따라 배향이 뒤집힌다는 추가 사실을 보여줬다. 비수용액 배터리 전해질에서는 EC(ethylene carbonate) 같은 강한 쌍극자 분자가 동일한 역할을 수행하며, 이 EC 정렬 층의 환원 분해가 곧 SEI의 첫 형성 단계다.

## 6. PZC, ζ-potential, 표면 전하 결정 인자

이중층 분석에서 가장 자주 등장하는 기준점이 **제로 전하 전위(potential of zero charge, PZC)** 다. 표면 전하가 정확히 0이 되는 전극 전위이며, 이때 이중층은 무너지는 것이 아니라 양·음 이온이 균등하게 분포한 중립 상태가 된다.

직관적으로 PZC는 전극과 전해질의 "정전기적 중립점"이며, 흡착·전기촉매 활성·습윤성이 PZC 근처에서 최소(또는 극값)를 갖는 일이 흔하다.

측정은 보통 두 방법으로 한다. ① 묽은 전해질에서 $C_\text{dl}(E)$ 를 측정해 V자형 곡선의 바닥을 PZC로 잡는다(Gouy-Chapman 최소). ② 표면 장력 또는 immersion potential 변화.

Pt(111)의 PZC는 약 0.27 V vs SHE, Hg는 −0.19 V vs SHE 부근이 표준값으로 받아들여진다. 결정면에 따라 PZC가 달라지므로(Pt(100), Pt(110)은 다른 값) 단결정 vs 다결정 구분이 중요하며, 이 의존성이 표면 화학과 전기촉매 활성을 결정짓는 출발점이다.

콜로이드/입자 분야에서 자주 쓰는 **ζ-potential**은 전기영동 면(slipping plane)에서의 전위로, 입자가 외부 전기장 하에서 움직이기 시작하는 면의 전위다. ζ-potential과 PZC는 측정 면이 다르지만 둘 다 표면 전하 부호와 강도를 알려주며, 콜로이드 안정성 / 활물질 슬러리 분산 안정성의 일차 지표가 된다.

표면 전하를 결정하는 외부 인자: ① pH(수용액에서 oxide 표면의 양성자 평형), ② 지지 전해질 농도 및 종(특이 흡착 가능한 이온 — Cl⁻, I⁻, 유기 분자 — 은 PZC를 크게 이동시킨다), ③ 인가 전위.

배터리 맥락에서는 추가로 ④ SEI/CEI 박막의 화학 조성이 표면 전하 분포를 지배하며, 이중층 캐패시턴스 측정이 SEI 두께·치밀도 진단의 간접 도구로 쓰인다. SEI가 형성되면 측정되는 $C_\text{dl}$ 이 한 자릿수 떨어지는 일이 흔하며, 이는 SEI가 추가 직렬 캐패시터로 들어오기 때문이다.

EIS의 고주파 반원에 들어가는 CPE(constant phase element)가 사실상 비이상적 $C_\text{dl}$ 의 표현이며, 이중층의 비균일성을 정량화한다 — 자세한 사용은 [`./05_eis_fundamentals.md`](./05_eis_fundamentals.md) 참조.

응용 관점에서 또 하나 중요한 분야가 슈퍼커패시터(supercapacitor)다. EDLC(electric double-layer capacitor)는 이중층 충전만을 에너지 저장에 활용하므로, $C_\text{dl}$ × 비표면적의 곱이 곧 비용량을 결정한다. 활성탄(activated carbon)에서 1500~2500 m²/g 표면적과 $\sim$10 μF/cm² 의 $C_\text{dl}$ 이 결합되어 100~300 F/g의 비용량을 낸다.

실험 측정 한 가지 메모: 이중층 캐패시턴스를 EIS 데이터에서 추출할 때 단순히 $1/(\omega Z'')$ 로 계산하면 CPE 효과와 SEI 직렬 캐패시터 때문에 잘못된 값이 나오기 쉽다. 신뢰성 있는 $C_\text{dl}$ 추출은 $R_s$ + ($R_\text{ct}$ ∥ CPE) 모형을 fit한 뒤 Brug 식으로 환산하는 절차가 표준이며, 이 절차 없이 raw 임피던스 직접 환산은 1차 추정용에만 적합하다.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Chapter 13: 이중층 이론.
- Bockris, J. O'M., Devanathan, M. A. V., Müller, K. *Proc. R. Soc. London A* 274 (1963) 55 — BDM 원전.
- Schmickler, W., Santos, E. *Interfacial Electrochemistry* (2nd ed., Springer, 2010) — 현대적 이중층 이론.
- Trasatti, S., Lust, E. *Modern Aspects of Electrochemistry* 33 (1999) 1 — PZC 측정과 표 정리.
- Israelachvili, J. *Intermolecular and Surface Forces* (3rd ed., Academic, 2011) — Debye 길이, ζ-potential의 콜로이드 맥락.
