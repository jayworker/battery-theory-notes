# 충방전 곡선 분석 (Voltage Curve Analysis)

## 1. 개요

충방전 곡선(voltage-capacity curve, V-Q curve)은 배터리에서 가장 자주 보는 1차 데이터지만, 그 안에 들어 있는 정보의 양은 결코 단순하지 않다. 같은 양극 소재라도 곡선의 plateau 길이, slope의 기울기, dQ/dV 피크 위치만 보면 어느 상전이 영역에 있는지, 어떤 모드로 노화되고 있는지를 거의 비파괴적으로 진단할 수 있다.

곡선의 "모양"은 본질적으로 **소재의 깁스 자유 에너지가 조성에 따라 어떻게 변하는가**를 그대로 반영한다.

그래서 V-Q 곡선 분석은 배터리 진단의 출발점이자, 모든 후속 분석(ICA/DVA, GITT, EIS)의 해석 기준이 된다.

한 가지 추가 관점: V-Q 곡선은 사실상 활물질의 화학 포텐셜을 SOC 함수로 측정한 것이며, 곡선의 모양은 결정 구조 정보와 상평형 정보를 비파괴적으로 담고 있는 thermodynamic fingerprint다.

## 2. Plateau vs Slope: 열역학적 의미

직관적으로, 충방전 도중 전압이 거의 일정하게 유지되는 plateau는 **두 상이 공존**하는 영역이다.

화학 포텐셜이 두 상 사이에서 평형을 이루므로, 리튬이 한 상에서 다른 상으로 옮겨갈 뿐 자유 에너지의 기울기는 변하지 않는다.

반대로 slope 영역은 **단일 고용체(solid solution)** 안에서 조성이 연속적으로 변하는 구간이다.

조성이 바뀌면 화학 포텐셜이 바뀌고, 따라서 전압이 함께 움직인다.

> **관련 개념: Gibbs 자유 에너지와 전극 전위**
> 셀의 평형 전위 $E$ 는 반응의 Gibbs 자유 에너지 변화 $\Delta G$ 와 $\Delta G = -nFE$ 로 직접 연결된다. 활물질에 Li가 들어갈 때의 화학 포텐셜 변화가 곧 전압이며, 조성 $x$ (Li/host) 함수로 보면 평형 전위는 자유 에너지의 기울기로 결정된다: $E(x) = -\frac{1}{nF}\frac{\partial G}{\partial x}$.
> 두 상이 공존하는 구간에서는 두 상의 화학 포텐셜이 같아져 $\partial G/\partial x$ 가 일정해지고, 그래서 전압이 평탄(plateau). 단일 고용체 영역에서는 조성에 따라 화학 포텐셜이 연속 변화 → 곡선 모양(slope).
> 농도가 활동도(activity) $a$ 로 표현될 때 평형 전위는 Nernst 식 $E = E^\circ - (RT/nF)\ln Q$ 형태가 되며, $Q$ 는 산화/환원 종의 활동도 비. 즉 V-Q 곡선은 활물질의 활동도-조성 관계를 직접 측정한 것과 같다.

대표 사례:
- LiFePO₄: LiFePO₄ ↔ FePO₄ 의 1차 상전이 → 약 3.43 V 부근에 매우 평탄한 plateau.
- LiCoO₂, NMC 계열: layered 구조 내 고용체 영역이 넓어 전반적으로 slope 형태 (다만 좁은 plateau가 부분적으로 존재).
- 흑연(graphite): stage 1, 2, 2L, 3, 4 사이의 stage 전이마다 짧은 plateau가 계단식으로 등장.
- 이론적으로 plateau의 정확한 전압은 두 상의 자유 에너지 공통 접선(common tangent) 기울기로부터 계산되며, 이 값이 곧 Nernst 식이 주는 평형 전위와 일치한다.
- 같은 소재라도 입자 크기가 작아지면 표면 에너지 기여로 plateau가 약간 기울고 짧아지는 size effect가 보고되어 있다(예: 나노 LFP).

## 3. dQ/dV 분석 (Incremental Capacity Analysis, ICA)

V-Q 곡선의 미세한 plateau/slope 변화는 육안으로 잘 보이지 않는다. 이때 전압을 가로축, 단위 전압당 용량(dQ/dV)을 세로축으로 잡으면 plateau는 **샤프한 피크**로, slope 영역은 낮은 background로 분리된다. 즉 ICA는 곡선의 "곡률"을 가시화하는 도구다.

$$\text{IC}(V) = \frac{dQ}{dV}$$

여기서 $Q$는 누적 용량(C 또는 mAh), $V$는 셀 전압. 피크 위치는 상전이가 일어나는 평형 전위에 해당하고, 피크 면적은 그 상전이 구간의 용량 기여분을 준다. 노화가 진행되면 전형적으로 (i) 피크가 낮아지고(LAM, 활물질 손실), (ii) 피크 위치가 이동하며(저항 증가/SOC shift), (iii) 새로운 피크가 등장(부반응 생성물)할 수 있다.

실무에서는 노이즈에 매우 민감하므로 **충분히 낮은 C-rate(보통 C/20~C/10)** 와 Savitzky-Golay 같은 smoothing 필터를 함께 쓴다. 미분 연산이 노이즈를 증폭하므로 raw 데이터를 그대로 미분하면 의미 없는 spike가 생기며, smoothing window 크기는 SOC 분해능과 trade-off가 있다.

ICA 피크의 정량 해석에서 자주 쓰는 지표는 (i) 피크 면적(용량 기여), (ii) 피크 위치(평형 전위), (iii) FWHM(반치폭, 동역학 지표)이며, 사이클 진행에 따른 이 세 값의 추이가 노화 모드 진단의 fingerprint가 된다.

## 4. dV/dQ 분석 (Differential Voltage Analysis, DVA)

ICA가 "전압당 용량"이라면 DVA는 그 역수, 즉 "용량당 전압"이다. 셀의 **full-cell 곡선은 양극과 음극 곡선의 차**이므로, dV/dQ를 보면 양극과 음극 각각의 특징적 피크가 거의 그대로 유지된 채 더해진다는 점에서 진단력이 크다. 흑연의 stage 전이 피크와 양극의 상전이 피크가 별도의 위치에서 보이기 때문에, 어느 전극에서 노화가 일어나는지 구분할 수 있다.

$$\frac{dV}{dQ} = \frac{dV_+}{dQ} - \frac{dV_-}{dQ}$$

LLI(Loss of Lithium Inventory)는 양극과 음극 곡선이 서로 어긋나는 형태(slippage)로 나타나며, LAM은 해당 전극의 용량 축이 압축되는 형태로 나타난다. 두 모드는 DVA에서 패턴이 분명히 다르므로 정량 분리가 가능하다(Bloom, Dubarry, Birkl 등의 모델 참조). 정량 절차는 보통 (i) 신선한 셀의 양/음극 half-cell 곡선을 reference로 확보, (ii) 두 곡선을 SOC 축에서 sliding 및 stretching하면서 측정된 full-cell DVA에 fitting, (iii) sliding 양 = LLI, stretching 양 = LAM_PE/LAM_NE 로 정량하는 방식이다.

> 노화 모드 정의(LLI/LAM)와 메커니즘은 [`./06_degradation.md`](./06_degradation.md)에서 상세 다룸.

## 5. 히스테리시스 (Hysteresis)

같은 SOC인데도 충전 직후와 방전 직후의 OCV가 다르게 측정되는 현상이 히스테리시스다. 두 가지 기원이 있다. **열역학적 히스테리시스**는 1차 상전이에서 핵생성 장벽 때문에 평형 경로가 어긋나며 발생하고(LiFePO₄, conversion 반응이 대표), **동역학적 히스테리시스**는 단순히 측정이 평형에 도달하지 못해 분극이 남아 생긴다.

| 종류 | 원인 | 완화 방법 |
|------|------|----------|
| 열역학적 | 핵생성/메타스테이블 상 | 본질적으로 제거 불가 (소재 고유 성질) |
| 동역학적 | 분극, 측정 시간 부족 | 더 긴 이완(GITT), 낮은 C-rate |

대표 사례: Si 음극은 lithiation/delithiation 경로가 다른 결정상을 거쳐 매우 큰 path dependence를 보이며, 이는 SOC 추정의 큰 오차원이 된다. LiFePO₄는 입자 단위 mosaic 모델로 부분-2상 거동이 설명된다.

## 6. 측정 시 주의사항

V-Q 곡선의 정량 해석은 측정 조건에 매우 민감하다. C-rate가 높으면 옴 강하(IR drop)와 농도 분극이 함께 곡선을 왜곡시키고, plateau가 기울어 보이거나 짧아 보인다. 온도가 낮으면 동역학이 느려져 같은 효과가 나타난다.

다음 보정/조건이 필수다:
- **C-rate**: ICA/DVA용 곡선은 C/20 이하 권장. 진단 목적이라면 C/30 ~ C/50.
- **IR drop 보정**: 측정 직후 휴지 구간의 voltage relaxation을 활용하거나 EIS로 얻은 $R_s$로 보정.
- **Formation cycle**: 초기 1~3 사이클은 SEI 형성/구조 안정화로 곡선이 비정상적이므로 분석에서 제외.
- **온도 제어**: 25 ± 1 °C 챔버. 엔트로피 효과로 OCV가 약 0.1~0.5 mV/K 수준 이동.
- **데이터 sampling rate**: 미분 분석을 위해서는 충분히 조밀한 (전압당 다수 데이터점) 샘플링이 필요. 너무 듬성하면 ICA의 피크 위치/폭이 부정확해짐.
- **셀 휴지**: 충/방전 사이에 충분한 OCV 안정화를 두지 않으면 분극이 곡선에 누적되어 보임. 보통 1 h 이상 권장.

종합하면, V-Q 곡선은 모든 측정의 출발점이며 그 해석에서의 작은 부정확성은 후속 분석(ICA/DVA, GITT)의 신뢰도까지 좌우한다.

## 참고 문헌

- Dubarry, M., Truchot, C., Liaw, B. Y. *Journal of Power Sources* 219 (2012) 204–216 — ICA/DVA 노화 진단 표준 방법론.
- Bloom, I. et al. *Journal of Power Sources* 139 (2005) 295–303 — DVA를 이용한 양/음극 기여 분리.
- Dreyer, W. et al. *Nature Materials* 9 (2010) 448–453 — LiFePO₄ mosaic 입자 모델, 히스테리시스의 열역학적 기원.
- Birkl, C. R. et al. *Journal of Power Sources* 341 (2017) 373–386 — LLI/LAM의 비파괴 진단.
