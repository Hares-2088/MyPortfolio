import Image from "next/image";
import { getSystemInfo } from "../lib/system";

export default function Home() {
  const systemInfo = getSystemInfo();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h2 className="text-lg font-semibold mb-4">System Information</h2>
          <ul>
            <li>Platform: {systemInfo.platform}</li>
            <li>Architecture: {systemInfo.arch}</li>
            <li>CPU: {systemInfo.cpu}</li>
            <li>Memory: {systemInfo.memory}</li>
            <li>Uptime: {systemInfo.uptime}</li>
            <li>Temperature: {systemInfo.temperature}</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
