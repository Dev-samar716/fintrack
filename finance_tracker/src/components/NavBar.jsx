import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import '../css/NavBar.css';
function NavLinks_Container() {
    return(
    <div className="NavLinks-div-Modal">
      <ul className="NavLinks-List">
           <li><Link to="/expenses" className="Nav-link-modal">Expenses</Link></li>
           <li><Link to="/income" className="Nav-link-modal">Income</Link></li>
           <li><Link to="/home" className="Nav-link-modal">Home</Link></li>
           <li><Link to="/expense-history" className="Nav-link">History</Link></li>
        </ul>
    </div>
    );
}

export default function Navigation_Bar() {
    const [menuClicked, setMenuClicked] = useState(false);

    useEffect(()=> {
    // Background color becomes dark when this component is rendered 
    document.body.style.backgroundColor = "#1a1a1a"; 
    //Returns to normal when user leaves the page 
    return () => {
        document.body.style.backgroundColor = ""; 
    }
    },[])
     return(
    <nav className="navbar">
        <div className="Nav-logo-Container">
            <h1 className="logo">FinTrack</h1>
        </div> 
        <div> 
            <ul className="Nav-Links-Container">
             <li><Link to="/expenses" className="Nav-link">Expenses</Link></li>
             <li><Link to="income" className="Nav-link">Income</Link></li>
             <li><Link to="/home" className="Nav-link">Home</Link></li>
             <li><Link to="/expense-history" className="Nav-link">History</Link></li>
            </ul>
        </div>
        <div className="User-Profile-Wrapper"> 
       <div className="User-Profile-Icon-Container"> 
          <i className="fas fa-user"></i> 
        </div> 
        {menuClicked && <NavLinks_Container />}
         <div className="Menu-Icon-Container">
        <i className="fas fa-bars" onClick={()=> setMenuClicked(!menuClicked)}></i>
        </div>
        </div> 
    </nav>
     );
}
