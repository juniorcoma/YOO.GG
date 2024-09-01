import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartBoxProps {
  win: number;
  lose: number;
}

export default function DoughnutChartBox({ win, lose }: DoughnutChartBoxProps) {
  const totalRecordCount = win + lose;
  const data = {
    backgroundColor: ['#5383E8', '#FF6C81'],

    datasets: [
      {
        data: [win, lose],
        backgroundColor: ['#5383E8', '#FF6C81'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="flex flex-col w-[10rem]">
      <div className="text-center">
        {totalRecordCount}전 {win}승 {lose}패
      </div>
      <div className="relative">
        <Doughnut data={data} options={{ cutout: '65%', borderColor: 'transparent' }} />
        <strong className="text-[1.6rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-30%] text-color-primary-500">
          {Math.floor((win / (win + lose)) * 100)}%
        </strong>
      </div>
    </div>
  );
}
