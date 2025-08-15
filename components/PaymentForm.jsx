"use client";

import { useState } from "react";

export default function PaymentForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (basic)
    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = "رقم البطاقة غير صحيح";
    }

    // Card holder validation
    if (!formData.cardHolder || formData.cardHolder.trim().length < 3) {
      newErrors.cardHolder = "اسم حامل البطاقة مطلوب";
    }

    // Expiry month validation
    if (!formData.expiryMonth || formData.expiryMonth < 1 || formData.expiryMonth > 12) {
      newErrors.expiryMonth = "الشهر غير صحيح";
    }

    // Expiry year validation
    const currentYear = new Date().getFullYear();
    if (!formData.expiryYear || formData.expiryYear < currentYear) {
      newErrors.expiryYear = "السنة غير صحيحة";
    }

    // CVV validation
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "رمز الأمان غير صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رقم البطاقة
        </label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            setFormData(prev => ({ ...prev, cardNumber: formatted }));
          }}
          placeholder="0000 0000 0000 0000"
          maxLength="19"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اسم حامل البطاقة
        </label>
        <input
          type="text"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          placeholder="اسم حامل البطاقة"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.cardHolder ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cardHolder && (
          <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الشهر
          </label>
          <select
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">الشهر</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.expiryMonth && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            السنة
          </label>
          <select
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.expiryYear ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">السنة</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.expiryYear && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز الأمان
          </label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength="4"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
      >
        {loading ? "جاري المعالجة..." : "إتمام الدفع"}
      </button>
    </form>
  );
} 