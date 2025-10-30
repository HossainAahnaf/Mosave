import Head from "next/head";
import Layout from "@/components/Layout";

const AboutPage = () => (
  <>
    <Head>
      <title>About MoSave</title>
    </Head>
    <Layout title="About MoSave" description="Financial literacy designed for the TikTok generation.">
      <section className="card grid gap-4 p-6">
        <h2 className="section-title">Our mission</h2>
        <p className="narrative">
          We believe every teen, college student, and young adult deserves access to tools that make money management feel
          doable, friendly, and fun. MoSave is your always-on co-pilot that speaks your language and keeps you encouraged.
        </p>
        <p className="text-sm text-slate-600">
          This scaffold is ready for production integrations: connect Supabase for real data, wire up OpenAI for live voice +
          chat, and deploy to Vercel + Render with CI/CD. Extend the platform with community prompts, Chrome receipts, or a
          Streamlit mentor for workshops.
        </p>
      </section>
    </Layout>
  </>
);

export default AboutPage;
