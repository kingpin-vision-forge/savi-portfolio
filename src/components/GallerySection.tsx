"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import GlowOnScroll from "@/components/GlowOnScroll";

type GalleryImages = {
    events: string[];
    products: string[];
    outlets: string[];
};

type FilterType = "All" | "Events" | "Products" | "Outlets";

const ITEMS_PER_PAGE = 15;

export default function GallerySection({
    allImages,
}: {
    allImages: GalleryImages;
    filters: readonly FilterType[];
}) {
    const [activeFilter, setActiveFilter] = useState<FilterType>("All");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const getFilteredImages = (): string[] => {
        switch (activeFilter) {
            case "Events":
                return allImages.events;
            case "Products":
                return allImages.products;
            case "Outlets":
                return allImages.outlets;
            default:
                return [...allImages.events, ...allImages.products, ...allImages.outlets];
        }
    };

    const filteredImages = getFilteredImages();
    const displayedImages = filteredImages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredImages.length;

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const getCategoryLabel = (src: string): string => {
        const name = src.split("/").pop()?.toLowerCase() || "";
        if (name.startsWith("event")) return "Events";
        if (name.includes("product") || name.includes("produc") || name.includes("prodcut")) return "Products";
        if (name.startsWith("shop") || name.startsWith("fridge")) return "Outlets";
        return "Gallery";
    };

    return (
        <section id="gallery" className="scroll-mt-24 py-24 lg:py-32 bg-[#1a1a1a] relative">
            <div className="w-full max-w-[1024px] px-6 mx-auto text-center mb-16">
                <div className="flex flex-col gap-6 items-center">
                    <AnimateOnScroll animation="fadeUp" delay={0.1}>
                        <span className="text-[#00C853] text-[10px] font-bold tracking-[0.3em] uppercase opacity-90">
                            Our Portfolio
                        </span>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="fadeUp" delay={0.25}>
                        <GlowOnScroll glowColor="rgba(255, 255, 255, 0.35)">
                            <h2 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1]">
                                Curating Excellence <br className="hidden sm:block" />
                                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">
                                    in Hydration
                                </span>
                            </h2>
                        </GlowOnScroll>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="scaleUp" delay={0.4}>
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="fadeUp" delay={0.5}>
                        <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                            Moments of purity, trust, and scale captured from our journey.
                            Witness the fluid elegance of SAVI in action.
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center px-4 py-6 mb-8">
                <div className="flex gap-1 p-1.5 glass-panel rounded-full overflow-x-auto scroll-hide max-w-full whitespace-nowrap">
                    {(["All", "Events", "Products", "Outlets"] as FilterType[]).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterChange(filter)}
                            className={`flex h-10 items-center px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${activeFilter === filter
                                ? "bg-[#00C853] text-white shadow-lg shadow-[#00C853]/25"
                                : "hover:bg-[#00C853]/10 text-gray-400 hover:text-[#00C853]"
                                }`}
                        >
                            {filter}
                            <span className="ml-2 text-[9px] opacity-60">
                                {filter === "All"
                                    ? filteredImages.length
                                    : filter === "Events"
                                        ? allImages.events.length
                                        : filter === "Products"
                                            ? allImages.products.length
                                            : allImages.outlets.length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Image Grid */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {displayedImages.map((src, i) => (
                        <div
                            key={`${activeFilter}-${src}-${i}`}
                            className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
                            style={{
                                animation: `fadeSlideUp 0.5s ease-out ${(i % ITEMS_PER_PAGE) * 0.04}s both`,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Gallery ${i + 1}`}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    {getCategoryLabel(src)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {hasMore && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                            className="group flex h-14 items-center justify-center rounded-3xl border border-white/10 bg-[#2d2d2d] px-10 text-white text-sm font-bold tracking-widest uppercase hover:bg-[#00C853]/10 hover:border-[#00C853]/50 hover:text-[#00C853] transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Show More
                            <span className="ml-3 text-xs opacity-50">
                                ({filteredImages.length - visibleCount} remaining)
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
