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
export { MyContext };

function App() {
    const [orderItems, setOrderItems] = useState(() => {
        const savedOrderItems = Cookies.get("orderItems");
        return savedOrderItems ? JSON.parse(savedOrderItems) : [];
    });

    useEffect(() => {
        if(orderItems.length > 0){
            Cookies.set("orderItems", JSON.stringify(orderItems), { expires: 1 });
        }else{
            Cookies.remove("orderItems");
        }
    }, [orderItems]);

    const handleCartButton = () => {
        const cartButton = document.getElementById('cart-button');
        if(cartButton){
            if(orderItems.length > 0){
                cartButton.classList.add('cart-button');
            }else{
                cartButton.classList.remove('cart-button');
            }
        }
    };

    useEffect(() => {
        handleCartButton();
    }, [orderItems]);

    return (
        <MyContext.Provider value={{ orderItems, setOrderItems, handleCartButton }}>
            <BrowserRouter basename="/restaurant">
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;