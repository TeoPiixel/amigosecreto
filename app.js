// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = []; // Array para almacenar los nombres de los amigos

/**
 * Agrega un nombre de amigo a la lista.
 * Valida que el campo no esté vacío y evita nombres duplicados.
 * Actualiza la visualización de la lista de amigos en la página.
 */
function agregarAmigo() {
    let nombreAmigoInput = document.getElementById('amigo');
    let nombreAmigo = nombreAmigoInput.value.trim(); // Obtenemos el valor y eliminamos espacios en blanco
    let listaAmigosElement = document.getElementById('listaAmigos');

    // Validación: Si el campo de texto está vacío
    if (nombreAmigo === '') {
        alert('Por favor, escribe un nombre válido para añadir.');
        return; // Detiene la ejecución si el campo está vacío
    }

    // Convertir la primera letra del nombre a mayúscula y el resto a minúscula para consistencia
    nombreAmigo = nombreAmigo.charAt(0).toUpperCase() + nombreAmigo.slice(1).toLowerCase();

    // Validación opcional: Evitar añadir nombres duplicados
    if (amigos.includes(nombreAmigo)) {
        alert('Este nombre ya ha sido añadido a la lista.');
        nombreAmigoInput.value = ''; // Limpiar el campo
        return;
    }

    amigos.push(nombreAmigo); // Agregamos el nombre al array

    // Actualiza la lista visible de amigos. Si es el primer amigo, no hay coma antes.
    // Si ya hay amigos, se añade una coma y el nuevo nombre.
    if (listaAmigosElement.textContent === '') {
        listaAmigosElement.textContent = nombreAmigo;
    } else {
        listaAmigosElement.textContent = listaAmigosElement.textContent + ', ' + nombreAmigo;
    }

    nombreAmigoInput.value = ''; // Limpiar el campo de texto después de añadir
}

/**
 * Realiza el sorteo de amigo secreto.
 * Valida que haya suficientes participantes y luego mezcla la lista.
 * Muestra el resultado del sorteo en la página.
 */
function sortearAmigo() {
    // Validación: Necesitas al menos dos amigos para realizar un sorteo
    if (amigos.length < 2) {
        alert('Necesitas al menos dos amigos para realizar un sorteo.');
        return;
    }

    embaralhar(amigos); // Mezclamos la lista de amigos aleatoriamente usando el algoritmo de Fisher-Yates
    let resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = ''; // Limpiamos resultados anteriores antes de mostrar los nuevos

    // Genera y muestra los pares de amigo secreto
    for (let i = 0; i < amigos.length; i++) {
        // Asigna a cada amigo el siguiente en la lista mezclada.
        // El operador % (módulo) asegura que el último amigo le dé al primero, cerrando el círculo.
        let sorteado = amigos[(i + 1) % amigos.length];

        // Crea un elemento de lista (<li>) para cada resultado y lo añade a la lista de resultados
        let itemLista = document.createElement('li');
        itemLista.classList.add('result-item'); // Agrega una clase para posibles estilos CSS
        itemLista.textContent = amigos[i] + ' --> ' + sorteado; // Formato "Amigo --> Sorteado"
        resultadoElement.appendChild(itemLista);
    }
}

/**
 * Función auxiliar para mezclar un array utilizando el algoritmo de Fisher-Yates.
 * Modifica el array original en su lugar.
 * @param {Array} lista - El array a mezclar.
 */
function embaralhar(lista) {
    // Itera desde el último elemento hacia el segundo
    for (let indice = lista.length - 1; indice > 0; indice--) {
        // Genera un índice aleatorio entre 0 y el índice actual (inclusive)
        const indiceAleatorio = Math.floor(Math.random() * (indice + 1));

        // Intercambia el elemento actual con el elemento en el índice aleatorio
        [lista[indice], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice]];
    }
}

/**
 * Reinicia la aplicación, limpiando la lista de amigos y los resultados del sorteo.
 */
function reiniciar() {
    amigos = []; // Vacía el array de amigos
    document.getElementById('listaAmigos').textContent = ''; // Limpia la lista visible de nombres
    document.getElementById('resultado').innerHTML = ''; // Limpia los resultados del sorteo
    document.getElementById('amigo').value = ''; // Limpia el campo de entrada de texto
}