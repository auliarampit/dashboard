import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <header className="p-4 bg-blue-500 text-white">
      <h1>{t('welcome', { name: user?.username })}</h1>
    </header>
  );
};

export default Header;
