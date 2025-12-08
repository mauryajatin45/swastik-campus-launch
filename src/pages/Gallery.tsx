import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  Video,
  Building,
  PartyPopper,
  Dumbbell,
  Palette,
  ArrowRight,
  Images,
  Play,
  Loader2
} from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import { galleryAPI } from "@/services/api";

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

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  cloudinary_url: string;
  created_at: string;
}

const categories = [
  { id: "All", label: "All Photos", icon: Images },
  { id: "Campus", label: "Campus", icon: Building },
  { id: "Events", label: "Events", icon: PartyPopper },
  { id: "Sports", label: "Sports", icon: Dumbbell },
  { id: "Activities", label: "Activities", icon: Palette },
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch gallery images from API
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const response = await galleryAPI.getAll();
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Get category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "All") return galleryImages.length;
    return galleryImages.filter(img => img.category === categoryId).length;
  };

  const openLightbox = (image: GalleryImage) => {
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
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-4 md:flex md:flex-wrap md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 rounded-xl transition-all text-xs md:text-base ${
                  activeFilter === cat.id
                    ? "bg-navy text-white shadow-lg"
                    : "bg-pale-gray text-navy hover:bg-pale-blue"
                }`}
              >
                <cat.icon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-medium text-[10px] md:text-sm">{cat.id === "All" ? "All" : cat.label}</span>
                <span className={`hidden md:inline text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === cat.id ? "bg-white/20" : "bg-navy/10"
                }`}>
                  {getCategoryCount(cat.id)}
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-navy animate-spin mb-4" />
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-navy mb-2">No Photos Yet</h3>
                <p className="text-muted-foreground">Check back soon for campus photos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                      index === 0 && activeFilter === "All" ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                    onClick={() => openLightbox(image)}
                  >
                    <div className={`aspect-square ${index === 0 && activeFilter === "All" ? "md:aspect-auto md:h-full" : ""}`}>
                      <img
                        src={image.cloudinary_url}
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
            )}
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
              src={selectedImage.cloudinary_url}
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
