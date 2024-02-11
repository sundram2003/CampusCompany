const express = require('express');
require('dotenv').config();
const app = express();
//middlewares
app.use(express.json());

//connection
const { dbConnect } = require('./src/config/db');
dbConnect();


const PORT = process.env.PORT || 8000;



/// routes setup
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/v1/auth', userRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

