var alojamientoJSON;

const alojamiento = JSON.parse(sessionStorage.getItem('alojamiento'));
const reservacion = JSON.parse(sessionStorage.getItem('reservation'));
console.log(alojamiento);
console.log(reservacion[0]._id);
const idAlojRes = alojamiento[0]._id;
const user = JSON.parse(sessionStorage.getItem("userData"));
console.log('Valor de id_aloj_res:', idAlojRes);

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/alojamientos/get_by_id?_id=' + idAlojRes, true);
xhr.setRequestHeader("x-auth", "admin");
xhr.send();

xhr.onload = function () {
    if (xhr.status == 200) {
        alojamientoJSON = JSON.parse(xhr.responseText);
        loadDom(alojamientoJSON);
    }
    else {
        alert(xhr.status + ": " + xhr.statusText);
    }
};

var Precio_por_noche;
var ID_host;
var ID_cliente = user._id
var total;

function loadDom(array) {
    const alojamientos = array;
    console.table(array);
    for (const alojamiento of alojamientos) {
        total = (alojamiento.price)+150+1600;
        Precio_por_noche = alojamiento.price;
        ID_host = alojamiento.host;
        var parrafo = document.getElementById("Aloj-huespedes");
        var parrafo2 = document.getElementById("Aloj-habitaciones");
        var parrafo3 = document.getElementById("Aloj-camas");
        var parrafo4 = document.getElementById("Aloj-banos");
        var parrafo5 = document.getElementById("Precio-Bold");
        var parrafo6 = document.getElementById("Precio-Unline");
        var parrafo7 = document.getElementById("Aloj-title");
        var parrafo8 = document.getElementById("Aloj-Description");
        var parrafo15 = document.getElementById("Aloj-Ubi");
        var parrafo9 = document.getElementById("Img1");
        var parrafo10 = document.getElementById("Img2");
        var parrafo11 = document.getElementById("Img3");
        var parrafo12 = document.getElementById("Img4");
        var parrafo13 = document.getElementById("Img5");
        var parrafo14 = document.getElementById("min_Husepedes");
        parrafo.textContent = alojamiento.huespedes;
        parrafo2.textContent = alojamiento.rooms;
        parrafo3.textContent = alojamiento.beds;
        parrafo4.textContent = alojamiento.banos;
        parrafo5.textContent = alojamiento.price;
        parrafo6.textContent = alojamiento.price;
        parrafo7.textContent = alojamiento.title;
        parrafo8.textContent = alojamiento.description;
        parrafo15.textContent = alojamiento.ubicacion;
        parrafo9.src = alojamiento.images[0];
        parrafo10.src = alojamiento.images[1];
        parrafo11.src = alojamiento.images[2];
        parrafo12.src = alojamiento.images[3];
        parrafo13.src = alojamiento.images[4];
        parrafo14.max = alojamiento.huespedes;

        var Precio_multi = document.getElementById("Precio_multi");
        Precio_multi.textContent = Precio_por_noche;
        var Precio_total = document.getElementById("Precio_total");
        Precio_total.textContent = Precio_por_noche + 150 + 1600;
        Obtain_Host_Name(alojamiento.host);

    }
}

var fechaLlegadaInput = document.getElementById('fecha_de_llegada');
var fechaSalidaInput = document.getElementById('fecha_de_salida');

var fechaActual = new Date(reservacion[0].fechaEntrada);
fechaActual.setDate(fechaActual.getDate());
var formatoFechaActual = fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD
fechaLlegadaInput.value = formatoFechaActual;
fechaLlegadaInput.min = formatoFechaActual;

var fechaLlegada = new Date(formatoFechaActual);
var fechaSalida = new Date(reservacion[0].fechaSalida);

fechaSalida.setDate(fechaSalida.getDate());
fechaSalidaInput.valueAsDate = fechaSalida;
var minFechaSalida = fechaSalida.toISOString().split('T')[0];
fechaSalidaInput.min = minFechaSalida
fechaSalidaInput.addEventListener('change', calcularDiferenciaDias);

fechaLlegadaInput.disabled = true;
fechaSalidaInput.disabled = true;

var huespedes = document.getElementById('min_Husepedes');
huespedes.disabled = true;

document.getElementById("min_Husepedes").value = reservacion[0].huespedes;

// Función para calcular la diferencia de días
function calcularDiferenciaDias() {
    var fechaLlegada = new Date(fechaLlegadaInput.value);
    var fechaSalida = new Date(fechaSalidaInput.value);
    var tiempoDiferencia = fechaSalida.getTime() - fechaLlegada.getTime();
    diferenciaDias = tiempoDiferencia / (1000 * 3600 * 24);
    var Dias_res = document.getElementById("Dias_res");
    Dias_res.textContent = diferenciaDias;
    var Precio_multi = document.getElementById("Precio_multi");
    Precio_multi.textContent = diferenciaDias * Precio_por_noche;
    var Precio_total = document.getElementById("Precio_total");
    Precio_total.textContent = (diferenciaDias * Precio_por_noche) + 150 + 1600;
    total = (diferenciaDias * Precio_por_noche) + 150 + 1600;
    document.getElementById('fecha_de_llegada'); 
    document.getElementById('fecha_de_salida');
}

function Obtain_Host_Name(id){
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:3000/usuarios/get_by_id?_id=' + id, true);
    xhr2.setRequestHeader("x-auth", "admin");
    xhr2.send();

    xhr2.onload = function () {
        if (xhr2.status == 200) {
            var alojamientoJSON2 = JSON.parse(xhr2.responseText);
            Pass_host_name_to_html(alojamientoJSON2);
        }
        else {
            alert(xhr2.status + ": " + xhr2.statusText);
        }
    };
}

function Pass_host_name_to_html(array){
    var usuarios = array;
    var host_name = document.getElementById("host_name");
    host_name.textContent = usuarios.name;
    var host_residence = document.getElementById("host_residence");
    host_residence.textContent = usuarios.residencia;
}



function see(){
    console.log(ID_host, ID_cliente,total);
}

function hacer_reservacion(){

    var huspedes_act = document.getElementById("min_Husepedes");
    var fechaLlegada_act = document.getElementById('fecha_de_llegada');
    var fechaSalida_act = document.getElementById('fecha_de_salida');
    var huspedesValue = huspedes_act.value;
    var fechaLlegadaValue = fechaLlegada_act.value;
    var fechaSalidaValue = fechaSalida_act.value;


    let ResData = {
        status: true,
        fechaEntrada: fechaLlegadaValue,
        fechaSalida: fechaSalidaValue,
        alojamiento: idAlojRes,
        host: ID_host,
        cliente: ID_cliente,
        huespedes: huspedesValue,
        totalPrice: total
    };

    let ResDataJSON = JSON.stringify(ResData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/reservaciones/reserve');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(ResDataJSON);
    xhr.onload = function () {
        if (xhr.status === 200) {
            updateUserDataInStorage();
            console.log("Reservacion creada con éxito");
        } else {
            console.error("Error al crear la reservacion");
        }
    };
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
            window.location.href = 'home_loggeado.html';
        }
        else {
            alert(xhr2.status + ": " + xhr2.statusText);
        }
    };
}