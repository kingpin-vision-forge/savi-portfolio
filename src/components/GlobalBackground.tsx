'use client';

import dynamic from 'next/dynamic';

const LiquidEther = dynamic(() => import('@/components/LiquidEther'), {
    ssr: false,
});

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 pointer-events-auto">
                <LiquidEther
                    colors={["#77bb41", "#4f7a28", "#96d35f"]}
                    mouseForce={40}
                    cursorSize={45}
                    viscous={20}
                    iterationsViscous={49}
                    iterationsPoisson={17}
                    isBounce={true}
                    autoSpeed={0.05}
                    autoIntensity={1.1}
                    globalMode={true}
                    className="pointer-events-auto"
                />
            </div>
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/95 pointer-events-none" />
        </div>
    );
}
