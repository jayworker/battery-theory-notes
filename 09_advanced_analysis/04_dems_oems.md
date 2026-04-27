# DEMS / OEMS 운용 (Differential / Online Electrochemical Mass Spectrometry)

## 1. 개요

DEMS(Differential Electrochemical Mass Spectrometry)와 OEMS(Online Electrochemical Mass Spectrometry)는 작동 중인 셀에서 발생하는 가스를 **실시간으로 mass spectrometer(MS)에 전달해 종류와 양을 정량**한다. 06 [`07_operando.md`](../06_battery_operation/07_operando.md)의 카탈로그가 "DEMS는 가스를 본다"라면, 이 본문은 **셀 디자인, carrier gas 설정, m/z 해석, sensitivity factor 보정, isotope labeling**까지의 운용을 다룬다.

질량분석기로 가스를 보는 것이 새로울 건 없지만, 배터리에서는 **(i) 코인/파우치셀의 미세한 가스 → MS 검출기까지의 전달, (ii) 전해질 vapor와 reaction product의 분리, (iii) m/z overlap의 풀이**가 까다로운 핵심이다.

## 2. DEMS 셀 — Carrier Gas Sweep

DEMS 셀은 보통 lab-built이다. 표준 형태는 다음과 같다.

- 양극·분리막·음극을 PEEK 또는 SS 모듈에 패킹.
- 셀 헤드스페이스에 inlet/outlet 포트 두 개. **Carrier gas**(보통 He, Ar)를 inlet으로 일정 flow($\sim 1$–5 sccm)로 흘리고, outlet에서 capillary 또는 pinhole을 통해 MS로 sampling.
- Capillary는 매우 가는 유리/SS 관(직경 50 μm 정도)이며, MS 진공 ($10^{-6}$ torr)과 셀 1 atm 사이의 압력 강하를 담당.

이렇게 흐름이 있는 형태가 **DEMS**(differential — 미분적으로 가스를 빼낸다는 의미). 한 번 셀에서 나온 가스는 다시 돌아오지 않으며, 발생률(시간당 mol)을 직접 측정한다.

> **관련 개념: Carrier gas와 sensitivity factor**
> 측정되는 MS signal $S_i$ ($i$ = m/z)는 발생 가스의 농도 $c_i$에 비례하지만, 비례 상수는 가스마다 다르다 (이온화 단면적, MS detector 효율). 그래서 calibration gas (예: 1% O$_2$ in He)를 흘려 sensitivity factor $k_i = S_i / c_i$ 를 미리 결정해야 한다.
> 정량 발생률: $\dot n_i = k_i^{-1} \cdot S_i \cdot \dot V_{\text{carrier}}$, $\dot V$ = carrier gas flow rate.
> Carrier gas는 분석 대상과 m/z가 겹치지 않게 골라야 한다. He는 m/z 4로 거의 모든 reaction product와 겹치지 않는 표준 선택.

## 3. OEMS — Pressure Tracking 추가

OEMS(online ECMS)는 DEMS와 유사하지만 **carrier gas를 흘리지 않고 closed cell의 pressure 변화를 추가로 측정**한다. 시간당 발생 가스 mol = $\Delta P V / (RT \Delta t)$. MS는 가스 *종류*를 알려주고, pressure는 *총량*을 알려주는 보완 관계.

| 항목 | DEMS | OEMS |
|---|---|---|
| 셀 형태 | open flow | closed cell |
| Carrier | He/Ar continuous flow | none (또는 가끔 빼서 측정) |
| 측정 | flow-through MS | head-space MS + pressure |
| 시간 분해능 | 1–10 s | 분 단위 (pressure 평균화) |
| 정량성 | sensitivity factor 필요 | total mol 직접 |

Gasteiger group의 OEMS 셀(Tsiouvaras et al. 2013)이 사실상 표준 reference 디자인.

## 4. m/z 해석 — Overlap 풀기

발생 가스의 mass spectrum 해석은 m/z 일대일이 아니다. 한 분자가 ionization 시 여러 fragment를 만들고, 다른 분자의 fragment가 같은 m/z에 겹치기 때문.

| m/z | 주된 종 | overlap / 주의 |
|---|---|---|
| 2 | H$_2$ | 거의 깨끗함, 전해질 fragment 없음 |
| 16 | CH$_4$, O fragment | CO$_2$/O$_2$의 fragment에서 m/z 16도 나옴 → fragment ratio로 분리 |
| 18 | H$_2$O | 항상 background |
| 28 | CO, N$_2$, C$_2$H$_4$ | air leak (N$_2$)와 CO 분리가 까다로움 → glove box vacuum 확인 |
| 32 | O$_2$, S(가끔) | 양극 격자 산소 방출의 신호 |
| 44 | CO$_2$, N$_2$O, propane | 양극 카보네이트 산화의 주된 산물 |
| 64 | SO$_2$ (sulfone 첨가제) | 일부 첨가제 분해 |

전형적 NMC811 / Li-rich 셀에서 4.3–4.7 V 충전 중 m/z 32 (O$_2$)와 m/z 44 (CO$_2$)가 동시 상승하는 것이 격자 산소 방출의 표지. CO$_2$ 만 올라가면 카보네이트 용매의 산화 분해, O$_2$만 올라가면 전형적 anionic redox release 단독.

## 5. Isotope Labeling — $^{18}$O로 기원 분리

m/z 32 (O$_2$)와 m/z 44 (CO$_2$)가 동시 상승하면 두 가설이 가능하다 — (A) 격자 산소가 빠지면서 일부는 O$_2$로 release, 일부는 카보네이트 산화로 CO$_2$ 형성. (B) 격자 산소는 안 빠지고 전해질만 산화. 두 가설을 구분하려면 **isotope labeling**이 필수다.

표준 실험은 **양극재를 $^{18}$O-enriched 합성**(예: Li$_2$$^{18}$O$_2$-mediated synthesis)으로 만들고 일반 ($^{16}$O) 카보네이트 전해질에서 측정. 결과 m/z를 추적하면:

- m/z 36 = $^{18}$O$_2$: 격자 산소만의 직접 release (양극 기원).
- m/z 34 = $^{16}$O$^{18}$O: 격자 + 전해질의 hybrid → cross-talk.
- m/z 32 = $^{16}$O$_2$: 전해질만의 산화 (양극 격자 무관).
- m/z 48 = $^{12}$C$^{18}$O$_2$ 또는 m/z 46 = $^{12}$C$^{16}$O$^{18}$O: CO$_2$의 산소가 어디서 왔는지 정량.

이 isotope 실험으로 Li-rich 양극재의 first-cycle O$_2$ release가 격자 기원임이 명확히 증명됐다 (Strehle et al., Lebens-Higgins et al.).

## 6. 정량 보정과 Calibration

실험 절차 (각 측정 직전):

1. **Empty cell baseline**: 셀에 carrier gas만 흘리며 background spectrum. m/z 28 (N$_2$, leak), 32 (O$_2$, leak), 44 (CO$_2$, atmospheric) 의 background level 결정.
2. **Calibration gas 주입**: 1% O$_2$/Ar, 1% CO$_2$/Ar, 1% H$_2$/Ar 같은 표준 가스를 같은 flow로 통과시키며 sensitivity factor 추출.
3. **셀 측정**: 사이클링 시작 + MS continuous scan.
4. **Background subtraction → sensitivity 보정 → mol 발생률**.

분석 보고: $\dot n_i$ vs 시간 (또는 SOC, V$_\text{cell}$). 누적 mol은 적분하여 가스 yield (mol/g$_\text{cathode}$)로 환산.

## 7. 실전 체크리스트

- 셀 leak rate 확인 (m/z 28 N$_2$ < 0.1% baseline)
- Calibration gas 측정으로 sensitivity factor 매번 갱신
- 전해질 vapor (EC m/z 88, DEC m/z 118) 도 추적 — 셀 누설 또는 전해질 휘발 상태 monitor
- $^{18}$O isotope 실험은 양극재 합성부터 ($^{18}$O 정밀도 95%+ enrichment 필요)
- Pressure (OEMS) 와 MS (DEMS)는 같은 사이클에서 cross-check
- 4 V 이상 CV 사이클로 carbonate breakdown threshold 결정 (additive 평가의 표준 protocol)

## 참고 문헌

- Tsiouvaras, N., Meini, S., Buchberger, I., Gasteiger, H. A. *Journal of The Electrochemical Society* 160 (2013) A471 — DEMS/OEMS 셀 디자인 표준.
- Berkes, B. B. et al. *Analytical Chemistry* 87 (2015) 5878 — DEMS 정량 보정 방법론.
- Strehle, B. et al. *Journal of The Electrochemical Society* 164 (2017) A400 — $^{18}$O isotope DEMS로 본 Li-rich 격자 산소 방출.
- Wandt, J., Freiberg, A., Thomas, R., Gorlin, Y., Siebel, A., Jung, R., Gasteiger, H. A., Tromp, M. *Journal of Materials Chemistry A* 4 (2016) 18300 — operando DEMS + XAS 결합 분석.
