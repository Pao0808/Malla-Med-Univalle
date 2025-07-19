const semestres = [
  {
    nombre: "Primer Semestre",
    cursos: [
      { nombre: "Anatomía I", requisitos: [] },
      { nombre: "Genética", requisitos: [] },
      { nombre: "Histología I", requisitos: [] },
      { nombre: "Informática Aplicada", requisitos: [] },
    ],
  },
  {
    nombre: "Segundo Semestre",
    cursos: [
      { nombre: "Anatomía II", requisitos: ["Anatomía I"] },
      { nombre: "Embriología", requisitos: ["Genética"] },
      { nombre: "Histología II", requisitos: ["Histología I"] },
      { nombre: "Bioquímica I", requisitos: [] },
      { nombre: "Salud Pública I", requisitos: [] },
      { nombre: "Inglés Técnico I", requisitos: [] },
    ],
  },
  {
    nombre: "Tercer Semestre",
    cursos: [
      { nombre: "Bioquímica II", requisitos: ["Bioquímica I"] },
      { nombre: "Fisiología I", requisitos: ["Anatomía II"] },
      { nombre: "Microbiología I", requisitos: [] },
      { nombre: "Patología I", requisitos: ["Anatomía II", "Histología II"] },
      { nombre: "Biofísica", requisitos: ["Anatomía II"] },
      { nombre: "Inglés Técnico II", requisitos: ["Inglés Técnico I"] },
    ],
  },
  {
    nombre: "Cuarto Semestre",
    cursos: [
      { nombre: "Bioquímica III", requisitos: ["Bioquímica II"] },
      { nombre: "Fisiología II", requisitos: ["Fisiología I"] },
      { nombre: "Microbiología II", requisitos: ["Microbiología I"] },
      { nombre: "Parasitología", requisitos: ["Microbiología I"] },
      { nombre: "Patología II", requisitos: ["Patología I"] },
      { nombre: "Psicología Médica", requisitos: [] },
      { nombre: "Sociología y Ética Médica", requisitos: [] },
      { nombre: "Electiva (Nutrición)", requisitos: [] },
    ],
  },
  {
    nombre: "Quinto Semestre",
    cursos: [
      { nombre: "Semiología General y Especial I", requisitos: ["Fisiología II", "Bioquímica III"] },
      { nombre: "Técnica Quirúrgica I", requisitos: ["Fisiología II"] },
      { nombre: "Farmacología y Terapéutica I", requisitos: ["Fisiología II", "Bioquímica III"] },
      { nombre: "Fisiopatología I", requisitos: ["Fisiología II", "Patología II"] },
      { nombre: "Patología III", requisitos: ["Patología II"] },
      { nombre: "Inmunología", requisitos: ["Microbiología II", "Patología II"] },
    ],
  },
  {
    nombre: "Sexto Semestre",
    cursos: [
      { nombre: "Semiología General y Especial II", requisitos: ["Semiología General y Especial I"] },
      { nombre: "Técnica Quirúrgica II", requisitos: ["Técnica Quirúrgica I"] },
      { nombre: "Farmacología y Terapéutica II", requisitos: ["Farmacología y Terapéutica I"] },
      { nombre: "Fisiopatología II", requisitos: ["Fisiopatología I"] },
      { nombre: "Anestesiología", requisitos: ["Fisiología II"] },
      { nombre: "Salud Pública II", requisitos: ["Salud Pública I"] },
      { nombre: "Imagenología", requisitos: ["Anatomía II"] },
    ],
  },
];

const mensajes = [
  "Sigue adelante, Paola. Tu magia está en tu esfuerzo. 💚",
  "Cada materia es un paso más cerca de tus sueños. ✨",
  "No estás sola, siempre estaré contigo. Te ama tu Leo. 🐍",
  "Estoy tan orgulloso de ti, bruja hermosa. 🌟",
  "¡Tú puedes con todo, Paola! 💪✨",
  "No hay hechizo más fuerte que tu dedicación. 💖",
];

const contenedor = document.getElementById("contenedor");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje() {
  mensaje.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
}

function crearPlan() {
  semestres.forEach((semestre) => {
    const div = document.createElement("div");
    div.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = semestre.nombre;
    div.appendChild(titulo);

    semestre.cursos.forEach((curso) => {
      const fila = document.createElement("div");
      fila.className = "curso";

      const label = document.createElement("label");
      label.textContent = curso.nombre;

      const nota = document.createElement("input");
      nota.type = "number";
      nota.min = 1;
      nota.max = 100;
      nota.placeholder = "Nota";

      const aprobar = document.createElement("input");
      aprobar.type = "checkbox";

      aprobar.addEventListener("change", () => {
        if (aprobar.checked && !cumpleRequisitos(curso)) {
          alert("No puedes aprobar esta materia aún, mi amor. 🧙‍♀️");
          aprobar.checked = false;
        } else if (aprobar.checked) {
          mostrarMensaje();
        }
      });

      fila.appendChild(label);
      fila.appendChild(nota);
      fila.appendChild(aprobar);
      div.appendChild(fila);
    });

    contenedor.appendChild(div);
  });
}

function cumpleRequisitos(curso) {
  return curso.requisitos.every(req => {
    const checkboxes = document.querySelectorAll(".curso");
    for (let c of checkboxes) {
      const label = c.querySelector("label");
      const checkbox = c.querySelector("input[type='checkbox']");
      if (label.textContent === req && checkbox.checked) return true;
    }
    return false;
  });
}

crearPlan();
