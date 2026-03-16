"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { getAssigneeColor } from "@/lib/system-utils"
import { TaskStatus } from "@/lib/types"

interface UserAvatarProps {
  name: string;
  status?: TaskStatus;
  className?: string;
}

/**
 * 담당자 아바타 (위젯 스타일의 색상 + 기존의 통일된 규격 복구)
 */
export function UserAvatar({ name, status, className }: UserAvatarProps) {
  const colorData = getAssigneeColor(name);
  const isPendingStatus = status === '보류';

  // 위젯의 세련된 색상 로직 적용
  const dynamicStyle = !isPendingStatus ? {
    backgroundColor: `${colorData.bg}15`, 
    color: colorData.text, 
    borderColor: `${colorData.bg}30` 
  } : {};

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center px-5 py-2 rounded-xl border font-bold transition-all shadow-sm min-w-[95px]",
        isPendingStatus ? "bg-background text-muted-foreground/40 border-border" : "",
        className
      )}
      style={dynamicStyle}
    >
      <span className="text-[11px] tracking-tight whitespace-nowrap uppercase">{name}</span>
    </div>
  )
}
