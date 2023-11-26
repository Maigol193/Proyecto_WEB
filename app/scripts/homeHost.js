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
                                <a href="homeUser.html"
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
    if (user[0].name == "") {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user[0].email}</h5>
    `
    } else {
        html += `
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user[0].name}</h5>
    `
    }
    document.getElementById("h5Host").innerHTML = html;
}