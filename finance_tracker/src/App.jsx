import { useEffect, useState } from 'react' 
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './css/App.css';
import Welcome from './components/Welcome.jsx' 
import NavHeader from './components/WelcomePageNav.jsx' 
import './css/Welcome.css'; 
import Navigation_Bar from './components/NavBar.jsx'
import Expense from './components/Expense.jsx'
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
  return( 
    <>
   <Navigation_Bar /> 
   <div className='NavBar-Outlet-Flex-Wrapper'> {/**Styling available in app.css */}
    <Vertical_Side_NavBar NavLinks_Array={NavLinks_Array}/>
    <div className='History-Outlet-Container'> {/**Styling for this available in app.css */}
     <Outlet />
    </div>
   </div>
   </>
  );
}

function AppLayout() {
   return( 
    <>
  <Navigation_Bar /> 
  <Outlet /> 
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
   const MONTH_MAP = { //This is for mapping timestamp Month correctly in human friendly format.
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
}; 

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
    //This is for storing the Current Months Expenses which are relevant for rendering and calculating
    const [thisMonthExpense, setThisMonthExpense] = useState(() => {
    const saved = localStorage.getItem('Monthly_Expense_Array');
    return saved ? JSON.parse(saved) : [];
  }); 
   const [previousMonthExpenses, setPreviousMonthExpenses] = useState(()=> {
      const saved = localStorage.getItem('PreviousMonth_Expense_Array');
      return saved ? JSON.parse(saved) : [];
   })
   const [incomeSources, setIncomeSources] = useState('');
   const [incomeAmount, setIncomeAmount] = useState('');

   const [incomeArr, setIncomeArr] = useState(()=> {
    const saved = localStorage.getItem('Income_Data');
    return saved ? JSON.parse(saved) : [];
   }) 

   const [thisMonthIncome, setThisMonthIncome] = useState(()=> {
    const saved = localStorage.getItem('Monthly_Income_Array');
    return saved ? JSON.parse(saved) : [''];
   })

   const [previousMonthIncome, setPreviousMonthIncome] = useState(()=> {
    const saved = localStorage.getItem('Previous_Month_Income_Array');
    return saved ? JSON.parse(saved) : [''];
   })

  const [currency, setCurrency] = useState(()=> {
     const saved = localStorage.getItem("Selected_Currency");
     return saved ? JSON.parse(saved) : ("");
   })
  // Responsible for tracking the desired Month's expense or income data selected by the user
  const [selectedMonth, setSelectedMonth] = useState(MONTH_MAP[new Date().getMonth()])

  // Responsible for returning the total expense rate of each category
  function getCategoryTotal(expenses, category) {
  return expenses
    .filter(item => item.Expense_Category === category)
    .reduce((sum, item) => sum + Number(item.Expense_Amount), 0);
} 
//Responsible for returning total of each income source 
   function getIncomeSourceTotal(Income, source) {
    return Income 
     .filter(item =>item.Income_Source === source)
     .reduce((sum,item) => sum + Number(item.Income_Amount),  0)
   }
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
// Calculating the total Income of this Month
     let ThisMonth_IncomeTotal = thisMonthIncome.reduce((x,y)=> {
         return x + Number(y.Income_Amount);
     }, 0);
     // Calculating the total Income of previous month
    let previousMonth_IncomeTotal = previousMonthIncome.reduce((a,b)=> {
         return a + Number(b?.Income_Amount || 0);
    }, 0);
     const Housing_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Housing");
     const Education_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Education");
     const Food_Groceries = thisMonthExpense.filter(value => value.Expense_Category === "#Food & Groceries");
      const Transportation_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Transportation");
      const Other_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Other");
      const Personal_Expenses = thisMonthExpense.filter(value => value.Expense_Category === "#Personal")

      // Filter and sort this month's and previous month's expenses whenever expenseArr changes
        useEffect(() => {
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();
      
          const thisMonth_ExpenseData= expenseArr.filter(item => {
            const expenseDate = new Date(item.createdAt);
            return (
              expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
            );
          });
           const PreviousMonth_ExpenseData = expenseArr.filter(item => {
              const expenseDate = new Date(item.createdAt);
              return(
              expenseDate.getMonth() === currentMonth - 1 && expenseDate.getFullYear() === currentYear
           )
           })
          let thisMonthExpense_sorted = thisMonth_ExpenseData.sort((a,b)=>b.Expense_Amount-a.Expense_Amount);
                                        
      
          const previousMonthExpenses_sorted = PreviousMonth_ExpenseData.sort((a,b)=>b.Expense_Amount-a.Expense_Amount);
      
          setThisMonthExpense(thisMonthExpense_sorted);
          setPreviousMonthExpenses(previousMonthExpenses_sorted);
        }, [expenseArr]);
      
        // Save current month's expenses data to localStorage
        useEffect(() => {
             localStorage.setItem('Monthly_Expense_Array', JSON.stringify(thisMonthExpense));
        }, [thisMonthExpense]); 
        //Save previous month's expense data to localStorage 
        useEffect(()=> {
            localStorage.setItem('PreviousMonth_Expense_Array', JSON.stringify(previousMonthExpenses));
        }, [previousMonthExpenses])
        // Save current month's income data to localStorage
         useEffect(() => {
          localStorage.setItem('Monthly_Income_Array', JSON.stringify(thisMonthIncome));
     }, [thisMonthIncome]); 
        // Save previous month's income data to localStorage 
        useEffect(()=> {
        localStorage.setItem('Previous_Month_Income_Array', JSON.stringify(previousMonthIncome));
        }, [previousMonthIncome])

        useEffect(()=> {
          localStorage.setItem('Selected_Currency', JSON.stringify(currency));
          },[currency])
      
    
    const Expense_Categories = ["#housing", "#transportation", "#food & groceries", "#education",
        "#personal", "#other"
    ];

  
   const supportedCurrencies = [
  { code: "NPR", symbol: "₹" },
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" }
   ]
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
/**Below object is AI-generated code to optimize the chart for mobile, as chart.jsx layout is very non-responsive 
for smaller screens, and challenging to optimize perfectly for mobile screens.**/
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // 🚨 THIS FIXES MOBILE
  indexAxis: "x", // FORCE vertical bars
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "white" },
    },
    y: {
      ticks: { color: "white" },
    },
  },
};

   // Finding total category expensess
  let Category_Expenses = { // Finding totals of each category expenses of the current month
     Housing : getCategoryTotal(thisMonthExpense, "#Housing"),
     Transportation: getCategoryTotal(thisMonthExpense, "#Transportation"),
     Education: getCategoryTotal(thisMonthExpense, "#Education"), 
     Personal: getCategoryTotal(thisMonthExpense, "#Personal"),
     FoodsGroceries: getCategoryTotal(thisMonthExpense, "#Foods & Groceries"),
      Other: getCategoryTotal(thisMonthExpense, "#Other")
  }
  let PreviousMonth_CategoryExpenses = { //Finding totals of each category expenses of the previous month
     Housing : getCategoryTotal(previousMonthExpenses, "#Housing"),
     Transportation: getCategoryTotal(previousMonthExpenses, "#Transportation"),
     Education : getCategoryTotal(previousMonthExpenses, "#Education"), 
     Personal: getCategoryTotal(previousMonthExpenses, "#Personal"),
     FoodsGroceries: getCategoryTotal(previousMonthExpenses, "#Foods & Groceries"),
     Other: getCategoryTotal(previousMonthExpenses, "#Other")
  }
      
  //Finding total of each Income source 
  let ThisMonth_IncomeSourcesTotal = { //Finding totals of each income source of this month
      Job: getIncomeSourceTotal(thisMonthIncome, "job"),
      Freelance: getIncomeSourceTotal(thisMonthIncome, "freelance"),
      Business: getIncomeSourceTotal(thisMonthIncome, "business"), 
      Investment: getIncomeSourceTotal(thisMonthIncome, "investment"),
      Other: getIncomeSourceTotal(thisMonthIncome, "other")
  }

  //Finding total of each Income source 
  let previousMonth_IncomeSourcesTotal = { //Finding totals of each income source of previous month
      Job: getIncomeSourceTotal(previousMonthIncome, "job"),
      Freelance: getIncomeSourceTotal(previousMonthIncome, "freelance"),
      Business: getIncomeSourceTotal(previousMonthIncome, "business"), 
      Investment: getIncomeSourceTotal(previousMonthIncome, "investment"),
      Other: getIncomeSourceTotal(previousMonthIncome, "other")
  }
  //Below is the chart data for ranking of income sources of current month based on their total 
  let Income_Sources_Ranking_ChartData = {
    labels: ["Job", "Freelance", "Business", "Investment", "Other"], 
    datasets: [
      {
        label: ["Income Source Ranking"],
        data: [ThisMonth_IncomeSourcesTotal.Job, ThisMonth_IncomeSourcesTotal.Freelance,
        ThisMonth_IncomeSourcesTotal.Business, ThisMonth_IncomeSourcesTotal.Investment, 
        ThisMonth_IncomeSourcesTotal.Other
        ],
        backgroundColor: [
              "yellow", 
              "blue",
              "lime",
              "red",
              "pink",
              "purple",
              "white"
            ]
      }
    ]
  }
  // Below is the chart data for ranking of expense categories based on their current Month Total
let categories_ranking_chartData = {
        labels: ["Housing", "Transportation", "Education", "Personal", "Food&Groceries", "Other"],
        datasets : [
           {
            label: ["Category Ranking"],
            data: [
              Category_Expenses.Housing, Category_Expenses.Transportation, 
              Category_Expenses.Education, Category_Expenses.Personal, 
              Category_Expenses.FoodsGroceries, Category_Expenses.Other
            ],
            backgroundColor: [
              "yellow", 
              "blue",
              "lime",
              "red",
              "pink",
              "purple",
              "white"
            ]
           }
        ]
    }
  
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
      id: Date.now() //Used the current time coordinates as an id to make it unique
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
    element: <AppLayout />, 
    children: [
      {path: "home", element: <Home Category_Expenses={Category_Expenses}
      thisMonthExpense={thisMonthExpense} previousMonthExpenses={previousMonthExpenses} 
      PreviousMonth_CategoryExpenses={PreviousMonth_CategoryExpenses} supportedCurrencies={supportedCurrencies}
     currency={currency} setCurrency={setCurrency} chartOptions={chartOptions} 
      ThisMonth_IncomeSourcesTotal={ThisMonth_IncomeSourcesTotal} ThisMonth_IncomeTotal={ThisMonth_IncomeTotal}
      categories_ranking_chartData={categories_ranking_chartData} Income_Sources_Ranking_ChartData={Income_Sources_Ranking_ChartData}
      previousMonth_IncomeSourcesTotal={previousMonth_IncomeSourcesTotal} previousMonth_IncomeTotal={previousMonth_IncomeTotal}
      thisMonthIncome={thisMonthIncome} previousMonthIncome={previousMonthIncome} currencySymbol={currencySymbol}/>},

      {path: "expenses", element: <Expense expense={expense} setExpense={setExpense} setExpenseCategory={setExpenseCategory}
       Expense_Categories={Expense_Categories} expenseCategory={expenseCategory} expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount}
       addExpenseInfo={addExpenseInfo} Vertical_Side_NavBar={Vertical_Side_NavBar}/>, 
       children: [
      { path: "viewall", element: <AllExpenses expenseArr={expenseArr} setExpenseArr={setExpenseArr}
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
      addIncomeInfo={addIncomeInfo} incomeArr={incomeArr} setThisMonthIncome={setThisMonthIncome}
      thisMonthIncome={thisMonthIncome} ThisMonth_IncomeSourcesTotal={ThisMonth_IncomeSourcesTotal}
      currencySymbol={currencySymbol} ThisMonth_IncomeTotal={ThisMonth_IncomeTotal} 
      setPreviousMonthIncome={setPreviousMonthIncome}/>},
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
