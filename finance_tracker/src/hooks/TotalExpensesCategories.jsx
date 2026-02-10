import {useMemo} from 'react';
export default function useTotalExpenseCategories(thisMonthExpense, previousMonthExpenses) {
    // Responsible for returning the total expense rate of each category
  function getCategoryTotal(expenses, category) {
  return expenses
    .filter(item => item.Expense_Category === category)
    .reduce((sum, item) => sum + Number(item.Expense_Amount), 0);
} 
    // Finding total category expensess 

   let Category_Expenses = useMemo(() => ({
     // Finding totals of each category expenses of the current month
     Housing : getCategoryTotal(thisMonthExpense, "#Housing"),
     Transportation: getCategoryTotal(thisMonthExpense, "#Transportation"),
     Education: getCategoryTotal(thisMonthExpense, "#Education"), 
     Personal: getCategoryTotal(thisMonthExpense, "#Personal"),
     FoodsGroceries: getCategoryTotal(thisMonthExpense, "#Foods & Groceries"),
      Other: getCategoryTotal(thisMonthExpense, "#Other")
   }), [thisMonthExpense])

  let PreviousMonth_CategoryExpenses = { //Finding totals of each category expenses of the previous month
     Housing : getCategoryTotal(previousMonthExpenses, "#Housing"),
     Transportation: getCategoryTotal(previousMonthExpenses, "#Transportation"),
     Education : getCategoryTotal(previousMonthExpenses, "#Education"), 
     Personal: getCategoryTotal(previousMonthExpenses, "#Personal"),
     FoodsGroceries: getCategoryTotal(previousMonthExpenses, "#Foods & Groceries"),
     Other: getCategoryTotal(previousMonthExpenses, "#Other")
  }

  return {Category_Expenses, PreviousMonth_CategoryExpenses}
}