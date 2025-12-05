import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const quickLinks = [
    { path: "/about", label: "About Us" },
    { path: "/academics", label: "Academics" },
    { path: "/admissions", label: "Admissions" },
    { path: "/gallery", label: "Gallery" },
    { path: "/news", label: "News & Events" },
    { path: "/contact", label: "Contact Us" },
  ];

  const programs = [
    { path: "/academics", label: "Early Years" },
    { path: "/academics", label: "Primary School" },
    { path: "/academics", label: "Secondary School" },
    { path: "/academics", label: "English Medium" },
    { path: "/academics", label: "Gujarati Medium" },
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Newsletter Section */}
      <div className="bg-navy-dark py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-xl mb-1">Stay Connected</h3>
              <p className="text-white/70">Subscribe to our newsletter for updates and news</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full bg-white text-navy flex-1 md:w-72 focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
              <button type="submit" className="btn-green">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Swastik Education Campus" className="h-16 w-auto" />
              </Link>
              <p className="text-white/70 mb-6">
                Empowering minds and building futures through quality education since 2009.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "https://instagram.com/swastikcampus" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-sky-blue hover:border-sky-blue transition-all"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-sky-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Our Programs</h4>
              <ul className="space-y-3">
                {programs.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-sky-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+917096255075"
                    className="flex items-start gap-3 text-white/70 hover:text-sky-blue transition-colors"
                  >
                    <Phone className="h-5 w-5 mt-0.5 text-sky-blue" />
                    <span>
                      <span className="block">7096 25 50 75</span>
                      <span className="text-sm">079-27574160</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:swastikmotera@gmail.com"
                    className="flex items-center gap-3 text-white/70 hover:text-sky-blue transition-colors"
                  >
                    <Mail className="h-5 w-5 text-sky-blue" />
                    swastikmotera@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/70">
                    <MapPin className="h-5 w-5 mt-0.5 text-sky-blue flex-shrink-0" />
                    <span>
                      Swastik Education Campus,<br />
                      Narendra Modi Stadium Road,<br />
                      Motera, Ahmedabad
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Swastik Education Campus. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-sky-blue transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-sky-blue transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;