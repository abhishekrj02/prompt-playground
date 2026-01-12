import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { Navbar } from "./components/NavBar";
import Compare from "./pages/Compare";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="min-h-screen  min-w-screen p-0 m-0 flex flex-col">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/compare" element={<Compare />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
