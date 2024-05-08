const db = require('../databases/db.js');

const logModel = {
  getAll: (res) => {
    const sql = 'SELECT * FROM "Log"';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error fetching logs:', err);
        res.status(500).json({ message: 'Failed to fetch logs' });
      } else {
        res.status(200).json(rows);
      }
    });
  },

  /**
   * Create a new log entry in the database with the specified values.
   * @param {Object} log - The log object containing user_userid, scooterId, startTime, stopTime, returnTime, price, and totalPrice.
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  create: function (log, res) {
    const dateNow = new Date(log.startTime);
    const dateStartTimeString = dateNow.toLocaleString("sv-SE");
  
    const sql = 'INSERT INTO Log (user_userid, startTime, totalPrice) VALUES (?, ?, ?)';
    const params = [log.user_userid, dateStartTimeString, log.totalPrice];
  
    database.run(sql, params, function (error) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Log created successfully', logId: this.lastID });
      console.log('Log created successfully. Last inserted ID:', this.lastID);
    });
  },

  update: (logId, message, res) => {
    const sql = 'UPDATE "Log" SET message = ? WHERE logId = ?';
    db.run(sql, [message, logId], function(err) {
      if (err) {
        console.error('Error updating log:', err);
        res.status(500).json({ message: 'Failed to update log' });
      } else {
        res.status(200).json({ message: 'Log updated successfully', rowsAffected: this.changes });
      }
    });
  },

  delete: (logId, res) => {
    const sql = 'DELETE FROM "Log" WHERE logId = ?';
    db.run(sql, [logId], function(err) {
      if (err) {
        console.error('Error deleting log:', err);
        res.status(500).json({ message: 'Failed to delete log' });
      } else {
        res.status(200).json({ message: 'Log deleted successfully', rowsAffected: this.changes });
      }
    });
  },

  getOne: (logId, res) => {
    const sql = 'SELECT * FROM "Log" WHERE logId = ?';
    db.get(sql, [logId], (err, row) => {
      if (err) {
        console.error('Error fetching log:', err);
        res.status(500).json({ message: 'Failed to fetch log' });
      } else if (!row) {
        res.status(404).json({ message: 'Log not found' });
      } else {
        res.status(200).json(row);
      }
    });
  }
};

module.exports = logModel;