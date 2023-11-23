var alojamientoJSON;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/alojamientos/get_by_id?_id=655e7dffc4b6d67fc525fd4e', true);
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

function loadDom(array){
    const alojamientos = array;
    console.table(array);
    for (const alojamiento of alojamientos) {
        var parrafo = document.getElementById("Aloj-huespedes");
        var parrafo2 = document.getElementById("Aloj-habitaciones");
        var parrafo3 = document.getElementById("Aloj-camas");
        var parrafo4 = document.getElementById("Aloj-banos");
        var parrafo5 = document.getElementById("Precio-Bold");
        var parrafo6 = document.getElementById("Precio-Unline");
        parrafo.textContent = alojamiento.huespedes;
        parrafo2.textContent = alojamiento.rooms;
        parrafo3.textContent = alojamiento.beds;
        parrafo4.textContent = alojamiento.banos;
        parrafo5.textContent = alojamiento.price;
        parrafo6.textContent = alojamiento.price;
    }
}

