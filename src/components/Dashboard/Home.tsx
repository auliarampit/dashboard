import React from 'react';
import Chart from '../Chart';
import InfoCard from '../InfoCard';
import DashboardCalendar from '../DashboardCalendar';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{t('dashboard')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            title={t('incomeToday')}
            value="Rp. 0,-"
            color="bg-green-200"
          />
          <InfoCard
            title={t('incomeThisMonth')}
            value="Rp. 0,-"
            color="bg-blue-200"
          />
          <InfoCard
            title={t('expenseToday')}
            value="Rp. 0,-"
            color="bg-red-200"
          />
          <InfoCard
            title={t('expenseThisMonth')}
            value="Rp. 0,-"
            color="bg-orange-200"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Chart />
          <DashboardCalendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
