const user = JSON.parse(sessionStorage.getItem("userData"));

function displayDropdown() {
    console.log(user);
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user[0].name}</div>
            <div class="truncate">${user[0].email}</div>
        </div>
        <ul class="px-1 text-sm" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <a href="perfil.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">Account</a>
                            </li>
                            <li>
                                <a href="home_host.html"
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

function displayReservations() {
    console.log("debug -1");
    const reservations = user[0].reservations;
    console.log(reservations);
    for (const reservation of reservations) {
        console.log("debug 0");
        console.log(reservation);
        const actualReservation = JSON.parse(getReservacion(reservation));
        console.log(actualReservation);
        if (reservation.status) {
            let html = "";
            console.log("debug 1");
            //const alojamiento = JSON.parse(getAlojamiento(reservation.alojamiento))
            console.log("debug 2");
            //console.log(alojamiento);
            const fecha = reservation.fechaEntrada;
            const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES");
            html += `
            <div>
                <div style="border-bottom: 1px solid gray;">
                    <p style="margin-left: 35px; margin-top: 5px; margin-bottom: 5px; font-size: large;"><b>${fechaFormateada}</b></p>
                </div>
                <div class="flex para_imagen justify-between">
                    <div class="flex">
                        <img class="rounded-lg" src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173" style="height: 150px; width: 200px;">
                            <div style="margin-left: 30px; color: gray;">
                                <p style="color: green;"><b>En curso</b></p>
                                <br>
                                <p style="color: #000000;"><b>ABC</b></p>
                                <p>3 noches</p>
                                <p>HUESPED</p>
                                <p>Total: 100 MXN</p>
                            </div>
                    </div>
                    <div style="margin-right: 30px; margin-top: 15px;">
                        <a href="reservacion.html" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detalles&nbsp;</a><br>
                            <button data-modal-target="modal-cancelar" data-modal-toggle="modal-cancelar" class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button type="button" style="margin-top: 15px; width: 200px;" data-modal-target="message_to_host" data-modal-toggle="message_to_host"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Contacta al Host</button>
                </div>
            </div>
            `
            document.getElementById("InProcess").innerHTML = html;
        } else {
            let html1 = "";
            //const alojamiento = JSON.parse(getAlojamiento(reservation.alojamiento));
            //console.log(alojamiento);
            const fecha = reservation.fechaEntrada;
            let idToString = reservation.alojamiento;
            let alojamiento = idToString.toString();
            const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES");
            let alojamientoToUse = getAlojamiento(alojamiento);
            console.log(alojamientoToUse);
            html1 += `
            <div>
                <div style="border-bottom: 1px solid gray;">
                    <p style="margin-left: 35px; margin-top: 5px; margin-bottom: 5px; font-size: large;"><b>${fechaFormateada}</b></p>
                </div>
                <div class="flex para_imagen justify-between">
                    <div class="flex">
                        <img class="rounded-lg" src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173" style="height: 150px; width: 200px;">
                            <div style="margin-left: 30px; color: gray;">
                                <p style="color: red;"><b>Terminado</b></p>
                                <br>
                                <p style="color: #000000;"><b>ABC</b></p>
                                <p>3 noches</p>
                                <p>HUESPED</p>
                                <p>Total: 100 MXN</p>
                            </div>
                    </div>
                    <div style="margin-right: 30px; margin-top: 15px;">
                        <a href="reservacion.html" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detalles&nbsp;</a><br>
                            <button data-modal-target="modal-cancelar" data-modal-toggle="modal-cancelar" class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </div>
            </div>
            `
            document.getElementById("Past").innerHTML = html1;
        }
    }
}

function getReservacion(id) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/reservaciones/reservation?_id='+id);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let reservacion = xhr.responseText;
            console.log(reservacion);
            return reservacion;
        } else {
            console.log("No se encontró el alojamiento");
        }
    };
}

function getAlojamiento(id) {
    let query = "";
    query = id;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/alojamientos/get_by_id?_id='+query);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let alojamiento = xhr.responseText;
            return alojamiento
        } else {
            console.log("No se encontró el alojamiento");
        }
    };
}

displayReservations();