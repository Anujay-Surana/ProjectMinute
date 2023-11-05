import { useEffect, useState } from "react";
import axios from "axios";
import BuildComponent from "./BuildComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <BuildComponent />
        </h1>
      </header>
    </div>
  );
}

export default App;
