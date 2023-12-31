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
                                <a href="my_reservations.html"
                                class="dropdown-item text-sm hover-bg-gray-100 dark-hover-bg-gray-600 dark-text-gray-200 dark-hover-text-white">My
                                    Reservations</a>
                            </li>
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

const changeToHostBtn = document.getElementById('ChangeHost');

changeToHostBtn.addEventListener('click', function () {
    event.preventDefault();
    console.log("Intentando cambiar a host");
    if(user.isHost){
        window.location.href = "home_host.html";
    }
    else{
        alert("jaja no ere jos");
        window.location.reload();
    }
});