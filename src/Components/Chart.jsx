import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return value + "hrs";
          },
        },
        min: 0,
        max: 45,
      },
    },
    plugins: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Active Employees",
        font: {
          size: 15,
        },
      },
    },
  };
  
  const Chart = ({ data }) => {
    const userdata = {
      labels: data.map(({ username }) => username),
      datasets: [
        {
          label: "Weekly Average time",
          data: data.map(({ workhours }) => workhours),
          backgroundColor: "green",
          borderRadius: 5,
        },
      ],
    };
    return <Bar options={options} data={userdata} />;
    // <div>hello</div>
  };
  
  export default Chart;