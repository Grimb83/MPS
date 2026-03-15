# 🎨 [Design] Sheet-Gantt Manager Advanced (v1.5.8)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **기능명** | Sheet-Gantt Manager Advanced (고도화) |
| **설계 일자** | 2026-03-15 |
| **핵심 범위** | 양방향 데이터 연동, 지능형 위젯, 고급 필터링 시스템 |
| **디자인 원칙** | 실시간성, 데이터 시각화, mps-design-system 준수 |

---

## 2. 데이터 흐름 설계 (Data Flow)

### 2.1 양방향 동기화 (Bi-directional Sync)
1. **Client Action:** 사용자가 UI에서 태스크 수정 (예: 진행률 변경).
2. **Optimistic Update:** UI에 변경 사항 즉시 반영 (Loading State 표시).
3. **Server Action:** `updateTaskInSheet` 함수 호출.
   - 시트에서 해당 Task ID의 행(Row) 검색.
   - 해당 행의 데이터 업데이트 (Spreadsheet API v4).
4. **Revalidation:** `revalidateTag('gantt-data')`를 통해 최신 데이터 페칭 트리거.

### 2.2 API 상세 명세
- **Update:** `PUT https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}?valueInputOption=USER_ENTERED`
- **Append:** `POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append?valueInputOption=USER_ENTERED`

---

## 3. UI/UX 및 컴포넌트 설계 (UI/UX Design)

### 3.1 신규 컴포넌트 구조
- **`AdvancedSearchControl`**:
  - `Input`: 실시간 검색 (Task Name, Remarks).
  - `Select (Multiple)`: 담당자(Assignee) 필터.
  - `Tabs`: 상태별 필터 (전체/진행/완료/지연).
- **`DashboardAnalytics`**:
  - `DelayAlertCard`: 마감일 초과 태스크 수 표시.
  - `ResourceBarChart`: 담당자별 업무 로드 시각화 (Tailwind CSS 기반 커스텀 차트).

### 3.2 디자인 토큰 활용
- **Alert:** 지연 업무 강조 시 `Destructive(#ef4444)` 및 `Animate-Pulse` 효과 적용.
- **Resource Bar:** 담당자별 고유 색상(Palette) 부여하여 가독성 증대.

---

## 4. 로직 상세 설계 (Technical Logic)

### 4.1 지연 태스크 판별 로직
```typescript
const isDelayed = (endDate: string, status: string) => {
  const today = new Date();
  const deadline = new Date(endDate);
  return status !== '완료' && deadline < today;
};
```

### 4.2 행(Row) 매핑 전략
- 시트의 첫 번째 열(`ID`)을 고유 키로 활용.
- 데이터 로딩 시 행 인덱스(Row Index)를 포함하여 매핑 테이블 구축 (O(1) 접근 지향).

---

## 5. 검증 계획 (Validation Plan)

| 검증 항목 | 방법 | 기대 결과 |
| :--- | :--- | :--- |
| **쓰기 기능** | 실제 구글 시트 반영 여부 확인 | 웹 수정 즉시 시트 셀 값 변경 확인 |
| **필터링 성능** | 100개 이상의 태스크 필터링 테스트 | 0.5초 이내 검색 결과 반영 |
| **낙관적 업데이트** | 네트워크 지연 상황 시뮬레이션 | UI 즉시 반영 후 배경에서 저장 성공 확인 |

---

## 6. 최종 확인 (Sign-off)

본 설계서는 기획서의 요구사항을 100% 충족하며, mps-design-system의 일관성을 유지하면서도 기능적 고도화를 실현합니다.
