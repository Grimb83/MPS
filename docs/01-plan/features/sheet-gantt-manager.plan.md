# 📋 [Plan] Sheet Gantt Manager (v1.5.8)

## 1. 개요 (Overview)

| 항목 | 상세 내용 |
| :--- | :--- |
| **기능명** | Sheet Gantt Manager (Google Sheets 기반 일정 관리) |
| **목적** | 구글 시트를 DB로 활용하여 서버 비용 없이 간트 차트 일정 관리 서비스 구축 |
| **핵심 스택** | Next.js (App Router), Google Sheets API v4, mps-design-system |
| **배포 환경** | Vercel (Static / Serverless) |

---

## 2. 요구사항 및 작업 범위 (Scope)

### 2.1 핵심 요구사항 (Ref. PRD v1.2)
- **데이터 연동:** Google Sheets API를 통한 실시간 데이터 로딩 및 상태 변경 시 시트 간 이동(Archiving) 구현.
- **상태 관리:** 진행/지연/보류/완료/취소 5단계 상태 관리 및 시각적 피드백 제공.
- **시각화:** 메인 시트의 활성 태스크(진행/지연/보류)만 간트 차트에 렌더링.
- **UI/UX:** `mps-design-system` 테마 및 상태별 컬러 코드 적용.

### 2.2 제외 범위 (Out of Scope for MVP)
- 사용자가 직접 시트를 생성하는 기능.
- 실시간 채팅 및 알림 기능.

---

## 3. 작업 로드맵 (Roadmap)

1.  **Phase 1 (Plan):** 요구사항 분석 및 상태 관리/아카이빙 계획 수립 (완료)
2.  **Phase 2 (Design):** 
    - Google Sheets API **Write** 권한 및 데이터 이동 로직 설계.
    - 상태별 필터링 알고리즘 및 간트 차트 UI 상세 설계.
3.  **Phase 3 (Do):** 
    - API 연동부 구현 (Read/Write/Delete for archiving).
    - 간트 차트 및 상태 체크 UI 개발.
    - `mps-design-system` 테마 적용.
4.  **Phase 4 (Check):** 시트 간 데이터 이동 정확도 및 차트 필터링 검증.
5.  **Phase 5 (Act):** 이슈 수정 및 Vercel 배포 완료.

---

## 4. 핵심 성능 지표 (KPI)

- **로딩 속도:** 2초 이내 차트 렌더링.
- **아카이빙 정확도:** 상태 변경 시 100% 확률로 해당 시트로 데이터 이동 및 메인 시트 삭제 완료.
- **데이터 일관성:** 시트 데이터와 웹 UI 상태의 실시간 동기화.

---

## 5. 리스크 관리 (Risk Management)

- **API 권한:** 데이터 이동을 위해 Google Sheets API의 **Write/Delete** 권한 필요 (OAuth 2.0 또는 Service Account 설정 필수).
- **데이터 손실:** 이동 과정에서 데이터 유실 방지를 위한 트랜잭션 처리(또는 순차적 API 호출) 검증.
- **복잡도 증가:** 단순 조회 앱에서 데이터 관리 앱으로 확장에 따른 개발 공수 증가 반영.
