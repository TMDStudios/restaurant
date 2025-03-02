import insta from '../assets/insta.svg';
import fb from '../assets/fb.svg';
import email from '../assets/email.svg';

const Footer = () => {
    return(
        <div className="footer">
            <div className='social'>
                <img src={insta} alt="instagram" />
                <img src={fb} alt="facebook" />
                <img src={email} alt="email" />
            </div>
            <div className='info'>
                <p>1055 Main Street, St. Albans, VT 05478  •  (802) 555 5555  •  zenrestaurant@gmail.com</p>
            </div>
            <div>
                <p>Created by <a href="https://tmdstudios.github.io/" target='_blank'>Almin Piric</a></p>
            </div>
        </div>
    )
} 
export default Footer;