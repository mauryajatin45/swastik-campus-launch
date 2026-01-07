import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Building,
  GraduationCap,
  Calendar,
  HelpCircle,
  PhoneCall
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enquiryAPI } from "@/services/api";
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

const inquiryTypes = [
  { id: "admission", label: "Admission Inquiry", icon: GraduationCap },
  { id: "visit", label: "Schedule Campus Visit", icon: Building },
  { id: "general", label: "General Question", icon: HelpCircle },
  { id: "callback", label: "Request Callback", icon: Phone },
];

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "admission",
    medium: "",
    message: "",
  });

  const isAdmissionReady = formData.inquiryType === "admission" && formData.medium;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If admission inquiry with medium selected, save data then redirect to admission form
    if (isAdmissionReady) {
      try {
        // First, save the inquiry to database
        await enquiryAPI.submit({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: `Admission - ${formData.medium === 'english' ? 'English Medium' : 'Gujarati Medium'}`,
          message: `Admission inquiry - Preferred Medium: ${formData.medium}`,
        });
        
        // Then redirect to admission form with data
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          medium: formData.medium,
        });
        navigate(`/admission-form?${params.toString()}`);
      } catch (error) {
        console.error('Error submitting inquiry:', error);
        toast({
          title: "Error",
          description: "Failed to submit inquiry. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }
    
    // Otherwise, submit as regular contact message
    try {
      await enquiryAPI.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiry_type: formData.inquiryType,
        message: formData.message,
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We will get back to you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", inquiryType: "admission", medium: "", message: "" });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Contact" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy-dark/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-blue/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollRevealSection>
            <div className="max-w-3xl text-center mx-auto">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-green px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Contact <span className="text-green">Us</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                We'd love to hear from you. Reach out for admissions, campus visits, or any questions about Swastik Education Campus.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-8 bg-pale-gray relative -mt-12 mx-4 lg:mx-auto lg:max-w-5xl rounded-2xl shadow-xl z-20 border border-border">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          <a href="tel:+917096255075" className="flex items-center gap-4 p-6 hover:bg-pale-gray transition-colors group">
            <div className="w-14 h-14 bg-green/10 rounded-2xl flex items-center justify-center group-hover:bg-green/20 transition-colors">
              <Phone className="h-6 w-6 text-green" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call Us</p>
              <p className="font-heading font-bold text-navy">7096 25 50 75</p>
            </div>
          </a>
          <a href="mailto:swastikmotera@gmail.com" className="flex items-center gap-4 p-6 hover:bg-pale-gray transition-colors group">
            <div className="w-14 h-14 bg-sky-blue/10 rounded-2xl flex items-center justify-center group-hover:bg-sky-blue/20 transition-colors">
              <Mail className="h-6 w-6 text-sky-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Us</p>
              <p className="font-heading font-bold text-navy">swastikmotera@gmail.com</p>
            </div>
          </a>
          <a href="https://wa.me/917096255075" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 hover:bg-pale-gray transition-colors group">
            <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center group-hover:bg-orange/20 transition-colors">
              <MessageCircle className="h-6 w-6 text-orange" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <p className="font-heading font-bold text-navy">Chat with us</p>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollRevealSection>
                <div className="bg-pale-gray rounded-3xl p-8 md:p-10 shadow-sm">
                  <h2 className="text-2xl font-heading font-bold text-navy mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground mb-8">Fill in the form below and we'll get back to you shortly.</p>
                  
                  {/* Inquiry Type Selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-navy mb-3">What can we help you with?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            formData.inquiryType === type.id
                              ? "border-navy bg-navy text-white"
                              : "border-border bg-pale-gray text-navy hover:border-navy/30"
                          }`}
                        >
                          <type.icon className={`h-5 w-5 mx-auto mb-1 ${formData.inquiryType === type.id ? "text-white" : "text-navy"}`} />
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    
                    {/* Medium Selection - Only show for admission inquiries */}
                    {formData.inquiryType === "admission" && (
                      <div>
                        <label htmlFor="medium" className="block text-sm font-medium text-navy mb-2">
                          Preferred Medium
                        </label>
                        <select
                          id="medium"
                          name="medium"
                          value={formData.medium}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all cursor-pointer"
                        >
                          <option value="">Select Medium</option>
                          <option value="english">English Medium</option>
                          <option value="gujarati">Gujarati Medium</option>
                        </select>
                      </div>
                    )}
                    {/* Message field - hide for admission inquiries */}
                    {formData.inquiryType !== "admission" && (
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                    )}
                    <button type="submit" className="w-full md:w-auto bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-dark transition-colors inline-flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      {isAdmissionReady ? "Apply for Admission" : "Send Message"}
                    </button>
                  </form>
                </div>
              </ScrollRevealSection>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollRevealSection>
                {/* Address Card */}
                <div className="bg-pale-gray rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-navy mb-2">Our Location</h3>
                      <p className="text-muted-foreground">
                        Swastik Education Campus<br />
                        Narendra Modi Stadium Road,<br />
                        Motera, Ahmedabad, Gujarat 380005
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Swastik+Education+Campus+Motera+Ahmedabad" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-blue font-medium text-sm mt-3 hover:underline"
                      >
                        Get Directions <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div className="bg-pale-gray rounded-2xl p-6 shadow-sm mt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-navy mb-3">Office Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium text-navy">7:30 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium text-navy">7:30 AM - 3:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium text-red-accent">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-6 text-white mt-4">
                  <h3 className="font-heading font-bold mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/swastikcampus" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/share/17huAy1dU5/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/@swastikmotera" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1671088461547!2d72.5249!3d23.1003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzAxLjEiTiA3MsKwMzEnMjkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Swastik Education Campus Location"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
        
        {/* Map Overlay Card */}
        <div className="absolute top-8 left-8 bg-white rounded-2xl p-6 shadow-xl max-w-xs hidden md:block">
          <h3 className="font-heading font-bold text-navy mb-2">Swastik Education Campus</h3>
          <p className="text-muted-foreground text-sm mb-4">Narendra Modi Stadium Road, Motera, Ahmedabad, Gujarat 380005</p>
          <a 
            href="https://maps.google.com/?q=Swastik+Education+Campus+Motera+Ahmedabad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors"
          >
            <MapPin className="h-4 w-4" />
            Open in Maps
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <ScrollRevealSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                  Ready to Visit Our Campus?
                </h3>
                <p className="text-white/70">
                  Schedule a tour and experience our world-class facilities firsthand.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917096255075" className="bg-white text-navy px-6 py-3 font-semibold rounded-full hover:bg-pale-gray transition-colors inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <Link to="/admissions" className="btn-orange">
                  Apply for Admission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </main>
  );
};

export default Contact;
