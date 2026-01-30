import "../css/ExpenseHistory.css";
import "../css/Expense.css";

function Display_SelectedMonthExpenseData({Title,Amount,userCurrency, Month, day, Category}) {
    return(
      <div className="Expense-Card"> 
    <div className="card-title">
      <h2>{Title}</h2>
    </div>

    <div className="card-amount">
      <h2>{userCurrency}{Amount}</h2>
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
    userCurrency,
    months
}) {
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
                <div className="Expense-Card-Container">
                 {!selected_ExpenseMonthData||selected_ExpenseMonthData.length === 0 ? <h1>No recorded Expense Data to show!</h1>
                 : selected_ExpenseMonthData.map(value => {
                    return <Display_SelectedMonthExpenseData Title={value.Expense_Title}
                   Amount={value.Expense_Amount} userCurrency={userCurrency}
                   Month={value.Month} day={value.day} Category={value.Expense_Category} key={value.id}/>
                 })}
                </div>
            </div>
        </div>

     );
}
