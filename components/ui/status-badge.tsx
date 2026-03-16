"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { getStatusTheme } from "@/lib/system-utils"
import { AlertTriangle, CheckCircle2, Clock, PauseCircle, XCircle, LucideIcon } from "lucide-react"
import { TaskStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusIcons: Record<TaskStatus, LucideIcon> = {
  "진행": Clock,
  "지연": AlertTriangle,
  "보류": PauseCircle,
  "완료": CheckCircle2,
  "취소": XCircle,
}

/**
 * 프로젝트 상태 표시를 위한 표준 배지 컴포넌트 (Linear Dark Mode - Synchronized Size)
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const theme = getStatusTheme(status);
  
  // 런타임 방어 코드: statusIcons에 없는 상태가 들어올 경우 Clock 아이콘을 기본값으로 사용
  const Icon = (status && statusIcons[status]) ? statusIcons[status] : Clock;

  return (
    <div className={cn(
      "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl border text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all min-w-[95px]",
      theme.text, 
      theme.border,
      theme.color === 'bg-primary' ? 'bg-primary/10' : 
      theme.color === 'bg-destructive' ? 'bg-destructive/10' :
      theme.color === 'bg-muted-foreground' ? 'bg-muted-foreground/10' :
      theme.color === 'bg-success' ? 'bg-success/10' : 'bg-background',
      className
    )}>
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="whitespace-nowrap">{status || "진행"}</span>
    </div>
  )
}
