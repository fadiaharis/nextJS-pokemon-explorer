export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Explorer</h1>
      {children}
    </main>
  );
}
