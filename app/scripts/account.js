const user = JSON.parse(sessionStorage.getItem("userData"));

function displayDropdown() {
    console.log(user);
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user[0].name}</div>
            <div class="truncate">${user[0].email}</div>
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

function displayUserCard() {
    let html = "";
    if (user[0].name == "") {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user[0].email}</h5>
    `
    } else {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user[0].name}</h5>
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
                <input id="iptName" type="text" disabled value="${user[0].name}"
                    class="border-0 bg-transparent w-full" maxlength="28">
            </dd>
        </div>
        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Correo
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptEmail" type="text" disabled value="${user[0].email}"
                    class="border-0 bg-transparent w-full" maxlength="35">
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Celular
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptCellphone" type="text" disabled value="${user[0].cellphone}"
                    class="border-0 bg-transparent w-full" maxlength="10">
            </dd>
        </div>
        <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 flex items-center">
                Vive en
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <input id="iptResidencia" type="text" disabled value="${user[0].residencia}"
                    class="border-0 bg-transparent w-full" maxlength="35">
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                Descripción
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
                ${user[0].description}
            </dd>
        </div>
    </dl>
    `
    document.getElementById("AccountInfo").innerHTML = html;
}

function displayAccountInfoHeader() {
    let html = "";
    if (user[0].name == "") {
        html += `
        <div>
            <h3 class="text-xl leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Detalles de ${user[0].email}
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
                Detalles de ${user[0].name}
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

displayDropdown();
displayUserCard();
displayAccountInfoHeader();
displayAccountInfo();

const editBtn = document.getElementById('editProfile');
const inputs = document.querySelectorAll('input[disabled]');

let isEditMode = false;

editBtn.addEventListener('click', function() {
    isEditMode = !isEditMode;

    // Cambiar el color del icono a rojo si estamos en modo de edición, de lo contrario, quitar el color
    const icon = editBtn.querySelector('i');
    icon.style.color = isEditMode ? 'red' : '#000000';

    // Habilitar/deshabilitar los inputs
    inputs.forEach((input) => {
        input.disabled = !isEditMode;
    });

    // Si estamos en modo de edición, guardar los valores actuales de los inputs
    if (!isEditMode) {
        inputs.forEach((input) => {
            // Solo actualizar el valor si el input no está vacío
            if (input.value.trim() !== '') {
                input.setAttribute('data-original-value', input.value);
            }
        });
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


