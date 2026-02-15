import { useState } from "react";
import Expense_Modal from "./ExpenseModal.jsx";
import {useOutletContext, Outlet} from 'react-router-dom';

import '../css/Expense.css';

export default function Expense({
  expense, 
  setExpense, 
  setExpenseCategory,
  Expense_Categories,
  expenseCategory,
  expenseAmount,
  setExpenseAmount,
  addExpenseInfo, 
  Vertical_Side_NavBar
}) { 
    const [modalVisibility, setModalVisibility] = useState(false);
    const NavLinks_Array = ["View All","Housing", "Transportation", "Food & Groceries", "Education",
        "Personal", "Other"
    ];
    const {editId, setEditId, edit, setEdit, expenseArr} = useOutletContext();
    return( 
      <div>
        <div className="Expense-Nav-Menu-Icon-Container">
        <i className="fas fa-bars" onClick={()=> setMenuClicked(!menuClicked)}></i>
        </div>
     <div className="Expense-Parent-Container"> 
          <Vertical_Side_NavBar NavLinks_Array={NavLinks_Array}/>
          <div className="Expense-top-headers"> 
            <div className="Expense-header-Container">
           <h1>Enter your Expense.</h1>
            </div>
            <div className="Expense-Input-Container">
         <input className="Expense-Input" placeholder="Enter your expense." 
         value={expense} onChange={(e)=>setExpense(e.target.value)}/>
            </div>
            <div className="Add-Expense-btn-Container">
                <button className="Add-Expense-btn" onClick={()=>{
                  if(expense != '') {
                    setModalVisibility(!modalVisibility);
                  }
                }}>Add+</button>
            </div>
            {modalVisibility && <Expense_Modal setExpenseCategory={setExpenseCategory}
             Expense_Categories={Expense_Categories} expenseCategory={expenseCategory}
             setModalVisibility={setModalVisibility} expenseAmount={expenseAmount} 
             setExpenseAmount={setExpenseAmount} addExpenseInfo={addExpenseInfo}/>}
        </div>
        </div>
         <div className="Expense-Cards-Container-Parent">
         <Outlet context={{editId, setEditId, edit, setEdit, expenseArr}}/>
        </div>  
      </div>
        
    )
}    