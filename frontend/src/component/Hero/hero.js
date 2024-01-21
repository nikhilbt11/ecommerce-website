import React from "react"
import './hero.css'
import hand_icon from '../Asset/hand_icon.png'
import arrow_icon from '../Asset/arrow.png'
import hero_img from '../Asset/hero_image.png'

export default function Hero(){
    
    return(
      <div className="hero">
       <div className="hero-left">
           <h2>New Arrivals Only</h2>
          <div>
            <div className="hand-hand-icon">
              <p>new</p>
              <img src={hand_icon} alt="img"/>
            </div>
            <p>collections</p>
            <p>for everyone</p>
          </div>
          <div className="hero-latest-btn">
           <div>Latest Icon</div>
           <img src={arrow_icon} alt="arrow icon"/>
          </div>
       </div>

       <div className="hero-right">
         <img src={hero_img} alt="hero img"/>
       </div>

      </div>
    )
}