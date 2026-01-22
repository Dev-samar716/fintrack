import { useEffect } from 'react';
import '../css/Income.css';

export default function Income({
  setIncomeSources,
  setIncomeAmount,
  addIncomeInfo,
  incomeArr,
  setThisMonthIncome,
  thisMonthIncome,
  ThisMonth_IncomeSourcesTotal,
  userCurrency
}) {
     const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
   
   useEffect(()=> {
      const ThisMonthIncome = incomeArr.filter(value => {
     const IncomeMonth = new Date(value.createdAt).getMonth();  
     const IncomeYear = new Date(value.createdAt).getFullYear();
     return(
      currentMonth === IncomeMonth && currentYear === IncomeYear
     )
  }) 
  const sorted = ThisMonthIncome.sort((a,b) => b.Income_Amount - a.Income_Amount);
  setThisMonthIncome(sorted);
   }, [incomeArr])

   useEffect(() => {
          localStorage.setItem('Monthly_Income_Array', JSON.stringify(thisMonthIncome));
     }, [thisMonthIncome]); 

     // Calculating the total Income of this Month
     const ThisMonth_IncomeTotal = thisMonthIncome.reduce((x,y)=> {
         return x + Number(y.Income_Amount);
     }, 0)
  return (
    <div className="Income-Page-Container">
      
      {/* ===== Header / Summary Section ===== */}
      <div className="Income-header-Container">
        <div className="Income-header-content">
          <h1 className="Income-title">Income</h1>
        </div>
      </div>

      {/*Add Income Section*/}
      <div className="Income-Input-Section-Container">
        <h2 className="Income-input-title">Add Income</h2>

        <form className="Income-input-form">
          
          {/* Income Source */}
          <div className="Income-input-group">
            <label className="Income-input-label" htmlFor="income-source">
              Source:
            </label>
            <select
              id="income-source"
              className="Income-input-select"
              onChange={(e)=> setIncomeSources(e.target.value)}
            >
              <option value="">Select source</option>
              <option value="job">Job</option>
              <option value="freelance">Freelance</option>
              <option value="scholarship">Business</option>
              <option value="investment">Investment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Income Amount */}
          <div className="Income-input-group">
            <label className="Income-input-label" htmlFor="income-amount">
              Amount:
            </label>
            <input
              type="number"
              id="income-amount"
              className="Income-input-field"
              placeholder="Enter amount"
              onChange={(e)=>setIncomeAmount(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="Income-input-action">
            <button className="Income-submit-button" onClick={()=> {
              addIncomeInfo();
            }}>
              Add Income
            </button>
          </div>

        </form>
      </div>

      {/* Income Breakdown Section */}
      <div className="Income-Breakdown-Section-Container">
        <h2>📊Income Breakdown ({thisMonthIncome != '' && thisMonthIncome[0].Month})</h2>
        <p>Total : {userCurrency}{ThisMonth_IncomeTotal}</p>
        {Object.entries(ThisMonth_IncomeSourcesTotal).map(([key, value]) => ( 
          // Rendering Object in list of key-value pairs and calculating percentage of value
          <li key={key}  className='Sources-total-Expense'>
           {key} :  {userCurrency}{value} ({ThisMonth_IncomeTotal ? ((value / ThisMonth_IncomeTotal) * 100).toFixed(2) : 0}%)
          </li>
        ))}
      </div>
    </div>
  );
}
