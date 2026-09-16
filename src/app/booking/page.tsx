'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Hourglass,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Building2,
  Home,
  Sparkles,
  Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';

import {
  cities,
  properties,
  rooms,
  experiences,
} from '@/data/mock';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    cityId: searchParams.get('city') || 'c1',
    propertyId: searchParams.get('property') || '',
    roomId: searchParams.get('room') || '',
    experienceId: searchParams.get('experience') || '',
    date: new Date(),
    startTime: searchParams.get('time') || '10:00',
    duration: parseInt(searchParams.get('duration') || '2', 10),
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    guests: 2,
  });

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const filteredProperties = properties.filter(
    (property) => property.cityId === formData.cityId
  );

  const selectedProperty = properties.find(
    (property) => property.id === formData.propertyId
  );

  const filteredRooms = rooms.filter(
    (room) => room.propertyId === formData.propertyId
  );

  const steps = [
    { title: 'Location', icon: MapPin },
    { title: 'Space', icon: Home },
    { title: 'Time', icon: Clock },
    { title: 'Experience', icon: Sparkles },
    { title: 'Details', icon: User },
  ];

  const handleBooking = () => {
    const params = new URLSearchParams();

    params.set('city', formData.cityId);
    params.set('property', formData.propertyId);
    params.set('room', formData.roomId);
    params.set('experience', formData.experienceId);
    params.set('date', format(formData.date, 'yyyy-MM-dd'));
    params.set('time', formData.startTime);
    params.set('duration', String(formData.duration));
    params.set('customerName', formData.customerName);
    params.set('customerEmail', formData.customerEmail);
    params.set('customerPhone', formData.customerPhone);
    params.set('guests', String(formData.guests));

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div className="absolute inset-0 z-0 h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Booking background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Moment
          </h1>

          <p className="opacity-80">
            Follow the steps to reserve your private space.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
          <div className="flex justify-between items-center relative">

            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0" />

            {steps.map((stepItem, index) => {
              const StepIcon = stepItem.icon;

              const isCompleted = step > index + 1;
              const isActive = step === index + 1;

              return (
                <div
                  key={stepItem.title}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isCompleted
                        ? 'bg-accent text-primary'
                        : isActive
                        ? 'bg-white text-primary ring-4 ring-white/20'
                        : 'bg-white/10 border-2 border-white/20 text-white/40'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-widest mt-2',
                      isActive ? 'text-white' : 'text-white/40'
                    )}
                  >
                    {stepItem.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Card */}
        <Card className="rounded-[40px] overflow-hidden shadow-2xl border-none">
          <CardContent className="p-8 md:p-12">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Where do you want to go?
                  </h2>

                  <p className="text-muted-foreground">
                    Select a city and property to see available spaces.
                  </p>
                </div>

                {/* Cities */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Select City
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cities.map((city) => (
                      <div
                        key={city.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            cityId: city.id,
                            propertyId: '',
                            roomId: '',
                          })
                        }
                        className={cn(
                          'p-4 rounded-2xl border-2 text-center cursor-pointer transition-all',
                          formData.cityId === city.id
                            ? 'border-primary bg-primary/5'
                            : 'border-neutral-100 opacity-60 grayscale hover:grayscale-0'
                        )}
                      >
                        <span className="font-bold">
                          {city.name}
                        </span>

                        {city.status === 'Coming Soon' && (
                          <div className="text-[8px] text-accent font-bold mt-1">
                            SOON
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Properties */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Available Properties
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((property) => (
                        <div
                          key={property.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              propertyId: property.id,
                              roomId: '',
                            })
                          }
                          className={cn(
                            'p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4',
                            formData.propertyId === property.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-neutral-100 hover:border-neutral-200'
                          )}
                        >
                          <Building2 className="w-8 h-8 text-primary opacity-20" />

                          <div>
                            <div className="font-bold">
                              {property.name}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              {property.area}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 py-8 text-center text-muted-foreground italic">
                        No properties available in this city yet.
                      </div>
                    )}

                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={nextStep}
                    disabled={!formData.propertyId}
                    className="w-full h-14 rounded-2xl font-bold text-lg"
                  >
                    Continue
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Choose Your Space
                  </h2>

                  <p className="text-muted-foreground">
                    Available rooms at {selectedProperty?.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            roomId: room.id,
                          })
                        }
                        className={cn(
                          'rounded-3xl border-2 overflow-hidden cursor-pointer transition-all relative',
                          formData.roomId === room.id
                            ? 'border-primary bg-primary/5 shadow-xl'
                            : 'border-neutral-100 hover:border-neutral-200'
                        )}
                      >
                        <div className="relative h-40">
                          <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />

                          <div className="absolute top-3 left-3">
                            <Badge className="bg-white/90 text-primary border-none text-[10px]">
                              {room.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">
                              {room.name}
                            </span>

                            <span className="text-primary font-bold">
                              ₹{room.pricePerHour}/hr
                            </span>
                          </div>

                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {room.description}
                          </div>
                        </div>

                        {formData.roomId === room.id && (
                          <div className="absolute top-3 right-3 bg-primary text-white p-1 rounded-full">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center text-muted-foreground">
                      No rooms available for this property.
                    </div>
                  )}

                </div>

                <div className="pt-6 flex gap-4">

                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl font-bold"
                  >
                    <ChevronLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>

                  <Button
                    onClick={nextStep}
                    disabled={!formData.roomId}
                    className="flex-1 h-14 rounded-2xl font-bold text-lg"
                  >
                    Continue
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>

                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    When do you need it?
                  </h2>

                  <p className="text-muted-foreground">
                    Select date, time and duration for your stay.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                  {/* Calendar */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Select Date
                    </label>

                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setFormData({
                            ...formData,
                            date: selectedDate,
                          });
                        }
                      }}
                      className="rounded-2xl border border-neutral-100 shadow-sm"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-8">

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-primary" />
                        Start Time
                      </label>

                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                        className="h-14 rounded-2xl border-neutral-200 bg-neutral-50 font-bold"
                      />
                    </div>

                    {/* Duration */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                        <Hourglass className="w-3 h-3 mr-1 text-primary" />
                        Duration (Hours)
                      </label>

                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((hours) => (
                          <div
                            key={hours}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                duration: hours,
                              })
                            }
                            className={cn(
                              'h-14 rounded-2xl border-2 flex items-center justify-center font-bold cursor-pointer transition-all',
                              formData.duration === hours
                                ? 'border-primary bg-primary text-white'
                                : 'border-neutral-100 bg-neutral-50 text-neutral-600'
                            )}
                          >
                            {hours}h
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20">
                      <div className="text-xs font-bold text-primary uppercase mb-2">
                        Booking Summary
                      </div>

                      <div className="text-sm">
                        {format(formData.date, 'PPPP')} at{' '}
                        {formData.startTime} for{' '}
                        {formData.duration} hours
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-6 flex gap-4">

                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl font-bold"
                  >
                    <ChevronLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>

                  <Button
                    onClick={nextStep}
                    className="flex-1 h-14 rounded-2xl font-bold text-lg"
                  >
                    Continue
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>

                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Make it Special
                  </h2>

                  <p className="text-muted-foreground">
                    Add an experience to your room booking.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Room Only */}
                  <div
                    onClick={() =>
                      setFormData({
                        ...formData,
                        experienceId: '',
                      })
                    }
                    className={cn(
                      'p-6 rounded-[32px] border-2 cursor-pointer transition-all flex items-center space-x-4',
                      !formData.experienceId
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-neutral-100 hover:border-neutral-200'
                    )}
                  >
                    <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-neutral-400" />
                    </div>

                    <div>
                      <div className="font-bold text-lg">
                        Room Only
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Just a private space to relax
                      </div>
                    </div>
                  </div>

                  {/* Experiences */}
                  {experiences.map((experience) => (
                    <div
                      key={experience.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          experienceId: experience.id,
                        })
                      }
                      className={cn(
                        'p-6 rounded-[32px] border-2 cursor-pointer transition-all flex items-center space-x-4',
                        formData.experienceId === experience.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-neutral-100 hover:border-neutral-200'
                      )}
                    >
                      <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center overflow-hidden">
                        <Image
                          src={experience.image}
                          alt={experience.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <div className="font-bold text-lg">
                          {experience.name}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          + ₹{experience.price} add-on
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="pt-6 flex gap-4">

                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl font-bold"
                  >
                    <ChevronLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>

                  <Button
                    onClick={nextStep}
                    className="flex-1 h-14 rounded-2xl font-bold text-lg"
                  >
                    Continue
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>

                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Guest Information
                  </h2>

                  <p className="text-muted-foreground">
                    We need these details for your booking confirmation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </label>

                    <Input
                      placeholder="Enter your name"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
                      className="h-14 rounded-2xl bg-neutral-50 border-neutral-200"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Mobile Number
                    </label>

                    <Input
                      placeholder="10-digit mobile number"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerPhone: e.target.value,
                        })
                      }
                      className="h-14 rounded-2xl bg-neutral-50 border-neutral-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Email Address
                    </label>

                    <Input
                      placeholder="your@email.com"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                      className="h-14 rounded-2xl bg-neutral-50 border-neutral-200"
                    />
                  </div>

                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex items-start space-x-3">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />

                  <p className="text-xs text-yellow-700 leading-relaxed">
                    Important: Valid government ID proof (Aadhaar/PAN)
                    of the guest is required during check-in. The room
                    is strictly for the number of guests mentioned above.
                  </p>
                </div>

                {/* Buttons */}
                <div className="pt-6 flex gap-4">

                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl font-bold"
                  >
                    <ChevronLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>

                  <Button
                    onClick={handleBooking}
                    disabled={
                      !formData.customerName ||
                      !formData.customerPhone ||
                      !formData.customerEmail
                    }
                    className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
                  >
                    Proceed to Payment
                  </Button>

                </div>

              </div>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">
            Loading booking...
          </div>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}