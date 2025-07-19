// Lista de cursos con nombre, código único, semestre y prerrequisitos
const cursos = [
  // Primer semestre
  { nombre: "🖋 Anatomía I", codigo: "MED101", semestre: 1, prerequisitos: [] },
  { nombre: "👐 Genética", codigo: "MED102", semestre: 1, prerequisitos: [] },
  { nombre: "🔬 Histología I", codigo: "MED103", semestre: 1, prerequisitos: [] },
  { nombre: "💻 Informática Aplicada", codigo: "MED104", semestre: 1, prerequisitos: [] },

  // Segundo semestre
  { nombre: "🦴 Anatomía II", codigo: "MED201", semestre: 2, prerequisitos: ["MED101"] },
  { nombre: "🧬 Embriología", codigo: "MED202", semestre: 2, prerequisitos: ["MED102"] },
  { nombre: "🔬 Histología II", codigo: "MED203", semestre: 2, prerequisitos: ["MED103"] },
  { nombre: "🧪 Bioquímica I", codigo: "MED204", semestre: 2, prerequisitos: [] },
  { nombre: "🏥 Salud Pública I", codigo: "MED205", semestre: 2, prerequisitos: [] },
  { nombre: "📘 Inglés Técnico I", codigo: "MED206", semestre: 2, prerequisitos: [] },

  // Tercer semestre
  { nombre: "🧪 Bioquímica II", codigo: "MED301", semestre: 3, prerequisitos: ["MED204"] },
  { nombre: "⚙️ Fisiología I", codigo: "MED302", semestre: 3, prerequisitos: ["MED201"] },
  { nombre: "🦠 Microbiología I", codigo: "MED303", semestre: 3, prerequisitos: [] },
  { nombre: "📉 Patología I", codigo: "MED304", semestre: 3, prerequisitos: ["MED201", "MED203"] },
  { nombre: "🧲 Biofísica", codigo: "MED305", semestre: 3, prerequisitos: ["MED201"] },
  { nombre: "📗 Inglés Técnico II", codigo: "MED306", semestre: 3, prerequisitos: ["MED206"] },

  // Cuarto semestre
  { nombre: "🧪 Bioquímica III", codigo: "MED401", semestre: 4, prerequisitos: ["MED301"] },
  { nombre: "⚙️ Fisiología II", codigo: "MED402", semestre: 4, prerequisitos: ["MED302"] },
  { nombre: "🦠 Microbiología II", codigo: "MED403", semestre: 4, prerequisitos: ["MED303"] },
  { nombre: "🧬 Parasitología", codigo: "MED404", semestre: 4, prerequisitos: ["MED303"] },
  { nombre: "📉 Patología II", codigo: "MED405", semestre: 4, prerequisitos: ["MED304"] },
  { nombre: "🧠 Psicología Médica", codigo: "MED406", semestre: 4, prerequisitos: [] },
  { nombre: "👥 Sociología y Ética Médica", codigo: "MED407", semestre: 4, prerequisitos: [] },
  { nombre: "🥗 Electiva (Nutrición)", codigo: "MED408", semestre: 4, prerequisitos: [] },

  // Quinto semestre
  { nombre: "🧪 Semiología General y Especial I", codigo: "MED501", semestre: 5, prerequisitos: ["MED402", "MED401"] },
  { nombre: "🔪 Técnica Quirúrgica I", codigo: "MED502", semestre: 5, prerequisitos: ["MED402"] },
  { nombre: "💊 Farmacología y Terapéutica I", codigo: "MED503", semestre: 5, prerequisitos: ["MED402", "MED401"] },
  { nombre: "⚕️ Fisiopatología I", codigo: "MED504", semestre: 5, prerequisitos: ["MED402", "MED405"] },
  { nombre: "📉 Patología III", codigo: "MED505", semestre: 5, prerequisitos: ["MED405"] },
  { nombre: "🧬 Inmunología", codigo: "MED506", semestre: 5, prerequisitos: ["MED403", "MED405"] },

  // Sexto semestre
  { nombre: "🧪 Semiología General y Especial II", codigo: "MED601", semestre: 6, prerequisitos: ["MED501"] },
  { nombre: "🔪 Técnica Quirúrgica II", codigo: "MED602", semestre: 6, prerequisitos: ["MED502"] },
  { nombre: "💊 Farmacología y Terapéutica II", codigo: "MED603", semestre: 6, prerequisitos: ["MED503"] },
  { nombre: "⚕️ Fisiopatología II", codigo: "MED604", semestre: 6, prerequisitos: ["MED504"] },
  { nombre: "💉 Anestesiología", codigo: "MED605", semestre: 6, prerequisitos: ["MED402"] },
  { nombre: "🏥 Salud Pública II", codigo: "MED606", semestre: 6, prerequisitos: ["MED205"] },
  { nombre: "🖼 Imagenología", codigo: "MED607", semestre: 6, prerequisitos: ["MED201"] }
];

// Función para crear la malla curricular en el DOM
function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  // Agrupamos los cursos por semestre
  const semestres = {};
  cursos.forEach(curso => {
    if (!semestres[curso.semestre]) {
      semestres[curso.semestre] = [];
    }
    semestres[curso.semestre].push(curso);
  });

  // Ordenamos los semestres y creamos los bloques
  Object.keys(semestres).sort((a, b) => a - b).forEach(sem => {
    const contenedorSemestre = document.createElement("section");
    contenedorSemestre.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `🌙 Semestre ${sem}`;
    contenedorSemestre.appendChild(titulo);

    semestres[sem].forEach(curso => {
      // Verificar si se cumplen los prerrequisitos
      const requisitosCumplidos = curso.prerequisitos.every(id => localStorage.getItem(id) === "true");

      const div = document.createElement("div");
      div.classList.add("curso");
      div.id = curso.codigo;
      div.classList.add(requisitosCumplidos ? "unlocked" : "locked");

      div.innerHTML = `
        <h3>${curso.nombre}</h3>
        <p>Código: ${curso.codigo}</p>
        <label>
          <input type="checkbox" onchange="toggleCurso('${curso.codigo}')"
            ${localStorage.getItem(curso.codigo) === "true" ? "checked" : ""}
            ${requisitosCumplidos ? "" : "disabled"}>
          Completado
        </label>
      `;

      contenedorSemestre.appendChild(div);
    });

    contenedor.appendChild(contenedorSemestre);
  });
}

// Función para marcar o desmarcar un curso como completado
function toggleCurso(codigo) {
  const estadoActual = localStorage.getItem(codigo) === "true";
  localStorage.setItem(codigo, !estadoActual);
  crearMalla();
}

// Funciones opcionales para desbloquear todo o reiniciar progreso
function desbloquearTodo() {
  cursos.forEach(curso => {
    localStorage.setItem(curso.codigo, true);
  });
  crearMalla();
}

function reiniciar() {
  localStorage.clear();
  crearMalla();
}

// Crear la malla al cargar la página
window.onload = crearMalla;
