document.addEventListener('DOMContentLoaded', () => {
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

  const main = document.querySelector('main');
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  const closeModalBtn = modal.querySelector('.close-modal');

  function crearSemestres() {
    for (const [semesterName, courses] of Object.entries(coursesData)) {
      const section = document.createElement('section');
      section.classList.add('semester');
      section.dataset.semester = semesterName;

      const h2 = document.createElement('h2');
      h2.textContent = `${semesterName} 🗓️`;
      section.appendChild(h2);

      const coursesList = document.createElement('div');
      coursesList.classList.add('courses-list');

      courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${semesterName}-${course.name}`;
        checkbox.dataset.coursename = course.name;

        // Label
        const label = document.createElement('label');
        label.classList.add('course-name');
        label.htmlFor = checkbox.id;
        label.textContent = `${course.emoji} ${course.name}`;

        // Ojo para mostrar prerrequisitos
        if (course.prereq.length > 0) {
          const eyeSpan = document.createElement('span');
          eyeSpan.classList.add('eye-icon');
          eyeSpan.title = "Ver prerrequisitos 👁️";
          eyeSpan.textContent = '👁️';
          eyeSpan.style.marginLeft = '8px';
          eyeSpan.style.cursor = 'pointer';

          eyeSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            modalText.innerHTML = course.prereq.map(p => `• ${p}`).join('<br>');
            modal.style.display = 'flex';
          });

          label.appendChild(eyeSpan);
        }

        courseDiv.appendChild(checkbox);
        courseDiv.appendChild(label);
        coursesList.appendChild(courseDiv);
      });

      section.appendChild(coursesList);
      main.appendChild(section);
    }
  }

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal si se hace clic afuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  crearSemestres();
});
