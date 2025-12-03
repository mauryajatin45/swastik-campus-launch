import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We will get back to you shortly.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Get in Touch</span>
          <h1 className="section-title mt-4">Contact Us</h1>
          <p className="section-subtitle mx-auto mt-4">
            We'd love to hear from you. Reach out for admissions inquiries, campus visits, or any questions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-secondary mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="btn-primary inline-flex items-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-secondary mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Swastik Education Campus<br />
                      Near Motera Stadium, Motera<br />
                      Ahmedabad, Gujarat 380005
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      Main Office: +91 79 XXXX XXXX<br />
                      Admissions: +91 79 XXXX XXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      General: info@swastikeducation.in<br />
                      Admissions: admissions@swastikeducation.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 4:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1671088461547!2d72.5249!3d23.1003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzAxLjEiTiA3MsKwMzEnMjkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Swastik Education Campus Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-semibold text-secondary-foreground mb-2">
                Ready to Visit?
              </h3>
              <p className="text-secondary-foreground/80">
                Schedule a campus tour and experience our facilities firsthand.
              </p>
            </div>
            <a href="tel:+917900000000" className="btn-primary whitespace-nowrap">
              Call Now: +91 79 XXXX XXXX
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
