$(document).ready(function () {
    const videosData = {
        dulces: [
            { title: "Video de Chocolates", src: "VIDEO.mp4", description: "Video mostrando variedades de chocolates." },
            { title: "Video de Caramelos", src: "VIDEO.mp4", description: "Video sobre caramelos surtidos." }
        ],
        cervezas: [
            { title: "Producción de Cerveza Clara", src: "VIDEO.mp4", description: "Cómo se produce la cerveza clara." },
            { title: "Producción de Cerveza Oscura", src: "VIDEO.mp4", description: "El proceso detrás de la cerveza oscura." }
        ],
        lacteos: [
            { title: "Productos Lácteos Frescos", src: "VIDEO.mp4", description: "Un vistazo a los productos lácteos frescos." }
        ],
        abarrotes: [
            { title: "Organización de Abarrotes", src: "VIDEO.mp4", description: "Consejos para organizar abarrotes." }
        ]
    };

    // Referencia al contenedor de videos
    const $videoContainer = $("#videoContainer");

    // Manejo del dropdown para cargar videos según la categoría seleccionada
    $("#categoryDropdown-videos .dropdown-item").on("click", function (event) {
        event.preventDefault();

        // Obtén la categoría seleccionada
        const category = $(this).data("category");
        const videos = videosData[category];

        // Limpia el contenedor actual
        $videoContainer.empty();

        // Renderiza los videos
        $.each(videos, function (index, video) {
            const videoCard = `
                <div class="col-md-6 col-lg-4">
                    <div class="card bg-dark text-white">
                        <video class="card-img-top" controls>
                            <source src="${video.src}" type="video/mp4">
                            Tu navegador no soporta videos.
                        </video>
                        <div class="card-body">
                            <h5 class="card-title">${video.title}</h5>
                            <p class="card-text">${video.description}</p>
                        </div>
                    </div>
                </div>
            `;
            $videoContainer.append(videoCard);
        });
    });
});
