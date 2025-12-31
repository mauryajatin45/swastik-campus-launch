import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onEnquireClick?: () => void;
}

const Header = ({ onEnquireClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/academics", label: "Academics" },
    { path: "/admissions", label: "Admissions" },
    { path: "/news", label: "News" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Swastik Education Campus"
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-navy text-lg leading-tight">
                Swastik Education
              </h1>
              <p className="text-xs text-muted-foreground">Campus, Motera</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "text-sky-blue active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917096255075"
              className="flex items-center gap-2 text-red-accent font-semibold text-sm hover:text-red-accent/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call Us</span>
            </a>
            <button onClick={onEnquireClick} className="btn-orange">
              Enquire Now
            </button>
            {/* <Link to="/admissions" className="btn-sky">
              Book a Tour
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-navy hover:text-sky-blue transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-pale-blue text-sky-blue font-medium"
                      : "text-navy hover:bg-pale-gray"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                <a
                  href="tel:+917096255075"
                  className="flex items-center gap-2 text-red-accent font-semibold py-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>7096 25 50 75</span>
                </a>
                <Link
                  to="/admissions"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-sky text-center justify-center"
                >
                  Book a Tour
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;