import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Trophy, Heart } from "lucide-react";
import { ScrollRevealSection } from "./hooks";

const whyChooseCards = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Comprehensive curriculum designed to nurture critical thinking and creativity.",
    color: "sky-blue",
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Dedicated educators committed to bringing out the best in every student.",
    color: "green",
  },
  {
    icon: Trophy,
    title: "Holistic Development",
    description: "Balanced focus on academics, sports, arts, and character building.",
    color: "orange",
  },
  {
    icon: Heart,
    title: "Safe Environment",
    description: "A nurturing space where every child feels valued and protected.",
    color: "red-accent",
  },
];

const getIconColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    "sky-blue": "bg-sky-blue/10 text-sky-blue",
    "green": "bg-green/10 text-green",
    "orange": "bg-orange/10 text-orange",
    "red-accent": "bg-red-accent/10 text-red-accent",
  };
  return colorMap[color] || colorMap["sky-blue"];
};

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Text */}
            <div>
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Choose Us
              </span>
              <h2 className="section-title mb-6">
                We Are Swastik Education Campus
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                As a leading educational institution in Ahmedabad, Swastik Education Campus 
                offers students from Early Years to Grade 10 a well-rounded education at our 
                modern campus near Narendra Modi Stadium.
              </p>
              <p className="text-muted-foreground mb-8">
                Our 21st-century learning environment combines traditional values with 
                innovative teaching methods, preparing students for success in an 
                ever-changing world.
              </p>
              <Link to="/about" className="btn-outline-navy group">
                Learn More About Us
                <ArrowRight className="h-4 w-4 arrow-slide" />
              </Link>
            </div>

            {/* Right Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {whyChooseCards.map((card, index) => {
                const hoverBgClass = {
                  "sky-blue": "hover:bg-sky-blue",
                  "green": "hover:bg-green",
                  "orange": "hover:bg-orange",
                  "red-accent": "hover:bg-red-accent",
                }[card.color] || "hover:bg-sky-blue";

                return (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-border group ${hoverBgClass} hover:border-transparent hover:scale-105 hover:-translate-y-2`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all ${getIconColorClass(card.color)} group-hover:bg-white/20`}
                    >
                      <card.icon className="h-7 w-7 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 group-hover:text-white/90 transition-colors">
                      {card.description}
                    </p>
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1 text-orange text-sm font-semibold hover:gap-2 transition-all group-hover:text-white"
                    >
                      Enquire Now <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
