const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a MongoDB exitosa!');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Detenemos el proceso si no podemos conectar
  }
};

module.exports = connectDB;
