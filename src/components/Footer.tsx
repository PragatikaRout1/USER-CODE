import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Products */}
          <div>
            <h3 className="font-heading font-bold text-sm mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Gen-4.5
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  GWM-1
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  All Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-heading font-bold text-sm mb-4">Research</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/research" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Latest Updates
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-sm mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Enterprise Sales
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-background transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2026 runwayml.com. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-background transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
