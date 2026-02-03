import "../css/IncomeHistory.css";
import { useMemo, useState } from 'react'
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
  const [selectedSource, setSelectedSource] = useState('All')
  const selected_IncomeMonthData = useMemo(() => {
    if(selectedSource === 'All') {
      return incomeArr.filter(value => value.Month === selectedMonth);
    } else {
      return incomeArr.filter(value => value.Month === selectedMonth
                            && value.Income_Source.toLowerCase() === selectedSource.toLowerCase()
      );
    }
  }, [incomeArr, selectedSource, selectedMonth]);

       const selectedMonthTotal = useMemo(() => {
        return selected_IncomeMonthData.reduce((x,y)=> {
      return x + Number(y.Income_Amount);
     },0)
     }, [selected_IncomeMonthData])

     const Income_Sources = useMemo(() => {
        return [
            'Job',
            'Freelance',
            'Business',
            'Investment',
            'Other'
        ];
     });
     return(
        <div className="Whole-Parent">
          <div className="Select-Container-Section">
         <div className= "Select-Container">
                    <label>Month:</label> 
        <select className="Month-Input-Select"
         onChange={(e)=>setSelectedMonth(e.target.value)}
         value={selectedMonth}>
          {months.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>

                  <div className="Select-Container">
                    <label>Source:</label> 
       <select className="Input-Select" onChange={(e) => setSelectedSource(e.target.value)}> 
        <option value={'All'}>All</option>
          {Income_Sources.map(value => {
            return <option value={value}>{value}</option>
          })}
        </select>
                </div>
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