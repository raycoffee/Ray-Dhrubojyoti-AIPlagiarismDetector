import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import UserDocument from "./pages/UserDocument/UserDocument";
import "./App.css";

function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-document" element = {<UserDocument/>}/>
      </Routes>
    </Router>
  );
}

export default App;
