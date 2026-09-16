'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-neutral-100">

        {/* Left: Login Form */}
        <div className="p-8 md:p-16 space-y-10">
          <div>
            <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to manage your moments and bookings.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl bg-neutral-50 border-neutral-100 flex items-center justify-center space-x-2">
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} />
                <span className="text-xs font-bold">Google</span>
              </Button>
              <Button variant="outline" className="h-12 rounded-xl bg-neutral-50 border-neutral-100 flex items-center justify-center space-x-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold">Phone</span>
              </Button>
            </div>

            <div className="relative flex items-center py-4">
              <Separator className="flex-grow" />
              <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Or with email</span>
              <Separator className="flex-grow" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="your@email.com" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                  <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
                </div>
              </div>
            </div>

            <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" className="font-bold text-primary hover:underline">Register Now</Link>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hidden lg:block relative bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200&auto=format&fit=crop"
            alt="Premium Interior"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-transparent flex items-end p-16">
            <div className="text-white max-w-sm">
              <h3 className="text-3xl font-bold mb-4 italic">"Privacy is not a luxury, it's a priority."</h3>
              <p className="opacity-80">Experience premium hospitality designed around your time and comfort.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
