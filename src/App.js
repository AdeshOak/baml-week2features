// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { CareerPathTreeChart } from "./Chart";
import ThebeNotebook from "./ThebeNotebook"; // Updated import
import MyComponent from "./MyComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<CareerPathTreeChart />} />
          <Route path="/thebe" element={<ThebeNotebook />} />
          <Route path="/mycomp" element={<MyComponent />} />
          {/* Add more routes for other components if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




