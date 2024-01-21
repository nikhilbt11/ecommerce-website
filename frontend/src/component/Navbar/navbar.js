import React, { useState } from "react"
import './navbar.css'
import logo from '../Asset/logo.png'
import cart_icon from '../Asset/cart_img.png'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ShopContext } from "../../context/shop_context_api"

export default function Navbar(){

    const [menu, setMenu] = useState("")
    const [state, setState] = useState("Logout")
    const data = useContext(ShopContext)

    function getMenu(event){
        setMenu(event.target.innerText.toLowerCase())
    }

    return(
        <div className="navbar">
            <div className="nav-logo">
            <Link className="nav-logo" style={{textDecoration:"none"}} to='/'><img src={logo} alt="logo"/>
             <p>Flipcart</p></Link>
            </div>

            <div className="nav-menu">
              <ul>
                <li onClick={getMenu} value="home" ><Link className="link"  to='/'>Home</Link>{menu === "home"?<hr/>:<></>}</li> 
                <li onClick={getMenu} value="men" ><Link className="link"  to='/men'>Men</Link>{menu === "men"?<hr/>:<></>}</li>
                <li onClick={getMenu} value="women" ><Link className="link"  to='/women'>Women</Link>{menu === "women"?<hr/>:<></>}</li>
                <li onClick={getMenu} value="kids" ><Link className="link"  to='/kids'>Kids</Link>{menu === "kids"?<hr/>:<></>}</li>
              </ul>
            </div>

            <div className="nav-login-cart">
           {window.localStorage.getItem('auth-token')?<Link to='/login'><button onClick={()=>{window.localStorage.removeItem('auth-token'); setState('Login')}}>{state}</button></Link>:<Link to='/login'><button onClick={()=>{setState('Logout')}}>{state}</button></Link>}

             {window.localStorage.getItem('auth-token')?<></>:<Link className="btn"  to='/signup'><button>Signup</button></Link>}
            
             {window.localStorage.getItem('auth-token')?<>
                <Link className="cart-img"  to='/cart'><img style={{color:"white"}} src={cart_icon} alt="cart"/></Link>
                <Link className="cart-counter" to='/cart'> <div >{data.getTotalCartItem()}</div></Link>
                </>: <></>}
            </div>
           
        </div>
    )
}

