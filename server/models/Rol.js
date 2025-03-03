const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  permisos: {
    type: Map,
    of: Boolean,
    default: {
      ver: false,
      agregar: false,
      editar: false,
      eliminar: false,
    },
  },
});

const Rol = mongoose.model('Rol', rolSchema);
module.exports = Rol;
