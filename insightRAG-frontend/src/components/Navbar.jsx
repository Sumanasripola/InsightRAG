import { Sparkles } from "lucide-react";

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <Sparkles className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold">InsightRAG</span>
        </div>

        <div className="flex space-x-6">
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
          <button onClick={() => onNavigate("about")}>About</button>
        </div>

      </div>
    </nav>
  );
}