export interface City {
  id: string;
  name: string;
  image: string;
  propertyCount: number;
  roomCount: number;
  experienceCount: number;
  status: 'Available Now' | 'Coming Soon';
  slug: string;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  category: 'Cozy' | 'Premium' | 'Signature';
  images: string[];
  amenities: string[];
  features: string[];
  propertyId: string;
  status: 'Available' | 'Coming Soon';
}

export interface Property {
  id: string;
  name: string;
  cityId: string;
  area: string;
  rating: number;
  startingPrice: number;
  image: string;
  amenities: string[];
  rooms: string[]; // room IDs
}

export interface Experience {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  image: string;
  included: string[];
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  roomName: string;
  comment: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  roomId: string;
  date: string;
  startTime: string;
  duration: number;
  totalAmount: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
