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
                <button class="btn btn-info btn-sm" onclick="editarRecurso(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRecurso(${index})">Eliminar</button>
            </td>
        `;
        lista.appendChild(fila);
    });
}

// Función para añadir o actualizar un recurso
document.getElementById('resource-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('resource-name').value;
    const genero = document.getElementById('genre').value;
    const plataforma = document.getElementById('platform').value;
    const estado = document.getElementById('status').value;
    const formato = document.getElementById('format').value;
    const fecha = document.getElementById('completion-date').value;
    const valoracion = document.getElementById('rating').value;
    const resena = document.getElementById('review').value;

    const nuevoRecurso = { nombre, genero, plataforma, estado, formato, fecha, valoracion, resena };

    const recursos = obtenerRecursos();

    if (document.getElementById('resource-form').dataset.index === undefined) {
        recursos.push(nuevoRecurso);
    } else {
        const index = document.getElementById('resource-form').dataset.index;
        recursos[index] = nuevoRecurso;
        delete document.getElementById('resource-form').dataset.index;
    }

    guardarRecursos(recursos);
    mostrarRecursos();
    document.getElementById('resource-form').reset();
});

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

    document.getElementById('resource-form').dataset.index = index;
}

// Función para eliminar un recurso
function eliminarRecurso(index) {
    const recursos = obtenerRecursos();
    recursos.splice(index, 1);
    guardarRecursos(recursos);
    mostrarRecursos();
}

// Función para filtrar recursos
function filtrarRecursos() {
    const nombreFiltro = document.getElementById('search-bar').value.toLowerCase();
    const estadoFiltro = document.getElementById('filter-status').value;
    const formatoFiltro = document.getElementById('filter-format').value;
    const plataformaFiltro = document.getElementById('filter-platform').value;

    const recursos = obtenerRecursos();
    const lista = document.getElementById('resource-list');
    lista.innerHTML = '';

    recursos.forEach((recurso, index) => {
        if (
            (nombreFiltro === '' || recurso.nombre.toLowerCase().includes(nombreFiltro)) &&
            (estadoFiltro === '' || recurso.estado === estadoFiltro) &&
            (formatoFiltro === '' || recurso.formato === formatoFiltro) &&
            (plataformaFiltro === '' || recurso.plataforma === plataformaFiltro)
        ) {
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
                    <button class="btn btn-info btn-sm" onclick="editarRecurso(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarRecurso(${index})">Eliminar</button>
                </td>
            `;
            lista.appendChild(fila);
        }
    });
}

document.getElementById('search-bar').addEventListener('input', filtrarRecursos);
document.getElementById('filter-status').addEventListener('change', filtrarRecursos);
document.getElementById('filter-format').addEventListener('change', filtrarRecursos);
document.getElementById('filter-platform').addEventListener('change', filtrarRecursos);

// Inicialización
document.addEventListener('DOMContentLoaded', mostrarRecursos);
