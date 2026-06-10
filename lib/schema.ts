import type { SiteContent, LocationItem } from "@/content";

// Builds LocalBusiness/Restaurant JSON-LD. Embedded only when the platform's
// Audit "Structured data" fix has been applied (content.seo.schema === true).
const SITE = "https://johnnysitaliansteakhouse.com";

export function homeSchema(c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: c.brand,
    description:
      "Hand-cut steaks aged 28 days, house-made pasta, and a martini poured the old-fashioned way — an upscale Italian supper club.",
    servesCuisine: ["Italian", "Steakhouse"],
    priceRange: "$$$",
    url: SITE,
    image: `${SITE}${c.hero.image}`,
    acceptsReservations: true,
    department: c.locations.items.map((i) => ({
      "@type": "Restaurant",
      name: `${c.brand} — ${i.city}`,
      address: { "@type": "PostalAddress", addressLocality: i.city, addressRegion: i.state },
      geo: { "@type": "GeoCoordinates", latitude: i.lat, longitude: i.lng },
    })),
  };
}

export function locationSchema(
  c: SiteContent,
  item: LocationItem,
  lp: { address: string; phone: string; hours: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${c.brand} — ${item.city}`,
    servesCuisine: ["Italian", "Steakhouse"],
    priceRange: "$$$",
    acceptsReservations: true,
    telephone: lp.phone,
    address: { "@type": "PostalAddress", streetAddress: lp.address, addressLocality: item.city, addressRegion: item.state },
    geo: { "@type": "GeoCoordinates", latitude: item.lat, longitude: item.lng },
    image: item.image ? `${SITE}${item.image}` : `${SITE}${c.hero.image}`,
  };
}
