import { BookOpen, Globe, GraduationCap } from "lucide-react";

const AccreditationSection = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-sky-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Gujarat State Board */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sky-blue/20 flex items-center justify-center group-hover:bg-sky-blue/30 transition-colors">
              <BookOpen className="h-6 w-6 text-sky-blue" />
            </div>
            <p className="font-heading font-bold text-white text-sm md:text-base">Gujarat State Board</p>
            <p className="text-sky-blue text-xs font-medium mt-1">✓ Affiliated</p>
          </div>
          
          {/* English Medium */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green/20 flex items-center justify-center group-hover:bg-green/30 transition-colors">
              <Globe className="h-6 w-6 text-green" />
            </div>
            <p className="font-heading font-bold text-white text-sm md:text-base">English Medium</p>
            <p className="text-green text-xs font-medium mt-1">✓ Available</p>
          </div>
          
          {/* Gujarati Medium */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange/20 flex items-center justify-center group-hover:bg-orange/30 transition-colors">
              <BookOpen className="h-6 w-6 text-orange" />
            </div>
            <p className="font-heading font-bold text-white text-sm md:text-base">Gujarati Medium</p>
            <p className="text-orange text-xs font-medium mt-1">✓ Available</p>
          </div>
          
          {/* CBSE Pattern */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-accent/20 flex items-center justify-center group-hover:bg-red-accent/30 transition-colors">
              <GraduationCap className="h-6 w-6 text-red-accent" />
            </div>
            <p className="font-heading font-bold text-white text-sm md:text-base">CBSE Pattern</p>
            <p className="text-red-accent text-xs font-medium mt-1">✓ Teaching</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationSection;
