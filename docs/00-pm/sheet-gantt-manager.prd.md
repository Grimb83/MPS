# 📄 [PRD] Sheet Gantt Manager (Google Sheets 기반 일정 관리)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **제품명** | Sheet Gantt Manager |
| **핵심 가치** | 서버 비용 0원, 구글 시트 연동을 통한 초간편 간트 차트 일정 관리 |
| **타겟 유저** | 프리랜서, 소규모 프로젝트 팀, 서버 구축 없이 일정을 관리하고 싶은 개인 |
| **배포 환경** | Vercel (Next.js 정적 웹/서버리스) |
| **백엔드** | Google Sheets API |

---

## 2. Phase 1: Discovery (기회 탐색 - OST)

### 2.1 Desired Outcome (목표)
- 서버 비용 없이 웹 기반의 시각적 프로젝트 일정 관리 도구 제공.

### 2.2 Opportunities (해결할 문제)
- 기존 SaaS형 일정 관리 툴(Jira, Asana 등)은 소규모 팀이나 개인에게 무겁고 비용이 발생함.
- 엑셀/구글 시트로만 관리하면 간트 차트 등 시각적 피드백이 부족하여 일정 직관성이 떨어짐.

### 2.3 Solutions (솔루션)
- **데이터 소스:** 사용자의 Google Sheet를 데이터베이스로 사용.
- **시각화:** Sheet의 데이터를 읽어와 웹에서 반응형 간트 차트(Gantt Chart)로 렌더링.
- **접근성:** Vercel 배포를 통해 언제 어디서나 웹으로 접근 가능.

---

## 3. Phase 2: Strategy (제품 전략)

### 3.1 Value Proposition (가치 제안 - JTBD)
- **Who:** 복잡한 시스템 구축을 꺼리는 소규모 프로젝트 매니저나 프리랜서는
- **Why:** 매월 고정 비용을 내지 않으면서도
- **What:** 자신의 구글 시트에 데이터만 입력하면 자동으로 예쁜 간트 차트가 생성되어
- **Progress:** 전체 프로젝트 일정을 한눈에 파악하고 팀원들과 쉽게 공유할 수 있다.

### 3.2 Lean Canvas 요약
- **문제:** 무겁고 비싼 SaaS 프로젝트 툴, 시각화가 부족한 스프레드시트.
- **대안:** 노션, 구글 시트 기본 차트, Trello.
- **고유 가치 제안:** "당신의 구글 시트가 1초 만에 멋진 웹 간트 차트로 변신합니다. 서버 비용 완전 무료."
- **솔루션:** Google Sheets API 연동 + 웹 간트 차트 라이브러리 연동 + Vercel 배포.
- **비용 구조:** Vercel 무료 티어, Google Cloud Console 무료 티어.

---

## 4. Phase 3: Research (시장 및 사용자 연구)

### 4.1 Target Personas
- **프리랜서 개발자/디자이너:** 여러 외주 프로젝트의 마감일을 한눈에 보고 싶으나, 유료 툴 결제는 부담스러움.
- **소규모 동아리 리더:** 팀원들과 일정을 공유해야 하는데, 구글 시트는 접근성이 좋지만 일정 변경을 시각적으로 파악하기 어려움.

### 4.2 주요 경쟁사 비교 (Competitors)
- **Smartsheet / Airtable:** 기능은 막강하지만 유료이며 학습 곡선이 존재함.
- **본 솔루션의 차별점:** 오직 "구글 시트 연동"과 "간트 차트 뷰"에만 집중하여 학습 비용 0, 유지 유지비 0 달성.

---

## 5. Phase 4: Product Requirements (상세 요구사항)

### 5.1 핵심 기능 (Core Features)
1. **구글 시트 연동 (Google Sheets API Integration)**
   - 표준화된 컬럼 포맷 제공 (Task ID, Name, Status 등).
2. **상태 관리 및 자동 아카이빙 (Status & Archiving)**
   - **상태 구분:** `진행`, `지연`, `보류`, `완료`, `취소`.
   - **이동 로직:** 사용자가 `완료` 또는 `취소`로 상태를 변경할 경우, 해당 로우(Row)를 메인 시트에서 삭제하고 각각 `Completed` 또는 `Canceled` 시트로 자동 이동(Move).
   - **간트 차트 필터링:** 메인 시트에 남은 `진행`, `지연`, `보류` 데이터만 차트에 렌더링하여 차트의 정결함 유지.
3. **간트 차트 렌더링 (Gantt Chart Visualization)**
   - 상태별 막대 색상 차별화 (지연: Red, 보류: Yellow, 진행: Blue).
4. **디자인 시스템**
   - `mps-design-system` 적용.

### 5.2 기술 스택 (Tech Stack)
- **Frontend:** Next.js (App Router), Tailwind CSS
- **UI Components:** shadcn-ui + mps-design-system 스킬
- **Backend/DB:** Google Sheets API (v4)
- **Deployment:** Vercel

### 5.3 데이터 스키마 (표준 시트 구조)
| Task ID | Task Name | Status (상태) | Start Date | End Date | Progress (%) | Assignee | Issues (이슈사항) | Resolution (해결/비고) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| T-01 | 기획 문서 작성 | **완료** | 2026-03-12 | 2026-03-14 | 100 | Param | - | 기획 완료 (Completed 시트로 이동 대상) |
| T-02 | UI 디자인 | **지연** | 2026-03-15 | 2026-03-18 | 20 | Designer | 폰트 라이선스 확인 필요 | 가비아 오픈가이스트 폰트 사용 협의 중 |
| T-03 | API 연동 구현 | **진행** | 2026-03-19 | 2026-03-22 | 0 | Developer | 시트 접근 권한 이슈 가능성 | 서비스 계정 활용 예정 |
| T-04 | 테스트 플랜 | **보류** | 2026-03-23 | 2026-03-25 | 0 | QA | 인력 부족 | 4월 초 재개 예정 |

---

## 6. Success Metrics (성공 지표)
- Vercel 배포 성공 및 초기 데모 접속 정상화.
- 샘플 구글 시트 데이터를 2초 이내에 차트로 렌더링 완료.
- 모바일 및 데스크톱 환경 반응형 대응 완벽도.
