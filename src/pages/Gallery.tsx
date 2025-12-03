import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    title: "Main Building",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    title: "Classroom",
  },
  {
    category: "Events",
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&h=600&fit=crop",
    title: "Annual Day Performance",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",
    title: "Library",
  },
  {
    category: "Events",
    src: "https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?w=800&h=600&fit=crop",
    title: "Sports Day",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",
    title: "Science Lab",
  },
  {
    category: "Events",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    title: "Graduation Ceremony",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    title: "Computer Lab",
  },
  {
    category: "Events",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop",
    title: "Science Exhibition",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    title: "Art Room",
  },
  {
    category: "Events",
    src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=600&fit=crop",
    title: "Cultural Program",
  },
  {
    category: "Campus",
    src: "https://images.unsplash.com/photo-1564429238883-1cf13493df38?w=800&h=600&fit=crop",
    title: "Playground",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Explore</span>
          <h1 className="section-title mt-4">Campus Gallery</h1>
          <p className="section-subtitle mx-auto mt-4">
            A visual journey through our campus, facilities, and memorable events.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center gap-4">
            {["All", "Campus", "Events"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-secondary-foreground/70 text-xs uppercase tracking-wider">
                      {image.category}
                    </span>
                    <h3 className="text-secondary-foreground font-serif font-semibold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-secondary/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-secondary-foreground hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-6">
              <span className="text-secondary-foreground/70 text-sm uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="text-secondary-foreground font-serif text-2xl font-semibold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="section-title mb-6">Visit Our Campus</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Experience our facilities firsthand. Schedule a campus tour and see why Swastik Education Campus 
            is the right choice for your child's education.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Schedule a Visit
          </a>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
