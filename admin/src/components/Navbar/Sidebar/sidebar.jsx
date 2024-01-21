import React from "react";
import './sidebar.css'
import {Link} from "react-router-dom"
import add_product_icon from '../../../assets/Product_Cart.svg'
import list_product_icon from '../../../assets/Product_list_icon.svg'

export default function SideBar(){
    return(
        <div className="side-bar">
            <Link className="sidebar-item" to={'/addproduct'}>
              
                 <img src={add_product_icon} alt="img"/>
                 <p>Add Product</p>
          
            </Link>
            <Link className="sidebar-item" to={'/listproduct'}>
      
                 <img src={list_product_icon} alt="img"/>
                 <p>Product List</p>
            
            </Link>
        </div>
    )
}