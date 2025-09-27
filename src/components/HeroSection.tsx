
import { ArrowDown, Book } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative overflow-hidden min-h-[520px] flex flex-col md:flex-row items-center py-12 md:py-20 gradient-purple text-white">
    <div className="relative z-10 max-w-2xl px-6 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fade-in">
        Empowering Businesses with Intelligent Software Solutions
      </h1>
      <p className="text-lg md:text-xl mb-8 font-medium animate-fade-in" style={{ animationDelay: "120ms" } as any}>
        From ERP to all business management — Custom Software Tailored to Your Needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#contact" className="rounded-lg bg-white text-primary font-bold px-7 py-3 shadow-lg hover:scale-105 transition-transform text-center">
          Get a Free Demo
        </a>
        <Link to="/services" className="flex items-center px-7 py-3 border-2 border-white rounded-lg text-white hover:bg-white hover:text-primary-dark transition-colors font-bold text-center">
          <Book className="w-5 h-5 mr-2" /> Explore Our Services
        </Link>
      </div>
    </div>
    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 z-0">
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80"
        alt="Futuristic software dashboard"
        className="object-cover w-full h-full opacity-80 rounded-tl-2xl shadow-xl"
        loading="eager"
      />
    </div>
    <div className="md:hidden mt-10 z-0">
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
        alt="Futuristic software dashboard"
        className="object-cover w-full h-52 rounded-lg opacity-90 shadow-xl"
      />
    </div>
    {/* Arrow cue to scroll */}
    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
      <a href="#services" className="animate-bounce text-white/80 hover:text-white" aria-label="Scroll for more">
        <ArrowDown className="w-8 h-8" />
      </a>
    </div>
  </section>
);

export default HeroSection;
