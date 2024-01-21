import React from "react";
import './admin.css'
import SideBar from "../../components/Navbar/Sidebar/sidebar";
import { Router, Route, Routes } from "react-router-dom";
import AddProduct from "../../components/Add_Product/add_product";
import ListProduct from "../../components/List_Product/list_product";

export default function Admin(){
    return(
        <div className="admin-container">
           <SideBar/>
           <Routes>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/listproduct" element={<ListProduct/>}/>
           </Routes>
        </div>
    )
}