const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);




// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Server connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
});