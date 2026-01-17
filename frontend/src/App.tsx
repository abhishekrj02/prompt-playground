import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Compare from "@/pages/Compare";
import Versions from "@/pages/Versions";
import { Navbar } from "./components/NavBar";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route path="*" element={
            <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/compare" element={
                  <ProtectedRoute>
                    <Compare />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/versions" element={
                  <ProtectedRoute>
                    <Versions />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<About />} />
              </Routes>
            </div>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
