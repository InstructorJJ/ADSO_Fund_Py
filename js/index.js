// Datos de los módulos
const modules = [
    {
        title: "Configuración y Primeros Pasos",
        description: "Instalación de Python, configuración del entorno de desarrollo y tu primer programa 'Hola Mundo'.",
        duration: "2 horas",
        exercises: 3,
        status: "current",
        topics: ["Instalación de Python", "IDE y editores", "Primer programa", "Conceptos básicos"]
    },
    {
        title: "Variables y Tipos de Datos",
        description: "Aprende sobre variables, números, cadenas, booleanos y cómo Python maneja los diferentes tipos de datos.",
        duration: "3 horas",
        exercises: 6,
        status: "available",
        topics: ["Variables", "Números", "Cadenas", "Booleanos", "Conversiones"]
    },
    {
        title: "Operadores y Expresiones",
        description: "Domina los operadores aritméticos, de comparación, lógicos y cómo construir expresiones complejas.",
        duration: "3 horas",
        exercises: 5,
        status: "locked",
        topics: ["Operadores aritméticos", "Comparación", "Operadores lógicos", "Precedencia"]
    },
    {
        title: "Estructuras de Control",
        description: "Controla el flujo de tu programa con if, elif, else, bucles for y while para crear lógica compleja.",
        duration: "4 horas",
        exercises: 8,
        status: "locked",
        topics: ["Condicionales if/else", "Bucles for", "Bucles while", "Control de flujo"]
    },
    {
        title: "Funciones y Procedimientos",
        description: "Crea código reutilizable con funciones, parámetros, valores de retorno y mejores prácticas.",
        duration: "4 horas",
        exercises: 7,
        status: "locked",
        topics: ["Definir funciones", "Parámetros", "Return", "Scope", "Recursión"]
    },
    {
        title: "Estructuras de Datos",
        description: "Trabaja con listas, tuplas, diccionarios y conjuntos para organizar y manipular información.",
        duration: "5 horas",
        exercises: 10,
        status: "locked",
        topics: ["Listas", "Tuplas", "Diccionarios", "Conjuntos", "Comprensiones"]
    },
    {
        title: "Manejo de Archivos y Datos",
        description: "Lee y escribe archivos, procesa datos CSV, JSON y aprende técnicas de visualización básica.",
        duration: "4 horas",
        exercises: 6,
        status: "locked",
        topics: ["Archivos de texto", "CSV/JSON", "Manejo de errores", "Visualización"]
    },
    {
        title: "Proyecto Final Integrador",
        description: "Desarrolla una aplicación completa que integre todos los conceptos aprendidos en el curso.",
        duration: "7 horas",
        exercises: 1,
        status: "locked",
        topics: ["Análisis de requisitos", "Diseño", "Implementación", "Testing", "Documentación"]
    }
];

// Estado del progreso del estudiante
let studentProgress = {
    currentModule: 0,
    completedModules: [],
    totalProgress: 0
};

function getStatusClass(status) {
    switch(status) {
        case 'completed': return 'status-completed';
        case 'current': return 'status-current';
        case 'available': return 'status-available';
        default: return 'status-locked';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'completed': return '✓ Completado';
        case 'current': return '📚 En Progreso';
        case 'available': return '🔓 Disponible';
        default: return '🔒 Bloqueado';
    }
}

function renderModules() {
    const grid = document.getElementById('modulesGrid');
    grid.innerHTML = '';

    modules.forEach((module, index) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = `module-card ${module.status}`;
        
        moduleCard.innerHTML = `
            <div class="module-header">
                <div class="module-number">${index + 1}</div>
                <div>
                    <div class="module-title">${module.title}</div>
                    <div class="module-status ${getStatusClass(module.status)}">
                        ${getStatusText(module.status)}
                    </div>
                </div>
            </div>
            
            <div class="module-description">${module.description}</div>
            
            <div class="module-details">
                <div class="module-duration">⏱️ ${module.duration}</div>
                <div class="module-exercises">📝 ${module.exercises} ejercicios</div>
            </div>
            
            <div style="margin-top: 15px;">
                <strong>Temas principales:</strong>
                <div style="margin-top: 5px; font-size: 0.9rem; color: #666;">
                    ${module.topics.join(' • ')}
                </div>
            </div>
        `;

        moduleCard.addEventListener('click', () => openModule(index));
        grid.appendChild(moduleCard);
    });
}

function renderLearningPath() {
    const pathSteps = document.getElementById('pathSteps');
    pathSteps.innerHTML = '';

    modules.forEach((module, index) => {
        const step = document.createElement('div');
        step.className = `path-step ${module.status}`;
        
        step.innerHTML = `
            <div class="step-dot ${module.status}"></div>
            <span style="font-size: 0.85rem; color: #333;">${index + 1}. ${module.title.substring(0, 20)}...</span>
        `;
        
        pathSteps.appendChild(step);
    });
}

function openModule(moduleIndex) {
    const module = modules[moduleIndex];
    
    if (module.status === 'locked') {
        alert('Este módulo está bloqueado. Completa los módulos anteriores para desbloquearlo.');
        return;
    }

    // Simulación de navegación al módulo
    alert(`Abriendo: ${module.title}\n\n${module.description}\n\nDuración: ${module.duration}\nEjercicios: ${module.exercises}`);
    let mod = moduleIndex + 1;
    window.location.href = 'mod_'+mod+'.html';
}

function continueCurrentModule() {
    const currentModule = modules.find(m => m.status === 'current');
    if (currentModule) {
        const index = modules.indexOf(currentModule);
        openModule(index);
    } else {
        alert('¡Felicidades! Has completado todos los módulos disponibles.');
    }
}

function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso? Esta acción no se puede deshacer.')) {
        // Resetear progreso
        modules.forEach((module, index) => {
            if (index === 0) {
                module.status = 'current';
            } else {
                module.status = 'locked';
            }
        });

        studentProgress = {
            currentModule: 0,
            completedModules: [],
            totalProgress: 0
        };

        updateUI();
        alert('Progreso reiniciado. ¡Empezemos desde el principio!');
    }
}

function simulateProgress() {
    // Simula el progreso del estudiante para la demostración
    setInterval(() => {
        // Este sería reemplazado por datos reales del backend
        const progressFill = document.getElementById('progressFill');
        const currentWidth = parseInt(progressFill.style.width);
        
        if (currentWidth < 100 && Math.random() > 0.98) {
            const newWidth = Math.min(currentWidth + 12.5, 100);
            progressFill.style.width = newWidth + '%';
            document.getElementById('progressText').textContent = newWidth + '%';
            
            if (newWidth > currentWidth) {
                // Desbloquear siguiente módulo
                const nextModuleIndex = Math.floor(newWidth / 12.5);
                if (nextModuleIndex < modules.length) {
                    modules[nextModuleIndex - 1].status = 'completed';
                    if (nextModuleIndex < modules.length) {
                        modules[nextModuleIndex].status = 'current';
                    }
                    renderModules();
                    renderLearningPath();
                }
            }
        }
    }, 5000);
}

function updateUI() {
    document.getElementById('completedModules').textContent = studentProgress.completedModules.length;
    document.getElementById('progressFill').style.width = studentProgress.totalProgress + '%';
    document.getElementById('progressText').textContent = studentProgress.totalProgress + '%';
    
    renderModules();
    renderLearningPath();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    simulateProgress();
});