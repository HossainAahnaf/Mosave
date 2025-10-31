import { FormEvent, useState } from "react";
import Head from "next/head";

import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import { useSimulation, SimulationInput } from "@/hooks/useSimulation";

const defaultInput: SimulationInput = {
  income: 1800,
  rent: 750,
  savings: 1200,
  goal: 5000,
  scenario: "rent_increase",
  variance: 0.1
};

const SimulatorPage = () => {
  const [form, setForm] = useState(defaultInput);
  const { results, runSimulation, isLoading, error } = useSimulation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runSimulation(form);
  };

  return (
    <AuthGuard>
      <Head>
        <title>MoSave What-If Simulator</title>
      </Head>
      <Layout
        title="What-if simulator"
        description="Experiment with job changes, rent hikes, medical surprises, and more. Mo visualizes the next six months so you can make confident moves."
      >
        <section className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <form onSubmit={handleSubmit} className="card grid gap-4 p-6">
            <h2 className="section-title">Scenario inputs</h2>
            <p className="narrative">
              Adjust the sliders to stress-test your budget. The Monte Carlo engine uses 1,000 runs behind the scenes.
            </p>
            <div className="grid gap-3">
              <Field label="Monthly income" value={form.income} onChange={(value) => setForm((prev) => ({ ...prev, income: value }))} />
              <Field label="Rent / housing" value={form.rent} onChange={(value) => setForm((prev) => ({ ...prev, rent: value }))} />
              <Field label="Savings balance" value={form.savings} onChange={(value) => setForm((prev) => ({ ...prev, savings: value }))} />
              <Field label="Savings goal" value={form.goal} onChange={(value) => setForm((prev) => ({ ...prev, goal: value }))} />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase text-slate-500">Scenario</label>
              <select
                value={form.scenario}
                onChange={(event) => setForm((prev) => ({ ...prev, scenario: event.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
              >
                <option value="rent_increase">Rent increases by 12%</option>
                <option value="job_loss">Temporary job loss</option>
                <option value="medical_expense">Unexpected medical cost</option>
                <option value="gig_income">Gig income boost</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-semibold uppercase text-slate-500">
                Cost variance ({Math.round((form.variance ?? 0) * 100)}%)
              </label>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={form.variance}
                onChange={(event) => setForm((prev) => ({ ...prev, variance: Number(event.target.value) }))}
              />
            </div>
            <button
              type="submit"
              className="mt-3 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300"
              disabled={isLoading}
            >
              {isLoading ? "Running projections..." : "Run simulation"}
            </button>
            {error ? <p className="text-xs text-red-500">{error}</p> : null}
          </form>
          <div className="card flex flex-col gap-4 p-6">
            <h3 className="section-title">Projected balance</h3>
            {results.length ? (
              <div className="grid gap-3 text-sm text-slate-600">
                {results.map((point) => (
                  <div key={point.month} className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{point.month}</span>
                      <span className="text-primary-600">${Math.round(point.balance).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      10th percentile: ${Math.round(point.percentile10).toLocaleString()} • 90th percentile: ${Math.round(point.percentile90).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="narrative">
                Results will appear here with animated charts (D3.js) once the backend simulation endpoint responds.
              </p>
            )}
          </div>
        </section>
        <section className="card grid gap-4 p-6">
          <h3 className="section-title">Action checklist</h3>
          <ul className="grid gap-3 text-sm text-slate-600">
            <li>• Pin two backup plans that keep you above the 10th percentile line.</li>
            <li>• Schedule a Mo micro-lesson on emergency savings if balance dips mid-simulation.</li>
            <li>• Share scenario with household members via Supabase realtime channel.</li>
          </ul>
        </section>
      </Layout>
    </AuthGuard>
  );
};

const Field = ({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) => (
  <div className="grid gap-1">
    <label className="text-xs font-semibold uppercase text-slate-500">{label}</label>
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
      <span className="text-slate-400">$</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
  </div>
);

export default SimulatorPage;
