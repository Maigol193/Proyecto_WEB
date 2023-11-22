const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const esquemas = require("../../server");

function add_alojamiento_to_User(id,newAlojamiento){
    esquemas.Usuario.findByIdAndUpdate(id, { $push: { alojamientos: newAlojamiento } }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}

function delete_alojamiento_from_User(id,alojamiento_to_err){
    esquemas.Usuario.findByIdAndUpdate(id, { $pull: { alojamientos: alojamiento_to_err} }, {new: true}).then((doc)=> {
        console.log(doc);
    }).catch((err)=>console.log(err));
}


router.get('/get_all',(req,res)=>{
    esquemas.Alojamiento.find().then(function (docs) {
        if (docs.length > 0) {
            res.status(200).send(docs);
            console.log(docs);
        } else {
            res.status(404).send({ error: 'No se encontró el usuario' });
        }
    }).catch((err) => console.log(err));
}); //GET para todos

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

router.post('/create',(req,res) => {
    let newAlojamiento = req.body;
    let id_host = req.body.host;
    let aloj = esquemas.Alojamiento(newAlojamiento);
    aloj.save().then(doc => {
        aloj_id = doc._id.toString();
        add_alojamiento_to_User(id_host,aloj_id);
        res.status(200).send(doc);
        })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error al guardar el alojamiento');
    });
}); //POST alojamientos


router.put('/edit_alojamiecznto',(req,res)=>{
    let UserName = req.query.name;    
    let Estado = req.body.state;
    let categorias = req.body.category;

    User.find({
    Nombre: {$regex: UserName},
    Sexo:"H"
    }).then(function (docs) {
        res.send(docs);
        console.log(docs)
    }).catch((err)=> console.log(err)); 
});

router.put('/edit_alojamiento',(req,res)=>{
    let title = req.body.title,
        description = req.body.description,
        banos = req.body.banos,
        beds = req.body.beds,
        huespedes = req.body.huespedes,
        rooms = req.body.rooms,
        categories = req.body.categories,
        images = req.body.images,
        price = req.body.price,
        estado = req.body.estado
    
    let object_to_update = {};
    let flag_updated = false;

    if(title != undefined){
        object_to_update.title=title;
        object_to_update.description=description;
        object_to_update.banos=banos;
        object_to_update.beds=beds;
        object_to_update.huespedes=huespedes;
        object_to_update.rooms=rooms;
        object_to_update.categories=categories;
        object_to_update.images=images;
        object_to_update.price=price;
        object_to_update.estado=estado;
        flag_updated= true;
    }
    
    if(flag_updated){
        esquemas.Alojamiento.findByIdAndUpdate(req.body.id,object_to_update,{new:true}).then((doc)=> {
            console.log(doc);
            res.send(doc);
        }).catch((err)=>console.log(err));
    }
});


router.delete('/delete_alojamiento',(req,res)=>{
    let idAlojamiento = req.body.id;
    let host = req.body.host;
    esquemas.Alojamiento.findByIdAndDelete(idAlojamiento)
    .then(doc => {
        if (!doc) {
            res.status(404).send({ error: 'No se encontró el alojamiento con el ID proporcionado' });
        } else {
            delete_alojamiento_from_User(host,idAlojamiento);
            console.log("Alojamiento eliminado de la faz de la tierra");
            console.log(doc);
            res.send(doc);
        }
    })
    .catch((err) => console.log(err));
});

module.exports = router;