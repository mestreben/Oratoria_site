import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Phone, Lock, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const leadSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  whatsapp: z.string().trim().max(20, "Telefone muito longo").optional().or(z.literal("")),
});

type LeadFormData = z.infer<typeof leadSchema>;

const LeadCapture = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    nome: "",
    email: "",
    whatsapp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = leadSchema.parse(formData);

      const { error: dbError } = await supabase
        .from("leads")
        .insert([{
          nome: validatedData.nome,
          email: validatedData.email,
          whatsapp: validatedData.whatsapp || null,
        }]);

      if (dbError) {
        console.error("Erro ao salvar lead:", dbError);
        throw new Error("Erro ao salvar suas informações. Tente novamente.");
      }

      const { error: emailError } = await supabase.functions.invoke("send-lead-email", {
        body: {
          nome: validatedData.nome,
          email: validatedData.email,
        },
      });

      if (emailError) {
        console.error("Erro ao enviar email:", emailError);
      }

      toast({
        title: "Ótimo! Vamos começar! 🎉",
        description: "Suas informações foram salvas. Agora vamos descobrir seu tipo de orador!",
      });

      navigate("/quiz");
    } catch (error) {
      console.error("Erro no formulário:", error);

      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: firstError.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error instanceof Error ? error.message : "Algo deu errado. Tente novamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LeadFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-lg animate-fade-in">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-5">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              ✨ Antes de começar, me conta um pouquinho sobre você?
            </h1>
            <p className="text-muted-foreground text-base">
              Assim posso te enviar um relatório personalizado com o seu tipo de orador e dicas práticas exclusivas pro seu perfil.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-border bg-secondary p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-semibold text-foreground">
                  Nome completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Ex: Rafael Alves"
                    value={formData.nome}
                    onChange={handleChange("nome")}
                    required
                    className="pl-9 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:border-white/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: rafael@email.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    className="pl-9 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:border-white/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-semibold text-foreground">
                  WhatsApp <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="Ex: (11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handleChange("whatsapp")}
                    className="pl-9 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:border-white/60"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Usaremos apenas para enviar conteúdo sobre oratória. Nada de spam!
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-bold rounded-full bg-white text-neutral-900 hover:bg-white/90 transition-all duration-300 shadow-lg mt-2"
              >
                {loading ? "Salvando..." : "👉 Começar meu Quiz"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Lock className="w-3.5 h-3.5" />
                <p>Suas informações são 100% confidenciais.</p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeadCapture;
