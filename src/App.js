import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { CareerPathTreeChart } from "./Chart"; // Adjust import as per your Chart component location
import { ThebeNotebook } from "./ThebeComponent"; // Adjust import as per your ThebeComponent location
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<CareerPathTreeChart />} />
          <Route path="/thebe" element={<ThebeNotebook />} />
          {/* Add more routes for other components if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




