import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Cookies from "js-cookie";

const MyContext = createContext();
export {MyContext};

function App() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    handleCartButton();
  }, []);

  const handleCartButton = _ => {
    const savedOrderItems = Cookies.get("orderItems");
    if(savedOrderItems){
      setOrderItems(JSON.parse(savedOrderItems));
      document.getElementById('cart-button').classList.add('cart-button');
    }else{
      document.getElementById('cart-button').classList.remove('cart-button');
    }
  }

  return (
    <>
      <MyContext.Provider value={{orderItems, setOrderItems, handleCartButton}}>
        <BrowserRouter basename="/restaurant">
          <Nav />
          <Routes>
            <Route path="/" element={<Home handleCartButton={handleCartButton}/>} />
            <Route path="/menu" element={<Menu handleCartButton={handleCartButton}/>} />
            <Route path="/order" element={<Order orderItems={orderItems} setOrderItems={setOrderItems} handleCartButton={handleCartButton}/>} />
            <Route path="/cart" element={<Cart orderItems={orderItems} setOrderItems={setOrderItems} handleCartButton={handleCartButton}/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MyContext.Provider>
    </>
  )
}

export default App