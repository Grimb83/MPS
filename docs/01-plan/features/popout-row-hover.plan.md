# ?? Plan: Pop-out Row Hover Effect

## 1. 개요 (Overview)
- **기능명:** 과업 테이블 행 Pop-out 호버 효과
- **목적:** 마우스 커서를 올렸을 때 행이 물리적으로 튀어나오는 듯한 입체감을 제공하여 시각적 피드백을 극대화함.
- **범위:** `components/task-table.tsx`.

## 2. 요구사항 (Requirements)
- [ ] 마우스 호버 시 행의 크기를 1~2% 확대 (`scale-101` 또는 `scale-102`).
- [ ] 확대 시 다른 행보다 위에 보이도록 `z-index` 및 `relative` 포지셔닝 강화.
- [ ] 확대 효과와 어울리는 더 깊은 그림자(`shadow-2xl`) 및 외곽선 강조 추가.
- [ ] 테이블 컨테이너의 `overflow-hidden`으로 인해 효과가 잘리지 않도록 여백(Padding) 또는 스타일 조정.

## 3. 예상 결과 (Expected Value)
- 사용자가 선택한 행이 확실하게 강조되어 인터랙션의 즐거움과 명확성 제공.
- 현대적이고 입체적인 UI 디자인 구현.

---
*Created by bkit (v1.5.8)*
