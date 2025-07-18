// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Definición de todos los cursos con prerrequisitos
  const coursesData = {
    "Primer Semestre": [
      { name: "Anatomía I", emoji: "🦴", prereq: [] },
      { name: "Genética", emoji: "🧬", prereq: [] },
      { name: "Histología I", emoji: "🔬", prereq: [] },
      { name: "Informática Aplicada", emoji: "💻", prereq: [] }
    ],
    "Segundo Semestre": [
      { name: "Anatomía II", emoji: "🦴", prereq: ["Anatomía I"] },
      { name: "Embriología", emoji: "🧫", prereq: ["Genética"] },
      { name: "Histología II", emoji: "🔬", prereq: ["Histología I"] },
      { name: "Bioquímica I", emoji: "⚗️", prereq: [] },
      { name: "Salud Pública I", emoji: "🏥", prereq: [] },
      { name: "Inglés técnico I", emoji: "🌐", prereq: [] }
    ],
    "Tercer Semestre": [
      { name: "Bioquímica II", emoji: "⚗️", prereq: ["Bioquímica I"] },
      { name: "Fisiología I", emoji: "🧪", prereq: ["Anatomía II"] },
      { name: "Microbiología I", emoji: "🦠", prereq: [] },
      { name: "Patología I", emoji: "🩺", prereq: ["Anatomía II", "Histología II"] },
      { name: "Biofísica", emoji: "📊", prereq: ["Anatomía II"] },
      { name: "Inglés técnico II", emoji: "🌐", prereq: ["Inglés técnico I"] }
    ],
    "Cuarto Semestre": [
      { name: "Bioquímica III", emoji: "⚗️", prereq: ["Bioquímica II"] },
      { name: "Fisiología II", emoji: "🧪", prereq: ["Fisiología I"] },
      { name: "Microbiología II", emoji: "🦠", prereq: ["Microbiología I"] },
      { name: "Parasitología", emoji: "🪱", prereq: ["Microbiología I"] },
      { name: "Patología II", emoji: "🩺", prereq: ["Patología I"] },
      { name: "Psicología Médica", emoji: "🧠", prereq: [] },
      { name: "Sociología y Ética Médica", emoji: "⚖️", prereq: [] },
      { name: "Electiva (Nutrición)", emoji: "🥗", prereq: [] }
    ],
    "Quinto Semestre": [
      { name: "Semiología General y Especial I", emoji: "🩻", prereq: ["Fisiología II", "Bioquímica III"] },
      { name: "Técnica Quirúrgica I", emoji: "🔪", prereq: ["Fisiología II"] },
      { name: "Farmacología y Terapéutica I", emoji: "💊", prereq: ["Fisiología II", "Bioquímica III"] },
      { name: "Fisiopatología I", emoji: "🩸", prereq: ["Fisiología II", "Patología II"] },
      { name: "Patología III", emoji: "🩺", prereq: ["Patología II"] },
      { name: "Inmunología", emoji: "🦠", prereq: ["Microbiología II", "Patología II"] }
    ],
    "Sexto Semestre": [
      { name: "Semiología General y Especial II", emoji: "🩻", prereq: ["Semiología General y Especial I"] },
      { name: "Técnica Quirúrgica II", emoji: "🔪", prereq: ["Técnica Quirúrgica I"] },
      { name: "Farmacología y Terapéutica II", emoji: "💊", prereq: ["Farmacología y Terapéutica I"] },
      { name: "Fisiopatología II", emoji: "🩸", prereq: ["Fisiopatología I"] },
      { name: "Anestesiología", emoji: "💉", prereq: ["Fisiología II"] },
      { name: "Salud Pública II", emoji: "🏥", prereq: ["Salud Pública I"] },
      { name: "Imagenología", emoji: "🩻", prereq: ["Anatomía II"] }
    ],
  };

  // Seleccionamos el contenedor principal
  const main = document.querySelector('main');

  // Función para crear la interfaz de cursos por semestre
  function crearSemestres() {
    for (const [semesterName, courses] of Object.entries(coursesData)) {
      // Crear sección semestre
      const section = document.createElement('section');
      section.classList.add('semester');
      section.dataset.semester = semesterName;

      // Título semestre con emoji calendario
      const h2 = document.createElement('h2');
      h2.textContent = `${semesterName} 🗓️`;

      // Botones pequeños al lado derecho del título
      const btnContainer = document.createElement('span');
      btnContainer.classList.add('btn-semester-container');

      // Botón promedio con emoji 📊
      const btnPromedio = document.createElement('button');
      btnPromedio.title = `Ver promedio de ${semesterName}`;
      btnPromedio.classList.add('btn-promedio');
      btnPromedio.textContent = '📊';
      btnContainer.appendChild(btnPromedio);

      h2.appendChild(btnContainer);
      section.appendChild(h2);

      // Lista cursos
      const coursesList = document.createElement('div');
      coursesList.classList.add('courses-list');

      courses.forEach((course) => {
        // Crear div curso
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');
        courseDiv.dataset.coursename = course.name;

        // Label con emoji + nombre curso
        const label = document.createElement('label');
        label.classList.add('course-name');
        label.innerHTML = `${course.emoji} <span>${course.name}</span>`;

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.title = `Marcar como aprobado: ${course.name}`;

        // Nota input
        const gradeInput = document.createElement('input');
        gradeInput.type = 'number';
        gradeInput.min = 0;
        gradeInput.max = 20;
        gradeInput.step = 0.01;
        gradeInput.placeholder = 'Nota';
        gradeInput.classList.add('grade-input');

        // Emoji ojo para prerrequisitos
        const eyeIcon = document.createElement('span');
        eyeIcon.classList.add('eye-icon');
        eyeIcon.title = 'Ver prerrequisitos';
        eyeIcon.textContent = '👁️';

        // Agregamos elementos al curso
        courseDiv.appendChild(label);
        courseDiv.appendChild(checkbox);
        courseDiv.appendChild(gradeInput);
        courseDiv.appendChild(eyeIcon);

        coursesList.appendChild(courseDiv);
      });

      section.appendChild(coursesList);
      main.insertBefore(section, main.querySelector('footer'));
    }
  }

  crearSemestres();

  // Modal para prerrequisitos
  const modal = document.getElementById('modal');
  const modalTitle = modal.querySelector('h3');
  const modalBody = modal.querySelector('p');
  const closeModalBtn = modal.querySelector('.close-modal');

  // Mostrar modal con prerrequisitos
  function mostrarModal(title, content) {
    modalTitle.textContent = title;
    modalBody.textContent = content;
    modal.style.display = 'flex';
  }

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal si clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Función para verificar si se cumplen prerrequisitos
  function cumplePrerrequisitos(courseName) {
    let prereqs = null;
    // Encontrar prerrequisitos en coursesData
    for (const semCourses of Object.values(courses
