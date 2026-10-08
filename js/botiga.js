// ===============================
// PRODUCTES DE LA BOTIGA
// ===============================

const productes = [
    {
        id: "samarreta",
        nom: "Samarreta",
        preu: 12,
        imatge: "imatges/Samarreta.png",
        opcions: ["S", "M", "L", "XL", "2XL", "3XL"],
        tipusOpcio: "Talla"
    },
    {
        id: "mocador",
        nom: "Mocador",
        preu: 12,
        imatge: "imatges/Mocador.png"
    },
    {
        id: "encenedor",
        nom: "Encenedor",
        preu: 1.5,
        imatge: "imatges/Encendedors.png",
        opcions: ["Blanc", "Vermell", "Rosa", "Blau", "Groc"],
        tipusOpcio: "Color"
    },
    {
        id: "clauer",
        nom: "Clauer",
        preu: 2.5,
        imatge: "imatges/Clauer.png"
    },
    {
        id: "adhesius",
        nom: "Adhesius",
        preu: 1.5,
        imatge: "imatges/Adhesiu.jpg"
    }
];

let carret = [];


// ===============================
// FORMAT PREU
// ===============================

function formatarPreu(preu) {
    return preu.toFixed(2).replace(".", ",") + " €";
}


// ===============================
// MOSTRAR PRODUCTES
// ===============================

function mostrarProductes() {

    const contenidor = document.getElementById("productes-botiga");

    if (!contenidor) return;

    contenidor.innerHTML = "";

    productes.forEach(producte => {

        const targeta = document.createElement("article");
        targeta.className = "producte";

        let selectorOpcio = "";

        if (producte.opcions) {

            selectorOpcio = `
                <label>
                    ${producte.tipusOpcio}:
                    <select class="opcio-producte" data-id="${producte.id}">
                        ${producte.opcions.map(opcio =>
                `<option value="${opcio}">${opcio}</option>`
            ).join("")}
                    </select>
                </label>
            `;
        }

        targeta.innerHTML = `
            <div class="imatge-producte">
                <img src="${producte.imatge}" alt="${producte.nom}">
            </div>

            <div class="informacio-producte">

                <h3>${producte.nom}</h3>

                <p class="preu-producte">
                    ${formatarPreu(producte.preu)}
                </p>

                ${selectorOpcio}

                <button
                    class="boto boto-afegir"
                    data-id="${producte.id}">
                    AFEGIR AL CARRET
                </button>

            </div>
        `;

        contenidor.appendChild(targeta);
    });

    document.querySelectorAll(".boto-afegir").forEach(boto => {

        boto.addEventListener("click", function () {

            const id = this.dataset.id;

            const producte = productes.find(p => p.id === id);

            if (!producte) return;

            let opcio = "";

            if (producte.opcions) {

                const selector = document.querySelector(
                    `.opcio-producte[data-id="${id}"]`
                );

                opcio = selector.value;
            }

            afegirAlCarret(producte, opcio);
        });
    });
}


// ===============================
// AFEGIR AL CARRET
// ===============================

function afegirAlCarret(producte, opcio) {

    const existent = carret.find(item =>
        item.id === producte.id &&
        item.opcio === opcio
    );

    if (existent) {

        existent.quantitat++;

    } else {

        carret.push({
            id: producte.id,
            nom: producte.nom,
            preu: producte.preu,
            opcio: opcio,
            quantitat: 1
        });
    }

    actualitzarCarret();
}


// ===============================
// MOSTRAR CARRET
// ===============================

function actualitzarCarret() {

    const contenidor = document.getElementById("productes-carret");
    const totalElement = document.getElementById("total-carret");
    const numeroElement = document.getElementById("numero-carret");

    if (!contenidor) return;

    contenidor.innerHTML = "";

    if (carret.length === 0) {

        contenidor.innerHTML = `
            <p class="carret-buit">
                El carret està buit.
            </p>
        `;

        totalElement.textContent = "0,00 €";
        numeroElement.textContent = "0";

        return;
    }

    let total = 0;
    let quantitatTotal = 0;

    carret.forEach((item, index) => {

        const subtotal = item.preu * item.quantitat;

        total += subtotal;
        quantitatTotal += item.quantitat;

        const element = document.createElement("div");

        element.className = "element-carret";

        element.innerHTML = `
            <div class="info-element-carret">

                <strong>${item.nom}</strong>

                ${item.opcio
                ? `<span>${item.opcio}</span>`
                : ""
            }

                <span>
                    ${formatarPreu(item.preu)}
                </span>

            </div>

            <div class="controls-carret">

                <button
                    class="quantitat-menys"
                    data-index="${index}">
                    −
                </button>

                <span>${item.quantitat}</span>

                <button
                    class="quantitat-mes"
                    data-index="${index}">
                    +
                </button>

                <button
                    class="eliminar-producte"
                    data-index="${index}">
                    ×
                </button>

            </div>

            <strong class="subtotal-carret">
                ${formatarPreu(subtotal)}
            </strong>
        `;

        contenidor.appendChild(element);
    });

    totalElement.textContent = formatarPreu(total);
    numeroElement.textContent = quantitatTotal;

    // RESTAR
    document.querySelectorAll(".quantitat-menys").forEach(boto => {

        boto.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            carret[index].quantitat--;

            if (carret[index].quantitat <= 0) {
                carret.splice(index, 1);
            }

            actualitzarCarret();
        });
    });

    // SUMAR
    document.querySelectorAll(".quantitat-mes").forEach(boto => {

        boto.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            carret[index].quantitat++;

            actualitzarCarret();
        });
    });

    // ELIMINAR
    document.querySelectorAll(".eliminar-producte").forEach(boto => {

        boto.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            carret.splice(index, 1);

            actualitzarCarret();
        });
    });
}


// ===============================
// OBRIR / TANCAR CARRET
// ===============================

const botoCarret = document.getElementById("boto-carret");
const tancarCarret = document.getElementById("tancar-carret");
const fonsCarret = document.getElementById("fons-carret");
const carretElement = document.getElementById("carret");


function obrirCarret() {

    if (!carretElement) return;

    carretElement.classList.add("obert");

    if (fonsCarret) {
        fonsCarret.classList.add("visible");
    }
}


function tancarElCarret() {

    if (!carretElement) return;

    carretElement.classList.remove("obert");

    if (fonsCarret) {
        fonsCarret.classList.remove("visible");
    }
}


if (botoCarret) {
    botoCarret.addEventListener("click", obrirCarret);
}

if (tancarCarret) {
    tancarCarret.addEventListener("click", tancarElCarret);
}

if (fonsCarret) {
    fonsCarret.addEventListener("click", tancarElCarret);
}


// ===============================
// COMANDA PER WHATSAPP
// ===============================

const botoComanda = document.getElementById("boto-comanda");

if (botoComanda) {

    botoComanda.addEventListener("click", function () {

        if (carret.length === 0) {

            alert("El carret està buit.");

            return;
        }

        const numeroWhatsApp = "34677093252";

        let missatge =
            "Hola! 👋 Voldria fer una comanda a Les Cabres de Sant Procopi:\n\n";

        let total = 0;

        carret.forEach(item => {

            const subtotal = item.preu * item.quantitat;

            total += subtotal;

            missatge += "• " + item.nom;

            if (item.opcio) {
                missatge += " (" + item.opcio + ")";
            }

            missatge +=
                " × " +
                item.quantitat +
                " = " +
                formatarPreu(subtotal) +
                "\n";
        });

        missatge +=
            "\n💶 TOTAL: " +
            formatarPreu(total);

        missatge +=
            "\n\nGràcies! 🔥";

        const url =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(missatge);

        window.open(url, "_blank");
    });
}


// ===============================
// INICIAR BOTIGA
// ===============================

mostrarProductes();
actualitzarCarret();