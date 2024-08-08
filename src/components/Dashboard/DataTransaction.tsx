// src/components/DataTransaction.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';

const DataTransaction: React.FC = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{t('dataTransaction')}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">{t('title')}</th>
            <th className="py-2 px-4 border-b">{t('content')}</th>
            <th className="py-2 px-4 border-b">{t('date')}</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="py-2 px-4 border-b">{note.title}</td>
              <td className="py-2 px-4 border-b">{note.content}</td>
              <td className="py-2 px-4 border-b">{note.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTransaction;
