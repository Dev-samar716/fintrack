import { useMemo } from "react";

export default function useIncomeChartData(thisMonthIncome, previousMonthIncome
    , previousMonth_IncomeTotal, ThisMonth_IncomeTotal,ThisMonth_IncomeSourcesTotal
) { 
    const setIncomeBarColor = (PreviousMonthDataTotal, thisMonthDataTotal) => {
     if(thisMonthDataTotal > PreviousMonthDataTotal ) {
        return "lime";
     } else {
      return "red";
     }
  }
// Below is the chart data for comparision between previous Month and current Month Total Income
     const Total_Income_Comparision_Chart_Data = useMemo(() => {
        if(thisMonthIncome.length > 0 && previousMonthIncome.length > 0) {
            return {
      labels: [previousMonthIncome[0].Month, thisMonthIncome[0].Month], 
      datasets: [ 
        {
        label: ["Total Income Comparision"],
       data: [previousMonth_IncomeTotal,ThisMonth_IncomeTotal], 
       backgroundColor: [
        setIncomeBarColor(previousMonth_IncomeTotal, ThisMonth_IncomeTotal),
        setIncomeBarColor(previousMonth_IncomeTotal, ThisMonth_IncomeTotal),
      ]
        }
      ],
   }
        } else return {labels: [], datasets: []}
     }, [thisMonthIncome, previousMonthIncome])

     //Below is the chart data for ranking of income sources of current month based on their total 
  const  Income_Sources_Ranking_ChartData = useMemo(() => ({
    labels: ["Job", "Freelance", "Business", "Investment", "Other"], 
    datasets: [
      {
        label: ["Income Source Ranking"],
        data: [ThisMonth_IncomeSourcesTotal.Job || 0,
               ThisMonth_IncomeSourcesTotal.Freelance || 0,
              ThisMonth_IncomeSourcesTotal.Business || 0, 
              ThisMonth_IncomeSourcesTotal.Investment || 0, 
              ThisMonth_IncomeSourcesTotal.Other || 0
        ],
        backgroundColor: [
              "yellow", 
              "blue",
              "lime",
              "red",
              "purple",
            ]
      }
    ]
  }), [ThisMonth_IncomeSourcesTotal])

     return {Total_Income_Comparision_Chart_Data, Income_Sources_Ranking_ChartData};
}