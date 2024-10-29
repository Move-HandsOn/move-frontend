import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  height: 250,
  width: 385,
  sx: {
    ' & .MuiChartsAxis-directionX .MuiChartsAxis-tickLabel': {
      textAnchor: 'center',
      fill: 'var(--Text-Primary, #1E1E1E)',
    },
    ' & .MuiChartsAxis-directionY .MuiChartsAxis-tickLabel': {
      fill: 'var(--Text-Primary, #1E1E1E)',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BasicBars({ dailyAverage, activityRecords }: any) {
  return (
    <div style={{ marginTop: '60px' }}>
      <div
        style={{
          fontSize: '14px',
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
            fontWeight: 'bold',
            fontSize: '32px',
          }}
        >
          {dailyAverage}h
        </h4>
      </div>
      <BarChart
        {...chartSetting}
        xAxis={[
          {
            scaleType: 'band',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: activityRecords.map((item: { day: any }) => item.day),
            position: 'bottom',
          },
        ]}
        series={[
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: activityRecords.map((item: { hours: any }) => item.hours),
            color: '#085259',
          },
        ]}
      />
    </div>
  );
}
