import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { MyContext } from '../App';
import Cookies from "js-cookie";

const Cart = () => {
    const { orderItems, setOrderItems, handleCartButton } = useContext(MyContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [clientIp, setClientIp] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [confirm, setConfirm] = useState(true);

    useEffect(() => {
        handleCartButton();
        axios.get("https://alminpiric.pythonanywhere.com/api/get_ip/")
            .then((response) => setClientIp(response.data.ip))
            .catch((error) => console.error("Error fetching IP:", error));
    }, []);

    useEffect(() => {
        const total = orderItems.reduce((sum, item) => sum + item.dish.price * item.amount, 0);
        setOrderTotal(total);
    }, [orderItems]);
    
    const getConfirmation = _ => {
        setConfirm(true);
        handleOpen();
    }

    const clearOrder = (cancelled=true) => {
        setConfirm(false);
        setOrderItems([]);
        Cookies.remove("orderItems");
        document.getElementById('cart-button').classList.remove('cart-button');
        if(cancelled){
            setDialogTitle("Order Cancelled");
            setDialogMessage("Your order has been cancelled.");
        }
    }

    const handleOrder = _ => {
        setConfirm(false);
        if(name.length < 2 || !/^\d{3}-\d{3}-\d{4}$/.test(phone)){
            setDialogTitle("Invalid Name and/or Phone Number");
            setDialogMessage("Please provide your name and phone number (xxx-xxx-xxxx).");
        }else{
            submitOrder();
            setDialogTitle("Order Complete");
            setDialogMessage("Thank you! Your order has been received.");
        }
        handleOpen();
    }

    const handleOpen = _ => setOpen(true);
    const handleClose = _ => setOpen(false);

    const submitOrder = () => {
        setLoading(true);
        const orderData = {
            customer_name: name, 
            customer_phone: phone,
            comment: comment,
            order_dishes: orderItems.map((item) => ({
                dish: item.dish.id,
                amount: item.amount,
                comment: item.comment,
            })),
            tax: 0,
            total: orderTotal,
            ip_address: clientIp,
        };

        console.log(orderData)

        axios
            .post("https://alminpiric.pythonanywhere.com/api/orders/new/", orderData)
            .then((response) => {
                console.log("Order created:", response.data);
                clearOrder(false);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                setLoading(false);
            });
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
                    {confirm ? (
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Cancel Order?</DialogTitle>
                            <DialogContent>
                                <div className="dialog-container">
                                    <div>
                                        <p>Are you sure you want to cancel your current order?</p>
                                    </div>
                                </div>
                                <div className="cart-buttons">
                                    <button className="cancel" onClick={clearOrder}>Cancel Order</button>
                                    <button className="confirm" onClick={handleClose}>Return to Order</button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{dialogTitle}</DialogTitle>
                            <DialogContent>
                                <div className="dialog-container">
                                    <div>
                                        <p>{dialogMessage}</p>
                                    </div>
                                </div>
                                <button className="dialog-button" onClick={handleClose}>Close</button>
                            </DialogContent>
                        </Dialog>
                    )}
                    {orderItems.length > 0 ? (
                        <div className="cart">
                            <h3>Order Summary</h3>
                            <div>
                                {orderItems.map((item, index) => (
                                    <div className="cart-dish-card" key={index}>
                                        <div>
                                            <p className="cart-dish-card-amount">{item.amount}</p>
                                            <p>{item.dish.name}</p>
                                            <p className="cart-dish-card-price">${item.dish.price}</p>
                                        </div>
                                        <div>
                                            <p className="cart-dish-card-amount"></p>
                                            <p>Total: ${(item.dish.price * item.amount).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="cart-inputs">
                                <div className="cart-inputs-left">
                                    <label>Name:</label>
                                    <label>Phone:</label>
                                    <label>Note:</label>
                                </div>
                                <div className="cart-inputs-right">
                                    <input
                                        placeholder="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        placeholder="xxx-xxx-xxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Add a comment (optional)"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Subtotal: ${orderTotal.toFixed(2)}</p>
                                    <p>Tax: ${(orderTotal*0.09).toFixed(2)}</p>
                                    <p className="order-total">You Pay: ${(orderTotal+orderTotal*0.09).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart-buttons">
                                <button className="cancel" onClick={getConfirmation}>Clear Order</button>
                                <button className="confirm" onClick={handleOrder}>Submit Order</button>
                            </div>
                        </div>
                    ) : (
                        <div className="cart">
                            <div>
                                <h3>Order Summary</h3>
                                <p>Your cart is empty</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
