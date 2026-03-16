import { GanttChart } from "@/components/gantt-chart";
import { fetchSheetData } from "@/lib/google-sheets";
import { LayoutGrid, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";

export default async function Home() {
  let tasks = [];
  let debug = "Initializing...";

  try {
    const sheetResponse = await fetchSheetData("Gantt!A2:I100");
    tasks = sheetResponse?.tasks || [];
    debug = sheetResponse?.debug || "No debug info";
  } catch (e: any) {
    debug = `Fatal Error: ${e.message}`;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-[#8a8d91] selection:bg-[#5e6ad2]/30 selection:text-white font-sans antialiased">
      <div className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
        {/* 통합 헤더 - Linear 스타일 리뉴얼 */}
        <header className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-[#28282a]">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#5e6ad2]/10 rounded-xl border border-[#5e6ad2]/20 shadow-[0_0_20px_rgba(94,106,210,0.15)]">
                <LayoutGrid className="w-8 h-8 text-[#5e6ad2]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-semibold tracking-tight text-white leading-none">
                    프로젝트 일정관리
                  </h1>
                  <div className="px-2 py-0.5 bg-[#5e6ad2]/10 border border-[#5e6ad2]/20 rounded-md">
                    <span className="text-sm font-bold text-[#5e6ad2] uppercase tracking-wider">
                      v2.0
                    </span>
                  </div>
                </div>
                <p className="text-[#8a8d91] text-sm font-medium tracking-tight flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500/60" />{" "}
                  프로젝트 통합 관리 대시보드
                </p>
              </div>
            </div>
          </div>

          {/* 시스템 상태 위젯 - 그리드를 통해 하단 카드와 너비/정렬 완벽 동기화 */}
          <div className="w-full">
            <div className="flex items-center gap-4 bg-[#161618] p-3 px-5 rounded-2xl border border-[#28282a] shadow-inner w-full justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#8a8d91] uppercase tracking-[0.2em] leading-none mb-1.5">
                  시스템 상태
                </span>
                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${debug === "Success" ? "text-emerald-500" : "text-amber-500"}`}
                >
                  {debug === "Success" ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  {debug === "Success" ? "클라우드 연결됨" : "샘플 데이터 모드"}
                </div>
              </div>
              <div className="w-[1px] h-8 bg-[#28282a] mx-2 hidden lg:block" />
              <div className="hidden lg:flex flex-col min-w-[100px]">
                <span className="text-xs font-bold text-[#8a8d91] uppercase tracking-[0.2em] leading-none mb-1.5 text-right">
                  디버그
                </span>
                <code className="text-xs text-[#8a8d91] font-mono text-right truncate max-w-[120px] opacity-60">
                  {debug}
                </code>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 간트 차트 영역 */}
        <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <GanttChart initialData={tasks} />
        </main>

        {/* 심플 푸터 */}
        <footer className="text-center py-8 border-t border-[#28282a]">
          <p className="text-xs font-bold text-[#8a8d91] uppercase tracking-[0.5em]">
            &copy; 2026 프로젝트 일정 관리 시스템
          </p>
        </footer>
      </div>
    </div>
  );
}
