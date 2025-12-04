import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Academics", path: "/academics" },
  { name: "Admissions", path: "/admissions" },
  { name: "News", path: "/news" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/98 backdrop-blur-md shadow-sm" 
          : "bg-background/95 backdrop-blur-sm"
      } border-b border-border`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Swastik Education Campus Logo"
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="font-serif text-secondary text-lg font-semibold leading-tight">
                Swastik Education Campus
              </h1>
              <p className="text-muted-foreground text-xs">Motera, Ahmedabad</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "active text-primary" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-secondary hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link py-3 px-4 rounded-lg hover:bg-muted transition-all duration-200 ${
                    location.pathname === link.path ? "active text-primary bg-muted" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
