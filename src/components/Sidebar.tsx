import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaChartBar, FaMoneyBillAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-64 h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white flex flex-col shadow-lg">
      <div className="p-6 text-center font-bold text-2xl border-b border-blue-700">
        {t('dashboard')}
      </div>
      <nav className="flex flex-col mt-6 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) => `p-4 flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FaHome />
          <span>{t('home')}</span>
        </NavLink>
        <NavLink
          to="/add-note"
          className={({ isActive }) => `p-4 flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FaChartBar />
          <span>{t('addNote')}</span>
        </NavLink>
        <NavLink
          to="/data-transaksi"
          className={({ isActive }) => `p-4 flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FaMoneyBillAlt />
          <span>{t('dataTransaksi')}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `p-4 flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FaUser />
          <span>{t('profile')}</span>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) => `p-4 flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'bg-red-700' : 'hover:bg-red-700'}`}
        >
          <FaSignOutAlt />
          <span>{t('logout')}</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
