function Handle_Delete(id, setExpenseArr) { 
  setExpenseArr(prev => prev.filter(value => value.id != id));
}

function Display_All({Title, Amount, onDelete,Category,Month,day,currencySymbol}) {
    return(
      <div className="Expense-Card"> 
      <div className="Delete-Expense-Btn-Container">
        <button className={"Delete-Expense-Btn"} onClick={()=>onDelete()}>
          <i className="fas fa-trash-can"></i>
          </button>
      </div>
    <div className="card-title">
      <h2>{Title}</h2>
    </div>

    <div className="card-amount">
      <h2>{currencySymbol}{Amount}</h2>
    </div>
    <div className="card-category">
        <h2>Category: {Category}</h2>
    </div>

     <div>
      <h2>Date: {Month}, {day}</h2>
    </div>
  </div>

    )
}

export default function AllExpenses({thisMonthExpense, setExpenseArr,currencySymbol}) {
    return(
     <div className="Expense-Card-Container">
        {thisMonthExpense.map(value => (
             <Display_All Title={value.Expense_Title} Amount={value.Expense_Amount}
             onDelete={()=>Handle_Delete(value.id, setExpenseArr)} key={value.id} Category={value.Expense_Category}
             Month={value.Month} day={value.day} currencySymbol={currencySymbol}/>
        ))}
     </div>
    );
}