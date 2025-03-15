import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import logo from '../assets/logo.png';
import { useMediaQuery } from "react-responsive";
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = (props) => {
    const navigate = useNavigate();

    const home = _ => navigate("/");
    const menu = _ => navigate("/menu");
    const order = _ => navigate("/order");
    const cart = _ => navigate("/cart");

    const isMobile = useMediaQuery({ maxWidth: 830 });
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
            {isMobile ? (
                <div className="nav">
                        <img src={logo} alt="Logo" onClick={home} />
                        <div 
                            className={`menu-icon ${!menuOpen ? 'animated' : ''}`} 
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </div>
                        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                            <p className="nav-button" onClick={() => { home(); setMenuOpen(false); }}>Home</p>
                            <p className="nav-button" onClick={() => { menu(); setMenuOpen(false); }}>Menu</p>
                            <p className="nav-button" onClick={() => { order(); setMenuOpen(false); }}>Order Online</p>
                            <p className="nav-button" id="cart-button" onClick={() => { cart(); setMenuOpen(false); }}>Cart</p>
                        </div>
                </div>
            ) : (
                <div className="nav">
                    <div className="left-header">
                        <img src={logo} alt="Logo" onClick={home} />
                    </div>
                    <div className="right-header">
                        <p className='nav-button' onClick={home}>Home</p>
                        <p className='nav-button' onClick={menu}>Menu</p>
                        <p className='nav-button' onClick={order}>Order Online</p>
                        <p className='nav-button' id='cart-button' onClick={cart}>Cart</p>
                    </div>
                </div>
            )}
        </>
    )
} 
export default Nav;