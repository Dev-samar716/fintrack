import "../css/ExpenseHistory.css";
import "../css/Expense.css";
import { useState, useEffect } from "react";
import {useOutletContext} from 'react-router-dom'
import useFilteredExpenseData from "../hooks/FilteredExpenseData";
import { Search } from "../functions/SearchAlgorithm";
import useSelectedMonthExpenseData from "../hooks/SelectedMonthExpenseData";

// The below function returns a card based on the Expense Data
function Display_Filtered_Expenses({Title,Amount,currencySymbol, Month, day, Category}) {
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
   const [queryResults, setQueryResults] = useState('');
// A dependency state to cause re-computation of selectedExpenseMonthData after search algorithm mutates the scores of each expense in the array
   const [counter, setCounter] = useState(0); 
    const { query, clicked, setClicked } = useOutletContext();
    const {Filtered_Expenses, Filtered_Expenses_Total} = useFilteredExpenseData(expenseArr, selectedMonth, selectedCategory,
      counter, clicked, setClicked,queryResults, setQueryResults)
  const { Expense_Data } = useSelectedMonthExpenseData(expenseArr, selectedMonth, selectedCategory)

    useEffect(() => {
     if(query.length > 0 && clicked) {
      Search(query, setCounter, counter, setQueryResults, Expense_Data);
     }
    }, [query])

     return( 
        <div className="Whole-Parent">
          <div className="Select-Container-Section">
          <div className="Select-Container">
                    <label>Month:</label> 
        <select className="Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}
         value={selectedMonth}>
          {months.map(value => {
            return <option value={value} key={value}>{value}</option>
          })}
        </select>
                </div>

                <div className="Select-Container">
                    <label>Category:</label> 
       <select className="Input-Select" onChange={(e) => setSelectedCategory(e.target.value)}> 
        <option value={'All'}>All</option>
          {Expense_Categories.map(value => {
            return <option value={value} key={value}>{value}</option>
          })}
        </select>
                </div>
          </div>

                <div className="Selected-Month-Total-Amount-Container">
    <h2>Total of {selectedMonth}: <span className="Selected-Month-Total-Amount-Span">
    {currencySymbol}{Filtered_Expenses_Total}
    </span></h2>
                </div>
            <div className="Layout-flex-Container">
                <div className="Expense-Card-Container">
                 {!Filtered_Expenses||Filtered_Expenses.length === 0 ? <h1>No recorded Expense Data to show!</h1>
                 : Filtered_Expenses.map(value => {
                    return <Display_Filtered_Expenses Title={value.Expense_Title}
                   Amount={value.Expense_Amount} currencySymbol={currencySymbol}
                   Month={value.Month} day={value.day} Category={value.Expense_Category} 
                   selectedMonth={selectedMonth} key={value.id}/>
                 })}
                </div>
            </div>
        </div>

     );
}
