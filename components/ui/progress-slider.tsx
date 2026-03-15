"use client"

import React from 'react'
import { cn } from "@/lib/utils"

interface ProgressSliderProps {
  value: number;
  onChange?: (val: number) => void;
  label?: string;
  readonly?: boolean;
  className?: string;
}

/**
 * 진행률 슬라이더 (Linear Dark Mode Style)
 */
export function ProgressSlider({ value, onChange, label, readonly = false, className }: ProgressSliderProps) {
  return (
    <div className={cn(
      "bg-[#0c0c0d] p-8 rounded-2xl border border-[#28282a] space-y-6 shadow-inner",
      className
    )}>
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase text-[#8a8d91] tracking-[0.2em]">
          {label || "진행 상황"}
        </label>
        <span className="text-3xl font-semibold text-white tracking-tighter tabular-nums">{value}%</span>
      </div>
      
      <input 
        type="range" 
        min="0" 
        max="100" 
        disabled={readonly}
        className={cn(
          "w-full h-1 bg-[#28282a] rounded-full appearance-none cursor-pointer accent-[#5e6ad2]",
          readonly && "cursor-default opacity-50"
        )}
        value={value} 
        onChange={e => onChange?.(parseInt(e.target.value) || 0)} 
      />
    </div>
  )
}
