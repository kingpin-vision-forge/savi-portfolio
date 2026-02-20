"use client";

const partnerLogos = [
    { name: "LIC", src: "/partners/Lic.avif" },
    { name: "HDFC", src: "/partners/hdfc.jpg" },
    { name: "ICICI", src: "/partners/icici.avif" },
    { name: "SBI", src: "/partners/sbi.png" },
    { name: "Kotak", src: "/partners/kotak.png" },
    { name: "Birla Sun Life", src: "/partners/birla-sun-life.jpeg" },
    { name: "IFFCO", src: "/partners/iffco.png" },
    { name: "BLDE", src: "/partners/blde.png" },
    { name: "BLDE ACET", src: "/partners/bldeacet.png" },
    { name: "BM Patil", src: "/partners/bmpatil.jpg" },
    { name: "BMPF", src: "/partners/bmpf.jpeg" },
    { name: "Metro", src: "/partners/metro.jpg" },
    { name: "Trends", src: "/partners/trends.png" },
    { name: "EasyBuy", src: "/partners/easybuy.jpg" },
    { name: "Avantara", src: "/partners/avantara.jpg" },
];

export { partnerLogos };

export default function PartnerMarquee({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <div className="flex animate-marquee whitespace-nowrap">
                {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                    <div
                        key={`${partner.name}-${i}`}
                        className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center group"
                    >
                        <img
                            src={partner.src}
                            alt={partner.name}
                            className="h-10 sm:h-12 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            title={partner.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
