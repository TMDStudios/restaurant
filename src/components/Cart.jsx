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
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [confirm, setConfirm] = useState(true);

    const orderTotal = orderItems.reduce((sum, item) => sum + item.dish.price * item.amount, 0);

    useEffect(() => {
        axios.get("https://alminpiric.pythonanywhere.com/api/get_ip/")
            .then((response) => setClientIp(response.data.ip))
            .catch((error) => console.error("Error fetching IP:", error));
    }, []);

    const getConfirmation = _ => {
        setConfirm(true);
        handleOpen();
    }

    const clearOrder = (cancelled = true) => {
        setConfirm(false);
        setOrderItems([]);
        Cookies.remove("orderItems");

        const cartButton = document.getElementById('cart-button');
        if(cartButton) cartButton.classList.remove('cart-button');
        handleCartButton();

        if(cancelled){
            setDialogTitle("Order Cancelled");
            setDialogMessage("Your order has been cancelled.");
        }
    };

    const handleOrder = _ => {
        setConfirm(false);
        if(!/^[A-Za-z\s]{2,}$/.test(name.trim())){
            setDialogTitle("Invalid Name");
            setDialogMessage("Please enter a valid name (only letters and spaces, at least 2 characters).");
            handleOpen();
            return;
        }

        const sanitizedPhone = phone.trim().replace(/[\u2013\u2014\s]+/g, "-");
        if(!/^\d{3}-\d{3}-\d{4}$/.test(sanitizedPhone)){
            setDialogTitle("Invalid Phone Number");
            setDialogMessage("Please enter a valid phone number in the format xxx-xxx-xxxx.");
            handleOpen();
            return;
        }

        submitOrder();
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
                setDialogTitle("Order Complete");
                setDialogMessage("Thank you! Your order has been received.");
                handleOpen();
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                setLoading(false);
                setDialogTitle("Error");
                setDialogMessage("There was a problem submitting your order. Please try again later.");
                handleOpen();
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
                        <Dialog className="dialog-container" open={open} onClose={handleClose}>
                            <DialogContent>
                                <div><p className="dialog-title">Cancel Order?</p></div>
                                <div className="dialog-content">
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
                        <Dialog className="dialog-container" open={open} onClose={handleClose}>
                            <DialogContent>
                                <div><p className="dialog-title">{dialogTitle}</p></div>
                                <div className="dialog-content">
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
