"use client";

import React, { memo } from "react";
import { TaskRow } from "./task-row";
import { TaskTableProps } from "@/lib/types";

export const TaskTable = memo(({
  tasks,
  expandedRows,
  onToggleRow,
  onRowClick,
}: TaskTableProps) => {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
      <div className="overflow-x-auto w-full no-scrollbar">
        <table className="w-full text-sm border-collapse min-w-[700px] lg:min-w-full">
          <thead className="bg-background/50 border-b border-border">
            <tr>
              <th className="p-4 px-10 text-left font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[40%] lg:w-[30%]">
                과업
              </th>
              <th className="p-4 text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[15%] lg:w-[10%]">
                상태
              </th>
              <th className="p-4 text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[10%] hidden lg:table-cell">
                시작일
              </th>
              <th className="p-4 text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[10%] hidden md:table-cell">
                마감일
              </th>
              <th className="p-4 text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[15%] lg:w-[10%] hidden sm:table-cell">
                남은 기간
              </th>
              <th className="p-4 px-10 text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground w-[20%] lg:w-[15%]">
                담당자
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                isExpanded={expandedRows.has(task.id)}
                onToggleRow={onToggleRow}
                onRowClick={onRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TaskTable.displayName = "TaskTable";
