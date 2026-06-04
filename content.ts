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
    reviews: { quote: string; author: string }[];
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

  footer: {
    brand: string;
    tagline: string;
    ctaLine: string;
    cta: string;
    ctaHref: string;
  };

  mobileReserve: string;
}

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2000",
  atmosphere:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600",
  dishes: [
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=1200",
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200",
    "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200",
  ],
  exteriors: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1400",
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
    // Video clips are in /public — re-enable the playlist by restoring this array:
    // ["/hero-cooking.mp4", "/hero-cooking-2.mp4", "/hero-cooking-3.mp4"]
    video: [],
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
    cta: "Reserve your evening",
    image: IMAGES.atmosphere,
  },

  locations: {
    eyebrow: "Find Your Johnny's",
    heading: "23 tables across the Midwest.",
    subtext:
      "From West Des Moines to the heart of Texas — same hand-cut steaks, same standing ovation. Find the supper club nearest you.",
    searchPlaceholder: "Search by city…",
    searchCta: "Find a location",
    hours: "Sun–Thu · 4–10 PM    Fri–Sat · 4–11 PM",
    specials: "Prime Rib, every Friday & Saturday",
    reserveLabel: "Reserve a table",
    directionsLabel: "Get directions",
    items: [
      { city: "West Des Moines", state: "IA", lat: 41.5772, lng: -93.7113, image: IMAGES.exteriors[0] },
      { city: "Des Moines", state: "IA", lat: 41.5868, lng: -93.625, image: IMAGES.exteriors[1] },
      { city: "Middleton", state: "WI", lat: 43.0972, lng: -89.5043, image: IMAGES.exteriors[2] },
      { city: "Sun Prairie", state: "WI", lat: 43.1836, lng: -89.2137, image: IMAGES.exteriors[0] },
      { city: "Eau Claire", state: "WI", lat: 44.8113, lng: -91.4985, image: IMAGES.exteriors[1] },
      { city: "East Peoria", state: "IL", lat: 40.6663, lng: -89.5801, image: IMAGES.exteriors[2] },
      { city: "Olathe", state: "KS", lat: 38.8814, lng: -94.8191, image: IMAGES.exteriors[0] },
      { city: "Shenandoah", state: "TX", lat: 30.1816, lng: -95.4524, image: IMAGES.exteriors[1] },
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
    author: "Google review · West Des Moines",
    reviews: [
      {
        quote:
          "The Steak de Burgo is worth the drive. Tableside everything, and not a beat missed all night.",
        author: "Marcus T.",
      },
      {
        quote:
          "Our anniversary spot for years — the Blue Bar at candlelight is pure old-Hollywood romance.",
        author: "Diane & Paul",
      },
      {
        quote:
          "Felt like the Rat Pack might stroll in any minute. Flawless service, and the ribeye was unreal.",
        author: "Tony R.",
      },
      {
        quote:
          "Best martini in town, hands down — and the whole room hums on a Friday night.",
        author: "Olivia R.",
      },
      {
        quote:
          "They treated my parents' 50th like opening night. We will never forget it.",
        author: "The Bennetts",
      },
      {
        quote:
          "Hand-rolled pasta that tastes like someone's nonna is in the back. Absolutely stunning.",
        author: "Gina M.",
      },
      {
        quote:
          "Dark, glamorous, and the service is a performance of its own. A proper supper club.",
        author: "David K.",
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

  footer: {
    brand: "Johnny's Italian Steakhouse",
    tagline: "A Heart of America brand",
    ctaLine: "A table's always waiting.",
    cta: "Find your Johnny's",
    ctaHref: "#locations",
  },

  mobileReserve: "Find a table",
};
