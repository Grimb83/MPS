"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Layers, X, Users, Siren, Lightbulb, Trash2, Loader2, CheckCircle2 } from "lucide-react"
import { ProgressSlider } from "@/components/ui/progress-slider"

interface Task {
  id: string
  name: string
  status: string
  start: string
  end: string
  progress: number
  assignee: string
  issues: string
  resolution: string
}

interface TaskModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  task: Partial<Task>;
  isPending: boolean;
  onClose: () => void;
  onChange: (task: Partial<Task>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
}

export function TaskModal({ isOpen, mode, task, isPending, onClose, onChange, onSubmit, onDelete }: TaskModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-card rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-border">
        <div className="sticky top-0 bg-card/90 backdrop-blur-md border-b border-border px-8 py-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <Layers className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h2 id="modal-title" className="text-xl font-semibold text-foreground tracking-tight">
              {mode === 'add' ? '새 과업 등록' : '과업 상세 정보'}
            </h2>
          </div>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-white/5 text-muted-foreground" onClick={onClose} aria-label="닫기">
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <form onSubmit={onSubmit} className="p-8 space-y-8 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 md:col-span-2">
              <label htmlFor="task-name" className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-1">과업명</label>
              <Input id="task-name" placeholder="무엇을 진행하나요?" value={task.name || ''} onChange={e => onChange({...task, name: e.target.value})} required className="h-14 text-lg font-semibold border-border bg-background focus:border-primary/50 text-foreground rounded-2xl shadow-inner transition-all" />
            </div>
            <div className="space-y-3">
              <label htmlFor="task-assignee" className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-1">담당자</label>
              <div className="relative">
                <Users className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input id="task-assignee" placeholder="이름" value={task.assignee || ''} onChange={e => onChange({...task, assignee: e.target.value})} required className="h-12 pl-12 border-border bg-background text-foreground rounded-xl font-medium" />
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="task-status" className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-1">상태</label>
              <select id="task-status" className="w-full h-12 rounded-xl border border-border bg-background text-foreground px-4 text-sm font-semibold outline-none focus:border-primary/50 transition-all" value={task.status || '진행'} onChange={e => onChange({...task, status: e.target.value})}>
                {["진행", "지연", "보류", "완료", "취소"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label htmlFor="task-start" className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-1">시작일</label>
              <Input id="task-start" type="date" value={task.start || ''} onChange={e => onChange({...task, start: e.target.value})} className="h-12 border-border bg-background text-foreground rounded-xl font-medium px-4 [color-scheme:dark]" />
            </div>
            <div className="space-y-3">
              <label htmlFor="task-end" className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em] ml-1">종료 예정일</label>
              <Input id="task-end" type="date" value={task.end || ''} onChange={e => onChange({...task, end: e.target.value})} className="h-12 border-border bg-background text-foreground rounded-xl font-medium px-4 [color-scheme:dark]" />
            </div>
          </div>
          
          <ProgressSlider value={task.progress || 0} onChange={val => onChange({...task, progress: val})} className="bg-background border-border" />

          <div className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="task-issues" className="text-xs font-bold text-destructive uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
                <Siren className="w-4 h-4" aria-hidden="true" /> 핵심 이슈 및 리스크
              </label>
              <textarea id="task-issues" className="w-full min-h-[120px] p-5 rounded-2xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:border-destructive/50 shadow-sm resize-none transition-all" placeholder="문제가 있다면 기록해 주세요..." value={task.issues === '-' ? '' : task.issues} onChange={e => onChange({...task, issues: e.target.value || '-'})} />
            </div>
            <div className="space-y-3">
              <label htmlFor="task-resolution" className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
                <Lightbulb className="w-4 h-4" aria-hidden="true" /> 해결 방안 및 비고
              </label>
              <textarea id="task-resolution" className="w-full min-h-[120px] p-5 rounded-2xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:border-primary/50 shadow-sm resize-none transition-all" placeholder="해결 계획을 적어주세요..." value={task.resolution === '-' ? '' : task.resolution} onChange={e => onChange({...task, resolution: e.target.value || '-'})} />
            </div>
          </div>
          <div className="pt-8 flex justify-end gap-4 border-t border-border">
            {mode === 'edit' && onDelete && (
              <Button type="button" variant="ghost" onClick={onDelete} className="mr-auto text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold h-12 rounded-xl px-6 transition-all border border-transparent hover:border-destructive/20" aria-label="과업 삭제">
                <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" /> 과업 삭제
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={onClose} className="px-8 font-semibold h-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">취소</Button>
            <Button type="submit" disabled={isPending} className="px-12 font-semibold gap-2 h-12 rounded-xl transition-all active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" aria-label="저장 중" /> : <><CheckCircle2 className="w-4 h-4" aria-hidden="true" /> 변경사항 저장</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
