# ?? Design: Pop-out Row Hover Effect

## 1. 컴포넌트 수정 (Component Update)
- **대상:** `components/task-table.tsx`의 `tr` 태그.
- **스타일링:** `Tailwind CSS`의 `hover:scale-102` 및 `hover:z-50` 적용.

## 2. 디자인 명세 (Design Spec)
- **확대 효과:** `hover:scale-[1.015]` (약 1.5% 확대하여 1~2% 범위 충족).
- **그림자:** `hover:shadow-2xl` 및 `hover:shadow-primary/20`.
- **배경색:** `hover:bg-card` (더 밝거나 뚜렷하게 유지).
- **테두리:** `hover:ring-1 hover:ring-primary/40` (테두리 추가로 팝업 효과 극대화).
- **Z-Index:** `hover:relative hover:z-[50]`.
- **전환 효과:** `transition-all duration-300 ease-out`.

## 3. 작업 목록 (Todo List)
- [ ] `components/task-table.tsx`의 `tr` 클래스 전면 수정.
- [ ] 테이블 컨테이너(`div`)의 `p-1` 또는 `mx-2` 추가로 확대된 행이 잘리지 않도록 함.

---
*Created by bkit (v1.5.8)*
