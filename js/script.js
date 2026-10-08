/* ========================================
   CALENDARI
   LES CABRES DE SANT PROCOPI
======================================== */


/* ========================================
   ACTIVITATS
======================================== */

const activitats = {

    "2026-09-19": {

        titol: "Cabratast",

        hora: "12:00",

        lloc: "Plaça de l'Ajuntament",

        descripcio:
            "Cabratast de Les Cabres de Sant Procopi. " +
            "A les 18:00 h, la festa va continuar amb el Vespreig " +
            "i DJ X3N0N.",

        enllac: "cabratast.html"

    },


    "2026-10-17": {

        titol: "Correfoc",

        hora: "21:30",

        lloc: "Plaça de l'Església",

        descripcio:
            "Correfoc de Les Cabres de Sant Procopi. " +
            "La nit continuarà amb el DJ X3N0N fins a la matinada.",

        enllac: "correfoc.html"

    }

};


/* ========================================
   VARIABLES DEL CALENDARI
======================================== */

let dataActual = new Date();

let mesActual = dataActual.getMonth();

let anyActual = dataActual.getFullYear();


/* ========================================
   NOMS DELS MESOS
======================================== */

const mesos = [

    "Gener",
    "Febrer",
    "Març",
    "Abril",
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Setembre",
    "Octubre",
    "Novembre",
    "Desembre"

];


/* ========================================
   ELEMENTS HTML
======================================== */

const mesAny =
    document.getElementById("mes-any");

const diesCalendari =
    document.getElementById("dies-calendari");

const informacioActivitat =
    document.getElementById("informacio-activitat");

const botoAnterior =
    document.getElementById("mes-anterior");

const botoSeguent =
    document.getElementById("mes-seguent");


/* ========================================
   GENERAR CALENDARI
======================================== */

function generarCalendari() {

    /* Si aquesta pàgina no té calendari,
       no fem res */

    if (
        !mesAny ||
        !diesCalendari
    ) {
        return;
    }


    /* Títol del mes */

    mesAny.textContent =
        mesos[mesActual] +
        " " +
        anyActual;


    /* Buidem els dies */

    diesCalendari.innerHTML = "";


    /* Primer dia del mes */

    const primerDia =
        new Date(
            anyActual,
            mesActual,
            1
        );


    /* Últim dia del mes */

    const ultimDia =
        new Date(
            anyActual,
            mesActual + 1,
            0
        );


    const nombreDies =
        ultimDia.getDate();


    /* Dia de la setmana */

    let primerDiaSetmana =
        primerDia.getDay();


    /* Convertim diumenge de 0 a 7 */

    if (
        primerDiaSetmana === 0
    ) {

        primerDiaSetmana = 7;

    }


    /* ====================================
       ESPAIS ABANS DEL DIA 1
    ==================================== */

    for (
        let i = 1;
        i < primerDiaSetmana;
        i++
    ) {

        const espai =
            document.createElement("div");

        espai.classList.add(
            "dia",
            "buit"
        );

        diesCalendari.appendChild(
            espai
        );

    }


    /* ====================================
       CREAR DIES
    ==================================== */

    for (
        let dia = 1;
        dia <= nombreDies;
        dia++
    ) {

        const elementDia =
            document.createElement("button");


        elementDia.classList.add(
            "dia"
        );


        /* Número del dia */

        elementDia.textContent =
            dia;


        /* Data en format YYYY-MM-DD */

        const dataClau =
            `${anyActual}-${String(
                mesActual + 1
            ).padStart(2, "0")}-${String(
                dia
            ).padStart(2, "0")}`;


        /* =================================
           ACTIVITAT
        ================================= */

        if (
            activitats[dataClau]
        ) {

            elementDia.classList.add(
                "te-activitat"
            );


            /* Data actual */

            const avui =
                new Date();

            avui.setHours(
                0,
                0,
                0,
                0
            );


            /* Data de l'activitat */

            const dataActivitat =
                new Date(
                    anyActual,
                    mesActual,
                    dia
                );

            dataActivitat.setHours(
                0,
                0,
                0,
                0
            );


            /* Span del text */

            const estat =
                document.createElement(
                    "span"
                );

            estat.classList.add(
                "estat-activitat"
            );


            /* =================================
               ACTIVITAT PASSADA
            ================================= */

            if (
                dataActivitat < avui
            ) {

                elementDia.classList.add(
                    "activitat-passada"
                );

                estat.textContent =
                    "FETA";

            }


            /* =================================
               ACTIVITAT FUTURA
            ================================= */

            else {

                elementDia.classList.add(
                    "activitat-futura"
                );

                estat.textContent =
                    "PRÒXIMA";

            }


            /* Afegim el text dins del botó */

            elementDia.appendChild(
                estat
            );

        }


        /* =================================
           AVUI
        ================================= */

        const avui =
            new Date();


        if (

            dia === avui.getDate() &&

            mesActual ===
            avui.getMonth() &&

            anyActual ===
            avui.getFullYear()

        ) {

            elementDia.classList.add(
                "avui"
            );

        }


        /* =================================
           CLICK
        ================================= */

        elementDia.addEventListener(
            "click",
            function () {

                mostrarInformacio(
                    dataClau,
                    dia
                );

            }
        );


        /* Afegim el botó */

        diesCalendari.appendChild(
            elementDia
        );

    }

}


/* ========================================
   MOSTRAR INFORMACIÓ
======================================== */

function mostrarInformacio(
    dataClau,
    dia
) {

    /* Si no tenim la caixa d'informació,
       sortim */

    if (
        !informacioActivitat
    ) {
        return;
    }


    /* ====================================
       HI HA ACTIVITAT
    ==================================== */

    if (
        activitats[dataClau]
    ) {

        const activitat =
            activitats[dataClau];


        informacioActivitat.innerHTML = `

            <div class="icona-calendari">
                🎆
            </div>

            <h2>
                ${activitat.titol}
            </h2>

            <div class="detalls-activitat">

                <p>
                    <strong>📅 Data:</strong>
                    ${dia}
                    de
                    ${mesos[mesActual]}
                    de
                    ${anyActual}
                </p>

                <p>
                    <strong>🕐 Hora:</strong>
                    ${activitat.hora}
                </p>

                <p>
                    <strong>📍 Lloc:</strong>
                    ${activitat.lloc}
                </p>

            </div>

            <p class="descripcio-activitat">

                ${activitat.descripcio}

            </p>

            <a
                href="${activitat.enllac}"
                class="boto boto-calendari-enllac"
            >
                MÉS INFORMACIÓ
            </a>

        `;

    }


    /* ====================================
       NO HI HA ACTIVITAT
    ==================================== */

    else {

        informacioActivitat.innerHTML = `

            <div class="icona-calendari">
                📅
            </div>

            <h2>
                ${dia}
                de
                ${mesos[mesActual]}
            </h2>

            <p>
                No hi ha cap activitat programada
                per aquest dia.
            </p>

        `;

    }

}


/* ========================================
   BOTÓ MES ANTERIOR
======================================== */

if (
    botoAnterior
) {

    botoAnterior.addEventListener(
        "click",
        function () {

            mesActual--;


            if (
                mesActual < 0
            ) {

                mesActual = 11;

                anyActual--;

            }


            generarCalendari();

        }
    );

}


/* ========================================
   BOTÓ MES SEGÜENT
======================================== */

if (
    botoSeguent
) {

    botoSeguent.addEventListener(
        "click",
        function () {

            mesActual++;


            if (
                mesActual > 11
            ) {

                mesActual = 0;

                anyActual++;

            }


            generarCalendari();

        }
    );

}


/* ========================================
   INICIAR
======================================== */

generarCalendari();