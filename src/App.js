import React from "react";
import Navbar from "./components/Navbar";
import AlumniList from "./components/AlumniList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="directory-wrapper">
        <h1>Alumni Directory</h1>
        <p className="subtitle">
          Connect with alumni across industries and graduation years
        </p>
        <AlumniList />
      </div>
    </div>
  );
}

export default App;
