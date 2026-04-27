# 수학 도구 (Mathematical Tools for Physical Sciences)

## 개요

수학 도구 영역은 전기화학·고체물리·DFT·통계역학의 이론을 다루는 데 필요한 수학적 언어를 정리한다. 독립적인 수학 강의를 대체하는 것이 아니라, 각 이론 영역에서 실제로 부딪히는 수학적 도구들을 "왜 이 방법을 쓰는가"의 맥락에서 재정리하는 것이 목표다.

편미분 방정식(PDE)은 배터리 내 농도 분포와 전위 분포를 기술하는 핵심 도구다. Fick의 확산 방정식, 전기화학 퍼텐셜의 Poisson 방정식, 열전도 방정식이 대표적이다. 선형대수(linear algebra)는 고체물리의 행렬 디아고날라이제이션(에너지 밴드 계산)과 임피던스 스펙트럼의 등가회로 피팅에서 빈번히 등장한다.

복소해석(complex analysis)과 Laplace/Fourier 변환은 EIS 임피던스 해석의 수학적 배경이며, 주파수 도메인 분석의 핵심이다. 수치 해석(numerical methods)은 PDE 시뮬레이션(FEM, FDM)과 실험 데이터 피팅(non-linear regression)에 직접 쓰인다. 오차 전파(error propagation)와 회귀 분석은 실험 불확도 정량화의 기본 도구다.

## 학습 목표

- 배터리 모델링에서 자주 등장하는 ODE/PDE(확산 방정식, Poisson 방정식)를 인식하고 경계 조건 설정의 의미를 이해한다
- 행렬의 고유값 분해(eigenvalue decomposition)와 행렬 지수함수(matrix exponential)가 선형 연립 ODE 풀이와 어떻게 연결되는지 설명할 수 있다
- Laplace 변환과 Fourier 변환의 관계를 이해하고, EIS 임피던스가 복소 평면에서 왜 특정 형태로 나타나는지 설명할 수 있다
- 유한 요소법(FEM)/유한 차분법(FDM)의 기본 아이디어를 설명하고, 배터리 시뮬레이션에서의 적용 맥락을 이해한다
- 측정 불확도의 오차 전파 공식을 적용하고, 비선형 최소제곱 피팅(non-linear least squares)의 수렴 조건을 이해한다

## 소주제 목차

| 파일 | 핵심 내용 (1줄) |
|------|----------------|
| [`01_ode_pde.md`](./01_ode_pde.md) | ODE/PDE 분류, 경계값 문제, 확산 방정식 해석 |
| [`02_linear_algebra.md`](./02_linear_algebra.md) | 고유값 문제, 행렬 분해, 선형 연립계 풀이 |
| [`03_complex_analysis.md`](./03_complex_analysis.md) | 복소함수, Laplace/Fourier 변환, 주파수 응답 |
| [`04_numerical_methods.md`](./04_numerical_methods.md) | FEM/FDM 기초, 수치 적분, 비선형 방정식 |
| [`05_data_analysis.md`](./05_data_analysis.md) | 오차 전파, 최소제곱 피팅, 통계적 불확도 |

## 추천 참고 도서

- Boas, *Mathematical Methods in the Physical Sciences* (3rd ed.) — 물리과학 전반의 수학 도구를 응용 중심으로 다루는 표준 교재.
- Riley, Hobson & Bence, *Mathematical Methods for Physics and Engineering* — 보다 포괄적이고 엄밀한 수학 방법론. 참고 수준으로 유용.
- Press et al., *Numerical Recipes* — 수치 해석 알고리즘의 구현 참고서. 실제 코딩과 연결 시 활용.

## 작성 상태

- **현재 상태:** 본문 완성 (5개 소주제 파일 모두 본문 작성 완료)
- 각 소주제 파일은 학습 목표 → 본문 → 참고 문헌 구성을 따른다
- 다른 영역(01~04, 06)에서 사용하는 수학 도구의 표기와 정의를 한 곳에 모아 둔 참조용 영역
