'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from '@/components/shared/ExperienceCard';
import { experiences } from '@/data/mock';

export default function ExperiencesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose Your Experience</h1>
        <p className="text-muted-foreground text-lg">
          From a simple private escape to a fully styled evening. Make your moments memorable with our curated experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <ExperienceCard experience={exp} />
          </motion.div>
        ))}
      </div>

      {/* Date Night Section */}
      <section className="mt-32 relative rounded-[60px] overflow-hidden min-h-[500px] flex items-center p-8 md:p-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2000&auto=format&fit=crop"
            alt="Romantic Setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-2xl text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Make It An Evening <br /><span className="text-accent italic font-light">To Remember</span></h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed">
            Surprise your partner with a perfectly curated date night. We handle everything from decorations and mood lighting to food and music.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Romantic Decoration</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Private Dinner</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Custom Music</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Mood Lighting</span>
            </div>
          </div>
          <button className="bg-accent text-primary font-bold rounded-2xl px-10 h-14 hover:bg-accent/90 transition-all shadow-xl shadow-black/20">
            Plan Your Evening
          </button>
        </div>
      </section>
    </div>
  );
}
