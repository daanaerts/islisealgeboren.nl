import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import { format } from "date-fns";

function Level1() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
  const gewicht = 4000;
  const tijd = new Date(2020, 11, 27, 18, 0, 0);

  const rand1 = Math.random();
  const rand2 = Math.random();
  const translate = `${rand2 > 0.5 ? "-" : ""}${Math.round(rand1 * 25)}%`;
  console.log(translate);
  return (
    <div className="App">
      <p className="hint">hint: krassen</p>
      {show && (
        <div
          className="banner"
          style={{ transform: `translateY(${translate})` }}
        >
          <h1>LISE</h1>
          <h4>is geboren op 1 december om 21:26c</h4>
        </div>
      )}
      <Canvas onExplode={() => {}} />
      {/* <Canvas onExplode={() => props.onComplete()} /> */}
    </div>
  );
}

function App() {
  const [level, setLevel] = useState(1);
  return (
    <div className="App">
      <Level1 />
    </div>
  );
}

export default App;
