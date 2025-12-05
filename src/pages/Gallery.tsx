import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  Camera,
  Video,
  Building,
  PartyPopper,
  Dumbbell,
  Palette,
  ArrowRight,
  Images,
  Play
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

const galleryImages = [
  { id: 1, category: "Campus", src: heroImage, title: "Main Building", featured: true },
  { id: 2, category: "Campus", src: heroImage, title: "Modern Classrooms" },
  { id: 3, category: "Events", src: heroImage, title: "Annual Day Performance" },
  { id: 4, category: "Campus", src: heroImage, title: "Library" },
  { id: 5, category: "Sports", src: heroImage, title: "Sports Day" },
  { id: 6, category: "Campus", src: heroImage, title: "Science Laboratory" },
  { id: 7, category: "Events", src: heroImage, title: "Graduation Ceremony" },
  { id: 8, category: "Campus", src: heroImage, title: "Computer Lab" },
  { id: 9, category: "Events", src: heroImage, title: "Science Exhibition" },
  { id: 10, category: "Activities", src: heroImage, title: "Art Room" },
  { id: 11, category: "Events", src: heroImage, title: "Cultural Program" },
  { id: 12, category: "Sports", src: heroImage, title: "Football Ground" },
  { id: 13, category: "Campus", src: heroImage, title: "Auditorium" },
  { id: 14, category: "Activities", src: heroImage, title: "Music Class" },
  { id: 15, category: "Sports", src: heroImage, title: "Basketball Court" },
  { id: 16, category: "Events", src: heroImage, title: "Republic Day" },
];

const categories = [
  { id: "All", label: "All Photos", icon: Images, count: 16 },
  { id: "Campus", label: "Campus", icon: Building, count: 6 },
  { id: "Events", label: "Events", icon: PartyPopper, count: 5 },
  { id: "Sports", label: "Sports", icon: Dumbbell, count: 3 },
  { id: "Activities", label: "Activities", icon: Palette, count: 2 },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setCurrentIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Gallery" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="max-w-3xl text-center mx-auto">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                <Camera className="inline h-4 w-4 mr-2" />
                Explore Our Campus
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Campus <span className="text-sky-blue">Gallery</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                A visual journey through our world-class facilities, memorable events, 
                and the vibrant life at Swastik Education Campus.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Category Stats */}
      <section className="py-6 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${
                  activeFilter === cat.id
                    ? "bg-navy text-white shadow-lg"
                    : "bg-pale-gray text-navy hover:bg-pale-blue"
                }`}
              >
                <cat.icon className="h-5 w-5" />
                <span className="font-medium">{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === cat.id ? "bg-white/20" : "bg-navy/10"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-pale-gray">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                    image.featured && activeFilter === "All" ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  onClick={() => openLightbox(image)}
                >
                  <div className={`aspect-square ${image.featured && activeFilter === "All" ? "md:aspect-auto md:h-full" : ""}`}>
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block bg-sky-blue text-white text-xs px-2 py-1 rounded-full mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-white font-heading font-bold text-lg">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-white text-navy px-8 py-3 rounded-full font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors inline-flex items-center gap-2">
                Load More Photos
                <Images className="h-4 w-4" />
              </button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-pale-blue text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Video className="inline h-4 w-4 mr-2" />
                Watch & Explore
              </span>
              <h2 className="section-title mb-4">Campus Virtual Tour</h2>
              <p className="section-subtitle mx-auto">
                Take a virtual tour of our campus and experience our world-class facilities
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden aspect-video bg-navy group cursor-pointer">
                <img src={heroImage} alt="Campus Tour" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-navy ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy to-transparent">
                  <h3 className="text-white font-heading font-bold text-xl">Campus Tour 2024</h3>
                  <p className="text-white/70 text-sm">Explore our facilities, classrooms, and more</p>
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
                Experience Our Campus In Person
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Pictures can only show so much. Schedule a campus visit and experience 
                our world-class facilities firsthand.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-orange group">
                  Schedule a Visit
                  <ArrowRight className="h-4 w-4 arrow-slide" />
                </Link>
                <Link to="/admissions" className="border-2 border-white text-white px-6 py-3 font-semibold text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-navy inline-flex items-center gap-2">
                  Apply Now
                </Link>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div 
            className="max-w-5xl w-full animate-fade-in" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-6">
              <span className="inline-block bg-sky-blue text-white text-sm px-3 py-1 rounded-full mb-2">
                {selectedImage.category}
              </span>
              <h3 className="text-white font-heading text-2xl font-bold">
                {selectedImage.title}
              </h3>
              <p className="text-white/50 text-sm mt-2">
                {currentIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
