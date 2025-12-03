import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <img
              src="https://swastikeducationcampus.in/img/logo.png"
              alt="Swastik Education Campus"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Empowering minds and building futures through excellence in education since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Academics", "Admissions", "News & Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>Near Motera Stadium, Motera, Ahmedabad, Gujarat 380005</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Phone size={18} />
                <span>+91 79 XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Mail size={18} />
                <span>info@swastikeducation.in</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Social media link"
                >
                  <Icon size={18} />
                </a>
              ))}
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
