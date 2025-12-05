import { Link } from "react-router-dom";
import { 
  Quote, 
  GraduationCap, 
  Users, 
  Trophy, 
  Target, 
  Eye, 
  Heart, 
  Star,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Play
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

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const students = useCountUp(2000, 2000, statsVisible);
  const faculty = useCountUp(100, 2000, statsVisible);
  const years = useCountUp(15, 1500, statsVisible);
  const activities = useCountUp(50, 2000, statsVisible);

  const milestones = [
    { year: "2008", title: "Foundation", description: "Swastik Education Campus was established with a vision to provide quality education." },
    { year: "2012", title: "Expansion", description: "Added secondary school wing and modern science laboratories." },
    { year: "2016", title: "Recognition", description: "Received excellence award from Gujarat State Education Board." },
    { year: "2020", title: "Digital Era", description: "Launched smart classrooms and online learning platforms." },
    { year: "2024", title: "New Heights", description: "Expanded to 2000+ students with state-of-the-art facilities." },
  ];

  const leadership = [
    { name: "Dr. Ramesh Patel", role: "Founder & Chairman", image: null, description: "Visionary leader with 30+ years in education" },
    { name: "Mrs. Kavita Shah", role: "Principal", image: null, description: "M.Ed, Ph.D in Educational Leadership" },
    { name: "Mr. Amit Desai", role: "Vice Principal", image: null, description: "Specializes in curriculum development" },
    { name: "Mrs. Priya Mehta", role: "Academic Director", image: null, description: "Expert in innovative teaching methodologies" },
  ];

  const achievements = [
    { icon: Trophy, title: "100% Board Results", description: "Consistent 100% pass rate in board examinations" },
    { icon: Award, title: "State Level Champions", description: "Winners in multiple state-level competitions" },
    { icon: Star, title: "Best School Award", description: "Recognized as best school in Ahmedabad region" },
    { icon: GraduationCap, title: "Top University Placements", description: "Students placed in IITs, NITs, and top universities" },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Campus" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-8 md:py-0 relative z-10">
          <ScrollRevealSection>
            <div className="max-w-3xl">
              {/* <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                About Swastik Education Campus
              </span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Shaping Futures, <span className="text-sky-blue">Building Dreams</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                For over 15 years, we have been nurturing young minds with a perfect blend of 
                academic excellence, moral values, and holistic development at our state-of-the-art 
                campus near Narendra Modi Stadium, Ahmedabad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-orange group">
                  Schedule a Visit
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                <button className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Our Story
                </button>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-12 bg-white relative mt-4 md:-mt-6 mx-4 lg:mx-8 rounded-2xl shadow-xl z-20">
        <div ref={statsRef} className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-sky-blue mb-2">{students}+</p>
              <p className="text-muted-foreground font-medium">Happy Students</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-green mb-2">{faculty}+</p>
              <p className="text-muted-foreground font-medium">Expert Faculty</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-orange mb-2">{years}+</p>
              <p className="text-muted-foreground font-medium">Years of Excellence</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-red-accent mb-2">{activities}+</p>
              <p className="text-muted-foreground font-medium">Activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Our Story
                </span>
                <h2 className="section-title mb-6">A Legacy of Excellence Since 2008</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Swastik Education Campus was founded with a singular vision: to create an educational 
                  institution that combines the best of traditional values with modern teaching methodologies.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  What started as a small school with just 50 students has now grown into a comprehensive 
                  educational campus serving over 2,000 students from Early Years to Grade 10. Our journey 
                  has been marked by continuous innovation, unwavering commitment to quality, and a 
                  deep-rooted belief in the potential of every child.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Located near the iconic Narendra Modi Stadium in Ahmedabad, our campus boasts 
                  state-of-the-art facilities, including smart classrooms, advanced science labs, 
                  sports grounds, and dedicated spaces for arts and cultural activities.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: MapPin, text: "Prime Location" },
                    { icon: BookOpen, text: "Modern Curriculum" },
                    { icon: Users, text: "Expert Faculty" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-pale-gray px-4 py-2 rounded-full">
                      <item.icon className="h-4 w-4 text-sky-blue" />
                      <span className="text-sm font-medium text-navy">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image with floating elements */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img src={heroImage} alt="Our Campus" className="w-full h-[500px] object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-navy">100%</p>
                      <p className="text-sm text-muted-foreground">Board Results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Journey
              </span>
              <h2 className="section-title mb-4">Milestones That Define Us</h2>
              <p className="section-subtitle mx-auto">
                Key moments in our journey of educational excellence
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-sky-blue via-green to-orange rounded-full"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-12 justify-end ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className={`w-10/12 md:w-5/12 pl-0 text-left ${index % 2 === 0 ? 'md:pr-8 md:text-right md:pl-0' : 'md:pl-8 md:text-left'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <span className="text-sky-blue font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-heading font-bold text-navy text-xl mt-2 mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    {/* Center dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-sky-blue rounded-full z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-navy text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Mission & Vision</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Guiding principles that drive everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Mission */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-blue to-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Our Mission</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  To provide a transformative educational experience that develops intellectual curiosity, 
                  ethical leadership, and global citizenship. We are committed to fostering an environment 
                  where every student can discover their unique potential.
                </p>
                <ul className="space-y-3">
                  {["Nurture critical thinking", "Foster creativity", "Build strong character", "Prepare global citizens"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange to-red-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Our Vision</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  To be recognized as a leading educational institution that sets the benchmark for 
                  academic excellence, character development, and innovation in teaching. We envision 
                  empowering learners to lead with compassion.
                </p>
                <ul className="space-y-3">
                  {["Excellence in education", "Innovation in teaching", "Character development", "Community leadership"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <CheckCircle className="h-4 w-4 text-orange flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              {/* <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                What We Stand For
              </span> */}
              <h2 className="section-title mb-4">Our Core Values</h2>
              <p className="section-subtitle mx-auto">
                The principles that guide our educational philosophy
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Heart, title: "Compassion", description: "Nurturing empathy in all", color: "from-red-accent to-orange" },
                { icon: Star, title: "Excellence", description: "Striving for the best", color: "from-sky-blue to-green" },
                { icon: Users, title: "Integrity", description: "Honesty in action", color: "from-green to-sky-blue" },
                { icon: BookOpen, title: "Innovation", description: "Embracing new ideas", color: "from-orange to-red-accent" },
              ].map((value, index) => (
                <div key={index} className="group text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Meet Our Team
              </span>
              <h2 className="section-title mb-4">Leadership Team</h2>
              <p className="section-subtitle mx-auto">
                Experienced educators dedicated to student success
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-sky-blue to-green flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                    {leader.image ? (
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold text-white">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-1">{leader.name}</h3>
                  <p className="text-sky-blue font-medium text-sm mb-2">{leader.role}</p>
                  <p className="text-muted-foreground text-sm">{leader.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Pride
              </span>
              <h2 className="section-title mb-4">Achievements & Recognition</h2>
              <p className="section-subtitle mx-auto">
                Milestones that reflect our commitment to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-pale-blue to-white rounded-2xl p-6 border border-sky-blue/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-sky-blue/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-sky-blue/20 transition-colors">
                    <achievement.icon className="h-7 w-7 text-sky-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-white text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  From the Principal's Desk
                </span>
                <h2 className="section-title">A Message of Welcome</h2>
              </div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-5">
                  {/* Principal Image */}
                  <div className="md:col-span-2 bg-gradient-to-br from-navy to-navy-dark p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-40 h-40 rounded-full bg-white/10 border-4 border-white/30 flex items-center justify-center mb-4">
                      <span className="text-5xl font-bold text-white">KS</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-1">Mrs. Kavita Shah</h3>
                    <p className="text-sky-blue font-medium">Principal</p>
                    <p className="text-white/60 text-sm mt-2">M.Ed, Ph.D in Education</p>
                  </div>

                  {/* Message */}
                  <div className="md:col-span-3 p-8 md:p-12 relative">
                    <Quote className="absolute top-6 right-6 h-16 w-16 text-sky-blue/10" />
                    <blockquote className="text-lg text-navy leading-relaxed mb-6 italic relative z-10">
                      "At Swastik Education Campus, we believe that education is not merely about academic 
                      achievement, but about developing well-rounded individuals who can contribute positively 
                      to society. Our commitment to excellence, combined with our nurturing environment, ensures 
                      that every child who walks through our doors receives the guidance and support they need 
                      to flourish and achieve their highest potential."
                    </blockquote>
                    <p className="text-muted-foreground leading-relaxed">
                      I invite you to visit our campus and experience firsthand the warm, inclusive atmosphere 
                      that makes Swastik Education Campus a special place to learn and grow. Together, let us 
                      shape the future of your child.
                    </p>
                    <div className="mt-6">
                      <Link to="/contact" className="btn-sky">
                        <Calendar className="h-4 w-4" />
                        Schedule a Meeting
                      </Link>
                    </div>
                  </div>
                </div>
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
                Ready to Join the Swastik Family?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Take the first step towards a brighter future for your child. Schedule a campus tour 
                or apply for admission today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/admissions" className="bg-white text-navy px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-navy hover:text-white inline-flex items-center gap-2 group">
                  Apply Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default About;
