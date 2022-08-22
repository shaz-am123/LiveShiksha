import React from 'react';
import AppState from "./context/appState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Env from "./components/Env";
import Home from "./components/Home";

function App() {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/:username/:roomId" element={<Env />} />
        </Routes>
      </Router>
    </AppState>);
}

export default App;
