interface WeekdayDuration {
  day: string;
  hours: number;
}

interface FormatActivityDurationProps {
  averageDaily: number;
  weekdayDuration: WeekdayDuration[];
}

export function formatActivityDuration({
  averageDaily,
  weekdayDuration,
}: FormatActivityDurationProps) {
  const dailyAverageInHours = (averageDaily / 3600).toFixed(1);

  const formattedWeekdayDuration = weekdayDuration.map((item) => ({
    day: item.day,
    hours: (item.hours / 3600).toFixed(1),
  }));

  const totalHours = formattedWeekdayDuration.reduce(
    (acc, item) => acc + parseFloat(item.hours),
    0
  );

  return {
    dailyAverageInHours,
    formattedWeekdayDuration,
    totalHours,
  };
}
