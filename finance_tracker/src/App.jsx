import { useEffect, useState, useMemo } from 'react' 
import { createHashRouter, RouterProvider, Outlet} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './css/App.css';
import Welcome from './components/Welcome.jsx' 
import NavHeader from './components/WelcomePageNav.jsx' 
import './css/Welcome.css'; 
import Navigation_Bar from './components/NavBar.jsx'
import Expense from './components/Expense.jsx';
import Home from './components/Home.jsx';
import HousingExpenses from './components/Housing.jsx'
import AllExpenses from './components/allCategory.jsx'
import TransportationExpenses from './components/transportation.jsx'
import FoodGroceriesExpenses from './components/foodGroceries.jsx';
import PersonalExpenses from './components/personal.jsx'; 
import OtherExpenses from './components/other.jsx';
import EducationExpenses from './components/Education.jsx';
import Income from './components/income.jsx';
import Expense_History from './components/ExpenseHistory.jsx';
import Income_History from './components/IncomeHistory.jsx';
import useExpenseDataByPeriod from './hooks/ExpenseDataByPeriod.jsx';
import useIncomeDateFilter from './hooks/IncomeDateFilter.jsx';
import useChartOptions from './hooks/ChartOptions.jsx';
import useTotalExpenseCategories from './hooks/TotalExpensesCategories.jsx';
import useTotal_IncomeSources from './hooks/TotalIncomeSources.jsx';
import useExpenseCategoriesFilter from './hooks/ExpenseCategoriesFilter.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function HistoryLayout({Vertical_Side_NavBar}) {
   const NavLinks_Array = ["Expense-History", "Income-History", "Savings-History"];
   const [inputValue, setInputValue] = useState('');
   const [query, setQuery] = useState('');
   const [clicked, setClicked] = useState('');
  return( 
    <>
   <Navigation_Bar 
   value={inputValue}
   onChange={setInputValue}
   onSearch={() => setQuery(inputValue)}
   setClicked={setClicked}
   /> 
   <div className='NavBar-Outlet-Flex-Wrapper'> {/**Styling available in app.css */}
    <Vertical_Side_NavBar NavLinks_Array={NavLinks_Array}/>
    <div className='History-Outlet-Container'> {/**Styling for this available in app.css */}
     <Outlet context={{query, clicked, setClicked}}/>
    </div>
   </div>
   </>
  );
}

function AppLayout({expenseArr}) {
  const [editId, setEditId] = useState('');
   const [edit, setEdit] = useState(false);
   return( 
    <>
  <Navigation_Bar /> 
  <Outlet context={{editId, setEditId, edit, setEdit, expenseArr}}/> 
  </>
   );
}
function Nav_Header() {
  return(
    <> 
     <NavHeader /> 
     <Outlet />
    </>
  )
}

function App() {  
   const MONTH_MAP = useMemo(() => ({
    //This is for mapping timestamp Month correctly in human friendly format.
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
   }), []);

    const [expense, setExpense] = useState(()=> { 
         const saved = localStorage.getItem('Expense');
         return saved ? JSON.parse(saved) : ('');
    });
    //This is for storing the Amount of Expense
    const [expenseAmount, setExpenseAmount] = useState(()=> { 
      const saved = localStorage.getItem('Expense_Amount');
      return saved ? JSON.parse(saved) : ('');
    }) 
    // This state is responsible for storing expenses data of the whole year
    const [expenseArr, setExpenseArr] = useState(()=>{ 
        const saved = localStorage.getItem('Expense_Data');
        return saved ? JSON.parse(saved) : [];
    })
    //This is for storing the category of User Expense
    const[expenseCategory, setExpenseCategory] = useState(()=>{ 
        const saved = localStorage.getItem('Expense_Category'); 
        return saved ? JSON.parse(saved) : ('');
    });

   const [incomeSources, setIncomeSources] = useState('');
   const [incomeAmount, setIncomeAmount] = useState('');

   const [incomeArr, setIncomeArr] = useState(()=> {
    const saved = localStorage.getItem('Income_Data');
    return saved ? JSON.parse(saved) : [];
   })      

  const [currency, setCurrency] = useState(()=> {
     const saved = localStorage.getItem("Selected_Currency");
     return saved ? JSON.parse(saved) : ("₹");
   })

  // Responsible for tracking the desired Month's expense or income data selected by the user
  const [selectedMonth, setSelectedMonth] = useState(MONTH_MAP[new Date().getMonth()])

   const {thisMonthExpense, previousMonthExpenses} = useExpenseDataByPeriod(expenseArr);

   const {thisMonthIncome, previousMonthIncome} = useIncomeDateFilter(incomeArr);

   const chartOptions = useChartOptions();

   const {Category_Expenses, PreviousMonth_CategoryExpenses} = useTotalExpenseCategories(
    thisMonthExpense, previousMonthExpenses
   );
   const {ThisMonth_IncomeSourcesTotal, previousMonth_IncomeSourcesTotal} = useTotal_IncomeSources(
    thisMonthIncome, previousMonthIncome
   )

   const {Housing_Expenses, Education_Expenses, Food_Groceries, Transportation_Expenses, Other_Expenses,
        Personal_Expenses} = useExpenseCategoriesFilter(thisMonthExpense);

   // Responsible for returning an adaptable vertical nav-bar, reusable across various components.
 function Vertical_Side_NavBar({NavLinks_Array = [] }) {
  return(
   <div className="Expense-Categories-NavBar">
               <ul className="Category-Routes-lists">
                       {NavLinks_Array.map(value => {
     return <li key={value}><Link to={value.toLowerCase().replace(/\s+/g, "")} className='Link'>{value}</Link></li>
                       })}
                    </ul>  
              </div>
  )
}
      
        // Save current month's expenses data to localStorage
        useEffect(() => {
             localStorage.setItem('Monthly_Expense_Array', JSON.stringify(thisMonthExpense));
        }, [thisMonthExpense]); 
        //Save previous month's expense data to localStorage 
        useEffect(()=> {
            localStorage.setItem('PreviousMonth_Expense_Array', JSON.stringify(previousMonthExpenses));
        }, [previousMonthExpenses])

        useEffect(()=> {
          localStorage.setItem('Selected_Currency', JSON.stringify(currency));
          },[currency])
      
    
    const Expense_Categories = ["#housing", "#transportation", "#food & groceries", "#education",
        "#personal", "#other"
    ];

  
   const supportedCurrencies = useMemo(() => {
     let data = [
  { code: "NPR", symbol: "₹", id: 1 },
  { code: "INR", symbol: "₹", id: 2 },
  { code: "USD", symbol: "$", id: 3 },
  { code: "EUR", symbol: "€", id: 4 },
  { code: "GBP", symbol: "£", id: 5 },
  { code: "JPY", symbol: "¥", id: 6 }
     ]
     return data;
   }, [])

    //currencySymbol variable is derived from an existing state to store the symbol of given currency
  const currencySymbol = supportedCurrencies.find(c => c.code === currency)?.symbol || "";
   
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
  
  
    useEffect(()=>{
       localStorage.setItem('Expense', JSON.stringify(expense))
    },[expense])

    useEffect(()=>{
       localStorage.setItem('Expense_Amount', JSON.stringify(expenseAmount))
    }, [expenseAmount])

    useEffect(()=> {
        localStorage.setItem('Expense_Category', JSON.stringify(expenseCategory))
    },[expenseCategory])

    useEffect(()=> { // Responsible for adding Expense data in the local Storage
      localStorage.setItem('Expense_Data', JSON.stringify(expenseArr))
    },[expenseArr])

    useEffect(()=> { // Responsible for adding Income data in the local Storage
      localStorage.setItem('Income_Data', JSON.stringify(incomeArr))
    },[incomeArr])

  const addExpenseInfo = () => { // Responsible for adding Expense info 
    const createdAt = Date.now()
     let Expense_Date = new Date(createdAt).getMonth();
    let Mapped_ExpenseMonth = MONTH_MAP[Expense_Date];
    let day = new Date(createdAt).getDate();

    let Expense_Info = {
      Expense_Title : expense, 
      Expense_Category: expenseCategory, 
      Expense_Amount: expenseAmount,
      createdAt,
      Month: Mapped_ExpenseMonth,
      day: day,
      id: Date.now(), //Used the current time coordinates as an id to make it unique
    }; 
    setExpenseArr(prev => [...prev, Expense_Info]);

  }
  const addIncomeInfo = () => { // Responsible for adding Income info 
      const createdAt = Date.now();
      let IncomeDate = new Date(createdAt).getMonth();
      let Mapped_IncomeMonth = MONTH_MAP[IncomeDate];

      let Income_Info = {
         Income_Source: incomeSources, 
         Income_Amount: incomeAmount, 
         createdAt,
         Month: Mapped_IncomeMonth,
         day:  new Date(createdAt).getDate(),
         id: Date.now()
      } 
      setIncomeArr(prev => [...prev, Income_Info]);
      console.log(thisMonthIncome);
  }

  const router = createHashRouter([
  {
    element: <Nav_Header />,
    children: [
      { index: "/", element: <Welcome /> }, 
    ]
  },
  {
    element: <AppLayout expenseArr={expenseArr}/>,
    children: [
      {path: "home", element: <Home Category_Expenses={Category_Expenses} expenseArr={expenseArr}
      PreviousMonth_CategoryExpenses={PreviousMonth_CategoryExpenses} supportedCurrencies={supportedCurrencies}
     currency={currency} setCurrency={setCurrency} chartOptions={chartOptions} 
      ThisMonth_IncomeSourcesTotal={ThisMonth_IncomeSourcesTotal} 
      previousMonth_IncomeSourcesTotal={previousMonth_IncomeSourcesTotal} 
      currencySymbol={currencySymbol} incomeArr={incomeArr} MONTH_MAP={MONTH_MAP}/>},

      {path: "expenses", element: <Expense expense={expense} setExpense={setExpense} setExpenseCategory={setExpenseCategory}
       Expense_Categories={Expense_Categories} expenseCategory={expenseCategory} expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount}
       addExpenseInfo={addExpenseInfo} Vertical_Side_NavBar={Vertical_Side_NavBar}/>, 
       children: [
      { path: "viewall", element: <AllExpenses thisMonthExpense={thisMonthExpense} setExpenseArr={setExpenseArr}
       currencySymbol={currencySymbol}/>},
      { path: "housing", element: <HousingExpenses Housing_Expenses={Housing_Expenses} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/> },
      { path: "transportation", element: <TransportationExpenses Transportation_Expenses={Transportation_Expenses} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/>},
      { path: "food&groceries", element: <FoodGroceriesExpenses Food_Groceries={Food_Groceries} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/>},
      { path: "education", element: <EducationExpenses Education_Expenses={Education_Expenses} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/>},
      { path: "personal", element: <PersonalExpenses Personal_Expenses={Personal_Expenses} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/>},
      { path: "other", element: <OtherExpenses Other_Expenses={Other_Expenses} setExpenseArr={setExpenseArr}
      currencySymbol={currencySymbol}/>}
       ]
      },
      {path: "income", element: <Income setIncomeSources={setIncomeSources} setIncomeAmount={setIncomeAmount}
      addIncomeInfo={addIncomeInfo} incomeArr={incomeArr} ThisMonth_IncomeSourcesTotal={ThisMonth_IncomeSourcesTotal}
      currencySymbol={currencySymbol} 
      />},
    ]
  },
  {
    element: <HistoryLayout Vertical_Side_NavBar={Vertical_Side_NavBar} />,
    children: [
      {path: "expense-history", element: <Expense_History selectedMonth={selectedMonth} 
      setSelectedMonth={setSelectedMonth} expenseArr={expenseArr} currencySymbol={currencySymbol} 
      months={months} Expense_Categories={Expense_Categories}/>},

      {path: "income-history", element: <Income_History selectedMonth={selectedMonth} 
      setSelectedMonth={setSelectedMonth} incomeArr={incomeArr} currencySymbol={currencySymbol} 
      months={months}/>}
    ]
  }
])
 
   return(
   <> 
   <RouterProvider router={router}/>
   </>
   );
}

export default App
