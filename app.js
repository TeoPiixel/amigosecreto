¡Entendido! Vamos a modificar el código JavaScript para que el sorteo elija un único amigo secreto de la lista y lo muestre con el texto que indicaste.

Aquí tienes el código app.js modificado, junto con el HTML completo para que tengas todo junto:

index.html (Tu archivo HTML)
HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <title>Amigo Secreto</title>
</head>

<body>
    <main class="main-content">
        <header class="header-banner">
            <h1 class="main-title">Amigo Secreto</h1>
            <img src="assets/amigo-secreto.png" alt="Imagen representativa de amigo secreto">
        </header>

        <section class="input-section">
            <h2 class="section-title">Digite el nombre de sus amigos</h2>
            <div class="input-wrapper">
                <input type="text" id="amigo" class="input-name" placeholder="Escribe un nombre">
                <button class="button-add" onclick="agregarAmigo()">Añadir</button>
            </div>

            <ul id="listaAmigos" class="name-list" aria-labelledby="listaAmigos" role="list"></ul>
            <ul id="resultado" class="result-list" aria-live="polite"></ul>

            <div class="button-container">
                <button class="button-draw" onclick="sortearAmigo()" aria-label="Sortear amigo secreto">
                    <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
                    Sortear amigo
                </button>
                <button class="button-clear" onclick="reiniciar()" aria-label="Reiniciar sorteo">
                    Reiniciar
                </button>
            </div>
        </section>
    </main>

    <script src="app.js" defer></script>
</body>
</html>
app.js (Tu archivo JavaScript modificado)
JavaScript

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
 * Realiza el sorteo de UN único amigo secreto.
 * Valida que haya al menos un participante.
 * Muestra el nombre del amigo secreto sorteado en la página.
 */
function sortearAmigo() {
    // Validación: Necesitas al menos un amigo para realizar un sorteo individual
    if (amigos.length === 0) {
        alert('Necesitas agregar al menos un amigo para realizar un sorteo.');
        return;
    }

    let resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = ''; // Limpiamos resultados anteriores

    // Selecciona un índice aleatorio del array de amigos
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSecretoSorteado = amigos[indiceAleatorio];

    // Crea un elemento de lista (<li>) para mostrar el resultado
    let itemLista = document.createElement('li');
    itemLista.classList.add('result-item'); // Agrega una clase para posibles estilos CSS
    itemLista.textContent = 'El amigo secreto sorteado es: ' + amigoSecretoSorteado;
    resultadoElement.appendChild(itemLista);
}

/**
 * Función auxiliar para mezclar un array utilizando el algoritmo de Fisher-Yates.
 * (Aunque no se usa en esta versión de sorteo individual, se mantiene por si se reutiliza).
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