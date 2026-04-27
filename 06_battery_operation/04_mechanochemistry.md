# 기계화학 (Mechanochemistry in Batteries)

## 1. 개요

리튬 삽입(intercalation)/탈리(deintercalation)는 본질적으로 **격자에 손님 이온을 끼우거나 빼는 과정**이다. 격자 상수가 변하고, 결과적으로 활물질 입자가 부풀거나 수축한다. 이 단순한 사실이 배터리 열화의 절반 이상을 설명한다 — 부피 변화 → 응력 → 균열 → 새 표면 → SEI 재형성 → LLI/저항 증가의 피드백 루프.

기계적 열화와 전기화학적 열화는 분리해서 다룰 수 있는 게 아니다. 균열(crack)은 단순히 입자가 깨지는 현상이 아니라, 그 즉시 새 전극 표면을 노출시켜 [SEI 재형성](./03_interface.md)을 유도하기 때문이다.

## 2. 부피 변화 (Volume Change)

활물질의 부피 변화율은 소재 종류와 화학에 따라 극단적으로 다르다. layered 산화물 양극은 비교적 작고, 알로이형 음극은 매우 크다. 다음은 검증된 대표값이다.

| 소재 | 반응 형식 | 부피 변화율 |
|------|----------|-------------|
| 흑연 (graphite) | intercalation | ~10% |
| LiNi$_x$Mn$_y$Co$_z$O₂ (NMC) | intercalation | 2–5% (조성 의존) |
| LiFePO₄ | 2상 반응 | ~6.5% |
| Si (lithiation) | 합금 반응 | ~280–300% |
| LiCoO₂ | intercalation | ~2% |

격자 상수의 조성 의존성은 묽은 고용체에서는 Vegard 법칙으로 근사된다.

$$a(x) = a_0 + \beta x$$

여기서 $x$는 Li 함량, $a_0$는 기준 상수, $\beta$는 격자 팽창률. 실제 NMC, LCO에서는 c-axis와 a-axis가 다른 부호로 변하기도 하는 이방성(anisotropy)이 있어, 단결정 입자의 결정 방향에 따라 응력 분포가 매우 달라진다. 다결정 입자에서는 입계(grain boundary)에 응력이 집중되어 입계 균열의 시발점이 된다.

## 3. 응력-확산 결합 (Stress-Coupled Diffusion)

부피 변화는 단순한 결과가 아니라 확산 자체에 영향을 미친다. 입자 표면에 Li가 먼저 들어가면 표면이 팽창하려 하지만 내부가 잡고 있어 **표면은 압축, 내부는 인장** 응력 상태가 된다(또는 그 반대). 압축 응력은 추가 Li 삽입을 억제하고, 인장 응력은 촉진한다. 즉 화학 포텐셜에 응력이 직접 결합된다.

> **관련 개념: Larché-Cahn 화학 포텐셜**
> 외부 응력이 없는 보통의 확산은 농도 구배가 유일한 구동력이다 ($\mu = \mu_0 + RT\ln a$). 그러나 결정 안에 응력장 $\sigma$ 가 있으면 이온이 그 자리에 들어갈 때 부피 변화 $\Omega$ (partial molar volume)에 대한 일을 추가로 해야 하므로 화학 포텐셜에 $\sigma\Omega$ 항이 더해진다: $\mu = \mu_0 + RT\ln a + \sigma\Omega$.
> 부호 약속: 인장(tensile) 응력 $\sigma > 0$ 이면 격자가 늘어나 이온이 들어가기 쉬움 → 이온이 인장 영역으로 흐른다. 압축 영역에서는 반대.
> Fick 법칙은 화학 포텐셜 구배를 일반화한 형태로 확장된다: $\mathbf{J} = -\frac{Dc}{RT}\nabla\mu$. 농도 구배만 있는 한계에서 통상의 $\mathbf{J} = -D\nabla c$ 로 환원된다.
> 함의: Si 음극처럼 응력이 큰 시스템에서는 같은 농도 구배라도 응력 분포에 따라 확산 방향과 속도가 크게 달라지며, 코어-셸 구조의 응력 분포가 거꾸로 농도 분포를 변형시킨다.

Christensen-Newman 모델은 이 결합을 구면 입자에 대해 풀어, **갈바노스태틱 수**(galvanostatic number, $\text{Ga} = IR/(DFc)$)가 클수록 농도 구배와 응력이 모두 커진다는 것을 보였다. 큰 입자, 높은 C-rate, 낮은 $D$ 가 균열로 가는 지름길이다.

## 4. 입자 균열 (Particle Fracture)

응력이 임계값을 넘으면 균열이 핵생성하고 전파한다. Griffith 기준은 표면 에너지 $\gamma$ 와 임계 결함 크기 $a_c$ 사이의 관계를 준다.

$$\sigma_c = \sqrt{\frac{2 E \gamma}{\pi a_c}}$$

여기서 $E$는 영률. 이 식의 직관은 단순하다: 결함이 클수록 작은 응력에도 균열이 시작된다. 다결정 NMC 입자에서 입계가 가장 약한 결함처럼 작용하는 이유다.

균열 형식:
- **입내(intragranular)**: 단결정 또는 큰 결정립 내부 균열. 단결정 NMC에서 SEM으로 관찰.
- **입계(intergranular)**: 다결정 입자의 결정립 사이 균열. 다결정 NMC의 주된 열화 모드.
- **피로(fatigue)**: 반복 사이클로 임계 응력 미만에서도 누적 균열 성장.

균열의 진짜 문제는 **새 표면이 노출되는 순간 SEI가 재형성되며 추가 LLI가 발생**한다는 것이다. 이 피드백 루프는 사이클 노화 곡선의 가속 영역(knee point)을 만드는 주된 메커니즘 중 하나다.

## 5. 측정/관찰 기법

기계적 거동은 전기화학 데이터만으로는 직접 보이지 않는다. 다음 기법을 조합해야 한다.

- **In-situ XRD**: 격자 상수의 SOC 의존성을 실시간 추적. 이방성 변형률(anisotropic strain) 정량 가능. 싱크로트론을 쓰면 시간 분해능이 1 s 수준까지.
- **Dilatometry**: 셀 두께/직경 변화를 외부에서 측정. 매크로 팽창과 가스 발생을 함께 포착하지만 직접 분리하기 어려움.
- **Cross-section SEM/FIB**: post-mortem으로 입자 단면의 균열 형태 직접 관찰. 단결정/다결정 비교, 입계/입내 균열 구분.
- **나노압입(nanoindentation)**: 활물질의 영률, 경도를 직접 측정. SOC 의존성도 측정 가능.
- **Acoustic emission**: 균열 전파 시 발생하는 탄성파 검출. 사이클 중 균열 발생 타이밍을 알려주는 비파괴 방법.

이 기법들은 전기화학 데이터(특히 [V-Q 곡선의 히스테리시스](./01_voltage_curves.md), [GITT의 $D$](./02_polarization.md))와 결합해야 의미가 살아난다.

## 참고 문헌

- Christensen, J., Newman, J. *Journal of The Electrochemical Society* 153 (2006) A1019 — 응력-확산 결합 모델.
- Mukhopadhyay, A., Sheldon, B. W. *Progress in Materials Science* 63 (2014) 58–116 — 배터리 기계화학 종합 리뷰.
- Xu, R. et al. *Journal of The Electrochemical Society* 166 (2019) A3456 — NMC 입계 균열 메커니즘.
- Beaulieu, L. Y. et al. *Journal of The Electrochemical Society* 150 (2003) A1457 — Si 부피 변화 in-situ 관찰.
