'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import CityCard from '@/components/shared/CityCard';
import { cities } from '@/data/mock';

export default function CitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Cozy Moments Near You</h1>
        <p className="text-muted-foreground text-lg">
          We are rapidly expanding to bring premium private spaces to every corner of India.
          Currently serving Nashik with Pune, Mumbai, and Indore joining soon.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cities.map((city, idx) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CityCard city={city} />
          </motion.div>
        ))}
      </div>

      {/* Suggest a City Section */}
      <div className="mt-32 bg-neutral-900 rounded-[40px] p-8 md:p-16 text-white text-center">
        <MapPin className="w-12 h-12 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Want Cozy Moments in your city?</h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-8">
          Tell us where you want to see us next. We prioritize expansions based on user demand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your city name"
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 h-14 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button className="bg-accent text-primary font-bold rounded-2xl px-8 h-14 hover:bg-accent/90 transition-colors">
            Suggest
          </button>
        </div>
      </div>
    </div>
  );
}
