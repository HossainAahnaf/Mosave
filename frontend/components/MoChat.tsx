import { useState } from "react";
import { useAIMentor } from "@/hooks/useAIMentor";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const MoChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey there, I’m Mo, your AI mentor. Ask me anything about your money moves!"
    }
  ]);
  const { sendPrompt, isLoading } = useAIMentor();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim()
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const response = await sendPrompt(newMessage.content, messages);
    if (response) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response
        }
      ]);
    }
  };

  return (
    <div className="card flex h-full flex-col gap-4 p-6">
      <div className="section-title">Chat with Mo</div>
      <div className="narrative">
        Ask Mo for budgeting tips, clarification on your insights, or spark a 1-minute lesson.
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4 shadow-inner">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${
                message.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-slate-700 border border-slate-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Mo, how can I stretch my grocery budget?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isLoading}
          className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
      <p className="text-xs text-slate-400">
        Voice chat coming soon via Whisper + TTS. Drop a question now to see how Mo responds.
      </p>
    </div>
  );
};

export default MoChat;
