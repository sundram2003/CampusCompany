const mongoose = require('mongoose');

exports.dbConnect = async () => {
  try {
    const dbInfo = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database infomation: \n", dbInfo.connection.host, dbInfo.connection.port, dbInfo.connection.name)
    console.log('Database connected successfully.');
  }
  catch (error) {
    console.log('Database connection failed.');
    console.log(error);
  }
};