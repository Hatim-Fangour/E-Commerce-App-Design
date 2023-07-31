
import './App.css';
import Header from './common/header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Pages from './pages/Pages';
import Cart from './common/cart/Cart';
import Data from './components/flashDeals/Data';
import Sdata from './components/shop/Sdata';
import { useState } from 'react';
import Footer from './common/footer/Footer';

function App() {
  // step 1: fetch data from Database
  const {productItems} = Data;
  const {shopItems} = Sdata;

  const [cartItem, setCartItem] =  useState([])
  const addToCart = (product)=>{
    const productExit = cartItem.find((item)=> item.id === product.id)
    
    if (productExit){
      setCartItem(cartItem.map((item)=>
      (item.id === product.id ?
        {...productExit, qty:productExit.qty+1 }:item)))
        console.log(product.id)
      }else{
        console.log("1")
      setCartItem([...cartItem,{...product, qty:1}])
    }
  }

  const decreaseQty = (product)=>{
    const productExit = cartItem.find((item) => item.id === product.id)
    if(productExit.qty === 1){
      setCartItem(cartItem.filter((item)=> item.id !== product.id ))
    }else{
      setCartItem(cartItem.map((item)=>(item.id === product.id ? {...productExit, qty:productExit.qty - 1}:item)))
    }
  }
  return (
    <>
    <Router>
      <Header cartItem = {cartItem}/>
      <Switch>
          <Route path="/" exact>
            <Pages productItems = {productItems} addToCart={addToCart} shopItems={shopItems} />
          </Route>

          <Route path="/cart" exact>
            <Cart cartItem = {cartItem} addToCart={addToCart} decreaseQty={decreaseQty}/>
          </Route>
{/* 01:35:44   https://www.youtube.com/watch?v=K3L8J0DbuT8&ab_channel=GorkCoder  */}
      </Switch>
      <Footer  />
    </Router>
  </>
  );
}

export default App;
