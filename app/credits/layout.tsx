import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits",
  description: "Credits page",
};

export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-3xl px-6 py-6">
        <h1 className="text-3xl font-bold text-[#9B6DFF] uppercase tracking-wide">
          Credits
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          People and tools that made this app possible
        </p>
      </header>

      {/* Content */}
      <main className="w-full max-w-3xl px-6 pb-10">
        {children}
      </main>

    </div>
  );
}