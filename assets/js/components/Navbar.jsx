import React, {useContext} from 'react';
import authAPI from '../services/authAPI';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";
import '../css/Navbar.css';
import '../css/Navbar-Responsive.css';
import cartIconEmpty from './images/cart-icon-empty.png';
import cartIconFull from './images/cart-icon-full.png';


const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
      authAPI.logout();
      setIsAuthenticated(false);
      toast.info("Vous êtes Déconnecté 😄", {
        position: "bottom-center",
        });
      history.push("/login");
    };

    return (
      
      <nav className='menu-burger' class="navbar navbar-dark">
    
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
  <a class="navbar-brand" className='titleacme' href="javascript:window.location.reload(true)">ACMÉ STUDIO</a> <br />
  <a class="nav-accueil" href="#/home" role="tab" >Accueil</a>
  <a class="nav-boutique" href="#/shop" >Boutique</a>
  <a class="nav-historique" href="#/historique">Historique</a>

    <div className='deconected'>
      {isAuthenticated ? (
        <div>       
        <button className='deconected-button' onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div className='logs'>
        <a href="#/login">
          <button className='login-button'>Sign in</button>
        </a>
            <a href="#/register">
              <button className='register-button'>Sign up</button>
            </a>
        </div>
        )}
    </div>

    <div className='copyright'>
    <ul>
      <li>
        <a href="#/">Copyright © 2023 ACME STUDIO.</a>
      </li>
    </ul>
    </div>

</div>

        <Helmet>
                <meta charSet="utf-8" />
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
                <script src="burger-menu.js" type="text/javascript" />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
            </Helmet>
  


    
    </nav>

 );
}
 
export default Navbar;