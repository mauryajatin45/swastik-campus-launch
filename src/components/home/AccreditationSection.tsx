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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Curriculum - Gujarat State Board */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-sky-blue/20 flex items-center justify-center group-hover:bg-sky-blue/30 transition-colors">
              <BookOpen className="h-7 w-7 md:h-8 md:w-8 text-sky-blue" />
            </div>
            <p className="font-heading font-bold text-white text-base md:text-lg mb-1">Curriculum</p>
            <p className="text-sky-blue text-sm md:text-base font-semibold">Gujarat State Board</p>
            <p className="text-sky-blue text-xs font-medium mt-2">✓ Affiliated</p>
          </div>
          
          {/* Medium of Learning */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-green/20 flex items-center justify-center group-hover:bg-green/30 transition-colors">
              <Globe className="h-7 w-7 md:h-8 md:w-8 text-green" />
            </div>
            <p className="font-heading font-bold text-white text-base md:text-lg mb-1">Medium of Learning</p>
            <p className="text-green text-sm md:text-base font-semibold">English & Gujarati</p>
            <p className="text-green text-xs font-medium mt-2">✓ Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationSection;
