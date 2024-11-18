$(document).ready(function () {
    // Datos de imágenes en formato JSON
    const galleryData = {
        "dulces": [
            { "title": "Chocolate", "src": "./images/bg1.jpg", "description": "Chocolate negro" },
            { "title": "Caramelos", "src": "./images/bg1.jpg", "description": "Caramelos surtidos" },
            { "title": "Gomitas", "src": "./images/bg1.jpg", "description": "Gomitas de sabores" }
        ],
        "cervezas": [
            { "title": "Cerveza Clara", "src": "./images/bg1.jpg", "description": "Cerveza clara" },
            { "title": "Cerveza Oscura", "src": "./images/bg1.jpg", "description": "Cerveza oscura" },
            { "title": "Cerveza Lager", "src": "./images/bg1.jpg", "description": "Cerveza lager artesanal" }
        ],
        "lacteos": [
            { "title": "Leche", "src": "./images/bg1.jpg", "description": "Leche entera" },
            { "title": "Queso", "src": "./images/bg1.jpg", "description": "Queso cheddar" },
            { "title": "Yogurt", "src": "./images/bg1.jpg", "description": "Yogurt griego natural" }
        ],
        "abarrotes": [
            { "title": "Arroz", "src": "./images/bg1.jpg", "description": "Arroz blanco" },
            { "title": "Frijoles", "src": "./images/bg1.jpg", "description": "Frijoles negros" },
            { "title": "Aceite", "src": "./images/bg1.jpg", "description": "Aceite de oliva extra virgen" }
        ]
    };

    let currentCategory = [];
    let currentIndex = 0;

    // Función para renderizar la galería
    function renderGallery(category) {
        const images = galleryData[category];
        const $gallery = $("#gallery");
        $gallery.empty(); // Limpiar la galería

        if (images) {
            currentCategory = images;
            $.each(images, function (index, image) {
                const galleryItem = `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gallery-item">
                        <img src="${image.src}" data-index="${index}" alt="${image.title}">
                        <span class="zoom-icon"><i class="fas fa-search-plus"></i></span>
                    </div>
                `;
                $gallery.append(galleryItem);
            });
        } else {
            $gallery.append("<p class='text-center'>No hay imágenes en esta categoría.</p>");
        }
    }

    // Mostrar imagen en el modal
    function showImage(index) {
        const image = currentCategory[index];
        $("#lightboxImage").attr("src", image.src);
        $("#imageTitle").text(image.title);
        $("#imageDescription").text(image.description);
        currentIndex = index;
    }

    // Evento para el dropdown
    $('#categoryDropdown a').on('click', function (e) {
        e.preventDefault();
        const category = $(this).data('category');
        renderGallery(category);
    });

    // Evento para abrir el modal con la imagen seleccionada
    $('#gallery').on('click', 'img', function () {
        const index = $(this).data('index');
        showImage(index);
        $('#lightboxModal').modal('show');
    });

    // Evento para el botón de "prev" y "next"
    $('#prevBtn').on('click', function () {
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : currentCategory.length - 1;
        showImage(newIndex);
    });

    $('#nextBtn').on('click', function () {
        const newIndex = (currentIndex < currentCategory.length - 1) ? currentIndex + 1 : 0;
        showImage(newIndex);
    });

    // Agregar efecto de zoom cuando se haga clic en la imagen dentro del modal (para resoluciones pequeñas)
    $(window).on("resize", function () {
        if (window.innerWidth <= 768) {
            $("#lightboxImage").off("click").on("click", function () {
                $(this).toggleClass("zoom-effect");
            });
        } else {
            // Si la resolución es mayor, eliminar el efecto de zoom
            $("#lightboxImage").off("click");
        }
    }).trigger("resize"); // Ejecutar en la carga inicial para manejar el evento correctamente
});
