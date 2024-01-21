import React, { useEffect, useState } from "react"
import dropDownIcon from '../component/Asset/dropdown_icon.png'
import Item from "../component/Item/item"
import './Css/shop_category.css'

import { useContext } from "react"
import { ShopContext } from "../context/shop_context_api"

export default function ShopCategory(props){

    const [allData, setAlldata] = useState([])
    const {all_product} = useContext(ShopContext)

   useEffect(()=>{
    setAlldata(all_product)
   },[all_product])

    return(
        <div className="shop-category">
            <img src={props.banner} alt="img"/>
            <div className="shopcategory-indexsort">
              <p>
                <span>Showing 1-12</span> out of 36 products
              </p>
              <div className="shopcategry-sort">
                Sort By <img src={dropDownIcon} alt="img"/>
              </div>
            </div>
            <div className="shopcategory-products">
               {allData.map((item, i)=>{
                 if(item.category === props.category){
                  return  <Item className="items" key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}/>
                 }else{
                     return null
                 }
               })}
            </div>
        </div>
    )
}