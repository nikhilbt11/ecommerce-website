import React from "react";
import './navbar.css'
import nav_logo from '../../assets/logo.png'
import nav_profile from '../../assets/pofilepic.png'

export default function Navbar(){

    return(
        <div className="nav-container">
            <div className="nav-logo-container">
            <img src={nav_logo} className="nav-logo-img" alt="nav logo" />
            <div className="nav-logo-name">
            <p>FlipKart</p>
            <p>Admin Pannel</p>
            </div>
            
            </div>
            
            <img src={nav_profile} className="nav-profile" alt="nav profile" />
        </div>
    )
}