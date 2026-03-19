import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {

  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {

    if (currentPage === "dashboard") return <Dashboard />;

    if (currentPage === "about") {
      return (
        <>
          <About />
          <Footer />
        </>
      );
    }

    return (
      <>
        <Home onNavigate={setCurrentPage} />
        <Footer />
      </>
    );

  };

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

    </div>

  );

}

export default App;