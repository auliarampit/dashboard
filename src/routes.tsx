import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Dashboard/Home';
import Profile from './components/Dashboard/Profile';
import AddNote from './components/Dashboard/AddNote';
import EditNote from './components/Dashboard/EditNote';
import Alarm from './components/Dashboard/Alarm';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/alarm" element={<Alarm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
