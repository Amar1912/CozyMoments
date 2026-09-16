'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Clock, Heart, Users, MapPin, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Story</h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Cozy Moments was born from a simple observation: modern urban life moves fast, and everyone needs a private space to pause, reflect, and connect — on their own schedule.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent" />
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 italic text-primary">"Designed Around Your Time"</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe that premium hospitality should be accessible whenever you need it. Whether it's a couple looking for a private date, a traveler needing a short rest, or a professional looking for a quiet space, Cozy Moments provides the perfect environment.
              </p>
              <div className="space-y-4">
                {[
                  'Privacy-first booking platform',
                  'Flexible hourly stays',
                  'Curated premium experiences',
                  'Personally verified properties'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-3">
              <Image
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
                alt="Cozy Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">4+</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Cities</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">42+</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Properties</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">12k+</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Bookings</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Happy Guests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-20">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary/5 rounded-[32px] flex items-center justify-center mx-auto text-primary">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Absolute Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your private life is your own. We provide the discrete infrastructure to ensure your moments stay yours.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-accent/20 rounded-[32px] flex items-center justify-center mx-auto text-primary">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Time Sovereignty</h3>
              <p className="text-muted-foreground leading-relaxed">
                Why pay for 24 hours when you only need 3? We return control of your time and your wallet to you.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-red-50 rounded-[32px] flex items-center justify-center mx-auto text-red-600">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every space listed on our platform undergoes a rigorous 50-point quality check before it goes live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
