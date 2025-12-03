import { useState } from "react";
import { GraduationCap, BookOpen, Users, Palette, Music, Trophy } from "lucide-react";

const levels = [
  {
    id: "early",
    title: "Early Years",
    grades: "Ages 3-5",
    icon: Users,
    description: "Our Early Years program provides a nurturing foundation for young learners through play-based education.",
    highlights: [
      "Activity-based learning methodology",
      "Focus on motor skills and social development",
      "Introduction to basic literacy and numeracy",
      "Art, music, and physical activities",
      "Safe and stimulating environment",
    ],
  },
  {
    id: "primary",
    title: "Primary School",
    grades: "Grades 1-5",
    icon: BookOpen,
    description: "Building strong academic foundations while nurturing creativity and critical thinking skills.",
    highlights: [
      "Comprehensive curriculum in English and Gujarati Medium",
      "Strong emphasis on mathematics and science",
      "Language development in English, Hindi, and Gujarati",
      "Environmental studies and social science",
      "Computer education and digital literacy",
    ],
  },
  {
    id: "secondary",
    title: "Secondary School",
    grades: "Grades 6-10",
    icon: GraduationCap,
    description: "Preparing students for academic excellence and board examinations with rigorous curriculum.",
    highlights: [
      "GSEB curriculum with both mediums available",
      "Specialized subject streams in higher grades",
      "Board examination preparation",
      "Career guidance and counseling",
      "Advanced science and mathematics programs",
    ],
  },
];

const extracurricular = [
  { icon: Palette, title: "Arts & Crafts", description: "Developing creativity through various art forms" },
  { icon: Music, title: "Music & Dance", description: "Nurturing musical talents and rhythmic expression" },
  { icon: Trophy, title: "Sports", description: "Physical education and competitive sports programs" },
];

const Academics = () => {
  const [activeLevel, setActiveLevel] = useState("early");
  const currentLevel = levels.find((l) => l.id === activeLevel);

  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Academics</span>
          <h1 className="section-title mt-4">Programs & Curriculum</h1>
          <p className="section-subtitle mx-auto mt-4">
            A comprehensive educational journey from early years through secondary education, offered in both English and Gujarati mediums.
          </p>
        </div>
      </section>

      {/* Medium Options */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="text-secondary-foreground">
              <h3 className="font-serif text-xl font-semibold mb-2">English Medium</h3>
              <p className="text-secondary-foreground/70 text-sm">Complete curriculum in English language</p>
            </div>
            <div className="w-px h-12 bg-secondary-foreground/20 hidden md:block" />
            <div className="text-secondary-foreground">
              <h3 className="font-serif text-xl font-semibold mb-2">Gujarati Medium</h3>
              <p className="text-secondary-foreground/70 text-sm">ગુજરાતી માધ્યમમાં સંપૂર્ણ અભ્યાસક્રમ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Educational Levels</span>
            <h2 className="section-title mt-4">Choose Your Level</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLevel === level.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {level.title}
              </button>
            ))}
          </div>

          {/* Active Level Content */}
          {currentLevel && (
            <div className="card-elevated p-10 lg:p-16 animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <currentLevel.icon className="text-accent" size={28} />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl font-semibold text-secondary">{currentLevel.title}</h3>
                      <span className="text-muted-foreground">{currentLevel.grades}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {currentLevel.description}
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-xl font-semibold text-secondary mb-6">Program Highlights</h4>
                  <ul className="space-y-4">
                    {currentLevel.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Extracurricular */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Beyond Academics</span>
            <h2 className="section-title mt-4">Extracurricular Activities</h2>
            <p className="section-subtitle mx-auto mt-4">
              Developing well-rounded individuals through diverse activities beyond the classroom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {extracurricular.map((activity) => (
              <div key={activity.title} className="card-elevated p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <activity.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-secondary mb-3">{activity.title}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Academics;
