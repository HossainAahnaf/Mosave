import Head from "next/head";
import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import { FinanceChart } from "@/components/FinanceChart";
import { GoalCard } from "@/components/GoalCard";
import { MoChat } from "@/components/MoChat";
import { useExpenses } from "@/hooks/useExpenses";
import { useGoals } from "@/hooks/useGoals";

const DashboardPage = () => {
  const { summary, transactions, isLoading } = useExpenses();
  const { goals } = useGoals();

  const labels = summary.map((item) => item.month);
  const incomeSeries = summary.map((item) => item.income);
  const expenseSeries = summary.map((item) => item.expenses);
  const savingsSeries = summary.map((item) => item.savings);

  const latestMonth = summary.at(-1);
  const previousMonth = summary.length > 1 ? summary.at(-2) : undefined;
  const savingsRate = latestMonth && latestMonth.income ? Math.round((latestMonth.savings / latestMonth.income) * 100) : 0;
  const expenseShift =
    latestMonth && previousMonth && previousMonth.expenses
      ? Math.round(((latestMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100)
      : 0;
  const householdSpend = transactions.reduce((total, tx) => total + tx.amount, 0);

  const insightHighlights = [
    {
      title: "Savings rate",
      value: latestMonth ? `${savingsRate}%` : "--",
      caption: latestMonth ? `Based on ${latestMonth.month}` : "Connect your household to see progress"
    },
    {
      title: "Expense trend",
      value: previousMonth ? `${Math.abs(expenseShift)}% ${expenseShift >= 0 ? "up" : "down"}` : "--",
      caption: previousMonth ? `Compared to ${previousMonth.month}` : "Need one more month to spot a trend"
    },
    {
      title: "Logged this week",
      value: transactions.length ? `$${Math.round(householdSpend).toLocaleString()}` : "--",
      caption: `${transactions.length} household activities`
    }
  ];

  return (
    <AuthGuard>
      <Head>
        <title>MoSave Dashboard</title>
      </Head>
      <Layout title="Dashboard" description="Real-time pulse on your household finances and AI mentor insights.">
        <section className="grid gap-4 md:grid-cols-3">
          {insightHighlights.map((card) => (
            <div key={card.title} className="card flex flex-col gap-2 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-500">{card.title}</p>
              <p className="text-3xl font-semibold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500">{card.caption}</p>
            </div>
          ))}
        </section>
        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Monthly performance</h2>
              {isLoading ? <span className="text-xs text-slate-400">Refreshing...</span> : null}
            </div>
            {summary.length ? (
              <FinanceChart
                labels={labels}
                incomeSeries={incomeSeries}
                expenseSeries={expenseSeries}
                savingsSeries={savingsSeries}
              />
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/60 p-6 text-sm text-primary-600">
                Plug in your Supabase credentials or load the sample data to see Mo&apos;s analytics light up.
              </div>
            )}
          </div>
          <MoChat />
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              targetAmount={goal.targetAmount}
              currentAmount={goal.currentAmount}
              dueDate={goal.dueDate ?? new Date().toISOString().slice(0, 10)}
              streak={goal.streakDays}
            />
          ))}
        </section>
        <section className="card p-6">
          <h3 className="section-title">Latest activity</h3>
          <div className="mt-5 grid gap-3">
            {transactions.slice(0, 6).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">{tx.category}</span>
                  {tx.notes ? <span className="text-xs text-slate-400">{tx.notes}</span> : null}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {new Date(tx.occurredOn).toLocaleDateString()}
                </span>
                <span className="font-semibold text-slate-900">${tx.amount.toFixed(2)}</span>
              </div>
            ))}
            {!transactions.length ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm text-slate-500">
                Connect Supabase or load the sample data to see household transactions roll in.
              </p>
            ) : null}
          </div>
        </section>
      </Layout>
    </AuthGuard>
  );
};

export default DashboardPage;
