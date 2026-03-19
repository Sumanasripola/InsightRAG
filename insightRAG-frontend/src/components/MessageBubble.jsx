import { User, Bot } from "lucide-react";

export default function MessageBubble({ message, isUser }) {

  return (

    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>

      <div className="flex items-start space-x-3 max-w-[80%]">

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : "bg-gray-600"
          }`}
        >

          {isUser ? (
            <User className="w-4 h-4 text-white"/>
          ) : (
            <Bot className="w-4 h-4 text-white"/>
          )}

        </div>

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >

          <p className="text-sm">
            {message}
          </p>

        </div>

      </div>

    </div>

  );
}