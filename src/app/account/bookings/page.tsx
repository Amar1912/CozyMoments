'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar, Clock, MapPin, Download,
  ChevronRight, ArrowRight, ExternalLink, XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { rooms, properties } from '@/data/mock';

export default function MyBookingsPage() {
  // Mock bookings
  const bookings = [
    {
      id: 'CM-829472',
      roomId: 'r1',
      propertyId: 'p1',
      date: '2026-09-20',
      time: '10:00 AM',
      duration: 2,
      amount: 840,
      status: 'upcoming'
    },
    {
      id: 'CM-712391',
      roomId: 'r4',
      propertyId: 'p2',
      date: '2026-08-15',
      time: '02:00 PM',
      duration: 3,
      amount: 1980,
      status: 'completed'
    }
  ];

  const BookingItem = ({ booking }: { booking: any }) => {
    const room = rooms.find(r => r.id === booking.roomId);
    const property = properties.find(p => p.id === booking.propertyId);

    if (!room || !property) return null;

    return (
      <Card className="rounded-[32px] overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-white mb-6">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
              <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className={cn(
                  "border-none backdrop-blur-md",
                  booking.status === 'upcoming' ? "bg-green-500/90 text-white" :
                  booking.status === 'completed' ? "bg-neutral-800/90 text-white" :
                  "bg-red-500/90 text-white"
                )}>
                  {booking.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Booking ID: {booking.id}</div>
                    <h3 className="text-xl font-bold">{room.name} at {property.name}</h3>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-xs text-muted-foreground block">Total Paid</span>
                    <span className="text-xl font-bold text-primary">₹{booking.amount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-sm text-neutral-600">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    {booking.time} ({booking.duration}h)
                  </div>
                  <div className="flex items-center text-sm text-neutral-600 col-span-2 md:col-span-1">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {property.area}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-100">
                <Link href={`/account/bookings/${booking.id}`}>
                  <Button variant="outline" className="h-9 text-xs rounded-xl">View Details</Button>
                </Link>
                {booking.status === 'upcoming' && (
                  <>
                    <Button variant="outline" className="h-9 text-xs rounded-xl border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                    </Button>
                    <Button className="h-9 text-xs rounded-xl bg-accent text-primary font-bold hover:bg-accent/90">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" /> Directions
                    </Button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <Button variant="outline" className="h-9 text-xs rounded-xl">
                    <Download className="w-3.5 h-3.5 mr-1" /> Receipt
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
          <p className="text-muted-foreground">Manage your upcoming and past moments.</p>
        </div>
        <Link href="/rooms">
          <Button className="rounded-xl shadow-lg shadow-primary/10">Book New Space</Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-neutral-100 p-1 rounded-2xl mb-8">
          <TabsTrigger value="upcoming" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Completed</TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-xl px-8 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {bookings.filter(b => b.status === 'upcoming').map(b => <BookingItem key={b.id} booking={b} />)}
          {bookings.filter(b => b.status === 'upcoming').length === 0 && (
            <div className="py-24 text-center bg-neutral-50 rounded-[40px] border-2 border-dashed border-neutral-200">
              <h3 className="text-xl font-bold mb-2">No Upcoming Bookings</h3>
              <p className="text-muted-foreground mb-8">You don't have any sessions scheduled right now.</p>
              <Link href="/rooms">
                <Button>Find a Room</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {bookings.filter(b => b.status === 'completed').map(b => <BookingItem key={b.id} booking={b} />)}
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="py-24 text-center text-muted-foreground italic">No cancelled bookings.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
