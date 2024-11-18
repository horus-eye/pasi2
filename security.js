document.addEventListener('DOMContentLoaded', () => { 
  'use strict';

  // Inicializa el textarea con longitud cero
  document.getElementById('validationCustom03').value = "";

  const form = document.querySelector('.needs-validation');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la redirección

    const emailField = document.getElementById('validationCustomUsername');
    const phoneField = document.getElementById('validationCustom02');
    const messageField = document.getElementById('validationCustom03');

    // Expresión regular para validar el correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(emailField.value);
    
    // Validación personalizada de cada campo
    if (!isEmailValid) {
      emailField.setCustomValidity('Correo inválido');
      event.stopPropagation();
    } else {
      emailField.setCustomValidity('');
    }

    const isPhoneValid = phoneField.value && !isNaN(phoneField.value);
    if (!isPhoneValid) {
      phoneField.setCustomValidity('Por favor, ingresa un número válido');
      event.stopPropagation();
    } else {
      phoneField.setCustomValidity('');
    }

    if (!messageField.value.trim()) {
      messageField.setCustomValidity('Este campo es requerido');
      event.stopPropagation();
    } else {
      messageField.setCustomValidity('');
    }

    if (form.checkValidity()) {
      try {
        // Envío de los datos a Formspree
        const response = await fetch('https://formspree.io/f/mldejbvl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailField.value,
            phone: phoneField.value,
            message: messageField.value
          })
        });

        if (response.ok) {
          // Recarga la página después del envío exitoso
          Swal.fire({
            icon: 'success',
            title: '¡ Su mensaje ha sido enviado correctamente !',
            text: 'Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.reload();
          });
        } else {
          throw new Error('Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Hubo un problema con el envío:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    }

    form.classList.add('was-validated');
  });
});


/* mi formulario de  de formspree -> mldejbvl */
/*formulario de PASI  de formspree -> mrbgpkpd */