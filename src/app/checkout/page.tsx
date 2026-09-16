'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CreditCard, Smartphone, Building, Wallet,
  ShieldCheck, ArrowRight, Tag, Info, Calendar, Clock, MapPin, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { rooms, properties, experiences } from '@/data/mock';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = searchParams.get('roomId');
  const propertyId = searchParams.get('propertyId');
  const expId = searchParams.get('experienceId');
  const duration = parseInt(searchParams.get('duration') || '2');
  const date = searchParams.get('date') || '';
  const startTime = searchParams.get('startTime') || '';

  const room = rooms.find(r => r.id === roomId);
  const property = properties.find(p => p.id === propertyId);
  const experience = experiences.find(e => e.id === expId);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [coupon, setCoupon] = useState('');

  if (!room || !property) {
    return <div className="py-24 text-center">Invalid booking selection</div>;
  }

  const basePrice = room.pricePerHour * duration;
  const experiencePrice = experience?.price || 0;
  const serviceFee = Math.round((basePrice + experiencePrice) * 0.1);
  const taxes = Math.round((basePrice + experiencePrice) * 0.12);
  const totalAmount = basePrice + experiencePrice + serviceFee + taxes;

  // Placeholder functions for Razorpay
  const handlePayment = async () => {
    console.log('Initiating payment for ₹', totalAmount);

    // Simulate a successful payment flow
    setTimeout(() => {
      router.push(`/booking/success?id=CM-${Math.floor(Math.random() * 900000) + 100000}`);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0 h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2000&auto=format&fit=crop"
          alt="Checkout background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Confirm and Pay</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details & Payment */}
          <div className="lg:col-span-2 space-y-12">
            {/* Booking Summary Card (Mobile Friendly) */}
            <div className="bg-neutral-50 p-8 rounded-[40px] border border-neutral-100">
              <h3 className="text-xl font-bold mb-6">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Property</div>
                    <div className="font-bold">{property.name}</div>
                    <div className="text-xs text-muted-foreground">{property.area}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Date & Time</div>
                    <div className="font-bold">{date}</div>
                    <div className="text-xs text-muted-foreground">{startTime} for {duration} hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: Smartphone },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'net', name: 'Net Banking', icon: Building },
                  { id: 'wallet', name: 'Wallets', icon: Wallet }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "p-6 rounded-3xl border-2 flex items-center space-x-4 cursor-pointer transition-all",
                      paymentMethod === method.id ? "border-primary bg-primary/5 shadow-md" : "border-neutral-100 hover:border-neutral-200"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      paymentMethod === method.id ? "bg-primary text-white" : "bg-neutral-100 text-neutral-400"
                    )}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8 opacity-60">
              <div className="flex items-center space-x-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>PCI-DSS Compliant Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>SSL Encrypted Transaction</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" width={60} height={20} className="grayscale" />
                <span>Secured by Razorpay</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="rounded-[40px] overflow-hidden shadow-2xl border-none">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

                  <div className="flex space-x-4 mb-8">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold">{room.name}</div>
                      <div className="text-xs text-muted-foreground">{room.category} Room • {duration} hours</div>
                      <div className="text-xs font-bold text-primary mt-1">₹{basePrice}</div>
                    </div>
                  </div>

                  {experience && (
                    <div className="flex space-x-4 mb-8 p-3 bg-accent/10 rounded-2xl">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{experience.name}</div>
                        <div className="text-[10px] text-muted-foreground">Premium Experience Add-on</div>
                        <div className="text-xs font-bold text-primary">₹{experiencePrice}</div>
                      </div>
                    </div>
                  )}

                  <Separator className="mb-6" />

                  {/* Coupon Input */}
                  <div className="mb-8">
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Have a coupon?"
                        className="pl-10 h-12 rounded-2xl bg-neutral-50 border-neutral-100"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <Button variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold h-10 rounded-xl">Apply</Button>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Price</span>
                      <span className="font-medium">₹{basePrice + experiencePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium">₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (12%)</span>
                      <span className="font-medium">₹{taxes}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-2xl font-bold text-primary pt-2">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    className="w-full h-16 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20"
                  >
                    Pay ₹{totalAmount} <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>

                  <div className="flex items-start space-x-2 mt-6 p-4 bg-neutral-50 rounded-2xl">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      By clicking "Pay", you agree to Cozy Moments' cancellation policy and booking terms. Your booking will be confirmed instantly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
