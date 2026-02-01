import "../css/ExpenseHistory.css";
import "../css/Expense.css";
import { useEffect, useState } from "react";

function Update_SelectedMonthCategory(e,setSelectedExpenseMonthData,selected_ExpenseMonthData) {
      let selected_category = e.target.value; 
      setSelectedExpenseMonthData(
        selected_ExpenseMonthData.filter(value => value.Expense_Category.toLowerCase() === selected_category)
      )
      console.log(selected_category);
}

// The below function returns a card based on the Expense Data
function Display_SelectedMonthExpenseData({Title,Amount,currencySymbol, Month, day, Category}) {
    return(
      <div className="Expense-Card"> 
    <div className="card-title">
      <h2>{Title}</h2>
    </div>

    <div className="card-amount">
      <h2>{currencySymbol}{Amount}</h2>
    </div> 

    <div className="card-category">
        <h2>{Category}</h2>
     </div>

    <div>
      <h2>Date: {Month}, {day}</h2>
    </div>
    
  </div>

    )
}

export default function Expense_History({
    selectedMonth, 
    setSelectedMonth,
    expenseArr,
    currencySymbol,
    months, Expense_Categories
}) {
 let selected_ExpenseMonthData = expenseArr.filter(value => value.Month === selectedMonth);
  const [selectedExpenseMonthData, setSelectedExpenseMonthData] = useState(selected_ExpenseMonthData)
 useEffect(()=> {
     setSelectedExpenseMonthData(selected_ExpenseMonthData);
 }, [selected_ExpenseMonthData])
    const selectedMonthTotal = selectedExpenseMonthData.reduce((x,y)=> {
      return x + Number(y.Expense_Amount);
},0)
     return( 
        <div className="Whole-Parent">
          <div className="Select-Container-Section">
          <div className="Select-Container">
                    <label>Month:</label> 
        <select className="Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}>
          {months.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>

                <div className="Select-Container">
                    <label>Category:</label> 
  <select className="Input-Select" onChange={(e)=> Update_SelectedMonthCategory(e,setSelectedExpenseMonthData,selected_ExpenseMonthData)}> 
          {Expense_Categories.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>
          </div>

                <div className="Selected-Month-Total-Amount-Container">
    <h2>Total of {selectedMonth}: <span className="Selected-Month-Total-Amount-Span">
    {currencySymbol}{selectedMonthTotal}
    </span></h2>
                </div>
            <div className="Layout-flex-Container">
                <div className="Expense-Card-Container">
                 {!selectedExpenseMonthData||selectedExpenseMonthData.length === 0 ? <h1>No recorded Expense Data to show!</h1>
                 : selectedExpenseMonthData.map(value => {
                    return <Display_SelectedMonthExpenseData Title={value.Expense_Title}
                   Amount={value.Expense_Amount} currencySymbol={currencySymbol}
                   Month={value.Month} day={value.day} Category={value.Expense_Category} 
                   selectedMonth={selectedMonth} key={value.id}/>
                 })}
                </div>
            </div>
        </div>

     );
}
