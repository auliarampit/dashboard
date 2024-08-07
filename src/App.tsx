import React from 'react';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
