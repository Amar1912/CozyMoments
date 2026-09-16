'use client';

export const dynamic = 'force-dynamic'; // Add this line at the top

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RoomCard from '@/components/shared/RoomCard';
import { rooms } from '@/data/mock';
import { Room } from '@/data/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function RoomsContent() {
  const searchParams = useSearchParams();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    let result = rooms;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(room => room.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Filter by price
    if (priceFilter === 'low') {
      result = result.filter(room => room.pricePerHour <= 400);
    } else if (priceFilter === 'mid') {
      result = result.filter(room => room.pricePerHour > 400 && room.pricePerHour <= 800);
    } else if (priceFilter === 'high') {
      result = result.filter(room => room.pricePerHour > 800);
    }

    setFilteredRooms(result);
  }, [searchQuery, categoryFilter, priceFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Space</h1>
        <p className="text-muted-foreground">Choose a room that matches your mood, time and budget.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Search Rooms</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or description..."
              className="pl-10 h-11 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full lg:w-48 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
          <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val ?? 'all')}>
            <SelectTrigger className="h-11 bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cozy">Cozy</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="signature">Signature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full lg:w-48 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Price Range</label>
          <Select value={priceFilter} onValueChange={(val) => setPriceFilter(val ?? 'all')}>
            <SelectTrigger className="h-11 bg-white">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under ₹400</SelectItem>
              <SelectItem value="mid">₹400 - ₹800</SelectItem>
              <SelectItem value="high">Above ₹800</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="h-11 px-6 bg-white hidden lg:flex">
          <SlidersHorizontal className="w-4 h-4 mr-2" /> More Filters
        </Button>
      </div>

      {/* Results */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-2">No Rooms Found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any rooms matching your current filters. Try adjusting your search or filters.</p>
            <Button onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setPriceFilter('all');
            }}>
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 md:px-12 py-12">Loading rooms...</div>}>
      <RoomsContent />
    </Suspense>
  );
}