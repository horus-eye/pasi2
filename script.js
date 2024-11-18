(function(){

    $(document).ready(function () {
        // Inicializar tooltips
        $('[data-bs-toggle="tooltip"]').each(function () {
            new bootstrap.Tooltip($(this)[0]);
        });
        
        // Función para alternar el icono
        function toggleIcon(button) {
            const icon = button.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        
        // Hacer que la función esté disponible globalmente
        window.toggleIcon = toggleIcon;
    });

})()