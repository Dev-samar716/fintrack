export default function useExpenseCategoriesFilter(thisMonthExpense) {
    const Housing_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Housing");
     const Education_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Education");
     const Food_Groceries = thisMonthExpense.filter(value => value.Expense_Category === "#Food & Groceries");
      const Transportation_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Transportation");
      const Other_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Other");
      const Personal_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Personal");

    return {Housing_Expenses, Education_Expenses, Food_Groceries, Transportation_Expenses, Other_Expenses,
        Personal_Expenses
    };
}