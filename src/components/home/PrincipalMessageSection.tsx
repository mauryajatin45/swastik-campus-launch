import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ScrollRevealSection } from "./hooks";
// Importing assets
import img1 from "@/assets/1.JPG";
import img2 from "@/assets/2.JPG";
import img3 from "@/assets/3.JPG";
import img4 from "@/assets/4.JPG";
import img5 from "@/assets/5.JPG";
import img6 from "@/assets/6.JPG";
import img7 from "@/assets/7.JPG";
import img8 from "@/assets/8.JPG";
import img9 from "@/assets/9.JPG";

const carouselImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const PrincipalMessageSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Auto-play functionality
    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds

    return () => {
      clearInterval(autoplayInterval);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-20 bg-navy overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollRevealSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Carousel Section */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {carouselImages.map((src, index) => (
                      <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
                        <div className="aspect-[4/3] w-full relative">
                          <img
                            src={src}
                            alt={`Swastik Campus Life ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-60" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === selectedIndex
                          ? "bg-orange w-8"
                          : "bg-white/50 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Decorative blob behind */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-sky-blue/20 blur-3xl rounded-full" />
            </div>

            {/* Content */}
            <div className="text-white">
              <span className="inline-block bg-white/10 text-sky-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Message from Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
                Building Tomorrow's Leaders Today
              </h2>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                "At Swastik Education Campus, we believe every child has unlimited potential. 
                Our mission is to provide an environment where students can discover their 
                strengths, develop their character, and prepare for a successful future."
              </p>
              <p className="text-white/60 mb-8 text-base font-light">
                Our dedicated team of educators works tirelessly to ensure that each student 
                receives personalized attention and guidance on their educational journey.
              </p>
              
              {/* Removed Watch Video button as requested */}
            </div>
          </div>
        </ScrollRevealSection>
      </div>

      {/* Spacer for padding bottom */}
      <div className="h-8"></div>

      {/* Wave Shape Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white wave-top" />
    </section>
  );
};

export default PrincipalMessageSection;
