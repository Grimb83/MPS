'use server';

import { updateAndArchiveTask, appendSheetData, deleteSheetData } from '@/lib/google-sheets';
import { revalidateTag } from 'next/cache';
import { Task } from '@/lib/types';

/**
 * 과업 영구 삭제 서버 액션
 */
export async function deleteTaskAction(taskId: string) {
  try {
    const result = await deleteSheetData(taskId);
    revalidateTag('gantt-data');
    return { success: true, ...result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Task 객체를 시트 로우 배열로 변환합니다.
 */
const mapTaskToRow = (task: Task) => [
  task.id,
  task.name,
  task.status,
  task.start,
  task.end,
  task.progress.toString(),
  task.assignee,
  task.issues,
  task.resolution,
];

/**
 * 신규 태스크 생성 서버 액션
 */
export async function createTaskAction(task: Task) {
  try {
    const rowData = mapTaskToRow(task);
    const result = await appendSheetData('Gantt', rowData);
    revalidateTag('gantt-data');
    return { success: true, ...result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * 간트 차트 태스크 업데이트 및 아카이빙 서버 액션
 */
export async function updateTaskAction(task: Task) {
  try {
    const rowData = mapTaskToRow(task);
    const result = await updateAndArchiveTask(task.id, rowData);
    
    // 캐시 무효화를 통해 최신 데이터 페칭 유도
    revalidateTag('gantt-data');
    
    return { success: true, ...result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
