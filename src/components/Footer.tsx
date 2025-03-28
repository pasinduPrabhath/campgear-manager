
import { Link } from "react-router-dom";
import { Tent, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tent className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CampGear</span>
            </div>
            <p className="text-muted-foreground">
              Quality camping equipment rentals for your outdoor adventures.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="text-muted-foreground hover:text-primary">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/equipment?category=tent" className="text-muted-foreground hover:text-primary">
                  Tents
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=hammock" className="text-muted-foreground hover:text-primary">
                  Hammocks
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=torch" className="text-muted-foreground hover:text-primary">
                  Lighting
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=other" className="text-muted-foreground hover:text-primary">
                  Other Gear
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <address className="text-muted-foreground not-italic">
              <p>123 Outdoor Avenue</p>
              <p>Adventure City, AC 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@campgear.com</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CampGear Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
