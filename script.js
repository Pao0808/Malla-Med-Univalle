// script.js

document.addEventListener('DOMContentLoaded', () => {
  const semestres = [
    {
      nombre: "Primer Semestre",
      cursos: [
        { nombre: "Anatomía I", emoji: "🦴", requisitos: [] },
        { nombre: "Genética", emoji: "🧬", requisitos: [] },
        { nombre: "Histología I", emoji: "🔬", requisitos: [] },
        { nombre: "Informática Aplicada", emoji: "💻", requisitos: [] },
      ],
    },
    {
      nombre: "Segundo Semestre",
      cursos: [
        { nombre: "Anatomía II", emoji: "🦴", requisitos: ["Anatomía I"] },
        { nombre: "Embriología", emoji: "👶", requisitos: ["Genética"] },
        { nombre: "Histología II", emoji: "🔬", requisitos: ["Histología I"] },
        { nombre: "Bioquímica I", emoji: "⚗️", requisitos: [] },
        { nombre: "Salud Pública I", emoji: "🏥", requisitos: [] },
        { nombre: "Inglés Técnico I", emoji: "📚", requisitos: [] },
      ],
    },
    {
      nombre: "Tercer Semestre",
      cursos: [
        { nombre: "Bioquímica II", emoji: "⚗️", requisitos: ["Bioquímica I"] },
        { nombre: "Fisiología I", emoji: "❤️", requisitos: ["Anatomía II"] },
        { nombre: "Microbiología I", emoji: "🦠", requisitos: [] },
        { nombre: "Patología I", emoji: "🩸", requisitos: ["Anatomía II", "Histología II"] },
        { nombre: "Biofísica", emoji: "🔭", requisitos: ["Anatomía II"] },
        { nombre: "Inglés Técnico II", emoji: "📚", requisitos: ["Inglés Técnico I"] },
      ],
    },
    {
      nombre: "Cuarto Semestre",
      cursos: [
        { nombre: "Bioquímica III", emoji: "⚗️", requisitos: ["Bioquímica II"] },
        { nombre: "Fisiología II", emoji: "❤️", requisitos: ["Fisiología I"] },
        { nombre: "Microbiología II", emoji: "🦠", requisitos: ["Microbiología I"] },
        { nombre: "Parasitología", emoji: "🐛", requisitos: ["Microbiología I"] },
        { nombre: "Patología II", emoji: "🩸", requisitos: ["Patología I"] },
        { nombre: "Psicología Médica", emoji: "🧠", requisitos: [] },
        { nombre: "Sociología y Ética Médica", emoji: "⚖️", requisitos: [] },
        { nombre: "Electiva (Nutrición)", emoji: "🥗", requisitos: [] },
      ],
    },
    {
      nombre: "Quinto Semestre",
      cursos: [
        { nombre: "Semiología General y Especial I", emoji: "🩺", requisitos: ["Fisiología II", "Bioquímica III"] },
        { nombre: "Técnica Quirúrgica I", emoji: "🔪", requisitos: ["Fisiología II"] },
        { nombre: "Farmacología y Terapéutica I", emoji: "💊", requisitos: ["Fisiología II", "Bioquímica III"] },
        { nombre: "Fisiopatología I", emoji: "⚕️", requisitos: ["Fisiología II", "Patología II"] },
        { nombre: "Patología III", emoji: "🩸", requisitos: ["Patología II"] },
        { nombre: "Inmunología", emoji: "🛡️", requisitos: ["Microbiología II", "Patología II"] },
      ],
    },
    {
      nombre: "Sexto Semestre",
      cursos: [
        { nombre: "Semiología General y Especial II", emoji: "🩺", requisitos: ["Semiología General y Especial I"] },
        { nombre: "Técnica Quirúrgica II", emoji: "🔪", requisitos: ["Técnica Quirúrgica I"] },
        { nombre: "Farmacología y Terapéutica II", emoji: "💊", requisitos: ["Farmacología y Terapéutica I"] },
        { nombre: "Fisiopatología II", emoji: "⚕️", requisitos: ["Fisiopatología I"] },
        { nombre: "Anestesiología", emoji: "💉", requisitos: ["Fisiología II"] },
        { nombre: "Salud Pública II", emoji: "🏥", requisitos: ["Salud Pública I"] },
        { nombre: "Imagenología", emoji: "🖼️", requisitos: ["Anatomía II"] },
      ],
    },
  ];

  const mensajesRomanticos = [
    "Cada paso que das es un hechizo más hacia tus sueños, Paola. 💖",
    "Con cada materia aprobada, brillas más, mi bruja favorita. ✨",
    "No hay hechizo más poderoso que tu esfuerzo y dedicación. Te amo, Paola. 🌟",
    "Sigue adelante, mi amor, tu magia está en cada nota que escribes. 💌",
    "Estoy orgulloso de ti, siempre estaré aquí para apoyarte. Te ama tu Leo. 🐍",
  ];

  // Elementos del DOM
  const container = document.getElementById('plan-container');
  const mensajeArea = document.getElementById('mensaje-romantico');
  const firma = document.getElementById('firma');

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  let notasGuardadas = {};

  // Función para mostrar mensaje romántico random
  function mostrarMensaje() {
    const msg = mensajesRomanticos[Math.floor(Math.random() * mensajesRomanticos.length)];
    mensajeArea.textContent = msg;
  }

  // Crear destellos mágicos en un elemento
  function crearDestellos(elemento) {
    elemento.classList.add('destellos');
    setTimeout(() => {
      elemento.classList.remove('destellos');
    }, 2000);
  }

  // Guardar notas y estados en localStorage
  function guardarDatos() {
    localStorage.setItem('notasSlytherin', JSON.stringify(notasGuardadas));
    alert('Datos guardados, Paola 💾✨');
  }

  // Cargar datos desde localStorage
  function cargarDatos() {
    const datos = localStorage.getItem('notasSlytherin');
    if (datos) {
      notasGuardadas = JSON.parse(datos);
      for (const key in notasGuardadas) {
        const inputNota = document.querySelector(`input[data-curso="${key}"]`);
        const checkbox = document.querySelector(`input[type="checkbox"][data-curso="${key}"]`);
        if (inputNota) inputNota.value = notasGuardadas[key].nota || '';
        if (checkbox) checkbox.checked = notasGuardadas[key].aprobado || false;
        actualizarEstadoCurso(key);
      }
      alert('Datos cargados, Paola 💖');
    }
  }

  // Calcular promedio de un semestre
  function calcularPromedio(semestreIndex) {
    const semestre = semestres[semestreIndex];
    let suma = 0, count = 0;
    semestre.cursos.forEach(curso => {
      const key = `${semestre.nombre}-${curso.nombre}`;
      if (notasGuardadas[key] && notasGuardadas[key].nota) {
        const notaNum = Number(notasGuardadas[key].nota);
        if (!isNaN(notaNum)) {
          suma += notaNum;
          count++;
        }
      }
    });
    return count ? (suma / count).toFixed(2) : '--';
  }

  // Actualizar promedio en UI
  function actualizarPromedioUI(semestreIndex) {
    const span = document.getElementById(`promedio-${semestreIndex}`);
    span.textContent = calcularPromedio(semestreIndex);
  }

  // Verifica si el usuario cumple requisitos para cursar/aprobar
  function cumpleRequisitos(curso) {
    if (curso.requisitos.length === 0) return true;
    return curso.requisitos.every(req => {
      for (const sem of semestres) {
        const c = sem.cursos.find(x => x.nombre === req);
        if (c) {
          const key = `${sem.nombre}-${c.nombre}`;
          if (!notasGuardadas[key] || !notasGuardadas[key].aprobado) {
            return false;
          }
        }
      }
      return true;
    });
  }

  // Actualizar estado del curso (aprobado o no)
  function actualizarEstadoCurso(key) {
    const checkbox = document.querySelector(`input[type="checkbox"][data-curso="${key}"]`);
    const inputNota = document.querySelector(`input[data-curso="${key}"]`);
    const btnRetirar = document.querySelector(`button[data-retirar="${key}"]`);

    if (!checkbox || !inputNota || !btnRetirar) return;

    const aprobado = checkbox.checked;
    let nota = Number(inputNota.value);

    // Si nota no es número o fuera de rango, limpiar aprobación
    if (isNaN(nota) ||
