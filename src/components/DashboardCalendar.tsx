import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardCalendar: React.FC = () => {
  // Mengizinkan nilai yang sesuai untuk single date atau range
  const [date, setDate] = useState<Date | [Date, Date] | null>(null);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    setDate(value as Date | [Date, Date]);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Kalender</h2>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default DashboardCalendar;
