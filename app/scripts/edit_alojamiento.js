//const user = JSON.parse(sessionStorage.getItem("userData"));
//var ID_cliente = user._id;
var ID_alojamiento = "6564fada347911add6c3c062";
var ID_cliente = "6564fada347911add6c3c062";
console.log(ID_cliente);


let xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'http://localhost:3000/usuarios/get_by_id?_id=' + ID_cliente, true);
xhr2.setRequestHeader("x-auth", "admin");
xhr2.send();

xhr2.onload = function () {
    if (xhr2.status == 200) {
        var NovoUsuario = JSON.parse(xhr2.responseText);
        console.log(NovoUsuario);
        console.log(NovoUsuario[0]._id);
        Pass_host_name_to_html(NovoUsuario);
    }
    else {
        alert(xhr2.status + ": " + xhr2.statusText);
    }
};

function Pass_host_name_to_html(array){
    var usuarios = array;
    for (const usuario of usuarios) {
        var host_name = document.getElementById("Usuario_name");
        host_name.textContent = usuario.name;
        var host_residence = document.getElementById("Usuario_ubi");
        host_residence.textContent = "Vive en: " + usuario.residencia;
    }
}

var filtroEstado = "Jalisco";

function cambiarTexto(nuevoTexto) {
    var dropdownButton = document.getElementById("dropdown-button");
    filtroEstado = nuevoTexto;
    dropdownButton.innerHTML = nuevoTexto;
}

function updateUserDataInStorage(){
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:3000/usuarios/get_by_id?_id=' + ID_cliente, true);
    xhr2.setRequestHeader("x-auth", "admin");
    xhr2.send();

    xhr2.onload = function () {
        if (xhr2.status == 200) {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem('userData', xhr2.responseText);
        }
        else {
            alert(xhr2.status + ": " + xhr2.statusText);
        }
    };
}

function printTodo() {

    var Titulo_html = document.getElementById("Titulo");
    var Ubicacion_html = document.getElementById('Ubicacion');
    var Banos_html = document.getElementById('Banos');
    var Habitaciones_html = document.getElementById('Habitaciones');
    var Huespedes_html = document.getElementById('Huespedes');
    var Camas_html = document.getElementById('Camas');
    var Price_html = document.getElementById('Price');
    var Img1_html = document.getElementById('Img1');
    var Img2_html = document.getElementById('Img2');
    var Img3_html = document.getElementById('Img3');
    var Img4_html = document.getElementById('Img4');
    var Img5_html = document.getElementById('Img5');
    var Description_html = document.getElementById('Descripcion');
    var DescripcionValues = Description_html.value;
    var TituloValue = Titulo_html.value;
    var UbicacionValue = Ubicacion_html.value;
    var BanosValue = Banos_html.value;
    var HabitacionesValue = Habitaciones_html.value;
    var HuespedesValue = Huespedes_html.value;
    var CamasValue = Camas_html.value;
    var PriceValue = Price_html.value;
    var Img1Value = Img1_html.value;
    var Img2Value = Img2_html.value;
    var Img3Value = Img3_html.value;
    var Img4Value = Img4_html.value;
    var Img5Value = Img5_html.value;

    // Obtener todas las checkbox dentro del ul con id "Category_checkbox"
    var checkboxes = document.querySelectorAll('.pl');

    // Filtrar las checkbox seleccionadas
    var checkboxSeleccionadas = Array.from(checkboxes).filter(function (checkbox) {
        return checkbox.checked;
    });

    // Obtener las IDs de las checkbox seleccionadas
    var idsSeleccionados = checkboxSeleccionadas.map(function (checkbox) {
        return checkbox.id;
    });

    var images_array = [];
    images_array.push(Img1Value);
    images_array.push(Img2Value);
    images_array.push(Img3Value);
    images_array.push(Img4Value);
    images_array.push(Img5Value);

    let AloData = {
        host:ID_cliente,
        title: TituloValue,
        ubicacion: UbicacionValue,
        description: DescripcionValues,
        banos: BanosValue,
        beds: CamasValue,
        huespedes: HuespedesValue,
        rooms: HabitacionesValue,
        categories: idsSeleccionados,
        images: ["imagen1.png","imagen1.png","imagen1.png","imagen1.png","imagen1.png"],
        price: PriceValue,
        estado: filtroEstado,
        reservaciones: []
    };

    console.log(AloData);

    /*
    let AloDataJSON = JSON.stringify(AloData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/alojamientos/create');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(AloDataJSON);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Alojamiento creado con éxito");
            updateUserDataInStorage();
        } else {
            console.error("Error al crear el alojamiento");
        }
    };*/
}



document.getElementById('miFormulario').addEventListener('submit', function(event) {
    // Evitar la recarga de la página
    event.preventDefault();
    printTodo();
});