import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Palette, 
  Music, 
  Trophy,
  ArrowRight,
  CheckCircle,
  Globe,
  Microscope,
  Calculator,
  Languages,
  Monitor,
  FlaskConical,
  Dumbbell,
  Theater,
  Code,
  Brain,
  Target,
  Award,
  Clock,
  Calendar
} from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

// Scroll reveal hook
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const ScrollRevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

const levels = [
  {
    id: "early",
    title: "Early Years",
    grades: "Nursery - Balvatika",
    icon: Users,
    color: "from-sky-blue to-green",
    bgColor: "bg-sky-blue",
    description: "Our Early Years program provides a nurturing foundation for young learners through play-based education, developing curiosity and love for learning.",
    highlights: [
      "Nursery/Toddlers - Minimum 2 years completed by June 1st",
      "Jr. KG - Minimum 3 years completed by June 1st",
      "Sr. KG - Minimum 4 years completed by June 1st",
      "Balvatika - Minimum 5 years completed by June 1st",
      "Activity-based learning methodology",
      "Focus on motor skills and social development",
    ],
    subjects: ["English", "Hindi", "Gujarati", "Numbers", "Art & Craft", "Music", "Physical Play"],
  },
  {
    id: "primary",
    title: "Primary School",
    grades: "Grades 1-5",
    icon: BookOpen,
    color: "from-green to-sky-blue",
    bgColor: "bg-green",
    description: "Building strong academic foundations while nurturing creativity, critical thinking, and a love for lifelong learning.",
    highlights: [
      "Grade 1 - Minimum 6 years completed by June 1st",
      "Grade 2 and above - As per GSEB age criteria",
      "Comprehensive curriculum in English and Gujarati Medium",
      "Strong emphasis on mathematics and science",
      "Computer education and digital literacy",
      "Regular assessments and parent feedback",
    ],
    subjects: ["English", "Hindi", "Gujarati", "Mathematics", "Science", "Social Studies", "Computer", "Art", "Music", "PE"],
  },
  {
    id: "secondary",
    title: "Secondary School",
    grades: "Grades 6-10",
    icon: GraduationCap,
    color: "from-orange to-red-accent",
    bgColor: "bg-orange",
    description: "Preparing students for academic excellence and board examinations with rigorous curriculum and personalized guidance.",
    highlights: [
      "Admission as per GSEB age criteria",
      "GSEB curriculum with both mediums available",
      "Specialized subject streams in higher grades",
      "Board examination preparation and mock tests",
      "Career guidance and counseling",
      "Competitive exam preparation (JEE, NEET foundations)",
    ],
    subjects: ["English", "Hindi/Sanskrit", "Gujarati", "Mathematics", "Science", "Social Science", "Computer", "Physical Education"],
  },
];

const facilities = [
  { icon: Microscope, title: "Science Labs", description: "Fully equipped physics, chemistry, and biology laboratories" },
  { icon: Monitor, title: "Computer Lab", description: "Modern computers with high-speed internet and latest software" },
  { icon: BookOpen, title: "Library", description: "Vast collection of books, journals, and digital resources" },
  { icon: Dumbbell, title: "Sports Ground", description: "Cricket, football, basketball, and athletics facilities" },
  { icon: Theater, title: "Auditorium", description: "State-of-the-art venue for events and performances" },
  { icon: Palette, title: "Art Room", description: "Dedicated space for creative arts and crafts" },
];

const teachingMethods = [
  { icon: Brain, title: "Conceptual Learning", description: "Focus on understanding concepts rather than rote memorization" },
  { icon: Users, title: "Collaborative Projects", description: "Team-based learning to develop social and communication skills" },
  { icon: Monitor, title: "Smart Classes", description: "Interactive digital boards and multimedia content" },
  { icon: Target, title: "Activity-Based", description: "Learning through hands-on activities and experiments" },
];

const extracurricular = [
  { icon: Palette, title: "Arts & Crafts", description: "Painting, drawing, pottery, and creative expression", color: "bg-orange" },
  { icon: Music, title: "Music & Dance", description: "Vocal, instrumental, classical and western dance", color: "bg-sky-blue" },
  { icon: Trophy, title: "Sports", description: "Cricket, football, basketball, athletics, yoga", color: "bg-green" },
  { icon: Code, title: "Coding Club", description: "Programming, robotics, and app development", color: "bg-red-accent" },
  { icon: Theater, title: "Drama Club", description: "Theatre, skits, and public speaking", color: "bg-orange" },
  { icon: Languages, title: "Language Club", description: "Debate, elocution, and creative writing", color: "bg-sky-blue" },
];

const Academics = () => {
  const [activeLevel, setActiveLevel] = useState("early");
  const currentLevel = levels.find((l) => l.id === activeLevel);

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Academics" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-green/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="max-w-3xl">
              {/* <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                Academics
              </span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Programs & <span className="text-sky-blue">Curriculum</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                A comprehensive educational journey from early years through secondary education, 
                offered in both English and Gujarati mediums with a focus on holistic development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions" className="btn-orange group">
                  Apply for Admission
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                {/* <Link to="/contact" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  Download Brochure
                </Link> */}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Medium Options Banner */}
      <section className="py-8 bg-gradient-to-r from-sky-blue to-green text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-heading font-bold text-lg">English Medium</h3>
                <p className="text-white/80 text-sm">Complete curriculum in English</p>
              </div>
            </div>
            <div className="w-px h-12 bg-white/30 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-heading font-bold text-lg">Gujarati Medium</h3>
                <p className="text-white/80 text-sm">ગુજરાતી માધ્યમમાં સંપૂર્ણ અભ્યાસક્રમ</p>
              </div>
            </div>
            <div className="w-px h-12 bg-white/30 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-heading font-bold text-lg">GSEB Affiliated</h3>
                <p className="text-white/80 text-sm">Gujarat State Education Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Educational Levels
              </span>
              <h2 className="section-title mb-4">Choose Your Level</h2>
              <p className="section-subtitle mx-auto">
                Age-appropriate programs designed for optimal learning and development
              </p>
            </div>

            {/* Level Tabs */}
            <div className="flex justify-center gap-2 md:gap-4 mb-12">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`px-3 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 flex items-center gap-1 md:gap-3 text-xs md:text-base ${
                    activeLevel === level.id
                      ? `bg-gradient-to-r ${level.color} text-white shadow-lg scale-105`
                      : "bg-pale-gray text-navy hover:bg-pale-blue"
                  }`}
                >
                  <level.icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">{level.title}</span>
                  <span className="sm:hidden">{level.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Level Content */}
            {currentLevel && (
              <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden animate-fade-in">
                <div className="grid lg:grid-cols-2">
                  {/* Left Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center shadow-lg`}>
                        <currentLevel.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-2xl">{currentLevel.title}</h3>
                        <span className="text-muted-foreground">{currentLevel.grades}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {currentLevel.description}
                    </p>
                    
                    <h4 className="font-heading font-bold text-navy text-lg mb-4">Program Highlights</h4>
                    <ul className="space-y-3 mb-8">
                      {currentLevel.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/admissions" className="btn-sky">
                      Enroll Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Right - Subjects */}
                  <div className={`p-8 lg:p-12 bg-gradient-to-br ${currentLevel.color}`}>
                    <h4 className="font-heading font-bold text-white text-xl mb-6">Subjects Offered</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {currentLevel.subjects.map((subject, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white font-medium text-sm">
                          {subject}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <h5 className="font-heading font-bold text-white mb-4">Quick Facts</h5>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white/90">
                          <Clock className="h-5 w-5" />
                          <span>School Hours: 7:30 AM - 5:00 PM (Mon-Fri), 7:30 AM - 3:30 PM (Sat)</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                          <Calendar className="h-5 w-5" />
                          <span>6 Days a Week (Mon-Sat)</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                          <Users className="h-5 w-5" />
                          <span>Class Size: 30-35 Students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollRevealSection>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Approach
              </span>
              <h2 className="section-title mb-4">Teaching Methodology</h2>
              <p className="section-subtitle mx-auto">
                Modern teaching methods that make learning engaging and effective
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {teachingMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sky-blue to-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-navy text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Infrastructure
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Academic Facilities</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                State-of-the-art infrastructure to support comprehensive learning
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-blue to-green rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <facility.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{facility.title}</h3>
                  <p className="text-white/70 text-sm">{facility.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Beyond Academics
              </span>
              <h2 className="section-title mb-4">Extracurricular Activities</h2>
              <p className="section-subtitle mx-auto">
                Developing well-rounded individuals through diverse activities beyond the classroom
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {extracurricular.map((activity, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <activity.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Begin Your Academic Journey?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Join Swastik Education Campus and experience excellence in education with 
                a perfect blend of academics, values, and holistic development.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/admissions" className="btn-orange group">
                  Apply for Admission
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default Academics;
