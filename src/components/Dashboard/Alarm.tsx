import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Alarm: React.FC = () => {
  const { t } = useTranslation();
  const [alarmTime, setAlarmTime] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSave = () => {
    console.log('Alarm set for:', alarmTime);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">{t('alarm')}</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {t('setAlarm')}
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{t('setAlarm')}</h2>
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="mt-2 p-2 border rounded"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 p-2 bg-gray-300 rounded"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSave}
                className="p-2 bg-blue-500 text-white rounded"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
