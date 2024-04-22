import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrow icons
import { CiCircleInfo } from "react-icons/ci";

import foodModel from '../../Models/foodModel';
import menuModel from '../../Models/menuModel';
import orderModelFB from '../../Models/orderModelFB.js';
import orderModel from '../../Models/orderModel.js';
import styles from './GetAllMenu.module.css';

const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Menu', 'Burger', 'Fries', 'Drink']); // Initialize with all categories
  const [infoMenu, setInfoMenu] = useState(null); // State for managing the info menu display
  const [customerInfo, setCustomerInfo] = useState({ name: '', phoneNumber: '', email: '' }); // State for customer info form
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const categories = ['Menu', 'Burger', 'Fries', 'Drink']; // Define categories
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      if (process.env.REACT_APP_ENV === 'prod') {
        const data = await foodModel.getAll();
        console.log(data);
        setMenus(data);
      } else {
        const data = await menuModel.getAll();
        console.log(data);
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

      console.log(validItems);

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
        console.log(orderRef.orderId);
        navigate(`/order/${orderRef.orderId}`);
      }



      // Reset customer info and selected items
      setCustomerInfo({ name: '', phoneNumber: '', email: '' });
      setSelectedItems([]);

      // Remove saved order data and last visited order page URL from localStorage
      localStorage.removeItem('savedOrderData');
      localStorage.removeItem('lastVisitedOrderPage');

      console.log(customerInfo);
    } catch (error) {
      console.error('Error creating order: ', error);
    }
  };

  return (
    <div>
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
          <button className={styles.placeOrder} onClick={() => { createOrder(); setShowForm(false); }}>Send Order</button>
        </div>
      ) : (
        <button className={styles.placeOrder} onClick={() => setShowForm(true)}>Place Order &rarr;</button>
      )}
    </div>
  );
};

export default AllMenus;