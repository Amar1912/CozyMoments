import React from 'react';
import Link from 'next/link';
import { Camera, Globe, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-16">
        {/* Changed grid-cols-1 to grid-cols-2 on small screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Brand Info (Spans both columns on mobile for better presentation, or keep single column) */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-primary">Cozy Moments</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Private • Hourly • Experiences. Beautiful spaces designed around your time. Providing premium hospitality for your most intimate moments.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Company Links (Left Section on mobile) */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-900">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/rooms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Rooms</Link></li>
              <li><Link href="/experiences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Experiences</Link></li>
              <li><Link href="/cities" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cities</Link></li>
              <li><Link href="/reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">Reviews</Link></li>
            </ul>
          </div>

          {/* Support Links (Right Section on mobile) */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-900">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/cancellation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Partners & Contact (Spans across both columns on mobile) */}
          <div className="col-span-2 lg:col-span-1 space-y-6 pt-4 lg:pt-0 border-t border-neutral-200 lg:border-t-0">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-900">For Partners</h4>
                <ul className="space-y-2">
                  <li><Link href="/partner" className="text-sm text-muted-foreground hover:text-primary transition-colors">Become a Partner</Link></li>
                  <li><Link href="/partner/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partner Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-neutral-900">Direct Contact</h4>
                <div className="space-y-2">
                  <a href="tel:+911234567890" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">+91 12345 67890</span>
                  </a>
                  <a href="mailto:hello@cozymoments.com" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">hello@cozymoments.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cozy Moments. All rights reserved. Designed for premium experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;