"use client";

import { useState, useRef } from "react";
import { CheckIcon, AlertCircleIcon, ChevronDownIcon } from "lucide-react";

const FormSelect = ({ 
  name, 
  value, 
  onChange, 
  options = [], 
  placeholder = "", 
  label = "", 
  required = false, 
  className = "",
  validation = null // Function that returns { isValid: boolean, message: string }
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const selectRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const handleChange = (e) => {
    onChange(e);
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
        className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
          isFocused 
            ? 'ring-2 ring-orange-500 ring-opacity-50 shadow-lg scale-[1.02]' 
            : 'ring-1 ring-gray-300 hover:ring-orange-300'
        } ${showError ? 'ring-red-500' : ''} rounded-lg bg-white`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <select
            ref={selectRef}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className="flex-1 border-0 outline-none bg-transparent text-right text-gray-900 cursor-pointer appearance-none"
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Success indicator */}
          {isTouched && isValid && value && (
            <div className="text-green-500 animate-fadeIn mr-2">
              <CheckIcon className="w-5 h-5" />
            </div>
          )}

          {/* Error indicator */}
          {showError && (
            <div className="text-red-500 animate-fadeIn mr-2">
              <AlertCircleIcon className="w-5 h-5" />
            </div>
          )}

          {/* Dropdown arrow */}
          {!showError && !(isTouched && isValid && value) && (
            <ChevronDownIcon className="w-5 h-5 text-gray-400 mr-2" />
          )}
        </div>
      </div>

      {/* Validation message */}
      {showError && (
        <div className="mt-2 text-red-500 text-sm animate-fadeIn flex items-center">
          <AlertCircleIcon className="w-4 h-4 ml-1" />
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
      `}</style>
    </div>
  );
};

export default FormSelect; 