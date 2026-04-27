# DFT 원리 (DFT Foundations)

## 1. 개요

다전자 슈뢰딩거 방정식은 $3N$ 차원 파동함수를 풀어야 하므로 전자 수가 늘면 곧바로 차원의 저주(curse of dimensionality)에 부딪힌다. 밀도 범함수 이론(density functional theory, DFT)은 이 문제를 우회하는 우아한 발상에서 출발한다 — 다체 파동함수 대신 3차원 함수인 전자 밀도 $n(\mathbf{r})$ 만으로 모든 바닥 상태 물성을 결정할 수 있다는 것이다.

직관적으로, 핵의 위치와 종류가 정해지면 외부 퍼텐셜 $v_{ext}(\mathbf{r})$ 가 정해지고, 그 안에서 전자가 어디에 어떻게 분포하는지(밀도 $n(\mathbf{r})$)가 결정되며, 이 분포만 알면 총 에너지·힘·자기 모멘트 등 모든 관측량이 원리적으로 계산된다. 차원이 $3N \to 3$ 으로 압축되므로 수백~수천 원자 시스템도 다룰 수 있다.

본 절은 DFT의 두 가지 정초 정리(Hohenberg-Kohn theorem)를 정리하고, 실제 계산이 가능하도록 만든 Kohn-Sham(KS) 처방, 그리고 SCF 사이클의 구조를 다룬다. 마지막으로 DFT의 구조적 한계 — 정확한 $E_{xc}[n]$ 이 미지인 점, KS 고유값이 준입자(quasiparticle) 에너지가 아닌 점 — 를 정리한다. 03 절(exchange-correlation)과 04 절(practical DFT)이 이 위에서 이어진다.

배터리 연구에서 DFT가 핵심인 이유는 [`01_quantum_basics.md`](./01_quantum_basics.md)의 Hartree-Fock과 비교하면 분명하다 — exchange와 correlation을 동시에 다루면서도 $O(N^3)$ 스케일링으로 큰 시스템에 적용 가능하다는 균형점이다.

## 2. Hohenberg-Kohn 정리

DFT의 정당성은 1964년 Hohenberg와 Kohn이 증명한 두 정리에 기반한다. 이 정리들은 "왜 밀도 하나로 충분한가"라는 질문에 형식적으로 답한다.

직관적으로 보면, 외부 퍼텐셜 $v_{ext}(\mathbf{r})$ 이 다르면 전자 밀도가 다르게 분포할 수밖에 없다. 거꾸로 밀도 $n(\mathbf{r})$ 가 같다면 외부 퍼텐셜도 같다(상수 차이까지). 즉 둘은 일대일 대응 관계이며, 따라서 밀도가 외부 퍼텐셜·해밀토니안·바닥 상태 파동함수까지 모두 유일하게 결정한다.

**제1정리(존재 정리)**: 비축퇴(non-degenerate) 바닥 상태에서 외부 퍼텐셜 $v_{ext}(\mathbf{r})$ 는 전자 밀도 $n(\mathbf{r})$ 에 의해 상수 차이까지 유일하게 결정된다.

$$v_{ext}(\mathbf{r}) \xleftrightarrow{1:1} n_0(\mathbf{r})$$

증명은 reductio ad absurdum: 같은 $n_0$ 를 주는 두 다른 $v_{ext}, v'_{ext}$ 가 있다고 가정하면 변분 원리로 $E_0 < E_0$ 가 되는 모순이 생긴다. 따라서 모든 바닥 상태 관측량은 $n(\mathbf{r})$ 의 범함수로 표현 가능하다.

**제2정리(변분 원리)**: 정의 가능한 에너지 범함수 $E[n]$ 가 존재하며, 정확한 바닥 상태 밀도 $n_0$ 에서 최솟값을 갖는다.

$$E[n] \geq E[n_0] = E_0, \qquad \text{for all valid } n(\mathbf{r}) \text{ with } \int n \, d^3r = N$$

이 두 정리를 합치면 "바닥 상태 밀도를 찾는 변분 문제"로 슈뢰딩거 방정식이 환원된다. 다만 이 정리들은 존재성을 보장할 뿐, 실제 $E[n]$ 의 형태를 알려주지는 않는다(이것이 DFT의 본질적 어려움의 출발점).

총 에너지를 다음과 같이 분해할 수 있다:

$$E[n] = T[n] + \int v_{ext}(\mathbf{r}) n(\mathbf{r}) d^3r + \frac{1}{2}\int\!\!\int \frac{n(\mathbf{r})n(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|} d^3r \, d^3r' + E_{xc}[n]$$

각 항: 운동 에너지 $T[n]$, 외부 퍼텐셜 항(핵-전자 인력 등), Hartree 에너지(고전적 Coulomb 반발), 교환-상관 에너지 $E_{xc}[n]$. 마지막 두 항만 명시적이고, $T[n]$ 과 $E_{xc}[n]$ 은 정확한 형태를 모른다. Thomas-Fermi 같은 초기 시도는 $T[n]$ 마저 단순 근사(uniform gas)로 처리해 정확도가 처참했다.

## 3. Kohn-Sham 방정식

Kohn과 Sham(1965)의 결정적 아이디어: 운동 에너지 $T[n]$ 을 정확히 계산할 수 있도록, 같은 밀도 $n(\mathbf{r})$ 를 만들어내는 가상의 비상호작용 전자계(fictitious non-interacting system)를 도입하자. 이 가상계의 운동 에너지를 $T_s[n]$ 이라 부르며, 이는 단일 입자 궤도 $\phi_i$ 의 합으로 정확히 표현된다.

직관적으로, 실제 시스템의 모든 어려움(상관, 정확한 운동 에너지)을 $E_{xc}[n]$ 안으로 몰아넣고, 나머지는 단일 입자 슈뢰딩거 방정식 형태로 풀어 numerically tractable하게 만든다. 그래서 KS-DFT는 본질적으로 "다체 문제를 단일 입자 문제로 mapping" 한 것이다.

$$\left[-\frac{\hbar^2}{2m_e}\nabla^2 + v_{eff}(\mathbf{r})\right]\phi_i(\mathbf{r}) = \epsilon_i \phi_i(\mathbf{r})$$

여기서 $\phi_i$ = Kohn-Sham 궤도(가상계의 단일 입자 파동함수), $\epsilon_i$ = KS 고유값, $v_{eff}$ = 유효 퍼텐셜. 점유된 KS 궤도로부터 밀도가 재구성된다:

$$n(\mathbf{r}) = \sum_{i=1}^{N} f_i |\phi_i(\mathbf{r})|^2$$

각 항: $f_i$ = 점유 수(0~2, spin 포함), $N$ = 전자 수.

운동 에너지 $T_s[n]$ 은 KS 궤도로 정확히 계산:

$$T_s[n] = -\frac{\hbar^2}{2m_e}\sum_i f_i \int \phi_i^*(\mathbf{r}) \nabla^2 \phi_i(\mathbf{r}) d^3r$$

이로써 미지의 항은 오직 $E_{xc}[n] = (T - T_s) + (V_{ee} - E_H)$ 하나로 압축된다. 즉 "운동 에너지 보정"과 "전자-전자 상호작용에서 Hartree를 뺀 나머지"를 모두 합친 양이며, 이것이 03 절의 LDA/GGA/hybrid가 다루는 바로 그 양이다.

## 4. 유효 퍼텐셜과 자기무모순

KS 방정식의 $v_{eff}$ 는 세 항으로 구성된다:

$$v_{eff}(\mathbf{r}) = v_{ext}(\mathbf{r}) + v_H(\mathbf{r}) + v_{xc}(\mathbf{r})$$

각 항:
- $v_{ext}(\mathbf{r}) = -\sum_I \frac{Z_I e^2}{4\pi\epsilon_0|\mathbf{r} - \mathbf{R}_I|}$ : 핵-전자 인력
- $v_H(\mathbf{r}) = \int \frac{n(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|} d^3r'$ : Hartree 퍼텐셜(고전적 Coulomb)
- $v_{xc}(\mathbf{r}) = \delta E_{xc}[n]/\delta n(\mathbf{r})$ : 교환-상관 퍼텐셜($E_{xc}$ 의 함수 미분)

여기서 결정적 관찰: $v_{eff}$ 가 밀도 $n(\mathbf{r})$ 에 의존하고, 밀도는 $\phi_i$ 에서 나오며, $\phi_i$ 는 $v_{eff}$ 가 들어간 KS 방정식을 풀어야 나온다. 즉 자기 자신을 통한 순환 의존성이 있어 한 번에 풀리지 않는다. 그래서 자기 일관(self-consistent) 반복이 필요하다.

> **관련 개념: 자기 일관 장(self-consistent field, SCF)**
> 자기 일관이란 "입력으로 넣은 밀도와 출력으로 나오는 밀도가 일치할 때까지 반복"을 의미한다. Hartree-Fock에서도 같은 구조이지만, KS-DFT에서는 $v_{xc}$ 가 추가되어 더 복잡한 비선형 fixed-point 문제가 된다. 단순한 직접 대입은 발산하기 쉬워, Pulay mixing(DIIS), Broyden mixing, linear mixing 등의 가속 기법이 거의 항상 함께 쓰인다.
> 수렴 판정의 두 기준: 에너지 변화 $|\Delta E| < 10^{-5}$ ~ $10^{-7}$ eV, 밀도 변화 $\int|\Delta n| d^3r < 10^{-4}$ ~ $10^{-6}$. 자기 시스템이나 강상관계는 수렴이 까다로워 수백 SCF step이 걸리기도 한다.

## 5. SCF 알고리즘

실제 KS-DFT 계산의 표준 사이클은 다음과 같다.

1. **초기 밀도 $n^{(0)}(\mathbf{r})$ 추정**: 보통 원자별 isolated atom 밀도의 중첩(superposition of atomic densities, SAD)으로 시작. 자기 시스템은 자기 모멘트도 명시적으로 초기화해야 함(04 절 참고).
2. **유효 퍼텐셜 구성**: $v_{eff}^{(k)} = v_{ext} + v_H[n^{(k)}] + v_{xc}[n^{(k)}]$.
3. **KS 방정식 풀기**: 고정된 $v_{eff}^{(k)}$ 안에서 단일 입자 고유값 문제를 풀어 $\{\phi_i^{(k+1)}, \epsilon_i^{(k+1)}\}$ 획득.
4. **새 밀도 계산**: $n^{(k+1)} = \sum_i f_i |\phi_i^{(k+1)}|^2$.
5. **수렴 판정**: $|n^{(k+1)} - n^{(k)}|$ 또는 $|E^{(k+1)} - E^{(k)}|$ 가 임계 이하면 종료. 아니면 mixing $n^{(k+1)} \leftarrow \alpha n^{(k+1)} + (1-\alpha)n^{(k)}$ (선형) 또는 DIIS 후 2단계로 회귀.

수렴이 끝난 SCF 결과로부터 총 에너지, 힘, 응력, 자기 모멘트, 밴드 구조, 부분 상태 밀도(PDOS) 등이 모두 추출된다. 구조 완화(geometry optimization)는 SCF 사이클을 이온 위치 업데이트로 한 번 더 감싼 이중 루프 형태다 — 외곽 루프에서 힘 $\mathbf{F}_I = -\partial E/\partial \mathbf{R}_I$ 을 0으로 만들 때까지 이온을 움직인다.

배터리 계산의 전형적 SCF 비용: 100 atom NMC 셀, 400 eV cutoff, $4\times 4\times 2$ k-point에서 SCF 한 번에 ~30~60 SCF step, wall-time ~수 시간(수십 코어 병렬). 이주 장벽(NEB, 05 절)이나 phonon은 이 비용에 image 수 또는 displacement 수만큼 곱해진다.

## 6. 변분 원리와 한계

KS-DFT가 "원리적으로 정확"하지만 "실제로는 근사"인 이유는 모두 $E_{xc}[n]$ 에 있다. Hohenberg-Kohn 정리는 그 존재를 보장하지만 형태를 주지 않으며, 우리가 쓰는 모든 functional(LDA, PBE, HSE 등)은 그것의 근사다.

**한계 1: $E_{xc}$ 의 정확한 형태가 미지**
이 문제는 03 절에서 본격적으로 다룬다. functional 선택이 곧 결과의 정확도를 결정하며, 시스템 의존성이 있다 — 산화물에는 GGA+U 또는 SCAN, 표면 흡착에는 vdW-DF, 절연체 밴드갭에는 hybrid가 권장되는 식이다.

**한계 2: KS 고유값 $\epsilon_i$ 는 준입자 에너지가 아님**
KS 궤도는 어디까지나 가상의 비상호작용계 궤도이며, $\epsilon_i$ 가 실제 광이온화 에너지/밴드 에너지와 일치할 보장은 없다. 유일한 예외는 Janak 정리에 의해 가장 높은 점유 KS 고유값(HOMO) $\approx$ 정확한 이온화 에너지의 음수다(완전한 functional의 경우).

이 한계의 대표적 결과가 **밴드갭 과소평가(band gap underestimation)**: PBE 같은 GGA는 실험 밴드갭의 50~70%만 재현한다. Si의 실험 갭 1.17 eV가 PBE에서 ~0.6 eV로 나오는 식이다. 원인은 derivative discontinuity의 부재 — 정확한 $E_{xc}$ 는 정수 전자수 사이에서 $v_{xc}$ 가 불연속이지만, 매끈한 LDA/GGA functional은 이를 표현하지 못한다. 해법: hybrid (HSE06), $G_0W_0$ (post-DFT 보정), DFT+U (강상관계용) 모두 03 절에서 다룬다.

**한계 3: 강상관계와 자기 상호작용 오차(self-interaction error, SIE)**
Hartree 항 $v_H$ 는 한 전자가 자기 자신과 만든 평균 밀도와 상호작용하는 비물리적 기여를 포함한다. 정확한 exchange면 정확히 상쇄되지만, LDA/GGA의 근사 exchange는 이를 완전히 지우지 못한다. 결과적으로 d/f 전자처럼 강하게 국재된 상태에서 비현실적 비편재화(over-delocalization)가 발생한다. NMC의 Ni 3d, 페로브스카이트의 Mn 3d, 란타나이드 4f 등이 대표 사례이며, DFT+U 또는 hybrid가 표준 처방이다.

**한계 4: 분산력(van der Waals)과 동역학**
표준 LDA/GGA는 점근적 $-C_6/r^6$ 인력을 재현하지 못한다 — 두 격리된 닫힌 껍질 분자 사이의 상관 에너지를 놓치기 때문. 흑연의 층간 결합, MOF, 분자 결정 등이 대표 실패 사례. 보정: Grimme의 D2/D3/D4 경험 보정, vdW-DF 비국소 functional, MBD(many-body dispersion). 또한 DFT는 본질적으로 정적 계산이므로 온도/엔트로피는 후처리(quasi-harmonic, MD)로 따로 다뤄야 한다.

종합하면, KS-DFT는 "원리적 정확성과 현실적 근사" 사이의 절묘한 trade-off이며, 다음 절들은 이 trade-off의 각 면 — functional 선택, 수치 매개변수, 배터리 응용 — 을 차례로 살핀다.

## 참고 문헌

- Hohenberg, P., Kohn, W. *Physical Review* 136 (1964) B864–B871 — DFT 정초 정리 원전.
- Kohn, W., Sham, L. J. *Physical Review* 140 (1965) A1133–A1138 — Kohn-Sham 방정식 원전.
- Parr, R. G., Yang, W. *Density-Functional Theory of Atoms and Molecules* (Oxford, 1989) — DFT의 화학적 표준 교과서.
- Martin, R. M. *Electronic Structure: Basic Theory and Practical Methods* (2nd ed., Cambridge, 2020) — 고체 DFT의 정석.
- Burke, K. *The ABC of DFT* (lecture notes, 2007) — Kieron Burke의 무료 DFT 입문.
- Perdew, J. P., Levy, M. *Physical Review Letters* 51 (1983) 1884–1887 — derivative discontinuity와 밴드갭 과소평가의 기원.
