'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCcw, CreditCard, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentFailedPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Payment Could Not Be Completed</h1>
      <p className="text-lg text-muted-foreground mb-12">
        We were unable to process your payment. Don't worry, your booking details are saved. You can try again or use a different payment method.
      </p>

      <div className="space-y-4 mb-12">
        <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/10" onClick={() => window.history.back()}>
          <RefreshCcw className="w-5 h-5 mr-2" /> Try Again
        </Button>
        <Link href="/checkout">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-bold text-lg">
            <CreditCard className="w-5 h-5 mr-2" /> Change Payment Method
          </Button>
        </Link>
      </div>

      <div className="pt-8 border-t border-neutral-100 space-y-6">
        <p className="text-sm text-muted-foreground">Having trouble? Our support team is here to help.</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="flex items-center text-sm font-bold text-primary hover:underline">
            <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp Support
          </a>
          <Link href="/contact" className="flex items-center text-sm font-bold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
