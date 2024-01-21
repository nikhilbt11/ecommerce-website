import React from "react";
import './news_letter.css'

export default function NewsLettter(){
    
    return(
        <div className="news-letter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div className="form"> 
                <input type="email" placeholder="Enter Your Email"/>
                <button>Subscribe</button>
            </div>

        </div>
    )
}