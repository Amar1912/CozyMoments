'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-neutral-100">

        {/* Left: Visual */}
        <div className="hidden lg:block relative bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
            alt="Premium Interior"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent flex items-center p-16">
            <div className="text-white">
              <h3 className="text-4xl font-bold mb-8">Join the Cozy Community</h3>
              <div className="space-y-6">
                {[
                  'Early access to premium suites',
                  'Exclusive date night offers',
                  'One-click instant booking',
                  'Personalized experience settings'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <span className="text-lg font-medium opacity-90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Register Form */}
        <div className="p-8 md:p-16 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-3">Create Account</h1>
            <p className="text-muted-foreground">Start booking your private moments today.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="John Doe" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Mobile Number</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="9876543210" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="your@email.com" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="h-14 pl-12 rounded-2xl bg-neutral-50 border-neutral-100" />
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input type="checkbox" className="mt-1 rounded border-neutral-300 text-primary focus:ring-primary" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                I agree to the <Link href="#" className="font-bold text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="font-bold text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
              Register Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="relative flex items-center py-2">
            <Separator className="flex-grow" />
            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Or</span>
            <Separator className="flex-grow" />
          </div>

          <Button variant="outline" className="w-full h-12 rounded-xl bg-neutral-50 border-neutral-100 flex items-center justify-center space-x-2">
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} />
            <span className="text-xs font-bold">Continue with Google</span>
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-bold text-primary hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
