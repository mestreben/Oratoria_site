import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Cursos", path: "/cursos" },
    { name: "Metodologia", path: "/metodologia" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-4xl mx-auto">
        {/* Desktop: pill nav */}
        <div className="hidden md:flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Oratória com Rafa" className="h-8" />
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-accent"
                    : "text-neutral-800 hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Button
            asChild
            className="rounded-full bg-neutral-900 hover:bg-neutral-700 text-white text-sm px-5"
          >
            <Link to="/quiz-inicio">Fazer Quiz</Link>
          </Button>
        </div>

        {/* Mobile: pill nav */}
        <div className="md:hidden flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-lg">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Oratória com Rafa" className="h-7" />
          </Link>

          <button
            className="text-neutral-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path) ? "text-accent" : "text-neutral-800 hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-3 rounded-full bg-neutral-900 hover:bg-neutral-700 text-white"
            >
              <Link to="/quiz-inicio" onClick={() => setIsOpen(false)}>Fazer Quiz</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
