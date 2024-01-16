import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import SavedRecipes from './components/SavedRecipes';
import App from './App';

const RoutesList = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="/saved-recipes" element={<SavedRecipes />}></Route>
    </Routes>
  );
};

export default RoutesList;
