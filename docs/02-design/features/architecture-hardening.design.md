# ?? Design: Architecture Hardening & Performance Optimization

## 1. 신규 파일 및 구조 설계 (New Files & Structure)
- `lib/types.ts`: 전역 `Task` 타입 선언.
- `components/task-row.tsx`: `TaskTable`에서 추출된 개별 행 렌더링 컴포넌트.

## 2. 타입 정의 (Types)
```typescript
export interface Task {
  id: string;
  name: string;
  status: string;
  start: string;
  end: string;
  progress: number;
  assignee: string;
  issues: string;
  resolution: string;
}
```

## 3. 성능 최적화 (Performance Optimization)
- `tr` 요소에 `will-change: transform, box-shadow` 클래스 추가.
- `useMemo` 및 `React.memo` 적용 검토를 통한 불필요한 리렌더링 방지.

## 4. 작업 목록 (Todo List)
- [ ] `lib/types.ts` 생성 및 기존 파일(`task-table.tsx`, `task-modal.tsx`, `gantt-chart.tsx`, `dashboard-widgets.tsx`)의 타입 선언 제거 후 임포트로 교체.
- [ ] `components/task-row.tsx` 파일 생성 및 `TaskTable`의 행 렌더링 로직 이관.
- [ ] `TaskTable` 컴포넌트 리팩토링 및 `TaskRow` 사용하도록 수정.
- [ ] `lib/google-sheets.ts`에서 Mock 데이터를 외부 JSON 파일 또는 상수로 분리.

---
*Created by bkit (v1.5.8)*
