# 수송 이론 (Transport Theory)

## 1. 개요

평형 통계역학이 자유 에너지·OCV·상전이 같은 정적 양을 다룬다면, **수송 이론(transport theory)**은 비평형 상태에서 어떻게 이온·전자·열·운동량이 흘러가는지를 다룬다. 배터리는 본질적으로 비평형 장치다 — 충방전 중에 Li가 양극에서 음극으로 이동하고, 전해질을 통해 이온이 흐르며, 줄 가열로 열이 방출된다. 따라서 수송 계수(확산 계수 $D$, 이온 전도도 $\sigma$, 열전도도 $\kappa$)가 배터리 성능을 결정짓는 핵심 물성이다.

직관적으로 수송 이론의 출발점은 단순하다 — **작은 비평형 섭동(예: 작은 농도 구배)에 대한 응답은 평형 자체의 요동에 의해 결정된다**. 이것이 요동-소산 정리(fluctuation-dissipation theorem, FDT)의 핵심이며, Green-Kubo 식·Einstein 관계 같은 모든 수송 식이 그 직접적 결과다. 평형 trajectory만 잘 샘플링해도 수송 계수가 손에 들어온다는 이 결론이 분자동역학(MD) 시뮬레이션의 모든 수송 계산을 가능하게 한다.

배터리에서 핵심 수송 계수는 (i) 활물질 내 Li 확산 계수 $D_\text{Li}^\text{solid}$ (rate capability 결정), (ii) 전해질 이온 전도도 $\sigma$ (옴 손실), (iii) 전해질의 transference number $t_+$ (농도 분극)이다. 이 절은 이들을 통계역학에서 어떻게 추출하는지를 다룬다.

## 2. Onsager 상호 관계

비평형 열역학의 일반 framework는 **선형 응답** 관계다. 작은 일반화된 힘 $X_j$(농도 구배, 온도 구배, 전위 구배 등)가 작용할 때 일반화된 흐름 $J_i$(입자 흐름, 열 흐름, 전류)는 1차로 비례한다.

$$J_i = \sum_j L_{ij} X_j$$

각 항: $L_{ij}$ = Onsager 수송 계수 행렬. 배터리 전해질에서 $X_1$이 농도 구배, $X_2$가 전위 구배라면 $J_1$이 입자 흐름(Fick), $J_2$가 전류(Ohm), 그리고 교차 항 $L_{12}, L_{21}$이 농도-전위 결합(전기삼투, 농도 분극)을 표현한다.

**Onsager의 결정적 결과**(1931 노벨상)는 미시 가역성(microscopic reversibility, 시간 반전 대칭)에서 곧장 따라오는 대칭성이다.

$$\boxed{L_{ij} = L_{ji}}$$

이 대칭이 의미하는 것은 직관적이지 않다 — 농도 구배가 전류를 만들 때의 결합 계수가, 전위 구배가 입자 흐름을 만들 때의 결합 계수와 같다는 것. 아무 미시 모델 없이도 이런 비자명한 등식이 시간 반전 대칭만으로 보장된다. 외부 자기장이 있으면 $L_{ij}(\mathbf{B}) = L_{ji}(-\mathbf{B})$로 수정된다.

배터리 응용에서 Onsager 관계는 농축 전해질의 transference number 정의와 모든 결합 수송 식의 일관성을 보장한다. Newman의 농축 전해질 모델([`../06_battery_operation/00_overview.md`](../06_battery_operation/00_overview.md) 시리즈에서 활용)이 이 framework 위에 세워져 있다.

## 3. 요동-소산 정리 (FDT)

수송 이론의 가장 깊은 결과는 평형 요동과 비평형 응답이 같은 미시 동역학에서 나온다는 점이다. **요동-소산 정리**의 단순한 형태:

$$\text{(수송 계수)} \propto \int_0^\infty \langle A(0) A(t)\rangle_\text{eq}\, dt$$

평형에서 어떤 동역학적 양 $A$(예: 입자 속도, 전류 밀도)의 자기상관 함수의 시간 적분이 곧 그 양에 대응되는 수송 계수다. "평형 요동이 평형으로 돌아가는 속도가 곧 외부 섭동에 대한 응답 속도"라는 진술.

이것이 가능한 직관은 다음과 같다. 작은 외부 힘에 대한 응답은 1차 섭동 이론으로 풀리며, 그 결과가 평형 분포에서의 적절한 상관 함수로 떨어진다. 미시계는 자신을 끌어당기는 힘이 평형 요동에서 온 것인지 외부에서 온 것인지 구분하지 못하므로, 두 응답이 같은 형태를 갖는다.

$C_V = \langle (\Delta E)^2\rangle/k_BT^2$ ([`./02_partition_function.md`](./02_partition_function.md))도 이 framework의 정적 사례다 — 수송 계수가 동역학적 FDT라면, 응답 함수는 정적 FDT.

## 4. Green-Kubo 식

자유 입자(또는 단일 추적 입자)의 확산 계수에 대한 FDT 적용이 **Green-Kubo 식**이다. 입자 속도 $\mathbf{v}(t)$의 자기상관 함수(velocity autocorrelation function, VACF)를 시간 적분한다.

$$\boxed{D = \frac{1}{3}\int_0^\infty \langle \mathbf{v}(0)\cdot\mathbf{v}(t)\rangle\, dt}$$

3D 등방성 가정. 직관: $t = 0$에서 VACF가 $\langle |\mathbf{v}|^2\rangle = 3k_BT/m$(equipartition)으로 최대, 시간이 흐를수록 충돌과 상호작용으로 속도 상관이 잃어가며 0에 수렴. 그 decay 속도와 면적이 확산 계수를 정한다.

다른 수송 계수도 같은 형식이다. 이온 전도도(전류-전류 상관):

$$\sigma = \frac{1}{V k_BT}\int_0^\infty \langle \mathbf{J}(0)\cdot\mathbf{J}(t)\rangle\, dt, \quad \mathbf{J}(t) = \sum_i q_i \mathbf{v}_i(t)$$

열전도도(열류-열류 상관), 점도(응력-응력 상관)도 모두 같은 패턴.

**MD 시뮬레이션 워크플로**:
1. 평형(NVT 또는 NVE) MD trajectory를 충분히 길게 ($\sim$ ns) 생성.
2. 모든 시간 step에서 속도(또는 전류, 응력)를 기록.
3. 자기상관 함수 $\langle A(0) A(t)\rangle$ 계산 (FFT로 가속).
4. 시간 적분하면 수송 계수.

실용 주의점: VACF는 보통 $\sim$ ps 시간 스케일에서 빠르게 감쇠하지만, long-time tail($\sim t^{-3/2}$ for hydrodynamic memory)이 있어 적분의 수렴이 미묘하다. 적분 한계의 선택과 통계적 noise 처리가 신뢰성에 결정적이다.

## 5. Einstein 관계와 MSD

Green-Kubo의 등가 형식이 **Einstein 관계**다. VACF의 시간 적분 대신 **mean-square displacement(MSD)**의 long-time 기울기를 본다.

$$\boxed{\langle |\mathbf{r}(t) - \mathbf{r}(0)|^2\rangle = 6Dt \quad (3D, \text{long-time limit})}$$

1D에서는 $2Dt$, 2D에서는 $4Dt$. 이 식은 두 가지 의미를 함의한다 — (i) 확산은 distance가 시간의 1/2승으로 자라는 random walk 거동, (ii) 그 비례 상수의 1/6이 곧 확산 계수.

Einstein 식은 Green-Kubo와 정확히 등가다 — $\langle r^2(t)\rangle$를 두 번 미분하면 VACF가 나오므로. 실용적으로는 MSD가 Green-Kubo보다 noise에 강해 MD 분석에서 더 자주 쓰인다.

**Nernst-Einstein 관계**가 또 다른 Einstein 식이다. 점성 매질에서 입자의 이동도 $\mu_\text{mob}$($v = \mu_\text{mob} F$)와 확산 계수가 같은 마찰 계수에서 떨어지므로:

$$D = \mu_\text{mob} k_BT$$

이온의 경우 전도도와 확산 계수의 관계가 이를 통해 설립된다.

$$\sigma_\text{NE} = \frac{n q^2}{k_BT} D$$

각 항: $n$ = 이온 수밀도, $q$ = 이온 전하. 이 식은 이온이 서로 독립일 때(이상 용액)만 정확하다. 농축 전해질에서는 양이온-음이온 상관(서로의 흐름을 끌고 다님)이 있어 실제 $\sigma$는 $\sigma_\text{NE}$보다 작아진다. 그 비율이 **Haven ratio** $H_R = \sigma/\sigma_\text{NE} = D_\sigma/D_t$이며($D_\sigma$는 conductivity diffusivity, $D_t$는 tracer diffusivity), $H_R < 1$이 상관성의 직접 척도다. 고체전해질 연구에서 $H_R$이 0.5 안팎으로 떨어지는 경우 vehicular vs Grotthuss 메커니즘 구분의 단서가 된다.

## 6. 배터리 응용: AIMD/MD에서 $D_\text{Li}$ 추출

첫 원리 분자동역학(AIMD, ab initio MD)이나 force field MD가 배터리 소재의 이온 확산을 직접 시뮬레이션할 수 있게 되면서, 통계역학적 수송 이론의 직접 응용이 일상 도구가 되었다.

**표준 워크플로**:
1. 활물질 또는 고체전해질의 supercell을 만들고 NVT(Nosé-Hoover) MD를 $\sim 100$ ps 이상 돌린다. 통계 정확도를 위해 1-10 ns가 일반적.
2. Li 원자(또는 다른 운반 이온)의 trajectory $\mathbf{r}_i(t)$를 모두 기록.
3. MSD 계산: $\langle |\mathbf{r}(t) - \mathbf{r}(0)|^2\rangle = (1/N)\sum_i |\mathbf{r}_i(t) - \mathbf{r}_i(0)|^2$. (시간 origin도 평균해 통계 향상)
4. Long-time linear regime의 기울기에서 $D = \text{slope}/6$ 추출. Ballistic($t^2$)과 cage rattle 영역은 제외.
5. 여러 온도에서 반복해 Arrhenius plot $\ln D$ vs $1/T$의 기울기에서 활성화 에너지 $E_a$ 추출.

**임계 주의점**:
- AIMD는 비싸므로 보통 700-1500 K로 가속 샘플링한 뒤 Arrhenius로 300 K extrapolation. 이 절차는 단일 활성 메커니즘 가정에 의존하며, 메커니즘 전환이 있으면 외삽이 부정확해진다.
- 통계 수렴: $D \cdot t \sim L^2$를 만족할 만큼 trajectory가 길어야 한다. 짧으면 MSD가 사실상 sub-diffusive로 보일 수 있다.
- 25 °C에서 $k_BT \approx 25.7$ meV이므로 $E_a \sim$ 0.3-0.5 eV의 활성화 장벽이 전형적인 고체전해질 수준이며, Arrhenius factor가 $e^{-E_a/k_BT} \sim 10^{-5}-10^{-8}$ 정도로 작게 나옴을 감안.

**Conductivity로 환산**: Nernst-Einstein 식 $\sigma = nq^2 D/k_BT$에 Li 농도와 전하를 넣어 $D_\text{Li}^\text{tracer}$에서 $\sigma$를 추정. Haven ratio 보정이 정량 예측에서는 필요. Argyrodite, garnet, sulfide 고체전해질 모두 이 워크플로로 1차 스크리닝된 후 실험 검증되는 패턴이 표준화되어 있다.

## 참고 문헌

- Onsager, L. *Physical Review* 37 (1931) 405–426; 38 (1931) 2265–2279 — Onsager 상호 관계 원전.
- Kubo, R. *Journal of the Physical Society of Japan* 12 (1957) 570–586 — Green-Kubo 식의 일반 framework.
- Hansen, J.-P., McDonald, I. R. *Theory of Simple Liquids* (4th ed., Academic Press, 2013) — 액체의 수송 이론 표준 처리.
- Frenkel, D., Smit, B. *Understanding Molecular Simulation* (2nd ed., Academic Press, 2002) — MD에서 MSD/VACF 계산 실용 가이드.
- He, X., Zhu, Y., Mo, Y. *Nature Communications* 8 (2017) 15893 — AIMD에서 고체전해질 $D_\text{Li}$ 추출, Haven ratio와 메커니즘 분석.
- Mehrer, H. *Diffusion in Solids* (Springer, 2007) — Tracer diffusion vs conductivity diffusion, Haven ratio의 의미.
