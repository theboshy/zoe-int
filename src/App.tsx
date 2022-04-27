import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AgentView } from './views/agents.view';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/searchAgents" element={<AgentView />} />
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
