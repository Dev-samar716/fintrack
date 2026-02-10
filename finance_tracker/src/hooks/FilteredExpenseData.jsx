import { useMemo, useEffect } from "react";
export default function useFilteredExpenseData(
    expenseArr,
    selectedMonth,
    selectedCategory,
    counter,
    clicked,
    setClicked,
    queryResults,
    setQueryResults
) {
    let Filtered_Expenses = useMemo(() => {
        let data = expenseArr.filter(value => value.Month === selectedMonth);
        if(clicked) {
            let result = queryResults.sort((a,b) => b.Score - a.Score);
            return result;
        } 
        else {
        if(selectedCategory !== 'All') {
       data = data.filter(value => value.Month === selectedMonth && 
           value.Expense_Category.toLowerCase() === selectedCategory.toLocaleLowerCase());
       } 
        return data;
        }
      
     }, [expenseArr, selectedMonth, selectedCategory, counter, queryResults]) 

     const Filtered_Expenses_Total = useMemo(() => {
           return Filtered_Expenses.reduce((x,y)=> {
           return x + Number(y.Expense_Amount);
     },0)
         }, [Filtered_Expenses])

         useEffect(() => {
               setClicked(false);
         }, [Filtered_Expenses]);

     return {Filtered_Expenses, Filtered_Expenses_Total}
}