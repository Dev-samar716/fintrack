import "../css/ExpenseHistory.css";
import "../css/Expense.css";
import { useMemo, useState } from "react";

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
   const [selectedCategory, setSelectedCategory] = useState('All')
 let selectedExpenseMonthData = useMemo(() => {
   if(selectedCategory === 'All') {
    return expenseArr.filter(value => value.Month === selectedMonth);
   } else {
    return expenseArr.filter(value => value.Month === selectedMonth && 
       value.Expense_Category.toLowerCase() === selectedCategory.toLocaleLowerCase());
   }
 }, [expenseArr, selectedMonth, selectedCategory])

    const selectedMonthTotal = useMemo(() => {
      return selectedExpenseMonthData.reduce((x,y)=> {
      return x + Number(y.Expense_Amount);
},0)
    })
     return( 
        <div className="Whole-Parent">
          <div className="Select-Container-Section">
          <div className="Select-Container">
                    <label>Month:</label> 
        <select className="Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}
         value={selectedMonth}>
          {months.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>

                <div className="Select-Container">
                    <label>Category:</label> 
       <select className="Input-Select" onChange={(e) => setSelectedCategory(e.target.value)}> 
        <option value={'All'}>All</option>
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
