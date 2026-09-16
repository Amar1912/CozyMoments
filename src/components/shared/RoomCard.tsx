import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Wifi, Wind, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/data/types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <Card className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm border-none font-medium">
            {room.category}
          </Badge>
          {room.status === 'Coming Soon' && (
            <Badge variant="secondary" className="bg-accent/90 text-accent-foreground backdrop-blur-sm border-none">
              Coming Soon
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold">{room.rating}</span>
          <span className="text-[10px] text-muted-foreground">({room.reviewCount})</span>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{room.name}</h3>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">₹{room.pricePerHour}</span>
            <span className="text-[10px] text-muted-foreground block">/ hour</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {room.description}
        </p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-muted-foreground">
            <Wifi className="w-3.5 h-3.5 mr-1" />
            <span className="text-[10px]">Wi-Fi</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Wind className="w-3.5 h-3.5 mr-1" />
            <span className="text-[10px]">AC</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            <span className="text-[10px]">Private</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex space-x-3">
        <Link href={`/rooms/${room.slug}`} className="flex-1">
          <Button variant="outline" className="w-full text-xs">View Details</Button>
        </Link>
        <Link href={`/booking?room=${room.id}`} className="flex-1">
          <Button className="w-full text-xs">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
