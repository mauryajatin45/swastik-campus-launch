import { Play } from "lucide-react";
import { ScrollRevealSection } from "./hooks";
import heroImage from "@/assets/hero-campus.jpg";

const PrincipalMessageSection = () => {
  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollRevealSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Video */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Principal"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-navy/30" />
                <button className="absolute inset-0 flex items-center justify-center group">
                  <span className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-sky-blue ml-1" />
                  </span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="text-white">
              <span className="inline-block bg-white/10 text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Message from Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Building Tomorrow's Leaders Today
              </h2>
              <p className="text-white/80 mb-6 text-lg">
                "At Swastik Education Campus, we believe every child has unlimited potential. 
                Our mission is to provide an environment where students can discover their 
                strengths, develop their character, and prepare for a successful future."
              </p>
              <p className="text-white/60 mb-8">
                Our dedicated team of educators works tirelessly to ensure that each student 
                receives personalized attention and guidance on their educational journey.
              </p>
              <button className="btn-sky">
                <Play className="h-4 w-4" />
                Watch Video
              </button>
            </div>
          </div>
        </ScrollRevealSection>
      </div>

      {/* Wave Shape Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white wave-top" />
    </section>
  );
};

export default PrincipalMessageSection;
