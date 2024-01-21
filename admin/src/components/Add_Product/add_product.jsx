import React, { useState } from "react";
import './add_product.css'
import add_area from '../../assets/upload_area.svg'

export default function AddProduct(){
  
     const [image, setImage] = useState()
     const [productDetails, setProductionDetails] = useState({
        name : "",
        image : "",
        category : "men",
        new_price : "",
        old_price : ""
     })

     function ImageHandler(event){
        console.log(event.target.files[0].name)
           setImage(event.target.files[0])
          
     } 
     function changeHanler(event){
        setProductionDetails({...productDetails, [event.target.name]:event.target.value})
     }

     async function addProduct(){
         let responseData;
         let product = await productDetails

         let formData = new FormData();
         formData.append('product', image)
         console.log(formData.get('product'))

         await fetch('http://localhost:4000/upload', {
            method : 'POST',
            headers : {
                 Accept: 'application/json'
            },
            body: formData,
         }).then((res)=>{
            return res.json()
         }).then((data)=>{
            responseData=data
         }).catch((rej)=>{
            console.log(rej)
         })
   
         console.log(responseData.success)

         if(await responseData.success){
               product.image = await responseData.imageUrl;
           await console.log(product)
            
            await fetch('http://localhost:4000/addproduct', {
               method : 'POST',
               headers : {
                  Accept : 'application/json',
                  'Content-Type' : 'application/json'
             },
               body: JSON.stringify(product),
            }).then((res)=>{
               return res.json()
            }).then((data)=>{
               data.success?alert("Product Added"):alert("Added Failed!")
            }).catch((rej)=>{
               console.log(`Kya hai ye ${rej}`)
            })
         }
     }


    return(
        <div className="add-product">
           <div className="add-product-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHanler} type="text" placeholder="Type here" name="name"/>
           </div>
           <div className="add-product-price">
              <div className="add-product-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHanler} type="text" name="old_price" placeholder="Type here"/>
              </div>
              <div className="add-product-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHanler} type="text" name="new_price" placeholder="Type here"/>
              </div>
              <div className="add-product-itemfield">
                <p>Product Category</p>
                 <select value={productDetails.category} onChange={changeHanler} name="category" className="add-product-selector">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                 </select>
              </div>
              <div className="add-product-itemfield">
                <label htmlFor="file-input">
                  <img src={image?URL.createObjectURL(image):add_area} alt="img" className="addproduct-thumbnail-img" />
                  </label>
                  <input onChange={ImageHandler} type="file" name="image" id="file-input" hidden/>
              </div>
              <button onClick={addProduct} className="add-product-btn">Add</button>
           </div>
        </div>
    )
}