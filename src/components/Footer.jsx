import insta from '../assets/insta.svg';
import fb from '../assets/fb.svg';
import email from '../assets/email.svg';
import { useMediaQuery } from "react-responsive";

const Footer = () => {
    const isMobile = useMediaQuery({ maxWidth: 830 });

    return(
        <div className="footer">
            <div className='social'>
                <img src={insta} alt="instagram" />
                <img src={fb} alt="facebook" />
                <img src={email} alt="email" />
            </div>
            {isMobile ?  (
                <div className='info'>
                    <p>1055 Main Street, St. Albans, VT 05478</p>
                    <p>(802) 555 5555  •  zenrestaurant@gmail.com</p>
                </div>
            ) : (
                <div className='info'>
                    <p>1055 Main Street, St. Albans, VT 05478  •  (802) 555 5555  •  zenrestaurant@gmail.com</p>
                </div>
            )}
            <div>
                <p>Copyright (c) 2025 <a href="https://tmdstudios.github.io/" target="_blank">Almin Piric</a>. Licensed under GPL-3.0.</p>
            </div>
        </div>
    )
} 
export default Footer;