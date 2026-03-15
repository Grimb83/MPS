# 🎨 [Design] MPS Design System (v1.5.8)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **작업명** | MPS Design System 상세 설계 |
| **기준** | shadcn-ui + TailwindCSS (Starter Level) |
| **핵심 목적** | 일관된 UI 제공 및 빠른 UI 개발 환경 구축 |
| **상태** | In Progress (Design Phase) |

---

## 2. 디자인 토큰 (Design Tokens)

### 2.1 색상 (Colors - Tailwind Config Extension)
| 이름 | 변수명 | HEX | 설명 |
| :--- | :--- | :--- | :--- |
| **Primary** | `--primary` | `#3b82f6` (Blue 500) | 메인 액션 및 브랜드 컬러 |
| **Secondary** | `--secondary` | `#64748b` (Slate 500) | 서브 정보 및 보조 버튼 |
| **Success** | `--success` | `#22c55e` (Green 500) | 긍정적 결과 및 상태 알림 |
| **Destructive** | `--destructive`| `#ef4444` (Red 500) | 삭제 및 경고 액션 |
| **Background** | `--background` | `#ffffff` / `#020817` | 배경색 (라이트/다크) |

### 2.2 타이포그래피 (Typography)
- **폰트 패밀리:** `Geist Sans`, `Inter`, `sans-serif` (Default)
- **폰트 사이즈:**
    - `H1`: 2.25rem (36px) / Bold
    - `H2`: 1.875rem (30px) / Bold
    - `H3`: 1.5rem (24px) / Semi-bold
    - `Base`: 1rem (16px) / Regular
    - `Small`: 0.875rem (14px) / Regular

### 2.3 간격 및 둥글기 (Spacing & Radius)
- **Base Unit:** 4px (`0.25rem`)
- **Radius:** 
    - `Small`: 0.125rem (2px)
    - `Medium`: 0.5rem (8px)
    - `Large`: 1rem (16px)

---

## 3. 핵심 컴포넌트 명세 (Core Components)

### 3.1 Button (shadcn-ui)
- **Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes:** `default`, `sm`, `lg`, `icon`
- **Behavior:** Hover 시 불투명도 조절 및 스케일 애니메이션 피드백.

### 3.2 Card (Layout)
- **Usage:** 대시보드 요약, 기능 블록, 데이터 목록 항목.
- **Header/Content/Footer** 구조를 기본으로 하며 섀도우 효과(`shadow-sm`) 적용.

### 3.3 Input & Form (Feedback)
- **States:** Default, Focus (Ring 효과), Error (Red Border), Disabled.
- **Accessibility:** ARIA label 및 보조 텍스트(Helper Text) 지원.

---

## 4. 기술 명세 (Technical Specification)

- **Framework:** Next.js (App Router) - Starter Level 최적화.
- **Styling:** Tailwind CSS (v3+)
- **UI Lib:** Radix UI (Primitives) + shadcn-ui (Components)
- **Icons:** Lucide React

---

## 5. 작업 목록 (Implementation Checklist)

- [ ] `tailwind.config.ts` 테마 변수 설정
- [ ] `globals.css` 디자인 토큰(CSS Variables) 정의
- [ ] shadcn-ui 초기화 (`npx shadcn-ui@latest init`)
- [ ] 핵심 컴포넌트 설치 (Button, Card, Input, Badge)
- [ ] 샘플 페이지(Style Guide) 생성 및 검증
