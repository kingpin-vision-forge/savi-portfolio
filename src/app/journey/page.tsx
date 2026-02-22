"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    Droplets,
    Factory,
    Globe,
    Award,
    ArrowLeft,
    Heart,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GlowOnScroll from "@/components/GlowOnScroll";

const timelineItems = [
    {
        year: "2004",
        title: "Beginning",
        icon: Droplets,
        paragraphs: [
            <><strong>SAVI Packaged Drinking Water</strong> was founded on <strong>13th January 2004</strong> by <strong>Mr. Prashant S. Jevoor</strong> and <strong>Mr. Somanath S. Jevoor</strong>, with a visionary commitment to provide <strong>safe, hygienic, and reliable</strong> drinking water to the people of Vijayapura.</>,
            <>Operating from <strong>Solapur Road, Vijayapura</strong>, SAVI began its journey with the manufacturing of <strong>20-litre packaged drinking water cans</strong>, catering exclusively to households and institutions within <strong>Vijayapura District</strong>, earning trust through <strong>uncompromising quality</strong> and service.</>,
        ],
    },
    {
        year: "2010",
        title: "Growth",
        icon: Factory,
        paragraphs: [
            <>Driven by <strong>integrity</strong> and <strong>customer confidence</strong>, SAVI expanded its operations with a <strong>state-of-the-art manufacturing facility</strong> at <strong>Jevoor Empire, Athani Road</strong>, equipped with modern purification technology and stringent quality-control systems.</>,
            <>SAVI became the <strong>first company in the region</strong> to obtain <strong>BIS Certification</strong>, alongside all required <strong>State and Central Government licences</strong> and local authority approvals, setting a benchmark for <strong>regulatory excellence</strong> and industry standards in <strong>North Karnataka</strong>.</>,
        ],
    },
    {
        year: "2018",
        title: "Expansion",
        icon: Globe,
        paragraphs: [
            <>With rising demand and <strong>unwavering reputation</strong>, SAVI established <strong>five operational outlets</strong> within Vijayapura City and built an extensive distribution network across <strong>Vijayapura, Kalaburagi (Gulbarga), Bagalkote, Hubballi, Gadag</strong>, and later expanded into <strong>Maharashtra</strong>, including <strong>Solapur</strong> and <strong>Pune</strong>.</>,
            <>This strategic growth enabled SAVI to deliver <strong>purity and reliability</strong> to thousands of homes, businesses, hospitals, and institutions <strong>every single day</strong>.</>,
        ],
    },
    {
        year: "2026",
        title: "Achievements & Recognition",
        icon: Award,
        paragraphs: [
            <>Celebrating <strong>22 years of trusted service</strong>, SAVI stands as a symbol of <strong>purity, consistency, and community care</strong> across North Karnataka and neighbouring regions.</>,
            <>The company has been recognized by <strong>senior authorities</strong>, respected institutions, and <strong>media organisations</strong> for excellence in packaged drinking water manufacturing, <strong>operational integrity</strong>, and public health contribution.</>,
            <>SAVI continues to be honoured by <strong>national-level organisations</strong> and valued customers alike for its dedication to delivering <strong>safe drinking water</strong> with <strong>honesty and responsibility</strong>.</>,
        ],
    },
];

export default function JourneyPage() {
    return (
        <div className="relative flex flex-col min-h-screen w-full">
            {/* Background effects removed — GlobalBackground LiquidEther handles this */}

            <Header />

            <main className="flex-1 pt-32 pb-24">
                <div className="w-full max-w-[1024px] px-6 mx-auto">
                    {/* Back button */}
                    <AnimateOnScroll animation="fadeUp" delay={0.05}>
                        <Link
                            href="/#about"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C853] text-sm font-medium mb-12 transition-colors group"
                        >
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </AnimateOnScroll>

                    {/* Hero heading */}
                    <AnimateOnScroll animation="fadeUp" delay={0.1}>
                        <div className="text-center mb-20">
                            <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                Our History
                            </span>
                            <GlowOnScroll glowColor="rgba(255, 255, 255, 0.35)">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-tighter mb-6">
                                    The Flow of Time
                                </h1>
                            </GlowOnScroll>
                            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                                by Prashant S Jevoor & Somanath S Jevoor
                            </p>
                        </div>
                    </AnimateOnScroll>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block" />

                        <div className="space-y-8 w-full">
                            {timelineItems.map((item, i) => (
                                <AnimateOnScroll key={i} animation="fadeLeft" delay={i * 0.15}>
                                    <div className="flex gap-6 items-start group">
                                        <div className="size-14 rounded-full bg-[#222222] border border-white/10 shadow-lg flex items-center justify-center group-hover:border-[#00C853] group-hover:bg-[#00C853]/5 transition-all duration-300 shrink-0 relative z-10">
                                            <item.icon className="size-6 text-white group-hover:text-[#00C853] transition-colors" />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <div className="bg-[#1a1a1a] p-8 sm:p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-white/20 group-hover:bg-[#1e1e1e]">
                                                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                                                    <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#00C853] transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <span className="text-[#00C853] font-bold text-2xl sm:text-3xl opacity-30 group-hover:opacity-70 transition-opacity">
                                                        {item.year}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    {item.paragraphs.map((para, j) => (
                                                        <p key={j} className="text-gray-400 font-light leading-relaxed text-base sm:text-lg">
                                                            {para}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>

                    {/* Our Promise */}
                    <AnimateOnScroll animation="fadeUp" delay={0.2}>
                        <div className="mt-24 text-center">
                            <div className="bg-gradient-to-b from-[#1a1a1a] to-[#151515] p-10 sm:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#00C853]/5" />
                                <div className="relative z-10">
                                    <Heart className="size-8 text-[#00C853] mx-auto mb-6" />
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                                        Our Promise
                                    </h2>
                                    <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-6">
                                        A legacy built on <strong className="text-white font-semibold">trust</strong>.
                                        <br />
                                        A future committed to <strong className="text-white font-semibold">purity</strong>.
                                    </p>
                                    <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                        For over <strong className="text-gray-300 font-medium">two decades</strong>, SAVI has remained devoted to protecting <strong className="text-gray-300 font-medium">community health</strong> through <strong className="text-gray-300 font-medium">world-class water purification</strong>, <strong className="text-gray-300 font-medium">ethical business practices</strong>, and <strong className="text-gray-300 font-medium">dependable service</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* Bottom CTA */}
                    <AnimateOnScroll animation="fadeUp" delay={0.3}>
                        <div className="text-center mt-20 pt-16 border-t border-white/5">
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em] mb-6">
                                22 Years of Purity
                            </p>
                            <Link
                                href="/marketplace"
                                className="inline-flex items-center gap-2 h-14 px-10 rounded-3xl bg-white text-[#1a1a1a] text-sm font-bold tracking-widest uppercase hover:bg-[#00C853] hover:text-white transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            >
                                Order SAVI
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </main>

            <Footer />
        </div>
    );
}
