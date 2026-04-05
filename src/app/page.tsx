const features = [
  {
    emoji: "👁️",
    title: "Live Preview",
    description:
      "See your changes rendered in real time through a live VNC session. No more alt-tabbing — your browser is your canvas.",
  },
  {
    emoji: "📸",
    title: "Screenshot Feedback",
    description:
      "Playwright captures a screenshot after every change so you can verify the visual output without leaving your terminal.",
  },
  {
    emoji: "⚡",
    title: "Hot Reload",
    description:
      "Next.js fast refresh keeps the feedback loop tight. Edit, save, and see the result in under a second.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            VNC Dev Environment
          </h1>
          <p className="mt-4 text-xl text-blue-100 sm:text-2xl">
            Pair programming made visual
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <span className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">
              Next.js 15
            </span>
            <span className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">
              Tailwind CSS
            </span>
            <span className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">
              Playwright
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-gray-500">
            A tight visual feedback loop powered by VNC, Playwright, and
            Next.js&nbsp;— so every pixel is intentional.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <span className="text-4xl">{f.emoji}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-gray-400">
          Built by BarneyBot &amp; Desi
        </div>
      </footer>
    </div>
  );
}
