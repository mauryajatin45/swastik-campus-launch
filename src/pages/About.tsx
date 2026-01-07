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
import hanspuraCampus from "@/assets/hanspura-campus.jpg";
import campusBuilding from "@/assets/campus-building.jpg";

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

  const students = useCountUp(15000, 2000, statsVisible);
  const faculty = useCountUp(100, 2000, statsVisible);
  const years = useCountUp(25, 1500, statsVisible);
  const activities = useCountUp(50, 2000, statsVisible);

  const milestones = [
    { year: "2002", title: "Swastik Education Campus", description: "Our flagship campus established at Narendra Modi Stadium Road, marking the beginning of our educational journey." },
    { year: "2011", title: "Swastik Kidz – Branch 1", description: "First pre-school branch opened at Tejendra, Vastral, Bors Road, expanding our reach to nurture young minds from early years." },
    { year: "2012", title: "Noble Education Campus", description: "Established at Kathwada Road, strengthening our commitment to quality education across Ahmedabad." },
    { year: "2016", title: "Swastik Kidz – Branch 2", description: "Second pre-school branch at Madhav Bagh, Vastral, Bors Road, serving more families in the community." },
    { year: "2018", title: "Swastik Education Campus", description: "New campus opened at Bapunagar, Chawk, Nava Naroda, another milestone in our expansion." },
    { year: "2021", title: "Swastik Kidz – Branch 3", description: "Third pre-school branch at Pushp Villa, Vastral, continuing our mission of early childhood excellence." },
    { year: "2025", title: "Swastik Kidz – Branch 4", description: "Fourth pre-school branch opened at Pushpak, Viratnagar, expanding our reach to nurture more young learners." },
    { year: "2025", title: "Swastik Kidz – Branch 5", description: "Fifth pre-school branch at Amarjyot, Viratnagar, completing our network of 8 institutions across Ahmedabad." },
    { year: "2027", title: "Coming Soon in Hanspura", description: "Exciting new campus expansion coming to Hanspura! Stay tuned for updates on this next chapter of growth." },
  ];

  const [leadership, setLeadership] = useState<Array<{
    id?: number;
    name: string;
    role: string;
    image_url?: string | null;
    description: string;
  }>>([]);
  const [leadersLoading, setLeadersLoading] = useState(true);

  // Fetch leadership team
  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leadership');
        if (response.ok) {
          const data = await response.json();
          setLeadership(data);
        }
      } catch (error) {
        console.error('Error fetching leadership:', error);
      } finally {
        setLeadersLoading(false);
      }
    };
    fetchLeadership();
  }, []);


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
                For over 25 years, we have been nurturing young minds with a perfect blend of
                academic excellence, moral values, and holistic development at our state-of-the-art
                campus near Narendra Modi Stadium, Ahmedabad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-orange group">
                  Schedule a Visit
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                {/* <button className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Our Story
                </button> */}
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
              <p className="text-muted-foreground font-medium">Proud Students</p>
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
                <h2 className="section-title mb-6">A Legacy of Excellence Since 2002</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Swastik Education Campus was founded in 2002 with a singular vision: to create an educational
                  institution that combines the best of traditional values with modern teaching methodologies.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  From one campus to 8+ thriving institutions across Ahmedabad, we proudly educate 7,000+ students every year from Early Years to Grade 12. Now expanding to Hanspura, Naroda, we bring the CBSE curriculum to a future-ready campus with state-of-the-art infrastructure and world-class facilities—where excellence meets innovation.
                </p>

                {/* Timeline of Growth */}
                <div className="bg-pale-gray rounded-2xl p-6 mb-6">
                  <h3 className="font-heading font-bold text-navy text-lg mb-4">Our Journey of Growth</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2002:</span>
                      <span className="text-muted-foreground">Swastik Education Campus, Narendra Modi Stadium Road</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2011:</span>
                      <span className="text-muted-foreground">Swastik Kidz Branch 1, Tejendra, Vastral</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2012:</span>
                      <span className="text-muted-foreground">Noble Education Campus, Kathwada Road</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2016:</span>
                      <span className="text-muted-foreground">Swastik Kidz Branch 2, Madhav Bagh, Vastral</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2018:</span>
                      <span className="text-muted-foreground">Swastik Education Campus, Bapunagar, Nava Naroda</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2021:</span>
                      <span className="text-muted-foreground">Swastik Kidz Branch 3, Pushp Villa, Vastral</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2025:</span>
                      <span className="text-muted-foreground">Swastik Kidz Branch 4, Pushpak, Viratnagar</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sky-blue">2025:</span>
                      <span className="text-muted-foreground">Swastik Kidz Branch 5, Amarjyot, Viratnagar</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Located near the iconic Narendra Modi Stadium in Ahmedabad, our campuses boast
                  state-of-the-art facilities, including smart classrooms, advanced science labs,
                  sports grounds, and dedicated spaces for arts and cultural activities.
                </p>

                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: MapPin, text: "8 Campuses" },
                    { icon: BookOpen, text: "Modern Curriculum" },
                    { icon: Users, text: "7000+ Students Each Year" },
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
                  <img src={campusBuilding} alt="Our Campus" className="w-full h-[500px] object-cover" />
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

            {leadersLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading team members...</p>
              </div>
            ) : leadership.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No team members found.</p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                {leadership.map((leader, index) => (
                  <div key={leader.id || index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center group w-full sm:w-72">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-sky-blue to-green flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                      {leader.image_url ? (
                        <img src={leader.image_url} alt={leader.name} className="w-full h-full object-cover" />
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
            )}
          </ScrollRevealSection>
        </div>
      </section>
      {/* Timeline */}
      <section className="py-20 bg-pale-gray relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-accent/10 rounded-full blur-3xl"></div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
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

                {milestones.map((milestone, index) => {
                  const isLast = index === milestones.length - 1;
                  return (
                    <div key={index} className={`relative flex items-center mb-12 ${isLast ? 'justify-end md:justify-center' : `justify-end ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}`}>
                      <div className={`${isLast ? 'w-10/12 md:w-6/12 pl-0 text-left md:text-center' : `w-10/12 md:w-5/12 pl-0 text-left ${index % 2 === 0 ? 'md:pr-8 md:text-right md:pl-0' : 'md:pl-8 md:text-left'}`}`}>
                        <div className={`${isLast ? 'relative overflow-hidden min-h-[300px] flex flex-col justify-end' : ''} bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                          {isLast && (
                            <>
                              <div className="absolute inset-0 z-0">
                                <img src={hanspuraCampus} alt="Hanspura Campus" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              </div>
                              <div className="relative z-10 text-white">
                                <span className="text-sky-blue font-bold text-lg">{milestone.year}</span>
                                <h3 className="font-heading font-bold text-white text-xl mt-2 mb-2">{milestone.title}</h3>
                                <p className="text-white/90 text-sm">{milestone.description}</p>
                              </div>
                            </>
                          )}
                          {!isLast && (
                            <>
                              <span className="text-sky-blue font-bold text-lg">{milestone.year}</span>
                              <h3 className="font-heading font-bold text-navy text-xl mt-2 mb-2">{milestone.title}</h3>
                              <p className="text-muted-foreground text-sm">{milestone.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                      {/* Center dot - hide for last item */}
                      {!isLast && (
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-sky-blue rounded-full z-10"></div>
                      )}
                    </div>
                  );
                })}
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
                <Link
                  key={index}
                  to="/achievements"
                  className="block group bg-gradient-to-br from-pale-blue to-white rounded-2xl p-6 border border-sky-blue/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-sky-blue/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-sky-blue/20 transition-colors">
                    <achievement.icon className="h-7 w-7 text-sky-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </Link>
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

      {/* Coming Soon Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hanspuraCampus} alt="Hanspura Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy-dark/95 to-navy/95"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0tNCA0aDJ2MmgtMnYtMnptMC00aDJ2MmgtMnYtMnptMC00aDJ2MmgtMnYtMnptMC00aDJ2MmgtMnYtMnptLTQgNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 z-10"></div>

        <div className="container mx-auto px-4 relative z-20">
          <ScrollRevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-sky-blue/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border-2 border-sky-blue/30">
                <Calendar className="h-6 w-6 text-sky-blue animate-pulse" />
                <span className="font-heading font-bold text-sky-blue text-lg">Coming Soon</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Expanding to <span className="text-sky-blue">Hanspura</span>
              </h2>

              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                We're thrilled to announce our upcoming campus in Hanspura! Stay tuned for more updates on this exciting new chapter in our journey of educational excellence.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-sky-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-blue/90 transition-all duration-300 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                  Get Notified
                  <ArrowRight className="h-5 w-5" />
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