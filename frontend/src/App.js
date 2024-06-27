import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import AddEditTask from "./components/AddEditTask";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/add" element={<AddEditTask />} />
            <Route path="/edit/:id" element={<AddEditTask />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
