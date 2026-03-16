# ?? Design: Table UI Optimization

## 1. 커스텀 스크롤 스타일 (Scrollbar Design)
- **대상:** `app/globals.css` 또는 `components/task-table.tsx`의 `scrollbar-hide` 클래스 적용.
- **방식:** 브라우저 기본 스크롤바는 숨기고, 마우스 오버 시에만 아주 얇게 노출하거나 아예 없앰.

## 2. 반응형 컬럼 제어 (Responsive Columns)
- **과업명:** 모바일(XS~SM)에서도 항상 유지.
- **상태:** 모바일에서 원형 점(Dot) 또는 심볼로 축소 가능 여부 검토.
- **날짜 관련:** `hidden md:table-cell` (모바일에서는 숨기고, 행 확장 시 상세 정보에서 노출).
- **담당자:** `hidden sm:table-cell` (모바일에서는 아바타만 노출하거나 숨김).

## 3. 작업 목록 (Todo List)
- [ ] `app/globals.css`에 `no-scrollbar` 유틸리티 추가 (또는 `tailwind-scrollbar-hide` 플러그인 모방).
- [ ] `components/task-table.tsx`의 각 `th`, `td`에 반응형 클래스(`hidden md:table-cell` 등) 적용.
- [ ] 테이블의 `min-w-[900px]`를 유연하게 조정 (`min-w-[700px]` 수준으로 완화).

---
*Created by bkit (v1.5.8)*
