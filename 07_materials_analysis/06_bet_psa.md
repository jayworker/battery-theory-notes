# BET와 PSA (Surface Area & Particle Size Analysis)

## 1. 개요

비표면적(specific surface area, $\text{m}^2/\text{g}$)과 입자 크기 분포(particle size distribution, PSD)는 배터리 활물질의 가장 기본적인 정량 지표이며, 충방전 동역학·전해질 부반응·코팅 두께·슬러리 분산 거동 모두를 결정한다. 두 측정은 분말 시료 단계에서 거의 늘 함께 보고된다.

본 절은 N₂ 흡탈착 등온선(adsorption isotherm)에서 BET 식으로 비표면적을 추출하는 절차, BJH(Barrett-Joyner-Halenda)로 메조포어(mesopore) 분포를 정량하는 방법, 그리고 laser scattering(Mie 이론)으로 입자 크기 분포를 측정하는 PSA의 원리·해석을 다룬다. SEM 통계와의 차이점, 결과를 비판적으로 읽는 방법도 함께 정리한다.

## 2. N₂ 흡탈착 등온선 (Adsorption Isotherm)

비표면적 측정의 기본 원리는 시료 표면에 N₂ 가스를 일정 온도(77 K, 액체 N₂)에서 흡착시키고, 상대압 $P/P_0$ ($P_0$ = N₂ 포화증기압) 함수로 흡착량을 측정하는 것이다. 표면적이 클수록 같은 압력에서 흡착량이 많다.

직관: 시료 표면을 기체 분자가 모노레이어로 덮을 때까지 필요한 분자 수를 세면, 분자 하나가 차지하는 면적($\sigma_{\text{N}_2} = 0.162 \text{ nm}^2$)을 곱해서 표면적을 얻는다.

IUPAC은 등온선 모양으로 6가지 type(I–VI)을 분류한다:
- **Type I**: micropore(<2 nm) 풍부, 낮은 $P/P_0$에서 급격한 흡착 후 평탄화. 활성탄, MOF.
- **Type II**: 비다공성/macropore(>50 nm), S자 형태. 일반 분말.
- **Type III**: 약한 흡착-흡착재 상호작용, drug 등 특수 케이스.
- **Type IV**: 메조포어(2–50 nm), Type II 모양 + 중간 압력에서 hysteresis loop. **배터리 활물질 대다수**.
- **Type V**: 약한 상호작용 + 메조포어, 드물다.
- **Type VI**: layered uniform 표면, stepped isotherm.

NMC 같은 응집된 secondary particle은 보통 Type IV이며, hysteresis loop의 모양(H1–H4)이 포어 형태(원통/병목/슬릿)를 알려준다.

## 3. BET 식 — 비표면적 추출

Brunauer-Emmett-Teller(BET) 식은 multilayer adsorption 모델을 풀어 monolayer 흡착량 $V_m$ 을 등온선에서 추출한다. Langmuir(monolayer만)를 multilayer로 확장한 것이며, 핵심 가정은 (i) 첫 층은 표면과 흡착 에너지 $E_1$, (ii) 그 이상은 응축열 $E_L$ 로 일정, (iii) 모든 사이트가 동등.

직관: 표면에 첫 분자가 강하게 붙고, 그 위에 또 분자가 약하게 쌓인다. 첫 층만 골라내면 분자 면적 × 분자 수 = 표면적.

$$\frac{1}{V[(P_0/P) - 1]} = \frac{1}{V_m c} + \frac{c-1}{V_m c}\frac{P}{P_0}$$

각 항: $V$ = 압력 $P$ 에서의 흡착량(STP cm³/g), $V_m$ = monolayer 흡착량(STP cm³/g), $c \approx \exp[(E_1 - E_L)/RT]$ = BET 상수(흡착 에너지 차이 척도). 좌변을 $P/P_0$ 에 대해 plot하면 직선이 되고, 그 기울기 $(c-1)/V_m c$ 와 절편 $1/V_m c$ 에서 $V_m$ 과 $c$ 를 동시에 추출.

비표면적 $S_{\text{BET}}$ 는 $V_m$ 으로부터 직접:

$$S_{\text{BET}} = \frac{V_m \cdot N_A \cdot \sigma_{\text{N}_2}}{V_{\text{molar STP}}}$$

각 항: $N_A = 6.022 \times 10^{23}$ mol⁻¹, $\sigma_{\text{N}_2} = 0.162 \text{ nm}^2$, $V_{\text{molar STP}} = 22{,}414$ cm³/mol.

BET plot 유효 범위는 보통 $P/P_0 = 0.05–0.30$. 이 범위 밖에서는 식이 깨지므로(낮은 압력 micropore filling, 높은 압력 mulitlayer 발달) fitting에 포함시키지 않는다. linearity가 좋지 않으면 micropore가 풍부하다는 신호 → t-plot 또는 DFT 분석 추가.

## 4. 배터리 활물질의 BET 값 — 무엇이 정상인가

분말 형태의 활물질이 보고하는 전형적 비표면적:
- NMC, NCA secondary particle: 0.2–0.8 m²/g
- LCO 큰 입자(D50 ~10 µm): 0.1–0.3 m²/g
- LFP nano (carbon-coated): 8–20 m²/g
- 흑연 음극: 1–4 m²/g
- Si nanoparticle: 20–80 m²/g
- 도전재 (Super-P): ~60 m²/g, KB ~1500 m²/g

값 자체보다 trend가 중요하다. 같은 양극 합성 batch에서 BET가 0.4 → 0.8 m²/g로 증가했다면, 1차 입자 크기가 작아졌거나 표면 거칠기/균열이 늘었다는 신호. 사이클링 후 BET 증가는 입자 균열 직접 증거(SEM 단면 분석과 cross-check).

부반응과의 관계: BET가 클수록 SEI/CEI 형성 1st cycle 비가역 용량이 비례적으로 증가한다. 그래서 nano 활물질은 본질적으로 1st cycle CE가 낮다.

## 5. BJH — 메조포어 분포

BJH 방법은 흡탈착 등온선의 desorption branch에서 메조포어(2–50 nm) 분포를 추출한다. 핵심 원리는 **Kelvin 식**으로, 곡률을 가진 메니스커스(meniscus)에서 응축이 일어나는 압력이 평면보다 낮다는 사실이다.

직관: 좁은 모세관 안에서는 N₂가 더 낮은 압력에서 액화되어 채워지며, 채워진 모세관에서 다시 N₂를 빼낼 때도 더 낮은 압력에서 빠져나간다. 압력별로 빠져나가는 양을 측정하면 그 압력에 해당하는 포어 직경 분포를 역산.

$$\ln\frac{P}{P_0} = -\frac{2\gamma V_L \cos\theta}{r_K RT}$$

각 항: $\gamma$ = 표면장력, $V_L$ = 액체 분자 부피, $\theta$ = 접촉각(보통 0), $r_K$ = Kelvin 반경. 실제 포어 반경 $r_p = r_K + t$, $t$ = 흡착된 분자층 두께(Halsey 식 등).

결과는 dV/dlog(D) vs D plot으로 보고. 메조포어가 잘 발달한 시료는 명확한 peak을 보인다 (예: NMC가 4 nm와 20 nm에 두 peak → 입자 표면 nanostructure + 응집체 사이 공간).

한계: 마이크로포어(<2 nm)에는 적용 불가(NLDFT 사용), 5 nm 이하에서는 Kelvin 식이 부정확 → DFT 기반 방법(NLDFT, QSDFT)이 더 정확.

## 6. PSA — Laser Scattering과 Mie 이론

PSA(particle size analyzer)는 입자 크기 분포 측정의 표준 도구이며, 가장 흔한 방식이 **laser diffraction**이다. 시료를 분산매(보통 isopropanol 또는 water + 계면활성제)에 넣어 dispersing chamber에 흘리고, 633 nm He-Ne 또는 다른 레이저로 산란시켜 각도별 산란 강도를 다중 검출기 어레이로 측정한다.

직관: 큰 입자는 작은 각도(<5°)로 강하게 산란, 작은 입자(서브-µm)는 큰 각도까지 산란. 각도 분포에서 입자 크기 분포를 역산.

> **관련 개념: Mie vs Fraunhofer 이론**
> Fraunhofer diffraction approximation은 입자가 빛 파장보다 매우 클 때 ($D \gg \lambda$) 단순 회절로 산란을 모델링. 단순하지만 < 10 µm에서 큰 오차.
> Mie 이론은 구형 입자의 Maxwell 방정식 풀이를 직접 사용해 모든 크기 영역에서 정확. 다만 시료의 광학상수(굴절률 real $n$ + 흡수 $k$)가 필요.
> 가정: 입자가 구형, 단일 분산매 환경, optical property 균일.
> 한계: 비구형(NMC primary particle은 다면체) 입자는 등가 구 직경(volume-equivalent diameter)으로 환산되어 길쭉한 입자는 실제와 다른 값을 줄 수 있다.

표준 출력은 dV/dlogD (volume distribution) 및 누적 percentile $D_{10}$, $D_{50}$, $D_{90}$. 50% 누적 부피에 해당하는 직경 $D_{50}$ 이 가장 흔한 보고값.

분산이 부적절(응집된 채로 측정)하면 거짓 큰 입자 peak이 생긴다 → 초음파 dispersion 1–5 분 권장. 너무 강하면 입자 자체를 부수므로 trade-off.

## 7. $D_{10}/D_{50}/D_{90}$ — 충방전 동역학과의 관계

입자 크기 분포의 세 percentile은 각각 다른 의미를 갖는다.
- **$D_{10}$**: 10% 누적 부피의 직경. 작은 입자 비율을 알려주며, fines 함량이 많을수록 BET 증가/SEI 부담 증가.
- **$D_{50}$**: 중앙값. 활물질의 "대표 크기".
- **$D_{90}$**: 큰 입자 비율. 큰 입자는 충방전 시 Li 확산 path가 길어 율속(rate capability) 한계.

Span = $(D_{90}-D_{10})/D_{50}$ 가 좁으면 균일(uniform) 분포, 넓으면 multimodal. 양극 활물질은 보통 span 0.5–1.5 권장.

확산 시간 척도와의 연결: Li 확산 거리 $L \sim \sqrt{D_\text{Li}\cdot t}$ → 입자 반경 $r$ 가 두 배 커지면 같은 SOC 도달 시간이 4배 증가($t \propto r^2$). $D_{50} = 5$ µm NMC를 1 C로 충전하려면 입자 중심까지 Li 확산이 ~1 시간 필요 ($D_\text{Li} \sim 10^{-14}$ m²/s 가정). 빠른 충전 응용은 작은 입자가 본질적으로 유리.

다만 작아지면 표면적 ↑ → CEI 부반응 ↑, packing density ↓, energy density ↓. 그래서 양극 설계는 보통 $D_{50}$ = 5–15 µm 범위에서 동역학과 부반응의 trade-off 절충.

## 8. SEM 통계 vs PSA — 일치하는가?

SEM 이미지에서 입자를 세는 것과 PSA laser scattering 결과가 일치하지 않는 경우가 흔하다. 이유:
- **SEM은 number-weighted, PSA는 volume-weighted**: SEM에서 본 입자 100개 중 1개가 큰 응집체라도, volume으로 환산하면 그 1개가 99% 차지 → PSA에서 $D_{50}$ 이 SEM 평균보다 훨씬 큼.
- **PSA는 구 가정**: 다면체 NMC는 등가 구 직경으로 환산 → 약간 더 큰 값.
- **SEM은 2D 투영**: 작은 입자가 큰 입자 뒤에 가려질 수 있음.
- **응집 상태**: PSA는 분산매 안에서, SEM은 dry → 분산제 효과로 응집 차이.

올바른 보고: SEM은 1차 입자(primary particle), PSA는 2차 입자(secondary particle/agglomerate)로 명시 구분. 두 값을 직접 비교하지 말 것. number-to-volume 변환은 가능하지만 가정 위에 가정이 쌓이므로 권장하지 않음.

## 참고 문헌

- Sing, K. S. W. et al. *Pure and Applied Chemistry* 87 (2015) 1051–1069 — IUPAC 등온선/포어 분류 표준.
- Brunauer, S., Emmett, P. H., Teller, E. *Journal of the American Chemical Society* 60 (1938) 309–319 — BET 식 원전.
- Barrett, E. P., Joyner, L. G., Halenda, P. P. *Journal of the American Chemical Society* 73 (1951) 373–380 — BJH 메조포어 분석 원전.
- Rouquerol, F., Rouquerol, J., Sing, K. *Adsorption by Powders and Porous Solids* (2nd ed., Academic, 2014) — 흡착·BET·BJH 종합 표준.
- ISO 13320:2020 — Laser diffraction particle size analysis 국제 표준.
