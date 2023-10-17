import '../styling/Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className='navbar-container'>
        <nav className='nav'>
        <div className='left-content'>
            <h2><Link to="/" >Recipes4You</Link></h2>
        </div>
        <div className='right-content'>
          <p><Link to="/">My Ratings</Link></p>
          <p><Link to="/">My Favorites</Link></p>
        </div>
        </nav>
      </div>
    );
  }
export default Navbar