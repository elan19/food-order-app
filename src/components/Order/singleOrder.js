import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderModelFB from '../../Models/orderModelFB.js';
import orderModel from '../../Models/orderModel.js';
import styles from './SingleOrder.module.css';

const SingleOrder = () => {
    const [order, setOrder] = useState(null);
    const { orderId } = useParams(); // Get the orderId from the URL parameters

    // Function to load order data from localStorage
    const loadOrderDataFromStorage = () => {
        const savedOrderData = localStorage.getItem('savedOrderData');
        if (savedOrderData) {
            return JSON.parse(savedOrderData);
        }
        return null;
    };

    useEffect(() => {
        // Fetch order data using the orderId
        const fetchOrder = async () => {
            try {
                if (process.env.REACT_APP_ENV === 'prod') {
                    const orderData = await orderModelFB.getOne(orderId);
                    console.log(orderData);
                    setOrder(orderData);
                    localStorage.setItem('savedOrderData', JSON.stringify(orderData));
                  } else {
                    const orderData = await orderModel.getOne(orderId);
                    console.log(orderData);
                    setOrder(orderData);
                    localStorage.setItem('savedOrderData', JSON.stringify(orderData));
                  }
                // Save order data to localStorage
                // Save the URL of the last visited order page
                localStorage.setItem('lastVisitedOrderPage', window.location.href);
            } catch (error) {
                console.error('Error fetching order:', error);
                // Optionally, navigate to an error page or display an error message
            }
        };

        // Check if there's saved order data in localStorage
        const savedOrderData = loadOrderDataFromStorage();
        if (savedOrderData) {
            setOrder(savedOrderData);
        } else {
            fetchOrder();
        }

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, [orderId]);

    useEffect(() => {
        // Check if there's a stored URL for the last visited order page
        const lastVisitedOrderPage = localStorage.getItem('lastVisitedOrderPage');
        if (lastVisitedOrderPage && lastVisitedOrderPage !== window.location.href) {
            // Redirect the user to the last visited order page
            window.location.href = lastVisitedOrderPage;
        }
    }, []);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.singleOrder}>
            <h2 className={styles.customerDetailsH2}>Order ID:</h2> <p className={styles.customerDetails}>{orderId}</p>
            {/* Display all data from the order */}
            <div className={styles.detail}>
                <h2 className={styles.customerDetailsH2}>Customer Name:</h2> <p className={styles.customerDetails}>{order.customerName}</p>
                <h2 className={styles.customerDetailsH2}>Phone number:</h2> <p className={styles.customerDetails}>{order.phoneNumber}</p>
                <h2 className={styles.customerDetailsH2}>Email:</h2> <p className={styles.customerDetails}>{order.email}</p>
            </div>
            <div className={styles.items}>
                <h2 className={styles.itemsH2}>Items:</h2>
                <ul>
                    {order.items && order.items.map((item, index) => (
                        <li key={index}>{item.name} - {item.price}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2><span className={styles.totalPriceH2}>Total Price: </span> {order.totalPrice} kr</h2>
            </div>
        </div>
    );
};

export default SingleOrder;
