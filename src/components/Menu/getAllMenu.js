import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrow icons
import { CiCircleInfo } from "react-icons/ci";

import foodModel from '../../Models/foodModel';
import menuModel from '../../Models/menuModel';
import orderModelFB from '../../Models/orderModelFB.js';
import orderModel from '../../Models/orderModel.js';
import styles from './GetAllMenu.module.css';

import swishLogo from '../../images/swishLogo.png';
import swishQR from '../../images/swish-QR-small.png';

const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Menu', 'Burger', 'Fries', 'Drink']); // Initialize with all categories
  const [infoMenu, setInfoMenu] = useState(null); // State for managing the info menu display
  const [customerInfo, setCustomerInfo] = useState({ name: '', phoneNumber: '', email: '', paymentChoice: '', creditCardNumber: '' }); // State for customer info form
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [showQRcode, setShowQRcode] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [paymentInfo, setShowPaymentInfo] = useState(false);
  const [formInfo, setShowFormInfo] = useState(false);
  const categories = ['Menu', 'Burger', 'Fries', 'Drink']; // Define categories
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      if (process.env.REACT_APP_ENV === 'prod') {
        const data = await foodModel.getAll();
        setMenus(data);
      } else {
        const data = await menuModel.getAll();
        setMenus(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToOrder = (id) => {
    setSelectedItems(prevState => [...prevState, id]);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prevState => prevState.filter(id => id !== itemId));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prevState => {
      if (prevState.includes(category)) {
        return prevState.filter(cat => cat !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  const isCategoryExpanded = (category) => {
    return expandedCategories.includes(category);
  };

  const showInfo = (menuId) => {
    const menu = menus.find(menu => menu.id === menuId);
    setInfoMenu(menu);
  };

  const hideInfo = () => {
    setInfoMenu(null);
  };

  const hidePayInfo = () => {
    setShowPaymentInfo(null);
  };

  const hideFormInfo = () => {
    setShowFormInfo(null);
  };

  const createOrder = async () => {
    try {
      const totalPrice = selectedItems.reduce((total, itemId) => {
        const selectedItem = menus.find(item => item.id === itemId);
        return selectedItem ? total + selectedItem.price : total;
      }, 0);

      const itemDetails = selectedItems.map(itemId => {
        const selectedItem = menus.find(item => item.id === itemId);
        return selectedItem ? { name: selectedItem.name, price: selectedItem.price } : null;
      });

      const validItems = itemDetails.filter(item => item !== null);

      // For production (Firebase)
      if (process.env.REACT_APP_ENV === 'prod') {
        const orderRef = await orderModelFB.create({
          customerName: customerInfo.name,
          email: customerInfo.email,
          phoneNumber: customerInfo.phoneNumber,
          items: validItems,
          totalPrice: totalPrice,
        });
        navigate(`/order/${orderRef}`);
      } else {
        const validItemsJSON = JSON.stringify(validItems);
        const orderRef = await orderModel.create({
          customerName: customerInfo.name,
          email: customerInfo.email,
          phoneNumber: customerInfo.phoneNumber,
          items: validItemsJSON,
          totalPrice: totalPrice,
        });
        navigate(`/order/${orderRef.orderId}`);
      }

      // Reset customer info and selected items
      setCustomerInfo({ name: '', phoneNumber: '', email: '', paymentChoice: '', creditCardNumber: '' });
      setSelectedItems([]);

      // Remove saved order data and last visited order page URL from localStorage
      localStorage.removeItem('savedOrderData');
      localStorage.removeItem('lastVisitedOrderPage');

    } catch (error) {
      console.error('Error creating order: ', error);
    }
  };

  return (
    <div>
      {/* If user clicks on ingredients information to the left of each meny */}
      {infoMenu && (
      <div className={styles.infoCardOverlay}>
        <div className={styles.infoCard}>
          <h3>{infoMenu.name}</h3>
          {process.env.ENV === 'prod' ? ( 
            <p>Ingredienser: {infoMenu.ingredients ? infoMenu.ingredients.join(', ') : ''}</p>
          ): (
            <p>Ingredienser: {infoMenu.ingredients}</p>
          )}
          <button onClick={hideInfo}>Close</button>
        </div>
      </div>
    )}
    {/* If user clicks on credit card information */}
    {paymentInfo && (
      <div className={styles.infoCardOverlay}>
        <div className={styles.infoCard}>
          <h3>How to add a correct credit card:</h3>
          <p>Example 1: XXXX-XXXX-XXXX-XXXX</p>
          <p>Example 2: AAAABBBBCCCCDDDD</p>
          <button onClick={hidePayInfo}>Close</button>
        </div>
      </div>
    )}
    {/* If the user clicks Send Order but did something in the form wrong */}
    {formInfo && (
      <div className={styles.infoCardOverlay}>
        <div className={styles.infoCard}>
          <h3>Check the inputs above and try again.</h3>
          <p>You need a name, mail, phonenumber and a valid pay method.</p>
          <button onClick={hideFormInfo}>Close</button>
        </div>
      </div>
    )}
    {/* Show all menues in their categories, with a clickable little button to show the ingredients and a button to add the item in the order*/}
      {categories.map(category => (
        <div key={category}>
          <h2 className={styles.AllMenuH2} onClick={() => toggleCategory(category)}>
          {category} {isCategoryExpanded(category) ? <FaChevronDown /> : <FaChevronUp />}
          </h2>
          <div className={`${styles.category} ${isCategoryExpanded(category) ? styles['category-expanded'] : styles['category-collapsed']}`}>
            <ul>
              {menus.filter(menu => menu.category === category).map(menu => (
                <li key={menu.id} className={styles.liMenu}>
                  <span onClick={() => showInfo(menu.id)}><CiCircleInfo /> </span>
                  {menu.name} - {menu.price} ---
                  <button className={styles.AddButton} onClick={() => handleAddToOrder(menu.id)}>Add to Order</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {/* Show all selected items */}
      <h2 className={`${styles.AllMenuH2} ${styles.selectedItems}`}>Selected Items</h2>
      <ul>
        {selectedItems.map((id, index) => {
          const selectedItem = menus.find(item => item.id === id);
          return (
            <li key={`${id}-${index}`} className={styles.liMenu}>
              {selectedItem.name} - {selectedItem.price} ---
              <button className={styles.AddButton} onClick={() => handleRemoveItem(id)}>Remove</button>
            </li>
          );
        })}
      </ul>
      {/* Order form */}
      {showForm ? (
        <div className={styles.userForm}>
          <h2 className={styles.AllMenuH2 && styles.submitOrderH2}>Enter and sumbit your order</h2>
          <input 
            className={styles.placeOrderInput}
            type="text"
            placeholder="Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
          <input 
            className={styles.placeOrderInput}
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phoneNumber}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })}
          />
          <input 
            className={styles.placeOrderInput}
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          />
          <select
            className={styles.placeOrderSelect}
            value={customerInfo.paymentChoice}
            onChange={(e) => setCustomerInfo({ ...customerInfo, paymentChoice: e.target.value })}
          >
            <option value="">Select Payment Option</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Swish">Swish</option>
            <option value="Atplace">Pay at deliver</option>
          </select>
        {/* If the user choosed Credit card, show the credit card input with a clickable information*/}
        {customerInfo.paymentChoice === "Credit Card" && (
          <div>
            <p className={styles.infoSpan}>Click circle for info </p>
            <span className={styles.infoSpan} onClick={() => setShowPaymentInfo(true)}><CiCircleInfo /> </span>
            <input 
                className={styles.placeOrderInput}
                type="text"
                placeholder="Credit Card Number"
                value={customerInfo.creditCardNumber}
                minLength={16}
                maxLength={19}
                onChange={(e) => {
                  const inputVal = e.target.value;
                  setCustomerInfo({ ...customerInfo, creditCardNumber: inputVal});
                  if (inputVal.length === 16) {
                    setIsPayed(true);
                  }
                }}
            />
          </div>
        )}
        {customerInfo.paymentChoice === "Swish" && !showQRcode && !isPayed && (
            <div>
                {/* Clickable Swish logo to get sent to the next part */}
                <img className={styles.logoImage} src={swishLogo} onClick={() => {setShowQRcode(true); }} alt="Swish Logo" />
            </div>
        )}
        {customerInfo.paymentChoice === "Swish" && showQRcode && !isPayed && (
            <div>
                {/* Clickable Swish image to get sent to the next part */}
                <p className={styles.infoTextSwish}>Click the image to continue</p>
                <img className={styles.qrImage} src={swishQR} onClick={() => {setIsPayed(true); }} alt="Swish QR" />

            </div>
        )}
        {/* Tells the user that i can now Send the order */}
        {customerInfo.paymentChoice === "Swish" && showQRcode && isPayed && (
            <div>
                <p className={styles.infoTextSwish}>You can now Send the order</p>
            </div>
        )}
          {/* Button to send the order if all statements is true */}
           <button 
              className={styles.placeOrder} 
              onClick={() => { 
                  if (customerInfo.email !== '' && customerInfo.name !== '' && customerInfo.phoneNumber !== '') {
                    if (customerInfo.paymentChoice === "Atplace" || customerInfo.paymentChoice === "Swish" || customerInfo.paymentChoice === "Credit Card") {
                      createOrder(); 
                      setShowForm(false);
                      }
                  } else {
                    setShowFormInfo(true);
                  }
              }}

          >
              Send Order
          </button>
        </div>
      ) : (
        <button className={styles.placeOrder} onClick={() => setShowForm(true)}>Place Order &rarr;</button>
      )}
    </div>
  );
};

export default AllMenus;