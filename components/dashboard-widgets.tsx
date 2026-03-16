"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { getAssigneeColor } from "@/lib/system-utils";
import { Task } from "@/lib/types";

interface DashboardWidgetsProps {
  tasks: Task[];
  onAssigneeClick?: (assignee: string) => void;
}

export function DashboardWidgets({ tasks, onAssigneeClick }: DashboardWidgetsProps) {
  // 날짜 계산 (서버와 클라이언트 일치를 위해 고정된 포맷 사용)
  const today = new Date();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${weekDays[today.getDay()]})`;

  // useMemo를 통한 불필요한 통계 계산 방지 (성능 최적화)
  const resourceData = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.assignee))).map((assignee) => {
      const userTasks = tasks.filter((t) => t.assignee === assignee);
      const avgProgress =
        userTasks.length > 0
          ? userTasks.reduce((acc, t) => acc + t.progress, 0) / userTasks.length
          : 0;
      
      const colorData = getAssigneeColor(assignee);
      
      return { 
        name: assignee, 
        count: userTasks.length, 
        progress: avgProgress,
        color: colorData
      };
    });
  }, [tasks]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => t.status === "진행").length,
      delayed: tasks.filter((t) => t.status === "지연").length,
      issues: tasks.filter((t) => t.issues !== "-").length,
    }),
    [tasks],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 담당자별 업무 로드맵 */}
      <Card className="md:col-span-3 border-border bg-card shadow-lg rounded-3xl overflow-hidden group transition-all hover:border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between p-8 pb-4 space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              담당자별 업무 현황
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {resourceData.map((res) => (
              <div key={res.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div 
                    className="flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-semibold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      backgroundColor: `${res.color.bg}15`, 
                      color: res.color.text, 
                      borderColor: `${res.color.bg}30` 
                    }}
                    onClick={() => onAssigneeClick?.(res.name)}
                  >
                    {res.name}
                    <span className="opacity-50 text-[10px] font-medium ml-1">
                      ({res.count}개)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-primary tabular-nums">
                    {Math.round(res.progress)}%
                  </span>
                </div>
                <div
                  className="w-full h-1 bg-background rounded-full overflow-hidden border border-border"
                  role="progressbar"
                  aria-valuenow={Math.round(res.progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${res.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 상태 요약 카드 */}
      <Card className="border-border bg-card shadow-lg rounded-3xl overflow-hidden flex flex-col transition-all hover:border-primary/20">
        <CardContent className="p-8 flex-1 flex flex-col">
          {/* 1. 상단 날짜 영역 (중앙 정렬) */}
          <div className="text-center pb-6 mb-6 border-b border-white/5 space-y-1">
            <div className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-40">Today</div>
            <div className="text-xl font-semibold text-white tracking-tight leading-tight">
              {dateString}
            </div>
          </div>

          {/* 2. 상태 요약 타이틀 */}
          <div className="mb-4">
            <CardTitle className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase text-center md:text-left">
              상태 요약
            </CardTitle>
          </div>

          {/* 3. 상단 상태 요약 수치 영역 */}
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-muted-foreground">진행</span>
              <span className="text-primary tabular-nums">{stats.active}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-muted-foreground">이슈</span>
              <span className="text-destructive tabular-nums">{stats.issues}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-muted-foreground">지연</span>
              <span className="text-destructive tabular-nums">{stats.delayed}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider border-t border-white/5 pt-3 mt-3">
              <span className="text-muted-foreground">보류</span>
              <span className="text-muted-foreground/60 tabular-nums">
                {tasks.filter(t => t.status === '보류').length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
