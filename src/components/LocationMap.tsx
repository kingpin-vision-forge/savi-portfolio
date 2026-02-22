'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue in Next.js/webpack
const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface LocationMapProps {
    latitude: number;
    longitude: number;
    onLocationChange: (lat: number, lng: number) => void;
}

export default function LocationMap({ latitude, longitude, onLocationChange }: LocationMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: [latitude, longitude],
            zoom: 16,
            zoomControl: true,
            attributionControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map);

        const marker = L.marker([latitude, longitude], {
            icon: markerIcon,
            draggable: true,
        }).addTo(map);

        marker.bindPopup('<b>Delivery Location</b><br>Drag to adjust').openPopup();

        marker.on('dragend', () => {
            const pos = marker.getLatLng();
            onLocationChange(
                parseFloat(pos.lat.toFixed(6)),
                parseFloat(pos.lng.toFixed(6))
            );
        });

        // Also allow clicking the map to move the marker
        map.on('click', (e: L.LeafletMouseEvent) => {
            marker.setLatLng(e.latlng);
            onLocationChange(
                parseFloat(e.latlng.lat.toFixed(6)),
                parseFloat(e.latlng.lng.toFixed(6))
            );
        });

        mapRef.current = map;
        markerRef.current = marker;

        // Force a resize after mount to fix tile rendering
        setTimeout(() => map.invalidateSize(), 100);

        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update marker/map when coordinates change externally
    useEffect(() => {
        if (mapRef.current && markerRef.current) {
            const currentPos = markerRef.current.getLatLng();
            if (
                Math.abs(currentPos.lat - latitude) > 0.000001 ||
                Math.abs(currentPos.lng - longitude) > 0.000001
            ) {
                markerRef.current.setLatLng([latitude, longitude]);
                mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
            }
        }
    }, [latitude, longitude]);

    return (
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <div
                ref={mapContainerRef}
                className="w-full h-[250px] sm:h-[300px]"
                style={{ zIndex: 0 }}
            />
            <div className="absolute bottom-3 left-3 right-3 bg-[#1a1a1a]/90 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 pointer-events-none z-[1000]">
                <div className="size-2 rounded-full bg-[#00C853] animate-pulse shrink-0" />
                <span className="text-white/70 text-[11px] font-medium">
                    Drag the pin or tap the map to adjust your delivery location
                </span>
            </div>
        </div>
    );
}
