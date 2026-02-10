import { useMemo } from "react";
export default function useChartOptions() {
    /**Below object is responsible for making he chart responsive for mobile.**/
const chartOptions = useMemo(() => ({
  responsive: true,
  maintainAspectRatio: false, //  THIS FIXES MOBILE
  indexAxis: "x", // FORCES vertical bars
  plugins: {
    legend: {
      labels: {
        color: "white", // This makes label colors white
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "white" },
    },
    y: {
      ticks: { color: "white" },
    },
  },

}), []) 
       
    return chartOptions;
}