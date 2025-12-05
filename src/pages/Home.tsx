import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Play,
  Calendar,
  GraduationCap,
  Users,
  Trophy,
  Lightbulb,
  Heart,
  Globe,
  Palette,
  Music,
  BookOpen,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Swastik Education Campus has transformed my child's approach to learning. The teachers are incredibly dedicated and supportive.",
      author: "Priya Sharma",
      role: "Parent of Grade 5 Student",
    },
    {
      quote: "The holistic development approach here is remarkable. My son has grown not just academically but also in sports and arts.",
      author: "Rajesh Patel",
      role: "Parent of Grade 8 Student",
    },
    {
      quote: "I've seen tremendous growth in my daughter's confidence and communication skills since joining Swastik.",
      author: "Anita Mehta",
      role: "Parent of Grade 3 Student",
    },
  ];

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

  const stats = [
    { number: "15:1", label: "Student-Teacher Ratio", color: "text-green" },
    { number: "15+", label: "Years of Excellence", color: "text-red-accent" },
    { number: "2000+", label: "Happy Students", color: "text-sky-blue" },
    { number: "50+", label: "Co-curricular Activities", color: "text-orange" },
  ];

  const valuesIcons = [
    { icon: Lightbulb, label: "Innovation", color: "bg-orange/10 text-orange" },
    { icon: Globe, label: "Global Perspective", color: "bg-sky-blue/10 text-sky-blue" },
    { icon: Heart, label: "Compassion", color: "bg-red-accent/10 text-red-accent" },
    { icon: Trophy, label: "Excellence", color: "bg-green/10 text-green" },
    { icon: Users, label: "Community", color: "bg-navy/10 text-navy" },
    { icon: Palette, label: "Creativity", color: "bg-orange/10 text-orange" },
    { icon: BookOpen, label: "Knowledge", color: "bg-sky-blue/10 text-sky-blue" },
    { icon: Music, label: "Arts & Culture", color: "bg-green/10 text-green" },
  ];

  const faqCategories = ["Admissions", "Curriculum", "Facilities", "Transport"];
  const [activeCategory, setActiveCategory] = useState("Admissions");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const getIconColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      "sky-blue": "bg-sky-blue/10 text-sky-blue",
      "green": "bg-green/10 text-green",
      "orange": "bg-orange/10 text-orange",
      "red-accent": "bg-red-accent/10 text-red-accent",
    };
    return colorMap[color] || colorMap["sky-blue"];
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-pale-blue/30 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Welcome to Swastik Education Campus
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-6">
                Empowering Minds for a{" "}
                <span className="text-sky-blue">Brighter Future</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                At Swastik Education Campus, we nurture young minds with a perfect blend of 
                academic excellence, character building, and holistic development.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/admissions" className="btn-sky">
                  <Calendar className="h-4 w-4" />
                  Schedule Campus Tour
                </Link>
                <Link to="/admissions" className="btn-orange group">
                  Admissions Open 2025-26
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
              </div>
              <a
                href="tel:+917096255075"
                className="inline-flex items-center gap-3 text-red-accent font-semibold group"
              >
                <span className="w-12 h-12 bg-red-accent/10 rounded-full flex items-center justify-center group-hover:bg-red-accent group-hover:text-white transition-all">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Call us now</span>
                  <span className="text-lg">7096 25 50 75</span>
                </span>
              </a>
            </div>

            {/* Right Image */}
            <div className="relative animate-slide-in-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Swastik Education Campus"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-green" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">15+</p>
                    <p className="text-sm text-muted-foreground">Years of Excellence</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-sky-blue" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">2000+</p>
                    <p className="text-sm text-muted-foreground">Happy Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${i === 0 ? "bg-sky-blue w-8" : "bg-navy/20"}`}
            />
          ))}
        </div>
      </section>

      {/* Accreditation Logos */}
      <section className="py-8 bg-pale-gray border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <div className="text-center">
              <p className="font-heading font-bold text-navy">Gujarat State Board</p>
              <p className="text-xs text-muted-foreground">Affiliated</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-navy">English Medium</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-navy">Gujarati Medium</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-navy">CBSE Pattern</p>
              <p className="text-xs text-muted-foreground">Teaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Swastik Section */}
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
                {whyChooseCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border group"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${getIconColorClass(card.color)}`}
                    >
                      <card.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {card.description}
                    </p>
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1 text-orange text-sm font-semibold hover:gap-2 transition-all"
                    >
                      Enquire Now <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-pale-blue/50">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <p className={`text-4xl md:text-5xl font-heading font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </p>
                  <div className={`h-1 w-16 mx-auto rounded-full mb-3 group-hover:w-24 transition-all ${stat.color.replace('text-', 'bg-')}`} />
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Principal Section */}
      <section className="relative py-20 bg-navy overflow-hidden">
        {/* Wave Shape Top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-pale-blue/50 wave-bottom" />
        
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

      {/* Programs Section */}
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
              {[
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
              ].map((program, index) => (
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

      {/* Values Icon Grid */}
      <section className="py-16 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Our Core Values</h2>
              <p className="section-subtitle mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {valuesIcons.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 hover-lift"
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${value.color}`}
                  >
                    <value.icon className="h-9 w-9" />
                  </div>
                  <p className="font-heading font-semibold text-navy">{value.label}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Testimonials
              </span>
              <h2 className="section-title mb-4">What Parents Say</h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border relative">
                <Quote className="absolute top-6 left-6 h-12 w-12 text-green/20" />
                <div className="text-center">
                  <p className="text-xl md:text-2xl text-navy mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="w-16 h-16 bg-sky-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-sky-blue">
                      {testimonials[currentTestimonial].author[0]}
                    </span>
                  </div>
                  <p className="font-heading font-bold text-navy">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full border-2 border-navy/20 flex items-center justify-center hover:border-sky-blue hover:text-sky-blue transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2 items-center">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? "bg-sky-blue w-8" : "bg-navy/20"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full border-2 border-navy/20 flex items-center justify-center hover:border-sky-blue hover:text-sky-blue transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA Section */}
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

      {/* Fixed Side CTAs */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col">
        <Link
          to="/contact"
          className="bg-orange text-white px-3 py-6 text-sm font-semibold hover:bg-orange-light transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          ENQUIRE NOW
        </Link>
        <Link
          to="/admissions"
          className="bg-sky-blue text-white px-3 py-6 text-sm font-semibold hover:bg-sky-blue-dark transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          BOOK A TOUR
        </Link>
      </div>
    </main>
  );
};

export default Home;