const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  // Para parsear los cuerpos de las peticiones
app.use('/api/auth', authRoutes); // Agregar las rutas de autenticación al servidor

// Definir el puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
