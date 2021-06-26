import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import versionize, { ObjectVersion } from "../../src";

type countType = {
  prop1: number;
};

function App() {
  const [count, setCount] = useState<ObjectVersion<countType>>(
    versionize<countType>({
      prop1: 4,
    })
  );
  useEffect(() => {
    console.log("count changed");
  }, [count]);
  useEffect(() => {
    console.log("count version changed");
  }, [count.__version__]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={() => {
              const newObj = versionize(
                {
                  prop1: 4,
                },
                count
              );
              setCount(newObj);
            }}
          >
            count is: {count?.prop1}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
