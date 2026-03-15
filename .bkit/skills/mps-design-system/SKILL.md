---
name: mps-design-system
description: MPS 디자인 시스템(v1.5.8)을 프로젝트에 주입하고 관리합니다. shadcn-ui, Tailwind CSS, 디자인 토큰 설정을 포함하며, 일관성 있는 UI 구축을 지원합니다.
---

# 🎨 MPS Design System Skill (v1.5.8)

이 스킬은 **MPS Design System**의 핵심 자산(Tokens, Components, Config)을 새로운 프로젝트에 빠르고 일관되게 적용하기 위해 사용됩니다.

## 🚀 트리거 (Triggers)
- "디자인 시스템 적용해줘", "MPS 디자인 시스템 설치해줘"
- "브랜드 컬러 설정해줘", "버튼 컴포넌트 추가해줘"

## 🛠️ 워크플로우 (Workflows)

### 1. 기본 환경 구성
- `assets/templates/tailwind.config.ts` 및 `globals.css`를 프로젝트 루트/app 폴더에 복사합니다.
- `lib/utils.ts` 유틸리티 함수를 생성합니다.

### 2. 디자인 토큰 확인
- `references/tokens.md`를 참조하여 프로젝트의 브랜드 아이덴티티를 설정합니다.

### 3. 컴포넌트 주입
- `assets/components/` 폴더에 있는 핵심 컴포넌트들을 `components/ui/` 폴더로 복사합니다.

### 4. 스타일 가이드 생성
- `app/page.tsx`에 기본 스타일 가이드를 구성하여 시스템이 올바르게 작동하는지 확인합니다.

## 🎨 핵심 디자인 토큰 (Core Tokens)
- **Primary:** `#3b82f6` (Main Action)
- **Secondary:** `#64748b` (Sub Action)
- **Success:** `#22c55e` (Completed)
- **Destructive:** `#ef4444` (Danger)
- **Radius:** `0.5rem (8px)` (Medium)

## 📋 참고 자료
- 디자인 토큰 상세 명세: [references/tokens.md](references/tokens.md)
- 핵심 컴포넌트 소스: [assets/components/](assets/components/)
