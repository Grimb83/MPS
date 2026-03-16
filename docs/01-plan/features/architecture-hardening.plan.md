# ?? Plan: Architecture Hardening & Performance Optimization

## 1. 개요 (Overview)
- **기능명:** 아키텍처 강화 및 성능 최적화
- **목적:** 중복 타입 제거, 컴포넌트 비대화 해결, 애니메이션 성능 최적화 및 데이터 계층 정제를 통한 시스템 안정성 확보.
- **범위:** `lib/types.ts` (신규), `components/task-table.tsx`, `components/task-row.tsx` (신규), `lib/google-sheets.ts`, `components/gantt-chart.tsx`.

## 2. 요구사항 (Requirements)
- [ ] **Type Unification:** 모든 컴포넌트에서 사용하는 `Task` 인터페이스를 `lib/types.ts`로 통합.
- [ ] **Component Refactoring:** `TaskTable`에서 개별 행 렌더링 로직을 `TaskRow`로 분리.
- [ ] **Performance:** `will-change: transform, shadow` 적용 및 애니메이션 최적화.
- [ ] **Data Layer Cleanup:** `lib/google-sheets.ts`의 관심사 분리 (Fetch vs Parse vs Mock).

## 3. 예상 결과 (Expected Value)
- 유지보수성 향상 (타입 변경 시 한 곳만 수정).
- 렌더링 성능 최적화 (60FPS 호버 효과).
- 코드 가독성 및 재사용성 증대.

---
*Created by bkit (v1.5.8)*
