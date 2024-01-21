import React, { useEffect, useState } from "react"
import { createContext } from 'react';


export const ShopContext = createContext(null)

function addCart(){
    const cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
        
    }
    return cart
}


 const ShopContextApi = (props)=>{
    
    const [totalItem, setTotalItem] = useState()
    const [cartItem, setCartItem] = useState(addCart());
    const [all_product, setAllProduct] = useState([]);
    const [all_users, setAllUsers] = useState([]);
    const [userCart, setUserCart] = useState([])
    

    // Login
   async function loginUser(userData){
        await  fetch(`http://localhost:4000/login`,{
            method:"POST",
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify(userData)
           }).then((res)=>res.json())
           .then((data)=>{
             console.log(data.currentUser)
            setUserCart(data.currentUser)              
              localStorage.setItem('auth-token', data.token); 
          data.token?window.location.href = '/':alert(data.error)
              
          })
           .catch((rej)=>{
            alert(rej)
           })
    }



    useEffect(()=>{
        fetch("http://localhost:4000/getalldata")
        .then((res)=>res.json())
        .then((data)=>{setAllProduct(data)})
        .catch((rej)=>{console.log(rej)})

        fetch("http://localhost:4000/getallusers")
        .then((res)=>res.json())
        .then((data)=>{setAllUsers(data)})
        .catch((rej)=>{console.log(rej)})

        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((res)=>res.json())
            .then((data)=>{setCartItem(data)})
        }

    },[userCart])
    

    function addToCart(itemId){ 
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId})
            }).then((res)=>res.json())
            .then((data)=>{console.log(data)
                setUserCart(data.currentUser)
            })
        }
        }


    
    function deleteFromCart(itemId){ 
     setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

     if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId})
            }).then((res)=>res.json())
            .then((data)=>{
                setUserCart(data.currentUser) })
     }
 }

 const getTotalAmout = ()=>{
    let totalAmount = 0
    for (const item in cartItem) {
        if(cartItem[item] > 0){
            let itemInfo = all_product.find((product)=> product.id === Number(item))
            totalAmount += itemInfo.new_price * cartItem[item]
        }
    }
    return totalAmount
 }

 const getTotalCartItem = ()=>{
    let temp = 0
  
   for (const key in userCart) {

    if(userCart[key] > 0){
       setTotalItem(temp + userCart[key])
       temp += userCart[key]
    }
   }

   return temp
}
    

  return( <ShopContext.Provider value={{all_product,all_users,totalItem,userCart,cartItem,loginUser, getTotalCartItem, addToCart, deleteFromCart, getTotalAmout}}>
         {props.children}
    </ShopContext.Provider>  )
}

export default ShopContextApi