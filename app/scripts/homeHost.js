const user = JSON.parse(sessionStorage.getItem("userData"));

function displayDropdown() {
    console.log(user);
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user.name}</div>
            <div class="truncate">${user.email}</div>
        </div>
        <ul class="px-1 text-sm" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <a href="home_loggeado.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">Change
                                    to User</a>
                            </li>
                        </ul>
                        <div class="py-0 px-1">
                            <a href="home.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">Sign
                                out</a>
                        </div>
    `
    document.getElementById("dropdownAvatar").innerHTML = html;
}

displayDropdown();

function displayUserCard() {
    let html = "";

    html += `
        <div id="h5Host">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user.name}</h5>
    </div>
    <span class="text-sm text-gray-500 dark:text-gray-400">Host</span>
    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
        style="padding: 10px;">
        <div class="flex items-baseline text-gray-900 dark:text-white flex justify-center">
            <span class="text-2xl font-extrabold tracking-tight">${user.alojamientos.length}</span>
            <span
                class="ms-1 text-sm font-normal text-gray-500 dark:text-gray-400">Alojamientos</span>
        </div>
    </div>
    `
    document.getElementById("DisplayCard").innerHTML = html;
}

async function displayAlojamientoCards() {
    const alojamientos = user.alojamientos;
    let i = 0;
    let html = "";
    for (const alojamiento of alojamientos) {
        try {
            await getAlojamiento(alojamiento);
            const actualAlojamiento = sessionStorage.getItem("alojamiento");
            const objectAlojamiento = JSON.parse(actualAlojamiento);
            let images = objectAlojamiento[0].images;
            html += `
            <div class="card carta_margin flex flex-inline">
            <h5 class="flex justify-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${objectAlojamiento[0].title}</h5>
        <div id="carouselId${i}" class="carousel slide" data-bs-ride="carousel" atribute_id_alojamiento="${objectAlojamiento[0]._id}">
        <ol class="carousel-indicators">
        <li data-bs-target="#carouselId${i}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
        <li data-bs-target="#carouselId${i}" data-bs-slide-to="1" aria-label="Second slide"></li>
        <li data-bs-target="#carouselId${i}" data-bs-slide-to="2" aria-label="Third slide"></li>
        <li data-bs-target="#carouselId${i}" data-bs-slide-to="3" aria-label="Forth slide"></li>
        <li data-bs-target="#carouselId${i}" data-bs-slide-to="4" aria-label="Fifth slide"></li>
    </ol>
    <div class="carousel-inner para_img" role="listbox">
        <div class="carousel-item active">
            <img src="${images[0]}" class="w-100 d-block" alt="First slide">
        </div>
        <div class="carousel-item">
            <img src="${images[1]}" class="w-100 d-block" alt="Second slide">
        </div>
        <div class="carousel-item">
            <img src="${images[2]}" class="w-100 d-block" alt="Third slide">
        </div>
        <div class="carousel-item">
            <img src="${images[3]}" class="w-100 d-block" alt="Forth slide">
        </div>
        <div class="carousel-item">
            <img src="${images[4]}" class="w-100 d-block" alt="Fifth slide">
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
        <div class="card-body" style="text-align: center">
            <p class="card-text" style="font-size: medium;">${objectAlojamiento[0].description}</p>
            <div class="flex space-x-4 mt-4">
                            <button id="primer-auth${i}" type="button"
                                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Editar</button>

                            <button id="botonEliminar${i}" type="button"
                                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Eliminar</button>
                        </div>
        </div>
    </div>
            `
            i++;
        } catch (error) {
            console.error("Error al obtener el alojamiento:", error);
        }
    }
    document.getElementById("gridCards").innerHTML = html;
    for (let c = 1; c < i; c++) {
        document.getElementById("primer-auth" + c).addEventListener("click", function () {
            var elemento = document.getElementById("carouselId" + c);
            var valorAtributo = elemento.getAttribute('atribute_id_alojamiento');
            window.location.href = 'edit_alojamiento.html';
            sessionStorage.setItem('id_aloj_edit', valorAtributo);
        });
    }
    for (let j = 0; j < i; j++) {
        document.getElementById("botonEliminar" + j).addEventListener("click", function () {
            const idHost = user._id;
            var elemento = document.getElementById("carouselId" + j);
            var idAlojamiento = elemento.getAttribute('atribute_id_alojamiento');
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', 'http://localhost:3000/alojamientos/delete_alojamiento');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("x-auth", "admin");
            const dataToDelete = {
                id: idAlojamiento,
                host: idHost
            };
            xhr.send(JSON.stringify(dataToDelete));
            xhr.onload = function () {
                if (xhr.status === 200) {
                    function mostrarAlerta() {
                        alert("Se ha borrado el alojamiento!!!");
                    }
                    mostrarAlerta();
                    console.log("Alojamiento borrado con éxito");
                    updateUserDataInStorage();
                } else {
                    console.error("Error al borrar el alojamiento");
                }
            };
        });
    }
}

function updateUserDataInStorage() {
    let ID_cliente = user._id;
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:3000/usuarios/get_by_id?_id=' + ID_cliente, true);
    xhr2.setRequestHeader("x-auth", "admin");
    xhr2.send();

    xhr2.onload = function () {
        if (xhr2.status == 200) {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem('userData', xhr2.responseText);
            window.location.reload();
        }
        else {
            alert(xhr2.status + ": " + xhr2.statusText);
        }
    };
}

function getAlojamiento(id) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/alojamientos/get_by_id?_id=' + id);
        xhr.setRequestHeader('x-auth', 'admin');
        xhr.send();
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("Alojamiento encontrado");
                console.log(xhr.responseText);
                sessionStorage.setItem('alojamiento', xhr.responseText);
                resolve();  // Resuelve la promesa cuando la solicitud está completa
            } else {
                console.log("No se encontró el alojamiento");
                reject();  // Rechaza la promesa en caso de error
            }
        };
    });
}

displayUserCard();
displayAlojamientoCards();