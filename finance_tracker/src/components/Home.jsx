import "../css/HomePage.css";
import {Bar} from "react-chartjs-2";

function selectUserCurrencySymbol(e, supportedCurrencies,setUserCurrency) {
     let Currency_code = e.target.value; 
     let FindCurrency = supportedCurrencies.find(value => value.code === Currency_code);
     setUserCurrency(FindCurrency.symbol);
}

export default function Home({
  Category_Expenses,
  thisMonthExpense,
  previousMonthExpenses, 
  PreviousMonth_CategoryExpenses,
  supportedCurrencies,
  userCurrency, setUserCurrency,chartOptions
}) {
  let Expenses_Chart_Data = {};

  // Total of this month's expenses and Previous month's expenses
  const thisMonthExpensesTotal = thisMonthExpense.reduce(
    (sum, item) => sum + Number(item.Expense_Amount),
    0
  );
  const PreviousMonthExpensesTotal = previousMonthExpenses.reduce(
    (sum, item) => sum + Number(item.Expense_Amount),
    0
  );
  // Calculates the percentage change from the previous month to the current month in percentage
  let Percentage_Charge = (thisMonthExpensesTotal - PreviousMonthExpensesTotal) / (PreviousMonthExpensesTotal * 100); 

  const setBarColor = (PreviousMonthExpensesTotal, thisMonthExpensesTotal) => {
     if(PreviousMonthExpensesTotal > thisMonthExpensesTotal) {
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
         data: [thisMonthExpensesTotal, PreviousMonthExpensesTotal]
         }
       ],
    }
  } else {
     Expenses_Chart_Data = {
       labels: ["January","February"],
       datasets: [
         {
         label: "Expense",
         data: [Math.round(thisMonthExpensesTotal * 0.85),thisMonthExpensesTotal],
         backgroundColor: [
        setBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal),
        setBarColor(PreviousMonthExpensesTotal, thisMonthExpensesTotal),
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
         onChange={(e)=>selectUserCurrencySymbol(e,supportedCurrencies,setUserCurrency)}>
          {supportedCurrencies.map(value => {
            return <option value={value.code} key={value.id}>{value.code}</option>
          })}
        </select>
      </div>
      <div className="Home-Page-Parent-Div">
        <div className="Home-Page-Expense-Overview-Cards-Container">
          <div className='Expense-Category-Total-Review-Card'>
          <h2>📊 Expense Breakdown ({thisMonthExpense[0]?.Month || "This Month"})</h2>
          <p className='Total-p'>Total: {userCurrency}{thisMonthExpensesTotal}</p> 
           {Object.entries(Category_Expenses).map(([key,value])=> (
            // Rendering Object in list of key-value pairs and calculating percentage of value
              <li key={key} className='Category-total-Expense'> 
                {key} : {userCurrency}{value} ({thisMonthExpensesTotal ? ((value / thisMonthExpensesTotal) * 100).toFixed(2) : 0}%)
              </li>
           ))}
        </div>
        <div className='Expense-Category-Total-Review-Card'>
          <h2>📊 Expense Breakdown (Previous Month)</h2>
          <p className='Total-p'>Total: {userCurrency}{PreviousMonthExpensesTotal}</p> 
           {Object.entries(PreviousMonth_CategoryExpenses).map(([key,value])=> (
            // Rendering Object in list of key-value pairs and calculating percentage of value
              <li key={key} className='Category-total-Expense'> 
                {key} : {userCurrency}{value} ({PreviousMonthExpensesTotal ? ((value / PreviousMonthExpensesTotal) * 100).toFixed(2) : 0}%)

              </li>
           ))}
        </div>
        </div>
        <div className="Expense-Comparision-Charts-Container" 
        style={{ width: "50%", maxWidth: "500px", margin: "0 auto"}}>
         <Bar data={Expenses_Chart_Data} options={chartOptions}/>
         {PreviousMonthExpensesTotal > thisMonthExpensesTotal ? <p>Decreased by -{Percentage_Charge}%</p> : <p>Increased by +{Percentage_Charge}%</p>}
        </div>
      </div>
    </div>
  );
}       