import { useEffect, useState } from "react";
import "../css/HomePage.css";
import {Bar} from "react-chartjs-2";

export default function Home({
  Category_Expenses,
  thisMonthExpense,
  previousMonthExpenses, 
  PreviousMonth_CategoryExpenses,
  supportedCurrencies,
  currency, setCurrency,chartOptions,ThisMonth_IncomeSourcesTotal, ThisMonth_IncomeTotal,
  categories_ranking_chartData,Income_Sources_Ranking_ChartData, previousMonth_IncomeSourcesTotal,
  previousMonth_IncomeTotal,thisMonthIncome, previousMonthIncome, currencySymbol
}) {
  let Expenses_Chart_Data = {};
  let Total_Income_Comparision_Chart_Data = {};
  // Total of this month's expenses and Previous month's expenses
  const thisMonthExpensesTotal = thisMonthExpense.reduce(
    (sum, item) => sum + Number(item?.Expense_Amount || 0),
    0
  );
  const PreviousMonthExpensesTotal = previousMonthExpenses.reduce(
    (sum, item) => sum + Number(item?.Expense_Amount || 0),
    0
  );
  // Calculates the percentage change from the previous month to the current month in percentage
  let Percentage_Charge =
  PreviousMonthExpensesTotal
    ? ((thisMonthExpensesTotal - PreviousMonthExpensesTotal) /
       PreviousMonthExpensesTotal * 100).toFixed(2)
    : 0;


  const setBarColor = (PreviousMonthDataTotal, thisMonthDataTotal) => {
     if(PreviousMonthDataTotal > thisMonthDataTotal) {
        return "lime";
     } else {
      return "red";
     }
  }
  if(thisMonthExpense.length > 0 && previousMonthExpenses.length > 0) {
    Expenses_Chart_Data = {
       labels: [thisMonthExpense[0].Month, previousMonthExpenses[0].Month],
       datasets: [
         {
         label: "Expense",
         data: [thisMonthExpensesTotal, PreviousMonthExpensesTotal],
         backgroundColor : [
        setBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal),
        setBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal)
       ]
           }
       ],
    }
  } 
  // Below is the chart data for comparision between previous Month and current Month Total Income
  if(thisMonthIncome.length > 0 && previousMonthIncome.length > 0) {
      Total_Income_Comparision_Chart_Data = {
      labels: [thisMonthIncome[0].Month, previousMonthIncome[0].Month], 
      datasets: [ 
        {
        label: ["Total Income Comparision"],
       data: [ThisMonth_IncomeTotal,previousMonth_IncomeTotal], 
       backgroundColor: [
        setBarColor(previousMonth_IncomeTotal, ThisMonth_IncomeTotal),
        setBarColor(previousMonth_IncomeTotal, ThisMonth_IncomeTotal),
      ]
        }
      ],
   }
  }
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
       {categories_ranking_chartData?.datasets?.length > 0 ? 
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
       Total_Income_Comparision_Chart_Data.length > 0 ? 
        <Bar data={Total_Income_Comparision_Chart_Data} options={chartOptions}/>
       : <h2>There is no sufficient data to display this chart!</h2>}
      </div>
        </div>
     <div className="Chart-Wrapper">
           <h2>Income Sources Ranking</h2>
          <div className="Chart-Container-Wide" 
      style={{ width: "80%", maxWidth: "800px"}}>
       {Income_Sources_Ranking_ChartData?.datasets?.length > 0 ? 
       <Bar data={Income_Sources_Ranking_ChartData} options={chartOptions} />
       : <h2>There is no sufficient data to display this chart!</h2>}
      </div>
        </div>
      </div>
    </div>
     <div className="Home-Page-Parent-Div">
      <div>
        <h2>
      Net Balance: <span style={ThisMonth_IncomeTotal > thisMonthExpensesTotal ? {color: "lime"} : {color: "red"}}>
        {currencySymbol}{ThisMonth_IncomeTotal - thisMonthExpensesTotal}
        </span>
        </h2>
      </div>
     </div>
  </div>
);

}       