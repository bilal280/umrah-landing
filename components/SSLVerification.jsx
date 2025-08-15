"use client";

import { useEffect, useState } from 'react';

export default function SSLVerification() {
  const [isSecure, setIsSecure] = useState(false);
  const [protocol, setProtocol] = useState('');

  useEffect(() => {
    // Check if the site is using HTTPS
    const isHttps = window.location.protocol === 'https:';
    setIsSecure(isHttps);
    setProtocol(window.location.protocol);
  }, []);

  if (!isSecure) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-red-800 font-medium">تحذير الأمان</span>
        </div>
        <p className="text-red-700 text-sm mt-1">
          هذا الموقع لا يستخدم اتصال آمن (HTTPS). يرجى التأكد من استخدام اتصال آمن لإتمام المعاملات المالية.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-green-800 font-medium">اتصال آمن</span>
      </div>
      <p className="text-green-700 text-sm mt-1">
        هذا الموقع يستخدم اتصال آمن (HTTPS) مع شهادة SSL صالحة. بياناتك محمية ومشفرة.
      </p>
    </div>
  );
} 