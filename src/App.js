import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Todo from "./components/todo/Todo";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/App" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/Registration" element={<Registration />} />
        </Routes>
        <Routes>
          <Route path="/Todo" element={<Todo />} />
        </Routes>

        {/* <Route path="*" element={<Missing />} /> */}
      </Router>
    </div>
  );
}

export default App;
