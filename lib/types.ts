/**
 * MPS Global Types
 */

export type TaskStatus = "진행" | "지연" | "보류" | "완료" | "취소";

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  start: string;
  end: string;
  progress: number;
  assignee: string;
  issues: string;
  resolution: string;
}

export interface TaskTableProps {
  tasks: Task[];
  expandedRows: Set<string>;
  onToggleRow: (id: string, e: React.MouseEvent) => void;
  onRowClick: (task: Task) => void;
}
