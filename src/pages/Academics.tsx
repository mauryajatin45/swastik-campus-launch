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
    documents: [
      "Birth Certificate (Original for Verification)",
      "Birth Certificate - Xerox",
      "Aadhaar Card Xerox",
      "Passport Size Photo",
    ],
  },
  {
    id: "primary",
    title: "Primary School (Lower & Upper)",
    grades: "Grades 1-8",
    icon: BookOpen,
    color: "from-green to-sky-blue",
    bgColor: "bg-green",
    description: "Building strong academic foundations while nurturing creativity, critical thinking, and a love for lifelong learning.",
    highlights: [
      "Grade 1 - Minimum 6 years completed by June 1st",
      "Grade 2 and above - As per GSHSEB age criteria",
      "Strong Academic Foundation",
      "Holistic Child Development",
      "Language & Communication Skills",
      "Numeracy & Logical Thinking",
      "Experiential & Activity-Based Learning",
      "Co-Curricular & Creative Development",
      "Digital & 21st-Century Skills",
      "Sports & Physical Education",
      "Values & Life Skills Education",
      "Trained & Caring Educators",
      "Continuous & Comprehensive Assessment",
    ],
    subjects: ["English", "Hindi", "Gujarati", "Mathematics", "Science", "Social Studies", "Computer", "Art", "Music", "PE"],
    documents: [
      "Birth Certificate - Xerox",
      "Aadhaar Card - Xerox",
      "Passport Size Photo",
      "Previous Year Marksheet/ Progress Report Card - Xerox",
      "School Leaving Certificate of Last School - Original",
      "UID No. & PEN No. Must be mentioned in the School Leaving Certificate",
    ],
  },
  {
    id: "secondary",
    title: "Secondary & Higher Secondary School",
    grades: "Grades 9-12",
    icon: GraduationCap,
    color: "from-orange to-red-accent",
    bgColor: "bg-orange",
    description: "Preparing students for academic excellence and board examinations with rigorous curriculum and personalized guidance.",
    highlights: [
      "Admission as per GSHSEB age criteria",
      "GSHSEB curriculum with both mediums available",
      "Strong Academic Framework",
      "Critical Thinking & Concept Mastery",
      "Communication & Language Proficiency",
      "Digital Literacy & Skill Development",
      "Continuous Assessment & Exam Readiness",
      "Stream-Focused Academic Excellence",
      "Advanced Practical & Laboratory Learning",
      "Competitive Exam Orientation",
      "Career Guidance & Counseling",
      "Assessment & Performance Tracking",
      "Values, Discipline and Leadership",
    ],
    subjects: ["English", "Hindi/Sanskrit", "Gujarati", "Mathematics", "Science", "Social Science", "Computer", "Physical Education"],
    documents: [
      "Aadhaar Card - Xerox",
      "Passport Size Photo",
      "Previous Year Marksheet/ Progress Report Card - Xerox",
      "School Leaving Certificate of Last School - Original",
      "UID No. & PEN No. Must be mentioned in the School Leaving Certificate",
    ],
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
  { icon: BookOpen, title: "Concept-Based Learning", description: "Focus on deep understanding of concepts rather than rote memorization" },
  { icon: Target, title: "Activity & Experiential Learning", description: "Learning through hands-on activities, experiments, projects, and models. Real-life connections to academic concepts" },
  { icon: Monitor, title: "Technology-Enabled Learning", description: "Smart classrooms with audio-visual teaching aids" },
  { icon: FlaskConical, title: "Practical & Application-Oriented Approach", description: "Well-equipped laboratories for Science and Computer education" },
  { icon: Brain, title: "Critical Thinking & Problem Solving", description: "Prepares students for competitive exams and future challenges" },
  { icon: CheckCircle, title: "Continuous Assessment & Feedback", description: "Regular assessments to track learning progress" },
];

const extracurricular = [
  { icon: Palette, title: "Arts & Cultural Activities", description: "Painting, drawing, pottery, music, dance, and creative expression", color: "bg-orange" },
  { icon: Trophy, title: "Sports & Physical Activities", description: "Cricket, football, basketball, athletics, yoga, and physical fitness", color: "bg-green" },
  { icon: BookOpen, title: "Literary & Language Activities", description: "Quiz competitions and reading programs", color: "bg-sky-blue" },
  { icon: FlaskConical, title: "Science, Math & Innovation Clubs", description: "STEM activities, experiments, and innovation projects", color: "bg-red-accent" },
  { icon: Code, title: "Technology & Skill-Based Activities", description: "Coding, robotics, app development, and digital skills", color: "bg-orange" },
  { icon: Target, title: "Social, Environmental & Life Skills Activities", description: "Community service, sustainability projects, and life skills development", color: "bg-green" },
  { icon: Award, title: "Competitions & Events", description: "Inter-school competitions, exhibitions, and talent showcases", color: "bg-sky-blue" },
  { icon: Users, title: "Leadership Opportunities", description: "Student council, mentorship programs, and leadership training", color: "bg-red-accent" },
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
                Our Commitment to <span className="text-sky-blue">Academic Excellence</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                We are committed to academic excellence through a well-structured curriculum, experienced teachers, and a supportive learning environment that helps students achieve strong academic outcomes and lifelong success.
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="h-7 w-7" />
              </div>
              <div className="text-left">
                <h3 className="font-heading font-bold text-xl">GSHSEB Affiliated</h3>
                <p className="text-white/90 text-sm">State Board</p>
              </div>
            </div>
            <div className="w-px h-16 bg-white/30 hidden md:block" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="text-left">
                <h3 className="font-heading font-bold text-xl">English/Gujarati Medium</h3>
                <p className="text-white/90 text-sm">NCERT Based Curriculum</p>
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

                  {/* Right - Requirements */}
                  <div className={`p-8 lg:p-12 bg-gradient-to-br ${currentLevel.color}`}>
                    <h4 className="font-heading font-bold text-white text-xl mb-6">Requirements</h4>
                    
                    {currentLevel.documents ? (
                      <div className="space-y-3">
                        {currentLevel.documents.map((doc, index) => (
                          <div key={index} className="flex items-start gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">{doc}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-white/80 text-center py-8">
                        <p>No specific document requirements listed for this level.</p>
                        <p className="text-sm mt-2">Please contact the admissions office for details.</p>
                      </div>
                    )}
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {extracurricular.slice(0, 6).map((activity, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className={`w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <activity.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
                {extracurricular.slice(6).map((activity, index) => (
                  <div key={index + 6} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className={`w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <activity.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                  </div>
                ))}
              </div>
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
