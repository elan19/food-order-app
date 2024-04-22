-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Order";
DROP TABLE IF EXISTS "Menu";
DROP TABLE IF EXISTS "Log";

-- Create Order table
CREATE TABLE "Order" (
    id INTEGER PRIMARY KEY,
    customerName TEXT,
    phoneNumber INTEGER,
    email TEXT,
    totalPrice Float NOT NULL,
    items JSON -- Store items as JSON array [{name: cheese burger, price: 69}, {name: small fries, price: 15}, ...]
);

-- Create Menu table
CREATE TABLE "Menu" (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    ingredients TEXT,
    price FLOAT NOT NULL
);

-- Create Log table
CREATE TABLE "Log" (
    logId INTEGER PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    totalPrice Float NOT NULL,
    message TEXT
);