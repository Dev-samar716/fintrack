import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import '../css/NavBar.css';

function NavBar_LowerRow({value, onChange, onSearch,setClicked}) {
  const handleClick = () => {
    if(value.length > 0) {
    setClicked(true);
    onSearch();
  }
  }
  return(
    <div className="Lower-Row">
      <input
        type="text"
        placeholder="Search expenses..."
        className="Nav-Search-Input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="Search-BTN" onClick={() => handleClick()}>Search</button>
    </div>
  );
}

function NavLinks_Container() {
    return(
    <div className="NavLinks-div-Modal">
      <ul className="NavLinks-List">
           <li><Link to="/expenses" className="Nav-link-modal">Expenses</Link></li>
           <li><Link to="/income" className="Nav-link-modal">Income</Link></li>
           <li><Link to="/home" className="Nav-link-modal">Home</Link></li>
           <li><Link to="/expense-history" className="Nav-link-modal">History</Link></li>
        </ul>
    </div>
    );
}

export default function Navigation_Bar({
   value,
  onChange,
  onSearch,
  setClicked
}) {
    const [menuClicked, setMenuClicked] = useState(false);
     const location = useLocation();
  const showSearchBar = location.pathname === "/expense-history";

    useEffect(()=> {
    // Background color becomes dark when this component is rendered 
    document.body.style.backgroundColor = "#1a1a1a"; 
    //Returns to normal when user leaves the page 
    return () => {
        document.body.style.backgroundColor = ""; 
    }
    },[])

    return (
  <nav className="navbar">
    {/* ===== Upper Row ===== */}
    <div className="Upper-Row">
      <div className="Nav-logo-Container">
        <h1 className="logo">FinTrack</h1>
      </div>

      <ul className="Nav-Links-Container">
        <li><Link to="/expenses" className="Nav-link">Expenses</Link></li>
        <li><Link to="/income" className="Nav-link">Income</Link></li>
        <li><Link to="/home" className="Nav-link">Home</Link></li>
        <li><Link to="/expense-history" className="Nav-link">History</Link></li>
      </ul>

      <div className="User-Profile-Wrapper">
        <div className="User-Profile-Icon-Container">
          <i className="fas fa-user"></i>
        </div>

        <div className="Menu-Icon-Container">
          <i
            className="fas fa-bars"
            onClick={() => setMenuClicked(!menuClicked)}
          ></i>
        </div>

        {menuClicked && <NavLinks_Container />}
      </div>
    </div>

    {/* ===== Lower Row ===== */}
    {showSearchBar && <NavBar_LowerRow value={value} onChange={onChange}
     onSearch={onSearch} setClicked={setClicked}/>}
  </nav>
);

}
