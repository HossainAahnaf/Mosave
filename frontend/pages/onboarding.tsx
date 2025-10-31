import { FormEvent, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const DEFAULT_CATEGORIES = [
  "Income",
  "Rent",
  "Groceries",
  "Utilities",
  "Transport",
  "Health",
  "Entertainment",
  "Savings"
];

const DEFAULT_GOALS = [
  {
    title: "Emergency fund",
    target_amount: 1500,
    current_amount: 0,
    due_date: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10)
  },
  {
    title: "Utilities reserve",
    target_amount: 600,
    current_amount: 0,
    due_date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10)
  }
];

const DEFAULT_EXPENSES = [
  { category: "Income", amount: 2100, occurred_on: "2024-09-01", notes: "Part-time jobs" },
  { category: "Rent", amount: 750, occurred_on: "2024-09-01", notes: "Apartment share" },
  { category: "Groceries", amount: 185.4, occurred_on: "2024-09-04", notes: "Trader Joe's" },
  { category: "Utilities", amount: 132.75, occurred_on: "2024-09-02", notes: null },
  { category: "Transport", amount: 68.95, occurred_on: "2024-09-03", notes: "Metro card top-up" }
];

const OnboardingPage = () => {
  const router = useRouter();
  const { supabase, user, profile, setActiveHousehold } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [householdName, setHouseholdName] = useState(
    profile?.full_name ? `${profile.full_name.split(" ")[0]}'s household` : "MoSave household"
  );
  const [invitees, setInvitees] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteList = useMemo(() => invitees.split(/[,\n]/).map((item) => item.trim()).filter(Boolean), [invitees]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !user) return;

    setLoading(true);
    setError(null);

    try {
      const { data: householdData, error: householdError } = await supabase
        .from("households")
        .insert({ name: householdName, owner_id: user.id })
        .select()
        .maybeSingle();

      if (householdError || !householdData) {
        throw new Error(householdError?.message ?? "Unable to create household");
      }

      const householdId = householdData.id as string;

      await supabase.from("household_members").insert({ household_id: householdId, user_id: user.id, role: "owner" });

      await supabase
        .from("expense_categories")
        .insert(DEFAULT_CATEGORIES.map((name) => ({ household_id: householdId, name })));

      await supabase.from("goals").insert(
        DEFAULT_GOALS.map((goal) => ({
          household_id: householdId,
          ...goal
        }))
      );

      await supabase.from("expenses").insert(
        DEFAULT_EXPENSES.map((expense) => ({
          household_id: householdId,
          created_by: user.id,
          ...expense
        }))
      );

      if (inviteList.length) {
        await supabase
          .from("household_invites")
          .insert(inviteList.map((email) => ({ household_id: householdId, email, invited_by: user.id })));
      }

      await supabase
        .from("profiles")
        .update({ onboarding_complete: true, full_name: fullName || profile?.full_name })
        .eq("user_id", user.id);

      setActiveHousehold(householdId);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!supabase) {
    return (
      <Layout title="Configure Supabase" description="Add Supabase credentials to unlock onboarding and realtime data.">
        <div className="card mx-auto w-full max-w-xl p-8 text-sm text-slate-600">
          <p>To use onboarding, set the following environment variables and redeploy:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
            <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
          </ul>
          <p className="mt-4">Until then, explore the sample data in the dashboard.</p>
        </div>
      </Layout>
    );
  }

  return (
    <AuthGuard requireOnboarding={false}>
      <Head>
        <title>Onboarding • MoSave</title>
      </Head>
      <Layout title="Set up your household" description="Invite your roommates, seed categories, and let Mo calibrate to your money rhythm.">
        <section className="mx-auto w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="card grid gap-6 p-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="full-name">
                  Your name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Add how Mo should address you"
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-primary-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="household-name">
                  Household name
                </label>
                <input
                  id="household-name"
                  type="text"
                  required
                  value={householdName}
                  onChange={(event) => setHouseholdName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-primary-400 focus:outline-none"
                />
                <p className="text-xs text-slate-400">You can change this later in settings.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="invitees">
                  Invite teammates
                </label>
                <textarea
                  id="invitees"
                  value={invitees}
                  onChange={(event) => setInvitees(event.target.value)}
                  placeholder="roommate@email.com, partner@email.com"
                  className="min-h-[120px] rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-primary-400 focus:outline-none"
                />
                <p className="text-xs text-slate-400">Separate emails with commas or line breaks. We&apos;ll send them a secure invite.</p>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/50 bg-white/70 p-6 text-sm text-slate-600 shadow-inner">
              <h3 className="text-base font-semibold text-slate-800">What Mo sets up for you</h3>
              <ul className="grid gap-2">
                <li>• Default categories ({DEFAULT_CATEGORIES.join(", ")})</li>
                <li>• Sample transactions so charts light up on day one</li>
                <li>• Starter savings goals + streak tracker</li>
              </ul>
              {inviteList.length ? (
                <div className="rounded-2xl border border-primary-100 bg-primary-50/80 p-4 text-xs text-primary-600">
                  Inviting {inviteList.length} teammate{inviteList.length > 1 ? "s" : ""}.
                </div>
              ) : null}
              {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-500">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-xl hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating household..." : "Launch household"}
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </AuthGuard>
  );
};

export default OnboardingPage;
