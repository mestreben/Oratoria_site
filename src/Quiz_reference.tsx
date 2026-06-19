import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { quizData } from "@/data/quizData";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    // Frequency-based calculation: find the type that appears most often
    const counts: { [key: number]: number } = {};
    let maxCount = 0;
    let resultIndex = 0;

    finalAnswers.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
      if (counts[val] > maxCount) {
        maxCount = counts[val];
        resultIndex = val;
      }
    });

    const typeUrls = [
      "orador-analitico",
      "orador-comunicador",
      "orador-inspirador",
      "orador-tecnico",
      "orador-visionario",
      "orador-timido",
      "orador-sereno",
      "orador-entusiasmado",
      "orador-estrategista",
      "orador-criativo",
    ];

    navigate(`/resultado/${typeUrls[resultIndex]}`);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center animate-fade-in">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
              Questão {currentQuestion + 1} de {quizData.length}
            </p>
            <Progress value={progress} className="h-1 bg-border [&>div]:bg-white mt-3" />
          </div>

          {/* Question card */}
          <div className="animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 leading-snug">
              {quizData[currentQuestion].question}
            </h1>

            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left px-6 py-5 rounded-2xl border border-border bg-secondary text-foreground font-medium text-base transition-all hover:border-white/60 hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
