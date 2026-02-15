import EditExpense_Entries from "./EditExpenseEntries";
import Handle_Edit from "../functions/HandleEdit";
import { useOutletContext } from "react-router-dom";
function Handle_Delete(id, setExpenseArr) { 
  setExpenseArr(prev => prev.filter(value => value.id != id));
}

function Display_Other({Title, Amount,onDelete,Month,day,currencySymbol, id, setEditId, setEdit}) {
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

     <div>
      <h2>Date: {Month}, {day}</h2>
    </div>

    <div className="Edit-Container">
   <button className="EditBtn" onClick={()=> Handle_Edit(setEditId, setEdit, id)}>Edit</button>
        </div>

  </div>

    )
}

export default function OtherExpenses({Other_Expenses, setExpenseArr,currencySymbol}) {
  const {editId, setEditId, edit, setEdit, expenseArr} = useOutletContext();
    return(
     <div className="Expense-Card-Container">
      {edit && <EditExpense_Entries editId={editId} setEdit={setEdit} setExpenseArr={setExpenseArr}
                                          expenseArr={expenseArr}/>}
                                          
        {Other_Expenses.map(value => (
             <Display_Other Title={value.Expense_Title} Amount={value.Expense_Amount}
             onDelete={()=>Handle_Delete(value.id, setExpenseArr)} Month={value.Month} 
             day={value.day} currencySymbol={currencySymbol} 
             id={value.id} setEditId={setEditId} setEdit={setEdit} key={value.id} />
        ))}
     </div>
    );
}