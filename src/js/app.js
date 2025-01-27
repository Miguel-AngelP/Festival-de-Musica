document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});




function iniciarApp() {
     navegacionFija();
     crearGaleria();
     scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        

        if( sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            console.log('Aun no')
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    
    enlaces.forEach( enlaces => {
        enlaces.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        })
    })
}


function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for( let i = 1;  i <= 12; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
                <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
                <!---->
                <img src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="imagen/avif">
            <source srcset="build/img/grande/${id}.webp" type="imagen/webp">
            <!---->
            <img src="build/img/grande/${id}.jpg" alt="Imagen Galeria">
    `;
        // Crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        overlay.onclick = () => {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        // Botón para cerrar el Modal

        const cerrarModal = document.createElement('P');       
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function(){
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);


        // Lo añade al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
    }