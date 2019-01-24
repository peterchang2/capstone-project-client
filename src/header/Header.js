import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <button className='btn btn-warning m-1'><Link to="/">Home</Link></button>
    <button className='btn btn-danger m-1'><Link to='/whiskeys'>Whiskey List</Link></button>
    <button className='btn btn-dark m-1'><Link to='/favorites'>Favorites</Link></button>
    <button className='btn btn-info m-1'><Link to='/wishes'>Wishes</Link></button>
    <button className='btn btn-success m-1'><Link to="/change-password">Change Password</Link></button>
    <button className='btn btn-secondary m-1'><Link to="/sign-out">Sign Out</Link></button>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <button className='sign-up-btn btn m-1'><Link to="/sign-up">Sign Up</Link></button>
    <button className='sign-in-btn btn m-1'><Link to="/sign-in">Sign In</Link></button>

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
