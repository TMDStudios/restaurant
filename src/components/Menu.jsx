import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyContext } from '../App';

const Menu = () => {
    const {handleCartButton} = useContext(MyContext);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categories] = useState(['Lunch Specials', 'Starters', 'Entrées', 'Desserts', 'Drinks']);

    useEffect(() => {
        handleCartButton();
        setLoading(true);
        axios
            .get("https://alminpiric.pythonanywhere.com/api/dishes/get/")
            .then((response) => {
                setDishes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
                setLoading(false);
            });
    }, []);

    const getHeader = dishCategory => {
        switch(dishCategory){
            case "Lunch Specials":
                return "Each lunch meal comes with soup or salad of the day";
            case "Starters":
                return "A delicious beginning to your meal";
            case "Entrées":
                return "Served with your choice of two sides";
            case "Desserts":
                return "The perfect way to end your meal";
            default:
                return "Refreshing beverages to pair with your meal";
        }
    };

    return(
        <div className="menu">
            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    <p className="dish-options">
                        Gluten Free (<span className="gluten-free">GF</span>) and Vegan (<span className="vegan">V</span>) options available
                    </p>
                    {categories.map((category) => (
                        <div key={category}>
                            <div className='dots'>
                                <span>•</span>
                                <span>•</span>
                                <span>•</span>
                            </div>
                            <h3>~ {category} ~</h3>
                            <p className="sub-heading">{getHeader(category)}</p>
                            <div>
                                {dishes
                                    .filter((dish) => dish.category && dish.category.trim().toLowerCase() === category.toLowerCase())
                                    .map((dish) => (
                                        <div key={dish.id}>
                                            <h4>
                                                {dish.name}
                                                {dish.gluten_free_option && dish.vegan_option && 
                                                <span> (<span className="gluten-free">GF</span>-<span className="vegan">V</span>)</span>}
                                                {dish.gluten_free_option && !dish.vegan_option && <span> (<span className="gluten-free">GF</span>)</span>}
                                                {!dish.gluten_free_option&& dish.vegan_option && <span> (<span className="vegan">V</span>)</span>}
                                            </h4>
                                            <p>{dish.description}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
export default Menu;