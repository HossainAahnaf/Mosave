import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

export type Goal = {
  id: string;
  householdId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string | null;
  streakDays: number;
};

const FALLBACK_GOALS: Goal[] = [
  { id: "fallback-1", householdId: "demo", title: "Emergency fund", targetAmount: 1500, currentAmount: 840, dueDate: "2025-02-14", streakDays: 12 },
  { id: "fallback-2", householdId: "demo", title: "Campus utilities", targetAmount: 600, currentAmount: 420, dueDate: "2024-12-01", streakDays: 5 }
];

export const useGoals = () => {
  const { supabase, activeHouseholdId, user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>(FALLBACK_GOALS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transformGoal = useCallback(
    (record: any): Goal => ({
      id: record.id ?? crypto.randomUUID(),
      householdId: record.household_id ?? record.householdId ?? "",
      title: record.title,
      targetAmount: Number(record.target_amount ?? record.targetAmount ?? 0),
      currentAmount: Number(record.current_amount ?? record.currentAmount ?? 0),
      dueDate: record.due_date ?? record.dueDate ?? null,
      streakDays: Number(record.streak_days ?? record.streakDays ?? 0)
    }),
    []
  );

  const fetchGoals = useCallback(async () => {
    if (!supabase || !activeHouseholdId || !user) {
      setGoals(FALLBACK_GOALS);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from("goals")
        .select("id, household_id, title, target_amount, current_amount, due_date, streak_days")
        .eq("household_id", activeHouseholdId)
        .order("due_date", { ascending: true });

      if (supabaseError) throw new Error(supabaseError.message);
      setGoals((data ?? []).map(transformGoal));
    } catch (err) {
      setError((err as Error).message);
      setGoals(FALLBACK_GOALS);
    } finally {
      setLoading(false);
    }
  }, [supabase, activeHouseholdId, user, transformGoal]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return {
    goals,
    isLoading: loading,
    error,
    refresh: fetchGoals
  };
};

export default useGoals;
