/**
 * Single source of truth for all homepage content.
 * Components read from `content` only — nothing is hardcoded in JSX.
 * Shaped so it can later be swapped for a database/CMS without touching components.
 *
 * NOTE: this is the brand "master" page — it does NOT assume a location.
 * Location-specific details (address, hours, phone) live on per-location pages;
 * here we funnel visitors to pick their nearest Johnny's.
 */

export interface NavLink {
  label: string;
  href: string;
  /** show a dropdown chevron after the label (visual only) */
  chevron?: boolean;
}

export interface Dish {
  name: string;
  price: string;
  description: string;
  image: string;
  /** short category/billing label shown above the name */
  tag?: string;
}

export interface LocationItem {
  city: string;
  state: string;
  /** coordinates for the map */
  lat: number;
  lng: number;
  /** storefront photo shown in the location card */
  image?: string;
  /** optional per-location overrides (else the brand defaults are used) */
  hours?: string;
  specials?: string;
  /** optionally marks a highlighted "nearest you" card (unused on the master page) */
  nearest?: boolean;
}

export interface SiteContent {
  brand: string;
  /** short stylized text mark, used as a fallback when no logo image is set */
  brandMark: string;
  /** path to a real logo image in /public; when set, replaces the text mark */
  brandLogo: string;

  nav: {
    links: NavLink[];
    /** right-side buttons; the last one renders as the primary button */
    actions: NavLink[];
  };

  locationBar: {
    /** neutral prompt shown before a location is picked (master page has none) */
    defaultLabel: string;
    actions: NavLink[];
  };

  hero: {
    headlineLead: string;
    headlineEmphasis: string;
    subhead: string;
    cta: string;
    ctaSecondary: string;
    image: string;
    /** optional background video clips (paths in /public); crossfade + loop. Falls back to image if empty */
    video?: string[];
  };

  /** owner-controlled promo band — toggled on/off from the CMS for specials & news */
  banner: {
    enabled: boolean;
    message: string;
    buttonLabel: string;
    buttonHref: string;
    image: string;
  };

  manifesto: {
    eyebrow: string;
    lines: string[];
    body: string;
  };

  occasion: {
    lead: string;
    detail: string;
    linkLabel: string;
  };

  signatures: {
    eyebrow: string;
    heading: string;
    subtext: string;
    dishes: Dish[];
    cta: string;
  };

  atmosphere: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    /** small supper-club detail row under the copy */
    highlights: string[];
    cta: string;
    image: string;
  };

  locations: {
    eyebrow: string;
    heading: string;
    subtext: string;
    searchPlaceholder: string;
    searchCta: string;
    /** brand-wide defaults shown in each location card */
    hours: string;
    specials: string;
    reserveLabel: string;
    directionsLabel: string;
    items: LocationItem[];
  };

  proof: {
    eyebrow: string;
    heading: string;
    lead: string;
    rating: string;
    count: string;
    quote: string;
    author: string;
    /** featured reviewer's city (shown in warm gold, the spotlight) */
    city: string;
    reviews: { quote: string; author: string; city: string }[];
  };

  visit: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
    ctaHref: string;
    cardTitle: string;
    features: string[];
  };

  connect: {
    eyebrow: string;
    heading: string;
    copy: string;
    placeholder: string;
    button: string;
    success: string;
    socialEyebrow: string;
    handle: string;
  };

  footer: {
    brand: string;
    tagline: string;
    ctaLine: string;
    cta: string;
    ctaHref: string;
    /** still candlelit photo behind the closing CTA */
    ctaImage: string;
    /** dish/drink photos (legacy filmstrip; currently unused) */
    gallery: string[];
    /** short brand sentence under the wordmark in the footer body */
    blurb: string;
    /** quick-links column */
    explore: NavLink[];
    /** social profiles (icon = which glyph to render) */
    social: { label: string; href: string; icon: "instagram" | "facebook" }[];
    copyright: string;
    /** legal / utility links in the bottom bar */
    legal: NavLink[];
  };

  mobileReserve: string;

  /** per-location page content, keyed by city slug (one template renders all) */
  locationPages: Record<
    string,
    { tagline: string; hours: string; specials: string; address: string; phone: string }
  >;
}

const IMAGES = {
  // Real Johnny's Italian Steakhouse photos (from johnnysitaliansteakhouse.com),
  // self-hosted under /public/photos.
  hero: "/photos/hero-steak.jpg",
  atmosphere: "/photos/blue-bar.jpg",
  dishes: [
    "/photos/steak-de-burgo.jpg",
    "/photos/chanel-no-5.jpg",
    "/photos/bone-in-ribeye.jpg",
  ],
  exteriors: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1400",
  ],
  // Closing filmstrip — a varied parade of plates & pours for the footer CTA
  gallery: [
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=700",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=700",
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=700",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=700",
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=700",
    "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=700",
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=700",
    "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=700",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=700",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=700",
  ],
};

export const content: SiteContent = {
  brand: "Johnny's Italian Steakhouse",
  brandMark: "Johnny's",
  brandLogo: "/johnnys-logo.png",

  nav: {
    links: [
      { label: "Home", href: "#top" },
      { label: "Menu", href: "#signatures", chevron: true },
      { label: "Locations", href: "#locations", chevron: true },
      { label: "Join Newsletter", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Reservations", href: "#visit", chevron: true },
      { label: "Contact", href: "#" },
    ],
    actions: [
      { label: "Private Events", href: "#occasion" },
      { label: "Reserve", href: "#visit" },
    ],
  },

  locationBar: {
    defaultLabel: "Find your Johnny's",
    actions: [
      { label: "Menu", href: "#signatures" },
      { label: "Reserve", href: "#visit" },
    ],
  },

  hero: {
    headlineLead: "It's",
    headlineEmphasis: "showtime.",
    subhead:
      "Our goal is for every guest to give us a standing ovation at the end of their dining experience.",
    cta: "Find your Johnny's",
    ctaSecondary: "View the menu",
    image: IMAGES.hero,
    video: ["/videos/hero.mp4"],
  },

  banner: {
    // off by default on the standalone site; the CMS turns it on for the demo
    enabled: false,
    message: "Prime Rib Weekend — every Friday & Saturday",
    buttonLabel: "Reserve a table",
    buttonHref: "#locations",
    image: "/photos/bone-in-ribeye.jpg",
  },

  manifesto: {
    eyebrow: "An evening in three acts",
    lines: ["The Play.", "The Production.", "The Performance."],
    body: "Dinner at Johnny's is staged like a show — prime steaks aged in-house, pasta rolled by hand, a candlelit room, and a martini poured the old-fashioned way. Pull up a chair; the curtain's up.",
  },

  occasion: {
    lead: "Prime Rib, Friday & Saturday.",
    detail:
      "Plus private dining for parties, rehearsal dinners & corporate events.",
    linkLabel: "Inquire",
  },

  signatures: {
    eyebrow: "Tonight's Signatures",
    heading: "The headliners.",
    subtext:
      "Steaks aged 28 days and finished over fire, pasta rolled by hand each morning. The classics that keep the room full.",
    dishes: [
      {
        name: "Steak de Burgo",
        price: "$44",
        tag: "Signature Filet",
        description:
          "Our signature filet with roasted garlic, basil and oregano, finished in a rich cream sauce.",
        image: IMAGES.dishes[0],
      },
      {
        name: "Chanel No. 5",
        price: "$32",
        tag: "Seafood Pasta",
        description:
          "Marilyn's trademark — cheese ravioli with lobster, shrimp, artichokes, prosciutto and spinach in garlic cream.",
        image: IMAGES.dishes[1],
      },
      {
        name: "Bone-In Ribeye",
        price: "$64",
        tag: "Ribeye · 20 oz",
        description:
          "A 20 oz. cut — flavorful and tender, with the perfect amount of marbling.",
        image: IMAGES.dishes[2],
      },
    ],
    cta: "See the full menu",
  },

  atmosphere: {
    eyebrow: "The Supper Club",
    heading: "New-fashioned luxury. Old-fashioned service.",
    paragraphs: [
      "Settle into the Blue Bar beneath velvet draperies and low candlelight, a martini sweating in your hand and Sinatra drifting through the room. This is dinner the way the Rat Pack meant it — unhurried, glamorous, a little theatrical.",
      "Our team has been doing this for decades, and it shows in the details: the tableside flourish, the perfectly timed pour, the way the night seems to build. Every guest leaves with a standing ovation.",
    ],
    highlights: ["The Blue Bar", "Prime Rib · Fri & Sat", "Private dining"],
    cta: "Find your table",
    image: IMAGES.atmosphere,
  },

  locations: {
    eyebrow: "Find Your Johnny's",
    heading: "11 tables across the country.",
    subtext:
      "From West Des Moines to the heart of Texas — same hand-cut steaks, same standing ovation. Find the supper club nearest you.",
    searchPlaceholder: "Search by city…",
    searchCta: "Find a location",
    hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM",
    specials: "Prime Rib, every Friday & Saturday",
    reserveLabel: "Reserve a table",
    directionsLabel: "Get directions",
    items: [
      { city: "West Des Moines", state: "IA", lat: 41.5772, lng: -93.7113, image: "/photos/locations/west-des-moines.webp" },
      { city: "Des Moines", state: "IA", lat: 41.5868, lng: -93.625, image: "/photos/locations/des-moines.webp" },
      { city: "Middleton", state: "WI", lat: 43.0972, lng: -89.5043, image: "/photos/locations/middleton.webp" },
      { city: "Sun Prairie", state: "WI", lat: 43.1836, lng: -89.2137, image: "/photos/locations/sun-prairie.jpg" },
      { city: "Eau Claire", state: "WI", lat: 44.8113, lng: -91.4985, image: "/photos/locations/eau-claire.webp" },
      { city: "East Peoria", state: "IL", lat: 40.6663, lng: -89.5801, image: "/photos/locations/east-peoria.webp" },
      { city: "Olathe", state: "KS", lat: 38.8814, lng: -94.8191, image: "/photos/locations/olathe.webp" },
      { city: "Shenandoah", state: "TX", lat: 30.1816, lng: -95.4524, image: "/photos/locations/shenandoah.webp" },
      { city: "Altoona", state: "IA", lat: 41.6447, lng: -93.4647, image: "/photos/locations/altoona.webp" },
      { city: "Moline", state: "IL", lat: 41.5067, lng: -90.5151, image: "/photos/locations/moline.jpg" },
      { city: "Thornton", state: "CO", lat: 39.868, lng: -104.9719, image: "/photos/locations/thornton.webp" },
    ],
  },

  proof: {
    eyebrow: "Curtain call",
    heading: "A standing ovation.",
    lead: "Our goal is to earn one at the end of every meal — and night after night, the room rises to its feet.",
    rating: "4.9",
    count: "600+ reviews",
    quote:
      "Best steak we've ever had — the kind of night you keep talking about. The room, the service, the martinis: every detail felt like a performance.",
    author: "Mara K.",
    city: "West Des Moines",
    reviews: [
      {
        quote:
          "The Steak de Burgo is worth the drive. Tableside everything, and not a beat missed all night.",
        author: "Marcus T.",
        city: "Middleton",
      },
      {
        quote:
          "Our anniversary spot for years — the Blue Bar at candlelight is pure old-Hollywood romance.",
        author: "Diane & Paul",
        city: "East Peoria",
      },
      {
        quote:
          "Felt like the Rat Pack might stroll in any minute. Flawless service, and the ribeye was unreal.",
        author: "Tony R.",
        city: "Olathe",
      },
      {
        quote:
          "Best martini in town, hands down — and the whole room hums on a Friday night.",
        author: "Olivia R.",
        city: "Eau Claire",
      },
      {
        quote:
          "They treated my parents' 50th like opening night. We will never forget it.",
        author: "The Bennetts",
        city: "Sun Prairie",
      },
      {
        quote:
          "Hand-rolled pasta that tastes like someone's nonna is in the back. Absolutely stunning.",
        author: "Gina M.",
        city: "Des Moines",
      },
      {
        quote:
          "Dark, glamorous, and the service is a performance of its own. A proper supper club.",
        author: "David K.",
        city: "Shenandoah",
      },
    ],
  },

  visit: {
    eyebrow: "Reservations",
    heading: "A table's always waiting.",
    body: "Twenty-three supper clubs across the Midwest, each with its own dining room and bar. Find the Johnny's nearest you for hours and reservations.",
    cta: "Find your location",
    ctaHref: "#locations",
    cardTitle: "At every Johnny's",
    features: [
      "Main dining room",
      "The Blue Bar",
      "Private banquet rooms",
      "Dinner served nightly",
    ],
  },

  connect: {
    eyebrow: "Stay in the loop",
    heading: "Join the club.",
    copy: "First dibs on prime-rib weekends, new menu drops, and the occasional comp — straight to your inbox.",
    placeholder: "Your email",
    button: "Subscribe",
    success: "Thanks — you're on the list. Keep an eye on your inbox.",
    socialEyebrow: "Follow along",
    handle: "@johnnysitaliansteakhouse",
  },

  footer: {
    brand: "Johnny's Italian Steakhouse",
    tagline: "A Heart of America brand",
    ctaLine: "The curtain's always up.",
    cta: "Reserve your seat",
    ctaHref: "#locations",
    ctaImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000",
    gallery: IMAGES.gallery,
    blurb:
      "An upscale supper club in the Rat Pack tradition — prime steaks aged in-house, pasta rolled by hand, and a martini poured the old-fashioned way.",
    explore: [
      { label: "The Menu", href: "#signatures" },
      { label: "Locations", href: "#locations" },
      { label: "Reservations", href: "#locations" },
      { label: "Private Events", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
    social: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/johnnysitaliansteakhouse/",
        icon: "instagram",
      },
      { label: "Facebook", href: "#", icon: "facebook" },
    ],
    copyright: "© 2026 Johnny's Italian Steakhouse",
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },

  mobileReserve: "Find a table",

  locationPages: {
    "west-des-moines": { tagline: "Our flagship supper club — where it all began.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Prime Rib, every Friday & Saturday", address: "1601 22nd St, West Des Moines, IA 50266", phone: "(515) 309-7575" },
    "des-moines": { tagline: "Downtown's table for a night out.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Live piano in the Blue Bar, Thu–Sat", address: "111 E Grand Ave, Des Moines, IA 50309", phone: "(515) 309-1300" },
    "middleton": { tagline: "Madison's favorite cut, just west of the city.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Date-night prix fixe, Sundays", address: "8390 Market St, Middleton, WI 53562", phone: "(608) 831-9999" },
    "sun-prairie": { tagline: "Big-night dining, neighborhood warmth.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Half-price wine bottles, Wednesdays", address: "1011 Tower Dr, Sun Prairie, WI 53590", phone: "(608) 837-1717" },
    "eau-claire": { tagline: "The supper club the Chippewa Valley trusts.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Friday Prime Rib & live jazz", address: "2421 Golf Rd, Eau Claire, WI 54701", phone: "(715) 835-2424" },
    "east-peoria": { tagline: "River-city steaks done right.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Surf & turf Saturdays", address: "401 Conference Center Dr, East Peoria, IL 61611", phone: "(309) 698-3000" },
    "olathe": { tagline: "Kansas City's east-side classic.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Bottomless brunch, Sundays", address: "11700 S Strang Line Rd, Olathe, KS 66062", phone: "(913) 768-7800" },
    "shenandoah": { tagline: "Houston-north's old-Hollywood dining room.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Chef's tasting menu, nightly", address: "19075 I-45 S, Shenandoah, TX 77385", phone: "(936) 270-7777" },
    "altoona": { tagline: "Steaks worth the drive to Altoona.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Prime Rib weekends", address: "2614 Adventureland Dr, Altoona, IA 50009", phone: "(515) 967-2000" },
    "moline": { tagline: "The Quad Cities' supper club.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Live music in the bar, Fri & Sat", address: "1630 47th Ave, Moline, IL 61265", phone: "(309) 762-5000" },
    "thornton": { tagline: "Denver-north's table for a celebration.", hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM", specials: "Happy hour, 4–6 PM daily", address: "10250 Grant St, Thornton, CO 80229", phone: "(303) 280-9000" },
  },
};
