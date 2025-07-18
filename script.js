// Cursos por semestre y dependencias
const cursos = [
  {
    semestre: "Primer semestre",
    materias: [
      { nombre: "🧠 Anatomía I" },
      { nombre: "🧬 Genética" },
      { nombre: "🔬 Histología I" },
      { nombre: "💻 Informática Aplicada" }
    ]
  },
  {
    semestre: "Segundo semestre",
    materias: [
      { nombre: "🫀 Anatomía II", prereqs: ["🧠 Anatomía I"] },
      { nombre: "👶 Embriologia", prereqs: ["🧬 Genética"] },
      { nombre: "🧫 Histología II", prereqs: ["🔬 Histología I"] },
      { nombre: "🧪 Bioquímica I" },
      { nombre: "🏥 Salud pública I" },
      { nombre: "📘 Inglés técnico I" }
    ]
  },
  {
    semestre: "Tercer semestre",
    materias: [
      { nombre: "🧪 Bioquímica II", prereqs: ["🧪 Bioquímica I"] },
      { nombre: "⚙️ Fisiología I", prereqs: ["🫀 Anatomía II"] },
      { nombre: "🧫 Microbiologia I" },
      { nombre: "🦠 Patología I", prereqs: ["🫀 Anatomía II", "🧫 Histología II"] },
      { nombre: "📐 Biofísica", prereqs: ["🫀 Anatomía II"] },
      { nombre: "📙 Inglés técnico II", prereqs: ["📘 Inglés técnico I"] }
    ]
  },
  {
    semestre: "Cuarto semestre",
    materias: [
      { nombre: "🧪 Bioquímica III", prereqs: ["🧪 Bioquímica II"] },
      { nombre: "⚙️ Fisiología II", prereqs: ["⚙️ Fisiología I"] },
      { nombre: "🧫 Microbiologia II", prereqs: ["🧫 Microbiologia I"] },
      { nombre: "🪱 Parasitologia", prereqs: ["🧫 Microbiologia I"] },
      { nombre: "🦠 Patología II", prereqs: ["🦠 Patología I"] },
      { nombre: "🧠 Psicología Médica" },
      { nombre: "🫂 Sociología y Ética Médica" },
      { nombre: "🥗 Electiva (Nutrición)" }
    ]
  },
  {
    semestre: "Quinto semestre",
    materias: [
      { nombre: "🩺 Semiología I", prereqs: ["⚙️ Fisiología II", "🧪 Bioquímica III"] },
      { nombre: "🔪 Técnica Quirúrgica I", prereqs: ["⚙️ Fisiología II"] },
      { nombre: "💊 Farmacología I", prereqs: ["⚙️ Fisiología II", "🧪 Bioquímica III"] },
      { nombre: "🩸 Fisiopatología I", prereqs: ["⚙️ Fisiología II", "🦠 Patología II"] },
      { nombre: "🦠 Patología III", prereqs: ["🦠 Patología II"] },
      { nombre: "🧬 Inmunología", prereqs: ["🧫 Microbiologia II", "🦠 Patología II"] }
    ]
  },
  {
    semestre: "Sexto semestre",
    materias: [
      { nombre: "🩺 Semiología II", prereqs: ["🩺 Semiología I"] },
      { nombre: "🔪 Técnica Quirúrgica II", prereqs: ["🔪 Técnica Quirúrgica I"] },
      { nombre: "💊 Farmacología II", prereqs: ["💊 Farmacología I"] },
      { nombre: "🩸 Fisiopatología II", prereqs: ["🩸 Fisiopatología I"] },
      { nombre: "💉 Anestesiología", prereqs: ["⚙️ Fisiología II"] },
      { nombre: "🏥 Salud Pública II", prereqs: ["🏥 Salud pública I"] },
      { nombre: "🖼 Imagenología", prereqs: ["🫀 Anatomía II"] }
    ]
  }
];

const contenedor = document.getElementById("contenido");

cursos.forEach((bloque, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<h2>${bloque.semestre}</h2>`;
  bloque.materias.forEach(materia => {
    const cursoDiv = document.createElement("div");
    cursoDiv.classList.add("curso");

    const label = document.createElement("label");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.dataset.nombre = materia.nombre;

    const nota = document.createElement("input");
    nota.type = "number";
    nota.placeholder = "Nota";
    nota.min = 0;
    nota.max = 100;

    label.appendChild(check);
    label.appendChild(document.createTextNode(materia.nombre));
    cursoDiv.appendChild(label);
    cursoDiv.appendChild(nota);
    div.appendChild(cursoDiv);
  });
  contenedor.appendChild(div);
});

contenedor.addEventListener("change", e => {
  if (e.target.type === "checkbox") {
    const cursoDiv = e.target.closest(".curso");
    cursoDiv.classList.toggle("aprobado", e.target.checked);
  }
});

function guardarProgreso() {
  const progreso = Array.from(document.querySelectorAll(".curso")).map(c => ({
    aprobado: c.querySelector("input[type='checkbox']").checked,
    nota: c.querySelector("input[type='number']").value
  }));
  localStorage.setItem("progresoPaola", JSON.stringify(progreso));
  alert("✨ Progreso guardado con amor ✨");
}

function cargarProgreso() {
  const progreso = JSON.parse(localStorage.getItem("progresoPaola"));
  if (progreso) {
    document.querySelectorAll(".curso").forEach((c, i) => {
      c.querySelector("input[type='checkbox']").checked = progreso[i].aprobado;
      c.querySelector("input[type='number']").value = progreso[i].nota;
      c.classList.toggle("aprobado", progreso[i].aprobado);
    });
  }
}

function resetearTodo() {
  if (confirm("¿Seguro que quieres reiniciar todo, mi amor?")) {
    localStorage.removeItem("progresoPaola");
    location.reload();
  }
}

function mostrarSorpresa() {
  const sorpresa = document.getElementById("sorpresa");
  sorpresa.style.display = "block";
}
