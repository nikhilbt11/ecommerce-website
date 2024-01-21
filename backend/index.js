import express from "express"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import cors from "cors"
import 'dotenv/config'
import { Product } from "./Schema/schema.js"
import { dbConnect } from "./db_connect/dbconnection.js"
import { Users } from "./Schema/userSchema.js"


const PORT = process.env.PORT || 3000
const app = express()
  
 dbConnect()

// Middlewares
app.use(express.json())
app.use(cors())




// APi creation
app.get('/', (req, res)=>{
    res.send("Express Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images', express.static('./upload/images'))

app.post('/upload', upload.single('product'), (req, res)=>{
    res.json({
        success : 1,
        imageUrl: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// Add Products To Database
app.post('/addproduct', async (req, res)=>{

   let products = await Product.find({})
   let id;
   if(products.length > 0){
   let last_product_array = products.slice(-1)
   let last_product = last_product_array[0]
       id = last_product.id+1
   }else id = 1
   const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
   })

   //console.log(product)

   await product.save()
   res.json({
    success:2,
   })
})

// creating middle ware to add to cart
const fetchUser =  async(req, res, next)=>{


    const token  = req.header('auth-token');


        
     if(!token){
        res.status(401).send({error : "Please authenticate using valid token"})
     }else{
        
        try{
           
              const data = jwt.verify(token, 'nikhil')
             
              req.user  = data.user
              console.log(req.user)
              next();
        }catch(error){
          res.status(401).send({err_catch : `Please authenticate using valid token : ${error}`})
        }
     }
}

// Add To Cart
app.post('/addtocart', fetchUser, async (req, res)=>{
let userData = await Users.findOne({_id:req.user.id})


userData.cart_details[req.body.itemId] += 1;
console.log(userData.cart_details[req.body.itemId])
await Users.findOneAndUpdate({_id:req.user.id},{cart_details:userData.cart_details})
res.json({
    currentUser : userData.cart_details 
    //totalCartItem : userData.cart_details[req.body.itemId]
})

})
//Remove from Cart
app.post('/removefromcart',fetchUser, async(req, res)=>{
    console.log("I am in REmove Cart")
let userData = await Users.findOne({_id:req.user.id})
if(userData.cart_details[req.body.itemId]>0){
userData.cart_details[req.body.itemId] -= 1;
console.log(userData.cart_details[req.body.itemId])
await Users.findOneAndUpdate({_id:req.user.id},{cart_details:userData.cart_details})}
res.json({
    currentUser : userData.cart_details
})
})

// User and Cart Linking
app.post('/getcart', fetchUser, async (req, res)=>{
let userData = await Users.findOne({_id:req.user.id})
// res.json(userData.cart_details)
})

// Related Products
app.get('/newcollections', async (req, res)=>{
let products = await Product.find({})
let recentProducts = products.slice(-8)
res.send(recentProducts)
})

// Popular in Women
app.get('/popularwomen', async (req, res)=>{
let products = await Product.find({category: "women"})
let popularInWomen = products.slice(0,4)
res.send(products)
})

// API TO Remove Data from Database
app.delete('/delete', async(req, res)=>{
    await Product.deleteMany({id:req.body.id})
    res.json({success : 1})
})


// Getting All Data
app.get('/getalldata', async (req, res)=>{
    const product = await Product.find({})
    res.json(product)

})

// Getting All Users
app.get('/getallusers', async (req, res)=>{
    const users = await Users.find({})
    res.json(users)

})


// Creating Endpoint for users
app.post('/signup', async (req, res)=>{
    if(req.body.username === "" || req.body.email === "" || req.body.password === ""){
      return(
        res.status(400).json({
            sucess:false,
            error:"Please enter required details"
        })
      )
    }
    
    let check = await Users.findOne({email:req.body.email})
    console.log(check)
    if(check){
        return (
            res.status(400).json({sucess : false, errors:"Exisiting User Found With Same Email ID"}))
    }
    
    Users.create({
        name : req.body.username,
        email : req.body.email,
        password : req.body.password,
        cart_details : req.body.cart_details
    })

   let cart = []
   for (let index = 0; index < 300+1; index++) {
       cart[index] = 0
    }

    const data = {
        user:{
            id:Users.id
        }
    }

    const token = jwt.sign(data, 'nikhil');

    res.json({
    success:true,
    token:token})
})


// EndPoint for Login

app.post('/login', async (req, res)=>{

    let user = await Users.findOne({email:req.body.email})

    if(user){
       if(user.password === req.body.password){
        console.log(user)
        const data = {
            user:{
                id:user.id
            }
        }
    

        const token = jwt.sign(data, 'nikhil');
        
        
        res.json({
            success:true,
            token:token,
            currentUser : user.cart_details
        })

       }else{
        res.json({
            success:false,
            error:"Wrong Password"
        })
       }
    }else{
        res.json({
            success:false,
            error:"Wrong email"
        })
    }
})



app.listen(PORT, (err)=>{
    if(!err)
    console.log("Listening at Port: " + PORT)
else
   console.log("Error Occured : " + err)
})