'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Corporate Bulk Order');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    const text = `*New Inquiry from SAVI Website*%0A%0A*Name:* ${firstName} ${lastName}%0A*Email:* ${email}%0A*Inquiry Type:* ${inquiryType}%0A*Message:* ${message}`;
    window.open(`https://wa.me/917760161401?text=${text}`, '_blank');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#2d2d2d] opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white opacity-5 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#00C853] opacity-10 blur-[180px] rounded-full" />
      </div>

      <Header />

      <main className="flex min-h-screen flex-col pt-28 lg:pt-36 relative z-10">
        <div className="px-6 md:px-10 lg:px-20 pb-20 mx-auto w-full max-w-[1400px]">
          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-6">
              <span className="size-1.5 rounded-full bg-[#00C853] animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
              Concierge Support
            </div>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Refine Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Experience.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Whether you require bulk enterprise supply, partnership opportunities, or personal hydration refinement, our dedicated team is ready to assist with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 ml-2">First Name</label>
                    <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="Enter first name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 ml-2">Last Name</label>
                    <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="Enter last name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300 ml-2">Email Address</label>
                  <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="name@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300 ml-2">Inquiry Type</label>
                  <div className="relative">
                    <select className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] transition-shadow appearance-none cursor-pointer outline-none" value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
                      <option>Corporate Bulk Order</option>
                      <option>Private Event Hydration</option>
                      <option>Partnership Inquiry</option>
                      <option>General Support</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <span className="text-gray-500">▼</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300 ml-2">Message</label>
                  <textarea className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow resize-none outline-none" placeholder="How can we help refine your hydration?" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button className="group w-full bg-[#00C853] hover:bg-[#00e676] text-[#1a1a1a] font-extrabold rounded-3xl py-4 mt-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)]" type="button" onClick={handleSubmit}>
                  Submit Inquiry
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">→</span>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                  <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] group-hover:text-white transition-colors duration-300 text-[#00C853]">
                    <span className="text-3xl">💬</span>
                  </div>
                  <span className="font-bold text-lg text-[#222222]">WhatsApp</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">7760161401</span>
                </button>
                <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                  <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] group-hover:text-white transition-colors duration-300 text-[#00C853]">
                    <span className="text-3xl">📞</span>
                  </div>
                  <span className="font-bold text-lg text-[#222222]">Call Us</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">9:00 AM - 7:00 PM</span>
                </button>
              </div>

              {/* Factory Location */}
              <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="text-[#00C853]">🏭</span>
                  Factory
                </h4>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    JEVOOR EMPIRE<br />
                    SY NO 739/2B, Opp Hotel Town Palace<br />
                    Athani Road, Vijayapura - 586102
                  </p>
                  <div className="h-px w-full bg-white/10 my-3" />
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#00C853] text-sm">📞</span>
                    <span className="font-medium text-sm">9036522355, 7760161401</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-3" />
                  <div className="flex items-center gap-3 text-gray-300 mb-2">
                    <span className="text-[#00C853] text-sm">✉️</span>
                    <span className="font-medium hover:text-white transition-colors cursor-pointer text-sm">jevoorempire@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="text-[#00C853]">📍</span>
                  Office
                </h4>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Opp Govt I.T.I College<br />
                    Chalukya Nagar, Solapur Road<br />
                    Vijayapura - 586103
                  </p>
                  <div className="h-px w-full bg-white/10 my-4" />
                  <div className="flex items-center gap-3 text-gray-300 mb-2">
                    <span className="text-[#00C853] text-sm">📞</span>
                    <span className="font-medium text-sm">08352216401, 08352265951</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 mb-2">
                    <span className="text-[#00C853] text-sm">📞</span>
                    <span className="font-medium text-sm">9845820401, 9880721401</span>
                    <span className='font-medium text-sm'>9448179701, 7760161401</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-3" />
                  <div className="flex items-center gap-3 text-gray-300 mb-2">
                    <span className="text-[#00C853] text-sm">✉️</span>
                    <span className="font-medium hover:text-white transition-colors cursor-pointer text-sm">savidhareminerals2004@gmail.com</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-4" />
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#00C853] text-sm">🕐</span>
                    <span className="font-medium text-sm">9:00 AM - 7:00 PM (Order Booking & Office Hours)</span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="w-full h-[300px] rounded-[2rem] overflow-hidden border border-white/10 relative group shadow-2xl bg-[#2d2d2d]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20">🗺️</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest pointer-events-none flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00C853] animate-pulse" />
                  Live Location
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
