
let alojamientosJSON;


let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/alojamientos/get_all', true);
xhr.send();

xhr.onload = function () {
    if (xhr.status == 200) {
        alojamientosJSON = JSON.parse(xhr.responseText);
        alojamientosToDisplay(alojamientosJSON) //currentResults()
    }
};


function alojamientosToDisplay(array) {
    const alojamientos = array;
    let html = "<div class='row inline-flex grid grid-cols-4'>";
    for (const alojamiento of alojamientos) {
        html += `
            <div class="carta_margin" style="background-color: rgb(241 245 249)">
            <div id="indicators-carousel" class="relative" data-carousel="static">
                <!-- Carousel wrapper -->
                <div class="relative h-80 overflow-hidden rounded-t-lg" style="margin-top: 0px; height: 300px;">
                    <!-- Item 1 -->
                    <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
                        <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173"
                            class="absolute block w-full -translate-x-1/2 top-0 left-1/2" style="height: 300px;"
                            alt="...">
                    </div>
                    <!-- Item 2 -->
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173"
                            class="absolute block w-full -translate-x-1/2 top-0 left-1/2" style="height: 300px;"
                            alt="...">
                    </div>
                    <!-- Item 3 -->
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173"
                            class="absolute block w-full -translate-x-1/2 top-0 left-1/2" style="height: 300px;"
                            alt="...">
                    </div>
                    <!-- Item 4 -->
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173"
                            class="absolute block w-full -translate-x-1/2 top-0 left-1/2" style="height: 300px;"
                            alt="...">
                    </div>
                    <!-- Item 5 -->
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://images.adsttc.com/media/images/5a58/a650/f197/cc1f/8600/0173/newsletter/S3_CDS--5.jpg?1515759173"
                            class="absolute block w-full -translate-x-1/2 top-0 left-1/2" style="height: 300px;"
                            alt="...">
                    </div>
                </div>
                <!-- Slider indicators -->
                <div
                    class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                        data-carousel-slide-to="0"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                        data-carousel-slide-to="1"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                        data-carousel-slide-to="2"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
                        data-carousel-slide-to="3"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5"
                        data-carousel-slide-to="4"></button>
                </div>
                <!-- Slider controls -->
                <button type="button"
                    class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div>
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        ${alojamiento.title}</h5>
                </a>
                <p class="text-gray-700 dark:text-gray-400"
                    style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>$${alojamiento.price}</strong>
                    <a data-modal-toggle="authentication-modal"
                        style="margin-left: auto; margin-right: 5px; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);"
                        class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-400">
                        Reservar
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path style="color: rgb(255, 255, 255);" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </p>
            </div>
        </div>
            `
    }
    document.getElementById("inicio-body").innerHTML = html;
}

