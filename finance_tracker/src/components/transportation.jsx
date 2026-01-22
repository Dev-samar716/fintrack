function Handle_Delete(id, setExpenseArr) { 
  setExpenseArr(prev => prev.filter(value => value.id != id));
}

function Display_Transportation({Title, Amount,onDelete,Month,day,userCurrency}) {
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
      <h2>{userCurrency}{Amount}</h2>
    </div>

     <div>
      <h2>Date: {Month}, {day}</h2>
    </div>
  </div>

    )
}

export default function TransportationExpenses({Transportation_Expenses, setExpenseArr,userCurrency}) {

    return(
     <div className="Expense-Card-Container">
        {Transportation_Expenses.map(value => (
             <Display_Transportation Title={value.Expense_Title} Amount={value.Expense_Amount}
             onDelete={()=>Handle_Delete(value.id, setExpenseArr)} Month={value.Month} 
             day={value.day} userCurrency={userCurrency} key={value.id} />
        ))}
     </div>
    );
}