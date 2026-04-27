# DFT/양자화학 (Quantum Chemistry and Density Functional Theory)

## 개요

밀도범함수 이론(Density Functional Theory, DFT)은 현대 배터리 소재 연구에서 가장 널리 사용되는 제1원리(first-principles) 계산 방법이다. 전자 구조를 기반으로 결정 구조의 안정성, 반응 전압, 이온 이동 장벽(migration barrier)을 예측할 수 있어, 실험과 상호보완적으로 소재 설계에 활용된다.

이 영역은 양자역학의 기초 — 슈뢰딩거 방정식, 파동함수의 해석 — 에서 출발하여, 다전자 문제를 다루는 Hohenberg-Kohn 정리와 Kohn-Sham 방정식으로 이어진다. DFT의 실용적 구현에는 교환-상관 범함수(exchange-correlation functional)의 선택(LDA, GGA, hybrid)이 핵심이며, 수치 계산을 위한 슈도퍼텐셜(pseudopotential), $k$-point 샘플링, 에너지 컷오프(cutoff) 설정이 실제 계산 품질을 결정한다.

배터리 DFT 응용에서는 리튬 삽입/탈리 전압 계산($\Delta G = -nFE$), NEB(Nudged Elastic Band) 방법을 이용한 이온 이동 장벽 계산이 특히 중요하다. DFT+U 보정과 van der Waals 상호작용 처리는 층상 전이금속 산화물 계산 시 정확도에 직접 영향을 준다.

## 학습 목표

- 슈뢰딩거 방정식의 해석과 Born-Oppenheimer 근사의 의미를 설명할 수 있다
- Hohenberg-Kohn 정리의 핵심 내용(외부 퍼텐셜 ↔ 전자 밀도의 일대일 대응)을 이해하고 Kohn-Sham 방정식으로의 전환을 개념적으로 설명할 수 있다
- LDA, GGA, hybrid 범함수의 차이와 배터리 소재 계산에서의 적합성을 비교할 수 있다
- 배터리 소재 DFT 계산에서 전압 계산과 이온 이동 장벽(NEB) 계산의 원리를 설명할 수 있다
- 계산 파라미터(cutoff energy, $k$-point mesh, U 값)가 결과에 미치는 영향을 정성적으로 판단할 수 있다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_quantum_basics.md`](./01_quantum_basics.md) | 슈뢰딩거 방정식, 파동함수, Born-Oppenheimer 근사 |
| [`02_dft_foundations.md`](./02_dft_foundations.md) | Hohenberg-Kohn 정리, Kohn-Sham 방정식, 자기 일관 풀이 |
| [`03_exchange_correlation.md`](./03_exchange_correlation.md) | LDA, GGA(PBE), hybrid 범함수, DFT+U |
| [`04_practical_dft.md`](./04_practical_dft.md) | 슈도퍼텐셜, 평면파 기저, $k$-point, 컷오프 에너지 |
| [`05_dft_battery.md`](./05_dft_battery.md) | 삽입 전압 계산, NEB 이동 장벽, 표면/계면 모델링 |

## 추천 참고 도서

- Sholl & Steckel, *Density Functional Theory: A Practical Introduction* — DFT 계산 실습 관점에서 접근. 배터리 연구자에게 가장 친근한 입문서.
- Koch & Holthausen, *A Chemist's Guide to Density Functional Theory* — 범함수 이론의 화학적 관점 설명.
- Martin, *Electronic Structure: Basic Theory and Practical Methods* — 이론적 깊이가 필요할 때 참조.

## 작성 상태

- **현재 상태:** 본문 완성 (5개 소주제 파일 모두 본문 작성 완료)
- 각 소주제 파일은 학습 목표 → 본문 → 참고 문헌 구성을 따른다
- 작동이론(06)의 전압 곡선·이동 장벽 관련 박스에서 이 영역의 결과(전압 계산식, NEB)를 인용함
