import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="animate-fade-in">
            <img
              src={logo}
              alt="Swastik Education Campus"
              className="h-20 w-auto mb-4"
            />
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Empowering minds and building futures through excellence in education since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-delay-1">
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Academics", path: "/academics" },
                { name: "Admissions", path: "/admissions" },
                { name: "News & Events", path: "/news" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-delay-2">
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/80 group">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-accent" />
                <span className="group-hover:text-secondary-foreground transition-colors">
                  Swastik Education Campus, Narendra Modi Stadium Road, Motera, Ahmedabad
                </span>
              </li>
              <li>
                <a 
                  href="tel:+917096255075" 
                  className="flex items-center gap-3 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Phone size={18} className="text-accent" />
                  <span>7096 25 50 75 | 079-27574160</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:swastikmotera@gmail.com" 
                  className="flex items-center gap-3 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Mail size={18} className="text-accent" />
                  <span>swastikmotera@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="animate-fade-in-delay-3">
            <h4 className="font-serif text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/swastikcampus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/917096255075"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:swastikmotera@gmail.com"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-secondary-foreground/60 text-sm">
                Instagram: @swastikcampus
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            © {new Date().getFullYear()} Swastik Education Campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
