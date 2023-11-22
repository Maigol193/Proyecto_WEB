const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const esquemas = require("../../server");

//GET usuario por email y contraseña
router.get('/user', (req,res) => {
    let email = req.body.email,
        password = req.body.password
    
    esquemas.Usuario.find({
        email: email,
        password: password
    }).then(function (docs) {
        if (docs.length > 0) {
            res.status(200).send(docs);
            console.log(docs);
        } else {
            res.status(404).send({ error: 'No se encontró el usuario' });
        }
    }).catch((err) => console.log(err));
});

//POST usuario
router.post('/create', (req,res) => {
    const newUser = req.body;
    const user = esquemas.Usuario(newUser);
    user.save().then((doc) => res.send(doc));
});

//GET para todos
router.get('/get_all',(req,res)=>{
    esquemas.Alojamiento.find().then(function (docs) {
        if (docs.length > 0) {
            res.status(200).send(docs);
            console.log(docs);
        } else {
            res.status(404).send({ error: 'No se encontró el usuario' });
        }
    }).catch((err) => console.log(err));
});

//GET por filtro
router.get('/get_filtered', (req, res) => {
    let { categories, estado, title } = req.body;

    const filtro = {};

    if (categories && categories.length > 0) {filtro.categories = { $all: categories };}
    if (estado) {filtro.estado = new RegExp(estado, 'i');}
    if (title) {filtro.title = new RegExp(title,'i');}
    
    const query = Object.keys(filtro).length > 0 ? esquemas.Alojamiento.find(filtro) : esquemas.Alojamiento.find();
    query
        .then(docs => {
            res.send(docs);
            console.log(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error en la búsqueda');
        });
});

module.exports = router;