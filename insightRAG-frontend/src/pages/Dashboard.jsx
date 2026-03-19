import { useState } from "react";
import PDFUploader from "../components/PDFUploader";
import ChatInterface from "../components/ChatInterface";

export default function Dashboard() {

  const [allPDFs, setAllPDFs] = useState([]);
  const [selectedPDFs, setSelectedPDFs] = useState([]);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const handleFileUpload = (files) => {
    setAllPDFs(prev => [...prev, ...files]);
  };

  const togglePDF = (pdf) => {

    setSelectedPDFs(prev =>
      prev.includes(pdf)
        ? prev.filter(p => p !== pdf)
        : [...prev, pdf]
    );

  };

  const initializeChat = () => {

    if (selectedPDFs.length === 0) {
      alert("Select PDFs first");
      return;
    }

    const newChat = {
      id: Date.now(),
      pdfs: selectedPDFs,
      messages: [],
      name: null
    };

    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setSelectedPDFs([]);

  };

  const deleteChat = (chatId) => {

    setChats(prev => prev.filter(chat => chat.id !== chatId));

    if (chatId === activeChatId) {
      setActiveChatId(null);
    }

  };

  const updateMessages = (chatId, messages) => {

    setChats(prev =>
      prev.map(chat => {

        if (chat.id !== chatId) return chat;

        let chatName = chat.name;

        if (!chatName && messages.length > 0) {
          chatName = messages[0].text.slice(0, 30);
        }

        return {
          ...chat,
          messages,
          name: chatName
        };

      })
    );

  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      {/* Sidebar */}

      <div className="w-64 bg-black/40 backdrop-blur-lg p-4 text-white">

        <h2 className="text-lg font-semibold mb-4">
          Analysis Chats
        </h2>

        {chats.map(chat => (

          <div
            key={chat.id}
            className={`p-3 rounded mb-2 flex justify-between items-start ${
              chat.id === activeChatId
                ? "bg-blue-600"
                : "bg-white/10"
            }`}
          >

            <div
              className="flex-1 cursor-pointer"
              onClick={() => setActiveChatId(chat.id)}
            >

              <p className="text-sm font-medium">

                {chat.name ? chat.name : `Chat ${chat.id.toString().slice(-4)}`}

              </p>

              <p className="text-xs text-gray-300">

                {chat.pdfs.join(", ")}

              </p>

            </div>

            <button
              onClick={() => deleteChat(chat.id)}
              className="text-red-300 text-xs"
            >
              ✕
            </button>

          </div>

        ))}

      </div>

      {/* Main */}

      <div className="flex-1 grid grid-cols-2 gap-6 p-8">

        {/* PDF Library */}

        <div className="bg-white rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            PDF Library
          </h2>

          <PDFUploader onFileUpload={handleFileUpload}/>

          <div className="mt-6 space-y-2">

            {allPDFs.map((pdf,i)=> (

              <label key={i} className="flex items-center gap-2 text-sm">

                <input
                  type="checkbox"
                  checked={selectedPDFs.includes(pdf)}
                  onChange={() => togglePDF(pdf)}
                />

                {pdf}

              </label>

            ))}

          </div>

          <button
            onClick={initializeChat}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Initialize Chat
          </button>

        </div>

        {/* Chat */}

        <div className="bg-white rounded-xl p-6">

          {activeChat ? (

            <ChatInterface
              chat={activeChat}
              updateMessages={updateMessages}
            />

          ) : (

            <div className="flex items-center justify-center h-full text-gray-500">

              Select PDFs and initialize a chat

            </div>

          )}

        </div>

      </div>

    </div>

  );

}