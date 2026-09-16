// app/checkout/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Component that reads query params or performs client-side checkout state logic
function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'Standard';

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-6">
        Complete your payment details below.
      </p>

      <div className="bg-gray-50 p-3 rounded-md mb-6 text-sm text-gray-700 font-mono">
        Selected Plan: <span className="font-semibold text-gray-900">{plan}</span>
      </div>

      {/* Insert your Checkout Form / Payment Button here */}
      <button
        type="button"
        className="w-full bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors mb-4"
      >
        Proceed to Pay
      </button>

      <Link
        href="/"
        className="inline-block text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Cancel and return home
      </Link>
    </div>
  );
}

// Fallback loader during static pre-rendering
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 text-sm">Preparing checkout...</p>
    </div>
  );
}

// Export default wrapped in a Suspense boundary to fix the prerender build crash
export default function CheckoutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Suspense fallback={<LoadingFallback />}>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}