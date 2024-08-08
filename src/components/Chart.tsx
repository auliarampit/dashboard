import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Mendaftarkan semua komponen yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
  datasets: [
    {
      label: 'Pemasukan',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      data: [65000, 59000, 80000, 81000, 56000, 55000],
    },
    {
      label: 'Pengeluaran',
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(255,99,132,1)',
      data: [45000, 48000, 40000, 19000, 86000, 27000],
    },
  ],
};

const Chart: React.FC = () => (
  <div className="p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-bold mb-4">Grafik Data Pemasukan & Pengeluaran Per Bulan</h2>
    <Bar data={data} />
  </div>
);

export default Chart;
