const user = JSON.parse(sessionStorage.getItem("userData"));

function displayDropdown() {
    console.log(user);
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user.name}</div>
            <div class="truncate">${user.email}</div>
        </div>
        <ul class="px-1 text-sm" aria-labelledby="dropdownUserAvatarButtonAccount">
                            <li>
                                <a href="my_reservations.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">My
                                    Reservations</a>
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
    document.getElementById("dropdownAvatarAccount").innerHTML = html;
}

displayDropdown();

function displayUserCard() {
    let html = "";
    if (user.name == "") {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user.email}</h5>
    `
    } else {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user.name}</h5>
    `
    }
    document.getElementById("h5Account").innerHTML = html;
}

function displayAccountInfo() {
    let html = `
    <dl>
        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Nombre
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptName" type="text" disabled value="${user.name}"
                    class="border-0 bg-transparent w-full" maxlength="28">
            </dd>
        </div>
        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Correo
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptEmail" type="text" disabled value="${user.email}"
                    class="border-0 bg-transparent w-full" maxlength="35">
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Celular
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptCellphone" type="text" disabled value="${user.cellphone}"
                    class="border-0 bg-transparent w-full" maxlength="10">
            </dd>
        </div>
        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Vive en
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptResidencia" type="text" disabled value="${user.residencia}"
                    class="border-0 bg-transparent w-full" maxlength="35">
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                Descripción
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
                ${user.description}
            </dd>
        </div>
    </dl>
    `
    document.getElementById("AccountInfo").innerHTML = html;
}

function displayAccountInfoHeader() {
    let html = "";
    if (user.name == "") {
        html += `
        <div>
            <h3 class="text-xl leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Detalles de ${user.email}
            </p>
        </div>
        <button id="editProfile"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:outline-none" type="button"
            style="background: none;">
            <i class="fa-solid fa-pencil fa-2xl" style="color: #000000;"></i>
        </button>
    `
    } else {
        html += `
        <div>
            <h3 class="text-xl leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Detalles de ${user.name}
            </p>
        </div>
        <button id="editProfile"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:outline-none" type="button"
            style="background: none;">
            <i class="fa-solid fa-pencil fa-2xl" style="color: #000000;"></i>
        </button>
    `
    }
    document.getElementById("AccountInfoHeader").innerHTML = html;
}

displayUserCard();
displayAccountInfoHeader();
displayAccountInfo();

const editBtn = document.getElementById('editProfile');
const inputs = document.querySelectorAll('input[disabled]');

let isEditMode = false;
let isDataModified = false; // Bandera para verificar si se ha modificado algún dato

editBtn.addEventListener('click', function() {
    isEditMode = !isEditMode;
    const icon = editBtn.querySelector('i');
    icon.style.color = isEditMode ? 'green' : '#000000';

    // Habilitar/deshabilitar los inputs
    inputs.forEach((input) => {
        input.disabled = !isEditMode;
    });

    // Si estamos en modo de edición, guardar los valores actuales de los inputs
    if (!isEditMode) {
        inputs.forEach((input) => {
            input.setAttribute('data-original-value', input.value);

            // Actualizar el campo correspondiente en el usuario sin el 'ipt' al inicio
            const field = input.id.replace('ipt', '').toLowerCase();
            const originalValue = input.getAttribute('data-original-value');
            
            if (user[field] !== originalValue) {
                isDataModified = true;
            }

            user[field] = input.value;
        });

        // Actualizar sessionStorage con los datos actualizados
        sessionStorage.setItem('userData', JSON.stringify(user));

        // Si no se ha modificado ningún dato, evita recargar la página
        if (!isDataModified) {
            return;
        }

        let id = user._id;
        let name = user.name;
        let email = user.email;
        let cellphone = user.cellphone;
        let residencia = user.residencia;

        let userData = {
            id: id,
            name: name,
            email: email,
            cellphone: cellphone,
            residencia: residencia
        };

        let userDataJSON = JSON.stringify(userData);

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:3000/usuarios/edit_account');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(userDataJSON);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Usuario actualizado con éxito");
            } else {
                console.error("Error al actualizar el usuario");
            }
        };
        window.location.reload();
    } else {
        // Si estamos saliendo del modo de edición, restaurar los valores originales de los inputs
        inputs.forEach((input) => {
            const originalValue = input.getAttribute('data-original-value');
            if (originalValue !== null) {
                input.value = originalValue;
            }
        });
    }
});
