"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { calculateDDay, getStatusTheme } from "@/lib/system-utils";
import { ChevronDown, ChevronUp, Siren, Info } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskRowProps {
  task: Task;
  isExpanded: boolean;
  onToggleRow: (id: string, e: React.MouseEvent) => void;
  onRowClick: (task: Task) => void;
}

export const TaskRow = memo(({
  task,
  isExpanded,
  onToggleRow,
  onRowClick,
}: TaskRowProps) => {
  const theme = getStatusTheme(task.status);
  const hasIssue = task.issues !== "-";
  const dDay = calculateDDay(task.end, task.status);

  return (
    <React.Fragment>
      <tr
        className={cn(
          "transition-all duration-300 ease-out group cursor-pointer",
          "hover:relative hover:z-[50] hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-primary/10 hover:ring-1 hover:ring-primary/40",
          "hover:bg-card hover:rounded-xl",
          "will-change-transform will-change-[box-shadow]", // GPU 가속 최적화
          theme.rowBg,
        )}
        onClick={() => onRowClick(task)}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <td className="p-4 px-10 align-middle">
          <div className="flex items-center gap-6">
            {hasIssue ? (
              <button 
                onClick={(e) => onToggleRow(task.id, e)} 
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg transition-all border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                  isExpanded ? "bg-primary border-primary text-primary-foreground" : "hover:border-primary/50",
                  !isExpanded && "border-destructive/50 bg-destructive/10 text-destructive animate-pulse shadow-[0_0_12px_rgba(242,101,34,0.2)]"
                )} 
                aria-label={isExpanded ? "상세 접기" : "상세 펼치기"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            ) : (
              <div className="w-8 h-8" aria-hidden="true" />
            )}
            <div className="space-y-2.5">
              <div
                className={cn(
                  "flex items-center gap-3 font-semibold text-base tracking-tight transition-colors",
                  task.status === "보류"
                    ? "text-muted-foreground"
                    : task.status === "지연" || hasIssue
                      ? "text-destructive"
                      : "text-foreground",
                )}
              >
                {task.name}
                {hasIssue && (
                  <Siren
                    className="w-4 h-4 text-destructive animate-pulse"
                    aria-label="이슈 발생"
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="relative w-40 h-1 bg-background rounded-full overflow-hidden border border-border"
                  role="progressbar"
                  aria-valuenow={task.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={cn(
                      "h-full transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.1)]",
                      theme.color,
                    )}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold tabular-nums tracking-widest",
                    task.status === "보류"
                      ? "text-muted-foreground/40"
                      : "text-muted-foreground",
                  )}
                >
                  {task.progress}%
                </span>
              </div>
            </div>
          </div>
        </td>
        <td className="p-4 text-center align-middle">
          <StatusBadge
            status={task.status}
            className="border-border bg-background/50"
          />
        </td>
        <td className="p-6 text-center align-middle font-medium tabular-nums text-muted-foreground tracking-tight hidden lg:table-cell">
          <span className="text-xs opacity-40 uppercase font-bold tracking-tighter">
            {task.start}
          </span>
        </td>
        <td className="p-6 text-center align-middle font-medium tabular-nums text-foreground tracking-tight hidden md:table-cell">
          <span className={cn(
            "text-xs",
            task.status === "보류" ? "text-muted-foreground/40" : "",
          )}>
            {task.end}
          </span>
        </td>
        <td className="p-4 text-center align-middle hidden sm:table-cell">
          {dDay !== null ? (
            <div
              className={cn(
                "inline-flex items-center justify-center px-5 py-2 rounded-xl border font-bold tabular-nums shadow-sm whitespace-nowrap min-w-[95px] transition-all",
                task.status === "보류"
                  ? "bg-background text-muted-foreground/40 border-border"
                  : dDay <= 7
                    ? "bg-destructive/10 text-destructive border-destructive/20 shadow-[0_0_15px_rgba(var(--destructive),0.1)]"
                    : dDay <= 14
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : "bg-background text-muted-foreground border-border",
              )}
            >
              <span className="text-[11px] tracking-tight whitespace-nowrap">
                {dDay < 0 ? `지연 ${Math.abs(dDay)}일` : dDay === 0 ? "오늘 마감" : `${dDay}일 남음`}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground/40 font-bold" aria-label="기한 없음">
              —
            </span>
          )}
        </td>
        <td className="p-6 px-10 text-center align-middle">
          <UserAvatar name={task.assignee} status={task.status} />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-background/40 animate-in slide-in-from-top-4 duration-500">
          <td colSpan={6} className="p-0">
            <div className="px-10 pb-10 pt-4">
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-8 p-10 rounded-[2.5rem] border transition-all bg-card shadow-inner",
                  hasIssue ? "border-destructive/20" : "border-border",
                )}
              >
                <div className="space-y-4">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                    <Siren className="w-4 h-4 text-destructive" aria-hidden="true" /> 핵심 이슈 및 리스크
                  </div>
                  {hasIssue ? (
                    <p className="text-sm text-destructive font-medium leading-relaxed pl-1">{task.issues}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground font-medium italic pl-1 tracking-tight">감지된 주요 장애물 없음.</p>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                    <Info className="w-4 h-4 text-primary" aria-hidden="true" /> 해결 방안 및 비고
                  </div>
                  {task.resolution !== "-" ? (
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed pl-1">{task.resolution}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground font-medium italic pl-1 tracking-tight">추가 상세 내용 대기 중.</p>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
});

TaskRow.displayName = "TaskRow";
