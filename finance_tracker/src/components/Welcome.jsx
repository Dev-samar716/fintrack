import { Link } from "react-router-dom";
import "../css/Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      {/* Main Content */}
      <main className="welcome-content">
        <h2>Track your finances. Stay in control.</h2>
        <p>
          Manage income, expenses, budgets, and savings — all in one place.
        </p>

        <div className="cta-buttons">
          <Link to="/home" className="primary-btn">
            Get Started
          </Link>
          <Link to="/login" className="secondary-btn">
            I already have an account
          </Link>
        </div>
      </main>
    </div>
  );
}