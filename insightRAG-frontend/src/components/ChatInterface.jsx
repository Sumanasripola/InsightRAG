import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { askQuestion } from "../services/api";

export default function ChatInterface({ chat, updateMessages }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading,  setIsLoading]  = useState(false);

  const messagesEndRef = useRef(null);
  const messages       = chat.messages;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const question = inputValue.trim();

    const userMsg = {
      text:      question,
      isUser:    true,
      images:    [],
      excel:     null,
      citations: [],
    };

    const next = [...messages, userMsg];
    updateMessages(chat.id, next);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await askQuestion(question, chat.pdfs);

      const aiMsg = {
        text:      res.answer    || "No answer returned.",
        isUser:    false,
        images:    res.images    || [],
        excel:     res.excel     || null,
        citations: res.citations || [],
      };

      updateMessages(chat.id, [...next, aiMsg]);
    } catch {
      updateMessages(chat.id, [
        ...next,
        {
          text:      "Error connecting to backend.",
          isUser:    false,
          images:    [],
          excel:     null,
          citations: [],
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">

      <h2 className="text-xl font-semibold mb-2">Ask Questions</h2>

      {/* Active PDFs */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700">Active PDFs</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {chat.pdfs.map((pdf, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              {pdf}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg.text}
            isUser={msg.isUser}
            images={msg.images    || []}
            excel={msg.excel      || null}
            citations={msg.citations || []}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
            </div>
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about your PDFs..."
          className="flex-1 outline-none text-sm bg-transparent"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-110 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
