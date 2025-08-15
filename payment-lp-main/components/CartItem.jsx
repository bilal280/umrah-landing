import Image from "next/image";
import { useCart } from "../lib/cartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const price = parseFloat(item.price.replace('$', '')) || 0;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="w-16 h-16 relative flex-shrink-0">
        <Image 
          src={item.image} 
          alt={item.name} 
          width={64} 
          height={64} 
          className="object-cover rounded"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <div className="text-sm text-gray-600 mb-2">
          <div>العمر: {item.age}</div>
          <div>الحالة الصحية: {item.health}</div>
          <div>الوزن: {item.weight}</div>
        </div>
        <div className="font-bold text-orange-600">${price}</div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          
          <span className="w-12 text-center font-bold">{item.quantity}</span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="text-sm font-bold">
          ${(price * item.quantity).toFixed(2)}
        </div>
        
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-sm transition"
        >
          حذف
        </button>
      </div>
    </div>
  );
} 