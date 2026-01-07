import { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  ArrowRight, 
  Search,
  Clock,
  Trophy,
  Bell,
  Newspaper,
  PartyPopper,
  ChevronRight,
  Mail,
  MapPin,
  Tag,
  Loader2
} from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import { achievementsAPI } from "@/services/api";

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

interface AchievementItem {
  id: number;
  title: string;
  type: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  is_featured: boolean;
  created_at: string;
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setIsLoading(true);
    try {
      const response = await achievementsAPI.getAll();
      setAchievements(response.data);
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAchievements = achievements.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const featuredAchievement = achievements.find(item => item.is_featured);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="News" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Our <span className="text-sky-blue">Achievements</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Celebrating excellence and success stories from Swastik Education Campus.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>


      {isLoading ? (
        <section className="py-20 bg-white">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-navy animate-spin mb-4" />
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          {featuredAchievement && !searchQuery && (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <ScrollRevealSection>
                  <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                      <div className="aspect-video lg:aspect-auto">
                        <img 
                          src={featuredAchievement.image_url || heroImage} 
                          alt={featuredAchievement.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <span className="inline-flex items-center gap-2 bg-orange text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 w-fit">
                          <Bell className="h-4 w-4" />
                          Featured
                        </span>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                          {featuredAchievement.title}
                        </h2>
                        <p className="text-white/80 mb-6 leading-relaxed">
                          {featuredAchievement.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-white/70 text-sm mb-6">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredAchievement.created_at)}
                          </span>
                        </div>
                        <button 
                          onClick={() => setSelectedAchievement(featuredAchievement)}
                          className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-full font-semibold hover:bg-pale-gray transition-colors w-fit"
                        >
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

          {/* News Grid - Full Width */}
          <section className="py-16 bg-pale-gray">
            <div className="container mx-auto px-4">
              <ScrollRevealSection>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-heading font-bold text-navy">
                    Latest Achievements
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {filteredAchievements.length} {filteredAchievements.length === 1 ? "result" : "results"}
                  </span>
                </div>

                {filteredAchievements.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.filter(item => !item.is_featured || searchQuery).map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <article 
                          key={item.id} 
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={item.image_url || heroImage}
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
                              {formatDate(item.created_at)}
                            </div>
                            <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-sky-blue transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <button 
                              onClick={() => setSelectedAchievement(item)}
                              className="inline-flex items-center gap-2 text-sky-blue font-medium text-sm hover:gap-3 transition-all"
                            >
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
              </ScrollRevealSection>
            </div>
          </section>
        </>
      )}

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

      {/* News Detail Modal */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedAchievement(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            {selectedAchievement.image_url && (
              <div className="relative aspect-video">
                <img 
                  src={selectedAchievement.image_url} 
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent rounded-t-3xl" />
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${getTypeColor(selectedAchievement.type)}`}>
                  {selectedAchievement.type}
                </span>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8">
              {/* Close button */}
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <svg className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!selectedAchievement.image_url && (
                <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${getTypeColor(selectedAchievement.type)}`}>
                  {selectedAchievement.type}
                </span>
              )}

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">
                {selectedAchievement.title}
              </h2>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedAchievement.created_at)}
                </span>
              </div>

              {/* Content */}
              <div className="prose prose-navy max-w-none">
                <p className="text-lg text-navy font-medium mb-4">{selectedAchievement.excerpt}</p>
                {selectedAchievement.content && (
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedAchievement.content}
                  </div>
                )}
              </div>

              {/* Close button at bottom */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <button 
                  onClick={() => setSelectedAchievement(null)}
                  className="bg-navy text-white px-8 py-3 rounded-full font-semibold hover:bg-navy-dark transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Achievements;
