import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const Nav = (props) => {
    const navigate = useNavigate();

    const goBack = _ => navigate("/");
    const handleLink = _ => navigate(pageLink);

    return(
        <div className="nav">
            <div className="left-header">
                <img src={logo} alt="Logo" />
            </div>
            <div className="right-header">
                <p>Menu</p>
                <p>Gallery</p>
                <p>Order Online</p>
            </div>
        </div>
    )
} 
export default Nav;