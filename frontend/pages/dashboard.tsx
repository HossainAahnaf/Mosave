import Head from "next/head";
import Layout from "@/components/Layout";
import { FinanceChart } from "@/components/FinanceChart";
import { GoalCard } from "@/components/GoalCard";
import { MoChat } from "@/components/MoChat";
import { useExpenses } from "@/hooks/useExpenses";

const DashboardPage = () => {
  const { summary, transactions, isLoading } = useExpenses();

  const labels = summary.map((item) => item.month);
  const incomeSeries = summary.map((item) => item.income);
  const expenseSeries = summary.map((item) => item.expenses);
  const savingsSeries = summary.map((item) => item.savings);

  return (
    <>
      <Head>
        <title>MoSave Dashboard</title>
      </Head>
      <Layout title="Dashboard" description="Real-time pulse on your household finances and AI mentor insights.">
        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Monthly performance</h2>
              {isLoading ? <span className="text-xs text-slate-400">Refreshing…</span> : null}
            </div>
            {summary.length ? (
              <FinanceChart
                labels={labels}
                incomeSeries={incomeSeries}
                expenseSeries={expenseSeries}
                savingsSeries={savingsSeries}
              />
            ) : (
              <div className="mt-6 text-sm text-slate-500">No data yet. Seed data is available in `/public/data`.</div>
            )}
          </div>
          <MoChat />
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <GoalCard title="Emergency fund" targetAmount={1500} currentAmount={840} dueDate="2025-02-14" streak={12} />
          <GoalCard title="College utilities" targetAmount={600} currentAmount={420} dueDate="2024-12-01" streak={5} />
        </section>
        <section className="card p-6">
          <h3 className="section-title">Latest activity</h3>
          <div className="mt-4 grid gap-3">
            {transactions.slice(0, 6).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-700">{tx.category}</span>
                <span className="text-slate-500">{new Date(tx.occurredOn).toLocaleDateString()}</span>
                <span className="font-semibold text-slate-800">${tx.amount.toFixed(2)}</span>
              </div>
            ))}
            {!transactions.length ? (
              <p className="text-sm text-slate-500">
                Connect Supabase or load the sample data to see household transactions roll in.
              </p>
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default DashboardPage;
