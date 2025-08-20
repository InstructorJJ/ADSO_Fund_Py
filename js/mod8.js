// Simulación de base de datos en memoria
let biblioteca = {
    libros: {},
    usuarios: {},
    prestamos: []
};

let currentStep = 1;

function showStep(step) {
    // Actualizar visual de pasos
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.toggle('active', index + 1 === step);
    });

    currentStep = step;
    const content = document.getElementById('stepContent');
    
    const stepContents = {
        1: {
            title: 'Paso 1: Diseño de Clases',
            content: `
                <h3>Diseño de Clases</h3>
                <p>Definimos la estructura básica de nuestras clases principales:</p>
                <ul>
                    <li><strong>Libro:</strong> ISBN, título, autor, año, categoría, disponibilidad</li>
                    <li><strong>Usuario:</strong> ID, nombre, email, lista de libros prestados</li>
                    <li><strong>Biblioteca:</strong> Colección de libros y usuarios, métodos de gestión</li>
                </ul>
                <p><strong>Principios aplicados:</strong> Encapsulación, abstracción, responsabilidad única</p>
            `
        },
        2: {
            title: 'Paso 2: Gestión de Datos',
            content: `
                <h3>Gestión de Datos (CRUD)</h3>
                <p>Implementamos las operaciones básicas:</p>
                <ul>
                    <li><strong>Create:</strong> Agregar nuevos libros y usuarios</li>
                    <li><strong>Read:</strong> Consultar información y búsquedas</li>
                    <li><strong>Update:</strong> Modificar datos existentes</li>
                    <li><strong>Delete:</strong> Eliminar registros (con validaciones)</li>
                </ul>
                <p><strong>Estructuras usadas:</strong> Diccionarios para acceso rápido, listas para colecciones</p>
            `
        },
        3: {
            title: 'Paso 3: Lógica de Negocio',
            content: `
                <h3>Lógica de Negocio</h3>
                <p>Implementamos las reglas del dominio:</p>
                <ul>
                    <li><strong>Préstamos:</strong> Verificar disponibilidad, límites por usuario</li>
                    <li><strong>Devoluciones:</strong> Actualizar estados, calcular multas</li>
                    <li><strong>Reservas:</strong> Gestionar cola de espera</li>
                    <li><strong>Validaciones:</strong> Datos de entrada, reglas de negocio</li>
                </ul>
                <p><strong>Conceptos aplicados:</strong> Condicionales, bucles, validaciones complejas</p>
            `
        },
        4: {
            title: 'Paso 4: Interfaz de Usuario',
            content: `
                <h3>Interfaz de Usuario</h3>
                <p>Creamos una experiencia de usuario intuitiva:</p>
                <ul>
                    <li><strong>Menús:</strong> Navegación clara y organizada</li>
                    <li><strong>Formularios:</strong> Entrada de datos estructurada</li>
                    <li><strong>Feedback:</strong> Mensajes de confirmación y error</li>
                    <li><strong>Reportes:</strong> Visualización de información</li>
                </ul>
                <p><strong>Principios UX:</strong> Simplicidad, claridad, retroalimentación inmediata</p>
            `
        },
        5: {
            title: 'Paso 5: Persistencia de Datos',
            content: `
                <h3>Persistencia de Datos</h3>
                <p>Implementamos almacenamiento permanente:</p>
                <ul>
                    <li><strong>JSON:</strong> Formato estructurado y legible</li>
                    <li><strong>Backup:</strong> Copias de seguridad automáticas</li>
                    <li><strong>Migración:</strong> Actualización de esquemas</li>
                    <li><strong>Validación:</strong> Integridad de datos al cargar</li>
                </ul>
                <p><strong>Manejo de errores:</strong> Try-catch para operaciones de archivo</p>
            `
        },
        6: {
            title: 'Paso 6: Pruebas y Depuración',
            content: `
                <h3>Pruebas y Depuración</h3>
                <p>Aseguramos la calidad del software:</p>
                <ul>
                    <li><strong>Casos de prueba:</strong> Escenarios normales y excepcionales</li>
                    <li><strong>Debugging:</strong> Identificación y corrección de errores</li>
                    <li><strong>Logging:</strong> Registro de eventos para diagnóstico</li>
                    <li><strong>Refactoring:</strong> Mejora continua del código</li>
                </ul>
                <p><strong>Buenas prácticas:</strong> Código limpio, comentarios útiles, modularidad</p>
            `
        }
    };

    const stepData = stepContents[step];
    content.innerHTML = stepData.content;
    
    // Actualizar código mostrado según el paso
    updateCodeDisplay(step);
}

function updateCodeDisplay(step) {
    const codeDisplay = document.getElementById('codeDisplay');
    const codes = {
        1: `<span class="comment"># Paso 1: Definición de Clases</span>
<span class="keyword">class</span> <span class="function">Libro</span>:
<span class="keyword">def</span> <span class="function">__init__</span>(self, isbn, titulo, autor, año, categoria=<span class="string">"General"</span>):
self.isbn = isbn
self.titulo = titulo
self.autor = autor
self.año = año
self.categoria = categoria
self.disponible = <span class="keyword">True</span>
self.fecha_prestamo = <span class="keyword">None</span>
self.usuario_prestamo = <span class="keyword">None</span>

<span class="keyword">def</span> <span class="function">__str__</span>(self):
estado = <span class="string">"Disponible"</span> <span class="keyword">if</span> self.disponible <span class="keyword">else</span> <span class="string">"Prestado"</span>
<span class="keyword">return</span> <span class="string">f"{self.titulo} - {self.autor} ({estado})"</span>`,

        2: `<span class="comment"># Paso 2: Operaciones CRUD</span>
<span class="keyword">def</span> <span class="function">agregar_libro</span>(self, libro):
<span class="string">"""Agregar un nuevo libro al catálogo"""</span>
<span class="keyword">if</span> libro.isbn <span class="keyword">in</span> self.libros:
<span class="keyword">raise</span> ValueError(<span class="string">f"El libro con ISBN {libro.isbn} ya existe"</span>)

self.libros[libro.isbn] = libro
self.guardar_datos()
print(<span class="string">f"Libro agregado: {libro.titulo}"</span>)

<span class="keyword">def</span> <span class="function">buscar_libros</span>(self, criterio, valor):
<span class="string">"""Buscar libros por diferentes criterios"""</span>
resultados = []
<span class="keyword">for</span> libro <span class="keyword">in</span> self.libros.values():
<span class="keyword">if</span> criterio == <span class="string">"titulo"</span> <span class="keyword">and</span> valor.lower() <span class="keyword">in</span> libro.titulo.lower():
    resultados.append(libro)
<span class="keyword">elif</span> criterio == <span class="string">"autor"</span> <span class="keyword">and</span> valor.lower() <span class="keyword">in</span> libro.autor.lower():
    resultados.append(libro)
<span class="keyword">elif</span> criterio == <span class="string">"categoria"</span> <span class="keyword">and</span> libro.categoria == valor:
    resultados.append(libro)
<span class="keyword">return</span> resultados`,

        3: `<span class="comment"># Paso 3: Lógica de Préstamos</span>
<span class="keyword">def</span> <span class="function">prestar_libro</span>(self, isbn, id_usuario):
<span class="string">"""Realizar préstamo de libro con validaciones"""</span>
<span class="comment"># Validaciones</span>
<span class="keyword">if</span> isbn <span class="keyword">not in</span> self.libros:
<span class="keyword">raise</span> ValueError(<span class="string">"El libro no existe en el catálogo"</span>)

<span class="keyword">if</span> id_usuario <span class="keyword">not in</span> self.usuarios:
<span class="keyword">raise</span> ValueError(<span class="string">"El usuario no está registrado"</span>)

libro = self.libros[isbn]
usuario = self.usuarios[id_usuario]

<span class="keyword">if</span> <span class="keyword">not</span> libro.disponible:
<span class="keyword">raise</span> ValueError(<span class="string">"El libro no está disponible"</span>)

<span class="keyword">if</span> len(usuario.libros_prestados) >= <span class="number">3</span>:
<span class="keyword">raise</span> ValueError(<span class="string">"El usuario ha alcanzado el límite de préstamos"</span>)

<span class="comment"># Realizar préstamo</span>
libro.disponible = <span class="keyword">False</span>
libro.fecha_prestamo = datetime.now().strftime(<span class="string">"%Y-%m-%d"</span>)
libro.usuario_prestamo = id_usuario
usuario.libros_prestados.append(isbn)

self.guardar_datos()
print(<span class="string">f"Préstamo realizado: {libro.titulo} para {usuario.nombre}"</span>)`,

        4: `<span class="comment"># Paso 4: Interfaz de Usuario</span>
<span class="keyword">def</span> <span class="function">mostrar_menu</span>(self):
<span class="string">"""Mostrar menú principal de opciones"""</span>
print(<span class="string">"""
╔══════════════════════════════════════╗
║        SISTEMA DE BIBLIOTECA         ║
╠══════════════════════════════════════╣
║ 1. 📚 Gestión de Libros             ║
║ 2. 👥 Gestión de Usuarios           ║
║ 3. 📖 Préstamos y Devoluciones      ║
║ 4. 🔍 Búsquedas y Consultas         ║
║ 5. 📊 Reportes y Estadísticas       ║
║ 6. ⚙️  Configuración                ║
║ 0. 🚪 Salir                         ║
╚══════════════════════════════════════╝
"""</span>)

<span class="keyword">def</span> <span class="function">ejecutar_opcion</span>(self, opcion):
<span class="string">"""Ejecutar la opción seleccionada del menú"""</span>
opciones = {
<span class="string">'1'</span>: self.menu_libros,
<span class="string">'2'</span>: self.menu_usuarios,
<span class="string">'3'</span>: self.menu_prestamos,
<span class="string">'4'</span>: self.menu_busquedas,
<span class="string">'5'</span>: self.menu_reportes,
<span class="string">'6'</span>: self.menu_configuracion
}

<span class="keyword">if</span> opcion <span class="keyword">in</span> opciones:
opciones[opcion]()
<span class="keyword">elif</span> opcion == <span class="string">'0'</span>:
print(<span class="string">"¡Gracias por usar el sistema!"</span>)
<span class="keyword">return</span> <span class="keyword">False</span>
<span class="keyword">else</span>:
print(<span class="string">"❌ Opción inválida"</span>)
<span class="keyword">return</span> <span class="keyword">True</span>`,

        5: `<span class="comment"># Paso 5: Persistencia de Datos</span>
<span class="keyword">def</span> <span class="function">guardar_datos</span>(self):
<span class="string">"""Guardar todos los datos en archivos JSON"""</span>
<span class="keyword">try</span>:
<span class="comment"># Preparar datos para serialización</span>
datos = {
    <span class="string">'libros'</span>: {isbn: libro.to_dict() <span class="keyword">for</span> isbn, libro <span class="keyword">in</span> self.libros.items()},
    <span class="string">'usuarios'</span>: {id_u: usuario.to_dict() <span class="keyword">for</span> id_u, usuario <span class="keyword">in</span> self.usuarios.items()},
    <span class="string">'version'</span>: <span class="string">'1.0'</span>,
    <span class="string">'ultima_actualizacion'</span>: datetime.now().isoformat()
}

<span class="comment"># Crear backup antes de guardar</span>
<span class="keyword">if</span> os.path.exists(<span class="string">'biblioteca.json'</span>):
    timestamp = datetime.now().strftime(<span class="string">"%Y%m%d_%H%M%S"</span>)
    shutil.copy(<span class="string">'biblioteca.json'</span>, <span class="string">f'backup_biblioteca_{timestamp}.json'</span>)

<span class="comment"># Guardar datos principales</span>
<span class="keyword">with</span> open(<span class="string">'biblioteca.json'</span>, <span class="string">'w'</span>, encoding=<span class="string">'utf-8'</span>) <span class="keyword">as</span> file:
    json.dump(datos, file, indent=<span class="number">4</span>, ensure_ascii=<span class="keyword">False</span>)

print(<span class="string">"✅ Datos guardados exitosamente"</span>)

<span class="keyword">except</span> Exception <span class="keyword">as</span> e:
print(<span class="string">f"❌ Error al guardar datos: {e}"</span>)
<span class="keyword">raise</span>`,

        6: `<span class="comment"># Paso 6: Pruebas y Validaciones</span>
<span class="keyword">def</span> <span class="function">ejecutar_pruebas</span>(self):
<span class="string">"""Ejecutar suite de pruebas del sistema"""</span>
print(<span class="string">"🧪 Iniciando pruebas del sistema..."</span>)

pruebas = [
self.test_agregar_libro,
self.test_registrar_usuario,
self.test_prestar_libro,
self.test_devolver_libro,
self.test_buscar_libros,
self.test_persistencia_datos
]

exitosas = <span class="number">0</span>
<span class="keyword">for</span> prueba <span class="keyword">in</span> pruebas:
<span class="keyword">try</span>:
    prueba()
    print(<span class="string">f"✅ {prueba.__name__}: EXITOSA"</span>)
    exitosas += <span class="number">1</span>
<span class="keyword">except</span> AssertionError <span class="keyword">as</span> e:
    print(<span class="string">f"❌ {prueba.__name__}: FALLIDA - {e}"</span>)
<span class="keyword">except</span> Exception <span class="keyword">as</span> e:
    print(<span class="string">f"💥 {prueba.__name__}: ERROR - {e}"</span>)

print(<span class="string">f"📊 Resultado: {exitosas}/{len(pruebas)} pruebas exitosas"</span>)

<span class="keyword">def</span> <span class="function">validar_entrada</span>(self, prompt, tipo, validador=<span class="keyword">None</span>):
<span class="string">"""Validar entrada del usuario con reintentos"""</span>
<span class="keyword">while</span> <span class="keyword">True</span>:
<span class="keyword">try</span>:
    entrada = input(prompt).strip()
    
    <span class="keyword">if</span> tipo == <span class="string">'int'</span>:
        valor = int(entrada)
    <span class="keyword">elif</span> tipo == <span class="string">'float'</span>:
        valor = float(entrada)
    <span class="keyword">else</span>:
        valor = entrada
        
    <span class="keyword">if</span> validador <span class="keyword">and</span> <span class="keyword">not</span> validador(valor):
        print(<span class="string">"❌ Entrada inválida, intente nuevamente"</span>)
        <span class="keyword">continue</span>
        
    <span class="keyword">return</span> valor
    
<span class="keyword">except</span> ValueError:
    print(<span class="string">f"❌ Por favor ingrese un {tipo} válido"</span>)
<span class="keyword">except</span> KeyboardInterrupt:
    print(<span class="string">"\\n⚠️  Operación cancelada"</span>)
    <span class="keyword">return</span> <span class="keyword">None</span>`
    };

    if (codes[step]) {
        codeDisplay.innerHTML = codes[step];
    }
}

function executeCode() {
    const resultDisplay = document.getElementById('resultadoPractica');
    resultDisplay.innerHTML = `
        <h4>🚀 Código Ejecutado</h4>
        <p>✅ Sistema de biblioteca inicializado</p>
        <p>📚 Clases Libro, Usuario y Biblioteca definidas</p>
        <p>💾 Sistema de persistencia configurado</p>
        <p>🔧 Métodos CRUD implementados</p>
        <p><strong>Estado actual:</strong> Listo para recibir datos</p>
    `;
    
    showSuccessMessage("Código ejecutado exitosamente");
}

function showTab(tabName) {
    // Ocultar todas las tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar tab seleccionada
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

function agregarLibro() {
    const isbn = document.getElementById('isbn').value.trim();
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const año = document.getElementById('año').value;
    const categoria = document.getElementById('categoria').value;

    if (!isbn || !titulo || !autor || !año) {
        showErrorMessage("Por favor complete todos los campos");
        return;
    }

    if (biblioteca.libros[isbn]) {
        showErrorMessage("Ya existe un libro con ese ISBN");
        return;
    }

    biblioteca.libros[isbn] = {
        isbn, titulo, autor, año: parseInt(año), categoria,
        disponible: true,
        fecha_prestamo: null,
        usuario_prestamo: null
    };

    // Limpiar formulario
    document.getElementById('isbn').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('año').value = '';

    showSuccessMessage(`Libro "${titulo}" agregado exitosamente`);
    actualizarEstadoSistema();
}

function registrarUsuario() {
    const idUsuario = document.getElementById('idUsuario').value.trim();
    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const emailUsuario = document.getElementById('emailUsuario').value.trim();

    if (!idUsuario || !nombreUsuario || !emailUsuario) {
        showErrorMessage("Por favor complete todos los campos");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUsuario)) {
        showErrorMessage("Por favor ingrese un email válido");
        return;
    }

    if (biblioteca.usuarios[idUsuario]) {
        showErrorMessage("Ya existe un usuario con ese ID");
        return;
    }

    biblioteca.usuarios[idUsuario] = {
        id: idUsuario,
        nombre: nombreUsuario,
        email: emailUsuario,
        libros_prestados: [],
        fecha_registro: new Date().toISOString().split('T')[0]
    };

    // Limpiar formulario
    document.getElementById('idUsuario').value = '';
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('emailUsuario').value = '';

    showSuccessMessage(`Usuario "${nombreUsuario}" registrado exitosamente`);
    actualizarEstadoSistema();
}

function prestarLibro() {
    const isbn = document.getElementById('isbnPrestamo').value.trim();
    const idUsuario = document.getElementById('usuarioPrestamo').value.trim();

    if (!isbn || !idUsuario) {
        showErrorMessage("Por favor complete todos los campos");
        return;
    }

    if (!biblioteca.libros[isbn]) {
        showErrorMessage("El libro con ese ISBN no existe");
        return;
    }

    if (!biblioteca.usuarios[idUsuario]) {
        showErrorMessage("El usuario no está registrado");
        return;
    }

    const libro = biblioteca.libros[isbn];
    const usuario = biblioteca.usuarios[idUsuario];

    if (!libro.disponible) {
        showErrorMessage("El libro no está disponible para préstamo");
        return;
    }

    if (usuario.libros_prestados.length >= 3) {
        showErrorMessage("El usuario ha alcanzado el límite de 3 libros prestados");
        return;
    }

    // Realizar préstamo
    libro.disponible = false;
    libro.fecha_prestamo = new Date().toISOString().split('T')[0];
    libro.usuario_prestamo = idUsuario;
    usuario.libros_prestados.push(isbn);

    biblioteca.prestamos.push({
        isbn: isbn,
        usuario: idUsuario,
        fecha_prestamo: libro.fecha_prestamo,
        fecha_devolucion: null
    });

    // Limpiar formulario
    document.getElementById('isbnPrestamo').value = '';
    document.getElementById('usuarioPrestamo').value = '';

    showSuccessMessage(`Préstamo realizado: "${libro.titulo}" para ${usuario.nombre}`);
    actualizarEstadoSistema();
}

function actualizarEstadoSistema() {
    const resultado = document.getElementById('resultadoPractica');
    const totalLibros = Object.keys(biblioteca.libros).length;
    const totalUsuarios = Object.keys(biblioteca.usuarios).length;
    const librosPrestados = Object.values(biblioteca.libros).filter(libro => !libro.disponible).length;
    const librosDisponibles = totalLibros - librosPrestados;

    resultado.innerHTML = `
        <h4>📊 Estado del Sistema:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
            <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; text-align: center;">
                <h5 style="color: #2e7d32; margin: 0 0 5px 0;">📚 Libros Totales</h5>
                <p style="font-size: 2rem; font-weight: bold; margin: 0; color: #1b5e20;">${totalLibros}</p>
            </div>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; text-align: center;">
                <h5 style="color: #1976d2; margin: 0 0 5px 0;">👥 Usuarios Registrados</h5>
                <p style="font-size: 2rem; font-weight: bold; margin: 0; color: #0d47a1;">${totalUsuarios}</p>
            </div>
            <div style="background: #fff3e0; padding: 15px; border-radius: 10px; text-align: center;">
                <h5 style="color: #f57c00; margin: 0 0 5px 0;">📖 Libros Prestados</h5>
                <p style="font-size: 2rem; font-weight: bold; margin: 0; color: #e65100;">${librosPrestados}</p>
            </div>
            <div style="background: #f3e5f5; padding: 15px; border-radius: 10px; text-align: center;">
                <h5 style="color: #7b1fa2; margin: 0 0 5px 0;">✅ Disponibles</h5>
                <p style="font-size: 2rem; font-weight: bold; margin: 0; color: #4a148c;">${librosDisponibles}</p>
            </div>
        </div>
        
        ${totalLibros > 0 ? `
        <div style="margin-top: 20px;">
            <h5>📋 Últimos Libros Agregados:</h5>
            <ul style="list-style: none; padding: 0;">
                ${Object.values(biblioteca.libros).slice(-3).map(libro => 
                    `<li style="padding: 8px; margin: 5px 0; background: rgba(102, 126, 234, 0.1); border-radius: 5px;">
                        <strong>${libro.titulo}</strong> - ${libro.autor} 
                        <span style="float: right; color: ${libro.disponible ? '#4CAF50' : '#f44336'};">
                            ${libro.disponible ? '✅ Disponible' : '📖 Prestado'}
                        </span>
                    </li>`
                ).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${totalUsuarios > 0 ? `
        <div style="margin-top: 20px;">
            <h5>👥 Usuarios Activos:</h5>
            <ul style="list-style: none; padding: 0;">
                ${Object.values(biblioteca.usuarios).slice(-3).map(usuario => 
                    `<li style="padding: 8px; margin: 5px 0; background: rgba(118, 75, 162, 0.1); border-radius: 5px;">
                        <strong>${usuario.nombre}</strong> - ${usuario.email}
                        <span style="float: right; color: #667eea;">
                            ${usuario.libros_prestados.length} libro(s) prestado(s)
                        </span>
                    </li>`
                ).join('')}
            </ul>
        </div>
        ` : ''}
    `;
}

function showSuccessMessage(message) {
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    
    errorMsg.style.display = 'none';
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

function showErrorMessage(message) {
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    
    successMsg.style.display = 'none';
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
}

function evaluarProyecto() {
    const checkboxes = document.querySelectorAll('[id^="check"]');
    let puntos = 0;
    let completados = 0;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            completados++;
            puntos += 10; // 10 puntos por criterio
        }
    });

    const porcentaje = (completados / checkboxes.length) * 100;
    let nivel = '';
    let color = '';
    let recomendaciones = [];

    if (porcentaje >= 90) {
        nivel = 'EXCELENTE 🏆';
        color = '#4CAF50';
        recomendaciones.push('¡Felicitaciones! Has dominado todos los conceptos.');
        recomendaciones.push('Estás listo para proyectos más avanzados.');
        recomendaciones.push('Considera aprender frameworks como Django o Flask.');
    } else if (porcentaje >= 70) {
        nivel = 'BUENO 👍';
        color = '#FF9800';
        recomendaciones.push('¡Buen trabajo! Tienes una base sólida.');
        recomendaciones.push('Revisa los puntos faltantes para completar el proyecto.');
        recomendaciones.push('Practica más con los conceptos que te faltan.');
    } else if (porcentaje >= 50) {
        nivel = 'REGULAR ⚠️';
        color = '#FF5722';
        recomendaciones.push('Necesitas reforzar varios conceptos.');
        recomendaciones.push('Repasa los módulos anteriores del curso.');
        recomendaciones.push('Practica más antes de continuar.');
    } else {
        nivel = 'INSUFICIENTE ❌';
        color = '#F44336';
        recomendaciones.push('Es necesario repasar todo el curso.');
        recomendaciones.push('Practica cada concepto individualmente.');
        recomendaciones.push('Considera tomar el curso nuevamente.');
    }

    const resultado = document.getElementById('resultadoEvaluacion');
    const puntuacion = document.getElementById('puntuacionTotal');
    const retroalimentacion = document.getElementById('retroalimentacion');

    puntuacion.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: ${color}; margin-bottom: 15px;">${nivel}</h3>
            <div style="font-size: 3rem; font-weight: bold; color: ${color};">${puntos}/100</div>
            <div style="margin-top: 10px;">Criterios completados: ${completados}/${checkboxes.length}</div>
            <div style="width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; margin: 15px 0; overflow: hidden;">
                <div style="width: ${porcentaje}%; height: 100%; background: ${color}; transition: width 2s ease-in-out;"></div>
            </div>
        </div>
    `;

    retroalimentacion.innerHTML = `
        <h4>💡 Recomendaciones:</h4>
        <ul style="list-style: none; padding: 0;">
            ${recomendaciones.map(rec => `<li style="padding: 10px; margin: 5px 0; background: rgba(0,0,0,0.05); border-radius: 5px; border-left: 4px solid ${color};">• ${rec}</li>`).join('')}
        </ul>
    `;

    resultado.style.display = 'block';
}

function mostrarSolucion(nivel) {
    const solucionDiv = document.getElementById('solucionReto');
    const contenidoDiv = document.getElementById('contenidoSolucion');
    
    const soluciones = {
        'principiante': `
            <h4>🔍 Sistema de Búsqueda</h4>
            <p><strong>Enfoque:</strong> Implementa una función que recorra todos los libros y compare el criterio de búsqueda.</p>
            
            <pre style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; font-size: 14px; overflow-x: auto;"><code>def buscar_libros(self, termino, criterio='titulo'):
"""Buscar libros por título, autor o categoría"""
resultados = []
termino_lower = termino.lower()

for libro in self.libros.values():
if criterio == 'titulo' and termino_lower in libro.titulo.lower():
    resultados.append(libro)
elif criterio == 'autor' and termino_lower in libro.autor.lower():
    resultados.append(libro)
elif criterio == 'categoria' and libro.categoria == termino:
    resultados.append(libro)
elif criterio == 'todos':
    if (termino_lower in libro.titulo.lower() or 
        termino_lower in libro.autor.lower() or 
        termino_lower in libro.categoria.lower()):
        resultados.append(libro)

return resultados</code></pre>
            
            <p><strong>Conceptos aplicados:</strong> Bucles, condicionales, manipulación de strings, listas</p>
        `,
        
        'intermedio': `
            <h4>📊 Sistema de Reportes</h4>
            <p><strong>Enfoque:</strong> Utiliza estructuras de datos para contar y ordenar información estadística.</p>
            
            <pre style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; font-size: 14px; overflow-x: auto;"><code>def generar_reportes(self):
"""Generar reportes estadísticos del sistema"""
# Libros más prestados
prestamos_por_libro = {}
for prestamo in self.prestamos:
isbn = prestamo['isbn']
if isbn in prestamos_por_libro:
    prestamos_por_libro[isbn] += 1
else:
    prestamos_por_libro[isbn] = 1

# Ordenar por cantidad de préstamos
libros_populares = sorted(prestamos_por_libro.items(), 
                        key=lambda x: x[1], reverse=True)[:5]

# Usuarios más activos
prestamos_por_usuario = {}
for usuario in self.usuarios.values():
prestamos_por_usuario[usuario.id] = len(usuario.libros_prestados)

usuarios_activos = sorted(prestamos_por_usuario.items(), 
                        key=lambda x: x[1], reverse=True)[:5]

return {
'libros_populares': libros_populares,
'usuarios_activos': usuarios_activos,
'total_prestamos': len(self.prestamos),
'libros_disponibles': sum(1 for libro in self.libros.values() if libro.disponible)
}</code></pre>
            
            <p><strong>Conceptos aplicados:</strong> Diccionarios, funciones lambda, sorting, comprensión de listas</p>
        `,
        
        'avanzado': `
            <h4>🖥️ Interfaz Gráfica con tkinter</h4>
            <p><strong>Enfoque:</strong> Crear una aplicación GUI que integre todas las funcionalidades del sistema.</p>
            
            <pre style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; font-size: 14px; overflow-x: auto;"><code>import tkinter as tk
from tkinter import ttk, messagebox

class BibliotecaGUI:
def __init__(self):
self.root = tk.Tk()
self.root.title("Sistema de Biblioteca")
self.root.geometry("800x600")
self.biblioteca = Biblioteca()

self.crear_menu()
self.crear_widgets()

def crear_menu(self):
menubar = tk.Menu(self.root)
self.root.config(menu=menubar)

# Menú Archivo
archivo_menu = tk.Menu(menubar, tearoff=0)
menubar.add_cascade(label="Archivo", menu=archivo_menu)
archivo_menu.add_command(label="Nuevo", command=self.nuevo_archivo)
archivo_menu.add_command(label="Abrir", command=self.abrir_archivo)
archivo_menu.add_command(label="Guardar", command=self.guardar_archivo)

def crear_widgets(self):
# Notebook para pestañas
notebook = ttk.Notebook(self.root)
notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

# Pestaña de libros
frame_libros = ttk.Frame(notebook)
notebook.add(frame_libros, text="Gestión de Libros")

# Formulario para agregar libros
ttk.Label(frame_libros, text="ISBN:").grid(row=0, column=0, sticky="w", pady=5)
self.isbn_entry = ttk.Entry(frame_libros, width=30)
self.isbn_entry.grid(row=0, column=1, padx=5, pady=5)

ttk.Button(frame_libros, text="Agregar Libro", 
            command=self.agregar_libro_gui).grid(row=1, column=0, columnspan=2, pady=10)

def agregar_libro_gui(self):
# Implementación del formulario de agregar libro
pass</code></pre>
            
            <p><strong>Conceptos aplicados:</strong> POO avanzada, GUI programming, event handling, layout management</p>
        `
    };
    
    contenidoDiv.innerHTML = soluciones[nivel];
    solucionDiv.style.display = 'block';
    
    // Scroll hasta la solución
    solucionDiv.scrollIntoView({ behavior: 'smooth' });
}

function generarCertificado() {
    const certificadoSection = document.getElementById('certificadoSection');
    const fechaCertificado = document.getElementById('fechaCertificado');
    
    fechaCertificado.textContent = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    certificadoSection.style.display = 'block';
    certificadoSection.scrollIntoView({ behavior: 'smooth' });
}

function actualizarCertificado() {
    const nombre = document.getElementById('nombreParaCertificado').value.trim();
    const nombreEstudiante = document.getElementById('nombreEstudiante');
    
    if (nombre) {
        nombreEstudiante.textContent = nombre;
        showSuccessMessage('Certificado actualizado con tu nombre');
    } else {
        showErrorMessage('Por favor ingresa tu nombre');
    }
}

function descargarProyecto() {
    // Crear contenido del proyecto completo
    const proyectoCompleto = `
# Sistema de Gestión de Biblioteca - Proyecto Final
# Curso: Fundamentos de Programación con Python
# Módulo 8: Proyecto Integrador

import json
import os
from datetime import datetime, timedelta

class Libro:
def __init__(self, isbn, titulo, autor, año, categoria="General"):
self.isbn = isbn
self.titulo = titulo
self.autor = autor
self.año = año
self.categoria = categoria
self.disponible = True
self.fecha_prestamo = None
self.usuario_prestamo = None

def to_dict(self):
return {
    'isbn': self.isbn,
    'titulo': self.titulo,
    'autor': self.autor,
    'año': self.año,
    'categoria': self.categoria,
    'disponible': self.disponible,
    'fecha_prestamo': self.fecha_prestamo,
    'usuario_prestamo': self.usuario_prestamo
}

class Usuario:
def __init__(self, id_usuario, nombre, email):
self.id = id_usuario
self.nombre = nombre
self.email = email
self.libros_prestados = []
self.fecha_registro = datetime.now().strftime("%Y-%m-%d")

def to_dict(self):
return {
    'id': self.id,
    'nombre': self.nombre,
    'email': self.email,
    'libros_prestados': self.libros_prestados,
    'fecha_registro': self.fecha_registro
}

class Biblioteca:
def __init__(self):
self.libros = {}
self.usuarios = {}
self.prestamos = []
self.cargar_datos()

def agregar_libro(self, libro):
if libro.isbn not in self.libros:
    self.libros[libro.isbn] = libro
    self.guardar_datos()
    return True
return False

def registrar_usuario(self, usuario):
if usuario.id not in self.usuarios:
    self.usuarios[usuario.id] = usuario
    self.guardar_datos()
    return True
return False

def prestar_libro(self, isbn, id_usuario):
if isbn in self.libros and id_usuario in self.usuarios:
    libro = self.libros[isbn]
    usuario = self.usuarios[id_usuario]
    
    if libro.disponible and len(usuario.libros_prestados) < 3:
        libro.disponible = False
        libro.fecha_prestamo = datetime.now().strftime("%Y-%m-%d")
        libro.usuario_prestamo = id_usuario
        usuario.libros_prestados.append(isbn)
        
        self.prestamos.append({
            'isbn': isbn,
            'usuario': id_usuario,
            'fecha_prestamo': libro.fecha_prestamo,
            'fecha_devolucion': None
        })
        
        self.guardar_datos()
        return True
return False

def devolver_libro(self, isbn):
if isbn in self.libros:
    libro = self.libros[isbn]
    if not libro.disponible:
        usuario = self.usuarios[libro.usuario_prestamo]
        usuario.libros_prestados.remove(isbn)
        
        # Actualizar registro de préstamo
        for prestamo in self.prestamos:
            if prestamo['isbn'] == isbn and prestamo['fecha_devolucion'] is None:
                prestamo['fecha_devolucion'] = datetime.now().strftime("%Y-%m-%d")
                break
        
        libro.disponible = True
        libro.fecha_prestamo = None
        libro.usuario_prestamo = None
        
        self.guardar_datos()
        return True
return False

def buscar_libros(self, termino, criterio='titulo'):
resultados = []
termino_lower = termino.lower()

for libro in self.libros.values():
    if criterio == 'titulo' and termino_lower in libro.titulo.lower():
        resultados.append(libro)
    elif criterio == 'autor' and termino_lower in libro.autor.lower():
        resultados.append(libro)
    elif criterio == 'categoria' and libro.categoria == termino:
        resultados.append(libro)

return resultados

def guardar_datos(self):
try:
    datos = {
        'libros': {isbn: libro.to_dict() for isbn, libro in self.libros.items()},
        'usuarios': {id_u: usuario.to_dict() for id_u, usuario in self.usuarios.items()},
        'prestamos': self.prestamos,
        'version': '1.0',
        'ultima_actualizacion': datetime.now().isoformat()
    }
    
    with open('biblioteca.json', 'w', encoding='utf-8') as file:
        json.dump(datos, file, indent=4, ensure_ascii=False)
        
except Exception as e:
    print(f"Error al guardar datos: {e}")

def cargar_datos(self):
try:
    if os.path.exists('biblioteca.json'):
        with open('biblioteca.json', 'r', encoding='utf-8') as file:
            datos = json.load(file)
            
            # Cargar libros
            for isbn, libro_data in datos.get('libros', {}).items():
                libro = Libro(
                    libro_data['isbn'],
                    libro_data['titulo'],
                    libro_data['autor'],
                    libro_data['año'],
                    libro_data.get('categoria', 'General')
                )
                libro.disponible = libro_data['disponible']
                libro.fecha_prestamo = libro_data['fecha_prestamo']
                libro.usuario_prestamo = libro_data['usuario_prestamo']
                self.libros[isbn] = libro
            
            # Cargar usuarios
            for id_u, usuario_data in datos.get('usuarios', {}).items():
                usuario = Usuario(
                    usuario_data['id'],
                    usuario_data['nombre'],
                    usuario_data['email']
                )
                usuario.libros_prestados = usuario_data['libros_prestados']
                usuario.fecha_registro = usuario_data['fecha_registro']
                self.usuarios[id_u] = usuario
            
            # Cargar préstamos
            self.prestamos = datos.get('prestamos', [])
            
except Exception as e:
    print(f"Error al cargar datos: {e}")

def main():
biblioteca = Biblioteca()

while True:
print("\\n" + "="*50)
print("        SISTEMA DE BIBLIOTECA")
print("="*50)
print("1. 📚 Gestión de Libros")
print("2. 👥 Gestión de Usuarios") 
print("3. 📖 Préstamos y Devoluciones")
print("4. 🔍 Búsquedas")
print("5. 📊 Reportes")
print("0. 🚪 Salir")
print("="*50)

opcion = input("Seleccione una opción: ").strip()

if opcion == '1':
    menu_libros(biblioteca)
elif opcion == '2':
    menu_usuarios(biblioteca)
elif opcion == '3':
    menu_prestamos(biblioteca)
elif opcion == '4':
    menu_busquedas(biblioteca)
elif opcion == '5':
    menu_reportes(biblioteca)
elif opcion == '0':
    print("¡Gracias por usar el sistema!")
    break
else:
    print("❌ Opción inválida")

if __name__ == "__main__":
main()
    `;

    // Crear elemento para descarga
    const elemento = document.createElement('a');
    const archivo = new Blob([proyectoCompleto], { type: 'text/plain' });
    elemento.href = URL.createObjectURL(archivo);
    elemento.download = 'sistema_biblioteca.py';
    documento.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
    
    showSuccessMessage('Proyecto descargado exitosamente como sistema_biblioteca.py');
}

function siguientesPasos() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); display: flex; align-items: center; 
        justify-content: center; z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; text-align: center;">🚀 Próximos Pasos en tu Carrera</h2>
            
            <h3 style="color: #667eea;">📚 Continúa Aprendiendo:</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>🌐 Desarrollo Web:</strong> Django, Flask, FastAPI
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>📊 Data Science:</strong> Pandas, NumPy, Matplotlib
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>🤖 Machine Learning:</strong> Scikit-learn, TensorFlow
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>🏗️ APIs:</strong> REST, GraphQL, microservicios
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>🗄️ Bases de Datos:</strong> PostgreSQL, MongoDB
                </li>
            </ul>
            
            <h3 style="color: #667eea; margin-top: 25px;">💼 Oportunidades Profesionales:</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>Desarrollador Backend:</strong> APIs y sistemas servidor
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>Analista de Datos:</strong> Insights y visualizaciones
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>DevOps Engineer:</strong> Automatización y deployment
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong>QA Automation:</strong> Testing automatizado
                </li>
            </ul>
            
            <h3 style="color: #667eea; margin-top: 25px;">🛠️ Proyectos Recomendados:</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0;">• Blog personal con Django</li>
                <li style="padding: 8px 0;">• Sistema de inventario con base de datos</li>
                <li style="padding: 8px 0;">• API REST para e-commerce</li>
                <li style="padding: 8px 0;">• Bot de análisis de redes sociales</li>
                <li style="padding: 8px 0;">• Dashboard de métricas en tiempo real</li>
            </ul>
            
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; 
                                border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; 
                                font-size: 1rem; font-weight: bold;">
                    ¡Entendido! 🚀
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el primer paso por defecto
    showStep(1);
    actualizarEstadoSistema();
    
    // Agregar algunos datos de ejemplo
    setTimeout(() => {
        biblioteca.libros = {
            '978-1234567890': {
                isbn: '978-1234567890',
                titulo: 'Introducción a Python',
                autor: 'Juan Pérez',
                año: 2023,
                categoria: 'Tecnología',
                disponible: true,
                fecha_prestamo: null,
                usuario_prestamo: null
            },
            '978-0987654321': {
                isbn: '978-0987654321',
                titulo: 'Estructuras de Datos',
                autor: 'María García',
                año: 2022,
                categoria: 'Ciencia',
                disponible: false,
                fecha_prestamo: '2024-08-15',
                usuario_prestamo: 'U001'
            }
        };
        
        biblioteca.usuarios = {
            'U001': {
                id: 'U001',
                nombre: 'Ana Estudiante',
                email: 'ana@ejemplo.com',
                libros_prestados: ['978-0987654321'],
                fecha_registro: '2024-08-01'
            }
        };
        
        actualizarEstadoSistema();
    }, 1000);
});

// Función adicional para simular carga de datos
function cargarDatosEjemplo() {
    const librosEjemplo = [
        { isbn: '978-1111111111', titulo: 'Algoritmos y Programación', autor: 'Carlos Ruiz', año: 2023, categoria: 'Tecnología' },
        { isbn: '978-2222222222', titulo: 'Base de Datos Relacionales', autor: 'Sofia Martinez', año: 2022, categoria: 'Tecnología' },
        { isbn: '978-3333333333', titulo: 'Inteligencia Artificial', autor: 'Roberto Silva', año: 2024, categoria: 'Ciencia' },
        { isbn: '978-4444444444', titulo: 'Historia de la Computación', autor: 'Elena Torres', año: 2021, categoria: 'Historia' },
        { isbn: '978-5555555555', titulo: 'Matemáticas Discretas', autor: 'Pedro Jiménez', año: 2023, categoria: 'Ciencia' }
    ];

    librosEjemplo.forEach(libroData => {
        if (!biblioteca.libros[libroData.isbn]) {
            biblioteca.libros[libroData.isbn] = {
                ...libroData,
                disponible: Math.random() > 0.3, // 70% disponibles
                fecha_prestamo: null,
                usuario_prestamo: null
            };
        }
    });

    const usuariosEjemplo = [
        { id: 'U002', nombre: 'Luis Rodríguez', email: 'luis@ejemplo.com' },
        { id: 'U003', nombre: 'Carmen López', email: 'carmen@ejemplo.com' },
        { id: 'U004', nombre: 'Diego Morales', email: 'diego@ejemplo.com' }
    ];

    usuariosEjemplo.forEach(usuarioData => {
        if (!biblioteca.usuarios[usuarioData.id]) {
            biblioteca.usuarios[usuarioData.id] = {
                ...usuarioData,
                libros_prestados: [],
                fecha_registro: '2024-08-' + String(Math.floor(Math.random() * 19) + 1).padStart(2, '0')
            };
        }
    });

    actualizarEstadoSistema();
    showSuccessMessage('Datos de ejemplo cargados exitosamente');
}

// Función para limpiar todos los datos
function limpiarDatos() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos?')) {
        biblioteca.libros = {};
        biblioteca.usuarios = {};
        biblioteca.prestamos = [];
        actualizarEstadoSistema();
        showSuccessMessage('Todos los datos han sido eliminados');
    }
}

// Función para exportar datos como JSON
function exportarDatos() {
    const datos = {
        libros: biblioteca.libros,
        usuarios: biblioteca.usuarios,
        prestamos: biblioteca.prestamos,
        fecha_exportacion: new Date().toISOString(),
        version: '1.0'
    };

    const elemento = document.createElement('a');
    const archivo = new Blob([JSON.stringify(datos, null, 4)], { type: 'application/json' });
    elemento.href = URL.createObjectURL(archivo);
    elemento.download = `biblioteca_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
    
    showSuccessMessage('Datos exportados exitosamente');
}

// Agregar botones adicionales al final de la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const container = document.querySelector('.container');
        const botonesAdicionales = document.createElement('div');
        botonesAdicionales.style.cssText = 'text-align: center; margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;';
        botonesAdicionales.innerHTML = `
            <h3 style="color: white; margin-bottom: 20px;">🛠️ Herramientas Adicionales</h3>
            <button class="btn btn-secondary" onclick="cargarDatosEjemplo()">📝 Cargar Datos de Ejemplo</button>
            <button class="btn" onclick="exportarDatos()">💾 Exportar Datos</button>
            <button class="btn" onclick="limpiarDatos()" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24);">🗑️ Limpiar Datos</button>
        `;
        container.appendChild(botonesAdicionales);
    }, 2000);
});

// Función para mostrar estadísticas avanzadas
function mostrarEstadisticasAvanzadas() {
    const totalLibros = Object.keys(biblioteca.libros).length;
    const totalUsuarios = Object.keys(biblioteca.usuarios).length;
    const librosPrestados = Object.values(biblioteca.libros).filter(libro => !libro.disponible).length;
    
    // Análisis por categorías
    const categorias = {};
    Object.values(biblioteca.libros).forEach(libro => {
        categorias[libro.categoria] = (categorias[libro.categoria] || 0) + 1;
    });

    // Usuario más activo
    let usuarioMasActivo = null;
    let maxPrestamos = 0;
    Object.values(biblioteca.usuarios).forEach(usuario => {
        if (usuario.libros_prestados.length > maxPrestamos) {
            maxPrestamos = usuario.libros_prestados.length;
            usuarioMasActivo = usuario;
        }
    });

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); display: flex; align-items: center; 
        justify-content: center; z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center;">📊 Estadísticas Avanzadas</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0;">📚 Total Libros</h3>
                    <p style="font-size: 2rem; font-weight: bold; margin: 0;">${totalLibros}</p>
                </div>
                <div style="background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0;">👥 Total Usuarios</h3>
                    <p style="font-size: 2rem; font-weight: bold; margin: 0;">${totalUsuarios}</p>
                </div>
                <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0;">📖 Prestados</h3>
                    <p style="font-size: 2rem; font-weight: bold; margin: 0;">${librosPrestados}</p>
                </div>
            </div>

            <h3 style="color: #2c3e50; margin-bottom: 15px;">📈 Distribución por Categorías:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                ${Object.entries(categorias).map(([categoria, cantidad]) => `
                    <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #dee2e6;">
                        <span><strong>${categoria}:</strong></span>
                        <span>${cantidad} libro(s)</span>
                    </div>
                `).join('')}
            </div>

            ${usuarioMasActivo ? `
                <h3 style="color: #2c3e50; margin-bottom: 15px;">🏆 Usuario Más Activo:</h3>
                <div style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 20px; border-radius: 15px; text-align: center; margin-bottom: 25px;">
                    <h4 style="margin: 0 0 10px 0;">${usuarioMasActivo.nombre}</h4>
                    <p style="margin: 0; opacity: 0.9;">${usuarioMasActivo.email}</p>
                    <p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0 0 0;">${maxPrestamos} libro(s) prestado(s)</p>
                </div>
            ` : ''}
            
            <div style="text-align: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; 
                                border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; 
                                font-size: 1rem; font-weight: bold;">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Agregar botón de estadísticas avanzadas
setTimeout(() => {
    const existingButtons = document.querySelector('.section:last-child .btn');
    if (existingButtons && existingButtons.parentElement) {
        const statsButton = document.createElement('button');
        statsButton.className = 'btn';
        statsButton.style.background = 'linear-gradient(45deg, #f093fb, #f5576c)';
        statsButton.innerHTML = '📊 Estadísticas Avanzadas';
        statsButton.onclick = mostrarEstadisticasAvanzadas;
        existingButtons.parentElement.appendChild(statsButton);
    }
}, 3000);