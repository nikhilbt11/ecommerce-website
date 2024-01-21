import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import './Css/login_signup.css'
import { ShopContext } from "../context/shop_context_api"

export default function Login(){

       const {loginUser} = useContext(ShopContext)
       const[check, setCheck] = useState(false)
       const [userData, setUserData] = useState({
        username : "",
        email : "",
        password : ""
       })

       function changeHandler(e){
         setUserData({...userData,[e.target.name]:e.target.value})
       }

       async function fetchInfo(){
         check?loginUser(userData):alert("Please tick the checkbox")
       }

       function checkTickIsFalseOrTrue(event){
           setCheck(event.target.value)
       }

    return(

  

        <div className="login-signup">
            <div className="login-signup-container">
               <h1>Login</h1>
               <div className="login-signup-fields">
                <input type="email" placeholder="Email" onChange={changeHandler} name="email"/>
                <input type="password" placeholder="Password" onChange={changeHandler} name="password"/>
                {/* <input type="password" placeholder="Confirm Password"/> */}
               </div>
               <div className="login-signup-agree">
                <input type="checkbox" onChange={checkTickIsFalseOrTrue} name="" value={check}/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
               </div>
               <button onClick={fetchInfo}>Login</button>
               <div className="sg">
              Create new account<Link className="signup"  to='/signup'><span>SignUp</span></Link>
              </div>
              </div>
        </div>
    )
}