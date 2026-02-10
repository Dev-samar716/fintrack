import { useMemo } from "react";
export default function useSelectedMonthExpenseData(expenseArr, selectedMonth, selectedCategory) {
    const Expense_Data = useMemo(() => {
             let data = expenseArr.filter(value => value.Month === selectedMonth); 
             if(selectedCategory !== 'All') {
           data = data.filter(value => 
               value.Expense_Category.toLowerCase() === selectedCategory.toLocaleLowerCase());
           } 
           return data;
        }, [expenseArr, selectedMonth, selectedCategory])
        
        return { Expense_Data };
}