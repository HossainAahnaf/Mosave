import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>MoSave — The AI Household Finance Mentor</title>
        <meta
          name="description"
          content="MoSave helps teens, students, and young adults master household finance with AI insights, simulations, and gamified learning."
        />
      </Head>
      <Layout
        title="MoSave — The AI Household Finance Mentor"
        description="Track shared household finances, chat with an AI mentor, and build financial confidence through interactive micro-lessons."
      >
        <section className="grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
          <div className="card flex flex-col gap-6 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Smarter money moves for the independence era.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              MoSave blends an AI mentor, household expense tracking, and gamified literacy to empower young adults.
              Discover where your cash flows, forecast the what-ifs, and learn skills tailored to your habits.
            </p>
            <div className="grid gap-3 text-sm text-slate-600">
              <span>✅ Shared household tracker with Supabase realtime sync</span>
              <span>✅ AI-powered nudges, voice mentoring, and micro-lessons</span>
              <span>✅ What-if simulations with Monte Carlo forecasting</span>
              <span>✅ Financial IQ score, streak rewards, and weekly challenges</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-primary-600"
              >
                Explore Dashboard
              </Link>
              <Link
                href="/simulator"
                className="rounded-full border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-600 hover:border-primary-400"
              >
                Run a Scenario
              </Link>
            </div>
          </div>
          <div className="card flex flex-col justify-between gap-4 p-6">
            <h3 className="section-title">Voice mentor (MoTalk)</h3>
            <p className="narrative">
              Ask Mo out loud via Whisper and TTS (demo coming soon). Eliminate financial guesswork with
              conversational guidance that adapts to your vibe.
            </p>
            <div className="rounded-2xl bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500 p-6 text-white shadow-lg">
              <p className="text-sm opacity-80">Example voice prompt</p>
              <p className="mt-3 text-lg font-semibold">“Mo, how do I split rent and utilities with two roommates?”</p>
              <p className="mt-4 text-sm opacity-90">Mo replies with a step-by-step plan and a 60-second lesson.</p>
            </div>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card flex h-full flex-col gap-4 p-6">
              <div className="text-3xl">{feature.emoji}</div>
              <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
              <p className="text-xs text-primary-500">{feature.meta}</p>
            </div>
          ))}
        </section>
        <section className="card grid gap-6 p-8">
          <h3 className="section-title">Integrations & Deployment</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase text-slate-500">Frontend</h4>
              <p className="text-sm text-slate-600">
                Next.js 14 + Tailwind + Framer Motion. Deploy instantly to Vercel. Charts via D3.js/Chart.js with AI-curated
                annotations.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-slate-500">Backend</h4>
              <p className="text-sm text-slate-600">
                FastAPI + Supabase PostgreSQL. AI adapters through OpenAI or local ML. Deployed on Render with background
                workers for simulations.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase text-slate-500">Chrome Extension</h4>
              <p className="text-sm text-slate-600">
                Capture online receipt data and beam highlights back to MoSave. Perfect for groceries and gig economy
                spending.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-slate-500">Streamlit Tutor</h4>
              <p className="text-sm text-slate-600">
                Optional Streamlit companion for live workshops and classroom modes.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

const features = [
  {
    title: "Smart household tracker",
    description: "Collaborate with roommates or family, track spending, automate recurring bills, and celebrate wins.",
    emoji: "📊",
    meta: "Realtime sync via Supabase"
  },
  {
    title: "Adaptive literacy coach",
    description: "Mo delivers micro-lessons, quizzes, and reinforcement based on your behavior and Financial IQ score.",
    emoji: "🧠",
    meta: "Backed by GPT-4 + LangChain"
  },
  {
    title: "What-if simulator",
    description: "Preview 6-month futures with Monte Carlo projections, visual storyboards, and action plans.",
    emoji: "🔮",
    meta: "Powered by FastAPI simulation engine"
  }
];

export default HomePage;
