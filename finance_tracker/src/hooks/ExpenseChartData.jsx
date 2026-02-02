import { useMemo } from "react"

export default function useExpenseChartData(thisMonthExpense, previousMonthExpenses, PreviousMonthExpensesTotal
    , thisMonthExpensesTotal, Category_Expenses
) {   
    // Responsible for returning a bar color based on the data
      const setExpenseBarColor = (PreviousMonthDataTotal, thisMonthDataTotal) => {
     if(PreviousMonthDataTotal > thisMonthDataTotal) {
        return "lime";
     } else {
      return "red";
     }
  } 
    // Below is the chart data for comparsion between previous month and current month total expense
    const Expenses_Chart_Data = useMemo(() => { 
        if(thisMonthExpense.length > 0 && previousMonthExpenses.length > 0) {
            return {
       labels: [previousMonthExpenses[0].Month, thisMonthExpense[0].Month],
       datasets: [
         {
         label: "Expense",
         data: [PreviousMonthExpensesTotal,thisMonthExpensesTotal],
         backgroundColor : [
        setExpenseBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal),
        setExpenseBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal)
       ]
           }
       ],
    }
        } else return { labels: [], datasets: [] };

    }, [thisMonthExpense, previousMonthExpenses, PreviousMonthExpensesTotal, thisMonthExpensesTotal])

  // Below is the chart data for ranking of expense categories based on their current Month Total
  const categories_ranking_chartData =useMemo(() => ({
     labels: ["Housing", "Transportation", "Education", "Personal", "Food&Groceries", "Other"],
  datasets: [
    {
      label: "Category Ranking",
      data: [
        Category_Expenses.Housing || 0,
        Category_Expenses.Transportation || 0,
        Category_Expenses.Education || 0,
        Category_Expenses.Personal || 0,
        Category_Expenses.FoodsGroceries || 0,
        Category_Expenses.Other || 0,
      ],
      backgroundColor: ["yellow","blue","lime","red","pink","purple"]
    }
  ] 
  }), [Category_Expenses])
  return {Expenses_Chart_Data, categories_ranking_chartData}
}