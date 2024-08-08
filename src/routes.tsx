import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Dashboard/Home';
import Profile from './components/Dashboard/Profile';
import AddNote from './components/Dashboard/AddNote';
import EditNote from './components/Dashboard/EditNote';
import Alarm from './components/Dashboard/Alarm';
import DashboardLayout from './components/DashboardLayout';
import DataTransaction from './components/Dashboard/DataTransaction';
// import { RootState } from './redux/store';

const AppRoutes: React.FC = () => {
  // const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<DashboardLayout />}
          // element={token ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/data-transaksi" element={<DataTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
