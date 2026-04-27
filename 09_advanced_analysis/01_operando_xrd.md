# Operando XRD 셋업과 데이터 워크플로우 (Operando XRD Cell Design & Data Treatment)

## 1. 개요

XRD는 격자 상수와 결정구조를 직접 본다는 점에서 양극·음극 활물질의 거동을 가장 직접적으로 추적하는 도구다. 그러나 "셀을 작동시키면서 측정"하는 운용은 일반 powder XRD와 매우 다른 셀 디자인, 시간 분해능, 데이터 처리 절차를 요구한다. 06 [`07_operando.md`](../06_battery_operation/07_operando.md)가 "XRD가 무엇을 보는가"를 정리했다면, 본 문서는 **셀을 어떻게 만들고, 어디서 측정하고, 데이터를 어떻게 처리하는가**를 다룬다.

작동 셀 X선 회절(operando X-ray diffraction)은 결국 세 가지를 동시에 만족해야 한다 — (i) 전기화학적으로 정상 동작하는 셀, (ii) 빔이 활물질에 도달하고 회절광이 검출기로 빠져나오는 광학 경로, (iii) 측정 시간 안에 SOC가 크게 변하지 않을 만큼의 시간 분해능.

## 2. 셀 디자인 — 세 가지 표준 형태

가장 흔한 세 가지 셀 형태는 각각 다른 trade-off를 가진다.

**Be window 코인셀(modified CR2032)**: 표준 CR2032의 한쪽 캡에 직경 5–8 mm 구멍을 뚫고 베릴륨(beryllium) 박을 진공 시일링한 형태. Be는 X선에 대한 흡수가 매우 낮아(원자번호 4) lab Cu Kα도 통과시킨다. 장점은 표준 코인셀에 가장 가까워 전기화학 거동이 진짜 셀과 비슷하다는 점, 단점은 Be가 비싸고 독성이 있으며 활물질 안쪽까지의 회절 신호가 표면 양극재에 가려질 수 있다는 점이다.

**Capillary 셀**: 직경 0.5–1.5 mm의 boron-glass 또는 quartz capillary 안에 양극·분리막·음극을 packing해 만든 작은 원통형 셀. 모세관 전체가 빔에 노출되어 회전하며 측정되므로 powder-averaged 신호가 깨끗하게 잡힌다. 보통 swagelok-type 모듈에 끼워 사용한다. 단점은 셀 면적이 매우 작아(< 1 mg active mass) 실용 전류로 작동시키기 어렵다는 점.

**Kapton pouch 셀**: 알루미늄 코팅 파우치 대신 Kapton (polyimide) 윈도우를 가진 파우치셀. 파우치 면적이 크므로 표준 셀과 가장 가까운 형태로 작동시키되, 빔이 통과하는 영역만 Kapton을 노출시킨다. 싱크로트론 투과 모드에서 표준이며, 면 분해(area-resolved) 측정도 가능.

| 셀 형태 | 광원 적합성 | 활물질 양 | 장점 | 단점 |
|---|---|---|---|---|
| Be window 코인 | lab Cu Kα 가능, synchrotron OK | 5–20 mg | 표준 셀에 가장 근접 | Be 독성, 표면 dominant |
| Capillary | synchrotron 강력 권장 | 0.5–2 mg | powder-averaged, 깨끗한 신호 | 작은 면적, 낮은 전류 |
| Kapton pouch | synchrotron 투과 | 50–500 mg | 실셀에 근접, 면 분해 가능 | Kapton 회절 background |

## 3. Lab vs Synchrotron — 시간 분해능 vs Flux

선택 기준은 명확하다. 시간 분해능이 절대 필요하면 synchrotron, 빔타임 확보가 어렵거나 SOC당 수 시간 측정해도 되면 lab.

> **관련 개념: 시간 분해능과 회절 강도의 trade-off**
> 한 회절 패턴을 얻는 데 필요한 노광 시간은 $t \propto N_{\text{count}} / I_0$이다. $I_0$은 입사 광자 flux. Lab Cu Kα tube가 $\sim 10^8\ \text{ph/s/mm}^2$인 반면 3rd-generation synchrotron beamline은 $10^{12-14}\ \text{ph/s/mm}^2$로 4–6 자릿수 차이가 난다.
> 그래서 lab에서 SOC당 30분 걸리는 측정이 synchrotron에서는 1초 미만으로 끝난다. C/2 사이클(2시간)을 100점으로 분해하려면 점당 72초 — synchrotron만 가능.
> 단 synchrotron은 **flux가 너무 강해 beam damage**가 동반된다 (다음 섹션).

전형적 운용은 (i) 처음에는 lab XRD로 C/20 이하 슬로우 사이클 정상상태 확인, (ii) 메커니즘이 잡히면 synchrotron beamtime을 신청해 1C, 5C 같은 빠른 사이클의 동역학을 잡는 식.

## 4. Detector — Mythen, Pilatus, Eiger

검출기 선택이 시간 분해능을 좌우한다.

- **Mythen** (Dectris): 1D strip detector, readout time < 1 ms. 1D 회절 패턴(2θ vs intensity)만 필요할 때 가장 빠름. PSI/SLS, PAL의 Mythen II/III가 대표적.
- **Pilatus** (Dectris): 2D pixel detector, hybrid photon counting. Debye-Scherrer ring 전체를 한 번에 잡아 texture 분석까지 가능. 보통 100 μs 이상 노광.
- **Eiger** (Dectris): Pilatus의 후속. 더 작은 픽셀, 더 빠른 readout. 5C 이상 fast cycling에 사용.

코인/capillary 셀이 회전하지 않으면 reflection 다결정 평균이 깨질 수 있어 2D detector + azimuthal integration이 안전한 선택. Capillary는 회전(rotation) 가능하므로 1D Mythen으로도 충분.

## 5. 데이터 처리 워크플로우

raw 2D image → 1D pattern → 시간/SOC 축으로 stacking → 분석의 4단계.

1. **Azimuthal integration** (2D → 1D): pyFAI, DIOPTAS 같은 도구로 detector calibration(LaB$_6$ 또는 CeO$_2$ standard) 후 ring을 적분.
2. **Background/Kapton 제거**: Kapton pouch면 broad halo를 fitting/subtraction. Capillary면 empty capillary 측정 후 빼기.
3. **Stacking 시각화**:
   - **Waterfall plot**: 2θ × intensity 곡선을 SOC(또는 시간) 축으로 쌓아 3D 지형도처럼 표시. 피크 이동이 한눈에 보임.
   - **Contour map**: 2θ × SOC 평면에 intensity를 색으로 매핑. 정량적 비교에 유리.
4. **격자 상수 fitting**: Le Bail 또는 Pawley refinement (FullProf, GSAS-II)로 각 SOC에서 lattice parameter $a, c$ 또는 unit cell volume $V$ 추출. 결과는 SOC vs $V$, SOC vs $c/a$ 같은 곡선으로 보고.

NMC layered의 경우 (003) peak이 c축 spacing을 직접 반영하므로 보통 (003) 단일 피크 추적으로도 핵심을 잡을 수 있다.

$$c \propto \frac{\lambda}{2 \sin\theta_{(003)}}$$

여기서 $\lambda$는 X선 파장, $\theta_{(003)}$는 (003) 피크 회절각의 절반. SOC가 올라가며 Li⁺가 빠지면 layered 양극에서 c축은 처음에는 늘어나다(O3→O3', interlayer 정전기 반발), high SOC에서 급감(O3→H3, Li 거의 다 빠진 상태)하는 특징적 거동을 보인다.

## 6. Beam damage 고려

특히 synchrotron flux에서는 X선 자체가 시료를 변형시킬 수 있다. 카보네이트 전해질의 라디칼 분해, 양극 활물질의 국소 환원이 보고된다.

대응 전략:
- **Beam attenuator**: Al foil 등으로 flux를 의도적으로 낮춤 (10–50%).
- **Beam shutter + 펄스 측정**: 측정 중에만 빔을 열고 사이클링 중에는 닫음.
- **Spot 이동**: 같은 spot에 누적 dose가 쌓이지 않도록 측정마다 셀 위치를 조금씩 옮김(raster scan).
- **Dose 추정**: 가속 사이클(lab vs synchrotron)에서 같은 격자 거동이 나오는지 확인하는 것이 가장 단순한 sanity check.

## 7. 실전 체크리스트

- 셀 type 결정 (Be/capillary/Kapton)
- 광원 결정 (lab → 슬로우 / synchrotron → 빠른 동역학)
- 빔타임 신청 시 reference standard (LaB$_6$, Si) 시료 동봉
- 시료 mounting jig + 회로 (potentiostat) 비치 확인
- raw data + calibration + dark/flat field를 같이 백업
- 분석 단계에서 Kapton/Be 회절 line을 미리 마킹하고 빼기
- SOC vs $V_{\text{cell}}$ 차원과 SOC vs lattice 차원을 같은 시간축으로 동기화

## 참고 문헌

- Borkiewicz, O. J. et al. *Journal of Applied Crystallography* 45 (2012) 1261 — synchrotron operando XRD 셀 디자인 표준.
- Liu, H. et al. *Journal of The Electrochemical Society* 162 (2015) A2718 — operando XRD로 본 NMC c축 동역학.
- Märker, K., Reeves, P. J., Xu, C., Griffith, K. J., Grey, C. P. *Chemistry of Materials* 31 (2019) 2545 — Li-rich layered의 synchrotron XRD 분석.
- Yu, X., Manthiram, A. *Energy & Environmental Science* 11 (2018) 527 — operando XRD beam damage 보고.
