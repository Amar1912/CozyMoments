// app/checkout/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CreditCard, Smartphone, Building, Wallet,
  ShieldCheck, ArrowRight, Tag, Info, Calendar, MapPin, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { rooms, properties, experiences } from '@/data/mock';

// Force Next.js to render this page dynamically per request, bypassing static build prerendering
export const dynamic = 'force-dynamic';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = searchParams ? searchParams.get('roomId') : null;
  const propertyId = searchParams ? searchParams.get('propertyId') : null;
  const expId = searchParams ? searchParams.get('experienceId') : null;
  const duration = parseInt((searchParams && searchParams.get('duration')) || '2', 10);
  const date = (searchParams && searchParams.get('date')) || '';
  const startTime = (searchParams && searchParams.get('startTime')) || '';

  const room = rooms.find(r => r.id === roomId);
  const property = properties.find(p => p.id === propertyId);
  const experience = experiences.find(e => e.id === expId);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [coupon, setCoupon] = useState('');

  if (!room || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Booking Selection</h2>
          <p className="text-gray-600 text-sm mb-6">No valid room or property was specified in the URL.</p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const basePrice = room.pricePerHour * duration;
  const experiencePrice = experience?.price || 0;
  const serviceFee = Math.round((basePrice + experiencePrice) * 0.1);
  const taxes = Math.round((basePrice + experiencePrice) * 0.12);
  const totalAmount = basePrice + experiencePrice + serviceFee + taxes;

  const handlePayment = async () => {
    setTimeout(() => {
      router.push(`/booking/success?id=CM-${Math.floor(Math.random() * 900000) + 100000}`);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0 h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2000&auto=format&fit=crop"
          alt="Checkout background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Confirm and Pay</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details & Payment */}
          <div className="lg:col-span-2 space-y-12">
            {/* Booking Summary Card */}
            <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Property</div>
                    <div className="font-bold">{property.name}</div>
                    <div className="text-xs text-muted-foreground">{property.area}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Date & Time</div>
                    <div className="font-bold">{date || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">{startTime} for {duration} hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Select Payment Method</h3>
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
                      "p-6 rounded-3xl border-2 flex items-center space-x-4 cursor-pointer transition-all bg-white",
                      paymentMethod === method.id ? "border-primary bg-primary/5 shadow-md" : "border-neutral-100 hover:border-neutral-200"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      paymentMethod === method.id ? "bg-primary text-white" : "bg-neutral-100 text-neutral-400"
                    )}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-foreground">{method.name}</span>
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
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border border-neutral-100 bg-white p-8">
                <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

                <div className="flex space-x-4 mb-8">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-100">
                    {room.images && room.images[0] && (
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{room.name}</div>
                    <div className="text-xs text-muted-foreground">{room.category} Room • {duration} hours</div>
                    <div className="text-xs font-bold text-primary mt-1">₹{basePrice}</div>
                  </div>
                </div>

                {experience && (
                  <div className="flex space-x-4 mb-8 p-3 bg-neutral-50 rounded-2xl">
                    <div className="w-10 h-10 bg-neutral-200 rounded-xl flex items-center justify-center text-primary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{experience.name}</div>
                      <div className="text-[10px] text-muted-foreground">Premium Experience Add-on</div>
                      <div className="text-xs font-bold text-primary">₹{experiencePrice}</div>
                    </div>
                  </div>
                )}

                <div className="border-b border-neutral-100 my-6" />

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
                  <div className="border-b border-neutral-100 my-4" />
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
                    By clicking "Pay", you agree to Cozy Moments' cancellation policy and booking terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-sm font-medium">Preparing checkout...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}