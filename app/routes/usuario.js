const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

//Esquemas
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cellphone: {
        type: String
    },
    residencia: {
        type: String
    },
    alojamientos: {
        type: Array,
        default: []
    },
    isHost: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    reservations: {
        type: Array,
        default: []
    }
});

let Usuario = mongoose.model('usuarios',userSchema);

router.get('/')

router.post('/', (req,res) => {
    const newUser = req.body;
    const user = Usuario(newUser);
    //Guardamos el usuario en la BD (OJO, es asincrono)
    user.save().then((doc) => console.log("Usuario creado: ") + doc);
});


router.put('/add_alojamiento', (req,res) => {
    
    let id = req.body.id,
        newAlojamiento = req.body.newAlojamiento,
        alojamientos = req.body.alojamientos,
        object_to_update = {},
        flag_updated = false;
    
    console.log(id);
    console.log(newAlojamiento);
    console.log(alojamientos);
    
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

module.exports = router;