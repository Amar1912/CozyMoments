'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp, Users, ShieldCheck, Wallet,
  ArrowRight, BarChart3, Calendar, MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PartnerPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Partner Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973cf0f32e7?q=80&w=2000&auto=format&fit=crop"
            alt="Partner Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <Badge className="bg-accent text-primary mb-6 border-none font-bold">Partner Program</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Turn Your Unused Space <br />
              <span className="text-accent italic font-light">Into Income</span>
            </h1>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Join India's fastest-growing private experience platform. We help property owners maximize room utilization and revenue.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">40%+</div>
                  <div className="text-xs opacity-60">Revenue Increase</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-xs opacity-60">Active Guests</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="rounded-[40px] shadow-2xl border-none overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6">List Your Property</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Owner Name</label>
                    <Input placeholder="Full Name" className="rounded-xl h-12 bg-neutral-50" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Phone</label>
                    <Input placeholder="Mobile No." className="rounded-xl h-12 bg-neutral-50" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Property Name</label>
                  <Input placeholder="e.g. Grand Plaza Nashik" className="rounded-xl h-12 bg-neutral-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">City</label>
                    <Input placeholder="City Name" className="rounded-xl h-12 bg-neutral-50" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">No. of Rooms</label>
                    <Input type="number" placeholder="5" className="rounded-xl h-12 bg-neutral-50" />
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-bold text-lg mt-4 shadow-lg shadow-primary/20">
                  Become a Partner <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
            <p className="text-muted-foreground text-lg">We provide the tech and the guests, you provide the space.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: BarChart3, title: 'Increased Revenue', desc: 'Monetize your rooms during day-time hours that usually go empty.' },
              { icon: ShieldCheck, title: 'Verified Guests', desc: 'Every guest is verified with government ID before they book.' },
              { icon: Calendar, title: 'Easy Management', desc: 'Dedicated partner dashboard to manage bookings and availability.' },
              { icon: Wallet, title: 'Weekly Payouts', desc: 'Get your earnings directly in your bank account every week without delay.' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 text-center lg:text-left">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
