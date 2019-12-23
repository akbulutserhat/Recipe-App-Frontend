import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import '../styles/navbar.scss';

class Navbar extends React.Component {
    render() {
        return(
                 <nav id="navbar" className="navbar navbar-expand-lg navbar-light">    
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa fa-bars toggler-icon" aria-hidden="true"></i>
                        </button>
                        <NavLink to="/" className="navbar-brand mobile-brand d-lg-none">
                                <img src={require('../assets/logo1.png')} alt="logo"/>
                        </NavLink>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo03">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <form className="form-inline search">
                                        <div className="search-box">
                                            <input className="form-control search-box-input" type="search" placeholder="Find a recipe" aria-label="Search"/>
                                            <button className="btn btn-link search-box-btn" type="submit">
                                                <i className="fa fa-search search-btn-icon"></i>
                                            </button>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <NavLink to="/recipes" className="navbar-brand desktop-brand d-none d-lg-block">
                                <img src={require('../assets/logo11.png')} alt="logo"/>
                            </NavLink>
                            <AuthenticatedNavbar/>
                        </div>
                    </div>         
                </nav>
           
        )
    }
}




export default Navbar;


