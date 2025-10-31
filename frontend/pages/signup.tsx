import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await signUp(email.trim(), password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create account • MoSave</title>
      </Head>
      <Layout title="Create your MoSave account" description="Invite your household, track every expense, and let Mo guide the way.">
        <section className="mx-auto w-full max-w-md">
          <form onSubmit={handleSubmit} className="card flex flex-col gap-5 p-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-primary-400 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-primary-400 focus:outline-none"
              />
            </div>
            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-500">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-xl hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
            <p className="text-center text-xs text-slate-500">
              Already have an account? {" "}
              <Link href="/signin" className="text-primary-600 hover:text-primary-700">
                Sign in
              </Link>
            </p>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default SignUpPage;
