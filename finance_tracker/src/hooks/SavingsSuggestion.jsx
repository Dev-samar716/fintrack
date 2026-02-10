import {useMemo} from 'react'

function useSavingsSuggestion(ThisMonth_IncomeTotal, thisMonthExpensesTotal) {
   const net_balance = useMemo(() => {
    return ThisMonth_IncomeTotal - thisMonthExpensesTotal;
   })

   const Savings_Suggestion = useMemo(() => {
      if(net_balance <= 0) {
        return 0
      } else if(net_balance < ThisMonth_IncomeTotal * 0.05) {
        return net_balance * 0.1
      } else {
        return net_balance * 0.3
      }
   }, [net_balance, ThisMonth_IncomeTotal])
   return {net_balance, Savings_Suggestion};
}
export default useSavingsSuggestion;