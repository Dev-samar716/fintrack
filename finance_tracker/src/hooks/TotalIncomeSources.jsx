import {useMemo} from 'react';
export default function useTotal_IncomeSources(thisMonthIncome, previousMonthIncome) {
    //Responsible for returning total of each income source 
   function getIncomeSourceTotal(Income, source) {
    return Income 
     .filter(item =>item.Income_Source === source)
     .reduce((sum,item) => sum + Number(item.Income_Amount),  0)
   }  
  //Finding total of each Income source 
  let ThisMonth_IncomeSourcesTotal = useMemo(() => ({
      Job: getIncomeSourceTotal(thisMonthIncome, "Job"),
      Freelance: getIncomeSourceTotal(thisMonthIncome, "Freelance"),
      Business: getIncomeSourceTotal(thisMonthIncome, "Business"), 
      Investment: getIncomeSourceTotal(thisMonthIncome, "Investment"),
      Other: getIncomeSourceTotal(thisMonthIncome, "Other")
  }), [thisMonthIncome]) //Finding totals of each income source of this month
    

  //Finding total of each Income source 
  let previousMonth_IncomeSourcesTotal = { //Finding totals of each income source of previous month
      Job: getIncomeSourceTotal(previousMonthIncome, "Job"),
      Freelance: getIncomeSourceTotal(previousMonthIncome, "Freelance"),
      Business: getIncomeSourceTotal(previousMonthIncome, "Business"), 
      Investment: getIncomeSourceTotal(previousMonthIncome, "Investment"),
      Other: getIncomeSourceTotal(previousMonthIncome, "Other")
  }
  return {ThisMonth_IncomeSourcesTotal, previousMonth_IncomeSourcesTotal};
}