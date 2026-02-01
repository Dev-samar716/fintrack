import {useEffect,useState } from 'react'
export default function useIncomeDateFilter(incomeArr) {
    const [thisMonthIncome, setThisMonthIncome] = useState(()=> {
            const saved = localStorage.getItem('Monthly_Income_Array');
            return saved ? JSON.parse(saved) : [''];
           }) 
           const [previousMonthIncome, setPreviousMonthIncome] = useState(()=> {
               const saved = localStorage.getItem('Previous_Month_Income_Array');
               return saved ? JSON.parse(saved) : [''];
              })
              // Save current month's income data to localStorage
                       useEffect(() => {
                        localStorage.setItem('Monthly_Income_Array', JSON.stringify(thisMonthIncome));
                   }, [thisMonthIncome]); 
                      // Save previous month's income data to localStorage 
                      useEffect(()=> {
                      localStorage.setItem('Previous_Month_Income_Array', JSON.stringify(previousMonthIncome));
                      }, [previousMonthIncome])

    let now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
   
   useEffect(()=> {
      let ThisMonthIncome = incomeArr.filter(value => {
     let IncomeMonth = new Date(value.createdAt).getMonth();  
     let IncomeYear = new Date(value.createdAt).getFullYear();
     return(
      currentMonth === IncomeMonth && currentYear === IncomeYear
     )
  }) 
  let PreviousMonthIncome = incomeArr.filter(value => {
     let IncomeMonth = new Date(value.createdAt).getMonth(); 
     let IncomeYear = new Date(value.createdAt).getFullYear();
     return(
      currentMonth - 1 === IncomeMonth && currentYear === IncomeYear
     )
  })
  let sorted = ThisMonthIncome.sort((a,b) => b.Income_Amount - a.Income_Amount);
  setThisMonthIncome(sorted);
  setPreviousMonthIncome(PreviousMonthIncome);
   }, [incomeArr])
   // Calculating the total Income of this Month
     let ThisMonth_IncomeTotal = thisMonthIncome.reduce((x,y)=> {
         return x + Number(y.Income_Amount);
     }, 0);
     // Calculating the total Income of previous month
    let previousMonth_IncomeTotal = previousMonthIncome.reduce((a,b)=> {
         return a + Number(b?.Income_Amount || 0);
    }, 0);
   return {thisMonthIncome, previousMonthIncome,ThisMonth_IncomeTotal, previousMonth_IncomeTotal};
}