import { useEffect } from 'react';
import '../css/Income.css';
import useIncomeDateFilter  from '../hooks/IncomeDateFilter';

export default function Income({
  setIncomeSources,
  setIncomeAmount,
  addIncomeInfo,
  incomeArr,
  ThisMonth_IncomeSourcesTotal,
  currencySymbol
}) {
   const {thisMonthIncome,ThisMonth_IncomeTotal} = useIncomeDateFilter(incomeArr);
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
              <option value="Job">Job</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
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
        <p>Total : {currencySymbol}{ThisMonth_IncomeTotal}</p>
        {Object.entries(ThisMonth_IncomeSourcesTotal).map(([key, value]) => ( 
          // Rendering Object in list of key-value pairs and calculating percentage of value
          <li key={key}  className='Sources-total-Expense'>
           {key} :  {currencySymbol}{value} ({ThisMonth_IncomeTotal ? ((value / ThisMonth_IncomeTotal) * 100).toFixed(2) : 0}%)
          </li>
        ))}
      </div>
    </div>
  );
}
