import { Lightbulb, Globe, Heart, Trophy, Users, Palette, BookOpen, Music } from "lucide-react";
import { ScrollRevealSection } from "./hooks";

const CoreValuesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl"></div>
        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-sky-blue/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-orange/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollRevealSection>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-5 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Eight pillars that shape our educational philosophy and guide every student's journey to excellence
            </p>
          </div>

          {/* Values Grid - Unique Staggered Layout */}
          <div className="max-w-6xl mx-auto">
            {/* First Row - 4 items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
              {[
                { icon: Lightbulb, label: "Innovation", color: "from-orange to-orange-light", borderColor: "border-orange/50", description: "Fostering creative thinking and new ideas" },
                { icon: Globe, label: "Global Perspective", color: "from-sky-blue to-sky-blue-dark", borderColor: "border-sky-blue/50", description: "Preparing students for a connected world" },
                { icon: Heart, label: "Compassion", color: "from-red-accent to-red-accent", borderColor: "border-red-accent/50", description: "Nurturing empathy and kindness in all" },
                { icon: Trophy, label: "Excellence", color: "from-green to-green-dark", borderColor: "border-green/50", description: "Striving for the highest standards" },
              ].map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border ${value.borderColor} hover:bg-white/10 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-default overflow-hidden`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base md:text-lg mb-2">{value.label}</h3>
                    <p className="text-white/50 text-xs md:text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:translate-y-2 md:group-hover:translate-y-0">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - 4 items with offset for visual interest */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:px-8">
              {[
                { icon: Users, label: "Community", color: "from-navy-light to-medium-blue", borderColor: "border-sky-blue/30", description: "Building strong bonds and teamwork" },
                { icon: Palette, label: "Creativity", color: "from-orange to-orange-light", borderColor: "border-orange/30", description: "Unleashing artistic expression" },
                { icon: BookOpen, label: "Knowledge", color: "from-sky-blue to-medium-blue", borderColor: "border-sky-blue/30", description: "Pursuing wisdom through learning" },
                { icon: Music, label: "Arts & Culture", color: "from-green to-green-dark", borderColor: "border-green/30", description: "Celebrating heritage and creativity" },
              ].map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border ${value.borderColor} hover:bg-white/10 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-default overflow-hidden`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base md:text-lg mb-2">{value.label}</h3>
                    <p className="text-white/50 text-xs md:text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:translate-y-2 md:group-hover:translate-y-0">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-sky-blue rounded-full"></div>
              <div className="w-3 h-3 bg-sky-blue rounded-full animate-pulse"></div>
              <div className="w-24 h-1 bg-gradient-to-r from-sky-blue via-green to-orange rounded-full"></div>
              <div className="w-3 h-3 bg-orange rounded-full animate-pulse"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange to-transparent rounded-full"></div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default CoreValuesSection;
