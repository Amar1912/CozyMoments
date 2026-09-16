'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, Home,
  Calendar, CreditCard, Users, Settings,
  LogOut, Bell, Search, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  const navItems = isAdmin
    ? [
        { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Properties', href: '/dashboard/admin/properties', icon: Building2 },
        { name: 'Bookings', href: '/dashboard/admin/bookings', icon: Calendar },
        { name: 'Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'Payments', href: '/dashboard/admin/payments', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
      ]
    : [
        { name: 'Dashboard', href: '/dashboard/partner', icon: LayoutDashboard },
        { name: 'My Rooms', href: '/dashboard/partner/rooms', icon: Home },
        { name: 'Bookings', href: '/dashboard/partner/bookings', icon: Calendar },
        { name: 'Earnings', href: '/dashboard/partner/earnings', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/partner/settings', icon: Settings },
      ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-neutral-200">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold text-primary">
            Cozy <span className="font-light">Moments</span>
            <div className="text-[10px] text-muted-foreground uppercase tracking-tighter mt-1">
              {isAdmin ? 'Admin Console' : 'Partner Dashboard'}
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-neutral-100"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-white" : "text-neutral-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center lg:hidden">
            <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
            <span className="ml-4 font-bold">Dashboard</span>
          </div>

          <div className="hidden md:flex items-center max-w-md w-full relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search..."
              className="w-full bg-neutral-100 border-none rounded-xl h-10 pl-10 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {isAdmin ? 'AD' : 'PO'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
