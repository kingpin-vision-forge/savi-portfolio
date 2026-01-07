'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus, Package, Truck, Building, Check, Droplets } from 'lucide-react';

const products = [
  { id: 'savi-500ml', name: 'SAVI Pure', size: '500ml', price: 30, pack: 'Single Bottle' },
  { id: 'savi-1l', name: 'SAVI Pure', size: '1 Litre', price: 50, pack: 'Single Bottle' },
  { id: 'savi-2l', name: 'SAVI Pure', size: '2 Litre', price: 80, pack: 'Single Bottle' },
  { id: 'savi-500ml-12', name: 'SAVI Pure', size: '500ml × 12', price: 320, pack: 'Case of 12' },
  { id: 'savi-1l-6', name: 'SAVI Pure', size: '1L × 6', price: 280, pack: 'Case of 6' },
  { id: 'savi-5l', name: 'SAVI Premium', size: '5 Litre Jar', price: 120, pack: 'Reusable Jar' },
  { id: 'savi-20l', name: 'SAVI Premium', size: '20 Litre Dispenser', price: 200, pack: 'With Refill' },
  { id: 'savi-alkaline', name: 'SAVI Alkaline+', size: '1 Litre', price: 75, pack: 'Premium pH 8.5' },
];

export default function MarketplacePage() {
  const { addToCart, items, updateQuantity } = useCart();

  const getItemQuantity = (id: string) => {
    const item = items.find(i => i.id === id);
    return item?.quantity || 0;
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#1a1a1a] overflow-hidden">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="px-6 md:px-10 lg:px-20 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.2em] mb-4">Shop Premium Hydration</span>
              <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                The Marketplace
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Select your preferred format. From single bottles to corporate dispenser solutions.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const quantity = getItemQuantity(product.id);
                
                return (
                  <div key={product.id} className="bg-[#2d2d2d] rounded-3xl p-6 border border-white/5 hover:border-[#00C853]/20 transition-all group">
                    {/* Product Image */}
                    <div className="aspect-square rounded-2xl bg-[#222] mb-6 flex items-center justify-center relative overflow-hidden">
                      <Droplets className="size-20 text-white/10 group-hover:text-[#00C853]/20 transition-colors" />
                      <div className="absolute top-3 right-3 bg-[#00C853]/10 text-[#00C853] text-[10px] font-bold px-2 py-1 rounded-full">
                        {product.pack}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{product.size}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#00C853] font-bold text-2xl">₹{product.price}</span>
                      
                      {quantity === 0 ? (
                        <button 
                          onClick={() => addToCart({ 
                            id: product.id, 
                            name: product.name, 
                            price: product.price, 
                            size: product.size 
                          })}
                          className="flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-4 py-2.5 rounded-xl hover:bg-[#00C853] hover:text-white transition-all"
                        >
                          <ShoppingCart className="size-4" />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-xl p-1">
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bulk Orders Section */}
        <section id="bulk" className="px-6 md:px-10 lg:px-20 py-24 bg-[#121212]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Enterprise Solutions</span>
                <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-6">Bulk Orders</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  For orders exceeding 100 units, we offer dedicated account management, custom delivery schedules, and preferred pricing structures.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Package, label: 'Custom Packaging', desc: 'Branded solutions' },
                    { icon: Truck, label: 'Scheduled Delivery', desc: 'On your terms' },
                    { icon: Building, label: 'Corporate Pricing', desc: 'Volume discounts' },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#2d2d2d] rounded-2xl p-5 border border-white/5">
                      <item.icon className="size-6 text-[#00C853] mb-3" />
                      <h4 className="text-white font-bold text-sm mb-1">{item.label}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bulk Order Form */}
              <div className="bg-[#2d2d2d] rounded-3xl p-8 border border-white/5">
                <h3 className="text-white text-xl font-bold mb-6">Request Bulk Quote</h3>
                <form className="space-y-4">
                  <input 
                    className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                    placeholder="Company Name" 
                    type="text" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                      placeholder="Contact Person" 
                      type="text" 
                    />
                    <input 
                      className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                      placeholder="Phone Number" 
                      type="tel" 
                    />
                  </div>
                  <input 
                    className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853]" 
                    placeholder="Estimated Monthly Quantity" 
                    type="text" 
                  />
                  <textarea 
                    className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00C853] resize-none" 
                    placeholder="Additional Requirements" 
                    rows={3} 
                  />
                  <button 
                    type="button"
                    className="w-full bg-[#00C853] hover:bg-[#00e676] text-white font-bold rounded-2xl py-4 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="size-4" />
                    Request Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Section */}
        <section id="corporate" className="px-6 md:px-10 lg:px-20 py-24 bg-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto text-center">
            <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">B2B Solutions</span>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-6">Corporate Supply</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
              Partner with SAVI for reliable, premium hydration solutions for your office, events, and hospitality needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Office Hydration', desc: 'Regular delivery for your workplace', features: ['Weekly/Monthly plans', 'Dispenser included', 'Flexible scheduling'] },
                { title: 'Event Hydration', desc: 'Premium water for special occasions', features: ['Branded bottles', 'Same-day delivery', 'Bulk pricing'] },
                { title: 'Hospitality', desc: 'For hotels, restaurants & cafes', features: ['Wholesale rates', 'Dedicated support', 'Custom branding'] },
              ].map((plan, i) => (
                <div key={i} className="bg-[#2d2d2d] rounded-3xl p-8 border border-white/5 hover:border-[#00C853]/20 transition-all text-left">
                  <h3 className="text-white font-bold text-xl mb-2">{plan.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <Check className="size-4 text-[#00C853]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-white/5 hover:bg-[#00C853] text-white font-bold rounded-xl py-3 transition-all border border-white/10 hover:border-transparent">
                    Contact Sales
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
