import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/contexts/AuthContext";

type AuthGuardProps = {
  children: ReactNode;
  requireOnboarding?: boolean;
};

export const AuthGuard = ({ children, requireOnboarding = true }: AuthGuardProps) => {
  const router = useRouter();
  const { supabase, session, profile, loading } = useAuth();

  useEffect(() => {
    if (!supabase) return;
    if (loading) return;

    if (!session) {
      router.push("/signin");
      return;
    }

    if (requireOnboarding && profile && !profile.onboarding_complete && router.pathname !== "/onboarding") {
      router.push("/onboarding");
    }
  }, [session, profile, loading, router, supabase, requireOnboarding]);

  if (!supabase) {
    return <>{children}</>;
  }

  if (loading || !session || (requireOnboarding && profile && !profile.onboarding_complete)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
        Authenticating with MoSave...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
