# 3-Electrode 셀 (Three-Electrode Cell Setup)

## 1. 개요

풀셀(2-electrode) 측정은 양극과 음극의 분극이 함께 들어와 어느 전극의 기여인지 분리할 수 없다는 본질적 한계가 있다. **3-electrode 셀** 은 작업 전극(working electrode, WE)·상대 전극(counter electrode, CE)·기준 전극(reference electrode, RE)의 셋을 분리해, 작업 전극의 분극만을 RE 기준으로 정밀 측정하게 해준다.

직관적으로, RE는 어떤 전류도 흘리지 않고 안정한 전위를 유지하면서 WE의 전위를 측정하는 "전위 자(ruler)" 역할이다. CE가 전류를 받아주므로 RE는 전류 부하 없이 평형 전위를 유지할 수 있다.

GITT·EIS·CV 등 정밀 동역학 측정에서 3-electrode가 표준인 이유: 풀셀에서는 양극과 음극의 $R_\text{ct}$, 두 SEI, 두 Warburg가 모두 합쳐진 단일 임피던스만 보이지만, 3-electrode에서는 한 전극의 임피던스만 깔끔히 분리된다.

## 2. 2-electrode vs 3-electrode

| | 2-electrode (full cell) | 3-electrode |
|---|------------------------|-------------|
| 전극 수 | WE + CE | WE + CE + RE |
| 측정 전위 | WE - CE 차이 | WE - RE (CE 분극 무시) |
| 분극 분리 | 불가 | 가능 |
| 셀 조립 | 단순 | RE 추가로 복잡 |
| 사용 목적 | 셀 성능 평가 | 전극 동역학 분리 |

배터리 R&D의 흐름: 새 활물질 평가 → half-cell (Li metal vs new material, 2-electrode이지만 Li가 RE 역할) → 셀 동역학 분석 → 3-electrode 추가 → 풀셀 검증.

Half-cell이 사실상 2-electrode인데도 RE로 쓰일 수 있는 이유: Li metal이 평형 전위가 매우 안정하고 큰 표면적을 가져 작은 전류에서 분극이 무시할 만하기 때문. 다만 high-rate 측정에서는 Li counter도 분극되므로 정밀 측정은 별도 RE 추가가 권장된다.

## 3. Reference Electrode 선택

RE의 선택은 시스템(수계 vs 비수계)·전위 윈도우·안정성·재현성을 고려해 결정한다.

**(a) Li metal (비수계 표준)**: Li/Li⁺ 평형이 매우 안정 (-3.04 V vs SHE). 리튬 이온 배터리 전 영역에서 가장 흔히 쓰이는 RE. 장점: 평형 전위가 well-defined, 측정 후 전위가 직접 Li/Li⁺ 기준값. 단점: 시간에 따라 Li 표면이 SEI로 덮이며 전위가 미세 drift할 수 있음.

**(b) Ag/AgCl (수계 표준)**: KCl 포화 용액에서 평형 전위 +0.197 V vs SHE. 수계 시스템·생체 시료의 표준 RE. 장점: 매우 안정·재현성 우수. 단점: Cl⁻ 누출이 시스템에 들어가 부반응 가능성.

**(c) SCE (Saturated Calomel)**: 포화 KCl + Hg/Hg₂Cl₂. +0.241 V vs SHE. 한때 표준이었으나 Hg 환경 문제로 점차 Ag/AgCl로 대체.

**(d) LRO (Lithium Reference Oxide)**: Li₄Ti₅O₁₂ 같은 안정한 lithium-bearing 산화물. 평형 전위가 SOC에 거의 무관 (LTO의 1.55 V plateau)하고 Li metal보다 안정. 비수계 정밀 측정에서 점차 표준으로 자리 잡는 중.

**(e) Pseudo-reference (의사 기준)**: 단순한 Pt 또는 Ag wire. 평형 전위가 ill-defined 하지만 시간 안정성이 있어 단일 측정의 상대 전위 기준으로 쓸 수 있다. **주의**: 절대 전위는 의미 없으며, 측정 전후 알려진 redox couple(예: ferrocene)으로 보정해야 한다. Drift가 큰 함정.

> **관련 개념: Nernst 식과 RE의 안정성**
> RE의 평형 전위는 Nernst 식 $E = E^\circ - (RT/nF) \ln Q$ 로 결정. Ag/AgCl: $E = E^\circ_\text{Ag/AgCl} - (RT/F) \ln a_{Cl^-}$, Cl⁻ 활동도가 일정하면 (포화 KCl) 전위가 일정.
> Li metal RE의 안정성: Li/Li⁺ 평형이 빠르고 표면적이 크므로 작은 측정 전류 ($\mu$A)에서 분극 무시. 단 SEI 형성이 진행되면 표면 전위가 microvolt~mV 수준 drift.
> 가정: RE에 흐르는 전류 ≈ 0 (포텐시오스탯 high-impedance 입력). 만약 RE에 의도치 않게 전류가 흐르면 자체 분극이 측정에 들어와 모든 결론이 어긋남.

## 4. RE Placement 와 Luggin Capillary

RE의 물리적 위치가 측정 정확도를 결정한다. 핵심 원칙: **RE 끝이 WE 표면에 충분히 가깝되, WE-CE 사이 전류 경로를 막지 않을 것**.

**전류 분포의 균일성**: WE와 CE 사이의 전기력선은 균일해야 한다. RE가 비균일 영역에 위치하면 measured 전위에 추가 옴 강하 $iR_\Omega$ 가 들어간다. 코인셀 같은 sandwich 구조에서는 RE를 가장자리에 두기 쉬운데, 이는 전류 분포가 비균일하므로 측정값이 부정확.

**Luggin capillary**: RE를 WE 표면에 매우 가까이 가져가는 표준 도구. 가는 유리 모세관(tip 직경 ~수 mm)을 RE 용액으로 채워 한쪽 끝을 WE 표면 근처(보통 2~3 tip 직경 거리)에 배치. 이로써 측정된 전위에서 옴 강하 $iR_s$ 를 거의 제거할 수 있다.

Luggin tip이 너무 가까우면 (< 1 tip 직경) WE 표면의 전류 분포를 가려 다른 종류의 비균일성이 생기고, 너무 멀면 (> 5 tip 직경) 옴 강하가 다시 들어온다. 표준은 2~3 tip 직경.

**Micro-reference electrode**: 매우 작은 RE (직경 < 100 μm) 를 셀 내부에 직접 삽입. Coin cell·pouch cell에 RE를 넣는 표준 방법. 일반적으로 Cu wire에 Li metal을 plating한 형태로 만들어 활물질 사이에 끼운다. 평면 전류 분포의 가운데에 두면 옴 강하 보정이 거의 필요 없다.

## 5. Pseudo-reference의 위험

비수계 시스템에서 안정한 RE를 만들기 어려워 **pseudo-reference** (Ag wire, Pt wire, Cu wire 등)를 임시로 쓰는 경우가 많다. 이 경우 발생하는 함정들.

**(1) 시간 drift**: 표면 산화·흡착이 진행되며 평형 전위가 시간에 따라 mV~수십 mV 흐른다. 장시간 측정 (수 시간 이상)에서 결과의 절대 전위는 무의미.

**(2) 시스템 종속**: 같은 Ag wire라도 전해질 종류·이온 강도에 따라 평형 전위가 달라진다. 다른 셀과의 비교가 어렵다.

**(3) 보정 필수**: Ferrocene/ferrocenium (Fc/Fc⁺) 커플 같은 알려진 redox를 측정 전후에 함께 측정해 pseudo-RE의 전위를 보정해야 한다. Fc/Fc⁺ 평형 전위 (vs SHE)는 용매 의존성이 있지만 IUPAC 권고로 표준화된 값이 있다.

**(4) 정밀 동역학 불가**: drift가 mV/h 수준인 RE로 GITT (mV 정도의 $\Delta E_s$ 측정)는 노이즈에 묻힌다. 이 때문에 정밀 측정은 항상 안정한 RE (Li metal, Ag/AgCl, LRO) 사용.

## 6. 측정 시 주의사항과 트러블슈팅

3-electrode 셀이 잘못 작동하는 신호와 진단법.

- **CV가 비대칭하게 찌그러짐**: RE 위치가 비균일 전류 분포 영역. Luggin tip 위치 점검.
- **EIS에 인덕티브 꼬리가 비정상적으로 큼**: RE-WE 사이 inductance·cable 문제. 케이블 차폐·twisted pair.
- **OCV가 시간에 따라 일정하게 drift**: pseudo-RE 사용 중. Fc 보정 또는 안정 RE로 교체.
- **풀셀과 3-electrode WE의 분극 합이 안 맞음**: RE 위치가 잘못되어 옴 강하의 일부만 분리된 경우. Luggin 거리 또는 micro-RE 위치 재조정.
- **저주파 EIS noise 폭발**: RE 임피던스가 너무 높음 (capillary가 막혔거나 가는 wire). RE 새것으로 교체.

코인셀에 micro-RE를 추가한 형태 (예: Andre-style 3-electrode coin cell, EL-Cell PAT-Cell) 는 대학원 실험실에서 가장 자주 쓰는 옵션이며, 풀셀과 거의 같은 형태로 측정하면서도 양/음극 분리가 가능해 표준 도구가 되었다.

3-electrode 셀의 결과는 항상 풀셀 결과와 cross-check 해야 한다. WE의 분극 + CE의 분극 ≈ full-cell 분극이어야 하며, 일치하지 않으면 RE placement 또는 셀 구성에 문제가 있다.

## 참고 문헌

- Bard, A. J., Faulkner, L. R. *Electrochemical Methods* (2nd ed., Wiley, 2001) — Ch. 1, 11: 셀 구성과 RE 표준 처리.
- Sahapatsombut, U. et al. *J. Power Sources* 243 (2013) 758 — 3-electrode 코인셀 설계와 RE placement 영향.
- Costard, J., Ender, M., Weiss, M., Ivers-Tiffée, E. *J. Electrochem. Soc.* 164 (2017) A80 — micro-RE를 이용한 정밀 EIS.
- Solchenbach, S., Pritzl, D., Kong, E. J. Y., Landesfeind, J., Gasteiger, H. A. *J. Electrochem. Soc.* 163 (2016) A2265 — Li-ion 셀에서 안정한 RE (LTO 기반) 설계.
- Pavlov, D. *Lead-Acid Batteries: Science and Technology* (2nd ed., Elsevier, 2017) — Ch. 5: pseudo-RE의 사용과 한계.
