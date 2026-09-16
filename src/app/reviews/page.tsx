'use client';

import React from 'react';
import { Star, MessageSquare, ThumbsUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { reviews } from '@/data/mock';

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">What Couples Say</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real experiences from real couples. We take pride in providing the best private hospitality in the city.
          </p>
        </div>

        <Card className="rounded-[40px] border-none shadow-2xl bg-primary text-white p-8 md:p-12 text-center flex-shrink-0">
          <div className="text-6xl font-bold text-accent mb-2">4.8</div>
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-accent text-accent" />)}
          </div>
          <div className="text-sm font-bold uppercase tracking-widest opacity-60">Overall Rating</div>
          <div className="mt-6 pt-6 border-t border-white/10 text-xs opacity-70">
            Based on 1,240+ verified bookings
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <Card key={rev.id} className="rounded-[32px] border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"
                      )}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {rev.date}
                </div>
              </div>

              <p className="text-lg font-medium italic mb-8 text-primary leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{rev.userName}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Verified Guest</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                  {rev.roomName}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Mock additional reviews for visual density */}
        {[
          { name: 'Amit K.', room: 'Signature Suite', text: 'Absolutely stunning setup for our anniversary. The mood lighting and decoration were perfect.' },
          { name: 'Sneha P.', room: 'Premium Haven', text: 'Safe, clean and very professional. Highly recommended for couples looking for private time.' },
          { name: 'Vikram R.', room: 'Cozy Nest', text: 'Great for a quick break. The booking process was seamless and check-in was very discreet.' },
          { name: 'Anjali D.', room: 'Date Night', text: 'The date night experience was magical. Every detail was taken care of. Thank you Cozy Moments!' }
        ].map((m, idx) => (
          <Card key={idx} className="rounded-[32px] border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aug 2026</div>
              </div>
              <p className="text-lg font-medium italic mb-8 text-primary leading-relaxed">"{m.text}"</p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">{m.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Verified Guest</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">{m.room}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Button size="lg" className="h-14 px-12 rounded-2xl font-bold shadow-xl shadow-primary/20">
          Share Your Experience
        </Button>
      </div>
    </div>
  );
}
