import { Link } from "react-router-dom";
import { FileText, Calendar, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Application",
    description: "Complete the online application form with required documents and photographs.",
  },
  {
    number: "02",
    title: "Entrance Assessment",
    description: "Students undergo an age-appropriate assessment to evaluate readiness.",
  },
  {
    number: "03",
    title: "Interview",
    description: "Interactive session with the student and parents to understand expectations.",
  },
  {
    number: "04",
    title: "Admission Confirmation",
    description: "Upon selection, complete the fee payment and enrollment formalities.",
  },
];

const dates = [
  { event: "Application Period Opens", date: "January 15, 2025" },
  { event: "Application Deadline", date: "March 31, 2025" },
  { event: "Entrance Assessments", date: "April 10-15, 2025" },
  { event: "Results Announcement", date: "April 25, 2025" },
  { event: "Admission Confirmation Deadline", date: "May 15, 2025" },
];

const eligibility = [
  { level: "Nursery (Early Years)", age: "3 years as of June 1st", requirement: "Birth Certificate" },
  { level: "LKG", age: "4 years as of June 1st", requirement: "Birth Certificate" },
  { level: "UKG", age: "5 years as of June 1st", requirement: "Previous School Records" },
  { level: "Grade 1-5", age: "As per age norms", requirement: "TC & Report Card" },
  { level: "Grade 6-10", age: "As per age norms", requirement: "TC, Report Card & Migration Certificate" },
];

const fees = [
  { level: "Early Years (Nursery-UKG)", annual: "₹XX,XXX", admission: "₹X,XXX" },
  { level: "Primary (Grade 1-5)", annual: "₹XX,XXX", admission: "₹X,XXX" },
  { level: "Secondary (Grade 6-10)", annual: "₹XX,XXX", admission: "₹X,XXX" },
];

const Admissions = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Admissions</span>
          <h1 className="section-title mt-4">Join Our Community</h1>
          <p className="section-subtitle mx-auto mt-4">
            Begin your child's journey towards academic excellence and personal growth at Swastik Education Campus.
          </p>
          <Link to="/contact" className="btn-primary inline-block mt-8">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">How to Apply</span>
            <h2 className="section-title mt-4">Admission Process</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="card-elevated p-8 h-full">
                  <span className="font-serif text-5xl font-bold text-accent/20">{step.number}</span>
                  <h3 className="font-serif text-xl font-semibold text-secondary mt-4 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 text-accent/30 transform -translate-y-1/2" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Mark Your Calendar</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary-foreground mt-4">
              Important Dates
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {dates.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-secondary-foreground/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="text-accent" size={24} />
                    <span className="text-secondary-foreground font-medium">{item.event}</span>
                  </div>
                  <span className="text-secondary-foreground/80">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Requirements</span>
            <h2 className="section-title mt-4">Eligibility Criteria</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-serif text-secondary font-semibold">Level</th>
                  <th className="text-left py-4 px-6 font-serif text-secondary font-semibold">Age Requirement</th>
                  <th className="text-left py-4 px-6 font-serif text-secondary font-semibold">Documents Required</th>
                </tr>
              </thead>
              <tbody>
                {eligibility.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-6 text-foreground font-medium">{item.level}</td>
                    <td className="py-4 px-6 text-muted-foreground">{item.age}</td>
                    <td className="py-4 px-6 text-muted-foreground">{item.requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Investment in Education</span>
            <h2 className="section-title mt-4">Fee Structure</h2>
            <p className="text-muted-foreground mt-4">*Fee details are indicative. Contact admissions for exact figures.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {fees.map((item) => (
              <div key={item.level} className="card-elevated p-8 text-center">
                <h3 className="font-serif text-lg font-semibold text-secondary mb-6">{item.level}</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Annual Fee</span>
                    <p className="font-serif text-2xl font-bold text-foreground">{item.annual}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Admission Fee</span>
                    <p className="font-serif text-xl font-semibold text-foreground">{item.admission}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6">
            Ready to Begin?
          </h2>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
            Take the first step towards a bright future for your child. Our admissions team is here to help.
          </p>
          <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
            <FileText size={18} />
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Admissions;
