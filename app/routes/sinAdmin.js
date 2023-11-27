const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const esquemas = require("../../server");
const bcrypt = require("bcrypt");

// ...

router.get('/user', async (req, res) => {
    try {
        let { email, password } = req.query;

        const user = await esquemas.Usuario.findOne({ email });

        if (!user) {
            return res.status(404).send('No se encontraron resultados');
        }

        // Compara la contraseña proporcionada con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Si la contraseña coincide, devuelve el usuario
            res.status(200).send(user);
        } else {
            // Si la contraseña no coincide, devuelve un error
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).send('Error interno del servidor');
    }
});



    /*
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
    */

//POST usuario
router.post('/create', async (req, res) => {
    try {
        const newUser = req.body;
        
        // Genera un hash de la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        // Reemplaza la contraseña en texto plano con el hash
        newUser.password = hashedPassword;

        const user = esquemas.Usuario(newUser);

        // Guarda el usuario en la base de datos
        const savedUser = await user.save();

        res.status(200).send(savedUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

//GET para todos
router.get('/get_all',(req,res)=>{
    esquemas.Alojamiento.find().then(function (docs) {
        if (docs.length > 0) {
            res.status(200).send(docs);
        } else {
            res.status(404).send({ error: 'No se encontró el usuario' });
        }
    }).catch((err) => console.log(err));
});

//GET por filtro
router.get('/get_filtered', (req, res) => {
    let { categories, estado, title } = req.query;

    const filtro = {};

    if (categories && categories.length > 0) {filtro.categories = { $all: categories };}
    if (estado) {filtro.estado = new RegExp(estado, 'i');}
    if (title) {filtro.title = new RegExp(title,'i');}
    
    const query = Object.keys(filtro).length > 0 ? esquemas.Alojamiento.find(filtro) : esquemas.Alojamiento.find();
    query
        .then(docs => {
            console.log(docs);
            res.send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error en la búsqueda');
        });
});

module.exports = router;