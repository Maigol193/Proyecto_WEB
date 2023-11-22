
var alojamientosJSON;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/alojamientos/get_all', true);
xhr.send();

xhr.onload = function () {
    if (xhr.status == 200) {
        alojamientosJSON = JSON.parse(xhr.responseText);
        alojamientosToDisplay(alojamientosJSON);
        console.table(alojamientosJSON);
    }
    else {
        alert(xhr.status + ": " + xhr.statusText);
    }
};


function alojamientosToDisplay(array) {
    console.table(alojamientosJSON);
    const alojamientos = array;
    let i=1;
    let html = "<div class='row inline-flex grid grid-cols-4'>";
    for (const alojamiento of alojamientos) {
        html += `
        <div class="card carta_margin">
        <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
                <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
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
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
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
            <button type="button" class="btn btn-primary btn-sm items-center inline-flex rounded" id="primer-auth${i}"> Reservar &nbsp; <i class="fa-solid fa-arrow-right fa-sm" style="color: #ffffff;"></i> </button>
        </div>
    </div>
            `
    i++;
    }
    document.getElementById("inicio-body").innerHTML = html;
    for (let c=1;c<i;c++){
    document.getElementById("primer-auth"+c).addEventListener("click", function () {
        document.getElementById("boton-auth").click();
      });
    }
}

