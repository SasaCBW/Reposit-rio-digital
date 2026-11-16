
// ==========================================
// REPOLAB
// SISTEMA PRINCIPAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. MENU DE NAVEGAÇÃO
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // ======================================
    // 2. SISTEMA DE NOTIFICAÇÕES
    // ======================================

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    let toastTimer;

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    // ======================================
    // 3. COPIAR COMANDOS E LINKS
    // ======================================

    const copyButtons = document.querySelectorAll("[data-copy]");

    async function copyText(text) {

        try {

            if (navigator.clipboard && window.isSecureContext) {

                await navigator.clipboard.writeText(text);

            } else {

                const temporaryInput = document.createElement("textarea");

                temporaryInput.value = text;

                temporaryInput.style.position = "fixed";
                temporaryInput.style.opacity = "0";

                document.body.appendChild(temporaryInput);

                temporaryInput.select();

                const copied = document.execCommand("copy");

                temporaryInput.remove();

                if (!copied) {
                    throw new Error("Não foi possível copiar.");
                }

            }

            showToast("Conteúdo copiado com sucesso!");

        } catch (error) {

            showToast("Não foi possível copiar automaticamente.");

            console.error(error);

        }

    }

    copyButtons.forEach(button => {

        button.addEventListener("click", () => {

            const text = button.dataset.copy;

            copyText(text);

        });

    });


    // ======================================
    // 4. PESQUISA E FILTROS DOS REPOSITÓRIOS
    // ======================================

    const repositorySearch = document.getElementById("repositorySearch");

    const repositoryCards = document.querySelectorAll(".repository-card");

    const repoFilters = document.querySelectorAll(".repo-filter");

    const repositoryGrid = document.getElementById("repositoryGrid");

    const noRepositories = document.getElementById("noRepositories");

    let activeCategory = "todos";


    repoFilters.forEach(button => {

        button.addEventListener("click", () => {

            repoFilters.forEach(item => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            activeCategory = button.dataset.filter;

            filterRepositories();

        });

    });


    repositorySearch.addEventListener("input", filterRepositories);


    function filterRepositories() {

        const search = repositorySearch.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        repositoryCards.forEach(card => {

            const category = card.dataset.category;

            const content = card.textContent.toLowerCase();

            const matchesCategory =
                activeCategory === "todos" ||
                category === activeCategory;

            const matchesSearch = content.includes(search);

            const visible = matchesCategory && matchesSearch;

            card.classList.toggle("hidden", !visible);

            if (visible) {
                visibleCount++;
            }

        });


        repositoryGrid.classList.toggle(
            "hidden",
            visibleCount === 0
        );

        noRepositories.classList.toggle(
            "hidden",
            visibleCount !== 0
        );

    }


    // ======================================
    // 5. PROGRESSO DE APRENDIZADO
    // ======================================

    const checkboxes = document.querySelectorAll(".learning-check");

    const progressFill = document.getElementById("progressFill");

    const progressPercentage = document.getElementById("progressPercentage");

    const progressCount = document.getElementById("progressCount");

    const resetProgress = document.getElementById("resetProgress");

    const STORAGE_KEY = "repolab-learning-progress-v1";


    function loadProgress() {

        try {

            const savedProgress = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            checkboxes.forEach(checkbox => {

                checkbox.checked = savedProgress.includes(checkbox.value);

            });

        } catch (error) {

            console.warn("Não foi possível recuperar o progresso.", error);

        }

        updateProgress();

    }


    function updateProgress() {

        const total = checkboxes.length;

        const completed = Array.from(checkboxes).filter(
            checkbox => checkbox.checked
        ).length;

        const percentage = Math.round(
            (completed / total) * 100
        );

        progressFill.style.width = percentage + "%";

        progressPercentage.textContent = percentage + "%";

        progressCount.textContent =
            completed + " de " + total + " atividades";


        const savedProgress = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);


        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(savedProgress)
            );

        } catch (error) {

            console.warn("Não foi possível salvar o progresso.", error);

        }

        if (percentage === 100) {

            showToast("Parabéns! Você concluiu todas as atividades!");

        }

    }


    checkboxes.forEach(checkbox => {

        checkbox.addEventListener("change", updateProgress);

    });


    resetProgress.addEventListener("click", () => {

        const confirmation = confirm(
            "Deseja realmente reiniciar seu progresso?"
        );

        if (!confirmation) return;

        checkboxes.forEach(checkbox => {

            checkbox.checked = false;

        });

        updateProgress();

        showToast("Seu progresso foi reiniciado.");

    });


    loadProgress();


    // ======================================
    // 6. DESAFIO DE CONHECIMENTOS
    // ======================================

    const questions = [

        {
            question: "O que é um repositório digital?",

            options: [
                "Um espaço para armazenar e organizar arquivos de projetos.",
                "Um programa utilizado apenas para desenhar.",
                "Um tipo de computador.",
                "Uma rede social exclusiva para vídeos."
            ],

            correct: 0,

            explanation:
                "Um repositório é um espaço onde os arquivos de um projeto são armazenados e organizados."
        },


        {
            question: "Qual é a principal função do Git?",

            options: [
                "Criar imagens automaticamente.",
                "Controlar versões e registrar alterações em arquivos.",
                "Hospedar vídeos.",
                "Criar contas de e-mail."
            ],

            correct: 1,

            explanation:
                "O Git permite acompanhar alterações, registrar versões e organizar o desenvolvimento."
        },


        {
            question: "Para que serve o GitHub?",

            options: [
                "Somente para assistir vídeos.",
                "Para substituir o sistema operacional.",
                "Para hospedar repositórios e colaborar em projetos.",
                "Para editar fotografias."
            ],

            correct: 2,

            explanation:
                "O GitHub é uma plataforma de hospedagem de repositórios Git e colaboração."
        },


        {
            question: "Qual comando prepara arquivos para um commit?",

            options: [
                "git start",
                "git add .",
                "git create",
                "git finish"
            ],

            correct: 1,

            explanation:
                "O comando git add . adiciona as alterações da pasta atual à área de preparação."
        },


        {
            question: "Qual é a finalidade do arquivo README.md?",

            options: [
                "Apresentar informações e instruções sobre o projeto.",
                "Excluir arquivos antigos.",
                "Substituir todos os códigos.",
                "Impedir o acesso ao repositório."
            ],

            correct: 0,

            explanation:
                "O README apresenta o projeto, suas tecnologias, funcionalidades e instruções."
        },


        {
            question: "Qual cuidado devemos ter ao compartilhar um projeto?",

            options: [
                "Publicar todas as senhas.",
                "Compartilhar informações privadas.",
                "Ignorar os direitos autorais.",
                "Proteger dados pessoais e informações confidenciais."
            ],

            correct: 3,

            explanation:
                "Antes de publicar, é fundamental proteger senhas, dados pessoais e informações confidenciais."
        }

    ];


    let currentQuestion = 0;

    let score = 0;

    let answered = false;


    const startQuiz = document.getElementById("startQuiz");

    const quizPanel = document.getElementById("quizPanel");

    const quizCounter = document.getElementById("quizCounter");

    const quizScore = document.getElementById("quizScore");

    const quizProgress = document.getElementById("quizProgress");

    const quizQuestion = document.getElementById("quizQuestion");

    const quizOptions = document.getElementById("quizOptions");

    const quizFeedback = document.getElementById("quizFeedback");

    const nextQuestion = document.getElementById("nextQuestion");

    const quizResult = document.getElementById("quizResult");


    // INICIAR DESAFIO

    startQuiz.addEventListener("click", () => {

        currentQuestion = 0;

        score = 0;

        answered = false;

        quizPanel.classList.remove("hidden");

        quizResult.classList.add("hidden");

        startQuiz.textContent = "Recomeçar desafio ↻";

        renderQuestion();

        quizPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    // EXIBIR PERGUNTA

    function renderQuestion() {

        const question = questions[currentQuestion];

        answered = false;

        quizCounter.textContent =
            `PERGUNTA ${String(currentQuestion + 1).padStart(2, "0")} DE ${questions.length}`;


        quizScore.textContent = "Pontos: " + score;

        quizProgress.style.width =
            ((currentQuestion + 1) / questions.length * 100) + "%";


        quizQuestion.textContent = question.question;

        quizOptions.innerHTML = "";

        quizFeedback.textContent = "";

        nextQuestion.classList.add("hidden");


        question.options.forEach((option, index) => {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "quiz-option";

            button.textContent = option;

            button.addEventListener("click", () => {

                answerQuestion(index);

            });

            quizOptions.appendChild(button);

        });

    }


    // CORRIGIR RESPOSTA

    function answerQuestion(selectedIndex) {

        if (answered) return;

        answered = true;

        const question = questions[currentQuestion];

        const options = quizOptions.querySelectorAll(".quiz-option");


        options.forEach((button, index) => {

            button.disabled = true;

            if (index === question.correct) {

                button.classList.add("correct");

            }

            if (
                index === selectedIndex &&
                selectedIndex !== question.correct
            ) {

                button.classList.add("incorrect");

            }

        });


        if (selectedIndex === question.correct) {

            score++;

            quizFeedback.textContent =
                "✓ Resposta correta! " + question.explanation;

        } else {

            quizFeedback.textContent =
                "Resposta incorreta. " + question.explanation;

        }


        quizScore.textContent = "Pontos: " + score;


        nextQuestion.textContent =
            currentQuestion === questions.length - 1
                ? "Ver meu resultado"
                : "Próxima pergunta →";


        nextQuestion.classList.remove("hidden");

    }


    // PRÓXIMA PERGUNTA

    nextQuestion.addEventListener("click", () => {

        if (!answered) return;

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            renderQuestion();

        } else {

            showResult();

        }

    });


    // RESULTADO FINAL

    function showResult() {

        quizQuestion.classList.add("hidden");

        quizOptions.classList.add("hidden");

        quizFeedback.classList.add("hidden");

        nextQuestion.classList.add("hidden");


        let title;

        let message;


        if (score === questions.length) {

            title = "Desempenho excelente!";

            message =
                "Você demonstrou um ótimo conhecimento sobre repositórios digitais, Git e GitHub.";

        } else if (score >= 4) {

            title = "Muito bem!";

            message =
                "Você já conhece os principais conceitos. Continue praticando para aprofundar seus conhecimentos.";

        } else if (score >= 2) {

            title = "Você está aprendendo!";

            message =
                "Você já começou sua jornada. Revise os conteúdos e tente novamente.";

        } else {

            title = "Hora de explorar!";

            message =
                "Aproveite os tutoriais da plataforma para aprender mais e melhorar sua pontuação.";

        }


        quizResult.innerHTML = `
            <span class="section-tag">RESULTADO FINAL</span>

            <h3>${score} de ${questions.length} acertos</h3>

            <h3>${title}</h3>

            <p>${message}</p>

            <button type="button" class="button-primary" id="retryQuiz">
                Refazer desafio ↻
            </button>
        `;


        quizResult.classList.remove("hidden");


        document.getElementById("retryQuiz").addEventListener("click", () => {

            currentQuestion = 0;

            score = 0;

            quizQuestion.classList.remove("hidden");

            quizOptions.classList.remove("hidden");

            quizFeedback.classList.remove("hidden");

            quizResult.classList.add("hidden");

            renderQuestion();

        });

    }


    // ======================================
    // 7. INICIALIZAÇÃO
    // ======================================

    filterRepositories();

    console.log("RepoLab iniciado com sucesso!");

});
