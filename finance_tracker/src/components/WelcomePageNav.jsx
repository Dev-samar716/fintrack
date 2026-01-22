import { Link } from "react-router-dom"; 
export default function NavHeader() {
     return(
         <nav className="navbar">
                 <h1 className="logo">FinTrack</h1>
         
                 <div className="nav-actions">
                   <Link to="/login" className="nav-btn login">
                     Login
                   </Link>
                   <Link to="/signup" className="nav-btn signup">
                     Sign Up
                   </Link>
                 </div>
               </nav>
     );
}