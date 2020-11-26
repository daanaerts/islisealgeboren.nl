import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";

function Level1() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <p className="hint">hint: krassen</p>
      {show && (
        <div className="banner">
          <h1>NEE</h1>
          <h4>nog steeds niet</h4>
        </div>
      )}
      <Canvas />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Level1 />
    </div>
  );
}

export default App;
