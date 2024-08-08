import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Lakukan logout, hapus token dan arahkan ke halaman login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/logo.png" // Ganti dengan path logo Anda
          alt="Logo"
          className="h-10 w-10 mr-4"
        />
        <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
      </div>
      <div className="flex space-x-4">
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          onClick={() => handleNavigation('/')}
        >
          <FaChartBar />
          <span>{t('dashboard')}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>{t('logout')}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
