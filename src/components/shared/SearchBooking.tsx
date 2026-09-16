'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar as CalendarIcon, Clock, Hourglass, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const SearchBooking = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [city, setCity] = useState('nashik');
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState('2');

  const handleSearch = () => {
    const params = new URLSearchParams({
      city,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      time,
      duration
    });
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 items-end border border-neutral-100">
      {/* City Selection */}
      <div className="flex-1 w-full space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center">
          <MapPin className="w-3 h-3 mr-1 text-primary" /> Where are you going?
        </label>
        <Select value={city} onValueChange={(val) => setCity(val ?? 'nashik')}>
          <SelectTrigger className="w-full h-12 bg-neutral-50 border-neutral-200 rounded-xl focus:ring-primary/20">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nashik">Nashik</SelectItem>
            <SelectItem value="pune" disabled>Pune (Soon)</SelectItem>
            <SelectItem value="mumbai" disabled>Mumbai (Soon)</SelectItem>
            <SelectItem value="indore" disabled>Indore (Soon)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="flex-1 w-full space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center">
          <CalendarIcon className="w-3 h-3 mr-1 text-primary" /> Choose Date
        </label>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"outline"}
              className={cn(
                "w-full h-12 justify-start text-left font-normal bg-neutral-50 border-neutral-200 rounded-xl",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="w-full lg:w-32 space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center">
          <Clock className="w-3 h-3 mr-1 text-primary" /> Check-in
        </label>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus:ring-primary/20"
        />
      </div>

      {/* Duration Selector */}
      <div className="w-full lg:w-40 space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center">
          <Hourglass className="w-3 h-3 mr-1 text-primary" /> Duration
        </label>
        <Select value={duration} onValueChange={(val) => setDuration(val ?? '2')}>
          <SelectTrigger className="w-full h-12 bg-neutral-50 border-neutral-200 rounded-xl">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Hour</SelectItem>
            <SelectItem value="2">2 Hours</SelectItem>
            <SelectItem value="3">3 Hours</SelectItem>
            <SelectItem value="4">4 Hours</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="w-full lg:w-auto h-12 px-8 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
      >
        <Search className="w-5 h-5 mr-2" /> Check Availability
      </Button>
    </div>
  );
};

export default SearchBooking;
