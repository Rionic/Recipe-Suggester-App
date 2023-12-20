import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import App from './App';

const RoutesList = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default RoutesList;
