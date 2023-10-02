import React from 'react'
import '../styling/Navbar.css'

function Navbar() {
    return (
      <div className='navbar-container'>
        <nav className='nav'>
        <div className='left-content'>
            <h2><a href="/" className='link'>Recipes</a></h2>
        </div>
        <div className='right-content'> 
          <button>Search</button>
        </div>
        </nav>
      </div>
    );
  }
export default Navbar