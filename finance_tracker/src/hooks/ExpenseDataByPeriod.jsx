import {useState, useEffect, useMemo} from 'react';
export default function useExpenseDataByPeriod(expenseArr) {
         const [thisMonthExpense, setThisMonthExpense] = useState(() => {
            const saved = localStorage.getItem('Monthly_Expense_Array');
            return saved ? JSON.parse(saved) : [];
          }); 
           const [previousMonthExpenses, setPreviousMonthExpenses] = useState(()=> {
              const saved = localStorage.getItem('PreviousMonth_Expense_Array');
              return saved ? JSON.parse(saved) : [];
           })

       // Filter and sort this month's and previous month's expenses whenever expenseArr changes
    useEffect(() => {
     const now = new Date();
     const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
             
     const thisMonth_ExpenseData= expenseArr.filter(item => {
     const expenseDate = new Date(item.createdAt);
    return (
          expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
         );
     });
           const PreviousMonth_ExpenseData = expenseArr.filter(item => {
                     const expenseDate = new Date(item.createdAt);
                     return(
                expenseDate.getMonth() === currentMonth - 1 && expenseDate.getFullYear() === currentYear
                  )
                  })
     let thisMonthExpense_sorted = thisMonth_ExpenseData.sort((a,b)=>b.Expense_Amount-a.Expense_Amount);
                                               
             
     const previousMonthExpenses_sorted = PreviousMonth_ExpenseData.sort((a,b)=>b.Expense_Amount-a.Expense_Amount);
             
                 setThisMonthExpense(thisMonthExpense_sorted);
                 setPreviousMonthExpenses(previousMonthExpenses_sorted);

               }, [expenseArr]);

              const PreviousMonthExpensesTotal = useMemo(() => previousMonthExpenses.reduce((x,y)=> {
               return x + Number(y.Expense_Amount);
            }, 0), [previousMonthExpenses])
     
            const thisMonthExpensesTotal = useMemo(() =>  thisMonthExpense.reduce((a,b)=> {
           return a + Number(b.Expense_Amount);
           }, 0), [thisMonthExpense])
        return {thisMonthExpense, previousMonthExpenses, PreviousMonthExpensesTotal, thisMonthExpensesTotal};
}