"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { content, type LocationItem } from "@/content";

export default function LocationsMap({
  onSelect,
}: {
  onSelect?: (loc: LocationItem) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const mod = await import("leaflet");
      // leaflet ships as a CJS/UMD module — grab the namespace either way
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
        popupAnchor: [0, -9],
      });

      const pts: [number, number][] = [];
      content.locations.items.forEach((loc) => {
        pts.push([loc.lat, loc.lng]);
        L.marker([loc.lat, loc.lng], { icon, title: `${loc.city}, ${loc.state}` })
          .addTo(map)
          .on("click", () => onSelectRef.current?.(loc));
      });

      const bounds = L.latLngBounds(pts);
      const fit = () => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
      };
      fit();
      // re-fit once layout/fonts settle (a wrong size at init mis-zooms it)
      setTimeout(fit, 350);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="h-full w-full"
      aria-label="Map of Johnny's Italian Steakhouse locations"
    />
  );
}
