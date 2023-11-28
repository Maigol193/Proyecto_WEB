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
                                <a href="perfil.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">Account</a>
                            </li>
                            <li>
                                <a id="ChangeHost" type="button""
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">Change
                                    to Host</a>
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

async function displayReservations() {
    console.log("debug -1");
    console.log(user);
    const reservations = user.reservations;
    console.log(reservations);
    if (reservations == "") {
        let html3 = `
        <h7 class="flex items-center justify-center" style="font-size:x-large; margin-top: 100px;"><b>No tienes reservaciones</b></h7>
        `
        document.getElementById("inicio-body").innerHTML = html3;
    }
    else {
        let html = "";
        let html1 = "";
        let i = 0;
        for (const reservation of reservations) {
            try {
                await getReservacion(reservation);
                const objectReservations = JSON.parse(sessionStorage.getItem("reservation"));
                const alojamiento = objectReservations[0].alojamiento;
                console.log("Alojamiento: " + alojamiento);
                try {
                    await getAlojamiento(alojamiento);
                    const actualAlojamiento = sessionStorage.getItem("alojamiento");
                    const objectAlojamiento = JSON.parse(actualAlojamiento);
                    console.log("Object Alojamiento: " + objectAlojamiento);
                    //Fechas
                    const fechaEntrada = objectReservations[0].fechaEntrada;
                    const fechaEntradaOriginal = new Date(fechaEntrada);
                    const fechaEntradaSumada = new Date(fechaEntradaOriginal);
                    fechaEntradaSumada.setDate(fechaEntradaOriginal.getDate() + 1);
                    const fechaCard = new Date(fechaEntradaSumada).toLocaleDateString("es-ES");
                    const fechaSalida = objectReservations[0].fechaSalida;
                    const fechaSalidaOriginal = new Date(fechaSalida);
                    const fechaSalidaSumada = new Date(fechaSalidaOriginal);
                    fechaSalidaSumada.setDate(fechaSalidaOriginal.getDate() + 1);
                    // Calcular la diferencia en días
                    const diferenciaEnMilisegundos = fechaSalidaSumada - fechaEntradaSumada;
                    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
                    let images = objectAlojamiento[0].images;
                    console.log(images);
                    console.log("Fecha: " + objectReservations[0].fechaEntrada);
                    console.log("Status: " + objectReservations[0].status);
                    if (objectReservations[0].status) {
                        html += `
            <div id="reservationCard${i}" atribute_id="${objectReservations[0]._id}">
                <div style="border-bottom: 1px solid gray;">
                    <p style="margin-left: 35px; margin-top: 5px; margin-bottom: 5px; font-size: large;"><b>${fechaCard}</b></p>
                </div>
                <div class="flex para_imagen justify-between">
                    <div class="flex">
                        <img class="rounded-lg" src="${images[0]}" style="height: 150px; width: 200px;">
                        <div style="margin-left: 30px; color: gray;">
                            <p style="color: green; margin: 5;"><b>En curso</b></p>
                            <p style="color: #000000; margin: 0;"><b>${objectAlojamiento[0].title}</b></p>
                            <p style="margin: 0;">${diferenciaEnDias} noches</p>
                            <p style="margin: 0;">${objectReservations[0].huespedes} huéspedes</p>
                            <p style="margin: 0;">Total: $${objectReservations[0].totalPrice} MXN</p>
                        </div>
                    </div>
                    <div style="margin-right: 30px; margin-top: 15px;">
                        <a id="detalles${i}" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detalles&nbsp;</a><br>
                        <button type="button" id="btnCancelar${i}" class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </div>
            </div>
            <br>
            `
                        i++;
                    } else {
                        html1 += `
            <div id="reservationCard${i}" atribute_id="${objectReservations[0]._id}">
                <div style="border-bottom: 1px solid gray;">
                    <p style="margin-left: 35px; margin-top: 5px; margin-bottom: 5px; font-size: large;"><b>${fechaCard}</b></p>
                </div>
                <div class="flex para_imagen justify-between">
                    <div class="flex">
                        <img class="rounded-lg" src="${images[0]}" style="height: 150px; width: 200px;">
                        <div style="margin-left: 30px; color: gray;">
                            <p style="color: red; margin: 5;"><b>Terminado</b></p>
                            <p style="color: #000000; margin: 0;"><b>Alojamiento en la playa para una familia, en Puerto Vallarta</b></p>
                            <p style="margin: 0;">${diferenciaEnDias} noches</p>
                            <p style="margin: 0;">${objectReservations[0].huespedes} huéspedes</p>
                            <p style="margin: 0;">Total: $${objectReservations[0].totalPrice} MXN</p>
                        </div>
                    </div>
                    <div style="margin-right: 30px; margin-top: 15px;">
                        <a href="reservacion.html" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detalles&nbsp;</a><br>
                    </div>
                </div>
            </div>
            <br>
            `
                        i++;
                    }
                } catch (error) {
                    console.error("Error al obtener el alojamiento:", error);
                }
            } catch (error) {
                console.error("Error al obtener la reservación:", error);
            }
        }
        document.getElementById("InProcess").innerHTML = html;
        document.getElementById("Past").innerHTML = html1;
        for (let c = 0; c < i; c++) {
            document.getElementById("detalles" + c).addEventListener("click", function () {
                const reservaciones = user.reservations;
                let idRes = reservaciones[c];
                getReservacion(idRes);
                const objectReservation = JSON.parse(sessionStorage.getItem("reservation"));
                console.log(objectReservation[0].alojamiento);
                getAlojamiento(objectReservation[0].alojamiento);
                window.location.href = 'reservacion.html';
            });
        }
        for (let d = 0; d < i; d++) {
            document.getElementById("btnCancelar" + d).addEventListener("click", function () {
                console.log("quiero cancelar " + d);
                const reservaciones = user.reservations;
                let idRes = reservaciones[d];
                console.log("id res: " + idRes);
                getReservacion(idRes);
                const objectReservation = JSON.parse(sessionStorage.getItem("reservation"));
                console.log("Cliente: " + objectReservation[0].cliente);
                let idCli = objectReservation[0].cliente;
                const newDelete =
                {
                    id: idRes,
                    cliente: idCli
                };
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', 'http://localhost:3000/reservaciones/delete');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader("x-auth", "admin");
                xhr.send(JSON.stringify(newDelete));
                xhr.onload = function () {
                    if (xhr.status == 200){
                        console.log("Reservacion borrada");
                        updateUserDataInStorage();
                    }else{
                        console.log("no se borro nada")
                    }
                };
                //
            });
        }
    }
}

function updateUserDataInStorage(){
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

function getReservacion(id) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/reservaciones/reservation?_id=' + id);
        xhr.setRequestHeader('x-auth', 'admin');
        xhr.send();
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("Reservación encontrada");
                console.log(JSON.parse(xhr.responseText));
                sessionStorage.setItem('reservation', xhr.responseText);
                resolve();  // Resuelve la promesa cuando la solicitud está completa
            } else {
                console.log("No se encontró la reservacion");
                reject();  // Rechaza la promesa en caso de error
            }
        };
    });
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
                console.log("No se encontró la reservacion");
                reject();  // Rechaza la promesa en caso de error
            }
        };
    });
}

displayReservations();

const changeToHostBtn = document.getElementById('ChangeHost');

changeToHostBtn.addEventListener('click', function () {
    event.preventDefault();
    console.log("Intentando cambiar a host");
    if (user.isHost) {
        window.location.href = "home_host.html";
    }
    else {
        window.location.reload();
    }
});