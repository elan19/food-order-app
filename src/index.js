import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import "path-browserify"; // Import the polyfill first

import Navbar from "./components/navbar/navbar.js";

//import firebaseDB from "./firebase.js";

import Home from "./views/Home/Home.js";
import Menu from './views/Menu/Menu.js';
import Order from './views/Order/Order.js';
import About from './views/About/About.js';
import Contact from './views/Contact/Contact.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
            <Router>
              <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/app" element={<App />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order/:orderId" element={<Order />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes >
            </Router >
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
