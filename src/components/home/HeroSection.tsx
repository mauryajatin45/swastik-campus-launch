import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-pale-blue/30 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Welcome to Swastik Education Campus
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-6">
              Empowering Minds for a{" "}
              <span className="text-sky-blue">Brighter Future</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
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
              className="inline-flex items-center gap-3 text-red-accent font-semibold group"
            >
              <span className="w-12 h-12 bg-red-accent/10 rounded-full flex items-center justify-center group-hover:bg-red-accent group-hover:text-white transition-all">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Call us now</span>
                <span className="text-lg">7096 25 50 75</span>
              </span>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Swastik Education Campus"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">15+</p>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-sky-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">2000+</p>
                  <p className="text-sm text-muted-foreground">Happy Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
