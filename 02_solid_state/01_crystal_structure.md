# 결정 구조 (Crystal Structure)

## 1. 개요

배터리 소재의 거의 모든 1차 물성 — 이론 용량, 평균 전압, Li 확산도, 열적 안정성 — 은 결정 구조(crystal structure)에서 거의 직접 결정된다. 같은 화학식이라도 어떤 골격(framework)에 어떤 자리(site)에 Li이 들어가느냐에 따라 V-Q 곡선의 plateau가 길어지기도 짧아지기도 하며, $D_\text{Li}$가 4–5자리수 차이가 나기도 한다.

따라서 본 절은 다음 사슬을 한 번에 다룬다: (i) 격자(lattice)와 단위 격자(unit cell)의 정의, (ii) 공간군(space group)으로 대칭성 표기, (iii) Miller 지수와 회절면, (iv) 배터리 양극 4대 구조(rock-salt / layered / spinel / olivine)의 골격, (v) 골격의 기하학이 곧 Li 채널의 차원성을 결정한다는 사실.

이 흐름은 [`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)에서 다룬 V-Q 곡선의 모양 — plateau / slope의 갈림 — 이 사실은 결정 구조가 허용하는 상(phase)의 종류와 그 사이의 자유 에너지 관계로 환원된다는 점과 직접 연결된다.

## 2. Bravais 격자와 단위 격자

결정(crystal)은 **격자(lattice)** 와 **기저(basis)** 의 곱이다. 격자는 공간을 빈틈없이 채우는 점들의 집합이고, 기저는 각 격자점에 매달려 있는 원자 배치이다. 격자 자체는 무한히 많아 보이지만, 3차원에서 가능한 **본질적으로 다른 격자**는 정확히 14개이며 이를 **Bravais 격자(Bravais lattice)** 라 한다.

직관적으로 7개 결정계(crystal system: cubic, tetragonal, orthorhombic, hexagonal, trigonal, monoclinic, triclinic)에 단순(P)/체심(I)/면심(F)/저심(C) 같은 추가 격자점을 결합한 결과가 14개이며, 이중 일부는 결정계 내에서 같은 대칭성을 주므로 제거되어 14가 된다.

단위 격자(unit cell)는 격자 상수 $a, b, c$ (변의 길이)와 $\alpha, \beta, \gamma$ (변 사이 각도)로 기술된다. 부피는 일반적으로

$$V = abc\sqrt{1 - \cos^2\alpha - \cos^2\beta - \cos^2\gamma + 2\cos\alpha\cos\beta\cos\gamma}$$

로 주어지며, cubic($a=b=c$, $\alpha=\beta=\gamma=90^\circ$)에서는 $V = a^3$. 격자 상수가 충방전 도중 어떻게 움직이는가(예: layered NMC의 $c$-축 팽창/수축)는 mechanochemistry와 직결된다.

## 3. 공간군과 Wyckoff 위치

격자의 병진 대칭(translation) 외에 회전·반사·반전·나선축(screw axis)·glide plane을 모두 포함한 대칭 연산의 집합을 **공간군(space group)** 이라 한다. 3차원 결정에서 가능한 공간군은 정확히 **230개**이다.

표기에는 두 관습이 혼용된다. **Hermann-Mauguin** 표기는 $R\bar{3}m$, $Fd\bar{3}m$, $Pnma$ 처럼 첫 글자(P/I/F/A/B/C/R)가 격자 중심성, 뒤따르는 기호가 회전축·반사면 정보를 준다. **Schoenflies** 표기는 $D_{3d}^5$ 처럼 점군 + 위첨자 형태로 쓴다. 배터리 문헌은 거의 항상 Hermann-Mauguin을 쓴다.

각 공간군 안에서 원자가 점유할 수 있는 **궤도(orbit)** 를 **Wyckoff 위치(Wyckoff position)** 라 부른다. 표기는 "다중도 + 문자" 형태(예: $3a$, $3b$, $6c$, $9e$). 다중도(multiplicity)는 단위 격자당 그 자리에 들어가는 원자 수, 문자는 해당 자리의 site symmetry 라벨이다.

예: layered LiCoO₂ ($R\bar{3}m$, no. 166)에서 Li은 $3b$ 자리, Co는 $3a$ 자리, O는 $6c$ 자리에 위치한다. NMC에서 Li/Ni 사이의 cation mixing은 결국 $3a$ 자리에 Ni이, $3b$ 자리에 Li 대신 Ni이 점유하는 antisite 결함으로 정의된다(상세 결함 화학은 [`./03_defect_chemistry.md`](./03_defect_chemistry.md) 참조).

## 4. Miller 지수와 회절면

결정 안의 한 평면은 결정축 절편의 역수 비로 표기되며, 이를 **Miller 지수(Miller indices)** $(hkl)$ 라 한다. 평면이 $a/h$, $b/k$, $c/l$ 자리에서 각 축을 자른다. 음수는 위에 막대를 긋는다($\bar{h}$).

직관적으로 $(100)$은 $a$축에 수직한 면, $(111)$은 세 축을 동일 거리에서 자르는 대각면이다. 결정의 회절(diffraction)은 이 평면들 사이의 간격 $d_{hkl}$을 직접 본다.

cubic 결정의 경우 평면 간격은

$$\frac{1}{d_{hkl}^2} = \frac{h^2 + k^2 + l^2}{a^2}$$

로 단순하다. 일반 격자에서는 행렬 형태의 reciprocal metric tensor를 써야 한다. Bragg 조건 $n\lambda = 2 d_{hkl} \sin\theta$ 를 통해 X선 회절(XRD) 패턴의 $2\theta$ 위치가 곧 격자 상수와 연결된다.

배터리 분석에서 자주 쓰는 자리:
- layered NMC의 $(003)$ 피크는 $c$-축 변화 — Li 탈리에 따른 슬래브 간격 — 를 직접 추적.
- $(104)$ 와 $(003)$ 의 강도비 $I_{003}/I_{104}$ 는 Li/Ni cation mixing 정도의 정성 지표(높을수록 ordering 양호).
- spinel에서는 $(111)$, olivine에서는 $(020)$, $(311)$ 등이 진단 피크.

## 5. 배터리 소재 대표 결정 구조

배터리 양극은 사실상 4가지 구조 모티프 위에 놓여 있다. 모두 산소가 면심 또는 hexagonal close packing(HCP) 비슷한 골격을 만들고, TM/Li이 빈 공간(팔면체/사면체)을 채우는 형태이다.

> **관련 개념: 팔면체 자리와 사면체 자리 (Octahedral / Tetrahedral Site)**
> 산소 close packing 격자(FCC 또는 HCP)의 빈 공간에는 두 종류가 있다. 팔면체(octahedral, $O_h$) 자리는 6개 산소가 둘러싸며, 격자당 cation 1개당 1개씩 존재. 사면체(tetrahedral, $T_d$) 자리는 4개 산소가 둘러싸며 cation당 2개씩 존재. 즉 FCC 산소 1개당 octahedral 1 + tetrahedral 2가 비어 있다. 어떤 자리가 채워지느냐가 곧 구조 이름을 결정한다 — rock-salt = 모든 octahedral 자리 채움, spinel = octahedral 절반 + tetrahedral 1/8 채움, layered = octahedral 자리만 layer-by-layer 채움. 사면체 자리가 작아 큰 cation은 들어가기 힘들며, 이 size mismatch가 spinel 안정성의 원천 중 하나다.

### 5.1 Rock-salt (NaCl-type, $Fm\bar{3}m$)

산소가 FCC, cation이 모든 octahedral 자리를 채우는 가장 단순한 구조. 단위 격자 $a \approx 4.1$–$4.4$ Å. NMC의 충전 후기에 layered → rock-salt-like 표면 재구성이 발생하면 표면 저항이 급증하므로, rock-salt는 "비활성 종착점"으로 자주 등장한다. Li/Ni의 cation 자리 구분이 사라지면서 Li 확산 채널이 차단되는 것이 핵심이다.

### 5.2 Layered ($R\bar{3}m$, $\alpha$-NaFeO₂ type)

LiCoO₂, LiNiO₂, NMC811, NCA의 모체 구조. Rock-salt의 cation 자리를 한 층은 Li, 다음 층은 TM으로 분리한 ordered rock-salt 변종이며, 산소-TM-산소-Li-산소-TM-... 순서로 적층된다. Li은 $3b$ octahedral, TM은 $3a$ octahedral, O는 $6c$. 격자 상수는 hexagonal 표기로 $a \approx 2.85$ Å, $c \approx 14.05$ Å (LiCoO₂ 기준).

Li 확산은 TM 층 사이의 2D 평면에서 일어난다 (octahedral → tetrahedral → octahedral 의 divacancy hopping). $D_\text{Li} \sim 10^{-9}$–$10^{-11}$ cm²/s 수준. Ni 비율↑ → cation mixing↑ (Ni²⁺ 이온 반경이 Li⁺와 거의 같음, 0.69 vs 0.76 Å), 이것이 Ni-rich NMC의 합성·열안정 난점의 원천이다.

### 5.3 Spinel ($Fd\bar{3}m$, $AB_2O_4$ type)

LiMn₂O₄ (LMO), LiNi₀.₅Mn₁.₅O₄ (high-voltage spinel)의 골격. 산소가 FCC, A cation(Li)이 tetrahedral $8a$ 자리, B cation(Mn)이 octahedral $16d$ 자리. 단위 격자 $a \approx 8.24$ Å (LMO).

채워지지 않은 octahedral $16c$ 자리가 비어 있으며, Li 확산은 $8a \to 16c \to 8a$ 의 3차원 통로를 통해 일어난다. 이 3D 채널 덕분에 spinel은 layered보다 본질적으로 빠른 확산이 가능하지만, Mn³⁺ 의 Jahn-Teller 왜곡(상세는 [`./02_band_theory.md`](./02_band_theory.md) 참조)으로 상온 Mn 용출과 cycling 도중 cubic → tetragonal 변형이 발생한다.

### 5.4 Olivine ($Pnma$, $AB$XO₄ type)

LiFePO₄ (LFP)의 골격. 산소가 distorted HCP, Fe이 octahedral $4c$, Li이 octahedral $4a$, P가 tetrahedral $4c$. 격자 상수 $a \approx 10.33$, $b \approx 6.01$, $c \approx 4.69$ Å.

Li은 **$b$-축([010]) 방향의 1D 채널** 로만 확산한다. 다른 축 방향으로는 통로가 없거나 매우 좁다. 이 1D성이 LFP의 양면적 특징을 만든다: (i) PO₄ tetrahedron 의 inductive effect 로 ~3.43 V 의 안정한 plateau, (ii) 본질적으로 낮은 $D_\text{Li}$, (iii) 단 하나의 채널이라도 Fe$_\text{Li}$ antisite로 막히면 입자 전체가 비활성화. 그래서 LFP 는 거의 항상 carbon coating + nanosizing 으로 만든다.

## 6. 구조와 성능 연결: 채널 차원성과 $D_\text{Li}$

세 골격을 채널 차원성 관점에서 비교하면 구조-성능 연결이 한눈에 드러난다.

| 구조 | Li 채널 차원 | 대표 $D_\text{Li}$ (cm²/s) | 막힘 취약성 |
|------|-------------|---------------------------|-------------|
| Olivine (LFP) | 1D ([010]) | $10^{-13}$–$10^{-11}$ | 매우 높음 (단일 antisite로 채널 차단) |
| Layered (NMC) | 2D (TM 층 사이) | $10^{-11}$–$10^{-9}$ | 중간 (Ni$_\text{Li}$ mixing) |
| Spinel (LMO) | 3D ($8a$–$16c$ 망) | $10^{-10}$–$10^{-9}$ | 낮음 (우회 가능) |

채널 차원이 낮을수록 입자 크기를 키우는 데 한계가 있고(확산 길이가 곧 시간 지연), 도펀트/결함이 통로를 차단할 위험이 커진다. 반대로 1D 채널은 통계적으로 평균화가 안 되므로 단일 입자 단위에서 충방전이 매우 비균질해지며, 이것이 LFP의 mosaic 모델([`./../06_battery_operation/01_voltage_curves.md`](../06_battery_operation/01_voltage_curves.md)에서 다룬 입자 단위 부분-2상 거동)의 구조적 기원이다.

또한 결정 구조는 충방전 중 부피 변화 양상도 결정한다. Layered는 $c$-축 anisotropic 팽창(Li 탈리 시 산소 층 사이 반발 증가로 $c$↑, 이후 강한 탈리에서 $c$↓)을 보이고, spinel은 비교적 isotropic, olivine은 거의 zero-strain (LFP↔FP 부피 변화 ~6%). 이 차이는 mechanochemistry 분석에서 직접 활용된다.

마지막으로 strain energy 와 surface energy 의 상대적 크기가 결정 구조 안에서 어떤 상이 안정한가까지 좌우한다. 예: LFP 는 nanosize 영역에서 surface energy 기여로 인해 Li-poor / Li-rich miscibility gap 이 좁아지고, 이것이 [`./05_phase_diagrams.md`](./05_phase_diagrams.md) 에서 다룰 size-dependent 상도의 원형이 된다.

## 참고 문헌

- West, A. R. *Solid State Chemistry and its Applications* (2nd ed., Wiley, 2014) — 결정 구조와 공간군 표기 표준 처리.
- Hahn, T. (ed.) *International Tables for Crystallography, Vol. A* (Springer, 2006) — 230 공간군 / Wyckoff 위치 정전.
- Whittingham, M. S. *Chemical Reviews* 104 (2004) 4271–4301 — Lithium battery cathode materials의 결정 구조 리뷰.
- Padhi, A. K., Nanjundaswamy, K. S., Goodenough, J. B. *Journal of the Electrochemical Society* 144 (1997) 1188–1194 — LiFePO₄ olivine 구조와 1D Li 채널.
- Reimers, J. N., Dahn, J. R. *Journal of the Electrochemical Society* 139 (1992) 2091–2097 — LiCoO₂의 layered 구조 변화 in situ XRD.
