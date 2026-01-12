// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { Navbar } from './components/NavBar'
// import Index from './pages/Index'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen  min-w-screen p-0 m-0 flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index/>} />
            {/* <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
