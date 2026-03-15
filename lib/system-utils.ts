/**
 * MPS System Utilities
 * 비즈니스 로직 및 공통 유틸리티 함수 모음
 */

import { cn } from "@/lib/utils";

/**
 * 종료일과 현재 날짜를 비교하여 D-Day를 계산합니다.
 */
export const calculateDDay = (endDate: string, status: string): number | null => {
  if (status === '완료' || status === '취소' || !endDate || endDate === '-') return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  if (isNaN(end.getTime())) return null;
  const diff = end.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const styles = [
  { bg: "#5e6ad2", text: "#919cf1" }, { bg: "#26b5ce", text: "#7dd3fc" },
  { bg: "#43b369", text: "#86efac" }, { bg: "#e99a41", text: "#fcd34d" },
  { bg: "#e2555e", text: "#fda4af" }, { bg: "#8960e0", text: "#d8b4fe" },
  { bg: "#228ddc", text: "#7dd3fc" }, { bg: "#2eb086", text: "#5eead4" },
  { bg: "#ca50c0", text: "#f0abfc" }, { bg: "#92c043", text: "#d9f99d" },
  { bg: "#ff7b00", text: "#ffb366" }, { bg: "#00d2d3", text: "#a2f2f2" },
  { bg: "#54a0ff", text: "#afcfff" }, { bg: "#5f27cd", text: "#b399ff" },
  { bg: "#ff9f43", text: "#ffcc99" }, { bg: "#ee5253", text: "#ffb3b3" },
  { bg: "#1dd1a1", text: "#b3ffe6" }, { bg: "#f368e0", text: "#ffb3f0" },
  { bg: "#ff9ff3", text: "#ffd9f9" }, { bg: "#48dbfb", text: "#b3f0ff" },
  { bg: "#10ac84", text: "#b3f0e6" }, { bg: "#00d2d3", text: "#b3f0f0" },
  { bg: "#2e86de", text: "#b3d1f0" }, { bg: "#341f97", text: "#b3a6f0" },
  { bg: "#54a0ff", text: "#b3d1ff" }, { bg: "#576574", text: "#b3bcc4" },
  { bg: "#222f3e", text: "#b3b8bc" }, { bg: "#feca57", text: "#fff0b3" },
  { bg: "#ff9f43", text: "#ffcc99" }, { bg: "#ff6b6b", text: "#ffb3b3" }
];

// 담당자 이름을 기억하고 순차적으로 색상 번호를 부여하는 저장소 (해시 충돌 원천 차단)
const assigneeColorMap = new Map<string, number>();
let nextColorIndex = 0;

/**
 * 담당자 이름을 기반으로 고유한 색상 객체를 반환합니다. 
 * (알고리즘 없이, 한글 이름 자체를 그대로 기억하여 순서대로 색상 배정)
 */
export const getAssigneeColor = (name: string) => {
  const str = name.trim();
  if (str.length === 0) return styles[0];

  // 시스템이 이 이름을 처음 본다면, 다음 순서의 빈 색상을 부여하고 기억함
  if (!assigneeColorMap.has(str)) {
    assigneeColorMap.set(str, nextColorIndex);
    // 색상을 다 쓰면 다시 처음 색상으로 돌아감
    nextColorIndex = (nextColorIndex + 1) % styles.length;
  }

  // 기억된 색상 번호를 그대로 반환 (이름이 다르면 무조건 다른 번호)
  return styles[assigneeColorMap.get(str)!];
};

/**
 * 상태별 테마 토큰을 반환합니다.
 */
export const getStatusTheme = (status: string) => {
  const themes = {
    "진행": { color: "bg-primary", text: "text-primary", border: "border-primary/30", rowBg: "hover:bg-primary/5" },
    "지연": { color: "bg-destructive", text: "text-destructive", border: "border-destructive/30", rowBg: "hover:bg-destructive/5" },
    "보류": { color: "bg-muted-foreground", text: "text-muted-foreground", border: "border-muted-foreground/30", rowBg: "hover:bg-muted-foreground/5" },
    "완료": { color: "bg-success", text: "text-success", border: "border-success/30", rowBg: "hover:bg-success/5" },
    "취소": { color: "bg-muted", text: "text-muted-foreground", border: "border-muted", rowBg: "hover:bg-white/2" },
  };
  return themes[status as keyof typeof themes] || themes["진행"];
};
