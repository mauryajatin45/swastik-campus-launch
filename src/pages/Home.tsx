import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, ArrowRight, Award, Building, Palette, Trophy } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroCampus from "@/assets/hero-campus.jpg";

const programs = [
  {
    icon: Users,
    title: "Early Years",
    description: "Nurturing curiosity and creativity in our youngest learners through play-based education.",
    grades: "Ages 3-5",
  },
  {
    icon: BookOpen,
    title: "Primary School",
    description: "Building strong foundations in literacy, numeracy, and critical thinking skills.",
    grades: "Grades 1-5",
  },
  {
    icon: GraduationCap,
    title: "Secondary School",
    description: "Preparing students for academic excellence and future success.",
    grades: "Grades 6-10",
  },
];

const stats = [
  { number: "1:20", label: "Teacher-Student Ratio", icon: Users },
  { number: "15+", label: "Years of Excellence", icon: Award },
  { number: "5000+", label: "Alumni Network", icon: GraduationCap },
  { number: "50+", label: "Extracurricular Activities", icon: Palette },
];

const lifeAtSchool = [
  {
    title: "Arts & Culture",
    description: "Giving opportunities to showcase creativity and artistic expression.",
    icon: Palette,
  },
  {
    title: "Sports",
    description: "Combining physical development with focus and teamwork.",
    icon: Trophy,
  },
  {
    title: "Clubs & Activities",
    description: "Explore various interests by participating in diverse activities.",
    icon: Users,
  },
  {
    title: "Infrastructure",
    description: "State-of-the-art facilities designed for optimal learning.",
    icon: Building,
  },
];

const ScrollRevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="Swastik Education Campus"
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Welcome to Swastik Education Campus
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6 animate-slide-up">
              Empowering Minds,<br />Building Futures.
            </h1>
            <p className="text-secondary-foreground/90 text-lg md:text-xl mb-8 leading-relaxed animate-slide-up-delay-1">
              At Swastik Education Campus, we cultivate intellectual curiosity, ethical leadership, 
              and a lifelong love for learning in every student.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up-delay-2">
              <Link to="/admissions" className="btn-primary hover-lift">
                Apply Now
              </Link>
              <Link to="/about" className="btn-outline border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary hover-lift">
                Discover More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-secondary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-secondary-foreground/50 rounded-full animate-pulse-subtle" />
          </div>
        </div>
      </section>

      {/* Why We're Unique Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollRevealSection>
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Who We Are</span>
              <h2 className="section-title mt-4 mb-6">Why are We Unique?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Swastik Education Campus, Ahmedabad, ensures an environment that offers every opportunity 
                to develop areas of interest for the students. We encourage minds that question and work 
                toward building curiosity which inspires creativity and expands intellectual horizons.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our school not only offers state-of-the-art infrastructure for the holistic development 
                of its students but also promises an inclusive academic curriculum that is at par with 
                the highest educational standards.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary font-semibold group"
              >
                Learn More About Us 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollRevealSection>

            <ScrollRevealSection className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={heroCampus}
                  alt="Students at Swastik Education Campus"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-bold font-serif">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Learning</span>
            <h2 className="section-title mt-4">Curriculum and Programs</h2>
            <p className="section-subtitle mx-auto mt-4">
              Our comprehensive curriculum is a perfect blend of academics and co-curricular activities, 
              shaping the overall personality of our students.
            </p>
          </ScrollRevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ScrollRevealSection key={program.title}>
                <div
                  className="card-elevated p-8 text-center group hover-lift h-full"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <program.icon className="text-accent group-hover:text-accent-foreground transition-colors" size={28} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{program.grades}</span>
                  <h3 className="font-serif text-2xl font-semibold text-secondary mt-2 mb-4">{program.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                </div>
              </ScrollRevealSection>
            ))}
          </div>

          <ScrollRevealSection className="text-center mt-12">
            <Link to="/academics" className="btn-secondary hover-lift">
              Explore All Programs
            </Link>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollRevealSection key={stat.label}>
                <div 
                  className="text-center text-secondary-foreground"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <div className="font-serif text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-secondary-foreground/70 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Life at School Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollRevealSection className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Life at School</span>
            <h2 className="section-title mt-4">A Place to Grow</h2>
            <p className="section-subtitle mx-auto mt-4">
              What makes us one of the best schools in Ahmedabad is our commitment towards expanding 
              the learning horizons for our students.
            </p>
          </ScrollRevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifeAtSchool.map((item, index) => (
              <ScrollRevealSection key={item.title}>
                <div 
                  className="group p-6 bg-card rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                    <item.icon className="text-accent group-hover:text-accent-foreground transition-colors" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-secondary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollRevealSection>
            ))}
          </div>

          <ScrollRevealSection className="text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-primary font-semibold group">
              View Our Gallery 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
              Begin Your Child's Journey Today
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
              Admissions are now open for the upcoming academic year. Join our community of learners and leaders.
            </p>
            <Link to="/admissions" className="inline-block bg-secondary text-secondary-foreground px-8 py-4 font-semibold tracking-wide uppercase text-sm hover:bg-secondary/90 transition-all duration-300 hover-lift">
              Start Application
            </Link>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default Home;
