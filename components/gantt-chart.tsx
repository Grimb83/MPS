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

import { Task } from "@/lib/types";

export function GanttChart({ initialData }: { initialData: Task[] }) {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [activeTask, setActiveTask] = useState<Partial<Task>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const allTasks = initialData || [];

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
        const result = await createTaskAction(taskToAdd);
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
        const result = await updateTaskAction(taskToUpdate);
        if (!result.success) alert(`수정 실패: ${result.error}`);
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

      <DashboardWidgets 
        tasks={optimisticTasks} 
        onAssigneeClick={(assignee) => {
          setSearchTerm(assignee);
          setStatusFilter("전체"); 
        }} 
      />

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="과업 또는 담당자 검색.."
            className="h-14 pl-14 border-border focus:border-primary/50 bg-card rounded-2xl font-medium shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-card p-1.5 rounded-2xl border border-border shadow-2xl">
          {["전체", "진행", "지연", "보류"].map((status) => (
            <Button
              key={status}
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatusFilter(status);
                setSearchTerm(""); 
              }}
              className={cn(
                "rounded-xl px-6 text-xs font-bold h-11 uppercase tracking-wider",
                statusFilter === status ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"
              )}
            >
              {status}
            </Button>
          ))}
        </div>
        <Button
          className="w-full md:w-auto gap-3 h-14 px-10 font-bold rounded-2xl bg-foreground text-background"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4" /> 새 과업 등록
        </Button>
      </div>

      <TaskTable
        tasks={filteredTasks}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
        onRowClick={openEditModal}
      />
    </div>
  );
}
