export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-400">
      {children}
    </div>
  );
}
