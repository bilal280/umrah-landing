"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput from "../components/PhoneInput";
import CountryDropdown from "../components/CountryDropdown";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import React from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

const ROOM_TYPES = [
  {
    id: "quad",
    name: "الغرفة الرباعية",
    price: "1050",
    currency: "دولار",
    description: "4 أشخاص في الغرفة",
    icon: "👥👥",
  },
  {
    id: "triple",
    name: "الغرفة الثلاثية", 
    price: "1075",
    currency: "دولار",
    description: "3 أشخاص في الغرفة",
    icon: "👥👤",
  },
  {
    id: "double",
    name: "الغرفة الثنائية",
    price: "1100", 
    currency: "دولار",
    description: "شخصان في الغرفة",
    icon: "👥",
  },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    roomType: "",
    numberOfPeople: "1",
    specialRequests: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  // Mobile nav state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef();

  // Close mobile nav on outside click
  React.useEffect(() => {
    if (!mobileNavOpen) return;
    function handleClick(e) {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setMobileNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileNavOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCountryChange = (country) => {
    setForm((f) => ({ ...f, country }));
  };

  const handlePhoneChange = (phone) => {
    setForm((f) => ({ ...f, phone }));
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room.name);
    setForm(f => ({ ...f, roomType: room.id }));
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('booking-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Validation functions
  const validateName = (value) => {
    if (!value || value.trim().length < 2) {
      return { isValid: false, message: "يجب أن يكون الاسم أكثر من حرفين" };
    }
    if (value.trim().length > 50) {
      return { isValid: false, message: "يجب أن يكون الاسم أقل من 50 حرف" };
    }
    return { isValid: true, message: "" };
  };

  const validateEmail = (value) => {
    if (!value) {
      return { isValid: false, message: "يرجى إدخال البريد الإلكتروني" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: "يرجى إدخال بريد إلكتروني صحيح" };
    }
    return { isValid: true, message: "" };
  };

  const validateCountry = (value) => {
    if (!value) {
      return { isValid: false, message: "يرجى اختيار البلد" };
    }
    return { isValid: true, message: "" };
  };

  const validatePhone = (value) => {
    if (!value) {
      return { isValid: false, message: "يرجى إدخال رقم الهاتف" };
    }
    if (value.length < 8) {
      return { isValid: false, message: "يجب أن يكون رقم الهاتف صحيح" };
    }
    return { isValid: true, message: "" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if room type is selected
    if (!form.roomType) {
      alert("يرجى اختيار نوع الغرفة أولاً");
      return;
    }
    
    // Validate all fields before submission
    const nameValidation = validateName(form.name);
    const emailValidation = validateEmail(form.email);
    const countryValidation = validateCountry(form.country);
    const phoneValidation = validatePhone(form.phone);

    if (!nameValidation.isValid || !emailValidation.isValid || !countryValidation.isValid || !phoneValidation.isValid) {
      return; // Don't submit if validation fails
    }

    // Get selected room details
    const selectedRoomDetails = ROOM_TYPES.find(room => room.id === form.roomType);
    
    // Create booking data
    const bookingData = {
      roomType: selectedRoomDetails,
      numberOfPeople: form.numberOfPeople,
      specialRequests: form.specialRequests,
      customerInfo: {
        name: form.name,
        email: form.email,
        country: form.country,
        phone: form.phone
      },
      totalPrice: selectedRoomDetails ? selectedRoomDetails.price * parseInt(form.numberOfPeople) : 0
    };

    // For now, just show success message (you can integrate with your backend later)
    alert(`تم تسجيل طلبك بنجاح!\nنوع الغرفة: ${selectedRoomDetails.name}\nعدد الأشخاص: ${form.numberOfPeople}\nالمجموع: ${bookingData.totalPrice} دولار\nسيتم التواصل معك قريباً.`);
    
    // Reset form
    setForm({
      name: "",
      email: "",
      country: "",
      phone: "",
      roomType: "",
      numberOfPeople: "1",
      specialRequests: "",
    });
    setSelectedRoom("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slideIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">تم اختيار {selectedRoom} بنجاح!</span>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-white hover:text-gray-200 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Booking Button - Mobile Only */}
      {selectedRoom && (
        <div className="fixed bottom-6 left-6 z-40 md:hidden">
          <button
            onClick={scrollToForm}
            className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            aria-label="انتقل إلى نموذج الحجز"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section
         className="relative umrah-hero-section min-h-[480px] md:min-h-[600px] flex flex-col justify-between text-white px-0 "

      >
        {/* Light overlay for mobile only */}
        <div className="absolute inset-0 block md:hidden pointer-events-none z-10" style={{ background: 'rgba(92, 51, 23, 0.4)' }}></div>
        <div className="relative z-20">
        {/* Mobile Nav Button */}
        <div className="flex justify-between flex-row-reverse dir-rtl items-center px-4 pt-6 md:hidden">
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Open navigation menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center w-8 h-8">
              <img src="لوغو مآثر-01-01.png" alt="شركة ماثر" className="object-contain w-full h-full" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block w-full">
          <div className="max-w-7xl mx-auto w-full flex justify-between flex-row-reverse dir-rtl items-center px-10 pt-8">
            <div className="flex gap-10 text-lg font-medium">
              <a href="#" className="hover:underline">الرئيسية</a>
              <a href="#rooms" className="hover:underline">أنواع الغرف</a>
              <a href="#booking-form" className="hover:underline">احجز الآن</a>
              <a href="#program" className="hover:underline">البرنامج</a>
              <a href="#sheikh" className="hover:underline">الشيخ المرافق</a>
            </div>
            <div className="flex items-center w-[130px] h-[130px]">
              <img src="لوغو مآثر-01-01.png" alt="شركة ماثر" className="object-contain" />
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          ref={mobileNavRef}
          className={`fixed top-0 right-0 z-50 h-full w-64 bg-white text-amber-900 shadow-lg transform transition-transform duration-300 ease-in-out
            ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden dir-rtl flex flex-col`}
          style={{ fontFamily: 'inherit' }}
        >
          <div className="flex justify-between items-center p-4 border-b border-amber-100">
            <div className="flex items-center">
              <img src="لوغو مآثر-01-01.png" alt="شركة ماثر" className="w-8 h-8" />
            </div>
            <button
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Close navigation menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium p-6">
            <a href="#" className="hover:text-amber-600 transition" onClick={() => setMobileNavOpen(false)}>الرئيسية</a>
            <a href="#rooms" className="hover:text-amber-600 transition" onClick={() => setMobileNavOpen(false)}>أنواع الغرف</a>
            <a href="#booking-form" className="hover:text-amber-600 transition" onClick={() => setMobileNavOpen(false)}>احجز الآن</a>
            <a href="#program" className="hover:text-amber-600 transition" onClick={() => setMobileNavOpen(false)}>البرنامج</a>
            <a href="#sheikh" className="hover:text-amber-600 transition" onClick={() => setMobileNavOpen(false)}>الشيخ المرافق</a>
          </nav>
        </div>

        {/* Overlay when menu is open */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

    
        {/* Main hero content */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto px-10 py-16 md:py-24">
          <div className="flex-1 flex flex-col items-start text-right dir-rtl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-relaxed text-shadow-lg">عمرة الإرث النبوي 37</h1>
            <div className="mb-6 text-xl md:text-2xl font-semibold text-amber-200">
              من الديار التركية: 7 ليالٍ من 16 إلى 24 أيلول
            </div>
            <p className="mb-8 text-lg max-w-xl leading-relaxed">
              انضم إلينا في رحلة روحانية مميزة إلى الأراضي المقدسة مع الشيخ جهاد الكالوتي. 
              رحلة شاملة تتضمن الإقامة في فنادق 4 نجوم، زيارات المآثر النبوية، وبرامج منوعة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#rooms" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg transition text-lg shadow-lg">
                اختر غرفتك
              </a>
              <a href="#sheikh" className="bg-transparent border-2 border-white hover:bg-white hover:text-emerald-900 text-white font-bold py-3 px-8 rounded-lg transition text-lg">
                تعرف على الشيخ
              </a>
            </div>
          </div>
          <div className="flex-1 hidden md:block"></div>
        </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-stone-50 to-white" id="rooms">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-900">أنواع الغرف المتاحة</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">اختر نوع الغرفة المناسب لك من بين خياراتنا المتنوعة في فنادق 4 نجوم مع جميع وسائل الراحة</p>
        </div>
        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-6 max-w-md mx-auto md:hidden">
          {ROOM_TYPES.map((room) => (
            <div
              key={room.id}
              className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 transition-all duration-300 ${
                form.roomType === room.id ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-emerald-300'
              }`}
              style={{ minWidth: '0', maxWidth: '100%' }}
            >
              <div className="text-6xl mb-4">{room.icon}</div>
              <h3 className="font-bold text-2xl mb-2 text-center text-emerald-900">{room.name}</h3>
              <div className="text-stone-600 text-md mb-4 text-center leading-relaxed">
                <div className="mb-2">{room.description}</div>
              </div>
              <div className="font-bold text-emerald-700 text-3xl mb-4">{room.price} {room.currency}</div>
              <div className="text-sm text-stone-500 mb-4">للشخص الواحد</div>
              <button
                onClick={() => handleRoomSelect(room)}
                className={`font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  form.roomType === room.id 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {form.roomType === room.id ? 'تم الاختيار ✓' : 'اختر هذه الغرفة'}
              </button>
            </div>
          ))}
        </div>
        {/* Desktop/Tablet: grid layout */}
        <div className="max-w-6xl mx-auto hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROOM_TYPES.map((room) => (
              <div
                key={room.id}
                className={`bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border-2 transition-all duration-300 hover:shadow-xl ${
                  form.roomType === room.id ? 'border-emerald-500 bg-emerald-50 transform scale-105' : 'border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div className="text-8xl mb-6">{room.icon}</div>
                <h3 className="font-bold text-2xl mb-4 text-center text-emerald-900">{room.name}</h3>
                <div className="text-stone-600 text-lg mb-6 text-center leading-relaxed">
                  <div className="mb-2">{room.description}</div>
                </div>
                <div className="font-bold text-emerald-700 text-4xl mb-2">{room.price} {room.currency}</div>
                <div className="text-sm text-stone-500 mb-6">للشخص الواحد</div>
                <button
                  onClick={() => handleRoomSelect(room)}
                  className={`font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 w-full ${
                    form.roomType === room.id 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {form.roomType === room.id ? 'تم الاختيار ✓' : 'اختر هذه الغرفة'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sheikh Section */}
      <section className="py-16 px-4 bg-white" id="sheikh">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-right dir-rtl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-900">الشيخ المرافق</h2>
              <h3 className="text-2xl font-semibold mb-4 text-stone-700">الشيخ جهاد الكالوتي</h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                يشرفنا أن يرافقكم في هذه الرحلة المباركة الشيخ جهاد الكالوتي، أحد العلماء المتميزين 
                والمعروفين بعلمه الواسع وخبرته الطويلة في الإرشاد الديني والروحاني.
              </p>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>إرشاد ديني وروحاني طوال الرحلة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>شرح تاريخ الأماكن المقدسة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>الإجابة على الأسئلة الشرعية</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>تنظيم الأنشطة الدينية والثقافية</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/sheikh-jihad.jpg" 
                  alt="الشيخ جهاد الكالوتي" 
                  className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-emerald-100"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-3 rounded-full">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-stone-50 to-white" id="program">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-900">ما يشمله العرض</h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
            رحلة شاملة ومتكاملة تضمن لك تجربة روحانية مميزة بأعلى مستويات الراحة والخدمة
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">الطيران والتأشيرة</h3>
              <p className="text-stone-600">تذاكر الطيران ذهاباً وإياباً + التأشيرة</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">الإقامة</h3>
              <p className="text-stone-600">فنادق 4 نجوم مع جميع وسائل الراحة</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">الوجبات</h3>
              <p className="text-stone-600">وجبة الفطور يومياً</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🕌</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">الزيارات</h3>
              <p className="text-stone-600">زيارات المآثر النبوية والأماكن المقدسة</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚌</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">التنقلات</h3>
              <p className="text-stone-600">جميع التنقلات بحافلات مكيفة ومريحة</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-emerald-900">البرامج</h3>
              <p className="text-stone-600">برامج منوعة وأنشطة ثقافية ودينية</p>
            </div>
          </div>
        </div>
      </section>


      {/* Previous Trips Gallery */}
      <section className="py-16 px-4 bg-white" id="previous-trips">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-900">
            من رحلاتنا السابقة
          </h2>
          <p className="text-lg text-emerald-700">
            لقطات مميزة من رحلات العمرة السابقة التي نظمتها شركة ماثر
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <img src="الرحل السابقة  4.jpg" alt="رحلة 1" className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
    <img src="الرحل  السابقة 1.jpg" alt="رحلة 2" className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
    <img src="الرحل السابقة 3.jpg" alt="رحلة 3" className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
    <img src="الرحل السابقة 2.jpg" alt="رحلة 4" className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>


      {/* Booking Form Section */}
      <section className="py-16 px-4 bg-stone-100" id="booking-form">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-900">احجز مكانك الآن</h2>
            <p className="text-lg text-stone-600">املأ بياناتك لتأكيد حجزك في عمرة الإرث النبوي</p>
          </div>
          
          {/* Selected Room Summary */}
          {form.roomType && (
            <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
              <h3 className="text-xl font-bold mb-4 text-emerald-900">تفاصيل الحجز</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-stone-700">نوع الغرفة:</span>
                  <span className="mr-2 text-emerald-700">{ROOM_TYPES.find(r => r.id === form.roomType)?.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700">السعر:</span>
                  <span className="mr-2 text-emerald-700">{ROOM_TYPES.find(r => r.id === form.roomType)?.price} دولار للشخص</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700">عدد الأشخاص:</span>
                  <span className="mr-2 text-emerald-700">{form.numberOfPeople}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700">المجموع:</span>
                  <span className="mr-2 text-2xl font-bold text-emerald-700">
                    {ROOM_TYPES.find(r => r.id === form.roomType) ? 
                      (ROOM_TYPES.find(r => r.id === form.roomType).price * parseInt(form.numberOfPeople)) : 0
                    } دولار
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-emerald-900">المعلومات الشخصية</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-slideIn">
                  <label className="block mb-2 font-semibold text-stone-700">الاسم الكامل</label>
                  <FormInput
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    required
                    validation={validateName}
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
                  <label className="block mb-2 font-semibold text-stone-700">البريد الإلكتروني</label>
                  <FormInput
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                    validation={validateEmail}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
                  <label className="block mb-2 font-semibold text-stone-700">البلد</label>
                  <CountryDropdown 
                    value={form.country} 
                    onChange={handleCountryChange}
                    validation={validateCountry}
                  />
                </div>
                <div className="animate-slideIn" style={{ animationDelay: '0.3s' }}>
                  <label className="block mb-2 font-semibold text-stone-700">رقم الهاتف</label>
                  <PhoneInput 
                    value={form.phone} 
                    onChange={handlePhoneChange}
                    validation={validatePhone}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
                  <label className="block mb-2 font-semibold text-stone-700">عدد الأشخاص</label>
                  <FormSelect
                    name="numberOfPeople"
                    value={form.numberOfPeople}
                    onChange={handleChange}
                    options={[
                      { value: "1", label: "شخص واحد" },
                      { value: "2", label: "شخصان" },
                      { value: "3", label: "3 أشخاص" },
                      { value: "4", label: "4 أشخاص" },
                      { value: "5", label: "5 أشخاص" },
                      { value: "6", label: "6 أشخاص" }
                    ]}
                  />
                </div>
              </div>
              
              <div className="animate-slideIn" style={{ animationDelay: '0.5s' }}>
                <label className="block mb-2 font-semibold text-stone-700">طلبات خاصة (اختياري)</label>
                <textarea
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  placeholder="أي طلبات خاصة أو ملاحظات..."
                  rows="4"
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg animate-slideIn text-lg"
                style={{ animationDelay: '0.6s' }}
              >
                تأكيد الحجز
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white pt-12 pb-4 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="text-center md:text-right">
              <img src="/mather-logo.png" alt="شركة ماثر" className="w-20 h-20 mb-4 mx-auto md:mx-0" />
              <h3 className="text-xl font-bold mb-3">شركة ماثر للسياحة الدينية</h3>
              <p className="text-emerald-100 leading-relaxed">
                نقدم أفضل الخدمات السياحية الدينية مع الحرص على الجودة والراحة والأمان
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <div className="space-y-3 text-emerald-100">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+90 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@mather-travel.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>إسطنبول، تركيا</span>
                </div>
              </div>
            </div>
            
            {/* Trip Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">تفاصيل الرحلة</h3>
              <div className="space-y-2 text-emerald-100">
                <div>📅 16 - 24 أيلول 2024</div>
                <div>🕌 عمرة الإرث النبوي 37</div>
                <div>👨‍🏫 مع الشيخ جهاد الكالوتي</div>
                <div>⭐ فنادق 4 نجوم</div>
                <div>✈️ من إسطنبول</div>
              </div>
            </div>
          </div>
          
          <hr className="border-emerald-700 mb-6" />
          
          <div className="text-center">
            <p className="text-emerald-100 mb-4">
              رحلة روحانية مباركة في خدمة ضيوف الرحمن
            </p>
            <div className="text-sm text-emerald-200">
              © 2024 شركة ماثر للسياحة الدينية - جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
