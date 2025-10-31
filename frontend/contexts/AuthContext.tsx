import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { Session, User } from "@supabase/supabase-js";

import { supabaseClient } from "@/lib/supabaseClient";

export type HouseholdSummary = {
  id: string;
  name: string;
  role: "owner" | "member";
};

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  onboarding_complete: boolean;
};

type AuthContextValue = {
  supabase: typeof supabaseClient;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  households: HouseholdSummary[];
  activeHouseholdId: string | null;
  setActiveHousehold: (id: string) => void;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [households, setHouseholds] = useState<HouseholdSummary[]>([]);
  const [activeHouseholdId, setActiveHouseholdId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!supabaseClient);

  // Subscribe to auth session changes.
  useEffect(() => {
    if (!supabaseClient) return;

    let mounted = true;

    const getInitialSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
    };

    getInitialSession();

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch profile + households when session changes.
  useEffect(() => {
    const fetchProfileAndHouseholds = async () => {
      if (!supabaseClient || !session?.user) {
        setProfile(null);
        setHouseholds([]);
        setActiveHouseholdId(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const [{ data: profileData }, { data: membershipData }] = await Promise.all([
        supabaseClient.from("profiles").select("id,user_id,full_name,onboarding_complete").eq("user_id", session.user.id).maybeSingle(),
        supabaseClient
          .from("household_members")
          .select("household_id,role")
          .eq("user_id", session.user.id)
      ]);

      if (profileData) {
        setProfile(profileData as Profile);
      } else {
        // Auto-create basic profile if missing.
        const { data: newProfile } = await supabaseClient
          .from("profiles")
          .insert({ user_id: session.user.id })
          .select()
          .maybeSingle();
        if (newProfile) setProfile(newProfile as Profile);
      }

      if (membershipData && membershipData.length) {
        const householdIds = membershipData.map((item: any) => item.household_id);
        const { data: householdRows } = await supabaseClient
          .from("households")
          .select("id,name")
          .in("id", householdIds);

        const mapped: HouseholdSummary[] = membershipData.map((member: any) => {
          const household = householdRows?.find((row) => row.id === member.household_id);
          return {
            id: member.household_id,
            name: household?.name ?? "Household",
            role: member.role
          };
        });

        setHouseholds(mapped);
        setActiveHouseholdId((prev) => prev ?? mapped[0]?.id ?? null);
      } else {
        setHouseholds([]);
        setActiveHouseholdId(null);
      }

      setLoading(false);
    };

    fetchProfileAndHouseholds();
  }, [session?.user?.id]);

  const setActiveHousehold = useCallback((id: string) => {
    setActiveHouseholdId(id);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabaseClient) {
      return { error: "Supabase is not configured. Provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." };
    }
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push("/dashboard");
    }
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabaseClient) {
      return { error: "Supabase is not configured. Provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." };
    }
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (!error) {
      router.push("/onboarding");
    }
    return { error: error?.message };
  };

  const signOut = async () => {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    setHouseholds([]);
    setActiveHouseholdId(null);
    router.push("/signin");
  };

  const value: AuthContextValue = useMemo(
    () => ({
      supabase: supabaseClient,
      session,
      user: session?.user ?? null,
      profile,
      households,
      activeHouseholdId,
      setActiveHousehold,
      loading,
      signIn,
      signUp,
      signOut
    }),
    [session, profile, households, activeHouseholdId, loading, setActiveHousehold]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
