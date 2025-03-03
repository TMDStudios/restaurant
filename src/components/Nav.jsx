import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const Nav = (props) => {
    const navigate = useNavigate();

    const home = _ => navigate("/");
    const menu = _ => navigate("/menu");

    return(
        <div className="nav">
            <div className="left-header">
                <img src={logo} alt="Logo" />
            </div>
            <div className="right-header">
                <p onClick={home}>Home</p>
                <p onClick={menu}>Menu</p>
                <p>Order Online</p>
            </div>
        </div>
    )
} 
export default Nav;