// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <div className="min-h-screen bg-[#0F172A] text-gray-900 dark:bg-[#0a0a0a] dark:text-white transition-colors duration-500">
//       <Home />
//       <Dashboard/>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Portfolio from "./pages/portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Portfolio/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;