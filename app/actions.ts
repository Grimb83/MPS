'use server';

import { updateAndArchiveTask, appendSheetData, deleteSheetData } from '@/lib/google-sheets';
import { revalidateTag } from 'next/cache';

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
 * 신규 태스크 생성 서버 액션
 */
export async function createTaskAction(rowData: any[]) {
  try {
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
export async function updateTaskAction(taskId: string, updatedRow: any[]) {
  try {
    const result = await updateAndArchiveTask(taskId, updatedRow);
    
    // 캐시 무효화를 통해 최신 데이터 페칭 유도
    revalidateTag('gantt-data');
    
    return { success: true, ...result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
