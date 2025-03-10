import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const Nav = (props) => {
    const navigate = useNavigate();

    const home = _ => navigate("/");
    const menu = _ => navigate("/menu");
    const order = _ => navigate("/order");

    return(
        <div className="nav">
            <div className="left-header">
                <img src={logo} alt="Logo" />
            </div>
            <div className="right-header">
                <p onClick={home}>Home</p>
                <p onClick={menu}>Menu</p>
                <p onClick={order}>Order Online</p>
                <p>Cart</p>
            </div>
        </div>
    )
} 
export default Nav;