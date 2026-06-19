import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import profileImage from "@/assets/padrao.jpg";

const Methodology = () => {
  const pillars = [
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Clareza",
      description:
        "Estrutura simples e objetiva da fala. Aprenda a organizar suas ideias de forma lógica e compreensível, eliminando informações desnecessárias e focando no que realmente importa para seu público.",
      benefits: [
        "Mensagens diretas e impactantes",
        "Estruturação lógica de ideias",
        "Eliminação de ruídos na comunicação",
      ],
    },
    {
      icon: <Heart className="w-10 h-10 text-white" />,
      title: "Conexão",
      description:
        "Use emoção, ritmo e olhar pra prender atenção. A comunicação vai além das palavras — é sobre criar uma experiência que toca o coração e a mente do seu público.",
      benefits: [
        "Uso estratégico da emoção",
        "Controle de ritmo e pausas",
        "Linguagem corporal expressiva",
      ],
    },
    {
      icon: <Shield className="w-10 h-10 text-white" />,
      title: "Confiança",
      description:
        "Técnicas práticas pra lidar com o medo e dominar sua presença. Confiança não é algo que você tem ou não tem — é uma habilidade que se desenvolve com prática e técnica.",
      benefits: [
        "Controle da ansiedade",
        "Presença de palco poderosa",
        "Autocontrole em situações difíceis",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background text-center">
        <div className="container mx-auto px-4 max-w-3xl animate-fade-in">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">Metodologia</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Nossa Metodologia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A metodologia de oratória viva é baseada em três pilares fundamentais que transformam sua comunicação.
          </p>
        </div>
      </section>

      {/* Pillars — dark cards */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-secondary p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-accent mt-0.5">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About — white section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={profileImage}
                alt="Instrutor de Oratória"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
            <div>
              <p className="text-neutral-400 text-sm uppercase tracking-widest mb-4">Sobre</p>
              <h2 className="text-4xl font-bold mb-6 text-neutral-900 leading-tight">
                Sobre a Metodologia
              </h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Com anos de experiência em comunicação e oratória, desenvolvemos uma metodologia única que combina técnicas comprovadas com uma abordagem humanizada e personalizada.
              </p>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Nossa missão é ajudar cada pessoa a encontrar sua voz autêntica e se comunicar com confiança, clareza e impacto.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Acreditamos que todos têm o potencial de se tornar excelentes comunicadores — basta ter as ferramentas certas e o caminho adequado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — white */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-3">Como Funciona na Prática</h2>
            <p className="text-neutral-500">Nossa abordagem combina teoria e prática para resultados reais</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Diagnóstico Personalizado", text: "Começamos identificando seu perfil único de orador e seus desafios específicos através do nosso quiz detalhado." },
              { title: "Exercícios Práticos", text: "Aplicamos técnicas específicas com exercícios progressivos que você pode praticar imediatamente." },
              { title: "Feedback Constante", text: "Receba orientações claras sobre seu progresso e ajustes necessários em cada etapa do desenvolvimento." },
              { title: "Evolução Contínua", text: "Desenvolva suas habilidades de forma gradual e sustentável, com resultados visíveis desde o primeiro dia." },
            ].map((item, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-20 bg-background border-t border-border text-center">
        <div className="container mx-auto px-4 max-w-2xl animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">Pronto para Começar?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Descubra qual desses pilares você mais precisa fortalecer fazendo nosso quiz gratuito.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-neutral-900 hover:bg-white/90 text-base px-10 py-5 font-semibold shadow-lg"
          >
            <Link to="/quiz-inicio">Fazer o Quiz Gratuitamente</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Methodology;
