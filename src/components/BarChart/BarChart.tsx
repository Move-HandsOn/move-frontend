import { BarChart } from '@mui/x-charts/BarChart';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { ProfileTypes } from '@/types/profileTypes';
import style from './BarChart.module.css';
import { formatActivityDuration } from '../../utils/formatActivityDuration';

const chartSetting = {
  height: 250,
  width: 385,
  sx: {
    ' & .MuiChartsAxis-directionX .MuiChartsAxis-tickLabel': {
      textAnchor: 'center',
      fill: 'var(--TEXT-PRIMARY)',
      fontSize: 'var(--HELPER)',
    },
    ' & .MuiChartsAxis-directionY .MuiChartsAxis-tickLabel': {
      fill: 'var(--TEXT-PRIMARY)',
      fontSize: 'var(--HELPER)',
    },
    ' & .MuiChartsAxis-tick': {
      display: 'none',
    },
    ' & .MuiChartsAxis-line': {
      stroke: 'var(--STROKE-1)',
      strokeWidth: 2,
      display: 'block',
    },
  },
};

interface BasicBarsProps {
  averageDaily: ProfileTypes['averageDaily'];
  weekdayDuration: {
    day: string;
    hours: number;
  }[];
}

export default function BasicBars({
  averageDaily,
  weekdayDuration,
}: BasicBarsProps) {
  const { dailyAverageInHours, formattedWeekdayDuration, totalHours } =
    formatActivityDuration({ averageDaily, weekdayDuration });

  const displayDailyAverage =
    totalHours === 0 ? '-' : `${dailyAverageInHours}h`;

  return (
    <div className={style.container}>
      <div className={style.averageBox}>
        Média diária
        <h4>{displayDailyAverage}</h4>
      </div>

      <BarChart
        {...chartSetting}
        borderRadius={8}
        tooltip={{
          trigger: 'item',
        }}
        xAxis={[
          {
            scaleType: 'band',
            data: formattedWeekdayDuration.map(
              (item: { day: string }) => item.day
            ),
            position: 'bottom',
          },
        ]}
        series={[
          {
            data:
              totalHours === 0
                ? Array(formattedWeekdayDuration.length).fill(0)
                : formattedWeekdayDuration.map((item) =>
                    parseFloat(item.hours)
                  ),
            color: 'var(--PRIMARY)',
          },
        ]}
        yAxis={[
          { min: 0, max: 6, valueFormatter: (value: number) => `${value}h` },
        ]}
      />

      {totalHours === 0 && (
        <div className={style.noRecords}>
          <p>
            Você ainda não registrou nenhuma atividade. Que tal registrar uma
            agora?
          </p>
          <Link to="/new-activity">
            <Button variant="standard" className={style.newActivity}>
              Novo registro
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
