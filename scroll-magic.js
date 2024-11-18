$(document).ready(function() {
    // Crear el controlador de ScrollMagic
    var controller = new ScrollMagic.Controller();
  
    // Función para inicializar la animación según el tipo seleccionado
    function applyScrollMagicEffect(effectType) {
      $(".scroll-magic-element").each(function() {
        var tween;
        var scene = new ScrollMagic.Scene({
          triggerElement: this, // El elemento actual en la iteración
          triggerHook: 0.8,
          duration: "50%" // Ajustar la duración según prefieras
        });
  
        // Switch para seleccionar el tipo de animación
        switch (effectType) {
          case "parallax":
            tween = gsap.to(this, {
              y: "50%", 
              opacity: 1, 
              ease: "Power1.easeOut"
            });
            break;
  
          case "pin":
            scene.duration(300); // Duración específica para el pin
            scene.setPin(this); // Fija el elemento en su lugar
            break;
  
          case "fade":
            tween = gsap.fromTo(this, 
              { opacity: 0 },
              { opacity: 1, ease: "Power1.easeInOut" }
            );
            break;
  
          case "slide":
            tween = gsap.fromTo(this, 
              { x: "-100%" }, 
              { x: "0%", ease: "Power1.easeOut" }
            );
            break;
  
          case "scale":
            tween = gsap.fromTo(this, 
              { scale: 0.5 }, 
              { scale: 1, ease: "Power1.easeOut" }
            );
            break;
  
          case "rotate":
            tween = gsap.fromTo(this, 
              { rotation: 0 }, 
              { rotation: 360, ease: "Power1.easeOut" }
            );
            break;
  
          case "sequence":
            tween = gsap.timeline()
              .from(this, { opacity: 0, y: -50 })
              .to(this, { opacity: 1, y: 0 })
              .to(this, { x: 100, rotation: 90 });
            break;
  
          default:
            console.warn("Efecto no reconocido. Selecciona uno válido.");
            return;
        }
  
        // Añadir la animación a la escena si existe un tween
        if (tween) {
          scene.setTween(tween);
        }
  
        // Añadir la escena al controlador de ScrollMagic
        scene.addTo(controller);
      });
    }
  
    // Llamada a la función con el tipo de efecto, por ejemplo, "fade"
    applyScrollMagicEffect("fade"); // Cambia "fade" por el tipo de animación que prefieras
  });
  