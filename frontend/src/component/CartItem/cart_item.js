import './cart_item.css'
import remove_item from '../Asset/cart_cross_icon.png'
import { useContext } from 'react'
import { ShopContext } from "../../context/shop_context_api";

export default function CartItem(){

const data = useContext(ShopContext)




    
      


    return(
        <div className="cart-items">
          <div className="cart-item-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />

           {
            data.all_product.map((item,key)=>{
              if(data.userCart[item.id]>0){
                return (<>
                  <div className="cartitems-format">
                  <img src={item.image} alt="img" className="cart-icon-product"/>
                  <p>{item.name}</p>
                  <p>${item.new_price}</p>
                  <button className="cart-item-quantity">{data.userCart[item.id]}</button>
                  <p id="total">{item.new_price*data.userCart[item.id]}</p>
                  <img id="delete" src={remove_item} alt="img" onClick={()=>{data.deleteFromCart(item.id)}} />
        
                  </div>
                  <hr />
                  </>
                  )
                  
                
              }else{ return null }
            })
           }
           
           <div className="cart-items-down">
            <div className="cart-items-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cart-items-total-items">
                   <p>Subtotal</p>
                   <p>${data.getTotalAmout()}</p>
                </div>
                <hr />
                <div className="cart-items-total-items">
                   <p>Shiiping Fee</p>
                   <p>Free</p>
                </div>
                <hr />
                <div className="cart-items-total-items">
                  <h3>Total</h3>
                  <h3>${data.getTotalAmout()}</h3>
                </div>
              </div>
              <button>Proceed To CheckOut</button>
            </div>
            <div className="cart-items-promo">
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-items-promobox">
                <input type="text" placeholder="Promo Code"/>
                  <button>Submit</button>
              </div>
            </div>
           </div>
        </div>
    )
    
}

