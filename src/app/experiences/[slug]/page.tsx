'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Clock, CheckCircle2, ChevronRight, Plus,
  Minus, Star, ShieldCheck, Heart, Info, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { experiences } from '@/data/mock';
import { cn } from '@/lib/utils';

export default function ExperienceDetailsPage() {
  const { slug } = useParams();
  const experience = experiences.find(e => e.slug === slug);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  if (!experience) {
    return <div className="py-24 text-center">Experience not found</div>;
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addOnsTotal = experience.addOns
    ? experience.addOns.filter(a => selectedAddOns.includes(a.id)).reduce((acc, a) => acc + a.price, 0)
    : 0;

  const totalAmount = experience.price + addOnsTotal;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/experiences" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Experiences
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src={experience.image}
                alt={experience.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="relative aspect-square rounded-3xl overflow-hidden opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                  <Image
                    src={experience.image}
                    alt="Experience gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Content */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-accent/20 text-primary border-none">Popular Choice</Badge>
                <div className="flex items-center text-sm font-bold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  4.9 <span className="text-muted-foreground font-normal ml-1">(240+ Bookings)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{experience.name}</h1>
              <div className="flex items-center space-x-6 text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>Duration: {experience.duration}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary" />
                  <span>Perfect for Couples</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {experience.longDescription}
              </p>
            </div>

            <Separator />

            {/* What's Included */}
            <div>
              <h3 className="text-2xl font-bold mb-6">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.included.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            {experience.addOns && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Personalize Your Experience</h3>
                <div className="space-y-4">
                  {experience.addOns.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={cn(
                        "flex justify-between items-center p-5 rounded-2xl border-2 cursor-pointer transition-all",
                        selectedAddOns.includes(addon.id)
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-neutral-100 hover:border-neutral-200"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                          selectedAddOns.includes(addon.id) ? "bg-primary border-primary" : "border-neutral-300"
                        )}>
                          {selectedAddOns.includes(addon.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-bold">{addon.name}</span>
                      </div>
                      <span className="font-bold">+₹{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Summary Card */}
            <Card className="rounded-[40px] overflow-hidden shadow-2xl border-none bg-neutral-900 text-white">
              <CardContent className="p-10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-sm text-neutral-400 block mb-1">Total Experience Price</span>
                    <span className="text-4xl font-bold">₹{totalAmount}</span>
                  </div>
                  <Badge className="bg-accent text-primary border-none hover:bg-accent/90">Instant Confirmation</Badge>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-sm opacity-80">
                    <span>{experience.name} Package</span>
                    <span>₹{experience.price}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between text-sm opacity-80">
                      <span>Add-ons ({selectedAddOns.length})</span>
                      <span>₹{addOnsTotal}</span>
                    </div>
                  )}
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Final Amount</span>
                    <span className="text-accent">₹{totalAmount}</span>
                  </div>
                </div>

                <Link href={`/booking?experience=${experience.id}&addons=${selectedAddOns.join(',')}`}>
                  <Button className="w-full h-16 rounded-2xl font-bold text-xl bg-accent text-primary hover:bg-accent/90 shadow-xl shadow-black/20">
                    Customize & Book
                  </Button>
                </Link>

                <div className="flex items-center justify-center space-x-6 mt-6 opacity-60">
                  <div className="flex items-center text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Secure Payment
                  </div>
                  <div className="flex items-center text-[10px]">
                    <Info className="w-3 h-3 mr-1" /> Free Cancellation*
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
