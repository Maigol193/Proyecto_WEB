const user = sessionStorage.getItem("userData");

function displayDropdown(){
    console.log(user);
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user.name}</div>
            <div class="truncate">${user.email}</div>
        </div>
    `
    document.getElementById("dropdownAvatar").innerHTML = html;
}

displayDropdown();