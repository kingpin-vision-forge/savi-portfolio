'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { 
  ShieldCheck, ArrowRight, Package, MapPin, Phone, User, Mail, 
  CheckCircle2, MessageCircle, QrCode, Smartphone, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// Replace with client's actual WhatsApp number
const WHATSAPP_NUMBER = '917760161401'; // Format: country code + number without +

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
    transactionId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const proceedToPayment = () => {
    if (formData.firstName && formData.phone && formData.address && formData.city && formData.pincode) {
      setStep(2);
    }
  };

  const generateWhatsAppMessage = () => {
    const orderItems = items.map(item => 
      `• ${item.name} (${item.size}) × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🛒 *New Order from SAVI Website*

📦 *Order Details:*
${orderItems}

💰 *Total: ₹${totalPrice.toLocaleString()}*

👤 *Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}

📍 *Delivery Address:*
${formData.address}
${formData.city} - ${formData.pincode}

${formData.notes ? `📝 Notes: ${formData.notes}` : ''}

💳 *Payment Details:*
Transaction ID: ${formData.transactionId}
✅ Payment confirmed via PhonePe`;

    return encodeURIComponent(message);
  };

  const confirmPaymentAndRedirect = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
    setStep(3);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#1a1a1a]">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center p-10">
            <Package className="size-20 text-white/10 mx-auto mb-6" />
            <h1 className="text-white text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Add some products before checkout</p>
            <Link 
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[#00C853] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#00e676] transition-all"
            >
              Browse Marketplace
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#1a1a1a]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Confirmation' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className={`flex items-center gap-3 ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                  <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > s.num ? 'bg-[#00C853] text-white' : 
                    step === s.num ? 'bg-white text-[#1a1a1a]' : 
                    'bg-[#2d2d2d] text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="size-5" /> : s.num}
                  </div>
                  <span className="font-medium hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && <div className={`w-12 h-px ${step > s.num ? 'bg-[#00C853]' : 'bg-[#2d2d2d]'}`} />}
              </div>
            ))}
          </div>

          {step === 3 ? (
            // Order Confirmed
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="size-24 rounded-full bg-[#00C853]/20 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="size-12 text-[#00C853]" />
              </div>
              <h1 className="text-white text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-gray-400 text-lg mb-8">
                Your order details have been sent to WhatsApp. Our team will confirm your order shortly.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all"
              >
                Back to Home
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-7">
                {step === 1 ? (
                  // Shipping Form
                  <div className="bg-[#2d2d2d] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-white text-2xl font-bold mb-8 flex items-center gap-3">
                      <MapPin className="size-6 text-[#00C853]" />
                      Shipping Details
                    </h2>

                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-300 mb-2 block">First Name *</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full bg-white rounded-2xl pl-12 pr-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                              placeholder="John" 
                              type="text"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-300 mb-2 block">Last Name</label>
                          <input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                            placeholder="Doe" 
                            type="text" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl pl-12 pr-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                            placeholder="+91 77601 61401" 
                            type="tel"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Email (Optional)</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl pl-12 pr-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                            placeholder="john@example.com" 
                            type="email" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Delivery Address *</label>
                        <textarea 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853] resize-none" 
                          placeholder="House/Flat No., Building, Street, Landmark" 
                          rows={2}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-300 mb-2 block">City *</label>
                          <input 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                            placeholder="Mumbai" 
                            type="text"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-300 mb-2 block">Pincode *</label>
                          <input 
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                            placeholder="400001" 
                            type="text"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Order Notes (Optional)</label>
                        <textarea 
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853] resize-none" 
                          placeholder="Any special delivery instructions..." 
                          rows={2}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={proceedToPayment}
                      disabled={!formData.firstName || !formData.phone || !formData.address || !formData.city || !formData.pincode}
                      className="w-full mt-8 bg-[#00C853] hover:bg-[#00e676] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-2xl py-4 transition-all flex items-center justify-center gap-2 group"
                    >
                      Continue to Payment
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  // Payment Step
                  <div className="bg-[#2d2d2d] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-white text-2xl font-bold mb-8 flex items-center gap-3">
                      <Smartphone className="size-6 text-[#00C853]" />
                      Pay with PhonePe
                    </h2>

                    <div className="flex flex-col items-center text-center mb-8">
                      {/* PhonePe QR Code Placeholder */}
                      <div className="bg-white rounded-3xl p-6 mb-6">
                        <div className="size-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center">
                          <QrCode className="size-20 text-[#5f259f] mb-2" />
                          <p className="text-gray-500 text-xs">PhonePe QR Code</p>
                        </div>
                      </div>

                      <div className="bg-[#5f259f]/10 rounded-2xl p-4 mb-6 w-full max-w-sm">
                        <p className="text-[#5f259f] font-bold text-3xl mb-1">₹{totalPrice.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Scan to pay with PhonePe</p>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-2xl p-4 text-left w-full mb-6">
                        <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                          <AlertCircle className="size-4 text-yellow-500" />
                          Payment Instructions
                        </h4>
                        <ol className="text-gray-400 text-sm space-y-2">
                          <li>1. Open PhonePe app on your phone</li>
                          <li>2. Tap &quot;Scan&quot; and scan the QR code above</li>
                          <li>3. Enter the exact amount: <strong className="text-white">₹{totalPrice.toLocaleString()}</strong></li>
                          <li>4. Complete the payment</li>
                          <li>5. Enter your Transaction ID below</li>
                        </ol>
                      </div>

                      {/* Transaction ID Input */}
                      <div className="w-full">
                        <label className="text-sm font-semibold text-gray-300 mb-2 block text-left">PhonePe Transaction ID / UTR Number *</label>
                        <input 
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853] text-center tracking-wider" 
                          placeholder="Enter 12-digit UTR number" 
                          type="text"
                          required
                        />
                        <p className="text-gray-500 text-xs mt-2 text-center">Find this in your PhonePe transaction details</p>
                      </div>
                    </div>

                    <button 
                      onClick={confirmPaymentAndRedirect}
                      disabled={!formData.transactionId}
                      className="w-full bg-[#25D366] hover:bg-[#22c55e] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-2xl py-4 transition-all flex items-center justify-center gap-3 group shadow-lg"
                    >
                      <MessageCircle className="size-5" />
                      Confirm Payment & Send Order
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                      onClick={() => setStep(1)}
                      className="w-full mt-4 text-gray-400 hover:text-white font-medium py-3 transition-colors"
                    >
                      ← Back to Shipping
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5">
                <div className="bg-[#2d2d2d] rounded-3xl p-6 border border-white/5 sticky top-28">
                  <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <Package className="size-5 text-[#00C853]" />
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5">
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-gray-500 text-sm">{item.size} × {item.quantity}</p>
                        </div>
                        <span className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 py-4 border-t border-white/10">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery</span>
                      <span className="text-[#00C853]">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-[#00C853] font-bold text-2xl">₹{totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="mt-6 p-4 bg-[#1a1a1a] rounded-2xl flex items-center gap-3">
                    <ShieldCheck className="size-5 text-[#00C853] shrink-0" />
                    <p className="text-gray-400 text-xs">
                      Your order is protected by SAVI&apos;s quality guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
