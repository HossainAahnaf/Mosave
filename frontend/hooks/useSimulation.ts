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

  const offlineProjection = (payload: SimulationInput): SimulationPoint[] => {
    const months = 6;
    const baselineVariable = payload.income - payload.rent - 500;
    let scenarioAdjustment = 0;

    switch (payload.scenario) {
      case "job_loss":
        scenarioAdjustment = -Math.abs(payload.income) * 0.5;
        break;
      case "rent_increase":
        scenarioAdjustment = -payload.rent * 0.15;
        break;
      case "medical_expense":
        scenarioAdjustment = -120;
        break;
      case "gig_income":
        scenarioAdjustment = 120;
        break;
      default:
        scenarioAdjustment = 0;
    }

    let balance = payload.savings;
    const variance = payload.variance ?? 0.1;

    return Array.from({ length: months }, (_item, index) => {
      const monthLabel = new Date();
      monthLabel.setMonth(monthLabel.getMonth() + index + 1);
      const deterministicGain = baselineVariable + scenarioAdjustment;
      balance += deterministicGain;
      const spread = Math.abs(deterministicGain) * variance;
      return {
        month: monthLabel.toLocaleString("default", { month: "short", year: "numeric" }),
        balance: Math.round(balance * 100) / 100,
        percentile10: Math.round((balance - spread) * 100) / 100,
        percentile90: Math.round((balance + spread) * 100) / 100
      };
    });
  };

  const runSimulation = async (payload: SimulationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        const projection = offlineProjection(payload);
        setResults(projection);
        return { points: projection, offline: true };
      }

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
      const projection = offlineProjection(payload);
      setResults(projection);
      setError(`${(err as Error).message} – showing offline projection.`);
      return { points: projection, offline: true };
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
