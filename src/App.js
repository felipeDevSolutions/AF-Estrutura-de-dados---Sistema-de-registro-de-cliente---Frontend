import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Clientes" element={<Home />} />
          <Route index element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
