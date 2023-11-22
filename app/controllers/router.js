const express = require('express');
const alojamientos = require('../routes/alojamiento'); 
const reservacion = require('../routes/reservacion');
const usuario = require('../routes/usuario');
const sinAdmin = require('../routes/sinAdmin');

const router = express.Router();

function validateAdmin(req, res, next) {
  const header = req.get('x-auth');
  if(!header || header != 'admin'){
      res.status(403).send("Acceso no autorizado, inicie sesión o crea una cuenta");
  }
  next();
};


router.use('/sinAdmin',sinAdmin);
router.use('/usuarios',validateAdmin,usuario);
router.use('/alojamientos',validateAdmin,alojamientos);
router.use('/reservaciones',validateAdmin,reservacion);

module.exports = router;