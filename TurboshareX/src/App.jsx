import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Home from "./components/Home";

function App() {
  const [text, setText] = useState("");

  return (
    <>
      <Navbar />
      <div className="pad">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home text={text} />}

            />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
