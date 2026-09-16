'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star, Wifi, Wind, ShieldCheck, Clock, MapPin,
  Tv, Coffee, Lock, CheckCircle2, Info, ChevronRight,
  Calendar as CalendarIcon, Hourglass, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RoomCard from '@/components/shared/RoomCard';
import { rooms, properties } from '@/data/mock';
import { cn } from '@/lib/utils';

export default function RoomDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const room = rooms.find(r => r.slug === slug);
  const property = room ? properties.find(p => p.id === room.propertyId) : null;

  const [activeImage, setActiveImage] = useState(0);
  const [duration, setDuration] = useState(2);

  if (!room || !property) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Room Not Found</h1>
        <Link href="/rooms">
          <Button>Back to Rooms</Button>
        </Link>
      </div>
    );
  }

  const basePrice = room.pricePerHour * duration;
  const serviceFee = Math.round(basePrice * 0.1);
  const taxes = Math.round(basePrice * 0.12);
  const totalAmount = basePrice + serviceFee + taxes;

  const recommendedRooms = rooms.filter(r => r.id !== room.id).slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumbs / Back */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/rooms" className="hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Rooms
          </Link>
          <span className="mx-2">/</span>
          <span>{property.name}</span>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{room.name}</span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4 mb-12 h-[300px] md:h-[500px]">
          <div className="md:col-span-3 lg:col-span-2 relative rounded-3xl overflow-hidden shadow-lg group">
            <Image
              src={room.images[activeImage]}
              alt={room.name}
              fill
              className="object-cover"
            />
            <Button variant="secondary" size="sm" className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm border-none shadow-lg">
              View all photos
            </Button>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            {room.images.map((img, idx) => (
              <div
                key={idx}
                className={cn(
                  "relative flex-1 rounded-2xl overflow-hidden cursor-pointer shadow-sm border-2 transition-all",
                  activeImage === idx ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"
                )}
                onClick={() => setActiveImage(idx)}
              >
                <Image
                  src={img}
                  alt={`${room.name} thumbnail ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{room.category} Room</Badge>
                <div className="flex items-center text-sm font-bold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {room.rating} <span className="text-muted-foreground font-normal ml-1">({room.reviewCount} Reviews)</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.area}, {properties.find(p => p.id === room.propertyId)?.cityId === 'c1' ? 'Nashik' : ''}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{room.name} at {property.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {room.longDescription}
              </p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-bold mb-8">What this space offers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-5 h-5 text-primary" />
                  <span>High-speed Wi-Fi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-primary" />
                  <span>Air Conditioning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Tv className="w-5 h-5 text-primary" />
                  <span>Smart TV</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>Private Entrance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Sanitized Environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Coffee className="w-5 h-5 text-primary" />
                  <span>Complimentary Water</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Why you'll love this */}
            <div className="bg-neutral-50 p-8 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-6">Why you'll love this space</h3>
              <div className="space-y-4">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Info className="w-6 h-6 mr-2 text-primary" /> Frequently Asked Questions
              </h3>
              <Accordion className="w-full">
                <AccordionItem value="item-1" className="border-b-neutral-200">
                  <AccordionTrigger className="text-left font-bold py-6">Can unmarried couples book this room?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    Yes, we welcome all couples. As long as you are above 18 years of age and have valid local or national IDs, you are welcome to book and enjoy our spaces.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-neutral-200">
                  <AccordionTrigger className="text-left font-bold py-6">What ID is required for check-in?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    We require at least one valid government-issued ID (Aadhaar, PAN, Driving License, or Passport) from the guest who made the booking. Digital copies are accepted at most properties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-neutral-200">
                  <AccordionTrigger className="text-left font-bold py-6">Is extension possible after check-in?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    Yes, extensions are possible subject to availability. You can check for extension options through the app or by speaking with the property manager.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="rounded-[32px] overflow-hidden shadow-2xl border-none">
                <CardContent className="p-8">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <span className="text-3xl font-bold text-primary">₹{room.pricePerHour}</span>
                      <span className="text-muted-foreground ml-1">/ hour</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Available Now</Badge>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                        <CalendarIcon className="w-3.5 h-3.5 mr-1 text-primary" /> Select Date
                      </label>
                      <Button variant="outline" className="w-full h-12 justify-between bg-neutral-50 border-neutral-200 rounded-2xl">
                        <span>Sept 20, 2026</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-primary" /> Start Time
                        </label>
                        <Button variant="outline" className="w-full h-12 justify-between bg-neutral-50 border-neutral-200 rounded-2xl">
                          <span>10:00 AM</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                          <Hourglass className="w-3.5 h-3.5 mr-1 text-primary" /> Duration
                        </label>
                        <select
                          className="w-full h-12 bg-neutral-50 border border-neutral-200 rounded-2xl px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                        >
                          <option value={1}>1 Hour</option>
                          <option value={2}>2 Hours</option>
                          <option value={3}>3 Hours</option>
                          <option value={4}>4 Hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">₹{room.pricePerHour} x {duration} hours</span>
                      <span className="font-medium">₹{basePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee (10%)</span>
                      <span className="font-medium">₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes (GST 12%)</span>
                      <span className="font-medium">₹{taxes}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-primary pt-2">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  <Link href={`/checkout?room=${room.id}&duration=${duration}`} className="w-full">
                    <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                      Continue to Booking
                    </Button>
                  </Link>

                  <p className="text-center text-[11px] text-muted-foreground mt-4">
                    By continuing, you agree to our terms and cancellation policy.
                  </p>
                </CardContent>
              </Card>

              {/* Safety/Rules Info */}
              <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200">
                <h4 className="font-bold mb-4 flex items-center text-sm">
                  <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> Property Rules
                </h4>
                <ul className="space-y-2">
                  {['Valid ID required', 'No smoking inside', 'No outside loud music', 'Maintain property decorum'].map((rule, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 mr-2" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Rooms */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-12">Similar Spaces You Might Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedRooms.map(r => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
