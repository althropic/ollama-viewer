export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Ollama Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage and visualize your local AI models
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="text-lg font-medium text-zinc-300">
            Dashboard initialized successfully
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Next: Connect to Ollama API and display models
          </p>
        </div>
      </main>
    </div>
  );
}
