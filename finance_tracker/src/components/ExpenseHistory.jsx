import { useEffect } from "react";
import "../css/ExpenseHistory.css";
import "../css/Expense.css";

function Display_SelectedMonthExpenseData({Title,Amount,userCurrency, Month, day}) {
    return(
      <div className="Expense-Card"> 
    <div className="card-title">
      <h2>{Title}</h2>
    </div>

    <div className="card-amount">
      <h2>{userCurrency}{Amount}</h2>
    </div>

    <div>
      <h2>Date: {Month}, {day}</h2>
    </div>
    
  </div>

    )
}

export default function Expense_History({
    Vertical_Side_NavBar,
    selectedMonth, 
    setSelectedMonth,
    expenseArr,
    userCurrency
}) {
    const NavLinks_Array = ["Expense", "Income"];
    const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const selected_ExpenseMonthData = expenseArr.filter(value => value.Month === selectedMonth);
const selectedMonthTotal = selected_ExpenseMonthData.reduce((x,y)=> {
      return x + Number(y.Expense_Amount);
},0)
     return(
        <div className="Whole-Parent">
            <div className="Month-Select-Container">
                    <label>Month:</label> 
        <select className="Month-Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}>
          {months.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>

                <div className="Selected-Month-Total-Amount-Container">
    <h2>Total of {selectedMonth}: <span className="Selected-Month-Total-Amount-Span">
    {userCurrency}{selectedMonthTotal}
    </span></h2>
                </div>
            <div className="Layout-flex-Container">
                <Vertical_Side_NavBar NavLinks_Array={NavLinks_Array} />
                <div className="Expense-Card-Container">
                 {!selected_ExpenseMonthData||selected_ExpenseMonthData.length === 0 ? <h1>No recorded Expense Data to show!</h1>
                 : selected_ExpenseMonthData.map(value => {
                    return <Display_SelectedMonthExpenseData Title={value.Expense_Title}
                   Amount={value.Expense_Amount} userCurrency={userCurrency}
                   Month={value.Month} day={value.day} key={value.id}/>
                 })}
                </div>
                <div>
    
                </div>
            </div>
        </div>
     );
}