import useSWR from "swr";

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

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load expenses");
  return response.json();
};

export const useExpenses = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    transactions: Expense[];
    summary: ExpenseSummary[];
  }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/expenses`, fetcher, {
    refreshInterval: 30_000
  });

  return {
    transactions: data?.transactions ?? [],
    summary: data?.summary ?? [],
    isLoading,
    isError: Boolean(error),
    refresh: mutate
  };
};

export default useExpenses;
