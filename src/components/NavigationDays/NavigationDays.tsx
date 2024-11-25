import React from 'react';
import clsx from 'clsx';
import style from './NavigationDays.module.css';
import SelectDate from './SelectDate/SelectDate';

interface NavigationDaysProps {
  selectedInterval: string;
  setSelectedInterval: (selectedInterval: string) => void;
  selectedDay: string;
  setSelectedDay: (selectedDay: string) => void;
}

const NavigationDays = ({ selectedDay, setSelectedDay, selectedInterval, setSelectedInterval }: NavigationDaysProps) => {

  const endDate = new Date(selectedInterval);
  const daysCount = 7;
  const days = [];

  for (let i = 0; i < daysCount; i++) {
    const newDate = new Date(endDate);
    newDate.setDate(endDate.getDate() - i);
    days.push(newDate.toISOString().split('T')[0]);
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(event.target.value);
    setSelectedDay(event.target.value);
  };

  return (
    <div className={style.container_days}>
      <SelectDate
        options={days}
        value={selectedInterval}
        onChange={handleSelectChange}
      />
      <div className={style.days_container}>
        {days.reverse().map((date) => {
          const dayDate = new Date(date + 'T00:00:00');
          const isSelected = date === selectedDay;

          const dayNumber = dayDate.getDate().toString().padStart(2, '0');

          return (
            <div
              key={date}
              className={clsx(style.day, {
                [style.selected]: isSelected,
              })}
              onClick={() => { setSelectedDay(date) }}
            >
              <div className={style.weekday}>
                {dayDate.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
              </div>
              <div className={style.day_number}>{dayNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationDays;
