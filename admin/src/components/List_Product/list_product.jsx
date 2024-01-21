import React, { useEffect, useState } from "react";
import './list_product.css'
import remove_icon from '../../assets/cross_icon.png'

export default function ListProduct(){

  const [allProduct, setAllProduct] = useState([])
 
     async function fetchInfo(){
       await fetch("http://localhost:4000/getalldata")
       .then((res)=>res.json())
       .then((data)=>{setAllProduct(data)})
       .catch((rej)=>console.log(rej))

     }  
     

     useEffect(()=>{
       fetchInfo()
     },[])

     async function RemoveProduct(itemId){
        await fetch("http://localhost:4000/delete",{
            method: "DELETE",
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({"id":itemId}),
        }).then((res)=>res.json()).then((data)=>{
            data.success?alert("Product Removed"):alert("Product Removed failed!")
            fetchInfo()
        })
     }

    return(
        <div className="list-product">
            <h1>All Product List</h1>
            <div className="list-product-format-main">
               <p>Products</p>
               <p>Title</p>
               <p>Old Price</p>
               <p>New Price</p>
               <p>Category</p>
               <p>Remove</p>
            </div>
            <div className="listproduct-allproduct">
                <hr />
                {allProduct.map((item, index)=>{
                     return(
                        <div key={index} className="listproduct-format">
                            <img src={item.image} alt="img" className="listproduct-img" />
                            <p>{item.name}</p>
                            <p>{item.old_price}</p>
                            <p>{item.new_price}</p>
                            <p>{item.category}</p>
                            <img src={remove_icon} onClick={()=>{RemoveProduct(item.id)}} alt="img" className="listproduct-remove-icon" />
                        </div>
                     )
                })}
            </div>
        </div>
    )
}