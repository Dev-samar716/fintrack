import "../css/IncomeHistory.css";
function Display_SelectedMonthIncomeData({Source,Amount,currencySymbol, Month, day}) {
    return(
      <div className="Income-Card"> 
    <div className="card-title">
      <h2>{Source}</h2>
    </div>

    <div className="card-amount">
      <h2>{currencySymbol}{Amount}</h2>
    </div>

    <div>
      <h2>Date: {Month}, {day}</h2>
    </div>
    
  </div>

    )
}

export default function Income_History({
    selectedMonth, 
    setSelectedMonth,
    incomeArr,
    currencySymbol,
    months
}) {
const selected_IncomeMonthData = incomeArr.filter(value => value.Month === selectedMonth);
const selectedMonthTotal = selected_IncomeMonthData.reduce((x,y)=> {
      return x + Number(y.Income_Amount);
},0)
     return(
        <div className="Whole-Parent">
            <div className="Month-Select-Container">
                    <label>Month:</label> 
        <select className="Month-Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}>
          {months.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>

                <div className="Selected-Month-Total-Amount-Container">
    <h2>Total of {selectedMonth}: <span className="Selected-Month-Total-Amount-Span">
    {currencySymbol}{selectedMonthTotal}
    </span></h2>
                </div>
            <div className="Layout-flex-Container">
                <div className="Income-Card-Container">
                 {!selected_IncomeMonthData||selected_IncomeMonthData.length === 0 ? <h1>No recorded Income Data to show!</h1>
                 :selected_IncomeMonthData.map(value => {
                    return <Display_SelectedMonthIncomeData Source={value.Income_Source}
                   Amount={value.Income_Amount} currencySymbol={currencySymbol}
                   Month={value.Month} day={value.day} key={value.id}/>
                 })}
                </div>
            </div>
        </div>
     );
}