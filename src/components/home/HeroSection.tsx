import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import heroVideo from "@/assets/newswastikhero.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/quicktime" />
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-navy/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl animate-slide-in-left">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
            Welcome to Swastik Education Campus
          </span>
          <h1 className="mt-0 text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Empowering Minds for a{" "}
            <span className="text-sky-blue">Brighter Future</span>
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-xl">
            At Swastik Education Campus, we nurture young minds with a perfect blend of 
            academic excellence, character building, and holistic development.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link to="/admissions" className="btn-sky">
              <Calendar className="h-4 w-4" />
              Schedule Campus Tour
            </Link>
            <Link to="/admissions" className="btn-orange group">
              Admissions Open 2025-26
              <ArrowRight className="h-4 w-4 arrow-slide" />
            </Link>
          </div>
          <a
            href="tel:+917096255075"
            className="inline-flex items-center gap-3 text-white font-semibold group"
          >
            <span className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-accent transition-all border border-white/20">
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-white/70">Call us now</span>
              <span className="text-lg">7096 25 50 75</span>
            </span>
          </a>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">8+ Campuses Across Ahmedabad</p>
              <p className="text-sm text-white/80 leading-relaxed">A growing network of campuses committed to delivering consistent quality education and trusted learning environments for students and parents.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">Upcoming CBSE Campus in Hanspura (2027)</p>
              <p className="text-sm text-white/80 leading-relaxed">Expanding our legacy with a new CBSE-pattern campus in Hanspura, designed to offer a future-ready curriculum and world-class learning experience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
