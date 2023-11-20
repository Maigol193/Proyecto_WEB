const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const add_alojamiento_to_User = require('./usuario');
const delete_alojamiento_from_User = require('./usuario');

//Esquemas
const alojamientoSchema = mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banos: {
        type: Number,
        min: 1,
        required: true
    },
    beds: {
        type: Number,
        min: 1,
        required: true
    },
    huespedes: {
        type: Number,
        min: 1,
        required: true
    },
    rooms: {
        type: Number,
        min: 1,
        required: true
    },
    categories: {
        type: Array,
        default: [],
        required: true
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    estado: {
        type: String,
        enum: ['Jalisco', 'Nuevo León', 'Baja California Sur'],
        required: true
    },
    reservaciones: {
        type: String
    }
});

let Alojamiento = mongoose.model('alojamientos',alojamientoSchema);

router.get('/get_all',(req,res)=>{
    Alojamiento.find().then(function (docs) {
        res.send(docs);
        console.log(docs);
    }).catch((err) => console.log(err));
}); //GET para todos

router.get('/get_filter') //GET por filtros

router.post('/create',(req,res) => {
    let newAlojamiento = req.body;
    let id_host = req.body.host;
    let aloj = Alojamiento(newAlojamiento);
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
        Alojamiento.findByIdAndUpdate(req.body.id,object_to_update,{new:true}).then((doc)=> {
            console.log(doc);
            res.send(doc);
        }).catch((err)=>console.log(err));
    }
});


router.delete('/delete_alojamiento',(req,res)=>{
    let id = req.body.id;
    let host = req.body.host;
    delete_alojamiento_from_User(host,id);
    Alojamiento.findByIdAndDelete(id).then((doc)=> {
        res.send(doc);
    }).catch((err)=>console.log(err));
});

module.exports = router;