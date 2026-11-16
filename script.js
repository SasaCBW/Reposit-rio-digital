
// ==========================================
// CONECTA PROFISSIONAL
// Arquivo principal de funcionalidades
// ==========================================

// ELEMENTOS PRINCIPAIS

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// ==========================================
// 1. MENU DE NAVEGAÇÃO
// ==========================================

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

// ==========================================
// 2. PROGRESSO DA JORNADA
// ==========================================

const progressFields = [
  "fullName",
  "email",
  "phone",
  "location",
  "objective",
  "education",
  "experience",
  "skills",
  "courses"
];

function updateProgress() {
  const completed = progressFields.filter(id => {
    const field = document.getElementById(id);
    return field && field.value.trim() !== "";
  }).length;

  const percentage = Math.round(
    (completed / progressFields.length) * 100
  );

  document.getElementById("heroProgress").textContent =
    percentage + "%";

  document.getElementById("heroProgressBar").style.width =
    percentage + "%";
}

progressFields.forEach(id => {
  document.getElementById(id).addEventListener("input", updateProgress);
});

updateProgress();

// ==========================================
// 3. CRIAÇÃO DO CURRÍCULO
// ==========================================

const resumeFields = [
  { input: "fullName", preview: "previewName", fallback: "Seu Nome" },
  { input: "email", preview: "previewContact", fallback: "seuemail@exemplo.com" },
  { input: "objective", preview: "previewObjective", fallback: "Seu objetivo profissional aparecerá aqui." },
  { input: "education", preview: "previewEducation", fallback: "Sua formação aparecerá aqui." },
  { input: "experience", preview: "previewExperience", fallback: "Suas experiências aparecerão aqui." },
  { input: "skills", preview: "previewSkills", fallback: "Suas habilidades aparecerão aqui." },
  { input: "courses", preview: "previewCourses", fallback: "Seus cursos aparecerão aqui." }
];

function updateResumePreview() {
  resumeFields.forEach(field => {
    const input = document.getElementById(field.input);
    const preview = document.getElementById(field.preview);

    if (input && preview) {
      preview.textContent = input.value.trim() || field.fallback;
    }
  });

  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();

  const contactDetails = [
    phone,
    location
  ].filter(Boolean);

  document.getElementById("previewPhone").textContent =
    contactDetails.join(" · ") || "Telefone · Cidade / Estado";
}

resumeFields.forEach(field => {
  document.getElementById(field.input).addEventListener(
    "input",
    updateResumePreview
  );
});

document.getElementById("phone").addEventListener(
  "input",
  updateResumePreview
);

document.getElementById("location").addEventListener(
  "input",
  updateResumePreview
);

// ==========================================
// 4. VALIDAR E GERAR CURRÍCULO
// ==========================================

const resumeForm = document.getElementById("resumeForm");

resumeForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Preencha seu nome e e-mail para gerar o currículo.");
    return;
  }

  if (!document.getElementById("email").checkValidity()) {
    alert("Informe um endereço de e-mail válido.");
    return;
  }

  updateResumePreview();

  document.getElementById("resumePreview").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  alert("Seu currículo está pronto! Agora você pode imprimir ou salvar em PDF.");
});

// ==========================================
// 5. IMPRIMIR OU SALVAR EM PDF
// ==========================================

document.getElementById("printResume").addEventListener("click", () => {
  const name = document.getElementById("fullName").value.trim();

  if (!name) {
    alert("Primeiro preencha seu nome no formulário.");
    document.getElementById("fullName").focus();
    return;
  }

  updateResumePreview();
  window.print();
});

// ==========================================
// 6. SIMULADOR DE ENTREVISTA
// ==========================================

const interviewQuestions = [
  {
    question: "Conte um pouco sobre você.",
    tip: "Apresente seu nome, sua formação, seus interesses e algumas habilidades importantes. Procure organizar sua resposta de maneira clara e natural."
  },
  {
    question: "Quais são seus principais pontos fortes?",
    tip: "Pense em características reais, como organização, comunicação, responsabilidade, criatividade e facilidade para aprender. Se possível, dê exemplos."
  },
  {
    question: "Por que você gostaria de trabalhar nesta empresa?",
    tip: "Demonstre que pesquisou sobre a organização. Explique o que chamou sua atenção e como seus interesses se relacionam com a oportunidade."
  },
  {
    question: "Como você lida com desafios e dificuldades?",
    tip: "Mostre como identifica um problema, procura soluções e aprende com situações difíceis. Um exemplo real pode deixar sua resposta mais clara."
  },
  {
    question: "Você prefere trabalhar em equipe ou individualmente?",
    tip: "Explique que cada situação pode exigir uma forma de trabalho. Fale sobre colaboração, responsabilidade e capacidade de realizar tarefas individualmente."
  },
  {
    question: "Quais são seus objetivos profissionais para o futuro?",
    tip: "Fale sobre seus planos de aprendizado, as habilidades que deseja desenvolver e a trajetória profissional que pretende construir."
  }
];

let currentQuestion = 0;

const interviewQuestion = document.getElementById("interviewQuestion");
const interviewAnswer = document.getElementById("interviewAnswer");
const interviewTip = document.getElementById("interviewTip");

function renderInterviewQuestion() {
  const question = interviewQuestions[currentQuestion];

  interviewQuestion.textContent = question.question;

  document.getElementById("questionNumber").textContent =
    String(currentQuestion + 1).padStart(2, "0") +
    " / " +
    String(interviewQuestions.length).padStart(2, "0");

  document.getElementById("interviewProgress").style.width =
    ((currentQuestion + 1) / interviewQuestions.length) * 100 + "%";

  interviewAnswer.value = "";

  interviewTip.classList.add("hidden");
  interviewTip.textContent = "";

  const nextButton = document.getElementById("nextQuestion");

  nextButton.textContent =
    currentQuestion === interviewQuestions.length - 1
      ? "Finalizar treinamento ✓"
      : "Próxima pergunta →";
}

document.getElementById("showTip").addEventListener("click", () => {
  interviewTip.textContent =
    "ORIENTAÇÃO: " + interviewQuestions[currentQuestion].tip;

  interviewTip.classList.remove("hidden");
});

document.getElementById("nextQuestion").addEventListener("click", () => {
  if (!interviewAnswer.value.trim()) {
    alert("Escreva uma resposta antes de continuar.");
    interviewAnswer.focus();
    return;
  }

  if (currentQuestion < interviewQuestions.length - 1) {
    currentQuestion++;
    renderInterviewQuestion();
  } else {
    document.getElementById("interviewMain").innerHTML = `
      <div class="interview-finished">
        <span class="tech-icon">✓</span>
        <h3>Treinamento concluído!</h3>
        <p>Você passou por todas as perguntas do simulador. Continue praticando suas respostas e desenvolvendo sua comunicação.</p>
        <button type="button" class="button-primary" id="restartInterview">
          Treinar novamente ↻
        </button>
      </div>
    `;

    document.getElementById("restartInterview").addEventListener("click", () => {
      currentQuestion = 0;

      document.getElementById("interviewMain").innerHTML = `
        <span class="question-label">PERGUNTA DA ENTREVISTA</span>
        <h3 id="interviewQuestion"></h3>
        <textarea id="interviewAnswer" rows="5" placeholder="Escreva como você responderia a essa pergunta..."></textarea>
        <div class="interview-controls">
          <button type="button" class="button-outline" id="showTip">Ver orientação</button>
          <button type="button" class="button-primary" id="nextQuestion">Próxima pergunta →</button>
        </div>
        <div class="interview-tip hidden" id="interviewTip"></div>
      `;

      bindInterviewEvents();
      renderInterviewQuestion();
    });
  }
});

function bindInterviewEvents() {
  document.getElementById("showTip").addEventListener("click", () => {
    const tip = document.getElementById("interviewTip");

    tip.textContent = "ORIENTAÇÃO: " + interviewQuestions[currentQuestion].tip;
    tip.classList.remove("hidden");
  });

  document.getElementById("nextQuestion").addEventListener("click", () => {
    const answer = document.getElementById("interviewAnswer");

    if (!answer.value.trim()) {
      alert("Escreva uma resposta antes de continuar.");
      answer.focus();
      return;
    }

    if (currentQuestion < interviewQuestions.length - 1) {
      currentQuestion++;
      renderInterviewQuestion();
    } else {
      document.getElementById("interviewMain").innerHTML = `
        <div class="interview-finished">
          <span class="tech-icon">✓</span>
          <h3>Treinamento concluído!</h3>
          <p>Parabéns por completar as perguntas. Continue praticando para melhorar sua preparação profissional.</p>
          <button class="button-primary" id="restartInterview">Treinar novamente ↻</button>
        </div>
      `;

      document.getElementById("restartInterview").addEventListener("click", () => {
        currentQuestion = 0;

        document.getElementById("interviewMain").innerHTML = `
          <span class="question-label">PERGUNTA DA ENTREVISTA</span>
          <h3 id="interviewQuestion"></h3>
          <textarea id="interviewAnswer" rows="5" placeholder="Escreva como você responderia..."></textarea>
          <div class="interview-controls">
            <button class="button-outline" id="showTip">Ver orientação</button>
            <button class="button-primary" id="nextQuestion">Próxima pergunta →</button>
          </div>
          <div class="interview-tip hidden" id="interviewTip"></div>
        `;

        bindInterviewEvents();
        renderInterviewQuestion();
      });
    }
  });
}

renderInterviewQuestion();

// ==========================================
// 7. DESAFIO DE CONHECIMENTOS
// ==========================================

const quizQuestions = [
  {
    question: "Qual é a principal função de um currículo profissional?",
    options: [
      "Contar histórias pessoais sem relação com o trabalho.",
      "Apresentar formação, habilidades e experiências.",
      "Substituir uma entrevista de emprego.",
      "Garantir uma contratação."
    ],
    correct: 1,
    explanation: "O currículo apresenta informações relevantes sobre a trajetória, a formação e as habilidades de uma pessoa."
  },
  {
    question: "Qual atitude demonstra segurança digital?",
    options: [
      "Compartilhar senhas com colegas.",
      "Utilizar a mesma senha em todos os sites.",
      "Criar senhas fortes e proteger informações pessoais.",
      "Abrir todos os links recebidos."
    ],
    correct: 2,
    explanation: "Senhas fortes, autenticação em duas etapas e atenção aos links ajudam a proteger informações pessoais."
  },
  {
    question: "Como agir durante uma entrevista de emprego?",
    options: [
      "Responder sem prestar atenção às perguntas.",
      "Falar de maneira agressiva.",
      "Demonstrar respeito, clareza e interesse.",
      "Interromper constantemente o entrevistador."
    ],
    correct: 2,
    explanation: "Comunicação clara, respeito e interesse demonstram profissionalismo durante uma entrevista."
  },
  {
    question: "O que é uma habilidade profissional?",
    options: [
      "Uma capacidade que ajuda a realizar atividades de trabalho.",
      "Um documento obrigatório para trabalhar.",
      "Uma ferramenta exclusiva de computador.",
      "Um tipo de contrato."
    ],
    correct: 0,
    explanation: "Habilidades são capacidades desenvolvidas por meio de estudo, prática e experiências."
  },
  {
    question: "Como a inteligência artificial pode contribuir no trabalho?",
    options: [
      "Substituindo toda responsabilidade humana.",
      "Ajudando a automatizar tarefas e organizar informações.",
      "Eliminando a necessidade de aprender.",
      "Garantindo que todas as informações sejam verdadeiras."
    ],
    correct: 1,
    explanation: "A IA pode apoiar tarefas e aumentar a produtividade, mas seus resultados precisam ser avaliados por pessoas."
  },
  {
    question: "Qual atitude é importante para o desenvolvimento profissional?",
    options: [
      "Evitar aprender coisas novas.",
      "Ignorar opiniões construtivas.",
      "Desistir diante de dificuldades.",
      "Buscar conhecimento e desenvolver novas habilidades."
    ],
    correct: 3,
    explanation: "Aprendizado contínuo e disposição para desenvolver habilidades são importantes para a evolução profissional."
  }
];

let quizIndex = 0;
let quizPoints = 0;
let quizAnswered = false;

const quizBox = document.getElementById("quizBox");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuiz = document.getElementById("nextQuiz");
const quizResult = document.getElementById("quizResult");

document.getElementById("startQuiz").addEventListener("click", () => {
  quizIndex = 0;
  quizPoints = 0;
  quizAnswered = false;

  quizBox.classList.remove("hidden");
  quizResult.classList.add("hidden");

  document.getElementById("startQuiz").textContent = "Recomeçar desafio ↻";

  renderQuiz();

  quizBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

function renderQuiz() {
  const question = quizQuestions[quizIndex];

  quizAnswered = false;

  document.getElementById("quizCounter").textContent =
    `PERGUNTA ${quizIndex + 1} DE ${quizQuestions.length}`;

  document.getElementById("quizScore").textContent =
    `Pontos: ${quizPoints}`;

  document.getElementById("quizProgress").style.width =
    ((quizIndex + 1) / quizQuestions.length) * 100 + "%";

  quizQuestion.textContent = question.question;

  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";

  nextQuiz.classList.add("hidden");
  quizOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      answerQuiz(index);
    });

    quizOptions.appendChild(button);
  });
}

function answerQuiz(selectedIndex) {
  if (quizAnswered) return;

  quizAnswered = true;

  const question = quizQuestions[quizIndex];
  const buttons = quizOptions.querySelectorAll(".quiz-option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== question.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === question.correct) {
    quizPoints++;

    quizFeedback.textContent =
      "✓ Resposta correta! " + question.explanation;

    quizFeedback.style.color = "#168b70";
  } else {
    quizFeedback.textContent =
      "Não foi dessa vez. " + question.explanation;

    quizFeedback.style.color = "#bb5a5a";
  }

  document.getElementById("quizScore").textContent =
    `Pontos: ${quizPoints}`;

  if (quizIndex === quizQuestions.length - 1) {
    nextQuiz.textContent = "Ver meu resultado";
  } else {
    nextQuiz.textContent = "Próxima pergunta →";
  }

  nextQuiz.classList.remove("hidden");
}

nextQuiz.addEventListener("click", () => {
  if (!quizAnswered) return;

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuiz();
  } else {
    showQuizResult();
  }
});

// ==========================================
// 8. RESULTADO DO DESAFIO
// ==========================================

function showQuizResult() {
  quizQuestion.classList.add("hidden");
  quizOptions.classList.add("hidden");
  quizFeedback.classList.add("hidden");
  nextQuiz.classList.add("hidden");

  let title;
  let message;

  if (quizPoints === 6) {
    title = "Excelente resultado!";
    message = "Você demonstrou ótimo conhecimento sobre tecnologia e preparação profissional.";
  } else if (quizPoints >= 4) {
    title = "Muito bom!";
    message = "Você já conhece vários conceitos importantes. Continue estudando para ampliar seus conhecimentos.";
  } else if (quizPoints >= 2) {
    title = "Você está aprendendo!";
    message = "Você já começou sua jornada. Revise os conteúdos e tente novamente para melhorar seu resultado.";
  } else {
    title = "Hora de aprender!";
    message = "Este é um ótimo começo. Explore os conteúdos da plataforma e faça o desafio novamente.";
  }

  quizResult.innerHTML = `
    <span class="section-label">SEU RESULTADO</span>
    <h3>${quizPoints} de ${quizQuestions.length} acertos</h3>
    <h3>${title}</h3>
    <p>${message}</p>
    <button type="button" class="button-primary" id="retryQuiz">
      Refazer desafio ↻
    </button>
  `;

  quizResult.classList.remove("hidden");

  document.getElementById("retryQuiz").addEventListener("click", () => {
    quizIndex = 0;
    quizPoints = 0;

    quizQuestion.classList.remove("hidden");
    quizOptions.classList.remove("hidden");
    quizFeedback.classList.remove("hidden");
    quizResult.classList.add("hidden");

    renderQuiz();
  });
}

// ==========================================
// 9. INICIALIZAÇÃO
// ==========================================

function initializePlatform() {
  updateResumePreview();
  updateProgress();
  renderInterviewQuestion();
}

initializePlatform();

console.log("Conecta Profissional iniciado com sucesso!");
