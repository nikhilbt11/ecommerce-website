import React, { useState } from "react"
import { Link } from "react-router-dom"
import './Css/login_signup.css'

export default function SignUP(){

    const cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
    }

       const[check, setCheck] = useState(false)
       const [userData, setUserData] = useState({
        username : "",
        email : "",
        password : "",
        cart_details : cart
       })

       function changeHandler(e){
         setUserData({...userData,[e.target.name]:e.target.value})
       }

       function checkTickIsFalseOrTrue(event){
        setCheck(event.target.value)
    }

       async function fetchInfo(value){
       if(check){
        await  fetch('http://localhost:4000/signup',{
            method:"POST",
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify(userData)
           }).then((res)=>res.json())
           .then((data)=>{
            data.token?window.location.replace('/login'):alert("Something went wrong")
            localStorage.setItem('auth-token', data.token); 
        
          })
           .catch((rej)=>{
            alert("Signup Failedd !");
            console.log("Error aya hai bhi : ", rej)
           })}
           else{
            alert("Please tick the checkbox")
           }
       }

    return(

  

        <div className="login-signup">
            <div className="login-signup-container">
               <h1>SignUP</h1>
               <div className="login-signup-fields">
                <input type="text" placeholder="Username" onChange={changeHandler} name="username" />
                <input type="email" placeholder="Email" onChange={changeHandler} name="email"/>
                <input type="password" placeholder="Password" onChange={changeHandler} name="password"/>
                {/* <input type="password" placeholder="Confirm Password"/> */}
               </div>
               <div className="login-signup-agree">
                <input type="checkbox" onChange={checkTickIsFalseOrTrue} name="" value={check}/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
               </div>
               <button onClick={fetchInfo}>SignUp</button>
               <div className="sg">
              Already have an account ?<Link className="signup"  to='/login'><span>Login</span></Link>
              </div>
              </div>
        </div>
    )
}