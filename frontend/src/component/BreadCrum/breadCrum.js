import React from "react";
import './breadCrum.css'
import arrow_icon from '../Asset/breadcrum_arrow.png'

export default function BreadCrum(props){
    return(
        <div className="bread-crum"> 
            Home<img src={arrow_icon} alt="img"/> Shop<img src={arrow_icon} alt="img"/> {props.productData.category} <img src={arrow_icon} alt="img"/>{props.productData.name}<img src={arrow_icon} alt="img"/>
        </div>
    )
}