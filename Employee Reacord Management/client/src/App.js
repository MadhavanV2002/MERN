import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />}/>
      </Routes>
    </div>
  );
}