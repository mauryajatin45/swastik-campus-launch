import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
  CreditCard,
  Download,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Shield,
  Award
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

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit Application",
    description: "Complete the online application form with required documents and photographs.",
    color: "from-sky-blue to-green",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Entrance Assessment",
    description: "Students undergo an age-appropriate assessment to evaluate readiness.",
    color: "from-green to-sky-blue",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Parent Interview",
    description: "Interactive session with parents to understand expectations and share our vision.",
    color: "from-orange to-red-accent",
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Fee Payment",
    description: "Upon selection, complete the fee payment and enrollment formalities.",
    color: "from-red-accent to-orange",
  },
];

const dates = [
  { event: "Application Period Opens", date: "January 15, 2025", status: "upcoming" },
  { event: "Application Deadline", date: "March 31, 2025", status: "upcoming" },
  { event: "Entrance Assessments", date: "April 10-15, 2025", status: "upcoming" },
  { event: "Results Announcement", date: "April 25, 2025", status: "upcoming" },
  { event: "Admission Confirmation Deadline", date: "May 15, 2025", status: "upcoming" },
  { event: "New Session Begins", date: "June 10, 2025", status: "upcoming" },
];

const eligibility = [
  { level: "Nursery", age: "3 years by June 1st", icon: Users, color: "bg-sky-blue", documents: ["Birth Certificate", "Passport Photos", "Aadhar Card Copy"] },
  { level: "LKG", age: "4 years by June 1st", icon: Users, color: "bg-green", documents: ["Birth Certificate", "Passport Photos", "Aadhar Card Copy"] },
  { level: "UKG", age: "5 years by June 1st", icon: Users, color: "bg-orange", documents: ["Birth Certificate", "Previous School Records", "Aadhar Card Copy"] },
  { level: "Grade 1-5", age: "As per age norms", icon: GraduationCap, color: "bg-red-accent", documents: ["Transfer Certificate", "Report Card", "Birth Certificate", "Aadhar Card Copy"] },
  { level: "Grade 6-10", age: "As per age norms", icon: GraduationCap, color: "bg-navy", documents: ["Transfer Certificate", "Report Card", "Migration Certificate", "Birth Certificate", "Aadhar Card Copy"] },
];

const fees = [
  { level: "Early Years", grades: "Nursery - UKG", annual: "Contact for Details", color: "from-sky-blue to-green", features: ["Activity-based learning", "Safe environment", "Trained teachers"] },
  { level: "Primary", grades: "Grade 1 - 5", annual: "Contact for Details", color: "from-green to-sky-blue", features: ["Comprehensive curriculum", "Smart classrooms", "Extra activities"], popular: true },
  { level: "Secondary", grades: "Grade 6 - 10", annual: "Contact for Details", color: "from-orange to-red-accent", features: ["Board preparation", "Career guidance", "Competitive exams"] },
];

const faqs = [
  { q: "What is the admission process?", a: "The admission process includes application submission, entrance assessment, parent interview, and fee payment upon selection." },
  { q: "Is transport facility available?", a: "Yes, we provide GPS-enabled bus transport covering major areas of Ahmedabad including Motera, Chandkheda, Sabarmati, Adalaj, and Gandhinagar." },
  { q: "What are the school timings?", a: "School hours are from 8:00 AM to 3:00 PM, Monday to Saturday. Half-day on Saturdays." },
  { q: "Are there any scholarships available?", a: "Yes, we offer merit-based scholarships for exceptional students. Contact our admissions office for details." },
];

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Admissions" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-blue/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-orange/20 backdrop-blur-sm text-orange px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-orange/30">
                  Admissions Open 2025-26
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                  Join the <span className="text-orange">Swastik Family</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  Begin your child's journey towards academic excellence and personal growth. 
                  Limited seats available for the upcoming academic session.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-orange group">
                    Apply Now
                    <ArrowRight className="h-4 w-4 arrow-slide" />
                  </Link>
                  <a href="tel:+917096255075" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call: 7096 25 50 75
                  </a>
                </div>
              </div>

              {/* Quick Enquiry Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-heading font-bold text-navy mb-2">
                  Quick Enquiry
                </h3>
                <p className="text-muted-foreground text-sm mb-6">Fill in your details and we'll get back to you</p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Parent's Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Select Grade *</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all cursor-pointer">
                      <option value="">Choose a grade</option>
                      <option value="nursery">Nursery</option>
                      <option value="lkg">LKG</option>
                      <option value="ukg">UKG</option>
                      <option value="1-5">Grade 1-5</option>
                      <option value="6-10">Grade 6-10</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-orange text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-light transition-colors flex items-center justify-center gap-2">
                    Submit Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="py-8 bg-gradient-to-r from-sky-blue to-green text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <span className="font-semibold">Safe Campus</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8" />
              <span className="font-semibold">100% Board Results</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8" />
              <span className="font-semibold">Expert Faculty</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              <span className="font-semibold">Holistic Education</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                How to Apply
              </span>
              <h2 className="section-title mb-4">Simple Admission Process</h2>
              <p className="section-subtitle mx-auto">
                Four easy steps to secure your child's place at Swastik Education Campus
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 h-full">
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-4xl font-heading font-bold text-navy/20">{step.number}</span>
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-6 w-6 text-orange" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-navy text-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-blue/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-orange px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Mark Your Calendar
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Important Dates 2025-26</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Key dates for the admission process. Don't miss the deadlines!
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange via-sky-blue to-green"></div>

                {dates.map((item, index) => (
                  <div key={index} className="relative flex items-center gap-6 mb-6 group">
                    {/* Dot */}
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar className="h-6 w-6 text-orange" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="font-heading font-bold text-white">{item.event}</h3>
                        <span className="text-orange font-semibold">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Requirements
              </span>
              <h2 className="section-title mb-4">Eligibility Criteria</h2>
              <p className="section-subtitle mx-auto">
                Age requirements and documents needed for each level
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {eligibility.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-navy">{item.level}</h3>
                      <p className="text-muted-foreground text-sm">{item.age}</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-navy mb-2">Documents Required:</h4>
                  <ul className="space-y-1">
                    {item.documents.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Investment in Education
              </span>
              <h2 className="section-title mb-4">Fee Structure</h2>
              <p className="section-subtitle mx-auto">
                Transparent pricing for quality education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {fees.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border ${item.popular ? 'ring-2 ring-navy relative' : ''}`}
                >
                  {/* {item.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )} */}
                  <div className="p-6 pt-8 border-b border-border text-center">
                    <h3 className="font-heading font-bold text-xl text-navy mb-1">{item.level}</h3>
                    <p className="text-muted-foreground text-sm">{item.grades}</p>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6 py-4 bg-pale-gray rounded-xl">
                      <p className="text-muted-foreground text-sm mb-1">Annual Fee</p>
                      <p className="text-xl font-heading font-bold text-navy">{item.annual}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="block text-center bg-navy text-white px-4 py-3 rounded-xl font-semibold hover:bg-navy-dark transition-colors">
                      Get Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8">
              * Contact our admissions office for detailed fee structure and payment plans.
            </p>
          </ScrollRevealSection>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Have Questions?
              </span>
              <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-pale-gray/50 transition-colors"
                  >
                    <span className="font-heading font-semibold text-navy flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-sky-blue" />
                      {faq.q}
                    </span>
                    <ChevronRight className={`h-5 w-5 text-sky-blue transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 text-muted-foreground animate-fade-in pl-14">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-pale-blue">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-sky-blue rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-2">Call Us</h3>
                <a href="tel:+917096255075" className="text-sky-blue hover:underline">7096 25 50 75</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-2">Email Us</h3>
                <a href="mailto:admissions@swastikcampus.edu" className="text-green hover:underline">admissions@swastikcampus.edu</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-orange rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-2">Office Hours</h3>
                <p className="text-muted-foreground">Mon-Sat: 9:00 AM - 5:00 PM</p>
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
                Ready to Take the First Step?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Secure your child's future at Swastik Education Campus. Our admissions team 
                is here to guide you through every step of the process.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-orange group">
                  Apply Now
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                <button className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Brochure
                </button>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default Admissions;
