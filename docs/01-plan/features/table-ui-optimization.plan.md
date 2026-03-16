# ?? Plan: Table UI Optimization

## 1. 개요 (Overview)
- **기능명:** 테이블 하단 스크롤 디자인 및 반응형 레이아웃 최적화
- **목적:** 구린(?) 기본 스크롤바를 제거하거나 커스텀하고, 가로 스크롤 없이도 모바일에서 보기 좋게 개선.
- **범위:** `components/task-table.tsx`, `app/globals.css`.

## 2. 요구사항 (Requirements)
- [ ] 기본 스크롤바 숨기기 (Hidden Scrollbar) 또는 초슬림 커스텀 스타일 적용.
- [ ] 모바일/태블릿에서 불필요한 컬럼 숨기기 (`hidden md:table-cell`).
- [ ] 데이터가 좁은 화면에서도 깨지지 않도록 가변 폭(Flexible Width) 적용.
- [ ] 스크롤 시 부드러운 스냅(Snap) 또는 관성 효과 추가.

## 3. 예상 결과 (Expected Value)
- 어떤 화면에서도 세련된 인터페이스 유지.
- 불필요한 시각적 노이즈(기본 스크롤바) 제거.

---
*Created by bkit (v1.5.8)*
