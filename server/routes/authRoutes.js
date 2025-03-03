const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    
    const usuario = new Usuario({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol,
    });

    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

module.exports = router;
