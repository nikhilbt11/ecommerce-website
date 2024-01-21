import React, { useEffect, useState } from "react"
import "./new_collections.css"
import Item from "../Item/item"

export default function NewCollections(){

    const [newCollections, setNewCollections] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/newcollections")
        .then((res)=>res.json())
        .then((data)=>{setNewCollections(data)})
        .catch((rej)=>{console.log(rej)})
    },[])
   
    return(
        <div className="new-collections">
            <h1>New Collections</h1>
            <hr/>
            <div className="new-coll">
                {newCollections.map((item, i)=>{
                   
                   return <Item className="items" key={i}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}/>
                })
                }
            </div>
        </div>
    )
}