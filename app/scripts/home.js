
var alojamientosJSON;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/sinAdmin/get_all', true);
xhr.send();

xhr.onload = function () {
    if (xhr.status == 200) {
        alojamientosJSON = JSON.parse(xhr.responseText);
        alojamientosToDisplay(alojamientosJSON);
    }
    else {
        alert(xhr.status + ": " + xhr.statusText);
    }
};


function alojamientosToDisplay(array) {
    const alojamientos = array;
    let i = 1;
    let html = "<div class='row inline-flex grid grid-cols-4'>";
    for (const alojamiento of alojamientos) {
        html += `
        <div class="card carta_margin flex flex-inline">
        <div id="carouselId${i}" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#carouselId${i}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
                <li data-bs-target="#carouselId${i}" data-bs-slide-to="1" aria-label="Second slide"></li>
                <li data-bs-target="#carouselId${i}" data-bs-slide-to="2" aria-label="Third slide"></li>
            </ol>
            <div class="carousel-inner para_img" role="listbox">
                <div class="carousel-item active">
                    <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173" class="w-100 d-block" alt="First slide">
                </div>
                <div class="carousel-item">
                    <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173" class="w-100 d-block" alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173" class="w-100 d-block" alt="Third slide">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId${i}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselId${i}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="card-body">
            <h4 class="card-title">${alojamiento.title}</h4>
            <p class="card-text">${alojamiento.description}</p>
            <p class="flex items-center justify-between">
                <b>Precio por noche</b>
                <b>$${alojamiento.price}</b>
            </p>
            <p class="flex items-center justify-between">
            <b></b>
            <button type="button" class="btn btn-dark btn-sm items-center inline-flex rounded" id="primer-auth${i}"> Reservar &nbsp; <i class="fa-solid fa-arrow-right fa-sm" style="color: #ffffff;"></i> </button>
            </p>
        </div>
    </div>
            `
        i++;
    }
    document.getElementById("inicio-body").innerHTML = html;
    for (let c = 1; c < i; c++) {
        document.getElementById("primer-auth" + c).addEventListener("click", function () {
            document.getElementById("boton-auth").click();
        });
    }
}

var filtroCategorias=[];

function toggleFiltro(boton) {
    boton.classList.toggle("active");
    boton.style.backgroundColor = boton.classList.contains("active") ? "grey" : "initial";
    var botonesActivos = document.querySelectorAll('.active');

  var categoriasActivas = Array.from(botonesActivos).map(function(botonActivo) {
    return botonActivo.getAttribute('category');
  });

  categoriasActivas = categoriasActivas.filter(function(categoria) {
    return categoria !== null;
  });
  filtroCategorias = categoriasActivas;
  imprimirFiltros();
}

var filtroEstado="";

function cambiarTexto(nuevoTexto) {
    var dropdownButton = document.getElementById("dropdown-button");
    filtroEstado=nuevoTexto;
    dropdownButton.innerHTML = nuevoTexto;
    imprimirFiltros();
}

var filtroBusqueda="";

function capturarSearchInput() {
    var inputSearch = document.getElementById("search-dropdown").value;
    filtroBusqueda=inputSearch;
    imprimirFiltros();
  }
  
function imprimirFiltros(){
    console.log("entro");
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:3000/sinAdmin/get_filtered?categories=Popular&estado=&title=');
    xhr2.send();
    xhr2.onload = function () {
        if (xhr2.status == 200) {
            let alojamientosJSON2 = JSON.parse(xhr2.responseText);
            console.log(alojamientosJSON2);
            alojamientosToDisplay(alojamientosJSON2);
        }
        else {
            alert(xhr2.status + ": " + xhr2.statusText);
        }
    };
}

