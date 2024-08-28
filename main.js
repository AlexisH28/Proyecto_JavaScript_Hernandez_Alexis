// Manejo de recursos en LocalStorage
function obtenerRecursos() {
    return JSON.parse(localStorage.getItem('recursos')) || [];
}

function guardarRecursos(recursos) {
    localStorage.setItem('recursos', JSON.stringify(recursos));
}

// Función para mostrar la lista de recursos
function mostrarRecursos() {
    const recursos = obtenerRecursos();
    const lista = document.getElementById('resource-list');
    lista.innerHTML = '';

    recursos.forEach((recurso, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${recurso.nombre}</td>
            <td>${recurso.genero}</td>
            <td>${recurso.plataforma}</td>
            <td>${recurso.estado}</td>
            <td>${recurso.formato}</td>
            <td>${recurso.fecha}</td>
            <td>${recurso.valoracion}</td>
            <td>${recurso.resena}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarRecurso(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRecurso(${index})">Eliminar</button>
            </td>
        `;
        lista.appendChild(fila);
    });
}

// Función para añadir o actualizar un recurso
function manejarRecurso(event) {
    event.preventDefault();

    const nombre = document.getElementById('resource-name').value;
    const genero = document.getElementById('genre').value;
    const plataforma = document.getElementById('platform').value;
    const estado = document.getElementById('status').value;
    const formato = document.getElementById('format').value;
    const fecha = document.getElementById('completion-date').value;
    const valoracion = document.getElementById('rating').value;
    const resena = document.getElementById('review').value;

    const recursos = obtenerRecursos();
    const recurso = { nombre, genero, plataforma, estado, formato, fecha, valoracion, resena };

    if (event.target.dataset.index !== undefined) {
        const index = event.target.dataset.index;
        recursos[index] = recurso;
        delete event.target.dataset.index;
    } else {
        recursos.push(recurso);
    }

    guardarRecursos(recursos);
    mostrarRecursos();
    document.getElementById('resource-form').reset();
}

// Función para editar un recurso
function editarRecurso(index) {
    const recursos = obtenerRecursos();
    const recurso = recursos[index];

    document.getElementById('resource-name').value = recurso.nombre;
    document.getElementById('genre').value = recurso.genero;
    document.getElementById('platform').value = recurso.plataforma;
    document.getElementById('status').value = recurso.estado;
    document.getElementById('format').value = recurso.formato;
    document.getElementById('completion-date').value = recurso.fecha;
    document.getElementById('rating').value = recurso.valoracion;
    document.getElementById('review').value = recurso.resena;

    const form = document.getElementById('resource-form');
    form.dataset.index = index;
}

// Función para eliminar un recurso
function eliminarRecurso(index) {
    const recursos = obtenerRecursos();
    recursos.splice(index, 1);
    guardarRecursos(recursos);
    mostrarRecursos();
}

// Función para manejar búsqueda y filtros
function manejarFiltros() {
    const busqueda = document.getElementById('search-bar').value.toLowerCase();
    const estado = document.getElementById('filter-status').value;
    const formato = document.getElementById('filter-format').value;
    const plataforma = document.getElementById('filter-platform').value;

    const recursos = obtenerRecursos().filter(recurso => {
        return (
            (!busqueda || recurso.nombre.toLowerCase().includes(busqueda)) &&
            (!estado || recurso.estado === estado) &&
            (!formato || recurso.formato === formato) &&
            (!plataforma || recurso.plataforma === plataforma)
        );
    });

    const lista = document.getElementById('resource-list');
    lista.innerHTML = '';

    recursos.forEach((recurso, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${recurso.nombre}</td>
            <td>${recurso.genero}</td>
            <td>${recurso.plataforma}</td>
            <td>${recurso.estado}</td>
            <td>${recurso.formato}</td>
            <td>${recurso.fecha}</td>
            <td>${recurso.valoracion}</td>
            <td>${recurso.resena}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarRecurso(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRecurso(${index})">Eliminar</button>
            </td>
        `;
        lista.appendChild(fila);
    });
}

// Event listeners
document.getElementById('resource-form').addEventListener('submit', manejarRecurso);
document.getElementById('search-bar').addEventListener('input', manejarFiltros);
document.getElementById('filter-status').addEventListener('change', manejarFiltros);
document.getElementById('filter-format').addEventListener('change', manejarFiltros);
document.getElementById('filter-platform').addEventListener('change', manejarFiltros);

// Mostrar recursos al cargar la página
mostrarRecursos();
