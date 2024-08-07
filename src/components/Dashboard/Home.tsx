import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Chart from '../Chart';
import Header from '../Header';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{t('home')}</h1>
        <Chart />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 bg-white shadow-md">
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
