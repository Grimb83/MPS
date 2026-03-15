# 🤖 Gemini Collaboration Guide (v1.5.8)

이 문서는 AI 에이전트(Gemini)가 프로젝트를 이해하고 확장하는 데 필요한 핵심 아키텍처와 협업 프로토콜을 정의합니다. 모든 개발 작업은 반드시 **bkit** 방법론을 기반으로 수행됩니다.

---

## 🛑 0. 핵심 협업 및 환경 지침 (Core Mandates)

> 이 섹션의 지침은 모든 작업 시 최우선으로 준수되며, 절대 생략하거나 임의로 수정할 수 없다.

*   **프로젝트 레벨:** 이 프로젝트는 **Starter** 레벨(정적 웹/프로토타입)로 운영된다.
*   **언어 원칙:** 모든 답변, 코드의 주석, 설명은 반드시 **한국어**로만 작성한다.
*   **기록 의무:** 모든 주요 프롬프트와 설계 결정 사항은 항상 `prompt_history.md`에 기록한다.
*   **Executive Summary:** 문서 작업(`/pdca plan, design, report` 등) 완료 후 반드시 요약 보고를 수행해야 한다.
*   **데이터 보존:** 모든 명세서(`docs/*.md`)는 시스템의 'Source of Truth'이며, 기존의 상세 설계 내역은 명시적인 수정 요청이 없는 한 **항상 100% 유지**한다.

---

## 🛠️ 1. AI Skills & Development Kit

| 스킬명 | 설명 | 핵심 도구 |
| :--- | :--- | :--- |
| **`bkit (v1.5.8)`** | **필수:** PDCA 기반의 워크플로우 관리 및 최신 v1.5.8 기능 지원. | `/pdca` 명령어 그룹 |
| **`pm-discovery`** | **기획:** PM 에이전트 팀을 통한 제품 발견 및 PRD 생성. | `/pm-discovery` |
| **`plan-plus`** | **심화 설계:** 브레인스토밍 기반의 고도화된 PDCA 설계 지원. | `/plan-plus` |
| **`simplify`** | **품질 개선:** 코드 품질 리뷰 및 효율적인 재사용성 최적화. | `/simplify` |

## 🎨 2. 디자인 시스템 (MPS Design System)

- **핵심 원칙:** 모든 UI는 `docs/02-design/features/design-system.design.md`에 정의된 가이드라인을 엄격히 준수한다.
- **디자인 토큰 (Core Tokens):**
    - **Primary:** `#3b82f6` (Main Action)
    - **Secondary:** `#64748b` (Sub Action)
    - **Radius:** `0.5rem (8px)` (Medium - Default)
- **UI 라이브러리:** `shadcn-ui`, `Tailwind CSS`, `Lucide React`를 기본으로 사용한다.
- **구현 원칙:** 직접적인 인라인 스타일링보다는 Tailwind 클래스와 정의된 CSS 변수(`globals.css`)를 우선 활용하여 일관성을 유지한다.

## 🛡️ 3. 협업 프로토콜 및 bkit 규칙

- **bkit 자동화:** 에이전트는 세션 시작 시 bkit 환경을 점검하며, 유실된 경우 자동으로 복구/재설치 후 작업을 시작한다.
- **PDCA 워크플로우:** 신규 기능 구현 시 반드시 아래 순서를 준수한다.
    - `/pdca plan` -> `design` -> `do` -> `analyze` -> `report`
- **표준 문서 구조:** 모든 문서는 아래 구조에 따라 관리된다.
    - `docs/01-plan/`: 기획 및 요건 정의서
    - `docs/02-design/`: 상세 설계서 및 컴포넌트 설계서
    - `docs/03-analysis/`: 구현물 차이 분석 보고서 (Gap Analysis)
    - `docs/04-report/`: 최종 완료 보고서
- **적대적 리뷰:** 시스템 검토 요청 시 항상 `codebase_investigator`를 호출하여 아키텍처 결함을 객관적으로 분석한다.
- **성과 보고:** 작업 완료 후 반드시 **bkit Feature Usage** 보고서를 포함하여 결과를 요약한다.
