import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

type FinanceChartProps = {
  incomeSeries: number[];
  expenseSeries: number[];
  savingsSeries: number[];
  labels: string[];
};

export const FinanceChart = ({ incomeSeries, expenseSeries, savingsSeries, labels }: FinanceChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeSeries,
        borderColor: "#314cff",
        backgroundColor: "rgba(49, 76, 255, 0.2)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Expenses",
        data: expenseSeries,
        borderColor: "#ff8c1a",
        backgroundColor: "rgba(255, 140, 26, 0.15)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Savings",
        data: savingsSeries,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => `$${value}`
        }
      }
    }
  };

  return (
    <div className="h-80 w-full">
      <Line data={data} options={options} updateMode="resize" />
    </div>
  );
};

export default FinanceChart;
