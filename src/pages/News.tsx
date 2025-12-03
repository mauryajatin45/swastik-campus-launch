import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    type: "News",
    title: "Annual Day Celebration 2024",
    date: "December 15, 2024",
    excerpt: "Our Annual Day celebration showcased the incredible talents of our students through cultural performances, drama, and exhibitions.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
  {
    type: "News",
    title: "Outstanding Board Results",
    date: "November 28, 2024",
    excerpt: "Swastik Education Campus students achieve 100% pass rate in Board examinations with multiple students scoring above 90%.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    type: "Event",
    title: "Science Exhibition 2025",
    date: "January 20, 2025",
    excerpt: "Join us for our annual Science Exhibition featuring innovative projects by students from all grades. Parents and visitors welcome.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
  },
  {
    type: "Event",
    title: "Sports Day 2025",
    date: "February 8, 2025",
    excerpt: "Annual Sports Day celebrations with inter-house competitions, athletics, and team sports events for all students.",
    image: "https://images.unsplash.com/photo-1461896836934- voices-03b6b0?w=600&h=400&fit=crop",
  },
  {
    type: "News",
    title: "New Computer Lab Inauguration",
    date: "October 5, 2024",
    excerpt: "State-of-the-art computer laboratory with 40 workstations inaugurated to enhance digital learning capabilities.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    type: "Event",
    title: "Parent-Teacher Meeting",
    date: "January 25, 2025",
    excerpt: "Quarterly parent-teacher meeting to discuss student progress and academic planning for the upcoming term.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
  },
];

const News = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Stay Updated</span>
          <h1 className="section-title mt-4">News & Events</h1>
          <p className="section-subtitle mx-auto mt-4">
            Keep up with the latest happenings, achievements, and upcoming events at Swastik Education Campus.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium">
              All
            </button>
            <button className="px-6 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
              News
            </button>
            <button className="px-6 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
              Events
            </button>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <article key={index} className="card-elevated overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "Event" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {item.type}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <button className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-secondary-foreground mb-6">
            Stay Connected
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive updates about school events and announcements.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/50 border border-secondary-foreground/20 focus:outline-none focus:border-accent"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default News;
