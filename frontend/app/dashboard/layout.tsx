export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-2xl">Dashboard</h1>
      </header>
      <main className="p-8">{children}</main>
    </div>
  );
}
