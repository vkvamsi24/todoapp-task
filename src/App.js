import React from "react";
import { Task } from "./features/tasks/Task";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Task />
      </header>
    </div>
  );
}

export default App;
