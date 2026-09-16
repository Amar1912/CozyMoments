// app/checkout/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CreditCard, Smartphone, Building, Wallet,
  ShieldCheck, ArrowRight, Tag, Info, Calendar, MapPin, Sparkles, Check, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { rooms, properties, experiences } from '@/data/mock';

// Force Next.js to render this page dynamically per request, bypassing static build prerendering
export const dynamic = 'force-dynamic';

// Valid promo codes configuration
const VALID_COUPONS: Record<string, { type: 'fixed' | 'percent'; value: number; label: string }> = {
  COZY500: { type: 'fixed', value: 500, label: 'Flat ₹500 Off' },
  INTIMATE10: { type: 'percent', value: 10, label: '10% Off' },
  WELCOME20: { type: 'percent', value: 20, label: '20% Off' },
};

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

  // State management
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states for payment fields
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

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

  // Cost calculation
  const basePrice = room.pricePerHour * duration;
  const experiencePrice = experience?.price || 0;
  const subtotal = basePrice + experiencePrice;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const priceAfterDiscount = Math.max(0, subtotal - discount);

  const serviceFee = Math.round(priceAfterDiscount * 0.1);
  const taxes = Math.round(priceAfterDiscount * 0.12);
  const totalAmount = priceAfterDiscount + serviceFee + taxes;

  const handleApplyCoupon = () => {
    setCouponError('');
    const cleanCoupon = coupon.trim().toUpperCase();

    if (!cleanCoupon) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (VALID_COUPONS[cleanCoupon]) {
      const config = VALID_COUPONS[cleanCoupon];
      let calcDiscount = 0;
      if (config.type === 'fixed') {
        calcDiscount = config.value;
      } else if (config.type === 'percent') {
        calcDiscount = Math.round((subtotal * config.value) / 100);
      }
      setAppliedCoupon({ code: cleanCoupon, discount: calcDiscount });
    } else {
      setCouponError('Invalid coupon code. Try COZY500 or WELCOME20.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon('');
    setCouponError('');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push(`/booking/success?id=CM-${Math.floor(Math.random() * 900000) + 100000}`);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Hero */}
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
          {/* Left Column: Details & Payment Options */}
          <div className="lg:col-span-2 space-y-12">
            {/* Booking Summary Card */}
            <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Property</div>
                    <div className="font-bold">{property.name}</div>
                    <div className="text-xs text-muted-foreground">{property.area}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
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

            {/* Interactive Payment Methods Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Select Payment Method</h3>
              <div className="space-y-4">
                {[
                  { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: Smartphone },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'net', name: 'Net Banking', icon: Building },
                  { id: 'wallet', name: 'Wallets', icon: Wallet }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={cn(
                      "rounded-3xl border-2 transition-all bg-white overflow-hidden",
                      paymentMethod === method.id ? "border-primary bg-primary/5 shadow-md" : "border-neutral-100 hover:border-neutral-200"
                    )}
                  >
                    <div
                      onClick={() => setPaymentMethod(method.id)}
                      className="p-6 flex items-center space-x-4 cursor-pointer"
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                        paymentMethod === method.id ? "bg-primary text-white" : "bg-neutral-100 text-neutral-400"
                      )}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-foreground flex-1">{method.name}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        paymentMethod === method.id ? "border-primary" : "border-neutral-300"
                      )}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>

                    {/* Interactive Sub-forms per option */}
                    {paymentMethod === method.id && (
                      <div className="px-6 pb-6 pt-2 border-t border-neutral-100/60 bg-white/60">
                        {method.id === 'upi' && (
                          <div className="space-y-3 pt-2">
                            <label className="text-xs font-semibold text-muted-foreground">Virtual Payment Address (VPA)</label>
                            <Input
                              placeholder="username@upi or mobile@paytm"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="bg-white rounded-xl h-11 border-neutral-200"
                            />
                            <p className="text-[11px] text-muted-foreground">You will receive a payment request notification on your UPI app.</p>
                          </div>
                        )}

                        {method.id === 'card' && (
                          <div className="space-y-4 pt-2">
                            <div>
                              <label className="text-xs font-semibold text-muted-foreground">Card Number</label>
                              <Input
                                placeholder="4532 •••• •••• 8900"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="bg-white rounded-xl h-11 border-neutral-200"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground">Expiry (MM/YY)</label>
                                <Input
                                  placeholder="08/28"
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  className="bg-white rounded-xl h-11 border-neutral-200"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground">CVV/CVC</label>
                                <Input
                                  placeholder="123"
                                  type="password"
                                  maxLength={4}
                                  value={cardCvc}
                                  onChange={(e) => setCardCvc(e.target.value)}
                                  className="bg-white rounded-xl h-11 border-neutral-200"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {method.id === 'net' && (
                          <div className="pt-2">
                            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Select Bank</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {['HDFC', 'ICICI', 'SBI', 'Axis'].map(bank => (
                                <button key={bank} type="button" className="py-2 px-3 border border-neutral-200 rounded-xl text-xs font-semibold hover:border-primary transition-colors bg-white">
                                  {bank}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {method.id === 'wallet' && (
                          <div className="pt-2">
                            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Supported Wallets</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {['Paytm', 'PhonePe Wallet', 'Amazon Pay'].map(w => (
                                <button key={w} type="button" className="py-2 px-3 border border-neutral-200 rounded-xl text-xs font-semibold hover:border-primary transition-colors bg-white">
                                  {w}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4 opacity-75">
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>PCI-DSS Compliant Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>256-Bit SSL Encrypted Transaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border border-neutral-100 bg-white p-8">
                <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

                {/* Selected Room */}
                <div className="flex space-x-4 mb-8">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-100">
                    {room.images && room.images[0] && (
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{room.name}</div>
                    <div className="text-xs text-muted-foreground">{room.category} Room • {duration} hours</div>
                    <div className="text-xs font-bold text-primary mt-1">₹{basePrice}</div>
                  </div>
                </div>

                {/* Selected Experience */}
                {experience && (
                  <div className="flex space-x-4 mb-8 p-3 bg-neutral-50 rounded-2xl">
                    <div className="w-10 h-10 bg-neutral-200 rounded-xl flex items-center justify-center text-primary shrink-0">
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

                {/* Coupon Code Section */}
                <div className="mb-6">
                  {!appliedCoupon ? (
                    <div>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Have a coupon? (Try COZY500)"
                          className="pl-10 pr-20 h-12 rounded-2xl bg-neutral-50 border-neutral-100 text-xs uppercase"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setCouponError('');
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleApplyCoupon}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold h-10 rounded-xl text-primary hover:bg-primary/10"
                        >
                          Apply
                        </Button>
                      </div>
                      {couponError && (
                        <div className="flex items-center space-x-1 mt-2 text-[11px] text-red-500">
                          <AlertCircle className="w-3 h-3" />
                          <span>{couponError}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-green-900">{appliedCoupon.code}</div>
                          <div className="text-[10px] text-green-700">Saved ₹{appliedCoupon.discount}</div>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-red-500 hover:underline px-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{appliedCoupon.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee (10%)</span>
                    <span className="font-medium">₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (12%)</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>

                  <div className="border-b border-neutral-100 my-4" />

                  <div className="flex justify-between text-2xl font-bold text-primary pt-1">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                {/* Pay Action Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-16 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.01]"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      Pay ₹{totalAmount} <ArrowRight className="ml-2 w-6 h-6" />
                    </>
                  )}
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
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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