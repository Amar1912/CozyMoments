import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Experience } from '@/data/types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg group rounded-[40px] bg-white">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{experience.name}</h3>
          <div className="flex items-center text-xs opacity-90">
            <Clock className="w-3 h-3 mr-1" /> {experience.duration}
          </div>
        </div>
      </div>
      <CardContent className="p-8">
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12 line-clamp-2">
          {experience.description}
        </p>

        <div className="space-y-2 mb-8">
          {experience.included.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center text-xs text-neutral-700">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-600" />
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <span className="text-xs text-muted-foreground block">Starting at</span>
            <span className="text-xl font-bold text-primary">₹{experience.price}</span>
          </div>
          <Link href={`/experiences/${experience.slug}`}>
            <Button size="sm" className="rounded-xl px-5 group/btn">
              Explore <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
