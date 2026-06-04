"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { content, type LocationItem } from "@/content";

const keyOf = (l: LocationItem) => `${l.city}-${l.state}`;

export default function LocationsMap({
  onSelect,
  focus,
}: {
  onSelect?: (loc: LocationItem) => void;
  focus?: LocationItem | null;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const mod = await import("leaflet");
      const L: any = (mod as any).default ?? mod;
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const icon = L.divIcon({
        className: "jis-marker",
        html: '<span class="jis-pin"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const pts: [number, number][] = [];
      content.locations.items.forEach((loc) => {
        pts.push([loc.lat, loc.lng]);
        const m = L.marker([loc.lat, loc.lng], {
          icon,
          title: `${loc.city}, ${loc.state}`,
        })
          .addTo(map)
          .on("click", () => onSelectRef.current?.(loc));
        markersRef.current[keyOf(loc)] = m;
      });

      const bounds = L.latLngBounds(pts);
      const fit = () => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
      };
      fit();
      setTimeout(fit, 350);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  // Fly to + highlight the focused location
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const fk = focus ? keyOf(focus) : null;
    Object.entries(markersRef.current).forEach(([k, m]) => {
      const pin = m.getElement?.()?.querySelector?.(".jis-pin");
      if (pin) pin.classList.toggle("jis-pin--active", k === fk);
    });
    if (focus) map.flyTo([focus.lat, focus.lng], 9, { duration: 0.9 });
  }, [focus]);

  return (
    <div
      ref={elRef}
      className="h-full w-full"
      aria-label="Map of Johnny's Italian Steakhouse locations"
    />
  );
}
