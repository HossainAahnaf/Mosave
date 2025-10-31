import Head from "next/head";

import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import { QuizCard } from "@/components/QuizCard";

const LearnPage = () => {
  return (
    <AuthGuard>
      <Head>
        <title>MoSave Learn</title>
      </Head>
      <Layout
        title="Adaptive literacy coach"
        description="Mo curates micro-lessons, quizzes, and reading journeys that align with your real-world money moves."
      >
        <section className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="card flex flex-col gap-4 p-6">
            <h2 className="section-title">Today&apos;s learning lane</h2>
            <p className="narrative">
              Based on your recent overspend in groceries, Mo recommends a two-step pathway. Finish both to boost your
              Financial IQ score and unlock community badges.
            </p>
            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.title} {...quiz} />
              ))}
            </div>
          </div>
          <div className="card flex flex-col gap-4 p-6">
            <h3 className="section-title">Reinforcement loop</h3>
            <ol className="space-y-3 text-sm text-slate-600">
              <li>1. Behavior detected → Overspent on groceries by 25%.</li>
              <li>2. Mo insight → Challenge with meal planning strategies.</li>
              <li>3. Lesson push → “Budgeting Basics” animated primer.</li>
              <li>4. Quiz unlock → “Grocery Gameplan” 4-question micro quiz.</li>
              <li>5. Reward → +12 IQ points, unlock “Meal Prep Hero” badge.</li>
            </ol>
            <div className="rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-accent-500/10 p-4 text-sm text-primary-700">
              Next up: If you maintain balance for 30 days, Mo introduces advanced module “Intro to Credit Scores”.
            </div>
          </div>
        </section>
        <section className="card grid gap-4 p-6">
          <h3 className="section-title">Library explorer</h3>
          <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
            {library.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs uppercase text-slate-400">{item.type}</p>
                <p className="mt-2 font-semibold text-slate-800">{item.title}</p>
                <p className="mt-2 text-xs text-slate-500">{item.time}</p>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </AuthGuard>
  );
};

const quizzes = [
  {
    title: "Grocery Gameplan",
    description: "4-question pulse check + smart tips on meal prep to rein in weekly spending.",
    badge: "+12 IQ"
  },
  {
    title: "Savings Reflex",
    description: "Fast micro-lesson that nudges you to automate the extra $40 you saved this week.",
    badge: "Unlock streak"
  }
];

const library = [
  { type: "Micro-lesson", title: "Budgeting Basics", time: "5 min • Animated" },
  { type: "Deep dive", title: "Intro to Credit Scores", time: "8 min • Interactive" },
  { type: "Challenge", title: "Save $20 this week", time: "Weekly" },
  { type: "Story", title: "How Maya paid off her card", time: "4 min read" },
  { type: "Toolkit", title: "Meal Prep Blueprint", time: "Download" },
  { type: "Audio", title: "Mo’s Monday Money Pep", time: "3 min listen" }
];

export default LearnPage;
