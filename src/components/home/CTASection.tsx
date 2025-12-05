import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollRevealSection } from "./hooks";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-navy to-navy-dark text-white">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Give Your Child the Best Education?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Join the Swastik family and watch your child thrive in our nurturing environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions" className="btn-orange group">
                Apply Now
                <ArrowRight className="h-4 w-4 arrow-slide" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default CTASection;
