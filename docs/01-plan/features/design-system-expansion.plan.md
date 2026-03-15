# 📋 [Plan] MPS Design System Expansion (v1.5.8)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **제품명** | MPS Design System |
| **기능명** | Expansion & Standardization (확장 및 표준화) |
| **작업 기간** | 2026-03-15 ~ |
| **목표 상태** | 파편화된 UI 요소를 표준 라이브러리로 통합 및 고도화 |
| **핵심 가치** | 재사용성, 일관된 UX, 개발 속도 향상 |

---

## 2. 문제 정의 및 솔루션 (Problem & Solution)

### 2.1 현재 상태 (As-Is)
- 간트 차트 고도화 과정에서 `Modal`, `Slider`, `Accordion` 등의 로직이 컴포넌트 내부에 결합되어 있어 타 페이지 재사용이 어려움.
- 담당자별 색상 지정, D-Day 계산 등 유용한 비즈니스 디자인 로직이 파편화되어 있음.
- 디자인 시스템이 기초적인 `Button`, `Card` 위주로 구성되어 있어 복잡한 상호작용 대응에 한계.

### 2.2 해결 방안 (To-Be)
- **컴포넌트 추출:** 간트 차트에서 검증된 UI 패턴을 독립된 공통 컴포넌트로 분리.
- **디자인 토큰 확장:** 상태 강조색(Row Highlighting), 그림자 깊이(Shadow Levels) 등을 시스템 토큰으로 정의.
- **유틸리티 표준화:** D-Day 계산, 해시 기반 색상 생성기 등을 시스템 유틸리티로 통합.

---

## 3. 핵심 확장 요구사항 (Requirements)

### 3.1 [Core] 공통 컴포넌트 추가
- [ ] **Navigation & Overlays:** `Modal` (Radix UI 기반), `Drawer`, `Popover`.
- [ ] **Advanced Forms:** `Slider` (Range), `Custom Select`, `Date Picker` 스타일링.
- [ ] **Data Display:** `Accordion` (리스트 확장), `Status Badge`, `User Avatar`.

### 3.2 [System] 디자인 토큰 및 유틸리티
- [ ] **Color Palette:** 상태별 Row 배경색(연한 투명도 포함) 및 담당자 그룹화 색상 테마.
- [ ] **Typography:** 과업명과 날짜 폰트 위계 표준화 (`font-black`, `tracking-tighter`).
- [ ] **Animations:** 사이렌(Bounce), 알림(Pulse) 등 경고용 애니메이션 표준화.

---

## 4. 리스크 관리 (Risk Management)

| 리스크 | 대응 전략 |
| :--- | :--- |
| **기존 코드 깨짐** | 공통 컴포넌트 적용 시 기존 `GanttChart`와 1:1 대조하며 점진적 교체. |
| **복잡도 증가** | `shadcn-ui`의 철학을 준수하여 꼭 필요한 속성만 노출하고 유연한 스타일링 허용. |

---

## 5. 단계별 일정 (Phases)

1.  **Phase 1 (Design):** 신규 컴포넌트 명세 및 디자인 토큰 상세 설계.
2.  **Phase 2 (Do - Base):** `Input`, `Slider`, `Badge` 등 기초 요소 표준화.
3.  **Phase 3 (Do - Advanced):** `Modal`, `Accordion` 등 복합 요소 구현 및 적용.
4.  **Phase 4 (Check/Act):** 전체 대시보드 테마 일관성 검증 및 보고서 작성.

---

## 6. 최종 확인 (Sign-off)

본 계획서는 프로젝트의 시각적 완성도를 전문가 수준으로 끌어올리고, 향후 기능 확장을 위한 견고한 UI 파운데이션을 구축하는 핵심 작업입니다.
