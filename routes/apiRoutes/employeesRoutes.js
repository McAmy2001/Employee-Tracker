const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees
router.get('/employees', (req, res) => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single employee
router.get('/employees/:id', (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
  const params = [req.params.id];
  console.log(params);
   db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});


module.exports = router;