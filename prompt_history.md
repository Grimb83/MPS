# 📜 Prompt History

이 문서는 프로젝트의 주요 설계 결정 사항과 프롬프트 이력을 기록합니다.

## 2026-03-12 (v1.5.8 업데이트)

### 📌 작업 내용: gemini.md 현대화 및 디자인 시스템 지침 명문화
- **사유:** 설계된 디자인 토큰(Color, Radius 등)을 시스템 전체 가이드라인에 반영하여 개발 일관성 확보.
- **주요 변경 사항:**
    1. 프로젝트 레벨(Starter) 명시.
    2. Executive Summary 출력 의무화 규칙 추가.
    3. 디자인 토큰(Primary: #3b82f6, Secondary: #64748b, Radius: 0.5rem) 및 UI 원칙 상세 기술.
    4. docs/ 폴더 표준 구조 정의.
- **결과:** 에이전트가 새로운 UI 개발 시 별도의 설명 없이도 정의된 디자인 시스템을 자동으로 준수하도록 설정 완료.

## 2026-03-16 (v2.0 고도화)

### 📌 작업 내용: lib/system-utils.ts 및 타입 시스템 강화
- **사유:** `Task` 객체를 다루는 유틸리티 함수의 타입 안정성 확보 및 컴포넌트 간 데이터 일관성 유지.
- **주요 변경 사항:**
    1. `lib/types.ts`에 `TaskStatus` 리터럴 타입("진행" | "지연" | "보류" | "완료" | "취소") 추가 및 `Task` 인터페이스 적용.
    2. `lib/system-utils.ts` 내 주요 유틸리티 함수(`calculateDDay`, `getStatusTheme`, `getAssigneeColor`)에 `TaskStatus` 및 `Task['assignee']` 타입 적용.
    3. `StatusBadge`, `UserAvatar` 컴포넌트의 Props 타입을 `TaskStatus`로 업데이트하여 타입 동기화.
    4. `lib/google-sheets.ts`의 데이터 매핑 로직(`mapRowToTask`)에 `TaskStatus` 타입 캐스팅 추가.
- **결과:** 프로젝트 전반에서 상태값에 대한 타입 체크가 강화되어 잠재적인 런타임 오류 방지 및 개발 생산성 향상.
