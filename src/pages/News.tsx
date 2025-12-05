import { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  ArrowRight, 
  Search,
  Clock,
  Tag,
  Trophy,
  Bell,
  Newspaper,
  PartyPopper,
  ChevronRight,
  Mail,
  MapPin
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

const newsItems = [
  {
    id: 1,
    type: "News",
    title: "Annual Day Celebration 2024",
    date: "December 15, 2024",
    excerpt: "Our Annual Day celebration showcased the incredible talents of our students through cultural performances, drama, and exhibitions. Parents and guests were mesmerized by the colorful performances.",
    image: heroImage,
    featured: true,
  },
  {
    id: 2,
    type: "News",
    title: "Outstanding Board Results",
    date: "November 28, 2024",
    excerpt: "Swastik Education Campus students achieve 100% pass rate in Board examinations with multiple students scoring above 90%.",
    image: heroImage,
  },
  {
    id: 3,
    type: "Event",
    title: "Science Exhibition 2025",
    date: "January 20, 2025",
    excerpt: "Join us for our annual Science Exhibition featuring innovative projects by students from all grades. Parents and visitors welcome.",
    image: heroImage,
  },
  {
    id: 4,
    type: "Event",
    title: "Sports Day 2025",
    date: "February 8, 2025",
    excerpt: "Annual Sports Day celebrations with inter-house competitions, athletics, and team sports events for all students.",
    image: heroImage,
  },
  {
    id: 5,
    type: "News",
    title: "New Computer Lab Inauguration",
    date: "October 5, 2024",
    excerpt: "State-of-the-art computer laboratory with 40 workstations inaugurated to enhance digital learning capabilities.",
    image: heroImage,
  },
  {
    id: 6,
    type: "Activity",
    title: "Art & Craft Workshop",
    date: "December 10, 2024",
    excerpt: "Students participated in a creative art workshop learning pottery, origami, and painting techniques from expert artists.",
    image: heroImage,
  },
  {
    id: 7,
    type: "Event",
    title: "Parent-Teacher Meeting",
    date: "January 25, 2025",
    excerpt: "Quarterly parent-teacher meeting to discuss student progress and academic planning for the upcoming term.",
    image: heroImage,
  },
  {
    id: 8,
    type: "Achievement",
    title: "State Level Quiz Winners",
    date: "November 15, 2024",
    excerpt: "Our students won first place in the Gujarat State Level Quiz Competition, bringing pride to the school.",
    image: heroImage,
  },
];

const upcomingEvents = [
  { title: "Republic Day Celebration", date: "Jan 26, 2025", time: "9:00 AM" },
  { title: "Science Fair", date: "Feb 5, 2025", time: "10:00 AM" },
  { title: "Annual Sports Day", date: "Feb 8, 2025", time: "8:00 AM" },
  { title: "Holi Celebration", date: "Mar 14, 2025", time: "11:00 AM" },
];

const achievements = [
  "100% Board Results - Class 10",
  "State Level Quiz Champions",
  "Best School Award - Ahmedabad",
  "Science Exhibition Gold Medal",
];

const News = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "News", "Events", "Activities", "Achievements"];

  const filteredNews = newsItems.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.type === activeFilter || 
      (activeFilter === "Events" && item.type === "Event") ||
      (activeFilter === "Activities" && item.type === "Activity") ||
      (activeFilter === "Achievements" && item.type === "Achievement");
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredNews = newsItems.find(item => item.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Event": return PartyPopper;
      case "Achievement": return Trophy;
      case "Activity": return Tag;
      default: return Newspaper;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Event": return "bg-orange text-white";
      case "Achievement": return "bg-green text-white";
      case "Activity": return "bg-sky-blue text-white";
      default: return "bg-navy text-white";
    }
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="News" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="max-w-3xl">
              {/* <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                Stay Updated
              </span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                News & <span className="text-sky-blue">Events</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Keep up with the latest happenings, achievements, and upcoming events at Swastik Education Campus.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search news & events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-navy placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-blue"
                />
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-navy text-white"
                    : "bg-pale-gray text-navy hover:bg-pale-blue"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredNews && activeFilter === "All" && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <ScrollRevealSection>
              <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto">
                    <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-2 bg-orange text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 w-fit">
                      <Bell className="h-4 w-4" />
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                      {featuredNews.title}
                    </h2>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-sm mb-6">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {featuredNews.date}
                      </span>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-full font-semibold hover:bg-pale-gray transition-colors w-fit">
                      Read Full Story
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </section>
      )}

      {/* News Grid with Sidebar */}
      <section className="py-16 bg-pale-gray">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - News Grid */}
            <div className="lg:col-span-2">
              <ScrollRevealSection>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-heading font-bold text-navy">
                    {activeFilter === "All" ? "Latest Updates" : activeFilter}
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {filteredNews.length} {filteredNews.length === 1 ? "result" : "results"}
                  </span>
                </div>

                {filteredNews.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredNews.filter(item => !item.featured || activeFilter !== "All" || searchQuery).map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <article 
                          key={item.id} 
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getTypeColor(item.type)}`}>
                              <TypeIcon className="h-3 w-3" />
                              {item.type}
                            </span>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                              <Calendar className="h-4 w-4" />
                              {item.date}
                            </div>
                            <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-sky-blue transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <button className="inline-flex items-center gap-2 text-sky-blue font-medium text-sm hover:gap-3 transition-all">
                              Read More <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-navy text-xl mb-2">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                )}

                {/* Load More */}
                {filteredNews.length > 0 && (
                  <div className="text-center mt-10">
                    <button className="bg-white text-navy px-8 py-3 rounded-full font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors">
                      Load More
                    </button>
                  </div>
                )}
              </ScrollRevealSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <ScrollRevealSection>
                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange" />
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-pale-gray transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-pale-blue rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-sky-blue font-bold text-sm">{event.date.split(" ")[0]}</span>
                          <span className="text-sky-blue text-xs">{event.date.split(" ")[1]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy text-sm">{event.title}</h4>
                          <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveFilter("Events")}
                    className="w-full mt-4 text-center text-sky-blue font-medium text-sm hover:underline flex items-center justify-center gap-1"
                  >
                    View All Events <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-6 text-white mt-4">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-orange" />
                    Recent Achievements
                  </h3>
                  <ul className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="w-1.5 h-1.5 bg-orange rounded-full flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-dark">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-orange" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Stay Connected
              </h2>
              <p className="text-white/70 mb-8">
                Subscribe to our newsletter and never miss important updates about school events and announcements.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white text-navy placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange"
                />
                <button type="submit" className="bg-orange text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-light transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default News;
