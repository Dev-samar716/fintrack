import "../css/HomePage.css";
import {Bar} from "react-chartjs-2";
import useExpenseDataByPeriod from '../hooks/ExpenseDataByPeriod.jsx';
import useIncomeDateFilter from "../hooks/IncomeDateFilter.jsx";
import useExpenseChartData from "../hooks/ExpenseChartData.jsx"
import useIncomeChartData from "../hooks/IncomeChartData.jsx";
import useSavingsSuggestion from '../hooks/SavingsSuggestion.jsx';
import { useMemo } from "react";

export default function Home({
  Category_Expenses,
  expenseArr,
  PreviousMonth_CategoryExpenses,
  supportedCurrencies,
  currency, setCurrency,chartOptions,ThisMonth_IncomeSourcesTotal, 
  previousMonth_IncomeSourcesTotal,
 currencySymbol,incomeArr, MONTH_MAP
}) {
  const {thisMonthExpense, previousMonthExpenses, thisMonthExpensesTotal, PreviousMonthExpensesTotal} = useExpenseDataByPeriod(expenseArr);

  const {thisMonthIncome, previousMonthIncome, ThisMonth_IncomeTotal, previousMonth_IncomeTotal} = useIncomeDateFilter(incomeArr);

  const {Expenses_Chart_Data , categories_ranking_chartData} = useExpenseChartData(thisMonthExpense, previousMonthExpenses, PreviousMonthExpensesTotal
    , thisMonthExpensesTotal, Category_Expenses);

    const {Total_Income_Comparision_Chart_Data, Income_Sources_Ranking_ChartData} = useIncomeChartData(thisMonthIncome, previousMonthIncome, 
      ThisMonth_IncomeTotal, previousMonth_IncomeTotal,ThisMonth_IncomeSourcesTotal)

       const {net_balance, Savings_Suggestion} = useSavingsSuggestion(ThisMonth_IncomeTotal, thisMonthExpensesTotal)

  // Calculates the percentage change from the previous month to the current month in percentage
  let Percentage_Charge = useMemo(() => {
    return PreviousMonthExpensesTotal
    ? ((thisMonthExpensesTotal - PreviousMonthExpensesTotal) /
       PreviousMonthExpensesTotal * 100).toFixed(2)
    : 0;
  }, [thisMonthExpensesTotal, PreviousMonthExpensesTotal])

  return (
  <div className='Whole'>
    <div className="Currency-Select-Container">
      <label>Currency:</label> 
      <select className="Currency-Input-Select"
       onChange={(e)=>setCurrency(e.target.value)}
       value={currency}>
        {supportedCurrencies.map(value => {
          return <option value={value.code} key={value.id}>{value.code}</option>
        })}
      </select>
    </div>
    <div className="Home-Page-Parent-Div">
      <div className="Overview-Cards-Container">
        <div className='Overview-Card'>
        <h2>📊 Expense Breakdown ({thisMonthExpense[0]?.Month || "This Month"})</h2>
        <p className='Total-p'>Total: {currencySymbol}{thisMonthExpensesTotal}</p> 
         {Object.entries(Category_Expenses || {}).map(([key,value])=> (
            <li key={key} className='Breakdown-Item'> 
              {key} : {currencySymbol}{value} ({thisMonthExpensesTotal ? ((value / thisMonthExpensesTotal) * 100).toFixed(2) : 0}%)
            </li>
         ))}
      </div>
      <div className='Overview-Card'>
        <h2>📊 Expense Breakdown (Previous Month)</h2>
        <p className='Total-p'>Total: {currencySymbol}{PreviousMonthExpensesTotal}</p> 
         {Object.entries(PreviousMonth_CategoryExpenses || {}).map(([key,value])=> (
            <li key={key} className='Breakdown-Item'> 
              {key} : {currencySymbol}{value} ({PreviousMonthExpensesTotal ? ((value / PreviousMonthExpensesTotal) * 100).toFixed(2) : 0}%)

            </li>
         ))}
      </div>
      </div>
      <div className="Charts-Section"> 
        <div className="Chart-Wrapper">
           <h2>Expense Comparision</h2>
          <div className="Chart-Container" 
      style={{ width: "50%", maxWidth: "500px"}}>
       {Expenses_Chart_Data?.datasets?.length > 0 ? <Bar data={Expenses_Chart_Data} options={chartOptions} />
       : <h2>Not enough data to display a chart!</h2>}
      </div>
      {PreviousMonthExpensesTotal > thisMonthExpensesTotal ? <p>Decreased by -{Percentage_Charge}%</p> : <p>Increased by +{Percentage_Charge}%</p>}
        </div>
        <div className="Chart-Wrapper">
           <h2>Expense Categories Ranking</h2>
          <div className="Chart-Container-Wide" 
      style={{ width: "80%", maxWidth: "800px"}}>
       {thisMonthExpensesTotal > 0 ? 
        <Bar data={categories_ranking_chartData} options={chartOptions}/>
       : <h2>There is no sufficient data to display this chart!</h2>}
      </div>
        </div>
      </div>
    </div>
    <div className="Home-Page-Parent-Div">
      <div className="Overview-Cards-Container">
        <div className='Overview-Card'>
        <h2>📊 Income Breakdown ({thisMonthExpense[0]?.Month || "This Month"})</h2>
        <p className='Total-p'>Total: {currencySymbol}{ThisMonth_IncomeTotal}</p> 
         {Object.entries(ThisMonth_IncomeSourcesTotal || {}).map(([key,value])=> (
            <li key={key} className='Breakdown-Item'> 
              {key} : {currencySymbol}{value} ({ThisMonth_IncomeTotal ? ((value / ThisMonth_IncomeTotal) * 100).toFixed(2) : 0}%)
            </li>
         ))}
      </div>
      <div className='Overview-Card'>
        <h2>📊 Income Breakdown (Previous Month)</h2>
        <p className='Total-p'>Total: {currencySymbol}{previousMonth_IncomeTotal}</p> 
        {Object.entries(previousMonth_IncomeSourcesTotal || {}).map(([key, value]) => (
          <li key={key} className="Breakdown-Item">
            {key}: {currencySymbol}{value} ({previousMonth_IncomeTotal ? ((value / previousMonth_IncomeTotal) * 100).toFixed(2) : 0}%)
            </li>
        ))}
      </div>
      </div>
      <div className="Chart-Section">
      <div className="Chart-Wrapper">
           <h2>Income Comparision</h2>
          <div className="Chart-Container-Wide" 
      style={{ width: "80%", maxWidth: "800px"}}>
       {Total_Income_Comparision_Chart_Data?.datasets?.length > 0 && 
        Total_Income_Comparision_Chart_Data ? 
        <Bar data={Total_Income_Comparision_Chart_Data} options={chartOptions}/>
       : <h2>There is no sufficient data to display this chart!</h2>}
      </div>
        </div>
     <div className="Chart-Wrapper">
           <h2>Income Sources Ranking</h2>
          <div className="Chart-Container-Wide" 
      style={{ width: "80%", maxWidth: "800px"}}>
       {ThisMonth_IncomeTotal > 0? 
       <Bar data={Income_Sources_Ranking_ChartData} options={chartOptions} />
       : <h2>There is no sufficient data to display this chart!</h2>}
      </div>
        </div>
      </div>
    </div>
     <div className="Home-Page-Parent-Div">
      <div className="Finance-analysis-container">
        <h2>
      Net Balance: <span style={net_balance > 0 ? {color: "lime"} : {color: "red"}}>
        {currencySymbol}{net_balance}
        </span>
        </h2>
        <h2>
          Suggested savings amount: {currencySymbol}{Savings_Suggestion}
        </h2>
      </div>
     </div>
  </div>
);

}       