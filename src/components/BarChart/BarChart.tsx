import { BarChart } from '@mui/x-charts/BarChart';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { ProfileTypes } from '@/types/profileTypes';

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

export default function BasicBars({
  dailyAverage,
  activityRecords,
}: ProfileTypes) {
  const totalHours = activityRecords.reduce(
    (acc: number, item: { hours: number }) => acc + item.hours,
    0
  );

  const displayDailyAverage = totalHours === 0 ? '-' : `${dailyAverage}h`;

  return (
    <div style={{ marginTop: '60px', position: 'relative' }}>
      <div
        style={{
          fontSize: 'var(--BODY)',
          display: 'flex',
          width: '90px',
          marginBottom: '8px',
          marginLeft: '15px',
          gap: '5px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        Média diária
        <h4
          style={{
            fontSize: 'var(--PAGE-TITLE)',
            fontWeight: '500',
          }}
        >
          {displayDailyAverage}
        </h4>
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
            data: activityRecords.map((item: { day: string }) => item.day),
            position: 'bottom',
          },
        ]}
        series={[
          {
            data:
              totalHours === 0
                ? Array(activityRecords.length).fill(0)
                : activityRecords.map((item: { hours: number }) => item.hours),
            color: 'var(--PRIMARY)',
          },
        ]}
        yAxis={[
          { min: 0, max: 6, valueFormatter: (value: number) => `${value}h` },
        ]}
      />

      {totalHours === 0 && (
        <div
          style={{
            width: '280px',
            height: '150px',
            paddingBottom: '20px',
            paddingTop: '20px',
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'var(--HELPER)',
              marginBottom: '20px',
              lineHeight: '18px',
            }}
          >
            Você ainda não registrou nenhuma atividade. Que tal registrar uma
            agora?
          </p>
          <Link to="/new-activity">
            <Button
              variant="standard"
              style={{
                width: '136px',
                padding: '10px 20px',
                fontSize: 'var(--BODY)',
                color: 'var(--WHITE)',
                backgroundColor: 'var(--PRIMARY)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Novo registro
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
