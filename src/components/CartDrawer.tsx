'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] z-50 shadow-2xl flex flex-col border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="size-5 text-[#00C853]" />
            <h2 className="text-white text-xl font-bold">Your Cart</h2>
            <span className="bg-[#00C853] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="size-16 text-white/10 mb-4" />
              <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-500 text-sm mb-6">Add some premium hydration!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#00C853] font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-[#2d2d2d] rounded-2xl p-4 border border-white/5">
                  <div className="flex gap-4">
                    {/* Product Image Placeholder */}
                    <div className="size-20 rounded-xl bg-[#222] flex items-center justify-center shrink-0">
                      <ShoppingBag className="size-8 text-white/20" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white font-bold text-sm truncate pr-2">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">{item.size}</p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-full p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="size-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-white font-bold text-sm w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="size-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        
                        <span className="text-[#00C853] font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#121212]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white text-2xl font-bold">₹{totalPrice.toLocaleString()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-[#00C853] hover:bg-[#00e676] text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#00C853]/30 group"
            >
              Proceed to Checkout
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
