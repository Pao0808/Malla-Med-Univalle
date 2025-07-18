// Datos de cursos con emojis y prerrequisitos
const cursos = [
  {
    semestre: 1,
    nombre: 'Primer Semestre',
    cursos: [
      { id: 'A1', nombre: '🦴 Anatomía I', prereq: [] },
      { id: 'G', nombre: '🧬 Genética', prereq: [] },
      { id: 'H1', nombre: '🔬 Histología I', prereq: [] },
      { id: 'IA', nombre: '💻 Informática Aplicada', prereq: [] },
    ],
  },
  {
    semestre: 2,
    nombre: 'Segundo Semestre',
    cursos: [
      { id: 'A2', nombre: '🦴 Anatomía II', prereq: ['A1'] },
      { id: 'E', nombre: '👶 Embriología', prereq: ['G'] },
      { id: 'H2', nombre: '🔬 Histología II', prereq: ['H1'] },
      { id: 'B1', nombre: '🧪 Bioquímica I', prereq: [] },
      { id: 'SP1', nombre: '🏥 Salud pública I', prereq: [] },
      { id: 'IT1', nombre: '📚 Inglés técnico I', prereq: [] },
    ],
  },
  {
    semestre: 3,
    nombre: 'Tercer Semestre',
    cursos: [
      { id: 'B2', nombre: '🧪 Bioquímica II', prereq: ['B1'] },
      { id: 'F1', nombre: '❤️‍🩹 Fisiología I', prereq: ['A2'] },
      { id: 'M1', nombre: '🦠 Microbiología I', prereq: [] },
      { id: 'P1', nombre: '🩺 Patología I', prereq: ['A2', 'H2'] },
      { id: 'BF', nombre: '⚛️ Biofísica', prereq: ['A2'] },
      { id: 'IT2', nombre: '📚 Inglés técnico II', prereq: ['IT1'] },
    ],
  },
  {
    semestre: 4,
    nombre: 'Cuarto Semestre',
    cursos: [
      { id: 'B3', nombre: '🧪 Bioquímica III', prereq: ['B2'] },
      { id: 'F2', nombre: '❤️‍🩹 Fisiología II', prereq: ['F1'] },
      { id: 'M2', nombre: '🦠 Microbiología II', prereq: ['M1'] },
      { id: 'PA', nombre: '🦠 Parasitología', prereq: ['M1'] },
      { id: 'P2', nombre: '🩺 Patología II', prereq: ['P1'] },
      { id: 'IT3', nombre: '📚 Inglés técnico III', prereq: ['IT2'] },
    ],
  },
];

// Estado de notas y aprobación
let estado = {};

// Función para crear el plan en el DOM
function crearPlan() {
  const contenedor = document.getElementById('planEstudios');
  contenedor.innerHTML = '';

  cursos.forEach((sem) => {
    const seccion = document.createElement('section');
    seccion.id = `semestre-${sem.semestre}`;

    const titulo = document.createElement('h2');
    titulo.textContent = `✨ ${sem.nombre} ✨`;
    seccion.appendChild(titulo);

    const lista = document.createElement('ul');

    sem.cursos.forEach((curso) => {
      const li = document.createElement('li');
      li.id = curso.id;

      // Verificar si el curso se desbloquea (todos los prerrequisitos aprobados)
      const puedeHabilitar = curso.prereq.every((p) => estado[p]?.aprobado);

      if (!puedeHabilitar) {
        li.classList.add('bloqueado');
      }

      // Nombre + emoji
      const spanNombre = document.createElement('span');
      spanNombre.textContent = curso.nombre;

      // Input para la nota
      const inputNota = document.createElement('input');
      inputNota.type = 'number';
      inputNota.min = 0;
      inputNota.max = 100;
      inputNota.placeholder = 'Nota 0-100';
      inputNota.title = 'Escribe tu nota (0-100)';
      inputNota.disabled = !puedeHabilitar;
      inputNota.value = estado[curso.id]?.nota ?? '';

      // Botón para marcar aprobado manualmente (opcional)
      const btnAprobar = document.createElement('button');
      btnAprobar.textContent = '✅ Marcar aprobado';
      btnAprobar.disabled = !puedeHabilitar || estado[curso.id]?.aprobado;
      btnAprobar.title = 'Marcar como aprobado sin nota';

      // Evento para validar la nota al escribir
      inputNota.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val === '') {
          eliminarEstado(curso.id);
          actualizarPlan();
          return;
        }
        const num = Number(val);
        if (isNaN(num) || num < 0 || num > 100) {
          alert('💜 Por favor, ingresa una nota válida entre 0 y 100.');
          e.target.value = '';
          eliminarEstado(curso.id);
          actualizarPlan();
          return;
        }
        guardarNota(curso.id, num);
      });

      // Evento botón aprobar manualmente
      btnAprobar.addEventListener('click', () => {
        guardarNota(curso.id, 100, true);
        actualizarPlan();
      });

      // Resaltar aprobado y deshabilitar input y botón
      if (estado[curso.id]?.aprobado) {
        li.classList.add('aprobado');
        inputNota.disabled = true;
        inputNota.value = estado[curso.id].nota;
        btnAprobar.disabled = true;
      }

      li.appendChild(spanNombre);
      li.appendChild(inputNota);
      li.appendChild(btnAprobar);

      lista.appendChild(li);
    });

    seccion.appendChild(lista);
    contenedor.appendChild(seccion);
  });
}

// Guardar nota en el estado
function guardarNota(id, nota, forzarAprobado = false) {
  estado[id] = {
    nota,
    aprobado: forzarAprobado || nota >= 60,
  };
}

// Eliminar estado de un curso
function eliminarEstado(id) {
  delete estado[id];
}

// Actualizar DOM según estado y prerrequisitos
function actualizarPlan() {
  cursos.forEach((sem) => {
    sem.cursos.forEach((curso) => {
      const li = document.getElementById(curso.id);
      const input = li.querySelector('input[type="number"]');
      const btn = li.querySelector('button');

      const puedeHabilitar = curso.prereq.every((p) => estado[p]?.aprobado);

      if (!puedeHabilitar) {
        li.classList.add('bloqueado');
        input.disabled = true;
        btn.disabled = true;
      } else {
        li.classList.remove('bloqueado');

        if (estado[curso.id]?.aprobado) {
          li.classList.add('aprobado');
          input.disabled = true;
          input.value = estado[curso.id].nota;
          btn.disabled = true;
        } else {
          li.classList.remove('aprobado');
          input.disabled = false;
          btn.disabled = false;
          input.value = estado[curso.id]?.nota ?? '';
        }
      }
    });
  });
}

// Guardar progreso en localStorage
function guardarLocal() {
  localStorage.setItem('planPaolaNotas', JSON.stringify(estado));
  alert('💾 Progreso guardado con mucho amor 💜');
}

// Cargar progreso desde localStorage
function cargarLocal() {
  const data = localStorage.getItem('planPaolaNotas');
  if (data) {
    estado = JSON.parse(data);
    actualizarPlan();
    alert('📂 Progreso cargado, amorcito 💖');
  } else {
    alert('⚠️ No hay progreso guardado aún, mi amor 💜');
  }
}

// Mostrar resumen de aprobados y pendientes
function mostrarResumen() {
  const totalCursos = cursos.reduce((acc, s) => acc + s.cursos.length, 0);
  const aprobados = Object.values(estado).filter(c => c.aprobado).length;
  const pendientes = totalCursos - aprobados;

  const sorpresa = document.getElementById('sorpresa');
  if (pendientes === 0 && totalCursos > 0) {
    sorpresa.style.display = 'block';
    sorpresa.textContent = `🎉 ¡Felicidades, Paola! Has aprobado todos tus cursos. Estoy súper orgulloso de ti, mi amor 💕✨`;
  } else {
    sorpresa.style.display = 'block';
    sorpresa.textContent = `🌟 Cursos aprobados: ${aprobados} 💜 | Cursos pendientes: ${pendientes} 🌸 ¡Sigue adelante, preciosa!`;
  }
}

// Reiniciar todo el progreso
function reiniciarTodo() {
  if (confirm('¿Quieres reiniciar todas las notas y empezar de nuevo, mi amor? 💖')) {
    estado = {};
    actualizarPlan();
    document.getElementById('sorpresa').
