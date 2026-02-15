import { useEffect, useState } from "react";
import '../css/Expense.css';

function UpdateExpenseInfo(editId, setExpenseArr,  editedExpenseTitle, editedExpenseAmount, setCurrentLevel,
    expenseArr
) {
      setExpenseArr(prev => prev.map(value => value.id === editId ? {...value, Expense_Title: editedExpenseTitle, Expense_Amount: editedExpenseAmount}
        : value));
        setCurrentLevel('Title');
        console.log(expenseArr);
        console.log(editedExpenseTitle);
      }

function EditExpenseAmount({
    editedExpenseAmount, 
    setEditedExpenseAmount,
     setEdit,
    setCurrentLevel, 
    setExpenseArr,
    editedExpenseTitle,
    expenseArr,
    editId
}) {

      return(
    <div className="Modal-Overlay">
        <div className="Modal-div">
             <h2>Enter Amount:</h2> 
             <div>
        <input placeholder="Enter Amount" className="Input" type="number" value={editedExpenseAmount}
         onChange={(e)=> setEditedExpenseAmount(e.target.value)}/> 
        <button className="Enter-Category-btn" onClick={()=> {
          if(editedExpenseAmount != '') {
            setEdit(false);
             UpdateExpenseInfo(editId, setExpenseArr,  editedExpenseTitle, editedExpenseAmount, setCurrentLevel,
            expenseArr
        );
          }
        }}>Confirm</button> 
        </div>
        </div>
    </div>
    );
}


function EditExpenseTitle({
    editedExpenseTitle,
    setEditedExpenseTitle,
    setCurrentLevel,
}) {
    
    return(
        <div className="Modal-Overlay">
        <div className="Modal-div">
             <h2>Enter new title:</h2> 
             <div>
        <input placeholder="Enter Title" className="Input" type="text" value={editedExpenseTitle}
         onChange={(e)=> setEditedExpenseTitle(e.target.value)}/> 
        <button className="Enter-Category-btn" onClick={() => {
            if(editedExpenseTitle.length > 0) setCurrentLevel('Amount');
        }}>Enter</button> 
        </div>
        </div>
    </div>
    )
}

export default function EditExpense_Entries({editId, setEdit,setExpenseArr, expenseArr}) {
    const [editedExpenseTitle, setEditedExpenseTitle] = useState(''); 
    const [editedExpenseAmount, setEditedExpenseAmount] = useState('');
    const [currentLevel, setCurrentLevel] = useState('Title');

    return( 
        <div>
     {currentLevel === 'Title' && <EditExpenseTitle editedExpenseTitle={editedExpenseTitle} setEditedExpenseTitle={setEditedExpenseTitle}
     setCurrentLevel={setCurrentLevel}/>}

     {currentLevel === 'Amount' && <EditExpenseAmount editedExpenseAmount={editedExpenseAmount} 
     setEditedExpenseAmount={setEditedExpenseAmount} setEdit={setEdit} setCurrentLevel={setCurrentLevel}
      setExpenseArr={setExpenseArr} editedExpenseTitle={editedExpenseTitle} expenseArr={expenseArr}
      editId={editId}/>}
        </div>
    )
}