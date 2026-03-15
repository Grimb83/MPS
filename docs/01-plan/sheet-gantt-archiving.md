# 📋 [Plan] Sheet-Gantt Auto-Archiving System (v1.5.8)

## 1. 개요 (Executive Summary)

| 항목 | 상세 내용 |
| :--- | :--- |
| **제품명** | Sheet-Gantt Manager |
| **기능명** | Auto-Archiving System (자동 아카이빙) |
| **작업 기간** | 2026-03-15 |
| **목표 상태** | '완료' 및 '취소'된 항목을 자동으로 `Completed` / `Canceled` 시트로 이동 및 원본 시트에서 삭제 |
| **핵심 가치** | 활성 태스크 집중도 향상 및 데이터 무결성 보장 |

---

## 2. 기술 설계 (Technical Design)

1. **`archiveSheetData` (lib/google-sheets.ts):**
   - **Append:** `Completed` 또는 `Canceled` 시트에 데이터 추가.
   - **Delete:** `Gantt` 시트에서 해당 행 삭제.
2. **Server Action (app/actions.ts):**
   - `archiveTaskAction` 호출 시 위 로직 수행.
3. **UI (components/gantt-chart.tsx):**
   - 'Done' 클릭 시 아카이빙 트리거 및 목록에서 즉시 제거.
