
document.addEventListener("DOMContentLoaded", function () {
    const carpetaImatges = "imatges/";

    // Fotografies 4, 5 i 6
    const fotosGaleria = [
        "foto4.jpg",
        "foto5.jpg",
        "foto6.jpg"
    ];

    // Fotografies 7 a 11 per al carrusel
    const fotosCarrusel = [
        "foto7.jpg",
        "foto8.jpg",
        "foto9.jpg",
        "foto10.jpg",
        "foto11.jpg"
    ];

    // Galeria principal
    const galeria = document.getElementById("galeria-fotos");

    if (galeria) {
        fotosGaleria.forEach(function (foto) {
            const enllac = document.createElement("a");
            enllac.href = carpetaImatges + foto;
            enllac.target = "_blank";
            enllac.rel = "noopener";

            const imatge = document.createElement("img");
            imatge.src = carpetaImatges + foto;
            imatge.alt = "Fotografia de Les Cabres de Sant Procopi";
            imatge.loading = "lazy";

            enllac.appendChild(imatge);
            galeria.appendChild(enllac);
        });
    }

    // Carrusel de fotografies
    const carrusel = document.getElementById("carrusel-fotos");

    if (carrusel) {
        fotosCarrusel.forEach(function (foto, index) {
            const imatge = document.createElement("img");
            imatge.src = carpetaImatges + foto;
            imatge.alt = "Fotografia " + (index + 7) + " de Les Cabres";
            imatge.className = "foto-carrusel";
            imatge.loading = "lazy";

            carrusel.appendChild(imatge);
        });

        const fotos = carrusel.querySelectorAll(".foto-carrusel");
        let actual = 0;

        function mostrarFoto(index) {
            actual = (index + fotos.length) % fotos.length;

            fotos.forEach(function (foto, i) {
                foto.classList.toggle("activa", i === actual);
            });
        }

        const anterior = document.getElementById("foto-anterior");
        const seguent = document.getElementById("foto-seguent");

        if (anterior) {
            anterior.addEventListener("click", function () {
                mostrarFoto(actual - 1);
            });
        }

        if (seguent) {
            seguent.addEventListener("click", function () {
                mostrarFoto(actual + 1);
            });
        }

        mostrarFoto(0);
    }
});
