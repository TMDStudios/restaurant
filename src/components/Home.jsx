import restaurant1 from '../assets/restaurant1.png';
import restaurant2 from '../assets/restaurant2.png';
import { useEffect, useContext } from "react";
import { MyContext } from '../App';

const Home = () => {
    const {handleCartButton} = useContext(MyContext);

    useEffect(() => {
        handleCartButton();
    }, []);

    return(
        <div className='content'>
            <div className='left'>
                <img src={restaurant1} alt="restaurant1" />
                <img src={restaurant2} alt="restaurant2" />
            </div>
            <div className='right'>
                <h3>Great Food, Fun, Community</h3>
                <p>Discover this hidden gem in your neighborhood with dine-in and take-out options!</p>
                <div className='dots'>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                </div>
                <h4>Hours:</h4>
                <div className='hours'>
                    <p>Mon-Fri: 4PM - 9PM</p>
                    <p>Weekends: 6PM - 11PM</p>
                </div>
                <div className='map'>
                    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-73.0865800380707%2C44.80954414590697%2C-73.07949900627138%2C44.81282465595745&amp;layer=mapnik&amp;marker=44.81118485043225%2C-73.08303952217102" ></iframe>
                </div>
            </div>
        </div>
    )
} 
export default Home;