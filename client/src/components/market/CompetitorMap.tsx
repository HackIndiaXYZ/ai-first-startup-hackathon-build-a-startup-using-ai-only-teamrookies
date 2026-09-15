import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { BusinessEntity, CompetitorAnalysis, LocationData } from '../../types/index.js';
import { MapPin, Navigation, Shield, Star, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge.js';

interface CompetitorMapProps {
  location: LocationData;
  businesses: BusinessEntity[];
  competitors: CompetitorAnalysis[];
  onSelectCompetitor?: (competitor: CompetitorAnalysis) => void;
}

export const CompetitorMap: React.FC<CompetitorMapProps> = ({
  location,
  businesses,
  competitors,
  onSelectCompetitor
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<BusinessEntity | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [location.lat, location.lng],
        zoom: location.radiusKm <= 5 ? 14 : location.radiusKm <= 15 ? 12 : 10,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // CartoDB Dark Matter tiles (sleek, high contrast, dark mode)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(
        [location.lat, location.lng],
        location.radiusKm <= 5 ? 14 : location.radiusKm <= 15 ? 12 : 10
      );
    }

    const map = mapInstanceRef.current;

    // Clear previous vector layers
    map.eachLayer(layer => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // 1. Draw Radius Boundary Circle
    const radiusMeters = location.radiusKm * 1000;
    L.circle([location.lat, location.lng], {
      radius: radiusMeters,
      color: '#06B6D4',
      fillColor: '#06B6D4',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '4, 8'
    }).addTo(map);

    // 2. Draw Founder Location Center Marker
    const founderIcon = L.divIcon({
      className: 'custom-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <div class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([location.lat, location.lng], { icon: founderIcon })
      .addTo(map)
      .bindTooltip(`<b>Your Selected Ground:</b><br/>${location.name}`, {
        direction: 'top',
        className: 'bg-dark-900 border border-cyan-500/40 text-cyan-300 text-xs px-2 py-1 rounded shadow-lg'
      });

    // 3. Add Competitors & Partner Markers
    businesses.forEach(b => {
      const isComp = b.isCompetitor;
      const color = isComp ? '#F43F5E' : '#10B981';

      const markerIcon = L.divIcon({
        className: 'biz-pin',
        html: `
          <div class="cursor-pointer group transform hover:scale-125 transition-transform">
            <div class="w-6 h-6 rounded-full flex items-center justify-center border shadow-md"
                 style="background-color: ${isComp ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)'};
                        border-color: ${color};">
              <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${color}"></div>
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const m = L.marker([b.lat, b.lng], { icon: markerIcon }).addTo(map);

      m.on('click', () => {
        setSelectedEntity(b);
        if (isComp && onSelectCompetitor) {
          const matchedComp = competitors.find(c => c.name === b.name) || {
            id: b.id,
            name: b.name,
            category: b.category,
            distanceMeters: b.distanceMeters,
            publicRating: b.publicRating || 4.0,
            strengths: ['Established neighborhood recognition'],
            potentialWeaknesses: ['Manual paperwork delays'],
            customerPainSignals: b.reviewSignals || [],
            marketPosition: 'Local practitioner',
            differentiationOpportunity: 'Deliver real-time ambient AI documentation.',
            evidence: b.evidence
          };
          onSelectCompetitor(matchedComp);
        }
      });
    });

    return () => {
      // Keep map reference stable across renders
    };
  }, [location, businesses, competitors, onSelectCompetitor]);

  return (
    <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-slate-800 bg-dark-950">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Legend & Radius Pill */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-dark-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-medium">{location.name}</span>
          <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
            {location.radiusKm} KM RADIUS
          </span>
        </div>

        <div className="pointer-events-auto bg-dark-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">Competitors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Potential Partners</span>
          </div>
        </div>
      </div>

      {/* Detail Overlay Drawer when Entity is Clicked */}
      {selectedEntity && (
        <div className="absolute bottom-3 left-3 right-3 md:right-auto md:w-96 z-10 bg-dark-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                selectedEntity.isCompetitor
                  ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                  : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
              }`}>
                {selectedEntity.isCompetitor ? 'Competitor Entity' : 'Potential Referral Partner'}
              </span>
              <h4 className="text-base font-bold text-white mt-1">{selectedEntity.name}</h4>
              <p className="text-xs text-slate-400">{selectedEntity.category}</p>
            </div>
            <button
              onClick={() => setSelectedEntity(null)}
              className="text-slate-500 hover:text-white text-sm px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono bg-dark-950/60 p-2 rounded-lg border border-slate-800/60">
            <div>
              <span className="text-slate-500">Distance:</span>
              <div className="text-slate-200 font-semibold">{selectedEntity.distanceMeters}m away</div>
            </div>
            {selectedEntity.publicRating && (
              <div>
                <span className="text-slate-500">Public Rating:</span>
                <div className="text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {selectedEntity.publicRating} ({selectedEntity.reviewCount || 0} reviews)
                </div>
              </div>
            )}
          </div>

          {selectedEntity.isCompetitor && selectedEntity.reviewSignals && (
            <div className="mt-2.5">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Customer Pain Signals:</span>
              <div className="space-y-1">
                {selectedEntity.reviewSignals.map((signal, idx) => (
                  <div key={idx} className="text-xs text-rose-300 bg-rose-950/40 px-2 py-1 rounded border border-rose-900/40">
                    • {signal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEntity.isPotentialPartner && selectedEntity.partnerSynergyReason && (
            <div className="mt-2.5 text-xs text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-900/40">
              <span className="font-semibold block text-emerald-400 mb-0.5">Synergy & Referral Angle:</span>
              {selectedEntity.partnerSynergyReason}
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <EvidenceBadge level={selectedEntity.evidence.level} label={selectedEntity.evidence.label} />
            <span className="text-[10px] text-slate-500 font-mono">OpenStreetMap Signals</span>
          </div>
        </div>
      )}
    </div>
  );
};
