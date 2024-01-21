import React from "react";
import './fotter.css'
import footerLogo from '../Asset/logo_big.png'
import inst_icon from '../Asset/instagram_icon.png'
import pint_icon from '../Asset/pintester_icon.png'
import whats_icon from '../Asset/whatsapp_icon.png'

export default function Footer(){

    return(
        <div className="footer">
          <div className="footer-logo">
            <img src={footerLogo} alt="img"/>
            <p>FlipCart</p>
          </div>
          <ul className="footer-items">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={inst_icon} alt=""/>
            </div>
            <div className="footer-icons-container">
                <img src={pint_icon} alt=""/>
            </div>
            <div className="footer-icons-container">
                <img src={whats_icon} alt=""/>
            </div>
          </div>
          <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2023 All Right Reserved</p>
          </div>
        </div>
         )
}