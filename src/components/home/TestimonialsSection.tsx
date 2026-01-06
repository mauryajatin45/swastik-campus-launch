import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { ScrollRevealSection, useScrollReveal, useCountUp } from "./hooks";

const testimonials = [
  {
    quote: "Swastik Education Campus has transformed my child's approach to learning. The teachers are incredibly dedicated and supportive.",
    author: "Priya Sharma",
    role: "Parent of Grade 5 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "The holistic development approach here is remarkable. My son has grown not just academically but also in sports and arts.",
    author: "Rajesh Patel",
    role: "Parent of Grade 8 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "I've seen tremendous growth in my daughter's confidence and communication skills since joining Swastik.",
    author: "Anita Mehta",
    role: "Parent of Grade 3 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "The school's focus on both academics and extracurricular activities has helped my child develop into a well-rounded individual.",
    author: "Vikram Singh",
    role: "Parent of Grade 7 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "Excellent infrastructure and caring staff. My children look forward to going to school every single day!",
    author: "Meera Joshi",
    role: "Parent of Grade 2 & 6 Students",
    image: null,
    rating: 5,
  },
  {
    quote: "The personalized attention each student receives here is unmatched. Truly a nurturing environment for young minds.",
    author: "Amit Desai",
    role: "Parent of Grade 4 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "My child has blossomed since joining Swastik. The extra-curricular activities and value-based education are exceptional.",
    author: "Kavita Rao",
    role: "Parent of Grade 1 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "The teachers go above and beyond to ensure each child understands the concepts. Highly recommend this school!",
    author: "Suresh Kumar",
    role: "Parent of Grade 9 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "Safe, clean, and nurturing environment. The school truly cares about the well-being of every student.",
    author: "Deepa Shah",
    role: "Parent of Grade 4 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "Outstanding faculty and modern teaching methods. My daughter loves her teachers and classmates!",
    author: "Rahul Verma",
    role: "Parent of Grade 6 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "The school has excellent sports facilities and encourages students to participate in various competitions.",
    author: "Neha Agarwal",
    role: "Parent of Grade 8 Student",
    image: null,
    rating: 5,
  },
  {
    quote: "We are grateful for the positive impact Swastik has had on our son. His academic performance has improved significantly.",
    author: "Manish Gupta",
    role: "Parent of Grade 12 Student",
    image: null,
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 3);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-pale-blue/30 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-green/10 text-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="section-title mb-4">What Parents Say</h2>
            <p className="section-subtitle mx-auto">
              Hear from the families who trust us with their children's education
            </p>
          </div>

          {/* Testimonial Cards Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {/* Render slides - each slide contains 3 cards */}
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                      {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, cardIndex) => (
                        <div
                          key={cardIndex}
                          className={`bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group ${cardIndex > 0 ? 'hidden md:block' : ''}`}
                        >
                          {/* Quote Icon */}
                          <Quote className="absolute top-4 right-4 h-8 w-8 text-sky-blue/20 group-hover:text-sky-blue/40 transition-colors" />
                          
                          {/* Stars Rating */}
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                            ))}
                          </div>
                          
                          {/* Quote */}
                          <p className="text-navy/80 mb-6 leading-relaxed text-sm md:text-base italic">
                            "{testimonial.quote}"
                          </p>
                          
                          {/* Author Info */}
                          <div className="flex items-center gap-4 pt-4 border-t border-border">
                            {/* Photo Placeholder */}
                            <div className="relative">
                              {testimonial.image ? (
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.author}
                                  className="w-14 h-14 rounded-full object-cover border-2 border-sky-blue/30"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-blue to-green flex items-center justify-center border-2 border-white shadow-md">
                                  <span className="text-white font-bold text-lg">
                                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              )}
                              {/* Online indicator */}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green rounded-full border-2 border-white"></div>
                            </div>
                            
                            <div>
                              <p className="font-heading font-bold text-navy text-sm">
                                {testimonial.author}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-blue hover:text-white transition-all duration-300 z-10 border border-border"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-blue hover:text-white transition-all duration-300 z-10 border border-border"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === currentTestimonial 
                    ? "bg-sky-blue w-10" 
                    : "bg-navy/20 w-3 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>

          {/* Trust Indicators with Animated Counters */}
          <TrustIndicators />
        </ScrollRevealSection>
      </div>
    </section>
  );
};

const TrustIndicators = () => {
  const { ref, isVisible } = useScrollReveal();
  const happyFamilies = useCountUp(500, 2000, isVisible);
  const rating = useCountUp(49, 1500, isVisible);
  const satisfaction = useCountUp(98, 2000, isVisible);
  
  return (
    <div 
      ref={ref}
      className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border"
    >
      <div className="text-center">
        <p className="text-3xl font-heading font-bold text-navy">{happyFamilies}+</p>
        <p className="text-muted-foreground text-sm">Happy Families</p>
      </div>
      <div className="w-px h-12 bg-border hidden md:block"></div>
      <div className="text-center">
        <p className="text-3xl font-heading font-bold text-navy">{(rating / 10).toFixed(1)}★</p>
        <p className="text-muted-foreground text-sm">Parent Rating</p>
      </div>
      <div className="w-px h-12 bg-border hidden md:block"></div>
      <div className="text-center">
        <p className="text-3xl font-heading font-bold text-navy">{satisfaction}%</p>
        <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
      </div>
    </div>
  );
};

export default TestimonialsSection;
