// Definición de materias 🎓
const semestres = [
  {
    nombre: "Primer Semestre",
    materias: [
      { id: "anat1", nombre: "🦴 Anatomía I", req: [] },
      { id: "gen", nombre: "🧬 Genética", req: [] },
      { id: "histo1", nombre: "🔬 Histología I", req: [] },
      { id: "info", nombre: "💻 Informática Aplicada", req: [] }
    ]
  },
  {
    nombre: "Segundo Semestre",
    materias: [
      { id: "anat2", nombre: "🦵 Anatomía II", req: ["anat1"] },
      { id: "emb", nombre: "👶 Embriología", req: ["gen"] },
      { id: "histo2", nombre: "🧫 Histología II", req: ["histo1"] },
      { id: "bioq1", nombre: "⚗️ Bioquímica I", req: [] },
      { id: "salud1", nombre: "🏥 Salud Pública I", req: [] },
      { id: "ing1", nombre: "📘 Inglés Técnico I", req: [] }
    ]
  },
  {
    nombre: "Tercer Semestre",
    materias: [
      { id: "bioq2", nombre: "⚗️ Bioquímica II", req: ["bioq1"] },
      { id: "fisio1", nombre: "💓 Fisiología I", req: ["anat2"] },
      { id: "micro1", nombre: "🦠 Microbiología I", req: [] },
      { id: "pato1", nombre: "🧪 Patología I", req: ["anat2","histo2"] },
      { id: "biofis", nombre: "📐 Biofísica", req: ["anat2"] },
      { id: "ing2", nombre: "📘 Inglés Técnico II", req: ["ing1"] }
    ]
  },
  {
    nombre: "Cuarto Semestre",
    materias: [
      { id: "bioq3", nombre: "⚗️ Bioquímica III", req: ["bioq2"] },
      { id: "fisio2", nombre: "💓 Fisiología II", req: ["fisio1"] },
      { id: "micro2", nombre: "🦠 Microbiología II", req: ["micro1"] },
      { id: "para", nombre: "🪱 Parasitología", req: ["micro1"] },
      { id: "pato2", nombre: "🧪 Patología II", req: ["pato1"] },
      { id: "psico", nombre: "🧠 Psicología Médica", req: [] },
      { id: "socio", nombre: "🤝 Sociología y Ética Médica", req: [] },
      { id: "nutri", nombre: "🥗 Electiva (Nutrición)", req: [] }
    ]
  },
  {
    nombre: "Quinto Semestre",
    materias: [
      { id: "semio1", nombre: "🩺 Semiología I", req: ["fisio2","bioq3"] },
      { id: "tecnica1", nombre: "🔪 Técnica Quirúrgica I", req: ["fisio2"] },
      { id: "farm1", nombre: "💊 Farmacología I", req: ["fisio2","bioq3"] },
      { id: "fisiop1", nombre: "🧠 Fisiopatología I", req: ["fisio2","pato2"] },
      { id: "pato3", nombre: "🧪 Patología III", req: ["pato2"] },
      { id: "inmu", nombre: "🧬 Inmunología", req: ["micro2","pato2"] }
    ]
  },
  {
    nombre: "Sexto Semestre",
    materias: [
      { id: "semio2", nombre: "🩺 Semiología II", req: ["semio1"] },
      { id: "tecnica2", nombre: "🔪 Técnica Quirúrgica II", req: ["tecnica1"] },
      { id: "farm2", nombre: "💊 Farmacología II", req: ["farm1"] },
      { id: "fisiop2", nombre: "🧠 Fisiopatología II", req: ["fisiop1"] },
      { id: "anest", nombre: "💤 Anestesiología", req: ["fisio2"] },
      { id: "salud2", nombre: "🏥 Salud Pública II", req: ["salud1"] },
      { id: "imagen", nombre: "🖼️ Imagenología", req: ["anat2"] }
    ]
  }
];

// Renderizado
const mallaDiv = document.getElementById("malla");

function renderMalla() {
  semestres.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h2>${sem.nombre}</h2>`;

    sem.materias.forEach(mat => {
      const matDiv = document.createElement("div");
      matDiv.className = "materia";
      matDiv.innerHTML = `
        <input type="checkbox" id="${mat.id}" disabled>
        <label for="${mat.id}">${mat.nombre}</label>
      `;
      semDiv.appendChild(matDiv);
    });

    mallaDiv.appendChild(semDiv);
  });

  desbloquear();
}

function desbloquear() {
  semestres.forEach(sem => {
    sem.materias.forEach(mat => {
      const check = document.getElementById(mat.id);
      if (mat.req.every(r => document.getElementById(r).checked)) {
        if (check.disabled) {
          check.disabled = false;
          check.parentElement.classList.add("unlocked"); // ✨ animación de desbloqueo
          setTimeout(() => check.parentElement.classList.remove("unlocked"), 700);
        }
      }
    });
  });
}

mallaDiv.addEventListener("change", desbloquear);

function resetMalla() {
  document.querySelectorAll("input[type=checkbox]").forEach(c => {
    c.checked = false;
    c.disabled = true;
  });
  desbloquear();
}

renderMalla();
