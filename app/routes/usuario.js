const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const esquemas = require("../../server");

//poner status 200 o 500

//GET usuario por email y contraseña
router.get('/user', (req,res) => {
    let email = req.body.email,
        password = req.body.password
    
    esquemas.Usuario.find({
        email: email,
        password: password
    }).then(function (docs) {
        if (docs.length > 0) {
            res.send(docs);
            console.log(docs);
        } else {
            res.status(404).send({ error: 'No se encontró el usuario' });
        }
    }).catch((err) => console.log(err));
});

//POST usuario
router.post('/create', (req,res) => {
    const newUser = req.body;
    const user = Usuario(newUser);
    user.save().then((doc) => res.send(doc));
});

//DELETE alojamiento siendo host
router.delete('/delete_alojamiento', (req,res) => {
    let id = req.body.id,
        toDelete = req.body.toDelete,
        alojamientos = req.body.alojamientos,
        object_to_update = {},
        flag_updated = false;
    
    if(toDelete != undefined){
        const index = alojamientos.findIndex(alj => alj == toDelete);
        if(index > -1){
            alojamientos.splice(index, 1);
            object_to_update.alojamientos = alojamientos;
            flag_updated = true;
        }
    }

    if(flag_updated){
        Usuario.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Se ha removido el alojamiento");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    } else{
        res.send("No se ha actualizado na'")
    }
});

//DELETE reservación siendo usuario
router.delete('/delete_reservacion', (req,res) => {
    let id = req.body.id,
        toDelete = req.body.toDelete,
        reservations = req.body.reservations,
        object_to_update = {},
        flag_updated = false;
    
    if(toDelete != undefined){
        const index = reservations.findIndex(rsv => rsv == toDelete);
        if(index > -1){
            reservations.splice(index, 1);
            object_to_update.reservations = reservations;
            flag_updated = true;
        }
    }

    if(flag_updated){
        Usuario.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Se ha removido la reservacion");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    } else{
        res.send("No se ha actualizado na'")
    }
});

//PUT del account
router.put('/edit_account', (req,res) => {
    let id = req.body.id,
        name = req.body.name,
        email = req.body.email,
        cellphone = req.body.cellphone,
        residencia = req.body.residencia,
        description = req.body.description,
        object_to_update = {},
        flag_updated = false;

    if(name != undefined){
        object_to_update.name = name;
        flag_updated = true;
    }
    if(email != undefined){
        object_to_update.email = email;
        flag_updated = true;
    }
    if(cellphone != undefined){
        object_to_update.cellphone = cellphone;
        flag_updated = true;
    }
    if(residencia != undefined){
        object_to_update.residencia = residencia;
        flag_updated = true;
    }
    if(description != undefined){
        object_to_update.description = description;
        flag_updated = true;
    }

    if(flag_updated){
        Usuario.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Usuario actualizado");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    }
    else{
        res.status(404).send("No se ha actualizado na'")
    }
});

//PUT de alojamientos (para aregar)
router.put('/add_alojamiento', (req,res) => {
    let id = req.body.id,
        newAlojamiento = req.body.newAlojamiento,
        alojamientos = req.body.alojamientos,
        object_to_update = {},
        flag_updated = false;
    
    alojamientos.push(newAlojamiento);
    object_to_update.alojamientos = alojamientos;
    flag_updated = true;

    if(flag_updated){
        Usuario.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Alojamientos actualizado");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    }
});


//PUT de reservaciones (para agregar)
router.put('/add_reservacion', (req,res) => {
    let id = req.body.id,
        newReservacion = req.body.newReservacion,
        reservations = req.body.reservations,
        object_to_update = {},
        flag_updated = false;
    
    reservations.push(newReservacion);
    object_to_update.reservations = reservations;
    flag_updated = true;

    if(flag_updated){
        Usuario.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc) => {
            console.log("Alojamientos actualizado");
            console.log(doc);
            res.send(doc);
        }).catch((err) => console.log(err));
    }
});


function add_alojamiento_to_User(id,newAlojamientos){
    Usuario.findByIdAndUpdate(id, { $push: { alojamientos: newAlojamientos } }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

function add_reservacion_to_User(id,newReservacion){
    Usuario.findByIdAndUpdate(id, { $push: { reservations: newReservacion } }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

function delete_alojamiento_from_User(id,alojamiento_to_err){
    console.log("hola");
    Usuario.findByIdAndUpdate(id, { $pull: { alojamientos: alojamiento_to_err} }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

function delete_reservacion_from_User(id,reservacion_to_err){
    console.log("hola");
    Usuario.findByIdAndUpdate(id, { $pull: { reservations: reservacion_to_err} }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

module.exports = router;