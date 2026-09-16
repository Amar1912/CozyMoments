'use client';

import React from 'react';
import {
  Building2, Users, Calendar,
  CreditCard, TrendingUp, Sparkles,
  MapPin, ArrowUpRight, ShieldCheck, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const stats = [
    { title: "Total Bookings", value: "1,284", change: "+14%", icon: Calendar },
    { title: "Revenue", value: "₹8,42,000", change: "+8.2%", icon: CreditCard },
    { title: "Active Partners", value: "42", change: "+3", icon: Building2 },
    { title: "Total Users", value: "5,820", change: "+420", icon: Users },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
          <p className="text-muted-foreground">Real-time statistics for Cozy Moments.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-xl font-bold">Manage Partners</Button>
          <Button className="rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20">Add New City</Button>
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
                <div className="flex items-center text-xs font-bold text-green-600">
                  {s.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{s.title}</div>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* City Performance */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="py-6 px-8 border-b border-neutral-100">
            <CardTitle className="text-xl font-bold">City Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {[
                { city: 'Nashik', bookings: 842, revenue: '₹5.2L', growth: 12, status: 'Active' },
                { city: 'Pune', bookings: 0, revenue: '₹0', growth: 0, status: 'Soon' },
                { city: 'Mumbai', bookings: 0, revenue: '₹0', growth: 0, status: 'Soon' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">{c.city}</div>
                      <div className="text-xs text-muted-foreground">{c.bookings} Bookings</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{c.revenue}</div>
                    <Badge variant="secondary" className={cn(
                      "text-[8px] border-none uppercase font-bold",
                      c.status === 'Active' ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                    )}>
                      {c.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-accent/10">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary">Instant Booking Active</h3>
              <p className="text-xs text-primary/70 mb-6 leading-relaxed">System is processing 8.2 requests per minute. All payment gateways operational.</p>
              <div className="flex space-x-4">
                <div className="flex items-center text-[10px] font-bold text-primary">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                  API
                </div>
                <div className="flex items-center text-[10px] font-bold text-primary">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                  DB
                </div>
                <div className="flex items-center text-[10px] font-bold text-primary">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                  Payments
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="py-6 px-8 border-b border-neutral-100">
              <CardTitle className="text-lg font-bold">Pending Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-100">
                {[
                  { icon: ShieldCheck, text: 'Partner Application', sub: 'Nashik Premium Stay', time: '2h ago' },
                  { icon: Clock, text: 'Refund Request', sub: 'Booking ID: CM-9281', time: '5h ago' },
                  { icon: Users, text: 'New Support Ticket', sub: 'Login Issue', time: '12h ago' },
                ].map((a, idx) => (
                  <div key={idx} className="p-5 flex items-start space-x-3 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <a.icon className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm font-bold">{a.text}</div>
                      <div className="text-[10px] text-muted-foreground">{a.sub}</div>
                      <div className="text-[9px] text-muted-foreground/60 mt-1">{a.time}</div>
                    </div>
                  </div>
                ))}
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
