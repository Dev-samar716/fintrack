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
  userCurrency, ThisMonth_IncomeTotal,
  setPreviousMonthIncome
}) {
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
