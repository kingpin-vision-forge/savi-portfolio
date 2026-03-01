'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const SESSION_KEY = 'savi-loading-shown';

export default function AppLoadingWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Check if loading screen was already shown this session
        if (sessionStorage.getItem(SESSION_KEY)) {
            setIsLoading(false);
            setShowContent(true);
        }
    }, []);

    const handleLoadingComplete = () => {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
    };

    if (isLoading) {
        return <LoadingScreen onComplete={handleLoadingComplete} />;
    }

    return (
        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    );
}
