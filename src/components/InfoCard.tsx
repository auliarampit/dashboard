import React from 'react';

interface InfoCardProps {
  title: string;
  value: string;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, color }) => {
  return (
    <div className={`p-4 ${color} shadow-md`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
      <a href="#" className="text-blue-500 hover:underline mt-2 block">
        More info
      </a>
    </div>
  );
};

export default InfoCard;
