import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png';

const Nav = (props) => {
    const navigate = useNavigate();

    const home = _ => navigate("/");
    const menu = _ => navigate("/menu");
    const order = _ => navigate("/order");
    const cart = _ => navigate("/cart");

    return(
        <div className="nav">
            <div className="left-header">
                <img src={logo} alt="Logo" />
            </div>
            <div className="right-header">
                <p className='nav-button' onClick={home}>Home</p>
                <p className='nav-button' onClick={menu}>Menu</p>
                <p className='nav-button' onClick={order}>Order Online</p>
                <p className='nav-button' id='cart-button' onClick={cart}>Cart</p>
            </div>
        </div>
    )
} 
export default Nav;