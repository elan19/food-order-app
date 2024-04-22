const db = require('../databases/db.js');

const orderModel = {
  getAll: function (res) {
    const sql = 'SELECT * FROM "Order"';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Failed to fetch orders' });
      } else {
        // Parse the 'items' JSON string into an array of objects before sending response
        const orders = rows.map(row => ({
          ...row,
          items: JSON.parse(row.items)
        }));
        res.status(200).json(orders);
      }
    });
  },

  create: function (req, res) {
    //const { customerName, totalPrice, items } = req.body;
    console.log(req);
    const sql = 'INSERT INTO "Order" (customerName, phoneNumber, email, totalPrice, items) VALUES (?, ?, ?, ?, ?)';
    const params = [req.customerName, req.phoneNumber, req.email, req.totalPrice, req.items];
    //db.run(sql, [customerName, phoneNumber, email, totalPrice, JSON.stringify(items)], function(err) {
    db.run(sql, params, function (error) {
      if (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
      } else {
        res.status(201).json({ message: 'Order created successfully', orderId: this.lastID });
      }
    });
  },

  update: (orderId, orderData, res) => {
    const { customerName, totalPrice, items } = orderData;
    const sql = 'UPDATE "Order" SET customerName = ?, totalPrice = ?, items = ? WHERE orderId = ?';
    db.run(sql, [customerName, totalPrice, JSON.stringify(items), orderId], function(err) {
      if (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Failed to update order' });
      } else {
        res.status(200).json({ message: 'Order updated successfully', rowsAffected: this.changes });
      }
    });
  },

  delete: (orderId, res) => {
    const sql = 'DELETE FROM "Order" WHERE orderId = ?';
    db.run(sql, [orderId], function(err) {
      if (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Failed to delete order' });
      } else {
        res.status(200).json({ message: 'Order deleted successfully', rowsAffected: this.changes });
      }
    });
  },

  getOne: (orderId, res) => {
    const sql = 'SELECT * FROM "Order" WHERE id = ?';
    db.get(sql, [orderId], (err, row) => {
      if (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ message: 'Failed to fetch order' });
      } else if (!row) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        // Parse the 'items' JSON string into an array of objects before sending response
        row.items = JSON.parse(row.items);
        res.status(200).json(row);
      }
    });
  }
};

module.exports = orderModel;