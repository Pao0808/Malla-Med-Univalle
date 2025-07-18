const cursos = [
  { nombre: "Anatomía I 🫀", semestre: 1, prerequisitos: [] },
  { nombre: "Genética 🧬", semestre: 1, prerequisitos: [] },
  { nombre: "Histología I 🔬", semestre: 1, prerequisitos: [] },
  { nombre: "Informática Aplicada 💻", semestre: 1, prerequisitos: [] },

  { nombre: "Anatomía II 🧠", semestre: 2, prerequisitos: ["Anatomía I 🫀"] },
  { nombre: "Embriología 👶", semestre: 2, prerequisitos: ["Genética 🧬"] },
  { nombre: "Histología II 🧫", semestre: 2, prerequisitos: ["Histología I 🔬"] },
  { nombre: "Bioquímica I ⚗️", semestre: 2, prerequisitos: [] },
  { nombre: "Salud Pública I 🏥", semestre: 2, prerequisitos: [] },
  { nombre: "Inglés Técnico I 📘", semestre: 2, prerequisitos: [] },

  { nombre: "Bioquímica II 🧪", semestre: 3, prerequisitos: ["Bioquímica I ⚗️"] },
  { nombre: "Fisiología I 🫁", semestre: 3, prerequisitos: ["Anatomía II 🧠"] },
  { nombre: "Microbiología I 🦠", semestre: 3, prerequisitos: [] },
  { nombre: "Patología I 🧼", semestre: 3, prerequisitos: ["Anatomía II 🧠", "Histología II 🧫"] },
  { nombre: "Biofísica 🧲", semestre: 3, prerequisitos: ["Anatomía II 🧠"] },
  { nombre: "Inglés Técnico II 📙", semestre: 3, prerequisitos: ["Inglés Técnico I 📘"] },

  { nombre: "Bioquímica III 🧫", semestre: 4, prerequisitos: ["Bioquímica II 🧪"] },
  { nombre: "Fisiología II 💓", semestre: 4, prerequisitos: ["Fisiología I 🫁"] },
  { nombre: "Microbiología II 🔍", semestre: 4, prerequisitos: ["Microbiología I 🦠"] },
  { nombre: "Parasitología 🧟‍♀️", semestre: 4, prerequisitos: ["Microbiología I 🦠"] },
  { nombre: "Patología II 🩸", semestre: 4, prerequisitos: ["Patología I 🧼"] },
  { nombre: "Psicología Médica 🧠💬", semestre: 4, prerequisitos: [] },
  { nombre: "Sociología y Ética Médica 👥📜", semestre: 4, prerequisitos: [] },
  { nombre: "Electiva (Nutrición) 🥗", semestre: 4, prerequisitos: [] },

  { nombre: "Semiología I 👩‍⚕️", semestre: 5, prerequisitos: ["Fisiología II 💓", "Bioquímica III 🧫"] },
  { nombre: "Técnica Quirúrgica I 🏥🔪", semestre: 5, prerequisitos: ["Fisiología II 💓"] },
  { nombre: "Farmacología I 💊", semestre: 5, prerequisitos: ["Fisiología II 💓", "Bioquímica III 🧫"] },
  { nombre: "Fisiopatología I 🫀⚠️", semestre: 5, prerequisitos: ["Fisiología II 💓", "Patología II 🩸"] },
  { nombre: "Patología III 🧬", semestre: 5, prerequisitos: ["Patología II 🩸"] },
  { nombre: "Inmunología 🛡️", semestre: 5, prerequisitos: ["Microbiología II 🔍", "Patología II 🩸"] },

  { nombre: "Semiología II 👩‍⚕️💬", semestre: 6, prerequisitos: ["Semiología I 👩‍⚕️"] },
  { nombre: "Técnica Quirúrgica II 🏥🩺", semestre: 6, prerequisitos: ["Técnica Quirúrgica I 🏥🔪"] },
  { nombre: "Farmacología II 💊💉", semestre: 6, prerequisitos: ["Farmacología I 💊"] },
  { nombre: "Fisiopatología II 🫀💢", semestre: 6, prerequisitos: ["Fisiopatología I 🫀⚠️"] },
  { nombre: "Anestesiología 💤", semestre: 6, prerequisitos: ["Fisiología II 💓"] },
  { nombre: "Salud Pública II 🌍", semestre: 6, prerequisitos: ["Salud Pública I 🏥"] },
  { nombre: "Imagenología 🩻", semestre: 6, prerequisitos: ["Anatomía II 🧠"] }
];

function crearPlan() {
  const container = document.getElementById("planEstudios");
  container.innerHTML = "";
  const porSemestre = {};
  cursos.forEach(curso => {
    if (!porSemestre[curso.semestre]) porSemestre[curso.semestre] = [];
    porSemestre[curso.semestre].push(curso);
  });

  Object.keys(porSemestre).sort().forEach(sem => {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    h2.textContent = `📚 Semestre ${sem}`;
    const ul = document.createElement("ul");

    porSemestre[sem].forEach(curso => {
      const li = document.createElement("li");
      li.dataset.nombre = curso.nombre;

      const titulo = document.createElement("strong");
      titulo.textContent = curso.nombre;

      const inputNota = document.createElement("input");
      inputNota.type = "number";
      inputNota.placeholder = "Nota (0-100)";
      inputNota.addEventListener("change", () => validarNota(curso.nombre, inputNota.value));

      const btnVer = document.createElement("button");
      btnVer.textContent = "📌 Ver prerrequisitos";
      btnVer.onclick = () => alert(`Prerrequisitos de ${curso.nombre}:\n${curso.prerequisitos.join(", ") || "Ninguno"}`);

      li.appendChild(titulo);
      li.appendChild(inputNota);
      li.appendChild(btnVer);
      ul.appendChild(li);
    });

    section.appendChild(h2);
    section.appendChild(ul);
    container.appendChild(section);
  });

  cargarLocal();
}

function validarNota(nombre, nota) {
  const li = document.querySelector(`li[data-nombre='${nombre}']`);
  if (nota >= 60) {
    li.classList.add("aprobado");
  } else {
    li.classList.remove("aprobado");
  }
  guardarLocal();
}

function guardarLocal() {
  const datos = {};
  document.querySelectorAll("li").forEach(li => {
    const nombre = li.dataset.nombre;
    const nota = li.querySelector("input").value;
    datos[nombre] = nota;
  });
  localStorage.setItem("planPaola", JSON.stringify(datos));
}

function cargarLocal() {
  const datos = JSON.parse(localStorage.getItem("planPaola")) || {};
  document.querySelectorAll("li").forEach(li => {
    const nombre = li.dataset.nombre;
    if (datos[nombre]) {
      li.querySelector("input").value = datos[nombre];
      validarNota(nombre, datos[nombre]);
    }
  });
}

function mostrarResumen() {
  const total = document.querySelectorAll("li").length;
  const aprobados = document.querySelectorAll("li.aprobado").length;
  const promedio = [...document.querySelectorAll("li input")]
    .map(i => parseFloat(i.value) || 0)
    .filter(v => v > 0);
  const promedioFinal = promedio.length > 0 ? (promedio.reduce((a,b)=>a+b)/promedio.length).toFixed(1) : 0;

  const mensaje = `💖 Has aprobado ${aprobados} de ${total} materias.\n🎓 Tu promedio es: ${promedioFinal}`;
  alert(mensaje);

  const sorpresa = document.getElementById("sorpresa");
  sorpresa.textContent = promedioFinal >= 90
    ? "🎉 ¡Eres una estrella, Paola! Tu esfuerzo brilla como tus cuadros más lindos. 💫"
    : promedioFinal >= 75
    ? "🌷 Vas muy bien, Paola. Orgulloso de ti, siempre."
    : "💗 No importa la nota, importa que sigas. Y yo siempre estaré aquí, contigo.";
  sorpresa.style.display = "block";
}

function reiniciarTodo() {
  if (confirm("¿Estás segura de que quieres borrar todos los datos? 💔")) {
    localStorage.removeItem("planPaola");
    crearPlan();
  }
}

window.onload = crearPlan;
