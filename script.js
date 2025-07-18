document.addEventListener('DOMContentLoaded', () => {
  // Datos de cursos con prerrequisitos y emojis
  const cursos = {
    'primer': [
      { id: 'anatomia1', name: 'Anatomía I', prereq: [], emoji: '🦴' },
      { id: 'genetica', name: 'Genética', prereq: [], emoji: '🧬' },
      { id: 'histologia1', name: 'Histología I', prereq: [], emoji: '🔬' },
      { id: 'informatica', name: 'Informática Aplicada', prereq: [], emoji: '💻' },
    ],
    'segundo': [
      { id: 'anatomia2', name: 'Anatomía II', prereq: ['anatomia1'], emoji: '🦴' },
      { id: 'embriologia', name: 'Embriología', prereq: ['genetica'], emoji: '👶' },
      { id: 'histologia2', name: 'Histología II', prereq: ['histologia1'], emoji: '🔬' },
      { id: 'bioquimica1', name: 'Bioquímica I', prereq: [], emoji: '⚗️' },
      { id: 'saludpublica1', name: 'Salud pública I', prereq: [], emoji: '🏥' },
      { id: 'ingles1', name: 'Inglés técnico I', prereq: [], emoji: '🇬🇧' },
    ],
    'tercer': [
      { id: 'bioquimica2', name: 'Bioquímica II', prereq: ['bioquimica1'], emoji: '⚗️' },
      { id: 'fisiologia1', name: 'Fisiología I', prereq: ['anatomia2'], emoji: '❤️' },
      { id: 'microbiologia1', name: 'Microbiología I', prereq: [], emoji: '🦠' },
      { id: 'patologia1', name: 'Patología I', prereq: ['anatomia2', 'histologia2'], emoji: '🩸' },
      { id: 'biofisica', name: 'Biofísica', prereq: ['anatomia2'], emoji: '⚡' },
      { id: 'ingles2', name: 'Inglés técnico II', prereq: ['ingles1'], emoji: '🇬🇧' },
    ],
    'cuarto': [
      { id: 'bioquimica3', name: 'Bioquímica III', prereq: ['bioquimica2'], emoji: '⚗️' },
      { id: 'fisiologia2', name: 'Fisiología II', prereq: ['fisiologia1'], emoji: '❤️' },
      { id: 'microbiologia2', name: 'Microbiología II', prereq: ['microbiologia1'], emoji: '🦠' },
      { id: 'parasitologia', name: 'Parasitología', prereq: ['microbiologia1'], emoji: '🐛' },
      { id: 'patologia2', name: 'Patología II', prereq: ['patologia1'], emoji: '🩸' },
      { id: 'psicologia', name: 'Psicología Médica', prereq: [], emoji: '🧠' },
      { id: 'sociologia', name: 'Sociología y Ética Médica', prereq: [], emoji: '⚖️' },
      { id: 'electiva', name: 'Electiva (Nutrición)', prereq: [], emoji: '🥗' },
    ],
    'quinto': [
      { id: 'semiologia1', name: 'Semiología General y Especial I', prereq: ['fisiologia2', 'bioquimica3'], emoji: '🩺' },
      { id: 'tecnicaquirurgica1', name: 'Técnica Quirúrgica I', prereq: ['fisiologia2'], emoji: '🔪' },
      { id: 'farmacologia1', name: 'Farmacología y Terapéutica I', prereq: ['fisiologia2', 'bioquimica3'], emoji: '💊' },
      { id: 'fisiopatologia1', name: 'Fisiopatología I', prereq: ['fisiologia2', 'patologia2'], emoji: '🩻' },
      { id: 'patologia3', name: 'Patología III', prereq: ['patologia2'], emoji: '🩸' },
      { id: 'inmunologia', name: 'Inmunología', prereq: ['microbiologia2', 'patologia2'], emoji: '🛡️' },
    ],
    'sexto': [
      { id: 'semiologia2', name: 'Semiología General y Especial II', prereq: ['semiologia1'], emoji: '🩺' },
      { id: 'tecnicaquirurgica2', name: 'Técnica Quirúrgica II', prereq: ['tecnicaquirurgica1'], emoji: '🔪' },
      { id: 'farmacologia2', name: 'Farmacología y Terapéutica II', prereq: ['farmacologia1'], emoji: '💊' },
      { id: 'fisiopatologia2', name: 'Fisiopatología II', prereq: ['fisiopatologia1'], emoji: '🩻' },
      { id: 'anestesiologia', name: 'Anestesiología', prereq: ['fisiologia2'], emoji: '💉' },
      { id: 'saludpublica2', name: 'Salud Pública II', prereq: ['saludpublica1'], emoji: '🏥' },
      { id: 'imagenologia', name: 'Imagenología', prereq: ['anatomia2'], emoji: '🩻' },
    ],
  };

  // Función para crear el DOM de los cursos
  function crearCursos() {
    Object.entries(cursos).forEach(([semestreId, listaCursos]) => {
      const listaContainer = document.getElementById(semestreId + '-list');
      listaContainer.innerHTML = ''; // Limpiar

      listaCursos.forEach(curso => {
        const divCurso = document.createElement('div');
        divCurso.classList.add('course');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = curso.id;

        // Cargar estado guardado
        checkbox.checked = localStorage.getItem(curso.id + '-aprobado') === 'true';

        const label = document.createElement('label');
        label.classList.add('course-name');
        label.setAttribute('for', curso.id);
        label.textContent = curso.name;

        // Emoji del curso
        const emojiSpan = document.createElement('span');
        emojiSpan.classList.add('course-emoji');
        emojiSpan.textContent = curso.emoji;

        // Icono ojo para prerrequisitos
        const eyeIcon = document.createElement('span');
        eyeIcon.classList.add('eye-icon');
        eyeIcon.innerHTML = '👁️';

        // Tooltip de prerrequisitos
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        if (curso.prereq.length === 0) {
          tooltip.textContent = 'Sin prerrequisitos';
        } else {
          // Mostrar nombres de cursos prereq
          const nombres = curso.prereq.map(id => {
            // Buscar nombre por id en todos los cursos
            for (const sem in cursos) {
              const encontrado = cursos[sem].find(c => c.id === id);
              if (encontrado) return encontrado.name;
            }
            return id;
          });
          tooltip.textContent = 'Prerrequisitos: ' + nombres.join(', ');
        }

        eyeIcon.addEventListener('mouseenter', () => {
          tooltip.classList.add('show');
        });
        eyeIcon.addEventListener('mouseleave', () => {
          tooltip.classList.remove('show');
        });

        // Guardar estado checkbox en localStorage y validar prerrequisitos
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            // Validar si cumple prereq
            const cumple = curso.prereq.every(prId => localStorage.getItem(prId + '-aprobado') === 'true');
            if (!cumple) {
              alert('No cumple los prerrequisitos para ' + curso.name);
              checkbox.checked = false;
              return;
            }
          }
          // Guardar estado y actualizar estilo
          localStorage.setItem(curso.id + '-aprobado', checkbox.checked);
          actualizarEstilosCursos();
        });

        divCurso.appendChild(checkbox);
        divCurso.appendChild(label);
        divCurso.appendChild(emojiSpan);
        divCurso.appendChild(eyeIcon);
        divCurso.appendChild(tooltip);

        listaContainer.appendChild(divCurso);
      });
    });
  }

  // Actualizar estilos de cursos según si están aprobados
  function actualizarEstilosCursos() {
    Object.entries(cursos).forEach(([_, listaCursos]) => {
      listaCursos.forEach(curso => {
        const checkbox = document.getElementById(curso.id);
        const label = checkbox ? checkbox.nextElementSibling : null;
