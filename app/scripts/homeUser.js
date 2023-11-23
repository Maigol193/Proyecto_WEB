const user = JSON.parse(sessionStorage.getItem("userData"));

function displayDropdown() {
    const data = user[0];
    console.log(data)
    let html = `
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
            <div class="mb-1">${user[0].name}</div>
            <div class="truncate">${user[0].email}</div>
        </div>
    `
    document.getElementById("dropdownAvatar").innerHTML = html;
}

displayDropdown();

function arrayToObject(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[i] = arr[i];
    }
    return obj;
}