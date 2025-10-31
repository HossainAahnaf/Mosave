import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

export type Expense = {
  id: string;
  category: string;
  amount: number;
  occurredOn: string;
  householdId: string;
  notes?: string;
};

export type ExpenseSummary = {
  month: string;
  income: number;
  expenses: number;
  savings: number;
};

export const useExpenses = () => {
  const { supabase, activeHouseholdId } = useAuth();
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const computeSummary = useCallback((items: Expense[]): ExpenseSummary[] => {
    const grouped = items.reduce<Record<string, { income: number; expenses: number }>>((acc, item) => {
      const keyDate = new Date(item.occurredOn);
      const key = `${keyDate.getFullYear()}-${keyDate.getMonth()}`;
      if (!acc[key]) {
        acc[key] = { income: 0, expenses: 0 };
      }
      if (item.category.toLowerCase() === "income") {
        acc[key].income += item.amount;
      } else {
        acc[key].expenses += item.amount;
      }
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([key, value]) => {
        const [year, month] = key.split("-").map(Number);
        const monthLabel = new Date(year, month).toLocaleString("default", { month: "long" });
        return {
          month: `${monthLabel} ${year}`,
          income: Math.round(value.income * 100) / 100,
          expenses: Math.round(value.expenses * 100) / 100,
          savings: Math.round((value.income - value.expenses) * 100) / 100
        } satisfies ExpenseSummary;
      });
  }, []);

  const mapExpense = useCallback((record: any): Expense => {
    const occurred = record.occurred_on ?? record.occurredOn ?? new Date().toISOString();
    return {
      id: record.id ?? crypto.randomUUID(),
      category: record.category,
      amount: Number(record.amount),
      occurredOn: occurred,
      householdId: record.household_id ?? record.householdId ?? "",
      notes: record.notes ?? undefined
    };
  }, []);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (supabase && activeHouseholdId) {
        const { data, error: supabaseError } = await supabase
          .from("expenses")
          .select("id, category, amount, occurred_on, household_id, notes")
          .eq("household_id", activeHouseholdId)
          .order("occurred_on", { ascending: false });

        if (supabaseError) throw new Error(supabaseError.message);

        const parsed = (data ?? []).map(mapExpense);
        setTransactions(parsed);
        setSummary(computeSummary(parsed));
        return;
      }

      // Fallback to bundled sample data via public folder fetch.
      const response = await fetch("/data/sample_expenses.json");
      if (!response.ok) throw new Error("Unable to load sample data");
      const json = await response.json();
      const transactionSource = Array.isArray(json?.transactions)
        ? json.transactions
        : Array.isArray(json)
        ? json
        : [];
      const parsed = transactionSource.map(mapExpense);
      const computedSummary = Array.isArray(json?.summary) ? json.summary : computeSummary(parsed);
      setTransactions(parsed);
      setSummary(computedSummary);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [supabase, activeHouseholdId, computeSummary, mapExpense]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return {
    transactions,
    summary,
    isLoading: loading,
    isError: Boolean(error),
    error,
    refresh: loadExpenses
  };
};

export default useExpenses;
