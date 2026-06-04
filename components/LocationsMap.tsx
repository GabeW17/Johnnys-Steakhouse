"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { content, type LocationItem } from "@/content";

const keyOf = (l: LocationItem) => `${l.city}-${l.state}`;

function miles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function LocationsMap({
  onSelect,
  focus,
  hovered,
  userLoc,
  onReset,
}: {
  onSelect?: (loc: LocationItem) => void;
  focus?: LocationItem | null;
  hovered?: LocationItem | null;
  userLoc?: { lat: number; lng: number } | null;
  onReset?: () => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const userMarkerRef = useRef<any>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const mod = await import("leaflet");
      const L: any = (mod as any).default ?? mod;
      await import("leaflet.markercluster");
      if (cancelled || !elRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
        minZoom: 4,
        maxZoom: 12,
        maxBounds: L.latLngBounds([12, -132], [54, -62]),
        maxBoundsViscosity: 1,
      });
      mapRef.current = map;
      map.setView([39.5, -95], 4);
      L.control.zoom({ position: "topright" }).addTo(map);

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
        html: '<img src="/johnnys-mark.png" alt="" class="jis-pin-logo" />',
        iconSize: [26, 28],
        iconAnchor: [13, 14],
      });

      const cluster = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 40,
        iconCreateFunction: (c: any) =>
          L.divIcon({
            html: `<div class="jis-cluster"><img src="/johnnys-mark.png" alt="" class="jis-cluster-logo" /><span class="jis-cluster-count">${c.getChildCount()}</span></div>`,
            className: "jis-cluster-wrap",
            iconSize: [42, 40],
          }),
      });

      const pts: [number, number][] = [];
      content.locations.items.forEach((loc) => {
        pts.push([loc.lat, loc.lng]);
        const m = L.marker([loc.lat, loc.lng], {
          icon,
          title: `${loc.city}, ${loc.state}`,
        }).on("click", () => onSelectRef.current?.(loc));
        markersRef.current[keyOf(loc)] = m;
        cluster.addLayer(m);
      });
      map.addLayer(cluster);

      const bounds = L.latLngBounds(pts);
      const fit = () => {
        map.invalidateSize();
        const wide = window.innerWidth >= 640;
        map.fitBounds(bounds, {
          paddingTopLeft: wide ? [330, 50] : [24, 30],
          paddingBottomRight: wide ? [50, 50] : [30, 300],
          maxZoom: 6,
        });
      };
      fit();
      setTimeout(fit, 350);

      // "Show all locations" control — re-fit to the whole map
      const FitControl = L.Control.extend({
        options: { position: "topright" },
        onAdd() {
          const div = L.DomUtil.create("div", "leaflet-bar jis-fit");
          const a = L.DomUtil.create("a", "", div);
          a.href = "#";
          a.title = "Show all locations";
          a.setAttribute("role", "button");
          a.setAttribute("aria-label", "Show all locations");
          a.innerHTML =
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';
          L.DomEvent.on(a, "click", (e: any) => {
            L.DomEvent.stop(e);
            onResetRef.current?.();
            fit();
          });
          return div;
        },
      });
      map.addControl(new FitControl());
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
        userMarkerRef.current = null;
        LRef.current = null;
      }
    };
  }, []);

  // Selected: fly to + strong highlight
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const fk = focus ? keyOf(focus) : null;
    const apply = () => {
      Object.entries(markersRef.current).forEach(([k, m]) => {
        const pin = m.getElement?.()?.querySelector?.(".jis-pin-logo");
        if (pin) pin.classList.toggle("jis-pin-logo--active", k === fk);
      });
    };
    if (focus) {
      map.flyTo([focus.lat, focus.lng], 10, { duration: 0.9 });
      map.once("moveend", apply);
    }
    apply();
  }, [focus]);

  // Hovered (from the list): light highlight
  useEffect(() => {
    const hk = hovered ? keyOf(hovered) : null;
    Object.entries(markersRef.current).forEach(([k, m]) => {
      const pin = m.getElement?.()?.querySelector?.(".jis-pin-logo");
      if (pin) pin.classList.toggle("jis-pin-logo--hover", k === hk);
    });
  }, [hovered]);

  // User location: "you are here" marker + zoom to user + nearest venue
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (!userLoc) return;

    const dot = L.marker([userLoc.lat, userLoc.lng], {
      icon: L.divIcon({
        className: "jis-user",
        html: '<span class="jis-user-dot"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
      interactive: false,
      zIndexOffset: 2000,
    });
    dot.addTo(map);
    userMarkerRef.current = dot;

    const nearest = [...content.locations.items].sort(
      (a, b) => miles(userLoc, a) - miles(userLoc, b)
    )[0];
    const wide = window.innerWidth >= 640;
    map.fitBounds(
      L.latLngBounds(
        [userLoc.lat, userLoc.lng],
        [nearest.lat, nearest.lng]
      ).pad(0.4),
      {
        paddingTopLeft: wide ? [360, 70] : [30, 60],
        paddingBottomRight: wide ? [60, 60] : [30, 280],
        maxZoom: 9,
      }
    );
  }, [userLoc]);

  return (
    <div
      ref={elRef}
      className="h-full w-full"
      aria-label="Map of Johnny's Italian Steakhouse locations"
    />
  );
}
