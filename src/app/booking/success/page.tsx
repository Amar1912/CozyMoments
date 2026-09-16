'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Download,
  Share2,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get('id') || 'CM-829472';

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">

      {/* Success Icon */}
      <div className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full animate-in zoom-in duration-500">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Your Moment Is Booked!
      </h1>

      <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
        A confirmation has been sent to your email and mobile number.
        Get ready for your cozy experience.
      </p>

      {/* Booking Card */}
      <Card className="rounded-[40px] overflow-hidden shadow-2xl border-none bg-neutral-900 text-white text-left mb-12">
        <CardContent className="p-8 md:p-12">

          {/* Booking ID */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                Booking ID
              </div>

              <div className="text-2xl font-bold text-accent">
                {bookingId}
              </div>
            </div>

            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
              Confirmed
            </Badge>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />

                <div>
                  <div className="font-bold">
                    Cozy Moments Nashik Central
                  </div>

                  <div className="text-xs text-neutral-400">
                    College Road, Nashik
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />

                <div>
                  <div className="font-bold">
                    Sunday, Sept 20, 2026
                  </div>

                  <div className="text-xs text-neutral-400">
                    Date of Check-in
                  </div>
                </div>
              </div>
            </div>

            {/* Time & Room */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />

                <div>
                  <div className="font-bold">
                    10:00 AM - 12:00 PM
                  </div>

                  <div className="text-xs text-neutral-400">
                    Duration: 2 Hours
                  </div>
                </div>
              </div>

              {/* Room */}
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />

                <div>
                  <div className="font-bold">
                    Premium Haven
                  </div>

                  <div className="text-xs text-neutral-400">
                    Room Category
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">

            <Button
              variant="outline"
              className="bg-white/5 border-white/20 hover:bg-white/10 text-white rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Receipt
            </Button>

            <Button
              variant="outline"
              className="bg-white/5 border-white/20 hover:bg-white/10 text-white rounded-xl"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Booking Confirmed',
                    text: `My booking ID is ${bookingId}`,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Link
              href="/account/bookings"
              className="ml-auto"
            >
              <Button className="bg-accent text-primary font-bold hover:bg-accent/90 rounded-xl">
                My Bookings
              </Button>
            </Link>

          </div>

        </CardContent>
      </Card>

      {/* Back Home */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link
          href="/"
          className="text-primary font-bold hover:underline flex items-center"
        >
          Back to Home
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">
            Loading booking confirmation...
          </div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}