import { useState } from "react";

type ChatHistory = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const useAIMentor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPrompt = async (prompt: string, history: ChatHistory[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history })
      });

      if (!response.ok) throw new Error("Mo is taking a break. Try again soon.");

      const data = await response.json();
      return data.reply as string;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendPrompt,
    isLoading,
    error
  };
};

export default useAIMentor;
