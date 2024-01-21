import React from "react";
import './item.css'
import { Link} from "react-router-dom";


export default function Item(props){

    
    
    return(
        
            <Link className="item" to={`/product/${props.id}`}>
            <img src={props.image} alt="img" onClick={window.scroll(0,0)}/>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    {props.new_price}
 
                </div>
                <div className="item-price-old">
                {props.old_price}
                </div>
                
            </div>
            </Link>
   
    )
}