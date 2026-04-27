# 실용 DFT (Practical DFT: Pseudopotentials and Numerics)

## 1. 개요

이론으로서의 DFT는 [`02_dft_foundations.md`](./02_dft_foundations.md)에서 마무리되지만, 실제 코드(VASP, Quantum ESPRESSO, GPAW, ABINIT 등)에서 결과를 얻기까지는 수치적 선택이 줄지어 있다. 그 선택들 — pseudopotential, plane-wave cutoff, k-point mesh, smearing, 수렴 기준 — 이 모두 결과의 정확도와 계산 비용을 결정한다.

직관적으로, "DFT 계산이 틀렸다"고 느낄 때 의심해야 할 첫 자리는 functional이 아니라 이런 수치 매개변수인 경우가 많다. cutoff을 200 eV 낮게 잡았거나, k-point을 절반으로 줄였거나, 자기 모멘트를 초기화하지 않았거나, vacuum이 부족했거나 — 모두 흔한 함정이다.

본 절은 plane-wave + pseudopotential 코드(가장 보편적인 고체 DFT 환경)를 기준으로, 실무에서 반드시 통과해야 할 수렴 테스트와 자주 만나는 함정을 정리한다. 마지막으로 격자/이온 완화 절차와 자기 시스템·진공 처리의 표준 워크플로를 다룬다.

핵심 메시지: "DFT 결과의 정확도는 functional 선택만큼이나 수치 수렴에 달려 있다." 한 매개변수의 부족 수렴이 다른 매개변수의 정확한 선택을 모두 무의미하게 만든다.

## 2. Pseudopotential vs all-electron

원자 안의 전자는 두 종류로 나눌 수 있다. **코어 전자**는 핵 가까이에 단단히 묶여 있어 화학 결합에 거의 참여하지 않는 비활성 전자(예: Li의 1s, Co의 [Ar] 코어). **가전자**는 결합·산화 환원에 직접 참여하는 외각 전자(Li의 2s, Co의 3d/4s).

직관적으로, 결합과 전기화학을 결정하는 것은 가전자뿐이므로, 코어 전자는 평균적으로 처리하고 가전자만 명시적으로 풀면 비용이 크게 줄어든다. 동시에 코어 영역에서 격렬히 진동하는 파동함수(직교성 유지를 위해 nodal structure를 가짐)는 plane-wave로 표현하기 매우 비효율적이므로, 그 영역을 부드럽게 만드는 것이 plane-wave 코드의 사실상 필수 조건이다.

이를 처리하는 두 가지 표준 방법:

**Norm-conserving (NC) pseudopotential**: 컷오프 반경 $r_c$ 내에서 슈도 파동함수가 부드럽도록 다시 그리되, 내부의 전하 적분이 원래 all-electron 값과 같도록(norm conservation) 강제. Hamann, Troullier-Martins 등이 표준 형태. 정확하지만 cutoff이 높이 필요.

**Ultrasoft pseudopotential (USPP)** / **PAW (Projector Augmented Wave)**: norm conservation을 완화하는 대신 추가 augmentation charge로 보정. PAW는 Blöchl(1994)이 제안한 형태로, all-electron 정확도를 회복하면서도 부드러운 슈도 파동함수의 이점을 유지한다. **VASP의 기본은 PAW**이며, 현대 plane-wave 코드의 사실상 표준이다.

PAW 변환의 핵심 식:

$$|\psi_n\rangle = |\tilde{\psi}_n\rangle + \sum_i \left(|\phi_i\rangle - |\tilde{\phi}_i\rangle\right)\langle \tilde{p}_i | \tilde{\psi}_n\rangle$$

각 항: $|\tilde{\psi}_n\rangle$ = 부드러운 슈도 파동함수, $|\phi_i\rangle, |\tilde{\phi}_i\rangle$ = all-electron/슈도 부분파(partial wave), $|\tilde{p}_i\rangle$ = projector. 코어 영역 안에서만 보정이 일어나므로 외부에서는 슈도와 all-electron이 같다.

### 가전자 선택 (semicore states)

$+U$ 가 강하거나 산화 상태가 자주 변하는 전이 금속에서는 보통 "p semicore"를 명시적 가전자에 포함해야 한다. 예: Ni의 표준 PAW는 [Ar]3d⁸4s² (10 valence)이지만, p semicore 포함 PAW는 3p⁶3d⁸4s² (16 valence)로 더 무겁다. NMC, LFP 같은 양극 계산에서는 보통 표준 PAW로 충분하나, 압력 의존성·core-level shift을 보려면 p semicore가 필요하다.

배터리 calc에서 자주 보는 PAW 선택:
- Li: `Li_sv` (1s2s, 3 valence) 권장. 표준 `Li`(1s²)는 부정확.
- O: `O` (2s²2p⁴, 6 valence)
- Co/Ni/Mn/Fe: 표준 PAW (3d/4s만)으로 대부분 충분.
- F: `F` (2s²2p⁵)
- P: `P` (3s²3p³)
- Si: `Si` 또는 압력 계산엔 `Si_GW`

## 3. Plane-wave 기저와 cutoff

주기 결정에서 KS 궤도는 Bloch 정리에 의해 다음 형태:

$$\phi_{n\mathbf{k}}(\mathbf{r}) = \frac{1}{\sqrt{V}}\sum_{\mathbf{G}} c_{n\mathbf{k}}(\mathbf{G}) \, e^{i(\mathbf{k}+\mathbf{G})\cdot\mathbf{r}}$$

여기서 $\mathbf{G}$ = 역격자 벡터, $\mathbf{k}$ = Brillouin zone 내 k-point. plane-wave 기저는 직교 정규이고 모든 점에서 균일한 정확도를 주며 코드 구현이 단순하다는 장점이 있다(분자에서 표준인 Gaussian 기저는 atom-centered).

무한 합은 실제로는 운동 에너지가 $E_{cut}$ 이하인 plane-wave만 남기고 잘라낸다.

$$\frac{\hbar^2}{2m_e}|\mathbf{k}+\mathbf{G}|^2 \leq E_{cut}$$

$E_{cut}$ 가 클수록 정확하지만 plane-wave 수가 $E_{cut}^{3/2}$ 로 증가하므로 비용이 빠르게 늘어난다.

### Cutoff 권장값과 수렴 테스트

배터리 산화물의 일반 권장:
- 일반 산화물(LiCoO₂, NMC, LFP): **400~500 eV**
- 자기 시스템 또는 정밀 응력 계산: **500~600 eV**
- F가 들어간 시스템(LiF, PVDF): **520 eV 이상**(F의 hard PAW)
- O 2p semicore가 활성: **600 eV**
- van der Waals 보정과 격자 최적화: **520~600 eV** (응력은 cutoff에 매우 민감)

수렴 테스트 표준 절차:
1. 작은 unit cell 확보(원시 격자, primitive cell).
2. cutoff을 300, 400, 500, 600, 700 eV로 변경하면서 총 에너지/격자 상수/원자력 측정.
3. 두 인접한 cutoff 사이의 에너지 변화가 1 meV/atom 이하, 또는 격자 상수 변화 0.001 Å 이하면 수렴.
4. 수렴된 cutoff을 모든 후속 계산에 일관되게 사용.

VASP 추천 관행: **`ENCUT = 1.3 × max(ENMAX of all PAW)`** 가 일반적 경험칙. 격자 상수/응력 정밀도가 필요하면 `PREC = Accurate`로 설정해 추가 안전 margin을 둠.

## 4. k-point 샘플링

Brillouin zone에 대한 적분(밀도, 에너지 등)을 유한한 k-point grid로 근사한다. 가장 표준적인 방식은 **Monkhorst-Pack mesh** (1976)로, BZ를 균일하게 분할하고 대칭으로 irreducible 부분만 명시적으로 계산한다.

$$\mathbf{k}_{n_1 n_2 n_3} = \sum_i \frac{2n_i - N_i - 1}{2N_i}\mathbf{b}_i$$

여기서 $\mathbf{b}_i$ = 역격자 기저 벡터, $N_i$ = $i$ 방향 분할 수.

직관적으로, 격자가 작을수록(역격자가 클수록) 더 촘촘한 k-point grid가 필요하다. 즉 격자 상수의 곱 $|\mathbf{a}_i| \times N_i$ 가 일정 길이 이상이어야 수렴.

### 격자별 k-point 권장

배터리 표준 시스템의 권장 grid:
- 작은 primitive cell (Li bcc, MgO 등, $a \approx 4$ Å): **$8 \times 8 \times 8$ ~ $12 \times 12 \times 12$**
- LCO/NMC primitive (a≈2.8 Å, c≈14 Å, hexagonal): **$8 \times 8 \times 4$**
- LFP orthorhombic ($a \approx 10$ Å): **$3 \times 6 \times 6$**
- $2 \times 2 \times 1$ supercell (~100 atom): **$2 \times 2 \times 2$ ~ $4 \times 4 \times 2$**
- Slab (NEB, 표면): **k-perpendicular = 1, in-plane은 격자 길이에 반비례**
- Phonon supercell (~200 atom): **$\Gamma$ 또는 $2 \times 2 \times 2$**

수렴 기준은 cutoff과 동일하게 1 meV/atom. **금속/half-metal**은 절연체보다 훨씬 dense한 mesh가 필요하며 (Fermi 표면 주변 적분), Mn/Ni 활성 NMC도 충전 상태에서 부분 금속성을 가질 수 있다.

### Smearing

금속에서는 Fermi 표면이 grid 점에 정확히 떨어지지 않아 점유 수가 불연속이 되어 SCF가 진동한다. 이를 매끄럽게 만드는 **smearing** 기법이 필수.

- **Gaussian smearing** ($\sigma \approx 0.05$ eV): 단순, 절연체에는 사용 X.
- **Methfessel-Paxton (MP)** order 1, $\sigma = 0.1$ ~ $0.2$ eV: 금속의 표준. 에너지 보정 필요.
- **Tetrahedron with Blöchl correction**: DOS, band structure, 정밀 정적 계산에 권장. SCF 후 마지막 단계에서만 사용.
- **Fermi-Dirac** ($T \approx 300$~1000 K): 자기 시스템 SCF 안정화에 효과적.

배터리 양극은 보통 충전 상태에서 부분 금속성을 보일 수 있으므로 Methfessel-Paxton $\sigma = 0.1$ eV로 시작하고, 정밀 에너지가 필요하면 $\sigma$ 외삽($\sigma \to 0$) 또는 tetrahedron으로 전환.

## 5. 수렴 검증과 격자/이온 완화

DFT 계산의 표준 검증 매트릭스 — 실무에서 빼먹으면 큰 오류로 이어지는 항목들:

1. **$E_{cut}$ 수렴**: 위의 절차. 1 meV/atom 기준.
2. **k-point 수렴**: 동일 기준. 금속이라면 더 엄격.
3. **Supercell 크기**: 결함, 흡착, polaron 같은 국소 현상은 supercell이 충분히 커야 결함-이미지 상호작용이 무시 가능. 보통 결함 사이 거리 $\geq 10$ Å.
4. **Vacuum 두께**: 슬랩/표면 계산에서 표면-이미지 상호작용 차단. 보통 **15 Å 이상**, 쌍극자 모멘트가 큰 경우 20 Å + dipole correction.
5. **Smearing 외삽**: 금속에서 $E(\sigma=0)$ 외삽으로 0.01 eV 수준 보정.
6. **Spin polarization**: 자기 시스템에서 항상 활성화(`ISPIN=2` in VASP).

### 격자/이온 완화 절차

새 구조의 안정화는 보통 **두 단계**로 한다:

1. **격자 + 이온 완화** (relax cell): cutoff을 평소보다 30~50% 높여(`PREC=Accurate`, Pulay stress 보정), 격자 벡터와 이온 위치를 동시에 최적화. 응력 텐서 $\sigma_{\alpha\beta} \to 0$ 까지.
2. **이온 완화** (fix cell, relax ions): 1단계 완화 결과를 출발점으로 격자는 고정하고 이온만 움직여 잔여 힘 $|\mathbf{F}_I| \to 0$. 보통 $|\mathbf{F}| < 0.01$ ~ $0.02$ eV/Å.
3. **정적 계산** (single-point): 완화된 구조에서 $E_{cut}$ 정상값, dense k-point으로 단일 SCF. 이게 진짜 사용할 에너지/DOS/charge density.

격자 정수를 고정해야 하는 자리: NEB(이주 경로 시뮬레이션 중 격자 변경 금지), 동일한 supercell 비교(formation energy), 실험 격자 강제 사용 시. 정수 fix와 relax를 섞으면 응력이 일관되지 않아 비교 불가능.

> **관련 개념: Pulay stress와 격자 최적화**
> plane-wave 기저는 격자 변화에 따라 $E_{cut}$ 안의 plane-wave 수가 이산적으로 바뀐다. 이로 인한 가짜 응력이 Pulay stress이며, cutoff을 충분히 높여야 무시 가능하다. 표준 우회법: (i) 격자 최적화 단계만 cutoff을 1.3배 더 높여 둠, (ii) 정적 계산은 기본 cutoff으로, (iii) 격자가 거의 수렴했다고 판단되면 cutoff을 정상값으로 내려 1단계 완화를 한 번 더 반복. 이 절차로 0.01 Å 수준 정확도를 안정적으로 얻는다.

## 6. 흔한 실수와 진단

배터리 DFT 계산에서 자주 만나는 함정과 그 신호:

**1. 자기 모멘트 초기화 부족**: 자기 시스템에서 spin을 0으로 시작하면 비자기 해(paramagnetic minimum)에 갇히는 일이 흔하다. 신호: 실험적으로 자기인데 계산 자기 모멘트가 ~0, 에너지가 비현실적으로 낮음. 처방: NMC라면 `MAGMOM = Ni:2 Mn:3 Co:0 ...` 같은 명시적 초기화. 항-반자성(antiferromagnetic) 가능성도 고려.

**2. Ferromagnetic vs antiferromagnetic vs ferrimagnetic 경쟁**: LiNiO₂, NiO 등은 AFM이 바닥 상태이지만 FM이 SCF에서 더 안정해 보일 수 있다. 처방: 여러 초기 magnetic 배열을 시험하고 그중 가장 낮은 에너지 채택.

**3. 수렴 미달 cutoff/k-point**: 신호 — 같은 시스템 두 번 돌리니 에너지가 5 meV/atom 이상 차이, 격자 상수가 0.01 Å 흔들림. 처방 — 무조건 수렴 테스트부터.

**4. Vacuum 부족**: 슬랩에서 vacuum이 10 Å 미만이면 표면-이미지 dipole 상호작용으로 표면 에너지가 비현실적. 처방 — 15 Å 이상 + dipole correction (`LDIPOL=T, IDIPOL=3` in VASP).

**5. NEB image 끝점 불일치**: NEB의 양 끝점이 같은 supercell·같은 ionic 좌표 ordering이 아니면 경로가 망가진다. 처방 — 끝점은 항상 명시적으로 같은 INCAR/POSCAR 형식으로 별도 완화.

**6. 격자 매개변수 vs 이온 완화 혼동**: cell relax vs ion relax 결과를 비교하면 안 된다. formation energy 같은 양은 모두 같은 수준의 완화 후에 비교.

**7. Pseudopotential 일관성**: PBE PAW와 LDA PAW를 섞어 쓰지 말 것. functional 변경 시 PAW도 같이 바꿔야 함.

**8. Symmetry oversimplification**: VASP의 `ISYM=2` 가 자동 대칭화하지만, magnetic ordering이 대칭을 깨면 잘못된 결과. 처방 — 자기 시스템에서는 `ISYM=0` 또는 `ISYM=-1` 권장.

**9. Bader/charge analysis grid 부족**: charge density 분석은 fine FFT grid (`PREC=Accurate` + `LREAL=.FALSE.` 또는 dense `NGXF`)가 필요. 너무 거친 grid에서는 산화 상태가 부정확.

**10. DFT+U $U$ 값 부주의 사용**: Wang et al.의 표 값은 ground-state ordering·산화물 형성 에너지에 피팅된 것으로, 모든 양에 보편적으로 정확하지 않다. 새 시스템에서는 linear-response $U$ 또는 작은 $U$ 영역 sweep으로 검증 권장.

**진단 체크리스트** (계산 결과를 신뢰하기 전):
- [ ] cutoff/k-point 수렴 테스트 완료, 에너지 수렴 < 1 meV/atom
- [ ] 자기 모멘트 초기화, ISPIN=2, 여러 magnetic ordering 시도
- [ ] 격자 + 이온 완화 → 정적 calc 2단계 절차
- [ ] 잔여 힘 < 0.02 eV/Å
- [ ] vacuum (슬랩) > 15 Å, dipole correction 활성화
- [ ] PAW pseudopotential의 권장 ENMAX 확인, Li_sv 사용
- [ ] DFT+U 사용 시 표 출처 명시, 가능하면 sensitivity 테스트

이 체크리스트가 통과되면 비로소 결과를 functional 효과(03 절)나 물리적 해석으로 옮길 수 있다.

## 참고 문헌

- Blöchl, P. E. *Physical Review B* 50 (1994) 17953 — PAW method 원전.
- Kresse, G., Joubert, D. *Physical Review B* 59 (1999) 1758 — PAW의 VASP 구현.
- Monkhorst, H. J., Pack, J. D. *Physical Review B* 13 (1976) 5188 — k-point mesh 표준.
- Methfessel, M., Paxton, A. T. *Physical Review B* 40 (1989) 3616 — MP smearing.
- Kresse, G., Furthmüller, J. *Computational Materials Science* 6 (1996) 15 — VASP 코드.
- Giannozzi, P. et al. *Journal of Physics: Condensed Matter* 21 (2009) 395502 — Quantum ESPRESSO.
- Lejaeghere, K. et al. *Science* 351 (2016) aad3000 — DFT 코드 간 격자 상수/총 에너지 비교 벤치마크.
