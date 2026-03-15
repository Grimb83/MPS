"use client";

import React, { useState, useTransition, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  updateTaskAction,
  createTaskAction,
  deleteTaskAction,
} from "@/app/actions";

// 분리된 컴포넌트 임포트
import { DashboardWidgets } from "./dashboard-widgets";
import { TaskTable } from "./task-table";
import { TaskModal } from "./task-modal";

interface Task {
  id: string;
  name: string;
  status: string;
  start: string;
  end: string;
  progress: number;
  assignee: string;
  issues: string;
  resolution: string;
}

export function GanttChart({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [activeTask, setActiveTask] = useState<Partial<Task>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const allTasks: Task[] = (initialData || [])
    .filter((row) => row && row.length >= 6)
    .map((row) => ({
      id: String(row[0] || ""),
      name: String(row[1] || "이름 없는 과업"),
      status: String(row[2] || "진행"),
      start: String(row[3] || "-"),
      end: String(row[4] || "-"),
      progress: parseInt(String(row[5] || "0"), 10) || 0,
      assignee: String(row[6] || "-"),
      issues: String(row[7] || "-"),
      resolution: String(row[8] || "-"),
    }));

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    allTasks,
    (state, action: { type: "update" | "add" | "delete"; task?: Task }) => {
      if (action.type === "add" && action.task) return [...state, action.task];
      if (action.type === "update" && action.task)
        return state.map((t) => (t.id === action.task!.id ? action.task! : t));
      if (action.type === "delete" && action.task)
        return state.filter((t) => t.id !== action.task!.id);
      return state;
    },
  );

  const filteredTasks = optimisticTasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "전체" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setModalMode("add");
    setActiveTask({
      name: "",
      assignee: "",
      start: new Date().toISOString().split("T")[0],
      end: "",
      progress: 0,
      issues: "-",
      resolution: "-",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setModalMode("edit");
    setActiveTask({ ...task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTask({});
  };

  const toggleRow = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(taskId)) newExpanded.delete(taskId);
    else newExpanded.add(taskId);
    setExpandedRows(newExpanded);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask.name || !activeTask.assignee) return;

    if (modalMode === "add") {
      const id = `T-${Date.now().toString().slice(-4)}`;
      const taskToAdd = { ...activeTask, id, status: "진행" } as Task;
      startTransition(async () => {
        setOptimisticTasks({ type: "add", task: taskToAdd });
        closeModal();
        const rowData = [
          taskToAdd.id,
          taskToAdd.name,
          taskToAdd.status,
          taskToAdd.start,
          taskToAdd.end,
          taskToAdd.progress,
          taskToAdd.assignee,
          taskToAdd.issues,
          taskToAdd.resolution,
        ];
        const result = await createTaskAction(rowData);
        if (!result.success) alert(`추가 실패: ${result.error}`);
      });
    } else {
      const taskToUpdate = activeTask as Task;
      startTransition(async () => {
        if (taskToUpdate.status === "완료" || taskToUpdate.status === "취소") {
          setOptimisticTasks({ type: "delete", task: taskToUpdate });
        } else {
          setOptimisticTasks({ type: "update", task: taskToUpdate });
        }
        closeModal();
        const rowData = [
          taskToUpdate.id,
          taskToUpdate.name,
          taskToUpdate.status,
          taskToUpdate.start,
          taskToUpdate.end,
          taskToUpdate.progress,
          taskToUpdate.assignee,
          taskToUpdate.issues,
          taskToUpdate.resolution,
        ];
        const result = await updateTaskAction(taskToUpdate.id, rowData);
        if (!result.success) alert(`저장 실패: ${result.error}`);
      });
    }
  };

  const handleDeleteTask = async () => {
    if (!activeTask.id) return;
    if (!confirm("이 과업을 영구적으로 삭제하시겠습니까?")) return;
    startTransition(async () => {
      setOptimisticTasks({ type: "delete", task: activeTask as Task });
      closeModal();
      const result = await deleteTaskAction(activeTask.id!);
      if (!result.success) alert(`삭제 실패: ${result.error}`);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* 1. 모달 컴포넌트 */}
      <TaskModal
        isOpen={isModalOpen}
        mode={modalMode}
        task={activeTask}
        isPending={isPending}
        onClose={closeModal}
        onChange={setActiveTask}
        onSubmit={handleModalSubmit}
        onDelete={handleDeleteTask}
      />

      {/* 2. 대시보드 위젯 컴포넌트 */}
      <DashboardWidgets 
        tasks={optimisticTasks} 
        onAssigneeClick={(assignee) => {
          setSearchTerm(assignee);
          // 상태 필터를 전체로 초기화하여 해당 담당자의 모든 과업이 보이도록 함
          setStatusFilter("전체"); 
        }} 
      />

      {/* 3. 컨트롤 바 */}
      <div
        className="flex flex-col md:flex-row gap-6 items-center"
        role="search"
        aria-label="과업 필터링 및 검색"
      >
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors"
            aria-hidden="true"
          />
          <Input
            placeholder="과업 또는 담당자 검색..."
            className="h-14 pl-14 border-border focus:border-primary/50 bg-card text-foreground rounded-2xl font-medium shadow-2xl transition-all placeholder:text-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="과업 검색어 입력"
          />
        </div>
        <div
          className="flex items-center gap-2 bg-card p-1.5 rounded-2xl border border-border shadow-2xl"
          role="group"
          aria-label="상태 필터"
        >
          {["전체", "진행", "지연", "보류"].map((status) => (
            <Button
              key={status}
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatusFilter(status);
                setSearchTerm(""); // 상태 필터 클릭 시 검색어(담당자 등) 초기화
              }}
              aria-pressed={statusFilter === status}
              className={cn(
                "rounded-xl px-6 text-xs font-bold h-11 transition-all uppercase tracking-wider",
                statusFilter === status
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              {status}
            </Button>
          ))}
        </div>
        <Button
          className="w-full md:w-auto gap-3 h-14 px-10 font-bold rounded-2xl transition-all active:scale-95 bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          onClick={openAddModal}
          aria-haspopup="dialog"
        >
          <Plus className="w-4 h-4" aria-hidden="true" /> 새 과업 등록
        </Button>
      </div>

      {/* 4. 테이블 컴포넌트 */}
      <TaskTable
        tasks={filteredTasks}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onRowClick={openEditModal}
      />
    </div>
  );
}
