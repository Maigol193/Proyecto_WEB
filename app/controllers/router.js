const express = require('express');
const productRouter = require('../routes/products'); 
const adminProductRouter = require('../routes/admin_products');
const router = express.Router();
function validateAdmin(req, res, next) {
    const adminHeader = req.headers['x-auth'];
    if (adminHeader && adminHeader === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  }
router.use('/products',productRouter);
router.use('/admin/products',validateAdmin,adminProductRouter);
