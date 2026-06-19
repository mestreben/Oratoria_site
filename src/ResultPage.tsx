import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { speakerTypes } from "@/data/quizData";
import { ArrowLeft } from "lucide-react";

const ResultPage = () => {
  const { type: urlType } = useParams<{ type: string }>();
  const [type, setType] = useState<string | null>(urlType || null);

  useEffect(() => {
    if (!type) {
      const savedType = sessionStorage.getItem('quizResult');
      if (savedType) setType(savedType);
    }
  }, [type]);

  const typeMap: { [key: string]: number } = {
    "orador-analitico": 0,
    "orador-comunicador": 1,
    "orador-inspirador": 2,
    "orador-tecnico": 3,
    "orador-visionario": 4,
    "orador-timido": 5,
    "orador-sereno": 6,
    "orador-entusiasmado": 7,
    "orador-estrategista": 8,
    "orador-criativo": 9,
  };

  const resultIndex = typeMap[type || ""];
  const result = speakerTypes[resultIndex];

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Resultado não encontrado</h1>
            <Button asChild className="rounded-full">
              <Link to="/quiz">Fazer o Quiz</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tips: { [key: string]: string } = {
    "orador-analitico": "Permita que o público sinta o que você fala, não apenas entenda. Pequenas pausas e variação no tom podem transformar sua fala.",
    "orador-comunicador": "Aprenda a organizar seus pontos antes de falar — uma estrutura simples já faz você soar mais profissional.",
    "orador-inspirador": "Use pausas estratégicas. Elas amplificam o impacto das suas palavras.",
    "orador-tecnico": "Use exemplos simples, histórias curtas e perguntas diretas pro público. Isso cria conexão instantânea.",
    "orador-visionario": "Trabalhe o tom de voz e a cadência — isso mantém seu público preso à sua visão.",
    "orador-timido": "Treine em ambientes seguros e pequenos — confiança cresce com exposição gradual.",
    "orador-sereno": "Brinque com o ritmo e gestos. A variação gera emoção sem perder sua naturalidade.",
    "orador-entusiasmado": "Respire entre frases. Pausas são suas melhores aliadas pra manter o impacto.",
    "orador-estrategista": "Experimente falar com mais vulnerabilidade — é o toque humano que conecta.",
    "orador-criativo": "Use um mapa mental simples pra estruturar início, meio e fim antes de falar.",
  };

  const ctaTexts: { [key: string]: string } = {
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Result hero — dark */}
      <section className="pt-36 pb-16 bg-background text-center">
        <div className="container mx-auto px-4 max-w-2xl animate-fade-in">
          <Link
            to="/quiz"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Quiz
          </Link>

          <div className="text-7xl mb-6">{result.icon}</div>
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Seu Tipo de Orador</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">{result.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{result.description}</p>
        </div>
      </section>

      {/* Details — white */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-5 text-neutral-900 flex items-center gap-2">
                <span className="text-green-600">✓</span> Suas Forças
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="text-neutral-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-5 text-neutral-900 flex items-center gap-2">
                <span className="text-blue-600">→</span> Seus Desafios
              </h3>
              <ul className="space-y-3">
                {result.improvements.map((improvement, index) => (
                  <li key={index} className="text-neutral-700 flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tip */}
          <div className="border-l-4 border-neutral-900 pl-6 py-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">💡 Dica de Melhoria</p>
            <p className="text-neutral-800 text-lg leading-relaxed">{tips[type || ""]}</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl font-bold text-neutral-900 mb-6">{ctaTexts[type || ""]}</p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-neutral-900 hover:bg-neutral-700 text-white text-base px-10 py-5 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-4"
            >
              <Link to="/cursos">👉 Baixar Kit de Emergência da Oratória</Link>
            </Button>

            <div className="mt-6">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                <Link to="/quiz">Refazer o Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResultPage;
