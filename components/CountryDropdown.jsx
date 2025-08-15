"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

const COUNTRIES = [
  { id: 1, code: "KW", name: "الكويت", flag: "🇰🇼" },
  { id: 2, code: "SA", name: "السعودية", flag: "🇸🇦" },
  { id: 3, code: "AE", name: "الإمارات", flag: "🇦🇪" },
  { id: 4, code: "QA", name: "قطر", flag: "🇶🇦" },
  { id: 5, code: "BH", name: "البحرين", flag: "🇧🇭" },
  { id: 6, code: "OM", name: "عمان", flag: "🇴🇲" },
  { id: 7, code: "JO", name: "الأردن", flag: "🇯🇴" },
  { id: 8, code: "LB", name: "لبنان", flag: "🇱🇧" },
  { id: 9, code: "EG", name: "مصر", flag: "🇪🇬" },
  { id: 10, code: "MA", name: "المغرب", flag: "🇲🇦" },
  { id: 11, code: "TN", name: "تونس", flag: "🇹🇳" },
  { id: 12, code: "DZ", name: "الجزائر", flag: "🇩🇿" },
  { id: 13, code: "LY", name: "ليبيا", flag: "🇱🇾" },
  { id: 14, code: "SD", name: "السودان", flag: "🇸🇩" },
  { id: 15, code: "SO", name: "الصومال", flag: "🇸🇴" },
  { id: 16, code: "DJ", name: "جيبوتي", flag: "🇩🇯" },
  { id: 17, code: "PS", name: "فلسطين", flag: "🇵🇸" },
  { id: 18, code: "TR", name: "تركيا", flag: "🇹🇷" },
  { id: 19, code: "IR", name: "إيران", flag: "🇮🇷" },
  { id: 20, code: "PK", name: "باكستان", flag: "🇵🇰" },
  { id: 21, code: "AF", name: "أفغانستان", flag: "🇦🇫" },
  { id: 22, code: "IN", name: "الهند", flag: "🇮🇳" },
  { id: 23, code: "BD", name: "بنغلاديش", flag: "🇧🇩" },
  { id: 24, code: "LK", name: "سريلانكا", flag: "🇱🇰" },
  { id: 25, code: "NP", name: "نيبال", flag: "🇳🇵" },
  { id: 26, code: "BT", name: "بوتان", flag: "🇧🇹" },
  { id: 27, code: "MM", name: "ميانمار", flag: "🇲🇲" },
  { id: 28, code: "TH", name: "تايلاند", flag: "🇹🇭" },
  { id: 29, code: "LA", name: "لاوس", flag: "🇱🇦" },
  { id: 30, code: "VN", name: "فيتنام", flag: "🇻🇳" },
  { id: 31, code: "KH", name: "كمبوديا", flag: "🇰🇭" },
  { id: 32, code: "MY", name: "ماليزيا", flag: "🇲🇾" },
  { id: 33, code: "SG", name: "سنغافورة", flag: "🇸🇬" },
  { id: 34, code: "ID", name: "إندونيسيا", flag: "🇮🇩" },
  { id: 35, code: "PH", name: "الفلبين", flag: "🇵🇭" },
  { id: 36, code: "BN", name: "بروناي", flag: "🇧🇳" },
  { id: 37, code: "TL", name: "تيمور الشرقية", flag: "🇹🇱" },
  { id: 38, code: "CN", name: "الصين", flag: "🇨🇳" },
  { id: 39, code: "JP", name: "اليابان", flag: "🇯🇵" },
  { id: 40, code: "KR", name: "كوريا الجنوبية", flag: "🇰🇷" },
  { id: 41, code: "KP", name: "كوريا الشمالية", flag: "🇰🇵" },
  { id: 42, code: "MN", name: "منغوليا", flag: "🇲🇳" },
  { id: 43, code: "TW", name: "تايوان", flag: "🇹🇼" },
  { id: 44, code: "HK", name: "هونغ كونغ", flag: "🇭🇰" },
  { id: 45, code: "MO", name: "ماكاو", flag: "🇲🇴" },
  { id: 46, code: "US", name: "الولايات المتحدة", flag: "🇺🇸" },
  { id: 47, code: "CA", name: "كندا", flag: "🇨🇦" },
  { id: 48, code: "MX", name: "المكسيك", flag: "🇲🇽" },
  { id: 49, code: "PE", name: "بيرو", flag: "🇵🇪" },
  { id: 50, code: "CO", name: "كولومبيا", flag: "🇨🇴" },
  { id: 51, code: "VE", name: "فنزويلا", flag: "🇻🇪" },
  { id: 52, code: "EC", name: "الإكوادور", flag: "🇪🇨" },
  { id: 53, code: "BO", name: "بوليفيا", flag: "🇧🇴" },
  { id: 54, code: "PY", name: "باراغواي", flag: "🇵🇾" },
  { id: 55, code: "UY", name: "أوروغواي", flag: "🇺🇾" },
  { id: 56, code: "GY", name: "غيانا", flag: "🇬🇾" },
  { id: 57, code: "SR", name: "سورينام", flag: "🇸🇷" },
  { id: 58, code: "GF", name: "غيانا الفرنسية", flag: "🇬🇫" },
  { id: 59, code: "FK", name: "جزر فوكلاند", flag: "🇫🇰" },
  { id: 60, code: "GS", name: "جورجيا الجنوبية", flag: "🇬🇸" },
  { id: 61, code: "GB", name: "المملكة المتحدة", flag: "🇬🇧" },
  { id: 62, code: "FR", name: "فرنسا", flag: "🇫🇷" },
  { id: 63, code: "DE", name: "ألمانيا", flag: "🇩🇪" },
  { id: 64, code: "IT", name: "إيطاليا", flag: "🇮🇹" },
  { id: 65, code: "ES", name: "إسبانيا", flag: "🇪🇸" },
  { id: 66, code: "PT", name: "البرتغال", flag: "🇵🇹" },
  { id: 67, code: "NL", name: "هولندا", flag: "🇳🇱" },
  { id: 68, code: "BE", name: "بلجيكا", flag: "🇧🇪" },
  { id: 69, code: "CH", name: "سويسرا", flag: "🇨🇭" },
  { id: 70, code: "AT", name: "النمسا", flag: "🇦🇹" },
  { id: 71, code: "SE", name: "السويد", flag: "🇸🇪" },
  { id: 72, code: "NO", name: "النرويج", flag: "🇳🇴" },
  { id: 73, code: "DK", name: "الدنمارك", flag: "🇩🇰" },
  { id: 74, code: "FI", name: "فنلندا", flag: "🇫🇮" },
  { id: 75, code: "IS", name: "آيسلندا", flag: "🇮🇸" },
  { id: 76, code: "IE", name: "أيرلندا", flag: "🇮🇪" },
  { id: 77, code: "HU", name: "المجر", flag: "🇭🇺" },
  { id: 78, code: "RO", name: "رومانيا", flag: "🇷🇴" },
  { id: 79, code: "BG", name: "بلغاريا", flag: "🇧🇬" },
  { id: 80, code: "HR", name: "كرواتيا", flag: "🇭🇷" },
  { id: 81, code: "SI", name: "سلوفينيا", flag: "🇸🇮" },
  { id: 82, code: "RU", name: "روسيا", flag: "🇷🇺" },
  { id: 83, code: "UA", name: "أوكرانيا", flag: "🇺🇦" },
  { id: 84, code: "BY", name: "بيلاروسيا", flag: "🇧🇾" },
  { id: 85, code: "MD", name: "مولدوفا", flag: "🇲🇩" },
  { id: 86, code: "GE", name: "جورجيا", flag: "🇬🇪" },
  { id: 87, code: "AM", name: "أرمينيا", flag: "🇦🇲" },
  { id: 88, code: "AZ", name: "أذربيجان", flag: "🇦🇿" },
  { id: 89, code: "KZ", name: "كازاخستان", flag: "🇰🇿" },
  { id: 90, code: "UZ", name: "أوزبكستان", flag: "🇺🇿" },
  { id: 91, code: "KG", name: "قيرغيزستان", flag: "🇰🇬" },
  { id: 92, code: "TJ", name: "طاجيكستان", flag: "🇹🇯" },
  { id: 93, code: "TM", name: "تركمانستان", flag: "🇹🇲" },
  { id: 94, code: "AU", name: "أستراليا", flag: "🇦🇺" },
  { id: 95, code: "NZ", name: "نيوزيلندا", flag: "🇳🇿" },
  { id: 96, code: "FJ", name: "فيجي", flag: "🇫🇯" },
  { id: 97, code: "PG", name: "بابوا غينيا الجديدة", flag: "🇵🇬" },
  { id: 98, code: "SB", name: "جزر سليمان", flag: "🇸🇧" },
  { id: 99, code: "VU", name: "فانواتو", flag: "🇻🇺" },
  { id: 100, code: "NC", name: "كاليدونيا الجديدة", flag: "🇳🇨" },
  { id: 101, code: "PF", name: "بولينيزيا الفرنسية", flag: "🇵🇫" },
  { id: 102, code: "TO", name: "تونغا", flag: "🇹🇴" },
  { id: 103, code: "WS", name: "ساموا", flag: "🇼🇸" },
  { id: 104, code: "KI", name: "كيريباتي", flag: "🇰🇮" },
  { id: 105, code: "TV", name: "توفالو", flag: "🇹🇻" },
  { id: 106, code: "NR", name: "ناورو", flag: "🇳🇷" },
  { id: 107, code: "PW", name: "بالاو", flag: "🇵🇼" },
  { id: 108, code: "MH", name: "جزر مارشال", flag: "🇲🇭" },
  { id: 109, code: "FM", name: "ميكرونيزيا", flag: "🇫🇲" },
  { id: 110, code: "CK", name: "جزر كوك", flag: "🇨🇰" },
  { id: 111, code: "NU", name: "نيوي", flag: "🇳🇺" },
  { id: 112, code: "TK", name: "توكيلاو", flag: "🇹🇰" },
  { id: 113, code: "AS", name: "ساموا الأمريكية", flag: "🇦🇸" },
  { id: 114, code: "GU", name: "غوام", flag: "🇬🇺" },
  { id: 115, code: "MP", name: "جزر ماريانا الشمالية", flag: "🇲🇵" },
  { id: 116, code: "PR", name: "بورتوريكو", flag: "🇵🇷" },
  { id: 117, code: "VI", name: "جزر فيرجن الأمريكية", flag: "🇻🇮" },
  { id: 118, code: "AI", name: "أنغويلا", flag: "🇦🇮" },
  { id: 119, code: "VG", name: "جزر فيرجن البريطانية", flag: "🇻🇬" },
  { id: 120, code: "MS", name: "مونتسيرات", flag: "🇲🇸" },
  { id: 121, code: "TC", name: "جزر تركس وكايكوس", flag: "🇹🇨" },
  { id: 122, code: "KY", name: "جزر كايمان", flag: "🇰🇾" },
  { id: 123, code: "BB", name: "بربادوس", flag: "🇧🇧" },
  { id: 124, code: "GD", name: "غرينادا", flag: "🇬🇩" },
  { id: 125, code: "LC", name: "سانت لوسيا", flag: "🇱🇨" },
  { id: 126, code: "VC", name: "سانت فنسنت والغرينادين", flag: "🇻🇨" },
  { id: 127, code: "AG", name: "أنتيغوا وباربودا", flag: "🇦🇬" },
  { id: 128, code: "KN", name: "سانت كيتس ونيفيس", flag: "🇰🇳" },
  { id: 129, code: "DM", name: "دومينيكا", flag: "🇩🇲" },
  { id: 130, code: "JM", name: "جامايكا", flag: "🇯🇲" },
  { id: 131, code: "TT", name: "ترينيداد وتوباغو", flag: "🇹🇹" },
  { id: 132, code: "HT", name: "هايتي", flag: "🇭🇹" },
  { id: 133, code: "DO", name: "جمهورية الدومينيكان", flag: "🇩🇴" },
  { id: 134, code: "CU", name: "كوبا", flag: "🇨🇺" },
  { id: 135, code: "BS", name: "الباهاما", flag: "🇧🇸" },
  { id: 136, code: "BZ", name: "بليز", flag: "🇧🇿" },
  { id: 137, code: "GT", name: "غواتيمالا", flag: "🇬🇹" },
  { id: 138, code: "SV", name: "السلفادور", flag: "🇸🇻" },
  { id: 139, code: "HN", name: "هندوراس", flag: "🇭🇳" },
  { id: 140, code: "NI", name: "نيكاراغوا", flag: "🇳🇮" },
  { id: 141, code: "CR", name: "كوستاريكا", flag: "🇨🇷" },
  { id: 142, code: "PA", name: "بنما", flag: "🇵🇦" },
  { id: 143, code: "ZA", name: "جنوب أفريقيا", flag: "🇿🇦" },
  { id: 144, code: "NG", name: "نيجيريا", flag: "🇳🇬" },
  { id: 145, code: "KE", name: "كينيا", flag: "🇰🇪" },
  { id: 146, code: "UG", name: "أوغندا", flag: "🇺🇬" },
  { id: 147, code: "TZ", name: "تنزانيا", flag: "🇹🇿" },
  { id: 148, code: "RW", name: "رواندا", flag: "🇷🇼" },
  { id: 149, code: "BI", name: "بوروندي", flag: "🇧🇮" },
  { id: 150, code: "CD", name: "جمهورية الكونغو الديمقراطية", flag: "🇨🇩" },
  { id: 151, code: "CG", name: "جمهورية الكونغو", flag: "🇨🇬" },
  { id:152, code: "GA", name: "الغابون", flag: "🇬🇦" },
  { id:153, code: "CM", name: "الكاميرون", flag: "🇨🇲" },
  { id:154, code: "CF", name: "جمهورية أفريقيا الوسطى", flag: "🇨🇫" },
  { id:155, code: "TD", name: "تشاد", flag: "🇹🇩" },
{ id:156, code: "NE", name: "النيجر", flag: "🇳🇪" },
{ id:157, code: "ML", name: "مالي", flag: "🇲🇱" },
{ id:158, code: "BF", name: "بوركينا فاسو", flag: "🇧🇫" },
{ id:159, code: "CI", name: "ساحل العاج", flag: "🇨🇮" },
{ id:160, code: "GH", name: "غانا", flag: "🇬🇭" },
{ id:161, code: "TG", name: "توغو", flag: "🇹🇬" },
{ id:162, code: "BJ", name: "بنين", flag: "🇧🇯" },
{ id:163, code: "GW", name: "غينيا بيساو", flag: "🇬🇼" },
{ id:164, code: "GN", name: "غينيا", flag: "🇬🇳" },
{ id:165, code: "SL", name: "سيراليون", flag: "🇸🇱" },
{ id:166, code: "LR", name: "ليبيريا", flag: "🇱🇷" },
{ id:167, code: "SN", name: "السنغال", flag: "🇸🇳" },
{ id:168, code: "GM", name: "غامبيا", flag: "🇬🇲" },
{ id:169, code: "CV", name: "الرأس الأخضر", flag: "🇨🇻" },
{ id:170, code: "MR", name: "موريتانيا", flag: "🇲🇷" },
{ id:171, code: "EH", name: "الصحراء الغربية", flag: "🇪🇭" },
{ id:172, code: "ET", name: "إثيوبيا", flag: "🇪🇹" },
{ id:173, code: "ER", name: "إريتريا", flag: "🇪🇷" },
{ id:174, code: "SS", name: "جنوب السودان", flag: "🇸🇸" },
{ id:175, code: "GQ", name: "غينيا الاستوائية", flag: "🇬🇶" },
{ id:176, code: "ST", name: "ساو تومي وبرينسيبي", flag: "🇸🇹" },
{ id:177, code: "AO", name: "أنغولا", flag: "🇦🇴" },
{ id:178, code: "ZM", name: "زامبيا", flag: "🇿🇲" },
{ id:179, code: "ZW", name: "زيمبابوي", flag: "🇿🇼" },
{ id:180, code: "BW", name: "بوتسوانا", flag: "🇧🇼" },
{ id:181, code: "NA", name: "ناميبيا", flag: "🇳🇦" },
{ id:182, code: "LS", name: "ليسوتو", flag: "🇱🇸" },
{ id:183, code: "SZ", name: "إسواتيني", flag: "🇸🇿" },
{ id:184, code: "MG", name: "مدغشقر", flag: "🇲🇬" },
{ id:185, code: "MU", name: "موريشيوس", flag: "🇲🇺" },
{ id:186, code: "SC", name: "سيشل", flag: "🇸🇨" },
{ id:187, code: "RE", name: "لا ريونيون", flag: "🇷🇪" },
{ id:188, code: "YT", name: "مايوت", flag: "🇾🇹" },
{ id:189, code: "IO", name: "إقليم المحيط الهندي البريطاني", flag: "🇮🇴" },
{ id:190, code: "TF", name: "الأراضي الفرنسية الجنوبية", flag: "🇹🇫" },
{ id:191, code: "HM", name: "جزيرة هيرد وجزر ماكدونالد", flag: "🇭🇲" },
{ id:192, code: "AQ", name: "أنتاركتيكا", flag: "🇦🇶" }

];

const CountryDropdown = ({ value, onChange, className = "", placeholder = "اختر البلد", validation = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCountry = COUNTRIES.find(country => country.code === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.includes(searchTerm) || country.code.includes(searchTerm.toUpperCase())
  );

  const handleSelect = (country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchTerm("");
    setIsTouched(true);
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
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`
          relative cursor-pointer transition-all duration-300 ease-in-out
          ${isOpen 
            ? 'ring-2 ring-orange-500 ring-opacity-50 shadow-lg scale-[1.02]' 
            : 'ring-1 ring-gray-300 hover:ring-orange-300'
          }
          ${showError ? 'ring-red-500' : ''}
          rounded-lg bg-white
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3 space-x-reverse">
            {selectedCountry ? (
              <>
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-gray-900">{selectedCountry.name}</span>
              </>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
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

          {/* Dropdown arrow */}
          {!showError && !(isTouched && isValid && value) && (
            <ChevronDownIcon 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden animate-fadeIn">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="ابحث عن بلد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="flex items-center space-x-3 space-x-reverse px-4 py-2 hover:bg-orange-50 cursor-pointer transition-colors duration-150"
                onClick={() => handleSelect(country)}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-gray-900">{country.name}</span>
                <span className="text-xs text-gray-500 mr-auto">{country.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CountryDropdown; 