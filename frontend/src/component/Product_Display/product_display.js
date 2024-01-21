import React from "react";
import './product_display.css'
import star_icon from '../Asset/star_icon.png'
import star_icon_dull from '../Asset/star_dull_icon.png'
import { useContext } from 'react'
import { ShopContext } from "../../context/shop_context_api";

export default function ProductDisplay({productData}){
     
    
       const content = useContext(ShopContext)

    function testing(){

        window.localStorage.getItem('auth-token')?
        content.addToCart(productData.id):
        alert("Login/Signup to add item in cart")
    }



    return(

       
        <div className="product-display">
            <div className="product-display-left">
                <div className="product-display-img-list">
                   <img src={productData.image} alt="img" />
                   <img src={productData.image} alt="img" />
                   <img src={productData.image} alt="img" />
                   <img src={productData.image} alt="img" />
                </div>
                <div className="productdisplay-img">
                   <img className="productdisplay-main-img" src={productData.image} alt="img"/>
                </div>
            </div>
            <div className="product-display-rigth">
                <h1>{productData.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="img" />
                    <img src={star_icon} alt="img" />
                    <img src={star_icon} alt="img" />
                    <img src={star_icon} alt="img" />
                    <img src={star_icon_dull} alt="img" />
                    <p>(122)</p>
                </div>
                <div className="product-display-right-prices">
                    <div className="product-display-right-price">${productData.old_price}</div>
                    <div className="product-display-old-price">${productData.new_price}</div>
                </div>
                <div className="product-display-right-description"></div>
                <div className="product-display-right-size">
                    <h1>Select Size</h1>
                    <div className="product-size">
                        <h3>S</h3>
                        <h3>M</h3>
                        <h3>L</h3>
                        <h3>XL</h3>
                    </div>
                </div>
                <button onClick={testing}>Add TO Cart</button>
                <p className="product-right-category">Category : <span>{productData.category}</span></p>
            </div>
        </div>
    )
}