# ?? Design: Row Hover Enhancement

## 1. 컴포넌트 수정 (Component Update)
- **대상:** `components/task-table.tsx`의 `tr` 태그.
- **스타일링:** `Tailwind CSS` 클래스 수정.

## 2. 디자인 명세 (Design Spec)
- **배경색:** `hover:bg-primary/10` (기존 /5 대비 2배 강화).
- **효과:** `hover:shadow-md`, `hover:scale-[1.002]` (미세한 확대 효과), `transition-all duration-300` (부드러운 전환).
- **테마 반영:** `lib/system-utils.ts`의 `getStatusTheme`에서 반환하는 `rowBg` 값을 조정하여 상태별 테마와 일관성 유지.

## 3. 작업 목록 (Todo List)
- [ ] `lib/system-utils.ts`의 `getStatusTheme` 내 `rowBg` 투명도 조정 (5% -> 10~15%).
- [ ] `components/task-table.tsx`의 `tr` 클래스에 애니메이션 및 스타일 추가.

---
*Created by bkit (v1.5.8)*
