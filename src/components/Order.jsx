import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { MyContext } from '../App';
import Cookies from "js-cookie";

import bagel from '../assets/bagel.png';
import bowl from '../assets/bowl.png';
import bowl2 from '../assets/bowl2.png';
import burger from '../assets/burger.png';
import cookies from '../assets/cookies.png';
import eggs from '../assets/eggs.png';
import pizza from '../assets/pizza.png';
import salad from '../assets/salad.png';
import salmon from '../assets/salmon.png';

const Order = () => {
    const {orderItems, setOrderItems, handleCartButton} = useContext(MyContext);
    const [dishes, setDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    const [amount, setAmount] = useState(1);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [categories] = useState(['Lunch Specials', 'Starters', 'Entrées', 'Desserts', 'Drinks']);
    const [images] = useState([bagel, bowl, bowl2, burger, cookies, eggs, pizza, salad, salmon]);

    const navigate = useNavigate();

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

    useEffect(() => {
        if(orderItems.length > 0){
            Cookies.set("orderItems", JSON.stringify(orderItems), { expires: 1 });
            document.getElementById('cart-button').classList.add('cart-button');
        }else{
            Cookies.remove("orderItems");
            document.getElementById('cart-button').classList.remove('cart-button');
        }
    }, [orderItems]);

    const handleOpen = (dish) => {
        setSelectedDish(dish);
        setAmount(1);
        setComment("");
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const addDishToOrder = () => {
        if(!amount || amount < 1){
            alert("Please enter a valid amount.");
            return;
        }
        setOrderItems((prev) => {
            const existingItemIndex = prev.findIndex(item => item.dish.id === selectedDish.id);

            if(existingItemIndex !== -1){
                const updatedOrder = [...prev];
                updatedOrder[existingItemIndex] = {
                    ...updatedOrder[existingItemIndex],
                    amount: updatedOrder[existingItemIndex].amount + amount,
                    price: (updatedOrder[existingItemIndex].amount + amount) * selectedDish.price,
                    comment: updatedOrder[existingItemIndex].comment 
                        ? `${updatedOrder[existingItemIndex].comment}; ${comment}`
                        : comment
                };
                return updatedOrder;
            } 
            
            return [...prev, { dish: selectedDish, amount, comment, price: selectedDish.price * amount }];
        });
        handleClose();
    };

    return (
        <div className="order">
            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    {categories.map((category) => (
                        <div key={category}>
                            <h3 className="dish-category">~ {category} ~</h3>
                            <div className="dishes">
                                {dishes
                                    .filter((dish) => dish.category && dish.category.trim().toLowerCase() === category.toLowerCase())
                                    .map((dish) => (
                                        <div className="dish-card" key={dish.id} onClick={() => handleOpen(dish)}>
                                            <div className="image-container">
                                                <img src={images[dish.id % images.length]} alt="dish image" />
                                            </div>
                                            <div>
                                                <h3>{dish.name}</h3>
                                                <p>{dish.description}</p>
                                                <p>${dish.price}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                    <Dialog className="dialog-container" open={open} onClose={handleClose}>
                            <DialogContent>
                                <div><p className="dialog-title">Add {selectedDish?.name} to Order</p></div>
                                <div className="dialog-content">
                                    <div className="dialog-left">
                                        <label>Amount:</label>
                                        <label>Note:</label>
                                    </div>
                                    <div className="dialog-right">
                                        <input
                                            type="number"
                                            value={amount}
                                            min="1"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setAmount(value === "" ? "" : parseInt(value, 10));
                                            }}
                                        />
                                        <textarea
                                            placeholder="Add a comment (optional)"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button className="dialog-button" onClick={addDishToOrder}>Add to Order</button>
                            </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default Order;