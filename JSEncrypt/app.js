document.addEventListener("DOMContentLoaded", () => {
    let inputTexto = document.querySelector("#text__input");
    let cardContainer = document.querySelector(".card-container");
    let btnEncriptar = document.querySelector(".primary__button");
    let btnDesencriptar = document.querySelector(".secondary__button");

    btnEncriptar.addEventListener("click", () => handleText(encriptar));
    btnDesencriptar.addEventListener("click", () => handleText(desencriptar));

    function handleText(transformFunction) {
        let text = inputTexto.value.trim(); // Trim para evitar espacios en blanco al inicio y final
        
        if (text === "") {
            alert("El campo de texto no puede estar vacío");
            return;
        }

        if (!/^[a-z\s]+$/.test(text)) {
            alert("El texto solo debe contener letras minúsculas sin acentos ni caracteres especiales.");
            return;  // No limpiar el campo si la validación falla
        }

        // Procesar y limpiar solo si no hubo problemas
        processText(text, transformFunction);
    }

    function processText(text, transformFunction) {
        cardContainer.innerHTML = "";  // Limpiar el contenedor de las tarjetas
        const card = createCard(transformFunction(text));  // Crear una nueva tarjeta con el texto transformado
        cardContainer.appendChild(card);  // Añadir la tarjeta al contenedor
        inputTexto.value = "";  // Vaciar el campo de texto después de la transformación
    }

    function createCard(transformedText) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-body">
                <p class="card-text">${transformedText}</p>
            </div>
            <div class="card-footer">
                <button class="secondary-button button-copy">Copiar</button>
            </div>
        `;
        const cardBody = card.querySelector(".card-body");
        cardBody.style.justifyContent = "space-between";
        const copyButton = card.querySelector(".button-copy");
        copyButton.addEventListener("click", () => copyToClipboard(transformedText));  // Evento para copiar el texto al portapapeles
        return card;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Texto copiado al portapapeles"))
            .catch(err => console.error("Error al copiar el texto: ", err));
    }

    function encriptar(text) {
        const replacements = {
            "a": "ai",
            "e": "enter",
            "i": "imes",
            "o": "ober",
            "u": "ufat"
        };
        return text.split("").map(char => replacements[char] || char).join("");
    }

    function desencriptar(textoEncriptado) {
        const replacements = {
            "ai": "a",
            "enter": "e",
            "imes": "i",
            "ober": "o",
            "ufat": "u"
        };
        for (const [key, value] of Object.entries(replacements)) {
            textoEncriptado = textoEncriptado.split(key).join(value);
        }
        return textoEncriptado;
    }
});
