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
    question: "Qual é o seu objetivo principal ao iniciar uma fala?",
    options: [
      { text: "Organizar as ideias de forma lógica", value: 0 },
      { text: "Criar uma conexão imediata com o público", value: 1 },
      { text: "Passar credibilidade técnica e profundidade", value: 3 },
      { text: "Apresentar uma visão inovadora e transformadora", value: 4 },
      { text: "Transmitir calma e segurança para quem ouve", value: 6 },
    ],
  },
  {
    question: "Como você se prepara para uma apresentação importante?",
    options: [
      { text: "Analisando dados e estruturando cada detalhe", value: 0 },
      { text: "Pensando em histórias que possam emocionar", value: 2 },
      { text: "Focando na estratégia e nos resultados esperados", value: 8 },
      { text: "Buscando formas criativas e únicas de apresentar", value: 9 },
      { text: "Praticando para vencer a timidez e o nervosismo", value: 5 },
    ],
  },
  {
    question: "Qual dessas características você considera sua maior força?",
    options: [
      { text: "Espontaneidade e carisma natural", value: 1 },
      { text: "Profundo domínio técnico do assunto", value: 3 },
      { text: "Energia contagiante que ilumina o ambiente", value: 7 },
      { text: "Argumentação sólida e persuasiva", value: 8 },
      { text: "Originalidade e pensamento lateral", value: 9 },
    ],
  },
  {
    question: "Qual é o seu maior desafio ao falar para muitas pessoas?",
    options: [
      { text: "Mostrar vulnerabilidade e emoção", value: 0 },
      { text: "Não se perder nas digressões e manter o foco", value: 1 },
      { text: "Controlar a intensidade e não dominar o espaço", value: 2 },
      { text: "Simplificar conceitos muito complexos", value: 3 },
      { text: "Conectar a visão abstrata com passos práticos", value: 4 },
    ],
  },
  {
    question: "Como você lida com o silêncio durante uma fala?",
    options: [
      { text: "Uso como uma pausa estratégica para impacto", value: 2 },
      { text: "Aproveito para observar a reação do público", value: 5 },
      { text: "Mantenho a serenidade e o equilíbrio", value: 6 },
      { text: "Respiro e controlo minha energia", value: 7 },
      { text: "Analiso se a mensagem foi compreendida", value: 0 },
    ],
  },
  {
    question: "O que você mais valoriza em um orador que admira?",
    options: [
      { text: "A clareza impecável da estrutura", value: 0 },
      { text: "A capacidade de inspirar mudanças reais", value: 4 },
      { text: "A precisão cirúrgica na escolha das palavras", value: 8 },
      { text: "A forma surpreendente de abordar o tema", value: 9 },
      { text: "A conexão genuína e humana com a plateia", value: 1 },
    ],
  },
  {
    question: "Como você quer que as pessoas se sintam após te ouvirem?",
    options: [
      { text: "Bem informadas e com clareza total", value: 0 },
      { text: "Inspiradas e motivadas para a ação", value: 2 },
      { text: "Impressionadas com o nível de expertise", value: 3 },
      { text: "Entusiasmadas e cheias de energia", value: 7 },
      { text: "Desafiadas por uma nova perspectiva", value: 4 },
    ],
  },
  {
    question: "Qual é o seu ambiente ideal para se comunicar?",
    options: [
      { text: "Um auditório grande para inspirar multidões", value: 2 },
      { text: "Uma reunião técnica com especialistas", value: 3 },
      { text: "Um ambiente acolhedor e tranquilo", value: 6 },
      { text: "Uma sessão de brainstorming criativo", value: 9 },
      { text: "Um pequeno grupo onde me sinto seguro", value: 5 },
    ],
  },
  {
    question: "O que mais te motiva a falar em público?",
    options: [
      { text: "A possibilidade de ensinar e compartilhar dados", value: 0 },
      { text: "O prazer de interagir e conhecer pessoas", value: 1 },
      { text: "A chance de apresentar um plano estratégico", value: 8 },
      { text: "O desafio de vencer meus próprios limites", value: 5 },
      { text: "O impacto de uma ideia transformadora", value: 4 },
    ],
  },
  {
    question: "Como você descreveria seu estilo de voz e gestos?",
    options: [
      { text: "Contidos, mas precisos e intencionais", value: 8 },
      { text: "Calmos, pausados e equilibrados", value: 6 },
      { text: "Expansivos, enérgicos e vibrantes", value: 7 },
      { text: "Naturais e informais", value: 1 },
      { text: "Focados em transmitir autoridade técnica", value: 3 },
    ],
  },
];


const speakerTypes = [
  {
    name: "Orador Analítico",
    icon: "📊",
    description: "Você é metódico, estruturado e valoriza a clareza. Suas apresentações são bem organizadas e ricas em dados.",
    strengths: ["Organização excepcional", "Clareza nas explicações", "Domínio de dados e fatos", "Credibilidade e confiabilidade"],
    improvements: ["Conectar-se emocionalmente", "Usar mais storytelling", "Variar o tom de voz", "Incluir mais pausas dramáticas"],
  },
  {
    name: "Orador Comunicador",
    icon: "🗣️",
    description: "Você é natural, espontâneo e se conecta facilmente com as pessoas. Sua comunicação flui com autenticidade.",
    strengths: ["Naturalidade ao falar", "Conexão interpessoal", "Adaptabilidade ao público", "Carisma e simpatia"],
    improvements: ["Estruturar melhor as ideias", "Aprofundar o conteúdo", "Controlar o tempo", "Evitar digressões"],
  },
  {
    name: "Orador Inspirador",
    icon: "✨",
    description: "Você tem o dom de emocionar e inspirar. Suas palavras tocam o coração e movem as pessoas à ação.",
    strengths: ["Capacidade de emocionar", "Presença magnética", "Storytelling poderoso", "Energia contagiante"],
    improvements: ["Equilibrar emoção e razão", "Apresentar dados concretos", "Manter a objetividade", "Controlar a intensidade"],
  },
  {
    name: "Orador Técnico",
    icon: "⚙️",
    description: "Você domina seu assunto com profundidade. Suas apresentações são ricas em conhecimento e expertise.",
    strengths: ["Profundo conhecimento", "Credibilidade técnica", "Precisão nas informações", "Domínio do conteúdo"],
    improvements: ["Simplificar a linguagem", "Criar conexão emocional", "Usar mais exemplos práticos", "Tornar o conteúdo mais acessível"],
  },
  {
    name: "Orador Visionário",
    icon: "🚀",
    description: "Você enxerga o futuro e sabe comunicar sua visão. Suas apresentações abrem mentes e expandem horizontes.",
    strengths: ["Visão de futuro clara", "Capacidade de inspirar mudanças", "Pensamento inovador", "Comunicação transformadora"],
    improvements: ["Ser mais prático e concreto", "Conectar visão com realidade", "Apresentar passos acionáveis", "Validar ideias com dados"],
  },
  {
    name: "Orador Tímido",
    icon: "🌱",
    description: "Você tem muito a dizer, mas a timidez pode travar sua expressão. Seu potencial é enorme quando se sente seguro.",
    strengths: ["Observação atenta", "Preparação cuidadosa", "Autenticidade quando fala", "Profundidade nas ideias"],
    improvements: ["Desenvolver confiança gradual", "Praticar em ambientes seguros", "Técnicas de controle da ansiedade", "Exposição progressiva"],
  },
  {
    name: "Orador Sereno",
    icon: "🧘",
    description: "Você transmite calma e equilíbrio. Sua serenidade é sua marca, mas pode precisar de mais energia para impactar.",
    strengths: ["Transmite confiança e calma", "Ponderação nas palavras", "Estabilidade emocional", "Credibilidade natural"],
    improvements: ["Variar ritmo e energia", "Usar mais gestos expressivos", "Criar momentos de impacto", "Engajar o público ativamente"],
  },
  {
    name: "Orador Entusiasmado",
    icon: "🔥",
    description: "Sua energia é contagiante e você ilumina qualquer ambiente. Seu entusiasmo é sua maior força.",
    strengths: ["Energia contagiante", "Motivação natural", "Presença marcante", "Capacidade de engajar"],
    improvements: ["Controlar a velocidade", "Usar mais pausas estratégicas", "Equilibrar energia e conteúdo", "Respirar entre as frases"],
  },
  {
    name: "Orador Estrategista",
    icon: "♟️",
    description: "Você pensa cada palavra com intenção. Sua comunicação é precisa, persuasiva e voltada para resultados.",
    strengths: ["Comunicação precisa", "Persuasão estratégica", "Foco em resultados", "Argumentação sólida"],
    improvements: ["Ser mais vulnerável", "Mostrar lado humano", "Conectar-se emocionalmente", "Relaxar o controle"],
  },
  {
    name: "Orador Criativo",
    icon: "🎨",
    description: "Você pensa fora da caixa e surpreende com suas ideias. Sua criatividade torna suas apresentações únicas.",
    strengths: ["Originalidade nas ideias", "Apresentações memoráveis", "Pensamento lateral", "Capacidade de surpreender"],
    improvements: ["Estruturar início, meio e fim", "Ser mais objetivo", "Conectar criatividade com clareza", "Manter foco no tema central"],
  },
];

const tips = {
  "orador-analitico": "Permita que o público sinta o que você fala, não apenas entenda. Pequenas pausas e variação no tom podem transformar sua fala.",
  "orador-comunicador": "Aprenda a organizar seus pontos antes de falar – uma estrutura simples já faz você soar mais profissional.",
  "orador-inspirador": "Use pausas estratégicas. Elas amplificam o impacto das suas palavras.",
  "orador-tecnico": "Use exemplos simples, histórias curtas e perguntas diretas pro público. Isso cria conexão instantânea.",
  "orador-visionario": "Trabalhe o tom de voz e a cadência – isso mantém seu público preso à sua visão.",
  "orador-timido": "Treine em ambientes seguros e pequenos – confiança cresce com exposição gradual.",
  "orador-sereno": "Brinque com o ritmo e gestos. A variação gera emoção sem perder sua naturalidade.",
  "orador-entusiasmado": "Respire entre frases. Pausas são suas melhores aliadas pra manter o impacto.",
  "orador-estrategista": "Experimente falar com mais vulnerabilidade – é o toque humano que conecta.",
  "orador-criativo": "Use um mapa mental simples pra estruturar início, meio e fim antes de falar.",
};

const ctaTexts = {
  "orador-analitico": "Quer aprender a equilibrar razão e emoção na fala?",
  "orador-comunicador": "Quer dominar o equilíbrio entre naturalidade e técnica?",
  "orador-inspirador": "Quer deixar sua fala mais envolvente e controlada?",
  "orador-tecnico": "Quer transformar conteúdo denso em comunicação leve?",
  "orador-visionario": "Quer alinhar propósito e performance na fala?",
  "orador-timido": "Quer destravar sua fala de uma vez?",
  "orador-sereno": "Quer se destacar sem perder sua essência tranquila?",
  "orador-entusiasmado": "Quer canalizar sua energia pra causar impacto real?",
  "orador-estrategista": "Quer refinar sua performance de orador estratégico?",
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
      <p class="quiz-label">Questão ${currentQuestion + 1} de ${quizData.length}</p>
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
    console.error("Resultado não encontrado para o tipo:", type);
    container.innerHTML = `
      <div class="result-hero"><div class="container">
        <h1 style="font-size:1.5rem;font-weight:700;color:#e5e5e5;margin-bottom:1rem;">Resultado não encontrado</h1>
        <p style="color:#a3a3a3;margin-bottom:2rem;">Não conseguimos identificar seu perfil. Por favor, tente refazer o quiz.</p>
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
        <a href="quiz.html" class="result-back">← Voltar ao Quiz</a>
        <div class="result-icon">${result.icon}</div>
        <p class="result-label">${firstName ? firstName + ', seu' : 'Seu'} Tipo de Orador é:</p>
        <h1 class="result-name">${result.name}</h1>
        <p class="result-desc">${result.description}</p>
      </div>
    </section>
    <section class="section-white">
      <div class="container result-details">
        <div class="result-columns">
          <div class="result-col slide-up">
            <h3><span style="color:#16a34a">✓</span> Suas Forças</h3>
            <ul>${result.strengths.map(s => `<li><span style="color:#22c55e;margin-top:2px">•</span>${s}</li>`).join('')}</ul>
          </div>
          <div class="result-col slide-up" style="animation-delay: 0.2s">
            <h3><span style="color:#2563eb">↑</span> Seus Desafios</h3>
            <ul>${result.improvements.map(s => `<li><span style="color:#3b82f6;margin-top:2px">•</span>${s}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="result-tip slide-up" style="animation-delay: 0.4s">
          <p class="tip-label">💡 Dica de Melhoria</p>
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
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            ...data,
            tipo: 'Empresa' // Mark as company request
          }),
        });

        const text = await res.text();
        let json = null;
        try { json = JSON.parse(text); } catch (err) { json = { raw: text }; }
        console.log('Company form response:', res.status, json);

        const sheetName = (json && json.sheet) ? json.sheet : null;
        if (sheetName) {
          alert('Sua solicitação foi enviada com sucesso! (gravado na aba: ' + sheetName + ')');
        } else {
          alert('Sua solicitação foi enviada com sucesso!');
        }
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


