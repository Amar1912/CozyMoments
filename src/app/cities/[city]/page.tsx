'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RoomCard from '@/components/shared/RoomCard';
import { cities, properties, rooms } from '@/data/mock';

// Fallback dummy city data
const createDummyCity = (slug: string) => ({
  id: 'dummy-city-id',
  slug: slug || 'city',
  name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Explore City',
  image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  propertyCount: 5,
  roomCount: 12,
});

export default function CityDetailsPage() {
  const { city: citySlug } = useParams();

  // Find matching city or fallback to generated dummy city
  const city = cities.find(c => c.slug === citySlug) || createDummyCity(String(citySlug));

  // Get matching properties/rooms, fallback to standard mock items if none match
  let cityProperties = properties.filter(p => p.cityId === city.id);
  if (cityProperties.length === 0) {
    cityProperties = properties.slice(0, 2); // Fallback dummy properties
  }

  let cityRooms = rooms.filter(r => cityProperties.some(p => p.id === r.propertyId));
  if (cityRooms.length === 0) {
    cityRooms = rooms.slice(0, 3); // Fallback dummy rooms
  }

  return (
    <div className="flex flex-col w-full">
      {/* City Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center text-white">
          <Badge className="bg-white/20 backdrop-blur-md border-white/40 text-white mb-4">Currently Serving</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Cozy Moments in <span className="text-accent">{city.name}</span></h1>
          <div className="flex items-center justify-center space-x-6 text-sm font-light">
            <span>{city.propertyCount} Properties</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span>{city.roomCount} Available Rooms</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span>Starting from ₹300/hr</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filter By
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Area</h4>
                  <div className="space-y-2">
                    {['Downtown', 'Central Hub', 'North Avenue', 'Riverside'].map(area => (
                      <label key={area} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-neutral-300 rounded group-hover:border-primary transition-colors" />
                        <span className="text-sm text-neutral-600 group-hover:text-primary">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Room Type</h4>
                  <div className="space-y-2">
                    {['Cozy', 'Premium', 'Signature'].map(type => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-neutral-300 rounded group-hover:border-primary transition-colors" />
                        <span className="text-sm text-neutral-600 group-hover:text-primary">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {['Wi-Fi', 'AC', 'Private Entrance', 'Smart TV', 'Parking'].map(amenity => (
                      <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-neutral-300 rounded group-hover:border-primary transition-colors" />
                        <span className="text-sm text-neutral-600 group-hover:text-primary">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 space-y-12">
            {/* Properties */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold">Top Properties in {city.name}</h2>
                <Button variant="ghost" className="text-xs h-8">Sort By: Featured <SlidersHorizontal className="ml-2 w-3 h-3" /></Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityProperties.map(property => (
                  <Card key={property.id} className="overflow-hidden border-none shadow-md group hover:shadow-lg transition-shadow bg-white rounded-3xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" /> {property.rating}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{property.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3 mr-1" /> {property.area}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">Starts at</span>
                          <div className="text-lg font-bold text-primary">₹{property.startingPrice}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {property.amenities.slice(0, 3).map(amenity => (
                          <Badge key={amenity} variant="secondary" className="bg-neutral-100 text-[10px] font-normal border-none">{amenity}</Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="secondary" className="bg-neutral-100 text-[10px] font-normal border-none">+{property.amenities.length - 3} more</Badge>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/rooms?property=${property.id}`} className="flex-1">
                          <Button className="w-full rounded-xl h-10 text-xs">View Rooms</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Rooms in City */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Available Rooms in {city.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityRooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}