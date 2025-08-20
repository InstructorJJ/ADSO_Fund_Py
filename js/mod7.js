// Gestión de pestañas
function showTab(tabName) {
    // Ocultar todas las pestañas
    const tabContents = document.querySelectorAll('.tab-content');
    const tabs = document.querySelectorAll('.tab');
    
    tabContents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Demostraciones interactivas
function demoLeerArchivo() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
        <h4>📖 Simulación: Lectura de Archivo</h4>
        <div style="color: #4CAF50; margin: 10px 0;">
        >>> with open('datos.txt', 'r') as archivo:
        >>>     contenido = archivo.read()
        >>>     print(contenido)
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">
        🔍 Contenido del archivo:<br>
        "Este es el contenido del archivo de texto.<br>
        Segunda línea del archivo.<br>
        Tercera línea con más información."
        </div>
        <p style="color: #90EE90; margin-top: 10px;">✅ Archivo leído exitosamente - 3 líneas procesadas</p>
    `;
}

function demoEscribirArchivo() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
        <h4>✍️ Simulación: Escritura de Archivo</h4>
        <div style="color: #4CAF50; margin: 10px 0;">
        >>> with open('salida.txt', 'w') as archivo:
        >>>     archivo.write('Nueva línea de texto\\n')
        >>>     archivo.write('Segunda línea\\n')
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">
        📝 Escribiendo en archivo...<br>
        ✓ Línea 1: "Nueva línea de texto"<br>
        ✓ Línea 2: "Segunda línea"
        </div>
        <p style="color: #90EE90; margin-top: 10px;">✅ Archivo creado exitosamente - 2 líneas escritas</p>
    `;
}

function demoProcesarCSV() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
        <h4>📊 Simulación: Procesamiento CSV</h4>
        <div style="color: #4CAF50; margin: 10px 0;">
        >>> import csv<br>
        >>> with open('datos.csv', 'r') as archivo:<br>
        >>>     lector = csv.reader(archivo)
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">
        📋 Procesando CSV...<br>
        Fila 1: ['Nombre', 'Edad', 'Ciudad']<br>
        Fila 2: ['Juan', '25', 'Madrid']<br>
        Fila 3: ['Ana', '30', 'Barcelona']<br>
        Fila 4: ['Luis', '28', 'Valencia']
        </div>
        <p style="color: #90EE90; margin-top: 10px;">✅ CSV procesado - 4 filas, 3 columnas</p>
    `;
}

function demoVisualizacion() {
    const output = document.getElementById('demo-output');
    output.innerHTML = `
        <h4>📈 Simulación: Creación de Gráfico</h4>
        <div style="color: #4CAF50; margin: 10px 0;">
        >>> def crear_grafico(datos, etiquetas):<br>
        >>>     for i, valor in enumerate(datos):<br>
        >>>         barra = "█" * valor<br>
        >>>         print(f"{etiquetas[i]} {barra} {valor}")
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; font-family: monospace;">
        📊 Gráfico de Ventas:<br>
        Enero    ███████████████ 15<br>
        Febrero  ███████████████████████ 23<br>
        Marzo    ██████████████████ 18<br>
        Abril    ███████████████████████████████ 31
        </div>
        <p style="color: #90EE90; margin-top: 10px;">✅ Gráfico generado - 4 barras creadas</p>
    `;
}

// Sistema de archivos virtual
let archivosSistema = [
    { nombre: 'archivo1.txt', contenido: 'Contenido del primer archivo' },
    { nombre: 'datos.csv', contenido: 'Nombre,Edad,Ciudad\\nJuan,25,Madrid' },
    { nombre: 'resultados.txt', contenido: 'Análisis completado' }
];

function actualizarSistemaArchivos() {
    const sistema = document.getElementById('file-system');
    sistema.innerHTML = '';
    archivosSistema.forEach(archivo => {
        sistema.innerHTML += `${archivo.nombre} - "${archivo.contenido.substring(0, 30)}..."<br>`;
    });
    sistema.innerHTML += '<br><em>Usa los controles para interactuar con los archivos...</em>';
}

function crearArchivo() {
    const nombre = prompt('Nombre del archivo:', 'nuevo_archivo.txt');
    const contenido = prompt('Contenido inicial:', 'Contenido del nuevo archivo');
    
    if (nombre && contenido) {
        archivosSistema.push({ nombre: nombre, contenido: contenido });
        actualizarSistemaArchivos();
        alert(`✅ Archivo "${nombre}" creado exitosamente!`);
    }
}

function leerArchivo() {
    const nombres = archivosSistema.map(a => a.nombre);
    const seleccion = prompt(`Selecciona archivo (${nombres.join(', ')}):`);
    
    const archivo = archivosSistema.find(a => a.nombre === seleccion);
    if (archivo) {
        alert(`📖 Contenido de "${archivo.nombre}":\n\n${archivo.contenido}`);
    } else {
        alert('❌ Archivo no encontrado');
    }
}

function modificarArchivo() {
    const nombres = archivosSistema.map(a => a.nombre);
    const seleccion = prompt(`Modificar archivo (${nombres.join(', ')}):`);
    
    const archivo = archivosSistema.find(a => a.nombre === seleccion);
    if (archivo) {
        const nuevoContenido = prompt(`Nuevo contenido para "${archivo.nombre}":`, archivo.contenido);
        if (nuevoContenido !== null) {
            archivo.contenido = nuevoContenido;
            actualizarSistemaArchivos();
            alert(`✅ Archivo "${archivo.nombre}" modificado exitosamente!`);
        }
    } else {
        alert('❌ Archivo no encontrado');
    }
}

function eliminarArchivo() {
    const nombres = archivosSistema.map(a => a.nombre);
    const seleccion = prompt(`Eliminar archivo (${nombres.join(', ')}):`);
    
    const indice = archivosSistema.findIndex(a => a.nombre === seleccion);
    if (indice !== -1) {
        if (confirm(`¿Estás seguro de eliminar "${seleccion}"?`)) {
            archivosSistema.splice(indice, 1);
            actualizarSistemaArchivos();
            alert(`🗑️ Archivo "${seleccion}" eliminado exitosamente!`);
        }
    } else {
        alert('❌ Archivo no encontrado');
    }
}

function actualizarGrafico() {
    const matematicas = Math.floor(Math.random() * 20) + 80;
    const ciencias = Math.floor(Math.random() * 20) + 80;
    const historia = Math.floor(Math.random() * 20) + 80;
    
    const chart = document.getElementById('interactive-chart');
    chart.innerHTML = `
        <div class="chart-bar" style="height: ${matematicas}px;" title="Matemáticas: ${matematicas}">${matematicas}</div>
        <div class="chart-bar" style="height: ${ciencias}px;" title="Ciencias: ${ciencias}">${ciencias}</div>
        <div class="chart-bar" style="height: ${historia}px;" title="Historia: ${historia}">${historia}</div>
    `;
}

// Mostrar soluciones
function mostrarSolucion(numero) {
    const solucion = document.getElementById(`solucion-${numero}`);
    solucion.style.display = solucion.style.display === 'none' ? 'block' : 'none';
}

// Funciones del proyecto integrador
function mostrarEjemploCSV() {
    const ejemplo = document.getElementById('ejemplo-csv');
    ejemplo.style.display = ejemplo.style.display === 'none' ? 'block' : 'none';
}

function mostrarResultadoEsperado() {
    const resultado = document.getElementById('resultado-esperado');
    resultado.style.display = resultado.style.display === 'none' ? 'block' : 'none';
}

function mostrarSolucionCompleta() {
    const solucion = document.getElementById('solucion-completa');
    solucion.style.display = solucion.style.display === 'none' ? 'block' : 'none';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    actualizarSistemaArchivos();
});