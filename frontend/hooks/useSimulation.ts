import { useState } from "react";

export type SimulationInput = {
  income: number;
  rent: number;
  savings: number;
  goal: number;
  scenario: string;
  variance?: number;
};

export type SimulationPoint = {
  month: string;
  balance: number;
  percentile10: number;
  percentile90: number;
};

export const useSimulation = () => {
  const [results, setResults] = useState<SimulationPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async (payload: SimulationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/simulation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Simulation failed");

      const data = await response.json();
      setResults(data.points ?? []);
      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    runSimulation
  };
};

export default useSimulation;
