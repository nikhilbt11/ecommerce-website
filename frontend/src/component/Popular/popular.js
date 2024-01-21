import React from "react";
import './popular.css'
import { useState, useEffect } from "react";
import Item from "../Item/item"

export default function Popular(){


  const [popularInWomen, setPopularInWomen] = useState([])

  useEffect( ()=>{
    fetch("http://localhost:4000/popularwomen")
      .then((res)=>res.json())
      .then((data)=>{setPopularInWomen(data)})
      .catch((rej)=>{console.log(rej)})
  },[])

  return(
    <div className="item-container">
        <h1>Popular In Women</h1>
        <hr/>
        <div className="popular-item">
           {popularInWomen.map((item, i)=>{
            return(
              <Item className="items" key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}/>
            )
           })}
        </div>
    </div>
  )
}