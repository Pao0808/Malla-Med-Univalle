const planEstudios = {
  "Primer semestre": [
    { nombre: "🧠 Anatomía I" },
    { nombre: "🧬 Genética" },
    { nombre: "🔬 Histología I" },
    { nombre: "💻 Informática Aplicada" }
  ],
  "Segundo semestre": [
    { nombre: "🧠 Anatomía II", requisito: ["Anatomía I"] },
    { nombre: "👶 Embriología", requisito: ["Genética"] },
    { nombre: "🔬 Histología II", requisito: ["Histología I"] },
    { nombre: "⚗️ Bioquímica I" },
    { nombre: "🏥 Salud Pública I" },
    { nombre: "📘 Inglés Técnico I" }
  ],
  "Tercer semestre": [
    { nombre: "⚗️ Bioquímica II", requisito: ["Bioquímica I"] },
    { nombre: "💓 Fisiología I", requisito: ["Anatomía II"] },
    { nombre: "🧫 Microbiología I" },
    { nombre: "🧬 Patología I", requisito: ["Anatomía II", "Histología II"] },
    { nombre: "📐 Biofísica", requisito: ["Anatomía II"] },
    { nombre: "📘 Inglés Técnico II", requisito: ["Inglés Técnico I"] }
  ],
  "Cuarto semestre": [
    { nombre: "⚗️ Bioquímica III", requisito: ["Bioquímica II"] },
    { nombre: "💓 Fisiología II", requisito: ["Fisiología I"] },
    { nombre: "🧫 Microbiología II", requisito: ["Microbiología I"] },
    { nombre: "🪱 Parasitología", requisito: ["Microbiología I"] },
    { nombre: "🧬 Patología II", requisito: ["Patología I"] },
    { nombre: "🧠 Psicología Médica" },
    { nombre: "🤝 Sociología y Ética Médica" },
    { nombre: "🥗 Electiva: Nutrición" }
  ],
  "Quinto semestre": [
    { nombre: "🩺 Semiología I", requisito: ["Fisiología II", "Bioquímica III"] },
    { nombre: "🛠️ Técnica Quirúrgica I", requisito: ["Fisiología II"] },
    { nombre: "💊 Farmacología I", requisito: ["Fisiología II", "Bioquímica III"] },
    { nombre: "📉 Fisiopatología I", requisito: ["Fisiología II", "Patología II"] },
    { nombre: "🧬 Patología III", requisito: ["Patología II"] },
    { nombre: "🧪 Inmunología", requisito: ["Microbiología II", "Patología II"] }
  ],
  "Sexto semestre": [
    { nombre: "🩺 Semiología II", requisito: ["Semiología I"] },
    { nombre: "🛠️ Técnica Quirúrgica II", requisito: ["Técnica Quirúrgica I"] },
    { nombre: "💊 Farmacología II", requisito: ["Farmacología I"] },
    { nombre: "📉 Fisiopatología II", requisito: ["Fisiopatología I"] },
    { nombre: "💉 Anestesiología", requisito: ["Fisiología II"] },
    { nombre: "🏥 Salud Pública II", requisito: ["Salud Pública I"] },
    { nombre: "🖼️ Imagenología", requisito: ["Anatomía II"] }
  ]
};

let aprobados = [];

const contenedor = document.getElementById("contenedor");

function renderizarCursos() {
  contenedor.innerHTML = "";

  for (const [semestre, cursos] of Object.entries(planEstudios)) {
    const bloque = document.createElement("section");
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    bloque.appendChild(titulo);

    const lista = document.createElement("ul");

    cursos.forEach(curso => {
      const li = document.createElement("li");
      const nombre = curso.nombre;

      // Estado: aprobado o bloqueado
      const esAprobado = aprobados.includes(nombre);
      const esHabilitado = (curso.requisito || []).every(req => aprobados.includes(buscarCurso(req)));

      if (esAprobado) li.classList.add("aprobado");
      else if (curso.requisito && !esHabilitado) li.classList.add("bloqueado");

      // Contenido visual
      li.innerHTML = `
        ${nombre}
        ${curso.requisito ? `<small>Requiere: ${curso.requisito.join(", ")}</small>` : ""}
      `;

      // Botón para aprobar
      const boton = document.createElement("button");
      boton.textContent = esAprobado ? "✔ Aprobado" : "Marcar como aprobado";
      boton.disabled = esAprobado;
      boton.addEventListener("click", () => {
        aprobados.push(nombre);
        renderizarCursos();
      });

      li.appendChild(boton);
      lista.appendChild(li);
    });

    bloque.appendChild(lista);
    contenedor.appendChild(bloque);
  }
}

// Busca curso por coincidencia parcial
function buscarCurso(nombre) {
  for (const cursos of Object.values(planEstudios)) {
    for (const curso of cursos) {
      if (curso.nombre.includes(nombre)) return curso.nombre;
    }
  }
  return nombre;
}

// 🎯 Mostrar solo habilitados
function mostrarSoloHabilitados() {
  const secciones = contenedor.querySelectorAll("section");

  secciones.forEach(seccion => {
    const items = seccion.querySelectorAll("li");
    let visible = false;

    items.forEach(li => {
      if (!li.classList.contains("bloqueado")) {
        li.style.display = "flex";
        visible = true;
      } else {
        li.style.display = "none";
      }
    });

    seccion.style.display = visible ? "block" : "none";
  });
}

// 🔄 Reiniciar
function resetearAprobados() {
  aprobados = [];
  renderizarCursos();

  const secciones = contenedor.querySelectorAll("section");
  secciones.forEach(seccion => (seccion.style.display = "block"));
  const items = contenedor.querySelectorAll("li");
  items.forEach(li => (li.style.display = "flex"));
}

// 🌙 Cambiar modo noche pastel
function cambiarModo() {
  document.body.classList.toggle("noche");
}

// 💌 Mostrar sorpresa secreta
function mostrarSorpresa() {
  const sorpresa = document.getElementById("sorpresa");
  sorpresa.style.display = "block";
}

renderizarCursos();
