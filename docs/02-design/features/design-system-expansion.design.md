# 🎨 [Design] MPS Design System Expansion (v1.5.8)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **기능명** | Design System Expansion (표준화 및 확장) |
| **설계 일자** | 2026-03-15 |
| **설계자** | Gemini CLI (bkit v1.5.8) |
| **핵심 목표** | 파편화된 UI 패턴을 `components/ui`로 추출하여 재사용성 200% 향상 |

---

## 2. 설계 상세 (Design Specifications)

### 2.1 UI 컴포넌트 명세 (Core Components)

#### A. Modal (Standard Overlay)
- **기반:** `Radix UI Dialog` (shadcn-ui 표준 준수)
- **속성:** `title`, `description`, `children`, `footer`.
- **디자인:** `Radius: 2.5rem`, `Shadow: 2xl`, `Backdrop: Blur (sm)`.

#### B. Status Badge & Row Highlighting
- **상태 정의:**
    - `진행`: `bg-primary`, `text-white`
    - `지연`: `bg-destructive/10`, `text-destructive`, `border-destructive/20` (Bounce 애니메이션 포함)
    - `보류`: `bg-secondary/10`, `text-secondary`, `border-secondary/20`
    - `완료`: `bg-success/10`, `text-success`, `border-success/20`
- **로직:** 상태별 투명 배경색(`RowBg`) 토큰 정의.

#### C. User Avatar (Hash-based)
- **기능:** 담당자 이름을 기반으로 고유 색상 자동 생성.
- **색상 팔레트:** `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `rose`, `emerald`, `teal`, `cyan` (50, 600, 100 조합).

### 2.2 시스템 토큰 및 유틸리티 (System Tokens & Utils)

#### A. Typography Tokens
- **Action Title:** `text-xl font-black tracking-tighter`
- **Label (Uppercase):** `text-[10px] font-black uppercase tracking-[0.2em]`
- **Data (Mono/Tight):** `text-[15px] font-black tracking-tighter`

#### B. Utility Functions (`lib/utils.ts` 확장)
- `calculateDDay(date: string, status: string): number | null`
- `getAssigneeColor(name: string): string` (Tailwind Class 조합 반환)

---

## 3. 구현 전략 (Implementation Strategy)

### 3.1 파일 구조 (Directory Structure)
```text
components/
├── ui/
│   ├── modal.tsx (New)
│   ├── status-badge.tsx (New)
│   ├── user-avatar.tsx (New)
│   └── progress-slider.tsx (New)
lib/
└── system-utils.ts (New - Logic Extraction)
```

### 3.2 단계별 구현 계획
1.  **Phase 1:** `lib/system-utils.ts`로 비즈니스 로직(D-Day, Color Hash) 추출.
2.  **Phase 2:** `components/ui` 아래에 순수 UI 컴포넌트 4종 구현.
3.  **Phase 3:** `GanttChart.tsx` 내부의 인라인 로직을 신규 컴포넌트로 교체 및 검증.

---

## 4. 품질 및 제약 사항 (Constraints)

- **하위 호환성:** 기존 `GanttChart`의 기능적 동작(Optimistic UI 등)이 컴포넌트 추출 후에도 동일하게 유지되어야 함.
- **디자인 일관성:** 모든 신규 컴포넌트는 `docs/02-design/features/design-system.design.md`에 정의된 Primary 색상(#3b82f6)을 기본으로 함.

---

## 5. 최종 확인 (Sign-off)

| 구분 | 상태 | 비고 |
| :--- | :--- | :--- |
| **계획 일치 여부** | ✅ Pass | Plan 문서의 모든 요구사항 수용 |
| **디자인 토큰 준수** | ✅ Pass | MPS 표준 토큰 적용 |
| **구현 가능성** | ✅ Pass | 기존 코드 기반으로 즉시 추출 가능 |
