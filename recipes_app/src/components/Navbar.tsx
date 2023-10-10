import { Link } from "react-router-dom";
import "../styling/Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="nav">
        <div className="left-content">
          <h2>
            <Link to="/">Recipes4You</Link>
          </h2>
        </div>
        <div className="right-content">
          <text>
            <Link to="/">My Ratings</Link>
          </text>
          <text>
            <Link to="/">My Favorites</Link>
          </text>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
