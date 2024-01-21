import './App.css';
import Navbar from './component/Navbar/navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Shop from './pages/shop';
import ShopCategory from './pages/shop_category';
import Cart from './pages/cart';
import Product from './pages/product';
import Login from './pages/login_signup';
import Footer from './component/Footer/footer';
import menBanner from './component/Asset/banner_mens.png'
import womenBanner from './component/Asset/banner_women.png'
import kidsBanner from './component/Asset/banner_kids.png'
import ShopContextApi from './context/shop_context_api';
import SignUP from './pages/register';

function App() {

  
  return ( 
    
    <BrowserRouter>
    <Navbar />
   
    <Routes>
      <Route path='/' element={<Shop/>}/>
      
      <Route path='/men' element={<ShopCategory banner={menBanner} category={"men"}/>}/>
      <Route path='/women' element={<ShopCategory banner={womenBanner} category={"women"}/>}/>
      <Route path='/kids' element={<ShopCategory banner={kidsBanner} category={"kid"}/>}/>
      <Route path='/product' element={<Product/>}>
        <Route path=':productID' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUP/>}/>
      
    </Routes>
    
    <Footer/>
    </BrowserRouter>

  );
}

export default App;
