import { Phone, Mail, MapPin } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-navy text-white py-2 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+917096255075" 
              className="flex items-center gap-2 hover:text-sky-blue transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>7096 25 50 75</span>
            </a>
            <a 
              href="mailto:swastikmotera@gmail.com" 
              className="flex items-center gap-2 hover:text-sky-blue transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>swastikmotera@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-3.5 w-3.5" />
            <span>Swastik Education Campus, Narendra Modi Stadium Road, Motera, Ahmedabad, Gujarat 380005</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;