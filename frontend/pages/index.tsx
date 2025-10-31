import { motion } from "framer-motion";
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
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="card p-8 shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-primary-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-600">
                New | MoTalk voice mentor
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-slate-900 md:text-5xl">
                Financial confidence designed for first apartments and future CEOs.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                MoSave blends collaborative budgeting, predictive simulations, and an empathetic AI mentor so young adults can
                experiment, learn, and stay consistent with every dollar they manage.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-xl hover:shadow-primary-500/30"
                >
                  Launch interactive demo
                </Link>
                <Link
                  href="/simulator"
                  className="rounded-full border border-primary-200/70 bg-white/60 px-6 py-3 text-sm font-semibold text-primary-600 backdrop-blur transition hover:border-primary-400"
                >
                  Explore what-if lab
                </Link>
              </div>
              <div className="mt-10 grid gap-6 text-sm text-slate-600 sm:grid-cols-3">
                {metrics.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-2xl font-semibold text-slate-900 md:text-3xl">{item.value}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="card glass-panel flex flex-col gap-6 overflow-hidden rounded-[2.25rem] p-8 shadow-2xl">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 font-semibold text-primary-600">
                  Live sync
                </span>
                <span>Roommates / Household 3</span>
              </div>
              <div className="rounded-2xl border border-white/40 bg-white/80 p-4 shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Mo&apos;s quick take</p>
                <p className="mt-3 text-sm text-slate-700">
                  You saved 12% this month. That is stronger than 60% of MoSave peers your age. Grocery spend spiked in week 3&nbsp;&mdash;&nbsp;
                  let us meal plan a budget-friendly rotation.
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 px-4 py-3">
                  <span className="font-medium text-slate-700">Emergency fund</span>
                  <span className="text-primary-600">$840 / $1.5k</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 px-4 py-3">
                  <span className="font-medium text-slate-700">Grocery reset</span>
                  <span className="text-emerald-600">Challenge unlocked</span>
                </div>
              </div>
              <div className="rounded-2xl border border-primary-200/50 bg-gradient-to-br from-primary-500/90 via-primary-500 to-accent-500/90 p-6 text-sm text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Voice session in progress</p>
                <p className="mt-4 text-lg font-semibold">"Mo, how do we prep for a surprise rent increase?"</p>
                <p className="mt-3 text-white/80">Mo lays out three actions, recommends a 60-second micro-lesson, and schedules a follow-up streak reward.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {featureGrid.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="card flex h-full flex-col gap-5 p-6"
            >
              <span className="text-3xl">{feature.emoji}</span>
              <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              <span className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-500">{feature.meta}</span>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="card flex flex-col gap-6 p-8">
            <h3 className="text-2xl font-semibold text-slate-900">How Mo keeps your money rhythm steady</h3>
            <ul className="grid gap-5 text-sm text-slate-600">
              {journey.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/15 text-sm font-semibold text-primary-600">
                    0{index + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800">{step.title}</p>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col gap-5 p-8">
            <h3 className="text-2xl font-semibold text-slate-900">Stack built for fast deploys</h3>
            <div className="grid gap-4 text-sm text-slate-600">
              {stack.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">{item.category}</p>
                  <p className="mt-2 text-base font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card flex flex-col gap-6 p-8 text-center md:flex-row md:items-center md:gap-10 md:text-left">
          <div className="flex-1 space-y-3">
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">Ready to mentor your community&apos;s next money leaders?</h3>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Clone the repo, plug in Supabase + OpenAI keys, and you have an immersive AI coach that teenagers and young adults actually enjoy using.
              Unlock streaks, voice insights, and Monte Carlo scenarios in under an hour.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm font-semibold">
            <Link
              href="/community"
              className="rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-accent-500 px-6 py-3 text-white shadow-lg shadow-primary-500/35 transition hover:shadow-xl hover:shadow-primary-500/25"
            >
              View community playbook
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary-200/70 bg-white/70 px-6 py-3 text-primary-600 backdrop-blur transition hover:border-primary-400"
            >
              Fork on GitHub
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

const metrics = [
  { label: "Households coached", value: "4.2k+" },
  { label: "Average IQ lift", value: "32 pts" },
  { label: "Weekly retention", value: "92%" }
];

const featureGrid = [
  {
    title: "Smart household tracker",
    description: "Collaborate with roommates, split recurring bills, and stay aligned with Supabase realtime channels.",
    emoji: "📊",
    meta: "Realtime sync"
  },
  {
    title: "Adaptive literacy coach",
    description: "Micro-lessons, quizzes, and Mo&apos;s nudges adapt to spending behavior with GPT + LangChain orchestration.",
    emoji: "🧠",
    meta: "AI mentor"
  },
  {
    title: "What-if simulator",
    description: "Experiment with job changes or rent spikes using FastAPI Monte Carlo projections and animated charts.",
    emoji: "🔮",
    meta: "Scenario engine"
  }
];

const journey = [
  {
    title: "Connect household wallets",
    description: "Supabase auth links every roommate while expense webhooks stream into MoSave instantly."
  },
  {
    title: "Mo learns your rhythm",
    description: "Behavior signals trigger insights, voice nudges, and a reinforcement learning coach loop."
  },
  {
    title: "Simulate and celebrate",
    description: "Drop a what-if scenario, review Mo&apos;s plan, and earn streak rewards when you hit targets."
  }
];

const stack = [
  {
    category: "Frontend",
    title: "Next.js 14 + Tailwind + Framer Motion",
    description: "Ships with animated UI primitives, responsive cards, and a glassmorphism design system out-of-the-box."
  },
  {
    category: "Backend",
    title: "FastAPI + Supabase + OpenAI",
    description: "Ready endpoints for expenses, insights, simulations, and lessons. Swap mock services for production keys in minutes."
  },
  {
    category: "Bonus",
    title: "Chrome extension & Streamlit tutor",
    description: "Capture online receipts, run workshops, and loop data back into Mo&apos;s mentor brain."
  }
];

export default HomePage;
