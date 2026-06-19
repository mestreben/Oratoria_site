// ===== GOOGLE SHEETS CONFIG =====
// Cole aqui a URL do seu Google Apps Script (veja google-apps-script.js para instruÃ§Ãµes)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6sOl3UNbgsZYcQfWBN_5UpPiev5cVs90dFCdeBF7KueUuWu7gHWhcreREAQ_aeuP2/exec"; // <-- COLE SUA URL AQUI

// ===== MOBILE NAV TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Make elements visible when animation class is added
  const style = document.createElement('style');
  style.textContent = '.fade-in.visible, .slide-up.visible { opacity: 1 !important; }';
  document.head.appendChild(style);
});

// ===== QUIZ DATA =====
const quizData = [
  {
    question: "Qual Ã© o seu objetivo principal ao iniciar uma fala?",
    options: [
      { text: "Organizar as ideias de forma lÃ³gica", value: 0 },
      { text: "Criar uma conexÃ£o imediata com o pÃºblico", value: 1 },
      { text: "Passar credibilidade tÃ©cnica e profundidade", value: 3 },
      { text: "Apresentar uma visÃ£o inovadora e transformadora", value: 4 },
      { text: "Transmitir calma e seguranÃ§a para quem ouve", value: 6 },
    ],
  },
  {
    question: "Como vocÃª se prepara para uma apresentaÃ§Ã£o importante?",
    options: [
      { text: "Analisando dados e estruturando cada detalhe", value: 0 },
      { text: "Pensando em histÃ³rias que possam emocionar", value: 2 },
      { text: "Focando na estratÃ©gia e nos resultados esperados", value: 8 },
      { text: "Buscando formas criativas e Ãºnicas de apresentar", value: 9 },
      { text: "Praticando para vencer a timidez e o nervosismo", value: 5 },
    ],
  },
  {
    question: "Qual dessas caracterÃ­sticas vocÃª considera sua maior forÃ§a?",
    options: [
      { text: "Espontaneidade e carisma natural", value: 1 },
      { text: "Profundo domÃ­nio tÃ©cnico do assunto", value: 3 },
      { text: "Energia contagiante que ilumina o ambiente", value: 7 },
      { text: "ArgumentaÃ§Ã£o sÃ³lida e persuasiva", value: 8 },
      { text: "Originalidade e pensamento lateral", value: 9 },
    ],
  },
  {
    question: "Qual Ã© o seu maior desafio ao falar para muitas pessoas?",
    options: [
      { text: "Mostrar vulnerabilidade e emoÃ§Ã£o", value: 0 },
      { text: "NÃ£o se perder nas digressÃµes e manter o foco", value: 1 },
      { text: "Controlar a intensidade e nÃ£o dominar o espaÃ§o", value: 2 },
      { text: "Simplificar conceitos muito complexos", value: 3 },
      { text: "Conectar a visÃ£o abstrata com passos prÃ¡ticos", value: 4 },
    ],
  },
  {
    question: "Como vocÃª lida com o silÃªncio durante uma fala?",
    options: [
      { text: "Uso como uma pausa estratÃ©gica para impacto", value: 2 },
      { text: "Aproveito para observar a reaÃ§Ã£o do pÃºblico", value: 5 },
      { text: "Mantenho a serenidade e o equilÃ­brio", value: 6 },
      { text: "Respiro e controlo minha energia", value: 7 },
      { text: "Analiso se a mensagem foi compreendida", value: 0 },
    ],
  },
  {
    question: "O que vocÃª mais valoriza em um orador que admira?",
    options: [
      { text: "A clareza impecÃ¡vel da estrutura", value: 0 },
      { text: "A capacidade de inspirar mudanÃ§as reais", value: 4 },
      { text: "A precisÃ£o cirÃºrgica na escolha das palavras", value: 8 },
      { text: "A forma surpreendente de abordar o tema", value: 9 },
      { text: "A conexÃ£o genuÃ­na e humana com a plateia", value: 1 },
    ],
  },
  {
    question: "Como vocÃª quer que as pessoas se sintam apÃ³s te ouvirem?",
    options: [
      { text: "Bem informadas e com clareza total", value: 0 },
      { text: "Inspiradas e motivadas para a aÃ§Ã£o", value: 2 },
      { text: "Impressionadas com o nÃ­vel de expertise", value: 3 },
      { text: "Entusiasmadas e cheias de energia", value: 7 },
      { text: "Desafiadas por uma nova perspectiva", value: 4 },
    ],
  },
  {
    question: "Qual Ã© o seu ambiente ideal para se comunicar?",
    options: [
      { text: "Um auditÃ³rio grande para inspirar multidÃµes", value: 2 },
      { text: "Uma reuniÃ£o tÃ©cnica com especialistas", value: 3 },
      { text: "Um ambiente acolhedor e tranquilo", value: 6 },
      { text: "Uma sessÃ£o de brainstorming criativo", value: 9 },
      { text: "Um pequeno grupo onde me sinto seguro", value: 5 },
    ],
  },
  {
    question: "O que mais te motiva a falar em pÃºblico?",
    options: [
      { text: "A possibilidade de ensinar e compartilhar dados", value: 0 },
      { text: "O prazer de interagir e conhecer pessoas", value: 1 },
      { text: "A chance de apresentar um plano estratÃ©gico", value: 8 },
      { text: "O desafio de vencer meus prÃ³prios limites", value: 5 },
      { text: "O impacto de uma ideia transformadora", value: 4 },
    ],
  },
  {
    question: "Como vocÃª descreveria seu estilo de voz e gestos?",
    options: [
      { text: "Contidos, mas precisos e intencionais", value: 8 },
      { text: "Calmos, pausados e equilibrados", value: 6 },
      { text: "Expansivos, enÃ©rgicos e vibrantes", value: 7 },
      { text: "Naturais e informais", value: 1 },
      { text: "Focados em transmitir autoridade tÃ©cnica", value: 3 },
    ],
  },
];


const speakerTypes = [
  {
    name: "Orador AnalÃ­tico",
    icon: "ðŸ”�",
    description: "VocÃª Ã© metÃ³dico, estruturado e valoriza a clareza. Suas apresentaÃ§Ãµes sÃ£o bem organizadas e ricas em dados.",
    strengths: ["OrganizaÃ§Ã£o excepcional", "Clareza nas explicaÃ§Ãµes", "DomÃ­nio de dados e fatos", "Credibilidade e confiabilidade"],
    improvements: ["Conectar-se emocionalmente", "Usar mais storytelling", "Variar o tom de voz", "Incluir mais pausas dramÃ¡ticas"],
  },
  {
    name: "Orador Comunicador",
    icon: "ðŸ—£ï¸�",
    description: "VocÃª Ã© natural, espontÃ¢neo e se conecta facilmente com as pessoas. Sua comunicaÃ§Ã£o flui com autenticidade.",
    strengths: ["Naturalidade ao falar", "ConexÃ£o interpessoal", "Adaptabilidade ao pÃºblico", "Carisma e simpatia"],
    improvements: ["Estruturar melhor as ideias", "Aprofundar o conteÃºdo", "Controlar o tempo", "Evitar digressÃµes"],
  },
  {
    name: "Orador Inspirador",
    icon: "âœ¨",
    description: "VocÃª tem o dom de emocionar e inspirar. Suas palavras tocam o coraÃ§Ã£o e movem as pessoas Ã  aÃ§Ã£o.",
    strengths: ["Capacidade de emocionar", "PresenÃ§a magnÃ©tica", "Storytelling poderoso", "Energia contagiante"],
    improvements: ["Equilibrar emoÃ§Ã£o e razÃ£o", "Apresentar dados concretos", "Manter a objetividade", "Controlar a intensidade"],
  },
  {
    name: "Orador TÃ©cnico",
    icon: "âš™ï¸�",
    description: "VocÃª domina seu assunto com profundidade. Suas apresentaÃ§Ãµes sÃ£o ricas em conhecimento e expertise.",
    strengths: ["Profundo conhecimento", "Credibilidade tÃ©cnica", "PrecisÃ£o nas informaÃ§Ãµes", "DomÃ­nio do conteÃºdo"],
    improvements: ["Simplificar a linguagem", "Criar conexÃ£o emocional", "Usar mais exemplos prÃ¡ticos", "Tornar o conteÃºdo mais acessÃ­vel"],
  },
  {
    name: "Orador VisionÃ¡rio",
    icon: "ðŸš€",
    description: "VocÃª enxerga o futuro e sabe comunicar sua visÃ£o. Suas apresentaÃ§Ãµes abrem mentes e expandem horizontes.",
    strengths: ["VisÃ£o de futuro clara", "Capacidade de inspirar mudanÃ§as", "Pensamento inovador", "ComunicaÃ§Ã£o transformadora"],
    improvements: ["Ser mais prÃ¡tico e concreto", "Conectar visÃ£o com realidade", "Apresentar passos acionÃ¡veis", "Validar ideias com dados"],
  },
  {
    name: "Orador TÃ­mido",
    icon: "ðŸŒ±",
    description: "VocÃª tem muito a dizer, mas a timidez pode travar sua expressÃ£o. Seu potencial Ã© enorme quando se sente seguro.",
    strengths: ["ObservaÃ§Ã£o atenta", "PreparaÃ§Ã£o cuidadosa", "Autenticidade quando fala", "Profundidade nas ideias"],
    improvements: ["Desenvolver confianÃ§a gradual", "Praticar em ambientes seguros", "TÃ©cnicas de controle da ansiedade", "ExposiÃ§Ã£o progressiva"],
  },
  {
    name: "Orador Sereno",
    icon: "ðŸ§˜",
    description: "VocÃª transmite calma e equilÃ­brio. Sua serenidade Ã© sua marca, mas pode precisar de mais energia para impactar.",
    strengths: ["Transmite confianÃ§a e calma", "PonderaÃ§Ã£o nas palavras", "Estabilidade emocional", "Credibilidade natural"],
    improvements: ["Variar ritmo e energia", "Usar mais gestos expressivos", "Criar momentos de impacto", "Engajar o pÃºblico ativamente"],
  },
  {
    name: "Orador Entusiasmado",
    icon: "ðŸ”¥",
    description: "Sua energia Ã© contagiante e vocÃª ilumina qualquer ambiente. Seu entusiasmo Ã© sua maior forÃ§a.",
    strengths: ["Energia contagiante", "MotivaÃ§Ã£o natural", "PresenÃ§a marcante", "Capacidade de engajar"],
    improvements: ["Controlar a velocidade", "Usar mais pausas estratÃ©gicas", "Equilibrar energia e conteÃºdo", "Respirar entre as frases"],
  },
  {
    name: "Orador Estrategista",
    icon: "â™Ÿï¸�",
    description: "VocÃª pensa cada palavra com intenÃ§Ã£o. Sua comunicaÃ§Ã£o Ã© precisa, persuasiva e voltada para resultados.",
    strengths: ["ComunicaÃ§Ã£o precisa", "PersuasÃ£o estratÃ©gica", "Foco em resultados", "ArgumentaÃ§Ã£o sÃ³lida"],
    improvements: ["Ser mais vulnerÃ¡vel", "Mostrar lado humano", "Conectar-se emocionalmente", "Relaxar o controle"],
  },
  {
    name: "Orador Criativo",
    icon: "ðŸŽ¨",
    description: "VocÃª pensa fora da caixa e surpreende com suas ideias. Sua criatividade torna suas apresentaÃ§Ãµes Ãºnicas.",
    strengths: ["Originalidade nas ideias", "ApresentaÃ§Ãµes memorÃ¡veis", "Pensamento lateral", "Capacidade de surpreender"],
    improvements: ["Estruturar inÃ­cio, meio e fim", "Ser mais objetivo", "Conectar criatividade com clareza", "Manter foco no tema central"],
  },
];

const tips = {
  "orador-analitico": "Permita que o pÃºblico sinta o que vocÃª fala, nÃ£o apenas entenda. Pequenas pausas e variaÃ§Ã£o no tom podem transformar sua fala.",
  "orador-comunicador": "Aprenda a organizar seus pontos antes de falar â€” uma estrutura simples jÃ¡ faz vocÃª soar mais profissional.",
  "orador-inspirador": "Use pausas estratÃ©gicas. Elas amplificam o impacto das suas palavras.",
  "orador-tecnico": "Use exemplos simples, histÃ³rias curtas e perguntas diretas pro pÃºblico. Isso cria conexÃ£o instantÃ¢nea.",
  "orador-visionario": "Trabalhe o tom de voz e a cadÃªncia â€” isso mantÃ©m seu pÃºblico preso Ã  sua visÃ£o.",
  "orador-timido": "Treine em ambientes seguros e pequenos â€” confianÃ§a cresce com exposiÃ§Ã£o gradual.",
  "orador-sereno": "Brinque com o ritmo e gestos. A variaÃ§Ã£o gera emoÃ§Ã£o sem perder sua naturalidade.",
  "orador-entusiasmado": "Respire entre frases. Pausas sÃ£o suas melhores aliadas pra manter o impacto.",
  "orador-estrategista": "Experimente falar com mais vulnerabilidade â€” Ã© o toque humano que conecta.",
  "orador-criativo": "Use um mapa mental simples pra estruturar inÃ­cio, meio e fim antes de falar.",
};

const ctaTexts = {
  "orador-analitico": "Quer aprender a equilibrar razÃ£o e emoÃ§Ã£o na fala?",
  "orador-comunicador": "Quer dominar o equilÃ­brio entre naturalidade e tÃ©cnica?",
  "orador-inspirador": "Quer deixar sua fala mais envolvente e controlada?",
  "orador-tecnico": "Quer transformar conteÃºdo denso em comunicaÃ§Ã£o leve?",
  "orador-visionario": "Quer alinhar propÃ³sito e performance na fala?",
  "orador-timido": "Quer destravar sua fala de uma vez?",
  "orador-sereno": "Quer se destacar sem perder sua essÃªncia tranquila?",
  "orador-entusiasmado": "Quer canalizar sua energia pra causar impacto real?",
  "orador-estrategista": "Quer refinar sua performance de orador estratÃ©gico?",
  "orador-criativo": "Quer unir criatividade e clareza na fala?",
};

const typeUrls = [
  "orador-analitico", "orador-comunicador", "orador-inspirador",
  "orador-tecnico", "orador-visionario", "orador-timido",
  "orador-sereno", "orador-entusiasmado", "orador-estrategista", "orador-criativo",
];

// ===== QUIZ ENGINE =====
let currentQuestion = 0;
let answers = [];

function initQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  currentQuestion = 0;
  answers = [];
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  const q = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  container.innerHTML = `
    <div class="quiz-header fade-in">
      <p class="quiz-label">QuestÃ£o ${currentQuestion + 1} de ${quizData.length}</p>
      <div class="progress-bar"><div class="progress-fill" style="width: ${progress}%"></div></div>
    </div>
    <div class="slide-up">
      <h1 class="quiz-question">${q.question}</h1>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" onclick="handleAnswer(${opt.value})">${opt.text}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function handleAnswer(value) {
  answers.push(value);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    calculateResult();
  }
}

async function calculateResult() {
  console.log("Calculando resultado...");
  const counts = {};
  let maxCount = 0;
  let resultIndex = 0;

  answers.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] > maxCount) {
      maxCount = counts[val];
      resultIndex = val;
    }
  });

  const resultType = typeUrls[resultIndex];
  console.log("Resultado definido:", resultType);

  // Save result and update Google Sheets with the speaker type
  sessionStorage.setItem('quizResult', resultType);
  const leadData = JSON.parse(sessionStorage.getItem('leadData') || '{}');

  if (GOOGLE_SCRIPT_URL && leadData.email) {
    try {
      console.log("Enviando lead para o Planilhas...");
      // Using a small timeout to ensure we don't hang too long if the script is slow
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        signal: controller.signal,
        body: JSON.stringify({
          nome: leadData.nome,
          email: leadData.email,
          whatsapp: leadData.whatsapp,
          tipo: speakerTypes[resultIndex].name
        }),
      });
      clearTimeout(timeoutId);
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }
  }

  console.log("Redirecionando para o resultado...");
  window.location.href = `resultado.html?type=${resultType}`;
}

// ===== RESULT PAGE =====
function initResult() {
  const container = document.getElementById('result-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  let type = params.get('type');

  // Fallback to sessionStorage if URL param is missing
  if (!type) {
    type = sessionStorage.getItem('quizResult');
    console.log("Tipo recuperado do sessionStorage:", type);
  }

  const resultIndex = typeUrls.indexOf(type);

  if (resultIndex === -1) {
    console.error("Resultado nÃ£o encontrado para o tipo:", type);
    container.innerHTML = `
      <div class="result-hero"><div class="container">
        <h1 style="font-size:1.5rem;font-weight:700;color:#e5e5e5;margin-bottom:1rem;">Resultado nÃ£o encontrado</h1>
        <p style="color:#a3a3a3;margin-bottom:2rem;">NÃ£o conseguimos identificar seu perfil. Por favor, tente refazer o quiz.</p>
        <a href="quiz.html" class="btn btn-white" style="margin-top:1rem;">Fazer o Quiz</a>
      </div></div>`;
    return;
  }

  const result = speakerTypes[resultIndex];
  const leadData = JSON.parse(sessionStorage.getItem('leadData') || '{}');
  const firstName = leadData.nome ? leadData.nome.split(' ')[0] : '';

  container.innerHTML = `
    <section class="result-hero">
      <div class="container fade-in">
        <a href="quiz.html" class="result-back">â†� Voltar ao Quiz</a>
        <div class="result-icon">${result.icon}</div>
        <p class="result-label">${firstName ? firstName + ', seu' : 'Seu'} Tipo de Orador Ã©:</p>
        <h1 class="result-name">${result.name}</h1>
        <p class="result-desc">${result.description}</p>
      </div>
    </section>
    <section class="section-white">
      <div class="container result-details">
        <div class="result-columns">
          <div class="result-col slide-up">
            <h3><span style="color:#16a34a">âœ“</span> Suas ForÃ§as</h3>
            <ul>${result.strengths.map(s => `<li><span style="color:#22c55e;margin-top:2px">â€¢</span>${s}</li>`).join('')}</ul>
          </div>
          <div class="result-col slide-up" style="animation-delay: 0.2s">
            <h3><span style="color:#2563eb">â†’</span> Seus Desafios</h3>
            <ul>${result.improvements.map(s => `<li><span style="color:#3b82f6;margin-top:2px">â€¢</span>${s}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="result-tip slide-up" style="animation-delay: 0.4s">
          <p class="tip-label">ðŸ’¡ Dica de Melhoria</p>
          <p>${tips[type]}</p>
        </div>
        <div class="text-center slide-up" style="animation-delay: 0.6s">
          <p style="font-size:1.25rem;font-weight:700;color:#171717;margin-bottom:1.5rem">${ctaTexts[type]}</p>
          <a href="para-voce.html" class="btn btn-dark btn-cta">👉 Conhecer Treinamento Recomendado</a>
          <div style="margin-top:1.5rem">
            <a href="quiz.html" class="btn btn-outline">Refazer o Quiz</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ===== LEAD FORM =====
function initLeadForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (nome.length < 3) { alert('Nome deve ter pelo menos 3 caracteres'); return; } if (whatsapp.length < 8) { alert('Por favor, insira um número de WhatsApp válido'); return; }
    if (!email.includes('@')) { alert('Email invÃ¡lido'); return; }

    // Save lead data in session for later (quiz result page will use it)
    sessionStorage.setItem('leadData', JSON.stringify({ nome, email, whatsapp }));

    // Send to Google Sheets
    if (GOOGLE_SCRIPT_URL) {
      submitBtn.textContent = 'Salvando...';
      submitBtn.disabled = true;
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ nome, email, whatsapp }),
        });
      } catch (err) {
        console.error('Erro ao salvar lead:', err);
      } finally {
        submitBtn.textContent = '👉 Começar meu Quiz';
        submitBtn.disabled = false;
      }
    }

    window.location.href = 'quiz.html';
  });
}

function initApplicationForm() {
  const form = document.getElementById('application-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ ...data, tipo: 'Mentoria' }),
        });

        document.getElementById('application-form-card').style.display = 'none';
        document.getElementById('confirmation-msg').style.display = 'block';
        document.getElementById('confirmation-msg').scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      } catch (err) {
        console.error('Erro ao enviar candidatura:', err);
        alert('Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente mais tarde.');
      } finally {
        submitBtn.textContent = '👉 Enviar minha Candidatura';
        submitBtn.disabled = false;
      }
    } else {
      alert('Configuração de envio não encontrada. Por favor, cole a URL do Google Apps Script em js/main.js.');
      submitBtn.textContent = '👉 Enviar minha Candidatura';
      submitBtn.disabled = false;
    }
  });
}

// ===== COMPANY FORM =====
function initCompanyForm() {
  const form = document.getElementById('company-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Send to Google Sheets (using the same endpoint)
    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            ...data,
            tipo: 'Empresa' // Mark as company request
          }),
        });
        alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
      } catch (err) {
        console.error('Erro ao enviar solicitaÃ§Ã£o:', err);
        alert('Ocorreu um erro ao enviar sua solicitaÃ§Ã£o. Por favor, tente novamente mais tarde.');
      } finally {
        submitBtn.textContent = 'Enviar SolicitaÃ§Ã£o';
        submitBtn.disabled = false;
      }
    } else {
      alert('ConfiguraÃ§Ã£o de envio nÃ£o encontrada. Por favor, entre em contato via e-mail.');
      submitBtn.textContent = 'Enviar SolicitaÃ§Ã£o';
      submitBtn.disabled = false;
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initResult();
  initLeadForm();
  initCompanyForm();
  initApplicationForm();
});


