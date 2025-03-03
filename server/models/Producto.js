const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  Id_Producto: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    default: 0,
  },
  empresa: {
    type: String,
    required: true,
  }
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
