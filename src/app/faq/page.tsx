'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Search, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FAQPage() {
  const faqs = [
    {
      q: "Can I book a room for just one hour?",
      a: "Yes! Cozy Moments is built for flexibility. Most of our rooms offer a minimum booking duration of just 1 hour."
    },
    {
      q: "Are bookings truly private?",
      a: "Absolutely. We work with property partners who understand the value of privacy. Discreet check-in processes and highly private rooms are standard across our platform."
    },
    {
      q: "Can unmarried couples book?",
      a: "Yes, we welcome all adult couples (18+). As long as you have valid government-issued IDs, you can enjoy our private spaces without any judgment or hassle."
    },
    {
      q: "What ID is required for booking?",
      a: "At least one guest must provide a valid government ID (Aadhaar Card, PAN Card, Driving License, or Passport) at the time of check-in."
    },
    {
      q: "What is the cancellation policy?",
      a: "Cancellations made 24 hours prior to the check-in time receive a full refund. For cancellations within 24 hours, a nominal cancellation fee may apply depending on the property."
    },
    {
      q: "How do I become a property partner?",
      a: "You can visit our Partner page and fill out the registration form. Our team will review your application and get in touch for a property verification visit."
    },
    {
      q: "Can I book an experience without a room?",
      a: "Our experiences (Date Night, Movie Night, etc.) are currently offered as add-ons to room bookings to ensure complete privacy and comfort for the duration of the experience."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Everything you need to know about Cozy Moments.</p>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for a question..."
          className="h-16 pl-12 rounded-2xl bg-white shadow-sm border-neutral-100 text-lg"
        />
      </div>

      <Card className="rounded-[40px] overflow-hidden border-none shadow-xl bg-white mb-16">
        <CardContent className="p-8 md:p-12">
          <Accordion className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b-neutral-100">
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="bg-primary rounded-[40px] p-10 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="opacity-70 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold bg-white text-primary">
            Contact Support
          </Button>
          <Button className="h-12 px-8 rounded-xl font-bold bg-accent text-primary hover:bg-accent/90">
            <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
          </Button>
        </div>
      </div>
    </div>
  );
}
