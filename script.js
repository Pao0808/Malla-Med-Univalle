let hidePassed = false;

// --- DATOS DE LA MALLA COMPLETA ---
const semestres = [
  // 🌹 CICLO BÁSICO
  {
    nombre: "Primer Semestre (Ciclo Básico)",
    materias: [
      { id: "anat1", nombre: "🦴 Anatomía Humana I", req: [] },
      { id: "gen", nombre: "🧬 Genética", req: [] },
      { id: "histo1", nombre: "🔬 Histología I", req: [] },
      { id: "info", nombre: "💻 Informática Aplicada", req: [] }
    ]
  },
  {
    nombre: "Segundo Semestre (Ciclo Básico)",
    materias: [
      { id: "anat2", nombre: "🦵 Anatomía Humana II", req: ["anat1"] },
      { id: "emb", nombre: "👶 Embriología", req: ["gen"] },
      { id: "histo2", nombre: "🧫 Histología II", req: ["histo1"] },
      { id: "bioq1", nombre: "⚗️ Bioquímica I", req: [] },
      { id: "salud1", nombre: "🏥 Salud Pública I", req: [] },
      { id: "ing1", nombre: "📘 Inglés Técnico I", req: [] }
    ]
  },
  {
    nombre: "Tercer Semestre (Ciclo Básico)",
    materias: [
      { id: "bioq2", nombre: "⚗️ Bioquímica II", req: ["bioq1"] },
      { id: "fisio1", nombre: "💓 Fisiología I", req: ["anat2"] },
      { id: "micro1", nombre: "🦠 Microbiología I", req: ["gen"] },
      { id: "pato1", nombre: "🧪 Patología I", req: ["anat2", "histo2"] },
      { id: "biofis", nombre: "📐 Biofísica", req: ["anat2"] },
      { id: "ing2", nombre: "📘 Inglés Técnico II", req: ["ing1"] }
    ]
  },
  {
    nombre: "Cuarto Semestre (Ciclo Básico)",
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

  // 🌹 PRECLÍNICO
  {
    nombre: "Quinto Semestre (Preclínico)",
    materias: [
      { id: "semio1", nombre: "🩺 Semiología I", req: ["bioq3", "fisio2"] },
      { id: "tecnica1", nombre: "🔪 Técnica Quirúrgica I", req: ["fisio2"] },
      { id: "farm1", nombre: "💊 Farmacología I", req: ["bioq3", "fisio2"] },
      { id: "fisiop1", nombre: "🧠 Fisiopatología I", req: ["fisio2", "pato2"] },
      { id: "pato3", nombre: "🧪 Patología III", req: ["pato2"] },
      { id: "inmu", nombre: "🧬 Inmunología", req: ["micro2", "pato2"] }
    ]
  },
  {
    nombre: "Sexto Semestre (Preclínico)",
    materias: [
      { id: "semio2", nombre: "🩺 Semiología II", req: ["semio1"] },
      { id: "tecnica2", nombre: "🔪 Técnica Quirúrgica II", req: ["tecnica1"] },
      { id: "farm2", nombre: "💊 Farmacología II", req: ["farm1"] },
      { id: "fisiop2", nombre: "🧠 Fisiopatología II", req: ["fisiop1"] },
      { id: "anest", nombre: "💤 Anestesiología", req: ["fisio2"] },
      { id: "salud2", nombre: "🏥 Salud Pública II", req: ["salud1"] },
      { id: "imagen", nombre: "🖼️ Imagenología", req: ["anat2"] }
    ]
  },

  // 🌹 CICLO CLÍNICO – 4TO AÑO
  {
    nombre: "Cuarto Año (Ciclo Clínico)",
    materias: [
      { id: "ciru1", nombre: "🩸 Cirugía I", req: ["farm2", "semio2", "tecnica2"] },
      { id: "gine1", nombre: "🤰 Ginecología y Obstetricia I", req: ["farm2", "semio2", "tecnica2", "emb"] },
      { id: "cardio", nombre: "❤️ Medicina Interna I – Cardiología", req: ["fisiop2", "farm2", "semio2"] },
      { id: "nefro", nombre: "💧 Medicina Interna I – Nefrología", req: ["fisiop2", "farm2", "semio2"] },
      { id: "neumo", nombre: "🌬️ Medicina Interna I – Neumología", req: ["fisiop2", "farm2", "semio2"] },
      { id: "reuma", nombre: "🦴 Medicina Interna I – Reumatología", req: ["fisiop2", "farm2", "semio2"] },
      { id: "oftal", nombre: "👁️ Oftalmología", req: ["semio2", "tecnica2"] },
      { id: "otorrino", nombre: "👂 Otorrinolaringología", req: ["semio2", "tecnica2"] },
      { id: "pedi1", nombre: "👶 Pediatría I", req: ["farm2", "semio2"] },
      { id: "trauma", nombre: "🦵 Traumatología y Ortopedia", req: ["farm2", "imagen", "tecnica2"] },
      { id: "uro", nombre: "🚻 Urología", req: ["semio2", "tecnica2"] },
      { id: "epi", nombre: "📈 Epidemiología", req: ["salud2"] }
    ]
  },

  // 🌹 CICLO CLÍNICO – 5TO AÑO
  {
    nombre: "Quinto Año (Ciclo Clínico)",
    materias: [
      { id: "ciru2", nombre: "🩸 Cirugía II", req: ["ciru1"] },
      { id: "derma", nombre: "🌿 Dermatología", req: ["pato3", "semio2"] },
      { id: "gine2", nombre: "🤰 Ginecología y Obstetricia II", req: ["gine1"] },
      { id: "endo", nombre: "🫀 Medicina Interna II – Endocrinología", req: ["cardio", "nefro", "neumo", "reuma"] },
      { id: "gastro", nombre: "🍽️ Medicina Interna II – Gastroenterología", req: ["cardio", "nefro", "neumo", "reuma"] },
      { id: "hema", nombre: "🩸 Medicina Interna II – Hematología", req: ["cardio", "nefro", "neumo", "reuma"] },
      { id: "infecto", nombre: "🧫 Medicina Interna II – Infectología", req: ["cardio", "nefro", "neumo", "reuma"] },
      { id: "legal", nombre: "⚖️ Medicina Legal", req: ["pato3"] },
      { id: "neuro", nombre: "🧠 Neurología y Neurocirugía", req: ["ciru1"] },
      { id: "pedi2", nombre: "👶 Pediatría II", req: ["pedi1"] },
      { id: "psiq", nombre: "🧩 Psiquiatría", req: ["psico"] },
      { id: "salud3", nombre: "🏥 Salud Pública III", req: ["salud2"] },
      { id: "admin", nombre: "📊 Administración Hospitalaria", req: ["salud2"] }
    ]
  },

  // 🌹 INTERNADO – 6TO AÑO
  {
    nombre: "Sexto Año (Internado Rotatorio y Examen de Grado)",
    materias: [
      { id: "int_ciru", nombre: "🏥 Internado Rotatorio en Cirugía", req: ["aprobado5to"] },
      { id: "int_gine", nombre: "🤰 Internado Rotatorio en Ginecología y Obstetricia", req: ["aprobado5to"] },
      { id: "int_medinterna", nombre: "💊 Internado Rotatorio en Medicina Interna", req: ["aprobado5to"] },
      { id: "int_pedi", nombre: "👶 Internado Rotatorio en Pediatría", req: ["aprobado5to"] },
      { id: "grado", nombre: "🎓 Examen de Grado", req: ["int_ciru", "int_gine", "int_medinterna", "int_pedi"] }
    ]
  }
];

// --- RENDERIZADO ---
const mallaDiv = document.getElementById("malla");

function renderMalla() {
  mallaDiv.innerHTML = "";
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

  loadProgress();
  desbloquear();
}

// --- FUNCIONES DE DESBLOQUEO ---
function verificarAprobado5to() {
  const quintoAno = semestres.find(s => s.nombre.includes("Quinto Año"));
  if (!quintoAno) return;
  const todasAprobadas = quintoAno.materias.every(m => document.getElementById(m.id)?.checked);
  if (todasAprobadas) {
    if (!localStorage.getItem("aprobado5to")) {
      mostrarMensaje("🎓 ¡Mi amor, terminaste el 5to año! Ya puedes iniciar tu internado. 💖 Te ama tu Leo 💌");
    }
    localStorage.setItem("aprobado5to", "true");
  } else {
    localStorage.removeItem("aprobado5to");
  }
}

function requisitoCumplido(reqId) {
  if (reqId === "aprobado5to") {
    return localStorage.getItem("aprobado5to") === "true";
  }
  const check = document.getElementById(reqId);
  return check && check.checked;
}

function desbloquear() {
  verificarAprobado5to();

  semestres.forEach(sem => {
    sem.materias.forEach(mat => {
      const check = document.getElementById(mat.id);
      const puedeDesbloquear = mat.req.every(requisitoCumplido);
      if (puedeDesbloquear && check.disabled) {
        check.disabled = false;
        check.parentElement.classList.add("unlocked");
        setTimeout(() => check.parentElement.classList.remove("unlocked"), 700);
      }
      if (hidePassed && check.checked) {
        check.parentElement.classList.add("hidden");
      } else {
        check.parentElement.classList.remove("hidden");
      }
    });
  });
}

// --- GUARDAR Y CARGAR ---
function saveProgress() {
  const progreso = {};
  document.querySelectorAll("input[type=checkbox]").forEach(c => {
    progreso[c.id] = c.checked;
  });
  localStorage.setItem("mallaMedicina", JSON.stringify(progreso));
  alert("✅ Progreso guardado");
}

function loadProgress() {
  const data = JSON.parse(localStorage.getItem("mallaMedicina") || "{}");
  document.querySelectorAll("input[type=checkbox]").forEach(c => {
    if (data[c.id]) {
      c.checked = true;
      c.disabled = false;
    }
  });
  desbloquear();
}

function resetMalla() {
  localStorage.removeItem("mallaMedicina");
  localStorage.removeItem("aprobado5to");
  document.querySelectorAll("input[type=checkbox]").forEach(c => {
    c.checked = false;
    c.disabled = true;
  });
  desbloquear();
}

function toggleHide() {
  hidePassed = !hidePassed;
  desbloquear();
}

// --- EVENTO GLOBAL ---
mallaDiv.addEventListener("change", e => {
  if (e.target.matches("input[type=checkbox]")) {
    desbloquear();
  }
});

// --- MENSAJE ROMÁNTICO MÁGICO ---
function mostrarMensaje(texto) {
  const msg = document.createElement("div");
  msg.className = "mensaje-magico";
  msg.innerText = texto;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 4000);
}

renderMalla();
