import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-full p-4 overflow-hidden bg-[#E9E9E9]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-full ml-4">
        {children}
      </main>
    </div>
  );
}
