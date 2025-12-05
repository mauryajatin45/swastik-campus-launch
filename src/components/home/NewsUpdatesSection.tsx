import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { ScrollRevealSection } from "./hooks";
import heroImage from "@/assets/hero-campus.jpg";

// Sample news data - replace with actual data later
const newsItems = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    excerpt: "Students showcased their athletic talents in various sports events including track and field, team sports, and individual competitions.",
    image: heroImage,
    date: "Dec 1, 2024",
    category: "News",
  },
  {
    id: 2,
    title: "Science Exhibition Winners",
    excerpt: "Our students won multiple awards at the district-level science exhibition with innovative projects on renewable energy and robotics.",
    image: heroImage,
    date: "Nov 25, 2024",
    category: "Activities",
  },
];

// Sample events data - these will auto-scroll
const eventsItems = [
  { id: 1, title: "Parent-Teacher Meeting", date: "Dec 15, 2024", image: heroImage },
  { id: 2, title: "Christmas Celebration", date: "Dec 23, 2024", image: heroImage },
  { id: 3, title: "Annual Day Function", date: "Jan 10, 2025", image: heroImage },
  { id: 4, title: "Republic Day Celebration", date: "Jan 26, 2025", image: heroImage },
  { id: 5, title: "Science Fair 2025", date: "Feb 5, 2025", image: heroImage },
  { id: 6, title: "Holi Celebration", date: "Mar 14, 2025", image: heroImage },
];

const NewsUpdatesSection = () => {
  return (
    <section className="py-20 bg-pale-gray relative overflow-hidden">
      {/* Decorative diagonal stripes on left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-64 opacity-20">
        <div className="w-full h-full flex flex-col gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full h-4 bg-sky-blue -skew-y-12 origin-left"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* News and Activities - Left Side (2/3) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-8">
                News and Activities
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-navy text-lg mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <Link
                        to="/news"
                        className="inline-flex items-center gap-2 bg-sky-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-blue-dark transition-colors"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                      
                      {/* Date and Category */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                        <span>{item.date}</span>
                        <span>/</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* See All Button */}
              <div className="text-center">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 bg-sky-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-blue-dark transition-colors"
                >
                  See All
                </Link>
              </div>
            </div>

            {/* Events - Right Side (1/3) with auto-scroll */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-8">
                Events
              </h2>
              
              {/* Auto-scrolling container */}
              <div className="bg-white rounded-2xl p-4 shadow-sm h-[400px] overflow-hidden relative">
                {/* Fade overlay top */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                
                {/* Scrolling content */}
                <div className="animate-scroll-up hover:pause-animation">
                  {/* Double the items for seamless loop */}
                  {[...eventsItems, ...eventsItems].map((event, index) => (
                    <div
                      key={`${event.id}-${index}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-pale-gray transition-colors cursor-pointer mb-2"
                    >
                      {/* Event Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-navy text-sm line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fade overlay bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
              </div>

              {/* See All Button */}
              <div className="text-center mt-6">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 bg-sky-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-blue-dark transition-colors"
                >
                  See All
                </Link>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;
