/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel 빌드 시 메모리 초과(SIGTERM) 방지용 설정
  eslint: {
    // 빌드 타임 린트 에러 무시
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 타임 타입 에러 무시 (메모리 절약)
    ignoreBuildErrors: true,
  },
  experimental: {
    // Next.js 컴파일러 최적화 워커 설정 완화
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;