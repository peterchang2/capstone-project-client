import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className='btn header-btn m-1' to="/">Home</Link>
    <Link className='btn header-btn m-1' to='/whiskeys'>Whiskey List</Link>
    <Link className='btn header-btn m-1' to='/favorites'>Favorites</Link>
    <Link className='btn header-btn m-1' to='/wishes'>Wishes</Link>
    <Link className='btn header-btn m-1' to="/change-password">Change Password</Link>
    <Link className='btn header-btn m-1' to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className='sign-up-btn btn m-1' to="/sign-up">Sign Up</Link>
    <Link className='sign-in-btn btn m-1' to="/sign-in">Sign In</Link>

  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">

    <Link to="/"><h1 className='site-name'>WhiskeyVerse</h1></Link>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { alwaysOptions }
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
