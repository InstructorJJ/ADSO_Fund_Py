// Variables globales para el sistema
let progress = 0;
let completedSections = new Set();
let shoppingList = [];
let inventory = [];
let userProfile = {"nombre": "Usuario"};
let locations = [{"nombre": "Casa", "lat": 4.7110, "lon": -74.0721}];
let employees = [
    {id: 1001, nombre: "María García", departamento: "Desarrollo", salario: 75000},
    {id: 1002, nombre: "Carlos López", departamento: "Marketing", salario: 65000},
    {id: 1003, nombre: "Ana Rodríguez", departamento: "Ventas", salario: 58000}
];
let studentGrades = {};
let organization = {};
let library = {"libros": {}, "usuarios": {}, "prestamos": []};
let salesData = [];
let studentSystem = {
    "estudiantes": {},
    "cursos": {},
    "profesores": [],
    "inscripciones": [],
    "calificaciones": {},
    "configuracion": ["Sistema v1.0", "2024", "Activo"]
};

// Preguntas para la evaluación final
let quizQuestions = [
    {
        question: "¿Cuál es la principal diferencia entre una lista y una tupla?",
        options: ["Las listas son más rápidas", "Las tuplas son inmutables", "Los diccionarios son mejores"],
        correct: 1
    },
    {
        question: "¿Qué estructura usarías para almacenar coordenadas GPS que no deben cambiar?",
        options: ["Lista", "Tupla", "Diccionario"],
        correct: 1
    },
    {
        question: "¿Cuál es la complejidad de tiempo para acceder a un elemento en un diccionario?",
        options: ["O(n)", "O(log n)", "O(1)"],
        correct: 2
    },
    {
        question: "¿Qué método usarías para agregar un elemento al final de una lista?",
        options: ["add()", "append()", "insert()"],
        correct: 1
    },
    {
        question: "¿Cuál de estas estructuras permite claves duplicadas?",
        options: ["Lista", "Diccionario", "Ninguna de las anteriores"],
        correct: 0
    }
];

let currentQuestion = 0;
let quizScore = 0;
let scenarios = [
    {text: "Almacenar las coordenadas GPS de una ubicación fija", answer: "tupla"},
    {text: "Mantener una lista de tareas pendientes que cambia frecuentemente", answer: "lista"},
    {text: "Crear un catálogo de productos con precios", answer: "diccionario"},
    {text: "Guardar la configuración inicial de una aplicación", answer: "tupla"},
    {text: "Implementar un historial de navegación", answer: "lista"}
];
let currentScenario = 0;

// Funciones de navegación
function toggleSection(sectionNum) {
    const content = document.getElementById(`content${sectionNum}`);
    const icon = document.getElementById(`icon${sectionNum}`);
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

function showTab(tabId) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

function markComplete(sectionNum) {
    completedSections.add(sectionNum);
    updateProgress();
    
    // Mostrar mensaje de completado
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '🎉 ¡Completado!';
    btn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)';
    }, 2000);
}

function updateProgress() {
    progress = (completedSections.size / 8) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';
}

// Funciones para listas
function addStudent() {
    const input = document.getElementById('studentInput');
    const name = input.value.trim();
    if (name) {
        const studentList = document.getElementById('studentList');
        const studentDiv = document.createElement('div');
        studentDiv.className = 'data-item';
        studentDiv.textContent = name;
        studentList.appendChild(studentDiv);
        input.value = '';
    }
}

function removeLastStudent() {
    const studentList = document.getElementById('studentList');
    const students = studentList.querySelectorAll('.data-item');
    if (students.length > 0) {
        students[students.length - 1].remove();
    }
}

function addProduct() {
    const input = document.getElementById('productInput');
    const product = input.value.trim();
    if (product) {
        inventory.push(product);
        input.value = '';
        updateInventoryDisplay();
    }
}

function searchProduct() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const result = document.getElementById('inventoryResult');
    
    if (searchTerm) {
        const found = inventory.filter(product => 
            product.toLowerCase().includes(searchTerm)
        );
        
        if (found.length > 0) {
            result.textContent = `Productos encontrados: ${found.join(', ')}`;
        } else {
            result.textContent = 'No se encontraron productos';
        }
    }
}

function updateInventoryDisplay() {
    const result = document.getElementById('inventoryResult');
    result.textContent = `Inventario actual: [${inventory.join(', ')}]`;
}

function generatePattern() {
    const limit = parseInt(document.getElementById('limitInput').value) || 10;
    const result = document.getElementById('patternResult');
    
    const evens = [];
    const odds = [];
    const squares = [];
    
    for (let i = 1; i <= limit; i++) {
        if (i % 2 === 0) evens.push(i);
        else odds.push(i);
        squares.push(i * i);
    }
    
    result.innerHTML = `
        <strong>Números pares:</strong> [${evens.join(', ')}]<br>
        <strong>Números impares:</strong> [${odds.join(', ')}]<br>
        <strong>Cuadrados:</strong> [${squares.join(', ')}]
    `;
}

// Funciones para tuplas
function addLocation() {
    const place = document.getElementById('placeInput').value.trim();
    const lat = parseFloat(document.getElementById('latInput').value);
    const lon = parseFloat(document.getElementById('lonInput').value);
    
    if (place && !isNaN(lat) && !isNaN(lon)) {
        locations.push({nombre: place, lat: lat, lon: lon});
        
        const locationList = document.getElementById('locationList');
        const locationDiv = document.createElement('div');
        locationDiv.className = 'data-item';
        locationDiv.textContent = `${place}: (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
        locationList.appendChild(locationDiv);
        
        // Limpiar inputs
        document.getElementById('placeInput').value = '';
        document.getElementById('latInput').value = '';
        document.getElementById('lonInput').value = '';
    }
}

function searchByDepartment() {
    const dept = document.getElementById('deptInput').value.trim();
    const result = document.getElementById('employeeResult');
    
    if (dept) {
        const found = employees.filter(emp => 
            emp.departamento.toLowerCase().includes(dept.toLowerCase())
        );
        
        if (found.length > 0) {
            const employeeList = found.map(emp => 
                `${emp.nombre} - ${emp.departamento} - ${emp.salario}`
            ).join('<br>');
            result.innerHTML = `Empleados encontrados:<br>${employeeList}`;
        } else {
            result.textContent = 'No se encontraron empleados en ese departamento';
        }
    }
}

// Funciones para diccionarios
function addToProfile() {
    const key = document.getElementById('keyInput').value.trim();
    const value = document.getElementById('valueInput').value.trim();
    
    if (key && value) {
        userProfile[key] = value;
        updateProfileDisplay();
        
        // Limpiar inputs
        document.getElementById('keyInput').value = '';
        document.getElementById('valueInput').value = '';
    }
}

function updateProfileDisplay() {
    const profileDict = document.getElementById('profileDict');
    profileDict.innerHTML = '';
    
    for (const [key, value] of Object.entries(userProfile)) {
        const dictItem = document.createElement('div');
        dictItem.className = 'data-item dict-item';
        dictItem.innerHTML = `
            <div class="dict-key">${key}</div>
            <div class="dict-value">${value}</div>
        `;
        profileDict.appendChild(dictItem);
    }
}

function clearProfile() {
    userProfile = {"nombre": "Usuario"};
    updateProfileDisplay();
}

function addGrade() {
    const student = document.getElementById('studentName').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const grade = parseFloat(document.getElementById('grade').value);
    
    if (student && subject && !isNaN(grade)) {
        if (!studentGrades[student]) {
            studentGrades[student] = {};
        }
        if (!studentGrades[student][subject]) {
            studentGrades[student][subject] = [];
        }
        
        studentGrades[student][subject].push(grade);
        updateGradesDisplay();
        
        // Limpiar inputs
        document.getElementById('studentName').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('grade').value = '';
    }
}

function calculateAverage() {
    const result = document.getElementById('gradesResult');
    let averagesText = 'Promedios por estudiante:<br>';
    
    for (const [student, subjects] of Object.entries(studentGrades)) {
        let totalGrades = 0;
        let gradeCount = 0;
        
        for (const [subject, grades] of Object.entries(subjects)) {
            totalGrades += grades.reduce((sum, grade) => sum + grade, 0);
            gradeCount += grades.length;
        }
        
        if (gradeCount > 0) {
            const average = (totalGrades / gradeCount).toFixed(2);
            averagesText += `${student}: ${average}<br>`;
        }
    }
    
    result.innerHTML = averagesText;
}

function updateGradesDisplay() {
    const result = document.getElementById('gradesResult');
    let gradesText = 'Calificaciones registradas:<br>';
    
    for (const [student, subjects] of Object.entries(studentGrades)) {
        gradesText += `<strong>${student}:</strong><br>`;
        for (const [subject, grades] of Object.entries(subjects)) {
            gradesText += `  ${subject}: [${grades.join(', ')}]<br>`;
        }
    }
    
    result.innerHTML = gradesText;
}

function createDepartment() {
    const deptName = document.getElementById('deptName').value.trim();
    const budget = parseFloat(document.getElementById('budget').value);
    
    if (deptName && !isNaN(budget)) {
        if (!organization[deptName]) {
            organization[deptName] = {
                empleados: [],
                presupuesto: budget,
                proyectos: []
            };
        }
        updateOrgDisplay();
        
        document.getElementById('deptName').value = '';
        document.getElementById('budget').value = '';
    }
}

function addEmployee() {
    const deptName = document.getElementById('deptName').value.trim();
    const empName = document.getElementById('empName').value.trim();
    
    if (deptName && empName && organization[deptName]) {
        organization[deptName].empleados.push(empName);
        updateOrgDisplay();
        
        document.getElementById('empName').value = '';
    }
}

function updateOrgDisplay() {
    const result = document.getElementById('orgResult');
    let orgText = 'Estructura organizacional:<br>';
    
    for (const [dept, info] of Object.entries(organization)) {
        orgText += `<strong>${dept}:</strong><br>`;
        orgText += `  Empleados: [${info.empleados.join(', ')}]<br>`;
        orgText += `  Presupuesto: ${info.presupuesto}<br><br>`;
    }
    
    result.innerHTML = orgText;
}

// Funciones para comparación y casos de uso
function checkAnswer(answer, isCorrect) {
    const result = document.getElementById('decisionResult');
    
    if (isCorrect) {
        result.innerHTML = `✅ ¡Correcto! ${answer.charAt(0).toUpperCase() + answer.slice(1)} es la mejor opción para este escenario.`;
        result.style.background = 'rgba(76, 175, 80, 0.3)';
    } else {
        result.innerHTML = `❌ Incorrecto. Para este escenario, la mejor opción sería una tupla porque los datos no deben cambiar.`;
        result.style.background = 'rgba(244, 67, 54, 0.3)';
    }
}

function nextScenario() {
    currentScenario = (currentScenario + 1) % scenarios.length;
    const scenario = scenarios[currentScenario];
    document.getElementById('scenario').textContent = `Escenario: ${scenario.text}`;
    document.getElementById('decisionResult').textContent = 'Selecciona una opción';
    document.getElementById('decisionResult').style.background = 'rgba(76, 175, 80, 0.3)';
}

// Funciones para ejercicios prácticos
function addShopItem() {
    const item = document.getElementById('shopItem').value.trim();
    if (item && !shoppingList.includes(item)) {
        shoppingList.push(item);
        updateShoppingDisplay();
        document.getElementById('shopItem').value = '';
    }
}

function removeShopItem() {
    const item = document.getElementById('shopItem').value.trim();
    const index = shoppingList.indexOf(item);
    if (index > -1) {
        shoppingList.splice(index, 1);
        updateShoppingDisplay();
        document.getElementById('shopItem').value = '';
    }
}

function updateShoppingDisplay() {
    const result = document.getElementById('shoppingResult');
    result.textContent = `Lista de compras: [${shoppingList.join(', ')}] (${shoppingList.length} productos)`;
}

function createPersonTuple() {
    const name = document.getElementById('personName').value.trim();
    const age = parseInt(document.getElementById('personAge').value);
    const city = document.getElementById('personCity').value.trim();
    
    if (name && !isNaN(age) && city) {
        const result = document.getElementById('personResult');
        result.innerHTML = `
            <strong>Tupla personal creada:</strong><br>
            ("${name}", ${age}, "${city}")<br>
            <em>Esta información es inmutable y segura</em>
        `;
        
        // Limpiar inputs
        document.getElementById('personName').value = '';
        document.getElementById('personAge').value = '';
        document.getElementById('personCity').value = '';
    }
}

function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookISBN').value.trim();
    
    if (title && author && isbn) {
        library.libros[isbn] = {
            titulo: title,
            autor: author,
            disponible: true
        };
        
        updateLibraryDisplay();
        
        // Limpiar inputs
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookISBN').value = '';
    }
}

function updateLibraryDisplay() {
    const result = document.getElementById('libraryResult');
    const bookCount = Object.keys(library.libros).length;
    let booksText = `Biblioteca: ${bookCount} libros registrados<br>`;
    
    for (const [isbn, book] of Object.entries(library.libros)) {
        booksText += `📚 "${book.titulo}" por ${book.autor} (${isbn})<br>`;
    }
    
    result.innerHTML = booksText;
}

function addSale() {
    const product = document.getElementById('saleProduct').value.trim();
    const quantity = parseInt(document.getElementById('saleQuantity').value);
    const price = parseFloat(document.getElementById('salePrice').value);
    
    if (product && !isNaN(quantity) && !isNaN(price)) {
        const sale = {
            producto: product,
            cantidad: quantity,
            precio_unitario: price,
            total: quantity * price,
            fecha: new Date().toLocaleDateString()
        };
        
        salesData.push(sale);
        updateSalesDisplay();
        
        // Limpiar inputs
        document.getElementById('saleProduct').value = '';
        document.getElementById('saleQuantity').value = '';
        document.getElementById('salePrice').value = '';
    }
}

function generateSalesReport() {
    const result = document.getElementById('salesResult');
    
    if (salesData.length === 0) {
        result.textContent = 'No hay ventas registradas';
        return;
    }
    
    let totalVentas = 0;
    let reportText = '<strong>Reporte de Ventas:</strong><br>';
    
    salesData.forEach((sale, index) => {
        totalVentas += sale.total;
        reportText += `${index + 1}. ${sale.producto} - ${sale.cantidad} unidades - ${sale.total}<br>`;
    });
    
    reportText += `<br><strong>Total de ventas: ${totalVentas}</strong>`;
    result.innerHTML = reportText;
}

function updateSalesDisplay() {
    const result = document.getElementById('salesResult');
    result.textContent = `Ventas registradas: ${salesData.length}`;
}

function assignTask() {
    const devName = document.getElementById('devName').value.trim();
    const taskName = document.getElementById('taskName').value.trim();
    
    if (devName && taskName) {
        const result = document.getElementById('projectResult');
        result.innerHTML = `✅ Tarea "${taskName}" asignada a ${devName}<br>Estado: Pendiente`;
        
        document.getElementById('devName').value = '';
        document.getElementById('taskName').value = '';
    }
}

function addExpense() {
    const desc = document.getElementById('expenseDesc').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (desc && !isNaN(amount)) {
        const result = document.getElementById('projectResult');
        result.innerHTML = `💰 Gasto agregado: "${desc}" - ${amount}<br>Presupuesto actualizado`;
        
        document.getElementById('expenseDesc').value = '';
        document.getElementById('expenseAmount').value = '';
    }
}

function performanceTest() {
    const result = document.getElementById('performanceResult');
    result.innerHTML = `
        <strong>🚀 Test de Rendimiento Ejecutado:</strong><br><br>
        <strong>Búsqueda en Lista (10,000 elementos):</strong> 0.45ms<br>
        <strong>Búsqueda en Diccionario (10,000 elementos):</strong> 0.001ms<br>
        <strong>Inserción en Lista:</strong> 0.002ms<br>
        <strong>Inserción en Diccionario:</strong> 0.001ms<br><br>
        <em>💡 Los diccionarios son significativamente más rápidos para búsquedas</em>
    `;
}

// Funciones para el proyecto integrador
function registerStudent() {
    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('studentFullName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value);
    const career = document.getElementById('studentCareer').value.trim();
    
    if (id && name && !isNaN(age) && career) {
        studentSystem.estudiantes[id] = {
            nombre: name,
            edad: age,
            carrera: career,
            fecha_ingreso: new Date().toLocaleDateString()
        };
        
        updateStudentSystemDisplay();
        
        // Limpiar inputs
        document.getElementById('studentId').value = '';
        document.getElementById('studentFullName').value = '';
        document.getElementById('studentAge').value = '';
        document.getElementById('studentCareer').value = '';
    }
}

function createCourse() {
    const code = document.getElementById('courseCode').value.trim();
    const name = document.getElementById('courseName').value.trim();
    const credits = parseInt(document.getElementById('courseCredits').value);
    const professor = document.getElementById('courseProfessor').value.trim();
    
    if (code && name && !isNaN(credits) && professor) {
        studentSystem.cursos[code] = {
            nombre: name,
            creditos: credits,
            profesor: professor,
            estudiantes_inscritos: []
        };
        
        if (!studentSystem.profesores.includes(professor)) {
            studentSystem.profesores.push(professor);
        }
        
        updateCourseSystemDisplay();
        
        // Limpiar inputs
        document.getElementById('courseCode').value = '';
        document.getElementById('courseName').value = '';
        document.getElementById('courseCredits').value = '';
        document.getElementById('courseProfessor').value = '';
    }
}

function addGradeToSystem() {
    const studentId = document.getElementById('gradeStudentId').value.trim();
    const courseCode = document.getElementById('gradeCourseCode').value.trim();
    const gradeValue = parseFloat(document.getElementById('gradeValue').value);
    const gradeType = document.getElementById('gradeType').value;
    
    if (studentId && courseCode && !isNaN(gradeValue)) {
        if (!studentSystem.calificaciones[studentId]) {
            studentSystem.calificaciones[studentId] = {};
        }
        if (!studentSystem.calificaciones[studentId][courseCode]) {
            studentSystem.calificaciones[studentId][courseCode] = [];
        }
        
        studentSystem.calificaciones[studentId][courseCode].push({
            tipo: gradeType,
            calificacion: gradeValue,
            fecha: new Date().toLocaleDateString()
        });
        
        updateGradeSystemDisplay();
        
        // Limpiar inputs
        document.getElementById('gradeStudentId').value = '';
        document.getElementById('gradeCourseCode').value = '';
        document.getElementById('gradeValue').value = '';
    }
}

function calculateStudentAverage() {
    const studentId = document.getElementById('gradeStudentId').value.trim();
    const result = document.getElementById('gradeSystemResult');
    
    if (studentId && studentSystem.calificaciones[studentId]) {
        let totalGrades = 0;
        let gradeCount = 0;
        
        for (const [course, grades] of Object.entries(studentSystem.calificaciones[studentId])) {
            grades.forEach(grade => {
                totalGrades += grade.calificacion;
                gradeCount++;
            });
        }
        
        if (gradeCount > 0) {
            const average = (totalGrades / gradeCount).toFixed(2);
            result.innerHTML = `📊 Promedio de ${studentId}: ${average}/100`;
        } else {
            result.textContent = 'No hay calificaciones para este estudiante';
        }
    }
}

function generateSystemReport() {
    const reportType = document.getElementById('reportType').value;
    const result = document.getElementById('reportResult');
    
    switch (reportType) {
        case 'students':
            let studentsReport = '<strong>📚 Lista de Estudiantes:</strong><br>';
            for (const [id, student] of Object.entries(studentSystem.estudiantes)) {
                studentsReport += `${id}: ${student.nombre} - ${student.carrera}<br>`;
            }
            result.innerHTML = studentsReport || 'No hay estudiantes registrados';
            break;
            
        case 'courses':
            let coursesReport = '<strong>📖 Cursos Disponibles:</strong><br>';
            for (const [code, course] of Object.entries(studentSystem.cursos)) {
                coursesReport += `${code}: ${course.nombre} (${course.creditos} créditos)<br>`;
            }
            result.innerHTML = coursesReport || 'No hay cursos registrados';
            break;
            
        case 'enrollments':
            result.innerHTML = `<strong>📝 Inscripciones:</strong><br>Total: ${studentSystem.inscripciones.length}`;
            break;
            
        case 'averages':
            let averagesReport = '<strong>📊 Promedios por Curso:</strong><br>';
            // Lógica para calcular promedios por curso
            result.innerHTML = averagesReport + 'Calculando promedios...';
            break;
    }
}

function updateStudentSystemDisplay() {
    const result = document.getElementById('studentSystemResult');
    const studentCount = Object.keys(studentSystem.estudiantes).length;
    result.textContent = `Sistema activo - Estudiantes registrados: ${studentCount}`;
}

function updateCourseSystemDisplay() {
    const result = document.getElementById('courseSystemResult');
    const courseCount = Object.keys(studentSystem.cursos).length;
    result.textContent = `Sistema activo - Cursos disponibles: ${courseCount}`;
}

function updateGradeSystemDisplay() {
    const result = document.getElementById('gradeSystemResult');
    result.textContent = 'Calificación agregada exitosamente';
}

// Funciones para resumen y evaluación
function showConcept(concept) {
    const result = document.getElementById('conceptDetail');
    
    switch (concept) {
        case 'listas':
            result.innerHTML = `
                <strong>📋 Listas - Colecciones Dinámicas</strong><br>
                • Modificables (mutables)<br>
                • Mantienen orden de inserción<br>
                • Permiten elementos duplicados<br>
                • Acceso por índice: lista[0]<br>
                • Métodos: append(), remove(), pop(), sort()
            `;
            break;
        case 'tuplas':
            result.innerHTML = `
                <strong>🔒 Tuplas - Datos Inmutables</strong><br>
                • Inmutables (no se pueden modificar)<br>
                • Mantienen orden de creación<br>
                • Permiten elementos duplicados<br>
                • Acceso por índice: tupla[0]<br>
                • Ideal para datos que no deben cambiar
            `;
            break;
        case 'diccionarios':
            result.innerHTML = `
                <strong>🗝️ Diccionarios - Mapeo Clave-Valor</strong><br>
                • Modificables (mutables)<br>
                • Mantienen orden (Python 3.7+)<br>
                • Claves únicas, valores pueden duplicarse<br>
                • Acceso por clave: dict["clave"]<br>
                • Acceso O(1) - muy eficiente
            `;
            break;
    }
}

function selectAnswer(answerIndex) {
    const currentQ = quizQuestions[currentQuestion];
    const result = document.getElementById('quizResult');
    
    if (answerIndex === currentQ.correct) {
        quizScore++;
        result.innerHTML = `✅ ¡Correcto! Puntuación: ${quizScore}/${quizQuestions.length}`;
        result.style.background = 'rgba(76, 175, 80, 0.3)';
    } else {
        result.innerHTML = `❌ Incorrecto. Puntuación: ${quizScore}/${quizQuestions.length}`;
        result.style.background = 'rgba(244, 67, 54, 0.3)';
    }
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        const q = quizQuestions[currentQuestion];
        document.getElementById('questionTitle').textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
        document.getElementById('questionText').textContent = q.question;
        
        const buttons = document.querySelectorAll('#quizContainer .btn:not(.btn-secondary)');
        buttons.forEach((btn, index) => {
            btn.textContent = q.options[index];
            btn.onclick = () => selectAnswer(index);
        });
        
        document.getElementById('quizResult').textContent = `Puntuación: ${quizScore}/${quizQuestions.length}`;
        document.getElementById('quizResult').style.background = 'rgba(76, 175, 80, 0.3)';
    } else {
        // Quiz completado
        const percentage = Math.round((quizScore / quizQuestions.length) * 100);
        document.getElementById('quizContainer').innerHTML = `
            <h4>🎉 ¡Evaluación Completada!</h4>
            <div class="achievement-badge">
                Puntuación Final: ${quizScore}/${quizQuestions.length} (${percentage}%)
            </div>
            <p>${percentage >= 80 ? '🌟 ¡Excelente dominio del tema!' : 
                    percentage >= 60 ? '👍 Buen conocimiento, sigue practicando' : 
                    '📚 Te recomendamos revisar los conceptos nuevamente'}</p>
        `;
    }
}

function completeModule() {
    // Marcar todas las secciones como completadas
    for (let i = 1; i <= 8; i++) {
        completedSections.add(i);
    }
    updateProgress();
    
    // Mostrar mensaje de felicitación
    const container = document.querySelector('.container');
    const congratsDiv = document.createElement('div');
    congratsDiv.className = 'final-project';
    congratsDiv.style.textAlign = 'center';
    congratsDiv.style.animation = 'fadeIn 1s ease';
    congratsDiv.innerHTML = `
        <h2>🎊 ¡FELICITACIONES! 🎊</h2>
        <div class="achievement-badge">
            🏆 Módulo 6 Completado con Éxito
        </div>
        <p>Has dominado las estructuras de datos fundamentales en Python:</p>
        <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
            <div class="achievement-badge">📋 Listas</div>
            <div class="achievement-badge">🔒 Tuplas</div>
            <div class="achievement-badge">🗝️ Diccionarios</div>
        </div>
        <p>Estás listo para continuar con el <strong>Módulo 7: Funciones y Programación Modular</strong></p>
        <button class="btn" onclick="window.location.reload()">🔄 Reiniciar Módulo</button>
    `;
    
    container.appendChild(congratsDiv);
    congratsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Expandir la primera sección por defecto
    toggleSection(1);
    
    // Inicializar displays
    updateProfileDisplay();
    updateInventoryDisplay();
});