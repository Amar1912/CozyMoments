'use client';

import React from 'react';
import {
  TrendingUp, Users, Calendar,
  CreditCard, ArrowUpRight, ArrowDownRight,
  MoreVertical, CheckCircle2, Clock, XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PartnerDashboard() {
  const stats = [
    { title: "Today's Bookings", value: "8", change: "+2", trend: "up", icon: Calendar },
    { title: "Monthly Revenue", value: "₹48,250", change: "+12.5%", trend: "up", icon: CreditCard },
    { title: "Occupancy Rate", value: "72%", change: "-2.4%", trend: "down", icon: TrendingUp },
    { title: "Active Guests", value: "124", change: "+18", trend: "up", icon: Users },
  ];

  const recentBookings = [
    { id: 'CM-829472', room: 'Premium Haven', time: '10:00 AM', duration: '2h', amount: '₹840', status: 'upcoming' },
    { id: 'CM-829473', room: 'Cozy Nest', time: '12:30 PM', duration: '1h', amount: '₹360', status: 'confirmed' },
    { id: 'CM-829471', room: 'Signature Suite', time: '09:00 AM', duration: '4h', amount: '₹3200', status: 'completed' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Partner</h1>
          <p className="text-muted-foreground">Here's what's happening at your properties today.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-xl font-bold">Download Report</Button>
          <Button className="rounded-xl font-bold shadow-lg shadow-primary/20">Add New Room</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <Card key={idx} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-bold",
                  s.trend === 'up' ? "text-green-600" : "text-red-500"
                )}>
                  {s.change} {s.trend === 'up' ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{s.title}</div>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 py-6 px-8">
            <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-8 py-4">Booking ID</th>
                    <th className="px-8 py-4">Room</th>
                    <th className="px-8 py-4">Time</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {recentBookings.map((b, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-8 py-5 font-medium">{b.id}</td>
                      <td className="px-8 py-5">{b.room}</td>
                      <td className="px-8 py-5">
                        <div className="font-medium">{b.time}</div>
                        <div className="text-[10px] text-muted-foreground">{b.duration} duration</div>
                      </td>
                      <td className="px-8 py-5 font-bold">{b.amount}</td>
                      <td className="px-8 py-5">
                        <Badge className={cn(
                          "border-none text-[10px]",
                          b.status === 'upcoming' ? "bg-blue-100 text-blue-700" :
                          b.status === 'confirmed' ? "bg-green-100 text-green-700" :
                          "bg-neutral-100 text-neutral-600"
                        )}>
                          {b.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Property Status */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-primary text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-[20px] flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Peak Hours Approaching</h3>
              <p className="text-sm opacity-70 mb-6">Your properties usually see high demand between 6 PM and 10 PM. Check your cleaners status.</p>
              <Button variant="secondary" className="w-full rounded-xl bg-white text-primary font-bold hover:bg-white/90">View Calendar</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="py-6 px-8 border-b border-neutral-100">
              <CardTitle className="text-lg font-bold">Property Health</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span className="text-sm font-medium">Cleanliness Rating</span>
                </div>
                <span className="font-bold">4.9/5</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span className="text-sm font-medium">Safety Score</span>
                </div>
                <span className="font-bold">98%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2" />
                  <span className="text-sm font-medium">Avg. Response Time</span>
                </div>
                <span className="font-bold">12m</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
