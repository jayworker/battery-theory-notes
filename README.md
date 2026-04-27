# README — Claude Code 작업 가이드라인

이 디렉토리는 **이차전지 소재 연구 대학원생을 위한 이론 학습 노트**다. 6개 영역 33개 본문 마크다운 파일로 구성되어 있으며, Claude Code(또는 다른 LLM 도구)로 점진적으로 추가·수정·보강하기 위한 작업 가이드를 정리한다.

> **사용자 안내가 아닌 "작업자/Claude" 안내 문서.** 학습용 진입점은 [`00_index.md`](./00_index.md).

---

## 1. 프로젝트 개요

- **목적:** 수업에서 들었던 전기화학·고체물리·DFT·통계역학·수학 도구·배터리 작동이론을 재학습 가능한 수준으로 정리한 markdown 노트.
- **사용자:** 이차전지 소재 연구 대학원생. 공학 응용 위주 연구실에서 별도로 이론을 다지는 중.
- **현재 상태(2026-04-27):** 6개 영역 모두 본문 완성. 추가는 새 소주제 보강·예제 추가·시각화 형태로 진행.

---

## 2. 디렉토리 구조

```
.
├── README.md                           ← 이 파일 (Claude Code 가이드)
├── 00_index.md                         ← 학습자용 진입점
├── 01_electrochemistry/                ← 전기화학 기초 (Nernst, BV, EIS 등)
├── 02_solid_state/                     ← 고체물리/화학
├── 03_quantum_dft/                     ← 양자화학·DFT
├── 04_statistical_mechanics/           ← 통계역학
├── 05_math_tools/                      ← 수학 도구
├── 06_battery_operation/               ← 배터리 작동이론 (앵커 영역)
├── 07_materials_analysis/              ← 소재분석 (XRD, SEM, ...)
├── 08_echem_analysis/                  ← 전기화학분석 (CV, GCD, EIS, ...)
├── 09_advanced_analysis/               ← 고도분석 (operando, XAS, cryo-EM, ...)
└── .omc/
    ├── specs/deep-interview-battery-theory-textbook.md
    └── plans/battery-theory-textbook.md
```

각 영역 폴더는:
- `00_overview.md`: 영역 소개, 학습 목표, 1줄 소주제 목차, 참고 도서
- `01_xxx.md` ~ `05_xxx.md` (또는 `08`): 소주제별 본문

---

## 3. 작성 규칙 (Style Guide)

새 본문을 작성하거나 기존 본문을 수정할 때 반드시 따를 규칙들. 기존 33개 본문이 모두 이 규칙을 따르므로 일관성을 유지하려면 **그대로 적용**.

### 3.1 톤

- 처음 배우는 학생용이 **아니라** "수업에서 들었지만 정리가 안 된" 대학원생 대상 복습 톤.
- 기초 정의(전압, 전류, 산화/환원, 전극, 전해질)를 단독으로 정의하는 문장은 **파일당 2회 이하**.
- 기초 정의가 필요하면 **자기충족 관련개념 박스**로 처리 (§3.5).

### 3.2 언어

- 한국어 본문 + 영문 학술 용어 괄호 병기.
- 첫 등장 시 반드시: `분극(polarization)`, `이중층(double layer)`.
- 두 번째 이후는 자연스러운 쪽으로.
- **파일당 최소 5회** 병기 패턴.

### 3.3 수식 (LaTeX)

- 인라인: `$j_0$`, `$\eta$`
- 블록: `$$j = j_0 [\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$$`
- GitHub-flavored markdown / VSCode preview 호환.
- `$` 기호가 짝수 개로 닫혀야 함 (Grep으로 검증 가능).

### 3.4 섹션 골격 (모든 본문 공통)

```
# [소주제 제목] ([English term])

## 1. 개요
2-3문장. 왜 이 주제가 중요한가.

## 2. [첫 핵심 개념]
직관적 설명 → 핵심 식 → 식의 각 항 의미 → 적용/측정 의미

## 3. [두 번째 개념]
...

## N. [마지막]

## 참고 문헌
- 저자, 저널 권 (연도) 페이지 — 한 줄 요약
```

**핵심 패턴: 직관 선행**
- 모든 `$$...$$` 블록 식 직전에 **최소 2문장의 비수식 설명**이 와야 함.
- "왜 이 식이 나오는가"를 직관적으로 먼저 풀고 식을 제시하는 흐름.

### 3.5 자기충족 관련개념 박스 (중요!)

작동이론(`06_battery_operation/`) 본문이 기초이론 개념을 인용할 때 사용하는 패턴.

```markdown
> **관련 개념: [개념명]**
> [3-5줄 자기완결적 설명. 식 + 각 항 의미 + 가정/적용 조건 + 직관까지]
```

**절대 금지:** 박스 안에 다른 `.md` 파일로의 외부 링크 넣기. 박스는 **자기충족적**이어야 함 — 사용자가 다른 파일을 열지 않아도 박스만으로 논리가 닫혀야 한다. 이유: stub일 때 깨진 링크 경험 회피, 그리고 한 번 더 풀어쓰는 것이 재학습 가치를 높임.

✅ Good:
```markdown
> **관련 개념: Butler-Volmer 식**
> 계면 전자전달 반응의 정전류 분극: $j = j_0[\exp(\alpha F\eta/RT) - \exp(-(1-\alpha)F\eta/RT)]$.
> 각 항: $j_0$ = 교환 전류 밀도, $\eta$ = 활성화 과전압, $\alpha$ = 대칭 인자(보통 0.5).
> 작은 $\eta$에서 선형, 큰 $\eta$에서 Tafel 근사 ($\eta = a + b\log j$).
```

❌ Bad:
```markdown
> **관련 개념: Butler-Volmer 식**
> 자세한 설명은 [`../01_electrochemistry/02_kinetics.md`](...) 참조.
```

### 3.6 교차 참조 (외부 링크 정책)

박스 외부의 일반 본문 텍스트에서는 **이미 작성된 본문 파일**로의 상대 링크 OK.

- 같은 영역 내: `[분극](./02_polarization.md)`
- 다른 영역의 본문: `[열역학](../01_electrochemistry/01_thermodynamics.md)`

**절대 금지:** stub 상태인 파일로의 링크. 현재는 모든 본문이 작성됐지만, 새 영역을 추가하면서 stub만 두는 경우는 stub로의 링크를 만들지 말 것.

### 3.7 분량 (Tier 시스템)

본문 줄 수 하한 (헤더/공백 제외 순수 본문):

| Tier | 섹션 수 | 최소 줄 수 |
|---|---|---|
| Tier 1 | 7개 이상 | **60줄** |
| Tier 2 | 6개 | **45줄** |
| Tier 3 | 5개 | **35줄** |

이건 하한이지 목표가 아님. 실제로는 대부분 100줄 이상.

### 3.8 Acceptance Criteria 체크리스트

새 본문을 commit하기 전에:

- [ ] 위 7개 규칙(3.1~3.7) 모두 준수
- [ ] LaTeX `$` 기호 짝수
- [ ] 직관 선행 (수식 직전 ≥2 문장)
- [ ] 기초 용어 단독 정의 ≤2회
- [ ] KR/EN 병기 ≥5회
- [ ] Tier 줄 수 충족
- [ ] 참고 문헌 섹션 존재 (3개 이상 권장)
- [ ] 깨진 링크 없음
- [ ] 작동이론 본문이라면 박스 외부 링크 0건

---

## 4. Claude Code 사용 워크플로우

### 4.1 새 본문 추가 (소주제 1개)

가장 가벼운 작업. 직접 요청.

```
사용자: 04_statistical_mechanics/06_correlation_functions.md 만들어줘.
        Tier 2 (45줄+), 동시 시간 / 시공간 상관, 산란 단면적과의 연결까지.
        기존 본문들과 같은 스타일로.
```

Claude는 baseline (`01_thermodynamics.md` 등)을 읽고, 같은 패턴으로 새 파일 작성. 해당 영역 `00_overview.md`의 소주제 표도 같이 업데이트.

### 4.2 본문 보강 / 수정

```
사용자: 02_kinetics.md의 Marcus 이론 부분이 너무 짧아.
        예제 계산(Fe²⁺/Fe³⁺ self-exchange)을 추가해줘.
```

Claude는 해당 파일을 읽고, Marcus 섹션을 식별, 예제 계산을 직관 선행 패턴으로 추가.

### 4.3 박스를 본문 참조로 점진적 통합

이건 현재 의도적으로 하지 않은 것. **만약** 미래에 박스 안 내용이 본문보다 깊어지거나 중복이 거슬리면:

```
사용자: 06_battery_operation/02_polarization.md의 Butler-Volmer 박스를
        간소화하고, 01_electrochemistry/02_kinetics.md의 해당 섹션으로 링크.
```

단 이때도 박스 자체는 유지 — 박스 안에 1-2줄 핵심 식만 남기고, "상세 설명 → 본문" 링크 추가. 단, 메모리에 저장된 정책(`feedback_reference_boxes.md`)을 먼저 확인하고 사용자와 합의 후 진행.

### 4.4 새 영역 추가 (예: `07_polymer_electrolyte/`)

가장 큰 작업. 권장 워크플로우:

1. `/deep-interview "07 폴리머 전해질 이론 영역 추가"` — 범위·깊이·소주제 결정
2. `/ralplan --consensus --direct .omc/specs/[새 spec].md` — Plan/Architect/Critic
3. 직접 작성 또는 `/autopilot` 또는 단순 executor 위임

새 영역의 stub만 만들고 본문은 후속 세션에 미루는 패턴은 **현재 컨벤션에 반함** — 이미 모든 본문이 완성됐으므로 새 영역도 본문까지 작성하는 것이 일관성 측면에서 권장.

### 4.5 가벼운 단발 수정

```
사용자: 03_interface.md의 Sand 시간 박스 부호 한 곳 잘못된 것 같아.
```

직접 Edit 사용.

---

## 5. 핵심 참조 파일

| 파일 | 용도 |
|---|---|
| `.omc/specs/deep-interview-battery-theory-textbook.md` | 초기 Deep Interview 결과 — 사용자 의도, 범위, 명세 |
| `.omc/plans/battery-theory-textbook.md` | Planner/Architect/Critic 합의 plan v2 (historical record) |
| `.omc/plans/open-questions.md` | 미결 의사결정 항목 |
| `~/.claude/projects/.../memory/feedback_reference_boxes.md` | "관련개념 박스는 자기충족 설명" 사용자 피드백 |
| `~/.claude/projects/.../memory/user_role.md` | 사용자 프로필 (이차전지 대학원생, 한국어 응답 선호) |

`.omc/plans/`는 historical record로 그대로 둘 것. 새 작업의 plan은 새 파일로 추가.

---

## 6. 자주 수행하는 작업 — 빠른 명령 예시

### 한 본문 분량 늘리기
```
"02_kinetics.md를 60줄로 보강해줘. Marcus 이론 섹션을 더 상세히, 예제 계산 추가."
```

### 그림/도식 추가 (텍스트 마크다운)
```
"03_interface.md의 SEI 이중층 구조를 ASCII 다이어그램으로 추가해줘."
```

### 영역 간 일관성 점검
```
"06/02_polarization.md의 Butler-Volmer 박스와 01/02_kinetics.md 본문의 식 표기, 변수 정의를 대조해서 모순이 있는지 확인해줘."
```

### 학습 경로 안내 추가
```
"00_index.md에 '연구 주제별 진입 경로' 섹션을 추가해줘. 양극재 / 음극재 / 고체전해질 / 셀 진단 4가지."
```

### 통합 글로서리 생성
```
"모든 본문에서 사용된 핵심 학술 용어와 처음 등장하는 파일을 모아 GLOSSARY.md를 만들어줘."
```

### Dependency map 생성
```
"33개 본문 사이의 인용 관계를 분석해서 docs/dependency_graph.md에 mermaid 그래프로 시각화해줘."
```

---

## 7. Don't (금지 사항)

- ❌ 박스 안에 외부 `.md` 링크 넣기 (자기충족 규칙 위반)
- ❌ 식 먼저 적고 설명 나중에 (직관 선행 위반)
- ❌ 기초 용어를 본문에서 단독 정의 3회 이상 (복습 톤 위반)
- ❌ 작성되지 않은 stub 파일로의 링크 만들기
- ❌ "이 영역은 추후 작성 예정" 같은 placeholder 추가 — 현재는 모두 완성됨
- ❌ `.omc/plans/` 안의 historical record 수정 — 새 plan은 새 파일로
- ❌ 기존 본문의 섹션 번호/제목을 임의 재배열 — 다른 본문이 인용하고 있을 수 있음

---

## 8. 품질 검증 명령어 모음

```bash
# 모든 본문의 줄 수 (헤더/공백 포함)
wc -l **/*.md

# 깨진 링크 후보 (stub로의 링크가 있는지)
grep -rn '\.\./' --include='*.md' | grep -v '00_overview\|01_voltage_curves\|02_polarization\|...'

# 박스 안 외부 링크 (작동이론에서만 검증)
grep -A 3 -rn '> \*\*관련 개념' 06_battery_operation/ | grep '\.md)'

# LaTeX `$` 기호 짝수 검증 (Python)
# python -c "import re; [print(f, c) for f in glob('**/*.md', recursive=True) if (c:=open(f).read().count('$')) % 2]"

# 참고 문헌 섹션 존재 여부
grep -L '## 참고 문헌' **/*.md
```

---

## 9. 변경 이력

| 날짜 | 작업 | 결과 |
|---|---|---|
| 2026-04-27 | 초기 구조 + 작동이론(06) 8개 본문 | 40 파일 생성 |
| 2026-04-27 | 관련개념 박스 자기충족 형태로 전환 | 박스 외부 링크 0건 |
| 2026-04-27 | 01-05 영역 25개 본문 완성 | 6개 영역 모두 본문 완성, 4148줄 |
| 2026-04-27 | 07-09 영역 (소재분석·전기화학분석·고도분석) 추가 | +24 파일 |

새 작업을 추가할 때 이 표에 한 줄 추가 권장.
