import React, { Fragment } from 'react';
import {Link,NavLink,withRouter} from 'react-router-dom';
import {isAuthenticated } from '../components/Helper/auth';

export const Navbar =()=>{
    return(
      <nav>
  <div className="nav-wrapper black">
    <a className="brand-logo"><h4 className="white-text">Walmart</h4></a>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="/wishlist">Wishlist</Link></li>
      <li><NavLink to="/cart">Cart</NavLink></li>
      
    </ul>
  </div>
</nav>
    )
};

export const NavbarOut =()=>{
  return(
      <nav>
  <div className="nav-wrapper black">
    <a className="brand-logo"><h4 className="white-text"><Link to="/home">Walmart</Link></h4></a>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
    {isAuthenticated() && (
      <Fragment>
        <li><Link to="/signup">Signup</Link></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>

      </Fragment>
    )}
      
      
    </ul>
  </div>
</nav>
  )
}
