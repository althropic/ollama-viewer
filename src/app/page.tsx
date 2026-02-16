import { Header } from "@/components/Header";
import { ModelList } from "@/components/ModelList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ModelList />
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-sm text-zinc-500">
              Ollama Dashboard • Built with Next.js & Tailwind CSS
            </p>
            <a
              href="http://localhost:8080"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Open Ollama Web UI →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
