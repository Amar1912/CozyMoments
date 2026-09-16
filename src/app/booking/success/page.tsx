// app/booking/success/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Component that handles the actual search params logic
function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id') || searchParams.get('session_id');

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We have sent a confirmation details to your email.
      </p>

      {bookingId ? (
        <div className="bg-gray-50 p-3 rounded-md mb-6 text-sm text-gray-700 font-mono">
          Booking ID: <span className="font-semibold text-gray-900">{bookingId}</span>
        </div>
      ) : (
        <div className="bg-yellow-50 p-3 rounded-md mb-6 text-sm text-yellow-800">
          No booking ID found in URL.
        </div>
      )}

      <Link
        href="/"
        className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

// Fallback UI shown while Next.js prepares search parameters
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 text-sm">Loading booking details...</p>
    </div>
  );
}

// Main page export wrapped in Suspense boundary to prevent build-time prerender errors
export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Suspense fallback={<LoadingFallback />}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}