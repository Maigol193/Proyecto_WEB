const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const esquemas = require("../../server");

function add_reservacion_to_User(id,newReservacion){
    esquemas.Usuario.findByIdAndUpdate(id, { $push: { reservations: newReservacion } }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

function delete_reservacion_from_User(id,reservacion_to_err){
    console.log("hola");
    esquemas.Usuario.findByIdAndUpdate(id, { $pull: { reservations: reservacion_to_err} }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

//GET reservacion por ID
router.get('/reservation', (req,res) => {
    let id = req.body.id;
    
    esquemas.Reservacion.find({
        _id: id,
    }).then(function (docs) {
        if (docs.length > 0) {
            res.send(docs);
            console.log(docs);
        } else {
            res.status(404).send({ error: 'No se encontró la reservación con el ID proporcionado' });
        }
    }).catch((err) => console.log(err));
});

 //POST de reservacion
router.post('/reserve', (req,res) => {
    let newReservacion = req.body;
    let id_cliente = req.body.cliente;
    let rsv = esquemas.Reservacion(newReservacion);
    rsv.save().then(doc => {
        rsv_id = doc._id.toString();
        add_reservacion_to_User(id_cliente,rsv_id);
        res.status(200).send(doc);
        })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error al guardar la reservacion');
    });
});

 //DELETE de reservacion por ID
 router.delete('/delete', (req, res) => {
    let idReservacion = req.body.id; // ID de la reservacion
    let idCliente = req.body.cliente; // ID del usuario que hizo la reservacion

    esquemas.Reservacion.findByIdAndDelete(idReservacion)
        .then(doc => {
            if (!doc) {
                res.status(404).send({ error: 'No se encontró la reservación con el ID proporcionado' });
            } else {
                delete_reservacion_from_User(idCliente, idReservacion);
                console.log("Reservacion eliminada de la faz de la tierra");
                console.log(doc);
                res.send(doc);
            }
        })
        .catch((err) => console.log(err));
});

module.exports = router;