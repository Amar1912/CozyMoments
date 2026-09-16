'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBooking from '@/components/shared/SearchBooking';
import RoomCard from '@/components/shared/RoomCard';
import CityCard from '@/components/shared/CityCard';
import { rooms, cities } from '@/data/mock';

export default function Home() {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 pb-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop"
            alt="Premium Room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white mb-12"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest">Premium Hourly Stays</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Your Private Moment <br />
              <span className="text-accent italic font-light">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8 max-w-xl">
              Beautiful private spaces, flexible hourly booking and memorable experiences — designed around your time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/rooms">
                <Button size="lg" className="h-14 px-8 text-base font-bold rounded-2xl">Explore Rooms</Button>
              </Link>
              <Link href="/experiences">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-2xl bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10">View Experiences</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-12"
          >
            <SearchBooking />
          </motion.div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Cozy Moments Near You</h2>
              <p className="text-muted-foreground">Discover premium spaces in your city and beyond.</p>
            </div>
            <Link href="/cities">
              <Button variant="ghost" className="group">
                View all cities <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <CityCard city={city} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Redefining Private Stays</h2>
            <p className="text-muted-foreground">We focus on what matters most: your privacy, comfort, and time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Discreet check-ins and highly private rooms. Your comfort and anonymity are our top priorities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hourly Convenience</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pay only for the time you need. Flexible booking from 1 to 24 hours to match your schedule.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Spaces</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every property is personally verified for cleanliness, safety, and premium hospitality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Space</h2>
              <p className="text-muted-foreground">Choose a room that matches your mood, time and budget.</p>
            </div>
            <Link href="/rooms">
              <Button variant="ghost" className="group">
                View all rooms <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room, idx) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-neutral-900 text-white rounded-[40px] mx-6 md:mx-12 my-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">4 Simple Steps to Your Moment</h2>
            <p className="text-neutral-400">Booking a private space has never been this elegant and easy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: '01', title: 'Choose Your Space', desc: 'Browse through our premium collection of cozy, premium and signature rooms.' },
              { num: '02', title: 'Select Your Time', desc: 'Choose your check-in time and duration. Flexibility at its best.' },
              { num: '03', title: 'Customize', desc: 'Add decorations, food or photography to make your experience special.' },
              { num: '04', title: 'Enjoy Your Moment', desc: 'Arrive at the property and enjoy your private time without any worries.' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <span className="text-7xl font-bold text-white/5 absolute -top-10 left-0 leading-none">{step.num}</span>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-accent" /> {step.title}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/booking">
              <Button size="lg" variant="accent" className="h-14 px-12 rounded-2xl font-bold text-primary">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-accent/10 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Turn Your Unused Space Into Income</h2>
              <p className="text-muted-foreground mb-8">
                Join our network of premium property partners. We help you increase room utilization and revenue with our growing community of guests.
              </p>
              <Link href="/partner">
                <Button size="lg" className="rounded-2xl h-14 px-8">Become a Partner</Button>
              </Link>
            </div>
            <div className="relative w-full lg:w-1/3 aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973cf0f32e7?q=80&w=800&auto=format&fit=crop"
                alt="Partner Partnership"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
