import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";

function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      {show && (
        <div className="banner">
          <h1>NEE</h1>
          <h4>lise is nog niet geboren</h4>
        </div>
      )}
      <Canvas />
    </div>
  );
}

export default App;
