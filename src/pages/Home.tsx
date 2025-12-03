import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react";
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

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="Swastik Education Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Empowering Minds,<br />Building Futures.
            </h1>
            <p className="text-secondary-foreground/90 text-lg md:text-xl mb-8 leading-relaxed">
              At Swastik Education Campus, we cultivate intellectual curiosity, ethical leadership, 
              and a lifelong love for learning in every student.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admissions" className="btn-primary">
                Apply Now
              </Link>
              <Link to="/about" className="btn-outline border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Welcome to</span>
            <h2 className="section-title mt-4 mb-6">Swastik Education Campus</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Nestled in the heart of Motera, Ahmedabad, Swastik Education Campus stands as a beacon 
              of academic excellence. Our rigorous curriculum integrates the best of traditional values 
              and modern pedagogy, preparing students to thrive in an ever-changing world. With dedicated 
              faculty, state-of-the-art facilities, and a nurturing environment, we inspire students to 
              achieve their fullest potential.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Programs</span>
            <h2 className="section-title mt-4">Comprehensive Education</h2>
            <p className="section-subtitle mx-auto mt-4">
              From early years to secondary education, we offer programs designed to nurture every stage of your child's development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className="card-elevated p-8 text-center group hover:-translate-y-1 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <program.icon className="text-accent" size={28} />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{program.grades}</span>
                <h3 className="font-serif text-2xl font-semibold text-secondary mt-2 mb-4">{program.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/academics" className="btn-secondary">
              Explore All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary-foreground mb-6">
            Begin Your Child's Journey Today
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Admissions are now open for the upcoming academic year. Join our community of learners and leaders.
          </p>
          <Link to="/admissions" className="btn-primary">
            Start Application
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
