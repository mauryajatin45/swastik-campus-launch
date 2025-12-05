import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ScrollRevealSection } from "./hooks";

const faqCategories = ["Admissions", "Curriculum", "Facilities", "Transport"];

const faqs: Record<string, { q: string; a: string }[]> = {
  Admissions: [
    { q: "What is the admission process?", a: "Our admission process includes application submission, entrance assessment, and parent interview. Contact us for detailed information." },
    { q: "What are the age criteria for admission?", a: "Early Years: 3-6 years, Primary: 6-11 years, Secondary: 11-16 years. Age calculated as of June 1st of the academic year." },
    { q: "Are admissions open throughout the year?", a: "We primarily admit students at the beginning of the academic year, but limited seats may be available mid-year subject to availability." },
  ],
  Curriculum: [
    { q: "What curriculum does the school follow?", a: "We offer both English and Gujarati medium instruction following the Gujarat State Board curriculum with enhanced learning programs." },
    { q: "What extracurricular activities are available?", a: "We offer 50+ activities including sports, music, dance, art, robotics, coding, and various clubs." },
  ],
  Facilities: [
    { q: "What facilities does the campus have?", a: "Our campus includes modern classrooms, science labs, computer labs, library, sports grounds, and activity rooms." },
    { q: "Is there a cafeteria?", a: "Yes, we have a hygienic cafeteria serving nutritious meals prepared under strict quality standards." },
  ],
  Transport: [
    { q: "Does the school provide transport?", a: "Yes, we have a fleet of GPS-enabled buses covering major areas of Ahmedabad with trained drivers and attendants." },
    { q: "What areas are covered by school transport?", a: "We cover Motera, Chandkheda, Sabarmati, Adalaj, Gandhinagar, and surrounding areas." },
  ],
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("Admissions");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-pale-blue/30">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              FAQs
            </span>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(null);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-sky-blue text-white"
                    : "bg-white text-navy border-2 border-medium-blue/20 hover:border-sky-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs[activeCategory].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-pale-gray/50 transition-colors"
                >
                  <span className="font-heading font-semibold text-navy">{faq.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full bg-sky-blue/10 flex items-center justify-center transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronRight className="h-4 w-4 text-sky-blue rotate-90" />
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default FAQSection;
