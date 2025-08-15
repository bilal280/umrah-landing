"use client";

import { useState, useRef, useEffect } from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInput = ({ value, onChange, className = "", placeholder = "رقم الهاتف", validation = null }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const handleChange = (phoneValue) => {
    onChange(phoneValue);
  };

  // Validation logic
  const getValidationState = () => {
    if (!validation) return { isValid: true, message: "" };
    
    const result = validation(value);
    return result;
  };

  const { isValid, message } = getValidationState();
  const showError = isTouched && !isValid && message;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative cursor-pointer transition-all duration-300 ease-in-out
          ${isFocused 
            ? 'ring-2 ring-orange-500 ring-opacity-50 shadow-lg scale-[1.02]' 
            : 'ring-1 ring-gray-300 hover:ring-orange-300'
          }
          ${showError ? 'ring-red-500' : ''}
          rounded-lg bg-white
        `}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <PhoneInputWithCountry
            ref={inputRef}
            international
            defaultCountry="KW"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="
              flex-1
              border-0 outline-none
              bg-transparent
              placeholder-gray-400
              transition-all duration-200
              focus:placeholder-gray-300
              text-right
            "
            countrySelectProps={{
              className: "text-right"
            }}
          />
          
          {/* Success indicator */}
          {isTouched && isValid && value && (
            <div className="text-green-500 animate-fadeIn mr-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Error indicator */}
          {showError && (
            <div className="text-red-500 animate-fadeIn mr-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Validation message */}
      {showError && (
        <div className="mt-2 text-red-500 text-sm animate-fadeIn">
          {message}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom styles for react-phone-number-input */
        :global(.PhoneInput) {
          display: flex;
          align-items: center;
          flex: 1;
        }

        :global(.PhoneInputCountry) {
          margin-left: 0.5rem;
          margin-right: 0;
        }

        :global(.PhoneInputCountrySelect) {
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          color: #374151;
        }

        :global(.PhoneInputCountryIcon) {
          width: 20px;
          height: 15px;
          margin-left: 0.5rem;
        }

        :global(.PhoneInputInput) {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: #111827;
          text-align: right;
          direction: ltr;
        }

        :global(.PhoneInputInput::placeholder) {
          color: #9CA3AF;
          text-align: right;
        }

        :global(.PhoneInputInput:focus::placeholder) {
          color: #D1D5DB;
        }
      `}</style>
    </div>
  );
};

export default PhoneInput; 