import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/evento.jpg";
import { Mic, Target, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section — dark fullscreen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Orador profissional em palco"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Descubra seu tipo<br />de Orador
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/80 font-light max-w-2xl mx-auto">
              Em menos de 2 minutos, descubra seus pontos fortes e o que está travando sua fala.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-neutral-900 hover:bg-white/90 text-base px-8 py-5 font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Link to="/quiz-inicio">Fazer o Quiz Gratuitamente</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Section — white */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <blockquote className="text-3xl md:text-4xl font-bold text-neutral-900 leading-snug mb-6">
            "Ninguém nasce sabendo falar, logo ninguém nasce sabendo falar em público."
          </blockquote>
          <p className="text-neutral-500 font-medium text-lg">— Rafael de Jesus</p>
        </div>
      </section>

      {/* Impact Pillars — dark */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Mic className="w-7 h-7 text-white" />, text: "A fala é sua ferramenta mais poderosa." },
              { icon: <Target className="w-7 h-7 text-white" />, text: "Confiança é uma habilidade, e pode ser treinada." },
              { icon: <Users className="w-7 h-7 text-white" />, text: "Transforme sua presença, inspire pessoas." },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl border border-border bg-secondary animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-5">
                  {item.icon}
                </div>
                <p className="text-lg font-medium text-foreground leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — white */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Pronto para Descobrir<br />Seu Potencial?
          </h2>
          <p className="text-lg text-neutral-500 mb-10 max-w-xl mx-auto">
            Milhares de pessoas já descobriram seu tipo de orador e transformaram sua comunicação.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-neutral-900 hover:bg-neutral-700 text-white text-base px-10 py-5 font-semibold shadow-lg"
          >
            <Link to="/quiz-inicio">Começar Agora</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
