import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, CircularProgress } from "@mui/material";

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
    const [dishes, setDishes] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    const [amount, setAmount] = useState(1);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [clientIp, setClientIp] = useState("");
    const [loading, setLoading] = useState(true);

    const [categories] = useState(['Lunch Specials', 'Starters', 'Entrées', 'Desserts', 'Drinks'])
    const [images] = useState([bagel, bowl, bowl2, burger, cookies, eggs, pizza, salad, salmon])

    useEffect(() => {
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

        axios.get("https://alminpiric.pythonanywhere.com/api/get_ip/")
            .then((response) => setClientIp(response.data.ip))
            .catch((error) => console.error("Error fetching IP:", error));
    }, []);

    const handleOpen = (dish) => {
        setSelectedDish(dish);
        setAmount(1);
        setComment("");
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const addDishToOrder = () => {
        setOrderItems((prev) => [
            ...prev,
            { dish: selectedDish, amount, comment, price: selectedDish.price * amount },
        ]);
        handleClose();
    };


    const createOrder = () => {
        const orderData = {
            customer_name: "Sam Smith", //TEMP
            customer_phone: "111-555-2222", //TEMP
            comment: "", //TEMP
            order_dishes: orderItems.map((item) => ({
                dish: item.dish.id,
                amount: item.amount,
                comment: item.comment,
            })),
            tax: 2, //TEMP
            total: 4, //TEMP
            ip_address: clientIp,
        };

        axios
            .post("https://alminpiric.pythonanywhere.com/api/orders/new/", orderData)
            .then((response) => {
                console.log("Order created:", response.data);
                setOrderItems([]);
            })
                .catch((error) => console.error("Error creating order:", error));
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
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add {selectedDish?.name} to Order</DialogTitle>
                        <DialogContent>
                            <div className="dialog-container">
                                <div className="dialog-left">
                                    <label>Amount:</label>
                                    <label>Note:</label>
                                </div>
                                <div className="dialog-right">
                                    <input
                                        type="number"
                                        value={amount}
                                        min="1"
                                        onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
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

                    {orderItems.length > 0 && (
                        <div>
                            <h3>Order Summary</h3>
                            <ul>
                                {orderItems.map((item, index) => (
                                    <li key={index}>
                                        {item.amount} x {item.dish.name} ({item.comment || "No comment"})
                                    </li>
                                ))}
                            </ul>
                            <button onClick={createOrder}>Submit Order</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Order;