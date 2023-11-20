const express = require('express');
const alojamientos = require('../routes/alojamiento'); 
const reservacion = require('../routes/reservacion');
const usuario = require('../routes/usuario');

const router = express.Router();

/*
function validateAdmin(req, res, next) {
    const adminHeader = req.headers['x-auth'];
    if (adminHeader && adminHeader === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  }
*/

router.use('/reservaciones',reservacion);
router.use('/alojamientos',alojamientos);
router.use('/usuarios',usuario);

module.exports = router;