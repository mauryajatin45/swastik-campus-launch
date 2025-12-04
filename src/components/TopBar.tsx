import { Phone, Mail, MapPin } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 text-sm hidden md:block">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+917096255075"
              className="flex items-center gap-2 hover:text-accent transition-colors duration-300"
            >
              <Phone size={14} />
              <span>7096 25 50 75</span>
            </a>
            <a
              href="mailto:swastikmotera@gmail.com"
              className="flex items-center gap-2 hover:text-accent transition-colors duration-300"
            >
              <Mail size={14} />
              <span>swastikmotera@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Motera, Ahmedabad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
