import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollRevealSection } from "./hooks";

const programs = [
  {
    title: "Early Years",
    grades: "Nursery - Balvatika",
    color: "from-sky-blue to-green",
    badge: "bg-sky-blue/10 text-sky-blue",
    description: "Building strong foundations through play-based learning and exploration.",
    eligibility: [
      { grade: "Nursery/Toddlers", age: "2+ years" },
      { grade: "Jr. KG", age: "3+ years" },
      { grade: "Sr. KG", age: "4+ years" },
      { grade: "Balvatika", age: "5+ years" },
    ],
    note: "Age completed by June 1st",
  },
  {
    title: "Primary School",
    grades: "Grades 1 - 5",
    color: "from-green to-sky-blue",
    badge: "bg-green/10 text-green",
    description: "Developing core academic skills alongside creativity and critical thinking.",
    eligibility: [
      { grade: "Grade 1", age: "6+ years by June 1st" },
      { grade: "Grade 2+", age: "As per GSEB criteria" },
    ],
    note: null,
  },
  {
    title: "Secondary School",
    grades: "Grades 6 - 10",
    color: "from-orange to-red-accent",
    badge: "bg-orange/10 text-orange",
    description: "Preparing students for higher education and board examinations.",
    eligibility: [
      { grade: "All Grades", age: "As per GSEB age criteria" },
    ],
    note: null,
  },
];

const ProgramsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Programs
            </span>
            <h2 className="section-title mb-4">Holistic Educational Framework</h2>
            <p className="section-subtitle mx-auto">
              A comprehensive approach to education that develops the whole child
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border-2 border-border hover:border-sky-blue/30"
              >
                {/* Header Section */}
                <div className={`bg-gradient-to-r ${program.color} p-5 text-white`}>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {program.grades}
                  </span>
                  <h3 className="font-heading font-bold text-2xl">
                    {program.title}
                  </h3>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  
                  {/* Age Eligibility Table */}
                  <div className="bg-pale-gray/50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Age Eligibility</p>
                    <div className="space-y-1.5">
                      {program.eligibility.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-navy">{item.grade}</span>
                          <span className="text-muted-foreground">{item.age}</span>
                        </div>
                      ))}
                    </div>
                    {program.note && (
                      <p className="text-[10px] text-sky-blue mt-2 italic">* {program.note}</p>
                    )}
                  </div>
                  
                  <Link
                    to="/academics"
                    className="inline-flex items-center gap-2 text-sky-blue font-semibold text-sm hover:gap-3 transition-all group/link"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default ProgramsSection;
