import Head from "next/head";
import Layout from "@/components/Layout";

const CommunityPage = () => {
  return (
    <>
      <Head>
        <title>MoSave Community</title>
      </Head>
      <Layout
        title="Community leaderboard"
        description="Cheer on fellow learners, share streaks, and unlock collective money wins in a safe, privacy-first space."
      >
        <section className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="card p-6">
            <h2 className="section-title">Leaderboard</h2>
            <p className="narrative">
              Rankings blend Financial IQ score, savings momentum, and 7-day streak consistency. Toggle social mode to share
              goals anonymously.
            </p>
            <div className="mt-4 grid gap-3">
              {leaders.map((user, index) => (
                <div
                  key={user.handle}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-primary-500">#{index + 1}</span>
                    <div>
                      <p className="font-semibold text-slate-800">{user.handle}</p>
                      <p className="text-xs text-slate-500">{user.city}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p className="text-sm font-semibold text-slate-700">IQ {user.iq}</p>
                    <p>Streak {user.streak}d</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card flex flex-col gap-4 p-6">
            <h3 className="section-title">Impact dashboard</h3>
            <p className="narrative">
              Track your growth with reflective metrics, inspirational quotes, and progress reports compiled by Mo.
            </p>
            <ul className="grid gap-3 text-sm text-slate-600">
              <li>• Savings growth past 90 days: <span className="font-semibold text-primary-600">+18%</span></li>
              <li>• Literacy mastery: <span className="font-semibold text-primary-600">12/18 modules</span></li>
              <li>• Quiz accuracy: <span className="font-semibold text-primary-600">82%</span></li>
            </ul>
            <div className="rounded-2xl bg-gradient-to-br from-primary-500/15 via-primary-500/5 to-accent-500/15 p-5 text-sm text-primary-700">
              “The best time to plant a money tree was yesterday. The second best time is right after you hit ‘Automate.’”
            </div>
          </div>
        </section>
        <section className="card grid gap-4 p-6">
          <h3 className="section-title">Community challenges</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="rounded-2xl border border-primary-100 bg-white p-4 text-sm shadow-sm">
                <p className="text-xs uppercase text-primary-500">{challenge.type}</p>
                <p className="mt-2 font-semibold text-slate-800">{challenge.title}</p>
                <p className="mt-2 text-xs text-slate-500">{challenge.reward}</p>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

const leaders = [
  { handle: "@budgetbae", city: "Atlanta", iq: 742, streak: 36 },
  { handle: "@loanless-lena", city: "Seattle", iq: 728, streak: 29 },
  { handle: "@grocerboss", city: "Chicago", iq: 705, streak: 24 },
  { handle: "@savewithsam", city: "Austin", iq: 699, streak: 21 }
];

const challenges = [
  { type: "Weekly", title: "Save $20 this week", reward: "+8 IQ • Unlock neon simulator theme" },
  { type: "Daily", title: "Log breakfast spend", reward: "+2 IQ • Breakfast badge" },
  { type: "Monthly", title: "Attend community AMA", reward: "+15 IQ • Early beta invites" }
];

export default CommunityPage;
