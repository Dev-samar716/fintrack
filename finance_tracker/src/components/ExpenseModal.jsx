import { useEffect, useState } from "react"; 

function InputExpenseCategory_Modal({
  setExpenseCategory,
  Expense_Categories,
  options,
  setOptions,
   inputCategory,
   setInputCategory,
   setCurrentLevel
}) {
  return(
    <div className="Modal-Overlay">
        <div className="Modal-div">
             <h2>Enter expense category:</h2> 
             <div>
        <input placeholder="Enter tag of your activity" className="Input" 
        value={inputCategory} onChange={(e)=>setInputCategory(e.target.value)}/> 
        <button className="Enter-Category-btn" onClick={()=>{
           if(Expense_Categories.includes(inputCategory.toLowerCase())) {
             setExpenseCategory(inputCategory);
             setCurrentLevel('Amount');
           }
        }}>Enter</button> 
        </div>
        <button className="Option-btn" onClick={()=>setOptions(!options)}>See tag options<i className="fa-solid fa-arrow-down"></i></button>
           {options && <Options />}
        </div>
    </div>
    );
}

function InputExpenseAmount_Modal({setModalVisibility, setExpenseAmount, addExpenseInfo, expenseAmount}) {
      return(
    <div className="Modal-Overlay">
        <div className="Modal-div">
             <h2>Enter Expense Amount:</h2> 
             <div>
        <input placeholder="Enter Amount" className="Input" type="number" value={expenseAmount}
         onChange={(e)=> setExpenseAmount(e.target.value)}/> 
        <button className="Enter-Category-btn" onClick={()=> {
          if(expenseAmount != '') {
            addExpenseInfo();
          setModalVisibility(false);
          }
        }}>Enter</button> 
        </div>
        </div>
    </div>
    );
}


function Options() {
  return (
    <div>
      <ul className="Category-list-container">
        <li>#Housing</li>
        <li>#Transportation</li>
        <li>#Food & Groceries</li>
        <li>#Education</li>
        <li>#Personal</li>
        <li>#Other</li>
      </ul>
    </div>
  );
} 
1
export default function Expense_Modal({
  setExpenseCategory,
  Expense_Categories,
  expenseCategory,
  setModalVisibility,
  expenseAmount,
  setExpenseAmount,
  addExpenseInfo
}) {
  const[options, setOptions] = useState(false);
  const [inputCategory, setInputCategory] = useState(''); 
  const [currentLevel, setCurrentLevel] = useState('Category');

  useEffect(()=>{
      localStorage.setItem('Expense_Category', JSON.stringify(expenseCategory));
  },[expenseCategory])

  useEffect(()=>{
  console.log(currentLevel);
  },[currentLevel])
 
   return(   
    <div>
     {currentLevel === 'Category' && <InputExpenseCategory_Modal setExpenseCategory={setExpenseCategory} 
      Expense_Categories={Expense_Categories} options={options} setOptions={setOptions}
    inputCategory={inputCategory} setInputCategory={setInputCategory} setCurrentLevel={setCurrentLevel}/>}

     {currentLevel === 'Amount' && <InputExpenseAmount_Modal setModalVisibility={setModalVisibility}
      setExpenseAmount={setExpenseAmount} addExpenseInfo={addExpenseInfo} expenseAmount={expenseAmount}/>}
     </div>
   );
}