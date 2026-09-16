import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { City } from '@/data/types';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const isAvailable = city.status === 'Available Now';

  return (
    <Link href={isAvailable ? `/cities/${city.slug}` : '#'}>
      <Card className="relative overflow-hidden group cursor-pointer border-none shadow-md h-80 w-full rounded-2xl">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute top-4 left-4">
          <Badge
            className={isAvailable
              ? "bg-green-500/90 text-white border-none"
              : "bg-orange-500/90 text-white border-none"
            }
          >
            {city.status}
          </Badge>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="w-4 h-4 text-accent" />
            <h3 className="text-2xl font-bold">{city.name}</h3>
          </div>

          {isAvailable ? (
            <div className="flex items-center justify-between mt-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex space-x-4 text-xs font-light">
                <span>{city.propertyCount} Properties</span>
                <span>{city.roomCount} Rooms</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          ) : (
            <p className="text-xs font-light mt-1 opacity-80 italic">Opening soon in your city...</p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default CityCard;
