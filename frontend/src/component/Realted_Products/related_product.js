import React, { useState, useEffect } from "react";
import './related_product.css'
import Item from "../Item/item";

export default function RelatedProducts({productData}){

    const [data, setData] = useState([])
    console.log(productData)

    useEffect(()=>{
        fetch("http://localhost:4000/getalldata")
        .then((res)=>res.json())
        .then((data)=>{setData(data)})
        .catch((rej)=>{console.log(rej)})
    },[])

    return(
        <div className="related-product">
            <h1>Related Products</h1>
            <div className="inner-container">
            {  
                data.map((item, i)=>{
                    
                    
                    if(item.category === productData.category){
                        return(
                            <Item key={i}
                              id={item.id}
                              name={item.name}
                              image={item.image}
                              new_price={item.new_price}
                              old_price={item.old_price}/>)
                    }else{
                        return null
                    }
                        
                    
                })
            }
            </div>
        </div>
    )
}
