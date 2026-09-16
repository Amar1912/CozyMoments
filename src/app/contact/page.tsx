'use client';

import React from 'react';
import {
  Phone, Mail, MessageCircle, MapPin,
  Camera, Globe, Send, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're here to help you create perfect moments. Reach out to us for bookings, partnerships, or support.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-primary/5 rounded-[24px] flex items-center justify-center flex-shrink-0 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Call Us</h4>
                <p className="text-muted-foreground mb-1">Mon-Sun, 9am to 11pm</p>
                <a href="tel:+911234567890" className="text-lg font-bold hover:text-primary transition-colors">+91 12345 67890</a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-accent/20 rounded-[24px] flex items-center justify-center flex-shrink-0 text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">WhatsApp</h4>
                <p className="text-muted-foreground mb-1">Fastest support for active bookings</p>
                <a href="#" className="text-lg font-bold hover:text-primary transition-colors">Chat on WhatsApp</a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-neutral-100 rounded-[24px] flex items-center justify-center flex-shrink-0 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Email Us</h4>
                <p className="text-muted-foreground mb-1">For partnerships and general queries</p>
                <a href="mailto:hello@cozymoments.com" className="text-lg font-bold hover:text-primary transition-colors">hello@cozymoments.com</a>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">Follow Us</h4>
            <div className="flex space-x-4">
              {[Camera, Globe, Send].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="rounded-[40px] overflow-hidden border-none shadow-2xl bg-white">
            <CardContent className="p-8 md:p-12 space-y-6">
              <h3 className="text-2xl font-bold mb-4">Send a Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="h-14 rounded-2xl bg-neutral-50 border-neutral-100" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Mobile No.</label>
                  <Input placeholder="9876543210" className="h-14 rounded-2xl bg-neutral-50 border-neutral-100" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                <Input placeholder="your@email.com" className="h-14 rounded-2xl bg-neutral-50 border-neutral-100" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full rounded-2xl bg-neutral-50 border border-neutral-100 p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <Button className="w-full h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Typical response time: 30 minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-32 h-[400px] w-full rounded-[40px] bg-neutral-100 relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-4">
          <MapPin className="w-12 h-12 text-primary mx-auto opacity-20" />
          <p className="font-bold text-neutral-400">Interactive Map for Nashik Central HQ</p>
        </div>
        {/* In a real app, integrate Google Maps or Mapbox here */}
      </div>
    </div>
  );
}
