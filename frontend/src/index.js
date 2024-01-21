import React from "react"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextApi from "./context/shop_context_api";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <ShopContextApi>
    <App />
    </ShopContextApi>
  </React.StrictMode>
  
);

