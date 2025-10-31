import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const SignInPage = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await signIn(email.trim(), password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign in • MoSave</title>
      </Head>
      <Layout title="Welcome back" description="Sign in to your MoSave household and pick up your streak where you left off.">
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <p className="text-center text-xs text-slate-500">
              Need an account? {" "}
              <Link href="/signup" className="text-primary-600 hover:text-primary-700">
                Sign up instead
              </Link>
            </p>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default SignInPage;
