import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import style from './PortfolioChart.module.scss'
import { useContext } from 'react';
import CryptoContext from '../../../../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioChart() {
  const { CryptoAssets } = useContext(CryptoContext)
  const data = {
    labels: CryptoAssets.map((a) => a.id),
    datasets: [
      {
        label: 'USD',
        data: CryptoAssets.map((a) => a.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ]
      },
    ],
  };
  return (
    <div className={style.Container}>
      <Pie data={data} />


    </div>
  )
}

export default PortfolioChart