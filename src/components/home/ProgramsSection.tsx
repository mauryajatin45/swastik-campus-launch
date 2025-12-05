import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollRevealSection } from "./hooks";
import heroImage from "@/assets/hero-campus.jpg";

const programs = [
  {
    title: "Early Years",
    grades: "Nursery - KG",
    description: "Building strong foundations through play-based learning and exploration.",
    image: heroImage,
  },
  {
    title: "Primary School",
    grades: "Grades 1 - 5",
    description: "Developing core academic skills alongside creativity and critical thinking.",
    image: heroImage,
  },
  {
    title: "Secondary School",
    grades: "Grades 6 - 10",
    description: "Preparing students for higher education and future career success.",
    image: heroImage,
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

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-navy">
                    {program.grades}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <Link
                    to="/academics"
                    className="inline-flex items-center gap-2 text-sky-blue font-semibold hover:text-sky-blue-dark transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
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
