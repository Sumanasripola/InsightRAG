import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { askQuestion } from "../services/api";

export default function ChatInterface({ chat, updateMessages }) {

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const messages = chat.messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!inputValue.trim()) return;

    const question = inputValue;

    const userMessage = {
      text: question,
      isUser: true
    };

    const newMessages = [...messages, userMessage];

    updateMessages(chat.id, newMessages);

    setInputValue("");
    setIsLoading(true);

    try {

      const res = await askQuestion(question, chat.pdfs);

      const aiMessage = {
        text: res.answer,
        isUser:false
      };

      updateMessages(chat.id, [...newMessages, aiMessage]);

    } catch {

      const errorMessage = {
        text: "Error connecting to backend.",
        isUser:false
      };

      updateMessages(chat.id, [...newMessages, errorMessage]);

    }

    setIsLoading(false);

  };

  return (

    <div className="flex flex-col h-full">

      <h2 className="text-xl font-semibold mb-2">
        Ask Questions
      </h2>

      {/* Active PDFs */}

      <div className="mb-4">

        <p className="text-sm font-semibold text-gray-700">
          Active PDFs
        </p>

        <div className="flex flex-wrap gap-2 mt-2">

          {chat.pdfs.map((pdf,i)=>(
            <span
              key={i}
              className="bg-gray-200 text-xs px-3 py-1 rounded"
            >
              {pdf}
            </span>
          ))}

        </div>

      </div>

      <div className="flex-1 overflow-y-auto mb-4 min-h-[400px]">

        {messages.map((message,index)=>(
          <MessageBubble
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}

        {isLoading && (

          <div className="flex items-center gap-2 text-gray-500">

            <Loader2 className="w-4 h-4 animate-spin"/>
            Thinking...

          </div>

        )}

        <div ref={messagesEndRef}/>

      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">

        <input
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          placeholder="Ask a question about your PDFs..."
          className="flex-1 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
        >
          <Send className="w-4 h-4"/>
        </button>

      </form>

    </div>

  );

}