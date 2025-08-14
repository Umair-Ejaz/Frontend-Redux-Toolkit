const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models'); // ✅ Correct import

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
  })
  .catch(err => {
    console.error('❌ Error: ' + err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
