"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Shield,
  FlaskConical,
  ArrowRight,
  Users,
  CheckCircle2,
  Droplets,
  Factory,
  Globe,
  Award,
  Phone,
  MessageCircle,
  MapPin,
  Beaker,
  Leaf,
  Star,
  Sparkles,
  Zap,
  Play,
  Eye,
  Clock,
  Building2,
  Truck,
  Mail,
} from "lucide-react";



import MagicBentoCard from "@/components/MagicBentoCard";
import AnimateOnScroll, {
  AnimatedCounter,
  StaggerContainer,
} from "@/components/AnimateOnScroll";
import GlowOnScroll from "@/components/GlowOnScroll";
import ProcessFlow from "./quality/ProcessFlow";
import GallerySection from "@/components/GallerySection";


function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', inquiryType: 'Corporate Bulk Order', message: '' });

  const handleWhatsAppSubmit = () => {
    const { firstName, lastName, email, inquiryType, message } = contactForm;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    const text = `*New Inquiry from SAVI Website*%0A%0A*Name:* ${firstName} ${lastName}%0A*Email:* ${email}%0A*Inquiry Type:* ${inquiryType}%0A*Message:* ${message}`;
    window.open(`https://wa.me/917760161401?text=${text}`, '_blank');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => setHeroReady(true), 100);
    }, 100);
  };

  const handleTransitionStart = () => {
    // Prepare for hero bottle animation
  };

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={handleLoadingComplete}
        onTransitionStart={handleTransitionStart}
      />
    );
  }

  return (
    <div
      className={`relative flex flex-col min-h-screen w-full transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"}`}
    >
      {/* Background effects removed — GlobalBackground LiquidEther handles this */}

      <Header />

      <main className="flex-1">
        {/* ==================== HOME SECTION ==================== */}
        <Section
          id="home"
          className="min-h-screen flex items-center pt-24 lg:pt-0 relative overflow-hidden"
        >
          {/* Liquid Ether Background is now global via layout */}
          {/* 22 Years Anniversary Background Logo */}
          <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none overflow-hidden">
            <img
              src="/images/22-years-anniversary.png"
              alt="SAVI 22 Years Anniversary"
              className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] object-contain opacity-10 sm:opacity-15 select-none"
            />
          </div>
          <div className="px-6 md:px-10 lg:px-20 py-10 flex flex-1 items-center justify-center w-full relative z-10">
            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left content */}
              <div className="flex flex-col gap-10 lg:pr-10 z-10 order-2 lg:order-1">
                <div className="flex flex-col gap-6 text-left">
                  {/* <AnimateOnScroll animation="fadeUp" delay={0.1}>
                    <div className="inline-flex items-center gap-2 self-start rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md">
                      <Sparkles className="size-3 text-[#00C853]" />
                      Hydration, Perfected
                    </div>
                  </AnimateOnScroll> */}
                  <AnimateOnScroll animation="fadeUp" delay={0.25}>
                    <GlowOnScroll glowColor="rgba(255, 255, 255, 0.4)">
                      <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight">
                        Hydration
                        <br />
                        Refined.
                      </h1>
                    </GlowOnScroll>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="fadeUp" delay={0.4}>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-lg mt-2">
                      SAVI delivers pristine molecular hydration with unmatched
                      logistical precision. A darker, deeper commitment to
                      purity.
                    </p>
                  </AnimateOnScroll>
                </div>
                <AnimateOnScroll animation="fadeUp" delay={0.55}>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 mt-2">
                    <Link
                      href="/marketplace"
                      className="group relative flex h-12 sm:h-14 min-w-0 sm:min-w-[180px] items-center justify-center overflow-hidden rounded-3xl bg-[#2d2d2d] border border-white/10 hover:border-[#00C853] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-[#00C853]/25 transition-all duration-300 hover:-translate-y-1 px-6"
                    >
                      <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-[#00C853] transition-colors">
                        Order SAVI
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    <Link
                      href="/marketplace#bulk"
                      className="group flex h-12 sm:h-14 min-w-0 sm:min-w-[180px] items-center justify-center rounded-3xl border border-white/10 bg-transparent px-6 sm:px-8 text-white/80 hover:text-[#00C853] backdrop-blur-md text-sm sm:text-base font-bold hover:bg-[#2d2d2d] hover:border-[#00C853]/50 transition-all duration-300"
                    >
                      Bulk Supply
                    </Link>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fadeUp" delay={0.7}>
                  <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                    <div className="flex -space-x-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="size-12 rounded-full border-2 border-[#1a1a1a] bg-[#2d2d2d] overflow-hidden flex items-center justify-center"
                        >
                          <Users className="size-5 text-white/30" />
                        </div>
                      ))}
                      <div className="size-12 flex items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#2d2d2d] text-white text-xs font-bold">
                        +2k
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle2 className="size-4 text-[#00C853]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Trust Score 99%
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Trusted by global enterprises
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
              {/* Right - Hero Bottle */}
              <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[85vh] w-full flex items-center justify-center order-1 lg:order-2">
                {/* Background glow */}
                <div className="absolute w-[60%] aspect-square rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-20 blur-[100px] animate-pulse" />

                <div className="relative w-full h-full max-w-[500px] flex items-center justify-center">
                  {/* Hero Bottle Image with reveal animation */}
                  <div
                    className={`relative z-20 transition-all duration-1000 ${heroReady
                      ? "opacity-100 animate-gentle-float"
                      : "opacity-0 scale-75 translate-y-8"
                      }`}
                  >
                    <img
                      src="/images/3d-bottle-hero.png"
                      alt="SAVI Premium Water Bottle"
                      className="h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[80vh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>

                  {/* Floating info card - Certified */}
                  <div
                    className={`absolute top-[5%] right-[2%] sm:top-[20%] sm:right-[0%] lg:-right-[5%] p-2 sm:p-5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 z-30 max-w-[110px] sm:max-w-[180px] transition-all duration-700 ${heroReady
                      ? "opacity-100 translate-y-0 animate-float-delayed"
                      : "opacity-0 translate-y-4"
                      }`}
                    style={{ transitionDelay: heroReady ? "0.3s" : "0s" }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                      <Shield className="size-4 sm:size-5 text-[#00C853]" />
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Certified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      BIS License (ISI) Certified
                    </p>
                  </div>

                  {/* Floating info card - pH */}
                  <div
                    className={`absolute bottom-[5%] left-[2%] sm:bottom-[15%] sm:left-[-15%] lg:-left-[10%] p-2 sm:p-5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 z-30 min-w-[80px] sm:min-w-[140px] transition-all duration-700 ${heroReady
                      ? "opacity-100 translate-y-0 animate-float"
                      : "opacity-0 translate-y-4"
                      }`}
                    style={{
                      transitionDelay: heroReady ? "0.5s" : "0s",
                      animationDelay: heroReady ? "2s" : "0s",
                    }}
                  >
                    <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                      <FlaskConical className="size-4 sm:size-5 text-[#00C853]" />
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Alkaline
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                        7.4
                      </p>
                      <span className="text-xs sm:text-sm font-bold text-[#00C853]">
                        pH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== ABOUT SECTION ==================== */}
        <Section
          id="about"
          className="py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-transparent pointer-events-none" />

          {/* Hero part */}
          <div className="relative w-full min-h-[60vh] flex items-center justify-center mb-20">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a] z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d2d2d]/30 via-[#1a1a1a] to-[#1a1a1a]" />
            </div>
            <div className="relative z-10 w-full max-w-[1000px] px-6 md:px-10 flex flex-col items-center text-center">
              <div className="glass-panel p-6 sm:p-10 md:p-16 rounded-3xl max-w-4xl backdrop-blur-xl border border-white/10 shadow-2xl">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8 bg-white/5 backdrop-blur-sm">
                  Since 2004
                </span>
                <GlowOnScroll glowColor="rgba(255, 255, 255, 0.35)">
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 sm:mb-8 drop-shadow-2xl">
                    Purity in{" "}
                    <span className="font-medium italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                      Slate
                    </span>
                  </h2>
                </GlowOnScroll>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-light tracking-wide">
                  Experience the essence of untouched nature, refined for your
                  well-being. SAVI isn&apos;t just a resource, it&apos;s the
                  foundation of a pure, quiet life.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/journey" className="flex items-center justify-center gap-2 h-14 px-10 rounded-3xl bg-white text-[#1a1a1a] text-sm font-bold tracking-widest uppercase hover:bg-[#00C853] hover:text-white transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <ArrowRight className="size-4" />
                    Our Journey
                  </Link>
                  <button className="flex items-center justify-center gap-2 h-14 px-10 rounded-3xl bg-transparent border border-white/20 text-white text-sm font-bold tracking-widest uppercase hover:bg-[#00C853]/10 hover:border-[#00C853]/50 transition-all group">
                    <Play className="size-4 text-[#00C853]" />
                    Watch Film
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <AnimateOnScroll animation="fadeUp" delay={0.3}>
            <div className="w-full max-w-[1280px] px-6 md:px-10 mx-auto -mt-8 mb-24">
              <div className="bg-[#222222] border border-white/10 rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-3 gap-2 sm:gap-8 divide-x divide-white/5">
                {[
                  {
                    value: 99.9,
                    suffix: "%",
                    label: "Purity Level",
                    icon: Sparkles,
                  },
                  {
                    value: 50,
                    suffix: "+",
                    label: "Natural Springs",
                    icon: Droplets,
                  },
                  {
                    value: 0,
                    suffix: "",
                    label: "Carbon Footprint",
                    icon: Leaf,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center p-2 sm:p-4 group"
                  >
                    <stat.icon className="size-6 text-[#00C853] mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl sm:text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>


          {/* Certifications Row */}
          <div className="w-full py-16 border-t border-white/5">
            <div className="max-w-[1280px] mx-auto px-6 md:px-10">
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 md:gap-28 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {[
                  { icon: Shield, label: "BIS License" },
                  { icon: Droplets, label: "FSSAI" },
                  { icon: Star, label: "ISO Certified" },
                  { icon: Factory, label: "MSME" },
                  { icon: Award, label: "ZED Gold" },
                  { icon: Beaker, label: "In-House Labs" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <item.icon className="size-10 text-white group-hover:text-[#00C853] transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== QUALITY SECTION ==================== */}
        <Section id="quality" className="py-24 lg:py-32 bg-[#121212] relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex flex-col items-center text-center mb-20">
              {/* <AnimateOnScroll animation="fadeUp" delay={0.1}>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-8">
                  <Shield className="size-3 text-[#00C853]" />
                  Verification & Compliance
                </div>
              </AnimateOnScroll> */}
              <AnimateOnScroll animation="fadeUp" delay={0.25}>
                <GlowOnScroll glowColor="rgba(0, 200, 83, 0.4)">
                  <h2 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-none">
                    Uncompromising
                    <br />
                    <span className="text-gray-500">Purity Standards.</span>
                  </h2>
                </GlowOnScroll>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeUp" delay={0.4}>
                <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                  SAVI exceeds industry benchmarks through rigorous independent
                  testing. Our 12-stage filtration and mineralization process is
                  validated by world-class certification bodies.
                </p>
              </AnimateOnScroll>
            </div>

            {/* Live Analysis Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
              <div className="lg:col-span-8 bg-[#2d2d2d] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                  <FlaskConical className="size-72 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-bold mb-10 flex items-center gap-3">
                    <span className="size-2 bg-[#00C853] rounded-full animate-pulse" />
                    <Beaker className="size-5 text-[#00C853]" />
                    Live Water Analysis
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6">
                    {[
                      {
                        label: "pH Level",
                        value: "+6.0 to +8.5",
                        suffix: "",
                        bar: 85,
                        note: "Optimal Balance",
                      },
                      {
                        label: "TDS Level",
                        value: "55±10",
                        suffix: "ppm",
                        bar: 40,
                        note: "Pure & Balanced",
                      },
                      {
                        label: "Contaminants",
                        value: "0.00",
                        suffix: "",
                        bar: 0,
                        note: "Micro-Plastics Free",
                      },
                      {
                        label: "UV Sterilization",
                        value: "Continuous",
                        suffix: "",
                        bar: 100,
                        note: "Active Protection",
                      },
                      {
                        label: "Ozonization",
                        value: "On-line",
                        suffix: "",
                        bar: 100,
                        note: "Real-time Treatment",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 p-4 bg-[#222]/50 rounded-2xl"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                            {item.label}
                          </span>
                          <CheckCircle2 className="size-3 text-[#00C853]" />
                        </div>
                        <div className="flex items-end gap-1">
                          <span className="text-xl font-bold text-white">
                            {item.value}
                          </span>
                          {item.suffix && (
                            <span className="text-[#00C853] font-semibold text-xs mb-0.5">
                              {item.suffix}
                            </span>
                          )}
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00C853] shadow-[0_0_8px_rgba(0,200,83,0.5)] rounded-full transition-all duration-1000"
                            style={{ width: `${item.bar}%` }}
                          />
                        </div>
                        <p className="text-gray-500 text-[10px]">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lab Report Card */}
              <div className="lg:col-span-4 bg-[#121212] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00C853]/5 group-hover:bg-[#00C853]/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="size-12 rounded-2xl bg-[#2d2d2d] border border-white/10 flex items-center justify-center">
                      <Eye className="size-6 text-[#00C853]" />
                    </div>
                    <span className="text-white/30 text-[10px] font-bold tracking-widest border border-white/10 px-2 py-1 rounded-lg">
                      UPDATED: OCT 2023
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">
                    Detailed Lab Report
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    View the full spectrum analysis from our ISO 17025
                    accredited laboratory detailing mineral composition and
                    purity tests.
                  </p>
                </div>
                <button className="relative z-10 mt-8 w-full py-4 rounded-2xl bg-white text-[#1a1a1a] font-bold hover:bg-[#00C853] hover:text-white hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  View PDF
                  <Eye className="size-4 group-hover/btn:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-white text-3xl font-bold border-l-4 border-[#00C853] pl-6">
                  Global Certifications
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "BIS License (ISI)",
                    desc: "ISI Certification from Central Government Authority ensuring highest quality standards for packaged drinking water.",
                  },
                  {
                    icon: Droplets,
                    title: "FSSAI",
                    desc: "Food Safety and Standards Authority of India certification from State Government Authority.",
                  },
                  {
                    icon: Star,
                    title: "ISO Certified",
                    desc: "International Organization for Standardization certification confirming our rigorous quality management systems.",
                  },
                  {
                    icon: Factory,
                    title: "MSME Registered",
                    desc: "Registered under Micro, Small and Medium Enterprises promoting quality manufacturing standards.",
                  },
                  {
                    icon: Award,
                    title: "ZED Certified",
                    desc: "Zero Defect Zero Effect certification with Bronze & Silver achieved, Gold certification under process.",
                  },
                  {
                    icon: Beaker,
                    title: "First ZED Gold",
                    desc: "Proud to be the First ZED Gold Company of the District, setting benchmarks in quality excellence.",
                  },
                  {
                    icon: FlaskConical,
                    title: "In-House Labs",
                    desc: "State-of-the-art Physical/Chemical Lab and Microbiological Lab for continuous quality testing and assurance.",
                  },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="bg-[#2d2d2d] p-8 rounded-3xl border border-white/5 card-hover-effect group h-full flex flex-col"
                  >
                    <div className="size-14 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:border-[#00C853]/30 transition-colors">
                      <cert.icon className="size-7 text-[#00C853]" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3">
                      {cert.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {cert.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-white text-3xl font-bold border-l-4 border-[#00C853] pl-6">
                  Quality Assurance & Testing
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Beaker,
                    title: "Monthly NABL Reports",
                    desc: "Regular monthly testing conducted by NABL approved external laboratories ensuring consistent quality standards.",
                  },
                  {
                    icon: FlaskConical,
                    title: "Six Monthly NABL Reports",
                    desc: "Comprehensive bi-annual analysis from NABL approved labs covering extensive water quality parameters.",
                  },
                  {
                    icon: Award,
                    title: "Yearly NABL Reports",
                    desc: "Annual detailed quality assessment from NABL approved laboratories for complete compliance verification.",
                  },
                  {
                    icon: Shield,
                    title: "Radio Activity Testing",
                    desc: "Specialized radio activity test reports ensuring water is free from harmful radioactive contaminants.",
                  },
                  {
                    icon: Factory,
                    title: "Equipment Calibration",
                    desc: "Periodical calibration of all testing equipment by certified authorities maintaining measurement accuracy.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#2d2d2d] p-8 rounded-3xl border border-white/5 card-hover-effect group h-full flex flex-col"
                  >
                    <div className="size-14 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:border-[#00C853]/30 transition-colors">
                      <item.icon className="size-7 text-[#00C853]" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purity Protocol */}
            <div className="py-16 border-t border-white/5">
              {/* Intro Section */}
              <div className="text-center mb-16">
                <span className="text-[#00C853] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                  The Method
                </span>
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  The Purity Protocol.
                </h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  A meticulous 9-stage journey from source to seal, ensuring the
                  distinctive SAVI taste profile remains untouched by the
                  outside world.
                </p>
              </div>

              {/* Process Flow Chart */}
              <div className="mb-20">
                <ProcessFlow />
              </div>

              {/* Step Explanations - Two column layout */}
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                <div className="lg:w-1/3 lg:sticky lg:top-32">
                  <span className="text-[#00C853] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                    Step by Step
                  </span>
                  <h3 className="text-white text-4xl font-bold mb-6 leading-tight">
                    How It&apos;s
                    <br />
                    Done.
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Each stage plays a critical role in transforming raw water
                    into the pristine SAVI product you trust.
                  </p>
                </div>

                <div className="lg:w-2/3 flex flex-col gap-6 w-full">
                  {[
                    {
                      num: "01",
                      title: "Raw Water Tank",
                      icon: Droplets,
                      desc: "Source water is collected and stored in sanitized raw water tanks, where it undergoes initial quality checks before entering the purification process.",
                    },
                    {
                      num: "02",
                      title: "Sand Filtration",
                      icon: Shield,
                      desc: "Water passes through layers of graded sand media that trap suspended particles, sediment, and larger impurities through natural filtration.",
                    },
                    {
                      num: "03",
                      title: "Active Carbon Filtration",
                      icon: Leaf,
                      desc: "Activated carbon absorbs chlorine, organic compounds, and unpleasant odours or tastes, significantly improving water clarity and flavour profile.",
                    },
                    {
                      num: "04",
                      title: "12 Candle Micron Filtration",
                      icon: FlaskConical,
                      desc: "A bank of 12 micron candle filters removes finer particulate matter and micro-sediments that passed through earlier stages of filtration.",
                    },
                    {
                      num: "05",
                      title: "Reverse Osmosis",
                      icon: Beaker,
                      desc: "Water is forced through semi-permeable membranes at high pressure, removing 99.9% of dissolved solids, bacteria, viruses, and heavy metals at a molecular level.",
                    },
                    {
                      num: "06",
                      title: "24 Candle Micron Filtration",
                      icon: FlaskConical,
                      desc: "Post-RO water passes through 24 candle micron filters for an additional layer of ultra-fine filtration, ensuring absolute particulate-free purity.",
                    },
                    {
                      num: "07",
                      title: "U.V. Treatment",
                      icon: Zap,
                      desc: "Continuous ultraviolet light sterilization eliminates 99.99% of remaining microorganisms including bacteria, viruses, and parasites without any chemical additives.",
                    },
                    {
                      num: "08",
                      title: "Online Ozonization",
                      icon: Sparkles,
                      desc: "Real-time ozone treatment using activated oxygen provides powerful disinfection and extends shelf life, keeping water sterile until the cap is opened.",
                    },
                    {
                      num: "09",
                      title: "Bottling",
                      icon: Factory,
                      desc: "Purified water is sealed in sterilized bottles under hygienic conditions using automated filling and capping systems, preserving freshness for up to 24 months.",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-[#2d2d2d]/30 border border-white/5 hover:bg-[#2d2d2d] transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-white/10 text-6xl font-black group-hover:text-[#00C853]/20 transition-colors">
                          {step.num}
                        </span>
                        <div className="size-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center shrink-0 mt-2">
                          <step.icon className="size-6 text-[#00C853]" />
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-white text-xl font-bold mb-3 group-hover:text-[#00C853] transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== GALLERY SECTION ==================== */}
        {(() => {
          const allImages = {
            events: [
              "/images/event1.jpeg", "/images/event2.jpeg", "/images/event3.jpeg",
              "/images/event4.jpeg", "/images/event5.jpeg", "/images/event6.jpg",
              "/images/event7.jpeg", "/images/event8.jpeg", "/images/event9.jpeg",
              "/images/event10.jpeg", "/images/event11.jpeg",
            ],
            products: [
              "/images/product1.jpeg", "/images/product2.jpeg", "/images/product3.jpeg",
              "/images/product4.jpeg", "/images/product5.jpeg", "/images/product6.jpeg",
              "/images/produc7.jpeg", "/images/product8.jpeg", "/images/product9.jpeg",
              "/images/product10.jpeg", "/images/product11.jpeg", "/images/product12.jpeg",
              "/images/product13.jpeg", "/images/product14.jpeg", "/images/product15.jpeg",
              "/images/product16.jpeg", "/images/product17.jpeg", "/images/product18.jpeg",
              "/images/product19.jpeg", "/images/product20.jpeg", "/images/product21.jpeg",
              "/images/product22.jpeg", "/images/product23.jpeg", "/images/product24.jpeg",
              "/images/product25.jpeg", "/images/prodcut26.jpeg", "/images/product26.jpg",
            ],
            outlets: [
              "/images/shop1.jpeg", "/images/shop2.jpeg", "/images/shop3.jpeg",
              "/images/shop4.jpeg", "/images/shop5.jpeg", "/images/shop6.jpeg",
              "/images/fridge.jpeg", "/images/fridge2.jpeg",
            ],
          };

          const filters = ["All", "Events", "Products", "Outlets"] as const;

          return (
            <GallerySection allImages={allImages} filters={filters} />
          );
        })()}

        {/* ==================== CONTACT SECTION ==================== */}
        <Section id="contact" className="py-24 lg:py-32 bg-[#121212] relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Header */}
            <div className="mb-16 max-w-3xl">
              {/* <AnimateOnScroll animation="fadeUp" delay={0.1}>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-6">
                  <MessageCircle className="size-3 text-[#00C853]" />
                  Concierge Support
                </div>
              </AnimateOnScroll> */}
              <AnimateOnScroll animation="fadeUp" delay={0.25}>
                <GlowOnScroll glowColor="rgba(0, 200, 83, 0.4)">
                  <h2 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                    Refine Your <br />{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                      Experience.
                    </span>
                  </h2>
                </GlowOnScroll>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fadeUp" delay={0.4}>
                <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                  Whether you require bulk enterprise supply, partnership
                  opportunities, or personal hydration refinement, our dedicated
                  team is ready to assist with precision.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Contact Form */}
              <AnimateOnScroll
                animation="fadeRight"
                delay={0.5}
                className="lg:col-span-7"
              >
                <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Send a Message
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 ml-2">
                          First Name
                        </label>
                        <input
                          className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none"
                          placeholder="Enter first name"
                          type="text"
                          value={contactForm.firstName}
                          onChange={(e) => setContactForm(f => ({ ...f, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 ml-2">
                          Last Name
                        </label>
                        <input
                          className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none"
                          placeholder="Enter last name"
                          type="text"
                          value={contactForm.lastName}
                          onChange={(e) => setContactForm(f => ({ ...f, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 ml-2">
                        Email Address
                      </label>
                      <input
                        className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none"
                        placeholder="name@company.com"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 ml-2">
                        Inquiry Type
                      </label>
                      <div className="relative">
                        <select className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] transition-shadow appearance-none cursor-pointer outline-none" value={contactForm.inquiryType} onChange={(e) => setContactForm(f => ({ ...f, inquiryType: e.target.value }))}>
                          <option>Corporate Bulk Order</option>
                          <option>Private Event Hydration</option>
                          <option>Partnership Inquiry</option>
                          <option>General Support</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 ml-2">
                        Message
                      </label>
                      <textarea
                        className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow resize-none outline-none"
                        placeholder="How can we help refine your hydration?"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                    <button
                      className="group w-full bg-[#00C853] hover:bg-[#00e676] text-white font-extrabold rounded-3xl py-4 mt-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)]"
                      type="button"
                      onClick={handleWhatsAppSubmit}
                    >
                      Submit Inquiry
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </AnimateOnScroll>

              {/* Contact Info */}
              <AnimateOnScroll
                animation="fadeLeft"
                delay={0.65}
                className="lg:col-span-5 flex flex-col gap-6"
              >
                {/* Quick actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                    <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] transition-colors duration-300">
                      <svg className="size-6 text-[#00C853] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <span className="font-bold text-lg text-[#222222]">
                      WhatsApp
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">
                      7760161401
                    </span>
                  </button>
                  <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                    <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] transition-colors duration-300">
                      <Phone className="size-6 text-[#00C853] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-[#222222]">
                      Call Us
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">
                      9:00 AM - 7:00 PM
                    </span>
                  </button>
                </div>

                {/* Factory info */}
                <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 mb-4">
                  <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Factory className="size-5 text-[#00C853]" />
                    Factory
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      JEVOOR EMPIRE
                      <br />
                      SY NO 739/2B, Opp Hotel Town Palace
                      <br />
                      Athani Road, Vijayapura - 586102
                    </p>
                    <div className="h-px w-full bg-white/10 my-3" />
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="size-4 text-[#00C853]" />
                      <span className="font-medium text-sm">
                        9036522355, 7760161401
                      </span>
                    </div>
                  </div>
                </div>

                {/* Office info */}
                <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                  <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <MapPin className="size-5 text-[#00C853]" />
                    Office
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Opp Govt I.T.I College
                      <br />
                      Chalukya Nagar, Solapur Road
                      <br />
                      Vijayapura - 586103
                    </p>
                    <div className="h-px w-full bg-white/10 my-3" />
                    <div className="flex items-center gap-3 text-gray-300 mb-2">
                      <Phone className="size-4 text-[#00C853]" />
                      <span className="font-medium text-sm">
                        08352216401, 08352265951
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 mb-2">
                      <Phone className="size-4 text-[#00C853]" />
                      <span className="font-medium text-sm">
                        9448179701, 9845820401, 9880721401
                      </span>
                    </div>
                    <div className="h-px w-full bg-white/10 my-3" />
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="size-4 text-[#00C853]" />
                      <span className="font-medium hover:text-white transition-colors cursor-pointer text-sm">
                        savidhareminerals2004@gmail.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map with location */}
                <div className="w-full h-[300px] rounded-[2rem] overflow-hidden border border-white/10 relative group shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=SAVI+WATERS+Solapur+Rd+opp+ITI+College+Chalukya+Nagar+Vijayapura+Karnataka+586103&zoom=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SAVI Waters Location"
                  />
                  {/* Address badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#1a1a1a]/90 backdrop-blur-md border border-[#00C853]/30 text-white px-5 py-3 rounded-2xl pointer-events-auto z-20">
                    <div className="flex items-start gap-3">
                      <MapPin className="size-4 text-[#00C853] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-white leading-relaxed">
                          SAVI WATERS
                        </p>
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                          Solapur Rd, opp. ITI College, Chalukya Nagar,
                          <br className="hidden sm:block" />
                          Karnataka Housing Board Colony, Vijayapura, Karnataka 586103
                        </p>
                        <a
                          href="https://www.google.com/maps/search/SAVI+WATERS+Solapur+Rd+opp+ITI+College+Vijayapura+Karnataka+586103"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00C853] text-[10px] font-bold uppercase tracking-wider mt-1 inline-block hover:underline"
                        >
                          Open in Maps →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
