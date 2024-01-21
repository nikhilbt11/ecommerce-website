import React from "react"
import { useState, useEffect  } from "react"
import { useParams} from "react-router-dom"
import BreadCrum from "../component/BreadCrum/breadCrum"
import ProductDisplay from "../component/Product_Display/product_display"
import RelatedProducts from "../component/Realted_Products/related_product"

export default function Product(){
    

    const productId = useParams()
    const [productData, setProductData] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:4000/getalldata")
        .then((res)=>res.json())
        .then((data)=>{
            
            const productTempData = data.find((e)=>{
                return(
                    e.id === Number(productId.productID)
                )})
            setProductData(productTempData)
           // console.log(productTempData)
        })
        .catch((rej)=>{console.log(rej)})
    },[])
 
   console.log(productData)
    

    return(
        <div>
             <BreadCrum productData={productData}/>
             <ProductDisplay productData={productData}/>
             <RelatedProducts productData={productData}/>
        </div>
    )
}