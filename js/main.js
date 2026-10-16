// ===== GOOGLE SHEETS CONFIG =====
// Cole aqui a URL do seu Google Apps Script (veja google-apps-script.js para instruções)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6sOl3UNbgsZYcQfWBN_5UpPiev5cVs90dFCdeBF7KueUuWu7gHWhcreREAQ_aeuP2/exec"; // <-- COLE SUA URL AQUI

// ===== LINKS =====
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/oratoriacomrafa/",
  tiktok: "https://www.tiktok.com/@oratoriacomrafa",
};
const COURSE_URL = "https://pay.hotmart.com/C104175997E";

// ===== FOOTER (único para todas as páginas) =====
// Cada página tem só <footer class="footer" id="site-footer"></footer>; o conteúdo vem daqui.
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <p class="footer-brand">Oratória com Rafa</p>
        <div class="footer-socials">
          <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram do Oratória com Rafa">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="${SOCIAL_LINKS.tiktok}" target="_blank" rel="noopener" aria-label="TikTok do Oratória com Rafa">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          </a>
        </div>
        <p class="footer-copy">© ${new Date().getFullYear()} Oratória com Rafa. Todos os direitos reservados.</p>
      </div>
    </div>`;
}
// main.js é carregado no fim do <body>, então o rodapé já existe aqui
renderFooter();

// ===== META PIXEL EVENTS =====
// trackPixel() vem de js/pixel.js; se o pixel estiver desligado, não faz nada.
function pixel(event, params) {
  if (typeof trackPixel === 'function') trackPixel(event, params);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="pay.hotmart.com"]');
  if (link) pixel('InitiateCheckout', { content_name: 'Curso Falar em Público', value: 98, currency: 'BRL' });
});

// ===== MOBILE NAV TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.pixelView) pixel('ViewContent', { content_name: document.body.dataset.pixelView });

  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
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

// Próximo passo recomendado para cada tipo: o curso de R$ 98 ou a mentoria individual
const recommendations = {
  "orador-analitico": { product: "mentoria", why: "Seu conteúdo já é sólido. O que falta é conexão emocional, e isso se ajusta com feedback ao vivo sobre tom, pausas e presença. É exatamente o que trabalhamos na mentoria." },
  "orador-comunicador": { product: "curso", why: "Naturalidade você já tem. O curso te dá uma estrutura simples para organizar as ideias em 5 minutos, sem perder a espontaneidade." },
  "orador-inspirador": { product: "curso", why: "Sua emoção já move as pessoas. Com uma estrutura clara, você equilibra emoção e objetividade e mantém o controle da fala." },
  "orador-tecnico": { product: "mentoria", why: "Transformar conteúdo denso em algo simples exige ajustes no seu material real. Na mentoria a gente trabalha nas suas apresentações, com feedback direto." },
  "orador-visionario": { product: "curso", why: "Você tem a visão; falta transformá-la em passos concretos. O método do curso te ajuda a estruturar a fala do conceito até a ação." },
  "orador-timido": { product: "mentoria", why: "Confiança cresce com prática num ambiente seguro. Na mentoria você treina comigo, no seu ritmo, com exposição gradual e feedback individual." },
  "orador-sereno": { product: "mentoria", why: "Sua calma é um ativo. Para ganhar energia e variação sem perder a essência, o caminho é praticar com feedback ao vivo sobre ritmo e gestos." },
  "orador-entusiasmado": { product: "curso", why: "Energia você tem de sobra. Uma estrutura clara ajuda a canalizar essa energia no que importa e a usar as pausas a seu favor." },
  "orador-estrategista": { product: "mentoria", why: "Você já fala com precisão. Para refinar a performance e mostrar o lado humano, nada substitui o acompanhamento individual com feedback real." },
  "orador-criativo": { product: "curso", why: "Suas ideias são originais. O curso te dá um roteiro de início, meio e fim para que a criatividade chegue com clareza." },
};

// ===== HELPERS =====
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function readSession(key, fallback) {
  try { return JSON.parse(sessionStorage.getItem(key)) || fallback; } catch (err) { return fallback; }
}

function writeSession(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* modo privado: segue sem salvar */ }
}

// Envia para o Google Sheets. O envio nunca é cancelado: com `keepalive` ele termina
// mesmo se a página mudar. `maxWaitMs` só limita quanto tempo o visitante espera.
async function postToSheets(payload, maxWaitMs) {
  if (!GOOGLE_SCRIPT_URL) return null;
  const request = fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'cors',
    keepalive: true,
    body: JSON.stringify(payload),
  });
  if (!maxWaitMs) return request;
  const timeout = new Promise(resolve => setTimeout(() => resolve(null), maxWaitMs));
  return Promise.race([request, timeout]);
}

// ===== QUIZ ENGINE =====
// Fluxo: perguntas -> "Seu resultado está pronto" (nome + e-mail) -> resultado.html
// As respostas ficam no sessionStorage ('quizProgress') para não se perderem se a página recarregar.
let currentQuestion = 0;
let answers = [];

function saveProgress() {
  writeSession('quizProgress', { currentQuestion, answers });
}

function initQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  const saved = readSession('quizProgress', null);
  if (saved && Array.isArray(saved.answers) && saved.answers.length > 0) {
    answers = saved.answers.slice(0, quizData.length);
    currentQuestion = Math.min(answers.length, quizData.length - 1);
  } else {
    currentQuestion = 0;
    answers = [];
  }
  if (answers.length === quizData.length) {
    renderLeadStep();
  } else {
    renderQuestion();
  }
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
        ${q.options.map(opt => `
          <button type="button" class="quiz-option" onclick="handleAnswer(${opt.value})">${opt.text}</button>
        `).join('')}
      </div>
      ${currentQuestion > 0 ? '<button type="button" class="quiz-back" onclick="previousQuestion()">← Voltar</button>' : ''}
    </div>
  `;
}

function handleAnswer(value) {
  answers[currentQuestion] = value;
  answers = answers.slice(0, currentQuestion + 1);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    saveProgress();
    renderQuestion();
  } else {
    saveProgress();
    renderLeadStep();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function previousQuestion() {
  if (currentQuestion === 0) return;
  currentQuestion--;
  answers = answers.slice(0, currentQuestion);
  saveProgress();
  renderQuestion();
}

function calculateResultIndex() {
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
  return resultIndex;
}

// Tela final do quiz: pede nome e e-mail (WhatsApp opcional) para liberar o resultado
function renderLeadStep() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  const lead = readSession('leadData', {});

  container.innerHTML = `
    <div class="lead-header fade-in">
      <p class="quiz-label">Quiz concluído ✓</p>
      <h1>Seu resultado está pronto! 🎉</h1>
      <p>Deixe seu nome e e-mail para liberar o resultado completo, com suas forças, seus desafios e uma dica prática pro seu perfil.</p>
    </div>
    <div class="lead-form-card quiz-lead-form">
      <form id="quiz-lead-form" novalidate>
        <div class="form-group">
          <label for="nome">Nome</label>
          <div class="form-input-wrap">
            <span class="input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            <input type="text" id="nome" name="nome" class="form-input" placeholder="Como posso te chamar?" autocomplete="name" required value="${escapeHtml(lead.nome || '')}" />
          </div>
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <div class="form-input-wrap">
            <span class="input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
            <input type="email" id="email" name="email" class="form-input" placeholder="seu@email.com" autocomplete="email" required value="${escapeHtml(lead.email || '')}" />
          </div>
        </div>
        <div class="form-group">
          <label for="whatsapp">WhatsApp <span class="label-optional">(opcional)</span></label>
          <div class="form-input-wrap">
            <span class="input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <input type="tel" id="whatsapp" name="whatsapp" class="form-input" placeholder="(11) 99999-9999" autocomplete="tel" value="${escapeHtml(lead.whatsapp || '')}" />
          </div>
          <p class="form-hint">Usado apenas para enviar conteúdo sobre oratória. Nada de spam!</p>
        </div>
        <p class="form-error" id="lead-error" role="alert" hidden></p>
        <button type="submit" class="btn btn-white btn-submit">👉 Ver meu resultado</button>
        <div class="form-privacy">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <p>Suas informações são 100% confidenciais.</p>
        </div>
      </form>
    </div>
    <button type="button" class="quiz-back" onclick="previousQuestion()">← Voltar à última pergunta</button>
  `;

  document.getElementById('quiz-lead-form').addEventListener('submit', submitQuizLead);
}

async function submitQuizLead(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const whatsapp = form.whatsapp.value.trim();
  const errorEl = document.getElementById('lead-error');
  const submitBtn = form.querySelector('button[type="submit"]');

  let error = '';
  if (nome.length < 2) error = 'Digite seu nome.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = 'Digite um e-mail válido.';
  else if (whatsapp && whatsapp.replace(/\D/g, '').length < 10) error = 'Confira o WhatsApp com DDD, ou deixe em branco.';
  if (error) {
    errorEl.textContent = error;
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;

  const resultIndex = calculateResultIndex();
  const resultType = typeUrls[resultIndex];
  writeSession('leadData', { nome, email, whatsapp });
  sessionStorage.setItem('quizResult', resultType);

  pixel('Lead', { content_name: 'Quiz Tipo de Orador', content_category: speakerTypes[resultIndex].name });

  submitBtn.textContent = 'Preparando seu resultado...';
  submitBtn.disabled = true;
  try {
    // Mesmo destino de antes: aba "Leads" da planilha, agora já com o tipo de orador
    await postToSheets({ nome, email, whatsapp, tipo: speakerTypes[resultIndex].name }, 8000);
  } catch (err) {
    console.error('Erro ao salvar lead:', err);
  }

  sessionStorage.removeItem('quizProgress');
  window.location.href = `resultado.html?type=${resultType}`;
}

// ===== RESULT PAGE =====
function renderRecommendation(type) {
  const reco = recommendations[type];
  if (!reco) return '';
  if (reco.product === 'curso') {
    return `
      <div class="result-reco slide-up" style="animation-delay: 0.5s">
        <p class="tip-label">🎯 Seu próximo passo</p>
        <h3>Curso Falar em Público: Como Construir uma Fala em 5 Minutos</h3>
        <p>${reco.why}</p>
        <a href="${COURSE_URL}" target="_blank" rel="noopener" class="btn btn-dark btn-cta">👉 Quero o curso por R$ 98</a>
        <p class="result-reco-alt">Prefere acompanhamento individual? <a href="mentoria.html">Conheça a mentoria</a></p>
      </div>`;
  }
  return `
    <div class="result-reco slide-up" style="animation-delay: 0.5s">
      <p class="tip-label">🎯 Seu próximo passo</p>
      <h3>Mentoria Individual</h3>
      <p>${reco.why}</p>
      <a href="mentoria.html" class="btn btn-dark btn-cta">👉 Quero me candidatar</a>
      <p class="result-reco-alt">Prefere começar no seu ritmo? <a href="${COURSE_URL}" target="_blank" rel="noopener">Conheça o curso de R$ 98</a></p>
    </div>`;
}

function initResult() {
  const container = document.getElementById('result-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  let type = params.get('type');

  // Fallback to sessionStorage if URL param is missing
  if (!type) type = sessionStorage.getItem('quizResult');

  const resultIndex = typeUrls.indexOf(type);

  if (resultIndex === -1) {
    container.innerHTML = `
      <div class="result-hero"><div class="container">
        <h1 style="font-size:1.5rem;font-weight:700;color:#e5e5e5;margin-bottom:1rem;">Resultado não encontrado</h1>
        <p style="color:#a3a3a3;margin-bottom:2rem;">Não conseguimos identificar seu perfil. Por favor, tente refazer o quiz.</p>
        <a href="quiz.html" class="btn btn-white" style="margin-top:1rem;">Fazer o Quiz</a>
      </div></div>`;
    return;
  }

  const result = speakerTypes[resultIndex];
  const leadData = readSession('leadData', {});
  const firstName = leadData.nome ? escapeHtml(leadData.nome.split(' ')[0]) : '';

  container.innerHTML = `
    <section class="result-hero">
      <div class="container fade-in">
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
        <div class="text-center">
          <p class="result-cta-question">${ctaTexts[type]}</p>
        </div>
        ${renderRecommendation(type)}
        <div class="text-center" style="margin-top:2rem">
          <a href="quiz.html" class="btn btn-outline">Refazer o Quiz</a>
        </div>
      </div>
    </section>
  `;
}

// ===== MENTORIA FORM =====
function initApplicationForm() {
  const form = document.getElementById('application-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    const data = Object.fromEntries(new FormData(form).entries());

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      // 'disponibilidade' repete o investimento para a versão antiga do Apps Script continuar gravando
      const res = await postToSheets({ ...data, disponibilidade: data.investimento, tipo: 'Mentoria' });
      if (!res || !res.ok) throw new Error('Resposta inválida do servidor');

      pixel('Contact', { content_name: 'Mentoria' });
      // A confirmação só aparece depois que o envio deu certo
      document.getElementById('application-form-card').hidden = true;
      const msg = document.getElementById('confirmation-msg');
      msg.hidden = false;
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
    } catch (err) {
      console.error('Erro ao enviar candidatura:', err);
      alert('Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente em alguns minutos.');
    } finally {
      submitBtn.textContent = originalLabel;
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
    const originalLabel = submitBtn.textContent;
    const data = Object.fromEntries(new FormData(form).entries());

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      const res = await postToSheets({ ...data, tipo: 'Empresa' });
      if (!res || !res.ok) throw new Error('Resposta inválida do servidor');

      pixel('Contact', { content_name: 'Empresas' });
      alert('Sua solicitação foi enviada com sucesso! Retorno em até 24 horas.');
      form.reset();
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.');
    } finally {
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initResult();
  initCompanyForm();
  initApplicationForm();
});
