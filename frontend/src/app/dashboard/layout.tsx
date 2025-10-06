// src/app/dashboard/layout.tsx
import {Sidebar} from "@/app/components/Sidebar/page";
import {Header} from "@/app/components/Header/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        {children}
      </main>
    </div>
  );
}
